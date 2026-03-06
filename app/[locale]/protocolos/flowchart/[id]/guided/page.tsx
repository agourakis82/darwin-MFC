import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProtocoloById } from '@/lib/data/protocolos-flowchart';
import { getProtocoloIdsForStatic } from '@/lib/supabase/server-utils-protocolos';
import GuidedFlowchartClient from './GuidedFlowchartClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;

export async function generateStaticParams() {
  const allIds = getProtocoloIdsForStatic();
  if (isVercel) return allIds.slice(0, 50).map((id) => ({ id }));
  return allIds.map((id) => ({ id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const protocolo = getProtocoloById(id);
  if (!protocolo) return { title: 'Protocolo não encontrado' };

  return {
    title: `${protocolo.titulo} - Fluxograma Guiado | Darwin-MFC`,
    description: protocolo.descricao,
  };
}

export default async function GuidedProtocoloFlowchartPage({ params }: PageProps) {
  const { id } = await params;
  const protocolo = getProtocoloById(id);
  if (!protocolo) notFound();
  return <GuidedFlowchartClient protocolo={protocolo} />;
}

