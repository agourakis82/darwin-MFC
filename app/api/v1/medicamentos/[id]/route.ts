/**
 * API v1: Medicamento por ID
 * GET /api/v1/medicamentos/[id] - Get single medication by ID
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDrugInteractionsForMedication, hasPharmacogenomicData } from '@/lib/types/pharmgkb';
import type { Medicamento } from '@/lib/types/medicamento';
import { medicamentosConsolidados as medicamentosData } from '@/lib/data/medicamentos/index';

// Check if we're on Vercel
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;

// Use dynamic rendering on Vercel, static on GitHub Pages
export const dynamic = isVercel ? 'auto' : 'force-static';
export const dynamicParams = true;
export const revalidate = 3600;

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
    // Fetch medications dynamically
    let medicamentos: Medicamento[] = [];
    try {
      const { medicamentosConsolidados } = await import('@/lib/data/medicamentos/index');
      medicamentos = medicamentosConsolidados;
    } catch {
      return NextResponse.json(
        { error: 'Medicamento não encontrado' },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    const medicamento = medicamentos.find(m => m.id === id);

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

// Generate static params - limited on Vercel to reduce deployment size
export async function generateStaticParams() {
  if (isVercel) {
    // On Vercel: generate only top 50 medications statically
    const topMedications = medicamentosData.slice(0, 50);
    return topMedications.map((medicamento) => ({
      id: medicamento.id,
    }));
  }
  // For static export: generate all
  return medicamentosData.map((medicamento) => ({
    id: medicamento.id,
  }));
}
