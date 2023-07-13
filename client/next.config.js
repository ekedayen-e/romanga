/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.myanimelist.net", "firebasestorage.googleapis.com"]
  }
}

module.exports = nextConfig
