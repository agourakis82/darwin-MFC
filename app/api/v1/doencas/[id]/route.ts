/**
 * API v1: Doença por ID
 * GET /api/v1/doencas/[id] - Get single disease by slug
 *
 * Fetches from Supabase when configured, falls back to static data
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDoencaById, getDoencas } from '@/lib/data/supabase-data';

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

    const doenca = await getDoencaById(id);

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

// Generate static params - limited for smaller deployment size
export async function generateStaticParams() {
  // Only pre-generate top 20 for faster builds
  // Rest will be generated on-demand with ISR
  const diseases = await getDoencas();
  return diseases.slice(0, 20).map((d) => ({
    id: d.id,
  }));
}
