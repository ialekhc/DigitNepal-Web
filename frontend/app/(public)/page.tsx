'use client';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Code2,
  Lightbulb,
  Rocket,
  Sparkles,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { AnimatedCounter } from '@/components/common/animated-counter';
import { ContactForm } from '@/components/sections/contact-form';
import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  buttonHoverGlow,
  cardHover,
  fadeIn,
  fadeUp,
  scaleOnHover,
  slideInLeft,
  slideInRight,
  staggerContainer,
} from '@/lib/motion';
import {
  coreServices,
  featuredSolutions,
  homeHero,
  portfolioPreviewProjects,
  testimonialItems,
  trainingPreviewCourses,
  trustStats,
  upcomingEventsPreview,
  whyChooseItems,
} from '@/lib/content/site-content';

const heroFloatingCards = [
  {
    title: 'Scalable Architecture',
    detail: 'Enterprise-grade delivery',
    icon: Code2,
  },
  {
    title: 'Design + Engineering',
    detail: 'Human-centered execution',
    icon: Lightbulb,
  },
  {
    title: 'Launch Velocity',
    detail: 'Fast, secure, reliable',
    icon: Rocket,
  },
] as const;

const portfolioFilters = ['All', 'SaaS', 'Web App', 'Mobile'] as const;

