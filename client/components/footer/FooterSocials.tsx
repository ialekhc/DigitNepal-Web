'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { SOCIAL_LINKS } from '@/constants/social';
import { cn } from '@/lib/utils';

type FooterSocialsProps = {
  className?: string;
};

export function FooterSocials({ className }: FooterSocialsProps) {
  return (
    <div className={cn('mt-4', className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.11em] text-slate-200/88">Follow Us</p>
      <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
        {SOCIAL_LINKS.map((social) => {
          const Icon = social.icon;

          return (
            <div key={social.name} className="group relative">
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={cn(
                    'focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-white/[0.05] text-slate-100/90 shadow-[0_8px_20px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-all duration-300',
                    'hover:border-brand-pink/60 hover:text-brand-pink hover:shadow-[0_12px_28px_rgba(255,45,111,0.35)]',
                  )}
                >
                  <Icon className="h-[1rem] w-[1rem]" />
                </Link>
              </motion.div>

              <span
                role="tooltip"
                className="pointer-events-none absolute -top-9 left-1/2 z-20 hidden -translate-x-1/2 rounded-md border border-white/15 bg-[#0f1c3d]/95 px-2.5 py-1 text-xs text-slate-100 opacity-0 transition-all duration-200 group-hover:block group-hover:opacity-100 group-focus-within:block group-focus-within:opacity-100 md:block"
              >
                {social.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
