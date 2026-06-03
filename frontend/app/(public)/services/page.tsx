'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Layers3, Network, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { fadeUp, slideInLeft, slideInRight, staggerContainer } from '@/lib/motion';
import { companyInfo, servicesDetailed } from '@/lib/content/site-content';

const serviceSignals = [
  { title: 'Scalable Architecture', icon: Layers3 },
  { title: 'Integration Ready', icon: Network },
  { title: 'Secure by Design', icon: ShieldCheck },
] as const;

export default function ServicesPage() {
  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading
        eyebrow="[ Services ]"
        title="Capability Stack for Modern Digital Growth"
        description="We deliver strategy, design, engineering, and optimization as one integrated service model."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_0.96fr]">
        <motion.div variants={slideInLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Card className="surface h-full overflow-hidden p-0">
            <div className="border-b border-white/12 bg-gradient-to-r from-brand-pink/15 to-transparent px-6 py-5">
              <h2 className="font-display text-2xl font-semibold text-white">How We Deliver</h2>
              <p className="mt-1 text-sm text-slate-300/85">
                Every engagement is outcome-driven, measured by reliability, usability, and growth impact.
              </p>
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-3">
              {serviceSignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <div key={signal.title} className="rounded-2xl border border-white/12 bg-white/[0.03] p-4">
                    <Icon className="h-4 w-4 text-brand-pink" />
                    <p className="mt-2 text-sm font-semibold text-white">{signal.title}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={slideInRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Card className="surface h-full">
            <p className="kicker w-fit">Engagement Modes</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-white/12 bg-white/[0.02] p-4">
                <h3 className="font-display text-lg font-semibold text-white">Project-Based Delivery</h3>
                <p className="mt-1 text-sm text-slate-300/85">Defined scope, milestone-driven execution, and launch support.</p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/[0.02] p-4">
                <h3 className="font-display text-lg font-semibold text-white">Dedicated Product Team</h3>
                <p className="mt-1 text-sm text-slate-300/85">Cross-functional team embedded for long-term product velocity.</p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/[0.02] p-4">
                <h3 className="font-display text-lg font-semibold text-white">Consulting + Execution</h3>
                <p className="mt-1 text-sm text-slate-300/85">Strategy, architecture, and implementation guidance in one pipeline.</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {servicesDetailed.map((service, index) => (
          <motion.article key={service.id} variants={fadeUp}>
            <Card id={service.id} className="surface flex h-full flex-col">
              <div>
                <p className="text-xs uppercase tracking-[0.08em] text-brand-pink">
                  Service {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white">{service.name}</h3>
                <p className="mt-3 text-sm font-semibold text-accent-cyan">{service.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-300/88">{service.description}</p>
              </div>

              <div className="mt-5 rounded-2xl border border-white/12 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.08em] text-slate-300/75">Key Benefits</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-300/86">
                  {service.benefits.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-pink" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <p className="text-xs uppercase tracking-[0.08em] text-slate-300/75">Core Offerings</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {service.offerings.slice(0, 4).map((offering) => (
                    <Badge key={offering} variant="muted">{offering}</Badge>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6">
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <Link href={`/services/${service.id}`}>
                    Explore More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          </motion.article>
        ))}
      </motion.div>

      <Card className="surface mt-10 border-brand-pink/30 bg-gradient-to-r from-brand-pink/16 to-transparent">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="kicker w-fit">
              <Sparkles className="h-3.5 w-3.5" />
              Strategic Engagement
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-white">Need a tailored service combination?</h3>
            <p className="mt-1 text-sm text-slate-300/86">We can map your goals into a phased execution plan and team model.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild magnetic>
              <Link href={companyInfo.phoneHref}>Start Your Project</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/solutions">
                Explore Solutions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
