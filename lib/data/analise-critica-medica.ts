/**
 * ANÁLISE CRÍTICA MÉDICA - DOENÇAS E MEDICAMENTOS
 * ===============================================
 * 
 * Análises críticas sistêmicas para doenças e medicamentos,
 * seguindo o mesmo padrão de rigor Q1 do sistema de rastreamentos.
 * 
 * NOTA: Estas análises são baseadas no contexto brasileiro (SUS).
 * Para outros países, usar adaptCriticalAnalysis() do módulo
 * critical-analysis-localization.ts para adaptar ao sistema
 * de saúde local.
 */

import { DiseaseCriticalAnalysis, MedicationCriticalAnalysis } from '../types/analysis-medical';
import { adaptCriticalAnalysis } from '../i18n/critical-analysis-localization';
import type { Locale } from '@/i18n/config';

// =============================================================================
// ANÁLISES CRÍTICAS DE DOENÇAS
// =============================================================================

/**
 * Análise crítica: Hipertensão Arterial Sistêmica
 */
const analiseHipertensao: DiseaseCriticalAnalysis = {
  diseaseId: 'hipertensao-arterial',
  context: 'A hipertensão arterial é a condição crônica mais prevalente na APS brasileira, afetando ~30% dos adultos. As diretrizes de 2020 (SBC/SBMFC) reduziram o limiar diagnóstico de 140/90 para 130/80 mmHg, alinhando-se às diretrizes americanas (AHA/ACC 2017).',
  paradigmShift: true,
  insights: [
    {
      id: 'insight-has-1',
      title: 'A Redução do Limiar como Estratégia de Prevenção Primária',
      content: 'A mudança de 140/90 para 130/80 mmHg não representa apenas ajuste técnico. É uma estratégia de prevenção primária que identifica mais pacientes em risco cardiovascular antes que desenvolvam lesão de órgão-alvo. Contudo, isso aumenta a prevalência de "hipertensos" em ~40%, sobrecarregando a APS.',
      type: 'second_order',
      citations: [{ refId: 'sbc-has-2020' }],
      practicalExample: 'UBS com 2.000 adultos cadastrados: antes tinha ~600 hipertensos (30%). Com novo critério, passa a ter ~840 hipertensos (42%). Mesma equipe, 40% mais pacientes para acompanhar.',
      keyTakeaway: 'A mudança de limiar é cientificamente sólida, mas requer expansão de capacidade da APS para não comprometer qualidade do cuidado.',
      evidenceLevel: 'A'
    },
    {
      id: 'insight-has-2',
      title: 'O Paradoxo da Medida Domiciliar',
      content: 'Diretrizes recomendam medida domiciliar (MAPA ou automática domiciliar) para confirmar diagnóstico e ajustar tratamento. Contudo, MAPA não está disponível na maioria das UBS, e aparelhos automáticos domiciliares não são fornecidos pelo SUS. Isso cria uma lacuna entre recomendação e realidade operacional.',
      type: 'third_order',
      citations: [{ refId: 'sbc-has-2020' }],
      practicalExample: 'Paciente com PA 135/85 na UBS. Segundo diretriz, precisa MAPA para confirmar. MAPA só disponível em hospital terciário, fila de 3-6 meses. Enquanto isso, paciente fica sem diagnóstico definitivo.',
      keyTakeaway: 'A falta de acesso a MAPA compromete a aplicação das diretrizes e pode gerar sobrediagnóstico ou subdiagnóstico.',
      evidenceLevel: 'B'
    }
  ],
  controversies: [
    {
      id: 'contro-has-1',
      title: 'Limiar de 130/80: Prevenção ou Medicalização?',
      description: 'A redução do limiar para 130/80 mmHg é defendida por SBC/SBMFC como prevenção primária. Contudo, críticos argumentam que isso medicaliza milhões de brasileiros sem evidência clara de benefício em países de baixa-média renda.',
      stakeholders: ['SBC', 'SBMFC', 'CONITEC', 'MS'],
      citations: [{ refId: 'sbc-has-2020' }, { refId: 'conitec-has-2021' }],
      realWorldScenario: 'Paciente de 45 anos, PA 132/82 mmHg, sem outros fatores de risco. Segundo nova diretriz, é hipertenso e precisa tratamento. Mas risco cardiovascular absoluto é baixo. Tratamento farmacológico é necessário ou apenas mudança de estilo de vida?',
      currentConsensus: 'Diretrizes recomendam tratamento farmacológico apenas se risco cardiovascular ≥10% ou lesão de órgão-alvo. Para outros, iniciar com mudança de estilo de vida por 3-6 meses.'
    }
  ],
  operationalChallenges: [
    {
      id: 'challenge-has-1',
      title: 'Capacidade de Acompanhamento na APS',
      description: 'Aumento de 40% na prevalência de hipertensos sobrecarrega equipes de APS. Consultas de retorno precisam ser mais frequentes, mas não há aumento proporcional de recursos humanos.',
      category: 'operational',
      severity: 'high',
      citations: [{ refId: 'sbmfc-has-2020' }],
      potentialSolutions: [
        'Telemedicina para acompanhamento de casos estáveis',
        'Grupos de hipertensos para educação em saúde',
        'Protocolo de retorno escalonado (estável: 6 meses; descompensado: 1 mês)'
      ]
    },
    {
      id: 'challenge-has-2',
      title: 'Acesso a Medicamentos',
      description: 'RENAME inclui anti-hipertensivos essenciais, mas desabastecimento frequente compromete adesão. Pacientes precisam comprar medicamentos do próprio bolso quando SUS não fornece.',
      category: 'financial',
      severity: 'critical',
      potentialSolutions: [
        'Sistema de alerta de desabastecimento',
        'Parcerias com farmácias populares',
        'Reserva estratégica de medicamentos essenciais'
      ]
    }
  ],
  systemicImplications: 'A hipertensão arterial ilustra o desafio de implementar diretrizes baseadas em evidência em um sistema com recursos limitados. A mudança de limiar é cientificamente sólida, mas requer investimento em infraestrutura (MAPA, aparelhos domiciliares) e expansão de capacidade da APS. Sem isso, a diretriz vira letra morta ou gera sobrecarga operacional.',
  didacticIntro: 'A hipertensão arterial é a "porta de entrada" para o cuidado cardiovascular na APS. Compreender as controvérsias e desafios operacionais é essencial para médicos de família que lidam com esta condição diariamente.',
  lastUpdate: '2024-12'
};

