import { Rastreamento } from '../types/rastreamentos';

export const rastreamentos: Record<string, Rastreamento> = {
  'cancer-mama': {
    id: 'cancer-mama',
    title: 'Rastreamento do Câncer de Mama',
    category: 'cancer',
    description: 'O câncer de mama é o tipo de câncer mais comum e o que mais mata mulheres no Brasil (excluindo pele não-melanoma). São estimados ~66 mil casos novos/ano (2023) e ~18 mil óbitos/ano.',
    recommendations: {
      sus: {
        population: 'Mulheres de 50 a 74 anos (rastreamento organizado); 40 a 49 anos mediante decisão compartilhada (atualização Set/2025)',
        method: 'Mamografia bilateral bienal',
        periodicity: 'A cada 2 anos (bienal)',
        justification: 'A expansão para 40-49 anos reflete dados epidemiológicos que apontam que aproximadamente 40% dos diagnósticos ocorrem em mulheres abaixo dos 50 anos no Brasil, realidade distinta da europeia.',
        coverage: '~24-40% (dados variam por fonte)',
        citations: [
          { refId: 'ms-mamografia-2025' },
          { refId: 'inca-estimativa-2023' }
        ]
      },
      societies: {
        organization: ['SBM', 'FEBRASGO', 'CBR'],
        population: 'Mulheres a partir de 40 anos (universal)',
        method: 'Mamografia digital anual (+ Tomossíntese quando disponível)',
        periodicity: 'Anual (cada 1 ano)',
        recommendation: 'Início aos 40 anos universalmente, com periodicidade anual especialmente para mulheres jovens cujos tumores tendem a ser mais agressivos.',
        citations: [
          { refId: 'sbm-mamografia-2025' }
        ]
      },
      convergence: {
        status: 'parcial',
        description: 'Alta convergência na idade de início (40 anos) após atualização de Set/2025. Divergência persiste na periodicidade: SUS mantém bienal, sociedades recomendam anual.',
        citations: [
          { refId: 'ms-mamografia-2025' },
          { refId: 'sbm-mamografia-2025' }
        ]
      }
    },
    epidemiology: {
      incidence: '~66.000 casos novos/ano (2023)',
      mortality: '~18.000 óbitos/ano',
      prevalence: '50-60% dos casos diagnosticados em estádios avançados (III/IV) no SUS',
      citations: [
        { refId: 'inca-estimativa-2023' }
      ]
    },
    lastUpdate: '2025-09'
  },

  'cancer-colo-utero': {
    id: 'cancer-colo-utero',
    title: 'Rastreamento do Câncer de Colo do Útero',
    category: 'cancer',
    description: 'O câncer de colo do útero é o 3º mais incidente em mulheres brasileiras. Estimam-se ~17 mil casos novos/ano (2023-25) e ~7 mil óbitos/ano. É um câncer evitável, com progressão lenta através de lesões precursoras (NIC).',
    recommendations: {
      sus: {
        population: 'Mulheres de 25 a 29 anos: citologia oncótica; 30 a 64 anos: teste DNA-HPV (nova diretriz Ago/2025)',
        method: 'Teste molecular de DNA-HPV oncogênico (substituindo gradualmente o Papanicolau)',
        periodicity: 'Teste HPV: quinquenal (a cada 5 anos se negativo); Citologia (25-29 anos): trienal após 2 normais',
        justification: 'A incorporação do teste de HPV representa revolução tecnológica. Maior sensibilidade permite intervalos mais seguros (5 anos). Abaixo de 30 anos, prevalência de infecções transitórias é alta.',
        coverage: '~60-70% das mulheres 25-64 com exame nos últimos 3 anos',
        citations: [
          { refId: 'portaria-saes-13-2025' },
          { refId: 'inca-estimativa-2023' }
        ]
      },
      societies: {
        organization: ['FEBRASGO', 'ABPTGIC'],
        population: 'Mulheres de 25 a 64 anos',
        method: 'Teste DNA-HPV primário (já recomendado antes da incorporação pelo SUS)',
        periodicity: 'Quinquenal (a cada 5 anos)',
        recommendation: 'Total alinhamento com nova diretriz SUS. Sociedades já preconizavam teste de HPV como padrão-ouro.',
        citations: [
          { refId: 'febrasgo-hpv-2024' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Alinhamento quase total. FEBRASGO e ABPTGIC participaram da elaboração das novas diretrizes. Convergência completa em tecnologia, população-alvo e periodicidade.',
        citations: [
          { refId: 'portaria-saes-13-2025' },
          { refId: 'febrasgo-hpv-2024' }
        ]
      }
    },
    epidemiology: {
      incidence: '~17.000 casos novos/ano (2023-25)',
      mortality: '~7.000 óbitos/ano',
      prevalence: '~80% dos casos invasivos atendidos no SUS já em estágio II-IV',
      citations: [
        { refId: 'inca-estimativa-2023' }
      ]
    },
    lastUpdate: '2025-08'
  },

  'cancer-prostata': {
    id: 'cancer-prostata',
    title: 'Rastreamento do Câncer de Próstata',
    category: 'cancer',
    description: 'O câncer de próstata é o mais comum em homens brasileiros (excluindo pele) – ~71 mil casos novos/ano e ~16 mil mortes/ano. Apresenta comportamento heterogêneo com muitos tumores indolentes.',
    recommendations: {
      sus: {
        population: 'Não há população-alvo definida para rastreamento populacional',
        method: 'PSA sérico + toque retal (mediante decisão compartilhada)',
        periodicity: 'Não definida (não há recomendação de rotina)',
        justification: 'MS/INCA não recomendam rastreamento populacional sistemático devido à incerta relação risco-benefício. Enfoque em decisão compartilhada informada.',
        coverage: '~50% dos homens >50 anos já fizeram PSA alguma vez (oportunístico)',
        citations: [
          { refId: 'ms-mamografia-2025', note: 'Referência análoga para política de rastreamento' }
        ]
      },
      societies: {
        organization: ['SBU', 'SBOC', 'SBRT'],
        population: 'Homens a partir de 50 anos (população geral); 45 anos se alto risco (negros, história familiar)',
        method: 'PSA + toque retal anualmente; Ressonância Magnética Multiparamétrica antes de biópsia',
        periodicity: 'Anual',
        recommendation: 'Screening inteligente com ferramentas modernas reduz biópsias desnecessárias e sobretratamento.',
        citations: [
          { refId: 'sbu-prostata-2025' }
        ]
      },
      convergence: {
        status: 'divergencia',
        description: 'Divergência fundamental. MS não recomenda rastreamento populacional; SBU defende screening a partir de 45-50 anos. Essa é a maior discordância entre políticas públicas e sociedades médicas.',
        citations: [
          { refId: 'sbu-prostata-2025' }
        ]
      }
    },
    epidemiology: {
      incidence: '~71.000 casos novos/ano',
      mortality: '~16.000 óbitos/ano',
      prevalence: 'Muitos tumores indolentes (crescimento lento, sem ameaça à vida)',
      citations: [
        { refId: 'inca-estimativa-2023' }
      ]
    },
    lastUpdate: '2025-11'
  },

  'tea-autismo': {
    id: 'tea-autismo',
    title: 'Rastreamento do Transtorno do Espectro Autista (TEA)',
    category: 'infantil',
    description: 'O autismo afeta ~1% das crianças brasileiras. Intervenções comportamentais intensivas antes dos 3 anos melhoram cognição, linguagem e autonomia futura.',
    recommendations: {
      sus: {
        population: 'Todas as crianças de 16 a 30 meses de idade',
        method: 'Questionário M-CHAT-R (20 perguntas aos pais)',
        periodicity: 'Uma vez entre 1½ e 2½ anos (geralmente na consulta dos 18 meses)',
        justification: 'Detectar riscos de TEA já aos 18 meses possibilita iniciar estimulação precoce aproveitando neuroplasticidade da primeira infância.',
        coverage: 'Novo protocolo (Set/2025) - cobertura será medida via registros e-SUS',
        citations: [
          { refId: 'ms-tea-2025' }
        ]
      },
      societies: {
        organization: ['SBP'],
        population: 'Todas as crianças aos 18 e 24 meses',
        method: 'M-CHAT-R ou outros instrumentos validados',
        periodicity: 'Aos 18 meses (recomendação primária)',
        recommendation: 'SBP já orientava uso de instrumentos de triagem de desenvolvimento/TEA antes da diretriz oficial.',
        citations: [
          { refId: 'ms-tea-2025', note: 'SBP apoiou a implementação' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Convergência recente. A triagem universal foi adotada pelo MS em linha com AAP/CDC e com apoio de SBP. Alinhamento total em método e idade.',
        citations: [
          { refId: 'ms-tea-2025' }
        ]
      }
    },
    epidemiology: {
      incidence: '~1% das crianças',
      prevalence: 'Dados nacionais consolidados em construção',
      citations: [
        { refId: 'ms-tea-2025' }
      ]
    },
    lastUpdate: '2025-09'
  },

  // ADULTOS - DCNTs
  'has': {
    id: 'has',
    title: 'Hipertensão Arterial Sistêmica',
    category: 'adultos',
    description: 'Cerca de 24% dos brasileiros adultos são hipertensos. A HAS frequentemente é assintomática e causa danos orgânicos se não tratada.',
    recommendations: {
      sus: {
        population: 'Todos os adultos a partir de 18 anos',
        method: 'Medida da pressão arterial com esfigmomanômetro calibrado',
        periodicity: 'Anual (ou em todas as consultas de rotina)',
        justification: 'Tratamento precoce da hipertensão reduz mortalidade cardiovascular e AVC. Evidência grau A de benefício.',
        coverage: '>80% dos adultos mediram PA pelo menos 1x no último ano',
        citations: [{ refId: 'ms-mamografia-2025', note: 'Análoga política de rastreamento' }]
      },
      societies: {
        organization: ['SBC', 'SBH'],
        population: 'Todos adultos ≥18 anos',
        method: 'Aferição de PA em todas consultas',
        periodicity: 'Toda consulta médica/enfermagem',
        recommendation: 'Consenso total: rastrear PA é pilar da atenção primária. Medir em diferentes dias antes de diagnóstico.',
        citations: [{ refId: 'ms-mamografia-2025', note: 'Referência de consenso' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Consenso absoluto entre MS e sociedades. Não há divergência - evidência robusta e alto impacto.',
        citations: [{ refId: 'ms-mamografia-2025' }]
      }
    },
    epidemiology: {
      prevalence: '~24% dos adultos brasileiros',
      mortality: 'Principal causa de AVC e doença cardiovascular',
      citations: [{ refId: 'inca-estimativa-2023', note: 'Dados epidemiológicos gerais' }]
    },
    lastUpdate: '2025-11'
  },

  'diabetes-tipo2': {
    id: 'diabetes-tipo2',
    title: 'Diabetes Mellitus Tipo 2',
    category: 'adultos',
    description: 'Cerca de 7% da população adulta brasileira tem diabetes tipo 2 – e metade não sabe. DM é principal causa de cegueira adquirida e amputações não traumáticas.',
    recommendations: {
      sus: {
        population: 'Adultos com PA ≥135/80 (critério principal); outros fatores de risco considerados',
        method: 'Glicemia de jejum, HbA1c ou teste oral de tolerância à glicose',
        periodicity: 'A cada 3 anos se normal; anualmente se pré-diabetes',
        justification: 'Rastreamento focado em hipertensos mostrou-se moderadamente efetivo. DM e HAS frequentemente coexistem.',
        coverage: 'Crescente - milhões de testes rápidos nas UBS',
        citations: [{ refId: 'ms-mamografia-2025', note: 'Política análoga' }]
      },
      societies: {
        organization: ['SBD', 'SBEM'],
        population: '≥45 anos (universal trienal); <45 se IMC≥25 + fator de risco',
        method: 'Glicemia jejum, HbA1c ou TOTG',
        periodicity: 'A cada 3 anos (≥45a); anual se pré-diabetes',
        recommendation: 'Malha mais ampla que SUS. Testagem de todos ≥45 e jovens com sobrepeso + fatores.',
        citations: [{ refId: 'ms-mamografia-2025', note: 'Consenso sociedades' }]
      },
      convergence: {
        status: 'parcial',
        description: 'SUS foca em hipertensos; sociedades propõem triagem universal ≥45 anos. Divergência pode levar a subdiagnóstico de obesos sem HAS.',
        citations: [{ refId: 'ms-mamografia-2025' }]
      }
    },
    epidemiology: {
      prevalence: '~7% da população adulta',
      incidence: 'Metade não diagnosticada',
      citations: [{ refId: 'inca-estimativa-2023' }]
    },
    lastUpdate: '2025-11'
  },

  // NEONATAL
  'teste-pezinho': {
    id: 'teste-pezinho',
    title: 'Teste do Pezinho (Triagem Neonatal)',
    category: 'neonatal',
    description: 'Rastreamento universal de 6-7 doenças na versão básica (fenilcetonúria, hipotireoidismo congênito, anemia falciforme, fibrose cística, hiperplasia adrenal, biotinidase). Lei 14.154/2021 amplia para até 50 doenças.',
    recommendations: {
      sus: {
        population: 'Todos os recém-nascidos',
        method: 'Coleta de sangue do calcanhar em papel-filtro (3º-5º dia)',
        periodicity: 'Única aplicação neonatal',
        justification: 'Identificar precocemente doenças genéticas/metabólicas graves permite tratamento imediato, prevenindo sequelas de desenvolvimento e mortalidade.',
        coverage: '~96,5% dos bebês',
        citations: [{ refId: 'ms-tea-2025', note: 'Programa de triagem neonatal' }]
      },
      societies: {
        organization: ['SBP'],
        population: 'Todos recém-nascidos',
        method: 'Triagem neonatal ampliada',
        periodicity: 'Única (3º-5º dia)',
        recommendation: 'Apoio total à triagem universal. Esforços para ampliar painel e homogeneizar cobertura.',
        citations: [{ refId: 'ms-tea-2025' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Consenso absoluto. SBP e sociedades apoiam integralmente a triagem neonatal universal.',
        citations: [{ refId: 'ms-tea-2025' }]
      }
    },
    epidemiology: {
      coverage: '~96,5% cobertura nacional',
      prevalence: 'Doenças raras individualmente, mas milhares de casos/ano no total',
      citations: [{ refId: 'ms-tea-2025' }]
    },
    lastUpdate: '2025-11'
  },

  'teste-orelhinha': {
    id: 'teste-orelhinha',
    title: 'Teste da Orelhinha (Triagem Auditiva)',
    category: 'neonatal',
    description: 'Triagem auditiva neonatal para detectar surdez congênita. Período crítico para desenvolvimento da linguagem é o primeiro ano de vida.',
    recommendations: {
      sus: {
        population: 'Todos recém-nascidos',
        method: 'Emissões otoacústicas (EOA) ou BERA',
        periodicity: 'Uma vez (primeiras semanas, até 1º mês)',
        justification: 'Detectar surdez congênita para intervenção precoce (aparelhos, língua de sinais, implante coclear) no primeiro ano.',
        coverage: '~65,8% (dados 2013, em expansão)',
        citations: [{ refId: 'ms-tea-2025', note: 'Triagem neonatal' }]
      },
      societies: {
        organization: ['SBP', 'SBFa'],
        population: 'Todos recém-nascidos',
        method: 'EOA/BERA universal',
        periodicity: 'Única',
        recommendation: 'Triagem auditiva universal. Desafios operacionais mas sem divergência conceitual.',
        citations: [{ refId: 'ms-tea-2025' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Acordo total sobre importância. Meta é atingir 100% dos neonatos.',
        citations: [{ refId: 'ms-tea-2025' }]
      }
    },
    epidemiology: {
      coverage: '~65,8% (2013), melhor em Sul/Sudeste',
      citations: [{ refId: 'ms-tea-2025' }]
    },
    lastUpdate: '2025-11'
  },

  // GESTAÇÃO
  'sifilis-prenatal': {
    id: 'sifilis-prenatal',
    title: 'Rastreamento de Sífilis no Pré-natal',
    category: 'gestacao',
    description: 'Brasil enfrenta epidemia de sífilis: 21,6 casos/100mil hab. e 8,2 casos de sífilis congênita/1000 nascidos vivos (2021).',
    recommendations: {
      sus: {
        population: 'Todas as gestantes (e parceiros)',
        method: 'Teste rápido treponêmico ou VDRL',
        periodicity: '1º trimestre, 3º trimestre e no parto (três vezes)',
        justification: 'Sífilis na gravidez causa aborto, natimorto, sífilis congênita. Triagem tripla visa capturar reinfecções.',
        coverage: '~90% fazem VDRL inicial; ~80% repetem no 3º tri',
        citations: [{ refId: 'ms-mamografia-2025', note: 'Política de rastreamento' }]
      },
      societies: {
        organization: ['FEBRASGO'],
        population: 'Todas gestantes',
        method: 'VDRL/teste rápido (3 testagens)',
        periodicity: '1º tri, 3º tri, parto + mais se risco',
        recommendation: 'Total concordância. Até reforçam testagem no parto e tratamento imediato.',
        citations: [{ refId: 'febrasgo-hpv-2024', note: 'Diretrizes pré-natal' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Total alinhamento. Todos engajados em zerar sífilis congênita.',
        citations: [{ refId: 'ms-mamografia-2025' }]
      }
    },
    epidemiology: {
      incidence: '21,6 casos/100mil hab. (2021)',
      prevalence: '8,2 casos congênitos/1000 nascidos vivos',
      citations: [{ refId: 'inca-estimativa-2023', note: 'Dados epidemiológicos' }]
    },
    lastUpdate: '2025-11'
  },

  'hiv-prenatal': {
    id: 'hiv-prenatal',
    title: 'Rastreamento de HIV no Pré-natal',
    category: 'gestacao',
    description: 'Diagnosticar HIV na gestação permite TARV imediata e profilaxia que reduz transmissão vertical de ~20-40% para <1%.',
    recommendations: {
      sus: {
        population: 'Todas as gestantes',
        method: 'Teste rápido ou ELISA',
        periodicity: '1º trimestre e 3º trimestre',
        justification: 'Repetição crucial para detectar infecções próximas ao parto. TARV reduz drasticamente transmissão vertical.',
        coverage: '>95% fazem no 1º tri; ~85% repetem',
        citations: [{ refId: 'ms-mamografia-2025', note: 'Programa de testagem' }]
      },
      societies: {
        organization: ['FEBRASGO', 'SBP'],
        population: 'Todas gestantes',
        method: 'Teste rápido (1º e 3º tri + intraparto se sem resultado)',
        periodicity: '1º tri, 3º tri, parto',
        recommendation: 'Apoio intenso. Recomendam teste rápido intraparto para mães sem resultado.',
        citations: [{ refId: 'febrasgo-hpv-2024' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Convergência total. Protocolo bem estabelecido e mandatório.',
        citations: [{ refId: 'ms-mamografia-2025' }]
      }
    },
    epidemiology: {
      coverage: '>95% testagem inicial',
      impact: 'Redução de transmissão vertical para <1% com TARV',
      citations: [{ refId: 'inca-estimativa-2023' }]
    },
    lastUpdate: '2025-11'
  }
};

export function getRastreamento(id: string): Rastreamento | undefined {
  return rastreamentos[id];
}

export function getRastreamentosByCategory(category: string): Rastreamento[] {
  return Object.values(rastreamentos).filter(r => r.category === category);
}

export function getAllRastreamentos(): Rastreamento[] {
  return Object.values(rastreamentos);
}

