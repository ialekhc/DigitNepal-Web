import type { Metadata } from 'next';

import { Providers } from '@/components/providers';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://digitnepal.com'),
  title: {
    default: 'Digit Nepal | Turn Ideas into Impact',
    template: '%s | Digit Nepal',
  },
  description:
    'Digit Nepal builds scalable digital products, modern business solutions, and technology-driven experiences for startups and organizations.',
  keywords: [
    'Digit Nepal',
    'Technology company Nepal',
    'Digital agency Nepal',
    'Web development Nepal',
  ],
  openGraph: {
    title: 'Digit Nepal',
    description: 'Turn Ideas into Impact with Digit Nepal',
    type: 'website',
  },
  icons: {
    icon: '/brand/favicon-512.png',
    shortcut: '/brand/favicon-512.png',
    apple: '/brand/favicon-alt-512.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
