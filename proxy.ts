import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Proxy for security headers and redirects
 *
 * IMPORTANT: This file MUST be at the project root for Next.js to recognize it.
 */

// Supported locales from i18n config
const locales = ['pt', 'en', 'es', 'fr', 'ru', 'ar', 'zh', 'el', 'hi'] as const;
const defaultLocale = 'pt';

/**
 * Add security headers to response
 */
function addSecurityHeaders(response: NextResponse): NextResponse {
  // Security Headers
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.github.com https://vitals.vercel-analytics.com https://*.supabase.co wss://*.supabase.co; frame-ancestors 'none';"
  );

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=(), payment=()'
  );

  // HSTS (HTTPS Strict Transport Security)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip proxy for static files, API routes, and special Next.js routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico' ||
    pathname === '/manifest.json' ||
    pathname === '/service-worker.js'
  ) {
    return addSecurityHeaders(NextResponse.next());
  }

  // Check if pathname already has a locale prefix
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If already has locale, just add security headers
  if (pathnameHasLocale) {
    return addSecurityHeaders(NextResponse.next());
  }

  // Root path - enter the product in the Brazil/Portuguese APS context.
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return addSecurityHeaders(NextResponse.redirect(url));
  }

  // For other non-locale paths, redirect to default locale with the path
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return addSecurityHeaders(NextResponse.redirect(url));
}

// Configure which routes middleware applies to
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|service-worker.js).*)',
  ],
};
