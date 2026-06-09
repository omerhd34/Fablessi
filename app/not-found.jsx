import {
 StatusActionLink,
 StatusPage,
} from "@/components/status/status-page";
import { createStatusMetadata } from "@/lib/i18n/page-metadata";
import { getServerDictionary } from "@/lib/i18n/server";

export const generateMetadata = createStatusMetadata("notFound");

export default async function NotFoundPage() {
 const { dictionary } = await getServerDictionary();
 const copy = dictionary.status.notFound;

 return (
  <StatusPage code={copy.code} title={copy.title} description={copy.description}>
   <StatusActionLink href="/" primary>
    {copy.goHome}
   </StatusActionLink>
   <StatusActionLink href="/urunler">{copy.browseProducts}</StatusActionLink>
  </StatusPage>
 );
}
