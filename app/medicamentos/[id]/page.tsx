import { medicamentos } from '@/lib/data/medicamentos';
import MedicamentoDetailClient from './MedicamentoDetailClient';

// Generate static params for all medicamentos
export function generateStaticParams() {
  return medicamentos.map((med) => ({
    id: med.id,
  }));
}

export default function MedicamentoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <MedicamentoDetailClient params={params} />;
}
