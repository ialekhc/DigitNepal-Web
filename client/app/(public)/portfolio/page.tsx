import Link from 'next/link';

import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { fallbackApplications } from '@/lib/data/fallback';

const caseStudies = [
  {
    title: 'Retail POS Transformation',
    challenge: 'Disconnected billing and inventory operations across branches.',
    solution: 'Built a multi-tenant POS + inventory platform with centralized analytics.',
    implementation: 'Next.js, NestJS, Prisma, PostgreSQL, role-based dashboards.',
    results: 'Reduced billing time by 40% and improved inventory visibility by 60%.',
  },
  {
    title: 'Clinic Digital Workflow',
    challenge: 'Manual patient records and appointment handling.',
    solution: 'Delivered a healthcare operations system with appointment and record modules.',
    implementation: 'React, NestJS, PostgreSQL, secure auth and audit-ready workflows.',
    results: 'Faster patient onboarding and improved appointment reliability.',
  },
] as const;

const clientStories = [
  '“Digit Nepal helped us modernize operations in less than 3 months with strong technical guidance.”',
  '“The team understood our business process deeply and converted it into a practical digital platform.”',
] as const;

const successMetrics = [
  { label: 'Projects Completed', value: '100+' },
  { label: 'Clients Served', value: '50+' },
  { label: 'Revenue Impacted', value: 'NPR 100M+' },
  { label: 'User Growth', value: '3x Average' },
] as const;

export default function PortfolioPage() {
  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading
        eyebrow="[ Portfolio ]"
        title="Projects, Case Studies, and Success Metrics"
        description="A practical track record of software systems delivered for real operational impact."
      />

      <SectionHeading className="mt-10" eyebrow="[ Projects ]" title="Completed Work" />
      <div className="grid gap-4 md:grid-cols-2">
        {fallbackApplications.map((project) => (
          <Card key={project.id}>
            <h3 className="font-display text-lg font-semibold">{project.title}</h3>
            <p className="mt-2 text-sm text-slate-300/85">{project.description}</p>
            <p className="mt-3 text-xs text-slate-300/75">Technology Stack: {project.technologies.join(', ')}</p>
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
    </div>
  );
}
