import { Metadata } from 'next';
import { allEmergencyDrugs, getDrugById } from '@/lib/ps/data';
import { locales } from '@/i18n/config';
import PSDrugDetailClient from './DrugDetailClient';

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    allEmergencyDrugs.map((drug) => ({
      locale,
      id: drug.id,
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const drug = getDrugById(id);

  if (!drug) {
    return { title: 'Droga não encontrada | PS' };
  }

  return {
    title: `${drug.genericName} | Drogas PS`,
    description: drug.mechanismOfAction,
  };
}

export default function PSDrugDetailPage() {
  return <PSDrugDetailClient />;
}
