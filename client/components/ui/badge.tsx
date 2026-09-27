import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]',
  {
  variants: {
    variant: {
      default: 'border-brand-pink/30 bg-brand-pink/15 text-brand-pink',
      pink: 'border-accent-pink/35 bg-accent-pink/12 text-accent-pink',
      muted: 'border-white/15 bg-white/5 text-slate-200',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge };
