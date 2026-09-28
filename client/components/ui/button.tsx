'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'btn-magnetic inline-flex items-center justify-center whitespace-nowrap rounded-xl3 text-sm font-semibold transition-all duration-300 ease-premium focus-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'group border border-brand-pink/30 bg-gradient-to-r from-brand-pink to-brand-rose text-white shadow-glowPink hover:shadow-glowCyan',
        outline:
          'border border-white/20 bg-white/[0.03] text-white hover:border-white/35 hover:bg-white/[0.08]',
        ghost: 'text-white/85 hover:bg-white/[0.08] hover:text-white',
        destructive: 'bg-rose-600 text-white hover:bg-rose-500',
      },
      size: {
        default: 'h-11 px-5 py-2.5',
        sm: 'h-10 rounded-xl px-4',
        lg: 'h-12 rounded-xl3 px-7',
      },
      magnetic: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      magnetic: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, magnetic, asChild = false, onMouseMove, onMouseLeave, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const reducedMotion = useReducedMotion();
    const [shift, setShift] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
      onMouseMove?.(event);
      if (!magnetic || reducedMotion) return;
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left - rect.width / 2) * 0.12;
      const offsetY = (event.clientY - rect.top - rect.height / 2) * 0.12;
      setShift({
        x: Math.max(-8, Math.min(8, offsetX)),
        y: Math.max(-8, Math.min(8, offsetY)),
      });
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
      onMouseLeave?.(event);
      if (!magnetic || reducedMotion) return;
      setShift({ x: 0, y: 0 });
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, magnetic, className }))}
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
        style={
          magnetic && !reducedMotion
            ? ({ transform: `translate3d(${shift.x}px, ${shift.y}px, 0)` } as React.CSSProperties)
            : undefined
        }
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
