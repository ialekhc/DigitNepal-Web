import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin/auth';
import { BillingDashboard } from '@/components/admin/billing-dashboard';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  if (!(await isAuthenticated())) redirect('/admin');
  return <BillingDashboard />;
}
