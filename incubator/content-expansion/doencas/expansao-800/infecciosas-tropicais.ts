/**
 * DOENCAS INFECCIOSAS TROPICAIS - DARWIN-MFC EXPANSAO 800
 * =======================================================
 * Doencas tropicais e negligenciadas relevantes para Brasil
 */

import { Doenca } from '@/lib/types/doenca';

export const infecciosasTropicais: Doenca[] = [
  // ============================================================================
  // 1. ESQUISTOSSOMOSE
  // ============================================================================
  {
    id: 'esquistossomose-mansonica',
    titulo: 'Esquistossomose Mansonica',
    sinonimos: ['Barriga dagua', 'Xistose', 'Bilharziose', 'Esquistossomose intestinal'],
    doid: 'DOID:1395',
    snomedCT: '28019009',
    meshId: 'D012552',
    umlsCui: 'C0036323',
    ciap2: ['D96'],
    cid10: ['B65.1'],
    cid11: ['1F83.1'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Doenca parasitaria causada pelo Schistosoma mansoni, transmitida por caramujos Biomphalaria. Forma hepatoesplenica causa hipertensao portal. Endemica no Nordeste e Minas Gerais.',
      criteriosDiagnosticos: [
        'Exposicao a aguas naturais em area endemica',
        'AGUDA (Katayama): febre, urticaria, eosinofilia apos 2-6 semanas de exposicao',
        'INTESTINAL: diarreia intermitente com muco/sangue, dor abdominal',
        'HEPATOESPLENICA: hepatoesplenomegalia, hipertensao portal',
        'EPF positivo (ovos com espicula lateral) - Kato-Katz',
        'USG: fibrose periportal de Symmers'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Educacao sanitaria',
          'Evitar contato com aguas naturais em areas endemicas',
          'Saneamento basico'
        ],
        farmacologico: [
          'PRAZIQUANTEL 50mg/kg dose unica (adultos)',
          'Criancas: 60mg/kg dose unica',
          'FORMA AGUDA: Prednisona 1mg/kg/dia 5-7 dias ANTES do praziquantel',
          'Taxa de cura: 80-90%'
        ]
      },
      metasTerapeuticas: [
        'Eliminacao parasitaria (EPF negativo)',
        'Prevencao de evolucao para forma hepatoesplenica',
        'Controle de hipertensao portal se presente'
      ],
      examesIniciais: [
        'EPF Kato-Katz (3 amostras)',
        'Hemograma (eosinofilia)',
        'USG abdominal',
        'Funcao hepatica',
        'EDA se hepatoesplenica (varizes)'
      ],
      redFlags: [
        'Hemorragia digestiva alta (varizes esofagicas)',
        'Esplenomegalia volumosa com hiperesplenismo',
        'Ascite refrataria',
        'Neuroesquistossomose (mielopatia)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1,5 milhoes de infectados no Brasil',
        incidencia: 'Areas endemicas: Nordeste, MG, ES',
        mortalidade: 'Rara; relacionada a complicacoes da hipertensao portal',
        faixaEtaria: 'Jovens e adultos em areas endemicas',
        fatoresRisco: [
          'Contato com colecoes hidricas naturais',
          'Falta de saneamento basico',
          'Atividades agricolas em areas alagadas',
          'Banho em rios/lagoas endemicos'
        ],
        citations: [{ refId: 'ms-esquistossomose-2022' }]
      },
      fisiopatologia: {
        texto: 'Cercarias penetram a pele, migram aos pulmoes e figado, maturam no sistema porta. Vermes adultos nas veias mesentericas poem ovos que causam reacao granulomatosa. Fibrose periportal (Symmers) leva a hipertensao portal pre-sinusoidal.',
        citations: [{ refId: 'who-schistosomiasis-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dermatite cercariana (prurido na exposicao)',
          'Sindrome de Katayama: febre, urticaria, tosse, eosinofilia',
          'Diarreia mucossanguinolenta',
          'Dor abdominal em colica',
          'Hepatoesplenomegalia'
        ],
        sinaisExameFisico: [
          'Hepatomegalia de lobo esquerdo',
          'Esplenomegalia',
          'Circulacao colateral',
          'Ascite (casos avancados)'
        ],
        formasClinicas: [
          'Forma aguda toxemica (Katayama)',
          'Forma intestinal',
          'Forma hepatointestinal',
          'Forma hepatoesplenica compensada',
          'Forma hepatoesplenica descompensada'
        ],
        citations: [{ refId: 'ms-esquistossomose-2022' }]
      },
      diagnostico: {
        criterios: [
          'Epidemiologia positiva + parasitologico',
          'EPF Kato-Katz (3 amostras em dias alternados)',
          'Biopsia retal se EPF negativo'
        ],
        diagnosticoDiferencial: [
          'Cirrose hepatica',
          'Leishmaniose visceral',
          'Leucemias/linfomas',
          'Sindrome de Budd-Chiari'
        ],
        examesLaboratoriais: [
          'EPF Kato-Katz',
          'Hemograma',
          'Funcao hepatica',
          'Albumina'
        ],
        examesImagem: [
          'USG abdominal (fibrose periportal)',
          'EDA (varizes)'
        ],
        citations: [{ refId: 'ms-esquistossomose-2022' }]
      },
      tratamento: {
        objetivos: [
          'Eliminar o parasita',
          'Prevenir progressao',
          'Tratar complicacoes'
        ],
        naoFarmacologico: {
          medidas: [
            'Educacao sanitaria',
            'Ligadura de varizes se indicado',
            'Cirurgia de desconexao azigo-portal em casos selecionados'
          ],
          citations: [{ refId: 'ms-esquistossomose-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antiesquistossomico', medicamentos: ['Praziquantel 50-60mg/kg'], posologia: 'Dose unica oral', observacoes: 'Cura 80-90%' }
          ],
          segundaLinha: [
            { classe: 'Alternativa', medicamentos: ['Oxamniquina 15mg/kg'], posologia: 'Dose unica', observacoes: 'Se intolerancia ao praziquantel' }
          ],
          citations: [{ refId: 'who-schistosomiasis-2023' }]
        },
        duracao: 'Dose unica; controle de cura em 6 meses'
      },
      acompanhamento: {
        frequenciaConsultas: 'EPF controle em 1, 3 e 6 meses',
        metasTerapeuticas: [
          'Negativacao do EPF',
          'Estabilizacao da fibrose'
        ],
        criteriosEncaminhamento: [
          'Forma hepatoesplenica: gastroenterologia',
          'Varizes de alto risco: endoscopia',
          'Neuroesquistossomose: neurologia'
        ],
        citations: [{ refId: 'ms-esquistossomose-2022' }]
      },
      prevencao: {
        primaria: [
          'Saneamento basico',
          'Controle de caramujos',
          'Educacao em saude'
        ],
        secundaria: [
          'Tratamento coletivo em areas endemicas',
          'Inqueritos coproscopicos'
        ],
        citations: [{ refId: 'who-schistosomiasis-2023' }]
      }
    },
    protocolos: ['esquistossomose-tratamento'],
    medicamentos: ['praziquantel', 'oxamniquina'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ms-esquistossomose-2022' }, { refId: 'who-schistosomiasis-2023' }],
    lastUpdate: '2025-01'
  },

  // ============================================================================
  // 2. LEISHMANIOSE VISCERAL
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
      definicao: 'Doenca sistemica causada por Leishmania infantum, transmitida pelo flebotomineo Lutzomyia longipalpis. Acomete sistema reticuloendotelial. Fatal se nao tratada.',
      criteriosDiagnosticos: [
        'Febre prolongada (>2 semanas)',
        'Esplenomegalia volumosa',
        'Hepatomegalia',
        'Pancitopenia',
        'Hipergamaglobulinemia',
        'Confirmacao: rK39 + clinica OU parasitologico de medula'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suporte nutricional',
          'Transfusao se indicado',
          'Tratamento de infeccoes secundarias'
        ],
        farmacologico: [
          'ANFOTERICINA B LIPOSSOMAL 3mg/kg/dia IV por 7 dias (preferencial)',
          'Dose total: 20mg/kg',
          'Alternativa: Glucantime 20mg Sb/kg/dia IM/IV por 20-40 dias',
          'Preferir lipossomal em: <1 ano, >50 anos, gestante, HIV+, comorbidades'
        ]
      },
      metasTerapeuticas: [
        'Cura clinica (resolucao de febre e organomegalias)',
        'Normalizacao hematologica',
        'Cura parasitologica'
      ],
      examesIniciais: [
        'Hemograma (pancitopenia)',
        'Proteinas totais e fracoes (inversao A/G)',
        'Funcao renal e hepatica',
        'Sorologia rK39',
        'Mielograma com pesquisa de Leishmania',
        'Sorologia HIV'
      ],
      redFlags: [
        'Idade <1 ou >50 anos',
        'Ictericia',
        'Edema/anasarca',
        'Sangramento',
        'Coinfeccao HIV',
        'Infeccao bacteriana grave'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '3.000-4.000 casos/ano no Brasil',
        mortalidade: '7-10% no Brasil; >90% se nao tratada',
        faixaEtaria: 'Criancas <10 anos mais afetadas',
        fatoresRisco: [
          'Area endemica (Nordeste, Norte, Centro-Oeste)',
          'Presenca de caes infectados',
          'Desnutricao',
          'HIV/AIDS'
        ],
        citations: [{ refId: 'ms-lv-2022' }]
      },
      fisiopatologia: {
        texto: 'Promastigotas inoculados pelo flebotomineo sao fagocitados por macrofagos, transformando-se em amastigotas. Disseminacao pelo sistema reticuloendotelial causa hiperplasia de baco, figado e medula ossea.',
        citations: [{ refId: 'who-leishmaniasis-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Febre prolongada irregular',
          'Emagrecimento progressivo',
          'Astenia intensa',
          'Aumento abdominal',
          'Palidez',
          'Sangramentos'
        ],
        sinaisExameFisico: [
          'Esplenomegalia volumosa',
          'Hepatomegalia',
          'Palidez cutaneomucosa',
          'Desnutricao',
          'Edema'
        ],
        formasClinicas: [
          'Forma classica',
          'Forma oligossintomatica',
          'Coinfeccao LV-HIV'
        ],
        citations: [{ refId: 'ms-lv-2022' }]
      },
      diagnostico: {
        criterios: [
          'Clinica + epidemiologia + laboratorio',
          'Sorologia rK39 positiva',
          'Parasitologico de medula ossea (padrao-ouro)'
        ],
        diagnosticoDiferencial: [
          'Malaria',
          'Esquistossomose hepatoesplenica',
          'Leucemias',
          'Linfomas',
          'Histoplasmose'
        ],
        examesLaboratoriais: [
          'Hemograma',
          'Proteinas',
          'Sorologia rK39/ELISA',
          'Mielograma',
          'PCR para Leishmania'
        ],
        citations: [{ refId: 'ms-lv-2022' }]
      },
      tratamento: {
        objetivos: [
          'Eliminacao do parasita',
          'Resolucao clinica',
          'Prevencao de recidiva'
        ],
        naoFarmacologico: {
          medidas: [
            'Suporte nutricional',
            'Transfusao se necessario',
            'ATB para infeccoes secundarias'
          ],
          citations: [{ refId: 'ms-lv-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Anfotericina B lipossomal', medicamentos: ['AmBisome'], posologia: '3mg/kg/dia IV por 7 dias', observacoes: 'Preferencial para grupos de risco' }
          ],
          segundaLinha: [
            { classe: 'Antimonial pentavalente', medicamentos: ['Glucantime 20mg Sb/kg/dia'], posologia: 'IM ou IV por 20-40 dias', observacoes: 'Monitorar ECG' }
          ],
          citations: [{ refId: 'who-leishmaniasis-2023' }]
        },
        duracao: 'AnfoB lipossomal: 7 dias; Antimonial: 20-40 dias'
      },
      acompanhamento: {
        frequenciaConsultas: 'Apos tratamento: 3, 6 e 12 meses',
        metasTerapeuticas: [
          'Cura clinica em 2-3 meses',
          'Normalizacao hematologica',
          'Ausencia de recidiva em 1 ano'
        ],
        criteriosEncaminhamento: [
          'Casos graves: hospital de referencia',
          'Coinfeccao HIV: infectologia',
          'Recidivas'
        ],
        citations: [{ refId: 'ms-lv-2022' }]
      },
      prevencao: {
        primaria: [
          'Controle do vetor',
          'Manejo de caes infectados',
          'Coleiras impregnadas'
        ],
        secundaria: [
          'Diagnostico e tratamento precoces',
          'Vigilancia epidemiologica'
        ],
        citations: [{ refId: 'ms-lv-2022' }]
      }
    },
    protocolos: ['leishmaniose-visceral-tratamento'],
    medicamentos: ['anfotericina-b-lipossomal', 'glucantime'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ms-lv-2022' }, { refId: 'who-leishmaniasis-2023' }],
    lastUpdate: '2025-01'
  },

  // ============================================================================
  // 3. LEISHMANIOSE TEGUMENTAR
  // ============================================================================
  {
    id: 'leishmaniose-tegumentar',
    titulo: 'Leishmaniose Tegumentar Americana',
    sinonimos: ['Ulcera de Bauru', 'Ferida brava', 'LTA', 'Leishmaniose cutanea'],
    doid: 'DOID:9111',
    snomedCT: '186798006',
    meshId: 'D016773',
    umlsCui: 'C0023283',
    ciap2: ['S76'],
    cid10: ['B55.1', 'B55.2'],
    cid11: ['1F54.1', '1F54.2'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Doenca causada por Leishmania braziliensis e outras especies, transmitida por flebotomineos. Forma cutanea: ulceras indolores. Forma mucosa: destruicao de mucosas nasais e orofaringeas.',
      criteriosDiagnosticos: [
        'Ulcera cutanea com bordas elevadas e fundo granuloso',
        'Indolor, evolucao cronica',
        'Lesao em area exposta',
        'Exposicao em area endemica/mata',
        'IDRM (Montenegro) positiva',
        'Confirmacao: parasitologico, histopatologia ou PCR'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cuidados locais com a ulcera',
          'Evitar infeccao secundaria'
        ],
        farmacologico: [
          'GLUCANTIME 15-20mg Sb/kg/dia por 20 dias (cutanea)',
          'GLUCANTIME 20mg Sb/kg/dia por 30 dias (mucosa)',
          'Alternativa: Anfotericina B lipossomal (refratarios, contraindicacao)',
          'Pentamidina: esquema alternativo'
        ]
      },
      metasTerapeuticas: [
        'Cicatrizacao das lesoes',
        'Prevencao de forma mucosa',
        'Cura clinica sem recidiva'
      ],
      examesIniciais: [
        'IDRM (Intradermorreacao de Montenegro)',
        'Raspado/biopsia da lesao',
        'Histopatologia',
        'PCR para Leishmania',
        'Exame ORL (descartar mucosa)'
      ],
      redFlags: [
        'Lesoes mucosas (nariz, boca, laringe)',
        'Multiplas lesoes',
        'Imunossupressao',
        'Falha terapeutica'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '15.000-20.000 casos/ano no Brasil',
        faixaEtaria: 'Adultos em atividades rurais/florestais',
        fatoresRisco: [
          'Trabalho/lazer em areas de mata',
          'Desmatamento recente',
          'Moradia proxima a florestas',
          'Imunossupressao'
        ],
        citations: [{ refId: 'ms-lta-2022' }]
      },
      fisiopatologia: {
        texto: 'Promastigotas inoculados pelo flebotomineo infectam macrofagos dermicos. Resposta imune granulomatosa determina a forma clinica. L. braziliensis tem tropismo por mucosas.',
        citations: [{ refId: 'who-leishmaniasis-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Ulcera cutanea indolor',
          'Bordas elevadas, fundo granuloso',
          'Evolucao cronica (semanas a meses)',
          'Lesao mucosa: obstrucao nasal, epistaxe, disfagia'
        ],
        sinaisExameFisico: [
          'Ulcera com bordas infiltradas',
          'Adenopatia regional',
          'Perfuracao de septo nasal (mucosa)',
          'Destruicao de palato, laringe'
        ],
        formasClinicas: [
          'Cutanea localizada',
          'Cutanea disseminada',
          'Cutanea difusa',
          'Mucosa (espundia)'
        ],
        citations: [{ refId: 'ms-lta-2022' }]
      },
      diagnostico: {
        criterios: [
          'Clinico + epidemiologico + laboratorial',
          'IDRM positiva (>5mm)',
          'Parasitologico ou histopatologico'
        ],
        diagnosticoDiferencial: [
          'Ulcera traumatica',
          'Paracoccidioidomicose',
          'Esporotricose',
          'Carcinoma espinocelular',
          'Sifilis'
        ],
        examesLaboratoriais: [
          'IDRM Montenegro',
          'Raspado da lesao',
          'Biopsia com histopatologia',
          'PCR'
        ],
        citations: [{ refId: 'ms-lta-2022' }]
      },
      tratamento: {
        objetivos: [
          'Cicatrizacao das lesoes',
          'Prevenir forma mucosa',
          'Evitar recidiva'
        ],
        naoFarmacologico: {
          medidas: [
            'Cuidados com a ulcera',
            'Prevencao de infeccao secundaria'
          ],
          citations: [{ refId: 'ms-lta-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antimonial pentavalente', medicamentos: ['Glucantime 15-20mg Sb/kg/dia'], posologia: 'IV ou IM por 20-30 dias' }
          ],
          segundaLinha: [
            { classe: 'Anfotericina B', medicamentos: ['AnfoB lipossomal', 'AnfoB desoxicolato'], observacoes: 'Para refratarios ou contraindicacoes' },
            { classe: 'Pentamidina', medicamentos: ['Isotionato de pentamidina'], posologia: '4mg/kg em dias alternados (3 doses)' }
          ],
          citations: [{ refId: 'who-leishmaniasis-2023' }]
        },
        duracao: 'Cutanea: 20 dias; Mucosa: 30 dias'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal ate cicatrizacao; depois 3, 6, 12 meses',
        metasTerapeuticas: [
          'Cicatrizacao completa',
          'Ausencia de recidiva',
          'Ausencia de lesao mucosa'
        ],
        criteriosEncaminhamento: [
          'Forma mucosa: ORL + dermatologia',
          'Falha terapeutica: centro de referencia',
          'Imunossuprimido'
        ],
        citations: [{ refId: 'ms-lta-2022' }]
      },
      prevencao: {
        primaria: [
          'Uso de repelentes',
          'Roupas de manga longa',
          'Mosquiteiros impregnados',
          'Evitar exposicao crepuscular'
        ],
        secundaria: [
          'Diagnostico e tratamento precoces',
          'Vigilancia de forma mucosa'
        ],
        citations: [{ refId: 'ms-lta-2022' }]
      }
    },
    protocolos: ['leishmaniose-tegumentar-tratamento'],
    medicamentos: ['glucantime', 'anfotericina-b', 'pentamidina'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ms-lta-2022' }, { refId: 'who-leishmaniasis-2023' }],
    lastUpdate: '2025-01'
  },

  // ============================================================================
  // 4. DOENCA DE CHAGAS
  // ============================================================================
  {
    id: 'doenca-chagas',
    titulo: 'Doenca de Chagas',
    sinonimos: ['Tripanossomiase americana', 'Mal de Chagas'],
    doid: 'DOID:12140',
    snomedCT: '77506005',
    meshId: 'D014355',
    umlsCui: 'C0041234',
    ciap2: ['A78'],
    cid10: ['B57', 'B57.0', 'B57.1', 'B57.2'],
    cid11: ['1F51'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Doenca parasitaria causada pelo Trypanosoma cruzi, transmitida pelo triatomineo (barbeiro), via oral (acai), congenita ou transfusional. Fase cronica com cardiopatia e/ou megas digestivos.',
      criteriosDiagnosticos: [
        'AGUDA: febre, edema, hepatoesplenomegalia, sinal de Romana/chagoma',
        'Parasitemia detectavel (gota espessa, PCR)',
        'CRONICA: sorologia positiva (2 metodos)',
        'Cardiopatia: BRD + BDAS, arritmias, ICC',
        'Megas: disfagia, constipacao cronica'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suporte na fase aguda',
          'Tratamento de ICC na fase cronica',
          'Dieta para disfagia/constipacao'
        ],
        farmacologico: [
          'FASE AGUDA (obrigatorio): Benznidazol 5mg/kg/dia por 60 dias',
          'Alternativa: Nifurtimox 8-10mg/kg/dia por 60-90 dias',
          'CARDIOPATIA: IECA, BB, espironolactona, amiodarona',
          'Marcapasso/CDI se indicado'
        ]
      },
      metasTerapeuticas: [
        'Fase aguda: eliminar parasita',
        'Fase cronica: controlar manifestacoes, prevenir complicacoes',
        'Prevenir transmissao vertical'
      ],
      examesIniciais: [
        'Sorologia (ELISA + IFI)',
        'Gota espessa/PCR (fase aguda)',
        'ECG 12 derivacoes',
        'Ecocardiograma',
        'Rx torax',
        'EDA/esofagograma se disfagia'
      ],
      redFlags: [
        'Miocardite aguda grave',
        'Meningoencefalite',
        'ICC descompensada',
        'TV sustentada',
        'Bloqueio AV avancado',
        'Reativacao em imunossuprimidos'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-3 milhoes infectados no Brasil; 6-7 milhoes no mundo',
        incidencia: 'Casos agudos: ~200/ano (transmissao oral)',
        mortalidade: '~12.000/ano no Brasil (cardiopatia cronica)',
        faixaEtaria: 'Todas as idades',
        fatoresRisco: [
          'Moradia em area endemica rural',
          'Consumo de alimentos contaminados (acai)',
          'Transfusao nao testada',
          'Mae portadora'
        ],
        citations: [{ refId: 'consenso-chagas-2016' }]
      },
      fisiopatologia: {
        texto: 'T. cruzi invade celulas (miocitos, neuronios), multiplica-se e causa destruicao celular e inflamacao cronica. Cardiopatia por fibrose e desnervacao. Megas por destruicao do plexo mioenterico.',
        citations: [{ refId: 'who-chagas-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'AGUDA: febre, mal-estar, edema',
          'Sinal de Romana (edema bipalpebral)',
          'Chagoma de inoculacao',
          'CRONICA: palpitacoes, dispneia, sincope, disfagia, constipacao'
        ],
        sinaisExameFisico: [
          'Hepatoesplenomegalia (aguda)',
          'Sinais de ICC',
          'Arritmias',
          'Aneurisma apical de VE'
        ],
        formasClinicas: [
          'Fase aguda',
          'Fase cronica indeterminada',
          'Fase cronica cardiaca',
          'Fase cronica digestiva',
          'Forma mista'
        ],
        citations: [{ refId: 'consenso-chagas-2016' }]
      },
      diagnostico: {
        criterios: [
          'Fase aguda: parasitologico positivo',
          'Fase cronica: 2 sorologias positivas (metodos diferentes)'
        ],
        diagnosticoDiferencial: [
          'Cardiomiopatia dilatada',
          'Cardiomiopatia isquemica',
          'Acalasia',
          'Megacolon aganglionar'
        ],
        examesLaboratoriais: [
          'Sorologia (ELISA, IFI, HAI)',
          'Parasitologico direto',
          'PCR',
          'ECG, Holter',
          'Ecocardiograma'
        ],
        citations: [{ refId: 'consenso-chagas-2016' }]
      },
      tratamento: {
        objetivos: [
          'Fase aguda: eliminar parasita',
          'Fase cronica: controlar manifestacoes'
        ],
        naoFarmacologico: {
          medidas: [
            'Tratamento de ICC',
            'Dieta para megas',
            'Cirurgia se indicado'
          ],
          citations: [{ refId: 'consenso-chagas-2016' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Tripanocida', medicamentos: ['Benznidazol 5mg/kg/dia'], posologia: '60 dias em 2 tomadas', observacoes: 'Obrigatorio na fase aguda' }
          ],
          segundaLinha: [
            { classe: 'Alternativa', medicamentos: ['Nifurtimox 8-10mg/kg/dia'], posologia: '60-90 dias' }
          ],
          situacoesEspeciais: [
            { situacao: 'Cardiopatia', conduta: 'IECA, BB, espironolactona; amiodarona; CDI' },
            { situacao: 'Megas', conduta: 'Cardiomiotomia; sigmoidectomia' }
          ],
          citations: [{ refId: 'who-chagas-2023' }]
        },
        duracao: 'Tripanocida: 60 dias; ICC: continuo'
      },
      acompanhamento: {
        frequenciaConsultas: 'Anual na forma indeterminada; trimestral na cardiopatia',
        metasTerapeuticas: [
          'PCR negativa',
          'Estabilizacao cardiaca',
          'Prevencao de morte subita'
        ],
        criteriosEncaminhamento: [
          'Cardiopatia: cardiologia',
          'Arritmias: eletrofisiologia',
          'Megas: gastro/cirurgia'
        ],
        citations: [{ refId: 'consenso-chagas-2016' }]
      },
      prevencao: {
        primaria: [
          'Melhoria habitacional',
          'Controle do vetor',
          'Triagem em bancos de sangue',
          'Cuidados com alimentos'
        ],
        secundaria: [
          'Triagem de gestantes',
          'Acompanhamento de cronicos'
        ],
        citations: [{ refId: 'who-chagas-2023' }]
      }
    },
    protocolos: ['chagas-tratamento', 'cardiopatia-chagasica'],
    medicamentos: ['benznidazol', 'nifurtimox', 'amiodarona'],
    calculadoras: ['rassi-score'],
    rastreamentos: [],
    citations: [{ refId: 'consenso-chagas-2016' }, { refId: 'who-chagas-2023' }],
    lastUpdate: '2025-01'
  },

  // ============================================================================
  // 5. DENGUE
  // ============================================================================
  {
    id: 'dengue-tropical',
    titulo: 'Dengue',
    sinonimos: ['Febre dengue', 'Dengue classica', 'Dengue grave', 'Dengue hemorragica'],
    doid: 'DOID:11205',
    snomedCT: '38362002',
    meshId: 'D003715',
    umlsCui: 'C0011311',
    ciap2: ['A77'],
    cid10: ['A90', 'A91'],
    cid11: ['1D20'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Arbovirose causada pelo virus dengue (DENV 1-4), transmitida pelo Aedes aegypti. Espectro: febre indiferenciada a dengue grave com choque. Brasil e hiperdemico.',
      criteriosDiagnosticos: [
        'Febre 2-7 dias + >=2: mialgia, artralgia, cefaleia retro-orbitaria, exantema, prostacao, petequias',
        'Prova do laco positiva',
        'NS1 (ate 5o dia) ou IgM (apos 6o dia)',
        'Hemoconcentracao, plaquetopenia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratacao oral vigorosa (60-80 mL/kg/dia)',
          'Repouso',
          'Orientar sinais de alarme'
        ],
        farmacologico: [
          'Paracetamol 500-750mg 6/6h (NAO usar AINEs/AAS!)',
          'Dipirona como alternativa',
          'GRUPO C (alarme): SF 10-20 mL/kg em 1h IV',
          'GRUPO D (choque): Expansao 20 mL/kg em 20 min'
        ]
      },
      metasTerapeuticas: [
        'Manter hidratacao (diurese >=0,5 mL/kg/h)',
        'Evitar dengue grave',
        'Reconhecer alarme precocemente'
      ],
      examesIniciais: [
        'Hemograma com plaquetas',
        'NS1 ou IgM',
        'TGO, TGP (se alarme)',
        'Prova do laco'
      ],
      redFlags: [
        'Dor abdominal intensa',
        'Vomitos persistentes',
        'Acumulo de liquidos',
        'Sangramento de mucosas',
        'Letargia/irritabilidade',
        'Hepatomegalia >2cm',
        'Aumento de hematocrito'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Brasil: maior numero de casos no mundo',
        incidencia: 'Milhoes de casos/ano',
        faixaEtaria: 'Todas as idades',
        fatoresRisco: [
          'Area endemica',
          'Infeccao previa (risco de grave)',
          'Criancas e idosos',
          'Gestantes'
        ],
        citations: [{ refId: 'ms-dengue-2024' }]
      },
      fisiopatologia: {
        texto: 'Virus infecta celulas dendriticas e monocitos. Na fase critica, aumento de permeabilidade capilar causa extravasamento plasmatico. ADE (antibody-dependent enhancement) em reinfeccoes.',
        citations: [{ refId: 'ms-dengue-2024' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Febre alta subita',
          'Cefaleia retro-orbitaria',
          'Mialgia intensa',
          'Artralgia',
          'Exantema',
          'Prostacao'
        ],
        sinaisExameFisico: [
          'Exantema maculopapular',
          'Prova do laco positiva',
          'Petequias',
          'Hepatomegalia',
          'Derrame pleural/ascite'
        ],
        formasClinicas: [
          'Dengue sem sinais de alarme',
          'Dengue com sinais de alarme',
          'Dengue grave'
        ],
        citations: [{ refId: 'ms-dengue-2024' }]
      },
      diagnostico: {
        criterios: [
          'Clinico-epidemiologico + laboratorial',
          'NS1 (1o-5o dia)',
          'IgM (apos 6o dia)'
        ],
        diagnosticoDiferencial: [
          'Chikungunya',
          'Zika',
          'Leptospirose',
          'COVID-19'
        ],
        examesLaboratoriais: [
          'Hemograma',
          'NS1/IgM',
          'TGO, TGP',
          'Albumina'
        ],
        citations: [{ refId: 'ms-dengue-2024' }]
      },
      tratamento: {
        objetivos: [
          'Hidratacao',
          'Reconhecer alarme',
          'Prevenir choque'
        ],
        naoFarmacologico: {
          medidas: [
            'Hidratacao oral',
            'Repouso',
            'Notificacao'
          ],
          citations: [{ refId: 'ms-dengue-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Analgesico', medicamentos: ['Paracetamol', 'Dipirona'], observacoes: 'NAO usar AAS/AINEs' }
          ],
          situacoesEspeciais: [
            { situacao: 'Gestante', conduta: 'Internacao precoce' },
            { situacao: 'Choque', conduta: 'UTI, expansao volemica' }
          ],
          citations: [{ refId: 'ms-dengue-2024' }]
        },
        duracao: 'Fase aguda: 7-10 dias'
      },
      acompanhamento: {
        frequenciaConsultas: 'Diario ate 48h apos defervescencia',
        metasTerapeuticas: [
          'Estabilidade hemodinamica',
          'Diurese adequada'
        ],
        criteriosEncaminhamento: [
          'Sinais de alarme: observacao',
          'Dengue grave: UTI'
        ],
        citations: [{ refId: 'ms-dengue-2024' }]
      },
      prevencao: {
        primaria: [
          'Controle do vetor',
          'Repelentes',
          'Vacinacao (Qdenga)'
        ],
        secundaria: [
          'Vigilancia epidemiologica'
        ],
        citations: [{ refId: 'ms-dengue-2024' }]
      }
    },
    protocolos: ['dengue-classificacao', 'dengue-manejo'],
    medicamentos: ['paracetamol', 'dipirona'],
    calculadoras: ['prova-laco'],
    rastreamentos: [],
    citations: [{ refId: 'ms-dengue-2024' }],
    lastUpdate: '2025-01'
  },

  // ============================================================================
  // 6. CHIKUNGUNYA
  // ============================================================================
  {
    id: 'chikungunya',
    titulo: 'Chikungunya',
    sinonimos: ['Febre chikungunya', 'CHIKV'],
    doid: 'DOID:0050012',
    snomedCT: '111864006',
    meshId: 'D065632',
    umlsCui: 'C0008056',
    ciap2: ['A77'],
    cid10: ['A92.0'],
    cid11: ['1D21'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Arbovirose causada pelo virus chikungunya (CHIKV), transmitida pelo Aedes. Caracteriza-se por febre e artralgia intensa, frequentemente cronica.',
      criteriosDiagnosticos: [
        'Febre de inicio subito + artralgia/artrite intensa',
        'Acometimento poliarticular, simetrico',
        'Edema articular',
        'Exantema maculopapular',
        'Confirmacao: RT-PCR (ate 8o dia), IgM (apos 6o dia)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Repouso',
          'Hidratacao',
          'Compressas frias nas articulacoes',
          'Fisioterapia na fase cronica'
        ],
        farmacologico: [
          'FASE AGUDA: Paracetamol, dipirona (evitar AINEs inicialmente)',
          'AINEs apos exclusao de dengue',
          'FASE CRONICA: Hidroxicloroquina, metotrexato se refratario',
          'Corticoides em casos selecionados'
        ]
      },
      metasTerapeuticas: [
        'Alivio da dor',
        'Manutencao da funcao articular',
        'Prevencao de cronificacao'
      ],
      examesIniciais: [
        'Hemograma',
        'PCR, VHS',
        'RT-PCR ou IgM para CHIKV',
        'Funcao renal e hepatica'
      ],
      redFlags: [
        'Neonatos de maes viremicas',
        'Idosos',
        'Comorbidades (DM, HAS, cardiopatia)',
        'Formas atipicas: encefalite, miocardite, hepatite'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Milhares de casos/ano no Brasil desde 2014',
        faixaEtaria: 'Todas as idades; cronificacao mais comum em idosos e mulheres',
        fatoresRisco: [
          'Area endemica',
          'Idade >45 anos',
          'Sexo feminino',
          'Doenca articular previa'
        ],
        citations: [{ refId: 'ms-chikungunya-2022' }]
      },
      fisiopatologia: {
        texto: 'CHIKV tem tropismo por fibroblastos sinoviais, causando artrite. Persistencia viral em articulacoes pode explicar cronificacao. Resposta inflamatoria intensa com citocinas.',
        citations: [{ refId: 'who-chikungunya-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Febre alta',
          'Poliartralgia intensa (maos, pes, tornozelos, punhos)',
          'Artrite (edema, eritema)',
          'Exantema',
          'Mialgia',
          'Cefaleia'
        ],
        sinaisExameFisico: [
          'Artrite poliarticular simetrica',
          'Edema de extremidades',
          'Exantema maculopapular',
          'Tenossinovite'
        ],
        formasClinicas: [
          'Fase aguda (<3 semanas)',
          'Fase subaguda (3 semanas a 3 meses)',
          'Fase cronica (>3 meses) - ate 50% dos casos'
        ],
        citations: [{ refId: 'ms-chikungunya-2022' }]
      },
      diagnostico: {
        criterios: [
          'Clinico-epidemiologico',
          'RT-PCR (ate 8o dia)',
          'IgM (apos 6o dia)'
        ],
        diagnosticoDiferencial: [
          'Dengue',
          'Zika',
          'Artrite reumatoide',
          'Outras artrites virais'
        ],
        examesLaboratoriais: [
          'Hemograma (linfopenia)',
          'PCR, VHS',
          'RT-PCR CHIKV',
          'Sorologia IgM/IgG'
        ],
        citations: [{ refId: 'ms-chikungunya-2022' }]
      },
      tratamento: {
        objetivos: [
          'Alivio sintomatico',
          'Manter funcao articular',
          'Prevenir cronificacao'
        ],
        naoFarmacologico: {
          medidas: [
            'Repouso relativo',
            'Fisioterapia',
            'Compressas frias'
          ],
          citations: [{ refId: 'ms-chikungunya-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Analgesico', medicamentos: ['Paracetamol', 'Dipirona'], observacoes: 'Fase aguda inicial' },
            { classe: 'AINE', medicamentos: ['Naproxeno', 'Ibuprofeno'], observacoes: 'Apos exclusao de dengue' }
          ],
          segundaLinha: [
            { classe: 'DMARD', medicamentos: ['Hidroxicloroquina', 'Metotrexato'], observacoes: 'Fase cronica refrataria' }
          ],
          citations: [{ refId: 'who-chikungunya-2023' }]
        },
        duracao: 'Fase aguda: 1-2 semanas; cronica: meses a anos'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal na fase aguda; mensal na cronica',
        metasTerapeuticas: [
          'Controle da dor',
          'Manutencao da mobilidade'
        ],
        criteriosEncaminhamento: [
          'Artrite cronica: reumatologia',
          'Formas atipicas: internacao'
        ],
        citations: [{ refId: 'ms-chikungunya-2022' }]
      },
      prevencao: {
        primaria: [
          'Controle do Aedes',
          'Repelentes',
          'Protecao individual'
        ],
        secundaria: [
          'Tratamento precoce',
          'Fisioterapia'
        ],
        citations: [{ refId: 'ms-chikungunya-2022' }]
      }
    },
    protocolos: ['chikungunya-manejo'],
    medicamentos: ['paracetamol', 'naproxeno', 'hidroxicloroquina'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ms-chikungunya-2022' }, { refId: 'who-chikungunya-2023' }],
    lastUpdate: '2025-01'
  },

  // ============================================================================
  // 7. ZIKA
  // ============================================================================
  {
    id: 'zika',
    titulo: 'Zika',
    sinonimos: ['Febre Zika', 'ZIKV', 'Virus Zika'],
    doid: 'DOID:0060478',
    snomedCT: '3928002',
    meshId: 'D000071243',
    umlsCui: 'C0276289',
    ciap2: ['A77'],
    cid10: ['A92.5'],
    cid11: ['1D47'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Arbovirose causada pelo virus Zika, transmitida pelo Aedes ou via sexual. Geralmente leve, mas associada a sindrome congenita do Zika e Guillain-Barre.',
      criteriosDiagnosticos: [
        'Exantema maculopapular pruriginoso',
        'Febre baixa ou ausente',
        'Conjuntivite nao purulenta',
        'Artralgia',
        'Confirmacao: RT-PCR (sangue ate 5o dia, urina ate 14o dia)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Repouso',
          'Hidratacao',
          'Antihistaminicos para prurido'
        ],
        farmacologico: [
          'Paracetamol ou dipirona',
          'Anti-histaminicos (loratadina)',
          'Evitar AAS ate exclusao de dengue',
          'NAO ha tratamento especifico'
        ]
      },
      metasTerapeuticas: [
        'Alivio sintomatico',
        'Monitorar gestantes infectadas',
        'Vigilancia de complicacoes neurologicas'
      ],
      examesIniciais: [
        'RT-PCR Zika (sangue e urina)',
        'Sorologia IgM (reacao cruzada com dengue)',
        'USG fetal detalhada se gestante'
      ],
      redFlags: [
        'Gestante infectada (risco de SCZ)',
        'Sintomas neurologicos (Guillain-Barre)',
        'Fraqueza muscular progressiva'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Epidemia 2015-2016 no Brasil; casos esporadicos atualmente',
        faixaEtaria: 'Todas as idades; maior preocupacao em gestantes',
        fatoresRisco: [
          'Gestacao (risco de SCZ)',
          'Area endemica',
          'Parceiro sexual infectado'
        ],
        citations: [{ refId: 'ms-zika-2022' }]
      },
      fisiopatologia: {
        texto: 'ZIKV tem neurotropismo, atravessa barreira placentaria e causa lesao do SNC fetal. Em adultos, pode desencadear Guillain-Barre por mimetismo molecular.',
        citations: [{ refId: 'who-zika-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Exantema maculopapular pruriginoso (inicio no 1o dia)',
          'Febre baixa ou ausente',
          'Conjuntivite bilateral',
          'Artralgia de pequenas articulacoes',
          'Mialgia',
          'Cefaleia'
        ],
        sinaisExameFisico: [
          'Exantema difuso',
          'Hiperemia conjuntival',
          'Adenopatia retroauricular'
        ],
        formasClinicas: [
          'Forma tipica (maioria leve)',
          'Sindrome congenita do Zika',
          'Guillain-Barre associado'
        ],
        citations: [{ refId: 'ms-zika-2022' }]
      },
      diagnostico: {
        criterios: [
          'Clinico-epidemiologico',
          'RT-PCR (sangue, urina)',
          'Sorologia (reacao cruzada com dengue)'
        ],
        diagnosticoDiferencial: [
          'Dengue',
          'Chikungunya',
          'Rubeola',
          'Sarampo',
          'Parvovirus B19'
        ],
        examesLaboratoriais: [
          'RT-PCR Zika',
          'Sorologia',
          'USG obstétrica se gestante'
        ],
        citations: [{ refId: 'ms-zika-2022' }]
      },
      tratamento: {
        objetivos: [
          'Alivio sintomatico',
          'Monitoramento de gestantes',
          'Deteccao de complicacoes'
        ],
        naoFarmacologico: {
          medidas: [
            'Repouso',
            'Hidratacao',
            'Protecao contra mosquitos'
          ],
          citations: [{ refId: 'ms-zika-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Sintomatico', medicamentos: ['Paracetamol', 'Loratadina'], observacoes: 'Nao ha antiviral especifico' }
          ],
          citations: [{ refId: 'who-zika-2023' }]
        },
        duracao: 'Autolimitada em 3-7 dias'
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno se piora; gestante: acompanhamento especial',
        metasTerapeuticas: [
          'Resolucao dos sintomas',
          'Monitoramento fetal em gestantes'
        ],
        criteriosEncaminhamento: [
          'Gestante: pre-natal de alto risco',
          'Sintomas neurologicos: neurologia'
        ],
        citations: [{ refId: 'ms-zika-2022' }]
      },
      prevencao: {
        primaria: [
          'Controle do Aedes',
          'Repelentes em gestantes',
          'Uso de preservativo (transmissao sexual)',
          'Adiar gestacao em areas de surto'
        ],
        secundaria: [
          'Acompanhamento de RN expostos'
        ],
        citations: [{ refId: 'who-zika-2023' }]
      }
    },
    protocolos: ['zika-gestante', 'sindrome-congenita-zika'],
    medicamentos: ['paracetamol', 'loratadina'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ms-zika-2022' }, { refId: 'who-zika-2023' }],
    lastUpdate: '2025-01'
  },

  // ============================================================================
  // 8. FEBRE AMARELA
  // ============================================================================
  {
    id: 'febre-amarela',
    titulo: 'Febre Amarela',
    sinonimos: ['FA', 'Yellow fever'],
    doid: 'DOID:9682',
    snomedCT: '16541001',
    meshId: 'D015004',
    umlsCui: 'C0043395',
    ciap2: ['A77'],
    cid10: ['A95', 'A95.0', 'A95.1'],
    cid11: ['1D40'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Doenca viral aguda causada por flavivirus, transmitida por Haemagogus/Sabethes (silvestre) ou Aedes aegypti (urbana). Pode evoluir para forma grave hepato-renal-hemorragica.',
      criteriosDiagnosticos: [
        'Febre de inicio subito em nao vacinado de area de risco',
        'Ictericia e/ou hemorragias',
        'Sinal de Faget (bradicardia relativa)',
        'Confirmacao: RT-PCR, IgM, isolamento viral'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'NAO HA TRATAMENTO ESPECIFICO',
          'Suporte clinico intensivo',
          'Isolamento (evitar Aedes)'
        ],
        farmacologico: [
          'Suporte: hidratacao IV, antiemeticos',
          'EVITAR AAS e AINEs',
          'Vitamina K se coagulopatia',
          'Dialise se IRA',
          'N-acetilcisteina (em estudo)'
        ]
      },
      metasTerapeuticas: [
        'Suporte de disfuncoes organicas',
        'Prevencao de hemorragias',
        'Manutencao da volemia'
      ],
      examesIniciais: [
        'Hemograma (leucopenia)',
        'Bilirrubinas',
        'Transaminases (muito elevadas)',
        'Coagulograma',
        'Funcao renal',
        'RT-PCR ou IgM'
      ],
      redFlags: [
        'Ictericia',
        'Hemorragias',
        'Oliguria',
        'Encefalopatia',
        'Hipotensao',
        'Transaminases >1000'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Surtos recentes 2016-2018: >2000 casos',
        mortalidade: 'Forma grave: 20-50%',
        faixaEtaria: 'Nao vacinados de qualquer idade',
        fatoresRisco: [
          'Nao vacinacao',
          'Area de risco',
          'Atividade em mata'
        ],
        citations: [{ refId: 'ms-fa-2022' }]
      },
      fisiopatologia: {
        texto: 'Flavivirus com tropismo hepatico. Causa necrose hepatica mediozonal (corpusculos de Councilman), CIVD e falencia multiorganica.',
        citations: [{ refId: 'who-yellowfever-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Febre alta subita',
          'Cefaleia',
          'Mialgia',
          'Ictericia',
          'Hemorragias',
          'Oliguria'
        ],
        sinaisExameFisico: [
          'Ictericia rubinica',
          'Sinal de Faget',
          'Hepatomegalia',
          'Petequias'
        ],
        formasClinicas: [
          'Forma leve',
          'Forma grave (hepato-nefro-hemorragica)'
        ],
        citations: [{ refId: 'ms-fa-2022' }]
      },
      diagnostico: {
        criterios: [
          'Clinica + epidemiologia',
          'RT-PCR, isolamento, IgM'
        ],
        diagnosticoDiferencial: [
          'Leptospirose',
          'Malaria grave',
          'Hepatites fulminantes'
        ],
        examesLaboratoriais: [
          'RT-PCR',
          'IgM',
          'Funcao hepatica',
          'Coagulograma'
        ],
        citations: [{ refId: 'ms-fa-2022' }]
      },
      tratamento: {
        objetivos: [
          'Suporte clinico',
          'Tratar disfuncoes'
        ],
        naoFarmacologico: {
          medidas: [
            'UTI se grave',
            'Dialise se IRA',
            'Isolamento'
          ],
          citations: [{ refId: 'ms-fa-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Suporte', medicamentos: ['Hidratacao', 'Vitamina K', 'PFC'], observacoes: 'Nao ha antiviral' }
          ],
          citations: [{ refId: 'who-yellowfever-2023' }]
        },
        duracao: 'Suporte ate resolucao'
      },
      acompanhamento: {
        frequenciaConsultas: 'Vigilancia continua',
        metasTerapeuticas: [
          'Resolucao de ictericia',
          'Recuperacao renal'
        ],
        criteriosEncaminhamento: [
          'Forma grave: UTI',
          'Notificacao imediata'
        ],
        citations: [{ refId: 'ms-fa-2022' }]
      },
      prevencao: {
        primaria: [
          'VACINACAO (medida mais eficaz)',
          '1 dose a partir de 9 meses',
          'Controle vetorial'
        ],
        secundaria: [
          'Vacinacao de bloqueio em surtos'
        ],
        citations: [{ refId: 'who-yellowfever-2023' }]
      }
    },
    protocolos: ['febre-amarela-manejo'],
    medicamentos: [],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ms-fa-2022' }, { refId: 'who-yellowfever-2023' }],
    lastUpdate: '2025-01'
  },

  // ============================================================================
  // 9. LEPTOSPIROSE
  // ============================================================================
  {
    id: 'leptospirose',
    titulo: 'Leptospirose',
    sinonimos: ['Doenca de Weil', 'Febre dos alagados', 'Ictericia hemorragica'],
    doid: 'DOID:2297',
    snomedCT: '77377001',
    meshId: 'D007919',
    umlsCui: 'C0023364',
    ciap2: ['A78'],
    cid10: ['A27', 'A27.0'],
    cid11: ['1B91'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Zoonose causada por Leptospira spp., transmitida pela urina de roedores. Forma anicterica e autolimitada (90%); forma icterohemorragica (Weil) tem alta mortalidade.',
      criteriosDiagnosticos: [
        'Febre subita + mialgia intensa (panturrilhas)',
        'Sufusao conjuntival',
        'Ictericia (forma grave)',
        'Historia de exposicao: enchentes, esgoto',
        'Confirmacao: MAT (soroconversao) ou PCR'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratacao',
          'Suporte ventilatorio se hemorragia pulmonar',
          'Dialise se IRA'
        ],
        farmacologico: [
          'FORMA LEVE: Doxiciclina 100mg 12/12h por 7 dias',
          'ou Amoxicilina 500mg 8/8h por 7 dias',
          'FORMA GRAVE: Penicilina G cristalina 1,5M UI 6/6h IV',
          'ou Ceftriaxona 1g IV 1x/dia',
          'Nao atrasar ATB!'
        ]
      },
      metasTerapeuticas: [
        'Controle da infeccao',
        'Suporte de disfuncoes',
        'Prevencao de hemorragia pulmonar'
      ],
      examesIniciais: [
        'Hemograma',
        'Bilirrubinas (direta elevada)',
        'Funcao renal (IRA nao oligurica)',
        'CPK',
        'RxT',
        'Sorologia MAT'
      ],
      redFlags: [
        'Ictericia',
        'IRA',
        'Hemorragia pulmonar (hemoptise)',
        'Hipoxemia',
        'Alteracao do sensorio',
        'Choque'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '3.000-4.000 casos/ano no Brasil',
        incidencia: 'Picos em periodos de chuva',
        mortalidade: 'Weil: 10-40%',
        faixaEtaria: 'Adultos jovens, trabalhadores de risco',
        fatoresRisco: [
          'Enchentes',
          'Trabalho em esgoto/saneamento',
          'Contato com roedores',
          'Agricultores'
        ],
        citations: [{ refId: 'ms-leptospirose-2022' }]
      },
      fisiopatologia: {
        texto: 'Leptospiras penetram mucosas/pele, disseminam-se hematogenicamente. Causam vasculite com dano em rins (nefrite intersticial), figado (colestase) e pulmoes (hemorragia alveolar).',
        citations: [{ refId: 'who-leptospirosis-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Febre alta subita',
          'Mialgia intensa (panturrilhas)',
          'Cefaleia',
          'Sufusao conjuntival',
          'Ictericia',
          'Hemoptise'
        ],
        sinaisExameFisico: [
          'Sufusao conjuntival',
          'Ictericia rubinica',
          'Hepatomegalia',
          'Petequias'
        ],
        formasClinicas: [
          'Forma anicterica (90%)',
          'Sindrome de Weil',
          'Sindrome hemorragica pulmonar'
        ],
        citations: [{ refId: 'ms-leptospirose-2022' }]
      },
      diagnostico: {
        criterios: [
          'Clinica + exposicao',
          'MAT com soroconversao',
          'PCR'
        ],
        diagnosticoDiferencial: [
          'Dengue grave',
          'Febre amarela',
          'Malaria',
          'Hantavirose'
        ],
        examesLaboratoriais: [
          'Hemograma',
          'Bilirrubinas',
          'Transaminases',
          'CPK',
          'MAT',
          'PCR'
        ],
        citations: [{ refId: 'ms-leptospirose-2022' }]
      },
      tratamento: {
        objetivos: [
          'Eliminar leptospira',
          'Suporte de orgaos'
        ],
        naoFarmacologico: {
          medidas: [
            'Hidratacao',
            'Dialise precoce',
            'Ventilacao protetora'
          ],
          citations: [{ refId: 'ms-leptospirose-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Ambulatorial', medicamentos: ['Doxiciclina 100mg 12/12h'], posologia: '7 dias' },
            { classe: 'Hospitalar', medicamentos: ['Penicilina G 1,5M UI 6/6h', 'Ceftriaxona 1g/dia'], posologia: '7 dias' }
          ],
          citations: [{ refId: 'who-leptospirosis-2023' }]
        },
        duracao: '7 dias'
      },
      acompanhamento: {
        frequenciaConsultas: 'Reavaliacao em 48-72h',
        metasTerapeuticas: [
          'Resolucao da febre em 24-48h',
          'Recuperacao renal'
        ],
        criteriosEncaminhamento: [
          'Forma grave: UTI'
        ],
        citations: [{ refId: 'ms-leptospirose-2022' }]
      },
      prevencao: {
        primaria: [
          'Evitar enchentes',
          'Botas e luvas',
          'Controle de roedores',
          'Saneamento'
        ],
        secundaria: [
          'Diagnostico e tratamento precoces'
        ],
        citations: [{ refId: 'ms-leptospirose-2022' }]
      }
    },
    protocolos: ['leptospirose-tratamento'],
    medicamentos: ['doxiciclina', 'penicilina-g', 'ceftriaxona'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ms-leptospirose-2022' }, { refId: 'who-leptospirosis-2023' }],
    lastUpdate: '2025-01'
  },

  // ============================================================================
  // 10. MALARIA
  // ============================================================================
  {
    id: 'malaria',
    titulo: 'Malaria',
    sinonimos: ['Paludismo', 'Impaludismo', 'Febre terca', 'Febre quarta'],
    doid: 'DOID:12365',
    snomedCT: '61462000',
    meshId: 'D008288',
    umlsCui: 'C0024530',
    ciap2: ['A73'],
    cid10: ['B50', 'B51', 'B52', 'B53', 'B54'],
    cid11: ['1F40'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Doenca infecciosa causada por Plasmodium (vivax, falciparum, malariae, ovale), transmitida por Anopheles. P. falciparum causa forma mais grave. Endemica na Amazonia.',
      criteriosDiagnosticos: [
        'Febre intermitente/ciclica',
        'Calafrios, sudorese profusa',
        'Cefaleia, mialgia',
        'Hepatoesplenomegalia',
        'Exposicao em area endemica',
        'Gota espessa ou teste rapido positivo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratacao',
          'Antitermicos',
          'Notificacao compulsoria'
        ],
        farmacologico: [
          'P. VIVAX: Cloroquina 25mg/kg em 3 dias + Primaquina 0,5mg/kg/dia 7 dias',
          'P. FALCIPARUM: Artemeter-Lumefantrina (Coartem) 6 doses em 3 dias',
          'MALARIA GRAVE: Artesunato IV 2,4mg/kg em 0h, 12h, 24h'
        ]
      },
      metasTerapeuticas: [
        'Eliminacao do parasita',
        'Prevencao de recaidas (hipnozoitos)',
        'Prevencao de complicacoes'
      ],
      examesIniciais: [
        'Gota espessa (padrao-ouro)',
        'Teste rapido',
        'Hemograma',
        'Funcao renal e hepatica',
        'Glicemia'
      ],
      redFlags: [
        'Malaria cerebral',
        'SDRA',
        'Ictericia intensa',
        'Hemoglobinuria',
        'Hipoglicemia',
        'Acidose',
        'Hiperparasitemia'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '140.000 casos/ano no Brasil (99% na Amazonia)',
        mortalidade: '<100/ano no Brasil',
        faixaEtaria: 'Todas as idades',
        fatoresRisco: [
          'Residencia/viagem para area endemica',
          'Falta de mosquiteiros',
          'Gestantes',
          'Primoinfeccao'
        ],
        citations: [{ refId: 'ms-malaria-2022' }]
      },
      fisiopatologia: {
        texto: 'Esporozoitos infectam hepatocitos, multiplicam-se e liberam merozoitos que invadem hemacias. Ciclo eritrocitico causa hemolise e sintomas. P. falciparum causa citoaderencia e obstrucao microvascular.',
        citations: [{ refId: 'who-malaria-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Febre alta (39-41C)',
          'Calafrios intensos',
          'Sudorese profusa',
          'Cefaleia',
          'Mialgia',
          'Nauseas'
        ],
        sinaisExameFisico: [
          'Esplenomegalia',
          'Hepatomegalia',
          'Palidez',
          'Ictericia leve'
        ],
        formasClinicas: [
          'Malaria nao complicada',
          'Malaria grave',
          'Malaria cerebral',
          'Malaria na gestacao'
        ],
        citations: [{ refId: 'ms-malaria-2022' }]
      },
      diagnostico: {
        criterios: [
          'Clinica + epidemiologia',
          'Gota espessa positiva'
        ],
        diagnosticoDiferencial: [
          'Dengue',
          'Febre tifoide',
          'Leptospirose',
          'Febre amarela'
        ],
        examesLaboratoriais: [
          'Gota espessa',
          'Teste rapido',
          'Hemograma',
          'Bilirrubinas',
          'Glicemia'
        ],
        citations: [{ refId: 'ms-malaria-2022' }]
      },
      tratamento: {
        objetivos: [
          'Eliminar parasita',
          'Prevenir complicacoes',
          'Evitar recaidas'
        ],
        naoFarmacologico: {
          medidas: [
            'Hidratacao',
            'Antitermicos',
            'Transfusao se Hb<5'
          ],
          citations: [{ refId: 'ms-malaria-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'P. vivax', medicamentos: ['Cloroquina + Primaquina'], posologia: 'Cloroquina 3 dias, Primaquina 7 dias', observacoes: 'Verificar G6PD' },
            { classe: 'P. falciparum', medicamentos: ['Artemeter-Lumefantrina'], posologia: '6 doses em 3 dias' }
          ],
          segundaLinha: [
            { classe: 'Malaria grave', medicamentos: ['Artesunato IV'], posologia: '2,4mg/kg em 0h, 12h, 24h' }
          ],
          citations: [{ refId: 'who-malaria-2023' }]
        },
        duracao: '3-7 dias'
      },
      acompanhamento: {
        frequenciaConsultas: 'Gota espessa em D3, D7, D14, D28',
        metasTerapeuticas: [
          'Negativacao da parasitemia',
          'Cura radical'
        ],
        criteriosEncaminhamento: [
          'Malaria grave: UTI',
          'Gestante',
          'Falha terapeutica'
        ],
        citations: [{ refId: 'ms-malaria-2022' }]
      },
      prevencao: {
        primaria: [
          'Mosquiteiros impregnados',
          'Repelentes',
          'Quimioprofilaxia para viajantes'
        ],
        secundaria: [
          'Diagnostico e tratamento precoces'
        ],
        citations: [{ refId: 'who-malaria-2023' }]
      }
    },
    protocolos: ['malaria-tratamento'],
    medicamentos: ['cloroquina', 'primaquina', 'artemeter-lumefantrina', 'artesunato'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ms-malaria-2022' }, { refId: 'who-malaria-2023' }],
    lastUpdate: '2025-01'
  },

  // ============================================================================
  // 11. FILARIOSE LINFATICA
  // ============================================================================
  {
    id: 'filariose-linfatica',
    titulo: 'Filariose Linfatica',
    sinonimos: ['Elefantiase', 'Bancroftose', 'Wuchereriose'],
    doid: 'DOID:6093',
    snomedCT: '32620000',
    meshId: 'D005368',
    umlsCui: 'C0013884',
    ciap2: ['A78'],
    cid10: ['B74.0', 'B74.1'],
    cid11: ['1F66.0'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Doenca causada por Wuchereria bancrofti, transmitida por Culex. Vermes adultos obstruem linfaticos causando linfedema cronico (elefantiase). Endemica em Recife/PE.',
      criteriosDiagnosticos: [
        'Linfedema de membros inferiores ou genitalia',
        'Quiluria (urina leitosa)',
        'Hidrocele',
        'Episodios de linfangite',
        'Confirmacao: pesquisa de microfilarias (coleta noturna) ou antigeno filarial'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Higiene rigorosa da pele',
          'Elevacao do membro',
          'Exercicios de drenagem linfatica',
          'Uso de meias compressivas'
        ],
        farmacologico: [
          'DIETILCARBAMAZINA (DEC) 6mg/kg/dia por 12 dias',
          'Alternativa: Ivermectina 200mcg/kg dose unica + Albendazol 400mg',
          'Doxiciclina 200mg/dia por 4-6 semanas (mata Wolbachia)',
          'ATB para infeccoes secundarias'
        ]
      },
      metasTerapeuticas: [
        'Eliminar microfilarias',
        'Matar vermes adultos',
        'Prevenir progressao do linfedema',
        'Tratar infeccoes secundarias'
      ],
      examesIniciais: [
        'Pesquisa de microfilarias (sangue noturno 22h-2h)',
        'Antigeno filarial circulante (ICT)',
        'USG de bolsa escrotal (sinal da danca)',
        'Hemograma (eosinofilia)'
      ],
      redFlags: [
        'Linfedema grau 3-7',
        'Adenolinfangite aguda recorrente',
        'Quiluria macia',
        'Infeccao secundaria grave'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Foco ativo: Regiao Metropolitana de Recife',
        faixaEtaria: 'Todas as idades em areas endemicas',
        fatoresRisco: [
          'Residencia em area endemica',
          'Exposicao ao Culex',
          'Falta de saneamento'
        ],
        citations: [{ refId: 'ms-filariose-2022' }]
      },
      fisiopatologia: {
        texto: 'Larvas L3 inoculadas pelo mosquito migram aos linfaticos onde se desenvolvem em adultos. Vermes causam obstrucao linfatica e resposta inflamatoria. Wolbachia (endossimbionte) contribui para inflamacao. Linfedema cronico leva a fibrose e elefantiase.',
        citations: [{ refId: 'who-lf-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Linfedema de MMII',
          'Hidrocele',
          'Quiluria',
          'Adenolinfangite aguda (febre, dor, eritema)',
          'Elefantiase (estagio avancado)'
        ],
        sinaisExameFisico: [
          'Edema de membros com sinal de Stemmer',
          'Hidrocele',
          'Adenopatia inguinal',
          'Alteracoes cutaneas (hiperqueratose, verrucosidades)'
        ],
        formasClinicas: [
          'Microfilaremia assintomatica',
          'Linfedema (graus 1-7)',
          'Manifestacoes agudas (adenolinfangite)',
          'Quiluria'
        ],
        citations: [{ refId: 'ms-filariose-2022' }]
      },
      diagnostico: {
        criterios: [
          'Clinico + epidemiologico',
          'Microfilarias no sangue periferico (noturno)',
          'Antigeno filarial'
        ],
        diagnosticoDiferencial: [
          'Linfedema de outras causas',
          'ICC',
          'Insuficiencia venosa cronica',
          'Hidrocele idiopatica'
        ],
        examesLaboratoriais: [
          'Pesquisa de microfilarias',
          'Teste de antigeno',
          'PCR',
          'Hemograma'
        ],
        examesImagem: [
          'USG bolsa escrotal',
          'Linfocintilografia'
        ],
        citations: [{ refId: 'ms-filariose-2022' }]
      },
      tratamento: {
        objetivos: [
          'Eliminar parasitas',
          'Controlar linfedema',
          'Prevenir infeccoes'
        ],
        naoFarmacologico: {
          medidas: [
            'Higiene da pele',
            'Elevacao do membro',
            'Fisioterapia',
            'Cirurgia para hidrocele'
          ],
          citations: [{ refId: 'ms-filariose-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Microfilaricida', medicamentos: ['DEC 6mg/kg/dia'], posologia: '12 dias' }
          ],
          segundaLinha: [
            { classe: 'Tratamento em massa', medicamentos: ['Ivermectina + Albendazol'], posologia: 'Dose unica anual' },
            { classe: 'Anti-Wolbachia', medicamentos: ['Doxiciclina 200mg/dia'], posologia: '4-6 semanas' }
          ],
          citations: [{ refId: 'who-lf-2023' }]
        },
        duracao: 'DEC: 12 dias; Doxiciclina: 4-6 semanas'
      },
      acompanhamento: {
        frequenciaConsultas: 'Trimestral no primeiro ano',
        metasTerapeuticas: [
          'Negativacao de microfilaremia',
          'Estabilizacao do linfedema'
        ],
        criteriosEncaminhamento: [
          'Linfedema avancado: fisioterapia/cirurgia',
          'Hidrocele volumosa: urologia'
        ],
        citations: [{ refId: 'ms-filariose-2022' }]
      },
      prevencao: {
        primaria: [
          'Controle do Culex',
          'Tratamento em massa',
          'Saneamento basico'
        ],
        secundaria: [
          'Tratamento precoce',
          'Cuidados com linfedema'
        ],
        citations: [{ refId: 'who-lf-2023' }]
      }
    },
    protocolos: ['filariose-tratamento'],
    medicamentos: ['dietilcarbamazina', 'ivermectina', 'albendazol', 'doxiciclina'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ms-filariose-2022' }, { refId: 'who-lf-2023' }],
    lastUpdate: '2025-01'
  },

  // ============================================================================
  // 12. HANSENIASE
  // ============================================================================
  {
    id: 'hanseniase',
    titulo: 'Hanseniase',
    sinonimos: ['Lepra', 'Mal de Hansen', 'Morfeia'],
    doid: 'DOID:1024',
    snomedCT: '81004002',
    meshId: 'D007918',
    umlsCui: 'C0023343',
    ciap2: ['S76'],
    cid10: ['A30', 'A30.0', 'A30.1', 'A30.2', 'A30.3', 'A30.5'],
    cid11: ['1B21'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Doenca infecciosa cronica causada pelo Mycobacterium leprae, afetando pele e nervos perifericos. Classificada em paucibacilar (PB) ou multibacilar (MB). Brasil: 2o no mundo em casos.',
      criteriosDiagnosticos: [
        'Lesao de pele com alteracao de sensibilidade',
        'Espessamento de nervo periferico',
        'Baciloscopia positiva (em MB)',
        'SINAIS CARDINAIS (>=1): lesao com anestesia, nervo espessado, baciloscopia +',
        'Classificacao: PB (<=5 lesoes) vs MB (>5 lesoes ou baciloscopia +)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Educacao sobre a doenca',
          'Cuidados com pes e maos',
          'Prevencao de incapacidades',
          'Exame de contatos'
        ],
        farmacologico: [
          'PAUCIBACILAR: Rifampicina 600mg/mes + Dapsona 100mg/dia - 6 doses',
          'MULTIBACILAR: Rifampicina 600mg/mes + Clofazimina 300mg/mes + 50mg/dia + Dapsona 100mg/dia - 12 doses',
          'REACAO TIPO 1: Prednisona 1-2mg/kg/dia',
          'REACAO TIPO 2: Talidomida ou Prednisona'
        ]
      },
      metasTerapeuticas: [
        'Cura bacteriologica',
        'Prevencao de incapacidades',
        'Interrupcao da transmissao'
      ],
      examesIniciais: [
        'Exame dermatoneurologico',
        'Teste de sensibilidade',
        'Baciloscopia',
        'Avaliacao de grau de incapacidade (0, I, II)',
        'Biopsia se duvida'
      ],
      redFlags: [
        'Reacao tipo 1 (reversa): eritema e edema de lesoes, neurite',
        'Reacao tipo 2 (ENH): febre, nodulos, neurite, irite',
        'Neurite aguda',
        'Mao em garra, pe caido',
        'Ulceras troficas'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '~28.000 casos novos/ano no Brasil (2o no mundo)',
        faixaEtaria: 'Todas as idades, pico em adultos',
        fatoresRisco: [
          'Contato domiciliar com MB nao tratado',
          'Condicoes socioeconomicas precarias',
          'Predisposicao genetica'
        ],
        citations: [{ refId: 'ms-hanseniase-2022' }]
      },
      fisiopatologia: {
        texto: 'M. leprae tem tropismo por macrofagos e celulas de Schwann. Resposta imune determina forma clinica: Th1 (paucibacilar) vs Th2 (multibacilar). Destruicao neural causa anestesia e incapacidades.',
        citations: [{ refId: 'who-leprosy-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Manchas hipocromicas ou eritematosas',
          'Perda de sensibilidade nas lesoes',
          'Formigamento, dormencia',
          'Fraqueza muscular',
          'Espessamento de nervos'
        ],
        sinaisExameFisico: [
          'Lesoes anestesicas',
          'Nervos espessados',
          'Madarose',
          'Atrofia muscular',
          'Mao em garra'
        ],
        formasClinicas: [
          'Indeterminada',
          'Tuberculoide (PB)',
          'Dimorfa',
          'Virchowiana (MB)'
        ],
        citations: [{ refId: 'ms-hanseniase-2022' }]
      },
      diagnostico: {
        criterios: [
          'Sinais cardinais',
          'Baciloscopia',
          'Histopatologia'
        ],
        diagnosticoDiferencial: [
          'Pitiríase versicolor',
          'Vitiligo',
          'Dermatofitoses',
          'Sifilis'
        ],
        examesLaboratoriais: [
          'Baciloscopia',
          'Biopsia',
          'Teste de Mitsuda'
        ],
        citations: [{ refId: 'ms-hanseniase-2022' }]
      },
      tratamento: {
        objetivos: [
          'Cura da infeccao',
          'Prevencao de incapacidades',
          'Vigilancia de contatos'
        ],
        naoFarmacologico: {
          medidas: [
            'Autocuidado',
            'Fisioterapia',
            'Cirurgia reparadora'
          ],
          citations: [{ refId: 'ms-hanseniase-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'PQT-PB', medicamentos: ['Rifampicina 600mg/mes', 'Dapsona 100mg/dia'], posologia: '6 doses em ate 9 meses' },
            { classe: 'PQT-MB', medicamentos: ['Rifampicina', 'Clofazimina', 'Dapsona'], posologia: '12 doses em ate 18 meses' }
          ],
          situacoesEspeciais: [
            { situacao: 'Reacao tipo 1', conduta: 'Prednisona 1-2mg/kg/dia' },
            { situacao: 'Reacao tipo 2', conduta: 'Talidomida (nao em mulheres ferteis) ou Prednisona' }
          ],
          citations: [{ refId: 'who-leprosy-2023' }]
        },
        duracao: 'PB: 6 meses; MB: 12 meses'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal durante tratamento; semestral por 5 anos',
        metasTerapeuticas: [
          'Completar esquema',
          'Manter grau de incapacidade',
          'Examinar contatos'
        ],
        criteriosEncaminhamento: [
          'Reacoes graves: referencia',
          'Incapacidades: fisioterapia/cirurgia'
        ],
        citations: [{ refId: 'ms-hanseniase-2022' }]
      },
      prevencao: {
        primaria: [
          'Exame de contatos',
          'BCG em contatos',
          'Educacao em saude'
        ],
        secundaria: [
          'Diagnostico precoce',
          'Prevencao de incapacidades'
        ],
        citations: [{ refId: 'who-leprosy-2023' }]
      }
    },
    protocolos: ['hanseniase-tratamento', 'reacao-hanseniase'],
    medicamentos: ['rifampicina', 'dapsona', 'clofazimina', 'prednisona', 'talidomida'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ms-hanseniase-2022' }, { refId: 'who-leprosy-2023' }],
    lastUpdate: '2025-01'
  }
];
