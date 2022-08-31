/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    console.log('rewrites called');
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
      // {
      //   source: '/api/users',
      //   destination: 'http://localhost:5000/api/users',
      // },
      // {
      //   source: '/api/users/login',
      //   destination: 'http://localhost:5000/api/users/login',
      // },
    ];
  },
};

module.exports = nextConfig;
