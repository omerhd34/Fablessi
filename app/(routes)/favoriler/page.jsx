import { FavoritesView } from "@/components/favorites/favorites-view";
import { getServerDictionary } from "@/lib/i18n/server";

export async function generateMetadata() {
 const { dictionary } = await getServerDictionary();

 return {
  title: dictionary.pages.favorites.title,
  description: dictionary.pages.favorites.description,
 };
}

export default function FavorilerPage() {
 return (
  <div className="container-premium page-content-offset pb-20 md:pb-28">
   <FavoritesView />
  </div>
 );
}
