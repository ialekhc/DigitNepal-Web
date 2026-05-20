import Image from 'next/image';
import Link from 'next/link';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Applications' },
  { href: '/events', label: 'Events' },
  { href: '/courses', label: 'Courses' },
  { href: '/contact', label: 'Contact' },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0d1733]">
      <div className="section-wrap grid gap-8 py-12 md:grid-cols-3">
        <div>
          <Image
            src="/brand/logo-light.png"
            alt="Digit Nepal"
            width={220}
            height={115}
            className="h-10 w-auto"
          />
          <p className="mt-3 max-w-sm text-sm text-slate-300/80">
            Digit Nepal is a technology company focused on software development, digital transformation, training, and innovative business solutions.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-slate-100">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-slate-300/80">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-accent-cyan">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-slate-100">Contact</h4>
          <p className="text-sm text-slate-300/80">Balkot, Bhaktapur, Nepal</p>
          <p className="text-sm text-slate-300/80">info.digitnepal@gmail.com</p>
          <p className="text-sm text-slate-300/80">+977 9824872366</p>
        </div>
      </div>
      <p className="pb-2 text-center font-display text-sm text-accent-cyan">Where Code Meets Creativity</p>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Digit Nepal. All rights reserved.
      </div>
    </footer>
  );
}
