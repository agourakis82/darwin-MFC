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
// CASO 3: DEPRESSÃO
// ============================================================================

export const casoDepressao: CasoClinico = {
  id: 'caso-depressao-001',
  titulo: 'Depressão na Atenção Primária',
  subtitulo: 'Diagnóstico e manejo do transtorno depressivo maior',
  categoria: 'psiquiatrico',
  dificuldade: 'intermediario',
  tempoEstimado: 20,
  ultimaAtualizacao: '2024-12',
  
  apresentacao: {
    paciente: {
      nome: 'Ana Oliveira',
      idade: 38,
      sexo: 'F',
      profissao: 'Professora',
      estadoCivil: 'Divorciada'
    },
    queixaPrincipal: 'Cansaço e desânimo há 3 meses',
    historiaDoencaAtual: 'Paciente refere que há cerca de 3 meses vem se sentindo cada vez mais cansada, sem ânimo para realizar suas atividades habituais. Diz que antes adorava dar aulas, mas agora "arrasta os pés para ir trabalhar". Apresenta dificuldade para dormir, acordando às 4h da manhã sem conseguir voltar a dormir. Perdeu cerca de 5kg neste período sem fazer dieta. Refere dificuldade de concentração nas aulas e erros que antes não cometia. Nega ideação suicida ativa, mas relata pensamentos de que "seria melhor se não acordasse mais". Divórcio há 1 ano. Mãe com histórico de depressão.'
  },
  
  etapas: [
    {
      id: 'etapa-1-anamnese',
      titulo: 'Aprofundando a Anamnese',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você está atendendo a paciente Ana na UBS. É importante aplicar instrumentos de rastreamento.',
        dicas: ['PHQ-9 é o instrumento mais utilizado', 'Sempre avaliar risco de suicídio']
      },
      pergunta: {
        enunciado: 'Qual instrumento de rastreamento é recomendado para avaliar a gravidade da depressão na APS?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Escala de Hamilton', correta: false },
          { id: 'b', texto: 'PHQ-9 (Patient Health Questionnaire-9)', correta: true },
          { id: 'c', texto: 'Inventário de Beck', correta: false },
          { id: 'd', texto: 'MADRS', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'O PHQ-9 é validado para uso na APS, auto-aplicável, rápido (2 min) e permite tanto rastreamento quanto monitoramento do tratamento. Escores: 5-9 leve, 10-14 moderada, 15-19 moderada-grave, ≥20 grave.',
        pontos: 10
      }
    },
    {
      id: 'etapa-2-phq9',
      titulo: 'Resultado do PHQ-9',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você aplica o PHQ-9 e obtém:',
        dados: {
          'PHQ-9 Total': '18/27 pontos',
          'Item 9 (ideação suicida)': '1 ponto (vários dias)',
          'Classificação': 'Depressão moderada-grave'
        }
      },
      pergunta: {
        enunciado: 'Qual é a conduta prioritária diante do resultado do PHQ-9?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Encaminhar imediatamente para psiquiatra', correta: false },
          { id: 'b', texto: 'Avaliar risco de suicídio e indicar tratamento farmacológico', correta: true },
          { id: 'c', texto: 'Iniciar apenas psicoterapia', correta: false },
          { id: 'd', texto: 'Solicitar exames laboratoriais antes de qualquer conduta', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Com PHQ-9 ≥15 (moderada-grave) e item 9 positivo, deve-se: 1) Avaliar risco de suicídio detalhadamente (plano, meios, tentativas prévias); 2) Indicar tratamento combinado (farmacológico + psicoterapia). A APS pode e deve manejar depressão moderada-grave.',
        pontos: 15
      }
    },
    {
      id: 'etapa-3-suicidio',
      titulo: 'Avaliação de Risco de Suicídio',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aborda diretamente o tema do suicídio com a paciente.',
        dados: {
          'Ideação suicida': 'Passiva (desejo de não acordar)',
          'Plano': 'Nega plano estruturado',
          'Meios': 'Não pensou em meios',
          'Tentativas prévias': 'Nega',
          'Fatores protetores': 'Filhos (2), rede de apoio',
          'Contrato de segurança': 'Aceita'
        }
      },
      pergunta: {
        enunciado: 'Como você classificaria o risco de suicídio desta paciente?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Risco baixo', correta: true },
          { id: 'b', texto: 'Risco moderado', correta: false },
          { id: 'c', texto: 'Risco alto', correta: false },
          { id: 'd', texto: 'Risco iminente', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Ideação passiva + sem plano + sem meios + sem tentativas prévias + fatores protetores (filhos, rede) = Risco baixo. Pode ser manejado na APS com tratamento adequado, contrato de segurança e acompanhamento próximo.',
        pontos: 15
      }
    },
    {
      id: 'etapa-4-tratamento',
      titulo: 'Definindo o Tratamento',
      tipo: 'tratamento',
      conteudo: {
        texto: 'É hora de definir o tratamento para Ana.',
        dicas: ['ISRS são primeira linha', 'Escalonamento de dose leva tempo', 'Psicoterapia é fundamental']
      },
      pergunta: {
        enunciado: 'Qual é a prescrição inicial MAIS adequada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Amitriptilina 25mg à noite', correta: false },
          { id: 'b', texto: 'Sertralina 50mg pela manhã', correta: true },
          { id: 'c', texto: 'Fluoxetina 20mg + Clonazepam 2mg à noite', correta: false },
          { id: 'd', texto: 'Venlafaxina 75mg 12/12h', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'ISRS (Sertralina, Fluoxetina, Escitalopram) são primeira linha. Sertralina 50mg é dose inicial efetiva. Evitar tricíclicos como primeira linha (efeitos colaterais). Evitar benzodiazepínicos de rotina. IRSN são segunda linha.',
        pontos: 20
      }
    },
    {
      id: 'etapa-5-acompanhamento',
      titulo: 'Planejando o Seguimento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Você precisa orientar Ana sobre o tratamento e agendar retornos.',
        dicas: ['Efeito terapêutico leva 2-4 semanas', 'Monitorar efeitos colaterais iniciais']
      },
      pergunta: {
        enunciado: 'Qual o intervalo ideal para o primeiro retorno após início do antidepressivo?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: '1 semana', correta: false },
          { id: 'b', texto: '2 semanas', correta: true },
          { id: 'c', texto: '4 semanas', correta: false },
          { id: 'd', texto: '8 semanas', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Retorno em 2 semanas para: avaliar adesão, efeitos colaterais (náusea, insônia), risco de suicídio (pode aumentar inicialmente em jovens), e reforçar orientações. Se bem tolerado, ajustar dose se necessário e espaçar retornos.',
        pontos: 10
      }
    }
  ],
  
  desfecho: {
    resumo: 'Ana foi diagnosticada com Transtorno Depressivo Maior, episódio moderado-grave, manejado integralmente na APS.',
    diagnosticoFinal: 'Transtorno Depressivo Maior (F32.2) | Episódio moderado-grave',
    tratamentoRealizado: 'Sertralina 50mg → 100mg após 2 semanas. Encaminhada para psicoterapia (TCC) no NASF. Orientada sobre higiene do sono.',
    evolucao: 'Em 6 semanas: PHQ-9 reduziu para 8 (leve). Retomou prazer nas aulas. Sono melhorou. Em 3 meses: PHQ-9 = 4 (remissão). Mantido tratamento por mínimo 6-9 meses.',
    licoesPrincipais: [
      'Depressão deve ser manejada na APS - não encaminhar de rotina',
      'SEMPRE avaliar risco de suicídio ao abordar depressão',
      'PHQ-9 é essencial para diagnóstico e monitoramento',
      'ISRS são primeira linha - começar com dose terapêutica',
      'Tratamento de manutenção por 6-12 meses após remissão'
    ],
    errosComuns: [
      'Prescrever antidepressivo sem avaliar suicídio',
      'Usar tricíclicos como primeira linha',
      'Associar benzodiazepínicos de rotina',
      'Retorno tardio (>4 semanas)',
      'Interromper tratamento antes de 6 meses'
    ]
  },
  
  objetivosAprendizagem: [
    'Aplicar PHQ-9 para diagnóstico e monitoramento',
    'Avaliar e estratificar risco de suicídio',
    'Escolher antidepressivo de primeira linha',
    'Planejar seguimento adequado'
  ],
  competencias: ['Diagnóstico clínico', 'Avaliação de risco', 'Comunicação terapêutica', 'Prescrição racional'],
  doencasRelacionadas: ['depressao', 'transtorno-ansiedade'],
  medicamentosRelacionados: ['sertralina', 'fluoxetina', 'escitalopram'],
  calculadorasRelacionadas: ['phq-9'],
  referencias: ['Diretriz APA 2023', 'MS - Caderno AB Saúde Mental 2013', 'NICE Depression 2022'],
  tags: ['depressão', 'saúde mental', 'phq-9', 'suicídio', 'intermediário']
};

