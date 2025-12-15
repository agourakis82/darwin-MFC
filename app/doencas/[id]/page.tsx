import { doencasConsolidadas } from '@/lib/data/doencas/index';
import DoencaDetailClient from './DoencaDetailClient';

// Generate static params for all doencas (includes all categories)
export function generateStaticParams() {
  return doencasConsolidadas.map((doenca) => ({
    id: doenca.id,
  }));
}

export default function DoencaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <DoencaDetailClient params={params} />;
}
