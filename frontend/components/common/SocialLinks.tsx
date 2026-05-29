import Link from 'next/link';

import { SOCIAL_LINKS } from '@/constants/social';
import { cn } from '@/lib/utils';

type SocialLinksProps = {
  mode?: 'icon-only' | 'icon-label';
  layout?: 'horizontal' | 'vertical';
  showDescription?: boolean;
  showTooltips?: boolean;
  className?: string;
  itemClassName?: string;
};

export function SocialLinks({
  mode = 'icon-only',
  layout = 'horizontal',
  showDescription = false,
  showTooltips = true,
  className,
  itemClassName,
}: SocialLinksProps) {
  const vertical = layout === 'vertical';
  const iconOnly = mode === 'icon-only';

  return (
    <div
      className={cn(
        'mx-auto w-full max-w-7xl 3xl:max-w-[120rem] 4xl:max-w-[160rem]',
        vertical
          ? 'grid grid-cols-1 gap-3 sm:gap-4'
          : 'flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 3xl:gap-7 4xl:gap-8',
        className,
      )}
    >
      {SOCIAL_LINKS.map((social) => {
        const Icon = social.icon;
        return (
          <div key={social.name} className={cn('group relative', vertical ? 'w-full' : undefined)}>
            <Link
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.name} - ${social.handle}`}
              className={cn(
                'relative flex items-center rounded-2xl border border-white/15 bg-white/[0.04] text-slate-100/90 backdrop-blur-sm',
                'transition-all duration-300 ease-premium hover:-translate-y-1 hover:scale-[1.03] hover:shadow-glowCyan',
                'focus-ring',
                social.hoverClassName,
                iconOnly
                  ? 'h-11 w-11 justify-center sm:h-12 sm:w-12 lg:h-14 lg:w-14'
                  : 'min-h-11 w-full gap-3 px-3 py-2 sm:min-h-12 sm:px-4 sm:py-2.5 lg:min-h-14 lg:px-5',
                itemClassName,
              )}
              title={social.name}
            >
              <Icon className="h-[clamp(1.05rem,1.3vw,1.5rem)] w-[clamp(1.05rem,1.3vw,1.5rem)] shrink-0" />
              {!iconOnly ? (
                <span className="min-w-0">
                  <span className="block text-[clamp(0.875rem,1vw,1rem)] font-semibold leading-tight text-slate-100">
                    {social.name}
                  </span>
                  <span className="block text-[clamp(0.75rem,0.9vw,0.9rem)] leading-tight text-slate-300/80">
                    {social.handle}
                  </span>
                </span>
              ) : null}
            </Link>

            {showTooltips && !vertical ? (
              <span
                role="tooltip"
                className="pointer-events-none absolute -top-10 left-1/2 z-20 hidden -translate-x-1/2 rounded-md border border-white/15 bg-[#0f1c3d]/95 px-2.5 py-1 text-xs text-slate-100 opacity-0 transition-all duration-200 group-hover:block group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-within:block group-focus-within:opacity-100 md:block"
              >
                {social.name}
              </span>
            ) : null}

            {showDescription && !iconOnly ? (
              <p className="mt-2 text-sm text-slate-300/85">{social.description}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
