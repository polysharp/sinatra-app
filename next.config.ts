import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/workspaces',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
