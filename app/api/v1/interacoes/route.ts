/**
 * API v1: Interações Medicamentosas
 * POST /api/v1/interacoes - Check drug interactions
 */

import { NextRequest, NextResponse } from 'next/server';
import type { Medicamento } from '@/lib/types/medicamento';

export const dynamic = 'force-static';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS });
}

interface InteractionRequest {
  medications: string[];
}

interface DrugInteraction {
  medications: [string, string];
  severity: 'minor' | 'moderate' | 'major' | 'contraindicated';
  mechanism: string;
  clinicalEffect: string;
  recommendation: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: InteractionRequest = await request.json();

    if (!body.medications || !Array.isArray(body.medications)) {
      return NextResponse.json(
        { error: 'medications deve ser um array de IDs' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    if (body.medications.length < 2) {
      return NextResponse.json(
        { error: 'Pelo menos 2 medicamentos são necessários' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Load medications dynamically
    let medicamentos: Medicamento[] = [];
    try {
      const { medicamentos: allMedicamentos } = await import('@/lib/data/medicamentos');
      medicamentos = allMedicamentos;
    } catch {
      medicamentos = [];
    }

    const interactions: DrugInteraction[] = [];

    // Check each pair of medications
    for (let i = 0; i < body.medications.length; i++) {
      for (let j = i + 1; j < body.medications.length; j++) {
        const med1 = medicamentos.find(m => m.id === body.medications[i]);
        const med2 = medicamentos.find(m => m.id === body.medications[j]);

        if (!med1 || !med2) continue;

        // Check if med1 has interactions with med2
        const interaction = med1.interacoes?.find((int: any) =>
          int.medicamento?.toLowerCase() === med2.nomeGenerico.toLowerCase()
        );

        if (interaction) {
          interactions.push({
            medications: [med1.id, med2.id],
            severity: interaction.gravidade as DrugInteraction['severity'] || 'moderate',
            mechanism: interaction.mecanismo || 'Mecanismo não especificado',
            clinicalEffect: interaction.efeito || 'Efeito clínico não especificado',
            recommendation: interaction.conduta || 'Monitorar paciente'
          });
        }
      }
    }

    return NextResponse.json({
      medicationsChecked: body.medications.length,
      interactionsFound: interactions.length,
      interactions
    }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error('Error checking interactions:', error);
    return NextResponse.json(
      { error: 'Erro ao verificar interações' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
