'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Applications' },
  { href: '/events', label: 'Events' },
  { href: '/courses', label: 'Courses' },
  { href: '/pricing', label: 'Plans & Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function SiteNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#101c3b]/90 backdrop-blur-xl">
      <div className="section-wrap flex h-16 items-center justify-between">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/brand/logo-light.png"
            alt="Digit Nepal"
            width={210}
            height={110}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'font-mono text-sm transition hover:text-accent-cyan',
                pathname === item.href ? 'text-accent-cyan' : 'text-slate-200/80',
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm">
            <Link href="/contact">Get Started</Link>
          </Button>
        </nav>

        <button
          className="inline-flex rounded-lg border border-white/15 bg-[#18274d] p-2 text-slate-100 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle Menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#101c3b] lg:hidden">
          <div className="section-wrap flex flex-col gap-2 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm',
                  pathname === item.href
                    ? 'bg-accent-cyan/15 text-accent-cyan'
                    : 'text-slate-200/85 hover:bg-white/5',
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
