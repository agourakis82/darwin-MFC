import { doencasConsolidadas } from '@/lib/data/doencas/index';
import { getDoencaIdsForStatic } from '@/lib/supabase/server-utils-doencas';
import DoencaDetailClient from './DoencaDetailClient';

// Check if we're on Vercel (use dynamic rendering to reduce deployment size)
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;

// Generate static params - limited on Vercel to reduce deployment size
export function generateStaticParams() {
  const allIds = getDoencaIdsForStatic();
  if (isVercel) {
    // On Vercel: generate only top 50 diseases statically
    // Rest will be generated on-demand with ISR
    return allIds.slice(0, 50).map((id) => ({ id }));
  }
  // For static export: generate all
  return allIds.map((id) => ({ id }));
}

export const dynamicParams = false;

export default function DoencaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <DoencaDetailClient params={params} />;
}
