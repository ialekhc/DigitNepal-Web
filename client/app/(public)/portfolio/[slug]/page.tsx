import Link from 'next/link';
import { notFound } from 'next/navigation';

import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { fallbackApplications } from '@/lib/data/fallback';

type PortfolioDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;
  const project = fallbackApplications.find((item) => item.slug === slug);

  if (!project) {
    notFound();
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
          Screenshot gallery area reserved for future frontend image showcase.
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
