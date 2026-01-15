import { NextRequest, NextResponse } from 'next/server';
import type { NextRequest as NextRequestType } from 'next/server';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Security headers configuration
const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https: blob:;
    media-src 'self' data: https:;
    connect-src 'self' https://*.supabase.co https://api.mfc.agourakis.med.br wss://*.supabase.co;
    frame-ancestors 'self';
    form-action 'self';
    base-uri 'self';
    object-src 'none';
  `.replace(/\s{2,}/g, ' ').trim(),
};

// CORS configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || 'https://mfc.agourakis.med.br',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Allow-Credentials': 'true',
};

// Rate limiting configuration
const RATE_LIMIT_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100');
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'); // 15 minutes

// IP extraction utility
function getClientIP(request: NextRequestType): string {
  // Try different headers for IP extraction
  const headers = [
    'x-forwarded-for',
    'x-real-ip',
    'x-client-ip',
    'cf-connecting-ip',
    'x-forwarded',
    'forwarded-for',
    'forwarded'
  ];

  for (const header of headers) {
    const ip = request.headers.get(header);
    if (ip) {
      // Handle comma-separated IPs (take the first one)
      return ip.split(',')[0].trim();
    }
  }

  // Fallback to a default IP
  return '127.0.0.1';
}

// Rate limiting check
function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = `rate_limit_${ip}`;
  
  const current = rateLimitStore.get(key);
  
  if (!current || now > current.resetTime) {
    // Reset or initialize
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS
    });
    return {
      allowed: true,
      remaining: RATE_LIMIT_REQUESTS - 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS
    };
  }
  
  if (current.count >= RATE_LIMIT_REQUESTS) {
    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetTime: current.resetTime
    };
  }
  
  // Increment counter
  current.count++;
  rateLimitStore.set(key, current);
  
  return {
    allowed: true,
    remaining: RATE_LIMIT_REQUESTS - current.count,
    resetTime: current.resetTime
  };
}

// Cleanup expired rate limit entries
function cleanupRateLimitStore(): void {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Check if path requires special handling
function requiresSpecialHandling(pathname: string): boolean {
  // API endpoints that need stricter rate limiting
  const strictPaths = [
    '/api/auth',
    '/api/login',
    '/api/search',
    '/api/upload',
    '/api/export'
  ];
  
  // Static files and public paths that should have relaxed rate limiting
  const relaxedPaths = [
    '/_next',
    '/public',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml'
  ];
  
  return strictPaths.some(path => pathname.startsWith(path)) ||
         relaxedPaths.some(path => pathname.startsWith(path));
}

// Get rate limit configuration based on path
function getRateLimitConfig(pathname: string): { requests: number; window: number } {
  if (requiresSpecialHandling(pathname)) {
    if (pathname.startsWith('/api/auth') || pathname.startsWith('/api/login')) {
      return { requests: 5, window: 60000 }; // 5 requests per minute
    }
    if (pathname.startsWith('/api/search')) {
      return { requests: 30, window: 60000 }; // 30 requests per minute
    }
    if (pathname.startsWith('/api/upload')) {
      return { requests: 10, window: 300000 }; // 10 requests per 5 minutes
    }
  }
  
  return { requests: RATE_LIMIT_REQUESTS, window: RATE_LIMIT_WINDOW_MS };
}

export async function middleware(request: NextRequestType) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/public') ||
    pathname.startsWith('/sitemap.xml') ||
    pathname.startsWith('/robots.txt')
  ) {
    return NextResponse.next();
  }

  // Handle CORS for API routes
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    
    // Add CORS headers
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    
    return response;
  }

  // Rate limiting for API routes and critical paths
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/dashboard')
  ) {
    const ip = getClientIP(request);
    const { requests, window } = getRateLimitConfig(pathname);
    
    const rateLimitResult = checkRateLimit(ip);
    
    if (!rateLimitResult.allowed) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please try again later.',
          resetTime: new Date(rateLimitResult.resetTime).toISOString()
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': requests.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          }
        }
      );
    }
    
    // Add rate limit headers to successful responses
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', requests.toString());
    response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
    response.headers.set('X-RateLimit-Reset', rateLimitResult.resetTime.toString());
    
    return response;
  }

  // Add security headers to all responses
  const response = NextResponse.next();
  
  // Add security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Add custom headers
  response.headers.set('X-Powered-By', 'Darwin-MFC');
  response.headers.set('X-Environment', process.env.NODE_ENV || 'development');
  response.headers.set('X-Version', process.env.APP_VERSION || '1.0.0');

  // Add caching headers for static content
  if (pathname.startsWith('/_next/static/') || pathname.startsWith('/images/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Add no-cache headers for dynamic content
  if (pathname.startsWith('/api/') || pathname.startsWith('/dashboard')) {
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  // Cleanup old rate limit entries periodically
  if (Math.random() < 0.01) { // 1% chance
    cleanupRateLimitStore();
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
