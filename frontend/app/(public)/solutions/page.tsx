'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, CircleCheckBig, Puzzle, Shield } from 'lucide-react';
import Link from 'next/link';

import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { fadeUp, slideInLeft, slideInRight, staggerContainer } from '@/lib/motion';
import { solutionsDetailed } from '@/lib/content/site-content';

function toSlug(value: string) {
  return value.toLowerCase().replace(/\s+/g, '-');
}

const framework = [
  { title: 'Problem Mapping', detail: 'We map operational friction, stakeholders, and outcome goals.', icon: Puzzle },
  { title: 'Solution Architecture', detail: 'We design secure, scalable systems with measurable delivery phases.', icon: Shield },
  { title: 'Impact Optimization', detail: 'We track adoption, metrics, and ROI for continuous improvement.', icon: BarChart3 },
] as const;

export default function SolutionsPage() {
  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading
        eyebrow="[ Solutions ]"
        title="Digital Products for Industry-Specific Challenges"
        description="Each solution is designed to solve real workflow pain points with scalable architecture and clear business value."
      />

      <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div variants={slideInLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Card className="surface h-full">
            <p className="kicker w-fit">Delivery Framework</p>
            <div className="mt-5 space-y-3">
              {framework.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-white/12 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-brand-pink" />
                      <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="mt-1 text-sm text-slate-300/86">{item.detail}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={slideInRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Card className="surface h-full overflow-hidden p-0">
            <div className="border-b border-white/12 bg-gradient-to-r from-brand-pink/15 to-transparent px-6 py-5">
              <h2 className="font-display text-2xl font-semibold text-white">Why Our Solutions Work</h2>
              <p className="mt-1 text-sm text-slate-300/85">
                Domain-specific design, high reliability, and measurable adoption across teams.
              </p>
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.08em] text-slate-300/75">Deployment Readiness</p>
                <p className="mt-2 text-xl font-semibold text-white">Production First</p>
                <p className="mt-1 text-sm text-slate-300/82">Built with security, scalability, and maintainability in mind.</p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.08em] text-slate-300/75">Adoption Model</p>
                <p className="mt-2 text-xl font-semibold text-white">Workflow Aligned</p>
                <p className="mt-1 text-sm text-slate-300/82">Designed around operational behavior and real user journeys.</p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-4 sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.08em] text-slate-300/75">Support + Evolution</p>
                <p className="mt-1 text-sm text-slate-300/82">Post-launch support, optimization cycles, and feature evolution.</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        className="mt-10 grid gap-5"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {solutionsDetailed.map((solution, index) => (
          <motion.article key={solution.title} variants={fadeUp}>
            <Card id={toSlug(solution.title)} className="surface">
              <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-brand-pink">Solution {String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-white">{solution.title}</h3>
                  <p className="mt-4 text-xs uppercase tracking-[0.08em] text-slate-300/75">Problem Statement</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300/88">{solution.problem}</p>

                  <p className="mt-4 text-xs uppercase tracking-[0.08em] text-slate-300/75">Solution Overview</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300/88">{solution.overview}</p>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.08em] text-slate-300/75">Key Features</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {solution.keyFeatures.map((feature) => (
                        <Badge key={feature} variant="muted">{feature}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.08em] text-slate-300/75">Business Benefits</p>
                    <ul className="mt-3 space-y-2">
                      {solution.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm text-slate-300/88">
                          <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-brand-pink" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/12 bg-gradient-to-r from-white/[0.04] to-transparent p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-slate-200/88">Need this solution tailored for your organization?</p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" asChild magnetic>
                      <Link href="/contact">Request Demo</Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/solutions/${toSlug(solution.title)}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
