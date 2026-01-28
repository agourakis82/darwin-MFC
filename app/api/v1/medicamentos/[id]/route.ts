/**
 * API v1: Medicamento por ID
 * GET /api/v1/medicamentos/[id] - Get single medication by ID
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDrugInteractionsForMedication, hasPharmacogenomicData } from '@/lib/types/pharmgkb';
import type { Medicamento } from '@/lib/types/medicamento';
import { medicamentos as medicamentosData } from '@/lib/data/medicamentos';

export const dynamic = 'force-static';

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
      const { medicamentos: allMedicamentos } = await import('@/lib/data/medicamentos');
      medicamentos = allMedicamentos;
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

// Note: Static params generation would require loading all medications
// For now, dynamic route will work

export async function generateStaticParams() {
  return medicamentosData.map((medicamento) => ({
    id: medicamento.id,
  }));
}
