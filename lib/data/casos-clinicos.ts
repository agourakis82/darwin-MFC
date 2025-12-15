/**
 * BANCO DE CASOS CLÍNICOS INTERATIVOS - DARWIN-MFC
 * =================================================
 * Casos clínicos para ensino e treinamento em MFC
 */

import { CasoClinico } from '../types/caso-clinico';

// Re-exportar tipo para uso em componentes
export type { CasoClinico } from '../types/caso-clinico';

// ============================================================================
// CASO 1: HIPERTENSÃO ARTERIAL
// ============================================================================

export const casoHAS: CasoClinico = {
  id: 'caso-has-001',
  titulo: 'Hipertensão Arterial na APS',
  subtitulo: 'Diagnóstico e manejo inicial',
    categoria: 'cardiovascular',
  dificuldade: 'iniciante',
  tempoEstimado: 15,
  ultimaAtualizacao: '2024-12',
    
  apresentacao: {
    paciente: {
      nome: 'José Silva',
      idade: 52,
      sexo: 'M',
      profissao: 'Motorista de ônibus',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Cefaleia há 2 semanas',
    historiaDoencaAtual: 'Paciente refere cefaleia occipital há 2 semanas, de moderada intensidade, mais intensa pela manhã. Nega náuseas, vômitos ou alterações visuais. Refere que um colega de trabalho mediu sua pressão na semana passada e estava "alta". Nunca fez tratamento para hipertensão. Tabagista 20 anos-maço. Sedentário. Alimentação rica em sal e gorduras.'
  },
  
  etapas: [
    {
      id: 'etapa-1-anamnese',
      titulo: 'Complementando a Anamnese',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você está atendendo o Sr. José na UBS. Quais informações adicionais você precisa coletar?',
        dicas: ['Antecedentes familiares são importantes', 'Pergunte sobre sintomas de LOA']
      },
      pergunta: {
        enunciado: 'Qual dos seguintes antecedentes familiares é MAIS relevante para estratificação de risco cardiovascular?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Mãe com diabetes diagnosticado aos 70 anos', correta: false },
          { id: 'b', texto: 'Pai com IAM aos 50 anos', correta: true },
          { id: 'c', texto: 'Irmão com câncer de próstata', correta: false },
          { id: 'd', texto: 'Avó materna com Alzheimer', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Doença cardiovascular prematura em parente de 1º grau (homem <55 anos ou mulher <65 anos) é fator de risco cardiovascular importante. O IAM do pai aos 50 anos configura DCV prematura.',
        pontos: 10
      }
    },
    {
      id: 'etapa-2-exame',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Você realiza o exame físico do paciente.',
        dados: {
          'PA (sentado, braço D)': '162/98 mmHg',
          'PA (sentado, braço E)': '158/96 mmHg',
          'FC': '78 bpm',
          'Peso': '92 kg',
          'Altura': '1,72 m',
          'IMC': '31,1 kg/m²',
          'Circunferência abdominal': '108 cm',
          'Fundo de olho': 'Cruzamentos arteriovenosos patológicos',
          'Ausculta cardíaca': 'B4 presente',
          'Pulsos periféricos': 'Simétricos, sem sopros'
        }
      },
      pergunta: {
        enunciado: 'A presença de B4 na ausculta cardíaca neste paciente sugere:',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Estenose mitral', correta: false },
          { id: 'b', texto: 'Disfunção diastólica por sobrecarga pressórica', correta: true },
          { id: 'c', texto: 'Insuficiência aórtica', correta: false },
          { id: 'd', texto: 'Comunicação interatrial', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'A B4 (quarta bulha) ocorre pela contração atrial contra um ventrículo com complacência reduzida, comum na hipertensão arterial de longa data por hipertrofia ventricular esquerda (HVE).',
        pontos: 10
      }
    },
    {
      id: 'etapa-3-exames',
        titulo: 'Exames Complementares',
        tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita os exames de rotina para hipertensão arterial.',
        dados: {
          'Glicemia jejum': '112 mg/dL',
          'Creatinina': '1,1 mg/dL',
          'TFGe (CKD-EPI)': '78 mL/min/1,73m²',
          'Potássio': '4,2 mEq/L',
          'Ácido úrico': '7,8 mg/dL',
          'Colesterol total': '245 mg/dL',
          'HDL': '38 mg/dL',
          'LDL (calculado)': '162 mg/dL',
          'Triglicerídeos': '225 mg/dL',
          'EAS': 'Normal',
          'ECG': 'Índice de Sokolow-Lyon: 38mm (>35mm)'
        }
      },
      pergunta: {
        enunciado: 'Quantos fatores de risco cardiovascular adicionais este paciente apresenta além da HAS?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: '2 fatores', correta: false },
          { id: 'b', texto: '3 fatores', correta: false },
          { id: 'c', texto: '4 fatores', correta: true },
          { id: 'd', texto: '5 ou mais fatores', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'Fatores adicionais: 1) Tabagismo, 2) Dislipidemia (LDL alto, HDL baixo), 3) Obesidade (IMC >30), 4) Pré-diabetes (glicemia 100-125). A HVE no ECG é lesão de órgão-alvo, não fator de risco.',
        pontos: 15
      }
    },
    {
      id: 'etapa-4-diagnostico',
      titulo: 'Diagnóstico e Estadiamento',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base nos dados coletados, você precisa confirmar o diagnóstico e estadiar o paciente.'
      },
      pergunta: {
        enunciado: 'De acordo com as Diretrizes Brasileiras de Hipertensão (2020), qual é a classificação de risco cardiovascular global deste paciente?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Baixo risco', correta: false },
          { id: 'b', texto: 'Risco moderado', correta: false },
          { id: 'c', texto: 'Alto risco', correta: true },
          { id: 'd', texto: 'Risco não determinável', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'Paciente com HAS Estágio 2 (PAS 160-179), múltiplos fatores de risco (≥3) E lesão de órgão-alvo (HVE) = Alto Risco Cardiovascular. Isso implica meta de PA <130/80 e início imediato de tratamento farmacológico.',
        pontos: 15
      }
    },
    {
      id: 'etapa-5-tratamento',
      titulo: 'Conduta Terapêutica',
      tipo: 'tratamento',
      conteudo: {
        texto: 'É hora de definir o tratamento inicial para o Sr. José.',
        dicas: ['Considere a classificação de risco', 'Lembre-se das metas pressóricas', 'Pense em benefícios adicionais dos anti-hipertensivos']
      },
      pergunta: {
        enunciado: 'Qual seria a melhor conduta inicial para este paciente?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas medidas não farmacológicas por 3 meses', correta: false },
          { id: 'b', texto: 'Monoterapia com IECA + mudanças de estilo de vida', correta: false },
          { id: 'c', texto: 'Terapia combinada (IECA + BCC ou tiazídico) + estatina + MEV', correta: true },
          { id: 'd', texto: 'Encaminhar para cardiologista antes de iniciar tratamento', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'Paciente de alto risco com HAS estágio 2 deve iniciar terapia combinada desde o início. IECA é preferido (protege rim, melhora remodelamento cardíaco). Estatina indicada pelo alto risco CV. Mudanças de estilo de vida são sempre necessárias.',
        pontos: 20
      }
    }
  ],
  
  desfecho: {
    resumo: 'Sr. José foi diagnosticado com Hipertensão Arterial Estágio 2 de alto risco cardiovascular, com lesão de órgão-alvo (HVE) e múltiplos fatores de risco.',
    diagnosticoFinal: 'Hipertensão Arterial Sistêmica Estágio 2 | Dislipidemia Mista | Obesidade Grau I | Pré-diabetes',
    tratamentoRealizado: 'Enalapril 10mg 12/12h + Anlodipino 5mg 1x/dia + Sinvastatina 40mg à noite. Encaminhado para nutricionista e educador físico. Cessação tabágica abordada.',
    evolucao: 'Retornou em 4 semanas com PA 138/88 mmHg. Ajustado para Enalapril 20mg 12/12h. Em 3 meses: PA 128/82 mmHg, LDL 98 mg/dL, perdeu 4 kg. Parou de fumar.',
    licoesPrincipais: [
      'Sempre estratificar risco CV global, não apenas pela PA',
      'Buscar ativamente lesões de órgão-alvo',
      'Alto risco = terapia combinada desde o início',
      'MEV são fundamentais, mas não substituem farmacoterapia no alto risco'
    ],
    errosComuns: [
      'Iniciar monoterapia em paciente de alto risco',
      'Não solicitar ECG para avaliar HVE',
      'Não estratificar risco antes de definir tratamento',
      'Aguardar 3 meses de MEV em paciente de alto risco'
    ]
  },
  
  objetivosAprendizagem: [
    'Diagnosticar hipertensão arterial conforme critérios atuais',
    'Estratificar risco cardiovascular global',
    'Identificar lesões de órgão-alvo',
    'Escolher terapia inicial adequada ao risco'
  ],
  competencias: ['Diagnóstico clínico', 'Estratificação de risco', 'Prescrição racional'],
  doencasRelacionadas: ['hipertensao-arterial', 'dislipidemia', 'diabetes-mellitus-2'],
  medicamentosRelacionados: ['enalapril', 'anlodipino', 'sinvastatina'],
  calculadorasRelacionadas: ['escore-framingham', 'tfg-ckd-epi'],
  referencias: ['Diretrizes Brasileiras de Hipertensão 2020', 'ESC/ESH 2023'],
  tags: ['hipertensão', 'cardiovascular', 'risco-cv', 'iniciante']
};

