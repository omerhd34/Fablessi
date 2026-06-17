import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AboutContentForm } from "@/components/admin/about-content-form";
import { getAdminContentBlock } from "@/lib/content/queries";
import { Button } from "@/components/ui/button";

export default async function AdminAboutContentPage() {
 const about = await getAdminContentBlock("about");

 return (
  <div className="space-y-6">
   <AdminPageHeader title="Hakkımızda" description="Sayfa görselini, hikâye ve metin içeriklerini güncelleyin.">
    <Button variant="outline" size="sm" className="cursor-pointer gap-1.5" asChild>
     <Link href="/admin/content">
      <MdArrowBack className="size-4" aria-hidden />
      Geri
     </Link>
    </Button>
   </AdminPageHeader>

   <AboutContentForm initial={about} />
  </div>
 );
}
