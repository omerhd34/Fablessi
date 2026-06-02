"use client";

import { useEffect, useState } from "react";

const DESKTOP_NAV_QUERY = "(min-width: 1024px)";

export function useIsDesktopNav() {
 const [isDesktop, setIsDesktop] = useState(false);

 useEffect(() => {
  const media = window.matchMedia(DESKTOP_NAV_QUERY);
  const update = () => setIsDesktop(media.matches);
  update();
  media.addEventListener("change", update);
  return () => media.removeEventListener("change", update);
 }, []);

 return isDesktop;
}
