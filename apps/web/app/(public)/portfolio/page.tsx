import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const categories = [
  'Mobile Applications',
  'Web Applications',
  'SaaS Platforms',
  'Management Systems',
  'E-Commerce Platforms',
  'Educational Platforms',
  'UI/UX Projects',
  'Branding Projects',
];

const featuredProjects = [
  {
    title: 'Multi-Vendor POS SaaS Platform',
    description:
      'A scalable SaaS-based POS and inventory management system with multi-tenant architecture, analytics, and real-time operations.',
  },
  {
    title: 'Hospital Management System',
    description:
      'A complete patient registration and medical records platform designed for hospitals and clinics.',
  },
  {
    title: 'Hotel Booking Platform',
    description:
      'A modern booking and reservation platform with role-based management and integrated booking workflows.',
  },
  {
    title: 'Complaint Management System',
    description:
      'A digital complaint handling platform designed for organizations and public service sectors.',
  },
];

export default function PortfolioPage() {
  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading
        eyebrow="[ Our Projects & Applications ]"
        title="Scalable Digital Products Designed for Real-World Impact"
        description="From SaaS platforms to enterprise systems, we design and deliver solutions that solve real business challenges."
      />

      <Card>
        <h3 className="font-display text-xl font-semibold">Showcase Categories</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge key={category} variant="muted">
              {category}
            </Badge>
          ))}
        </div>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <Card key={project.title}>
            <h3 className="font-display text-lg font-semibold">{project.title}</h3>
            <p className="mt-2 text-sm text-slate-300/85">{project.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
