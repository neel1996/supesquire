/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [process.env.NEXT_PUBLIC_DEPLOYMENT_DOMAIN || 'localhost']
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: 'raw-loader'
    });

    return config;
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/search',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
