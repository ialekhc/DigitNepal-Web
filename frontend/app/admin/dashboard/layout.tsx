import { AdminAuthGuard } from '@/components/admin/auth-guard';
import { AdminLayout } from '@/layouts/admin-layout';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGuard>
      <AdminLayout>{children}</AdminLayout>
    </AdminAuthGuard>
  );
}
