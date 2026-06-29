import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product/product-detail-view";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/server";
import {
 containerPremiumClass,
 pageContentOffsetClass,
} from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";
import {
 trProductSeoDescriptionSuffix,
 enProductSeoDescriptionSuffix,
} from "@/lib/seo/local";
import { buildProductJsonLd } from "@/lib/seo/json-ld";
import { buildSeoPageTitle, formatSeoTitle, siteNameMetadata } from "@/lib/site-metadata";
import { getPrimaryImageUrl } from "@/lib/product-utils";
import { getCategoryGroupsForMenu } from "@/lib/queries/category-groups";
import { buildNavigation, getProductCategoryGroupFromMenu } from "@/lib/i18n/build-navigation";
import {
 getCategoryRelatedProducts,
 getProductBySlug,
 getProductDetailSecondaryCategoryGroup,
} from "@/lib/queries/products";

export const revalidate = 60;

export async function generateMetadata({ params }) {
 const { slug } = await params;
 const locale = await getLocale();
 const dictionary = getDictionary(locale);
 const product = await getProductBySlug(slug);

 if (!product) {
  return {
   title: buildSeoPageTitle(dictionary.product.notFound ?? "Product Not Found"),
  };
 }

 const seoSuffix =
  locale === "en" ? enProductSeoDescriptionSuffix : trProductSeoDescriptionSuffix;
 const seoTitle = formatSeoTitle(product.name);
 const description =
  product.description ?? `${product.name} - ${seoSuffix}`;
 const primaryImageUrl = getPrimaryImageUrl(product);
 const primaryImageAlt = product.images?.[0]?.alt ?? product.name;

 return {
  ...siteNameMetadata,
  title: buildSeoPageTitle(product.name),
  description,
  openGraph: {
   title: seoTitle,
   ...(primaryImageUrl
    ? { images: [{ url: primaryImageUrl, alt: primaryImageAlt }] }
    : {}),
  },
  twitter: {
   card: "summary_large_image",
   title: seoTitle,
   ...(primaryImageUrl ? { images: [primaryImageUrl] } : {}),
  },
  robots: {
   index: true,
   follow: true,
  },
 };
}

export default async function UrunDetayPage({ params }) {
 const { slug } = await params;
 const locale = await getLocale();
 const dictionary = getDictionary(locale);
 const menuGroups = await getCategoryGroupsForMenu(locale);
 const navigation = buildNavigation(dictionary, menuGroups);
 const product = await getProductBySlug(slug);

 if (!product) {
  notFound();
 }

 const categoryGroup = getProductCategoryGroupFromMenu(
  slug,
  navigation.productsMegaMenu
 );
 const categoryProducts = await getCategoryRelatedProducts(slug);
 const secondaryCategoryGroup = await getProductDetailSecondaryCategoryGroup(
  slug,
  categoryGroup?.slug,
  categoryProducts.length
 );
 const productJsonLd = buildProductJsonLd(product, locale);

 return (
  <>
   {productJsonLd ? (
    <script
     type="application/ld+json"
     dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
    />
   ) : null}
   <div className={cn(pageContentOffsetClass, "pb-10 md:pb-14")}>
   <div className={containerPremiumClass}>
    <ProductDetailView
     product={product}
     categoryLabel={categoryGroup?.label ?? null}
     categoryHref={categoryGroup?.href ?? null}
     categoryProducts={categoryProducts}
     secondaryCategoryGroup={secondaryCategoryGroup}
    />
   </div>
  </div>
  </>
 );
}
