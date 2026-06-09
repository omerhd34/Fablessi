/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
 createContext,
 useCallback,
 useContext,
 useEffect,
 useMemo,
 useState,
} from "react";
import {
 FAVORITES_STORAGE_KEY,
 createFavoriteSnapshot,
 readFavorites,
 writeFavorites,
} from "@/lib/favorites";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
 const [favorites, setFavorites] = useState([]);
 const [hydrated, setHydrated] = useState(false);

 useEffect(() => {
  setFavorites(readFavorites());
  setHydrated(true);
 }, []);

 useEffect(() => {
  if (!hydrated) return;
  writeFavorites(favorites);
 }, [favorites, hydrated]);

 useEffect(() => {
  if (!hydrated) return;

  const onStorage = (event) => {
   if (event.key !== FAVORITES_STORAGE_KEY) return;
   setFavorites(readFavorites());
  };

  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
 }, [hydrated]);

 const isFavorite = useCallback(
  (slug) => favorites.some((item) => item.slug === slug),
  [favorites]
 );

 const toggleFavorite = useCallback((product) => {
  let added = false;

  setFavorites((current) => {
   const exists = current.some((item) => item.slug === product.slug);

   if (exists) {
    added = false;
    return current.filter((item) => item.slug !== product.slug);
   }

   added = true;
   return [createFavoriteSnapshot(product), ...current];
  });

  return added;
 }, []);

 const removeFavorite = useCallback((slug) => {
  setFavorites((current) => current.filter((item) => item.slug !== slug));
 }, []);

 const value = useMemo(
  () => ({
   favorites,
   hydrated,
   count: favorites.length,
   isFavorite,
   toggleFavorite,
   removeFavorite,
  }),
  [favorites, hydrated, isFavorite, toggleFavorite, removeFavorite]
 );

 return (
  <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
 );
}

export function useFavorites() {
 const context = useContext(FavoritesContext);

 if (!context) {
  throw new Error("useFavorites must be used within FavoritesProvider");
 }

 return context;
}
