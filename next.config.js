/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "utfs.io",
      "localhost",
      "lh3.googleusercontent.com",
      "nest-server2.vercel.app",
      "res.cloudinary.com",
    ],
  },

  experimental: {
    // serverActions: true,
  },
};

module.exports = nextConfig;
