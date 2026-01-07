import { doencasPrenatalAltoRisco } from '@/lib/data/doencas/prenatal-alto-risco';
import PrenatalDetailClient from './PrenatalDetailClient';

// Generate static params for all prenatal conditions
export function generateStaticParams() {
  return doencasPrenatalAltoRisco.map((doenca) => ({
    id: doenca.id,
  }));
}

export default function PrenatalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <PrenatalDetailClient params={params} />;
}
