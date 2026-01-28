/**
 * API v1: Calculadoras Clínicas
 * GET /api/v1/calculadoras - List all calculators
 * POST /api/v1/calculadoras - Calculate score
 */

import { NextRequest, NextResponse } from 'next/server';
import { calculatorRegistry, getCalculatorOrThrow } from '@/lib/calculators/registry';
import type { CalculatorMetadata } from '@/lib/calculators/types';

export const dynamic = 'force-static';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS });
}

export async function GET() {
  try {
    const calculators = calculatorRegistry.getMetadata() as CalculatorMetadata[];

    return NextResponse.json({
      data: calculators,
      total: calculators.length
    }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error('Error fetching calculators:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

interface CalculationRequest {
  calculatorId: string;
  inputs: Record<string, number | string | boolean>;
}

function normalizeInputs(inputs: Record<string, number | string | boolean>): Record<string, number> {
  const normalized: Record<string, number> = {};

  for (const [key, value] of Object.entries(inputs)) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      normalized[key] = value;
      continue;
    }

    if (typeof value === 'boolean') {
      normalized[key] = value ? 1 : 0;
      continue;
    }

    const parsed = Number(value);
    normalized[key] = Number.isFinite(parsed) ? parsed : 0;
  }

  return normalized;
}

export async function POST(request: NextRequest) {
  try {
    const body: CalculationRequest = await request.json();

    if (!body.calculatorId || !body.inputs) {
      return NextResponse.json(
        { error: 'calculatorId e inputs são obrigatórios' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    let calculator;
    try {
      calculator = getCalculatorOrThrow(body.calculatorId);
    } catch {
      return NextResponse.json(
        { error: 'Calculadora não encontrada' },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    const normalizedInputs = normalizeInputs(body.inputs);
    const score = calculator.calculate(normalizedInputs);
    const interpretation = calculator.interpret(score, normalizedInputs);

    return NextResponse.json({
      calculatorId: body.calculatorId,
      calculatorName: calculator.name,
      inputs: normalizedInputs,
      result: {
        score,
        interpretation,
        riskLevel: interpretation.risk,
        details: interpretation
      }
    }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error('Error calculating score:', error);
    return NextResponse.json(
      { error: 'Erro ao calcular pontuação' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
