import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  // GitHub Pages serves project sites below /<repository>. Keep this empty
  // for local development and custom-domain deployments.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true,
    remotePatterns: [
      new URL('https://neakasa.com/cdn/shop/files/**'),
      new URL('https://oneisall.com/cdn/shop/files/**'),
      new URL('https://us.air-robo.com/cdn/shop/files/**'),
      new URL('https://m.media-amazon.com/images/**'),
    ],
  },
};

export default nextConfig;
