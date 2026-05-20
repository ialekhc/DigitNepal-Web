import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva('inline-flex items-center rounded-md px-3 py-1 font-mono text-xs font-semibold', {
  variants: {
    variant: {
      default: 'border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan',
      pink: 'border border-accent-pink/35 bg-accent-pink/12 text-accent-pink',
      muted: 'border border-white/10 bg-white/5 text-slate-200',
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
