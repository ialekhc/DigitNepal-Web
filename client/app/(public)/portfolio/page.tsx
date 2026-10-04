import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';

import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { fallbackApplications } from '@/lib/data/fallback';

const caseStudies = [
  {
    title: 'DokoMandu: Connected Food Delivery',
    challenge: 'Customers, vendors, and delivery partners each need focused workflows that still share one service journey.',
    solution: 'A multi-sided platform with dedicated customer, vendor, and delivery experiences.',
    implementation: 'Flutter mobile development, API integration, location and notification workflows.',
    results: 'A connected product ecosystem designed around discovery, ordering, pickup, delivery, and service updates.',
  },
  {
    title: 'Restaurant-POS: Practical Operations',
    challenge: 'Disconnected billing and order processes slow service and make kitchen coordination harder.',
    solution: 'A centralized operations system for front-of-house and back-of-house workflows.',
    implementation: 'POS billing, menu administration, kitchen support, role-based access, and reporting.',
    results: 'Clearer handoff from the counter to the kitchen with stronger management visibility.',
  },
  {
    title: 'Healthcare Management Systems',
    challenge: 'Specialty clinics need reliable records, appointments, billing, and follow-up workflows in one place.',
    solution: 'Clinic-focused platforms for cardiology and eye-care practices with room for specialty modules.',
    implementation: 'Patient registration, visit history, examination records, prescriptions, billing, and controlled access.',
    results: 'More consistent administrative workflows and easier retrieval across the patient-service journey.',
  },
] as const;

const clientStories = [
  'Business need first: each project is presented around the operational problem, solution direction, and workflow being improved.',
  'Ongoing development is normal: active products are managed, tested, and refined as requirements and usage evolve.',
] as const;

const successMetrics = [
  { label: 'Current Projects', value: '6' },
  { label: 'Capability Areas', value: '6' },
  { label: 'Delivery Stages', value: '6' },
  { label: 'Portfolio Year', value: '2026' },
] as const;

export default function PortfolioPage() {
  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading
        eyebrow="[ Portfolio ]"
        title="Selected Digital Products and Platforms"
        description="A current view of the systems Digit Nepal is building, managing, and improving across business operations, mobile platforms, restaurant technology, HR, and HealthTech."
      />

      <Card className="mt-8 border-brand-pink/25 bg-brand-pink/[0.08]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="kicker w-fit">2026 Company Portfolio</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-white">Explore the full portfolio overview</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300/85">
              Read the complete project context, delivery model, technology approach, and current development focus in the official portfolio document.
            </p>
          </div>
          <Button asChild className="shrink-0">
            <a href="/documents/digitnepal-portfolio.pdf" target="_blank" rel="noreferrer">
              Download Portfolio <Download className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </Card>

      <SectionHeading className="mt-10" eyebrow="[ Projects ]" title="Current Project Portfolio" />
      <div className="grid gap-4 md:grid-cols-2">
        {fallbackApplications.map((project) => (
          <Card key={project.id}>
            <h3 className="font-display text-lg font-semibold">{project.title}</h3>
            <p className="mt-2 text-sm text-slate-300/85">{project.description}</p>
            <p className="mt-3 text-xs text-slate-300/75">Technology Stack: {project.technologies.join(', ')}</p>
            <Badge variant="muted" className="mt-4">Active Development</Badge>
            <div className="mt-4">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/portfolio/${project.slug}`}>View Details</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <SectionHeading className="mt-10" eyebrow="[ Case Studies ]" title="How We Solve Complex Business Challenges" />
      <div className="space-y-4">
        {caseStudies.map((study) => (
          <Card key={study.title}>
            <h3 className="font-display text-xl font-semibold">{study.title}</h3>
            <div className="mt-3 grid gap-3 text-sm text-slate-300/85 md:grid-cols-2">
              <p>
                <span className="font-semibold text-slate-100">Challenge:</span> {study.challenge}
              </p>
              <p>
                <span className="font-semibold text-slate-100">Solution:</span> {study.solution}
              </p>
              <p>
                <span className="font-semibold text-slate-100">Implementation:</span> {study.implementation}
              </p>
              <p>
                <span className="font-semibold text-slate-100">Results:</span> {study.results}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <SectionHeading className="mt-10" eyebrow="[ Client Stories ]" title="Voice of Our Clients" />
      <div className="grid gap-4 md:grid-cols-2">
        {clientStories.map((story) => (
          <Card key={story}>
            <p className="text-sm text-slate-300/90">{story}</p>
          </Card>
        ))}
      </div>

      <SectionHeading className="mt-10" eyebrow="[ Success Metrics ]" title="Measured Impact" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {successMetrics.map((metric) => (
          <Card key={metric.label}>
            <p className="font-display text-3xl font-semibold">{metric.value}</p>
            <Badge className="mt-2">{metric.label}</Badge>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/contact">
            Discuss a Similar Project <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
