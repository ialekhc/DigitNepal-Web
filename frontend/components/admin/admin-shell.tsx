'use client';

import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useAdminUser } from '@/hooks/use-admin-auth';
import { Role } from '@/lib/types';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

const adminLinks: { href: string; label: string; roles: Role[] }[] = [
  { href: '/admin/dashboard', label: 'Overview', roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
  { href: '/admin/dashboard/services', label: 'Services', roles: ['SUPER_ADMIN', 'ADMIN'] },
  { href: '/admin/dashboard/applications', label: 'Applications', roles: ['SUPER_ADMIN', 'ADMIN'] },
  { href: '/admin/dashboard/events', label: 'Events', roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
  { href: '/admin/dashboard/blogs', label: 'Blogs', roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
  { href: '/admin/dashboard/inquiries', label: 'Inquiries', roles: ['SUPER_ADMIN', 'ADMIN'] },
  { href: '/admin/dashboard/brand-team', label: 'Brand & Team', roles: ['SUPER_ADMIN'] },
  { href: '/admin/dashboard/settings', label: 'Settings & SEO', roles: ['SUPER_ADMIN'] },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const userQuery = useAdminUser();

  const role = userQuery.data?.role;

  const filteredLinks = adminLinks.filter((link) => {
    if (!role) return true;
    return link.roles.includes(role);
  });

  const onLogout = () => {
    window.localStorage.removeItem('digit_nepal_token');
    router.replace('/admin/login');
  };

  return (
    <div className="min-h-screen bg-brand-deep lg:grid lg:grid-cols-[272px_1fr]">
      <aside className="border-b border-white/10 bg-[#060d1f] p-5 lg:border-b-0 lg:border-r lg:p-6">
        <div className="mb-6">
          <p className="font-display text-xl font-semibold">Digit Nepal Admin</p>
          <p className="text-xs text-slate-400">{userQuery.data?.role ?? '...'}</p>
        </div>
        <nav className="grid gap-1.5">
          {filteredLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-xl px-3 py-2.5 text-sm font-medium transition duration-300 ease-premium',
                pathname === link.href
                  ? 'border border-brand-pink/25 bg-brand-pink/12 text-brand-pink'
                  : 'border border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.04] hover:text-white',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button variant="outline" className="mt-7 w-full" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </aside>

      <div className="bg-gradient-to-b from-[#071127] to-[#050816] p-4 sm:p-6 lg:p-8">{children}</div>
    </div>
  );
}
