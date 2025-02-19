/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "placeholder.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }] // required for leaflet
    return config
  },
}

module.exports = nextConfig

