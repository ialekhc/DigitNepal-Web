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
    <div className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="border-b border-white/10 bg-[#0d1733] p-4 lg:border-b-0 lg:border-r">
        <div className="mb-5">
          <p className="font-display text-lg font-semibold">Digit Nepal Admin</p>
          <p className="text-xs text-slate-400">{userQuery.data?.role ?? '...'}</p>
        </div>
        <nav className="grid gap-1">
          {filteredLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-lg px-3 py-2 text-sm transition',
                pathname === link.href ? 'bg-accent-cyan/15 text-accent-cyan' : 'text-slate-300 hover:bg-white/5',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button variant="outline" className="mt-6 w-full" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </aside>

      <div className="p-4 sm:p-6 lg:p-8">{children}</div>
    </div>
  );
}
