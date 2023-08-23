/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [process.env.NEXT_PUBLIC_DEPLOYMENT_DOMAIN || 'localhost']
  }
};

module.exports = nextConfig;
