/**
 * API v1: Medicamento por ID
 * GET /api/v1/medicamentos/[id] - Get single medication by ID
 *
 * Fetches from Supabase when configured, falls back to static data
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDrugInteractionsForMedication, hasPharmacogenomicData } from '@/lib/types/pharmgkb';
import { getMedicamentoById, getMedicamentos } from '@/lib/data/supabase-data';

// Dynamic rendering with ISR caching
export const dynamic = 'auto';
export const dynamicParams = true;
export const revalidate = 3600; // 1 hour cache

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS });
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const medicamento = await getMedicamentoById(id);

    if (!medicamento) {
      return NextResponse.json(
        { error: 'Medicamento não encontrado' },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    // Get pharmacogenomics data if available
    const pgxInteractions = getDrugInteractionsForMedication(id);
    const hasPgx = hasPharmacogenomicData(id);

    return NextResponse.json({
      ...medicamento,
      pharmacogenomics: hasPgx ? {
        hasData: true,
        interactions: pgxInteractions.map(i => ({
          gene: i.gene,
          phenotype: i.phenotype,
          recommendation: i.recommendation,
          evidenceLevel: i.evidenceLevel,
          source: i.source
        }))
      } : { hasData: false, interactions: [] }
    }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error('Error fetching medicamento:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// Generate static params - limited for smaller deployment size
export async function generateStaticParams() {
  // Only pre-generate top 20 for faster builds
  // Rest will be generated on-demand with ISR
  const meds = await getMedicamentos();
  return meds.slice(0, 20).map((med) => ({
    id: med.id,
  }));
}
