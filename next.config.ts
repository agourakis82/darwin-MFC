import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const isProd = process.env.NODE_ENV === 'production';
// Build without basePath for custom domain (default for GitHub Pages with CNAME)
// Only use basePath when explicitly building for github.io subdirectory
const useBasePath = process.env.USE_BASE_PATH === 'true';
const basePathValue = useBasePath ? '/darwin-MFC' : '';

// Use SSR in dev and on Vercel (better for large sites with 15k+ pages).
// Use static export only for production builds when not on Vercel (e.g., GitHub Pages).
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;
const isStaticExport = !isVercel && process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Vercel handles SSR natively, use static export for GitHub Pages only
  ...(isStaticExport ? { output: "export" as const } : {}),
  images: {
    // Enable optimization on Vercel, disable for static export
    unoptimized: isStaticExport,
    // Allow images from Supabase storage
    remotePatterns: isVercel ? [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/**',
      },
    ] : [],
  },
  trailingSlash: true,
  // Build without basePath by default (for custom domain)
  // Set USE_BASE_PATH=true to build with basePath for github.io subdirectory
  basePath: basePathValue,
  assetPrefix: basePathValue ? `${basePathValue}/` : '',
  // Allow importing workspace packages without build-step friction.
  transpilePackages: [
    '@darwin-mfc/design-tokens',
    '@darwin-mfc/protocol-runner',
    '@darwin-mfc/protocol-data',
  ],

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
    // onnxruntime-web is loaded dynamically in the browser; exclude from SSG bundle
    config.externals = [...(config.externals ?? []), 'onnxruntime-web'];
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

export default withBundleAnalyzer(withNextIntl(nextConfig));
