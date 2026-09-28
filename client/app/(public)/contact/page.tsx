'use client';

import { motion } from 'framer-motion';
import { Clock4, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';

import { SocialLinks } from '@/components/common/SocialLinks';
import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { fadeUp, slideInLeft, slideInRight, staggerContainer } from '@/lib/motion';
import { companyInfo } from '@/lib/content/site-content';

export default function ContactPage() {
  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading
        eyebrow="[ Contact ]"
        title="Start the Conversation"
        description="Reach Digit Nepal directly by call, WhatsApp, or email and our team will help you move your project forward quickly."
      />

      <div className="grid gap-6 lg:grid-cols-[1.06fr_0.94fr]">
        <motion.div variants={slideInLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Card className="surface overflow-hidden p-0">
            <div className="border-b border-white/12 bg-gradient-to-r from-brand-pink/16 to-transparent px-6 py-5 sm:px-7">
              <h2 className="font-display text-xl font-semibold text-white">Talk to Digit Nepal</h2>
              <p className="mt-1 text-sm text-slate-200/80">Choose the fastest way to connect with our team.</p>
            </div>

            <div className="grid gap-4 p-6 sm:p-7">
              <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.08em] text-brand-pink">Quick Contact</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white">Call or message us directly</h3>
                <p className="mt-2 text-sm text-slate-300/86">
                  For training enrollment, project discussion, service inquiry, or partnership opportunities, contact us directly on phone or WhatsApp.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Button asChild magnetic className="w-full">
                  <Link href={companyInfo.phoneHref}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call {companyInfo.phone}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href={companyInfo.whatsappHref} target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp Us
                  </Link>
                </Button>
              </div>

              <div className="rounded-2xl border border-white/12 bg-white/[0.02] p-5">
                <p className="text-xs uppercase tracking-[0.08em] text-slate-300/75">Best For</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-300/86">
                  <li>Project estimates and consultations</li>
                  <li>Training and workshop enrollment</li>
                  <li>Career and internship inquiries</li>
                  <li>General support and follow-up</li>
                </ul>
              </div>
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
