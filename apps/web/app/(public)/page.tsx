'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CalendarClock, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ContactForm } from '@/components/sections/contact-form';
import { SectionHeading } from '@/components/sections/section-heading';
import { useHomeCompanyPhotos } from '@/hooks/use-managed-settings';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { serviceCatalog } from '@/lib/data/services-catalog';

const portfolioPreview = [
  {
    title: 'Multi-Vendor POS SaaS Platform',
    description:
      'A scalable SaaS-based POS and inventory management system with multi-tenant architecture and real-time analytics.',
  },
  {
    title: 'Hospital Management System',
    description:
      'A complete patient registration and medical records platform designed for hospitals and clinics.',
  },
  {
    title: 'Hotel Booking Platform',
    description:
      'A modern reservation platform with role-based management and integrated booking workflows.',
  },
  {
    title: 'Complaint Management System',
    description: 'A digital complaint handling platform for organizations and public service sectors.',
  },
];

const upcomingEvents = [
  {
    title: 'Flutter Mobile App Development Bootcamp',
    date: 'June 2026',
    time: '10:00 AM - 4:00 PM',
  },
  {
    title: 'UI/UX Design Workshop',
    date: 'July 2026',
    time: '11:00 AM - 2:00 PM',
  },
  {
    title: 'Python for Beginners',
    date: 'July 2026',
    time: '4:00 PM - 6:00 PM',
  },
];

const testimonials = [
  'Digit Nepal delivered a professional and scalable solution for our organization. Their team was responsive, skilled, and easy to work with.',
  'The training sessions were practical, beginner-friendly, and industry-focused. Highly recommended for students.',
  'Their design and development process was clean, organized, and efficient.',
];

export default function HomePage() {
  const companyPhotosQuery = useHomeCompanyPhotos();

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-mesh opacity-85" />
        <div className="section-wrap relative py-24 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Badge>[ digit-nepal://launch ]</Badge>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-6xl">
              Turn Ideas into Impact with <span className="neon-text">Digit Nepal</span>
            </h1>
            <p className="mt-5 text-base text-slate-200/85 sm:text-lg">
              We build scalable digital products, modern business solutions, and technology-driven experiences that
              help startups, businesses, and organizations grow smarter in the digital era.
            </p>
            <p className="mt-5 text-sm text-slate-300/85 sm:text-base">
              At Digit Nepal, we combine technology, strategy, and creativity to transform ideas into powerful digital
              solutions.
            </p>
            <div className="terminal-shell mt-6">
              <p>$ deploy --stack nextjs nestjs prisma --target business-growth</p>
              <p className="text-accent-pink">&gt; mode: software-company / terminal-ui / material-dark</p>
              <p className="text-accent-cyan">&gt; status: ready</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contact">
                  Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/services">Explore Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-wrap py-16 sm:py-20">
        <SectionHeading
          eyebrow="[ About Digit Nepal ]"
          title="Where Technology, Strategy, and Creativity Work Together"
          description="From mobile applications and enterprise systems to digital branding and business consulting, we help businesses innovate with confidence."
        />
      </section>

      <section className="section-wrap pb-16 sm:pb-20">
        <SectionHeading
          eyebrow="[ Company Highlights ]"
          title="Inside Digit Nepal"
          description="Add and manage company visuals directly from the Super Admin portal to keep this gallery updated."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {companyPhotosQuery.data && companyPhotosQuery.data.length > 0 ? (
            companyPhotosQuery.data.map((photo) => (
              <Card key={photo.id} className="overflow-hidden p-0">
                <div className="relative aspect-[16/10] w-full">
                  <Image src={photo.imageUrl} alt={photo.alt} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold">{photo.title}</h3>
                  <p className="mt-2 text-sm text-slate-300/85">{photo.description}</p>
                </div>
              </Card>
            ))
          ) : (
            <Card className="md:col-span-3">
              <p className="text-sm text-slate-300/85">
                No company photos published yet. Add them from Super Admin Portal → Brand & Team.
              </p>
            </Card>
          )}
        </div>
      </section>

      <section className="section-wrap pb-16 sm:pb-20">
        <SectionHeading
          eyebrow="[ Services Overview ]"
          title="Core Solutions We Deliver"
          description="Scalable technology and business services designed for measurable impact."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCatalog.slice(0, 6).map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-wrap pb-16 sm:pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="[ Applications / Portfolio ]"
            title="Project Preview"
            description="Scalable products designed for real-world organizational workflows."
            className="mb-0"
          />
          <Button variant="ghost" asChild>
            <Link href="/portfolio">View All</Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {portfolioPreview.map((app) => (
            <Card key={app.title}>
              <CardHeader>
                <CardTitle>{app.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{app.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-wrap pb-16 sm:pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="[ Upcoming Events ]"
            title="Workshops and Bootcamps"
            description="Training programs that build practical digital skills."
            className="mb-0"
          />
          <Button variant="ghost" asChild>
            <Link href="/events">View Events</Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {upcomingEvents.map((event) => (
            <Card key={event.title}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-xs">
                  <CalendarClock className="h-3.5 w-3.5" />
                  {event.date} • {event.time}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-wrap pb-16 sm:pb-20">
        <SectionHeading eyebrow="[ Testimonials ]" title="What Our Clients & Students Say" />
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((quote) => (
            <Card key={quote}>
              <CardContent>
                <p className="text-sm text-slate-200/90">“{quote}”</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-wrap pb-16 sm:pb-20">
        <Card className="border-accent-cyan/30 bg-gradient-to-r from-accent-cyan/10 via-transparent to-accent-pink/10 p-8 sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-accent-cyan">
                <Sparkles className="h-4 w-4" />
                Let’s Build Something Amazing Together
              </p>
              <h3 className="font-display text-2xl font-semibold sm:text-3xl">
                Whether you’re launching a startup or modernizing operations, Digit Nepal is ready to help.
              </h3>
            </div>
            <Button size="lg" asChild>
              <Link href="/contact">Start Your Project</Link>
            </Button>
          </div>
        </Card>
      </section>

      <section id="contact" className="section-wrap pb-20">
        <SectionHeading
          eyebrow="[ Contact ]"
          title="Let’s Talk About Your Next Build"
          description="Share your vision and we’ll help translate it into a scalable digital product."
        />
        <Card>
          <ContactForm />
        </Card>
      </section>
    </div>
  );
}
