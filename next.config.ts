import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  // GitHub Pages serves project sites below /<repository>. Keep this empty
  // for local development and custom-domain deployments.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

export default nextConfig;
