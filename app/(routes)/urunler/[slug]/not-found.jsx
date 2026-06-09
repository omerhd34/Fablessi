import {
 StatusActionLink,
 StatusPage,
} from "@/components/status/status-page";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/server";

export default async function UrunNotFound() {
 const locale = await getLocale();
 const dictionary = getDictionary(locale);
 const { product: productCopy } = dictionary;

 return (
  <StatusPage
   code="404"
   title={productCopy.notFound}
   description={productCopy.notFoundDescription}
  >
   <StatusActionLink href="/urunler" primary>
    {productCopy.backToAllProducts}
   </StatusActionLink>
   <StatusActionLink href="/">{dictionary.status.notFound.goHome}</StatusActionLink>
  </StatusPage>
 );
}
