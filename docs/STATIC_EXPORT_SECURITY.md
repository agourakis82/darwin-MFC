# Static Export Security Notes

Darwin-MFC is built with `output: "export"` in `next.config.ts`. That means the main Next.js app is static HTML/JS and must not rely on Next middleware, API routes, route handlers, or server runtime behavior for production security.

## Current Decision

- The former `middleware.ts` policy has been retired from the Next runtime.
- Header, CORS, and rate-limit intent is preserved in `lib/hosting/static-security.ts`.
- Production enforcement must happen in the deployment layer: CDN, GitHub Pages-equivalent host, Traefik, Nginx, or the external clinical backend/proxy.
- Clinical intelligence/auth/WebSocket calls must use an external backend/proxy origin, not a Next API route.

## Required Edge/Host Controls

Apply the headers in `STATIC_SECURITY_HEADERS` from `lib/hosting/static-security.ts` at the host/proxy layer:

- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`

Apply CORS and rate limiting on backend/API/proxy routes only. Static assets do not need app-level rate limiting.

## Verification

The repo gate for this decision is:

```bash
npm run type-check
npm run lint
npm run verify
npm run build
```

`next dev` should no longer emit the `Middleware cannot be used with "output: export"` warning after `middleware.ts` is removed.
