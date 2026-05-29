import Link from 'next/link';

const policyLinks = [
  { label: 'Privacy Policy', href: '/contact' },
  { label: 'Terms & Conditions', href: '/contact' },
  { label: 'Cookie Policy', href: '/contact' },
] as const;

export function FooterBottom() {
  return (
    <div className="mt-6 border-t border-white/10 pt-4">
      <div className="flex flex-col gap-2.5 text-xs text-slate-400 sm:gap-3 lg:flex-row lg:items-center lg:justify-between">
        <p>© 2026 Digit Nepal Pvt. Ltd.</p>
        <p className="text-slate-300/78">Built in Nepal for Global Impact.</p>
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
          {policyLinks.map((link) => (
            <Link key={link.label} href={link.href} className="focus-ring rounded-md transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
