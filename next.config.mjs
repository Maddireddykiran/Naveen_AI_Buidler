/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    // Required for Three.js and other libraries
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        use: ['raw-loader', 'glslify-loader'],
      });
  
      // Important: return the modified config
      return config
    },
    // Enable React Strict Mode
    reactStrictMode: true,
    // Image optimization configuration
    images: {
      domains: [
        'images.unsplash.com', // Add other domains you use
      ],
      unoptimized: true, // Disable if using Next.js Image optimization
    },
    // Enable compiler for Emotion
    compiler: {
      emotion: true,
    },
    // For large projects with Three.js
    experimental: {
      largePageDataBytes: 256 * 1000, // 256KB (default is 128KB)
    },
    // Output configuration (choose one)
    // output: 'standalone', // For production deployment
    // output: 'export', // For static export
  }
  
  export default nextConfig