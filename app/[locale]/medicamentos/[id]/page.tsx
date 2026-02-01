import { medicamentosConsolidados as medicamentos } from '@/lib/data/medicamentos/index';
import MedicamentoDetailClient from './MedicamentoDetailClient';

// Check if we're on Vercel (use dynamic rendering to reduce deployment size)
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;

// Generate static params only for non-Vercel builds (GitHub Pages)
// Vercel uses dynamic rendering with ISR for better performance with 600+ medications
export function generateStaticParams() {
  if (isVercel) {
    // On Vercel: generate only top 50 most common medications statically
    // Rest will be generated on-demand with ISR
    const topMedications = medicamentos.slice(0, 50);
    return topMedications.map((med) => ({
      id: med.id,
    }));
  }
  // For static export (GitHub Pages): generate all
  return medicamentos.map((med) => ({
    id: med.id,
  }));
}

// Allow dynamic params for medications not in generateStaticParams
export const dynamicParams = true;

// ISR: Revalidate pages every hour
export const revalidate = 3600;

export default function MedicamentoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <MedicamentoDetailClient params={params} />;
}
