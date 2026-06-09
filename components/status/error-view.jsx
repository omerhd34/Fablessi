"use client";

import { useEffect } from "react";
import { useTranslations } from "@/contexts/locale-provider";
import {
 StatusActionButton,
 StatusActionLink,
 StatusPage,
} from "@/components/status/status-page";

export function ErrorView({ error, reset }) {
 const { t } = useTranslations();

 useEffect(() => {
  console.error("[app-error]", error);
 }, [error]);

 return (
  <StatusPage
   code={t("status.error.code")}
   title={t("status.error.title")}
   description={t("status.error.description")}
  >
   <StatusActionButton onClick={reset} primary>
    {t("status.error.tryAgain")}
   </StatusActionButton>
   <StatusActionLink href="/">{t("status.error.goHome")}</StatusActionLink>
  </StatusPage>
 );
}
