'use client';

import Image from 'next/image';

import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { fallbackCompanyPhotos, fallbackTeamMembers } from '@/lib/data/fallback';
import {
  aboutContent,
  coreValues,
  leadershipTeam,
  technicalTeam,
  whyChooseDigitNepal,
} from '@/lib/content/site-content';

export default function AboutPage() {
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

      <SectionHeading className="mt-10" eyebrow="[ Company in Action ]" title="Inside Our Workspace and Creative Process" />
      <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
        <Card className="overflow-hidden border-white/12 bg-white/[0.04] p-2">
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[2rem]">
            <Image
              src={fallbackCompanyPhotos[0].imageUrl}
              alt={fallbackCompanyPhotos[0].alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 34vw, 100vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/92 via-slate-950/45 to-transparent p-4">
              <p className="font-display text-sm font-semibold text-white">{fallbackCompanyPhotos[0].title}</p>
            </div>
          </div>
        </Card>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <Card className="mx-auto w-full max-w-[300px] overflow-hidden border-white/12 bg-white/[0.04] p-2 sm:max-w-none lg:max-w-[280px] lg:justify-self-end">
            <div className="relative aspect-square w-full overflow-hidden rounded-full border border-white/10">
              <Image
                src={fallbackCompanyPhotos[1].imageUrl}
                alt={fallbackCompanyPhotos[1].alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 18vw, 50vw"
              />
            </div>
          </Card>
          <Card className="overflow-hidden border-white/12 bg-white/[0.04] p-2">
            <div
              className="relative aspect-[5/4] w-full overflow-hidden"
              style={{ borderRadius: '34% 66% 44% 56% / 24% 31% 69% 76%' }}
            >
              <Image
                src={fallbackCompanyPhotos[1].imageUrl}
                alt={fallbackCompanyPhotos[1].alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 20vw, 100vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/92 via-slate-950/45 to-transparent p-4">
                <p className="font-display text-sm font-semibold text-white">{fallbackCompanyPhotos[1].title}</p>
              </div>
            </div>
          </Card>
        </div>
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

      <SectionHeading className="mt-10" eyebrow="[ Global Exposure ]" title="Global Exposure Through Google Programs" />
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <h3 className="font-display text-xl font-semibold text-white">Expanding perspective through global technology exposure</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300/88">
            Our CEO&apos;s visit to Google Australia represents Digit Nepal&apos;s belief in continuous learning, international exposure, and building with a broader technology mindset.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300/88">
            Alongside this, our Business Development Manager&apos;s participation in the Google Developer Groups program reflects our commitment to staying engaged with the wider developer ecosystem and technology community.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300/88">
            Moments like these inspire our team to think bigger, stay future-focused, and bring stronger ideas back into the products, services, and digital experiences we create for our clients.
          </p>
        </Card>

        <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <Card className="overflow-hidden border-white/12 bg-white/[0.04] p-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.2rem]">
              <Image
                src="/company/google-australia-visit-2.jpg"
                alt="Digit Nepal CEO during Google Australia visit"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 24vw, 100vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/94 via-slate-950/45 to-transparent p-4">
                <p className="font-display text-sm font-semibold text-white">CEO at Google Australia</p>
              </div>
            </div>
          </Card>
          <div className="grid gap-5">
            <Card className="overflow-hidden border-white/12 bg-white/[0.04] p-2">
              <div className="relative aspect-square w-full overflow-hidden rounded-full">
                <Image
                  src="/company/google-australia-visit-1.jpg"
                  alt="Google Australia visit visual"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 20vw, 100vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/94 via-slate-950/45 to-transparent p-4">
                  <p className="font-display text-sm font-semibold text-white">Google Australia Visit</p>
                </div>
              </div>
            </Card>
            <Card className="overflow-hidden border-white/12 bg-white/[0.04] p-2">
              <div
                className="relative aspect-[4/5] w-full overflow-hidden"
                style={{ borderRadius: '32% 68% 58% 42% / 18% 28% 72% 82%' }}
              >
                <Image
                  src="/team/business-development-manager.jpg"
                  alt="Digit Nepal Business Development Manager attending Google Developer Groups Program"
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 20vw, 100vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/94 via-slate-950/45 to-transparent p-4">
                  <p className="font-display text-sm font-semibold text-white">Google Developer Groups Program</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

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
        {fallbackTeamMembers.map((member) => (
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
        ))}
      </div>

      <Card className="mt-8">
        <h3 className="font-display text-xl font-semibold">Our Impact</h3>
        <p className="mt-3 text-sm text-slate-300/85">{aboutContent.impact}</p>
        <p className="mt-3 text-sm font-semibold text-accent-cyan">{aboutContent.brandLine}</p>
      </Card>
    </div>
  );
}
