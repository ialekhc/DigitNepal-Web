'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { companyInfo } from '@/lib/content/site-content';
import { fadeUp } from '@/lib/motion';

const particles = [
  { top: '14%', left: '10%', size: 5, duration: 5.2 },
  { top: '28%', left: '86%', size: 6, duration: 6.1 },
  { top: '74%', left: '18%', size: 4, duration: 5.6 },
  { top: '64%', left: '76%', size: 5, duration: 6.8 },
  { top: '42%', left: '48%', size: 3, duration: 5.9 },
] as const;

export function FooterCTA() {
  return (
    <section className="relative overflow-hidden border-y border-white/10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(255,45,111,0.16),transparent_38%),radial-gradient(circle_at_84%_26%,rgba(199,37,104,0.14),transparent_42%),linear-gradient(180deg,#081128_0%,#050816_100%)]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url(/brand/favicon-alt-512.png)', backgroundSize: '170px 170px' }} />
      </div>

      <div className="section-wrap relative py-8 sm:py-9 lg:py-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="relative overflow-hidden rounded-[1.7rem] border border-white/16 bg-gradient-to-r from-[#0a132a]/92 via-[#0f1b3a]/88 to-[#131128]/90 px-5 py-6 shadow-panel backdrop-blur-xl sm:px-7 sm:py-7 lg:px-10 lg:py-8"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-4 h-44 w-44 rounded-full bg-brand-pink/22 blur-3xl" />
            <div className="absolute -right-20 bottom-4 h-48 w-48 rounded-full bg-brand-rose/20 blur-3xl" />
            {particles.map((particle, index) => (
              <motion.span
                key={`${particle.top}-${particle.left}`}
                className="absolute rounded-full bg-white/60"
                style={{ top: particle.top, left: particle.left, width: particle.size, height: particle.size }}
                animate={{ y: [0, -10, 0], opacity: [0.4, 0.9, 0.4] }}
                transition={{ repeat: Infinity, duration: particle.duration, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>

          <div className="relative">
            <p className="kicker w-fit">Premium Collaboration</p>
            <h2 className="mt-2.5 max-w-3xl font-display text-[clamp(1.55rem,3.7vw,2.5rem)] font-semibold leading-[1.08] text-white">
              READY TO BUILD SOMETHING AMAZING?
            </h2>
            <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-slate-200/86 sm:text-[0.95rem]">
              Let&apos;s transform your ideas into innovative digital solutions that scale.
            </p>

            <div className="mt-4 flex flex-wrap gap-2.5">
              <Button asChild magnetic>
                <Link href={companyInfo.phoneHref}>Start Your Project</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={companyInfo.whatsappHref} target="_blank" rel="noreferrer">
                  Schedule Consultation
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