// ============================================================================
// CASO 2: DIABETES MELLITUS TIPO 2
// ============================================================================

export const casoDM2: CasoClinico = {
  id: 'caso-dm2-001',
  titulo: 'Diabetes Mellitus Tipo 2',
  subtitulo: 'Diagnóstico e tratamento inicial na APS',
  categoria: 'endocrino',
  dificuldade: 'iniciante',
  tempoEstimado: 20,
  ultimaAtualizacao: '2024-12',
  
  apresentacao: {
    paciente: {
      nome: 'Maria Santos',
      idade: 58,
      sexo: 'F',
      profissao: 'Dona de casa',
      estadoCivil: 'Viúva'
    },
    queixaPrincipal: 'Exame de rotina alterado',
    historiaDoencaAtual: 'Paciente vem à consulta para mostrar exames de rotina solicitados há 2 meses. Refere cansaço progressivo há 6 meses, atribuía ao sedentarismo. Nega poliúria franca, mas relata acordar 2x à noite para urinar. Sede aumentada. Perdeu 3 kg nos últimos 3 meses sem dieta. Mãe diabética. IMC atual 32 kg/m².'
  },
  
  etapas: [
    {
      id: 'etapa-1-exames',
      titulo: 'Análise dos Exames',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'A paciente traz os seguintes exames:',
        dados: {
          'Glicemia jejum': '186 mg/dL',
          'Glicemia jejum (repetido)': '172 mg/dL',
          'HbA1c': '8,2%',
          'Creatinina': '0,9 mg/dL',
          'TFGe': '82 mL/min/1,73m²',
          'Relação Alb/Creat urina': '45 mg/g (normal <30)',
          'Colesterol total': '218 mg/dL',
          'LDL': '138 mg/dL',
          'HDL': '42 mg/dL',
          'Triglicerídeos': '190 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Com base nos exames, qual critério diagnóstico de DM está presente nesta paciente?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas HbA1c ≥6,5%', correta: false },
          { id: 'b', texto: 'Apenas 2 glicemias de jejum ≥126', correta: false },
          { id: 'c', texto: 'HbA1c ≥6,5% E glicemia de jejum ≥126 (dupla confirmação)', correta: true },
          { id: 'd', texto: 'O diagnóstico ainda precisa de confirmação', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'O diagnóstico de DM requer 2 testes alterados na mesma amostra OU em ocasiões diferentes. A paciente tem GJ ≥126 em 2 ocasiões E HbA1c ≥6,5%, confirmando DM. A albuminúria indica já haver comprometimento renal.',
        pontos: 10
      }
    },
    {
      id: 'etapa-2-avaliacao',
      titulo: 'Avaliação de Complicações',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Você realiza exame físico direcionado e solicita exames complementares.',
        dados: {
          'Fundo de olho': 'Microaneurismas isolados em ambos os olhos',
          'Sensibilidade (monofilamento)': 'Preservada bilateralmente',
          'Pulsos pediosos': 'Presentes e simétricos',
          'PA': '148/92 mmHg',
          'ECG': 'Normal'
        }
      },
      pergunta: {
        enunciado: 'Quais complicações microvasculares já estão presentes?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Nenhuma', correta: false },
          { id: 'b', texto: 'Apenas retinopatia', correta: false },
          { id: 'c', texto: 'Retinopatia e nefropatia', correta: true },
          { id: 'd', texto: 'Retinopatia, nefropatia e neuropatia', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'Microaneurismas = Retinopatia Diabética Não Proliferativa leve. Albuminúria (45 mg/g) = Nefropatia Diabética (doença renal diabética) estágio A2. A neuropatia não está presente (monofilamento normal).',
        pontos: 15
      }
    },
    {
      id: 'etapa-3-tratamento',
      titulo: 'Definindo o Tratamento',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Com o diagnóstico confirmado e complicações identificadas, é hora de definir o tratamento.',
        dicas: ['Considere a TFG e a presença de albuminúria', 'Pense em proteção cardiovascular e renal']
      },
      pergunta: {
        enunciado: 'Qual o esquema terapêutico MAIS adequado para esta paciente?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Metformina isolada + orientações dietéticas', correta: false },
          { id: 'b', texto: 'Metformina + iSGLT2 + IECA + estatina', correta: true },
          { id: 'c', texto: 'Metformina + sulfonilureia', correta: false },
          { id: 'd', texto: 'Insulina NPH + orientações', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Paciente com DM2 + doença renal diabética (albuminúria) se beneficia de: Metformina (primeira linha), iSGLT2 (proteção renal/CV comprovada), IECA (nefroproteção - tem HAS também), Estatina (alto risco CV por DM + DRD).',
        pontos: 20
      }
    }
  ],
  
  desfecho: {
    resumo: 'Sra. Maria foi diagnosticada com DM2 já com complicações microvasculares (retinopatia e nefropatia incipientes) ao diagnóstico.',
    diagnosticoFinal: 'DM2 | Retinopatia Diabética Não Proliferativa Leve | Doença Renal Diabética (DRD) estágio G2A2 | HAS | Dislipidemia',
    tratamentoRealizado: 'Metformina 850mg 2x/dia + Dapagliflozina 10mg 1x/dia + Enalapril 10mg 2x/dia + Atorvastatina 40mg à noite. Encaminhada para oftalmologista.',
    evolucao: 'Em 3 meses: HbA1c 7,4%, PA 132/84 mmHg, Alb/Creat 32 mg/g. Perdeu 4 kg. Mantido seguimento trimestral.',
    licoesPrincipais: [
      'DM2 frequentemente diagnosticado já com complicações',
      'Sempre rastrear retinopatia e nefropatia ao diagnóstico',
      'iSGLT2 e IECA têm benefício comprovado na DRD',
      'Abordagem multifatorial: glicemia + PA + lipídios'
    ],
    errosComuns: [
      'Não solicitar fundo de olho ao diagnóstico',
      'Ignorar albuminúria como marcador de risco',
      'Usar apenas metformina em paciente com DRD',
      'Não associar IECA na presença de albuminúria'
    ]
  },
  
  objetivosAprendizagem: [
    'Aplicar critérios diagnósticos de DM2',
    'Rastrear complicações microvasculares',
    'Selecionar terapia considerando comorbidades',
    'Entender benefícios dos iSGLT2 na DRD'
  ],
  competencias: ['Diagnóstico clínico', 'Raciocínio fisiopatológico', 'Prescrição baseada em evidências'],
  doencasRelacionadas: ['diabetes-mellitus-2', 'retinopatia-diabetica', 'nefropatia-diabetica'],
  medicamentosRelacionados: ['metformina', 'dapagliflozina', 'enalapril', 'atorvastatina'],
  calculadorasRelacionadas: ['tfg-ckd-epi'],
  referencias: ['ADA Standards of Care 2024', 'Diretriz SBD 2023'],
  tags: ['diabetes', 'endocrino', 'complicações', 'iniciante']
};

// ============================================================================
// TODOS OS CASOS
// ============================================================================

export const todosCasosClinicos: CasoClinico[] = [
  casoHAS,
  casoDM2,
];

// Funções auxiliares
export function getCasoById(id: string): CasoClinico | undefined {
  return todosCasosClinicos.find(c => c.id === id);
}

export function getCasosByCategoria(categoria: CasoClinico['categoria']): CasoClinico[] {
  return todosCasosClinicos.filter(c => c.categoria === categoria);
}

export function getCasosByDificuldade(dificuldade: CasoClinico['dificuldade']): CasoClinico[] {
  return todosCasosClinicos.filter(c => c.dificuldade === dificuldade);
}
