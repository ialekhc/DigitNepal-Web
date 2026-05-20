import Link from 'next/link';

import { ContactForm } from '@/components/sections/contact-form';
import { SectionHeading } from '@/components/sections/section-heading';
import { Card } from '@/components/ui/card';

export default function ContactPage() {
  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading
        eyebrow="[ Contact ]"
        title="Let’s Build Something Amazing Together"
        description="Whether you’re planning a startup, business platform, mobile app, or digital transformation project, Digit Nepal is ready to help you bring your ideas to life."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card>
          <ContactForm />
        </Card>

        <Card>
          <h3 className="font-display text-xl font-semibold">Contact Information</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-300/85">
            <p>Phone: +977 9824872366</p>
            <p>Email: info.digitnepal@gmail.com</p>
            <p>
              Website:{' '}
              <Link href="https://digitnepal.com" className="text-accent-cyan hover:underline">
                digitnepal.com
              </Link>
            </p>
            <p>Location: Balkot, Bhaktapur, Nepal</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
