import { Check } from 'lucide-react';

import { SectionHeading } from '@/components/sections/section-heading';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const plans = [
  {
    name: 'Starter',
    price: '$499/mo',
    features: ['Brand website support', 'Basic marketing setup', 'Monthly consultation'],
  },
  {
    name: 'Growth',
    price: '$1,499/mo',
    features: ['Custom web application', 'Performance marketing', 'Analytics dashboard', 'Priority support'],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Dedicated engineering pod', 'Digital transformation roadmap', 'Project governance and BI'],
  },
];

export default function PricingPage() {
  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading
        eyebrow="Plans & Pricing"
        title="Flexible Plans for Teams at Every Stage"
        description="Choose a package or request a custom engagement based on your project scope."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.featured ? 'border-accent-cyan/40' : ''}>
            <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
            <p className="mt-2 text-2xl font-bold text-accent-cyan">{plan.price}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300/85">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-cyan" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="mt-5 w-full" variant={plan.featured ? 'default' : 'outline'}>
              Choose Plan
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
