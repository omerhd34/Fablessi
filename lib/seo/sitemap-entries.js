import { getSitemapSitelinkEntries } from "@/lib/seo/google-snippets";

const STATIC_PAGES = [
 { path: "/", priority: 1, changeFrequency: "weekly" },
];

export function buildSitemapUrl(baseUrl, path) {
 if (path === "/") return baseUrl;
 return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function getAllSitemapEntries() {
 return [...STATIC_PAGES, ...getSitemapSitelinkEntries()];
}
