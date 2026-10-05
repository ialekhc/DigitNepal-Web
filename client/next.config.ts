import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@digitnepal/shared'],
  async redirects() {
    return [
      {
        source: '/',
        has: [{ type: 'host' as const, value: 'finance.digitnepal.com' }],
        destination: '/admin',
        permanent: false,
      },
      ...['digitnepal.com', 'www.digitnepal.com', 'frontend-delta-five-29.vercel.app'].map(host => ({
        source: '/admin/:path*',
        has: [{ type: 'host' as const, value: host }],
        destination: 'https://finance.digitnepal.com/admin/:path*',
        permanent: false,
      })),
    ];
  },
  async rewrites() {
    if (process.env.VERCEL && !process.env.BILLING_SERVER_URL) return [];
    const backend = process.env.BILLING_SERVER_URL || 'http://127.0.0.1:4000';
    return [{ source: '/api/admin/:path*', destination: backend + '/api/admin/:path*' }];
  },
  outputFileTracingRoot: path.resolve(__dirname, '..'),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
