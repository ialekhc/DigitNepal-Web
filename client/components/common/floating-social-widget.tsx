import { SocialLinks } from '@/components/common/SocialLinks';

export function FloatingSocialWidget() {
  return (
    <aside className="pointer-events-none fixed bottom-8 right-4 z-30 hidden lg:block xl:right-8 3xl:right-12">
      <div className="pointer-events-auto rounded-3xl border border-white/15 bg-[#071125]/72 p-3 shadow-panel backdrop-blur-xl">
        <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-300/75">
          Social
        </p>
        <SocialLinks
          mode="icon-only"
          layout="vertical"
          className="max-w-none gap-2"
          itemClassName="h-11 w-11"
        />
      </div>
    </aside>
  );
}
