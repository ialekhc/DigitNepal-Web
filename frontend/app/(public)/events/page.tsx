import { EventRegistrationForm } from '@/components/sections/event-registration-form';
import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { eventsContent } from '@/lib/content/site-content';

export default function EventsPage() {
  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading
        eyebrow="[ Events ]"
        title="Workshops, Hackathons, and Community Programs"
        description="Digit Nepal organizes practical events to help students and professionals build real digital skills."
      />

      <SectionHeading className="mt-10" eyebrow="[ Upcoming Events ]" title="Join the Next Sessions" />
      <div className="grid gap-4 md:grid-cols-2">
        {eventsContent.upcoming.map((event) => (
          <Card key={event.name}>
            <Badge>UPCOMING</Badge>
            <h3 className="mt-3 font-display text-lg font-semibold">{event.name}</h3>
            <p className="mt-2 text-sm text-slate-300/85">{event.description}</p>
            <p className="mt-3 text-xs text-slate-300/75">
              {event.date} • {event.time} • {event.venue}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <Card>
          <h3 className="font-display text-lg font-semibold">Workshops</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300/85">
            {eventsContent.workshops.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h3 className="font-display text-lg font-semibold">Hackathons</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300/85">
            {eventsContent.hackathons.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h3 className="font-display text-lg font-semibold">Community Programs</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300/85">
            {eventsContent.communityPrograms.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </Card>
      </div>

      <SectionHeading className="mt-10" eyebrow="[ Registration ]" title="Register for an Event" />
      <Card>
        <EventRegistrationForm />
      </Card>
    </div>
  );
}
