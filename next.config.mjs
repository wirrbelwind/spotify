/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/image/**'
      },
      {
        protocol: 'https',
        hostname: 'image-cdn-ak.spotifycdn.com',
        pathname: '/image/**'
      },
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'image-cdn-fa.spotifycdn.com',
        pathname: '/image/**'
      },
    ]
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
