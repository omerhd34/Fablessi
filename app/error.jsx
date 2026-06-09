"use client";

import { ErrorView } from "@/components/status/error-view";

export default function ErrorPage({ error, reset }) {
 return <ErrorView error={error} reset={reset} />;
}
