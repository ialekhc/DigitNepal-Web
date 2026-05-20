'use client';

import Image from 'next/image';

import { SectionHeading } from '@/components/sections/section-heading';
import { Card } from '@/components/ui/card';
import { useAboutTeamMembers } from '@/hooks/use-managed-settings';

const whyChoose = [
  {
    title: 'Innovative Solutions',
    description:
      'We build future-ready systems designed for scalability and long-term sustainability.',
  },
  {
    title: 'User-Centered Design',
    description:
      'Every product is designed with usability, simplicity, and user experience in mind.',
  },
  {
    title: 'Technology Expertise',
    description:
      'Our team works with modern technologies and development practices to deliver high-performance solutions.',
  },
  {
    title: 'Reliable Partnership',
    description:
      'We focus on long-term collaboration, transparency, and sustainable business growth.',
  },
];

const missionPoints = [
  'Deliver high-quality software solutions',
  'Help businesses digitize operations',
  'Build scalable and sustainable systems',
  'Promote innovation through technology',
  'Support startups and entrepreneurs with digital transformation',
];

export default function AboutPage() {
  const teamMembersQuery = useAboutTeamMembers();

  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading
        eyebrow="[ About Digit Nepal ]"
        title="Building Meaningful Digital Experiences That Solve Real-World Problems"
        description="Digit Nepal is a Nepal-based technology company focused on delivering innovative digital solutions for startups, businesses, educational institutions, and organizations."
      />

      <Card>
        <p className="text-slate-300/90">
          We specialize in modern software development, mobile applications, UI/UX design, digital transformation,
          branding, and business-focused technology solutions that help organizations scale efficiently.
        </p>
        <p className="mt-4 text-slate-300/90">
          By combining technical expertise, strategic thinking, and user-centered design, we help businesses move from
          traditional systems to smart digital ecosystems.
        </p>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="font-display text-xl font-semibold">Our Vision</h3>
          <p className="mt-3 text-sm text-slate-300/85">
            To become one of Nepal’s leading technology and innovation companies by creating impactful digital
            solutions that empower businesses globally.
          </p>
        </Card>

        <Card>
          <h3 className="font-display text-xl font-semibold">Our Mission</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300/85">
            {missionPoints.map((point) => (
              <li key={point}>- {point}</li>
            ))}
          </ul>
        </Card>
      </div>

      <SectionHeading
        className="mt-10"
        eyebrow="[ Why Choose Digit Nepal ]"
        title="A Team Built for Long-Term Product and Business Success"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {whyChoose.map((item) => (
          <Card key={item.title}>
            <h3 className="font-display text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-300/85">{item.description}</p>
          </Card>
        ))}
      </div>

      <SectionHeading
        className="mt-10"
        eyebrow="[ Our Team ]"
        title="People Behind Digit Nepal"
        description="Team profiles below are fully manageable from the Super Admin portal."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teamMembersQuery.data && teamMembersQuery.data.length > 0 ? (
          teamMembersQuery.data.map((member) => (
            <Card key={member.id} className="overflow-hidden p-0">
              <div className="relative aspect-[4/3] w-full">
                <Image src={member.photoUrl} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold text-accent-cyan">{member.designation}</p>
                <p className="mt-3 text-sm text-slate-300/85">{member.description}</p>
              </div>
            </Card>
          ))
        ) : (
          <Card className="md:col-span-2 lg:col-span-3">
            <p className="text-sm text-slate-300/85">
              No team members published yet. Add profiles from Super Admin Portal → Brand & Team.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
