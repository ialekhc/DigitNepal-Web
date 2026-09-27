import type { Metadata } from 'next';
import './billing.css';

export const metadata: Metadata = { title: 'Billing Studio', robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="billing-root">{children}</div>;
}
