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

// Generate static params for all diseases (includes all categories)
export async function generateStaticParams() {
  return doencasConsolidadas.map((doenca) => ({
    doencaId: doenca.id,
  }));
}

// Force static generation
export const dynamic = 'force-static';
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ doencaId: string }>;
}

export default async function ContextoClinicoPage({ params }: PageProps) {
  const { doencaId } = await params;
  return <ContextoClient doencaId={doencaId} />;
}
