import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EditButton } from "@/components/admin/edit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
 {
  href: "/admin/content/home",
  title: "Anasayfa",
  description: "Hero slayt görselleri ve marka deneyimi bölümü.",
 },
 {
  href: "/admin/content/about",
  title: "Hakkımızda",
  description: "Sayfa görseli, hikâye, giriş metni ve içerikler.",
 },
 {
  href: "/admin/content/mission",
  title: "Misyon & Vizyon",
  description: "Sayfa görseli, misyon, vizyon, değerler ve taahhütler.",
 },
 {
  href: "/admin/content/faq",
  title: "Sıkça Sorulan Sorular",
  description: "Sayfa görseli, kategoriler, sorular ve yanıtlar.",
 },
];

export default function AdminContentPage() {
 return (
  <div className="space-y-6">
   <AdminPageHeader
    title="Site İçeriği"
    description="Marka sayfalarınızın metinlerini, görsellerini ve yardım merkezi içeriklerini tek merkezden düzenleyin."
   />

   <div className="grid gap-4 md:grid-cols-2">
    {sections.map((section) => (
     <Card key={section.href}>
      <CardHeader>
       <CardTitle>{section.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
       <p className="text-sm text-muted-foreground">{section.description}</p>
       <EditButton href={section.href} className="shrink-0" />
      </CardContent>
     </Card>
    ))}
   </div>
  </div>
 );
}
