/**
 * API v1: Doenças (Diseases)
 * GET /api/v1/doencas - List diseases with pagination and filters
 */

import { NextRequest, NextResponse } from 'next/server';
import { doencas } from '@/lib/data/doencas';
import type { Doenca } from '@/lib/types/doenca';

export const dynamic = 'force-static';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.toLowerCase() || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    let filteredDoencas = [...doencas] as Doenca[];

    // Search by title or synonyms
    if (q) {
      filteredDoencas = filteredDoencas.filter(d =>
        d.titulo.toLowerCase().includes(q) ||
        d.sinonimos?.some(s => s.toLowerCase().includes(q))
      );
    }

    const total = filteredDoencas.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filteredDoencas.slice(start, end);

    return NextResponse.json({
      data: paginated.map(d => ({
        id: d.id,
        titulo: d.titulo,
        sinonimos: d.sinonimos,
        cid10: d.cid10,
        ciap2: d.ciap2,
        categoria: d.categoria
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error('Error fetching doenças:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
