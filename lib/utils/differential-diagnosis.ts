/**
 * Assistente Virtual para Diagnóstico Diferencial
 * Baseado em árvore de decisão e análise de sintomas
 */

import type { Doenca } from '@/lib/types/doenca';
import { todasDoencas } from '@/lib/data/doencas/index';

export interface Symptom {
  id: string;
  nome: string;
  categoria?: 'geral' | 'respiratorio' | 'cardiovascular' | 'gastrointestinal' | 'neurologico' | 'dermatologico' | 'urologico' | 'ginecologico';
  importancia: 'alta' | 'media' | 'baixa'; // Peso na decisão diagnóstica
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
  sintomasSecundarios: string[];
  diagnosticosDiferenciais: Array<{
    doenca: Partial<Doenca>;
    score: number; // 0-100
    probabilidade: 'alta' | 'moderada' | 'baixa';
    criteriosAtendidos: number;
    criteriosTotais: number;
    examesRecomendados: string[];
    redFlags: string[];
  }>;
  recomendacoes: {
    exames: Array<{ nome: string; prioridade: 'alta' | 'media' | 'baixa'; justificativa: string }>;
    observacao: string[];
    encaminhamento: Array<{ especialidade: string; motivo: string; urgencia: 'urgente' | 'nao_urgente' }>;
  };
}

/**
 * Mapeamento de sintomas para possíveis diagnósticos
 * Baseado em evidência clínica e literatura médica
 */
const SYMPTOM_TO_DIAGNOSIS_MAP: Record<string, {
  doencas: string[];
  peso: number; // 0-1, importância do sintoma para cada doença
}> = {
  'tosse': {
    doencas: ['gripe', 'resfriado', 'pneumonia', 'asma', 'dpoc', 'tuberculose', 'doenca-refluxo-gastroesofagico'],
    peso: 0.7,
  },
  'febre': {
    doencas: ['gripe', 'pneumonia', 'tuberculose', 'itu', 'gastroenterite-viral'],
    peso: 0.8,
  },
  'dor de garganta': {
    doencas: ['amigdalite', 'faringite', 'gripe', 'resfriado'],
    peso: 0.9,
  },
  'dispneia': {
    doencas: ['asma', 'dpoc', 'pneumonia', 'insuficiencia-cardiaca', 'ansiedade'],
    peso: 0.9,
  },
  'dor no peito': {
    doencas: ['angina', 'infarto', 'ansiedade', 'gastrite', 'doenca-refluxo-gastroesofagico'],
    peso: 0.9,
  },
  'cefaleia': {
    doencas: ['migranea', 'cefaleia-tensional', 'hipertensao-arterial', 'sinusite'],
    peso: 0.7,
  },
  'dor abdominal': {
    doencas: ['gastrite', 'doenca-refluxo-gastroesofagico', 'apendicite', 'sindrome-intestino-irritavel'],
    peso: 0.8,
  },
  'nausea': {
    doencas: ['gastrite', 'doenca-refluxo-gastroesofagico', 'gastroenterite-viral'],
    peso: 0.6,
  },
  'diarreia': {
    doencas: ['gastroenterite-viral', 'sindrome-intestino-irritavel'],
    peso: 0.9,
  },
  'constipacao': {
    doencas: ['sindrome-intestino-irritavel', 'constipacao'],
    peso: 0.8,
  },
  'disuria': {
    doencas: ['itu', 'cistite'],
    peso: 0.95,
  },
  'poliuria': {
    doencas: ['diabetes-mellitus-tipo-2', 'itu'],
    peso: 0.7,
  },
  'prurido': {
    doencas: ['urticaria', 'dermatite', 'alergia'],
    peso: 0.8,
  },
  'rash': {
    doencas: ['urticaria', 'dermatite', 'alergia'],
    peso: 0.9,
  },
};

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
 * Normaliza sintomas para comparação
 */
