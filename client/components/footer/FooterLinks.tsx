'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { type FooterNavGroup } from '@/constants/navigation';
import { cn } from '@/lib/utils';

type FooterLinksProps = {
  groups: FooterNavGroup[];
  className?: string;
};

export function FooterLinks({ groups, className }: FooterLinksProps) {
  const [openGroup, setOpenGroup] = useState(groups[0]?.title ?? '');

  return (
    <div className={className}>
      <div className="hidden grid-cols-2 gap-6 md:grid xl:grid-cols-4">
        {groups.map((group, index) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.46, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-100/92">{group.title}</h3>
            <ul className="mt-3 space-y-2">
              {group.links.map((item) => (
                <li key={`${group.title}-${item.href}-${item.label}`}>
                  <Link
                    href={item.href}
                    className="group inline-flex w-fit items-center gap-2 text-sm text-slate-300/84 transition-colors duration-300 hover:text-white focus-ring rounded-md"
                  >
                    <span>{item.label}</span>
                    <span className="h-px w-0 bg-brand-pink transition-all duration-300 ease-premium group-hover:w-5" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="space-y-1.5 md:hidden">
        {groups.map((group) => {
          const isOpen = openGroup === group.title;
          const panelId = `footer-panel-${group.title.toLowerCase().replace(/\s+/g, '-')}`;

          return (
            <div key={group.title} className="rounded-2xl border border-white/12 bg-white/[0.02]">
              <button
                type="button"
                className="focus-ring flex w-full items-center justify-between px-4 py-2.5 text-left"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenGroup((prev) => (prev === group.title ? '' : group.title))}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-100/92">{group.title}</span>
                <ChevronDown className={cn('h-4 w-4 text-slate-300/84 transition-transform duration-300', isOpen ? 'rotate-180' : '')} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={panelId}
                    key={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-1.5 px-4 pb-3.5">
                      {group.links.map((item) => (
                        <li key={`${group.title}-${item.href}-${item.label}`}>
                          <Link
                            href={item.href}
                            className="focus-ring block rounded-md py-1 text-sm text-slate-300/84 transition-colors duration-300 hover:text-white"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
