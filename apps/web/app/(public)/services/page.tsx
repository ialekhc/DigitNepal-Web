import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { serviceCatalog } from '@/lib/data/services-catalog';

const trainingTracks = ['Python', 'Java', 'Flutter', 'UI/UX Design', 'Web Development', 'Digital Skills'];

export default function ServicesPage() {
  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading
        eyebrow="[ Our Services ]"
        title="Software, Strategy, Design, and Training Under One Team"
        description="Digit Nepal delivers modern digital services tailored for startups, businesses, and organizations in growth mode."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {serviceCatalog.map((service) => (
          <Card key={service.slug} className="h-full">
            <h3 className="font-display text-lg font-semibold">{service.title}</h3>
            <p className="mt-2 text-sm text-slate-300/85">{service.description}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <h3 className="font-display text-xl font-semibold">Training & Workshops Focus</h3>
        <p className="mt-2 text-sm text-slate-300/85">
          Industry-focused programs built for students and professionals who want practical digital skills.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {trainingTracks.map((track) => (
            <Badge key={track} variant="muted">
              {track}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}
