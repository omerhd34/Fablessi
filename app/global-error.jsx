"use client";

import "@/app/styles/base.css";
import "@/app/styles/layout.css";
import "@/app/styles/shared.css";
import { GlobalErrorView } from "@/components/status/global-error-view";

export default function GlobalErrorPage({ error, reset }) {
 return (
  <html lang="tr">
   <body className="min-h-full flex flex-col bg-background font-sans antialiased">
    <main className="relative z-0 flex-1 site-inner">
     <GlobalErrorView error={error} reset={reset} />
    </main>
   </body>
  </html>
 );
}
