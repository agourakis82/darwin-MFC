/**
 * SÍNDROMES GERIÁTRICAS - DARWIN-MFC
 * ===================================
 * Condições comuns na população idosa na APS
 * 
 * Nota: fullContent será expandido em versão futura
 */

import { Doenca } from '../../types/doenca';

export const doencasGeriatricas: Partial<Doenca>[] = [
  {
    id: 'sindrome-fragilidade',
    titulo: 'Síndrome de Fragilidade',
    ciap2: ['A04'],
    cid10: ['R54'],
    categoria: 'outros',
    doid: 'DOID:0080429',
    snomedCT: '248279007',
    meshId: 'D000073496',
    umlsCui: 'C0424594',
    quickView: {
      definicao: 'Síndrome geriátrica de vulnerabilidade aumentada a estressores por declínio de reservas fisiológicas. Prevalência de 10-15% em >65 anos.',
      criteriosDiagnosticos: [
        'Fenótipo de Fried: ≥3 critérios = frágil, 1-2 = pré-frágil',
        'Perda de peso não intencional >4,5kg/ano',
        'Exaustão autorrelatada',
        'Baixa atividade física',
        'Lentidão de marcha',
        'Fraqueza (grip strength)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Exercício multicomponente (resistência + equilíbrio)', 'Intervenção nutricional proteica', 'Avaliação geriátrica ampla'],
        farmacologico: ['Vitamina D se deficiência', 'Revisão e desprescrição de medicamentos']
      },
      redFlags: ['Quedas recorrentes', 'Perda de peso significativa', 'Hospitalizações frequentes', 'Declínio funcional rápido']
    },
    medicamentos: ['vitamina-d'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'delirium',
    titulo: 'Delirium (Estado Confusional Agudo)',
    ciap2: ['P71'],
    cid10: ['F05'],
    categoria: 'neurologico',
    doid: 'DOID:0060164',
    snomedCT: '2776000',
    meshId: 'D003693',
    umlsCui: 'C0011206',
    quickView: {
      definicao: 'Síndrome neuropsiquiátrica aguda com alteração de atenção e consciência de curso flutuante. 10-30% dos idosos hospitalizados.',
      criteriosDiagnosticos: [
        'CAM: início agudo + curso flutuante',
        'Desatenção (não mantém conversa)',
        'Pensamento desorganizado OU alteração de consciência',
        'Flutuação ao longo do dia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Identificar e tratar causa subjacente', 'Reorientação repetida', 'Presença de familiar', 'Minimizar contenção'],
        farmacologico: ['Haloperidol 0,5-1mg APENAS se agitação grave', 'Evitar benzodiazepínicos']
      },
      redFlags: ['Febre alta', 'Sinais neurológicos focais', 'Hipóxia', 'Hipoglicemia', 'Abstinência alcoólica']
    },
    medicamentos: ['haloperidol'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'incontinencia-urinaria-idoso',
    titulo: 'Incontinência Urinária no Idoso',
    ciap2: ['U04'],
    cid10: ['N39.4'],
    categoria: 'outros',
    doid: 'DOID:13580',
    snomedCT: '165232002',
    meshId: 'D014549',
    umlsCui: 'C0042024',
    quickView: {
      definicao: 'Perda involuntária de urina causando impacto social ou higiênico. 30-50% dos idosos na comunidade.',
      criteriosDiagnosticos: [
        'Identificar tipo: urgência, esforço, mista, funcional',
        'Diário miccional',
        'Teste de esforço positivo',
        'Resíduo pós-miccional'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Exercícios de Kegel (assoalho pélvico)', 'Treinamento vesical', 'Micção programada', 'Reduzir cafeína'],
        farmacologico: ['Oxibutinina ou Tolterodina (urgência)', 'Mirabegrona (alternativa)', 'Cuidado com anticolinérgicos em idosos']
      },
      redFlags: ['Hematúria', 'Dor pélvica', 'Infecção urinária recorrente', 'Retenção urinária']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'quedas-idoso',
    titulo: 'Síndrome de Quedas no Idoso',
    ciap2: ['A29'],
    cid10: ['W19'],
    categoria: 'outros',
    doid: 'DOID:14002',
    snomedCT: '56307009',
    meshId: 'D000058',
    umlsCui: 'C0000921',
    quickView: {
      definicao: 'Evento não intencional de deslocamento ao solo. 30% dos >65 anos caem/ano. Principal causa de morte traumática em idosos.',
      criteriosDiagnosticos: [
        '≥2 quedas em 12 meses = alto risco',
        'Timed Up and Go >12 segundos',
        'História detalhada da queda',
        'Avaliação de marcha e equilíbrio'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Exercícios de equilíbrio (Tai Chi)', 'Correção visual', 'Adaptação ambiental', 'Calçados adequados'],
        farmacologico: ['Vitamina D 800-1000UI/dia', 'Revisar sedativos e anti-hipertensivos']
      },
      redFlags: ['Queda com fratura', 'Lesão de cabeça', 'Síncope associada', 'Queda recorrente']
    },
    medicamentos: ['vitamina-d'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'polifarmacia',
    titulo: 'Polifarmácia no Idoso',
    ciap2: ['A97'],
    cid10: ['Y57.9'],
    categoria: 'outros',
    doid: 'DOID:0111688',
    snomedCT: '182929008',
    meshId: 'D019338',
    umlsCui: 'C0032269',
    quickView: {
      definicao: 'Uso simultâneo de ≥5 medicamentos. 40% dos idosos >65 anos. Principal causa de eventos adversos evitáveis.',
      criteriosDiagnosticos: [
        'Contagem de medicamentos ≥5',
        'Identificar MPI via Beers ou STOPP/START',
        'Avaliar cascata de prescrição',
        'Reconciliação medicamentosa'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Reconciliação medicamentosa', 'Aplicar STOPP/START', 'Desprescrição gradual supervisionada', 'Envolver paciente e família'],
        farmacologico: ['Não há - o tratamento É a desprescrição']
      },
      redFlags: ['Reações adversas', 'Quedas', 'Declínio cognitivo', 'Não adesão', 'Piora funcional']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  }
];