/**
 * Análise crítica: Diabetes Mellitus Tipo 2
 */
const analiseDiabetes: DiseaseCriticalAnalysis = {
  diseaseId: 'diabetes-mellitus-tipo-2',
  context: 'Diabetes tipo 2 afeta ~10% dos adultos brasileiros e é a principal causa de cegueira, insuficiência renal e amputações não traumáticas. As diretrizes de 2022 (SBD/SBMFC) incorporaram novos medicamentos (GLP-1, SGLT2) com benefícios cardiovasculares e renais além do controle glicêmico.',
  paradigmShift: true,
  insights: [
    {
      id: 'insight-dm2-1',
      title: 'A Mudança de Paradigma: De Controle Glicêmico para Proteção de Órgão',
      content: 'Tradicionalmente, tratamento de DM2 focava em HbA1c <7%. Novas diretrizes priorizam medicamentos com benefício cardiovascular/renal (GLP-1, SGLT2) mesmo que controle glicêmico seja subótimo. Isso representa mudança de paradigma: não é apenas "baixar açúcar", é "proteger coração e rim".',
      type: 'third_order',
      citations: [{ refId: 'sbd-dm2-2022' }],
      practicalExample: 'Paciente com DM2, HbA1c 8.5%, IAM prévio, TFG 45 mL/min. Antes: aumentar metformina, adicionar insulina. Agora: manter metformina, adicionar SGLT2 (proteção renal) e considerar GLP-1 (proteção cardiovascular). HbA1c pode ficar em 7.5%, mas risco cardiovascular/renal diminui.',
      keyTakeaway: 'O objetivo do tratamento mudou: não é apenas normalizar glicemia, é reduzir eventos cardiovasculares e progressão de doença renal.',
      evidenceLevel: 'A'
    },
    {
      id: 'insight-dm2-2',
      title: 'O Abismo entre Diretrizes e Realidade do SUS',
      content: 'Diretrizes recomendam GLP-1 e SGLT2 como segunda linha. Contudo, estes medicamentos não estão disponíveis no SUS (exceto em casos muito específicos via judicialização). A maioria dos pacientes na APS usa apenas metformina + glibenclamida, medicamentos de primeira geração.',
      type: 'second_order',
      citations: [{ refId: 'sbd-dm2-2022' }, { refId: 'rename-2024' }],
      practicalExample: 'Paciente com DM2 descompensado, IAM prévio. Diretriz recomenda SGLT2. SUS não fornece. Médico prescreve glibenclamida (disponível). Paciente tem novo IAM. Diretriz não foi seguida por limitação de acesso, não por falta de conhecimento médico.',
      keyTakeaway: 'A lacuna entre diretrizes e disponibilidade no SUS cria um "cuidado de segunda classe" para pacientes do sistema público.',
      evidenceLevel: 'A'
    }
  ],
  controversies: [
    {
      id: 'contro-dm2-1',
      title: 'GLP-1 e SGLT2 no SUS: Custo vs Benefício',
      description: 'SBD recomenda GLP-1 e SGLT2 como segunda linha. CONITEC avalia incorporação, mas custo é alto (R$200-500/mês vs R$5-20/mês de glibenclamida). Benefício é claro em pacientes com doença cardiovascular/renal estabelecida, mas custo-efetividade em pacientes de baixo risco é questionável.',
      stakeholders: ['SBD', 'CONITEC', 'MS'],
      citations: [{ refId: 'sbd-dm2-2022' }, { refId: 'conitec-sglt2-2023' }],
      realWorldScenario: 'Paciente de 55 anos, DM2 há 5 anos, HbA1c 8%, sem complicações. Diretriz recomenda considerar SGLT2. SUS não fornece. Paciente precisa comprar (R$300/mês) ou usar glibenclamida (R$10/mês). Qual a escolha ética?',
      currentConsensus: 'CONITEC aprovou SGLT2 apenas para pacientes com doença renal crônica (TFG 30-60) e doença cardiovascular estabelecida. GLP-1 ainda em avaliação.'
    }
  ],
  operationalChallenges: [
    {
      id: 'challenge-dm2-1',
      title: 'Monitoramento de HbA1c',
      description: 'Diretrizes recomendam HbA1c a cada 3-6 meses. Contudo, muitos municípios têm fila de 2-4 meses para exame. Paciente faz exame, recebe resultado 2 meses depois, já está descompensado novamente.',
      category: 'operational',
      severity: 'high',
      potentialSolutions: [
        'Testes point-of-care (HbA1c na UBS)',
        'Protocolo de retorno baseado em glicemia capilar (sem esperar HbA1c)',
        'Sistema de alerta para pacientes com HbA1c >9%'
      ]
    },
    {
      id: 'challenge-dm2-2',
      title: 'Educação em Diabetes',
      description: 'Educação em diabetes é fundamental, mas grupos educativos são esporádicos e dependem de profissionais específicos (enfermeiros, nutricionistas) que muitas vezes não estão disponíveis na UBS.',
      category: 'training',
      severity: 'medium',
      potentialSolutions: [
        'Capacitação de ACS para educação básica',
        'Telemedicina para grupos educativos',
        'Materiais educativos digitais (apps, vídeos)'
      ]
    }
  ],
  systemicImplications: 'O diabetes tipo 2 exemplifica a tensão entre evidência científica e realidade operacional do SUS. As diretrizes incorporam medicamentos de última geração com benefícios claros, mas estes não estão disponíveis no sistema público. Isso cria um "cuidado de duas velocidades": pacientes com recursos têm acesso a tratamento de ponta, pacientes do SUS ficam com medicamentos de primeira geração. A judicialização parcialmente resolve, mas aprofunda iniquidades.',
  didacticIntro: 'O diabetes tipo 2 é uma condição complexa que requer abordagem multifatorial. Compreender as controvérsias sobre acesso a medicamentos e os desafios operacionais é essencial para médicos de família.',
  lastUpdate: '2024-12'
};

