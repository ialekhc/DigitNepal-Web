import { notFound } from 'next/navigation';
import Link from 'next/link';

import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { solutionsDetailed } from '@/lib/content/site-content';

function toSlug(value: string) {
  return value.toLowerCase().replace(/\s+/g, '-');
}

type SolutionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SolutionDetailPage({ params }: SolutionDetailPageProps) {
  const { slug } = await params;
  const solution = solutionsDetailed.find((item) => toSlug(item.title) === slug);

  if (!solution) {
    notFound();
  }

  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading eyebrow="[ Solution Detail ]" title={solution.title} description={solution.overview} />

      <Card>
        <h3 className="font-display text-xl font-semibold">Problem Statement</h3>
        <p className="mt-3 text-sm text-slate-300/85">{solution.problem}</p>
      </Card>

      <Card className="mt-4">
        <h3 className="font-display text-xl font-semibold">Key Features</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {solution.keyFeatures.map((feature) => (
            <Badge key={feature} variant="muted">
              {feature}
            </Badge>
          ))}
        </div>
      </Card>

      <Card className="mt-4">
        <h3 className="font-display text-xl font-semibold">Benefits</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-300/85">
          {solution.benefits.map((benefit) => (
            <li key={benefit}>- {benefit}</li>
          ))}
        </ul>
      </Card>

      <div className="mt-6">
        <Button asChild>
          <Link href="/contact">Request Demo</Link>
        </Button>
      </div>
    </div>
  );
}
