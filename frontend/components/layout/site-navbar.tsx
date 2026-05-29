'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { SocialLinks } from '@/components/common/SocialLinks';
import { megaMenu, primaryNavigation } from '@/constants/navigation';
import { mobileMenuSlide, navbarBlur, staggerContainer } from '@/lib/motion';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

const megaLabels = new Set(['Services', 'Solutions', 'Training'] as const);
type MegaKey = keyof typeof megaMenu;

export function SiteNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaKey | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActiveMega(null);
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

          <nav className="hidden items-center gap-6 lg:flex">
            {primaryNavigation.map((item) => {
              const isMega = megaLabels.has(item.label as MegaKey);

              if (isMega) {
                const key = item.label as MegaKey;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveMega(key)}
                    onMouseLeave={() => setActiveMega(null)}
                  >
                    <button
                      className="nav-link focus-ring rounded-md px-0.5"
                      aria-expanded={activeMega === key}
                      aria-haspopup="menu"
                      onClick={() => setActiveMega((prev) => (prev === key ? null : key))}
                    >
                      {item.label}
                      <ChevronDown className={cn('ml-1 h-4 w-4 transition', activeMega === key ? 'rotate-180' : '')} />
                    </button>

                    <AnimatePresence>
                      {activeMega === key ? (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
                          exit={{ opacity: 0, y: 8, transition: { duration: 0.18 } }}
                          className="absolute left-1/2 top-10 w-[32rem] -translate-x-1/2 rounded-3xl border border-white/15 bg-[#071022]/95 p-5 shadow-panel backdrop-blur-xl"
                          role="menu"
                        >
                          <div className="grid gap-3">
                            {megaMenu[key].map((subItem) => (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-brand-pink/35 hover:bg-white/[0.08]"
                              >
                                <p className="font-display text-sm font-semibold text-white group-hover:text-brand-pink">
                                  {subItem.title}
                                </p>
                                <p className="mt-1 text-xs leading-relaxed text-slate-300/85">
                                  {subItem.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link key={item.href} href={item.href} className="nav-link focus-ring rounded-md px-0.5" data-active={isActive(item.href)}>
                  {item.label}
                </Link>
              );
            })}
            <Button asChild size="sm" magnetic>
              <Link href="/contact">Start Your Project</Link>
            </Button>
          </nav>

          <button
            className="inline-flex rounded-xl border border-white/15 bg-white/[0.04] p-2 text-slate-100 lg:hidden"
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
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-label="Close mobile menu overlay"
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 h-full w-[min(90vw,24rem)] border-l border-white/15 bg-[#050816]/96 p-5 backdrop-blur-xl lg:hidden"
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
