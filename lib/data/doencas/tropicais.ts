/**
 * DOENÇAS TROPICAIS E NEGLIGENCIADAS - DARWIN-MFC
 * ================================================
 *
 * Doenças tropicais de grande importância para países em desenvolvimento
 * Especialmente relevante para Brasil e outras nações tropicais
 *
 * Ontologias integradas:
 * - DOID (Disease Ontology)
 * - SNOMED-CT (Systematized Nomenclature of Medicine)
 * - MeSH (Medical Subject Headings)
 * - UMLS CUI (Unified Medical Language System)
 */

import { Doenca } from '../../types/doenca';

export const doencasTropicais: Doenca[] = [
  // ============================================================================
  // MALÁRIA
  // ============================================================================
  {
    id: 'malaria',
    titulo: 'Malária',
    sinonimos: ['Paludismo', 'Febre terçã', 'Febre quartã', 'Impaludismo'],
    doid: 'DOID:12365',
    snomedCT: '61462000',
    meshId: 'D008288',
    umlsCui: 'C0024530',
    ciap2: ['A73'],
    cid10: ['B50', 'B51', 'B52', 'B53', 'B54'],
    cid11: ['1F40'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Doença infecciosa causada por protozoários do gênero Plasmodium, transmitida por mosquitos Anopheles. P. falciparum causa a forma mais grave. Endêmica na Amazônia Legal brasileira.',
      criteriosDiagnosticos: [
        'Febre (geralmente intermitente/cíclica)',
        'Calafrios intensos, sudorese profusa',
        'Cefaleia, mialgia, artralgia',
        'Hepatoesplenomegalia',
        'Histórico de exposição em área endêmica',
        'Gota espessa ou teste rápido positivo',
        'Periodicidade: P. vivax/ovale (48h), P. malariae (72h), P. falciparum (irregular)'
      ],
      classificacaoRisco: [
        { nivel: 'baixo', criterios: ['P. vivax não complicada', 'Sem sinais de alarme'], conduta: 'Tratamento ambulatorial' },
        { nivel: 'alto', criterios: ['P. falciparum', 'Sinais de gravidade', 'Gestante', 'Extremos de idade'], conduta: 'Internação e tratamento IV' }
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratação adequada',
          'Antitérmicos (dipirona, paracetamol)',
          'Repouso',
          'Notificação compulsória imediata'
        ],
        farmacologico: [
          'P. VIVAX (não complicada):',
          'Cloroquina 25mg/kg em 3 dias + Primaquina 0,5mg/kg/dia por 7 dias',
          '',
          'P. FALCIPARUM (não complicada):',
          'Arteméter-Lumefantrina (Coartem®) 6 doses em 3 dias',
          'OU Artesunato-Mefloquina',
          '',
          'MALÁRIA GRAVE (qualquer espécie):',
          'Artesunato IV 2,4mg/kg em 0h, 12h, 24h, depois 1x/dia',
          'Completar com Coartem® após melhora'
        ]
      },
      metasTerapeuticas: [
        'Eliminação do parasita (cura clínica e parasitológica)',
        'Prevenção de recaídas (P. vivax/ovale - hipnozoítos)',
        'Prevenção de complicações graves',
        'Cura radical com primaquina'
      ],
      examesIniciais: [
        'Gota espessa (padrão-ouro)',
        'Teste rápido (HRP2 para P. falciparum)',
        'Hemograma (anemia, plaquetopenia)',
        'Função renal e hepática',
        'Glicemia',
        'Bilirrubinas',
        'Gasometria (se grave)'
      ],
      redFlags: [
        'Alteração do nível de consciência (malária cerebral)',
        'Insuficiência respiratória (SDRA)',
        'Icterícia intensa (Bb>3mg/dL)',
        'Hemoglobinúria ("black water fever")',
        'Hipoglicemia (<40mg/dL)',
        'Acidose metabólica',
        'Hiperparasitemia (>250.000/mm³)',
        'Insuficiência renal aguda',
        'Anemia grave (Hb<5g/dL)',
        'Sangramento espontâneo'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '~140.000 casos/ano no Brasil (>99% na Amazônia)',
        incidencia: '229 milhões de casos/ano no mundo (OMS)',
        mortalidade: '~400.000 mortes/ano no mundo; no Brasil <100/ano',
        faixaEtaria: 'Todas as idades; crianças <5 anos mais vulneráveis',
        fatoresRisco: [
          'Residência/viagem para área endêmica',
          'Falta de uso de mosquiteiros',
          'Horário crepuscular sem proteção',
          'Gestantes',
          'Imunossupressão',
          'Primoinfecção'
        ],
        citations: [{ refId: 'ms-malaria-2022' }]
      },
      fisiopatologia: {
        texto: 'Esporozoítos inoculados pelo mosquito infectam hepatócitos, multiplicam-se e liberam merozoítos que invadem hemácias. O ciclo eritrocítico causa hemólise, liberação de citocinas e a sintomatologia. P. vivax/ovale formam hipnozoítos hepáticos (recaídas). P. falciparum causa citoaderência e obstrução microvascular.',
        citations: [{ refId: 'who-malaria-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Febre alta (39-41°C)',
          'Calafrios (fase fria)',
          'Sudorese profusa (fase de suor)',
          'Cefaleia intensa',
          'Mialgia, artralgia',
          'Náuseas, vômitos',
          'Astenia'
        ],
        sinaisExameFisico: [
          'Esplenomegalia (comum)',
          'Hepatomegalia',
          'Palidez (anemia)',
          'Icterícia leve a moderada',
          'Taquicardia'
        ],
        formasClinicas: [
          'Malária não complicada',
          'Malária grave/complicada',
          'Malária cerebral',
          'Malária na gestação'
        ],
        citations: [{ refId: 'ms-malaria-2022' }]
      },
      diagnostico: {
        criterios: [
          'Clínica sugestiva + exposição epidemiológica',
          'Confirmação parasitológica obrigatória'
        ],
        diagnosticoDiferencial: [
          'Dengue',
          'Febre tifoide',
          'Leptospirose',
          'Hepatite viral',
          'Febre amarela',
          'Meningite',
          'Sepse'
        ],
        examesLaboratoriais: [
          'Gota espessa (identifica espécie e parasitemia)',
          'Esfregaço delgado',
          'Teste rápido imunocromatográfico',
          'Hemograma',
          'Bilirrubinas, transaminases',
          'Função renal',
          'Glicemia, lactato'
        ],
        citations: [{ refId: 'ms-malaria-2022' }]
      },
      tratamento: {
        objetivos: [
          'Eliminar o parasita',
          'Prevenir complicações',
          'Prevenir transmissão',
          'Evitar recaídas (hipnozoítos)'
        ],
        naoFarmacologico: {
          medidas: [
            'Hidratação',
            'Antitérmicos',
            'Monitorização',
            'Transfusão se Hb<5g/dL'
          ],
          citations: [{ refId: 'ms-malaria-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'P. vivax', medicamentos: ['Cloroquina 25mg/kg em 3 dias', 'Primaquina 0,5mg/kg/dia por 7 dias'], observacoes: 'Verificar deficiência de G6PD' },
            { classe: 'P. falciparum', medicamentos: ['Arteméter-Lumefantrina', 'Artesunato-Mefloquina'], posologia: '6 doses em 3 dias' }
          ],
          segundaLinha: [
            { classe: 'Malária grave', medicamentos: ['Artesunato IV 2,4mg/kg'], posologia: '0h, 12h, 24h, depois diário' }
          ],
          situacoesEspeciais: [
            { situacao: 'Gestante', conduta: 'Não usar primaquina; preferir quinina+clindamicina no 1º tri' },
            { situacao: 'G6PD deficiente', conduta: 'Primaquina 0,75mg/kg/semana por 8 semanas' }
          ],
          citations: [{ refId: 'who-malaria-2023' }]
        },
        duracao: 'Tratamento curto (3-7 dias); primaquina por 7-14 dias'
      },
      acompanhamento: {
        frequenciaConsultas: 'Controle de cura: gota espessa em D3, D7, D14, D28, D42',
        metasTerapeuticas: [
          'Negativação da parasitemia',
          'Resolução clínica',
          'Prevenção de recaída (cura radical)'
        ],
        criteriosEncaminhamento: [
          'Malária grave: UTI/Hospital de referência',
          'Gestante com malária',
          'Falha terapêutica'
        ],
        citations: [{ refId: 'ms-malaria-2022' }]
      },
      prevencao: {
        primaria: [
          'Uso de mosquiteiros impregnados com inseticida',
          'Repelentes',
          'Evitar exposição no crepúsculo',
          'Quimioprofilaxia para viajantes (mefloquina, doxiciclina, atovaquona-proguanil)',
          'Controle vetorial'
        ],
        secundaria: [
          'Diagnóstico e tratamento precoces',
          'Busca ativa de casos',
          'Notificação compulsória'
        ],
        citations: [{ refId: 'who-malaria-2023' }]
      }
    },
    protocolos: ['malaria-tratamento', 'malaria-grave'],
    medicamentos: ['cloroquina', 'primaquina', 'artemeter-lumefantrina', 'artesunato'],
    calculadoras: [],
    citations: [
      { refId: 'ms-malaria-2022' },
      { refId: 'who-malaria-2023' }
    ],
    lastUpdate: '2024-12-23'
  },

  // ============================================================================
  // DOENÇA DE CHAGAS
  // ============================================================================
  {
    id: 'doenca-chagas',
    titulo: 'Doença de Chagas',
    sinonimos: ['Tripanossomíase americana', 'Chagas', 'Mal de Chagas'],
    doid: 'DOID:12140',
    snomedCT: '77506005',
    meshId: 'D014355',
    umlsCui: 'C0041234',
    ciap2: ['A78'],
    cid10: ['B57', 'B57.0', 'B57.1', 'B57.2', 'B57.3', 'B57.4', 'B57.5'],
    cid11: ['1F51'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Doença parasitária causada pelo Trypanosoma cruzi, transmitida principalmente pelo triatomíneo ("barbeiro"). Fase aguda frequentemente assintomática; fase crônica com cardiopatia e/ou megaesôfago/megacólon.',
      criteriosDiagnosticos: [
        'FASE AGUDA: Febre, hepatoesplenomegalia, edema, sinal de Romaña/chagoma',
        'Parasitemia detectável (gota espessa, QBC, PCR)',
        'FASE CRÔNICA: Sorologia positiva (2 métodos diferentes)',
        'Cardiopatia chagásica: BRD + BDAS, arritmias, ICC',
        'Megaesôfago: disfagia, regurgitação',
        'Megacólon: constipação crônica, fecaloma'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suporte clínico na fase aguda',
          'Controle de arritmias e ICC na fase crônica',
          'Dieta pastosa no megaesôfago',
          'Dieta laxativa no megacólon'
        ],
        farmacologico: [
          'FASE AGUDA (obrigatório tratar):',
          'Benznidazol 5mg/kg/dia por 60 dias (adultos: 2x/dia)',
          'OU Nifurtimox 8-10mg/kg/dia por 60-90 dias',
          '',
          'FASE CRÔNICA INDETERMINADA:',
          'Benznidazol: indicado em <50 anos, mulheres idade fértil',
          '',
          'FASE CRÔNICA CARDÍACA:',
          'Tratamento da ICC (IECA, BB, espironolactona)',
          'Amiodarona se arritmias',
          'Marcapasso se bloqueio avançado',
          'Considerar CDI se alto risco de morte súbita'
        ]
      },
      metasTerapeuticas: [
        'Fase aguda: eliminar parasita, prevenir evolução',
        'Fase crônica: controle de sintomas, prevenir complicações',
        'Prevenção de transmissão vertical'
      ],
      examesIniciais: [
        'Sorologia (ELISA + IFI ou ELISA + HAI)',
        'Gota espessa/QBC (fase aguda)',
        'PCR para T. cruzi',
        'ECG 12 derivações',
        'Ecocardiograma',
        'Rx de tórax',
        'EDA/esofagograma (se disfagia)',
        'Enema opaco (se constipação)'
      ],
      redFlags: [
        'Miocardite aguda grave',
        'Meningoencefalite',
        'ICC descompensada',
        'Arritmias malignas (TV sustentada)',
        'Bloqueio AV avançado',
        'Reativação em imunossuprimidos',
        'Perfuração/volvo intestinal'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '6-7 milhões infectados no mundo; 1-3 milhões no Brasil',
        incidencia: 'Casos agudos: ~200/ano no Brasil (transmissão oral)',
        mortalidade: '~12.000 mortes/ano no Brasil (fase crônica cardíaca)',
        faixaEtaria: 'Infecção em qualquer idade; manifestações crônicas após décadas',
        fatoresRisco: [
          'Residência em área rural endêmica',
          'Moradia com frestas (pau-a-pique)',
          'Consumo de alimentos contaminados (açaí, caldo de cana)',
          'Transfusão de sangue não testado',
          'Mãe portadora (transmissão vertical)'
        ],
        citations: [{ refId: 'consenso-chagas-2016' }]
      },
      fisiopatologia: {
        texto: 'T. cruzi invade células do hospedeiro (miócitos, neurônios), multiplica-se e causa destruição celular direta e inflamação crônica. Na fase crônica, há destruição progressiva do miocárdio e do plexo mioentérico (denervação autonômica), levando a cardiomiopatia dilatada e megas.',
        citations: [{ refId: 'who-chagas-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'AGUDA: Febre, mal-estar, hepatoesplenomegalia, edema, miocardite',
          'Sinal de Romaña (edema palpebral unilateral)',
          'Chagoma de inoculação (lesão cutânea no local da picada)',
          'CRÔNICA: Palpitações, dispneia, síncope, disfagia, constipação'
        ],
        sinaisExameFisico: [
          'Hepatoesplenomegalia (fase aguda)',
          'Sinais de ICC',
          'Arritmias',
          'Dilatação de câmaras cardíacas',
          'Aneurisma apical de VE'
        ],
        formasClinicas: [
          'Fase aguda (sintomática ou assintomática)',
          'Fase crônica indeterminada (assintomática, sorologia positiva)',
          'Fase crônica cardíaca',
          'Fase crônica digestiva (megaesôfago/megacólon)',
          'Forma mista (cardíaca + digestiva)'
        ],
        citations: [{ refId: 'consenso-chagas-2016' }]
      },
      diagnostico: {
        criterios: [
          'Fase aguda: exame parasitológico positivo',
          'Fase crônica: 2 testes sorológicos positivos com métodos diferentes'
        ],
        diagnosticoDiferencial: [
          'Cardiomiopatia dilatada idiopática',
          'Cardiomiopatia isquêmica',
          'Acalasia',
          'Doença de Hirschsprung',
          'Outras parasitoses'
        ],
        examesLaboratoriais: [
          'Sorologia (ELISA, IFI, HAI) - 2 métodos',
          'Exame parasitológico direto (fase aguda)',
          'PCR',
          'Xenodiagnóstico (histórico)',
          'Hemocultura para T. cruzi'
        ],
        examesImagem: [
          'ECG (BRD, BDAS, extrassístoles, bloqueios)',
          'Ecocardiograma (dilatação, aneurisma apical)',
          'Holter 24h',
          'Rx de tórax (cardiomegalia)',
          'Esofagograma/EDA',
          'Enema opaco/colonoscopia'
        ],
        citations: [{ refId: 'consenso-chagas-2016' }]
      },
      tratamento: {
        objetivos: [
          'Fase aguda: eliminar parasita',
          'Fase crônica: controlar manifestações, prevenir complicações'
        ],
        naoFarmacologico: {
          medidas: [
            'Dieta para disfagia (megaesôfago)',
            'Dieta laxativa e hidratação (megacólon)',
            'Exercício físico supervisionado (cardiopatia leve)',
            'Cirurgia para megas avançados'
          ],
          citations: [{ refId: 'consenso-chagas-2016' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Tripanocida', medicamentos: ['Benznidazol 5mg/kg/dia'], posologia: '60 dias, dividido em 2 tomadas', observacoes: 'Obrigatório na fase aguda' }
          ],
          segundaLinha: [
            { classe: 'Alternativa', medicamentos: ['Nifurtimox 8-10mg/kg/dia'], posologia: '60-90 dias', observacoes: 'Mais efeitos adversos' }
          ],
          situacoesEspeciais: [
            { situacao: 'Cardiopatia chagásica', conduta: 'Tratamento de ICC: IECA, BB, espironolactona, diuréticos' },
            { situacao: 'Arritmias', conduta: 'Amiodarona; CDI se alto risco de morte súbita' },
            { situacao: 'Megaesôfago avançado', conduta: 'Cardiomiotomia de Heller ou esofagectomia' },
            { situacao: 'Megacólon', conduta: 'Sigmoidectomia se volvo recorrente ou fecaloma' }
          ],
          citations: [{ refId: 'who-chagas-2023' }]
        },
        duracao: 'Tripanocida: 60 dias; tratamento de complicações: contínuo'
      },
      acompanhamento: {
        frequenciaConsultas: 'Anual na fase indeterminada; semestral/trimestral na cardiopatia',
        examesControle: ['ECG anual', 'Ecocardiograma anual', 'Holter', 'Sorologia de controle'],
        metasTerapeuticas: [
          'Negativação da PCR (cura parasitológica)',
          'Estabilização da cardiopatia',
          'Prevenção de morte súbita'
        ],
        criteriosEncaminhamento: [
          'Cardiologia: cardiopatia chagásica',
          'Arritmia: eletrofisiologia',
          'Megas: gastroenterologia/cirurgia',
          'Reativação: infectologia'
        ],
        citations: [{ refId: 'consenso-chagas-2016' }]
      },
      prevencao: {
        primaria: [
          'Melhoria habitacional',
          'Controle do vetor (borrifação, telas)',
          'Triagem em bancos de sangue',
          'Cuidados com alimentos (evitar contaminação)'
        ],
        secundaria: [
          'Triagem de gestantes',
          'Tratamento de casos agudos',
          'Acompanhamento de crônicos'
        ],
        citations: [{ refId: 'who-chagas-2023' }]
      }
    },
    protocolos: ['chagas-tratamento', 'cardiopatia-chagasica'],
    medicamentos: ['benznidazol', 'nifurtimox', 'amiodarona'],
    calculadoras: ['rassi-score'],
    citations: [
      { refId: 'consenso-chagas-2016' },
      { refId: 'who-chagas-2023' }
    ],
    lastUpdate: '2024-12-23'
  },

  // ============================================================================
  // LEISHMANIOSE VISCERAL
  // ============================================================================
  {
    id: 'leishmaniose-visceral',
    titulo: 'Leishmaniose Visceral',
    sinonimos: ['Calazar', 'Kala-azar', 'Febre negra', 'LV'],
    doid: 'DOID:9146',
    snomedCT: '186802003',
    meshId: 'D007898',
    umlsCui: 'C0023290',
    ciap2: ['A78'],
    cid10: ['B55.0'],
    cid11: ['1F54.0'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Doença causada por Leishmania infantum (Brasil), transmitida pelo flebotomíneo Lutzomyia longipalpis. Acomete principalmente o sistema reticuloendotelial. Potencialmente fatal se não tratada.',
      criteriosDiagnosticos: [
        'Febre prolongada (>2 semanas)',
        'Esplenomegalia volumosa',
        'Hepatomegalia',
        'Pancitopenia (anemia, leucopenia, plaquetopenia)',
        'Hipergamaglobulinemia',
        'Emagrecimento, astenia',
        'Confirmação: parasitológico (aspirado de medula) ou sorologia (rK39) + clínica'
      ],
      classificacaoRisco: [
        { nivel: 'moderado', criterios: ['Idade 1-40 anos', 'Sem comorbidades', 'Sem sinais de gravidade'], conduta: 'Tratamento ambulatorial supervisionado' },
        { nivel: 'alto', criterios: ['<1 ou >50 anos', 'Icterícia', 'Edema', 'Sangramento', 'HIV+', 'Coinfecção'], conduta: 'Internação hospitalar' }
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suporte nutricional',
          'Transfusão se anemia grave ou sangramento',
          'Tratar infecções bacterianas associadas',
          'Notificação compulsória'
        ],
        farmacologico: [
          'PRIMEIRA ESCOLHA:',
          'Anfotericina B lipossomal 3mg/kg/dia por 7 dias (20mg/kg total)',
          '',
          'ALTERNATIVAS:',
          'Anfotericina B desoxicolato 1mg/kg/dia por 14-20 dias',
          'Antimoniato de N-metilglucamina (Glucantime®) 20mg Sb/kg/dia por 20-40 dias',
          '',
          'Preferir lipossomal em: <1 ano, >50 anos, ICC, renal, hepático, HIV, gestante'
        ]
      },
      metasTerapeuticas: [
        'Cura clínica (resolução de febre, esplenomegalia)',
        'Normalização hematológica',
        'Cura parasitológica'
      ],
      examesIniciais: [
        'Hemograma completo',
        'Função renal e hepática',
        'Proteínas totais e frações',
        'Coagulograma',
        'Sorologia rK39 (teste rápido)',
        'Aspirado de medula óssea (mielograma + cultura)',
        'Sorologia para HIV',
        'RxT, ECG (antes de antimonial)'
      ],
      redFlags: [
        'Idade <1 ou >50 anos',
        'Icterícia (Bb>2mg/dL)',
        'Edema generalizado',
        'Sangramento',
        'Coinfecção HIV',
        'Infecção bacteriana grave',
        'Desnutrição grave',
        'Insuficiência renal ou hepática'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '~3.000 casos/ano no Brasil',
        mortalidade: '~8% letalidade no Brasil; até 95% se não tratada',
        faixaEtaria: 'Crianças <10 anos mais afetadas',
        fatoresRisco: [
          'Residência em área endêmica',
          'Presença de cães infectados',
          'Desnutrição',
          'Imunossupressão (HIV)',
          'Condições socioeconômicas precárias'
        ],
        citations: [{ refId: 'ms-lv-2022' }]
      },
      fisiopatologia: {
        texto: 'Promastigotas inoculados pelo flebotomíneo são fagocitados por macrófagos, transformando-se em amastigotas. Há disseminação pelo sistema reticuloendotelial (baço, fígado, medula óssea), causando hiperplasia e infiltração, resultando em organomegalias e supressão medular.',
        citations: [{ refId: 'who-leishmaniasis-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Febre prolongada irregular',
          'Emagrecimento progressivo',
          'Astenia intensa',
          'Aumento abdominal (esplenomegalia)',
          'Palidez (anemia)',
          'Epistaxe, gengivorragia'
        ],
        sinaisExameFisico: [
          'Esplenomegalia volumosa (pode ultrapassar cicatriz umbilical)',
          'Hepatomegalia',
          'Palidez cutaneomucosa',
          'Desnutrição',
          'Edema',
          'Icterícia (em casos graves)'
        ],
        formasClinicas: [
          'Forma clássica (febre, hepatoesplenomegalia, pancitopenia)',
          'Forma oligossintomática',
          'Coinfecção LV-HIV'
        ],
        citations: [{ refId: 'ms-lv-2022' }]
      },
      diagnostico: {
        criterios: [
          'Clínica + epidemiologia + confirmação laboratorial',
          'Sorologia rK39 ou RIFI ≥1:80',
          'Parasitológico de medula óssea (padrão-ouro)'
        ],
        diagnosticoDiferencial: [
          'Malária',
          'Febre tifoide',
          'Esquistossomose hepatoesplênica',
          'Leucemias e linfomas',
          'Histoplasmose',
          'Brucelose',
          'Mononucleose'
        ],
        examesLaboratoriais: [
          'Hemograma (pancitopenia)',
          'VHS elevado',
          'Proteínas (inversão A/G)',
          'Sorologia rK39, ELISA, RIFI',
          'Mielograma com pesquisa de Leishmania',
          'PCR para Leishmania'
        ],
        citations: [{ refId: 'ms-lv-2022' }]
      },
      tratamento: {
        objetivos: [
          'Eliminação do parasita',
          'Resolução das alterações clínicas e laboratoriais',
          'Prevenção de recidivas'
        ],
        naoFarmacologico: {
          medidas: [
            'Suporte nutricional',
            'Transfusão se necessário',
            'Antibioticoterapia para infecções secundárias'
          ],
          citations: [{ refId: 'ms-lv-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Anfotericina B lipossomal', medicamentos: ['AmBisome®'], posologia: '3mg/kg/dia IV por 7 dias', observacoes: 'Preferencial para grupos de risco' }
          ],
          segundaLinha: [
            { classe: 'Antimonial pentavalente', medicamentos: ['Glucantime® 20mg Sb/kg/dia'], posologia: 'IM ou IV por 20-40 dias', observacoes: 'Cardiotoxicidade (monitorar ECG)' }
          ],
          situacoesEspeciais: [
            { situacao: 'Coinfecção HIV', conduta: 'AnfoB lipossomal + profilaxia secundária + TARV' },
            { situacao: 'Gestante', conduta: 'AnfoB lipossomal (antimonial contraindicado)' },
            { situacao: 'Recidiva', conduta: 'AnfoB lipossomal em dose maior ou tempo maior' }
          ],
          citations: [{ refId: 'who-leishmaniasis-2023' }]
        },
        duracao: 'AnfoB lipossomal: 7 dias; Antimonial: 20-40 dias'
      },
      acompanhamento: {
        frequenciaConsultas: 'Durante tratamento: diário; após: 3, 6, 12 meses',
        examesControle: ['Hemograma', 'Função renal', 'Tamanho do baço'],
        metasTerapeuticas: [
          'Cura clínica em 2-3 meses',
          'Normalização hematológica',
          'Ausência de recidiva em 1 ano'
        ],
        criteriosEncaminhamento: [
          'Casos graves: hospital de referência',
          'Coinfecção HIV: infectologia',
          'Recidivas: centro de referência'
        ],
        citations: [{ refId: 'ms-lv-2022' }]
      },
      prevencao: {
        primaria: [
          'Controle do vetor (borrifação)',
          'Uso de telas e repelentes',
          'Identificação e manejo de cães infectados',
          'Coleiras impregnadas em cães'
        ],
        secundaria: [
          'Diagnóstico e tratamento precoces',
          'Vigilância epidemiológica'
        ],
        citations: [{ refId: 'ms-lv-2022' }]
      }
    },
    protocolos: ['leishmaniose-visceral-tratamento', 'lv-grave'],
    medicamentos: ['anfotericina-b-lipossomal', 'glucantime'],
    calculadoras: [],
    citations: [
      { refId: 'ms-lv-2022' },
      { refId: 'who-leishmaniasis-2023' }
    ],
    lastUpdate: '2024-12-23'
  },

  // ============================================================================
  // LEPTOSPIROSE
  // ============================================================================
  {
    id: 'leptospirose',
    titulo: 'Leptospirose',
    sinonimos: ['Doença de Weil', 'Febre dos alagados', 'Febre dos arrozais'],
    doid: 'DOID:2297',
    snomedCT: '77377001',
    meshId: 'D007919',
    umlsCui: 'C0023364',
    ciap2: ['A78'],
    cid10: ['A27', 'A27.0', 'A27.8', 'A27.9'],
    cid11: ['1B91'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Zoonose causada por espiroquetas do gênero Leptospira, transmitida pela urina de roedores. Forma anictérica (90%) é autolimitada; forma ictérica (Weil) tem alta mortalidade.',
      criteriosDiagnosticos: [
        'Febre alta de início súbito',
        'Mialgia intensa (panturrilhas)',
        'Sufusão conjuntival (olhos vermelhos sem secreção)',
        'Icterícia (forma grave)',
        'Histórico de exposição: enchentes, esgoto, limpeza de fossas',
        'Confirmação: sorologia (MAT) ou PCR'
      ],
      classificacaoRisco: [
        { nivel: 'baixo', criterios: ['Forma anictérica', 'Sem sinais de alarme'], conduta: 'Tratamento ambulatorial' },
        { nivel: 'alto', criterios: ['Icterícia', 'IRA', 'Hemorragia pulmonar', 'Alteração do sensório'], conduta: 'UTI' }
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratação adequada',
          'Suporte ventilatório se hemorragia alveolar',
          'Diálise se IRA oligúrica',
          'Transfusão se coagulopatia/sangramento'
        ],
        farmacologico: [
          'FORMA LEVE (ambulatorial):',
          'Doxiciclina 100mg 12/12h por 7 dias OU',
          'Amoxicilina 500mg 8/8h por 7 dias',
          '',
          'FORMA GRAVE (internação):',
          'Penicilina G cristalina 1,5 milhões UI IV 6/6h OU',
          'Ceftriaxona 1g IV 1x/dia OU',
          'Ampicilina 1g IV 6/6h',
          '',
          'Não atrasar ATB por esperar confirmação!'
        ]
      },
      metasTerapeuticas: [
        'Controle da infecção',
        'Suporte de disfunções orgânicas',
        'Prevenção de hemorragia pulmonar'
      ],
      examesIniciais: [
        'Hemograma (leucocitose com desvio, plaquetopenia)',
        'Função renal (IRA não oligúrica)',
        'Bilirrubinas (direta aumentada)',
        'CPK (rabdomiólise)',
        'Coagulograma',
        'Rx de tórax (infiltrado alveolar)',
        'Sorologia (MAT) - coletar na fase aguda e convalescença',
        'PCR no sangue (fase inicial)'
      ],
      redFlags: [
        'Icterícia (Bb>3mg/dL)',
        'Insuficiência renal aguda',
        'Hemorragia pulmonar (hemoptise, infiltrado difuso)',
        'Dispneia/hipoxemia',
        'Arritmias (miocardite)',
        'Alteração do nível de consciência',
        'Choque'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '~4.000 casos/ano no Brasil',
        incidencia: 'Picos em períodos de chuva/enchente',
        mortalidade: 'Forma anictérica: <1%; Síndrome de Weil: 10-40%',
        faixaEtaria: 'Adultos jovens, trabalhadores em risco',
        fatoresRisco: [
          'Contato com água de enchentes',
          'Esgoto, lixo, fossas',
          'Trabalhadores de saneamento, limpeza urbana',
          'Agricultores (arrozais, cana)',
          'Contato com roedores'
        ],
        citations: [{ refId: 'ms-leptospirose-2022' }]
      },
      fisiopatologia: {
        texto: 'Leptospiras penetram por mucosas ou pele lesada, disseminam-se por via hematogênica. Causam vasculite e dano endotelial, especialmente em rins (nefrite intersticial, IRA não oligúrica), fígado (colestase), pulmões (hemorragia alveolar) e músculos.',
        citations: [{ refId: 'who-leptospirosis-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Febre alta de início abrupto',
          'Mialgia intensa (especialmente panturrilhas)',
          'Cefaleia',
          'Sufusão conjuntival',
          'Náuseas, vômitos, diarreia',
          'Icterícia (forma grave)',
          'Hemoptise (hemorragia pulmonar)'
        ],
        sinaisExameFisico: [
          'Sufusão conjuntival (vermelhidão)',
          'Icterícia rubínica (pele alaranjada)',
          'Hepatomegalia dolorosa',
          'Petéquias',
          'Estertores pulmonares'
        ],
        formasClinicas: [
          'Forma anictérica (90%) - autolimitada',
          'Síndrome de Weil (icterícia + IRA + hemorragias)',
          'Síndrome hemorrágica pulmonar grave'
        ],
        citations: [{ refId: 'ms-leptospirose-2022' }]
      },
      diagnostico: {
        criterios: [
          'Clínica + exposição epidemiológica',
          'Confirmação por MAT (soroconversão) ou PCR'
        ],
        diagnosticoDiferencial: [
          'Dengue grave',
          'Febre amarela',
          'Malária',
          'Hepatites virais',
          'Sepse',
          'Hantavirose',
          'Rickettsioses'
        ],
        examesLaboratoriais: [
          'Hemograma',
          'Bilirrubinas (direta aumentada)',
          'Transaminases (geralmente <500)',
          'Ureia, creatinina (IRA)',
          'CPK (elevada)',
          'Potássio (hipocalemia)',
          'Coagulograma',
          'MAT (2 amostras com intervalo de 14 dias)',
          'PCR sangue (fase inicial)'
        ],
        examesImagem: [
          'Rx de tórax (infiltrado alveolar se hemorragia pulmonar)',
          'TC de tórax se hipoxemia'
        ],
        citations: [{ refId: 'ms-leptospirose-2022' }]
      },
      tratamento: {
        objetivos: [
          'Eliminar a leptospira',
          'Suporte de disfunções orgânicas',
          'Prevenir hemorragia pulmonar'
        ],
        naoFarmacologico: {
          medidas: [
            'Hidratação cuidadosa',
            'Ventilação protetora se hemorragia pulmonar',
            'Diálise precoce se IRA',
            'Transfusão se coagulopatia'
          ],
          citations: [{ refId: 'ms-leptospirose-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Ambulatorial', medicamentos: ['Doxiciclina 100mg 12/12h', 'Amoxicilina 500mg 8/8h'], posologia: '7 dias' },
            { classe: 'Hospitalar', medicamentos: ['Penicilina G cristalina 1,5M UI 6/6h IV', 'Ceftriaxona 1g/dia IV'], posologia: '7 dias' }
          ],
          situacoesEspeciais: [
            { situacao: 'Hemorragia pulmonar', conduta: 'IOT precoce, ventilação protetora, considerar metilprednisolona' },
            { situacao: 'IRA', conduta: 'Diálise precoce, evitar hiperhidratação' }
          ],
          citations: [{ refId: 'who-leptospirosis-2023' }]
        },
        duracao: '7 dias de antibioticoterapia'
      },
      acompanhamento: {
        frequenciaConsultas: 'Reavaliação em 48-72h; controle em 1-2 semanas',
        metasTerapeuticas: [
          'Resolução da febre em 24-48h',
          'Recuperação renal (pode levar semanas)',
          'Resolução da icterícia'
        ],
        criteriosEncaminhamento: [
          'Forma grave: UTI',
          'IRA persistente: nefrologia',
          'Hemorragia pulmonar: terapia intensiva'
        ],
        citations: [{ refId: 'ms-leptospirose-2022' }]
      },
      prevencao: {
        primaria: [
          'Evitar contato com água de enchentes',
          'Uso de botas e luvas',
          'Controle de roedores',
          'Saneamento básico',
          'Doxiciclina 200mg/semana em exposições de alto risco'
        ],
        secundaria: [
          'Diagnóstico e tratamento precoces',
          'Notificação compulsória'
        ],
        citations: [{ refId: 'ms-leptospirose-2022' }]
      }
    },
    protocolos: ['leptospirose-tratamento', 'leptospirose-grave'],
    medicamentos: ['doxiciclina', 'penicilina-g-cristalina', 'ceftriaxona'],
    calculadoras: [],
    citations: [
      { refId: 'ms-leptospirose-2022' },
      { refId: 'who-leptospirosis-2023' }
    ],
    lastUpdate: '2024-12-23'
  },

  // ============================================================================
  // FEBRE AMARELA
  // ============================================================================
  {
    id: 'febre-amarela',
    titulo: 'Febre Amarela',
    sinonimos: ['FA', 'Yellow fever', 'Tifo icteroides'],
    doid: 'DOID:9682',
    snomedCT: '16541001',
    meshId: 'D015004',
    umlsCui: 'C0043395',
    ciap2: ['A77'],
    cid10: ['A95', 'A95.0', 'A95.1', 'A95.9'],
    cid11: ['1D40'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Doença viral aguda causada por flavivírus, transmitida por mosquitos Haemagogus/Sabethes (silvestre) ou Aedes aegypti (urbana). Pode evoluir para forma grave com icterícia, hemorragias e falência de múltiplos órgãos.',
      criteriosDiagnosticos: [
        'Febre de início súbito (≤7 dias)',
        'Icterícia e/ou hemorragias',
        'Epidemiologia compatível (área de risco, não vacinado)',
        'Sinal de Faget (bradicardia relativa apesar de febre)',
        'Confirmação: RT-PCR, isolamento viral, IgM (após 5º dia)',
        'Histopatologia: corpúsculos de Councilman (necrose hepática)'
      ],
      classificacaoRisco: [
        { nivel: 'baixo', criterios: ['Forma leve/moderada', 'Sem icterícia', 'Sem hemorragias'], conduta: 'Ambulatorial com vigilância' },
        { nivel: 'muito_alto', criterios: ['Icterícia', 'Hemorragias', 'Oligúria', 'Encefalopatia'], conduta: 'UTI' }
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'NÃO HÁ TRATAMENTO ESPECÍFICO',
          'Suporte clínico intensivo',
          'Isolamento (evitar transmissão por Aedes)',
          'Repouso, hidratação'
        ],
        farmacologico: [
          'SUPORTE:',
          'Hidratação IV',
          'Antitérmicos (EVITAR AAS e AINEs)',
          'Vitamina K se coagulopatia',
          'Plasma/plaquetas se sangramento',
          'Diálise se IRA',
          'Proteção gástrica',
          'N-acetilcisteína (em estudo)'
        ]
      },
      metasTerapeuticas: [
        'Suporte de disfunções orgânicas',
        'Prevenção de hemorragias',
        'Manutenção da volemia',
        'Prevenção de transmissão'
      ],
      examesIniciais: [
        'Hemograma (leucopenia, plaquetopenia)',
        'Bilirrubinas (icterícia intensa)',
        'Transaminases (muito elevadas, >1000)',
        'Coagulograma (alargado)',
        'Ureia, creatinina',
        'RT-PCR para febre amarela (até 5º dia)',
        'IgM (após 5º dia)',
        'Biópsia hepática (post-mortem)'
      ],
      redFlags: [
        'Icterícia',
        'Hemorragias (melena, hematêmese, gengivorragia)',
        'Oligúria/anúria',
        'Encefalopatia hepática',
        'Hipotensão/choque',
        'Transaminases >1000',
        'Coagulopatia grave'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Surtos recentes no Brasil (2016-2018): >2.000 casos',
        mortalidade: 'Forma grave: 20-50% letalidade',
        faixaEtaria: 'Todas as idades não vacinadas',
        fatoresRisco: [
          'Não vacinação',
          'Residência/viagem em área de risco',
          'Atividade em área de mata',
          'Período de maior transmissão: jan-maio'
        ],
        citations: [{ refId: 'ms-fa-2022' }]
      },
      fisiopatologia: {
        texto: 'Flavivírus com tropismo por hepatócitos e células endoteliais. Causa necrose hepática mediozonal (corpúsculos de Councilman), disfunção endotelial, CIVD, choque e falência de múltiplos órgãos. A tempestade de citocinas contribui para gravidade.',
        citations: [{ refId: 'who-yellowfever-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Febre alta de início súbito',
          'Cefaleia intensa',
          'Mialgia',
          'Náuseas, vômitos',
          'Icterícia (forma grave)',
          'Hemorragias (gengival, TGI)',
          'Oligúria'
        ],
        sinaisExameFisico: [
          'Icterícia rubínica',
          'Sinal de Faget (dissociação pulso-temperatura)',
          'Hepatomegalia dolorosa',
          'Petéquias, equimoses',
          'Sonolência, confusão (encefalopatia)'
        ],
        formasClinicas: [
          'Forma leve (maioria)',
          'Forma moderada',
          'Forma grave (hepato-nefro-hemorrágica)'
        ],
        citations: [{ refId: 'ms-fa-2022' }]
      },
      diagnostico: {
        criterios: [
          'Clínica + epidemiologia',
          'Confirmação laboratorial (RT-PCR, sorologia)'
        ],
        diagnosticoDiferencial: [
          'Leptospirose',
          'Malária grave',
          'Dengue grave',
          'Hepatites virais fulminantes',
          'Sepse',
          'Outras febres hemorrágicas'
        ],
        examesLaboratoriais: [
          'RT-PCR (até 5º dia de doença)',
          'MAC-ELISA IgM (após 5º dia)',
          'Hemograma (leucopenia)',
          'Transaminases (muito elevadas)',
          'Bilirrubinas',
          'Coagulograma (CIVD)',
          'Função renal'
        ],
        citations: [{ refId: 'ms-fa-2022' }]
      },
      tratamento: {
        objetivos: [
          'Suporte clínico',
          'Prevenção de complicações',
          'Tratamento de disfunções orgânicas'
        ],
        naoFarmacologico: {
          medidas: [
            'UTI para casos graves',
            'Hidratação cuidadosa',
            'Proteção gástrica',
            'Diálise se IRA',
            'Transfusão se hemorragias',
            'Isolamento (controle vetorial)'
          ],
          citations: [{ refId: 'ms-fa-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Suporte', medicamentos: ['Hidratação IV', 'Vitamina K', 'Plasma fresco congelado'], observacoes: 'Não há antiviral específico' }
          ],
          situacoesEspeciais: [
            { situacao: 'Evitar', conduta: 'AAS e AINEs (risco de sangramento)' },
            { situacao: 'Encefalopatia', conduta: 'Lactulose, restrição proteica' },
            { situacao: 'Experimental', conduta: 'N-acetilcisteína, sofosbuvir (em estudo)' }
          ],
          citations: [{ refId: 'who-yellowfever-2023' }]
        },
        duracao: 'Suporte até resolução da doença'
      },
      acompanhamento: {
        frequenciaConsultas: 'Vigilância contínua até 14 dias após início',
        metasTerapeuticas: [
          'Resolução da icterícia',
          'Recuperação renal',
          'Normalização de transaminases (pode levar semanas)'
        ],
        criteriosEncaminhamento: [
          'Forma grave: UTI/hospital de referência',
          'Notificação compulsória imediata'
        ],
        citations: [{ refId: 'ms-fa-2022' }]
      },
      prevencao: {
        primaria: [
          'VACINAÇÃO (medida mais eficaz)',
          'Dose única aos 9 meses e reforço aos 4 anos',
          'Viajantes: vacinar 10 dias antes',
          'Controle vetorial',
          'Proteção individual (repelentes, roupas longas)'
        ],
        secundaria: [
          'Vigilância epidemiológica',
          'Busca ativa em surtos',
          'Vacinação de bloqueio'
        ],
        citations: [{ refId: 'who-yellowfever-2023' }]
      }
    },
    protocolos: ['febre-amarela-manejo', 'fa-grave'],
    medicamentos: [],
    calculadoras: [],
    citations: [
      { refId: 'ms-fa-2022' },
      { refId: 'who-yellowfever-2023' }
    ],
    lastUpdate: '2024-12-23'
  },

  // ============================================================================
  // ESQUISTOSSOMOSE
  // ============================================================================
  {
    id: 'esquistossomose',
    titulo: 'Esquistossomose Mansônica',
    sinonimos: ['Barriga d\'água', 'Xistose', 'Bilharziose', 'Esquistossomose intestinal'],
    doid: 'DOID:1395',
    snomedCT: '28019009',
    meshId: 'D012552',
    umlsCui: 'C0036323',
    ciap2: ['D96'],
    cid10: ['B65.1'],
    cid11: ['1F83.1'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Doença parasitária causada pelo Schistosoma mansoni, transmitida por caramujos do gênero Biomphalaria. Forma aguda raramente diagnosticada; forma crônica hepatoesplênica pode causar hipertensão portal.',
      criteriosDiagnosticos: [
        'FORMA AGUDA (Febre de Katayama): Febre, urticária, eosinofilia, exposição recente',
        'FORMA INTESTINAL: Diarreia intermitente, dor abdominal',
        'FORMA HEPATOESPLÊNICA: Hepatoesplenomegalia, hipertensão portal',
        'Exposição: banho/contato com água doce em área endêmica',
        'Confirmação: ovos nas fezes (Kato-Katz) ou biópsia retal'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Educação sobre transmissão',
          'Saneamento básico',
          'Tratamento de água',
          'Controle de caramujos'
        ],
        farmacologico: [
          'PRAZIQUANTEL 50mg/kg dose única (crianças: 60mg/kg)',
          '',
          'Contraindicações:',
          '- Gestantes (tratar após parto)',
          '- Forma aguda grave (corticoide antes)',
          '',
          'FORMA AGUDA (Katayama):',
          'Prednisona 1mg/kg/dia por 5-7 dias, depois praziquantel'
        ]
      },
      metasTerapeuticas: [
        'Eliminação do parasita',
        'Prevenção de evolução para forma hepatoesplênica',
        'Controle de hipertensão portal (se já instalada)'
      ],
      examesIniciais: [
        'EPF com método Kato-Katz (3 amostras)',
        'Hemograma (eosinofilia)',
        'USG de abdome (fibrose periportal)',
        'Função hepática',
        'Biópsia retal (se EPF negativo)',
        'EDA (varizes esofágicas na forma hepatoesplênica)'
      ],
      redFlags: [
        'Hematêmese (ruptura de varizes)',
        'Esplenomegalia volumosa com hiperesplenismo',
        'Ascite',
        'Encefalopatia hepática',
        'Glomerulonefrite esquistossomótica',
        'Mielopatia esquistossomótica'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '~1,5 milhões de infectados no Brasil',
        faixaEtaria: 'Jovens e adultos de áreas endêmicas',
        fatoresRisco: [
          'Residência em área endêmica (Nordeste, MG)',
          'Contato com águas naturais (rios, lagoas)',
          'Falta de saneamento',
          'Trabalho agrícola em áreas alagadas'
        ],
        citations: [{ refId: 'ms-esquistossomose-2022' }]
      },
      fisiopatologia: {
        texto: 'Cercárias penetram a pele, transformam-se em esquistossômulos e migram até o sistema porta-hepático. Vermes adultos vivem nas veias mesentéricas; ovos causam reação granulomatosa. Na forma hepatoesplênica, fibrose periportal (Symmers) causa hipertensão portal.',
        citations: [{ refId: 'who-schistosomiasis-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'AGUDA: Febre, prurido, urticária, diarreia, tosse',
          'INTESTINAL: Diarreia intermitente, cólicas, sangue/muco nas fezes',
          'HEPATOESPLÊNICA: Aumento abdominal, circulação colateral, hematêmese'
        ],
        sinaisExameFisico: [
          'Eosinofilia (fase aguda)',
          'Hepatomegalia de lobo esquerdo',
          'Esplenomegalia',
          'Circulação colateral',
          'Ascite'
        ],
        formasClinicas: [
          'Forma aguda (Katayama)',
          'Forma intestinal',
          'Forma hepatointestinal',
          'Forma hepatoesplênica compensada',
          'Forma hepatoesplênica descompensada',
          'Formas ectópicas (neuroesquistossomose, pulmonar)'
        ],
        citations: [{ refId: 'ms-esquistossomose-2022' }]
      },
      diagnostico: {
        criterios: [
          'Epidemiologia + exame parasitológico positivo',
          'USG com fibrose periportal'
        ],
        diagnosticoDiferencial: [
          'Cirrose hepática',
          'Leishmaniose visceral',
          'Leucemias/linfomas',
          'Outras causas de hipertensão portal'
        ],
        examesLaboratoriais: [
          'EPF Kato-Katz (3 amostras)',
          'Biópsia retal',
          'Hemograma (eosinofilia, pancitopenia se hiperesplenismo)',
          'Função hepática (geralmente normal)',
          'Sorologia (IgG)'
        ],
        examesImagem: [
          'USG de abdome (fibrose periportal, esplenomegalia)',
          'EDA (varizes esofágicas)'
        ],
        citations: [{ refId: 'ms-esquistossomose-2022' }]
      },
      tratamento: {
        objetivos: [
          'Eliminar o parasita',
          'Prevenir evolução',
          'Tratar complicações da hipertensão portal'
        ],
        naoFarmacologico: {
          medidas: [
            'Educação sanitária',
            'Melhoria de saneamento',
            'Tratamento de varizes (ligadura, TIPS)',
            'Esplenectomia com desconexão ázigo-portal (casos selecionados)'
          ],
          citations: [{ refId: 'ms-esquistossomose-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antiesquistossômico', medicamentos: ['Praziquantel 50-60mg/kg'], posologia: 'Dose única', observacoes: 'Cura ~80%' }
          ],
          segundaLinha: [
            { classe: 'Alternativa', medicamentos: ['Oxamniquina 15mg/kg'], posologia: 'Dose única', observacoes: 'Se intolerância a praziquantel' }
          ],
          situacoesEspeciais: [
            { situacao: 'Forma aguda', conduta: 'Corticoide por 5-7 dias antes do praziquantel' },
            { situacao: 'Varizes de alto risco', conduta: 'Betabloqueador (profilaxia primária), ligadura elástica' }
          ],
          citations: [{ refId: 'who-schistosomiasis-2023' }]
        },
        duracao: 'Dose única; controle de cura após 6 meses'
      },
      acompanhamento: {
        frequenciaConsultas: 'Controle de cura: EPF em 30, 90, 180 dias após tratamento',
        metasTerapeuticas: [
          'Negativação do EPF',
          'Estabilização da fibrose',
          'Controle de varizes'
        ],
        criteriosEncaminhamento: [
          'Forma hepatoesplênica: gastroenterologia/hepatologia',
          'Neuroesquistossomose: neurologia',
          'Varizes de alto risco: endoscopia'
        ],
        citations: [{ refId: 'ms-esquistossomose-2022' }]
      },
      prevencao: {
        primaria: [
          'Saneamento básico',
          'Educação em saúde',
          'Controle de caramujos',
          'Evitar contato com águas naturais em áreas endêmicas'
        ],
        secundaria: [
          'Diagnóstico e tratamento precoces',
          'Inquéritos coproscópicos em áreas endêmicas',
          'Tratamento coletivo em áreas de alta prevalência'
        ],
        citations: [{ refId: 'who-schistosomiasis-2023' }]
      }
    },
    protocolos: ['esquistossomose-tratamento', 'hipertensao-portal-esquistossomotica'],
    medicamentos: ['praziquantel', 'oxamniquina'],
    calculadoras: [],
    citations: [
      { refId: 'ms-esquistossomose-2022' },
      { refId: 'who-schistosomiasis-2023' }
    ],
    lastUpdate: '2024-12-23'
  },

  // ============================================================================
  // HANSENÍASE
  // ============================================================================
  {
    id: 'hanseniase',
    titulo: 'Hanseníase',
    sinonimos: ['Lepra', 'Mal de Hansen', 'Morféia'],
    doid: 'DOID:1024',
    snomedCT: '81004002',
    meshId: 'D007918',
    umlsCui: 'C0023343',
    ciap2: ['S76'],
    cid10: ['A30', 'A30.0', 'A30.1', 'A30.2', 'A30.3', 'A30.4', 'A30.5', 'A30.8', 'A30.9'],
    cid11: ['1B21'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Doença infecciosa crônica causada pelo Mycobacterium leprae, afetando pele e nervos periféricos. Classificada em paucibacilar (PB) ou multibacilar (MB) para fins de tratamento.',
      criteriosDiagnosticos: [
        'Lesão(ões) de pele com alteração de sensibilidade',
        'Espessamento de nervo periférico',
        'Baciloscopia positiva (em MB)',
        'CASO DEFINIDO: ≥1 dos sinais cardinais:',
        '1. Lesão hipocrômica/eritematosa com perda de sensibilidade',
        '2. Espessamento de tronco nervoso periférico',
        '3. Baciloscopia positiva',
        'Classificação operacional: PB (≤5 lesões) vs MB (>5 lesões ou baciloscopia +)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Educação sobre a doença (combate ao estigma)',
          'Cuidados com pés e mãos insensíveis',
          'Prevenção de incapacidades',
          'Exame de contatos domiciliares'
        ],
        farmacologico: [
          'PAUCIBACILAR (PB - ≤5 lesões):',
          'Rifampicina 600mg dose mensal supervisionada',
          'Dapsona 100mg/dia (autoadministrada)',
          'Duração: 6 doses mensais em até 9 meses',
          '',
          'MULTIBACILAR (MB - >5 lesões):',
          'Rifampicina 600mg dose mensal supervisionada',
          'Clofazimina 300mg mensal + 50mg/dia',
          'Dapsona 100mg/dia',
          'Duração: 12 doses mensais em até 18 meses'
        ]
      },
      metasTerapeuticas: [
        'Cura bacteriológica',
        'Prevenção de incapacidades',
        'Interrupção da cadeia de transmissão'
      ],
      examesIniciais: [
        'Exame dermatoneurológico completo',
        'Teste de sensibilidade (térmica, dolorosa, tátil)',
        'Baciloscopia de raspado dérmico',
        'Avaliação de grau de incapacidade física (0, I, II)',
        'Biópsia de pele (casos duvidosos)',
        'Eletroneuromiografia (se comprometimento neural)'
      ],
      redFlags: [
        'REAÇÃO TIPO 1 (reversa): eritema e edema de lesões, neurite',
        'REAÇÃO TIPO 2 (ENH): febre, nódulos dolorosos, neurite, irite, artrite',
        'Neurite aguda (risco de sequela)',
        'Mão em garra, pé caído',
        'Úlceras tróficas'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '~30.000 casos novos/ano no Brasil (2º no mundo)',
        faixaEtaria: 'Todas as idades, pico em adultos jovens',
        fatoresRisco: [
          'Contato domiciliar prolongado com caso MB não tratado',
          'Condições socioeconômicas precárias',
          'Imunossupressão relativa',
          'Predisposição genética'
        ],
        citations: [{ refId: 'ms-hanseniase-2022' }]
      },
      fisiopatologia: {
        texto: 'M. leprae tem tropismo por macrófagos e células de Schwann. A resposta imune do hospedeiro determina a forma clínica: resposta Th1 (paucibacilar) vs Th2 (multibacilar). A destruição neural leva a perda de sensibilidade e incapacidades.',
        citations: [{ refId: 'who-leprosy-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Manchas hipocrômicas ou eritematosas',
          'Perda de sensibilidade nas lesões',
          'Formigamento, dormência em extremidades',
          'Fraqueza muscular',
          'Espessamento de nervos',
          'Lesões nodulares (forma virchowiana)'
        ],
        sinaisExameFisico: [
          'Lesões de pele com anestesia',
          'Nervos espessados e dolorosos à palpação',
          'Madarose (perda de sobrancelhas)',
          'Infiltração de face (fácies leonina)',
          'Atrofia muscular (interósseos, tenar, hipotenar)',
          'Mão em garra, pé caído'
        ],
        formasClinicas: [
          'Indeterminada (forma inicial)',
          'Tuberculoide (paucibacilar)',
          'Dimorfa (borderline)',
          'Virchowiana (multibacilar)'
        ],
        citations: [{ refId: 'ms-hanseniase-2022' }]
      },
      diagnostico: {
        criterios: [
          'Clínico (sinais cardinais)',
          'Baciloscopia (+ em MB)',
          'Histopatologia (se dúvida)'
        ],
        diagnosticoDiferencial: [
          'Pitiríase versicolor',
          'Vitiligo',
          'Dermatofitoses',
          'Sífilis secundária',
          'Leishmaniose cutânea',
          'Neurofibromatose',
          'Neuropatias periféricas outras'
        ],
        examesLaboratoriais: [
          'Baciloscopia de raspado dérmico',
          'Biópsia de pele com estudo histopatológico',
          'Teste de Mitsuda (valor prognóstico)',
          'PCR para M. leprae (se disponível)'
        ],
        citations: [{ refId: 'ms-hanseniase-2022' }]
      },
      tratamento: {
        objetivos: [
          'Cura da infecção',
          'Prevenção de incapacidades',
          'Tratamento de reações',
          'Vigilância de contatos'
        ],
        naoFarmacologico: {
          medidas: [
            'Autocuidado (pés, mãos, olhos)',
            'Fisioterapia',
            'Cirurgia reparadora (se necessário)',
            'Órteses e próteses'
          ],
          citations: [{ refId: 'ms-hanseniase-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'PQT-PB', medicamentos: ['Rifampicina 600mg/mês', 'Dapsona 100mg/dia'], posologia: '6 doses em até 9 meses' },
            { classe: 'PQT-MB', medicamentos: ['Rifampicina 600mg/mês', 'Clofazimina 300mg/mês + 50mg/dia', 'Dapsona 100mg/dia'], posologia: '12 doses em até 18 meses' }
          ],
          situacoesEspeciais: [
            { situacao: 'Reação tipo 1 (reversa)', conduta: 'Prednisona 1-2mg/kg/dia com redução gradual' },
            { situacao: 'Reação tipo 2 (ENH)', conduta: 'Talidomida 100-400mg/dia (contraindicada em mulheres em idade fértil) OU Prednisona' },
            { situacao: 'Neurite aguda', conduta: 'Prednisona + imobilização; considerar descompressão neural' }
          ],
          citations: [{ refId: 'who-leprosy-2023' }]
        },
        duracao: 'PB: 6 meses; MB: 12 meses'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal durante tratamento; semestral por 5 anos após alta',
        examesControle: ['Avaliação neurológica', 'Grau de incapacidade', 'Baciloscopia (MB)'],
        metasTerapeuticas: [
          'Completar esquema terapêutico',
          'Manter grau de incapacidade',
          'Identificar e tratar reações',
          'Examinar e tratar contatos'
        ],
        criteriosEncaminhamento: [
          'Reações graves: centro de referência',
          'Incapacidades: fisioterapia/cirurgia',
          'Resistência medicamentosa: centro de referência'
        ],
        citations: [{ refId: 'ms-hanseniase-2022' }]
      },
      prevencao: {
        primaria: [
          'Exame de contatos domiciliares',
          'BCG em contatos',
          'Educação em saúde',
          'Melhoria das condições de vida'
        ],
        secundaria: [
          'Diagnóstico precoce',
          'Tratamento adequado',
          'Prevenção de incapacidades'
        ],
        citations: [{ refId: 'who-leprosy-2023' }]
      }
    },
    protocolos: ['hanseniase-tratamento', 'reacao-hanseniase'],
    medicamentos: ['rifampicina', 'dapsona', 'clofazimina', 'prednisona', 'talidomida'],
    calculadoras: [],
    citations: [
      { refId: 'ms-hanseniase-2022' },
      { refId: 'who-leprosy-2023' }
    ],
    lastUpdate: '2024-12-23'
  },

  // ============================================================================
  // RAIVA HUMANA
  // ============================================================================
  {
    id: 'raiva-humana',
    titulo: 'Raiva Humana',
    sinonimos: ['Hidrofobia', 'Raiva'],
    doid: 'DOID:11260',
    snomedCT: '14168008',
    meshId: 'D011818',
    umlsCui: 'C0034494',
    ciap2: ['A77'],
    cid10: ['A82', 'A82.0', 'A82.1', 'A82.9'],
    cid11: ['1C82'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Encefalite viral aguda causada pelo vírus da raiva (Lyssavirus), transmitida pela mordida de animais infectados. Virtualmente 100% fatal após início dos sintomas. PREVENÍVEL por profilaxia pós-exposição.',
      criteriosDiagnosticos: [
        'História de exposição: mordida/arranhadura de animal suspeito ou morcego',
        'Período de incubação: 20-90 dias (variável: 4 dias a anos)',
        'Sintomas prodrômicos: febre, mal-estar, parestesias no local',
        'Fase neurológica: agitação, hidrofobia, aerofobia, hipersalivação',
        'Confirmação: IFD, isolamento viral, RT-PCR, Sellers post-mortem'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'PREVENÇÃO PÓS-EXPOSIÇÃO (antes dos sintomas):',
          'Lavagem imediata do ferimento com água e sabão (15 min)',
          'NÃO suturar o ferimento',
          'Avaliação do animal (observação 10 dias se cão/gato)',
          'Profilaxia conforme esquema do MS'
        ],
        farmacologico: [
          'PROFILAXIA PÓS-EXPOSIÇÃO:',
          'VACINA: 4 doses (D0, D3, D7, D14) IM deltóide',
          'SORO/IMUNOGLOBULINA: SAR ou IGHAR no local da lesão',
          'Indicação de soro: lesões graves (cabeça, pescoço, mãos), mucosas, mordida de morcego',
          '',
          'Após início dos sintomas: TRATAMENTO SUPORTE',
          'Protocolo de Milwaukee (controverso, raríssimos sobreviventes)',
          'UTI, sedação profunda, antivirais'
        ]
      },
      metasTerapeuticas: [
        'PREVENÇÃO: profilaxia pós-exposição adequada',
        'Se sintomático: suporte paliativo',
        'Proteção da equipe de saúde'
      ],
      examesIniciais: [
        'Imprint de córnea com IFD',
        'Biópsia de pele da nuca (folículo piloso)',
        'RT-PCR de saliva, LCR',
        'Necropsia do animal agressor (se possível)',
        'LCR: pleocitose linfocítica'
      ],
      redFlags: [
        'Mordida de morcego (mesmo sem lesão visível)',
        'Animal que morreu ou desapareceu',
        'Lesões em face, cabeça, pescoço, mãos',
        'Múltiplas mordidas',
        'Atraso na profilaxia'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '~60.000 mortes/ano no mundo (maioria Ásia/África)',
        incidencia: 'No Brasil: <10 casos/ano (maioria transmissão por morcegos)',
        mortalidade: '~100% após início dos sintomas',
        fatoresRisco: [
          'Contato com animais silvestres (morcegos)',
          'Cães e gatos não vacinados',
          'Áreas rurais',
          'Profissionais expostos (veterinários, biólogos)'
        ],
        citations: [{ refId: 'ms-raiva-2022' }]
      },
      fisiopatologia: {
        texto: 'Vírus entra por ferimento, replica-se em músculo, ascende por nervos periféricos até SNC. No encéfalo, causa encefalite difusa com corpúsculos de Negri. Dissemina-se para glândulas salivares (transmissão). A morte ocorre por falência respiratória/cardiovascular.',
        citations: [{ refId: 'who-rabies-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Pródromo: febre, cefaleia, mal-estar, parestesia local',
          'Fase furiosa: agitação, hidrofobia, aerofobia, hipersalivação',
          'Fase paralítica: paralisia flácida ascendente',
          'Coma e morte'
        ],
        sinaisExameFisico: [
          'Espasmos faríngeos ao tentar beber (hidrofobia)',
          'Espasmos com corrente de ar (aerofobia)',
          'Hipersalivação',
          'Agitação psicomotora',
          'Paralisia, arreflexia (forma paralítica)',
          'Disfunção autonômica'
        ],
        formasClinicas: [
          'Forma furiosa (encefálica) - mais comum',
          'Forma paralítica (similar a Guillain-Barré)'
        ],
        citations: [{ refId: 'ms-raiva-2022' }]
      },
      diagnostico: {
        criterios: [
          'Clínica + exposição epidemiológica',
          'Confirmação laboratorial (IFD, PCR, isolamento)'
        ],
        diagnosticoDiferencial: [
          'Encefalites virais outras',
          'Tétano',
          'Síndrome de Guillain-Barré',
          'Botulismo',
          'Histeria (raramente)'
        ],
        examesLaboratoriais: [
          'IFD de impressão de córnea ou biópsia de nuca',
          'RT-PCR de saliva, biópsia, LCR',
          'Isolamento viral',
          'LCR: pleocitose linfocítica, proteína elevada',
          'Anticorpos neutralizantes (em não vacinados)',
          'Post-mortem: corpúsculos de Negri'
        ],
        citations: [{ refId: 'who-rabies-2023' }]
      },
      tratamento: {
        objetivos: [
          'PREVENÇÃO é o foco principal',
          'Suporte paliativo se sintomático'
        ],
        naoFarmacologico: {
          medidas: [
            'Lavagem do ferimento (muito importante)',
            'Observação do animal (10 dias para cão/gato)',
            'Suporte intensivo (se sintomático)'
          ],
          citations: [{ refId: 'ms-raiva-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Vacina antirrábica', medicamentos: ['Vacina de cultivo celular (Vero ou HDCV)'], posologia: 'D0, D3, D7, D14 (ou esquema alternativo)' },
            { classe: 'Imunoprofilaxia passiva', medicamentos: ['SAR (soro antirrábico) 40UI/kg', 'IGHAR 20UI/kg'], posologia: 'Dose única, infiltrar no local do ferimento' }
          ],
          situacoesEspeciais: [
            { situacao: 'Mordida de morcego', conduta: 'Sempre indicar vacina + soro' },
            { situacao: 'Imunodeprimido', conduta: '5 doses de vacina + soro + sorologia de controle' },
            { situacao: 'Reexposição', conduta: '2 doses (D0, D3) se vacinação prévia completa' }
          ],
          citations: [{ refId: 'who-rabies-2023' }]
        },
        duracao: 'Profilaxia: esquema completo; Tratamento sintomático: até óbito'
      },
      acompanhamento: {
        frequenciaConsultas: 'Acompanhamento até completar esquema vacinal',
        metasTerapeuticas: [
          'Completar profilaxia pós-exposição',
          'Monitorar efeitos adversos da vacina/soro'
        ],
        criteriosEncaminhamento: [
          'Sintomático: hospital de referência',
          'Reação adversa grave: CRIE'
        ],
        citations: [{ refId: 'ms-raiva-2022' }]
      },
      prevencao: {
        primaria: [
          'Vacinação de cães e gatos',
          'Evitar contato com animais silvestres',
          'Profilaxia pré-exposição em profissionais de risco',
          'Controle de morcegos em áreas urbanas'
        ],
        secundaria: [
          'Profilaxia pós-exposição adequada e oportuna',
          'Observação do animal agressor',
          'Notificação compulsória'
        ],
        citations: [{ refId: 'who-rabies-2023' }]
      }
    },
    protocolos: ['raiva-profilaxia-pos-exposicao', 'esquema-vacinal-raiva'],
    medicamentos: ['vacina-antirrabica', 'soro-antirrabico', 'imunoglobulina-antirrabica'],
    calculadoras: [],
    citations: [
      { refId: 'ms-raiva-2022' },
      { refId: 'who-rabies-2023' }
    ],
    lastUpdate: '2024-12-23'
  }
];
