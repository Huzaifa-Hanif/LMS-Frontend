/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io", "localhost", "lh3.googleusercontent.com"],
  },

  experimental: {
    // serverActions: true,
  },
};

module.exports = nextConfig;
