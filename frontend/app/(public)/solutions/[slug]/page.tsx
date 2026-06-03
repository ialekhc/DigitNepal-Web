import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { companyInfo, solutionsDetailed } from '@/lib/content/site-content';

type SolutionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SolutionDetailPage({ params }: SolutionDetailPageProps) {
  const { slug } = await params;
  const solution = solutionsDetailed.find((item) => item.id === slug);

  if (!solution) {
    notFound();
  }

  const inquiryLink = `${companyInfo.whatsappHref}?text=${encodeURIComponent(
    `Hello Digit Nepal, I would like to inquire about ${solution.name}.`,
  )}`;

  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading eyebrow="[ Solution Detail ]" title={solution.name} description={solution.description} />

      <Card>
        <div className="flex flex-wrap gap-2">
          <Badge>{solution.category}</Badge>
          <Badge variant="muted">{solution.tagline}</Badge>
        </div>
        <p className="mt-4 text-sm text-slate-300/85">{solution.description}</p>
      </Card>

      <Card className="mt-4">
        <h3 className="font-display text-xl font-semibold">Key Features</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {solution.features.map((feature) => (
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
        <div className="flex flex-wrap gap-3">
          <Button asChild magnetic>
            <Link href={inquiryLink} target="_blank" rel="noopener noreferrer">
              Request Inquiry
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/solutions">
              Back to Solutions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
