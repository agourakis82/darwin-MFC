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
      india: {
        organization: ['NP-NCD', 'MoHFW'],
        population: 'Mulheres de 30 anos ou mais',
        method: 'Exame Clínico das Mamas (CBE) por profissional de saúde treinado',
        periodicity: 'Anual (a cada 1 ano)',
        justification: 'NP-NCD 2023-2030 prioriza métodos de baixo custo. CBE é acessível em áreas rurais e pode ser realizado por ASHA workers treinados. Mamografia disponível em centros terciários para casos suspeitos.',
        citations: [
          { refId: 'np-ncd-operational-guidelines-2023' },
          { refId: 'mohfw-cancer-operational-framework-2023' }
        ]
      },
      convergence: {
        status: 'parcial',
        description: 'Alta convergência na idade de início (40 anos) após atualização de Set/2025. Divergência persiste na periodicidade: SUS mantém bienal, sociedades recomendam anual. Índia prioriza CBE (30+) como método de baixo custo, com mamografia em centros terciários.',
        citations: [
          { refId: 'ms-mamografia-2025' },
          { refId: 'sbm-mamografia-2025' },
          { refId: 'np-ncd-operational-guidelines-2023' }
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
      india: {
        organization: ['NP-NCD', 'MoHFW'],
        population: 'Mulheres de 30 a 65 anos',
        method: 'Visual Inspection with Acetic Acid (VIA) por profissional de saúde treinado',
        periodicity: 'A cada 3-5 anos (VIA negativo)',
        justification: 'VIA é método de baixo custo, altamente acessível em áreas rurais indianas. Pode ser realizado por profissionais de saúde treinados em nível primário. HPV-DNA disponível em centros terciários.',
        citations: [
          { refId: 'np-ncd-operational-guidelines-2023' },
          { refId: 'mohfw-cancer-operational-framework-2023' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Alinhamento quase total. FEBRASGO e ABPTGIC participaram da elaboração das novas diretrizes. Convergência completa em tecnologia, população-alvo e periodicidade. Índia utiliza VIA (30-65 anos) como método de baixo custo, adaptado ao contexto de recursos limitados.',
        citations: [
          { refId: 'portaria-saes-13-2025' },
          { refId: 'febrasgo-hpv-2024' },
          { refId: 'np-ncd-operational-guidelines-2023' }
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

  'cancer-oral': {
    id: 'cancer-oral',
    title: 'Rastreamento do Câncer Oral',
    category: 'cancer',
    description: 'O câncer oral é um problema de saúde pública significativo na Índia, frequentemente associado ao uso de tabaco e betel quid. No Brasil, estimam-se ~15 mil casos novos/ano. A detecção precoce é crucial para melhor prognóstico.',
    recommendations: {
      sus: {
        population: 'Não há rastreamento populacional organizado no SUS. Rastreamento oportunístico em consultas odontológicas.',
        method: 'Exame clínico da cavidade oral (inspeção visual)',
        periodicity: 'Oportunístico',
        justification: 'Foco na detecção precoce de lesões suspeitas em pacientes de risco durante consultas de rotina.',
        citations: []
      },
      societies: {
        organization: ['ABOP', 'SOBRAEP'],
        population: 'Indivíduos com fatores de risco (tabagismo, etilismo) em consultas de rotina.',
        method: 'Exame clínico da cavidade oral',
        periodicity: 'Anual para grupos de risco',
        recommendation: 'Aconselhamento sobre fatores de risco e exame clínico regular são fundamentais.',
        citations: []
      },
      india: {
        organization: ['NP-NCD', 'MoHFW'],
        population: 'Indivíduos ≥30 anos, especialmente usuários de tabaco/álcool',
        method: 'Inspeção visual oral (Oral Visual Inspection - OVI) por ASHA workers e profissionais de saúde',
        periodicity: 'Anual ou bienal',
        justification: 'Alta prevalência de câncer oral na Índia. OVI é um método de baixo custo e pode ser realizado por trabalhadores de saúde comunitários para detecção precoce.',
        citations: [
          { refId: 'np-ncd-operational-guidelines-2023' },
          { refId: 'mohfw-cancer-operational-framework-2023' }
        ]
      },
      convergence: {
        status: 'parcial',
        description: 'Divergência na abordagem populacional. Índia tem um programa de rastreamento organizado devido à alta carga da doença, enquanto SUS foca em detecção oportunística.',
        citations: []
      }
    },
    epidemiology: {
      incidence: 'Alta incidência na Índia, especialmente em homens. No Brasil, ~15 mil casos novos/ano.',
      mortality: 'Alta mortalidade se diagnosticado em estágios avançados.',
      citations: []
    },
    lastUpdate: '2025-12'
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
      india: {
        organization: ['NP-NCD', 'MoHFW'],
        population: 'Todos adultos ≥18 anos',
        method: 'Medida da pressão arterial com esfigmomanômetro calibrado',
        periodicity: 'Anual ou em todas as consultas',
        justification: 'NP-NCD 2023-2030 recomenda rastreamento universal de hipertensão a partir de 18 anos. Tratamento precoce reduz mortalidade cardiovascular e AVC. Método de baixo custo, acessível em atenção primária.',
        citations: [
          { refId: 'np-ncd-operational-guidelines-2023' },
          { refId: 'who-india-ncd-report-2023' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Consenso absoluto entre MS, sociedades e NP-NCD Índia. Não há divergência - evidência robusta e alto impacto. Todos recomendam rastreamento universal ≥18 anos.',
        citations: [{ refId: 'ms-mamografia-2025' }, { refId: 'np-ncd-operational-guidelines-2023' }]
      }
    },
    epidemiology: {
      prevalence: '~24% dos adultos brasileiros; ~30% na Índia',
      mortality: 'Principal causa de AVC e doença cardiovascular',
      citations: [{ refId: 'inca-estimativa-2023', note: 'Dados epidemiológicos gerais' }, { refId: 'who-india-ncd-report-2023' }]
    },
    lastUpdate: '2025-11'
  },

  'diabetes-tipo2': {
    id: 'diabetes-tipo2',
    title: 'Rastreamento de Diabetes Mellitus Tipo 2',
    category: 'adultos',
    description: 'Cerca de 7-10% da população adulta brasileira tem diabetes tipo 2 – e aproximadamente metade não sabe. O DM2 é a principal causa de cegueira adquirida, insuficiência renal terminal, amputações não traumáticas e importante fator de risco cardiovascular.',
    recommendations: {
      sus: {
        population: 'Adultos ≥35 anos (rastreamento universal); <35 anos com sobrepeso/obesidade (IMC≥25 kg/m²) + ≥1 fator de risco adicional',
        method: 'Glicemia de jejum + HbA1c simultâneos (quando possível); TOTG-1h preferível ao TOTG-2h quando indicado',
        periodicity: 'Estratificada por risco: <3 fatores de risco (3 anos); ≥3 fatores de risco ou FINDRISC alto (anual); pré-diabetes confirmado (anual); teste anormal único (6 meses)',
        justification: 'Diretrizes SBD 2025 baseiam rastreamento em idade ≥35 anos universalmente. Jovens <35 anos necessitam rastreio apenas se apresentarem obesidade/sobrepeso associado a fatores de risco adicionais como: história familiar de DM2, doença cardiovascular, hipertensão, HDL<35 mg/dL, triglicerídeos>250 mg/dL, SOP, acantose nigricans, sedentarismo, diabetes gestacional prévio ou pré-diabetes prévio.',
        coverage: 'Crescente com ampliação de testes rápidos nas UBS',
        citations: [{ refId: 'sbd-diagnostico-2024' }]
      },
      societies: {
        organization: ['SBD', 'SBEM', 'SBC'],
        population: 'Adultos ≥35 anos (universal); <35 anos com sobrepeso/obesidade + ≥1 fator de risco ou FINDRISC alto/muito alto',
        method: 'Glicemia de jejum + HbA1c simultâneos (recomendado); TOTG-1h quando indicado (superior ao TOTG-2h em praticidade e valor preditivo)',
        periodicity: 'Individualizada: <3 fatores de risco com exames normais (3 anos); ≥3 fatores de risco com exames normais (1 ano); FINDRISC alto/muito alto (1 ano); pré-diabetes (1 ano); teste anormal isolado (6 meses)',
        recommendation: 'SBD estabelece critérios diagnósticos claros: Glicemia jejum ≥126 mg/dL ou HbA1c ≥6.5% ou TOTG-2h ≥200 mg/dL ou glicemia aleatória ≥200 mg/dL com sintomas. Pré-diabetes: glicemia jejum 100-125 mg/dL ou HbA1c 5.7-6.4% ou TOTG-2h 140-199 mg/dL.',
        citations: [{ refId: 'sbd-diagnostico-2024' }, { refId: 'sbd-rastreamento-2025' }]
      },
      india: {
        organization: ['NP-NCD', 'MoHFW'],
        population: 'Adultos ≥30 anos com fatores de risco (obesidade, história familiar, hipertensão)',
        method: 'Glicemia de jejum ou HbA1c (quando disponível)',
        periodicity: 'Anual para grupos de risco',
        justification: 'NP-NCD 2023-2030 recomenda rastreamento de DM2 em adultos ≥30 anos com fatores de risco. Prioriza métodos de baixo custo (glicemia de jejum) acessíveis em atenção primária. HbA1c disponível em centros terciários.',
        citations: [
          { refId: 'np-ncd-operational-guidelines-2023' },
          { refId: 'who-india-ncd-report-2023' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Alta convergência entre SUS, SBD e NP-NCD Índia. Todos recomendam rastreamento universal ≥30-35 anos e rastreamento de jovens com fatores de risco. Periodicidade estratificada por risco está alinhada entre as recomendações.',
        citations: [{ refId: 'sbd-diagnostico-2024' }, { refId: 'np-ncd-operational-guidelines-2023' }]
      }
    },
    epidemiology: {
      prevalence: '~7-10% da população adulta brasileira; ~50% dos casos não diagnosticados; ~8-10% na Índia',
      incidence: 'Crescimento epidêmico associado à epidemia de obesidade e sedentarismo',
      mortality: 'DM2 é responsável por importante morbimortalidade cardiovascular, renal e por complicações microvasculares',
      citations: [{ refId: 'sbd-epidemiologia-2024' }, { refId: 'who-india-ncd-report-2023' }]
    },
    lastUpdate: '2025-12'
  },

  'dislipidemia-infantil': {
    id: 'dislipidemia-infantil',
    title: 'Rastreamento de Dislipidemia em Crianças e Adolescentes',
    category: 'infantil',
    description: 'Rastreamento de dislipidemias na infância com foco em prevenção de aterosclerose e detecção precoce de dislipidemias genéticas, especialmente Hipercolesterolemia Familiar (HF). HF afeta ~1% da população brasileira (1:200-500 indivíduos) e é massivamente subdiagnosticada. A prevenção cardiovascular inicia-se na infância através da promoção de hábitos saudáveis e identificação de fatores de risco modificáveis.',
    recommendations: {
      sus: {
        population: 'Todas as pessoas ≥10 anos (rastreamento universal com perfil lipídico completo); crianças 2-10 anos com histórico familiar de doença aterosclerótica prematura (homens <55 anos ou mulheres <65 anos) e/ou dislipidemia. Critérios laboratoriais sugestivos de HF desde 2017: CT≥230 mg/dL em crianças/adolescentes ou CT≥310 mg/dL em adultos',
        method: 'Perfil lipídico completo (CT, LDL-c, HDL-c, TG, não-HDL-c). SBC 2025: coleta SEM jejum obrigatório (exceto se TG>440 mg/dL, repetir em jejum para confirmação). LDL-c, não-HDL-c, ApoB e Lp(a) têm valores similares com/sem jejum. Ponto de corte TG: 150 mg/dL (jejum) ou 175 mg/dL (não jejum)',
        periodicity: 'Universal aos 10 anos; repetir conforme estratificação de risco. HF: suspeitar se LDL-c >190 mg/dL não tratado ou LDL-c moderadamente elevado + histórico parental de DAC prematura ou LDL-c muito elevado. Rastreamento em CASCATA: testar todos parentes de 1º grau (50% chance), 2º grau (25%), 3º grau (12,5%) de casos-índice',
        justification: 'Diretrizes SBC 2025 e Diretriz Brasileira de HF 2021 enfatizam detecção precoce via rastreamento universal aos 10 anos + rastreamento em cascata familiar. HF não tratada aumenta risco cardiovascular 20x. Estatinas a partir de 8 anos em HF confirmada reduzem eventos cardiovasculares prematuros na vida adulta. Programa Hipercol Brasil exemplifica rastreamento genético em cascata bem-sucedido.',
        coverage: 'Crescente. Programa Hipercol Brasil facilita diagnóstico genético de HF mesmo em regiões distantes de centros especializados',
        citations: [{ refId: 'sbc-dislipidemia-2025' }, { refId: 'sbp-dislipidemia-2024' }, { refId: 'diretriz-hf-2021' }]
      },
      societies: {
        organization: ['SBC', 'SBP', 'SBDA', 'SBEM'],
        population: 'Rastreamento universal ≥10 anos; rastreamento seletivo 2-10 anos com histórico familiar positivo, obesidade, hipertensão, diabetes, ou outras condições de risco. Rastreamento em cascata (CASCADE) é custo-efetivo e deve ser realizado em todos familiares de 1º grau de indivíduos com HF',
        method: 'Perfil lipídico completo + ApoB (correlação forte com LDL-c, superior quando TG muito elevados) + Lp(a) ≥75 nmol/L ou ≥30 mg/dL (anormal, geneticamente determinado, dosar pelo menos uma vez na vida). Rastreamento genético quando mutação causadora identificada no caso-índice',
        periodicity: 'Universal aos 10 anos; anual para crianças com fatores de risco; monitoramento contínuo em HF. Rastreamento em cascata imediato após diagnóstico de caso-índice',
        recommendation: 'SBC 2025 reforça rastreamento universal infantil + rastreamento em cascata para HF. Enfoque: mudanças de estilo de vida (padrão alimentar cardioprotetor, atividade física, controle de peso, cessação tabagismo) como medida fundamental. Estatinas a partir de 8 anos em HF confirmada. Abordagem terapêutica escalonada: estatina → estatina + ezetimiba → estatina + ezetimiba + anti-PCSK9 (tripla pode reduzir LDL-c até 85%).',
        citations: [{ refId: 'sbc-dislipidemia-2025' }, { refId: 'sbp-dislipidemia-2024' }, { refId: 'diretriz-hf-2021' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Alta convergência entre SUS, SBC, SBP e Diretriz HF 2021. Consenso sobre: rastreamento universal aos 10 anos, rastreamento seletivo em crianças 2-10 anos com fatores de risco, rastreamento em cascata familiar (custo-efetivo), coleta sem jejum obrigatório, uso de estatinas a partir de 8 anos em HF. Alinhamento total sobre importância do diagnóstico precoce de HF para prevenção de eventos cardiovasculares prematuros.',
        citations: [{ refId: 'sbc-dislipidemia-2025' }, { refId: 'diretriz-hf-2021' }]
      }
    },
    epidemiology: {
      prevalence: 'HF afeta ~1% da população brasileira (1:200-500 indivíduos), mas é massivamente subdiagnosticada. Dislipidemias secundárias (obesidade, sedentarismo) crescem em paralelo à epidemia de obesidade infantil (~15% das crianças brasileiras)',
      incidence: 'Rastreamento em cascata identifica 50% de casos adicionais em familiares de 1º grau, 25% em 2º grau, 12,5% em 3º grau',
      mortality: 'HF não tratada aumenta risco cardiovascular 20x. Detecção e tratamento precoce (estatinas desde 8 anos) previnem eventos cardiovasculares prematuros',
      citations: [{ refId: 'sbc-dislipidemia-2025' }, { refId: 'diretriz-hf-2021' }]
    },
    lastUpdate: '2025-12'
  },

  'dislipidemia-adultos': {
    id: 'dislipidemia-adultos',
    title: 'Rastreamento de Dislipidemia em Adultos e Prevenção da Aterosclerose',
    category: 'adultos',
    description: 'Rastreamento de dislipidemias em adultos para prevenção de eventos cardiovasculares ateroscleróticos (IAM, AVC, insuficiência cardíaca). A Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose SBC 2025 trouxe mudanças paradigmáticas: estratificação de risco pelo escore PREVENT (substitui escore de risco global), 5 categorias de risco (baixo, intermediário, alto, muito alto, EXTREMO), metas terapêuticas mais agressivas com filosofia "quanto mais baixo, melhor", inclusão de novos biomarcadores (ApoB, Lp(a), não-HDL-c, hs-CRP), e terapia combinada precoce para alto/muito alto/extremo risco.',
    recommendations: {
      sus: {
        population: 'Adultos ≥35 anos (rastreamento universal); <35 anos com fatores de risco cardiovascular (obesidade, hipertensão, diabetes, tabagismo, histórico familiar, doenças inflamatórias crônicas). Rastreamento em cascata para HF: testar familiares de 1º grau de casos-índice',
        method: 'Perfil lipídico completo (CT, LDL-c, HDL-c, TG, não-HDL-c). SBC 2025: coleta SEM jejum obrigatório (exceto se TG>440 mg/dL, repetir em jejum para confirmação). TG normal: <150 mg/dL (jejum) ou <175 mg/dL (não jejum). Incluir ApoB (correlação forte com LDL-c, superior quando TG elevados) e Lp(a) ≥75 nmol/L ou ≥30 mg/dL (dosar pelo menos uma vez na vida, geneticamente determinado). Opcionalmente: hs-CRP, troponina, BNP, escore de cálcio coronário (CAC) para reclassificação de risco',
        periodicity: 'Conforme categoria de risco PREVENT: baixo (5 anos), intermediário (3 anos), alto/muito alto/extremo (anual ou mais frequente durante tratamento para ajuste terapêutico)',
        justification: 'Dislipidemia é fator de risco modificável primordial para doença cardiovascular aterosclerótica. SBC 2025 adota escore PREVENT (desenvolvido pela AHA, oficialmente adotado pela SBC, SBEM, ABESO, SBH em 2025) para estratificação de risco cardiovascular 10 e 30 anos. PREVENT integra fatores metabólicos e renais (função renal obrigatória), exclui etnia, inclui opcionalmente HbA1c e UACR. Estratificação precisa permite tratamento personalizado com metas específicas por categoria de risco.',
        coverage: 'Crescente com ampliação de programas de DCNT no SUS. Calculadora PREVENT disponível oficialmente via SBC/TribeMD',
        citations: [{ refId: 'sbc-dislipidemia-2025' }, { refId: 'prevent-calculator-2025' }]
      },
      societies: {
        organization: ['SBC', 'SBDA', 'SBD', 'SBEM', 'ABESO', 'SBH', 'SBC-DA'],
        population: 'Adultos ≥35 anos (universal); <35 anos com ≥1 fator de risco. Atenção especial para dislipidemias primárias (HF heterozigótica/homozigótica, hipertrigliceridemia familiar, disbetalipoproteinemia)',
        method: 'Perfil lipídico completo + ApoB + Lp(a). Estratificação de risco pelo escore PREVENT (substitui escore de risco global). Fatores agravantes para reclassificação: história familiar, doenças inflamatórias crônicas, CAC, biomarcadores (hs-CRP, troponina, BNP)',
        periodicity: 'Conforme estratificação de risco PREVENT. Monitoramento frequente em pacientes em terapia combinada para avaliar resposta e ajustar tratamento',
        recommendation: 'Diretriz SBC 2025 estabelece METAS TERAPÊUTICAS por categoria de risco PREVENT (filosofia "quanto mais baixo, melhor"): | RISCO BAIXO: LDL-c <115 mg/dL | não-HDL-c <145 mg/dL | ApoB <100 mg/dL | RISCO INTERMEDIÁRIO: LDL-c <100 mg/dL | não-HDL-c <130 mg/dL | ApoB <90 mg/dL | RISCO ALTO: LDL-c <70 mg/dL | não-HDL-c <100 mg/dL | ApoB <70 mg/dL | RISCO MUITO ALTO: LDL-c <50 mg/dL | não-HDL-c <80 mg/dL | ApoB <55 mg/dL | RISCO EXTREMO (NOVA categoria): LDL-c <40 mg/dL | não-HDL-c <70 mg/dL | ApoB <45 mg/dL. Risco extremo: múltiplos eventos CV ou 1 evento + ≥2 condições de alto risco. ABORDAGEM TERAPÊUTICA: Medidas não farmacológicas (padrão alimentar cardioprotetor, atividade física, cessação tabagismo, controle de peso) são fundamentais e contínuas. Farmacológica escalonada: Estatina alta potência ou Estatina + ezetimiba (inicial para alto/muito alto/extremo risco) → adicionar ezetimiba → anti-PCSK9 (evolocumab, alirocumab SC 2-4 semanas; ou inclisiran SC 6 meses) → ácido bempedoico. Tripla terapia (estatina + ezetimiba + anti-PCSK9) reduz LDL-c até 85%. Fibratos/ômega-3 reservados para hipertrigliceridemia específica.',
        citations: [{ refId: 'sbc-dislipidemia-2025' }, { refId: 'prevent-calculator-2025' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Alta convergência entre SUS e SBC após publicação da Diretriz 2025 e adoção oficial do escore PREVENT pelas principais sociedades médicas brasileiras. Alinhamento sobre: idade de rastreamento (≥35 anos universal), coleta sem jejum obrigatório, inclusão de ApoB e Lp(a) como biomarcadores diagnósticos e de estratificação, estratificação de risco pelo PREVENT. Diretriz 2025 inova ao incluir categoria de risco EXTREMO com metas terapêuticas mais agressivas (LDL-c <40 mg/dL), refletindo evidências robustas de que "quanto mais baixo, melhor" para redução de eventos cardiovasculares.',
        citations: [{ refId: 'sbc-dislipidemia-2025' }, { refId: 'prevent-calculator-2025' }]
      }
    },
    epidemiology: {
      prevalence: 'Cerca de 40% dos adultos brasileiros têm hipercolesterolemia (CT≥200 mg/dL). HF afeta ~1% da população (massivamente subdiagnosticada). Dislipidemias contribuem para ~50% dos eventos cardiovasculares',
      mortality: 'Doença cardiovascular aterosclerótica é a principal causa de morte no Brasil (~300 mil óbitos/ano). Controle adequado de LDL-c conforme metas SBC 2025 pode reduzir risco de eventos cardiovasculares em até 50-85% (com terapia combinada agressiva em risco extremo)',
      citations: [{ refId: 'sbc-dislipidemia-2025' }]
    },
    lastUpdate: '2025-12'
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
      prevalence: 'Doenças raras individualmente, mas milhares de casos/ano no total. Cobertura nacional: ~96,5%',
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
      prevalence: 'Cobertura: ~65,8% (2013), melhor em Sul/Sudeste',
      citations: [{ refId: 'ms-tea-2025' }]
    },
    lastUpdate: '2025-11'
  },

  // GESTAÇÃO
  'sifilis-prenatal': {
    id: 'sifilis-prenatal',
    title: 'Rastreamento de Sífilis no Pré-natal',
    category: 'gestacao',
    description: 'Brasil enfrenta epidemia de sífilis: 21,6 casos/100mil habitantes e 8,2 casos de sífilis congênita/1000 nascidos vivos (2021). A transmissão vertical da sífilis permanece desafio prioritário de saúde pública. Protocolos 2025 enfatizam teste rápido DUO (HIV+Sífilis simultâneo) na 1ª consulta de pré-natal, repetição na 28ª semana (início 3º trimestre) e no momento do parto para capturar reinfecções.',
    recommendations: {
      sus: {
        population: 'Todas as gestantes (100% de cobertura obrigatória) + parceiros sexuais',
        method: 'Teste rápido DUO treponêmico (HIV+Sífilis simultâneo) OU teste rápido isolado para sífilis OU VDRL. Se teste rápido positivo: confirmar com VDRL quantitativo (titulação para seguimento). Tratamento imediato com penicilina benzatina se positivo, sem aguardar confirmação',
        periodicity: '1ª consulta pré-natal (1º trimestre), 28ª semana gestacional (início 3º trimestre), e no momento do parto/curetagem (três testagens obrigatórias mínimas). Repetir mensalmente se exposição de risco ou parceiro não tratado',
        justification: 'Sífilis na gravidez não tratada causa: aborto espontâneo (40%), óbito fetal (30%), prematuridade (20%), sífilis congênita (100% se não tratada). Tratamento adequado com penicilina benzatina reduz transmissão vertical para <2%. Testagem tripla obrigatória visa capturar: (1) infecções prévias não diagnosticadas; (2) infecções adquiridas durante gestação; (3) reinfecções (40% das gestantes com sífilis têm reexposição)',
        coverage: '~90% fazem testagem inicial no pré-natal; ~80% repetem no 3º trimestre; <60% realizam testagem no parto (lacuna crítica). Meta: 100% cobertura nas três testagens',
        citations: [
          { refId: 'pcdt-ist-2022' },
          { refId: 'protocolo-transmissao-vertical-2025' }
        ]
      },
      societies: {
        organization: ['FEBRASGO', 'SBP'],
        population: 'Todas gestantes (triagem universal) + parceiros',
        method: 'Teste rápido treponêmico (preferencialmente DUO HIV+Sífilis) confirmado com VDRL quantitativo + FTA-ABS se necessário',
        periodicity: '1º trimestre, 28ª semana (3º trimestre), parto/curetagem. Adicionar testagens mensais se paciente com risco contínuo (múltiplos parceiros, parceiro não tratado, uso de drogas)',
        recommendation: 'FEBRASGO 2024 reforça: tratamento imediato com penicilina benzatina mesmo antes da confirmação sorológica (janela terapêutica crítica). SBP enfatiza: tratar parceiro simultaneamente (40% de reinfecções por parceiro não tratado). Notificação compulsória de sífilis gestacional e congênita (SINAN)',
        citations: [
          { refId: 'febrasgo-prenatal-2024' },
          { refId: 'sbp-sifilis-congenita-2023' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Convergência total entre MS e sociedades médicas. Consenso sobre triagem tripla obrigatória, tratamento imediato com penicilina benzatina e necessidade de tratar parceiros. Desafio operacional: disponibilidade de penicilina benzatina (desabastecimento intermitente 2020-2023, normalizado 2024-2025) e adesão a testagem no parto (realizada em <60% dos partos). Meta nacional: eliminar sífilis congênita como problema de saúde pública (reduzir para <0,5 casos/1000 nascidos vivos)',
        citations: [
          { refId: 'pcdt-ist-2022' },
          { refId: 'febrasgo-prenatal-2024' }
        ]
      }
    },
    epidemiology: {
      incidence: 'Sífilis gestacional: 21,6 casos/100mil habitantes (2021); tendência de aumento 300% entre 2010-2021',
      mortality: 'Óbito fetal/neonatal: ~30-40% dos casos de sífilis congênita não tratados',
      prevalence: 'Sífilis congênita: 8,2 casos/1000 nascidos vivos (2021), taxa 41x superior à meta OMS (<0,5/1000). Distribuição heterogênea: Norte/Nordeste com taxas 2-3x maiores que Sul/Sudeste',
      citations: [
        { refId: 'boletim-epidemiologico-ist-2023' },
        { refId: 'sinan-sifilis-2021' }
      ]
    },
    lastUpdate: '2025-12'
  },

  'hiv-prenatal': {
    id: 'hiv-prenatal',
    title: 'Rastreamento de HIV no Pré-natal',
    category: 'gestacao',
    description: 'CONQUISTA HISTÓRICA 2025: Brasil alcançou certificação da OMS/OPAS para eliminação da transmissão vertical do HIV como problema de saúde pública, mantendo taxa de transmissão <2% e <0,5 casos/1000 nascidos vivos. Diagnosticar HIV na gestação permite terapia antirretroviral (TARV) imediata que reduz transmissão vertical de ~20-40% (sem tratamento) para <1% (com tratamento adequado). Protocolo 2025 preconiza testagem universal no 1º trimestre, 3º trimestre e intraparto, com início imediato de TARV independente de CD4 ou carga viral.',
    recommendations: {
      sus: {
        population: 'Todas as gestantes (100% de cobertura obrigatória), independente de fatores de risco',
        method: 'Teste rápido DUO (HIV+Sífilis simultâneo) OU teste rápido isolado anti-HIV (4ª geração preferencial, detecta antígeno p24 + anticorpos) OU ELISA na 1ª consulta. Se teste rápido reagente: confirmar com imunoensaio + carga viral. Teste intraparto obrigatório se sem resultado prévio ou última testagem >30 dias',
        periodicity: '1ª consulta pré-natal (1º trimestre), 28ª semana gestacional (início 3º trimestre), e intraparto (teste rápido obrigatório no momento da admissão para parto se sem resultado do 3º trimestre ou última testagem >30 dias)',
        justification: 'Testagem dupla (1º + 3º trimestre) detecta: (1) Infecções prévias não diagnosticadas; (2) Soroconversões durante gestação (janela imunológica, exposição recente). TARV iniciada antes do parto + AZT EV intraparto + profilaxia neonatal (AZT xarope 4 semanas) reduz transmissão vertical para <1%. Teste intraparto crítico para mães sem diagnóstico prévio (AZT EV profilático se positivo, cesárea eletiva). Brasil mantém >95% cobertura pré-natal e >97% testagem HIV no pré-natal (2023)',
        coverage: '>97% fazem testagem inicial no pré-natal; ~85-90% repetem no 3º trimestre; >90% testagem intraparto. Cobertura TARV em gestantes HIV+: >95%',
        citations: [
          { refId: 'protocolo-transmissao-vertical-2025' },
          { refId: 'pcdt-hiv-gestante-2024' }
        ]
      },
      societies: {
        organization: ['FEBRASGO', 'SBP', 'SBI (Sociedade Brasileira de Infectologia)'],
        population: 'Todas gestantes (triagem universal)',
        method: 'Teste rápido anti-HIV (preferencialmente DUO HIV+Sífilis) no 1º e 3º trimestre + intraparto (obrigatório se sem resultado prévio). Confirmar teste rápido reagente com imunoensaio 4ª geração + carga viral HIV',
        periodicity: '1º trimestre, 28ª semana (3º trimestre), intraparto. Testagens adicionais mensais se gestante com exposição de risco contínua (parceiro HIV+ sem supressão viral, múltiplos parceiros, uso de drogas injetáveis)',
        recommendation: 'FEBRASGO 2024 enfatiza: início imediato de TARV (preferencialmente dolutegravir + tenofovir + lamivudina) ao diagnóstico, independente de CD4 ou carga viral, com meta de supressão viral (CV <50 cópias/mL) antes do parto. Se CV >1000 cópias/mL próximo ao parto: cesárea eletiva 38 semanas + AZT EV intraparto. SBP reforça: profilaxia neonatal com AZT xarope 4 semanas + suspensão de amamentação (fórmula infantil fornecida pelo SUS até 6 meses)',
        citations: [
          { refId: 'febrasgo-prenatal-2024' },
          { refId: 'sbp-profilaxia-hiv-2023' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Convergência total entre MS e sociedades médicas. Consenso sobre triagem universal tripla (1º trimestre, 3º trimestre, intraparto), início imediato de TARV ao diagnóstico, e profilaxia neonatal. SUCESSO DO PROGRAMA: Brasil certificado pela OMS em 2025 por eliminar transmissão vertical do HIV como problema de saúde pública, mantendo taxa <2% de transmissão e <0,5 casos/1000 nascidos vivos. Desafios persistentes: adesão à TARV durante gestação (10-15% perdem seguimento), testagem intraparto em partos domiciliares/sem assistência (<3% dos partos, mas concentram 15-20% das transmissões verticais)',
        citations: [
          { refId: 'protocolo-transmissao-vertical-2025' },
          { refId: 'febrasgo-prenatal-2024' }
        ]
      }
    },
    epidemiology: {
      incidence: 'Estimativa: 8.000-10.000 gestantes HIV+ diagnosticadas/ano no Brasil (prevalência 0,4-0,5% das gestantes)',
      mortality: 'Transmissão vertical: <2% com tratamento adequado (meta OMS atingida em 2025); 20-40% sem tratamento',
      prevalence: 'Cobertura pré-natal: >95%; Testagem HIV no pré-natal: >97%; TARV em gestantes HIV+: >95%; Taxa de transmissão vertical: <2% (certificação OMS 2025 para eliminação como problema de saúde pública). Brasil é o 1º país da América Latina com >100 milhões habitantes a atingir meta de eliminação',
      citations: [
        { refId: 'boletim-epidemiologico-hiv-2023' },
        { refId: 'certificacao-oms-hiv-vertical-2025' }
      ]
    },
    lastUpdate: '2025-12'
  },

  // ============================================
  // HEPATITES VIRAIS (População Geral)
  // ============================================

  'hepatite-c': {
    id: 'hepatite-c',
    title: 'Rastreamento de Hepatite C (População Geral)',
    category: 'adultos',
    description: 'A hepatite C é responsável por 60-70% das hepatites crônicas no Brasil. Estima-se 700 mil pessoas com HCV crônico, a maioria desconhecendo o diagnóstico. O rastreamento universal ≥40 anos + grupos de risco visa identificar casos assintomáticos para tratamento curativo com antivirais de ação direta (DAAs), disponíveis no SUS desde 2015.',
    recommendations: {
      sus: {
        population: 'Todas pessoas ≥40 anos (universal) + qualquer idade com fatores de risco (usuários de drogas injetáveis, transfusões pré-1993, tatuagens/piercings não regulamentados, HIV+, hemodiálise, profissionais da saúde com exposição)',
        method: 'Teste rápido Anti-HCV (imunocromatográfico) na APS, confirmação com HCV-RNA (PCR qualitativo) se positivo',
        periodicity: 'Ao menos uma vez na vida (universal); anual para grupos de risco persistente',
        justification: 'Rastreamento universal ≥40 anos baseado em: (1) Hepatite C assintomática em 70-80% dos casos até cirrose descompensada; (2) Tratamento curativo (DAAs) com taxa de cura >95% disponível no SUS; (3) Custo-efetividade favorável (NNT 12-15 para prevenir 1 cirrose/CHC); (4) Janela epidemiológica (pico de infecções 1980-1990, coorte hoje com 40-60 anos)',
        coverage: 'Estimativa: <15% da população ≥40 anos rastreada (PCDT 2019)',
        citations: [
          { refId: 'ms-hepatite-c-2019' },
          { refId: 'conitec-hepatite-c-2015' }
        ]
      },
      societies: {
        organization: ['SBH', 'SBMFC', 'AASLD (internacional)'],
        population: 'Universal ≥40 anos + gestantes + grupos de risco desde adolescência',
        method: 'Teste rápido Anti-HCV ou ELISA, confirmação com HCV-RNA',
        periodicity: 'Uma vez na vida (se negativo); anual para grupos de alto risco (UDI, profissionais saúde)',
        recommendation: 'SBH (Sociedade Brasileira de Hepatologia) recomenda rastreamento universal ≥40 anos alinhado ao MS. SBMFC enfatiza rastreamento na APS como oportunidade para vinculação ao cuidado de populações vulneráveis (usuários de álcool/drogas, população em situação de rua)',
        citations: [
          { refId: 'sbh-hepatite-c-2023' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Convergência total entre SUS e sociedades médicas. Hepatite C é um dos raros exemplos de rastreamento com consenso técnico-científico robusto, justificado pela disponibilidade de tratamento curativo (DAAs) no SUS desde 2015 (sofosbuvir, daclatasvir, simeprevir) com eficácia >95%.',
        citations: [
          { refId: 'ms-hepatite-c-2019' },
          { refId: 'sbh-hepatite-c-2023' }
        ]
      }
    },
    epidemiology: {
      incidence: 'Estimativa: 700.000 portadores de HCV crônico no Brasil (0,7% da população)',
      mortality: '~3.000 óbitos/ano por cirrose hepática e carcinoma hepatocelular (CHC) relacionados ao HCV',
      prevalence: '70-80% dos portadores desconhecem o diagnóstico (infecção assintomática até cirrose descompensada)',
      citations: [
        { refId: 'ms-hepatite-c-2019' },
        { refId: 'boletim-epidemiologico-hepatites-2023' }
      ]
    },
    lastUpdate: '2025-12'
  },

  'hepatite-b': {
    id: 'hepatite-b',
    title: 'Rastreamento de Hepatite B (População Geral Não Vacinada)',
    category: 'adultos',
    description: 'Rastreamento complementar ao programa de vacinação. Indivíduos >20 anos não vacinados adequadamente devem realizar sorologia para HBsAg. Diferencia-se do rastreamento gestacional (universal) por focar em coortes não cobertas pela vacinação infantil obrigatória (implementada em 1998).',
    recommendations: {
      sus: {
        population: 'Pessoas >20 anos sem vacinação completa (3 doses) documentada + grupos de risco (mesmos da Hepatite C)',
        method: 'HBsAg (teste rápido na APS ou ELISA); se positivo, solicitar HBeAg, Anti-HBe, HBV-DNA',
        periodicity: 'Ao menos uma vez na vida',
        justification: 'População nascida antes de 1998 (pré-vacinação universal infantil) pode ter tido exposição. Identificação permite: (1) Tratamento se hepatite crônica ativa; (2) Monitoramento de CHC (ultrassom + AFP semestral); (3) Vacinação de contatos',
        coverage: 'Baixa (dado não disponível nacionalmente)',
        citations: [
          { refId: 'linhas-cuidado-hepatites-2024' }
        ]
      },
      societies: {
        organization: ['SBH', 'SBMFC'],
        population: 'Mesma recomendação do MS',
        method: 'HBsAg (teste rápido ou ELISA)',
        periodicity: 'Uma vez na vida se negativo e não vacinado; seguimento anual se portador crônico',
        recommendation: 'Convergência com MS. SBH reforça importância do rastreamento em áreas de alta endemicidade (Amazônia Legal, algumas regiões do Sul)',
        citations: [
          { refId: 'sbh-hepatite-b-2023' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Convergência total. Hepatite B é modelo de rastreamento com custo-efetividade demonstrada, pois identifica portadores crônicos que necessitam monitoramento de CHC (principal causa de câncer de fígado) e tratamento quando indicado.',
        citations: [
          { refId: 'linhas-cuidado-hepatites-2024' }
        ]
      }
    },
    epidemiology: {
      incidence: 'Estimativa: 600.000-800.000 portadores de HBsAg+ no Brasil (prevalência 0,6-0,8%)',
      mortality: '~2.500 óbitos/ano por cirrose e CHC relacionados ao HBV',
      prevalence: 'Endemicidade variável: Alta (>2%) na Amazônia, Média (0,5-2%) Sul/Sudeste, Baixa (<0,5%) após vacinação universal infantil (1998)',
      citations: [
        { refId: 'boletim-epidemiologico-hepatites-2023' }
      ]
    },
    lastUpdate: '2025-12'
  },

  // ============================================
  // ISTs - POPULAÇÃO GERAL (além do pré-natal)
  // ============================================

  'hiv-populacao-geral': {
    id: 'hiv-populacao-geral',
    title: 'Rastreamento de HIV em População Geral (Não Gestantes)',
    category: 'adultos',
    description: 'Rastreamento de HIV em populações-chave e população geral visa diagnóstico precoce para início imediato de TARV (tratamento como prevenção - TasP), reduzindo morbimortalidade individual e transmissão comunitária. Brasil adota estratégia "testar e tratar" desde 2013: TARV universal independente de CD4. Populações-chave (HSH, profissionais do sexo, pessoas trans, usuários de drogas) concentram 50-60% dos novos diagnósticos.',
    recommendations: {
      sus: {
        population: 'UNIVERSAL: Ofertar testagem para HIV a TODA população sexualmente ativa ao menos uma vez na vida, independente de fatores de risco. POPULAÇÕES-CHAVE (testagem frequente): Homens que fazem sexo com homens (HSH), profissionais do sexo, pessoas trans, usuários de drogas injetáveis (UDI), pessoas privadas de liberdade (PPL), população em situação de rua (PSR), parceiros de PVHA. GRUPOS ADICIONAIS: Pessoas com múltiplos parceiros, IST prévia, tuberculose ativa, hepatites virais',
        method: 'Teste rápido anti-HIV (imunocromatográfico, resultado em 20 minutos) disponível em todas UBS, SAE, CTA (Centros de Testagem e Aconselhamento). Se reagente: confirmar com imunoensaio 4ª geração + carga viral HIV. Autoteste de HIV disponível gratuitamente no SUS desde 2018 (distribuído em UBS, CTA, ONGs)',
        periodicity: 'População geral: ao menos uma vez na vida. Populações-chave: ANUAL (mínimo) ou a cada 3-6 meses se exposição de risco contínua (múltiplos parceiros, sexo sem preservativo). Parceiros de PVHA: testagem inicial + 3-6 meses se PrEP ou exposição',
        justification: 'Diagnóstico precoce permite: (1) Início imediato de TARV (meta: indetectável = intransmissível, "U=U"); (2) Supressão viral reduz transmissão em 96% (HPTN 052); (3) Redução de mortalidade em 50-70% se TARV iniciada com CD4 >350; (4) Oferta de PrEP para parceiros soronegativos. Brasil tem 1 milhão de PVHA, 89% diagnosticadas, 81% em TARV, 94% suprimidas (meta UNAIDS 95-95-95). Epidemia concentrada: HSH representam 52% novos diagnósticos apesar de ~3% população masculina',
        coverage: 'Testagem: ~35-40% da população adulta já testou alguma vez (PCAP 2021); populações-chave: ~50-60% testagem anual. Desafio: diagnóstico tardio em 35% dos casos (CD4 <200)',
        citations: [
          { refId: 'pcdt-ist-2022' },
          { refId: 'pcdt-hiv-adulto-2023' }
        ]
      },
      societies: {
        organization: ['SBI (Sociedade Brasileira de Infectologia)', 'SBMFC', 'Departamento IST/HIV/AIDS SBD'],
        population: 'Alinhada ao MS: testagem universal oferecida a todos + testagem frequente (anual ou semestral) para populações-chave',
        method: 'Teste rápido (preferencial na APS por resultado imediato e vinculação ao cuidado) OU ELISA 4ª geração. Autoteste de HIV válido para triagem, mas casos reagentes devem confirmar com teste laboratorial. PrEP (Profilaxia Pré-Exposição) disponível no SUS desde 2018 para populações-chave com risco substancial',
        periodicity: 'População geral: ao menos 1x na vida. HSH, profissionais do sexo, pessoas trans: a cada 3-6 meses. Parceiros sorodiscordantes: conforme protocolo PrEP (trimestral)',
        recommendation: 'SBI 2024 enfatiza: testagem deve ser ATIVA (oferecida proativamente pelos profissionais de saúde, não aguardar demanda espontânea), com aconselhamento pré/pós-teste e vinculação imediata ao SAE se positivo. SBMFC reforça: APS é porta de entrada ideal para testagem de populações-chave (HSH, pessoas trans) com abordagem livre de estigma. Linkage to care: meta de iniciar TARV em <7 dias do diagnóstico',
        citations: [
          { refId: 'sbi-hiv-populacoes-chave-2024' },
          { refId: 'sbmfc-prep-2023' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Convergência total entre MS e sociedades médicas sobre: (1) testagem universal oferecida a toda população adulta; (2) testagem frequente (anual ou semestral) para populações-chave; (3) TARV universal imediata ao diagnóstico; (4) PrEP para populações de risco substancial. Desafios operacionais: testagem e retenção em cuidado de populações-chave (HSH, pessoas trans, profissionais do sexo) que enfrentam estigma e barreiras de acesso; diagnóstico tardio (35% com CD4 <200); perda de seguimento (15-20% após diagnóstico)',
        citations: [
          { refId: 'pcdt-ist-2022' },
          { refId: 'sbi-hiv-populacoes-chave-2024' }
        ]
      }
    },
    epidemiology: {
      incidence: '~40.000 novos diagnósticos de HIV/ano no Brasil (2022). Taxa de detecção: 18,5/100.000 habitantes. Epidemia CONCENTRADA: HSH representam 52% dos casos, pessoas trans 0,7% (prevalência 31% nesta população), profissionais do sexo 5%',
      mortality: '~12.000 óbitos/ano por AIDS (2021), redução de 35% desde 2010. Principal causa de morte: diagnóstico tardio (CD4 <200) e abandono de TARV',
      prevalence: '~1 milhão de PVHA no Brasil (0,4-0,6% população adulta). Cascata de cuidado (2022): 89% diagnosticadas, 81% em TARV, 94% suprimidas (meta UNAIDS 95-95-95). Desigualdades: diagnóstico tardio mais frequente em homens heterossexuais, negros, baixa escolaridade, Norte/Nordeste',
      citations: [
        { refId: 'boletim-epidemiologico-hiv-2023' },
        { refId: 'unaids-brasil-2022' }
      ]
    },
    lastUpdate: '2025-12'
  },

  'gonorreia-clamidia-ist-bacterianas': {
    id: 'gonorreia-clamidia-ist-bacterianas',
    title: 'Rastreamento de Gonorreia e Clamídia em Populações-Chave',
    category: 'adultos',
    description: 'Gonorreia (Neisseria gonorrhoeae) e clamídia (Chlamydia trachomatis) são as ISTs bacterianas curáveis mais prevalentes. Assintomáticas em 50-80% das mulheres e 10-40% dos homens, podem causar doença inflamatória pélvica (DIP), infertilidade, gravidez ectópica. Rastreamento em populações-chave detecta casos assintomáticos para tratamento e quebra de cadeia de transmissão. Preocupação global: N. gonorrhoeae multidroga-resistente (MDR).',
    recommendations: {
      sus: {
        population: 'POPULAÇÕES-CHAVE para rastreamento: Mulheres sexualmente ativas <25 anos, HSH, profissionais do sexo, pessoas trans, múltiplos parceiros (>3/ano), nova parceria sexual, IST prévia nos últimos 12 meses, parceiros com IST. NÃO é rastreamento universal (população geral assintomática sem fatores de risco não tem indicação)',
        method: 'NAAT (Nucleic Acid Amplification Test) - teste molecular PCR em tempo real para detecção simultânea de N. gonorrhoeae + C. trachomatis. Amostras: urina (1º jato) em homens, swab endocervical/vaginal em mulheres, swab orofaríngeo/retal em HSH (infecções extragenitais assintomáticas em 5-15% dos casos). NAAT disponível em SAE e alguns CTA, NÃO universalmente disponível na APS',
        periodicity: 'Populações-chave SINTOMÁTICAS: testagem imediata. Populações-chave ASSINTOMÁTICAS: anual (mínimo) ou a cada 3-6 meses se risco contínuo. HSH: rastreamento em 3 sítios (uretral/urina, orofaríngeo, retal) se sexo desprotegido',
        justification: 'Rastreamento justificado em populações-chave por: (1) Alta prevalência (10-20% em HSH, 5-10% mulheres <25 anos); (2) Curso assintomático frequente (oportunidade perdida de tratamento); (3) Complicações graves evitáveis (DIP, infertilidade); (4) Tratamento curativo disponível; (5) Resistência antimicrobiana crescente (N. gonorrhoeae MDR: ceftriaxona 500mg IM dose única + azitromicina 1g VO dose única - esquema dual obrigatório)',
        coverage: 'Baixa (dado não disponível nacionalmente). Limitação: NAAT não universalmente disponível, swab retal/orofaríngeo raramente coletado em HSH na APS',
        citations: [
          { refId: 'pcdt-ist-2022' },
          { refId: 'who-gonorreia-resistencia-2023' }
        ]
      },
      societies: {
        organization: ['SBDST (Sociedade Brasileira de Doenças Sexualmente Transmissíveis)', 'SBI', 'SBMFC'],
        population: 'Mesma do MS: populações-chave (mulheres <25 anos sexualmente ativas, HSH, profissionais do sexo, pessoas trans, múltiplos parceiros)',
        method: 'NAAT (padrão-ouro) para detecção simultânea de N. gonorrhoeae + C. trachomatis. SBDST enfatiza: em HSH, coletar amostra de 3 sítios (uretral, orofaríngeo, retal) pois 70-80% das infecções são extragenitais e assintomáticas',
        periodicity: 'Populações-chave: anual (mínimo) ou semestral se risco contínuo. HSH com múltiplos parceiros: a cada 3-6 meses',
        recommendation: 'SBDST 2023 recomenda: tratamento sindromicamente (sem aguardar resultado laboratorial) se paciente sintomático com corrimento uretral/cervical. Esquema dual OBRIGATÓRIO para gonorreia (ceftriaxona 500mg IM + azitromicina 1g VO dose única) devido a resistência. Notificar parceiros sexuais dos últimos 60 dias. Retestagem ("test of cure") 3 meses após tratamento para detectar reinfecção (20-30% em populações-chave)',
        citations: [
          { refId: 'sbdst-ist-2023' },
          { refId: 'sbi-gonorreia-resistente-2024' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Convergência entre MS e sociedades médicas sobre: (1) rastreamento direcionado a populações-chave (NÃO universal); (2) NAAT como método diagnóstico preferencial; (3) esquema dual para gonorreia (ceftriaxona + azitromicina). Desafios operacionais críticos: (1) Disponibilidade limitada de NAAT (não disponível em >80% das UBS); (2) Subnotificação (gonorreia e clamídia não são doenças de notificação compulsória universal); (3) Coleta de swab retal/orofaríngeo raramente realizada em HSH (lacuna crítica); (4) Resistência antimicrobiana crescente (N. gonorrhoeae MDR já relatada no Brasil)',
        citations: [
          { refId: 'pcdt-ist-2022' },
          { refId: 'sbdst-ist-2023' }
        ]
      }
    },
    epidemiology: {
      incidence: 'Estimativa OMS: 78 milhões de casos de gonorreia e 127 milhões de casos de clamídia/ano globalmente. Brasil: dados incompletos (subnotificação). Estudos de prevalência: 5-10% em mulheres <25 anos sexualmente ativas, 10-20% em HSH, 15-25% em profissionais do sexo',
      mortality: 'Não causa morte direta. Morbidade: DIP em 10-15% mulheres com clamídia não tratada, infertilidade tubária em 10-20% pós-DIP',
      prevalence: 'Clamídia: IST bacteriana curável mais prevalente globalmente. Gonorreia: 2ª mais prevalente. Preocupação crescente: N. gonorrhoeae multidroga-resistente (resistência a cefalosporinas de 3ª geração relatada globalmente, incluindo casos no Brasil)',
      citations: [
        { refId: 'who-ist-global-2021' },
        { refId: 'pcdt-ist-2022' }
      ]
    },
    lastUpdate: '2025-12'
  },

  'retinopatia-diabetica': {
    id: 'retinopatia-diabetica',
    title: 'Rastreamento de Retinopatia Diabética',
    category: 'adultos',
    description: 'A retinopatia diabética é a principal causa de cegueira evitável em adultos em idade produtiva. Todo diabético deve realizar fundoscopia anual, pois a detecção precoce de retinopatia permite fotocoagulação a laser ou anti-VEGF intravítreo, prevenindo perda visual irreversível.',
    recommendations: {
      sus: {
        population: 'Todos diabéticos tipo 1 e tipo 2: DM1 a partir de 5 anos do diagnóstico; DM2 imediatamente ao diagnóstico',
        method: 'Fundoscopia (direta, indireta ou retinografia digital) por oftalmologista ou médico capacitado; telemedicina em expansão (laudos remotos de retinografia)',
        periodicity: 'Anual se sem retinopatia; semestral se retinopatia não-proliferativa leve/moderada; trimestral se retinopatia proliferativa ou maculopatia',
        justification: 'Rastreamento baseado em: (1) Retinopatia assintomática até estágios avançados; (2) Tratamento efetivo disponível (fotocoagulação, anti-VEGF); (3) Cegueira evitável em >90% com detecção/tratamento precoce; (4) DM é epidemia no Brasil (estimativa 16,8 milhões diabéticos)',
        coverage: 'Estimativa: <30% dos diabéticos realizam fundoscopia anual (VIGITEL 2023)',
        citations: [
          { refId: 'linhas-cuidado-diabetes-ms-2022' },
          { refId: 'vigitel-2023' }
        ]
      },
      societies: {
        organization: ['SBD', 'CBO', 'SBR'],
        population: 'Mesma recomendação do MS (todo diabético)',
        method: 'Preferencial: Retinografia digital com laudo por oftalmologista (superior a fundoscopia direta); telemedicina aceita',
        periodicity: 'DM1: anual a partir de 5 anos diagnóstico; DM2: anual imediatamente; aumentar frequência se retinopatia presente',
        recommendation: 'SBD 2023 enfatiza: retinografia digital com telemedicina pode ampliar cobertura em áreas sem oftalmologista. CBO (Conselho Brasileiro de Oftalmologia) recomenda capacitação de médicos de família para fundoscopia básica e triagem para referenciamento',
        citations: [
          { refId: 'sbd-diretrizes-2023' },
          { refId: 'cbo-retinopatia-2024' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Convergência total em indicação e periodicidade. Divergência em método (retinografia digital preferível a fundoscopia direta). Gargalo operacional: déficit de oftalmologistas no SUS (tempo médio de espera 180 dias para fundoscopia em capitais do Nordeste)',
        citations: [
          { refId: 'linhas-cuidado-diabetes-ms-2022' },
          { refId: 'sbd-diretrizes-2023' }
        ]
      }
    },
    epidemiology: {
      incidence: '~16,8 milhões de diabéticos no Brasil (8% da população adulta); 30-40% desenvolverão algum grau de retinopatia',
      mortality: 'Não causa morte direta, mas cegueira em ~10.000 diabéticos/ano',
      prevalence: 'Retinopatia diabética presente em 35% dos diabéticos tipo 1 (>10 anos duração) e 20% tipo 2 ao diagnóstico',
      citations: [
        { refId: 'vigitel-2023' },
        { refId: 'sbd-diretrizes-2023' }
      ]
    },
    lastUpdate: '2025-12'
  },

  // ============================================
  // OUTROS RASTREAMENTOS
  // ============================================

  'tuberculose-grupos-risco': {
    id: 'tuberculose-grupos-risco',
    title: 'Rastreamento de Tuberculose em Grupos de Risco',
    category: 'outros',
    description: 'Rastreamento ativo de tuberculose em populações de alto risco: contatos de casos de TB pulmonar bacilífera, pessoas vivendo com HIV/AIDS (PVHA), população privada de liberdade (PPL), população em situação de rua (PSR), profissionais da saúde, indígenas aldeados. NÃO é rastreamento populacional universal - é busca ativa em grupos específicos.',
    recommendations: {
      sus: {
        population: 'Contatos de TB pulmonar bacilífera (todos os domiciliares e institucionais); PVHA (anual); PPL (ingresso e anual); PSR (busca ativa contínua); Profissionais da saúde (admissional e periódico); Indígenas (busca ativa em aldeias)',
        method: 'Avaliação clínica + Radiografia de tórax + Prova tuberculínica (PT) ou IGRA + Baciloscopia/TRM-TB se sintomático',
        periodicity: 'Contatos: imediato ao diagnóstico do caso-índice; PVHA: anual; PPL: ingresso + anual; Demais: conforme protocolo',
        justification: 'Estratégia de controle da TB baseada em: (1) Identificação precoce de casos ativos (interromper transmissão); (2) Tratamento de infecção latente (ILTB) em contatos e imunossuprimidos (prevenir adoecimento); (3) Grupos de risco concentram 60-70% dos casos de TB no Brasil',
        coverage: 'Exame de contatos: 56,8% (meta: 100%) - SINAN 2023',
        citations: [
          { refId: 'manual-tuberculose-ms-2019' },
          { refId: 'protocolo-iltb-ms-2018' }
        ]
      },
      societies: {
        organization: ['SBPT', 'SBMFC', 'SBI'],
        population: 'Mesma do MS, com ênfase adicional em: usuários de drogas injetáveis, etilistas crônicos, diabéticos, pacientes em uso de imunossupressores/biológicos',
        method: 'SBPT recomenda TRM-TB (GeneXpert) como teste inicial para diagnóstico rápido em sintomáticos; IGRA preferível a PT em vacinados com BCG',
        periodicity: 'Conforme MS',
        recommendation: 'SBPT 2021 enfatiza: rastreamento de ILTB antes de iniciar terapia biológica (anti-TNF, anti-IL) é obrigatório. SBMFC reforça papel da APS na investigação de contatos domiciliares',
        citations: [
          { refId: 'manual-tuberculose-ms-2019' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Convergência total. Tuberculose é prioridade de saúde pública com protocolos bem estabelecidos. Desafio operacional: apenas 56,8% dos contatos são examinados (meta 100%)',
        citations: [
          { refId: 'manual-tuberculose-ms-2019' }
        ]
      }
    },
    epidemiology: {
      incidence: '~70.000 casos novos/ano no Brasil (2023); 33,5 casos/100 mil habitantes',
      mortality: '~4.500 óbitos/ano (2023); 2,2 óbitos/100 mil habitantes',
      prevalence: 'PVHA: 28x mais risco; PPL: 35x mais risco; PSR: 56x mais risco; Indígenas: 3x mais risco',
      citations: [
        { refId: 'manual-tuberculose-ms-2019' }
      ]
    },
    lastUpdate: '2025-12'
  },

  'hanseniase-contatos': {
    id: 'hanseniase-contatos',
    title: 'Rastreamento de Hanseníase em Contatos',
    category: 'outros',
    description: 'Vigilância de contatos intradomiciliares e sociais de casos de hanseníase. O exame dermatoneurológico periódico visa detectar precocemente casos novos, interrompendo a cadeia de transmissão. Brasil é o 2º país em casos no mundo (atrás apenas da Índia).',
    recommendations: {
      sus: {
        population: 'Contatos intradomiciliares de casos de hanseníase (todos que residam ou tenham residido com o caso nos últimos 5 anos); Contatos sociais (trabalho, escola, vizinhança) de casos multibacilares',
        method: 'Exame dermatoneurológico completo (inspeção de toda pele + palpação de nervos periféricos + teste de sensibilidade térmica/dolorosa/tátil)',
        periodicity: 'Anual por 5 anos após último contato com caso em tratamento; imediato ao diagnóstico do caso-índice',
        justification: 'Fundamentação: (1) Período de incubação longo (2-7 anos) exige vigilância prolongada; (2) Contatos intradomiciliares têm risco 5-10x maior de adoecimento; (3) Diagnóstico precoce previne incapacidades físicas irreversíveis',
        coverage: 'Exame de contatos: 78,4% (meta: 100%) - SINAN 2023',
        citations: [
          { refId: 'diretrizes-hanseniase-ms-2016' }
        ]
      },
      societies: {
        organization: ['SBD', 'SBH', 'SBMFC'],
        population: 'Mesma do MS',
        method: 'SBD recomenda adicionalmente: BCG-ID em contatos sem cicatriz vacinal (proteção parcial); quimioprofilaxia com rifampicina dose única (PQR) em contatos de multibacilares (em implementação)',
        periodicity: 'Anual por 5 anos',
        recommendation: 'SBD 2022 enfatiza: capacitação de médicos de família para exame dermatoneurológico básico é essencial para descentralização do diagnóstico',
        citations: [
          { refId: 'diretrizes-hanseniase-ms-2016' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Convergência total. Hanseníase é doença de notificação compulsória com protocolos bem estabelecidos. Brasil segue meta OMS de eliminação (<1 caso/10 mil habitantes)',
        citations: [
          { refId: 'diretrizes-hanseniase-ms-2016' }
        ]
      }
    },
    epidemiology: {
      incidence: '~18.000 casos novos/ano no Brasil (2023); 8,5 casos/100 mil habitantes',
      mortality: 'Baixa (doença crônica, não letal)',
      prevalence: 'Concentração no Norte/Nordeste/Centro-Oeste (hiperendêmico: >40/100 mil); Grau 2 de incapacidade ao diagnóstico: 8,4% (indica diagnóstico tardio)',
      citations: [
        { refId: 'diretrizes-hanseniase-ms-2016' }
      ]
    },
    lastUpdate: '2025-12'
  },

  'chagas-areas-endemicas': {
    id: 'chagas-areas-endemicas',
    title: 'Rastreamento de Doença de Chagas (Áreas Endêmicas)',
    category: 'outros',
    description: 'Rastreamento sorológico e eletrocardiográfico em populações de áreas endêmicas (principalmente Minas Gerais, Bahia, Goiás, Tocantins, Piauí). Visa identificar cardiopatia chagásica crônica para tratamento e prevenção de morte súbita. Não é rastreamento nacional universal.',
    recommendations: {
      sus: {
        population: 'Residentes ou ex-residentes de áreas endêmicas (zona rural de MG, BA, GO, TO, PI, MA, CE); Nascidos antes de 1980 em áreas com transmissão vetorial ativa; Filhos de mães soropositivas (transmissão vertical)',
        method: 'Sorologia (ELISA + IFI ou HAI) para diagnóstico; ECG de repouso para estratificação de risco cardíaco; Ecocardiograma se ECG alterado',
        periodicity: 'Sorologia: uma vez na vida se nunca rastreado; ECG: anual se soropositivo',
        justification: 'Rastreamento regional baseado em: (1) Estimativa de 1-3 milhões de brasileiros infectados; (2) 20-30% desenvolverão cardiopatia chagásica crônica (CCC); (3) Morte súbita por arritmia é principal causa de óbito; (4) Tratamento com benznidazol pode reduzir progressão se fase indeterminada',
        coverage: 'Baixa (dado não disponível nacionalmente); Projeto Norte de Minas (2023): 939 casos identificados em 48 municípios',
        citations: [
          { refId: 'consenso-chagas-2015' },
          { refId: 'pcdt-chagas-ms-2018' }
        ]
      },
      societies: {
        organization: ['SBC', 'SBI', 'SBMFC'],
        population: 'Mesma do MS, com ênfase em: gestantes de áreas endêmicas (prevenir transmissão vertical); candidatos a transplante cardíaco',
        method: 'SBC 2023 recomenda: escore de Rassi para estratificação de risco de morte súbita em cardiopatas chagásicos; CDI (cardiodesfibrilador implantável) em alto risco',
        periodicity: 'ECG anual + Holter 24h se arritmias; Ecocardiograma bienal se CCC',
        recommendation: 'SBC enfatiza: Chagas é causa de 25% dos transplantes cardíacos no Brasil. Rastreamento em áreas endêmicas é custo-efetivo para identificar candidatos a tratamento e prevenção de morte súbita',
        citations: [
          { refId: 'consenso-chagas-2015' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Convergência em indicação e método. Divergência em cobertura: MS recomenda rastreamento em áreas endêmicas, mas implementação é heterogênea e depende de iniciativas estaduais/municipais',
        citations: [
          { refId: 'pcdt-chagas-ms-2018' }
        ]
      }
    },
    epidemiology: {
      incidence: '~200 casos agudos/ano (transmissão oral predominante); 1-3 milhões de casos crônicos (infecção prévia)',
      mortality: '~4.000-6.000 óbitos/ano atribuídos a cardiopatia chagásica',
      prevalence: 'Soroprevalência: 1,0-4,5% em áreas endêmicas (vs 0,02% em áreas não endêmicas)',
      citations: [
        { refId: 'consenso-chagas-2015' }
      ]
    },
    lastUpdate: '2025-12'
  },

  'saude-bucal': {
    id: 'saude-bucal',
    title: 'Rastreamento de Saúde Bucal (Cárie, Doença Periodontal, Câncer de Boca)',
    category: 'outros',
    description: 'Rastreamento oportunístico de condições bucais na APS, integrado ao Programa Brasil Sorridente. Inclui: (1) Cárie e doença periodontal em crianças (Programa Saúde na Escola) e adultos; (2) Pré-natal odontológico em gestantes; (3) Câncer de boca em grupos de risco (fumantes, etilistas, >40 anos).',
    recommendations: {
      sus: {
        population: 'Crianças (PSE - exame anual escolar); Gestantes (pré-natal odontológico - mínimo 1 consulta); Adultos (rastreamento oportunístico na APS); Grupos de risco para câncer de boca (fumantes + etilistas + >40 anos)',
        method: 'Exame clínico odontológico (inspeção visual + sondagem periodontal); Autoexame de boca orientado para grupos de risco',
        periodicity: 'Crianças: anual (PSE); Gestantes: 1ª consulta de pré-natal + 3º trimestre; Adultos: oportunístico; Câncer de boca: anual para grupos de risco',
        justification: 'Fundamentação: (1) Cárie afeta 56% das crianças de 12 anos no Brasil; (2) Doença periodontal afeta 50% dos adultos; (3) Câncer de boca: 15.000 casos/ano, 6.000 óbitos/ano; (4) Integração saúde bucal-APS melhora acesso e continuidade do cuidado',
        coverage: 'Cobertura de equipes de saúde bucal na ESF: 52,3% (2023)',
        citations: [
          { refId: 'brasil-sorridente-2024' },
          { refId: 'caderno-saude-bucal-2008' },
          { refId: 'inca-cancer-boca-2021' }
        ]
      },
      societies: {
        organization: ['CFO', 'ABO', 'SBMFC'],
        population: 'Mesma do MS',
        method: 'CFO recomenda: uso de índice CPO-D (cariados, perdidos, obturados) para monitoramento epidemiológico; biópsia de lesões suspeitas de câncer',
        periodicity: 'Semestral para crianças de alto risco (cárie ativa); Anual para adultos',
        recommendation: 'CFO e ABO enfatizam: cirurgião-dentista deve estar integrado à equipe de Saúde da Família para rastreamento oportunístico e referenciamento adequado',
        citations: [
          { refId: 'brasil-sorridente-2024' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Convergência em indicação. Programa Brasil Sorridente é política de Estado com diretrizes bem estabelecidas. Desafio: cobertura de equipes de saúde bucal ainda abaixo de 60%',
        citations: [
          { refId: 'brasil-sorridente-2024' }
        ]
      }
    },
    epidemiology: {
      incidence: 'Cárie: 56% das crianças 12 anos; Doença periodontal: 50% adultos; Câncer de boca: ~15.000 casos/ano',
      mortality: 'Câncer de boca: ~6.000 óbitos/ano (5º câncer mais letal em homens)',
      prevalence: 'Edentulismo (perda total de dentes): 14% da população adulta; 53% dos idosos',
      citations: [
        { refId: 'brasil-sorridente-2024' },
        { refId: 'inca-cancer-boca-2021' }
      ]
    },
    lastUpdate: '2025-12'
  },

  'violencia-domestica': {
    id: 'violencia-domestica',
    title: 'Rastreamento de Violência Doméstica/Intrafamiliar',
    category: 'outros',
    description: 'Rastreamento oportunístico de violência contra mulheres, crianças, adolescentes e idosos durante atendimentos na APS. Identificação de sinais de alerta e uso de questionários estruturados. Notificação compulsória ao SINAN. Articulação com rede de proteção social.',
    recommendations: {
      sus: {
        population: 'Mulheres (todas as atendidas na APS - rastreamento oportunístico); Crianças e adolescentes (puericultura, PSE); Idosos (consultas de rotina); Gestantes (pré-natal)',
        method: 'Perguntas diretas sobre violência física/sexual/psicológica durante consulta; Observação de sinais de alerta (lesões incompatíveis, comportamento, atraso de desenvolvimento); Questionários validados (HITS, WAST, PVS)',
        periodicity: 'Oportunístico (toda consulta é oportunidade de rastreamento)',
        justification: 'Fundamentação: (1) 1 em cada 3 mulheres sofre violência física/sexual ao longo da vida (OMS); (2) Violência é determinante social de saúde com impacto em morbidade física e mental; (3) APS é espaço privilegiado para identificação precoce; (4) Notificação compulsória (Lei 10.778/2003 - mulheres; ECA - crianças)',
        coverage: 'Subnotificação estimada em 60-80%',
        citations: [
          { refId: 'linha-cuidado-violencia-2010' },
          { refId: 'caderno-violencia-intrafamiliar-2002' },
          { refId: 'notificacao-violencia-sinan-2017' }
        ]
      },
      societies: {
        organization: ['SBMFC', 'SBP', 'FEBRASGO'],
        population: 'Mesma do MS, com ênfase em: gestantes (violência na gestação associada a prematuridade e baixo peso); crianças <5 anos (período crítico de desenvolvimento)',
        method: 'SBMFC recomenda: abordagem centrada na pessoa, ambiente seguro e confidencial, evitar julgamento, oferecer apoio e encaminhamento',
        periodicity: 'Oportunístico',
        recommendation: 'SBMFC 2023 enfatiza: rastreamento de violência deve ser parte da consulta de rotina, não apenas quando há suspeita. Perguntar diretamente sobre violência não causa dano e aumenta identificação',
        citations: [
          { refId: 'linha-cuidado-violencia-2010' }
        ]
      },
      convergence: {
        status: 'parcial',
        description: 'Convergência em indicação (rastreamento oportunístico). Divergência em método: não há questionário padronizado nacionalmente. Desafio: capacitação de profissionais para abordagem sensível e articulação com rede de proteção',
        citations: [
          { refId: 'caderno-violencia-intrafamiliar-2002' }
        ]
      }
    },
    epidemiology: {
      incidence: '~500.000 notificações de violência interpessoal/ano no SINAN (2023); estimativa real 3-5x maior (subnotificação)',
      mortality: 'Feminicídio: ~1.400/ano; Homicídio de crianças/adolescentes: ~4.500/ano',
      prevalence: '1 em 3 mulheres sofre violência física/sexual ao longo da vida; 70% dos casos de violência contra criança ocorrem no ambiente doméstico',
      citations: [
        { refId: 'notificacao-violencia-sinan-2017' }
      ]
    },
    lastUpdate: '2025-12'
  },

  'depressao-aps': {
    id: 'depressao-aps',
    title: 'Rastreamento de Depressão na Atenção Primária',
    category: 'outros',
    description: 'Rastreamento oportunístico de transtorno depressivo maior em adultos na APS utilizando instrumentos validados (PHQ-2, PHQ-9). Recomendado por USPSTF e SBMFC, mas sem programa nacional formal no Brasil. Controvérsia sobre custo-efetividade do rastreamento universal.',
    recommendations: {
      sus: {
        population: 'Sem programa nacional formal. Rastreamento oportunístico recomendado em: gestantes e puérperas (depressão perinatal); idosos (depressão geriátrica); pacientes com doenças crônicas (DM, ICC, DPOC); história prévia de depressão',
        method: 'PHQ-2 (2 perguntas) como triagem inicial; PHQ-9 (9 perguntas) se PHQ-2 positivo; Escala de Depressão Geriátrica (GDS-15) para idosos',
        periodicity: 'Oportunístico (não há recomendação de periodicidade)',
        justification: 'Contexto brasileiro: (1) Depressão é 3ª causa de anos vividos com incapacidade; (2) 60-70% dos casos não são diagnosticados; (3) Tratamento efetivo disponível na APS (fluoxetina, amitriptilina - RENAME); (4) Controvérsia: USPSTF recomenda rastreamento universal, mas evidência de benefício em contexto de baixa retaguarda (como SUS) é limitada',
        coverage: 'Não disponível',
        citations: [
          { refId: 'protocolo-depressao-sbmfc-2022' }
        ]
      },
      societies: {
        organization: ['SBMFC', 'ABP', 'SBGer'],
        population: 'SBMFC recomenda rastreamento oportunístico em grupos de risco; ABP recomenda rastreamento mais amplo',
        method: 'PHQ-2 → PHQ-9 (se positivo) → Avaliação clínica para diagnóstico',
        periodicity: 'Oportunístico; anual para grupos de alto risco',
        recommendation: 'SBMFC 2022 enfatiza: rastreamento só é útil se houver capacidade de tratamento na APS. Sem retaguarda de saúde mental, rastreamento pode gerar demanda sem resolução. Priorizar grupos de risco sobre rastreamento universal',
        citations: [
          { refId: 'protocolo-depressao-sbmfc-2022' },
          { refId: 'uspstf-depression-2023' }
        ]
      },
      convergence: {
        status: 'parcial',
        description: 'Divergência: USPSTF (EUA) recomenda rastreamento universal em adultos; Brasil (MS/SBMFC) recomenda rastreamento oportunístico em grupos de risco. Justificativa: diferença de contexto (acesso a tratamento, retaguarda de saúde mental)',
        citations: [
          { refId: 'uspstf-depression-2023' },
          { refId: 'protocolo-depressao-sbmfc-2022' }
        ]
      }
    },
    epidemiology: {
      incidence: 'Prevalência-ano: 5,8% da população brasileira (VIGITEL 2023); ~12 milhões de pessoas',
      mortality: 'Suicídio: ~14.000/ano no Brasil (2023); depressão é fator de risco principal',
      prevalence: 'Depressão perinatal: 15-20% das gestantes/puérperas; Depressão geriátrica: 10-15% dos idosos',
      citations: [
        { refId: 'vigitel-2023' }
      ]
    },
    lastUpdate: '2025-12'
  },

  'glaucoma': {
    id: 'glaucoma',
    title: 'Rastreamento de Glaucoma (NÃO Recomendado Universalmente)',
    category: 'outros',
    description: 'Glaucoma é a principal causa de cegueira irreversível no mundo. Apesar da gravidade, o rastreamento populacional universal NÃO é recomendado pelo SUS, USPSTF ou CBO devido a custo-efetividade desfavorável. Recomenda-se avaliação oftalmológica oportunística em grupos de risco.',
    recommendations: {
      sus: {
        population: 'NÃO há rastreamento populacional universal. Avaliação oftalmológica oportunística recomendada para grupos de risco: >40 anos, afrodescendentes, história familiar de glaucoma, miopia alta, uso crônico de corticoides, diabéticos',
        method: 'Tonometria (medida da pressão intraocular) + Fundoscopia (avaliação do disco óptico) + Campimetria (se suspeita)',
        periodicity: 'Oportunístico; a cada 2-4 anos para grupos de risco',
        justification: 'NÃO recomendado universalmente porque: (1) Baixo valor preditivo positivo (muitos falsos-positivos); (2) Custo elevado de tonometria + campimetria para toda população; (3) Progressão lenta permite detecção oportunística; (4) USPSTF 2022: evidência insuficiente para recomendar rastreamento universal',
        coverage: 'Não aplicável (não há programa de rastreamento)',
        citations: [
          { refId: 'cbo-glaucoma-2023' },
          { refId: 'uspstf-glaucoma-2022' }
        ]
      },
      societies: {
        organization: ['CBO', 'SBG', 'AAO'],
        population: 'CBO e SBG recomendam avaliação oftalmológica periódica para grupos de risco, não rastreamento universal',
        method: 'Tonometria + Fundoscopia + Gonioscopia (se suspeita de ângulo fechado); OCT de camada de fibras nervosas (se disponível)',
        periodicity: 'Grupos de risco: a cada 2 anos (40-54 anos); anual (55-64 anos); anual (≥65 anos)',
        recommendation: 'CBO 2023 enfatiza: priorizar detecção em grupos de risco sobre rastreamento universal. Médico de família pode identificar fatores de risco e referenciar para avaliação oftalmológica',
        citations: [
          { refId: 'cbo-glaucoma-2023' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Convergência: SUS, CBO, USPSTF e AAO concordam que rastreamento universal de glaucoma NÃO é recomendado. Avaliação oportunística em grupos de risco é a estratégia adequada',
        citations: [
          { refId: 'uspstf-glaucoma-2022' },
          { refId: 'cbo-glaucoma-2023' }
        ]
      }
    },
    epidemiology: {
      incidence: 'Prevalência: 2-3% da população >40 anos; ~3 milhões de brasileiros',
      mortality: 'Não causa morte direta',
      prevalence: 'Principal causa de cegueira irreversível; 50% dos portadores desconhecem o diagnóstico; Afrodescendentes: risco 4-5x maior',
      citations: [
        { refId: 'cbo-glaucoma-2023' }
      ]
    },
    lastUpdate: '2025-12'
  },

  'pe-diabetico': {
    id: 'pe-diabetico',
    title: 'Avaliação Anual do Pé Diabético',
    category: 'adultos',
    description: 'Rastreamento anual de neuropatia periférica e doença arterial periférica em diabéticos, visando estratificar risco de úlcera e amputação. Exame clínico simples (monofilamento 10g, diapasão 128Hz, palpação de pulsos) pode ser realizado pelo médico de família, enfermeiro ou técnico capacitado na APS.',
    recommendations: {
      sus: {
        population: 'Todos diabéticos tipo 1 e tipo 2, independente da duração',
        method: 'Exame clínico estruturado: (1) Inspeção visual (calosidades, deformidades, fissuras); (2) Monofilamento de Semmes-Weinstein 10g (10 pontos); (3) Diapasão 128Hz (sensibilidade vibratória); (4) Palpação de pulsos (tibial posterior, pedioso)',
        periodicity: 'Anual para baixo risco; semestral para risco moderado/alto; mensal se úlcera ativa',
        justification: 'Fundamentação: (1) Neuropatia diabética acomete 50% diabéticos >10 anos duração; (2) 85% das amputações são precedidas por úlcera; (3) Exame simples, sem custo, pode ser feito na APS; (4) Estratificação de risco permite educação preventiva (calçados adequados, cuidados)',
        coverage: 'Estimativa: <25% dos diabéticos têm avaliação anual do pé documentada (estudo VIGITEL 2023)',
        citations: [
          { refId: 'manual-pe-diabetico-ms-2016' },
          { refId: 'linhas-cuidado-diabetes-ms-2022' }
        ]
      },
      societies: {
        organization: ['SBD', 'SBACV', 'SBMFC'],
        population: 'Todo diabético, enfatizando alto risco: >60 anos, DM >10 anos, neuropatia prévia, DAP, IRC, retinopatia, tabagismo',
        method: 'Mesmo do MS + recomendação adicional: Índice Tornozelo-Braquial (ITB) se suspeita de DAP',
        periodicity: 'Anual (baixo risco); trimestral (alto risco)',
        recommendation: 'SBD 2023 enfatiza papel da APS: enfermeiro pode realizar exame de monofilamento e estratificar risco, reservando avaliação do cirurgião vascular para casos de alto risco ou úlcera ativa. SBMFC reforça educação terapêutica (autocuidado com pés) como parte do rastreamento',
        citations: [
          { refId: 'sbd-diretrizes-2023' },
          { refId: 'consenso-pe-diabetico-2022' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Convergência total em indicação (todo diabético) e periodicidade (anual). Divergência menor em método (SBD adiciona ITB). Desafio operacional na APS: apenas 34,2% das UBS possuem monofilamento de Semmes-Weinstein disponível (PMAQ 2018)',
        citations: [
          { refId: 'linhas-cuidado-diabetes-ms-2022' },
          { refId: 'sbd-diretrizes-2023' }
        ]
      }
    },
    epidemiology: {
      incidence: '~16,8 milhões diabéticos no Brasil; 15-25% desenvolverão úlcera de pé ao longo da vida',
      mortality: 'Amputação de membro inferior 15-25x mais frequente em diabéticos; mortalidade pós-amputação 50% em 5 anos',
      prevalence: 'Neuropatia diabética presente em 50% dos diabéticos com >10 anos de duração',
      citations: [
        { refId: 'vigitel-2023' },
        { refId: 'manual-pe-diabetico-ms-2016' }
      ]
    },
    lastUpdate: '2025-12'
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

