import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { companyInfo, servicesDetailed } from '@/lib/content/site-content';

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = servicesDetailed.find((item) => item.id === slug);

  if (!service) {
    notFound();
  }

  const inquiryLink = `${companyInfo.whatsappHref}?text=${encodeURIComponent(
    `Hello Digit Nepal, I would like to inquire about ${service.name}.`,
  )}`;

  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading eyebrow="[ Service Detail ]" title={service.name} description={service.description} />

      <Card>
        <div className="flex flex-wrap gap-2">
          <Badge>{service.tagline}</Badge>
        </div>
        <p className="mt-4 text-sm text-slate-300/85">{service.description}</p>
      </Card>

      <Card className="mt-4">
        <h3 className="font-display text-xl font-semibold">Core Offerings</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {service.offerings.map((item) => (
            <Badge key={item} variant="muted">
              {item}
            </Badge>
          ))}
        </div>
      </Card>

      <Card className="mt-4">
        <h3 className="font-display text-xl font-semibold">Benefits</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-300/85">
          {service.benefits.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </Card>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild magnetic>
          <Link href={inquiryLink} target="_blank" rel="noopener noreferrer">
            Request Inquiry
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/services">
            Back to Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
