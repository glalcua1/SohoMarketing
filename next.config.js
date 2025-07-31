/**
 * Next.js Configuration for Hospitality Marketing Platform
 * 
 * Optimized for:
 * - Performance: Image optimization, bundle analysis
 * - SEO: Static generation where possible
 * - Debugging: Source maps in development
 * - Analytics: Bundle size monitoring
 */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better debugging
  reactStrictMode: true,
  
  // Enable SWC minification for better performance
  swcMinify: true,
  
  // Experimental features for better performance
  experimental: {
    scrollRestoration: true,
  },

  // Image optimization configuration
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Enable image optimization debugging
    unoptimized: process.env.NODE_ENV === 'development',
  },

  // Headers for performance and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ];
  },

  // Enable source maps in development for debugging
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.devtool = 'eval-source-map';
    }
    
    // Debugging: Log webpack build info
    if (process.env.DEBUG_BUILD === 'true') {
      console.log('🔧 Webpack Config:', {
        mode: config.mode,
        target: config.target,
        devtool: config.devtool,
      });
    }
    
    return config;
  },

  // Performance budgets for monitoring
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },
};

module.exports = withBundleAnalyzer(nextConfig); 