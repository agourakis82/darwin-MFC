import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_OTITE_ped_001: CasoClinico = {
  id: 'caso-otite-media-aguda-001',
  titulo: 'Otite Média Aguda em Lactente',
  subtitulo: 'Criança de 18 meses com dor de ouvido e febre',
  categoria: 'pediatrico',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria Silva',
      idade: 18,
      sexo: 'F',
      profissao: 'Criança',
      estadoCivil: 'Solteira'
    },
    queixaPrincipal: 'A mãe relata: "Minha filha está puxando a orelha e chorando muito, com febre alta há dois dias."',
    historiaDoencaAtual: 'Criança de 18 meses previamente hígida, com início agudo de irritabilidade, otalgia à direita, febre de até 39°C, sem tosse ou coriza associada. A mãe nega trauma recente ou exposição a fumaça. Vacinação em dia, frequenta creche.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você inicia a anamnese com a mãe. Ela descreve sintomas de infecção respiratória recente na creche. O que deseja investigar?',
        dicas: ['Fatores de risco como creche, história de infecções recorrentes, sintomas associados']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante para o diagnóstico diferencial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de alergias alimentares', correta: false },
          { id: 'b', texto: 'Frequência de infecções de ouvido prévias', correta: true },
          { id: 'c', texto: 'Dieta da criança', correta: false },
          { id: 'd', texto: 'Vacinação contra gripe', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'História de otites recorrentes aumenta o risco de OMA e influencia a decisão terapêutica [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A recorrência é um fator de risco chave.',
        incorreto: 'Priorize fatores de risco para infecções de ouvido médio.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, a criança está irritada, TA 90/60 mmHg, FC 140 bpm, T 38.5°C, FR 30 irpm. Otoscopia revela membrana timpânica avermelhada, abaulada e com mobilidade reduzida à direita.',
        dados: {
          'Temperatura': '38.5°C',
          'Frequência cardíaca': '140 bpm',
          'Peso': '10.5 kg (percentil 50)',
          'Otoscopia direita': 'Tímpano opaco e abaulado',
          'Otoscopia esquerda': 'Normal'
        },
        dicas: ['Foco na otoscopia para confirmação diagnóstica']
      },
      pergunta: {
        enunciado: 'Qual achado confirma o diagnóstico de OMA?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Febre isolada', correta: false },
          { id: 'b', texto: 'Tímpano abaulado e opaco', correta: true },
          { id: 'c', texto: 'Taquicardia', correta: false },
          { id: 'd', texto: 'Irritabilidade', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Otoscopia com efusão timpânica, opacidade e mobilidade reduzida é essencial para diagnóstico de OMA [2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Em casos leves, exames não são rotineiros, mas você considera hemograma para febre persistente. Resultados: Leucócitos 12.000/mm³ (neutrófilos 70%), sem outras alterações.',
        dados: {
          'Hemoglobina': '11.5 g/dL',
          'Leucócitos': '12.000/mm³',
          'Neutrófilos': '70%',
          'Plaquetas': '350.000/mm³'
        }
      },
      pergunta: {
        enunciado: 'Como interpretar o hemograma?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Leucopenia sugestiva de viral', correta: false },
          { id: 'b', texto: 'Leucocitose com neutrofilia compatível com infecção bacteriana', correta: true },
          { id: 'c', texto: 'Anemia grave', correta: false },
          { id: 'd', texto: 'Trombocitopenia', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Leucocitose com neutrofilia suporta etiologia bacteriana em OMA, mas diagnóstico é clínico [1,2].',
        pontos: 10
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na história, exame físico e dados laboratoriais, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Otite externa', correta: false },
          { id: 'b', texto: 'Otite média aguda unilateral', correta: true },
          { id: 'c', texto: 'Mastoidite', correta: false },
          { id: 'd', texto: 'Dor dentária referida', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sintomas clássicos e otoscopia confirmam OMA em criança <2 anos [2,3].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'A criança tem otalgia moderada, febre e <2 anos. Defina o plano inicial.'
      },
      pergunta: {
        enunciado: 'Qual a conduta MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Observação sem antibiótico', correta: false },
          { id: 'b', texto: 'Amoxicilina 80-90 mg/kg/dia por 10 dias', correta: true },
          { id: 'c', texto: 'Antibiótico apenas se piora em 72h', correta: false },
          { id: 'd', texto: 'Cefalosporina de terceira geração', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Para crianças <2 anos com OMA confirmada, antibiótico é indicado, com amoxicilina em dose alta como primeira linha [2,3].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Retorno em 48h: Febre resolvida, otalgia melhorada, otoscopia com melhora parcial.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter antibiótico e reavaliar em 5 dias', correta: true },
          { id: 'b', texto: 'Suspender tratamento', correta: false },
          { id: 'c', texto: 'Mudar para outro antibiótico', correta: false },
          { id: 'd', texto: 'Encaminhar para otorrino imediatamente', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Reavaliação em 48-72h para casos em tratamento; continuar se melhorando [2].',
        pontos: 15
      }
    }
  ],

  desfecho: {
    resumo: 'Criança de 18 meses com OMA unilateral tratada com amoxicilina, evoluindo favoravelmente sem complicações.',
    diagnosticoFinal: 'Otite Média Aguda (CID-11: CA23)',
    tratamentoRealizado: 'Amoxicilina 80 mg/kg/dia por 10 dias + ibuprofeno para analgesia; orientação para creche e prevenção.',
    evolucao: 'Melhora clínica em 48h, resolução completa em 10 dias, sem recorrência em 1 mês.',
    licoesPrincipais: [
      'Diagnóstico de OMA requer otoscopia para confirmação de efusão timpânica [2].',
      'Em crianças <2 anos com sintomas moderados, antibióticos são indicados para reduzir complicações [2,3].',
      'Uso racional de antibióticos previne resistência bacteriana [1].',
      'Fatores de risco como creche aumentam incidência; vacinação pneumocócica é protetora [4].',
      'Reavaliação em 48-72h é essencial para monitorar resposta [2].'
    ],
    errosComuns: [
      'Prescrever antibióticos sem confirmação otoscópica, contribuindo para resistência [1].',
      'Ignorar observação em casos leves >2 anos, desnecessário uso de medicamentos [2].',
      'Não investigar complicações como mastoidite em persistência de sintomas [2].',
      'Subestimar dor e febre, sem analgesia adequada [3].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sinais e sintomas de otite média aguda em crianças.',
    'Realizar e interpretar otoscopia para diagnóstico.',
    'Aplicar diretrizes para indicação de antibióticos em OMA.',
    'Entender manejo inicial e seguimento em atenção primária.'
  ],
  competencias: [
    'Diagnóstico clínico em pediatria',
    'Manejo de infecções respiratórias',
    'Uso racional de antimicrobianos',
    'Atenção primária SUS'
  ],
  doencasRelacionadas: ['otite-media-aguda'],
  medicamentosRelacionados: ['J01CA04'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004'],
  tags: ['pediatria', 'otite', 'infecção', 'antibiótico', 'otoscopia']
};