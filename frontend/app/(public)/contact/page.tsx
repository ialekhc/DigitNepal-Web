'use client';

import { motion } from 'framer-motion';
import { Clock4, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

import { SocialLinks } from '@/components/common/SocialLinks';
import { ContactForm } from '@/components/sections/contact-form';
import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { fadeUp, slideInLeft, slideInRight, staggerContainer } from '@/lib/motion';
import { companyInfo } from '@/lib/content/site-content';

export default function ContactPage() {
  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading
        eyebrow="[ Contact ]"
        title="Start the Conversation"
        description="Tell us what you are building and our team will shape a clear roadmap with delivery milestones, technical scope, and launch guidance."
      />

      <div className="grid gap-6 lg:grid-cols-[1.06fr_0.94fr]">
        <motion.div variants={slideInLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Card className="surface overflow-hidden p-0">
            <div className="border-b border-white/12 bg-gradient-to-r from-brand-pink/16 to-transparent px-6 py-5 sm:px-7">
              <h2 className="font-display text-xl font-semibold text-white">Project Brief</h2>
              <p className="mt-1 text-sm text-slate-200/80">Complete the form and we will reply within 24 hours.</p>
            </div>
            <div className="p-6 sm:p-7">
              <ContactForm />
            </div>
          </Card>
        </motion.div>

        <motion.div
          className="space-y-6"
          variants={slideInRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div
            className="grid gap-4 sm:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp}>
              <Card interactive className="surface h-full">
                <Phone className="h-4 w-4 text-brand-pink" />
                <p className="mt-3 text-xs uppercase tracking-[0.08em] text-slate-300/75">Phone</p>
                <p className="mt-1 text-sm font-semibold text-white">{companyInfo.phone}</p>
              </Card>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Card interactive className="surface h-full">
                <Mail className="h-4 w-4 text-brand-pink" />
                <p className="mt-3 text-xs uppercase tracking-[0.08em] text-slate-300/75">Email</p>
                <Link
                  href={`mailto:${companyInfo.email}`}
                  className="mt-1 block text-sm font-semibold text-white hover:text-brand-pink"
                >
                  {companyInfo.email}
                </Link>
              </Card>
            </motion.div>
          </motion.div>

          <Card className="surface">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 text-brand-pink" />
              <div>
                <h3 className="font-display text-lg font-semibold text-white">Visit Our Office</h3>
                <p className="mt-1 text-sm text-slate-300/85">{companyInfo.name}</p>
                <p className="text-sm text-slate-300/85">{companyInfo.address}</p>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl3 border border-white/12">
              <iframe
                src="https://maps.google.com/maps?q=Balkot%2C%20Bhaktapur%2C%20Nepal&z=14&output=embed"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Digit Nepal office location"
              />
            </div>
          </Card>

          <Card className="surface">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-semibold text-white">Connect With Digit Nepal</h3>
                <p className="mt-1 text-sm text-slate-300/85">
                  Follow us for project stories, events, and technology updates.
                </p>
              </div>
              <Badge variant="muted">
                <Clock4 className="mr-1 h-3.5 w-3.5" />
                Mon - Sat
              </Badge>
            </div>

            <div className="mt-4">
              <SocialLinks
                mode="icon-label"
                layout="vertical"
                showDescription
                showTooltips={false}
                className="max-w-none"
              />
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