// =============================================================================
// ANÁLISES CRÍTICAS DE MEDICAMENTOS
// =============================================================================

/**
 * Análise crítica: Metformina
 */
const analiseMetformina: MedicationCriticalAnalysis = {
  medicationId: 'metformina',
  context: 'Metformina é o medicamento de primeira linha para diabetes tipo 2 há mais de 20 anos. É barato, seguro, eficaz e está disponível no SUS. Contudo, há controvérsias sobre indicações off-label (SOP, pré-diabetes) e interações medicamentosas.',
  paradigmShift: false,
  insights: [
    {
      id: 'insight-met-1',
      title: 'A Metformina como "Aspirina do Diabetes"',
      content: 'Metformina é tão fundamental no tratamento de DM2 quanto aspirina em cardiologia. É barata, segura, eficaz e tem benefícios além do controle glicêmico (redução de peso, possível proteção cardiovascular). Contudo, seu uso em pré-diabetes e SOP é controverso.',
      type: 'second_order',
      citations: [{ refId: 'sbd-dm2-2022' }],
      practicalExample: 'Paciente com pré-diabetes (glicemia de jejum 110 mg/dL). Alguns guidelines recomendam metformina para prevenir progressão para diabetes. SUS não cobre esta indicação. Paciente precisa comprar do próprio bolso ou aguardar desenvolver diabetes.',
      keyTakeaway: 'A metformina é um medicamento "seguro" para experimentação off-label, mas falta evidência robusta para algumas indicações.',
      evidenceLevel: 'B'
    }
  ],
  controversies: [
    {
      id: 'contro-met-1',
      title: 'Metformina em Síndrome dos Ovários Policísticos (SOP)',
      description: 'Metformina é amplamente usada off-label em SOP para melhorar resistência à insulina e regularizar ciclos. Contudo, não está aprovada para esta indicação e não está disponível no SUS para SOP. Pacientes precisam comprar do próprio bolso ou usar via judicialização.',
      stakeholders: ['SBD', 'FEBRASGO', 'CONITEC', 'MS'],
      citations: [{ refId: 'febrasgo-sop-2023' }],
      realWorldScenario: 'Paciente de 25 anos, SOP, resistência à insulina, irregularidade menstrual. Diretrizes recomendam metformina. SUS não fornece para SOP. Paciente compra (R$15-30/mês) ou fica sem tratamento.',
      currentConsensus: 'FEBRASGO recomenda metformina em SOP com resistência à insulina, mas CONITEC não aprovou para esta indicação no SUS.'
    }
  ],
  operationalChallenges: [
    {
      id: 'challenge-met-1',
      title: 'Desabastecimento Frequente',
      description: 'Apesar de ser medicamento essencial e barato, metformina frequentemente falta nas farmácias do SUS. Pacientes ficam sem tratamento, descompensam e precisam de atendimento de urgência.',
      category: 'operational',
      severity: 'critical',
      potentialSolutions: [
        'Sistema de alerta de desabastecimento',
        'Reserva estratégica de medicamentos essenciais',
        'Parcerias com farmácias populares'
      ]
    }
  ],
  systemicImplications: 'A metformina ilustra o paradoxo do SUS: é um medicamento barato, essencial e amplamente usado, mas frequentemente falta. Isso compromete o cuidado de milhões de pacientes com diabetes e expõe a fragilidade da cadeia de suprimentos do sistema público.',
  didacticIntro: 'A metformina é o medicamento mais importante no tratamento de diabetes tipo 2. Compreender suas indicações, controvérsias e desafios de acesso é fundamental para médicos de família.',
  lastUpdate: '2024-12'
};

