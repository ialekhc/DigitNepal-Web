'use client';

import { motion } from 'framer-motion';
import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { footerNavGroups } from '@/constants/navigation';
import { companyInfo } from '@/lib/content/site-content';
import { fadeUp } from '@/lib/motion';

import { FooterBottom } from './FooterBottom';
import { FooterCTA } from './FooterCTA';
import { FooterLinks } from './FooterLinks';
import { FooterSocials } from './FooterSocials';

export function Footer() {
  return (
    <footer className="relative mt-12 bg-[#050816] text-white">
      <FooterCTA />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,45,111,0.12),transparent_38%),radial-gradient(circle_at_85%_34%,rgba(199,37,104,0.1),transparent_44%),linear-gradient(180deg,#050816_0%,#060d20_100%)]" />
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'url(/brand/favicon-512.png)', backgroundSize: '190px 190px' }} />
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 340"
            className="absolute -bottom-24 left-1/2 w-[1200px] -translate-x-1/2 opacity-[0.05]"
          >
            <path
              d="M49.2,280.7 C194.7,139.5 331.4,126.7 475.2,173.5 C618.4,220.1 751.2,304.7 883.4,279.4 C1010.8,255.1 1096.8,145.7 1151.6,75.3"
              fill="none"
              stroke="#FF2D6F"
              strokeWidth="34"
              strokeLinecap="round"
            />
            <path
              d="M35.2,251.7 C181.4,115.9 318.6,103.7 462.7,150 C607.2,196.3 741.1,280.8 873.6,258.6 C999.7,237.5 1088.3,133.4 1146.7,62.8"
              fill="none"
              stroke="#0A132A"
              strokeWidth="22"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="section-wrap relative py-8 sm:py-9 lg:py-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.14 }}
            className="rounded-[1.7rem] border border-white/12 bg-white/[0.03] px-5 py-6 shadow-panel backdrop-blur-xl sm:px-6 sm:py-7 lg:px-8 lg:py-8"
          >
            <div className="grid gap-7 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)]">
              <div className="xl:pr-8 xl:border-r xl:border-white/12">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src="/brand/logo-light.png"
                    alt="Digit Nepal"
                    width={220}
                    height={115}
                    className="h-10 w-auto"
                  />
                </motion.div>

                <p className="mt-3 font-display text-xl font-semibold text-white">Where Code Meets Creativity</p>
                <p className="mt-2.5 max-w-md text-sm leading-relaxed text-slate-300/86">
                  Digit Nepal helps businesses build innovative software, mobile applications, digital experiences, and scalable technology solutions.
                </p>

                <div className="mt-4 space-y-2 text-sm text-slate-300/88">
                  <p className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-pink" />
                    <span>{companyInfo.address}</span>
                  </p>
                  <Link href={`mailto:${companyInfo.email}`} className="focus-ring flex items-center gap-2.5 rounded-md transition-colors hover:text-brand-pink">
                    <Mail className="h-4 w-4 shrink-0 text-brand-pink" />
                    <span>{companyInfo.email}</span>
                  </Link>
                  <Link href={`tel:${companyInfo.phone.replace(/\s+/g, '')}`} className="focus-ring flex items-center gap-2.5 rounded-md transition-colors hover:text-brand-pink">
                    <Phone className="h-4 w-4 shrink-0 text-brand-pink" />
                    <span>{companyInfo.phone}</span>
                  </Link>
                </div>

                <div className="mt-4 flex flex-wrap gap-2.5 text-xs text-slate-200/85">
                  <p className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/[0.04] px-3 py-1.5">
                    <Clock3 className="h-3.5 w-3.5 text-brand-pink" />
                    <span>Mon - Sat | 9:00 AM - 6:00 PM</span>
                  </p>
                  <p className="inline-flex items-center rounded-full border border-white/16 bg-white/[0.04] px-3 py-1.5">
                    Average Response: Within 24 Hours
                  </p>
                </div>

                <FooterSocials />
              </div>

              <FooterLinks groups={footerNavGroups} />
            </div>

            <FooterBottom />
          </motion.div>
        </div>
      </section>
    </footer>
  );
}
