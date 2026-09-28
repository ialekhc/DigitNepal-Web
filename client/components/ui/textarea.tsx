import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[130px] w-full rounded-xl3 border border-white/15 bg-white/[0.03] px-3 py-2 font-secondary text-sm text-foreground placeholder:text-slate-300/55',
          'transition duration-300 ease-premium focus-visible:border-brand-pink/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink/60',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
