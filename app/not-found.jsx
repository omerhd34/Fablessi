import {
 StatusActionLink,
 StatusPage,
} from "@/components/status/status-page";
import { getServerDictionary } from "@/lib/i18n/server";

export async function generateMetadata() {
 const { dictionary } = await getServerDictionary();

 return {
  title: dictionary.status.notFound.metadata.title,
  description: dictionary.status.notFound.metadata.description,
 };
}

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
