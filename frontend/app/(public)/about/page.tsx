'use client';

import Image from 'next/image';
import Link from 'next/link';

import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAboutTeamMembers } from '@/hooks/use-managed-settings';
import {
  aboutContent,
  coreValues,
  leadershipTeam,
  technicalTeam,
  whyChooseDigitNepal,
} from '@/lib/content/site-content';

export default function AboutPage() {
  const teamMembersQuery = useAboutTeamMembers();

  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading
        eyebrow="[ About Us ]"
        title={aboutContent.heading}
        description={aboutContent.overview}
      />

      <Card className="space-y-4">
        <p className="text-slate-300/90">{aboutContent.overviewExpanded}</p>
        {aboutContent.overviewParagraphs?.map((paragraph) => (
          <p key={paragraph} className="text-slate-300/85">
            {paragraph}
          </p>
        ))}
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="font-display text-xl font-semibold">Our Vision</h3>
          <p className="mt-3 text-sm text-slate-300/85">{aboutContent.vision}</p>
        </Card>
        <Card>
          <h3 className="font-display text-xl font-semibold">Our Mission</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300/85">
            {aboutContent.missionPoints?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </div>

      <SectionHeading className="mt-10" eyebrow="[ Core Values ]" title="What We Stand For" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {coreValues.map((value) => (
          <Card key={value.title}>
            <h3 className="font-display text-lg font-semibold">{value.title}</h3>
            <p className="mt-2 text-sm text-slate-300/85">{value.description}</p>
          </Card>
        ))}
      </div>

      <SectionHeading className="mt-10" eyebrow="[ Why Choose Digit Nepal ]" title="Built for Real Impact" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {whyChooseDigitNepal.map((item) => (
          <Card key={item.title}>
            <h3 className="font-display text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-300/85">{item.description}</p>
          </Card>
        ))}
      </div>

      <SectionHeading className="mt-10" eyebrow="[ Team ]" title="People Building Digit Nepal" />

      <Card className="overflow-hidden p-0">
        <div className="grid gap-0 md:grid-cols-[300px_1fr]">
          <div className="relative min-h-[320px]">
            <Image
              src={aboutContent.ceoProfile.photoUrl}
              alt={`${aboutContent.ceoProfile.name} portrait`}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-6 sm:p-8">
            <p className="kicker w-fit">Founder Message</p>
            <h3 className="mt-4 font-display text-2xl font-semibold text-white">
              {aboutContent.ceoProfile.name}
            </h3>
            <p className="mt-1 text-sm font-semibold text-brand-pink">{aboutContent.ceoProfile.designation}</p>
            <p className="mt-5 text-sm leading-relaxed text-slate-300/90">
              {aboutContent.ceoProfile.message}
            </p>
            <p className="mt-4 border-l-2 border-brand-pink/45 pl-4 text-sm text-slate-300/80">
              “{aboutContent.ceoMessage}”
            </p>
          </div>
        </div>
      </Card>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="font-display text-lg font-semibold">Leadership Team</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {leadershipTeam.map((item) => (
              <Badge key={item} variant="muted">
                {item}
              </Badge>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-display text-lg font-semibold">Technical Team</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {technicalTeam.map((item) => (
              <Badge key={item} variant="muted">
                {item}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
              Team data can be managed from the Super Admin portal under Brand & Team.
            </p>
          </Card>
        )}
      </div>

      <Card className="mt-8">
        <h3 className="font-display text-xl font-semibold">Our Impact</h3>
        <p className="mt-3 text-sm text-slate-300/85">{aboutContent.impact}</p>
        <p className="mt-3 text-sm font-semibold text-accent-cyan">{aboutContent.brandLine}</p>
      </Card>

      <Card className="mt-8">
        <h3 className="font-display text-xl font-semibold">Careers at Digit Nepal</h3>
        <p className="mt-2 text-sm text-slate-300/85">
          We are always looking for passionate builders, designers, and problem-solvers.
        </p>
        <Button asChild className="mt-4">
          <Link href="/careers">Explore Careers</Link>
        </Button>
      </Card>
    </div>
  );
}
