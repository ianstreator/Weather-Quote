/** @type {import('next').NextConfig} */
const isDev =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/"
    : "https://next-weather-quote.vercel.app/";

module.exports = {
  nextConfig: {
    reactStrictMode: true,
    environment: isDev,
  },
};
