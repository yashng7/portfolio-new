/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/resume",
        destination: "/",
        permanent: false,
      },
      {
        source: "/resume/:path*",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
