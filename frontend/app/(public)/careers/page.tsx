import { CareerApplicationForm } from '@/components/sections/career-application-form';
import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { careersContent } from '@/lib/content/site-content';

export default function CareersPage() {
  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading
        eyebrow="[ Careers ]"
        title="Build Your Career with Digit Nepal"
        description="Explore open roles, internship tracks, and a growth-driven company culture."
      />

      <SectionHeading className="mt-10" eyebrow="[ Open Positions ]" title="Current Opportunities" />
      <div className="grid gap-4 md:grid-cols-2">
        {careersContent.openPositions.map((job) => (
          <Card key={job.title}>
            <h3 className="font-display text-lg font-semibold">{job.title}</h3>
            <p className="mt-2 text-sm text-slate-300/85">Department: {job.department}</p>
            <p className="mt-1 text-sm text-slate-300/85">Experience: {job.experience}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="font-display text-lg font-semibold">Internship Programs</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300/85">
            {careersContent.internshipPrograms.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h3 className="font-display text-lg font-semibold">Company Culture</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300/85">
            {careersContent.companyCulture.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="muted">Team Events</Badge>
            <Badge variant="muted">Learning Culture</Badge>
            <Badge variant="muted">Growth Opportunities</Badge>
          </div>
        </Card>
      </div>

      <SectionHeading className="mt-10" eyebrow="[ Apply Now ]" title="Submit Your Application" />
      <Card>
        <CareerApplicationForm />
      </Card>
    </div>
  );
}
