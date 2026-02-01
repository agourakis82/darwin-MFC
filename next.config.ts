import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const isProd = process.env.NODE_ENV === 'production';
// Build without basePath for custom domain (default for GitHub Pages with CNAME)
// Only use basePath when explicitly building for github.io subdirectory
const useBasePath = process.env.USE_BASE_PATH === 'true';
const basePathValue = useBasePath ? '/darwin-MFC' : '';

// Use SSR for Vercel (better for large sites with 15k+ pages)
// Use static export only for GitHub Pages
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;

const nextConfig: NextConfig = {
  // Vercel handles SSR natively, use static export for GitHub Pages only
  ...(isVercel ? {} : { output: "export" as const }),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Build without basePath by default (for custom domain)
  // Set USE_BASE_PATH=true to build with basePath for github.io subdirectory
  basePath: basePathValue,
  assetPrefix: basePathValue ? `${basePathValue}/` : '',

  // ============================================
  // PHASE 4: Performance & PWA Optimizations
  // ============================================

  // SVG as React components
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  // Optimize build
  productionBrowserSourceMaps: false,



  // Compression and optimization
  compress: true,
  poweredByHeader: false,

  // TypeScript strict mode
  typescript: {
    tsconfigPath: './tsconfig.json',
  },

};

export default withNextIntl(nextConfig);