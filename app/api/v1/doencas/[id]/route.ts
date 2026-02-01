/**
 * API v1: Doença por ID
 * GET /api/v1/doencas/[id] - Get single disease by slug
 */

import { NextRequest, NextResponse } from 'next/server';
import { doencasConsolidadas as doencas } from '@/lib/data/doencas/index';
import type { Doenca } from '@/lib/types/doenca';

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

// Generate static params - limited on Vercel to reduce deployment size
export async function generateStaticParams() {
  if (isVercel) {
    // On Vercel: generate only top 50 diseases statically
    const topDiseases = doencas.slice(0, 50);
    return topDiseases.map((d) => ({
      id: d.id,
    }));
  }
  // For static export: generate all
  return doencas.map((d) => ({
    id: d.id,
  }));
}
