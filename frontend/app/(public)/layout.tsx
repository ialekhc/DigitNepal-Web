import { PublicLayout as PublicSiteLayout } from '@/layouts/public-layout';

export default function PublicRootLayout({ children }: { children: React.ReactNode }) {
  return <PublicSiteLayout>{children}</PublicSiteLayout>;
}
