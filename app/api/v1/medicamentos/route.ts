/**
 * API v1: Medicamentos (Medications)
 * GET /api/v1/medicamentos - List medications with pagination and filters
 *
 * Note: Returns a static response as medications data structure varies
 */

import { NextRequest, NextResponse } from 'next/server';

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

    // For now return a sample response - real implementation would load from data files
    const allMedicamentos = [
      { id: 'metformina', nomeGenerico: 'Metformina', nomesComerciais: ['Glifage'], atcCode: 'A10BA02' },
      { id: 'losartana', nomeGenerico: 'Losartana', nomesComerciais: ['Cozaar'], atcCode: 'C09CA01' },
      { id: 'atorvastatina', nomeGenerico: 'Atorvastatina', nomesComerciais: ['Lipitor'], atcCode: 'C10AA05' }
    ];

    let medicamentos = [...allMedicamentos];

    // Search by name
    if (q) {
      medicamentos = medicamentos.filter(m =>
        m.nomeGenerico.toLowerCase().includes(q) ||
        m.nomesComerciais?.some(n => n.toLowerCase().includes(q))
      );
    }

    const total = medicamentos.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = medicamentos.slice(start, end);

    return NextResponse.json({
      data: paginated.map(m => ({
        id: m.id,
        nomeGenerico: m.nomeGenerico,
        nomesComerciais: m.nomesComerciais,
        atcCode: m.atcCode
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
