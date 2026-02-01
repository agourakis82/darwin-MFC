import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProtocoloById, todosProtocolosFlowchart } from '@/lib/data/protocolos-flowchart';
import FlowchartClient from './FlowchartClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Check if we're on Vercel (use dynamic rendering to reduce deployment size)
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;

// Generate static params - limited on Vercel to reduce deployment size
export async function generateStaticParams() {
  if (isVercel) {
    // On Vercel: generate only top 50 protocols statically
    const topProtocols = todosProtocolosFlowchart.slice(0, 50);
    return topProtocols.map((protocolo) => ({
      id: protocolo.id,
    }));
  }
  // For static export: generate all
  return todosProtocolosFlowchart.map((protocolo) => ({
    id: protocolo.id,
  }));
}

// Allow dynamic params for protocols not in generateStaticParams
export const dynamicParams = true;

// ISR: Revalidate pages every hour
export const revalidate = 3600;

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

