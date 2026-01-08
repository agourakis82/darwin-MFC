import { doencasPediatriaAPS } from '@/lib/data/doencas/pediatria-aps';
import PediatriaDetailClient from './PediatriaDetailClient';

// Generate static params for all pediatric conditions
export function generateStaticParams() {
  return doencasPediatriaAPS.map((doenca) => ({
    id: doenca.id,
  }));
}

export default function PediatriaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <PediatriaDetailClient params={params} />;
}
