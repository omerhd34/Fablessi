import "./urunler.css";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata() {
 const locale = await getLocale();
 const dictionary = getDictionary(locale);

 return {
  title: dictionary.pages.products.title,
  description: dictionary.pages.products.layoutDescription,
 };
}

export default function UrunlerLayout({ children }) {
 return <div className="site-inner-products">{children}</div>;
}
