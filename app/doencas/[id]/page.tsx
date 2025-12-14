import { doencas } from '@/lib/data/doencas';
import DoencaDetailClient from './DoencaDetailClient';

// Generate static params for all doencas
export function generateStaticParams() {
  return doencas.map((doenca) => ({
    id: doenca.id,
  }));
}

export default function DoencaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <DoencaDetailClient params={params} />;
}
