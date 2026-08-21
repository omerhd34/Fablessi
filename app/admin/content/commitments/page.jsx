import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { CommitmentsContentForm } from "@/components/admin/commitments-content-form";
import { getAdminContentBlock } from "@/lib/content/queries";
import { Button } from "@/components/ui/button";

export default async function AdminCommitmentsContentPage() {
 const commitments = await getAdminContentBlock("commitments");

 return (
  <div className="space-y-6">
   <AdminPageHeader
    title="Taahhütlerimiz"
    description="Sayfa görselini ve taahhütleri düzenleyin."
   >
    <Button variant="outline" size="sm" className="cursor-pointer gap-1.5" asChild>
     <Link href="/admin/content">
      <MdArrowBack className="size-4" aria-hidden />
      Geri
     </Link>
    </Button>
   </AdminPageHeader>

   <CommitmentsContentForm initial={commitments} />
  </div>
 );
}
