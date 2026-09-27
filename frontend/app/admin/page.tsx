import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin/auth';
import { AdminLogin } from '@/components/admin/admin-login';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (await isAuthenticated()) redirect('/admin/dashboard');
  return <AdminLogin />;
}
