import { doencasConsolidadas } from '@/lib/data/doencas/index';
import { getDoencaIdsForStatic, getDoencasServer } from '@/lib/supabase/server-utils-doencas';
import DoencaDetailClient from './DoencaDetailClient';

// Check if we're on Vercel (use dynamic rendering to reduce deployment size)
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;

// Generate all known IDs so Supabase-backed links work in every deployment target.
export async function generateStaticParams() {
  const allIds = isVercel
    ? (await getDoencasServer())
        .map((doenca) => doenca.id)
        .filter((id): id is string => Boolean(id))
    : getDoencaIdsForStatic();

  // For static export: generate all
  return allIds.map((id) => ({ id }));
}

export const dynamicParams = false;

export default function DoencaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <DoencaDetailClient params={params} />;
}
