import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProtocolFlowClient from './ProtocolFlowClient';
import { emergencyProtocols, getEmergencyProtocolById } from '@/lib/ps/protocols';
import { getEmergencyScoreById } from '@/lib/ps/scores';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return emergencyProtocols.map((protocol) => ({ slug: protocol.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const protocol = getEmergencyProtocolById(slug);

  if (!protocol) {
    return { title: 'Protocolo não encontrado' };
  }

  return {
    title: `${protocol.name} | PS`,
    description: protocol.description,
  };
}

export default async function PSProtocolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const protocol = getEmergencyProtocolById(slug);

  if (!protocol) {
    notFound();
  }

  const relatedScores = protocol.relatedScores
    .map((scoreId) => {
      const score = getEmergencyScoreById(scoreId);
      if (!score) return null;
      return {
        id: score.id,
        name: score.abbreviation,
      };
    })
    .filter((score): score is { id: string; name: string } => Boolean(score));

  return <ProtocolFlowClient protocol={protocol} relatedScores={relatedScores} />;
}
