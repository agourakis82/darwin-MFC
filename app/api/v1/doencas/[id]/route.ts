/**
 * API v1: Doença por ID
 * GET /api/v1/doencas/[id] - Get single disease by slug
 */

import { NextRequest, NextResponse } from 'next/server';
import { doencasConsolidadas as doencas } from '@/lib/data/doencas/index';
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

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const doenca = doencas.find(d => d.id === id) as Doenca | undefined;

    if (!doenca) {
      return NextResponse.json(
        { error: 'Doença não encontrada' },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json(doenca, { headers: CORS_HEADERS });
  } catch (error) {
    console.error('Error fetching doença:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// Generate static params for all diseases
export async function generateStaticParams() {
  return doencas.map((d) => ({
    id: d.id,
  }));
}
