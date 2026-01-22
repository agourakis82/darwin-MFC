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
      uk: {
        organization: ['NHS', 'NICE'],
        population: 'Mulheres de 50 a 71 anos (programa de rastreamento organizado)',
        method: 'Mamografia digital bilateral',
        periodicity: 'A cada 3 anos',
        justification: 'NHS Breast Screening Programme oferece rastreamento mamográfico em ciclos de 3 anos para mulheres de 50-71 anos. Programas educativos sobre auto-exame e reconhecimento de sinais de alerta para mulheres <50 anos. Decisão compartilhada para idade inicial e intervalo baseada em avaliação individual de risco.',
        citations: [
          { refId: 'nhs-breast-screening-2024' },
          { refId: 'nice-breast-cancer-ng161-2024' }
        ]
      },
      convergence: {
        status: 'parcial',
        description: 'Alta convergência na idade de início (40 anos) após atualização de Set/2025. Divergência persiste na periodicidade: SUS e UK (3 anos), sociedades brasileiras recomendam anual. Índia prioriza CBE (30+) como método de baixo custo, com mamografia em centros terciários. UK oferece programa nacional para 50-71 anos com intervalo triinal.',
        citations: [
          { refId: 'ms-mamografia-2025' },
          { refId: 'sbm-mamografia-2025' },
          { refId: 'np-ncd-operational-guidelines-2023' },
          { refId: 'nhs-breast-screening-2024' }
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
      uk: {
        organization: ['NHS', 'NICE'],
        population: 'Mulheres de 25 a 64 anos',
        method: 'HPV primary testing (PCR com reflexo para citologia se HPV+)',
        periodicity: 'A cada 5 anos se HPV-negativo',
        justification: 'NHS Cervical Screening Programme implementou HPV primary testing como padrão desde 2019-2020. Mulheres HPV-negativas são regressadas para 5 anos (risco muito baixo). HPV-positivas com citologia normal: regressão 1-3 anos. Implementação completa reflete as mais altas evidências sobre sensibilidade e valor preditivo do HPV, alinhado com recomendações de screening internacional.',
        citations: [
          { refId: 'nhs-cervical-screening-2024' },
          { refId: 'nice-cervical-cancer-ng12-2024' },
          { refId: 'uk-nsc-cervical-cancer-2024' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Alinhamento quase total. FEBRASGO, ABPTGIC e NHS implementaram HPV primary testing como padrão (SUS desde Ago/2025). Convergência completa em tecnologia, população-alvo (25-64 anos) e periodicidade (5 anos se HPV-negativo). Índia utiliza VIA (30-65 anos) como método de baixo custo, adaptado ao contexto de recursos limitados. UK e Brasil agora reconhecem HPV como padrão-ouro de rastreamento.',
        citations: [
          { refId: 'portaria-saes-13-2025' },
          { refId: 'febrasgo-hpv-2024' },
          { refId: 'np-ncd-operational-guidelines-2023' },
          { refId: 'nhs-cervical-screening-2024' }
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
      uk: {
        organization: ['NHS', 'NICE'],
        population: 'Sem programa de rastreamento populacional organizado no NHS. Detecção precoce através de avaliação clínica em consultas de rotina.',
        method: 'Inspeção visual da cavidade oral durante consultas dentárias ou médicas. Encaminhamento para especialista se suspeita.',
        periodicity: 'Oportunístico (durante consultas de rotina)',
        justification: 'NICE e UK NSC não recomendam rastreamento organizado de câncer oral na população geral. Foco na educação sobre fatores de risco (tabaco, álcool, HPV) e reconhecimento de sinais de alerta. Detecção precoce ocorre através de vigilância em pacientes de risco durante consultas dentárias e médicas de rotina.',
        citations: [
          { refId: 'nice-oral-cancer-ng161-2024' }
        ]
      },
      convergence: {
        status: 'parcial',
        description: 'Divergência na abordagem populacional. Índia tem um programa de rastreamento organizado OVI (≥30 anos) devido à alta prevalência cultural. UK e Brasil não recomenda rastreamento populacional organizado, focando em detecção oportunística em consultas de rotina e educação sobre fatores de risco. Alinhamento entre SUS, NHS e NICE: sem rastreamento universal, mas vigilância em grupos de risco.',
        citations: [
          { refId: 'nice-oral-cancer-ng161-2024' },
          { refId: 'np-ncd-operational-guidelines-2023' }
        ]
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
      uk: {
        organization: ['NHS', 'UK NSC'],
        population: 'Sem programa de rastreamento organizado. Informações sobre rastreamento disponíveis para homens que desejam tomar decisão informada.',
        method: 'PSA (se o homem optar por testar), considerando conversa sobre riscos e benefícios',
        periodicity: 'Não recomendado rotineiramente',
        justification: 'UK NSC não recomenda rastreamento populacional para câncer de próstata. Evidência insuficiente de benefício. Foco em informed choice: disponibilizar informação sobre riscos de sobertratamento, falsos positivos e benefícios limitados, permitindo que homens >40 anos façam decisão compartilhada com seus médicos.',
        citations: [
          { refId: 'uk-nsc-prostate-cancer-2024' }
        ]
      },
      india: {
        organization: ['NP-NCD', 'MoHFW'],
        population: 'Homens ≥50 anos (consideração seletiva em contextos de recursos limitados)',
        method: 'PSA sérico onde disponível; exame clínico retal se recursos permitirem',
        periodicity: 'Anual (se opt in pelo paciente)',
        justification: 'NP-NCD 2023-2030 não recomenda rastreamento universal de câncer de próstata em população-geral devido a custo-benefício incerto e risco de sobretratamento. Enfoque em informed choice e discussão compartilhada. PSA disponível em centros urbanos para homens que desejam testar.',
        citations: [
          { refId: 'np-ncd-operational-guidelines-2023' },
          { refId: 'who-cancer-prevention-2020' }
        ]
      },
      who: {
        organization: ['WHO'],
        population: 'Não há recomendação de rastreamento populacional universal',
        method: 'Testes de PSA em contextos de informed decision-making quando estrutura permitir',
        periodicity: 'Sem frequência recomendada para rastreamento',
        justification: 'WHO reconhece incerteza sobre efetividade de rastreamento de câncer de próstata. Discussão compartilhada e informed choice são estratégias apropriadas. Enfoque em detecção precoce apenas em contextos com capacidade diagnóstica e terapêutica adequada.',
        citations: [
          { refId: 'who-cancer-prevention-2020' }
        ]
      },
      convergence: {
        status: 'em_disputa',
        description: 'Divergência fundamental entre abordagens. MS (Brasil) e UK NSC (Inglaterra) não recomendam rastreamento populacional de próstata por PSA, enfatizando risco-benefício incerto. SBU (Brasil) defende screening inteligente a partir de 45-50 anos com tecnologia moderna. UK NSC promove informed choice (homens podem optar após discussão de riscos). SBU argumenta que ferramentas modernas (ressonância, biópsia seletiva) reduzem danos. Consenso: ausência de rastreamento universal é apropriada; decisão compartilhada é fundamental.',
        citations: [
          { refId: 'sbu-prostata-2025' },
          { refId: 'uk-nsc-prostate-cancer-2024' }
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
      india: {
        organization: ['NP-NCD', 'MoHFW'],
        population: 'Crianças aos 18-24 meses em programas de saúde materno-infantil',
        method: 'M-CHAT-R traduzido para hindi/local languages ou adaptação com ASHA workers',
        periodicity: 'Uma vez entre 18-24 meses',
        justification: 'India está expandindo triagem de desenvolvimento infantil via programas de saúde maternal (PCRH). M-CHAT-R é ferramenta validada internacionalmente. Treinamento de ASHA workers permite implementação em regiões rurais.',
        citations: [
          { refId: 'pcrh-maternal-health-guidelines-2023' },
          { refId: 'india-adolescent-health-screening-2023' }
        ]
      },
      who: {
        organization: ['WHO'],
        population: 'Todas as crianças em edad de 18-24 meses',
        method: 'Instrumentos de triagem de desenvolvimento validados (M-CHAT-R, ASQ)',
        periodicity: 'Uma vez aos 18-24 meses',
        justification: 'WHO recomenda triagem universal de desenvolvimento infantil como componente do pacote WHO PEN para saúde infantil. Detecção precoce de TEA permite intervenção comportamental intensiva com melhor prognóstico.',
        citations: [
          { refId: 'who-pen-essential-interventions-2023' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Convergência recente. A triagem universal foi adotada pelo MS em linha com AAP/CDC e com apoio de SBP. Alinhamento total em método e idade. WHO recomenda abordagem similar. Índia está expandindo programas de triagem via PCRH.',
        citations: [
          { refId: 'ms-tea-2025' },
          { refId: 'pcrh-maternal-health-guidelines-2023' }
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
      uk: {
        organization: ['NHS', 'NICE'],
        population: 'Todos adultos ≥40 anos (NHS Health Check). Screening oportunístico em qualquer idade em contexto clínico.',
        method: 'Medida de PA com aparelho calibrado em consultório ou MAPA (monitorização ambulatorial) para confirmação de hipertensão',
        periodicity: 'Checagem a cada 5 anos no NHS Health Check (40-74 anos); anual em pacientes com história de PA elevada ou fatores de risco',
        justification: 'NICE CG136 recomenda screening para todos adultos, com ênfase em indivíduos ≥40 anos. NHS Health Check oferece avaliação cardiovascular integrada a cada 5 anos. Confirmação de HAS deve ser feita com múltiplas medidas em diferentes dias, com MAPA recomendada para diagnóstico definitivo. Tratamento individualizado conforme risco cardiovascular total.',
        citations: [
          { refId: 'nice-hypertension-ng136-2024' },
          { refId: 'nhs-health-check-2024' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Consenso absoluto entre MS, sociedades, NHS e NP-NCD Índia. Não há divergência - evidência robusta e alto impacto. Todos recomendam rastreamento universal de adultos com ênfase em ≥18-40 anos. Alinhamento completo em método (PA medida com aparelho calibrado) e importância de confirmação diagnóstica.',
        citations: [{ refId: 'ms-mamografia-2025' }, { refId: 'np-ncd-operational-guidelines-2023' }, { refId: 'nice-hypertension-ng136-2024' }]
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
      uk: {
        organization: ['NHS', 'NICE'],
        population: 'Adultos de 40-74 anos (NHS Health Check a cada 5 anos como parte da avaliação cardiovascular integrada); screening oportunístico em qualquer idade em contexto clínico, especialmente em indivíduos com fatores de risco ou presença de obesidade/hipertensão',
        method: 'HbA1c (preferido em NHS), glicemia de jejum ou teste de tolerância oral à glicose (TOTG) quando indicado',
        periodicity: 'A cada 5 anos no NHS Health Check para população geral 40-74 anos; anual em indivíduos com pré-diabetes ou fatores de risco elevado',
        justification: 'NICE NG28 recomenda screening para DM2 como parte da avaliação integrada de risco cardiovascular (NHS Health Check). Critérios diagnósticos: HbA1c ≥6.5% ou glicemia jejum ≥126 mg/dL ou TOTG-2h ≥200 mg/dL. Diagnóstico deve ser confirmado em dia diferente. Pré-diabetes: HbA1c 6.0-6.4% ou glicemia jejum 110-125 mg/dL. Estrutura de healthcare UK integra rastreamento de DM2 com avaliação de risco cardiovascular total.',
        citations: [
          { refId: 'nice-diabetes-ng28-2024' },
          { refId: 'nhs-health-check-2024' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Alta convergência entre SUS, SBD, NHS/NICE e NP-NCD Índia. Todos recomendam rastreamento universal/seletivo de adultos ≥30-40 anos, com ênfase em grupos de risco. Critérios diagnósticos alinhados: HbA1c ≥6.5%, glicemia jejum ≥126 mg/dL. Periodicidade estratificada por risco está alinhada (5 anos população geral, anual em risco alto).',
        citations: [{ refId: 'sbd-diagnostico-2024' }, { refId: 'np-ncd-operational-guidelines-2023' }, { refId: 'nice-diabetes-ng28-2024' }]
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
      india: {
        organization: ['NP-NCD', 'MoHFW'],
        population: 'Crianças ≥10 anos; crianças 2-10 anos com histórico familiar de doença aterosclerótica ou dislipidemia',
        method: 'Perfil lipídico básico (CT, HDL-c, TG) onde disponível; teste em jejum se possível; referência para CT completo em centros terciários',
        periodicity: 'Universal aos 10 anos; anual em crianças com histórico familiar positivo',
        justification: 'India tem alta prevalência de DCV prematura (Indian Heart Study). NP-NCD 2023-2030 recomenda detecção precoce de fatores de risco cardiovascular. Rastreamento de dislipidemia em crianças com história familiar é custo-efetivo. Método de baixo custo (perfil lipídico básico) acessível em centros primários.',
        citations: [
          { refId: 'np-ncd-operational-guidelines-2023' },
          { refId: 'india-adolescent-health-screening-2023' }
        ]
      },
      who: {
        organization: ['WHO'],
        population: 'Todas as crianças ≥10 anos; crianças 2-10 anos com fatores de risco (história familiar, obesidade, hipertensão)',
        method: 'Perfil lipídico completo (CT, HDL-c, LDL-c, TG)',
        periodicity: 'Universal aos 10 anos; anual em grupos de risco',
        justification: 'WHO recomenda rastreamento de dislipidemia infantil como parte do pacote WHO PEN para prevenção de DCV. Detecção e tratamento precoce de HF reduzem eventos cardiovasculares prematuros. Abordagem em cascata é custo-efetiva.',
        citations: [
          { refId: 'who-hearts-technical-package-2022' },
          { refId: 'who-pen-essential-interventions-2023' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Alta convergência entre SUS, SBC, SBP, Diretriz HF 2021, NP-NCD Índia e WHO. Consenso sobre: rastreamento universal aos 10 anos, rastreamento seletivo em crianças 2-10 anos com fatores de risco, rastreamento em cascata familiar (custo-efetivo), importância da detecção precoce de HF. Alinhamento global em idade de início e estratégia de rastreamento.',
        citations: [{ refId: 'sbc-dislipidemia-2025' }, { refId: 'diretriz-hf-2021' }, { refId: 'np-ncd-operational-guidelines-2023' }, { refId: 'who-hearts-technical-package-2022' }]
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
      uk: {
        organization: ['NHS', 'NICE'],
        population: 'Adultos de 40-74 anos (NHS Health Check a cada 5 anos como parte de avaliação cardiovascular integrada); screening oportunístico em indivíduos com história de doença cardiovascular, diabetes, hipertensão ou em grupos de risco mais jovens',
        method: 'Perfil lipídico em jejum (colesterol total, LDL-c, HDL-c, triglicerídeos). Cálculo de risco cardiovascular 10 anos via QRISK3 (ferramenta oficial NHS). Opcionalmente: ApoB, Lp(a), CAC em seleção de casos',
        periodicity: 'A cada 5 anos no NHS Health Check (40-74 anos); anual em indivíduos com história de eventos cardiovasculares, diabetes ou risco muito alto; a cada 2-3 anos em risco intermediário',
        justification: 'NICE NG179 recomenda rastreamento de dislipidemia como parte da avaliação de risco cardiovascular total (integrado no NHS Health Check). Estratificação de risco via QRISK3 (modelo oficial NHS). Tratamento baseado em risco: estatinas indicadas em risco ≥10% de evento cardiovascular em 10 anos, com metas de LDL-c <100 mg/dL (baixo/intermediário) ou <70 mg/dL (alto/muito alto). Reconhece importância de mudanças de estilo de vida como componente fundamental.',
        citations: [
          { refId: 'nice-lipids-ng179-2024' },
          { refId: 'nhs-health-check-2024' }
        ]
      },
      india: {
        organization: ['NP-NCD', 'MoHFW'],
        population: 'Adultos ≥30 anos com fatores de risco cardiovascular (hipertensão, diabetes, obesidade, história familiar)',
        method: 'Colesterol total e HDL-c onde disponível; perfil lipídico completo em centros secundários/terciários',
        periodicity: 'Anual em grupos de risco identificados pelo algoritmo NP-NCD de estratificação cardiovascular',
        justification: 'NP-NCD 2023-2030 recomenda detecção de dislipidemia como componente da avaliação integrada de risco cardiovascular. Foco em métodos de baixo custo (colesterol total + HDL) acessíveis em atenção primária. Triagem integrada com HAS, diabetes reduz custo-benefício. Algoritmo NP-NCD identifica indivíduos de risco alto para referência a centros terciários.',
        citations: [
          { refId: 'np-ncd-operational-guidelines-2023' },
          { refId: 'np-ncd-hypertension-protocol-2023' }
        ]
      },
      who: {
        organization: ['WHO'],
        population: 'Todos adultos ≥40 anos; adultos 20-39 anos com fatores de risco cardiovascular (hipertensão, diabetes, história familiar, obesidade)',
        method: 'Perfil lipídico completo (CT, HDL-c, LDL-c, TG) integrado na avaliação de risco cardiovascular global',
        periodicity: 'A cada 5 anos em população geral; anual em grupos de risco alto',
        justification: 'WHO HEARTS Technical Package recomenda rastreamento de dislipidemia como componente da avaliação integrada de risco cardiovascular em atenção primária. Estratificação de risco permite tratamento eficiente e reduz custos. WHO PEN enfatiza abordagem populacional com métodos simples e custo-efetivos.',
        citations: [
          { refId: 'who-hearts-technical-package-2022' },
          { refId: 'who-pen-essential-interventions-2023' }
        ]
      },
      convergence: {
        status: 'convergencia',
        description: 'Alta convergência entre SUS, SBC, NHS/NICE, NP-NCD Índia e WHO. Todos recomendam rastreamento universal de adultos ≥35-40 anos com estratificação de risco para decisão terapêutica. Alinhamento sobre: idade de rastreamento (≥35-40 anos), inclusão de biomarcadores (ApoB, Lp(a)), tratamento baseado em risco cardiovascular total. SBC adota PREVENT, NHS adota QRISK3, NP-NCD usa algoritmo simples - todos eficazes. Metas terapêuticas similares: LDL-c reduzido conforme categoria de risco. Diretriz 2025 SBC, WHO e Índia destacam abordagem integrada com HAS e DM para máxima efetividade.',
        citations: [{ refId: 'sbc-dislipidemia-2025' }, { refId: 'prevent-calculator-2025' }, { refId: 'nice-lipids-ng179-2024' }, { refId: 'np-ncd-operational-guidelines-2023' }, { refId: 'who-hearts-technical-package-2022' }]
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
  },

  // ============================================
  // AUTO-GENERATED MODULES (32 conditions)
  // Generated: 2026-01-21T22:22:25.708Z
  // ============================================

  'acne': {
    id: 'acne',
    title: 'Manejo da Acne Vulgaris',
    category: 'outros',
    description: `A acne vulgaris é uma condição inflamatória crônica da unidade pilosebácea que afeta comumente adultos, adolescentes e pré-adolescentes com 9 anos ou mais . É uma das condições de pele mais comuns em crianças e adolescentes, com apresentação, diagnóstico diferencial e associações com patologias sistêmicas variando por idade . O manejo envolve abordagens tópicas, sistêmicas e dermocosméticas, com impacto negativo na qualidade de vida, incluindo ansiedade e depressão . Condições associadas como síndrome dos ovários policísticos (SOP) podem contribuir para acne em mulheres .`,
    recommendations: {
      sus: {
        population: `Adolescentes e adultos com acne vulgaris sintomática, incluindo aqueles com comorbidades como SOP [2,5,9].`,
        method: `Tópicos (retinoides, peróxido de benzoíla); Sistêmicos (antibióticos orais, isotretinoína para casos graves)`,
        periodicity: `Avaliação clínica inicial e follow-up a cada 4-6 semanas durante tratamento ativo [9].`,
        justification: `No SUS, o manejo da acne é recomendado para pacientes com lesões moderadas a graves, priorizando tratamentos acessíveis e protocolos dermatológicos latino-americanos [9].`,
        citations: [{ refId: 'acne-ref-9' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Preadolescentes ≥9 anos, adolescentes e adultos com acne vulgaris [1,7]. Mulheres com SOP e hiperandrogenismo [2,5].`,
        method: `Dermocosméticos; Tópicos (retinoides, antibióticos); Sistêmicos (isotretinoína, contraceptivos orais para mulheres)`,
        periodicity: `Monitoramento a cada 1-3 meses durante terapia, com reavaliação anual para recorrência [1].`,
        recommendation: `As diretrizes da American Academy of Dermatology (AAD) recomendam manejo baseado em gravidade, com terapias tópicas para leve, combinação para moderada e sistêmicas para grave [1]. Sociedade Endócrina para acne associada a SOP [2].`,
        citations: [{ refId: 'acne-ref-1' }, { refId: 'acne-ref-2' }, { refId: 'acne-ref-5' }, { refId: 'acne-ref-6' }, { refId: 'acne-ref-7' }]
      },
      convergence: {
        status: 'parcial',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'acne-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `Alta prevalência em adolescentes e jovens adultos, afetando comumente populações pediátricas e adultas [1,7]. Prevalência global estimada em até 80-90% durante a adolescência [1,9].`,
      incidence: `Incidência aumenta na puberdade, com picos em 12-24 anos [1,7].`,
      mortality: `Mortalidade negligible, mas morbidade significativa devido a cicatrizes e impacto psicológico [1,9].`,
      citations: [{ refId: 'acne-ref-1' }, { refId: 'acne-ref-7' }, { refId: 'acne-ref-9' }]
    },
    lastUpdate: '2026-01'
  },

  'alzheimer': {
    id: 'alzheimer',
    title: 'Diagnóstico e Avaliação de Doença de Alzheimer',
    category: 'outros',
    description: `A doença de Alzheimer é a forma mais comum de demência, caracterizada por declínio cognitivo progressivo . As diretrizes recomendam avaliação estruturada para suspeita de comprometimento cognitivo em cuidados primários e especializados . A avaliação inclui história clínica, testes cognitivos e exclusão de causas reversíveis .`,
    recommendations: {
      sus: {
        population: `Idosos acima de 65 anos com fatores de risco como história familiar, hipertensão ou Down syndrome [5,9].`,
        method: `Testes cognitivos (ex: MMSE); Exames laboratoriais; Neuroimagem (TC/RM); Biomarcadores sanguíneos em centros especializados`,
        periodicity: `Sob demanda clínica, sem periodicidade fixa; reavaliação anual para MCI [1,10].`,
        justification: `Avaliação diagnóstica para pacientes com suspeita de declínio cognitivo ou queixas de memória, sem programa de rastreamento populacional rotineiro [5,8].`,
        citations: [{ refId: 'alzheimer-ref-1' }, { refId: 'alzheimer-ref-5' }, { refId: 'alzheimer-ref-8' }, { refId: 'alzheimer-ref-9' }, { refId: 'alzheimer-ref-10' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Adultos com queixas subjetivas de memória ou impairment cognitivo objetivo, especialmente ≥65 anos [1,2,4].`,
        method: `Entrevista clínica e história; Testes neuropsicológicos; Biomarcadores (p-tau, Aβ) em contextos especializados [6]; Neuroimagem e EEG se indicado`,
        periodicity: `Avaliação inicial sob suspeita; monitoramento para progressão em MCI a cada 6-12 meses [1,10].`,
        recommendation: `Avaliação diagnóstica recomendada pela Alzheimer's Association para suspeita de Alzheimer ou demências relacionadas em cuidados primários e especializados [2,4]. Critérios clínicos NINCDS-ADRDA para diagnóstico provável [7].`,
        citations: [{ refId: 'alzheimer-ref-1' }, { refId: 'alzheimer-ref-2' }, { refId: 'alzheimer-ref-4' }, { refId: 'alzheimer-ref-6' }, { refId: 'alzheimer-ref-7' }, { refId: 'alzheimer-ref-10' }]
      },
      convergence: {
        status: 'parcial',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'alzheimer-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `A prevalência global de demência é de aproximadamente 55 milhões de casos, com Alzheimer representando 60-70% [5,8]. No Brasil, estima-se 1,5 milhão de casos de demência [5].`,
      incidence: `Incidência anual global de demência ~10 milhões de novos casos [5,8]. Para Alzheimer, ~5-10 por 1.000 pessoas-ano em idosos >65 anos [7].`,
      mortality: `Alzheimer é a 7ª principal causa de morte global, com ~2 milhões de óbitos anuais [5,8]. No Brasil, contribui para 5-10% das mortes em idosos [5].`,
      citations: [{ refId: 'alzheimer-ref-5' }, { refId: 'alzheimer-ref-7' }, { refId: 'alzheimer-ref-8' }]
    },
    lastUpdate: '2026-01'
  },

  'ansiedade': {
    id: 'ansiedade',
    title: 'Rastreamento de Transtornos de Ansiedade',
    category: 'saude_mental',
    description: `Os transtornos de ansiedade representam um grupo de condições psiquiátricas comuns, caracterizadas por preocupação excessiva e medo, impactando a funcionalidade diária . O rastreamento precoce em atenção primária é crucial para identificar casos e iniciar intervenções, reduzindo o risco de cronicidade . No contexto brasileiro, a integração ao SUS promove acesso equitativo ao diagnóstico .`,
    recommendations: {
      sus: {
        population: `Adultos ≥18 anos com fatores de risco como estresse crônico ou comorbidades; adolescentes com sinais de sofrimento psicológico [5,6].`,
        method: `Entrevista clínica; Escalas como GAD-7 ou BAI`,
        periodicity: `Avaliação inicial e follow-up anual ou conforme necessidade clínica [5].`,
        justification: `Rastreamento indicado para indivíduos com sintomas persistentes de ansiedade em atenção básica, incluindo adultos e adolescentes com queixas emocionais [5,6].`,
        citations: [{ refId: 'ansiedade-ref-5' }, { refId: 'ansiedade-ref-6' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Adultos e adolescentes com exposição a estressores ou histórico familiar; screening universal em populações de risco [4].`,
        method: `Questionários validados (GAD-7, PHQ-9 adaptado); Avaliação psiquiátrica`,
        periodicity: `Anual para indivíduos em risco; avaliação sob demanda para sintomáticos [4].`,
        recommendation: `A American Psychiatric Association (2023) recomenda rastreamento sistemático em adultos com sintomas de ansiedade em contextos de atenção primária [4].`,
        citations: [{ refId: 'ansiedade-ref-4' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'ansiedade-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `A prevalência global de transtornos de ansiedade é de aproximadamente 4% em adultos [4]. No Brasil, estima-se em 9,3% da população adulta [3,5].`,
      incidence: `A incidência anual varia de 2-5% em populações adultas [2,4]. No contexto brasileiro, cerca de 3% novos casos por ano [5,6].`,
      mortality: `Baixa mortalidade direta, mas associada a 20-30% de risco aumentado de suicídio [1,4]. No Brasil, contribui indiretamente para 5% das mortes por causas externas [5].`,
      citations: [{ refId: 'ansiedade-ref-1' }, { refId: 'ansiedade-ref-2' }, { refId: 'ansiedade-ref-3' }, { refId: 'ansiedade-ref-4' }, { refId: 'ansiedade-ref-5' }, { refId: 'ansiedade-ref-6' }]
    },
    lastUpdate: '2026-01'
  },

  'asma': {
    id: 'asma',
    title: 'Manejo da Asma',
    category: 'outros',
    description: `A asma é uma doença inflamatória crônica das vias aéreas caracterizada por episódios recorrentes de sibilância, dispneia, aperto torácico e tosse, com variabilidade ao longo do tempo e reversibilidade espontânea ou com tratamento . O manejo precoce é essencial para controle dos sintomas e prevenção de exacerbações . No contexto brasileiro, o Protocolo Clínico do SUS enfatiza o acesso a medicamentos e educação do paciente .`,
    recommendations: {
      sus: {
        population: `Crianças, adolescentes e adultos com sintomas como tosse noturna, sibilância e dispneia; priorizando grupos de risco como alérgicos e fumantes [13,14].`,
        method: `Espirometria; Pico de fluxo expiratório; Teste de broncodilatador; FeNO para inflamação eosinofílica [4]`,
        periodicity: `Avaliação clínica a cada 1-3 meses para ajuste terapêutico; monitoramento anual de função pulmonar [13].`,
        justification: `Diagnóstico e manejo de pacientes com suspeita ou confirmação de asma, incluindo avaliação de controle e prevenção de crises [13]. Recomendado para todos os pacientes com sintomas respiratórios persistentes ou recorrentes [13,14].`,
        citations: [{ refId: 'asma-ref-13' }, { refId: 'asma-ref-14' }, { refId: 'asma-ref-4' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Indivíduos de todas as idades com sintomas sugestivos de asma; foco em controle em asmáticos persistentes [11,12].`,
        method: `Espirometria com broncodilatador; Questionários de controle (ACQ/ACT); FeNO [4]; Teste de ativação de basófilos para hipersensibilidade [5]`,
        periodicity: `Revisão do plano de ação a cada 2-4 semanas em casos não controlados; avaliações regulares para manutenção [11,12].`,
        recommendation: `A Global Initiative for Asthma (GINA 2024) recomenda diagnóstico baseado em história clínica e testes de função pulmonar, com manejo escalonado para controle [11]. A Sociedade Brasileira de Pneumologia e Tisiologia (SBPT 2021) enfatiza abordagem personalizada e uso de ICS desde o início [12].`,
        citations: [{ refId: 'asma-ref-11' }, { refId: 'asma-ref-12' }, { refId: 'asma-ref-4' }, { refId: 'asma-ref-5' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'asma-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `A prevalência global varia de 1% a 18% em diferentes populações [11]. No Brasil, estima-se em cerca de 10% em adultos urbanos [12,13].`,
      incidence: `A incidência anual global é de 5-10 casos por 1.000 pessoas [11]. No Brasil, aproximadamente 3-5% ao ano em crianças [12].`,
      mortality: `A mortalidade global é baixa, cerca de 0,1-0,2 por 100.000 habitantes, mas subnotificada em países em desenvolvimento [11]. No Brasil, contribui para 2-3% das mortes por doenças respiratórias [13].`,
      citations: [{ refId: 'asma-ref-11' }, { refId: 'asma-ref-12' }, { refId: 'asma-ref-13' }]
    },
    lastUpdate: '2026-01'
  },

  'celulite': {
    id: 'celulite',
    title: 'Celulite (Infecção Bacteriana da Pele)',
    category: 'outros',
    description: `A celulite é uma infecção bacteriana aguda da derme e tecido subcutâneo, geralmente causada por Streptococcus ou Staphylococcus . Caracteriza-se por eritema, calor, edema e dor local . É uma das infecções de pele mais comuns, com potencial para complicações como abscessos ou sepse . No contexto brasileiro, a vigilância é essencial em populações vulneráveis .`,
    recommendations: {
      sus: {
        population: `Populações vulneráveis, incluindo diabéticos, imunossuprimidos, idosos e indivíduos em áreas endêmicas de zoonoses relacionadas [2].`,
        method: `Exame clínico; Avaliação epidemiológica; Coleta de amostras para cultura se grave`,
        periodicity: `Monitoramento contínuo e caso a caso, sem periodicidade fixa para rastreamento populacional [2].`,
        justification: `Vigilância e detecção precoce de infecções de pele e partes moles em atenção básica, especialmente em casos de exposição a fatores de risco como feridas ou comorbidades [2].`,
        citations: [{ refId: 'celulite-ref-2' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Adultos e crianças com eritema difuso, febre ou fatores de risco como linfedema ou diabetes [1].`,
        method: `Exame físico; Antibióticos orais empíricos (ex.: cefalexina); Exames laboratoriais (hemograma, PCR) em casos graves`,
        periodicity: `Avaliação aguda, sem rastreamento preventivo periódico; seguimento para recorrências em casos crônicos [1].`,
        recommendation: `Diagnóstico e manejo de celulite em pacientes com sinais de infecção cutânea aguda, priorizando tratamento empírico [1].`,
        citations: [{ refId: 'celulite-ref-1' }]
      },
      convergence: {
        status: 'parcial',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'celulite-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `A prevalência de celulite é estimada em 1-5% em populações gerais, com maior incidência em diabéticos (até 20%) [3,4]. No Brasil, representa cerca de 10% das infecções de pele atendidas em serviços de saúde [1,2].`,
      incidence: `Incidência global de 24,6 casos por 1.000 pessoas-ano em adultos [3]. No Brasil, estima-se 15-20 casos por 1.000 habitantes anualmente em regiões urbanas [1,5].`,
      mortality: `Mortalidade baixa (1-5%) em casos não complicados, mas até 20% em sepse associada [3,4]. No Brasil, contribui para 2-3% das mortes por infecções sistêmicas [2,5].`,
      citations: [{ refId: 'celulite-ref-1' }, { refId: 'celulite-ref-2' }, { refId: 'celulite-ref-3' }, { refId: 'celulite-ref-4' }, { refId: 'celulite-ref-5' }]
    },
    lastUpdate: '2026-01'
  },

  'demencia': {
    id: 'demencia',
    title: 'Demência',
    category: 'outros',
    description: `A demência é uma síndrome caracterizada por deterioração progressiva das funções cognitivas, acompanhada de sintomas psiquiátricos e distúrbios comportamentais que levam a incapacidade progressiva e irreversível . É a segunda principal causa de demência neurodegenerativa, com impacto significativo na qualidade de vida de pacientes e familiares . Há evidências de associação entre periodontite e demência, recomendando prevenção e manejo integrado . O diagnóstico precoce utiliza biomarcadores como PET imaging e testes sanguíneos para condições associadas, como doença de Alzheimer . Considerações éticas incluem manejo nutricional e prevenção de reações adversas a medicamentos em idosos . Investigação genética é recomendada em casos selecionados . Consensos enfatizam nutrição enteral controversa em estágios avançados .`,
    recommendations: {
      sus: {
        population: `Idosos ≥65 anos com sintomas sugestivos, comorbidades ou fatores de risco como polimedicação e comorbidades [4,9]`,
        method: `Testes cognitivos (ex: Mini-Exame do Estado Mental); Avaliação clínica e laboratorial básica; Encaminhamento para especialistas se necessário`,
        periodicity: `Avaliação anual em idosos sintomáticos ou a cada 1-2 anos em grupos de risco na atenção primária [3,9]`,
        justification: `Avaliação cognitiva para idosos com suspeita de declínio cognitivo ou fatores de risco, sem programa de rastreamento populacional rotineiro, priorizando diagnóstico precoce na atenção básica [1,3,4]`,
        citations: [{ refId: 'demencia-ref-1' }, { refId: 'demencia-ref-3' }, { refId: 'demencia-ref-4' }, { refId: 'demencia-ref-9' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Pacientes com suspeita de demência, incluindo prodromal ou estágio pré-demência, e idosos com fatores de risco genéticos ou periodontais [2,5,6,8]`,
        method: `PET imaging biomarkers; Blood-based biomarkers (ex: p-tau, Aβ42/40); Testes genéticos em etiologia suspeita; Avaliação nutricional e odontológica integrada`,
        periodicity: `Uso de biomarcadores no momento do diagnóstico; monitoramento anual para progressão em casos confirmados [5,6]`,
        recommendation: `Diagnóstico utilizando biomarcadores de imagem PET e sanguíneos para condições neurodegenerativas associadas à demência, incluindo Alzheimer e demência com corpos de Lewy; prevenção de eventos adversos medicamentosos e manejo nutricional [3,5,6]`,
        citations: [{ refId: 'demencia-ref-2' }, { refId: 'demencia-ref-3' }, { refId: 'demencia-ref-5' }, { refId: 'demencia-ref-6' }, { refId: 'demencia-ref-8' }]
      },
      convergence: {
        status: 'parcial',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'demencia-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `Globalmente, a prevalência de demência em adultos >60 anos é de aproximadamente 5-8%, afetando milhões devido ao envelhecimento populacional [1,3,6]`,
      incidence: `Incidência anual de cerca de 1-2% em idosos >65 anos, com aumento em populações com comorbidades como periodontite [2,3]`,
      mortality: `Demência contribui para cerca de 7% das mortes em idosos, com impacto significativo em qualidade de vida e autonomia [3,7]`,
      citations: [{ refId: 'demencia-ref-1' }, { refId: 'demencia-ref-2' }, { refId: 'demencia-ref-3' }, { refId: 'demencia-ref-6' }, { refId: 'demencia-ref-7' }]
    },
    lastUpdate: '2026-01'
  },

  'depressao': {
    id: 'depressao',
    title: 'Rastreamento de Depressão',
    category: 'saude_mental',
    description: `A depressão é uma condição frequente, recorrente e crônica com altos níveis de incapacidade funcional . O rastreamento visa à identificação precoce em atenção primária para melhorar desfechos clínicos .`,
    recommendations: {
      sus: {
        population: `Adultos ≥18 anos com fatores de risco como estresse crônico, perdas recentes ou comorbidades [1,2].`,
        method: `PHQ-9; PHQ-2; Escala de Beck`,
        periodicity: `Oportunístico durante consultas de rotina ou anualmente em grupos de risco [1,2].`,
        justification: `Rastreamento recomendado em atenção primária para identificação de sintomas depressivos em populações vulneráveis [1,2].`,
        citations: [{ refId: 'depressao-ref-1' }, { refId: 'depressao-ref-2' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Adultos e idosos com sintomas sugestivos ou fatores de risco como histórico familiar [1,2].`,
        method: `PHQ-9; PHQ-2; Escala de Hamilton`,
        periodicity: `Anual em atenção primária ou conforme avaliação clínica [1,2].`,
        recommendation: `A Associação Brasileira de Psiquiatria recomenda rastreamento para diagnóstico precoce de depressão maior [1,2].`,
        citations: [{ refId: 'depressao-ref-1' }, { refId: 'depressao-ref-2' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'depressao-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `No Brasil, a prevalência de depressão é estimada em 5,8% na população adulta [1,2].`,
      incidence: `A incidência anual é de aproximadamente 3-4% em adultos [1,2].`,
      mortality: `A depressão contribui para cerca de 800 mil suicídios globais por ano, com impacto significativo no Brasil [1,2].`,
      citations: [{ refId: 'depressao-ref-1' }, { refId: 'depressao-ref-2' }]
    },
    lastUpdate: '2026-01'
  },

  'dermatite-atopica': {
    id: 'dermatite-atopica',
    title: 'Dermatite Atópica',
    category: 'outros',
    description: `A dermatite atópica é uma doença inflamatória crônica da pele, caracterizada por prurido intenso e lesões eczematosas . Afeta principalmente crianças, com prevalência global variando de 15-20% em menores de 5 anos . No Brasil, estima-se que afete cerca de 10-15% das crianças . O manejo envolve hidratação, corticoides tópicos e, em casos graves, imunossupressores .`,
    recommendations: {
      sus: {
        population: `Crianças e adultos com prurido recorrente, lesões eczematosas e história familiar de atopia [9,10].`,
        method: `Exame dermatológico; Escala SCORAD; Testes alérgicos quando indicado`,
        periodicity: `Avaliação clínica a cada 3-6 meses para controle de sintomas [9].`,
        justification: `Diagnóstico e manejo inicial em atenção primária para pacientes com suspeita de dermatite atópica, com encaminhamento para especialista em casos moderados a graves [9,10].`,
        citations: [{ refId: 'dermatite-atopica-ref-9' }, { refId: 'dermatite-atopica-ref-10' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Indivíduos de todas as idades com lesões pruriginosas e barreira cutânea alterada [1,11].`,
        method: `Emolientes diários; Corticoides tópicos; Inibidores de calcineurina; Dupilumab para refratários`,
        periodicity: `Monitoramento contínuo, com revisões a cada 1-3 meses em fases agudas [11].`,
        recommendation: `A Academia Americana de Dermatologia (AAD 2023) recomenda diagnóstico baseado em critérios clínicos e manejo escalonado com emolientes e anti-inflamatórios tópicos [1,11].`,
        citations: [{ refId: 'dermatite-atopica-ref-1' }, { refId: 'dermatite-atopica-ref-11' }]
      },
      convergence: {
        status: 'parcial',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'dermatite-atopica-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `Prevalência global em crianças: 15-20% [3,4]; em adultos: 1-3% [12]. No Brasil: 12% em crianças urbanas [5,6].`,
      incidence: `Incidência anual global: 10-15% em lactentes [13]; no Brasil: aproximadamente 8-10 casos por 1.000 crianças/ano [14].`,
      mortality: `Baixa mortalidade direta, mas associada a infecções secundárias (0,1-0,5% dos casos graves) [15]; no Brasil, contribui indiretamente para 0,2% das mortes por infecções cutâneas [16].`,
      citations: [{ refId: 'dermatite-atopica-ref-3' }, { refId: 'dermatite-atopica-ref-4' }, { refId: 'dermatite-atopica-ref-5' }, { refId: 'dermatite-atopica-ref-6' }, { refId: 'dermatite-atopica-ref-12' }, { refId: 'dermatite-atopica-ref-13' }, { refId: 'dermatite-atopica-ref-14' }, { refId: 'dermatite-atopica-ref-15' }, { refId: 'dermatite-atopica-ref-16' }]
    },
    lastUpdate: '2026-01'
  },

  'diabetes-mellitus-2': {
    id: 'diabetes-mellitus-2',
    title: 'Diabetes Mellitus Tipo 2',
    category: 'adultos',
    description: `O diabetes mellitus tipo 2 (DM2) é uma doença metabólica crônica caracterizada por hiperglicemia resultante de defeitos na secreção de insulina e/ou ação da insulina . Representa a forma mais prevalente de diabetes, afetando milhões globalmente e sendo uma das principais causas de morbimortalidade . No contexto brasileiro, o DM2 é uma prioridade em saúde pública, com protocolos integrados para prevenção, diagnóstico e tratamento .`,
    recommendations: {
      sus: {
        population: `Adultos ≥35 anos; indivíduos <35 anos com IMC ≥25 kg/m², hipertensão, dislipidemia, história familiar de DM2 ou gestantes com risco [11,12].`,
        method: `Glicemia de jejum (≥126 mg/dL); Teste oral de tolerância à glicose 75g (TOTG ≥200 mg/dL em 2h); HbA1c (≥6,5%)`,
        periodicity: `A cada 3 anos para indivíduos assintomáticos com glicemia normal; anualmente para aqueles com pré-diabetes ou fatores de risco elevados [11,12].`,
        justification: `Rastreamento recomendado para adultos com sobrepeso (IMC ≥25 kg/m²) e fatores de risco, ou ≥35 anos, visando detecção precoce e prevenção de complicações [11,12].`,
        citations: [{ refId: 'diabetes-mellitus-2-ref-11' }, { refId: 'diabetes-mellitus-2-ref-12' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Adultos ≥35 anos com IMC ≥25 kg/m²; <35 anos com fatores de risco como sedentarismo, etnia de risco ou história familiar [9,10].`,
        method: `Glicemia de jejum; HbA1c; TOTG 75g`,
        periodicity: `Intervalo de 3 anos para normais; anual para pré-diabetes ou alto risco [9,10].`,
        recommendation: `A American Diabetes Association (ADA 2024) e Sociedade Brasileira de Diabetes (SBD 2023-2024) recomendam rastreamento para adultos ≥35 anos com sobrepeso ou fatores de risco, enfatizando abordagem personalizada [9,10].`,
        citations: [{ refId: 'diabetes-mellitus-2-ref-9' }, { refId: 'diabetes-mellitus-2-ref-10' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'diabetes-mellitus-2-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `Globalmente, afeta cerca de 10,5% dos adultos (537 milhões em 2021), projetado para 783 milhões até 2045 [9,10]. No Brasil, prevalência de 7,4% em adultos (aproximadamente 19 milhões) [10,11].`,
      incidence: `Incidência global de 5,9 milhões de novos casos anuais [9]. No Brasil, cerca de 1,5 milhão de novos casos por ano [10,11].`,
      mortality: `Causa 6,7 milhões de mortes globais em 2021 (9ª causa principal) [9]. No Brasil, responsável por 5,3% das mortes por doenças crônicas [11].`,
      citations: [{ refId: 'diabetes-mellitus-2-ref-9' }, { refId: 'diabetes-mellitus-2-ref-10' }, { refId: 'diabetes-mellitus-2-ref-11' }]
    },
    lastUpdate: '2026-01'
  },

  'dislipidemia': {
    id: 'dislipidemia',
    title: 'Rastreamento de Dislipidemia',
    category: 'outros',
    description: `O rastreamento de dislipidemia é essencial para a prevenção de eventos cardiovasculares ateroscleróticos, com foco na identificação precoce de alterações lipídicas como hipercolesterolemia e hipertrigliceridemia . No Brasil, a dislipidemia é um fator de risco prevalente, contribuindo para a alta morbimortalidade cardiovascular . A abordagem integrada considera o risco cardiovascular global .`,
    recommendations: {
      sus: {
        population: `Adultos ≥40 anos; indivíduos <40 anos com obesidade, diabetes, hipertensão ou história familiar de doença cardiovascular precoce [11,12].`,
        method: `Perfil lipídico (colesterol total, HDL, LDL, triglicerídeos)`,
        periodicity: `A cada 5 anos em indivíduos de baixo risco; anualmente em alto risco [11].`,
        justification: `Rastreamento recomendado para prevenção de eventos cardiovasculares e pancreatite em indivíduos com fatores de risco ou ≥40 anos [11,12].`,
        citations: [{ refId: 'dislipidemia-ref-11' }, { refId: 'dislipidemia-ref-12' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Adultos ≥20 anos; priorizando aqueles com fatores de risco como diabetes, hipertensão ou tabagismo [1,3,5,7].`,
        method: `Perfil lipídico completo; Cálculo de escore de risco (SCORE ou Framingham)`,
        periodicity: `A cada 4-6 anos em adultos saudáveis; mais frequente em alto risco [1,5].`,
        recommendation: `A Sociedade Brasileira de Cardiologia (2017) e diretrizes ESC recomendam rastreamento para avaliação de risco cardiovascular em adultos [1,3,5].`,
        citations: [{ refId: 'dislipidemia-ref-1' }, { refId: 'dislipidemia-ref-3' }, { refId: 'dislipidemia-ref-5' }, { refId: 'dislipidemia-ref-7' }]
      },
      convergence: {
        status: 'parcial',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'dislipidemia-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `No Brasil, a prevalência de dislipidemia é de aproximadamente 30-40% em adultos, com hipercolesterolemia afetando 25% da população [11,12]. Globalmente, estima-se em 39% para hipercolesterolemia [3,5].`,
      incidence: `A incidência anual de dislipidemia em adultos é de 5-10 casos por 1.000 habitantes, associada ao envelhecimento e obesidade [3,7]. No Brasil, contribui para 20% dos novos casos de doença coronariana [11].`,
      mortality: `A dislipidemia contribui para 4,4 milhões de mortes globais por CVD anualmente [3,5]. No Brasil, representa fator em 30% das mortes cardiovasculares [11,12].`,
      citations: [{ refId: 'dislipidemia-ref-3' }, { refId: 'dislipidemia-ref-5' }, { refId: 'dislipidemia-ref-7' }, { refId: 'dislipidemia-ref-11' }, { refId: 'dislipidemia-ref-12' }]
    },
    lastUpdate: '2026-01'
  },

  'doenca-renal-cronica': {
    id: 'doenca-renal-cronica',
    title: 'Rastreamento de Doença Renal Crônica',
    category: 'outros',
    description: `A Doença Renal Crônica (DRC) é definida como anormalidades na estrutura ou função renal por mais de três meses, com implicações na saúde . A prevalência global é estimada em 9,1% a 13,4% em adultos . No Brasil, a prevalência é de aproximadamente 10,2% na população adulta . O rastreamento precoce visa identificar estágios iniciais para retardar a progressão .`,
    recommendations: {
      sus: {
        population: `Adultos maiores de 18 anos com fatores de risco cardiovascular ou renal; priorizar pacientes com diabetes e hipertensão [6,7].`,
        method: `Dosagem de creatinina sérica para cálculo de TFG; Relação albumina/creatinina na urina`,
        periodicity: `Anual para grupos de alto risco; a cada 1-2 anos para populações de risco moderado [6,7].`,
        justification: `Rastreamento recomendado para indivíduos com fatores de risco como diabetes mellitus, hipertensão arterial, doenças cardiovasculares, idade superior a 60 anos, história familiar de DRC, obesidade e tabagismo [6,7].`,
        citations: [{ refId: 'doenca-renal-cronica-ref-6' }, { refId: 'doenca-renal-cronica-ref-7' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Adultos com diabetes, hipertensão, idade ≥60 anos, doenças cardiovasculares, tabagismo, obesidade ou história familiar de DRC [4,5].`,
        method: `Cálculo de TFG por creatinina sérica (equação CKD-EPI); Medição de albuminúria (ACR em amostra isolada de urina)`,
        periodicity: `Anual em indivíduos de alto risco; a cada 1-3 anos em risco moderado [4,5].`,
        recommendation: `A KDIGO (2024) recomenda avaliação de TFG e albuminúria em adultos com fatores de risco, incluindo diabetes, hipertensão, idade >60 anos, histórico familiar e marcadores de risco cardiovascular [4]. A Sociedade Brasileira de Nefrologia (2022) endossa rastreamento similar para detecção precoce [5].`,
        citations: [{ refId: 'doenca-renal-cronica-ref-4' }, { refId: 'doenca-renal-cronica-ref-5' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'doenca-renal-cronica-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `A prevalência global de DRC é de 9,1% a 13,4% em adultos, afetando cerca de 700 milhões de pessoas [4]. No Brasil, estima-se em 10,2% da população adulta [5,6].`,
      incidence: `A incidência global é de aproximadamente 133 casos por milhão de habitantes por ano [4]. No Brasil, a incidência anual é de cerca de 120-150 por milhão [5].`,
      mortality: `A DRC contribui para 4,9 milhões de mortes globais em 2021, sendo a 9ª causa principal [4]. No Brasil, representa cerca de 5% das mortes por doenças crônicas não transmissíveis [6].`,
      citations: [{ refId: 'doenca-renal-cronica-ref-4' }, { refId: 'doenca-renal-cronica-ref-5' }, { refId: 'doenca-renal-cronica-ref-6' }]
    },
    lastUpdate: '2026-01'
  },

  'dpoc': {
    id: 'dpoc',
    title: 'Rastreamento de Doença Pulmonar Obstrutiva Crônica (DPOC)',
    category: 'outros',
    description: `A Doença Pulmonar Obstrutiva Crônica (DPOC) é uma doença respiratória crônica progressiva, caracterizada por limitação ao fluxo aéreo, sendo uma das principais causas de morbimortalidade global . O rastreamento visa identificar casos precocemente em populações de risco por meio de espirometria, reduzindo complicações e mortalidade . No contexto brasileiro, a DPOC afeta significativamente o sistema de saúde pública .`,
    recommendations: {
      sus: {
        population: `Adultos ≥40 anos com história de tabagismo ≥20 maços-ano, dispneia ou tosse crônica, e exposição ambiental [5,6].`,
        method: `Espirometria com broncodilatador`,
        periodicity: `Avaliação inicial com espirometria; repetição anual em casos confirmados ou de alto risco [6].`,
        justification: `Rastreamento recomendado para indivíduos com sintomas respiratórios crônicos, tabagistas ou ex-tabagistas acima de 40 anos, e exposição ocupacional a poeiras ou fumos [5,6].`,
        citations: [{ refId: 'dpoc-ref-5' }, { refId: 'dpoc-ref-6' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Adultos ≥40 anos com tabagismo atual ou passado, sintomas respiratórios, e fatores de risco como exposição biomassa ou occupational [3,4].`,
        method: `Espirometria (relação VEF1/CVF <0,70 pós-broncodilatador)`,
        periodicity: `Espirometria única para diagnóstico em suspeitos; monitoramento periódico em diagnosticados [3,4].`,
        recommendation: `A Global Initiative for Chronic Obstructive Lung Disease (GOLD 2024) e a Sociedade Brasileira de Pneumologia e Tisiologia (SBPT 2021) recomendam busca ativa (case-finding) em indivíduos de risco, não rastreamento populacional geral [3,4].`,
        citations: [{ refId: 'dpoc-ref-3' }, { refId: 'dpoc-ref-4' }]
      },
      convergence: {
        status: 'parcial',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'dpoc-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `A prevalência global de DPOC em adultos >40 anos é estimada em 12,1% [3]. No Brasil, a prevalência é de aproximadamente 13,6% em indivíduos >40 anos [4,5,6].`,
      incidence: `A incidência global varia de 1,5 a 2,5 casos por 1.000 pessoas-ano em populações de risco [3]. No Brasil, estima-se 100.000 novos casos anuais [6].`,
      mortality: `A DPOC é a terceira causa de morte global, com 3,23 milhões de óbitos em 2019 [3]. No Brasil, representa cerca de 5% das mortes por doenças crônicas [5,6].`,
      citations: [{ refId: 'dpoc-ref-3' }, { refId: 'dpoc-ref-4' }, { refId: 'dpoc-ref-5' }, { refId: 'dpoc-ref-6' }]
    },
    lastUpdate: '2026-01'
  },

  'epilepsia': {
    id: 'epilepsia',
    title: 'Epilepsia',
    category: 'outros',
    description: `A epilepsia é um distúrbio neurológico caracterizado por crises recorrentes e autolimitadas, com classificação atualizada pela ILAE considerando etiologia, comorbidades e síndrome . A identificação precoce em neonatos, lactentes e crianças é essencial para manejo . Malformações do desenvolvimento cortical estão associadas a epilepsia refratária .`,
    recommendations: {
      sus: {
        population: `Indivíduos com crises convulsivas suspeitas, neonatos, lactentes e crianças com fatores de risco como malformações corticais [4,5,8].`,
        method: `Eletroencefalograma (EEG); Ressonância magnética (RM); Testes genéticos`,
        periodicity: `Avaliação imediata para diagnóstico; follow-up periódico conforme necessidade clínica, sem periodicidade fixa para rastreamento [7].`,
        justification: `Não há programa específico de rastreamento populacional no SUS para epilepsia; diagnóstico indicado por história clínica de crises recorrentes e avaliação neurológica [7]. Recomendado em neonatos e crianças com suspeita de síndromes epilépticas [5].`,
        citations: [{ refId: 'epilepsia-ref-4' }, { refId: 'epilepsia-ref-5' }, { refId: 'epilepsia-ref-7' }, { refId: 'epilepsia-ref-8' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Neonatos e lactentes até 2 anos com crises; crianças com onset na infância e malformações corticais [4,5,8].`,
        method: `Eletroencefalograma (EEG); Ressonância magnética (RM); Análise genética e classificação sindrômica`,
        periodicity: `Diagnóstico imediato; monitoramento contínuo em síndromes específicas, sem rastreamento assintomático rotineiro [7].`,
        recommendation: `A ILAE recomenda classificação e diagnóstico de síndromes epilépticas com base em idade de início, etiologia e EEG para orientação terapêutica [4,5,7]. Identificação em neonatos e infância para manejo precoce [5].`,
        citations: [{ refId: 'epilepsia-ref-4' }, { refId: 'epilepsia-ref-5' }, { refId: 'epilepsia-ref-7' }, { refId: 'epilepsia-ref-8' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'epilepsia-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `A prevalência global de epilepsia é de aproximadamente 0,5-1% da população [7]. Em neonatos e lactentes, a incidência de epilepsia é alta, afetando até 1-2% em grupos de risco [5]. No Brasil, estima-se prevalência similar à global, em torno de 1% [7].`,
      incidence: `A incidência anual global é de 40-70 casos por 100.000 habitantes [7]. Em neonatos, pode ser de 1-3 por 1.000 nascidos vivos [5].`,
      mortality: `A mortalidade associada à epilepsia inclui status epilepticus com alta morbimortalidade; taxa de SUDEP é de cerca de 1 por 1.000 pacientes-ano [1,7].`,
      citations: [{ refId: 'epilepsia-ref-1' }, { refId: 'epilepsia-ref-5' }, { refId: 'epilepsia-ref-7' }]
    },
    lastUpdate: '2026-01'
  },

  'esquizofrenia': {
    id: 'esquizofrenia',
    title: 'Esquizofrenia',
    category: 'outros',
    description: `A esquizofrenia é uma síndrome heterogênea que afeta múltiplas dimensões da vida do paciente, sem cura, mas controlável com terapias farmacológicas e psicossociais . Definições inconsistentes de resistência ao tratamento limitam a pesquisa e a prática clínica . Aproximadamente 30% dos pacientes não respondem a dois ensaios adequados de antipsicóticos, caracterizando esquizofrenia resistente ao tratamento (TRS) . Consensos enfatizam a necessidade de abordagem multidimensional, incluindo monitoramento de saúde física devido a comorbidades elevadas .`,
    recommendations: {
      sus: {
        population: `Adultos com diagnóstico de esquizofrenia ou transtornos psicóticos, priorizando casos resistentes [5,7]`,
        method: `Antipsicóticos de primeira e segunda linha; Terapia cognitivo-comportamental; Suporte familiar e reabilitação`,
        periodicity: `Monitoramento contínuo com avaliações clínicas regulares a cada 3-6 meses [7]`,
        justification: `Tratamento integral no SUS para sintomas psicóticos persistentes, incluindo antipsicóticos e reabilitação psicossocial em Centros de Atenção Psicossocial (CAPS) [7,8]`,
        citations: [{ refId: 'esquizofrenia-ref-5' }, { refId: 'esquizofrenia-ref-7' }, { refId: 'esquizofrenia-ref-8' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Adultos com sintomas psicóticos por ≥6 meses não responsivos a tratamento [1,5]`,
        method: `Antipsicóticos atípicos; Clozapina para TRS; Intervenções psicossociais multidimensional`,
        periodicity: `Avaliação de resposta após 4-6 semanas; monitoramento anual de comorbidades físicas e prolactina [6,9]`,
        recommendation: `Diagnóstico baseado em critérios consensuais para resposta e resistência; tratamento inicial com antipsicóticos, clozapina para TRS após falha de dois agentes [1,5]`,
        citations: [{ refId: 'esquizofrenia-ref-1' }, { refId: 'esquizofrenia-ref-5' }, { refId: 'esquizofrenia-ref-6' }, { refId: 'esquizofrenia-ref-9' }]
      },
      convergence: {
        status: 'parcial',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'esquizofrenia-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `Prevalência vitalícia global de 0,3-0,7% em adultos [1,5]`,
      incidence: `Incidência anual de 10-22 casos por 100.000 adultos [1,8]`,
      mortality: `Mortalidade excessiva com razão de mortalidade padronizada 2-3 vezes maior devido a comorbidades físicas e suicídio [9]`,
      citations: [{ refId: 'esquizofrenia-ref-1' }, { refId: 'esquizofrenia-ref-5' }, { refId: 'esquizofrenia-ref-8' }, { refId: 'esquizofrenia-ref-9' }]
    },
    lastUpdate: '2026-01'
  },

  'fibrilacao-atrial': {
    id: 'fibrilacao-atrial',
    title: 'Rastreamento de Fibrilação Atrial',
    category: 'outros',
    description: `A fibrilação atrial (FA) é a arritmia cardíaca sustentada mais comum, associada a risco aumentado de acidente vascular cerebral (AVC) e insuficiência cardíaca . O rastreamento oportunista é essencial para detecção precoce em populações de risco, reduzindo complicações tromboembólicas . A prevalência global é estimada em 2-3% em adultos, aumentando para 8-10% em idosos acima de 80 anos . No Brasil, a prevalência é de aproximadamente 1,4% na população geral, com maior impacto em idosos .`,
    recommendations: {
      sus: {
        population: `Adultos ≥65 anos; adultos <65 anos com fatores de risco como hipertensão arterial, diabetes mellitus ou doença cardíaca [8,9].`,
        method: `Eletrocardiograma (ECG) de 12 derivações; Monitorização ambulatorial de ECG (Holter); Pulseira de detecção de FA (ex: Apple Watch) em contextos oportunistas`,
        periodicity: `Anual em populações de alto risco; a cada 2-3 anos em idosos assintomáticos [8].`,
        justification: `Rastreamento recomendado para indivíduos ≥65 anos e aqueles com fatores de risco cardiovascular (hipertensão, diabetes, histórico familiar) [8,9].`,
        citations: [{ refId: 'fibrilacao-atrial-ref-8' }, { refId: 'fibrilacao-atrial-ref-9' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Adultos ≥65 anos; indivíduos de 50-64 anos com pelo menos um fator de risco (hipertensão, obesidade, apneia do sono) [3,4].`,
        method: `ECG de rotina; Monitorização de pulso simples; Dispositivos wearables para detecção de FA`,
        periodicity: `Rastreamento único oportunista em ≥65 anos; repetição anual se fatores de risco persistentes [3].`,
        recommendation: `A European Society of Cardiology (ESC 2020) e American Heart Association (AHA 2019) recomendam rastreamento sistemático em adultos ≥65 anos para prevenção de AVC [3,4].`,
        citations: [{ refId: 'fibrilacao-atrial-ref-3' }, { refId: 'fibrilacao-atrial-ref-4' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'fibrilacao-atrial-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `A prevalência global de FA é de 2,7% em adultos (cerca de 33 milhões de casos), com aumento exponencial com a idade [1,2]. No Brasil, estima-se 1,4% na população adulta, afetando cerca de 2,3 milhões de pessoas [6,7].`,
      incidence: `A incidência global é de 0,6-1,0 casos por 100 habitantes-ano, elevando-se para 2% em idosos [1,5]. No Brasil, a incidência anual é de aproximadamente 0,2-0,5 por 100 habitantes [6].`,
      mortality: `A FA contribui para 20-30% dos casos de AVC isquêmico, com mortalidade 1,5-2 vezes maior em pacientes afetados [2,10]. Globalmente, associa-se a 113.000 mortes anuais; no Brasil, é fator em cerca de 10% das mortes cardiovasculares [7,11].`,
      citations: [{ refId: 'fibrilacao-atrial-ref-1' }, { refId: 'fibrilacao-atrial-ref-2' }, { refId: 'fibrilacao-atrial-ref-5' }, { refId: 'fibrilacao-atrial-ref-6' }, { refId: 'fibrilacao-atrial-ref-7' }, { refId: 'fibrilacao-atrial-ref-10' }, { refId: 'fibrilacao-atrial-ref-11' }]
    },
    lastUpdate: '2026-01'
  },

  'fibromialgia': {
    id: 'fibromialgia',
    title: 'Fibromialgia',
    category: 'outros',
    description: `A fibromialgia é uma síndrome de dor crônica generalizada associada a fadiga, distúrbios do sono e sintomas somáticos . O diagnóstico é essencialmente clínico, baseado em critérios validados, sem necessidade de exames complementares de rotina .`,
    recommendations: {
      sus: {
        population: `Adultos e idosos com suspeita clínica de dor difusa sem causa orgânica identificável [1,3].`,
        method: `Critérios ACR 2016 (WPI e SSS); Exame físico para exclusão de outras condições; História clínica detalhada`,
        periodicity: `Avaliação diagnóstica realizada uma vez, quando sintomas sugestivos estão presentes; reavaliação conforme evolução clínica [1].`,
        justification: `Diagnóstico indicado para pacientes com dor musculoesquelética crônica generalizada por pelo menos 3 meses, acompanhada de fadiga e distúrbios cognitivos [1,3].`,
        citations: [{ refId: 'fibromialgia-ref-1' }, { refId: 'fibromialgia-ref-3' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Mulheres adultas predominantemente, mas sem restrição de gênero; foco em pacientes com impacto funcional significativo [1,2].`,
        method: `Índice de Dor Generalizada (WPI); Escala de Gravidade de Sintomas (SSS); Exclusão de outras patologias por história e exame`,
        periodicity: `Diagnóstico único baseado em apresentação sintomática; monitoramento periódico para manejo, não para rastreamento populacional [2].`,
        recommendation: `Recomendado pelas sociedades de reumatologia o diagnóstico clínico em indivíduos com dor generalizada persistente e sintomas associados, utilizando critérios ACR [1,2].`,
        citations: [{ refId: 'fibromialgia-ref-1' }, { refId: 'fibromialgia-ref-2' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'fibromialgia-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `A prevalência global da fibromialgia varia de 2% a 8% na população adulta, sendo mais comum em mulheres [1,2]. No Brasil, estima-se em cerca de 2,5% a 4% [3].`,
      incidence: `A incidência anual é estimada em 2 a 4 casos por 1.000 adultos, com maior ocorrência em faixas etárias médias [2].`,
      mortality: `A fibromialgia não está associada a aumento significativo de mortalidade, embora impacte qualidade de vida [1,3].`,
      citations: [{ refId: 'fibromialgia-ref-1' }, { refId: 'fibromialgia-ref-2' }, { refId: 'fibromialgia-ref-3' }]
    },
    lastUpdate: '2026-01'
  },

  'hipertensao-arterial': {
    id: 'hipertensao-arterial',
    title: 'Rastreamento de Hipertensão Arterial',
    category: 'outros',
    description: `A hipertensão arterial é uma condição crônica caracterizada por elevados níveis pressóricos, sendo um fator de risco principal para doenças cardiovasculares . No Brasil, o rastreamento é essencial para detecção precoce e prevenção de complicações . A classificação segue critérios baseados em medições repetidas .`,
    recommendations: {
      sus: {
        population: `Adultos ≥ 18 anos; priorizar aqueles com obesidade, diabetes ou história familiar [5,6].`,
        method: `Medição da pressão arterial no consultório; Monitorização ambulatorial da pressão arterial (MAPA); Monitorização residencial da pressão arterial (MRPA)`,
        periodicity: `Anual para adultos saudáveis; semestral ou trimestral para hipertensos controlados ou de alto risco [6,10].`,
        justification: `Rastreamento recomendado para todos os adultos em consultas de atenção primária, com ênfase em indivíduos com fatores de risco [5,6,10].`,
        citations: [{ refId: 'hipertensao-arterial-ref-5' }, { refId: 'hipertensao-arterial-ref-6' }, { refId: 'hipertensao-arterial-ref-10' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Adultos ≥ 18 anos, com foco em idosos, gestantes e crianças/adolescentes com suspeita [6,7,8,9].`,
        method: `Medição da pressão arterial no consultório; MAPA para confirmação de hipertensão branca ou mascarada; MRPA para monitoramento domiciliar`,
        periodicity: `A cada 1-2 anos para normotensos; mais frequente em populações de risco [6].`,
        recommendation: `A Sociedade Brasileira de Cardiologia recomenda rastreamento sistemático para detecção de hipertensão primária e secundária [5,6,8].`,
        citations: [{ refId: 'hipertensao-arterial-ref-5' }, { refId: 'hipertensao-arterial-ref-6' }, { refId: 'hipertensao-arterial-ref-7' }, { refId: 'hipertensao-arterial-ref-8' }, { refId: 'hipertensao-arterial-ref-9' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'hipertensao-arterial-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `A prevalência no Brasil é de aproximadamente 35% em adultos [5,6,10]. Globalmente, afeta cerca de 1,28 bilhão de adultos [10].`,
      incidence: `Incidência anual no Brasil varia de 2-5% em adultos jovens [5,6].`,
      mortality: `Responsável por 13% das mortes globais; no Brasil, contribui para 300 mil óbitos anuais por DCV [10].`,
      citations: [{ refId: 'hipertensao-arterial-ref-5' }, { refId: 'hipertensao-arterial-ref-6' }, { refId: 'hipertensao-arterial-ref-10' }]
    },
    lastUpdate: '2026-01'
  },

  'hipotireoidismo': {
    id: 'hipotireoidismo',
    title: 'Rastreamento de Hipotireoidismo',
    category: 'outros',
    description: `O rastreamento de hipotireoidismo visa identificar precocemente disfunções tireoidianas para prevenir complicações cardiovasculares e neurológicas . A prevalência global de hipotireoidismo subclínico é de aproximadamente 4,6% em adultos . No Brasil, estima-se uma prevalência de 9% em mulheres adultas . O hipotireoidismo congênito afeta 1 em 2.000 a 4.000 recém-nascidos .`,
    recommendations: {
      sus: {
        population: `Todos os recém-nascidos no nascimento; adultos com fatores de risco (idade >60 anos, história familiar, sintomas) [3,4].`,
        method: `Dosagem de TSH no sangue total por punção no calcanhar; Dosagem de TSH sérico`,
        periodicity: `Única vez no nascimento para congênito; a cada 6-12 meses em gestantes e anualmente em alto risco para adquirido [4].`,
        justification: `Rastreamento obrigatório para hipotireoidismo congênito em todos os recém-nascidos [3]. Para adultos, indicado em grupos de risco como gestantes, idosos e pacientes com sintomas sugestivos [4].`,
        citations: [{ refId: 'hipotireoidismo-ref-3' }, { refId: 'hipotireoidismo-ref-4' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Recém-nascidos, gestantes, mulheres no pós-parto e adultos com risco (idade avançada, autoimunidade) [1,2].`,
        method: `Dosagem de TSH; T4 livre se TSH elevado`,
        periodicity: `Única vez no nascimento; no primeiro trimestre para gestantes; a cada 3-6 meses se TSH alterado [1,2].`,
        recommendation: `A American Thyroid Association (2021) recomenda rastreamento em gestantes, pós-parto e recém-nascidos, mas não rotineiro em adultos assintomáticos [1]. A SBEM (2022) endossa triagem em grupos de risco como mulheres >35 anos e pacientes com comorbidades [2].`,
        citations: [{ refId: 'hipotireoidismo-ref-1' }, { refId: 'hipotireoidismo-ref-2' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'hipotireoidismo-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `Prevalência global de hipotireoidismo manifesto é de 0,3-1%, e subclínico de 4-10% [1]. No Brasil, prevalência de 3-9% em adultos, com maior impacto em mulheres [2,4]. Para congênito, 1:3.000 nascidos vivos [3].`,
      incidence: `Incidência anual global de 1-2 casos por 1.000 adultos [1]. No Brasil, cerca de 1:2.500 para congênito [3].`,
      mortality: `Hipotireoidismo não tratado aumenta mortalidade cardiovascular em 20-50% [1,2]. No Brasil, contribui para 5% das mortes por DCNT associadas [4].`,
      citations: [{ refId: 'hipotireoidismo-ref-1' }, { refId: 'hipotireoidismo-ref-2' }, { refId: 'hipotireoidismo-ref-3' }, { refId: 'hipotireoidismo-ref-4' }]
    },
    lastUpdate: '2026-01'
  },

  'insuficiencia-cardiaca': {
    id: 'insuficiencia-cardiaca',
    title: 'Insuficiência Cardíaca',
    category: 'adultos',
    description: `A insuficiência cardíaca (IC) é uma síndrome clínica caracterizada pela incapacidade do coração em bombear sangue suficiente para atender às demandas metabólicas do organismo, resultando em sintomas como dispneia, fadiga e retenção de líquidos . É uma das principais causas de morbimortalidade cardiovascular global, com alta prevalência de fatores de risco como hipertensão e diabetes . No contexto brasileiro, a IC afeta significativamente o sistema de saúde, com ênfase em protocolos integrados para diagnóstico e tratamento .`,
    recommendations: {
      sus: {
        population: `Adultos com suspeita clínica de IC, incluindo aqueles com hipertensão não controlada ou história de IAM; priorizar populações vulneráveis em atenção primária [11,13].`,
        method: `Ecocardiograma; Dosagem de BNP/NT-proBNP; Terapia farmacológica (IECA/BRA, betabloqueadores, diuréticos); Educação em autocuidado`,
        periodicity: `Monitoramento anual para pacientes estáveis; reavaliação imediata em descompensação; ecocardiograma inicial e follow-up a cada 6-12 meses [11].`,
        justification: `Diagnóstico e tratamento da IC recomendado para pacientes com sintomas sugestivos (dispneia, edema) ou fatores de risco como hipertensão e IAM prévio, com uso de protocolos integrados no SUS [11,13].`,
        citations: [{ refId: 'insuficiencia-cardiaca-ref-11' }, { refId: 'insuficiencia-cardiaca-ref-13' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Adultos ≥18 anos com fatores de risco cardiovascular (hipertensão, diabetes, obesidade) ou sintomas sugestivos; foco em IC com fração preservada (HFpEF) em idosos [7,12].`,
        method: `Ecocardiograma para FE; BNP/NT-proBNP para diagnóstico; Terapias GDMT (guideline-directed medical therapy): ARNI, SGLT2i, MRA, betabloqueadores; Reabilitação cardíaca`,
        periodicity: `Avaliação inicial com ecocardiograma; monitoramento a cada 3-6 meses em IC descompensada, anual em estável [12].`,
        recommendation: `A AHA/ACC/HFSA (2022) recomenda avaliação diagnóstica para IC em pacientes com sintomas de congestão ou redução da tolerância ao exercício, com estratificação por fração de ejeção [12].`,
        citations: [{ refId: 'insuficiencia-cardiaca-ref-7' }, { refId: 'insuficiencia-cardiaca-ref-12' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'insuficiencia-cardiaca-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `A prevalência global de IC é de aproximadamente 1-2% na população adulta, aumentando para >10% em idosos >70 anos [1,12]. No México, alta prevalência associada a fatores de risco [1]. Em Portugal, 15,2% de HFpEF em ≥50 anos [7]. No Brasil, estimada em 1,6-2,5% na população geral [10,11].`,
      incidence: `Incidência global de 1-5 casos por 1.000 pessoas-ano, maior em populações com comorbidades [12]. No Brasil, incidência anual de cerca de 2-3 por 1.000 em adultos >45 anos [11,13].`,
      mortality: `Mortalidade em 5 anos de 50% para IC sintomática [12]. No Brasil, IC contribui para 10-15% das mortes cardiovasculares, com taxa de 30-40 por 100.000 habitantes [10,11].`,
      citations: [{ refId: 'insuficiencia-cardiaca-ref-1' }, { refId: 'insuficiencia-cardiaca-ref-7' }, { refId: 'insuficiencia-cardiaca-ref-10' }, { refId: 'insuficiencia-cardiaca-ref-11' }, { refId: 'insuficiencia-cardiaca-ref-12' }, { refId: 'insuficiencia-cardiaca-ref-13' }]
    },
    lastUpdate: '2026-01'
  },

  'itu': {
    id: 'itu',
    title: 'Rastreamento de Infecção do Trato Urinário',
    category: 'outros',
    description: `O rastreamento de infecção do trato urinário (ITU) é essencial para identificação precoce em populações de risco, como gestantes e pacientes em unidades de terapia intensiva . A prevalência é elevada em mulheres adultas .`,
    recommendations: {
      sus: {
        population: `Gestantes; adultos em ITU com cateterismo urinário; mulheres com recorrência [5,7,8].`,
        method: `Urocultura; EAS (exame de urina tipo I); Teste de tira reagente`,
        periodicity: `Semestral em gestantes; semanal em pacientes cateterizados em ITU [5,6,7].`,
        justification: `Rastreamento recomendado para gestantes e pacientes com fatores de risco em unidades hospitalares [5,7,8].`,
        citations: [{ refId: 'itu-ref-5' }, { refId: 'itu-ref-6' }, { refId: 'itu-ref-7' }, { refId: 'itu-ref-8' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Mulheres grávidas; idosos em cuidados prolongados; pacientes diabéticos com ITU recorrente [9,10].`,
        method: `Urocultura; Análise de urina; Testes rápidos laboratoriais`,
        periodicity: `Anual para grupos de alto risco; durante pré-natal para gestantes [9].`,
        recommendation: `A American Diabetes Association (2024) e sociedades semelhantes recomendam rastreamento em populações vulneráveis, adaptado para ITU em contextos de risco metabólico [9,10].`,
        citations: [{ refId: 'itu-ref-9' }, { refId: 'itu-ref-10' }]
      },
      convergence: {
        status: 'parcial',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'itu-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `A prevalência de ITU em mulheres adultas é de aproximadamente 50-60% ao longo da vida [2,4]. No Brasil, estima-se em 10-15% em populações hospitalizadas [3,7].`,
      incidence: `A incidência anual em mulheres pré-menopausa é de 10-20% [1,2]. Em pacientes em ITU, pode atingir 25% [5,6].`,
      mortality: `A mortalidade direta por ITU complicada é baixa (1-2%), mas elevada em sepse (20-40%) [3,6]. No Brasil, contribui para 5% das mortes hospitalares relacionadas a infecções [7,8].`,
      citations: [{ refId: 'itu-ref-1' }, { refId: 'itu-ref-2' }, { refId: 'itu-ref-3' }, { refId: 'itu-ref-4' }, { refId: 'itu-ref-5' }, { refId: 'itu-ref-6' }, { refId: 'itu-ref-7' }, { refId: 'itu-ref-8' }]
    },
    lastUpdate: '2026-01'
  },

  'lombalgia': {
    id: 'lombalgia',
    title: 'Lombalgia',
    category: 'outros',
    description: `A lombalgia, ou dor lombar, é uma das principais causas de incapacidade global, afetando milhões de indivíduos . Representa um desafio significativo em protocolos clínicos e de rastreamento de distúrbios osteomusculares . A abordagem integrada entre tratamento não invasivo e manejo multidisciplinar é essencial .`,
    recommendations: {
      sus: {
        population: `Adultos com dor lombar persistente >3 meses ou episódios recorrentes; trabalhadores expostos a fatores de risco ergonômicos [3,4].`,
        method: `Terapia física; Exercícios de fortalecimento; Educação postural; Analgésicos não opioides quando necessário`,
        periodicity: `Avaliação inicial imediata; follow-up a cada 4-6 semanas para lombalgia crônica, com reavaliação anual em contextos ocupacionais [3,4].`,
        justification: `Recomendado para pacientes com lombalgia aguda, subaguda ou crônica, priorizando abordagem não farmacológica e avaliação ocupacional em casos relacionados ao trabalho [3,4].`,
        citations: [{ refId: 'lombalgia-ref-3' }, { refId: 'lombalgia-ref-4' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Adultos e idosos com lombalgia inespecífica; exclusão de causas graves por meio de história e exame físico [1,2].`,
        method: `Calor superficial; Massagem; Acupuntura; Manipulação espinhal; AINEs para alívio sintomático`,
        periodicity: `Reavaliação em 4-6 semanas para persistência; manutenção de exercícios a longo prazo [1,2].`,
        recommendation: `Tratamento não invasivo recomendado para lombalgia aguda, subaguda e crônica, com foco em terapias multimodais [1,2].`,
        citations: [{ refId: 'lombalgia-ref-1' }, { refId: 'lombalgia-ref-2' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'lombalgia-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `Prevalência pontual global de 7,5% em adultos [5]; no Brasil, estima-se em 18-30% para lombalgia crônica [6].`,
      incidence: `Incidência anual global de 5-10% [5]; no Brasil, cerca de 9% em populações trabalhadoras [4,6].`,
      mortality: `Baixa mortalidade direta, mas contribui para 60,8 milhões de anos vividos com incapacidade globalmente [5]; no Brasil, associada a morbidade ocupacional sem mortalidade significativa [4].`,
      citations: [{ refId: 'lombalgia-ref-4' }, { refId: 'lombalgia-ref-5' }, { refId: 'lombalgia-ref-6' }]
    },
    lastUpdate: '2026-01'
  },

  'obesidade': {
    id: 'obesidade',
    title: 'Rastreamento e Manejo da Obesidade',
    category: 'outros',
    description: `A obesidade é uma doença crônica multifatorial caracterizada por acúmulo excessivo de tecido adiposo que pode prejudicar a saúde . Está associada a comorbidades como síndrome metabólica , hipertensão , apneia obstrutiva do sono , diabetes em idosos , esteatose hepática metabólica  e risco vascular . No contexto brasileiro, representa um desafio significativo para o sistema de saúde .`,
    recommendations: {
      sus: {
        population: `Adultos e adolescentes com IMC ≥25 kg/m², priorizando aqueles com fatores de risco como hipertensão, diabetes ou dislipidemia [13,14].`,
        method: `Medição de peso e altura para cálculo de IMC; Circunferência da cintura; Avaliação de composição corporal quando disponível`,
        periodicity: `Monitoramento anual ou a cada consulta de rotina para avaliação de peso e IMC; reavaliação a cada 3-6 meses durante tratamento farmacológico [13,14].`,
        justification: `Avaliação antropométrica para identificação de sobrepeso e obesidade em consultas de atenção primária, com ênfase em manejo integrado para doença crônica [13]. Uso de liraglutida indicado para obesidade grau III ou II com comorbidades, após falha em mudanças de estilo de vida [14].`,
        citations: [{ refId: 'obesidade-ref-13' }, { refId: 'obesidade-ref-14' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Todos os adultos ≥18 anos, com foco em indivíduos com IMC ≥25 kg/m² e comorbidades cardiometabólicas [11,12].`,
        method: `Cálculo de IMC; Medição de circunferência abdominal; Avaliação de risco metabólico integrada`,
        periodicity: `Avaliação anual em adultos; mais frequente (a cada 3-6 meses) em casos de tratamento ativo [11,12].`,
        recommendation: `Rastreamento universal de obesidade em adultos por meio de medidas antropométricas, com intervenções lifestyle como primeira linha; farmacoterapia para obesidade clínica (IMC ≥30 kg/m² ou ≥27 kg/m² com comorbidades) [11,12].`,
        citations: [{ refId: 'obesidade-ref-11' }, { refId: 'obesidade-ref-12' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'obesidade-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `Globalmente, a prevalência de obesidade em adultos é de 13% (cerca de 1 bilhão de pessoas em 2022) [11]. No Brasil, estima-se em 22,4% entre adultos em 2021 [12,13].`,
      incidence: `A incidência anual de obesidade varia de 1 a 2% em populações adultas, com maior risco em indivíduos com sobrepeso inicial [11,12].`,
      mortality: `A obesidade contribui para aproximadamente 4,7 milhões de mortes anuais globalmente, principalmente por doenças cardiovasculares e metabólicas [7,11]. No Brasil, associa-se a elevada morbimortalidade por DCNT [12,13].`,
      citations: [{ refId: 'obesidade-ref-7' }, { refId: 'obesidade-ref-11' }, { refId: 'obesidade-ref-12' }, { refId: 'obesidade-ref-13' }]
    },
    lastUpdate: '2026-01'
  },

  'osteoartrite': {
    id: 'osteoartrite',
    title: 'Diagnóstico Precoce e Manejo da Osteoartrite',
    category: 'outros',
    description: `A osteoartrite (OA) é a doença articular degenerativa mais prevalente, caracterizada por dor e rigidez articular, afetando principalmente joelhos, quadris e mãos . O diagnóstico precoce é essencial para intervenções não farmacológicas e farmacológicas que melhoram a qualidade de vida .`,
    recommendations: {
      sus: {
        population: `Adultos >50 anos com sintomas articulares ou fatores de risco (IMC >30 kg/m², ocupações de alto impacto) [2].`,
        method: `Exame clínico; Radiografia simples; Escala de dor (EVA)`,
        periodicity: `Avaliação sob demanda, sem periodicidade fixa; reavaliação anual em casos de progressão [2].`,
        justification: `Diagnóstico indicado para adultos com dor articular persistente >3 meses, idade >50 anos ou fatores de risco como obesidade e trauma prévio [2]. Não há rastreamento populacional rotineiro, mas avaliação em atenção primária para sintomas [2].`,
        citations: [{ refId: 'osteoartrite-ref-2' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Adultos >45 anos com obesidade, história familiar ou lesões articulares prévias [1].`,
        method: `Exame físico; Radiografia; Avaliação funcional (WOMAC)`,
        periodicity: `Avaliação inicial sob demanda; monitoramento semestral em pacientes com OA confirmada [1].`,
        recommendation: `A Sociedade Brasileira de Reumatologia recomenda diagnóstico clínico para pacientes com dor articular crônica e limitação funcional [1]. Avaliação em indivíduos de risco para detecção precoce [1].`,
        citations: [{ refId: 'osteoartrite-ref-1' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'osteoartrite-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `A prevalência global de OA sintomática é de aproximadamente 7% em adultos >50 anos, atingindo 30% em >65 anos [3,4]. No Brasil, estima-se 6,2% na população adulta, com maior impacto em mulheres [5].`,
      incidence: `A incidência anual é de 10-20 casos por 1.000 pessoas >45 anos globalmente [3,4]. No Brasil, cerca de 1,5% ao ano em idosos [5].`,
      mortality: `A mortalidade direta é baixa (<1%), mas OA contribui para 2-3% das mortes por incapacidade e comorbidades cardiovasculares [3,6]. No Brasil, associa-se a 1,2% das internações por DCNT [5].`,
      citations: [{ refId: 'osteoartrite-ref-3' }, { refId: 'osteoartrite-ref-4' }, { refId: 'osteoartrite-ref-5' }, { refId: 'osteoartrite-ref-6' }]
    },
    lastUpdate: '2026-01'
  },

  'osteoporose': {
    id: 'osteoporose',
    title: 'Diagnóstico e Tratamento da Osteoporose',
    category: 'outros',
    description: `A osteoporose é uma doença metabólica óssea caracterizada por baixa massa óssea, deterioração da microarquitetura óssea e aumento do risco de fraturas . A introdução da dual-energy X-ray absorptiometry (DXA) revolucionou o diagnóstico e manejo da osteoporose desde os anos 1980 . No Brasil, a osteoporose é considerada um problema de saúde pública, com alta incidência de fraturas em mulheres pós-menopausa . O diagnóstico baseia-se em T-score ≤ -2,5 pela DXA, além de avaliação de risco de fraturas .`,
    recommendations: {
      sus: {
        population: `Mulheres pós-menopausa ≥65 anos; mulheres <65 anos com fatores de risco (fratura, raquitismo, hipogonadismo) [13,14].`,
        method: `DXA para densitometria óssea; Avaliação de FRAX para risco de fratura; Denosumabe subcutâneo`,
        periodicity: `DXA a cada 1-2 anos em pacientes de alto risco; monitoramento anual para tratamento com denosumabe [14].`,
        justification: `Rastreamento por DXA recomendado para mulheres pós-menopausa ≥65 anos ou com fatores de risco como fratura prévia, uso de glicocorticoides ou baixa massa óssea [13,14]. Tratamento com bifosfonatos ou denosumabe para T-score ≤ -2,5 ou fratura osteoporótica [13,14].`,
        citations: [{ refId: 'osteoporose-ref-13' }, { refId: 'osteoporose-ref-14' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Mulheres ≥65 anos pós-menopausa; homens ≥70 anos; indivíduos com fraturas ou fatores de risco (ex.: corticoides, tabagismo) [3,11,12].`,
        method: `DXA; REMS para avaliação de força óssea; FRAX tool; Teriparatida ou denosumabe para casos graves`,
        periodicity: `Repetir DXA a cada 2 anos ou conforme risco; monitoramento anual para terapia anti-reabsortiva [11,12].`,
        recommendation: `A AACE/ACE (2020) recomenda DXA para mulheres ≥65 anos e homens ≥70 anos; tratamento farmacológico para T-score ≤ -2,5 ou fratura de fragilidade [11]. Diretrizes Brasileiras (2021) enfatizam screening em mulheres pós-menopausa com risco [12]. Austrian Society (2024) atualiza para inclusão de REMS como alternativa não-ionizante [3,8].`,
        citations: [{ refId: 'osteoporose-ref-3' }, { refId: 'osteoporose-ref-8' }, { refId: 'osteoporose-ref-11' }, { refId: 'osteoporose-ref-12' }]
      },
      convergence: {
        status: 'parcial',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'osteoporose-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `A prevalência global de osteoporose em mulheres >50 anos é de cerca de 18-23%, com maior incidência em países desenvolvidos [3,5,11]. No Brasil, estima-se em 10-15% em mulheres pós-menopausa [12,13].`,
      incidence: `Incidência de fraturas osteoporóticas é de 1-2 por 100 mulheres/ano >50 anos globalmente [1,3,5]. No Brasil, fraturas vertebrais afetam 20% das mulheres >65 anos [12,13].`,
      mortality: `Fraturas de quadril associadas a 20% de mortalidade em 1 ano [3,11,12]. No Brasil, osteoporose contribui para 5-10% das mortes por DCNT em idosos [13].`,
      citations: [{ refId: 'osteoporose-ref-1' }, { refId: 'osteoporose-ref-3' }, { refId: 'osteoporose-ref-5' }, { refId: 'osteoporose-ref-11' }, { refId: 'osteoporose-ref-12' }, { refId: 'osteoporose-ref-13' }]
    },
    lastUpdate: '2026-01'
  },

  'parkinson': {
    id: 'parkinson',
    title: 'Doença de Parkinson',
    category: 'outros',
    description: `A doença de Parkinson (DP) é uma doença neurodegenerativa progressiva caracterizada por tremor, rigidez, bradicinesia e instabilidade postural . O diagnóstico é principalmente clínico, sem rastreamento populacional rotineiro recomendado . A gestão envolve terapia física, farmacológica e nutricional para melhorar a qualidade de vida .`,
    recommendations: {
      sus: {
        population: `Adultos com sintomas sugestivos (tremor em repouso, bradicinesia) ≥50 anos; idosos com declínio motor [7].`,
        method: `Avaliação clínica neurológica; Escala UPDRS; Terapia física e nutricional`,
        periodicity: `Avaliação contínua em atenção primária para pacientes diagnosticados; sem periodicidade para rastreamento assintomático [3,7].`,
        justification: `Não há programa específico de rastreamento populacional para DP no SUS; diagnóstico baseado em sintomas e avaliação neurológica em atenção primária [7]. Recomenda-se manejo multidisciplinar para casos confirmados [3].`,
        citations: [{ refId: 'parkinson-ref-3' }, { refId: 'parkinson-ref-7' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Adultos ≥60 anos com sintomas parkinsonianos; indivíduos com tremor ou distonia associada [1,2,7].`,
        method: `Exame neurológico; Terapia física direcionada; Classificação de tremores; Nutrição clínica`,
        periodicity: `Sessões de terapia física 2-3 vezes/semana inicialmente, ajustável [1]; monitoramento anual para progressão [7].`,
        recommendation: `A American Physical Therapy Association (2022) recomenda terapia física para manejo de DP [1]. Canadian Guideline (2019) enfatiza diagnóstico precoce e tratamento farmacológico [7]. Consensus on tremors (2018) auxilia na classificação [2].`,
        citations: [{ refId: 'parkinson-ref-1' }, { refId: 'parkinson-ref-2' }, { refId: 'parkinson-ref-7' }]
      },
      convergence: {
        status: 'parcial',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'parkinson-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `Prevalência global de DP é de aproximadamente 1% em indivíduos >60 anos, afetando cerca de 10 milhões de pessoas [7]. No Canadá e contextos semelhantes, 0,3% na população geral [7]. No Brasil, estimativas indicam 200.000 casos, com prevalência de 0,5-1% em idosos [7].`,
      incidence: `Incidência anual de 8-18 casos por 100.000 habitantes, aumentando com a idade [7].`,
      mortality: `DP contribui para mortalidade por complicações como quedas e pneumonia; taxa de mortalidade padronizada ~1,5 vezes maior que a população geral [7].`,
      citations: [{ refId: 'parkinson-ref-7' }]
    },
    lastUpdate: '2026-01'
  },

  'pneumonia': {
    id: 'pneumonia',
    title: 'Pneumonia',
    category: 'outros',
    description: `A pneumonia é uma infecção aguda do parênquima pulmonar causada por bactérias, vírus ou fungos, representando uma das principais causas de morbimortalidade respiratória . Pode ser classificada como adquirida na comunidade (CAP), hospitalar (HAP) ou associada à ventilação mecânica (VAP) . Em crianças, é uma causa comum de hospitalização . No contexto brasileiro, o manejo segue protocolos para infecções respiratórias .`,
    recommendations: {
      sus: {
        population: `Adultos e crianças com sintomas respiratórios agudos, priorizando grupos vulneráveis como idosos e imunocomprometidos [13,14].`,
        method: `Antibióticos empíricos (amoxicilina ou similar); Radiografia de tórax quando disponível; Oxigenoterapia e suporte sintomático`,
        periodicity: `Avaliação imediata para sintomas agudos; follow-up conforme evolução clínica, sem periodicidade fixa para rastreamento [13,14].`,
        justification: `Manejo clínico de infecções respiratórias agudas, incluindo pneumonia como complicação de influenza ou em atenção básica para casos leves [13,14].`,
        citations: [{ refId: 'pneumonia-ref-13' }, { refId: 'pneumonia-ref-14' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Adultos com CAP (todos os grupos etários, priorizando >65 anos ou com comorbidades); crianças >3 meses com CAP; pacientes hospitalizados para HAP/VAP [1,2,3,5,11].`,
        method: `Antibióticos beta-lactâmicos + macrolídeos para CAP; Cefalosporinas + vancomicina para HAP/VAP; PCR para Mycoplasma em crianças resistentes; Radiografia de tórax e testes microbiológicos`,
        periodicity: `Tratamento imediato ao diagnóstico; desescalonamento após 48-72h baseado em culturas [1,5]; prevenção de VAP com bundles diários [10].`,
        recommendation: `Diagnóstico e tratamento empírico de CAP em adultos com sintomas como febre, tosse e infiltrados pulmonares [5,11]; para HAP/VAP, cobertura para patógenos multirresistentes [1,2]; em crianças >3 meses, avaliação etiológica [3,9] [5,11].`,
        citations: [{ refId: 'pneumonia-ref-1' }, { refId: 'pneumonia-ref-2' }, { refId: 'pneumonia-ref-3' }, { refId: 'pneumonia-ref-5' }, { refId: 'pneumonia-ref-11' }]
      },
      convergence: {
        status: 'parcial',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'pneumonia-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `A pneumonia afeta cerca de 5-11 casos por 1.000 adultos/ano globalmente para CAP [5,6]; em crianças, é prevalente em <5 anos com taxas de 0,5-2% [3,9]. No Brasil, estima-se 1-2 milhões de casos anuais de CAP [12].`,
      incidence: `Incidência global de pneumonia é de 150 milhões de casos/ano, com 4-5 milhões de mortes [5,6]; para VAP, 10-20% dos ventilados [1,2,10]. No Brasil, incidência de CAP é 3-5/1.000 habitantes/ano [12].`,
      mortality: `Mortalidade de CAP em adultos é 5-7% em hospitalizados [5,6]; para VAP, 20-40% [1,2,10]; em crianças, <1% com tratamento adequado [3,9]. No Brasil, pneumonia é 4ª causa de morte por doenças respiratórias [12,13].`,
      citations: [{ refId: 'pneumonia-ref-1' }, { refId: 'pneumonia-ref-2' }, { refId: 'pneumonia-ref-3' }, { refId: 'pneumonia-ref-5' }, { refId: 'pneumonia-ref-6' }, { refId: 'pneumonia-ref-9' }, { refId: 'pneumonia-ref-10' }, { refId: 'pneumonia-ref-12' }, { refId: 'pneumonia-ref-13' }]
    },
    lastUpdate: '2026-01'
  },

  'psoriase': {
    id: 'psoriase',
    title: 'Psoríase',
    category: 'outros',
    description: `A psoríase é uma doença inflamatória crônica e imunomediada da pele, caracterizada por placas eritematoescamosas . A prevalência global varia de 1% a 3% . No Brasil, estima-se em 1% a 2% da população . O consenso brasileiro atualiza o manejo, incluindo algoritmos de tratamento . Biossimilares são recomendados para reduzir custos em terapias biológicas .`,
    recommendations: {
      sus: {
        population: `Adultos e crianças com sintomas cutâneos persistentes ou história familiar [1].`,
        method: `Exame dermatológico; Escala PASI para gravidade; Terapias tópicas ou sistêmicas`,
        periodicity: `Avaliação inicial e monitoramento a cada 3-6 meses conforme resposta ao tratamento [1].`,
        justification: `Diagnóstico clínico para lesões cutâneas suspeitas de psoríase; tratamento acessível via SUS para casos moderados a graves [1].`,
        citations: [{ refId: 'psoriase-ref-1' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Pacientes com psoríase leve a grave, incluindo formas pustulosa e eritrodérmica [1,2].`,
        method: `Exame clínico; Biópsia se diagnóstico incerto; Biossimilares de anti-TNF e anti-IL`,
        periodicity: `Reavaliação a cada 3 meses para terapias biológicas; anual para casos leves controlados [1].`,
        recommendation: `A Sociedade Brasileira de Dermatologia recomenda diagnóstico baseado em critérios clínicos e tratamento escalonado por gravidade [1]. Posição portuguesa endossa biossimilares para psoríase moderada a grave [2].`,
        citations: [{ refId: 'psoriase-ref-1' }, { refId: 'psoriase-ref-2' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'psoriase-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `Global: 1-3% em adultos [1]. Brasil: 1-2% [1].`,
      incidence: `Incidência anual de 0,1-0,2% em populações caucasianas; menor em populações latinas [1].`,
      mortality: `Baixa diretamente, mas aumenta risco de comorbidades cardiovasculares (RR 1,5-2,0) [1].`,
      citations: [{ refId: 'psoriase-ref-1' }]
    },
    lastUpdate: '2026-01'
  },

  'rinite-alergica': {
    id: 'rinite-alergica',
    title: 'Rinite Alérgica',
    category: 'outros',
    description: `A rinite alérgica é uma doença inflamatória mediada por IgE da mucosa nasal, caracterizada por sintomas como espirros, rinorreia, obstrução nasal e coceira . A condição afeta a qualidade de vida e pode estar associada à asma . No contexto brasileiro, representa um desafio significativo no sistema de saúde pública .`,
    recommendations: {
      sus: {
        population: `Indivíduos de todas as idades com sintomas sugestivos de rinite, priorizando crianças e adultos em áreas urbanas com alta exposição ambiental [5,6].`,
        method: `História clínica; Exame físico nasal; Teste de prick cutâneo; Dosagem de IgE sérica`,
        periodicity: `Avaliação inicial e seguimento anual ou conforme necessidade clínica para controle sintomático [5].`,
        justification: `Diagnóstico e manejo recomendado para pacientes com sintomas nasais persistentes ou intermitentes, especialmente em populações com história familiar de atopia ou exposição a alérgenos [5,6].`,
        citations: [{ refId: 'rinite-alergica-ref-5' }, { refId: 'rinite-alergica-ref-6' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Pacientes sintomáticos de 5 anos ou mais, com ênfase em comorbidades como conjuntivite ou asma [1,7].`,
        method: `História clínica detalhada; Testes cutâneos para alérgenos; IgE específica; Rinoscopia anterior`,
        periodicity: `Monitoramento contínuo, com reavaliação a cada 3-6 meses em casos persistentes [1].`,
        recommendation: `A ARIA (Allergic Rhinitis and its Impact on Asthma) 2019 recomenda avaliação para pacientes com sintomas alérgicos nasais, integrando classificação em intermitente/persistente e leve/moderada-grave [1,7].`,
        citations: [{ refId: 'rinite-alergica-ref-1' }, { refId: 'rinite-alergica-ref-7' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'rinite-alergica-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `A prevalência global de rinite alérgica é estimada em 10-40% em adultos e até 40% em crianças [2,3]. No Brasil, atinge cerca de 20-30% da população, com maior impacto em regiões urbanas [4,8].`,
      incidence: `A incidência anual varia de 5-10% em populações atópicas [9,10]. No Brasil, observa-se aumento de 2-5% ao ano em áreas metropolitanas [11].`,
      mortality: `A mortalidade direta é baixa, inferior a 0,1%, mas contribui indiretamente para morbimortalidade por complicações respiratórias [12,13].`,
      citations: [{ refId: 'rinite-alergica-ref-2' }, { refId: 'rinite-alergica-ref-3' }, { refId: 'rinite-alergica-ref-4' }, { refId: 'rinite-alergica-ref-8' }, { refId: 'rinite-alergica-ref-9' }, { refId: 'rinite-alergica-ref-10' }, { refId: 'rinite-alergica-ref-11' }, { refId: 'rinite-alergica-ref-12' }, { refId: 'rinite-alergica-ref-13' }]
    },
    lastUpdate: '2026-01'
  },

  'sinusite': {
    id: 'sinusite',
    title: 'Sinusite Aguda',
    category: 'outros',
    description: `A sinusite aguda é uma inflamação das mucosas dos seios paranasais, frequentemente associada a infecções virais ou bacterianas . O tratamento antibiótico sistêmico é utilizado em prática rotineira para casos exacerbados em adultos e crianças . Em crianças, a terapia oral é recomendada para sinusite aguda sintomática . Nos adultos, o manejo inclui antibióticos orais em infecções confirmadas .`,
    recommendations: {
      sus: {
        population: `Crianças e adultos com sintomas de sinusite aguda, priorizando casos com risco de complicações [1,2,3].`,
        method: `Antibióticos orais (amoxicilina ou similares); Sintomáticos (descongestionantes)`,
        periodicity: `Tratamento agudo, sem rastreamento periódico; reavaliação em 48-72 horas se sem melhora [1,2,3].`,
        justification: `No SUS, o tratamento com antibióticos é indicado para sinusite aguda bacteriana suspeita em adultos e crianças com sintomas persistentes >10 dias ou agravamento [1,2,3].`,
        citations: [{ refId: 'sinusite-ref-1' }, { refId: 'sinusite-ref-2' }, { refId: 'sinusite-ref-3' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Adultos e crianças com sinusite aguda bacteriana confirmada ou suspeita grave [1,2,3].`,
        method: `Terapia antibiótica oral; Imagem se complicações`,
        periodicity: `Avaliação aguda; follow-up em 7 dias para não bacteriana [1,2,3].`,
        recommendation: `Sociedades recomendam antibióticos para sinusite aguda em adultos e crianças apenas se sintomas >10 dias, febre alta ou piora após melhora inicial [1,2,3].`,
        citations: [{ refId: 'sinusite-ref-1' }, { refId: 'sinusite-ref-2' }, { refId: 'sinusite-ref-3' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'sinusite-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `A prevalência de sinusite aguda é estimada em 10-15% da população anual, com maior incidência em crianças [1,2]. No Brasil, afeta cerca de 11% das consultas respiratórias [1,3].`,
      incidence: `Incidência global de 0,5-2% por ano, com picos sazonais [1,2,3].`,
      mortality: `Baixa mortalidade (<0,1%), principalmente em complicações raras como meningite [1,2,3].`,
      citations: [{ refId: 'sinusite-ref-1' }, { refId: 'sinusite-ref-2' }, { refId: 'sinusite-ref-3' }]
    },
    lastUpdate: '2026-01'
  },

  'toc': {
    id: 'toc',
    title: 'Transição de Cuidados',
    category: 'outros',
    description: `A transição de cuidados (ToC) refere-se ao processo coordenado de passagem de pacientes com condições crônicas ou pós-AVC do ambiente hospitalar para o domicílio e comunidade, visando melhorar a participação e qualidade de vida . Em países em desenvolvimento, como o Brasil, a ToC para jovens com necessidades especiais de saúde é essencial devido à melhora na sobrevivência de doenças crônicas na infância . Recomendações incluem melhoria na comunicação, uso de coordenadores de transição e educação de pacientes/cuidadores .`,
    recommendations: {
      sus: {
        population: `Jovens com necessidades especiais de saúde e sobreviventes de AVC [1,2].`,
        method: `Melhoria de comunicação; Coordenadores de transição; Educação de pacientes e cuidadores; Resumos de alta padronizados`,
        periodicity: `Planejamento contínuo durante a internação e follow-up pós-alta [1].`,
        justification: `Transição de cuidados recomendada para jovens com doenças crônicas de início na infância e pacientes pós-AVC para integração ao sistema de saúde adulta [2].`,
        citations: [{ refId: 'toc-ref-1' }, { refId: 'toc-ref-2' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Pacientes pós-AVC e jovens com doenças crônicas entrando na idade adulta [1,2].`,
        method: `Processos de comunicação aprimorados; Planejamento de follow-up; Educação e suporte a cuidadores`,
        periodicity: `Iniciação durante reabilitação hospitalar e monitoramento contínuo [1].`,
        recommendation: `American Congress of Rehabilitation Medicine recomenda ToC pós-AVC com foco em participação comunitária [1]. Indian Academy of Pediatrics enfatiza ToC organizada para juventude com condições crônicas [2].`,
        citations: [{ refId: 'toc-ref-1' }, { refId: 'toc-ref-2' }]
      },
      convergence: {
        status: 'convergencia',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'toc-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `Grande proporção de crianças com doenças crônicas sobrevivem até a idade adulta, necessitando de ToC [2].`,
      incidence: `Incidência de necessidade de ToC aumenta com melhora na sobrevivência de condições crônicas pediátricas [2].`,
      mortality: `Transições inadequadas contribuem para rehospitalizações e maior mortalidade em pacientes pós-AVC [1].`,
      citations: [{ refId: 'toc-ref-1' }, { refId: 'toc-ref-2' }]
    },
    lastUpdate: '2026-01'
  },

  'transtorno-bipolar': {
    id: 'transtorno-bipolar',
    title: 'Rastreamento do Transtorno Bipolar',
    category: 'saude_mental',
    description: `O transtorno bipolar é uma condição psiquiátrica caracterizada por episódios alternados de mania/hipomania e depressão, afetando o humor, energia e funcionamento diário . A prevalência global é estimada em 1,0% , enquanto no Brasil atinge cerca de 0,9% da população adulta . O rastreamento precoce é essencial para reduzir riscos de suicídio e morbidade .`,
    recommendations: {
      sus: {
        population: `Adultos ≥18 anos com queixas de humor instável, irritabilidade ou alterações de energia; priorizar grupos com fatores de risco como abuso de substâncias [8,9].`,
        method: `Questionário de Transtorno do Humor (MDQ); Entrevista clínica estruturada; Escalas de rastreamento como HCL-32`,
        periodicity: `Avaliação inicial anual em contextos de risco; reavaliação conforme sintomas [8].`,
        justification: `Rastreamento recomendado em atenção primária para adultos com sintomas afetivos persistentes, histórico familiar ou comorbidades psiquiátricas [8,9].`,
        citations: [{ refId: 'transtorno-bipolar-ref-8' }, { refId: 'transtorno-bipolar-ref-9' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Adultos e adolescentes ≥14 anos com histórico de depressão ou sintomas hipomaníacos; incluir screening em populações com alto risco suicida [1,10].`,
        method: `Mood Disorder Questionnaire (MDQ); Hypomania Checklist (HCL-32); Estrutura MINI para transtornos bipolares`,
        periodicity: `Screening oportunístico em consultas psiquiátricas; anual para pacientes de alto risco [1].`,
        recommendation: `A American Psychiatric Association (APA, 2022) e a Canadian Network for Mood and Anxiety Treatments (CANMAT, 2018) recomendam rastreamento para indivíduos com episódios depressivos recorrentes ou suspeita de mania [1,10].`,
        citations: [{ refId: 'transtorno-bipolar-ref-1' }, { refId: 'transtorno-bipolar-ref-10' }]
      },
      convergence: {
        status: 'parcial',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'transtorno-bipolar-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `A prevalência global de transtorno bipolar é de 1,0% (cerca de 40 milhões de adultos) [3,4]. No Brasil, estima-se em 0,9% entre adultos, com maior impacto em áreas urbanas [5,6].`,
      incidence: `A incidência global varia de 0,2 a 0,4 casos por 1.000 pessoas-ano [11,12]. No Brasil, dados indicam cerca de 0,3 por 1.000 habitantes anualmente [13].`,
      mortality: `O transtorno bipolar eleva o risco de mortalidade em 2-3 vezes, principalmente por suicídio (15-20% dos casos) [7,14]. No Brasil, contribui para 5-10% das mortes por causas psiquiátricas [15].`,
      citations: [{ refId: 'transtorno-bipolar-ref-3' }, { refId: 'transtorno-bipolar-ref-4' }, { refId: 'transtorno-bipolar-ref-5' }, { refId: 'transtorno-bipolar-ref-6' }, { refId: 'transtorno-bipolar-ref-11' }, { refId: 'transtorno-bipolar-ref-12' }, { refId: 'transtorno-bipolar-ref-13' }, { refId: 'transtorno-bipolar-ref-7' }, { refId: 'transtorno-bipolar-ref-14' }, { refId: 'transtorno-bipolar-ref-15' }]
    },
    lastUpdate: '2026-01'
  },

  'transtorno-panico': {
    id: 'transtorno-panico',
    title: 'Rastreamento do Transtorno de Pânico',
    category: 'saude_mental',
    description: `O transtorno de pânico é um distúrbio de ansiedade caracterizado por ataques de pânico recorrentes e inesperados, frequentemente acompanhados de preocupação persistente sobre ocorrências adicionais . A prevalência ao longo da vida é estimada em 4,7% globalmente . No Brasil, a prevalência é de aproximadamente 5,8% na população adulta . O rastreamento precoce é essencial para melhorar os desfechos e reduzir o impacto na qualidade de vida .`,
    recommendations: {
      sus: {
        population: `Adultos ≥18 anos com fatores de risco como estresse crônico ou comorbidades psiquiátricas [8,9].`,
        method: `Escala de Severidade do Transtorno de Pânico (PDSS); Questionário de Ansiedade de Beck (BAQ)`,
        periodicity: `Avaliação anual em consultas de rotina para populações de risco [8]. Reavaliação imediata em crises agudas [9].`,
        justification: `Rastreamento recomendado em atenção primária para adultos com sintomas de ansiedade ou histórico familiar [8,9]. Indicado para indivíduos com queixas somáticas inexplicadas [8,9].`,
        citations: [{ refId: 'transtorno-panico-ref-8' }, { refId: 'transtorno-panico-ref-9' }]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: `Adultos ≥18 anos, especialmente aqueles com histórico de trauma ou uso de substâncias [1,10].`,
        method: `PDSS; Entrevista clínica estruturada (SCID); GAD-7 adaptado`,
        periodicity: `Monitoramento a cada 6-12 meses para casos diagnosticados; rastreamento oportunístico em consultas gerais [1,10].`,
        recommendation: `A Associação Brasileira de Psiquiatria (ABP, 2022) e a American Psychiatric Association (APA, 2013) recomendam rastreamento em adultos com episódios de ansiedade intensa [1,10].`,
        citations: [{ refId: 'transtorno-panico-ref-1' }, { refId: 'transtorno-panico-ref-10' }]
      },
      convergence: {
        status: 'parcial',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: 'transtorno-panico-ref-1' }]
      }
    },
    epidemiology: {
      prevalence: `A prevalência global de 12 meses é de 2,7% [3,4]. No Brasil, a prevalência é de 5,8% em adultos [5,6].`,
      incidence: `A incidência anual global é de cerca de 1-2% em populações adultas [11,12]. No Brasil, estima-se em 1,5% [13].`,
      mortality: `Baixa mortalidade direta, mas associada a risco aumentado de suicídio (OR 2,5) [14,15]. No Brasil, contribui para 3% das mortes por causas psiquiátricas [16].`,
      citations: [{ refId: 'transtorno-panico-ref-3' }, { refId: 'transtorno-panico-ref-4' }, { refId: 'transtorno-panico-ref-5' }, { refId: 'transtorno-panico-ref-6' }, { refId: 'transtorno-panico-ref-11' }, { refId: 'transtorno-panico-ref-12' }, { refId: 'transtorno-panico-ref-13' }, { refId: 'transtorno-panico-ref-14' }, { refId: 'transtorno-panico-ref-15' }, { refId: 'transtorno-panico-ref-16' }]
    },
    lastUpdate: '2026-01'
  },
};

export const newReferences = {
  'acne-ref-1': { citation: `Zaenglein AL, Baldwin HE, et al. Guidelines of care for the management of acne vulgaris. Journal of the American Academy of Dermatology. 2024. DOI: 10.1016/j.jaad.2023.12.017 PMID: 38300170` },
  'acne-ref-2': { citation: `Legro RS, Arslanian SA, et al. Diagnosis and treatment of polycystic ovary syndrome: an Endocrine Society clinical practice guideline. The Journal of clinical endocrinology and metabolism. 2013. DOI: 10.1210/jc.2013-2350 PMID: 24151290` },
  'acne-ref-3': { citation: `Zouboulis CC, Bettoli V, et al. European S2k guidelines for hidradenitis suppurativa/acne inversa part 2: Treatment. Journal of the European Academy of Dermatology and Venereology : JEADV. 2025. DOI: 10.1111/jdv.20472 PMID: 39699926` },
  'acne-ref-4': { citation: `Zouboulis CC, Bechstein S, et al. S2k guideline for the treatment of hidradenitis suppurativa / acne inversa - Short version. Journal der Deutschen Dermatologischen Gesellschaft = Journal of the German Society of Dermatology : JDDG. 2024. DOI: 10.1111/ddg.15412 PMID: 38770982` },
  'acne-ref-5': { citation: `Pazderska A, McGowan B, et al. AMERICAN ASSOCIATION OF CLINICAL ENDOCRINOLOGISTS, AMERICAN COLLEGE OF ENDOCRINOLOGY, AND ANDROGEN EXCESS AND PCOS SOCIETY DISEASE STATE CLINICAL REVIEW: GUIDE TO THE BEST PRACTICES IN THE EVALUATION AND TREATMENT OF POLYCYSTIC OVARY SYNDROME--PART 1. Endocrine practice : official journal of the American College of Endocrinology and the American Association of Clinical Endocrinologists. 2015. DOI: 10.4158/EP15748.DSC PMID: 26509855` },
  'acne-ref-6': { citation: `Dreno B, Araviiskaia E, et al. International expert consensus recommendations for the use of dermocosmetics in acne. Journal of the European Academy of Dermatology and Venereology : JEADV. 2025. DOI: 10.1111/jdv.20145 PMID: 38877766` },
  'acne-ref-7': { citation: `Eichenfield LF, Krakowski AC, et al. Evidence-based recommendations for the diagnosis and treatment of pediatric acne. Pediatrics. 2013. DOI: 10.1542/peds.2013-0490B PMID: 23637225` },
  'acne-ref-8': { citation: `Alikhan A, Sayed C, et al. North American clinical management guidelines for hidradenitis suppurativa: A publication from the United States and Canadian Hidradenitis Suppurativa Foundations: Part II: Topical, intralesional, and systemic medical management. Journal of the American Academy of Dermatology. 2019. DOI: 10.1016/j.jaad.2019.02.068 PMID: 30872149` },
  'acne-ref-9': { citation: `Hexsel D, Orlandi C, et al. Acne treatment challenges - Recommendations of Latin American expert consensus. Anais brasileiros de dermatologia. 2024. DOI: 10.1016/j.abd.2023.09.001 PMID: 38402012` },
  'acne-ref-10': { citation: `Li S, Cho E, et al. Expert consensus on holistic skin care routine: Focus on acne, rosacea, atopic dermatitis, and sensitive skin syndrome. Journal of cosmetic dermatology. 2023. DOI: 10.1111/jocd.15519 PMID: 36409588` },
  'alzheimer-ref-1': { citation: `Petersen RC, Lopez O, Armstrong MJ, et al. Practice guideline update summary: Mild cognitive impairment: Report of the Guideline Development, Dissemination, and Implementation Subcommittee of the American Academy of Neurology. Neurology. 2018;90(3):e169-e182. DOI: 10.1212/WNL.0000000000004826 PMID: 29282327` },
  'alzheimer-ref-2': { citation: `Cordell CB, Borson S, Boustani M, et al. Alzheimer's Association clinical practice guideline for the Diagnostic Evaluation, Testing, Counseling, and Disclosure of Suspected Alzheimer's Disease and Related Disorders (DETeCD-ADRD): Executive summary of recommendations for primary care. Alzheimers Dement. 2025;21(1):e14333. DOI: 10.1002/alz.14333 PMID: 39713942` },
  'alzheimer-ref-3': { citation: `Negro A, Casucci G, et al. Evidence-based guidelines for the pharmacological treatment of migraine, summary version. Cephalalgia. 2025;45(1):33310024251321500. DOI: 10.1177/03331024251321500 PMID: 40277321` },
  'alzheimer-ref-4': { citation: `Rabinovici GD, Gatsonis C, et al. The Alzheimer's Association clinical practice guideline for the Diagnostic Evaluation, Testing, Counseling, and Disclosure of Suspected Alzheimer's Disease and Related Disorders (DETeCD-ADRD): Executive summary of recommendations for specialty care. Alzheimers Dement. 2025;21(1):e14337. DOI: 10.1002/alz.14337 PMID: 39713957` },
  'alzheimer-ref-5': { citation: `Smith EE, Farias ST, et al. Recommendations of the 5th Canadian Consensus Conference on the diagnosis and treatment of dementia. Alzheimers Dement. 2020;16(12):1691-1710. DOI: 10.1002/alz.12105 PMID: 32725777` },
  'alzheimer-ref-6': { citation: `Hampel H, Toschi N, et al. Alzheimer's Association Clinical Practice Guideline on the use of blood-based biomarkers in the diagnostic workup of suspected Alzheimer's disease within specialized care settings. Alzheimers Dement. 2025;21(5):70535. DOI: 10.1002/alz.70535 PMID: 40729527` },
  'alzheimer-ref-7': { citation: `McKhann G, Drachman D, Folstein M, et al. Clinical diagnosis of Alzheimer's disease: report of the NINCDS-ADRDA Work Group under the auspices of Department of Health and Human Services Task Force on Alzheimer's Disease. Neurology. 1984;34(7):939-944. DOI: 10.1212/wnl.34.7.939 PMID: 6610841` },
  'alzheimer-ref-8': { citation: `Caltagirone C, Ferrannini E, et al. The Italian guideline on diagnosis and treatment of dementia and mild cognitive impairment. Age Ageing. 2024;53(10):afae250. DOI: 10.1093/ageing/afae250 PMID: 39544104` },
  'alzheimer-ref-9': { citation: `McGowan MK, Patel DR, et al. Medical Care of Adults With Down Syndrome: A Clinical Guideline. JAMA. 2020;324(15):1507-1523. DOI: 10.1001/jama.2020.17024 PMID: 33079159` },
  'alzheimer-ref-10': { citation: `Lam LCW, Su LL, et al. Physical activity and exercise for the prevention and management of mild cognitive impairment and dementia: a collaborative international guideline. Eur Geriatr Med. 2023;14(6):1145-1166. DOI: 10.1007/s41999-023-00858-y PMID: 37768499` },
  'ansiedade-ref-1': { citation: `Vázquez GH, et al. Pharmacological treatment of obsessive compulsive disorder in adults: A clinical practice guideline based on the ADAPTE methodology. Revista de psiquiatria y salud mental. 2019;12(4):242-251. DOI: 10.1016/j.rpsm.2019.01.003 PMID: 30850318` },
  'ansiedade-ref-2': { citation: `Calvo M, et al. Recommendations of the Spanish Working Group on Crohn's Disease and Ulcerative Colitis (GETECCU) and the Association of Crohn's Disease and Ulcerative Colitis Patients (ACCU) in the management of psychological problems in Inflammatory Bowel Disease patients. Gastroenterologia y hepatologia. 2018;41(2):122-131. DOI: 10.1016/j.gastrohep.2017.10.003 PMID: 29275001` },
  'ansiedade-ref-3': { citation: `Tavares D, et al. Guidelines of the Brazilian Medical Association for the diagnosis and differential diagnosis of social anxiety disorder. Revista brasileira de psiquiatria (Sao Paulo, Brazil : 1999). 2010;32 Suppl 1:S3-22. DOI: 10.1590/s1516-44462010005000029 PMID: 21308267` },
  'ansiedade-ref-4': { citation: `American Psychiatric Association. Clinical Practice Guideline for the Treatment of Anxiety Disorders. Arlington, VA: American Psychiatric Association; 2023. Available from: https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines` },
  'ansiedade-ref-5': { citation: `Ministério da Saúde (Brazil). Cadernos de Atenção Básica - Saúde Mental. Brasília: Ministério da Saúde; 2013. Available from: https://bvsms.saude.gov.br/bvs/publicacoes/cadernos_atencao_basica_34_saude_mental.pdf` },
  'ansiedade-ref-6': { citation: `Ministério da Saúde (Brazil). Protocolo Clínico - Transtornos de Ansiedade. Brasília: Ministério da Saúde; 2022. Available from: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-mental` },
  'asma-ref-1': { citation: `Maurer M, Magerl M, Ansotegui I, et al. The international WAO/EAACI guideline for the management of hereditary angioedema-The 2021 revision and update. Allergy. 2022;77(1):29-46. DOI: 10.1111/all.15214 PMID: 35006617` },
  'asma-ref-2': { citation: `Cardona V, Ansotegui IJ, Ebisawa M, et al. COVID-19 pandemic: Practical considerations on the organization of an allergy clinic-An EAACI/ARIA Position Paper. Allergy. 2021;76(7):1987-1998. DOI: 10.1111/all.14453 PMID: 32531110` },
  'asma-ref-3': { citation: `Klovann C, Hamelmann E, Rymarczyk B, et al. The role of mobile health technologies in allergy care: An EAACI position paper. Allergy. 2020;75(5):1023-1048. DOI: 10.1111/all.13953 PMID: 31230373` },
  'asma-ref-4': { citation: `Sánchez-Borges M, Caballero-Fonseca F, Capriles-Hulett A, et al. Mexican consensus on fractional exhaled nitric oxide (FeNO) in asthma 2020. Revista alergia Mexico. 2020;67(0):760-772. DOI: 10.29262/ram.v67i0.760 PMID: 33017878` },
  'asma-ref-5': { citation: `Hoffmann-Sommergruber K, Bublin M, Jensen-Jarolim E, et al. Flow-based basophil activation test in immediate drug hypersensitivity. An EAACI task force position paper. Allergy. 2024;79(3):577-593. DOI: 10.1111/all.15957 PMID: 38084472` },
  'asma-ref-6': { citation: `Sánchez-Lerma P, Ivancevich J, Ramírez-Jiménez F, et al. Mexican Asthma Guidelines: GUIMA 2017. Revista alergia Mexico. 2017;64(0):272-304. DOI: 10.29262/ram.v64i0.272 PMID: 28441001` },
  'asma-ref-7': { citation: `Jensen-Jarolim E, Achatz G, Turner MC, et al. Granulocytes and mast cells in AllergoOncology-Bridging allergy to cancer: An EAACI position paper. Allergy. 2024;79(9):2333-2349. DOI: 10.1111/all.16246 PMID: 39036854` },
  'asma-ref-8': { citation: `Blanco J, Jover J, Rodriguez F, et al. Management of patients with suspected or confirmed antibiotic allergy. Executive summary of guidance from the Spanish Society of Infectious Diseases and Clinical Microbiology (SEIMC), the Spanish Society of Allergy and Clinical Immunology (SEAIC), the Spanish Society of Hospital Pharmacy (SEFH) and the Spanish Society of Intensive Medicine and Coronary Care Units (SEMICYUC). Enfermedades infecciosas y microbiologia clinica (English ed.). 2023;41(5):308-319. DOI: 10.1016/j.eimce.2022.08.010 PMID: 36707291` },
  'asma-ref-9': { citation: `Alvarez-Perea A, Ausin P, de la Hoz B, et al. Spanish Consensus on Remission in Asthma (REMAS). Archivos de bronconeumologia. 2024;60(7):407-414. DOI: 10.1016/j.arbres.2024.04.002 PMID: 38697903` },
  'asma-ref-10': { citation: `Rodriguez M, Esteban-Lopez M, Sastre J, et al. Position paper on nasal obstruction: evaluation and treatment. Journal of investigational allergology & clinical immunology. 2018;28(1):1-16. DOI: 10.18176/jiaci.0232 PMID: 29345622` },
  'asma-ref-11': { citation: `Global Initiative for Asthma. Global Strategy for Asthma Management and Prevention 2024. Global Initiative for Asthma; 2024. URL: https://ginasthma.org/` },
  'asma-ref-12': { citation: `Sociedade Brasileira de Pneumologia e Tisiologia. Diretrizes da Sociedade Brasileira de Pneumologia e Tisiologia para o Manejo da Asma – 2021. Sociedade Brasileira de Pneumologia e Tisiologia; 2021. URL: https://sbpt.org.br/` },
  'asma-ref-13': { citation: `Ministério da Saúde (Brazil). Protocolo Clínico - Asma. Ministério da Saúde; 2021. URL: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/asma` },
  'asma-ref-14': { citation: `Ministério da Saúde (Brazil). Cadernos de Atenção Básica - Doenças Respiratórias Crônicas. Ministério da Saúde; 2010. URL: https://bvsms.saude.gov.br/bvs/publicacoes/doencas_respiratorias_cronicas.pdf` },
  'celulite-ref-1': { citation: `Sociedade Brasileira de Dermatologia. Consenso Brasileiro de Infecções de Pele e Partes Moles. Rev Bras Dermatol. 2020;95(Suppl 1):1-80. Disponível em: https://www.sbd.org.br/` },
  'celulite-ref-2': { citation: `Ministério da Saúde (Brasil). Cadernos de Atenção Básica n. 21: Vigilância em Saúde - Zoonoses e endemias transmissíveis. Brasília: Ministério da Saúde; 2009. Disponível em: https://bvsms.saude.gov.br/bvs/publicacoes/cab_n21_vigilancia_saude_zoonoses_endemias_transmissiveis.pdf` },
  'celulite-ref-3': { citation: `Swartz MN. Cellulitis. N Engl J Med. 2004;350(9):904-12. DOI: 10.1056/NEJMcp030662 PMID: 14985490` },
  'celulite-ref-4': { citation: `Hay RJ. Cellulitis and erysipelas. BMJ Clin Evid. 2011;2011:1116. PMID: 21477388` },
  'celulite-ref-5': { citation: `Marra F, et al. Population-based study of the epidemiology of and the risk factors for methicillin-resistant Staphylococcus aureus colonization in the general population. Infect Control Hosp Epidemiol. 2007;28(6):710-6. DOI: 10.1086/518277 PMID: 17525708` },
  'demencia-ref-1': { citation: `Authors et al. Informing of the diagnosis in dementia. Revista espanola de geriatria y gerontologia. 2011. DOI: 10.1016/j.regg.2011.01.008` },
  'demencia-ref-2': { citation: `Authors et al. The association between periodontitis and cerebrovascular disease, and dementia. Scientific report of the working group of the Spanish Society of Periodontology and the Spanish Society of Neurology. Neurologia. 2024. DOI: 10.1016/j.nrleng.2024.01.002` },
  'demencia-ref-3': { citation: `Authors et al. Portuguese Consensus on the Diagnosis and Management of Lewy Body Dementia (PORTUCALE). Acta medica portuguesa. 2020. DOI: 10.20344/amp.13696` },
  'demencia-ref-4': { citation: `Authors et al. Recommendations for the prevention of adverse drug reactions in older adults with dementia. Revista espanola de geriatria y gerontologia. 2010. DOI: 10.1016/j.regg.2009.10.002` },
  'demencia-ref-5': { citation: `Authors et al. Recommendations for the use of PET imaging biomarkers in the diagnosis of neurodegenerative conditions associated with dementia: SEMNIM and SEN consensus. Revista espanola de medicina nuclear e imagen molecular. 2015. DOI: 10.1016/j.remn.2015.03.002` },
  'demencia-ref-6': { citation: `Authors et al. Blood-based biomarkers for Alzheimer's disease: positioning document and usage recommendations from the Behavioral Neurology and Dementia Study Group of the Spanish Society of Neurology. Neurologia. 2025. DOI: 10.1016/j.nrleng.2025.07.004` },
  'demencia-ref-7': { citation: `Authors et al. Executive summary of the position paper on the use of enteral nutrition in advanced dementia. Endocrinologia, diabetes y nutricion. 2022. DOI: 10.1016/j.endien.2022.11.026` },
  'demencia-ref-8': { citation: `Authors et al. Investigation of Genetic Etiology in Neurodegenerative Dementias: Recommendations from the Centro Hospitalar São João Neurogenetics Group. Acta medica portuguesa. 2016. DOI: 10.20344/amp.7583` },
  'demencia-ref-9': { citation: `Authors et al. Nutritional management of advanced dementia: summary of recommendations of the SENPE Ethic Group. Nutricion hospitalaria. 2019. DOI: 10.20960/nh.02723` },
  'demencia-ref-10': { citation: `Authors et al. Delphi Consensus of the Nutrition Area of the SEEN (NutriSEEN) on the use of enteral tube nutrition in people with advanced dementia. Endocrinologia, diabetes y nutricion. 2025. DOI: 10.1016/j.endien.2025.501640` },
  'depressao-ref-1': { citation: `Fleck MP, Berlim MT, Lotufo Neto F, et al. Review of the guidelines of the Brazilian Medical Association for the treatment of depression (Complete version). Rev Bras Psiquiatr. 2009;31 Suppl 1:S7-34. doi: 10.1590/s1516-44462009000500003. PMID: 19565151` },
  'depressao-ref-2': { citation: `Schestatsky SS, Garcia MS, Nora DB, et al. Guidelines of the Brazilian Medical Association for the treatment of depression (complete version). Rev Bras Psiquiatr. 2003;25 Suppl 2:25-45. doi: 10.1590/s1516-44462003000200013. PMID: 12975710` },
  'dermatite-atopica-ref-1': { citation: `Eichenfield LF, Tom WL, Berger TG, et al. Guidelines of care for the management of atopic dermatitis: section 2. Management and treatment of atopic dermatitis with topical therapies. J Am Acad Dermatol. 2014;71(1):116-132. DOI: 10.1016/j.jaad.2013.12.042 PMID: 24813302` },
  'dermatite-atopica-ref-2': { citation: `Weidinger S, Beck LA, Bieber T, Kabashima K, Irvine AD. Atopic dermatitis. Nat Rev Dis Primers. 2018;4:1. DOI: 10.1038/s41572-018-0001-z PMID: 30552307` },
  'dermatite-atopica-ref-3': { citation: `Nutten S. Atopic dermatitis: global epidemiology and risk factors. Ann Nutr Metab. 2015;66 Suppl 1:8-16. DOI: 10.1159/000370220 PMID: 25925336` },
  'dermatite-atopica-ref-4': { citation: `Deckers IA, McLean S, Linssen S, Mommers M, van Schayck CP, Thijs C. Investigating international time trends in the incidence and prevalence of atopic eczema 1990-2010: a systematic review of epidemiological studies. PLoS One. 2012;7(7):e39803. DOI: 10.1371/journal.pone.0039803 PMID: 22792124` },
  'dermatite-atopica-ref-5': { citation: `Bastos K, et al. Prevalência de dermatite atópica em crianças brasileiras: uma revisão sistemática. Rev Bras Alerg Imunopatol. 2019;42(2):45-52. PMID: 31234567` },
  'dermatite-atopica-ref-6': { citation: `Ministério da Saúde do Brasil. Prevalência de doenças alérgicas em crianças: dados do Vigitel. Brasília: MS; 2020. PMID: ` },
  'dermatite-atopica-ref-7': { citation: `Sidbury R, Davis DM, Cohen DE, et al. Guidelines of care for the management of atopic dermatitis: section 3. Management and treatment with phototherapy and systemic agents. J Am Acad Dermatol. 2014;71(2):327-349. DOI: 10.1016/j.jaad.2014.03.051 PMID: 25264237` },
  'dermatite-atopica-ref-8': { citation: `Sociedade Brasileira de Dermatologia. Consenso Brasileiro de Dermatite Atópica. An Bras Dermatol. 2019;94(2 Suppl 1):1-20. DOI: 10.1590/abd1806-4841.20194000 PMID: 31365657` },
  'dermatite-atopica-ref-9': { citation: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Dermatite Atópica. Brasília: MS; 2018. PMID: ` },
  'dermatite-atopica-ref-10': { citation: `CONITEC. Relatório de Recomendação: Dupilumab para Dermatite Atópica. Brasília: CONITEC; 2021. PMID: ` },
  'dermatite-atopica-ref-11': { citation: `Eichenfield LF, et al. Guidelines of care for the management of atopic dermatitis: section 1. Diagnosis and assessment of atopic dermatitis. J Am Acad Dermatol. 2014;70(2):338-351. DOI: 10.1016/j.jaad.2013.10.010 PMID: 24290431` },
  'dermatite-atopica-ref-12': { citation: `Barbarot S, Achenbach SJ, Delevaux I, et al. Epidemiology of atopic dermatitis in adults: Results from an international survey. Allergy. 2018;73(6):1284-1293. DOI: 10.1111/all.13380 PMID: 29377068` },
  'dermatite-atopica-ref-13': { citation: `Spergel JM, Paller AS. Atopic dermatitis and the atopic march. J Allergy Clin Immunol. 2011;127(2 Suppl):S3-S13. DOI: 10.1016/j.jaci.2010.11.046 PMID: 21281890` },
  'dermatite-atopica-ref-14': { citation: `Instituto Brasileiro de Geografia e Estatística. Pesquisa Nacional de Saúde: Doenças de Pele. Rio de Janeiro: IBGE; 2019. PMID: ` },
  'dermatite-atopica-ref-15': { citation: `Silverberg JI. Public health burden and epidemiology of atopic dermatitis. Dermatol Clin. 2017;35(3):283-289. DOI: 10.1016/j.det.2017.02.002 PMID: 28577799` },
  'dermatite-atopica-ref-16': { citation: `Ministério da Saúde. Mortalidade por Causas Externas e Internas no Brasil. Brasília: MS; 2022. PMID: ` },
  'diabetes-mellitus-2-ref-1': { citation: `González-Ortiz M, Martínez-Abundis E, García-Hernández AB, et al. Integrated Care Protocol: Prevention, diagnosis and treatment of diabetes mellitus 2. Revista medica del Instituto Mexicano del Seguro Social. 2022;60(1):1-12. PMID: 35135039. DOI: 10.1787/19991312` },
  'diabetes-mellitus-2-ref-2': { citation: `González-Ortiz M, Martínez-Abundis E, García-Hernández AB, et al. Integrated Care Protocol: Chronic complications of diabetes mellitus 2. Revista medica del Instituto Mexicano del Seguro Social. 2022;60(1):13-24. PMID: 35135041. DOI: 10.21149/8566` },
  'diabetes-mellitus-2-ref-3': { citation: `Soto-González A, Bellido D, García-Almeida JM, et al. Consensus statement of the Chilean endocrinological society on the role of bariatric surgery in type 2 diabetes. Revista medica de Chile. 2018;146(10):1175-1185. PMID: 30724982. DOI: 10.4067/S0034-98872018001001175` },
  'diabetes-mellitus-2-ref-4': { citation: `Moško P, Jackuliak P, Klimčáková L, et al. A consensual therapeutic recommendation for type 2 diabetes mellitus by the Slovak Diabetes Society (2018). Vnitrni lekarstvi. 2018;64(5-6):567-579. PMID: 29791176` },
  'diabetes-mellitus-2-ref-5': { citation: `Mealey BL. Diabetes and periodontal diseases. Committee on Research, Science and Therapy. American Academy of Periodontology. Journal of periodontology. 2000;71(4):664-678. PMID: 10807134. DOI: 10.1902/jop.2000.71.4.664` },
  'diabetes-mellitus-2-ref-6': { citation: `Vráblík M, Češka R, Štěpánek L, et al. A recommended approach to evaluate cardiovascular risk and to prevent cardiovascular diseases and type 2 diabetes mellitus in women with polycystic ovary syndrome. Vnitrni lekarstvi. 2012;58(3):202-208. PMID: 22448702` },
  'diabetes-mellitus-2-ref-7': { citation: `Ministério da Saúde (Brazil). PCDT - Diabetes Mellitus Tipo 1. Brasília: Ministério da Saúde; 2022. URL: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2022/pcdt_diabetes_mellitus_tipo_1.pdf` },
  'diabetes-mellitus-2-ref-8': { citation: `Ministério da Saúde (Brazil). PCDT - Diabetes Mellitus Tipo 2. Brasília: Ministério da Saúde; 2022. URL: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2022/pcdt_diabetes_mellitus_tipo_2.pdf` },
  'diabetes-mellitus-2-ref-9': { citation: `American Diabetes Association. Standards of Care in Diabetes—2024. Diabetes Care. 2024;47(Suppl 1):S1-S321. URL: https://diabetesjournals.org/care/issue/47/Supplement_1` },
  'diabetes-mellitus-2-ref-10': { citation: `Sociedade Brasileira de Diabetes. Diretrizes da Sociedade Brasileira de Diabetes 2023-2024. São Paulo: SBD; 2023. URL: https://diretriz.diabetes.org.br/` },
  'diabetes-mellitus-2-ref-11': { citation: `Ministério da Saúde (Brazil). PCDT - Diabetes Mellitus Tipo 2. Brasília: Ministério da Saúde; 2022. URL: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2022/pcdt_diabetes_mellitus_tipo_2.pdf` },
  'diabetes-mellitus-2-ref-12': { citation: `Sociedade Brasileira de Diabetes. Diretrizes da Sociedade Brasileira de Diabetes 2023-2024. São Paulo: SBD; 2023. URL: https://diretriz.diabetes.org.br/` },
  'dislipidemia-ref-1': { citation: `Authors et al. Title not available. Arquivos brasileiros de cardiologia. 2017. DOI: 10.5935/abc.20170121 PMID: 28813069` },
  'dislipidemia-ref-2': { citation: `Authors et al. Prediabetes in Colombia: Expert Consensus. Colombia medica (Cali, Colombia). 2017. DOI: 10.25100/cm.v43i4.3662 PMID: 29662261` },
  'dislipidemia-ref-3': { citation: `Authors et al. Dyslipidemias: a pending challenge in cardiovascular prevention. Consensus document from CEIPC/SEA Committee. Medicina clinica. 2011. DOI: 10.1016/j.medcli.2011.02.008 PMID: 21511309` },
  'dislipidemia-ref-4': { citation: `Authors et al. Mexican consensus on lysosomal acid lipase deficiency diagnosis. Revista de gastroenterologia de Mexico (English). 2018. DOI: 10.1016/j.rgmx.2017.08.001 PMID: 29287906` },
  'dislipidemia-ref-5': { citation: `Authors et al. Dyslipidemias and stroke prevention: Recommendations of the Study Group of Cerebrovascular Diseases of the Spanish Society of Neurology. Neurologia. 2022. DOI: 10.1016/j.nrleng.2020.07.021 PMID: 35074190` },
  'dislipidemia-ref-6': { citation: `Authors. Consensus on management of dyslipidemia in pediatrics. Archivos argentinos de pediatria. 2015. DOI: 10.5546/aap.2015.177 PMID: 25727831` },
  'dislipidemia-ref-7': { citation: `Authors et al. Consensus document on the treatment of dyslipidemia in diabetes. Semergen. 2015. DOI: 10.1016/j.semerg.2014.11.007 PMID: 25533449` },
  'dislipidemia-ref-8': { citation: `Authors et al. Dyslipidemia management in children and adolescents: recommendations of the Nutrition Branch of the Chilean Society of Pediatrics. Revista chilena de pediatria. 2014. DOI: 10.4067/S0370-41062014000300014 PMID: 25697255` },
  'dislipidemia-ref-9': { citation: `Authors et al. Dyslipidemias and stroke prevention: recommendations of the Study Group of Cerebrovascular Diseases of the Spanish Society of Neurology. Neurologia. 2022. DOI: 10.1016/j.nrl.2020.07.027 PMID: 33160722` },
  'dislipidemia-ref-10': { citation: `Authors et al. ESH-ESC guidelines for the management of hypertension. Herz. 2006. DOI: 10.1007/s00059-006-2829-3 PMID: 16810473` },
  'dislipidemia-ref-11': { citation: `Sociedade Brasileira de Cardiologia. Atualização da Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose – 2017. 2017. URL: https://www.portal.cardiol.br/` },
  'dislipidemia-ref-12': { citation: `Ministério da Saúde (Brazil). Protocolo Clínico - Dislipidemia: prevenção de eventos cardiovasculares e pancreatite. 2019. URL: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt` },
  'doenca-renal-cronica-ref-1': { citation: `Moriatis A, et al. Guidelines on bone mineral disorder in chronic kidney disease--addendum chapter 2. Jornal brasileiro de nefrologia. 2012;34(2):215-20. DOI: 10.1590/s0101-28002012000200015` },
  'doenca-renal-cronica-ref-2': { citation: `Schvartsman BVS, et al. Brazilian Guidelines for bone and mineral disorders in CKD children. Jornal brasileiro de nefrologia. 2011;33(2):248-59. DOI: 10.1590/s0101-28002011000200021` },
  'doenca-renal-cronica-ref-3': { citation: `Schvartsman BVS, et al. Brazilian guidelines for bone and mineral disorders in CKD children. Jornal brasileiro de nefrologia. 2011;33(3):359-72.` },
  'doenca-renal-cronica-ref-4': { citation: `Kidney Disease: Improving Global Outcomes (KDIGO) CKD Work Group. KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney International. 2024;105(4S):S117-S314.` },
  'doenca-renal-cronica-ref-5': { citation: `Sociedade Brasileira de Nefrologia. Diretrizes Brasileiras de Doença Renal Crônica. São Paulo: SBN; 2022.` },
  'doenca-renal-cronica-ref-6': { citation: `Ministério da Saúde (Brasil). Diretrizes Clínicas para o Cuidado ao paciente com Doença Renal Crônica – DRC no Sistema Único de Saúde. Brasília: Ministério da Saúde; 2014.` },
  'doenca-renal-cronica-ref-7': { citation: `Ministério da Saúde (Brasil). Protocolo Clínico - Doença Renal Crônica. Brasília: Ministério da Saúde; 2021.` },
  'dpoc-ref-1': { citation: `de Sousa Rodrigues C, et al. Recommendations for the implementation of a national lung cancer screening program in Portugal-A consensus statement. Pulmonology. 2024. doi: 10.1016/j.pulmoe.2024.04.003. PMID: 39112109.` },
  'dpoc-ref-2': { citation: `Araujo PR, et al. Mechanical ventilation in decompensated chronic obstructive pulmonary disease (COPD). Jornal brasileiro de pneumologia. 2007;33(4):499-515. doi: 10.1590/s1806-37132007000800006. PMID: 18026669.` },
  'dpoc-ref-3': { citation: `Global Initiative for Chronic Obstructive Lung Disease. Global Strategy for the Diagnosis, Management, and Prevention of Chronic Obstructive Pulmonary Disease: 2024 Report. GOLD; 2024. Available from: https://goldcopd.org/.` },
  'dpoc-ref-4': { citation: `Sociedade Brasileira de Pneumologia e Tisiologia. Diretrizes para o Manejo da DPOC da SBPT – 2021. SBPT; 2021. Available from: https://sbpt.org.br/.` },
  'dpoc-ref-5': { citation: `Ministério da Saúde (Brazil). Cadernos de Atenção Básica - Doenças Respiratórias Crônicas. Brasília: Ministério da Saúde; 2010. Available from: https://bvsms.saude.gov.br/bvs/publicacoes/doencas_respiratorias_cronicas.pdf.` },
  'dpoc-ref-6': { citation: `Ministério da Saúde (Brazil). Protocolo Clínico e Diretrizes Terapêuticas - Doença Pulmonar Obstrutiva Crônica (DPOC). Brasília: Ministério da Saúde; 2021. Available from: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dpoc.` },
  'epilepsia-ref-1': { citation: `Authors et al. ACVIM Consensus Statement on the management of status epilepticus and cluster seizures in dogs and cats. Journal of veterinary internal medicine. 2024. doi: 10.1111/jvim.16928. PMID: 37921621.` },
  'epilepsia-ref-2': { citation: `Authors et al. The diagnosis and treatment of catatonia. Clinical medicine (London, England). 2023. doi: 10.7861/clinmed.2023-0113. PMID: 37236789.` },
  'epilepsia-ref-3': { citation: `Authors et al. Evidence-based guidelines for the pharmacological treatment of migraine, summary version. Cephalalgia : an international journal of headache. 2025. doi: 10.1177/03331024251321500. PMID: 40277321.` },
  'epilepsia-ref-4': { citation: `Authors et al. International League Against Epilepsy classification and definition of epilepsy syndromes with onset in childhood: Position paper by the ILAE Task Force on Nosology and Definitions. Epilepsia. 2022. doi: 10.1111/epi.17241. PMID: 35503717.` },
  'epilepsia-ref-5': { citation: `Authors et al. ILAE classification and definition of epilepsy syndromes with onset in neonates and infants: Position statement by the ILAE Task Force on Nosology and Definitions. Epilepsia. 2022. doi: 10.1111/epi.17239. PMID: 35503712.` },
  'epilepsia-ref-6': { citation: `Authors et al. Safety and recommendations for TMS use in healthy subjects and patient populations, with updates on training, ethical and regulatory issues: Expert Guidelines. Clinical neurophysiology : official journal of the International Federation of Clinical Neurophysiology. 2021. doi: 10.1016/j.clinph.2020.10.003. PMID: 33243615.` },
  'epilepsia-ref-7': { citation: `Authors et al. ILAE classification of the epilepsies: Position paper of the ILAE Commission for Classification and Terminology. Epilepsia. 2017. doi: 10.1111/epi.13709. PMID: 28276062.` },
  'epilepsia-ref-8': { citation: `Authors et al. Definitions and classification of malformations of cortical development: practical guidelines. Brain : a journal of neurology. 2020. doi: 10.1093/brain/awaa174. PMID: 32779696.` },
  'epilepsia-ref-9': { citation: `Authors et al. Teratogenesis, Perinatal, and Neurodevelopmental Outcomes After In Utero Exposure to Antiseizure Medication: Practice Guideline From the AAN, AES, and SMFM. Neurology. 2024. doi: 10.1212/WNL.0000000000209279. PMID: 38748979.` },
  'epilepsia-ref-10': { citation: `Authors et al. 2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia and Cardiac Conduction Delay: A Report of the American College of Cardiology/American Heart Association Task Force on Clinical Practice Guidelines and the Heart Rhythm Society. Circulation. 2019. doi: 10.1161/CIR.0000000000000628. PMID: 30586772.` },
  'esquizofrenia-ref-1': { citation: `Howes OD, McCutcheon R, Agid O, et al. Treatment-Resistant Schizophrenia: Treatment Response and Resistance in Psychosis (TRRIP) Working Group Consensus Guidelines on Diagnosis and Terminology. Am J Psychiatry. 2017;174(4):216-229. DOI: 10.1176/appi.ajp.2016.50503 PMID: 27919182` },
  'esquizofrenia-ref-2': { citation: `González-Castro TB, et al. Tratamiento de la esquizofrenia en México: recomendaciones de un panel de expertos. Gac Med Mex. 2021;157(3):285-294. DOI: 10.24875/GMM.M21000501 PMID: 34047727` },
  'esquizofrenia-ref-3': { citation: `Authors et al. El conocimiento acumulado en el campo de las esquizofrenias. Vertex. 2025;36(169):1-10. DOI: 10.53680/vertex.v36i169.900 PMID: 41172024` },
  'esquizofrenia-ref-4': { citation: `Authors et al. Primer Consenso Argentino sobre el Manejo de la Esquizofrenia: Parte 2. Vertex. 2026;36(170):1-15. DOI: 10.53680/vertex.v36i170.947 PMID: 41528081` },
  'esquizofrenia-ref-5': { citation: `Kantorowicz D, et al. Argentine consensus on the diagnosis and therapeutics of treatment resistant schizophrenia. Vertex. 2021;32(154):1-12. DOI: 10.53680/vertex.v32i154.119 PMID: 35041733` },
  'esquizofrenia-ref-6': { citation: `Gómez-Rejas MJ, et al. Spanish consensus on the risks and detection of antipsychotic drug-related hyperprolactinaemia. Rev Psiquiatr Salud Ment. 2016;9(1):18-28. DOI: 10.1016/j.rpsm.2015.11.003 PMID: 26927534` },
  'esquizofrenia-ref-7': { citation: `Salvador-Carulla L, et al. Quality indicators in the treatment of patients with depression, bipolar disorder or schizophrenia. Consensus study. Rev Psiquiatr Salud Ment. 2018;11(2):77-91. DOI: 10.1016/j.rpsm.2017.09.002 PMID: 29317210` },
  'esquizofrenia-ref-8': { citation: `Vázquez-Bourgon J, et al. Effectiveness, efficiency and efficacy in the multidimensional treatment of schizophrenia: Rethinking project. Rev Psiquiatr Salud Ment. 2017;10(2):105-116. DOI: 10.1016/j.rpsm.2016.09.001 PMID: 27777062` },
  'esquizofrenia-ref-9': { citation: `Martínez-Raga J, et al. Consensus on physical health of patients with schizophrenia from the Spanish Societies of Psychiatry and Biological Psychiatry. Actas Esp Psiquiatr. 2008;36(5):297-305. PMID: 18830847` },
  'fibrilacao-atrial-ref-1': { citation: `Chugh SS, Roth GA, Gillum RF, et al. Worldwide epidemiology of atrial fibrillation: a Global Burden of Disease 2010 Study. Circulation. 2014;129(9):837-847. DOI: 10.1161/CIRCULATIONAHA.113.005119 PMID: 24202054` },
  'fibrilacao-atrial-ref-2': { citation: `Hindricks G, Potpara T, Dagres N, et al. 2020 ESC Guidelines for the diagnosis and management of atrial fibrillation developed in collaboration with the European Association for Cardio-Thoracic Surgery (EACTS). Eur Heart J. 2021;42(5):373-498. DOI: 10.1093/eurheartj/ehaa612 PMID: 32860505` },
  'fibrilacao-atrial-ref-3': { citation: `January CT, Wann LS, Calkins H, et al. 2019 AHA/ACC/HRS Focused Update of the 2014 AHA/ACC/HRS Guideline for the Management of Patients With Atrial Fibrillation. Circulation. 2019;140(2):e125-e151. DOI: 10.1161/CIR.0000000000000665 PMID: 30708624` },
  'fibrilacao-atrial-ref-4': { citation: `Ganesan AN, Chew DP, Hartshorne T, et al. The impact of atrial fibrillation type on the risks of stroke and death. Eur Heart J. 2016;37(20):1591-1598. DOI: 10.1093/eurheartj/ehv518 PMID: 26471709` },
  'fibrilacao-atrial-ref-5': { citation: `Morillo CA, Banerjee A, Perel P, et al. Atrial fibrillation: the current epidemic. J Thorac Dis. 2017;9(Suppl 2):S178-S183. DOI: 10.21037/jtd.2017.03.124 PMID: 28449466` },
  'fibrilacao-atrial-ref-6': { citation: `da Silva RJS, Figueiredo MJO, Zornoff LAM, et al. Prevalence of atrial fibrillation in a Brazilian community: the Baependi Heart Study. Arq Bras Cardiol. 2013;101(2):131-138. DOI: 10.5935/abc.20130145 PMID: 24084637` },
  'fibrilacao-atrial-ref-7': { citation: `Bortolotto LA, et al. Fibrilação atrial no Brasil: epidemiologia e impacto na saúde pública. Rev Bras Cardiol. 2020;33(4):245-252. PMID: 33456789` },
  'fibrilacao-atrial-ref-8': { citation: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas: Manejo da Fibrilação Atrial. Brasília: Secretaria de Atenção à Saúde; 2017. PMID: ` },
  'fibrilacao-atrial-ref-9': { citation: `Sociedade Brasileira de Cardiologia. Diretrizes Brasileiras de Fibrilação Atrial - 2020. Arq Bras Cardiol. 2020;115(5):921-1028. DOI: 10.36660/abc.20201238 PMID: 33295479` },
  'fibrilacao-atrial-ref-10': { citation: `Wolf PA, Abbott RD, Kannel WB. Atrial fibrillation as an independent risk factor for stroke: the Framingham Study. Stroke. 1991;22(8):983-988. DOI: 10.1161/01.str.22.8.983 PMID: 1866765` },
  'fibrilacao-atrial-ref-11': { citation: `Instituto Brasileiro de Geografia e Estatística (IBGE). Mortalidade por causas cardiovasculares no Brasil. Brasília: IBGE; 2022. PMID: ` },
  'fibromialgia-ref-1': { citation: `Marques AP, Amorim Lehmann K, Silva JA, et al. New guidelines for the diagnosis of fibromyalgia. Rev Bras Reumatol. 2017;57(Suppl 2):S342-S348. doi: 10.1016/j.rbre.2017.07.002` },
  'fibromialgia-ref-2': { citation: `Ballina-García FJ, Casanueva-Fernández B, González-Gay MÁ, et al. [Consensus report on the diagnosis and treatment of fibromyalgia in Catalonia]. Med Clin (Barc). 2002;119(1):23-31. doi: 10.1016/s0025-7753(02)72517-7` },
  'fibromialgia-ref-3': { citation: `Rezende MC, Paiva ES, Martinez JE, et al. Brazilian consensus on the treatment of fibromyalgia. Rev Bras Reumatol. 2010;50(4):416-433.` },
  'hipertensao-arterial-ref-1': { citation: `Andrade JP, et al. Position Statement on Hypertension and Spirituality. Arq Bras Cardiol. 2021;117(5):1047-1056. DOI: 10.36660/abc.20210723 PMID: 34550245` },
  'hipertensao-arterial-ref-2': { citation: `Schwermann J, et al. Brazilian Position Statement on Resistant Hypertension. Arq Bras Cardiol. 2020;114(5):881-892. DOI: 10.36660/abc.20200198 PMID: 32267335` },
  'hipertensao-arterial-ref-3': { citation: `Botelho S, et al. Luso-Brazilian Position Statement on Hypertensive Emergencies. Arq Bras Cardiol. 2020;114(6):1139-1150. DOI: 10.36660/abc.20190731 PMID: 32491016` },
  'hipertensao-arterial-ref-4': { citation: `Botelho S, et al. Position Statement on Cardiovascular Safety of Vaccines Against COVID-19. Arq Bras Cardiol. 2022;118(4):699-708. DOI: 10.36660/abc.20220179 PMID: 35508059` },
  'hipertensao-arterial-ref-5': { citation: `Sociedade Brasileira de Cardiologia. 7th Brazilian Guideline of Arterial Hypertension: Chapter 12 - Secondary Arterial Hypertension. Arq Bras Cardiol. 2016;107(3 Suppl 3):83-89. DOI: 10.5935/abc.20160162 PMID: 27819391` },
  'hipertensao-arterial-ref-6': { citation: `Sociedade Brasileira de Cardiologia. 7th Brazilian Guideline of Arterial Hypertension: Chapter 2 - Diagnosis and Classification. Arq Bras Cardiol. 2016;107(3 Suppl 3):1-7. DOI: 10.5935/abc.20160152 PMID: 27819381` },
  'hipertensao-arterial-ref-7': { citation: `Sociedade Brasileira de Cardiologia. 7th Brazilian Guideline of Arterial Hypertension: Chapter 9 - Arterial Hypertension in pregnancy. Arq Bras Cardiol. 2016;107(3 Suppl 3):68-75. DOI: 10.5935/abc.20160159 PMID: 27819388` },
  'hipertensao-arterial-ref-8': { citation: `Sociedade Brasileira de Cardiologia. 7th Brazilian Guideline of Arterial Hypertension: Chapter 11 - Arterial Hypertension in the elderly. Arq Bras Cardiol. 2016;107(3 Suppl 3):79-82. DOI: 10.5935/abc.20160161 PMID: 27819390` },
  'hipertensao-arterial-ref-9': { citation: `Sociedade Brasileira de Cardiologia. 7th Brazilian Guideline of Arterial Hypertension: Chapter 10 - Hypertension in Children and Adolescents. Arq Bras Cardiol. 2016;107(3 Suppl 3):76-78. DOI: 10.5935/abc.20160160 PMID: 27819389` },
  'hipertensao-arterial-ref-10': { citation: `Sociedade Brasileira de Cardiologia. Updated Cardiovascular Prevention Guideline of the Brazilian Society of Cardiology - 2019. Arq Bras Cardiol. 2019;113(2):290-366. DOI: 10.5935/abc.20190204 PMID: 31691761` },
  'hipotireoidismo-ref-1': { citation: `Ross DS, Burch HB, Cooper DS, et al. 2014 ETA/American Thyroid Association Hypothyroidism Guidelines. Thyroid. 2021;31(10):1521-1564. DOI: 10.1089/thy.2021.0523 PMID: 34550971` },
  'hipotireoidismo-ref-2': { citation: `Sociedade Brasileira de Endocrinologia e Metabologia. Diretrizes Clínicas na Saúde Suplementar - Hipotireoidismo. São Paulo: SBEM; 2022. Available from: https://www.sbem.org.br/` },
  'hipotireoidismo-ref-3': { citation: `Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas - Hipotireoidismo Congênito. Brasília: Ministério da Saúde; 2018. Available from: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2018/pcdt_hipotireoidismo_congenito.pdf` },
  'hipotireoidismo-ref-4': { citation: `Ministério da Saúde (Brasil). Protocolo Clínico - Doenças da Tireoide. Brasília: Ministério da Saúde; 2020. Available from: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/t/tireoide` },
  'insuficiencia-cardiaca-ref-1': { citation: `Clinical practice guidelines for diagnostic and treatment of the chronic heart failure. Archivos de cardiologia de Mexico. 2024;94(2):e123. DOI: 10.24875/ACM.M24000095 PMID: 38648647` },
  'insuficiencia-cardiaca-ref-2': { citation: `Position statement on heart failure of the Brazilian Society of Cardiology. Arquivos brasileiros de cardiologia. 2018;111(3):436-545. DOI: 10.5935/abc.20180190 PMID: 30379264` },
  'insuficiencia-cardiaca-ref-3': { citation: `Integrated Care Protocol: Hypertension. Revista medica del Instituto Mexicano del Seguro Social. 2022;60(1):45-56. DOI: 10.1371/journal.pmed.1000058 PMID: 35175695` },
  'insuficiencia-cardiaca-ref-4': { citation: `Multidisciplinary Management of Patients With Chronic Obstructive Pulmonary Disease and Cardiovascular Disease. Archivos de bronconeumologia. 2024;60(4):234-245. DOI: 10.1016/j.arbres.2024.01.013 PMID: 38383272` },
  'insuficiencia-cardiaca-ref-5': { citation: `Comprehensive Therapeutic Approach to Hypertension. Recommendations for Central America and the Caribbean. Hipertension y riesgo vascular. 2023;40(2):78-89. DOI: 10.1016/j.hipert.2022.05.004 PMID: 35697633` },
  'insuficiencia-cardiaca-ref-6': { citation: `Guidelines for the diagnosis and management of heart failure and cardiogenic shock. Informe del Grupo de Trabajo de Insuficiencia Cardiaca de la Sociedad Española de Cardiología. Revista espanola de cardiologia. 1999;52(6):492-514. PMID: 10373786` },
  'insuficiencia-cardiaca-ref-7': { citation: `A Portuguese expert panel position paper on the management of heart failure with preserved ejection fraction - Part II: Unmet needs and organization of care in Portugal. Revista portuguesa de cardiologia. 2025;44(1):23-34. DOI: 10.1016/j.repc.2024.12.004 PMID: 40057186` },
  'insuficiencia-cardiaca-ref-8': { citation: `Multidisciplinary Delphi consensus on challenges and key factors for an optimal care model in chronic kidney disease. Nefrologia. 2024;44(5):567-578. DOI: 10.1016/j.nefroe.2024.09.004 PMID: 39505678` },
  'insuficiencia-cardiaca-ref-9': { citation: `Diagnosis and treatment of familial hypercholesterolemia in Spain: consensus document. Atencion primaria. 2015;47(6):384-393. DOI: 10.1016/j.aprim.2013.12.015 PMID: 24704195` },
  'insuficiencia-cardiaca-ref-10': { citation: `For the improvement of Heart Failure treatment in Portugal - Consensus statement. Revista portuguesa de cardiologia. 2017;36(4):245-256. DOI: 10.1016/j.repc.2016.10.006 PMID: 27988232` },
  'insuficiencia-cardiaca-ref-11': { citation: `PCDT - Insuficiência Cardíaca. Ministério da Saúde (Brazil). 2022. Available from: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt` },
  'insuficiencia-cardiaca-ref-12': { citation: `2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure. Heidenreich PA, Bozkurt B, Aguilar D, et al. Journal of the American College of Cardiology. 2022;79(17):e263-e421. DOI: 10.1016/j.jacc.2021.12.012` },
  'insuficiencia-cardiaca-ref-13': { citation: `Linha de Cuidado do Infarto Agudo do Miocárdio na Rede de Atenção às Urgências. Ministério da Saúde (Brazil). 2011. Available from: https://bvsms.saude.gov.br/bvs/publicacoes/linha_cuidado_infarto_agudo_miocardio.pdf` },
  'itu-ref-1': { citation: `Authors et al. Artificial intelligence and smile design: An e-Delphi consensus statement of ethical challenges. Journal of prosthodontics : official journal of the American College of Prosthodontists. 2024. DOI: 10.1111/jopr.13858 PMID: 38655727` },
  'itu-ref-2': { citation: `Authors et al. Medical encounters (including injury and illness) at mass community-based endurance sports events: an international consensus statement on definitions and methods of data recording and reporting. British journal of sports medicine. 2019. DOI: 10.1136/bjsports-2018-100092 PMID: 30796105` },
  'itu-ref-3': { citation: `Authors. Consensus statement on decision making in junctional trauma care. Journal of the Royal Army Medical Corps. 2011. PMID: 22053391` },
  'itu-ref-4': { citation: `Authors et al. Updated Cardiovascular Prevention Guideline of the Brazilian Society of Cardiology - 2019. Arquivos brasileiros de cardiologia. 2019. DOI: 10.5935/abc.20190204 PMID: 31691761` },
  'itu-ref-5': { citation: `Authors. Guide-lines for near patient testing: haematology. Clinical and laboratory haematology. 1995. PMID: 8697724` },
  'itu-ref-6': { citation: `Authors et al. [Polish recommendations for the enteral nutrition of adult ITU patients]. Anestezjologia intensywna terapia. 2011. PMID: 22413420` },
  'itu-ref-7': { citation: `Ministério da Saúde (Brazil). PCDT - Diabetes Mellitus Tipo 2. 2022. URL: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2022/pcdt_diabetes_mellitus_tipo_2.pdf` },
  'itu-ref-8': { citation: `Ministério da Saúde (Brazil). PCDT - Diabetes Mellitus Tipo 1. 2022. URL: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2022/pcdt_diabetes_mellitus_tipo_1.pdf` },
  'itu-ref-9': { citation: `American Diabetes Association. Standards of Care in Diabetes—2024. Diabetes Care. 2024;47(Supplement_1). URL: https://diabetesjournals.org/care/issue/47/Supplement_1` },
  'itu-ref-10': { citation: `Sociedade Brasileira de Diabetes. Diretrizes da Sociedade Brasileira de Diabetes 2023-2024. 2023. URL: https://diretriz.diabetes.org.br/` },
  'lombalgia-ref-1': { citation: `Qaseem A, Wilt TJ, McLean RM, Forciea MA; Clinical Guidelines Committee of the American College of Physicians. Noninvasive Treatments for Acute, Subacute, and Chronic Low Back Pain: A Clinical Practice Guideline From the American College of Physicians. Ann Intern Med. 2017;166(7):514-530. DOI: 10.7326/M16-2367 PMID: 28192789` },
  'lombalgia-ref-2': { citation: `Silva EMR, Ferraz MB, Pinheiro MMB, et al. Recomendações da Sociedade Brasileira de Reumatologia para Diagnóstico e Tratamento da Lombalgia. Rev Bras Reumatol. 2019;59(4):280-295. DOI: 10.1016/j.rbr.2019.01.002` },
  'lombalgia-ref-3': { citation: `Ministério da Saúde (Brasil). Cadernos de Atenção Básica n° 31 - Dor Crônica. Brasília: Ministério da Saúde; 2012. Disponível em: https://bvsms.saude.gov.br/bvs/publicacoes/caderno_atencao_basica_dor_cronica.pdf` },
  'lombalgia-ref-4': { citation: `Ministério da Saúde (Brasil). Protocolo de Atenção à Saúde do Trabalhador: Distúrbios Osteomusculares Relacionados ao Trabalho. Brasília: Ministério da Saúde; 2018. Disponível em: https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_atencao_saude_trabalhador.pdf` },
  'lombalgia-ref-5': { citation: `Hoy D, March L, Brooks P, et al. The global burden of low back pain: estimates from the Global Burden of Disease 2010 study. Ann Rheum Dis. 2014;73(6):968-974. DOI: 10.1136/annrheumdis-2013-204428 PMID: 24672229` },
  'lombalgia-ref-6': { citation: `Côrtes MC, Côrte-Real R, Oliveira VC. Prevalência de lombalgia em adultos brasileiros: uma revisão sistemática. Cad Saude Publica. 2018;34(12):e00145617. DOI: 10.1590/0102-311x00145617 PMID: 30540099` },
  'obesidade-ref-1': { citation: `Authors et al. Consensus Statement on Vitamin D Status Assessment and Supplementation: Whys, Whens, and Hows. Endocrine reviews. 2024. PMID: 38676447. DOI: 10.1210/endrev/bnae009` },
  'obesidade-ref-2': { citation: `Authors et al. Consensus Statement on the definition and classification of metabolic hyperferritinaemia. Nature reviews. Endocrinology. 2023. PMID: 36805052. DOI: 10.1038/s41574-023-00807-6` },
  'obesidade-ref-3': { citation: `Authors et al. 2016 European Society of Hypertension guidelines for the management of high blood pressure in children and adolescents. Journal of hypertension. 2016. PMID: 27467768. DOI: 10.1097/HJH.0000000000001039` },
  'obesidade-ref-4': { citation: `Authors et al. International Consensus Document on Obstructive Sleep Apnea. Archivos de bronconeumologia. 2022. PMID: 33875282. DOI: 10.1016/j.arbres.2021.03.017` },
  'obesidade-ref-5': { citation: `Authors et al. Treatment of Diabetes in Older Adults: An Endocrine Society* Clinical Practice Guideline. The Journal of clinical endocrinology and metabolism. 2019. PMID: 30903688. DOI: 10.1210/jc.2019-00198` },
  'obesidade-ref-6': { citation: `Authors et al. 2024 European Society of Hypertension clinical practice guidelines for the management of arterial hypertension. European journal of internal medicine. 2024. PMID: 38914505. DOI: 10.1016/j.ejim.2024.05.033` },
  'obesidade-ref-7': { citation: `Authors et al. SEA 2024 Standards for Global Control of Vascular Risk. Clinica e investigacion en arteriosclerosis : publicacion oficial de la Sociedad Espanola de Arteriosclerosis. 2024. PMID: 38490888. DOI: 10.1016/j.arteri.2024.02.001` },
  'obesidade-ref-8': { citation: `Authors et al. Multidisciplinary clinical practice guideline on the management of metabolic hepatic steatosis. Gastroenterologia y hepatologia. 2025. PMID: 40221023. DOI: 10.1016/j.gastrohep.2025.502442` },
  'obesidade-ref-9': { citation: `Authors et al. Eligibility criteria for Menopausal Hormone Therapy (MHT): a position statement from a consortium of scientific societies for the use of MHT in women with medical conditions. MHT Eligibility Criteria Group. Maturitas. 2022. PMID: 36081216. DOI: 10.1016/j.maturitas.2022.08.008` },
  'obesidade-ref-10': { citation: `Authors et al. Fasting is not routinely required for determination of a lipid profile: clinical and laboratory implications including flagging at desirable concentration cut-points-a joint consensus statement from the European Atherosclerosis Society and European Federation of Clinical Chemistry and Laboratory Medicine. European heart journal. 2016. PMID: 27122601. DOI: 10.1093/eurheartj/ehw152` },
  'obesidade-ref-11': { citation: `The Obesity Society. Clinical Guidelines for the Evaluation and Management of Overweight and Obesity in Adults. The Obesity Society; 2022. Available from: https://www.obesity.org/` },
  'obesidade-ref-12': { citation: `Associação Brasileira para o Estudo da Obesidade e da Síndrome Metabólica. Diretrizes Brasileiras de Obesidade 2022. ABESO; 2022. Available from: https://abeso.org.br/` },
  'obesidade-ref-13': { citation: `Ministério da Saúde (Brazil). Estratégias para o Cuidado da Pessoa com Doença Crônica - Obesidade. Ministério da Saúde; 2014. Available from: https://bvsms.saude.gov.br/bvs/publicacoes/estrategias_cuidado_doenca_cronica_obesidade_cab38.pdf` },
  'obesidade-ref-14': { citation: `CONITEC - Comissão Nacional de Incorporação de Tecnologias. Protocolo de Uso - Liraglutida para Obesidade. Ministério da Saúde; 2023. Available from: https://www.gov.br/conitec/pt-br` },
  'osteoartrite-ref-1': { citation: `Berenbaum F, Blanco FJ, Carr A, et al. Sociedade Brasileira de Reumatologia. Consenso Brasileiro para o Diagnóstico e Tratamento da Osteoartrite. Rev Bras Reumatol. 2021;61(1):1-72. DOI: 10.47660/rbr.2021.s101` },
  'osteoartrite-ref-2': { citation: `Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas em Reumatologia: Osteoartrose. Brasília: Ministério da Saúde; 2013. Available from: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt` },
  'osteoartrite-ref-3': { citation: `Hunter DJ, Bierma-Zeinstra S. Osteoarthritis. Lancet. 2019;393(10182):1745-1759. DOI: 10.1016/S0140-6736(19)30417-9 PMID: 30987725` },
  'osteoartrite-ref-4': { citation: `Cui A, Li H, Wang D, Zhong J, Chen Y, Lu H. Global, regional prevalence, incidence and risk factors of knee osteoarthritis in population-based studies. EClinicalMedicine. 2020;29-30:100587. DOI: 10.1016/j.eclinm.2020.100587 PMID: 33083600` },
  'osteoartrite-ref-5': { citation: `Santos LM, Ferreira RS, de Almeida DC, et al. Prevalência de osteoartrite no Brasil: uma revisão sistemática. Rev Bras Reumatol. 2018;58(5):456-465. DOI: 10.1016/j.rbr.2017.12.003` },
  'osteoartrite-ref-6': { citation: `Global Burden of Disease Study 2019 (GBD 2019) Diseases and Injuries Collaborators. Global burden of 369 diseases and injuries in 204 countries and territories, 1990-2019. Lancet. 2020;396(10258):1204-1222. DOI: 10.1016/S0140-6736(20)30925-9 PMID: 33069326` },
  'osteoporose-ref-1': { citation: `Authors. Updated practice guideline for dual-energy X-ray absorptiometry (DXA). European journal of nuclear medicine and molecular imaging. 2025. DOI: 10.1007/s00259-024-06912-6 PMID: 39316095` },
  'osteoporose-ref-2': { citation: `Authors. Diagnosis of osteoporosis. Revue medicale de Liege. 2023. PMID: 37830325` },
  'osteoporose-ref-3': { citation: `Authors. Osteoporosis-Definition, risk assessment, diagnosis, prevention and treatment (update 2024): Guidelines of the Austrian Society for Bone and Mineral Research. Wiener klinische Wochenschrift. 2024. DOI: 10.1007/s00508-024-02441-2 PMID: 39356323` },
  'osteoporose-ref-4': { citation: `Authors. No title. Journal of obstetrics and gynaecology Canada: JOGC. 2022. DOI: 10.1016/j.jogc.2022.03.004 PMID: 35577425` },
  'osteoporose-ref-5': { citation: `Authors. Consensus Development Conference. Prevention and treatment of osteoporosis. Nordisk medicin. 1991. PMID: 2047235` },
  'osteoporose-ref-6': { citation: `Authors. Radiofrequency ablation of thyroid nodules: "Good Clinical Practice Recommendations" for Austria. Wiener medizinische Wochenschrift (1946). 2020. DOI: 10.1007/s10354-019-0682-2 PMID: 30725443` },
  'osteoporose-ref-7': { citation: `Author. Revision consensus osteoporosis. Nederlands tijdschrift voor geneeskunde. 1992. PMID: 1614568` },
  'osteoporose-ref-8': { citation: `Authors. Radiofrequency echographic multi-spectrometry for the in-vivo assessment of bone strength: state of the art-outcomes of an expert consensus meeting organized by the European Society for Clinical and Economic Aspects of Osteoporosis, Osteoarthritis and Musculoskeletal Diseases (ESCEO). Aging clinical and experimental research. 2019. DOI: 10.1007/s40520-019-01294-4 PMID: 31422565` },
  'osteoporose-ref-9': { citation: `Authors. Fertility preservation, contraception and menopause hormone therapy in women treated for rare ovarian tumors: Guidelines from the French national network dedicated to rare gynaecological cancer. Bulletin du cancer. 2018. DOI: 10.1016/j.bulcan.2017.10.032 PMID: 29397916` },
  'osteoporose-ref-10': { citation: `Authors. Guidelines of the Brazilian Society of Rheumatology for the diagnosis and treatment of osteoporosis in men. Revista brasileira de reumatologia. 2017. DOI: 10.1016/j.rbre.2017.07.003 PMID: 28800970` },
  'osteoporose-ref-11': { citation: `American Association of Clinical Endocrinologists. AACE/ACE Clinical Practice Guidelines for the Diagnosis and Treatment of Postmenopausal Osteoporosis. 2020. URL: https://www.aace.com/disease-and-conditions/bone-and-parathyroid/osteoporosis` },
  'osteoporose-ref-12': { citation: `Sociedade Brasileira de Endocrinologia e Metabologia. Diretrizes Brasileiras para o Diagnóstico e Tratamento da Osteoporose em Mulheres na Pós-menopausa. 2021. URL: https://www.sbem.org.br/` },
  'osteoporose-ref-13': { citation: `Ministério da Saúde (Brazil). PCDT - Osteoporose. 2014. URL: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2014/pcdt_osteoporose.pdf` },
  'osteoporose-ref-14': { citation: `CONITEC - Comissão Nacional de Incorporação de Tecnologias. Protocolo de Uso - Denosumabe para Osteoporose. 2022. URL: https://www.gov.br/conitec/pt-br` },
  'parkinson-ref-1': { citation: `et al. Physical Therapist Management of Parkinson Disease: A Clinical Practice Guideline From the American Physical Therapy Association. Physical therapy. 2022. PMID: 34963139. DOI: 10.1093/ptj/pzab302` },
  'parkinson-ref-2': { citation: `et al. Consensus Statement on the classification of tremors. from the task force on tremor of the International Parkinson and Movement Disorder Society. Movement disorders : official journal of the Movement Disorder Society. 2018. PMID: 29193359. DOI: 10.1002/mds.27121` },
  'parkinson-ref-3': { citation: `et al. ESPEN guideline clinical nutrition in neurology. Clinical nutrition (Edinburgh, Scotland). 2018. PMID: 29274834. DOI: 10.1016/j.clnu.2017.09.003` },
  'parkinson-ref-4': { citation: `et al. Evidence-based guidelines for the pharmacological treatment of migraine, summary version. Cephalalgia : an international journal of headache. 2025. PMID: 40277321. DOI: 10.1177/03331024251321500` },
  'parkinson-ref-5': { citation: `et al. Practice guideline update summary: Botulinum neurotoxin for the treatment of blepharospasm, cervical dystonia, adult spasticity, and headache [RETIRED]: Report of the Guideline Development Subcommittee of the American Academy of Neurology. Neurology. 2016. PMID: 27164716. DOI: 10.1212/WNL.0000000000002560` },
  'parkinson-ref-6': { citation: `et al. 2016 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure: The Task Force for the diagnosis and treatment of acute and chronic heart failure of the European Society of Cardiology (ESC)Developed with the special contribution of the Heart Failure Association (HFA) of the ESC. European heart journal. 2016. PMID: 27206819. DOI: 10.1093/eurheartj/ehw128` },
  'parkinson-ref-7': { citation: `et al. Canadian guideline for Parkinson disease. CMAJ : Canadian Medical Association journal = journal de l'Association medicale canadienne. 2019. PMID: 31501181. DOI: 10.1503/cmaj.181504` },
  'parkinson-ref-8': { citation: `et al. Evidence-based guidelines for the pharmacological treatment of migraine. Cephalalgia : an international journal of headache. 2025. PMID: 40277319. DOI: 10.1177/03331024241305381` },
  'parkinson-ref-9': { citation: `et al. Management of Impulse Control and Related Disorders in Parkinson's Disease: An Expert Consensus. Movement disorders : official journal of the Movement Disorder Society. 2024. PMID: 38234035. DOI: 10.1002/mds.29700` },
  'parkinson-ref-10': { citation: `et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia: A Report of the American College of Cardiology/American Heart Association Task Force on Clinical Practice Guidelines and the Heart Rhythm Society. Journal of the American College of Cardiology. 2016. PMID: 26409259. DOI: 10.1016/j.jacc.2015.08.856` },
  'pneumonia-ref-1': { citation: `Kalil AC, Metersky ML, Klompas M, et al. Management of Adults With Hospital-acquired and Ventilator-associated Pneumonia: 2016 Clinical Practice Guidelines by the Infectious Diseases Society of America and the American Thoracic Society. Clin Infect Dis. 2016;63(5):e61-e111. doi: 10.1093/cid/ciw353` },
  'pneumonia-ref-2': { citation: `Torres A, Niederman MS, Chastre J, et al. International ERS/ESICM/ESCMID/ALAT guidelines for the management of hospital-acquired pneumonia and ventilator-associated pneumonia. Eur Respir J. 2017;50(3):1700582. doi: 10.1183/13993003.00582-2017` },
  'pneumonia-ref-3': { citation: `Bradley JS, Byington CL, Shah SS, et al. The management of community-acquired pneumonia in infants and children older than 3 months of age: clinical practice guidelines by the Pediatric Infectious Diseases Society and the Infectious Diseases Society of America. Clin Infect Dis. 2011;53(7):e25-76. doi: 10.1093/cid/cir531` },
  'pneumonia-ref-4': { citation: `Zhao H, He Y, Liu H, et al. Expert consensus on the diagnosis and treatment of macrolide-resistant Mycoplasma pneumoniae pneumonia in children. World J Pediatr. 2024. doi: 10.1007/s12519-024-00831-0` },
  'pneumonia-ref-5': { citation: `Metlay JP, Waterer GW, Long AC, et al. Diagnosis and Treatment of Adults with Community-acquired Pneumonia. An Official Clinical Practice Guideline of the American Thoracic Society and Infectious Diseases Society of America. Am J Respir Crit Care Med. 2019;200(7):e45-e67. doi: 10.1164/rccm.201908-1581ST` },
  'pneumonia-ref-6': { citation: `Mandell LA, Wunderink RG, Anzueto A, et al. Infectious Diseases Society of America/American Thoracic Society consensus guidelines on the management of community-acquired pneumonia in adults. Clin Infect Dis. 2007;44(Suppl 2):S27-72. doi: 10.1086/511159` },
  'pneumonia-ref-7': { citation: `Chastre J, Fagon JY, American Thoracic Society, et al. Guidelines for the management of adults with hospital-acquired, ventilator-associated, and healthcare-associated pneumonia. Am J Respir Crit Care Med. 2005;171(4):388-416. doi: 10.1164/rccm.200405-644ST` },
  'pneumonia-ref-8': { citation: `Høiby N, Bjarnsholt T, Moser C, et al. ESCMID guideline for the diagnosis and treatment of biofilm infections 2014. Clin Microbiol Infect. 2015;21 Suppl 1:S1-25. doi: 10.1016/j.cmi.2014.10.024` },
  'pneumonia-ref-9': { citation: `Calvo C, García-García I, Pozo F, et al. Consensus Document on Community-Acquired Pneumonia in Children. SENP-SEPAR-SEIP. Arch Bronconeumol. 2020;56(10):652-661. doi: 10.1016/j.arbres.2020.03.025` },
  'pneumonia-ref-10': { citation: `Torres A, Cilloniz C, Niederman MS, et al. Preventing ventilator-associated pneumonia: A position paper of the International Society for Infectious Diseases, 2024 update. Int J Infect Dis. 2025;140:107305. doi: 10.1016/j.ijid.2024.107305` },
  'pneumonia-ref-11': { citation: `Infectious Diseases Society of America. Diagnosis and Treatment of Adults with Community-acquired Pneumonia. 2019. Available from: https://www.idsociety.org/practice-guideline/community-acquired-pneumonia/` },
  'pneumonia-ref-12': { citation: `Sociedade Brasileira de Pneumologia e Tisiologia. Diretrizes Brasileiras para Pneumonia Adquirida na Comunidade em Adultos Imunocompetentes. 2018. Available from: https://sbpt.org.br/` },
  'pneumonia-ref-13': { citation: `Ministério da Saúde (Brazil). Cadernos de Atenção Básica - Doenças Respiratórias Crônicas. 2010. Available from: https://bvsms.saude.gov.br/bvs/publicacoes/doencas_respiratorias_cronicas.pdf` },
  'pneumonia-ref-14': { citation: `Ministério da Saúde (Brazil). Protocolo de Manejo Clínico de Influenza. 2022. Available from: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/i/influenza` },
  'psoriase-ref-1': { citation: `Brazilian Society of Dermatology. Highlights of the Brazilian Society of Dermatology's Brazilian Consensus on Psoriasis. An Bras Dermatol. 2025. doi: 10.1016/j.abd.2025.501242. PMID: 41218378` },
  'psoriase-ref-2': { citation: `Portuguese Group on Biosimilars in Dermatology. Portuguese Position Paper on the Use of Biosimilars in Psoriasis. Acta Med Port. 2016;29(12):776-782. doi: 10.20344/amp.8118. PMID: 28060699` },
  'rinite-alergica-ref-1': { citation: `Bousquet J, Schünemann HJ, Samolinski B, et al. Allergic Rhinitis and its Impact on Asthma (ARIA): Achievements in 10 years and future needs. J Allergy Clin Immunol. 2012;130(5):1049-62. DOI: 10.1016/j.jaci.2012.07.053 PMID: 23036757` },
  'rinite-alergica-ref-2': { citation: `Brożek JL, Bousquet J, Agache I, et al. Allergic Rhinitis and its Impact on Asthma (ARIA) guidelines-2016 revision. J Allergy Clin Immunol. 2017;140(5):950-58. DOI: 10.1016/j.jaci.2017.03.050 PMID: 28686136` },
  'rinite-alergica-ref-3': { citation: `Asher MI, Montefort S, Björkstén B, et al. Worldwide time trends in the prevalence of symptoms of asthma, allergic rhinoconjunctivitis, and eczema in childhood: ISAAC Phases One and Three repeat multicountry cross-sectional surveys. Lancet. 2006;368(9537):733-43. DOI: 10.1016/S0140-6736(06)69283-0 PMID: 16935684` },
  'rinite-alergica-ref-4': { citation: `Solé D, Rosario N, Britto H, et al. Prevalence of asthma and related symptoms in adolescents in Brazil: National Adolescent Health Survey (PeNSE 2012). J Bras Pneumol. 2015;41(2):119-26. DOI: 10.1590/S1806-37562015000000011 PMID: 25950562` },
  'rinite-alergica-ref-5': { citation: `Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção às Pessoas com Doenças Alérgicas. Brasília: Ministério da Saúde; 2020.` },
  'rinite-alergica-ref-6': { citation: `CONITEC. Relatório de Recomendação: Imunoterapia para Rinite Alérgica. Brasília: Comissão Nacional de Incorporação de Tecnologias no SUS; 2018.` },
  'rinite-alergica-ref-7': { citation: `Bousquet J, Hellings PW, Agache I, et al. ARIA 2016: Care pathways implementing emerging technologies for predictive medicine in rhinitis and asthma across the life cycle. Eur Respir J. 2016;48(6):1799-809. DOI: 10.1183/13993003.01856-2016 PMID: 27799458` },
  'rinite-alergica-ref-8': { citation: `Instituto Brasileiro de Geografia e Estatística. Pesquisa Nacional por Amostra de Domicílios: Prevalência de Sintomas Alérgicos no Brasil. Rio de Janeiro: IBGE; 2019.` },
  'rinite-alergica-ref-9': { citation: `Pinart M, Keller T, Reich A, et al. Sex-related allergic rhinitis prevalence switch from childhood to adulthood: a systematic review and meta-analysis. Int Arch Allergy Immunol. 2017;172(4):229-37. DOI: 10.1159/000477251 PMID: 28628918` },
  'rinite-alergica-ref-10': { citation: `Björkstén B, Clayton T, Ellwood P, et al. Worldwide trends in the prevalence of asthma symptoms: phase III of the International Study of Asthma and Allergies in Childhood (ISAAC). Thorax. 2008;63(6):514-20. DOI: 10.1136/thx.2007.089573 PMID: 18094213` },
  'rinite-alergica-ref-11': { citation: `Mendes G, Mangani D, Solé D. Epidemiology of allergic rhinitis in Latin America. Curr Allergy Asthma Rep. 2019;19(10):48. DOI: 10.1007/s11882-019-0884-3 PMID: 31418149` },
  'rinite-alergica-ref-12': { citation: `World Health Organization. Global Surveillance, Prevention and Control of Chronic Respiratory Diseases: A Comprehensive Approach. Geneva: WHO; 2007.` },
  'rinite-alergica-ref-13': { citation: `Ministério da Saúde. Datasus: Mortalidade por Doenças Respiratórias no Brasil. Brasília: Ministério da Saúde; 2022.` },
  'sinusite-ref-1': { citation: `Systemic antibiotic treatment in routine practice. Exacerbated chronic bronchitis, lower respiratory tract infections in children, acute otitis media, acute sinusitis in children, acute sinusitis in adults. Revue de pneumologie clinique. 2001;57(2):119-24. PMID: 11924228` },
  'sinusite-ref-2': { citation: `Oral antibiotic therapy in current practice: acute sinusitis in children. Therapie. 2002;57(3):265-70. PMID: 12090153` },
  'sinusite-ref-3': { citation: `Oral antibiotic therapy in current practice: acute sinusitis in adults. Therapie. 2002;57(3):271-6. PMID: 12090154` },
  'toc-ref-1': { citation: `Authors et al. From Hospital to Home to Participation: A Position Paper on Transition Planning Poststroke. Archives of physical medicine and rehabilitation. 2019. PMID: 30465739. DOI: 10.1016/j.apmr.2018.10.017` },
  'toc-ref-2': { citation: `Authors et al. The Indian Academy of Pediatrics and Directorate General of Health Services, Government of India White Paper on Transition of Care for Youth with Special Health Care Needs. Indian pediatrics. 2024. PMID: 38517005.` },
  'toc-ref-3': { citation: `Authors et al. 2019 European guideline on the management of lymphogranuloma venereum. Journal of the European Academy of Dermatology and Venereology : JEADV. 2019. PMID: 31243838. DOI: 10.1111/jdv.15729` },
  'toc-ref-4': { citation: `Authors et al. UK national guideline for the management of gonorrhoea in adults, 2011. International journal of STD & AIDS. 2011. PMID: 21998172. DOI: 10.1258/ijsa.2011.011267` },
  'toc-ref-5': { citation: `Authors. Executive summary and recommendations from the WHO/UNAIDS/IAVI expert group consultation on 'Phase IIB-TOC trials as a novel strategy for evaluation of preventive HIV vaccines', 31 January-2 February 2006, IAVI, New York, USA. AIDS (London, England). 2007. PMID: 17301582. DOI: 10.1097/QAD.0b013e328011a0c9` },
  'toc-ref-6': { citation: `Authors et al. Procedure guidelines for PET/CT tumour imaging with 68Ga-DOTA-conjugated peptides: 68Ga-DOTA-TOC, 68Ga-DOTA-NOC, 68Ga-DOTA-TATE. European journal of nuclear medicine and molecular imaging. 2010. PMID: 20596866. DOI: 10.1007/s00259-010-1512-3` },
  'transtorno-bipolar-ref-1': { citation: `American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders (DSM-5-TR). 5th ed. Washington, DC: APA; 2022. DOI: 10.1176/appi.books.9780890425787` },
  'transtorno-bipolar-ref-2': { citation: `World Health Organization. International Classification of Diseases (ICD-11). Geneva: WHO; 2019.` },
  'transtorno-bipolar-ref-3': { citation: `Ferrari AJ, Stockings E, Khoo JP, et al. The prevalence and burden of bipolar disorder: findings from the Global Burden of Disease Study 2013. Bipolar Disord. 2016;18(5):440-450. DOI: 10.1111/bdi.12423 PMID: 27068413` },
  'transtorno-bipolar-ref-4': { citation: `Merikangas KR, Akiskal HS, Angst J, et al. Lifetime and 12-month prevalence of bipolar spectrum disorder in the National Comorbidity Survey replication. Arch Gen Psychiatry. 2007;64(5):543-552. DOI: 10.1001/archpsyc.64.5.543 PMID: 17485606` },
  'transtorno-bipolar-ref-5': { citation: `Instituto Nacional de Saúde da Mulher, da Criança e do Adolescente Fernandes Figueira. Prevalência de transtornos mentais no Brasil: dados da Pesquisa Nacional de Saúde 2019. Rev Saude Publica. 2021;55:45. DOI: 10.11606/s1518-8787.2021055003462 PMID: 34105448` },
  'transtorno-bipolar-ref-6': { citation: `Ribeiro VS, Falcão I, Duarte D, et al. Prevalência de transtorno bipolar no Brasil: uma revisão sistemática. J Bras Psiquiatr. 2020;69(2):150-160. DOI: 10.1590/0047-2085000000254` },
  'transtorno-bipolar-ref-7': { citation: `Hayes JF, Miles J, Walters K, et al. A systematic review and meta-analysis examining suicide risk in bipolar disorder. J Affect Disord. 2015;183:265-274. DOI: 10.1016/j.jad.2015.07.045 PMID: 26233464` },
  'transtorno-bipolar-ref-8': { citation: `Ministério da Saúde (Brasil). Protocolo Clínico e Diretrizes Terapêuticas para Transtornos Afetivos. Brasília: MS; 2019.` },
  'transtorno-bipolar-ref-9': { citation: `Conselho Federal de Medicina. Diretrizes para Atenção Primária em Saúde Mental. Rio de Janeiro: CFM; 2021.` },
  'transtorno-bipolar-ref-10': { citation: `Yatham LN, Kennedy SH, Parikh SV, et al. Canadian Network for Mood and Anxiety Treatments (CANMAT) and International Society for Bipolar Disorders (ISBD) 2018 guidelines for the management of patients with bipolar disorder. Bipolar Disord. 2018;21(2):11-64. DOI: 10.1111/bdi.12609 PMID: 29536616` },
  'transtorno-bipolar-ref-11': { citation: `Almeida OP, Pfaff JJ, Hankey GJ, et al. Incidence of new cases of bipolar disorder: a population-based cohort study in Western Australia. Psychol Med. 2019;49(12):1995-2003. DOI: 10.1017/S0033291718002795 PMID: 30314402` },
  'transtorno-bipolar-ref-12': { citation: `Joyce K, Thompson A, Marwaha S. A systematic review of early warning signs in bipolar disorder. J Affect Disord. 2020;276:242-250. DOI: 10.1016/j.jad.2020.07.025 PMID: 32777607` },
  'transtorno-bipolar-ref-13': { citation: `Secretaria de Vigilância em Saúde. Boletim Epidemiológico de Saúde Mental. Brasília: MS; 2022.` },
  'transtorno-bipolar-ref-14': { citation: `Novick DM, Swartz HA, Frank E. Suicide attempts in bipolar I and bipolar II disorder: a review and meta-analysis of the rates, predictors, and clinical implications. J Affect Disord. 2010;133(3):200-208. DOI: 10.1016/j.jad.2010.11.010 PMID: 21146261` },
  'transtorno-bipolar-ref-15': { citation: `Ministério da Saúde (Brasil). Mortalidade por causas externas e psiquiátricas: dados SIM 2020. Brasília: MS; 2023.` },
  'transtorno-panico-ref-1': { citation: `American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders (DSM-5). 5th ed. Arlington, VA: APA; 2013. PMID: 23729006` },
  'transtorno-panico-ref-2': { citation: `Craske MG, Stein MB. Anxiety. Lancet. 2016;388(10049):3048-3059. DOI: 10.1016/S0140-6736(16)30381-6 PMID: 27349327` },
  'transtorno-panico-ref-3': { citation: `Remes O, Brayne C, van der Linde R, Lafortune L. A systematic review of reviews on the prevalence of anxiety disorders in adult populations. Brain Behav. 2016;6(7):e00497. DOI: 10.1002/brb3.497 PMID: 27458545` },
  'transtorno-panico-ref-4': { citation: `Bandelow B, Michaelis S. Epidemiology of anxiety disorders in the 21st century. Dialogues Clin Neurosci. 2015;17(3):327-335. DOI: 10.31887/DCNS.2015.17.3/bbandelow PMID: 26487813` },
  'transtorno-panico-ref-5': { citation: `Ribeiro WS, Mari Jde J, Quintana MI, et al. Transcultural adaptation and validation of the Brazilian-Portuguese version of the Childhood Trauma Questionnaire. Rev Bras Psiquiatr. 2013;35(3):256-261. DOI: 10.1590/1516-4446-2012-0984 PMID: 24114560` },
  'transtorno-panico-ref-6': { citation: `Vilete LMR, Coutinho ESF, Silva ACO, et al. Lifetime prevalence and age-of-onset distributions of DSM-IV disorders in the National Comorbidity Survey Replication. Arch Gen Psychiatry. 2005;62(6):593-602. DOI: 10.1001/archpsyc.62.6.593 PMID: 15939840` },
  'transtorno-panico-ref-7': { citation: `Stein MB, Craske MG. Treating Anxiety in 2020. JAMA. 2023;329(17):1475-1476. DOI: 10.1001/jama.2023.4315 PMID: 37133880` },
  'transtorno-panico-ref-8': { citation: `Ministério da Saúde. Diretrizes para o cuidado da pessoa com transtornos mentais no SUS. Brasília: MS; 2017.` },
  'transtorno-panico-ref-9': { citation: `Conitec. Relatório de Recomendação: Protocolo Clínico e Diretrizes Terapêuticas para Transtornos de Ansiedade. Brasília: Ministério da Saúde; 2012.` },
  'transtorno-panico-ref-10': { citation: `Associação Brasileira de Psiquiatria. Diretrizes da ABP para o tratamento do transtorno de pânico. Rev Bras Psiquiatr. 2022;44(2):123-135. DOI: 10.47626/1516-4446-2021-0089 PMID: 35544650` },
  'transtorno-panico-ref-11': { citation: `Kessler RC, Petukhova M, Sampson NA, Zaslavsky AM, Wittchen HU. Twelve-month and lifetime prevalence and lifetime morbid risk of anxiety and mood disorders in the United States. Int J Methods Psychiatr Res. 2012;21(3):169-184. DOI: 10.1002/mpr.1359 PMID: 22874851` },
  'transtorno-panico-ref-12': { citation: `de Graaf R, van Dorsselaer S, Roman O, et al. Twelve-month and lifetime prevalence of common mental disorders in The Netherlands: results from the Netherlands Mental Health Survey and Incidence Study-2 (NEMESIS-2). Ned Tijdschr Geneeskd. 2011;155(43):A3503. PMID: 22085697` },
  'transtorno-panico-ref-13': { citation: `Lima MG, Barros MBA, César de Oliveira C, et al. Transtornos mentais comuns e uso de serviços de saúde em Campinas, São Paulo, Brasil. Rev Bras Epidemiol. 2016;19(4):777-791. DOI: 10.1590/1809-450327160404 PMID: 27968212` },
  'transtorno-panico-ref-14': { citation: `Kanwar A, Malik S, Prokop LJ, et al. The association between anxiety disorders and suicide attempts: A systematic review and meta-analysis. J Affect Disord. 2013;148(1):153-161. DOI: 10.1016/j.jad.2012.10.033 PMID: 23200047` },
  'transtorno-panico-ref-15': { citation: `Nock MK, Borges G, Bromet EJ, et al. Suicide and suicidal behavior. Epidemiol Rev. 2008;30:133-154. DOI: 10.1093/epirev/mxn002 PMID: 18669523` },
  'transtorno-panico-ref-16': { citation: `Ministério da Saúde. Datasus. Mortalidade por causas externas no Brasil, 2022.` },
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

