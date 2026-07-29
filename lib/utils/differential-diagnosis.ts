/**
 * Assistente Virtual para Diagnóstico Diferencial
 * Baseado em árvore de decisão e análise de sintomas
 *
 * Integrado com sintomasDatabase (106 sintomas)
 */

import type { Doenca } from '@/lib/types/doenca';
import { todasDoencas } from '@/lib/data/doencas/index';
import {
  sintomasDatabase,
  buscarSintomas,
  getSintomasPorDoenca,
  type Sintoma,
  type CategoriaSintoma
} from '@/lib/data/sintomas';

// Re-export Sintoma type for external use
export type { Sintoma, CategoriaSintoma };

// Legacy interface for backward compatibility
export interface Symptom {
  id: string;
  nome: string;
  categoria?: CategoriaSintoma;
  importancia: 'alta' | 'media' | 'baixa';
}

export type PatientAgeUnit = 'dias' | 'meses' | 'anos';

export interface PatientClinicalContext {
  ageValue?: number;
  ageUnit?: PatientAgeUnit;
  weightKg?: number;
  sex?: string;
}

export interface DiagnosticPathway {
  sintomaPrincipal: string;
  condicoes: Array<{
    doencaId: string;
    doencaNome: string;
    probabilidade: number; // 0-1
    criterios: {
      presentes: string[];
      ausentes: string[];
      necessarios: string[]; // Critérios obrigatórios
    };
    exames: string[]; // Exames para confirmação
    redFlags: string[]; // Sinais de alarme
  }>;
  proximosPassos: Array<{
    acao: 'exame' | 'observacao' | 'encaminhamento' | 'tratamento';
    descricao: string;
    prioridade: 'alta' | 'media' | 'baixa';
  }>;
}

export interface DifferentialDiagnosisResult {
  sintomaPrincipal: string;
  sintomaDetalhado?: Sintoma; // Rich symptom data from sintomasDatabase
  sintomasSecundarios: string[];
  sintomasSecundariosDetalhados?: Sintoma[]; // Rich data for secondary symptoms
  perguntasChave: string[]; // Key clinical questions to characterize symptoms
  redFlagsSintomas: string[]; // Red flags from symptoms themselves
  contextoPaciente?: PatientClinicalContext;
  diagnosticosDiferenciais: Array<{
    doenca: Partial<Doenca>;
    score: number; // 0-100
    probabilidade: 'alta' | 'moderada' | 'baixa';
    criteriosAtendidos: number;
    criteriosTotais: number;
    examesRecomendados: string[];
    redFlags: string[];
    sintomasRelacionados: string[]; // Symptoms from sintomasDatabase that support this diagnosis
    adequacaoEtaria?: 'preferencial' | 'compativel' | 'menos_provavel';
  }>;
  recomendacoes: {
    exames: Array<{ nome: string; prioridade: 'alta' | 'media' | 'baixa'; justificativa: string }>;
    observacao: string[];
    encaminhamento: Array<{ especialidade: string; motivo: string; urgencia: 'urgente' | 'nao_urgente' }>;
  };
}

/**
 * Normaliza sintomas para comparação
 * Moved up for use in symptom map building
 */
