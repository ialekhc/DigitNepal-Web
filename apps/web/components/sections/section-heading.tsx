import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn('mb-8 max-w-3xl', className)}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent-cyan">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-slate-300/85">{description}</p> : null}
    </div>
  );
}
