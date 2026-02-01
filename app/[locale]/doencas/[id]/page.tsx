import { doencasConsolidadas } from '@/lib/data/doencas/index';
import DoencaDetailClient from './DoencaDetailClient';

// Check if we're on Vercel (use dynamic rendering to reduce deployment size)
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;

// Generate static params - limited on Vercel to reduce deployment size
export function generateStaticParams() {
  if (isVercel) {
    // On Vercel: generate only top 50 diseases statically
    // Rest will be generated on-demand with ISR
    const topDiseases = doencasConsolidadas.slice(0, 50);
    return topDiseases.map((doenca) => ({
      id: doenca.id,
    }));
  }
  // For static export: generate all
  return doencasConsolidadas.map((doenca) => ({
    id: doenca.id,
  }));
}

// Allow dynamic params for diseases not in generateStaticParams
export const dynamicParams = true;

// ISR: Revalidate pages every hour
export const revalidate = 3600;

export default function DoencaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <DoencaDetailClient params={params} />;
}
