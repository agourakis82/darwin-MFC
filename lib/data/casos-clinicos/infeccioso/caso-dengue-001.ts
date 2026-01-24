import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_DENGUE_inf_001: CasoClinico = {
  id: 'caso-dengue-001',
  titulo: 'Dengue com Sinais de Alarme em Adulto Jovem',
  subtitulo: 'Paciente com febre intensa, mialgias e dor abdominal em área endêmica',
  categoria: 'infeccioso',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'João Silva',
      idade: 35,
      sexo: 'M',
      profissao: 'Pedreiro',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Estou com febre alta, dor de cabeça e dor nas costas que não passa há quatro dias',
    historiaDoencaAtual: 'Paciente refere início abrupto de febre de até 39°C, cefaleia retro-orbital, mialgias intensas e artralgias há 4 dias. Evoluiu com rash maculopapular no tronco e membros, anorexia e dois episódios de vômito. Negam diarreia ou sangramentos evidentes. Trabalha em construção civil em bairro periférico de Rio de Janeiro, com exposição frequente a água parada. Sem comorbidades conhecidas, vacinas em dia, mas sem vacinação específica para dengue. Exposição recente a mosquitos relatada.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona morar em área endêmica e ter sido picado por mosquitos recentemente. O que mais deseja investigar?',
        dicas: ['Considere exposição a vetores, sintomas clássicos de arbovirose e sinais de alarme como dor abdominal persistente']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante para o diagnóstico diferencial neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens internacionais', correta: false },
          { id: 'b', texto: 'Exposição a mosquitos e água parada em casa', correta: true },
          { id: 'c', texto: 'Uso de tabaco ou álcool', correta: false },
          { id: 'd', texto: 'Dieta recente', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'A exposição a Aedes aegypti em áreas endêmicas é fundamental para suspeita de dengue [2,5].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A epidemiologia direciona o raciocínio para arboviroses.',
        incorreto: 'Priorize fatores de risco locais para transmissão.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa febril, com sinais de desidratação leve. Achados incluem:',
        dados: {
          'PA': '110/70 mmHg',
          'FC': '100 bpm',
          'FR': '20 irpm',
          'Temperatura': '38.5°C',
          'Hidratação': 'Desidratação leve (pele pouco elástica)',
          'Outros': 'Rash maculopapular difuso, dor à palpação abdominal'
        },
        dicas: ['Note os sinais de alarme como dor abdominal e taquicardia, sugestivos de fase crítica']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS preocupante e sugere sinais de alarme?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Rash maculopapular', correta: false },
          { id: 'b', texto: 'Dor abdominal à palpação', correta: true },
          { id: 'c', texto: 'Taquicardia (FC 100 bpm)', correta: false },
          { id: 'd', texto: 'Febre de 38.5°C', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Dor abdominal intensa é um sinal de alarme na classificação OMS 2009, indicando risco de evolução para dengue grave [2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames laboratoriais iniciais. Resultados mostram:',
        dados: {
          'Hemoglobina': '15.2 g/dL',
          'Plaquetas': '90.000/mm³',
          'Hematócrito': '48%',
          'Leucócitos': '3.500/mm³',
          'AST/ALT': 'Elevadas (80/60 U/L)',
          'Antígeno NS1': 'Positivo'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados laboratoriais?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Infecção bacteriana com leucocitose', correta: false },
          { id: 'b', texto: 'Trombocitopenia e hemoconcentração sugestivas de dengue', correta: true },
          { id: 'c', texto: 'Anemia por sangramento oculto', correta: false },
          { id: 'd', texto: 'Apenas elevação de transaminases isolada', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Plaquetas <100.000/mm³, hemoconcentração (hematÓcrito >20% basal) e NS1 positivo confirmam suspeita de dengue na fase febril [2,5].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame físico e exames, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Dengue sem sinais de alarme', correta: false },
          { id: 'b', texto: 'Dengue com sinais de alarme', correta: true },
          { id: 'c', texto: 'Leptospirose', correta: false },
          { id: 'd', texto: 'Infecção viral inespecífica', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sintomas clássicos + sinais de alarme (dor abdominal, vômitos) + NS1 positivo classificam como dengue com sinais de alarme pela OMS 2009 [2,5].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'O paciente apresenta sinais de alarme. Defina o manejo inicial.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Antibióticos empíricos', correta: false },
          { id: 'b', texto: 'Hidratação oral e paracetamol, com monitoramento ambulatorial', correta: false },
          { id: 'c', texto: 'Internação para hidratação IV e vigilância de plaquetas', correta: true },
          { id: 'd', texto: 'Aspirina para dor', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'Sinais de alarme requerem hospitalização para hidratação IV e monitoramento, evitando AINEs para prevenir sangramento [2,10].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Após 48 horas de internação, o paciente melhora: febre resolve, plaquetas sobem para 120.000/mm³, sem sangramento. Recebe alta com orientações.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Retorno em 7 dias para sorologia e repouso', correta: true },
          { id: 'b', texto: 'Continuar internação por mais 3 dias', correta: false },
          { id: 'c', texto: 'Iniciar profilaxia com mosquitocida', correta: false },
          { id: 'd', texto: 'Transfusão de plaquetas profilática', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Na fase de recuperação, monitorar sorologia (IgM) e prevenir reinfecção; transfusão só em sangramento ativo [1,2].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente com suspeita de dengue confirmada por NS1, evoluiu com sinais de alarme mas respondeu bem à hidratação IV, sem complicações graves.',
    diagnosticoFinal: 'Dengue com sinais de alarme (classificação OMS 2009)',
    tratamentoRealizado: 'Hidratação intravenosa, analgésicos com paracetamol, monitoramento hematológico e repouso. Sem necessidade de transfusão.',
    evolucao: 'Melhora clínica em 48 horas, alta hospitalar em 72 horas, com recuperação completa em 10 dias. Sorologia IgM positiva no seguimento.',
    licoesPrincipais: [
      'Reconhecer sinais de alarme (dor abdominal, vômitos, plaquetas <100.000) para hospitalização precoce [2].',
      'Diagnóstico laboratorial com NS1/RT-PCR na fase aguda e sorologia para confirmação [5].',
      'Manejo suporte com hidratação; evitar AINEs e aspirina para prevenir hemorragia [2,10].',
      'Prevenção por controle de vetores e vacinação em populações elegíveis (9-16 anos com infecção prévia) [4].',
      'Vigilância em áreas endêmicas, especialmente em crianças e neonatos [9,10].'
    ],
    errosComuns: [
      'Confundir com outras febres (malária, leptospirose) sem considerar epidemiologia local [6].',
      'Uso de anti-inflamatórios não esteroides, aumentando risco de sangramento [2].',
      'Transfusão profilática de plaquetas sem indicação, desnecessária na maioria dos casos [1].',
      'Subestimar sinais de alarme, levando a evolução para dengue grave [2].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar sinais de alarme na dengue e classificar pela OMS 2009.',
    'Solicitar testes diagnósticos apropriados (NS1, plaquetas, hematócrito) em suspeita de arbovirose.',
    'Manejar suporte em dengue com sinais de alarme, priorizando hidratação e monitoramento.',
    'Discutir prevenção e vigilância em contextos endêmicos brasileiros.'
  ],
  competencias: ['raciocinio_diagnostico', 'manejo_infeccioso', 'epidemiologia_clinica'],
  doencasRelacionadas: ['dengue'],
  medicamentosRelacionados: [],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-004', 'ref-005', 'ref-009', 'ref-010'],
  tags: ['dengue', 'sinais-de-alarme', 'arbovirose', 'endêmico', 'hidratacao']
};