import { FavoritesView } from "@/components/favorites/favorites-view";
import { createPageMetadata } from "@/lib/i18n/page-metadata";

export const generateMetadata = createPageMetadata("favorites");

export default function FavorilerPage() {
 return (
  <div className="container-premium page-content-offset pb-20 md:pb-28">
   <FavoritesView />
  </div>
 );
}