// ============================================================================
// CASO 4: ASMA
// ============================================================================

export const casoAsma: CasoClinico = {
  id: 'caso-asma-001',
  titulo: 'Asma no Adulto',
  subtitulo: 'Diagnóstico, classificação e tratamento escalonado',
  categoria: 'respiratorio',
  dificuldade: 'intermediario',
  tempoEstimado: 18,
  ultimaAtualizacao: '2024-12',
  
  apresentacao: {
    paciente: {
      nome: 'Lucas Ferreira',
      idade: 28,
      sexo: 'M',
      profissao: 'Designer gráfico',
      estadoCivil: 'Solteiro'
    },
    queixaPrincipal: 'Tosse e chiado no peito há 2 meses',
    historiaDoencaAtual: 'Paciente refere tosse seca que piora à noite e ao acordar, principalmente nas últimas 2 semanas. Relata episódios de "chiado" no peito quando corre ou sobe escadas. Nega febre. Sintomas pioram com poeira e quando o tempo fica frio/seco. Teve "bronquite" várias vezes na infância, tratada com "bombinha". Rinite alérgica desde adolescência, usa anti-histamínico esporádico. Pai com asma.'
  },
  
  etapas: [
    {
      id: 'etapa-1-anamnese',
      titulo: 'Caracterizando os Sintomas',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você atende Lucas na UBS e precisa caracterizar melhor o quadro respiratório.',
        dicas: ['Padrão de sintomas é importante', 'Busque gatilhos específicos']
      },
      pergunta: {
        enunciado: 'Qual característica dos sintomas é MAIS sugestiva de asma?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Tosse produtiva matinal', correta: false },
          { id: 'b', texto: 'Sintomas variáveis com piora noturna e aos esforços', correta: true },
          { id: 'c', texto: 'Dispneia progressiva e contínua', correta: false },
          { id: 'd', texto: 'Tosse após refeições', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Asma: sintomas VARIÁVEIS (vêm e vão), com gatilhos (alérgenos, exercício, frio), piora noturna/matinal. DPOC: sintomas contínuos e progressivos. DRGE: tosse pós-refeição/decúbito.',
        pontos: 10
      }
    },
    {
      id: 'etapa-2-exame',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Você realiza exame físico completo.',
        dados: {
          'PA': '120/78 mmHg',
          'FC': '76 bpm',
          'FR': '16 irpm',
          'SpO2': '97%',
          'Ausculta pulmonar': 'Sibilos expiratórios esparsos bilateralmente',
          'Ausculta cardíaca': 'Normal',
          'Nariz': 'Cornetos hipertrofiados, secreção hialina',
          'Pico de fluxo (PEF)': '420 L/min (78% do previsto)'
        }
      },
      pergunta: {
        enunciado: 'O achado de PEF 78% do previsto em paciente sem crise aguda indica:',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Obstrução grave ao fluxo aéreo', correta: false },
          { id: 'b', texto: 'Espirometria normal, sem necessidade de mais exames', correta: false },
          { id: 'c', texto: 'Obstrução leve-moderada, confirmar com espirometria', correta: true },
          { id: 'd', texto: 'Resultado inconclusivo, repetir medida', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'PEF <80% do previsto sugere obstrução. Deve-se confirmar com espirometria pré e pós-broncodilatador. Variabilidade do PEF >10% também sugere asma.',
        pontos: 10
      }
    },
    {
      id: 'etapa-3-espirometria',
      titulo: 'Confirmação Diagnóstica',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita espirometria com prova broncodilatadora.',
        dados: {
          'VEF1 pré-BD': '2,8 L (72% previsto)',
          'CVF pré-BD': '4,2 L (90% previsto)',
          'VEF1/CVF pré-BD': '0,67 (<0,70)',
          'VEF1 pós-BD': '3,4 L (87% previsto)',
          'Variação VEF1': '+21% (>12% e >200mL = positivo)'
        }
      },
      pergunta: {
        enunciado: 'A espirometria confirma o diagnóstico de asma porque:',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'VEF1/CVF <0,70 isoladamente', correta: false },
          { id: 'b', texto: 'VEF1 pré-BD <80% do previsto', correta: false },
          { id: 'c', texto: 'Obstrução (VEF1/CVF <0,70) + resposta ao BD (>12% e >200mL)', correta: true },
          { id: 'd', texto: 'CVF dentro da normalidade', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'Critérios espirométricos de asma: 1) Obstrução: VEF1/CVF <0,70 (ou <LIN); 2) Reversibilidade: aumento do VEF1 ≥12% E ≥200mL após broncodilatador. A reversibilidade demonstra a variabilidade da obstrução, característica da asma.',
        pontos: 15
      }
    },
    {
      id: 'etapa-4-classificacao',
      titulo: 'Classificação de Controle',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com o diagnóstico confirmado, você aplica o questionário ACT (Asthma Control Test).',
        dados: {
          'Sintomas diurnos': '>2x/semana',
          'Limitação de atividades': 'Às vezes',
          'Sintomas noturnos': '1-2x/semana',
          'Uso de resgate': '2-3x/semana',
          'Como avalia controle': 'Parcialmente controlada',
          'ACT score': '16 pontos'
        }
      },
      pergunta: {
        enunciado: 'De acordo com GINA, como você classifica o controle da asma deste paciente?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Asma controlada', correta: false },
          { id: 'b', texto: 'Asma parcialmente controlada', correta: true },
          { id: 'c', texto: 'Asma não controlada', correta: false },
          { id: 'd', texto: 'Exacerbação aguda', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'ACT 16-19 = parcialmente controlado (20-25 = controlado, <16 = não controlado). Pelos critérios GINA: 1-2 parâmetros positivos = parcialmente controlada. >2 parâmetros positivos = não controlada.',
        pontos: 15
      }
    },
    {
      id: 'etapa-5-tratamento',
      titulo: 'Iniciando Tratamento',
      tipo: 'tratamento',
      conteudo: {
        texto: 'É hora de definir o tratamento de manutenção para Lucas.',
        dicas: ['GINA 2023 recomenda ICS-formoterol como resgate preferencial', 'Considere o step adequado ao controle']
      },
      pergunta: {
        enunciado: 'Qual o tratamento inicial MAIS adequado (GINA Step 2)?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'SABA de resgate (Salbutamol) isolado', correta: false },
          { id: 'b', texto: 'Corticoide inalatório (CI) dose baixa + SABA resgate', correta: false },
          { id: 'c', texto: 'CI dose baixa-formoterol (budesonida-formoterol) uso conforme necessidade', correta: true },
          { id: 'd', texto: 'Antileucotrieno (Montelucaste) isolado', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'GINA 2023 Track 1 (preferencial): CI-formoterol como manutenção E resgate (MART). Para Step 2: budesonida-formoterol dose baixa conforme necessidade. Reduz exacerbações vs SABA isolado e melhora adesão.',
        pontos: 20
      }
    }
  ],
  
  desfecho: {
    resumo: 'Lucas foi diagnosticado com asma leve parcialmente controlada, iniciando tratamento conforme GINA 2023.',
    diagnosticoFinal: 'Asma (J45.0) | Rinite Alérgica (J30.4)',
    tratamentoRealizado: 'Budesonida 200mcg-Formoterol 6mcg (Symbicort Turbuhaler) 1 inalação SOS ou pré-exercício. Furoato de fluticasona nasal 1x/dia para rinite. Orientação técnica de uso do dispositivo.',
    evolucao: 'Em 4 semanas: ACT = 22 (controlado), usando CI-formoterol 3-4x/semana. Sintomas nasais 70% melhor. Mantido Step 2 com plano de ação escrito.',
    licoesPrincipais: [
      'Espirometria com BD confirma asma (obstrução + reversibilidade)',
      'Classificar CONTROLE, não gravidade, para guiar tratamento',
      'GINA 2023: ICS-formoterol preferencial mesmo em asma leve',
      'Tratar rinite melhora controle da asma',
      'Técnica inalatória deve ser ensinada e verificada'
    ],
    errosComuns: [
      'Usar SABA isolado como tratamento crônico',
      'Não confirmar diagnóstico com espirometria',
      'Classificar por gravidade ao invés de controle',
      'Não abordar rinite concomitante',
      'Não verificar técnica de inalação'
    ]
  },
  
  objetivosAprendizagem: [
    'Reconhecer quadro clínico sugestivo de asma',
    'Interpretar espirometria com prova broncodilatadora',
    'Classificar controle da asma (GINA)',
    'Prescrever tratamento escalonado'
  ],
  competencias: ['Diagnóstico clínico', 'Interpretação de exames', 'Prescrição racional', 'Educação do paciente'],
  doencasRelacionadas: ['asma', 'rinite-alergica'],
  medicamentosRelacionados: ['budesonida', 'formoterol', 'salbutamol'],
  calculadorasRelacionadas: ['peak-flow'],
  referencias: ['GINA 2023', 'SBPT - Diretrizes Asma 2020'],
  tags: ['asma', 'respiratório', 'espirometria', 'GINA', 'intermediário']
};

