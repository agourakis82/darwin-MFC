import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
// Only use basePath for GitHub Pages subdirectory, not for custom domain
const isGitHubPages = process.env.NEXT_PUBLIC_BASE_PATH === '/darwin-MFC' && !process.env.NEXT_PUBLIC_CUSTOM_DOMAIN;

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // GitHub Pages configuration
  // Custom domain serves from root, so no basePath needed
  basePath: isGitHubPages ? '/darwin-MFC' : '',
  assetPrefix: isGitHubPages ? '/darwin-MFC/' : '',
};

export default nextConfig;