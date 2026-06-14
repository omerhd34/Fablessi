import { FavoritesView } from "@/components/favorites/favorites-view";
import { createPageMetadata } from "@/lib/i18n/page-metadata";
import {
 containerPremiumClass,
 pageContentOffsetClass,
} from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

export const generateMetadata = createPageMetadata("favorites");

export default function FavorilerPage() {
 return (
  <div className={cn(containerPremiumClass, pageContentOffsetClass, "pb-20 md:pb-28")}>
   <FavoritesView />
  </div>
 );
}
