import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/lists',
        permanent: true,
      },
    ];
  },
  // allowedDevOrigins: ['http://localhost:3000'],
};

export default nextConfig;