function normalizeSymptom(symptom: string): string {
  return symptom.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Calcula score de diagnóstico baseado em sintomas
 */
function calculateDiagnosisScore(
  doenca: Partial<Doenca>,
  sintomasPresentes: string[],
  sintomasAusentes: string[] = []
): {
  score: number;
  criteriosAtendidos: number;
  criteriosTotais: number;
  probabilidade: 'alta' | 'moderada' | 'baixa';
} {
  if (!doenca.quickView?.criteriosDiagnosticos) {
    return { score: 0, criteriosAtendidos: 0, criteriosTotais: 0, probabilidade: 'baixa' };
  }

  const criteriosDiagnosticos = doenca.quickView.criteriosDiagnosticos;
  const sintomasNormalizados = sintomasPresentes.map(normalizeSymptom);
  const ausentesNormalizados = sintomasAusentes.map(normalizeSymptom);

  // Verifica quantos critérios diagnósticos estão presentes
  let criteriosAtendidos = 0;
  let criteriosNecessarios = 0;

  criteriosDiagnosticos.forEach(criterio => {
    const criterioNormalizado = normalizeSymptom(criterio);
    
    // Verifica se o critério está presente nos sintomas
    const presente = sintomasNormalizados.some(sintoma => 
      criterioNormalizado.includes(sintoma) || sintoma.includes(criterioNormalizado)
    );

    if (presente) {
      criteriosAtendidos++;
    }

    // Critérios que contêm palavras-chave importantes são necessários
    if (criterio.toLowerCase().includes('deve') || 
        criterio.toLowerCase().includes('obrigatório') ||
        criterio.toLowerCase().includes('necessário')) {
      criteriosNecessarios++;
    }
  });

  const criteriosTotais = criteriosDiagnosticos.length;

  // Calcula score baseado na proporção de critérios atendidos
  let scoreBase = (criteriosAtendidos / criteriosTotais) * 100;

  // Ajusta score baseado em sintomas específicos da doença
  const sintomaMapping = SYMPTOM_TO_DIAGNOSIS_MAP[doenca.titulo?.toLowerCase() || ''];
  if (sintomaMapping) {
    scoreBase += sintomaMapping.peso * 20; // Bônus por mapeamento direto
  }

  // Penaliza se houver sintomas que excluem o diagnóstico
  if (doenca.quickView.redFlags) {
    const redFlagsPresentes = doenca.quickView.redFlags.filter(redFlag =>
      ausentesNormalizados.some(ausente => 
        normalizeSymptom(redFlag).includes(ausente) || ausente.includes(normalizeSymptom(redFlag))
      )
    );
    scoreBase -= redFlagsPresentes.length * 10; // Penalidade por red flags ausentes quando esperadas
  }

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
  };
}

/**
 * Gera diagnóstico diferencial baseado em sintomas
 */
export function generateDifferentialDiagnosis(
  sintomaPrincipal: string,
  sintomasSecundarios: string[] = [],
  sintomasAusentes: string[] = []
): DifferentialDiagnosisResult {
  const sintomaPrincipalNormalizado = normalizeSymptom(sintomaPrincipal);
  const sintomasSecundariosNormalizados = sintomasSecundarios.map(normalizeSymptom);
  const todosSintomas = [sintomaPrincipalNormalizado, ...sintomasSecundariosNormalizados];

  // Busca doenças relacionadas ao sintoma principal
  const doencasCandidatas = new Map<string, Partial<Doenca>>();

  // 1. Busca direta pelo mapeamento de sintomas
  Object.entries(SYMPTOM_TO_DIAGNOSIS_MAP).forEach(([sintoma, mapping]) => {
    if (normalizeSymptom(sintoma) === sintomaPrincipalNormalizado || 
        sintomaPrincipalNormalizado.includes(normalizeSymptom(sintoma))) {
      mapping.doencas.forEach(doencaId => {
        const doenca = todasDoencas.find(d => d.id === doencaId);
        if (doenca) {
          doencasCandidatas.set(doencaId, doenca);
        }
      });
    }
  });

  // 2. Busca por sintomas secundários
  sintomasSecundariosNormalizados.forEach(sintomaSec => {
    Object.entries(SYMPTOM_TO_DIAGNOSIS_MAP).forEach(([sintoma, mapping]) => {
      if (normalizeSymptom(sintoma) === sintomaSec || sintomaSec.includes(normalizeSymptom(sintoma))) {
        mapping.doencas.forEach(doencaId => {
          const doenca = todasDoencas.find(d => d.id === doencaId);
          if (doenca) {
            doencasCandidatas.set(doencaId, doenca);
          }
        });
      }
    });
  });

  // 3. Busca por termos nos critérios diagnósticos
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
      const { score, criteriosAtendidos, criteriosTotais, probabilidade } = 
        calculateDiagnosisScore(doenca, todosSintomas, sintomasAusentes);

      return {
        doenca,
        score,
        probabilidade,
        criteriosAtendidos,
        criteriosTotais,
        examesRecomendados: doenca.quickView?.examesIniciais || [],
        redFlags: doenca.quickView?.redFlags || [],
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
    sintomasSecundarios,
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
    const doenca = todasDoencas.find(d => d.id === diagTree.doencaId);
    if (!doenca) return null;

    const { score, criteriosAtendidos, criteriosTotais } = calculateDiagnosisScore(
      doenca,
      [sintomaPrincipal, ...sintomasSecundarios]
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

