import { notFound } from 'next/navigation';
import CasoClinicoPlayer from './CasoClinicoPlayer';
import { getCasoById, todosCasosClinicos } from '@/lib/data/casos-clinicos';

export async function generateStaticParams() {
  return todosCasosClinicos.map((caso) => ({
    id: caso.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const caso = getCasoById(id);
  
  return {
    title: caso ? `${caso.titulo} - Darwin MFC` : 'Caso Clínico - Darwin MFC',
    description: caso?.subtitulo || 'Caso clínico interativo',
  };
}

export default async function CasoClinicoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const caso = getCasoById(id);

  if (!caso) {
    notFound();
  }

  return <CasoClinicoPlayer caso={caso} />;
}
