/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export', // Add this for static site generation for Netlify
  images: {
    unoptimized: true, // Required for static export
  },
  // This is added to prevent errors with three.js in the static export
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: 'canvas' }];  // required for three.js to work
    return config;
  },
}

module.exports = nextConfig 