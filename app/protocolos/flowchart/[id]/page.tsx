import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProtocoloById, todosProtocolosFlowchart } from '@/lib/data/protocolos-flowchart';
import FlowchartClient from './FlowchartClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return todosProtocolosFlowchart.map((protocolo) => ({
    id: protocolo.id,
  }));
}

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

