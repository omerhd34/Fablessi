import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { HomeContentForm } from "@/components/admin/home-content-form";
import { getAdminContentBlock } from "@/lib/content/queries";
import { Button } from "@/components/ui/button";

export default async function AdminHomeContentPage() {
 const [homeHero, homeBrandExperience] = await Promise.all([
  getAdminContentBlock("homeHero"),
  getAdminContentBlock("homeBrandExperience"),
 ]);

 return (
  <div className="space-y-6">
   <AdminPageHeader
    title="Anasayfa"
    description="Hero slayt görselleri ile marka deneyimi bölümünün görsel ve metinlerini güncelleyin."
   >
    <Button variant="outline" size="sm" className="cursor-pointer gap-1.5" asChild>
     <Link href="/admin/content">
      <MdArrowBack className="size-4" aria-hidden />
      Geri
     </Link>
    </Button>
   </AdminPageHeader>

   <HomeContentForm initialHero={homeHero} initialBrand={homeBrandExperience} />
  </div>
 );
}
