import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { medicamentosConsolidados as medicamentos } from '@/lib/data/medicamentos/index';
import { getMedicamentoServer } from '@/lib/supabase/server-utils';
import {
  getCanonicalMedicationById,
  getMedicationRouteIds,
  resolveMedicationIdentity,
} from '@/lib/medication-safety';
import MedicamentoDetailClient from './MedicamentoDetailClient';

export async function generateStaticParams() {
  return getMedicationRouteIds().map(id => ({ id }));
}

export const dynamicParams = false;

type PageProps = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const identity = resolveMedicationIdentity(id);
  if (!identity) return {};
  return {
    title: `${identity.preferredName} | Darwin Rx`,
    alternates: { canonical: `/${locale}/medicamentos/${identity.canonicalPathId}/` },
  };
}

export default async function MedicamentoDetailPage({ params }: PageProps) {
  const { locale, id } = await params;
  const identity = resolveMedicationIdentity(id);
  if (!identity) notFound();

  const editorialMembers = await Promise.all(identity.aliasIds.map(aliasId => getMedicamentoServer(aliasId)));
  const editorialById = new Map(editorialMembers.filter(Boolean).map(medication => [medication!.id, medication!]));
  const sourceCatalog = medicamentos.map(medication => editorialById.get(medication.id) ?? medication);
  const canonical = getCanonicalMedicationById(id, sourceCatalog);

  if (!canonical) notFound();

  return <MedicamentoDetailClient medicamento={canonical.medication} identity={canonical.identity} locale={locale} />;
}