// =============================================================================
// BANCO DE DADOS
// =============================================================================

const analisesDoencasMap: Record<string, DiseaseCriticalAnalysis> = {
  'hipertensao-arterial': analiseHipertensao,
  'diabetes-mellitus-tipo-2': analiseDiabetes,
};

const analisesMedicamentosMap: Record<string, MedicationCriticalAnalysis> = {
  'metformina': analiseMetformina,
};

/**
 * Obtém análise crítica de uma doença (base brasileira)
 */
export function getAnaliseCriticaDoenca(diseaseId: string): DiseaseCriticalAnalysis | undefined {
  return analisesDoencasMap[diseaseId];
}

/**
 * Obtém análise crítica de um medicamento (base brasileira)
 */
export function getAnaliseCriticaMedicamento(medicationId: string): MedicationCriticalAnalysis | undefined {
  return analisesMedicamentosMap[medicationId];
}

/**
 * Obtém análise crítica de uma doença adaptada para um locale
 */
export function getAnaliseCriticaDoencaLocalizada(diseaseId: string, locale: Locale): DiseaseCriticalAnalysis | undefined {
  const analysis = analisesDoencasMap[diseaseId];
  if (!analysis) return undefined;
  return adaptCriticalAnalysis(analysis, locale) as DiseaseCriticalAnalysis;
}

/**
 * Obtém análise crítica de um medicamento adaptada para um locale
 */
export function getAnaliseCriticaMedicamentoLocalizada(medicationId: string, locale: Locale): MedicationCriticalAnalysis | undefined {
  const analysis = analisesMedicamentosMap[medicationId];
  if (!analysis) return undefined;
  return adaptCriticalAnalysis(analysis, locale) as MedicationCriticalAnalysis;
}

/**
 * Obtém todas as análises críticas de doenças
 */
export function getAllAnalisesCriticasDoencas(): DiseaseCriticalAnalysis[] {
  return Object.values(analisesDoencasMap);
}

/**
 * Obtém todas as análises críticas de medicamentos
 */
export function getAllAnalisesCriticasMedicamentos(): MedicationCriticalAnalysis[] {
  return Object.values(analisesMedicamentosMap);
}

