"use client";

import { useLayoutEffect } from "react";

export function AdminToastLayout() {
 useLayoutEffect(() => {
  document.documentElement.dataset.toastLayout = "compact";
  return () => {
   document.documentElement.dataset.toastLayout = "fab";
  };
 }, []);

 return null;
}
