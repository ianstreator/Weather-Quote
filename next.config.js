/** @type {import('next').NextConfig} */
const isDev =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/"
    : "https://geocast.vercel.app/";

module.exports = {
  nextConfig: {
    reactStrictMode: true,
    environment: isDev,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};
