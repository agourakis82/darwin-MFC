import { notFound } from 'next/navigation';
import { medicamentosConsolidados as medicamentos } from '@/lib/data/medicamentos/index';
import { getMedicamentoServer, getMedicamentosServer } from '@/lib/supabase/server-utils';
import MedicamentoDetailClient from './MedicamentoDetailClient';

// Check if we're on Vercel (use dynamic rendering to reduce deployment size)
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;

// Generate all known IDs so Supabase-backed links work in every deployment target.
export async function generateStaticParams() {
  if (isVercel) {
    const remoteMedications = await getMedicamentosServer();
    return remoteMedications.map((med) => ({
      id: med.id,
    }));
  }
  // For static export (GitHub Pages): generate all
  return medicamentos.map((med) => ({
    id: med.id,
  }));
}

export const dynamicParams = false;

export default async function MedicamentoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch medication from Supabase (or fallback to TypeScript constants)
  const medicamento = await getMedicamentoServer(id);

  if (!medicamento) {
    notFound();
  }

  return <MedicamentoDetailClient medicamento={medicamento} />;
}
