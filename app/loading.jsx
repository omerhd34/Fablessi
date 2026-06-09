import { LoadingView } from "@/components/status/loading-view";
import { getServerDictionary } from "@/lib/i18n/server";

export default async function LoadingPage() {
 const { dictionary } = await getServerDictionary();
 const copy = dictionary.status.loading;

 return <LoadingView title={copy.title} description={copy.description} />;
}
