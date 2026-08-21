import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ValuesContentForm } from "@/components/admin/values-content-form";
import { getAdminContentBlock } from "@/lib/content/queries";
import { Button } from "@/components/ui/button";

export default async function AdminValuesContentPage() {
 const values = await getAdminContentBlock("values");

 return (
  <div className="space-y-6">
   <AdminPageHeader
    title="Değerlerimiz"
    description="Sayfa görselini ve kurumsal değerleri düzenleyin."
   >
    <Button variant="outline" size="sm" className="cursor-pointer gap-1.5" asChild>
     <Link href="/admin/content">
      <MdArrowBack className="size-4" aria-hidden />
      Geri
     </Link>
    </Button>
   </AdminPageHeader>

   <ValuesContentForm initial={values} />
  </div>
 );
}
