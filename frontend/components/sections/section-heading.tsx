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
    <div className={cn('mb-10 max-w-[45rem]', className)}>
      {eyebrow ? (
        <p className="kicker mb-4">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-[clamp(2rem,5.2vw,3.5rem)] font-semibold leading-[1.08] text-white">{title}</h2>
      {description ? (
        <p className="mt-4 font-secondary text-[clamp(1rem,1.5vw,1.125rem)] leading-relaxed text-slate-300/88">{description}</p>
      ) : null}
    </div>
  );
}
