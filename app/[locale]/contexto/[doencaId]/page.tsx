/**
 * PÁGINA DE CONTEXTO CLÍNICO - DARWIN-MFC
 * =======================================
 *
 * Visão unificada de uma condição com todos os recursos integrados:
 * - QuickView da doença
 * - Medicamentos disponíveis
 * - Calculadoras relevantes
 * - Protocolos de manejo
 * - Quando encaminhar
 */

import { doencasConsolidadas } from '@/lib/data/doencas/index';
import ContextoClient from './ContextoClient';

// Check if we're on Vercel (use dynamic rendering to reduce deployment size)
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;

// Generate static params - limited on Vercel to reduce deployment size
export async function generateStaticParams() {
  if (isVercel) {
    // On Vercel: generate only top 50 diseases statically
    // Rest will be generated on-demand with ISR
    const topDiseases = doencasConsolidadas.slice(0, 50);
    return topDiseases.map((doenca) => ({
      doencaId: doenca.id,
    }));
  }
  // For static export: generate all
  return doencasConsolidadas.map((doenca) => ({
    doencaId: doenca.id,
  }));
}

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ doencaId: string }>;
}

export default async function ContextoClinicoPage({ params }: PageProps) {
  const { doencaId } = await params;
  return <ContextoClient doencaId={doencaId} />;
}
