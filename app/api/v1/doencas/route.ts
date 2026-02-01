/**
 * API v1: Doenças (Diseases)
 * GET /api/v1/doencas - List diseases with pagination and filters
 *
 * Fetches from Supabase when configured, falls back to static data
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDoencas, searchDoencas, getDoencasByCategoria } from '@/lib/data/supabase-data';

// Dynamic rendering for Supabase, static for fallback
export const dynamic = 'auto';
export const revalidate = 3600; // 1 hour cache

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
    const categoria = searchParams.get('categoria') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100);

    let doencas;

    // Use search if query provided
    if (q) {
      doencas = await searchDoencas(q);
    } else if (categoria) {
      doencas = await getDoencasByCategoria(categoria);
    } else {
      doencas = await getDoencas();
    }

    const total = doencas.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = doencas.slice(start, end);

    return NextResponse.json({
      data: paginated.map(d => ({
        id: d.id,
        titulo: d.titulo,
        sinonimos: d.sinonimos || [],
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
