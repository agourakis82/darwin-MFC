import HomeContent from './HomeContent';
import { locales, type Locale } from '@/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Disable dynamic rendering for static export
export const dynamic = 'force-static';
export const dynamicParams = false;

export default function HomePage() {
  // This will be the default locale home page
  return <HomeContent />;
}

