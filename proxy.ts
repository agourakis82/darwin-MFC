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

type Locale = typeof locales[number];

/**
 * Detect locale from Accept-Language header
 */
function detectLocaleFromHeader(acceptLanguage: string): Locale {
  if (!acceptLanguage) return defaultLocale;

  // Parse Accept-Language header (e.g., "en-US,en;q=0.9,pt;q=0.8")
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const parts = lang.split(';');
      const code = parts[0].trim().split('-')[0]; // Extract primary language code
      const quality = parts[1] ? parseFloat(parts[1].split('=')[1]) : 1.0;
      return { code, quality };
    })
    .sort((a, b) => b.quality - a.quality); // Sort by quality (preference)

  // Find first matching locale
  for (const { code } of languages) {
    if (locales.includes(code as Locale)) {
      return code as Locale;
    }
  }

  return defaultLocale;
}

/**
 * Add security headers to response
 */
function addSecurityHeaders(response: NextResponse): NextResponse {
  // Security Headers
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.github.com https://vitals.vercel-analytics.com; frame-ancestors 'none';"
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

  // Root path - detect and redirect to locale
  if (pathname === '/') {
    // Check Accept-Language header
    const acceptLanguage = request.headers.get('accept-language') || '';
    const detectedLocale = detectLocaleFromHeader(acceptLanguage);

    const url = request.nextUrl.clone();
    url.pathname = `/${detectedLocale}`;
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