function getDaysUntil(dateLabel: string) {
  const now = new Date();
  const target = new Date(dateLabel);
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function HomePage() {
  const reduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<(typeof portfolioFilters)[number]>('All');
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return portfolioPreviewProjects;
    return portfolioPreviewProjects.filter((project) =>
      project.technologies.some((tech) => tech.toLowerCase().includes(activeFilter.toLowerCase())),
    );
  }, [activeFilter]);

  const nearestEvent = upcomingEventsPreview[0];
  const daysUntilNearest = nearestEvent ? getDaysUntil(nearestEvent.date) : 0;

  return (
    <div className="overflow-hidden">
      <section
        className="relative border-b border-white/10"
        onMouseMove={(event) => {
          if (reduceMotion) return;
          const rect = event.currentTarget.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width - 0.5) * 20;
          const y = ((event.clientY - rect.top) / rect.height - 0.5) * 20;
          setCursor({ x, y });
        }}
      >
        <div className="absolute inset-0 gradient-light" />
        <div className="hero-grid absolute inset-0 opacity-45" />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand-pink/35 blur-[120px]"
          animate={reduceMotion ? undefined : { x: cursor.x * 1.2, y: cursor.y * 1.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-brand-rose/25 blur-[120px]"
          animate={reduceMotion ? undefined : { x: -cursor.x, y: -cursor.y }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="section-wrap relative grid min-h-[78vh] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <motion.div variants={slideInLeft} initial="hidden" animate="show">
            <Badge>[ Digital Excellence Platform ]</Badge>
            <h1 className="mt-6 font-display text-[clamp(2.625rem,8vw,5rem)] font-bold leading-[0.98] text-white">
              Transforming Ideas Into <span className="neon-text">Digital Solutions</span>
            </h1>
            <p className="mt-6 max-w-2xl font-secondary text-[clamp(1rem,2vw,1.125rem)] leading-relaxed text-slate-200/88">
              Helping businesses innovate, scale, and succeed through technology.
            </p>

            <motion.div className="mt-8 flex flex-wrap items-center gap-3" variants={staggerContainer} initial="hidden" animate="show">
              <motion.div variants={buttonHoverGlow} initial="rest" whileHover="hover">
                <Button asChild size="lg" magnetic>
                  <Link href="/contact">
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div variants={scaleOnHover} initial="rest" whileHover="hover">
                <Button variant="outline" size="lg" asChild>
                  <Link href="/services">Explore Services</Link>
                </Button>
              </motion.div>
            </motion.div>

            <div className="mt-9 grid grid-cols-3 gap-3 sm:max-w-xl">
              {trustStats.slice(0, 3).map((item) => (
                <Card key={item.label} className="surface px-4 py-3">
                  <p className="font-display text-xl font-semibold text-white">
                    <AnimatedCounter value={item.value} />
                  </p>
                  <p className="mt-1 text-xs text-slate-300/80">{item.label}</p>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div variants={slideInRight} initial="hidden" animate="show" className="relative">
            <div className="surface relative overflow-hidden p-5 sm:p-7">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-white/90">Digit Nepal Delivery Snapshot</p>
                <Sparkles className="h-4 w-4 text-brand-pink" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {heroFloatingCards.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      className="rounded-2xl border border-white/15 bg-white/[0.04] p-4"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      style={reduceMotion ? undefined : { transform: `translate3d(${cursor.x * (index + 1) * 0.24}px, ${cursor.y * (index + 1) * 0.2}px, 0)` }}
                    >
                      <Icon className="h-4 w-4 text-brand-pink" />
                      <p className="mt-2 text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-300/80">{item.detail}</p>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-4 rounded-2xl border border-white/12 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-300/70">Current Focus</p>
                <p className="mt-1 text-sm text-slate-100">Software Platforms • Enterprise Systems • Professional Training</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-wrap py-16 sm:py-20">
        <SectionHeading
          eyebrow="[ Trust & Metrics ]"
          title="Performance Metrics That Build Confidence"
          description="Measured by outcomes, reliability, and long-term client partnerships."
        />
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {trustStats.map((item) => (
            <motion.div key={item.label} variants={fadeUp}>
              <Card interactive className="surface h-full">
                <p className="text-xs uppercase tracking-[0.08em] text-slate-300/75">{item.label}</p>
                <p className="mt-3 font-display text-4xl font-semibold text-white">
                  <AnimatedCounter value={item.value} />
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="section-wrap pb-16 sm:pb-20">
        <SectionHeading
          eyebrow="[ Services ]"
          title="Services Engineered for Growth"
          description="A premium execution model from strategy and design to software delivery and optimization."
        />
        <motion.div
          className="grid gap-4 md:grid-cols-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {coreServices.map((service, index) => (
            <motion.article
              key={service.slug}
              variants={fadeUp}
              whileHover="hover"
              initial="rest"
              className={index === 0 || index === 3 ? 'md:col-span-3' : 'md:col-span-2'}
            >
              <motion.div variants={cardHover}>
                <Card interactive className="surface h-full p-6">
                  <p className="text-xs uppercase tracking-[0.08em] text-brand-pink">0{index + 1}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-2 font-secondary text-sm leading-relaxed text-slate-300/85">{service.shortDescription}</p>
                </Card>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="section-wrap pb-16 sm:pb-20">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div variants={slideInLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <SectionHeading
              eyebrow="[ Solutions ]"
              title="Industry Solutions That Launch Faster"
              description="Purpose-built digital products designed for operational clarity, scale, and measurable ROI."
              className="mb-0"
            />
            <div className="mt-6 space-y-3">
              {featuredSolutions.slice(0, 4).map((solution) => (
                <Card key={solution.slug} interactive className="surface p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-base font-semibold text-white">{solution.title}</h3>
                      <p className="mt-1 text-sm text-slate-300/85">{solution.description}</p>
                    </div>
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-pink" />
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div variants={slideInRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Card className="surface overflow-hidden p-0">
              <div className="relative h-[22rem] bg-gradient-to-br from-[#0d1a3b] via-[#101e46] to-[#0c1634] p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,45,111,0.18),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(199,37,104,0.2),transparent_40%)]" />
                <div className="relative z-10">
                  <p className="kicker w-fit">Solutions Snapshot</p>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-white">Operational Intelligence Layer</h3>
                  <p className="mt-3 max-w-[32rem] text-sm text-slate-200/85">
                    From restaurant POS to ERP and citizen-facing systems, Digit Nepal builds resilient platforms for mission-critical operations.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {featuredSolutions.slice(0, 4).map((solution) => (
                      <div key={solution.slug} className="rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2 text-xs text-slate-100/92">
                        {solution.title}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="section-wrap pb-16 sm:pb-20">
        <SectionHeading
          eyebrow="[ Portfolio ]"
          title="Selected Project Outcomes"
          description="Interactive project snapshots demonstrating capability, execution quality, and business impact."
        />
        <div className="mb-5 flex flex-wrap gap-2">
          {portfolioFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition duration-300 ease-premium',
                activeFilter === filter
                  ? 'border-brand-pink/45 bg-brand-pink/18 text-brand-pink'
                  : 'border-white/15 bg-white/[0.02] text-slate-300 hover:border-white/30 hover:text-white',
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={fadeIn}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid gap-4 lg:grid-cols-2"
          >
            {filteredProjects.map((project) => (
              <motion.article key={project.name} initial="rest" whileHover="hover" variants={cardHover}>
                <Card interactive className="surface overflow-hidden p-0">
                  <div className="relative h-44 overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#0a1736] to-[#0f224c]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,45,111,0.18),transparent_45%)] transition duration-500 group-hover:scale-110" />
                    <div className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-[#050816]/75 px-3 py-1 text-xs text-slate-100">
                      {project.industry}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-semibold text-white">{project.name}</h3>
                    <p className="mt-1 text-sm text-slate-300/85">Technology Stack</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="rounded-full border border-white/15 bg-white/[0.03] px-2.5 py-1 text-xs text-slate-200 transition hover:border-brand-pink/35 hover:text-brand-pink">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="section-wrap pb-16 sm:pb-20">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="surface p-6 sm:p-7">
            <SectionHeading
              eyebrow="[ Training + Events ]"
              title="Learning and Community Programs"
              description="Training programs and events designed to build Nepal's next generation of technology talent."
              className="mb-6"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                {trainingPreviewCourses.map((course) => (
                  <div key={course} className="rounded-2xl border border-white/12 bg-white/[0.03] px-4 py-3 transition hover:border-brand-pink/35">
                    <p className="font-display text-sm font-semibold text-white">{course}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/15 bg-gradient-to-b from-brand-pink/16 to-transparent p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-brand-pink">Next Event Countdown</p>
                <p className="mt-2 font-display text-4xl font-semibold text-white">{daysUntilNearest}</p>
                <p className="text-sm text-slate-200/85">days until {nearestEvent?.name}</p>
                <p className="mt-4 text-xs text-slate-300/80">{nearestEvent?.date}</p>
                <p className="text-xs text-slate-300/80">{nearestEvent?.location}</p>
                <Button className="mt-5" variant="outline" asChild>
                  <Link href="/events">
                    View Events
                    <CalendarClock className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>

          <Card className="surface p-6 sm:p-7">
            <p className="kicker w-fit">Why Digit Nepal</p>
            <div className="mt-5 space-y-3">
              {whyChooseItems.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/12 bg-white/[0.02] p-4">
                  <h3 className="font-display text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-300/85">{item.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="section-wrap pb-16 sm:pb-20">
        <SectionHeading
          eyebrow="[ Testimonials ]"
          title="Trusted by Organizations and Learners"
        />
        <motion.div className="grid gap-4 md:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          {testimonialItems.map((item) => (
            <motion.div key={item.name} variants={fadeUp}>
              <Card interactive className="surface h-full">
                <div className="mb-4 flex items-center gap-1 text-amber-300">
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <Star key={`${item.name}-${idx}`} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="font-secondary text-sm leading-relaxed text-slate-200/90">“{item.review}”</p>
                <p className="mt-4 font-display text-base font-semibold text-white">{item.name}</p>
                <p className="text-xs text-slate-300/80">{item.company}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="section-wrap pb-16 sm:pb-20">
        <Card className="surface border-brand-pink/30 bg-gradient-to-r from-brand-pink/18 via-transparent to-brand-rose/12 p-8 sm:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-3xl">
              <p className="kicker w-fit">Final CTA</p>
              <h3 className="mt-4 font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.08] text-white">
                Ready to Build Something Amazing?
              </h3>
              <p className="mt-3 max-w-2xl text-sm text-slate-200/88">
                Let&apos;s discuss how Digit Nepal can accelerate your business goals with technology and execution excellence.
              </p>
            </div>
            <motion.div variants={buttonHoverGlow} initial="rest" whileHover="hover">
              <Button size="lg" asChild magnetic>
                <Link href="/contact">Start Your Project</Link>
              </Button>
            </motion.div>
          </div>
        </Card>
      </section>

      <section id="contact" className="section-wrap pb-20">
        <SectionHeading
          eyebrow="[ Contact ]"
          title="Let&apos;s Design Your Next Competitive Advantage"
          description="Share your goals, scope, and timeline. We will map a clear, scalable delivery plan."
        />
        <Card className="surface p-6 sm:p-8">
          <ContactForm />
        </Card>
      </section>
    </div>
  );
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}
