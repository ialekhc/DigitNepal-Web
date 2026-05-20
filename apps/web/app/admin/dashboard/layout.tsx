import { AdminAuthGuard } from '@/components/admin/auth-guard';
import { AdminShell } from '@/components/admin/admin-shell';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGuard>
      <AdminShell>{children}</AdminShell>
    </AdminAuthGuard>
  );
}
