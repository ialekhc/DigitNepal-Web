import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const upcomingEvents = [
  {
    title: 'Flutter Mobile App Development Bootcamp',
    description: 'Learn real-world mobile app development using Flutter and Firebase.',
  },
  {
    title: 'UI/UX Design Workshop',
    description: 'Master modern UI/UX principles, Figma workflows, and design systems.',
  },
  {
    title: 'Python for Beginners',
    description: 'An industry-focused Python training program designed for students and beginners.',
  },
];

const completedEvents = [
  {
    title: 'Tech Career Orientation Program',
    description:
      'A career-focused session introducing students to modern technology fields and opportunities.',
  },
  {
    title: 'Web Development Workshop',
    description: 'Hands-on practical training covering frontend and backend web technologies.',
  },
];

export default function EventsPage() {
  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading
        eyebrow="[ Events & Workshops ]"
        title="Practical Learning Experiences for Students and Professionals"
        description="Digit Nepal regularly organizes workshops, training programs, tech bootcamps, and educational events to help learners build practical digital skills."
      />

      <SectionHeading className="mt-10" eyebrow="[ Upcoming Events ]" title="Join Our Next Learning Sessions" />
      <div className="grid gap-4 md:grid-cols-2">
        {upcomingEvents.map((event) => (
          <Card key={event.title}>
            <Badge>UPCOMING</Badge>
            <h3 className="mt-3 font-display text-lg font-semibold">{event.title}</h3>
            <p className="mt-2 text-sm text-slate-300/85">{event.description}</p>
          </Card>
        ))}
      </div>

      <SectionHeading className="mt-10" eyebrow="[ Completed Events ]" title="Highlights from Previous Programs" />
      <div className="grid gap-4 md:grid-cols-2">
        {completedEvents.map((event) => (
          <Card key={event.title}>
            <Badge variant="muted">COMPLETED</Badge>
            <h3 className="mt-3 font-display text-lg font-semibold">{event.title}</h3>
            <p className="mt-2 text-sm text-slate-300/85">{event.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