// ============================================================================
// CASO 5: LOMBALGIA
// ============================================================================

export const casoLombalgia: CasoClinico = {
  id: 'caso-lombalgia-001',
  titulo: 'Lombalgia na APS',
  subtitulo: 'Avaliação, classificação e manejo não invasivo',
  categoria: 'cronico',
  dificuldade: 'iniciante',
  tempoEstimado: 15,
  ultimaAtualizacao: '2024-12',
  
  apresentacao: {
    paciente: {
      nome: 'Pedro Almeida',
      idade: 45,
      sexo: 'M',
      profissao: 'Pedreiro',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Dor nas costas há 3 semanas',
    historiaDoencaAtual: 'Paciente refere dor em região lombar baixa há 3 semanas, de início insidioso, sem trauma. Dor piora ao levantar peso e ao final do dia de trabalho. Melhora com repouso e analgésicos. Irradia para glúteo direito, mas não passa do joelho. Nega parestesias, nega perda de força. Nega febre, perda de peso. Sem alteração urinária ou intestinal. Trabalha em obra há 20 anos, carrega peso frequentemente. Sedentário. Nega uso de drogas EV. Nega história de câncer.'
    },
    
    etapas: [
      {
      id: 'etapa-1-redflags',
      titulo: 'Avaliação de Sinais de Alarme',
        tipo: 'anamnese',
      conteudo: {
        texto: 'Antes de prosseguir, você precisa descartar causas graves de lombalgia.',
        dicas: ['Red flags = indicação de investigação adicional', 'Yellow flags = risco de cronificação']
      },
      pergunta: {
        enunciado: 'Qual das seguintes características seria um RED FLAG para lombalgia?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Dor que piora ao final do dia', correta: false },
          { id: 'b', texto: 'Irradiação para glúteo', correta: false },
          { id: 'c', texto: 'Incontinência urinária de início recente', correta: true },
          { id: 'd', texto: 'Melhora com repouso', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'Red flags: síndrome da cauda equina (incontinência, anestesia em sela, fraqueza MMII), febre + lombalgia, história de câncer, perda de peso inexplicada, uso de drogas EV, trauma significativo, idade >50 com dor nova, dor noturna que não alivia.',
        pontos: 15
      }
    },
    {
      id: 'etapa-2-exame',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Você realiza exame físico da coluna e neurológico.',
        dados: {
          'Inspeção': 'Retificação da lordose lombar',
          'Palpação': 'Dor à palpação paravertebral L4-S1',
          'Mobilidade': 'Flexão limitada por dor',
          'Lasègue': 'Negativo bilateral',
          'Força MMII': '5/5 bilateral',
          'Sensibilidade': 'Preservada',
          'Reflexos': 'Patelar e Aquileu simétricos',
          'Marcha': 'Normal'
        }
      },
      pergunta: {
        enunciado: 'O teste de Lasègue (elevação da perna estendida) negativo indica:',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Baixa probabilidade de compressão radicular', correta: true },
          { id: 'b', texto: 'Necessidade de ressonância magnética', correta: false },
          { id: 'c', texto: 'Diagnóstico de hérnia de disco', correta: false },
          { id: 'd', texto: 'Origem muscular descartada', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Lasègue positivo (dor irradiando para perna ao elevar <60°) tem sensibilidade de 91% para hérnia. Negativo + exame neurológico normal = baixa probabilidade de radiculopatia. Maioria das lombalgias é mecânica/inespecífica.',
        pontos: 10
      }
    },
    {
      id: 'etapa-3-classificacao',
      titulo: 'Classificação da Lombalgia',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na avaliação, você precisa classificar a lombalgia.',
        dicas: ['Sem red flags + exame neurológico normal = inespecífica', 'Não solicitar imagem de rotina']
      },
      pergunta: {
        enunciado: 'Como você classifica esta lombalgia?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Lombalgia específica - hérnia discal', correta: false },
          { id: 'b', texto: 'Lombalgia inespecífica subaguda', correta: true },
          { id: 'c', texto: 'Lombalgia com radiculopatia', correta: false },
          { id: 'd', texto: 'Estenose do canal lombar', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Classificação: Aguda (<4 sem), Subaguda (4-12 sem), Crônica (>12 sem). Inespecífica: sem red flags, sem déficit neurológico. 90% das lombalgias são inespecíficas. Não há indicação de imagem.',
        pontos: 15
      }
    },
    {
      id: 'etapa-4-tratamento',
      titulo: 'Conduta Terapêutica',
      tipo: 'tratamento',
      conteudo: {
        texto: 'É hora de definir o tratamento para Pedro.',
        dicas: ['Educação é fundamental', 'Atividade > repouso', 'Analgesia em degraus']
      },
      pergunta: {
        enunciado: 'Qual é a conduta inicial mais adequada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Repouso absoluto por 1 semana + AINE + relaxante muscular', correta: false },
          { id: 'b', texto: 'Analgésico comum + AINE + orientar manter atividade + fisioterapia', correta: true },
          { id: 'c', texto: 'Solicitar RX + RM antes de iniciar tratamento', correta: false },
          { id: 'd', texto: 'Encaminhar para ortopedista', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Lombalgia inespecífica: 1) Educação (bom prognóstico, manter atividade), 2) Analgesia escalonada (paracetamol → AINE → opioide fraco se necessário), 3) Fisioterapia/exercícios. Repouso prolongado piora prognóstico. Imagem não indicada sem red flags.',
        pontos: 20
      }
    },
    {
      id: 'etapa-5-orientacoes',
      titulo: 'Orientações e Prevenção',
      tipo: 'educacao',
      conteudo: {
        texto: 'Você precisa orientar Pedro sobre a lombalgia e prevenção de recorrências.',
        dicas: ['Yellow flags aumentam risco de cronificação', 'Ergonomia ocupacional é essencial']
      },
      pergunta: {
        enunciado: 'Qual orientação está INCORRETA para este paciente?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Evitar carregar peso por período indefinido', correta: true },
          { id: 'b', texto: 'Manter atividade física leve, evitar repouso prolongado', correta: false },
          { id: 'c', texto: 'Fortalecimento de core após fase aguda', correta: false },
          { id: 'd', texto: 'Técnicas adequadas de levantamento de peso', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Evitar atividade indefinidamente aumenta medo-evitação e piora prognóstico. O correto é: retorno gradual às atividades, orientar ergonomia (dobrar joelhos ao levantar peso), fortalecimento muscular. Afastamento do trabalho deve ser curto.',
        pontos: 10
      }
    }
  ],
  
  desfecho: {
    resumo: 'Pedro apresentava lombalgia inespecífica subaguda de origem mecânica, manejada integralmente na APS.',
    diagnosticoFinal: 'Lombalgia inespecífica subaguda (M54.5)',
    tratamentoRealizado: 'Paracetamol 750mg 6/6h + Ibuprofeno 400mg 8/8h por 7 dias. Orientado manter atividades leves. Encaminhado para fisioterapia (fortalecimento lombar).',
    evolucao: 'Em 2 semanas: dor reduziu 70%. Em 6 semanas: assintomático. Retornou ao trabalho com orientações de ergonomia. Iniciou caminhadas.',
    licoesPrincipais: [
      'Maioria das lombalgias é inespecífica e autolimitada',
      'Red flags são raros - buscar ativamente',
      'Imagem NÃO está indicada sem red flags',
      'Repouso prolongado piora prognóstico',
      'Educação e exercício são fundamentais'
    ],
    errosComuns: [
      'Solicitar RX/RM de rotina',
      'Prescrever repouso absoluto',
      'Encaminhar precocemente para especialista',
      'Não avaliar yellow flags (risco de cronificação)',
      'Usar opioides como primeira linha'
    ]
  },
  
  objetivosAprendizagem: [
    'Identificar red flags na lombalgia',
    'Classificar lombalgia (específica vs inespecífica)',
    'Manejar lombalgia sem imagem desnecessária',
    'Orientar prevenção de cronificação'
  ],
  competencias: ['Diagnóstico clínico', 'Exame físico', 'Educação em saúde', 'Medicina baseada em evidências'],
  doencasRelacionadas: ['lombalgia'],
  medicamentosRelacionados: ['paracetamol', 'ibuprofeno', 'naproxeno'],
  calculadorasRelacionadas: [],
  referencias: ['ACP Clinical Practice Guideline 2017', 'NICE Low Back Pain 2020'],
  tags: ['lombalgia', 'dor', 'musculoesquelético', 'iniciante']
};

// ============================================================================
// TODOS OS CASOS
// ============================================================================

export const todosCasosClinicos: CasoClinico[] = [
  casoHAS,
  casoDM2,
  casoDepressao,
  casoAsma,
  casoLombalgia,
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
