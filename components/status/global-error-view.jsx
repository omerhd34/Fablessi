"use client";

import { useEffect, useMemo } from "react";
import en from "@/lib/i18n/dictionaries/en";
import tr from "@/lib/i18n/dictionaries/tr";
import { localeCookieName } from "@/lib/i18n/config";
import {
 StatusActionButton,
 StatusActionLink,
 StatusPage,
} from "@/components/status/status-page";

function getClientLocale() {
 if (typeof document === "undefined") return "tr";

 const match = document.cookie.match(
  new RegExp(`(?:^|; )${localeCookieName}=([^;]*)`)
 );

 return match?.[1] === "en" ? "en" : "tr";
}

export function GlobalErrorView({ error, reset }) {
 const copy = useMemo(() => {
  const locale = getClientLocale();
  return (locale === "en" ? en : tr).status.error;
 }, []);

 useEffect(() => {
  console.error("[global-error]", error);
 }, [error]);

 return (
  <StatusPage
   code={copy.code}
   title={copy.title}
   description={copy.description}
   className="min-h-[70dvh]!"
  >
   <StatusActionButton onClick={reset} primary>
    {copy.tryAgain}
   </StatusActionButton>
   <StatusActionLink href="/">{copy.goHome}</StatusActionLink>
  </StatusPage>
 );
}
