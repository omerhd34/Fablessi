import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FaqContentForm } from "@/components/admin/faq-content-form";
import { FaqHeroForm } from "@/components/admin/faq-hero-form";
import { getAdminContentBlock, getAdminFaqCategories } from "@/lib/content/queries";
import { Button } from "@/components/ui/button";

export default async function AdminFaqContentPage() {
 const categories = await getAdminFaqCategories();
 const faqSettings = await getAdminContentBlock("faq");

 return (
  <div className="space-y-6">
   <AdminPageHeader
    title="Sıkça Sorulan Sorular"
    description="Sayfa görselini, soru kategorilerini ve yanıtları yönetin."
   >
    <Button variant="outline" size="sm" className="cursor-pointer gap-1.5" asChild>
     <Link href="/admin/content">
      <MdArrowBack className="size-4" aria-hidden />
      Geri
     </Link>
    </Button>
   </AdminPageHeader>

   <FaqHeroForm initial={faqSettings} />
   <FaqContentForm categories={categories} />
  </div>
 );
}
