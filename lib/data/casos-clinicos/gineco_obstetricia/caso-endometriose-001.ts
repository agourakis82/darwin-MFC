import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_ENDOMETRIOSE_gin_001: CasoClinico = {
  id: 'caso-endometriose-001',
  titulo: 'Dor pélvica crônica e infertilidade',
  subtitulo: 'Mulher de 32 anos com dismenorreia intensa e tentativa frustrada de gravidez',
  categoria: 'gineco_obstetricia',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Ana Paula Silva',
      idade: 32,
      sexo: 'F',
      profissao: 'Professora',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Eu tenho uma dor forte na barriga todo mês quando vem a menstruação, e não consigo engravidar há dois anos',
    historiaDoencaAtual: 'Paciente refere dismenorreia progressiva desde a menarca aos 13 anos, com intensificação nos últimos 5 anos, associada a dor pélvica crônica e dispareunia. Ciclo menstrual regular, 28/30 dias, fluxo abundante. Tentativa de concepção há 24 meses sem sucesso. Nega febre, perda de peso ou sintomas gastrointestinais. Usa AINEs esporadicamente com alívio parcial.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente relata ausência de comorbidades, mas menciona história familiar de endometriose na mãe. Nega tabagismo ou uso de álcool excessivo. Toma anticoncepcional oral intermitentemente no passado.',
        dicas: ['Investigue sintomas associados como infertilidade e dispareunia, além de história familiar [5,6]']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para o diagnóstico diferencial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'História familiar de endometriose', correta: true },
          { id: 'c', texto: 'Prática de exercícios intensos', correta: false },
          { id: 'd', texto: 'Dieta vegetariana', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'História familiar aumenta o risco de endometriose, com prevalência de até 10% em parentes de primeiro grau [5].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A história familiar é um fator de risco importante.',
        incorreto: 'Priorize fatores de risco genéticos e ginecológicos no contexto de dor pélvica crônica.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, a paciente apresenta-se eutrófica, eupneica. PA 120/80 mmHg, FC 76 bpm, IMC 24,5 kg/m². Exame pélvico revela útero em AIM, mobilidade preservada, mas dor à mobilização cervical e à palpação anexial bilateral.',
        dados: {
          'PA': '120/80 mmHg',
          'FC': '76 bpm',
          'IMC': '24.5 kg/m²',
          'Exame pélvico': 'Dor à mobilização cervical e palpação anexial'
        },
        dicas: ['A dor à palpação sugere lesões pélvicas inflamatórias ou infiltrantes [3,6]']
      },
      pergunta: {
        enunciado: 'Qual achado do exame físico é MAIS sugestivo de endometriose?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'IMC elevado', correta: false },
          { id: 'b', texto: 'Dor à mobilização cervical e palpação anexial', correta: true },
          { id: 'c', texto: 'PA normal', correta: false },
          { id: 'd', texto: 'Útero em AIM', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Dor pélvica à palpação é um achado clássico em endometriose, presente em até 80% dos casos sintomáticos [3,6].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames de imagem e laboratoriais. Resultados da ultrassonografia transvaginal: cistos anexiais bilaterais sugestivos de endometriomas (2,5 cm direito, 3 cm esquerdo). CA-125: 45 U/mL (elevado). Hemograma e beta-HCG normais.',
        dados: {
          'Ultrassonografia transvaginal': 'Cistos anexiais bilaterais sugestivos de endometriomas',
          'CA-125': '45 U/mL (VR <35)',
          'Beta-HCG': 'Negativo',
          'Hemograma': 'Normal'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta esses resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Cistos ovarianos funcionais isolados', correta: false },
          { id: 'b', texto: 'Achados compatíveis com endometriose ovariana', correta: true },
          { id: 'c', texto: 'Gravidez ectópica', correta: false },
          { id: 'd', texto: 'Infecção pélvica aguda', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Endometriomas ("chocolate cysts") são lesões típicas de endometriose, e CA-125 elevado suporta o diagnóstico, embora não específico [4,6].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na história, exame e exames complementares, formule sua hipótese diagnóstica principal.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Endometriose ovariana estágio III', correta: true },
          { id: 'b', texto: 'Síndrome do ovário policístico', correta: false },
          { id: 'c', texto: 'Adenomiose isolada', correta: false },
          { id: 'd', texto: 'Doença inflamatória pélvica crônica', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Combinação de dismenorreia, infertilidade, dor à palpação e endometriomas bilaterais sugere endometriose moderada a grave [1,5,6].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'A paciente deseja alívio da dor e preservação da fertilidade. Discuta opções de manejo.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica INICIAL MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Laparoscopia diagnóstica imediata', correta: false },
          { id: 'b', texto: 'Terapia hormonal com ACO contínuo + AINEs', correta: true },
          { id: 'c', texto: 'Histerectomia', correta: false },
          { id: 'd', texto: 'Observação sem intervenção', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Terapia médica inicial com ACO para supressão ovariana e AINEs para dor é recomendada em casos sintomáticos com desejo de fertilidade [1,10].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 6 meses, a paciente relata melhora da dor (redução de 70%), mas persiste infertilidade. USG mostra estabilidade dos cistos. CA-125 normalizado.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter terapia médica e encaminhar para reprodução assistida', correta: true },
          { id: 'b', texto: 'Suspender tratamento', correta: false },
          { id: 'c', texto: 'Indicar laparoscopia cirúrgica imediata', correta: false },
          { id: 'd', texto: 'Iniciar agonistas de GnRH', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Melhora sintomática permite manutenção médica; infertilidade persistente requer avaliação especializada [1,7].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente com endometriose ovariana diagnosticada por história, exame e imagem, tratada inicialmente com terapia hormonal, com melhora da dor mas necessidade de suporte à fertilidade.',
    diagnosticoFinal: 'Endometriose estágio III (CID-11: CA23)',
    tratamentoRealizado: 'Anticoncepcional oral contínuo + ibuprofeno sob demanda; encaminhamento para FIV após 12 meses.',
    evolucao: 'Após 12 meses, concepção via FIV bem-sucedida; dor controlada com terapia de manutenção.',
    licoesPrincipais: [
      'Dismenorreia intensa e infertilidade em mulheres férteis sugerem endometriose como diagnóstico principal [5,6].',
      'Ultrassonografia transvaginal com protocolo é o método inicial de imagem de escolha [4].',
      'Manejo inicial médico preserva fertilidade em casos moderados [1,10].',
      'História familiar é fator de risco chave, justificando investigação precoce [5].',
      'Monitoramento com CA-125 e imagem é útil, mas laparoscopia confirma o diagnóstico [6].'
    ],
    errosComuns: [
      'Subestimar sintomas como "normais" da menstruação, atrasando diagnóstico [9].',
      'Solicitar RMN como exame inicial em vez de USG, aumentando custos desnecessariamente [4,6].',
      'Optar por cirurgia precoce sem tentativa médica em pacientes que desejam gravidez [1].',
      'Ignorar impacto psicológico e qualidade de vida, focando apenas em sintomas físicos [9].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sintomas clássicos de endometriose e seu impacto na fertilidade.',
    'Aplicar diretrizes para diagnóstico não invasivo usando imagem e marcadores.',
    'Selecionar manejo inicial alinhado à preservação da fertilidade.',
    'Entender o papel do acompanhamento multidisciplinar em condições crônicas ginecológicas.'
  ],
  competencias: [
    'Realizar anamnese e exame físico ginecológico direcionado.',
    'Interpretar exames de imagem em ginecologia.',
    'Formular plano terapêutico baseado em evidências para endometriose.',
    'Gerenciar seguimento de pacientes com infertilidade associada.'
  ],
  doencasRelacionadas: ['endometriose'],
  medicamentosRelacionados: [],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-005', 'ref-006', 'ref-007', 'ref-010'],
  tags: ['dor pélvica', 'dismenorreia', 'infertilidade', 'endometriose', 'ginecologia']
};