/**
 * Security policy reference for the static Darwin-MFC export.
 *
 * The main app is built with `output: "export"`, so Next.js middleware/proxy
 * does not run in production. Hosts such as GitHub Pages, CDN providers,
 * Traefik, Nginx, or the future clinical backend proxy must apply these
 * headers at the edge/server layer.
 */

export const STATIC_SECURITY_HEADERS: Record<string, string> = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "media-src 'self' data: https:",
    "connect-src 'self' https://*.supabase.co https://api.mfc.agourakis.med.br wss://*.supabase.co",
    "frame-ancestors 'self'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
  ].join('; '),
};

export const STATIC_CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': 'https://mfc.agourakis.med.br',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Allow-Credentials': 'true',
};

export const DEFAULT_RATE_LIMIT_POLICY = {
  maxRequests: 100,
  windowMs: 900_000,
  stricterPaths: {
    auth: { maxRequests: 5, windowMs: 60_000 },
    search: { maxRequests: 30, windowMs: 60_000 },
    upload: { maxRequests: 10, windowMs: 300_000 },
  },
};
