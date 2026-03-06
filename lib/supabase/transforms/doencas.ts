import type { Database } from '@/lib/supabase/types';
import type { CategoriaDoenca, Doenca } from '@/lib/types/doenca';
import type { Citation } from '@/lib/types/references';

export type DoencaRow = Database['public']['Tables']['doencas']['Row'];

export function convertDoencaRowToDoenca(row: DoencaRow): Doenca {
  const epidemioData = row.epidemiologia as Record<string, unknown> | null;
  const quadroData = row.quadro_clinico as Record<string, unknown> | null;
  const diagnosticoData = row.diagnostico as Record<string, unknown> | null;
  const tratamentoData = row.tratamento as Record<string, unknown> | null;
  const criteriosData = row.criterios_diagnosticos as Record<string, unknown> | null;

  const referencias = Array.isArray(row.referencias) ? row.referencias as unknown as Citation[] : [];

  const quickView: Doenca['quickView'] = {
    definicao: row.descricao || '',
    criteriosDiagnosticos: Array.isArray(criteriosData?.criterios)
      ? criteriosData.criterios as string[]
      : Array.isArray(quadroData?.sintomas)
        ? quadroData.sintomas as string[]
        : [],
    tratamentoPrimeiraLinha: {
      naoFarmacologico: Array.isArray(tratamentoData?.nao_farmacologico)
        ? tratamentoData.nao_farmacologico as string[]
        : [],
      farmacologico: Array.isArray(tratamentoData?.farmacologico)
        ? (tratamentoData.farmacologico as Array<Record<string, unknown>>).map(
            (f) => String(f.classe || f.medicamento || f)
          )
        : [],
    },
    redFlags: row.quando_encaminhar || [],
  };

  const fullContent: Doenca['fullContent'] = {
    epidemiologia: {
      prevalencia: epidemioData?.prevalencia ? String(epidemioData.prevalencia) : undefined,
      incidencia: epidemioData?.incidencia ? String(epidemioData.incidencia) : undefined,
      mortalidade: epidemioData?.mortalidade ? String(epidemioData.mortalidade) : undefined,
      faixaEtaria: epidemioData?.faixa_etaria ? String(epidemioData.faixa_etaria) : undefined,
      fatoresRisco: Array.isArray(epidemioData?.fatores_risco) ? epidemioData.fatores_risco as string[] : [],
      citations: referencias,
    },
    fisiopatologia: row.fisiopatologia ? { texto: row.fisiopatologia, citations: referencias } : undefined,
    quadroClinico: {
      sintomasPrincipais: Array.isArray(quadroData?.sintomas) ? quadroData.sintomas as string[] : [],
      sinaisExameFisico: Array.isArray(quadroData?.sinais) ? quadroData.sinais as string[] : [],
      formasClinicas: quadroData?.apresentacao_tipica ? [String(quadroData.apresentacao_tipica)] : undefined,
      citations: referencias,
    },
    diagnostico: {
      criterios: Array.isArray(diagnosticoData?.clinico)
        ? diagnosticoData.clinico as string[]
        : diagnosticoData?.clinico
          ? [String(diagnosticoData.clinico)]
          : [],
      diagnosticoDiferencial: Array.isArray(diagnosticoData?.diferencial)
        ? diagnosticoData.diferencial as string[]
        : [],
      examesLaboratoriais: Array.isArray(diagnosticoData?.laboratorial)
        ? diagnosticoData.laboratorial as string[]
        : diagnosticoData?.laboratorial
          ? [String(diagnosticoData.laboratorial)]
          : undefined,
      examesImagem: Array.isArray(diagnosticoData?.imagem)
        ? diagnosticoData.imagem as string[]
        : diagnosticoData?.imagem
          ? [String(diagnosticoData.imagem)]
          : undefined,
      citations: referencias,
    },
    tratamento: {
      objetivos: [],
      naoFarmacologico: {
        medidas: Array.isArray(tratamentoData?.nao_farmacologico) ? tratamentoData.nao_farmacologico as string[] : [],
        citations: referencias,
      },
      farmacologico: {
        primeiraLinha: Array.isArray(tratamentoData?.farmacologico)
          ? (tratamentoData.farmacologico as Array<Record<string, unknown>>).map((f) => ({
              classe: String(f.classe || ''),
              medicamentos: Array.isArray(f.medicamentos) ? f.medicamentos as string[] : [],
              posologia: f.posologia ? String(f.posologia) : undefined,
              observacoes: f.observacoes ? String(f.observacoes) : undefined,
            }))
          : [],
        citations: referencias,
      },
    },
    acompanhamento: {
      frequenciaConsultas: '',
      metasTerapeuticas: [],
      criteriosEncaminhamento: row.quando_encaminhar || [],
      citations: referencias,
    },
    prevencao: row.prevencao ? { primaria: row.prevencao, secundaria: [], citations: referencias } : undefined,
  };

  const cid10 = row.cid10 ? row.cid10.split(',').map((c) => c.trim()).filter(Boolean) : [];
  const ciap2 = row.ciap2 ? row.ciap2.split(',').map((c) => c.trim()).filter(Boolean) : [];

  return {
    id: row.id,
    titulo: row.nome,
    sinonimos: row.nome_alternativo || undefined,

    ciap2,
    cid10,
    categoria: row.categoria as CategoriaDoenca,
    subcategoria: row.subcategoria || undefined,

    quickView,
    fullContent,
    protocolos: row.protocolos_relacionados || [],
    medicamentos: row.medicamentos_relacionados || [],
    calculadoras: [],
    citations: referencias,
    lastUpdate: row.updated_at,
    regionalOverlays: row.regional_overlays as unknown as Doenca['regionalOverlays'],
  };
}

