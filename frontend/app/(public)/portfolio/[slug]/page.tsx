'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useApplications } from '@/hooks/use-public-content';

export default function PortfolioDetailPage() {
  const applicationsQuery = useApplications();
  const params = useParams<{ slug: string }>();
  const slug = typeof params.slug === 'string' ? params.slug : '';

  const project = useMemo(
    () => applicationsQuery.data?.find((item) => item.slug === slug),
    [applicationsQuery.data, slug],
  );

  if (applicationsQuery.isLoading) {
    return (
      <div className="section-wrap py-16 sm:py-20">
        <p className="text-sm text-slate-300/80">Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="section-wrap py-16 sm:py-20">
        <SectionHeading eyebrow="[ Portfolio ]" title="Project Not Found" />
        <Button asChild>
          <Link href="/portfolio">Back to Portfolio</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading eyebrow="[ Portfolio Detail ]" title={project.title} description={project.description} />

      <Card>
        <h3 className="font-display text-xl font-semibold">Project Category</h3>
        <p className="mt-2 text-sm text-slate-300/85">{project.category}</p>
      </Card>

      <Card className="mt-4">
        <h3 className="font-display text-xl font-semibold">Technology Stack</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="muted">
              {tech}
            </Badge>
          ))}
        </div>
      </Card>

      <Card className="mt-4">
        <h3 className="font-display text-xl font-semibold">Screenshots</h3>
        <div className="mt-3 h-44 rounded-lg border border-white/10 bg-[#112147] p-4 text-sm text-slate-300/75">
          Screenshot gallery area (connect media records for this project).
        </div>
      </Card>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.projectLink ? (
          <Button asChild>
            <Link href={project.projectLink} target="_blank" rel="noreferrer">
              Visit Project
            </Link>
          </Button>
        ) : null}
        <Button variant="outline" asChild>
          <Link href="/portfolio">Back to Portfolio</Link>
        </Button>
      </div>
    </div>
  );
}
