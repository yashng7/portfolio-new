/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
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

