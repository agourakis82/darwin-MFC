import { Metadata } from 'next';

/**
 * ROOT PAGE - DARWIN-MFC
 * ======================
 *
 * This page should rarely be reached as middleware redirects
 * to the appropriate locale (e.g., /pt/, /en/).
 *
 * This is a fallback for browsers that don't process middleware
 * or when JavaScript is disabled.
 */

export const metadata: Metadata = {
  title: 'Darwin MFC - Medical Foundation Cluster',
  description: 'Comprehensive medical reference platform for primary care',
};

export default function RootPage() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f9fafb',
      color: '#1f2937',
    }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
          Darwin MFC
        </h1>
        <p style={{ color: '#6b7280' }}>
          Redirecting to Darwin Medical Foundation Cluster...
        </p>
        <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '1rem' }}>
          If you are not redirected, <a href="/pt/" style={{ color: '#3b82f6', textDecoration: 'underline' }}>click here</a>.
        </p>
      </div>
    </div>
  );
}
