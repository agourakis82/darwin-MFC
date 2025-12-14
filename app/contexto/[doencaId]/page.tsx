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

import { doencas } from '@/lib/data/doencas';
import ContextoClient from './ContextoClient';

// Generate static params for all diseases
export async function generateStaticParams() {
  return doencas.map((doenca) => ({
    doencaId: doenca.id,
  }));
}

interface PageProps {
  params: Promise<{ doencaId: string }>;
}

export default async function ContextoClinicoPage({ params }: PageProps) {
  const { doencaId } = await params;
  return <ContextoClient doencaId={doencaId} />;
}
