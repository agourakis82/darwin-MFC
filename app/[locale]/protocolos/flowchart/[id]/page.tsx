import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProtocoloById } from '@/lib/data/protocolos-flowchart';
import { getProtocoloIdsForStatic } from '@/lib/supabase/server-utils-protocolos';
import FlowchartClient from './FlowchartClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Check if we're on Vercel (use dynamic rendering to reduce deployment size)
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;

// Generate static params - limited on Vercel to reduce deployment size
export async function generateStaticParams() {
  const allIds = getProtocoloIdsForStatic();
  if (isVercel) {
    // On Vercel: generate only top 50 protocols statically
    return allIds.slice(0, 50).map((id) => ({ id }));
  }
  // For static export: generate all
  return allIds.map((id) => ({ id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const protocolo = getProtocoloById(id);
  
  if (!protocolo) {
    return { title: 'Protocolo não encontrado' };
  }

  return {
    title: `${protocolo.titulo} - Fluxograma | Darwin-MFC`,
    description: protocolo.descricao,
  };
}

export default async function ProtocoloFlowchartPage({ params }: PageProps) {
  const { id } = await params;
  const protocolo = getProtocoloById(id);

  if (!protocolo) {
    notFound();
  }

  return <FlowchartClient protocolo={protocolo} />;
}

