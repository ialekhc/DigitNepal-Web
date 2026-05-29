import { notFound } from 'next/navigation';

import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { servicesDetailed } from '@/lib/content/site-content';

function toSlug(value: string) {
  return value.toLowerCase().replace(/\s+/g, '-');
}

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = servicesDetailed.find((item) => toSlug(item.title) === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading eyebrow="[ Service Detail ]" title={service.title} description={service.overview} />

      <Card>
        <h3 className="font-display text-xl font-semibold">Benefits</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-300/85">
          {service.benefits.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </Card>

      <Card className="mt-4">
        <h3 className="font-display text-xl font-semibold">Process</h3>
        <p className="mt-3 text-sm text-slate-300/85">{service.process.join(' → ')}</p>
      </Card>

      <Card className="mt-4">
        <h3 className="font-display text-xl font-semibold">Technologies</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {service.technologies.map((tech) => (
            <Badge key={tech} variant="muted">
              {tech}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}
