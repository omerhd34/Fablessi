import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ContactContentForm } from "@/components/admin/contact-content-form";
import { getAdminContentBlock } from "@/lib/content/queries";
import { Button } from "@/components/ui/button";

export default async function AdminContactContentPage() {
 const contact = await getAdminContentBlock("contact");

 return (
  <div className="space-y-6">
   <AdminPageHeader
    title="İletişim"
    description="Çalışma saatlerini güncelleyin."
   >
    <Button variant="outline" size="sm" className="cursor-pointer gap-1.5" asChild>
     <Link href="/admin/content">
      <MdArrowBack className="size-4" aria-hidden />
      Geri
     </Link>
    </Button>
   </AdminPageHeader>

   <ContactContentForm initial={contact} />
  </div>
 );
}