function normalizeSymptom(symptom: string): string {
  return symptom.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function findDoencaByReference(reference: string): Partial<Doenca> | undefined {
  const normalizedReference = normalizeSymptom(reference);
  return todasDoencas.find(doenca => {
    if (doenca.id === reference) return true;
    if (normalizeSymptom(doenca.id || '') === normalizedReference) return true;
    if (normalizeSymptom(doenca.titulo || '') === normalizedReference) return true;
    return doenca.sinonimos?.some(sinonimo => normalizeSymptom(sinonimo) === normalizedReference) ?? false;
  });
}

function symptomSupportsDisease(symptom: Sintoma, diseaseId?: string): boolean {
  if (!diseaseId) return false;
  return symptom.doencasRelacionadas.some(reference => findDoencaByReference(reference)?.id === diseaseId);
}

export function patientAgeInYears(context?: PatientClinicalContext): number | undefined {
  if (context?.ageValue === undefined || !Number.isFinite(context.ageValue) || context.ageValue < 0) return undefined;
  if (context.ageUnit === 'dias') return context.ageValue / 365.25;
  if (context.ageUnit === 'meses') return context.ageValue / 12;
  return context.ageValue;
}

function getAgeAdjustment(
  doenca: Partial<Doenca>,
  context?: PatientClinicalContext
): { adjustment: number; fit?: 'preferencial' | 'compativel' | 'menos_provavel' } {
  const ageYears = patientAgeInYears(context);
  if (ageYears === undefined) return { adjustment: 0 };

  const epidemiologyAge = doenca.fullContent?.epidemiologia?.faixaEtaria || '';
  const identityText = normalizeSymptom([
    doenca.titulo,
    doenca.subcategoria,
    doenca.quickView?.definicao,
    ...(doenca.tags || []),
  ].filter(Boolean).join(' '));
  const searchableText = `${identityText} ${normalizeSymptom(epidemiologyAge)}`;
  const pediatricSpecific = doenca.categoria === 'pediatrico'
    || identityText.includes('pediatr')
    || identityText.includes('crianca')
    || identityText.includes('infancia')
    || identityText.includes('infantil');
  const geriatricSpecific = doenca.categoria === 'geriatrico'
    || identityText.includes('geriatr')
    || identityText.includes('idoso');
  const infantSpecific = searchableText.includes('lactente')
    || searchableText.includes('bronquiolite')
    || searchableText.includes('<2 anos')
    || searchableText.includes('menor de 2 anos');
  const preschoolSpecific = searchableText.includes('<5 anos')
    || searchableText.includes('menor de 5 anos')
    || searchableText.includes('pre-escolar');
  const adultOnly = /adult|acima de (18|40|50|60)|>(18|40|50|60)|apos (40|50|60)/.test(normalizeSymptom(epidemiologyAge));

  let adjustment = 0;
  if (ageYears < 18) {
    if (pediatricSpecific) adjustment += 30;
    if (geriatricSpecific) adjustment -= 55;
    if (adultOnly) adjustment -= 30;
    if (ageYears < 2 && infantSpecific) adjustment += 15;
    if (ageYears < 5 && preschoolSpecific) adjustment += 10;
  } else {
    if (pediatricSpecific) adjustment -= 40;
    if (geriatricSpecific) adjustment += ageYears >= 65 ? 25 : -25;
  }

  return {
    adjustment,
    fit: adjustment >= 15 ? 'preferencial' : adjustment <= -20 ? 'menos_provavel' : 'compativel',
  };
}

/**
 * Builds symptom-to-diagnosis mapping dynamically from sintomasDatabase
 * This replaces the legacy hardcoded SYMPTOM_TO_DIAGNOSIS_MAP
 */
function buildSymptomToDiagnosisMap(): Map<string, { doencas: string[]; peso: number; sintoma: Sintoma }> {
  const map = new Map<string, { doencas: string[]; peso: number; sintoma: Sintoma }>();

  sintomasDatabase.forEach(sintoma => {
    // Map by ID
    map.set(sintoma.id, {
      doencas: sintoma.doencasRelacionadas,
      peso: sintoma.peso,
      sintoma
    });

    // Map by nome (lowercase, normalized)
    const nomeNormalizado = normalizeSymptom(sintoma.nome);
    if (!map.has(nomeNormalizado)) {
      map.set(nomeNormalizado, {
        doencas: sintoma.doencasRelacionadas,
        peso: sintoma.peso,
        sintoma
      });
    }

    // Map by synonyms
    sintoma.sinonimos.forEach(sinonimo => {
      const sinonimoNormalizado = normalizeSymptom(sinonimo);
      if (!map.has(sinonimoNormalizado)) {
        map.set(sinonimoNormalizado, {
          doencas: sintoma.doencasRelacionadas,
          peso: sintoma.peso,
          sintoma
        });
      }
    });
  });

  return map;
}

// Cached symptom map for performance
let _symptomMapCache: Map<string, { doencas: string[]; peso: number; sintoma: Sintoma }> | null = null;

function getSymptomMap(): Map<string, { doencas: string[]; peso: number; sintoma: Sintoma }> {
  if (!_symptomMapCache) {
    _symptomMapCache = buildSymptomToDiagnosisMap();
  }
  return _symptomMapCache;
}

/**
 * Find symptom in database by ID, name, or synonym
 */
export function findSintoma(query: string): Sintoma | undefined {
  const normalizedQuery = normalizeSymptom(query);
  const map = getSymptomMap();
  return map.get(normalizedQuery)?.sintoma || map.get(query)?.sintoma;
}

/**
 * Get all available symptoms for autocomplete/selection
 */
export function getAllSintomas(): Sintoma[] {
  return sintomasDatabase;
}

/**
 * Legacy SYMPTOM_TO_DIAGNOSIS_MAP for backward compatibility
 * Now dynamically built from sintomasDatabase
 */
const SYMPTOM_TO_DIAGNOSIS_MAP: Record<string, {
  doencas: string[];
  peso: number;
}> = Object.fromEntries(
  sintomasDatabase.map(s => [
    normalizeSymptom(s.nome),
    { doencas: s.doencasRelacionadas, peso: s.peso }
  ])
);

/**
 * Árvores de decisão por sintoma principal
 */
const DECISION_TREES: Record<string, {
  sintomasDiferenciais: string[]; // Sintomas que ajudam a diferenciar
  diagnosticos: Array<{
    doencaId: string;
    criterios: {
      obrigatorios: string[]; // Deve ter todos
      sugestivos: string[]; // Fortalece diagnóstico
      exclusivos: string[]; // Se presente, exclui diagnóstico
    };
  }>;
}> = {
  'tosse': {
    sintomasDiferenciais: ['febre', 'dispneia', 'dor no peito', 'expectoracao', 'duracao'],
    diagnosticos: [
      {
        doencaId: 'pneumonia',
        criterios: {
          obrigatorios: ['tosse'],
          sugestivos: ['febre', 'dor no peito', 'expectoracao', 'dispneia'],
          exclusivos: [],
        },
      },
      {
        doencaId: 'asma',
        criterios: {
          obrigatorios: ['tosse', 'dispneia'],
          sugestivos: ['sibilancia', 'historia_familiar'],
          exclusivos: ['febre_alta'],
        },
      },
      {
        doencaId: 'gripe',
        criterios: {
          obrigatorios: ['tosse'],
          sugestivos: ['febre', 'dor_de_garganta', 'coriza'],
          exclusivos: [],
        },
      },
    ],
  },
  'dor abdominal': {
    sintomasDiferenciais: ['localizacao', 'intensidade', 'relacao_alimentacao', 'nausea', 'vomito'],
    diagnosticos: [
      {
        doencaId: 'gastrite',
        criterios: {
          obrigatorios: ['dor abdominal'],
          sugestivos: ['epigastrio', 'relacao_alimentacao', 'nausea', 'azia'],
          exclusivos: ['febre_alta', 'defesa_muscular'],
        },
      },
      {
        doencaId: 'apendicite',
        criterios: {
          obrigatorios: ['dor abdominal'],
          sugestivos: ['fossa_iliaca_direita', 'febre', 'nausea', 'vomito', 'defesa_muscular'],
          exclusivos: [],
        },
      },
      {
        doencaId: 'doenca-refluxo-gastroesofagico',
        criterios: {
          obrigatorios: ['dor abdominal', 'azia'],
          sugestivos: ['regurgitacao', 'pirose', 'pos_prandial'],
          exclusivos: [],
        },
      },
    ],
  },
  'disuria': {
    sintomasDiferenciais: ['frequencia', 'ardor', 'hematuria', 'febre', 'dor_lombar'],
    diagnosticos: [
      {
        doencaId: 'itu',
        criterios: {
          obrigatorios: ['disuria'],
          sugestivos: ['poliuria', 'hematuria', 'febre', 'dor_lombar'],
          exclusivos: [],
        },
      },
      {
        doencaId: 'cistite',
        criterios: {
          obrigatorios: ['disuria'],
          sugestivos: ['poliuria', 'hematuria'],
          exclusivos: ['febre_alta', 'dor_lombar'],
        },
      },
    ],
  },
  'cefaleia': {
    sintomasDiferenciais: ['localizacao', 'intensidade', 'duracao', 'fotofobia', 'fonofobia'],
    diagnosticos: [
      {
        doencaId: 'migranea',
        criterios: {
          obrigatorios: ['cefaleia'],
          sugestivos: ['unilateral', 'pulsatil', 'fotofobia', 'fonofobia', 'nausea'],
          exclusivos: [],
        },
      },
      {
        doencaId: 'cefaleia-tensional',
        criterios: {
          obrigatorios: ['cefaleia'],
          sugestivos: ['bilateral', 'pressao', 'estresse'],
          exclusivos: ['fotofobia', 'fonofobia'],
        },
      },
      {
        doencaId: 'hipertensao-arterial',
        criterios: {
          obrigatorios: ['cefaleia'],
          sugestivos: ['occipital', 'matinal', 'hipertensao'],
          exclusivos: [],
        },
      },
    ],
  },
};

/**
 * Calcula score de diagnóstico baseado em sintomas
 */
function calculateDiagnosisScore(
  doenca: Partial<Doenca>,
  sintomasPresentes: string[],
  sintomasAusentes: string[] = [],
  sintomasDetalhados: Sintoma[] = [],
  patientContext?: PatientClinicalContext
): {
  score: number;
  criteriosAtendidos: number;
  criteriosTotais: number;
  probabilidade: 'alta' | 'moderada' | 'baixa';
  adequacaoEtaria?: 'preferencial' | 'compativel' | 'menos_provavel';
} {
  if (!doenca.quickView?.criteriosDiagnosticos) {
    return { score: 0, criteriosAtendidos: 0, criteriosTotais: 0, probabilidade: 'baixa' };
  }

  const criteriosDiagnosticos = doenca.quickView.criteriosDiagnosticos
    .filter(criterio => normalizeSymptom(criterio).length > 0);
  const sintomasNormalizados = sintomasPresentes.map(normalizeSymptom);
  const ausentesNormalizados = sintomasAusentes.map(normalizeSymptom);

  // Verifica quantos critérios diagnósticos estão presentes
  let criteriosAtendidos = 0;
  let criteriosNecessarios = 0;
  const sintomasCobertos = new Set<number>();

  criteriosDiagnosticos.forEach(criterio => {
    const criterioNormalizado = normalizeSymptom(criterio);
    const criterioNegado = criterioNormalizado.includes('ausencia de')
      || criterioNormalizado.startsWith('sem ');
    
    // Verifica se o critério está presente nos sintomas
    const sintomasCorrespondentes = sintomasNormalizados
      .map((sintoma, index) => ({ sintoma, index }))
      .filter(({ sintoma }) => criterioNormalizado.includes(sintoma) || sintoma.includes(criterioNormalizado));
    const sintomaCorrespondente = sintomasCorrespondentes.length > 0;
    const ausenciaCorrespondente = ausentesNormalizados.some(sintoma =>
      criterioNormalizado.includes(sintoma) || sintoma.includes(criterioNormalizado)
    );
    const presente = criterioNegado ? ausenciaCorrespondente && !sintomaCorrespondente : sintomaCorrespondente;

    if (presente) {
      criteriosAtendidos++;
      if (!criterioNegado) sintomasCorrespondentes.forEach(({ index }) => sintomasCobertos.add(index));
    }

    // Critérios que contêm palavras-chave importantes são necessários
    if (criterio.toLowerCase().includes('deve') || 
        criterio.toLowerCase().includes('obrigatório') ||
        criterio.toLowerCase().includes('necessário')) {
      criteriosNecessarios++;
    }
  });

  const criteriosTotais = criteriosDiagnosticos.length;

  // Combina aderência aos critérios com o número e o peso dos sintomas
  // explicitamente relacionados à doença. Isso reduz falsos positivos de
  // condições com critérios curtos e genéricos.
  const criteriaMatchRatio = criteriosAtendidos / criteriosTotais;
  const inputCoverage = sintomasNormalizados.length > 0 ? sintomasCobertos.size / sintomasNormalizados.length : 0;
  const criteriaScore = (criteriaMatchRatio * 30) + (inputCoverage * 25);
  const totalSymptomWeight = sintomasDetalhados.reduce((total, symptom) => total + symptom.peso, 0);
  const supportedSymptomWeight = sintomasDetalhados
    .filter(symptom => symptomSupportsDisease(symptom, doenca.id))
    .reduce((total, symptom) => total + symptom.peso, 0);
  const symptomSupportScore = totalSymptomWeight > 0
    ? (supportedSymptomWeight / totalSymptomWeight) * 45
    : 0;
  let scoreBase = criteriaScore + symptomSupportScore;

  // Penaliza se houver sintomas que excluem o diagnóstico
  if (doenca.quickView.redFlags) {
    const redFlagsPresentes = doenca.quickView.redFlags.filter(redFlag =>
      ausentesNormalizados.some(ausente => 
        normalizeSymptom(redFlag).includes(ausente) || ausente.includes(normalizeSymptom(redFlag))
      )
    );
    scoreBase -= redFlagsPresentes.length * 10; // Penalidade por red flags ausentes quando esperadas
  }

  const ageAdjustment = getAgeAdjustment(doenca, patientContext);
  const symptomRelevance = totalSymptomWeight > 0 ? supportedSymptomWeight / totalSymptomWeight : 0;
  const ageRelevance = Math.max(inputCoverage, symptomRelevance);
  scoreBase += ageAdjustment.adjustment > 0
    ? ageAdjustment.adjustment * ageRelevance
    : ageAdjustment.adjustment;

  // Normaliza score entre 0-100
  const score = Math.max(0, Math.min(100, scoreBase));

  // Determina probabilidade
  let probabilidade: 'alta' | 'moderada' | 'baixa';
  if (score >= 70) {
    probabilidade = 'alta';
  } else if (score >= 40) {
    probabilidade = 'moderada';
  } else {
    probabilidade = 'baixa';
  }

  return {
    score,
    criteriosAtendidos,
    criteriosTotais,
    probabilidade,
    adequacaoEtaria: ageAdjustment.fit,
  };
}

/**
 * Gera diagnóstico diferencial baseado em sintomas
 * Enhanced with sintomasDatabase integration
 */
export function generateDifferentialDiagnosis(
  sintomaPrincipal: string,
  sintomasSecundarios: string[] = [],
  sintomasAusentes: string[] = [],
  patientContext?: PatientClinicalContext
): DifferentialDiagnosisResult {
  const sintomaPrincipalNormalizado = normalizeSymptom(sintomaPrincipal);
  const sintomasSecundariosNormalizados = sintomasSecundarios.map(normalizeSymptom);
  const todosSintomas = [sintomaPrincipalNormalizado, ...sintomasSecundariosNormalizados];

  // Get rich symptom data from sintomasDatabase
  const symptomMap = getSymptomMap();
  const sintomaDetalhado = symptomMap.get(sintomaPrincipalNormalizado)?.sintoma ||
    symptomMap.get(sintomaPrincipal)?.sintoma ||
    findSintoma(sintomaPrincipal);

  // Get detailed data for secondary symptoms
  const sintomasSecundariosDetalhados = sintomasSecundarios
    .map(s => findSintoma(s))
    .filter((s): s is Sintoma => s !== undefined);
  const sintomasDetalhados = [sintomaDetalhado, ...sintomasSecundariosDetalhados]
    .filter((s): s is Sintoma => s !== undefined);

  // Collect key clinical questions from all symptoms
  const perguntasChave: string[] = [];
  const redFlagsSintomas: string[] = [];

  if (sintomaDetalhado) {
    perguntasChave.push(...(sintomaDetalhado.perguntasChave || []));
    redFlagsSintomas.push(...(sintomaDetalhado.redFlags || []));
  }
  sintomasSecundariosDetalhados.forEach(s => {
    perguntasChave.push(...(s.perguntasChave || []));
    redFlagsSintomas.push(...(s.redFlags || []));
  });

  // Remove duplicates
  const uniquePerguntasChave = [...new Set(perguntasChave)];
  const uniqueRedFlagsSintomas = [...new Set(redFlagsSintomas)];

  // Busca doenças relacionadas ao sintoma principal
  const doencasCandidatas = new Map<string, Partial<Doenca>>();
  const addCandidate = (reference: string) => {
    const doenca = findDoencaByReference(reference);
    if (doenca?.id) doencasCandidatas.set(doenca.id, doenca);
  };

  // 1. Enhanced search using sintomasDatabase first
  if (sintomaDetalhado) {
    sintomaDetalhado.doencasRelacionadas.forEach(addCandidate);
  }

  // 2. Also search secondary symptoms in sintomasDatabase
  sintomasSecundariosDetalhados.forEach(sintoma => {
    sintoma.doencasRelacionadas.forEach(addCandidate);
  });

  // 3. Fallback: Busca direta pelo mapeamento de sintomas (legacy)
  Object.entries(SYMPTOM_TO_DIAGNOSIS_MAP).forEach(([sintoma, mapping]) => {
    if (normalizeSymptom(sintoma) === sintomaPrincipalNormalizado ||
        sintomaPrincipalNormalizado.includes(normalizeSymptom(sintoma))) {
      mapping.doencas.forEach(doencaId => {
        addCandidate(doencaId);
      });
    }
  });

  // 4. Busca por sintomas secundários no mapeamento legacy
  sintomasSecundariosNormalizados.forEach(sintomaSec => {
    Object.entries(SYMPTOM_TO_DIAGNOSIS_MAP).forEach(([sintoma, mapping]) => {
      if (normalizeSymptom(sintoma) === sintomaSec || sintomaSec.includes(normalizeSymptom(sintoma))) {
        mapping.doencas.forEach(doencaId => {
          addCandidate(doencaId);
        });
      }
    });
  });

  // 5. Busca por termos nos critérios diagnósticos
  todasDoencas.forEach(doenca => {
    if (doenca.id && doenca.quickView?.criteriosDiagnosticos) {
      const criteriosTexto = doenca.quickView.criteriosDiagnosticos.join(' ').toLowerCase();
      const temSintomaPrincipal = todosSintomas.some(sintoma =>
        criteriosTexto.includes(sintoma) || (doenca.titulo && doenca.titulo.toLowerCase().includes(sintoma))
      );

      if (temSintomaPrincipal && !doencasCandidatas.has(doenca.id)) {
        doencasCandidatas.set(doenca.id, doenca);
      }
    }
  });

  // Calcula scores para cada doença candidata
  const diagnosticosDiferenciais = Array.from(doencasCandidatas.values())
    .map(doenca => {
      const { score, criteriosAtendidos, criteriosTotais, probabilidade, adequacaoEtaria } =
        calculateDiagnosisScore(doenca, todosSintomas, sintomasAusentes, sintomasDetalhados, patientContext);

      // Find symptoms from sintomasDatabase that support this diagnosis
      const sintomasRelacionados = doenca.id
        ? getSintomasPorDoenca(doenca.id).map(s => s.nome)
        : [];

      return {
        doenca,
        score,
        probabilidade,
        criteriosAtendidos,
        criteriosTotais,
        examesRecomendados: doenca.quickView?.examesIniciais || [],
        redFlags: doenca.quickView?.redFlags || [],
        sintomasRelacionados,
        adequacaoEtaria,
      };
    })
    .filter(result => result.score > 0) // Remove doenças com score zero
    .sort((a, b) => b.score - a.score) // Ordena por score decrescente
    .slice(0, 10); // Top 10 diagnósticos diferenciais

  // Gera recomendações
  const examesRecomendados = new Map<string, { prioridade: 'alta' | 'media' | 'baixa'; justificativa: string }>();
  
  diagnosticosDiferenciais.forEach(diff => {
    if (diff.probabilidade === 'alta') {
      diff.examesRecomendados.forEach(exame => {
        if (!examesRecomendados.has(exame)) {
          examesRecomendados.set(exame, {
            prioridade: 'alta',
            justificativa: `Confirmar diagnóstico de ${diff.doenca.titulo || diff.doenca.id}`,
          });
        }
      });
    }
  });

  // Determina necessidade de encaminhamento
  const encaminhamentos: Array<{ especialidade: string; motivo: string; urgencia: 'urgente' | 'nao_urgente' }> = [];
  
  diagnosticosDiferenciais
    .filter(diff => diff.probabilidade === 'alta' && diff.redFlags.length > 0)
    .forEach(diff => {
      if (diff.doenca.categoria === 'cardiovascular') {
        encaminhamentos.push({
          especialidade: 'Cardiologia',
          motivo: `Sinais de alarme para ${diff.doenca.titulo || diff.doenca.id}`,
          urgencia: 'urgente',
        });
      } else if (diff.doenca.categoria === 'neurologico') {
        encaminhamentos.push({
          especialidade: 'Neurologia',
          motivo: `Avaliar ${diff.doenca.titulo || diff.doenca.id}`,
          urgencia: diff.redFlags.some(rf => rf.toLowerCase().includes('urgente')) ? 'urgente' : 'nao_urgente',
        });
      }
    });

  return {
    sintomaPrincipal,
    sintomaDetalhado,
    sintomasSecundarios,
    sintomasSecundariosDetalhados,
    perguntasChave: uniquePerguntasChave,
    redFlagsSintomas: uniqueRedFlagsSintomas,
    contextoPaciente: patientContext,
    diagnosticosDiferenciais,
    recomendacoes: {
      exames: Array.from(examesRecomendados.entries()).map(([nome, info]) => ({
        nome,
        ...info,
      })),
      observacao: diagnosticosDiferenciais
        .filter(diff => diff.probabilidade === 'baixa')
        .map(diff => `Observar evolução de ${diff.doenca.titulo || diff.doenca.id}`),
      encaminhamento: encaminhamentos,
    },
  };
}

/**
 * Gera caminho de decisão diagnóstica (árvore de decisão)
 */
export function generateDiagnosticPathway(
  sintomaPrincipal: string,
  sintomasSecundarios: string[] = []
): DiagnosticPathway | null {
  const tree = DECISION_TREES[sintomaPrincipal.toLowerCase()];
  if (!tree) return null;

  const diagnosticos = tree.diagnosticos.map(diagTree => {
    const doenca = findDoencaByReference(diagTree.doencaId);
    if (!doenca) return null;

    const { score, criteriosAtendidos, criteriosTotais } = calculateDiagnosisScore(
      doenca,
      [sintomaPrincipal, ...sintomasSecundarios],
      [],
      [findSintoma(sintomaPrincipal), ...sintomasSecundarios.map(findSintoma)]
        .filter((s): s is Sintoma => s !== undefined),
      undefined
    );

    const criteriosPresentes = diagTree.criterios.obrigatorios.filter(crit =>
      sintomasSecundarios.some(sint => normalizeSymptom(sint).includes(normalizeSymptom(crit)))
    );

    const criteriosAusentes = diagTree.criterios.exclusivos.filter(crit =>
      sintomasSecundarios.some(sint => normalizeSymptom(sint).includes(normalizeSymptom(crit)))
    );

    return {
      doencaId: doenca.id,
      doencaNome: doenca.titulo || doenca.id,
      probabilidade: score / 100,
      criterios: {
        presentes: criteriosPresentes,
        ausentes: criteriosAusentes,
        necessarios: diagTree.criterios.obrigatorios,
      },
      exames: doenca.quickView?.examesIniciais || [],
      redFlags: doenca.quickView?.redFlags || [],
    };
  }).filter(Boolean) as DiagnosticPathway['condicoes'];

  return {
    sintomaPrincipal,
    condicoes: diagnosticos,
    proximosPassos: [],
  };
}
