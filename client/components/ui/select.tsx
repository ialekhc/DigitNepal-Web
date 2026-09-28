import * as React from 'react';

import { cn } from '@/lib/utils';

export const Select = React.forwardRef<HTMLSelectElement, React.ComponentProps<'select'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'flex h-11 w-full rounded-xl3 border border-white/15 bg-white/[0.03] px-3 py-2 font-secondary text-sm text-foreground',
          'transition duration-300 ease-premium focus-visible:border-brand-pink/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink/60',
          className,
        )}
        {...props}
      >
        {children}
      </select>
    );
  },
);

Select.displayName = 'Select';
