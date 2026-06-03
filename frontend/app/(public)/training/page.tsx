'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, BookOpenCheck, GraduationCap, Sparkles, Trophy } from 'lucide-react';
import Link from 'next/link';

import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { fadeUp, slideInLeft, slideInRight, staggerContainer } from '@/lib/motion';
import { companyInfo, trainingContent } from '@/lib/content/site-content';

const learningJourney = [
  {
    title: 'Foundation + Context',
    detail: 'Build solid fundamentals with industry context and guided mentorship.',
  },
  {
    title: 'Hands-On Delivery',
    detail: 'Learn through practical assignments, project reviews, and live implementation.',
  },
  {
    title: 'Career Readiness',
    detail: 'Graduate with portfolio work, certification, and interview-focused confidence.',
  },
] as const;

const outcomes = [
  { label: 'Course Tracks', value: `${trainingContent.courses.length}+` },
  { label: 'Mentor-Led Sessions', value: 'Live Weekly' },
  { label: 'Learning Model', value: 'Project First' },
] as const;

const pillars = [
  { title: 'Workshops', items: trainingContent.workshops, icon: Sparkles },
  { title: 'Certification', items: trainingContent.certifications, icon: BadgeCheck },
  { title: 'Student Success', items: trainingContent.studentSuccess, icon: Trophy },
] as const;

export default function TrainingPage() {
  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading
        eyebrow="[ Training ]"
        title="Career-Focused Learning Built for Real Product Work"
        description="Digit Nepal training programs are designed to move learners from theory to implementation with mentor support, practical assignments, and portfolio outcomes."
      />

      <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
        <motion.div variants={slideInLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Card className="surface h-full">
            <p className="kicker w-fit">
              <GraduationCap className="h-3.5 w-3.5" />
              Learning Journey
            </p>
            <div className="mt-5 space-y-3">
              {learningJourney.map((item, index) => (
                <div key={item.title} className="rounded-2xl border border-white/12 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-brand-pink">Step {index + 1}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-300/85">{item.detail}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={slideInRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Card className="surface h-full overflow-hidden p-0">
            <div className="border-b border-white/12 bg-gradient-to-r from-brand-pink/16 to-transparent px-6 py-5">
              <h2 className="font-display text-2xl font-semibold text-white">Training Outcomes</h2>
              <p className="mt-1 text-sm text-slate-300/86">
                Structured tracks for students, career switchers, and working professionals.
              </p>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-3">
              {outcomes.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/12 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-slate-300/75">{item.label}</p>
                  <p className="mt-2 font-display text-lg font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="px-6 pb-6">
              <div className="rounded-2xl border border-white/12 bg-white/[0.02] p-4">
                <p className="text-sm text-slate-200/88">
                  Courses include practical labs, mentor feedback, and project checkpoints to validate progress.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="muted">Hands-On Projects</Badge>
                  <Badge variant="muted">Mentor Reviews</Badge>
                  <Badge variant="muted">Career Guidance</Badge>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <SectionHeading className="mt-12" eyebrow="[ Courses ]" title="Professional Course Tracks" />

      <motion.div
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {trainingContent.courses.map((course, index) => (
          <motion.article key={course.title} variants={fadeUp}>
            <Card interactive className="surface h-full">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-brand-pink">Track {String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-white">{course.title}</h3>
                </div>
                <BookOpenCheck className="h-5 w-5 text-brand-pink" />
              </div>

              <div className="mt-4 grid gap-2 text-sm text-slate-300/85">
                <p><span className="text-slate-200/95">Duration:</span> {course.duration}</p>
                <p><span className="text-slate-200/95">Level:</span> {course.level}</p>
                <p><span className="text-slate-200/95">Fee:</span> {course.fee}</p>
                <p><span className="text-slate-200/95">Instructor:</span> {course.instructor}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Badge variant="muted">Practical Labs</Badge>
                <Badge variant="muted">Portfolio Build</Badge>
              </div>

              <Button className="mt-5 w-full" asChild magnetic>
                <Link href={companyInfo.whatsappHref} target="_blank" rel="noreferrer">
                  Enroll Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="mt-10 grid gap-5 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <motion.article key={pillar.title} variants={fadeUp}>
              <Card className="surface h-full">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-brand-pink" />
                  <h3 className="font-display text-lg font-semibold text-white">{pillar.title}</h3>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-300/86">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-pink" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.article>
          );
        })}
      </motion.div>

      <Card className="surface mt-10 border-brand-pink/30 bg-gradient-to-r from-brand-pink/16 to-transparent">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="kicker w-fit">Enrollment Open</p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-white">
              Ready to accelerate your digital career?
            </h3>
            <p className="mt-1 text-sm text-slate-300/86">
              Talk to our training team to choose the right track based on your goals and current skill level.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild magnetic>
              <Link href={companyInfo.phoneHref}>Call for Enrollment</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={companyInfo.whatsappHref} target="_blank" rel="noreferrer">
                Explore Workshops
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
