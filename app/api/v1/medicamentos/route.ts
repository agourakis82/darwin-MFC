/**
 * API v1: Medicamentos (Medications)
 * GET /api/v1/medicamentos - List medications with pagination and filters
 *
 * Fetches from Supabase when configured, falls back to static data
 */

import { NextRequest, NextResponse } from 'next/server';
import { getMedicamentos, searchMedicamentos, getMedicamentosByClasse } from '@/lib/data/supabase-data';

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
    const classe = searchParams.get('classe') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100);

    let medicamentos;

    // Use search if query provided
    if (q) {
      medicamentos = await searchMedicamentos(q);
    } else if (classe) {
      medicamentos = await getMedicamentosByClasse(classe);
    } else {
      medicamentos = await getMedicamentos();
    }

    const total = medicamentos.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = medicamentos.slice(start, end);

    return NextResponse.json({
      data: paginated.map(m => ({
        id: m.id,
        nomeGenerico: m.nomeGenerico,
        nomesComerciais: m.nomesComerciais || [],
        classeTerapeutica: m.classeTerapeutica,
        rename: m.rename, // Whether in RENAME (National Essential Medicines List)
        disponivelSUS: m.apresentacoes?.some(ap => ap.disponivelSUS) || false,
        atcCode: m.atcCode,
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error('Error fetching medicamentos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
