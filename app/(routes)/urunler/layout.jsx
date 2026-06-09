import "./urunler.css";
import { createPageMetadata } from "@/lib/i18n/page-metadata";

export const generateMetadata = createPageMetadata("products", {
 descriptionKey: "layoutDescription",
});

export default function UrunlerLayout({ children }) {
 return <div className="site-inner-products">{children}</div>;
}
