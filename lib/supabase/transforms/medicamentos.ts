import type { Database } from '@/lib/supabase/types';
import type { ClasseTerapeutica, Medicamento } from '@/lib/types/medicamento';

export type MedicamentoRow = Database['public']['Tables']['medicamentos']['Row'];

export function convertMedicamentoRowToMedicamento(row: MedicamentoRow): Medicamento {
  // Parse apresentacoes from string array.
  const apresentacoes = (row.apresentacoes || []).map((ap) => {
    const match = ap.match(/^(\w+)\\s+(.+?)(?:\\s+\\((.+)\\))?(?:\\s+\\[SUS\\])?$/);
    const disponivelSUS = ap.includes('[SUS]');
    return {
      forma: (match?.[1] || 'comprimido') as Medicamento['apresentacoes'][0]['forma'],
      concentracao: match?.[2] || ap,
      quantidade: match?.[3],
      disponivelSUS,
    };
  });

  // Parse posologia from JSON.
  const posologiaArray = Array.isArray(row.posologia) ? row.posologia : [];
  const posologias = posologiaArray.map((pos) => {
    const posObj = pos as Record<string, unknown>;
    return {
      indicacao: String(posObj.indicacao || ''),
      adultos: posObj.adultos as Medicamento['posologias'][0]['adultos'],
      pediatrico: posObj.pediatrico as Medicamento['posologias'][0]['pediatrico'],
      idosos: posObj.idosos as Medicamento['posologias'][0]['idosos'],
    };
  });

  // Parse interacoes from JSON.
  const interacoesArray = Array.isArray(row.interacoes) ? row.interacoes : [];
  const interacoes = interacoesArray.map((int) => {
    const intObj = int as Record<string, unknown>;
    return {
      medicamento: String(intObj.medicamento || ''),
      gravidade: String(intObj.gravidade || 'moderada') as Medicamento['interacoes'][0]['gravidade'],
      efeito: String(intObj.efeito || ''),
      mecanismo: intObj.mecanismo ? String(intObj.mecanismo) : undefined,
      conduta: String(intObj.conduta || ''),
    };
  });

  const efeitosAdversos = row.efeitos_adversos as { comuns?: string[]; graves?: string[] } | null;
  const ajusteDose = row.ajuste_dose as { renal?: Array<{ tfg: string; ajuste: string; observacao?: string }> } | null;

  // Parse lactacao -> Medicamento.amamentacao.
  const lactacaoStr = row.lactacao || '';
  const lactacaoCompativel = lactacaoStr.toLowerCase().startsWith('compatível');
  const lactacaoObs = lactacaoStr.replace(/^(Compatível|Não compatível):\\s*/, '');

  return {
    id: row.id,
    nomeGenerico: row.nome_generico,
    nomesComerciais: row.nome_comercial || undefined,

    atcCode: row.atc_code || undefined,
    rxNormCui: row.rxnorm_cui || undefined,
    drugBankId: row.drugbank_id || undefined,
    snomedCT: row.snomed_ct || undefined,
    loinc: row.loinc || undefined,
    pharmgkb: Array.isArray(row.pharmgkb) ? row.pharmgkb as unknown as Medicamento['pharmgkb'] : undefined,

    regionalOverlays: row.regional_overlays as unknown as Medicamento['regionalOverlays'],

    classeTerapeutica: row.classe_terapeutica as ClasseTerapeutica,
    subclasse: row.subclasse as Medicamento['subclasse'],
    rename: row.disponivel_sus,
    apresentacoes,
    indicacoes: row.indicacoes || [],
    mecanismoAcao: row.mecanismo_acao || '',
    posologias,
    contraindicacoes: row.contraindicacoes || [],
    efeitosAdversos: {
      comuns: efeitosAdversos?.comuns || [],
      graves: efeitosAdversos?.graves,
    },
    interacoes,
    ajusteDoseRenal: ajusteDose?.renal,
    gestacao: (row.gestacao || 'N') as Medicamento['gestacao'],
    amamentacao: {
      compativel: lactacaoCompativel,
      observacao: lactacaoObs || 'Dados não disponíveis',
    },
    consideracoesEspeciais: {
      idosos: row.idoso || undefined,
      hepatopatas: row.insuficiencia_hepatica || undefined,
      pediatrico: row.pediatrico || undefined,
    },
    monitorizacao: row.monitoramento || undefined,
    doencasRelacionadas: [],
    citations: Array.isArray(row.referencias) ? row.referencias as unknown as Medicamento['citations'] : [],
    lastUpdate: row.updated_at,
    tags: undefined,
  };
}

