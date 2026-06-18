import { AdminShell } from "@/components/admin/admin-shell";
import { AdminToastLayout } from "@/components/admin/admin-toast-layout";

export const metadata = {
 title: "Admin",
 robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
 return (
  <>
   <AdminToastLayout />
   <AdminShell>{children}</AdminShell>
  </>
 );
}
