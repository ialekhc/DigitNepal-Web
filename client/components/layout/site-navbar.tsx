'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, ShieldCheck, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { SocialLinks } from '@/components/common/SocialLinks';
import { primaryNavigation } from '@/constants/navigation';
import { mobileMenuSlide, navbarBlur, staggerContainer } from '@/lib/motion';
import { companyInfo } from '@/lib/content/site-content';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

export function SiteNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        variants={navbarBlur}
        animate={scrolled ? 'scrolled' : 'top'}
        className="sticky top-0 z-50 border-b"
      >
        <div className="section-wrap flex h-20 items-center justify-between">
          <Link href="/" className="inline-flex items-center focus-ring rounded-lg">
            <Image src="/brand/logo-light.png" alt="Digit Nepal" width={214} height={112} priority className="h-10 w-auto" />
          </Link>

          <nav className="hidden items-center gap-3 xl:flex 2xl:gap-5" aria-label="Main navigation">
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link focus-ring rounded-md px-0.5"
                data-active={isActive(item.href)}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild size="sm" magnetic>
              <Link href={companyInfo.phoneHref}>Start Your Project</Link>
            </Button>
            <Button asChild size="sm" className="gap-2" magnetic>
              <Link href="https://finance.digitnepal.com/admin"><ShieldCheck size={16} />Admin</Link>
            </Button>
          </nav>

          <button
            className="inline-flex rounded-xl border border-white/15 bg-white/[0.04] p-2 text-slate-100 xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle Menu"
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-label="Close mobile menu overlay"
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 h-full w-[min(90vw,24rem)] overflow-y-auto border-l border-white/15 bg-[#050816]/96 p-5 backdrop-blur-xl xl:hidden"
              variants={mobileMenuSlide}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="mb-5 flex items-center justify-between">
                <Image src="/brand/logo-light.png" alt="Digit Nepal" width={176} height={92} className="h-8 w-auto" />
                <button
                  className="rounded-xl border border-white/15 bg-white/[0.04] p-2"
                  onClick={() => setOpen(false)}
                  aria-label="Close mobile menu"
                >
                  <X size={18} />
                </button>
              </div>

              <motion.nav variants={staggerContainer} initial="hidden" animate="show" className="grid gap-2">
                {primaryNavigation.map((item) => (
                  <motion.div key={item.href} variants={{ hidden: { opacity: 0, x: 16 }, show: { opacity: 1, x: 0 } }}>
                    <Link
                      href={item.href}
                      className={cn(
                        'block rounded-xl px-4 py-2.5 text-sm transition',
                        isActive(item.href)
                          ? 'bg-brand-pink/15 text-brand-pink'
                          : 'text-slate-200/90 hover:bg-white/8 hover:text-white',
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild size="sm"><Link href={companyInfo.phoneHref}>Start Your Project</Link></Button>
                <Button asChild size="sm" className="gap-2"><Link href="https://finance.digitnepal.com/admin"><ShieldCheck size={16} />Admin</Link></Button>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300/80">Follow Digit Nepal</p>
                <SocialLinks mode="icon-only" layout="horizontal" showTooltips={false} className="justify-start gap-3" />
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
