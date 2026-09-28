import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@digitnepal/shared'],
  async rewrites() {
    if (process.env.VERCEL && !process.env.BILLING_SERVER_URL) {
      throw new Error('BILLING_SERVER_URL is required for Vercel deployments.');
    }
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
