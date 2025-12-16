import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.NEXT_PUBLIC_BASE_PATH === '/darwin-MFC';

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // GitHub Pages configuration
  basePath: isGitHubPages ? '/darwin-MFC' : '',
  assetPrefix: isGitHubPages ? '/darwin-MFC/' : '',
};

export default nextConfig;