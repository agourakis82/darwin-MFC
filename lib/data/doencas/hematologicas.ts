/**
 * DOENÇAS HEMATOLÓGICAS - DARWIN-MFC
 * ===================================
 * 
 * Ontologias integradas:
 * - DOID (Disease Ontology)
 * - SNOMED-CT (Systematized Nomenclature of Medicine)
 * - MeSH (Medical Subject Headings)
 * - UMLS CUI (Unified Medical Language System)
 */

import { Doenca } from '../../types/doenca';

export const doencasHematologicas: Doenca[] = [
  {
    id: 'anemia-ferropriva',
    titulo: 'Anemia Ferropriva',
    sinonimos: ['Anemia por deficiência de ferro', 'Anemia ferropênica', 'Anemia hipocrômica microcítica'],
    doid: 'DOID:11758',
    snomedCT: '35240004',
    meshId: 'D018798',
    umlsCui: 'C0162316',
    ciap2: ['B80'],
    cid10: ['D50', 'D50.0', 'D50.9'],
    cid11: ['3A00'],
    categoria: 'hematologico',
    quickView: {
      definicao: 'Anemia causada por deficiência de ferro, o tipo mais comum de anemia no mundo. Caracterizada por hemácias microcíticas e hipocrômicas. Sempre investigar a causa subjacente (perda sanguínea, má absorção, demanda aumentada).',
      criteriosDiagnosticos: [
        'Hemoglobina <13 g/dL (homem) ou <12 g/dL (mulher)',
        'VCM <80 fL (microcitose)',
        'HCM <27 pg (hipocromia)',
        'RDW aumentado (anisocitose)',
        'Ferritina sérica <30 ng/mL (ou <100 se inflamação)',
        'Ferro sérico baixo + TIBC elevado + Saturação de transferrina <20%'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Identificar e tratar causa subjacente',
          'Orientação dietética (carnes vermelhas, vísceras, leguminosas)',
          'Facilitar absorção: tomar com vitamina C, evitar chá/café junto'
        ],
        farmacologico: [
          'Sulfato ferroso 200mg (40mg Fe elementar) 2-3x/dia',
          'Tomar em jejum ou com vitamina C',
          'Alternativas: Ferro quelado, Ferro polimaltosado (menor intolerância GI)',
          'Duração: 3-6 meses após normalização da Hb (repor estoques)',
          '',
          'Ferro IV se: intolerância oral, má absorção, necessidade de reposição rápida'
        ]
      },
      metasTerapeuticas: [
        'Elevação de Hb 1-2 g/dL em 2-4 semanas',
        'Normalização de Hb em 2-3 meses',
        'Ferritina >100 ng/mL (reposição de estoques)',
        'Resolução dos sintomas'
      ],
      examesIniciais: [
        'Hemograma completo com índices hematimétricos',
        'Ferritina sérica (melhor marcador de estoque)',
        'Ferro sérico, TIBC, saturação de transferrina',
        'Reticulócitos',
        'Investigação da causa: EDA/Colonoscopia se >50 anos ou homem/mulher pós-menopausa'
      ],
      redFlags: [
        'Anemia grave (Hb <7 g/dL) com sintomas',
        'Sangramento ativo ou volumoso',
        'Suspeita de malignidade GI',
        'Refratário ao tratamento oral',
        'Perda de peso inexplicada'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '30% da população mundial (anemia mais comum)',
        incidencia: 'Muito alta em países em desenvolvimento',
        faixaEtaria: 'Mais comum em mulheres em idade fértil, crianças, idosos',
        fatoresRisco: [
          'Sangramento menstrual intenso (menorragia)',
          'Gravidez e lactação',
          'Dieta pobre em ferro (vegetarianos mal orientados)',
          'Doenças GI (úlcera, câncer, doença celíaca)',
          'Doadores de sangue frequentes',
          'Uso de AINEs',
          'Cirurgia bariátrica'
        ],
        citations: [{ refId: 'who-anemia-2023' }]
      },
      fisiopatologia: {
        texto: 'O ferro é essencial para síntese de hemoglobina. A deficiência progressiva depleta primeiro os estoques (ferritina), depois o ferro circulante, e por fim a eritropoiese fica comprometida, resultando em hemácias microcíticas e hipocrômicas.',
        citations: [{ refId: 'who-anemia-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Fadiga e fraqueza',
          'Dispneia aos esforços',
          'Palidez cutaneomucosa',
          'Cefaleia',
          'Tontura',
          'Pica (desejo de comer gelo, terra)',
          'Síndrome das pernas inquietas'
        ],
        sinaisExameFisico: [
          'Palidez de mucosas (conjuntival)',
          'Taquicardia',
          'Queilite angular',
          'Glossite atrófica',
          'Coiloníquia (unhas em colher)',
          'Sopro sistólico de ejeção (anemia grave)'
        ],
        formasClinicas: [
          'Anemia leve (Hb 10-12 em mulheres, 10-13 em homens)',
          'Anemia moderada (Hb 7-10 g/dL)',
          'Anemia grave (Hb <7 g/dL)',
          'Síndrome de Plummer-Vinson (disfagia + anemia + glossite)'
        ],
        citations: [{ refId: 'who-anemia-2023' }]
      },
      diagnostico: {
        criterios: [
          'Hemograma: anemia microcítica hipocrômica',
          'Ferritina baixa (<30 ng/mL, <100 se inflamação)',
          'Saturação de transferrina <20%'
        ],
        diagnosticoDiferencial: [
          'Talassemia (VCM muito baixo, RDW normal, eletroforese)',
          'Anemia de doença crônica (ferritina normal/alta)',
          'Anemia sideroblástica',
          'Intoxicação por chumbo'
        ],
        examesLaboratoriais: [
          'Hemograma completo',
          'Ferritina, ferro sérico, TIBC, saturação de transferrina',
          'Reticulócitos (resposta ao tratamento)',
          'EDA/Colonoscopia se indicado',
          'Pesquisa de sangue oculto nas fezes'
        ],
        citations: [{ refId: 'who-anemia-2023' }]
      },
      tratamento: {
        objetivos: [
          'Corrigir anemia',
          'Repor estoques de ferro',
          'Tratar causa subjacente'
        ],
        naoFarmacologico: {
          medidas: [
            'Orientação dietética',
            'Identificar e corrigir causa (ex: tratar menorragia, investigar sangramento GI)'
          ],
          citations: [{ refId: 'who-anemia-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Sulfato ferroso',
              medicamentos: ['Sulfato ferroso'],
              posologia: '200mg (40mg Fe elementar) 2-3x/dia em jejum. Resposta em 1-2 semanas (reticulócitos), Hb em 3-4 semanas.'
            }
          ],
          segundaLinha: [
            {
              classe: 'Ferro polimaltosado ou quelado',
              medicamentos: ['Ferro polimaltosado', 'Ferro quelato glicinato'],
              posologia: 'Melhor tolerância GI. Pode ser tomado com alimentos. Custo maior.'
            },
            {
              classe: 'Ferro IV',
              medicamentos: ['Sacarato de hidróxido de ferro', 'Carboximaltose férrica'],
              posologia: 'Se intolerância oral, má absorção, DRC, necessidade de reposição rápida.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Gestante',
              conduta: 'Ferro profilático 40-60mg/dia. Se anemia: doses terapêuticas. Ferro IV se intolerância.'
            },
            {
              situacao: 'Anemia grave sintomática',
              conduta: 'Considerar transfusão se Hb <7 g/dL ou sintomas intensos.'
            }
          ],
          citations: [{ refId: 'who-anemia-2023' }]
        },
        duracao: '3-6 meses após normalização de Hb para repor estoques.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno em 4 semanas para checar resposta',
        examesControle: [
          'Reticulócitos em 1-2 semanas (pico)',
          'Hemograma em 4 semanas',
          'Ferritina após 2-3 meses de tratamento'
        ],
        metasTerapeuticas: [
          'Hb normal',
          'Ferritina >100 ng/mL'
        ],
        criteriosEncaminhamento: [
          'Suspeita de malignidade GI',
          'Anemia refratária',
          'Necessidade de ferro IV',
          'Anemia grave sintomática'
        ],
        citations: [{ refId: 'who-anemia-2023' }]
      },
      prevencao: {
        primaria: [
          'Suplementação em gestantes',
          'Fortificação de alimentos'
        ],
        secundaria: [
          'Tratamento da causa',
          'Suplementação contínua se perda crônica'
        ],
        citations: []
      },
    },
    protocolos: ['anemia-investigacao'],
    medicamentos: ['sulfato-ferroso', 'ferro-polimaltosado', 'acido-folico'],
    calculadoras: [],
    rastreamentos: ['rastreamento-anemia-gestante'],
    citations: [{ refId: 'who-anemia-2023' }],
    lastUpdate: '2024-12',
    tags: ['anemia', 'ferro', 'ferritina', 'microcítica', 'deficiência'],
  },
  {
    id: 'anemia-megaloblastica',
    titulo: 'Anemia Megaloblástica',
    sinonimos: ['Anemia por deficiência de B12', 'Anemia perniciosa', 'Anemia por deficiência de folato'],
    doid: 'DOID:13382',
    snomedCT: '234347009',
    meshId: 'D000749',
    umlsCui: 'C0002888',
    ciap2: ['B81'],
    cid10: ['D51', 'D52'],
    cid11: ['3A01'],
    categoria: 'hematologico',
    quickView: {
      definicao: 'Anemia macrocítica causada por síntese deficiente de DNA, geralmente por deficiência de vitamina B12 ou ácido fólico. Caracterizada por megaloblastos na medula óssea e neutrófilos hipersegmentados no sangue periférico.',
      criteriosDiagnosticos: [
        'Anemia macrocítica: VCM >100 fL (pode chegar a 130-140 fL)',
        'Neutrófilos hipersegmentados (>5 lobos)',
        'Reticulócitos diminuídos (anemia hipoproliferativa)',
        'LDH muito elevado + bilirrubina indireta elevada (eritropoiese ineficaz)',
        'B12 <200 pg/mL ou Ácido fólico <3 ng/mL',
        'Homocisteína elevada (B12 e folato) + Ácido metilmalônico elevado (só B12)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Identificar e tratar causa',
          'Orientação dietética (B12: carnes, ovos, laticínios; Folato: vegetais verdes)',
          'Cessar álcool se etilismo'
        ],
        farmacologico: [
          'DEFICIÊNCIA DE B12:',
          'Cianocobalamina 1000 mcg IM/dia por 7 dias, depois 1x/semana por 4 semanas, depois 1x/mês indefinidamente',
          'Alternativa oral: B12 1000-2000 mcg/dia (se absorção intacta)',
          '',
          'DEFICIÊNCIA DE FOLATO:',
          'Ácido fólico 1-5 mg/dia VO por 1-4 meses',
          '',
          'SEMPRE suplementar folato junto com B12 se não souber qual é a deficiência!'
        ]
      },
      metasTerapeuticas: [
        'Resposta reticulocitária em 3-5 dias',
        'Correção de Hb em 6-8 semanas',
        'Normalização de B12/folato',
        'Melhora de sintomas neurológicos (pode ser parcial ou não reverter)'
      ],
      examesIniciais: [
        'Hemograma com VCM e RDW',
        'Esfregaço de sangue periférico (macroovalócitos, hipersegmentação)',
        'Vitamina B12 sérica',
        'Ácido fólico sérico/eritrocitário',
        'LDH, bilirrubina indireta',
        'Homocisteína e ácido metilmalônico (se B12 limítrofe)',
        'Anticorpos anti-fator intrínseco e anti-células parietais (anemia perniciosa)',
        'EDA se anemia perniciosa (risco de carcinoma gástrico)'
      ],
      redFlags: [
        'Sintomas neurológicos graves (degeneração combinada subaguda)',
        'Pancitopenia',
        'Anemia grave (Hb <7 g/dL)',
        'Tratar com folato sem B12 pode mascarar e piorar sintomas neurológicos da deficiência de B12!'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-2% em idosos (deficiência de B12)',
        incidencia: 'Aumenta com idade',
        faixaEtaria: 'Mais comum em idosos (B12), gestantes e etilistas (folato)',
        fatoresRisco: [
          'Anemia perniciosa (autoimune)',
          'Gastrectomia ou cirurgia bariátrica',
          'Doença de Crohn, doença celíaca',
          'Dieta vegetariana/vegana estrita (B12)',
          'Etilismo crônico (folato)',
          'Uso de metotrexato, fenitoína, sulfassalazina'
        ],
        citations: [{ refId: 'bsh-b12-2014' }]
      },
      fisiopatologia: {
        texto: 'B12 e folato são cofatores na síntese de timidina para o DNA. A deficiência causa assincronia núcleo-citoplasma (megaloblastose), eritropoiese ineficaz com hemólise intramedular, e anemia macrocítica. B12 também é essencial para mielinização (sintomas neurológicos).',
        citations: [{ refId: 'bsh-b12-2014' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Fadiga e fraqueza progressivas',
          'Palidez com icterícia leve (lemon yellow)',
          'Glossite atrófica (língua lisa, vermelha)',
          'Queilite angular',
          'Sintomas neurológicos (B12): parestesias, ataxia, fraqueza'
        ],
        sinaisExameFisico: [
          'Palidez + icterícia leve',
          'Glossite atrófica',
          'Esplenomegalia leve',
          'Alteração de sensibilidade vibratória e proprioceptiva (B12)',
          'Ataxia de marcha (degeneração combinada subaguda)'
        ],
        formasClinicas: [
          'Anemia perniciosa (anticorpos anti-FI, anti-células parietais)',
          'Deficiência nutricional de B12 (veganos)',
          'Deficiência por má absorção (doença ileal, pós-gastrectomia)',
          'Deficiência de folato (etilismo, gestação, hemólise crônica)'
        ],
        citations: [{ refId: 'bsh-b12-2014' }]
      },
      diagnostico: {
        criterios: [
          'VCM >100 fL + neutrófilos hipersegmentados',
          'B12 ou folato baixos',
          'LDH muito elevado'
        ],
        diagnosticoDiferencial: [
          'Mielodisplasia',
          'Macrocitose do etilismo ou hepatopatia',
          'Hipotireoidismo',
          'Reticulocitose (anemia hemolítica)',
          'Uso de medicamentos (AZT, metotrexato)'
        ],
        examesLaboratoriais: [
          'Hemograma com esfregaço',
          'B12, folato',
          'Homocisteína, ácido metilmalônico',
          'LDH, bilirrubina indireta',
          'Anticorpos (anemia perniciosa)',
          'Mielograma se dúvida (megaloblastos)'
        ],
        citations: [{ refId: 'bsh-b12-2014' }]
      },
      tratamento: {
        objetivos: [
          'Corrigir anemia',
          'Repor estoques',
          'Prevenir/reverter sintomas neurológicos',
          'Tratar causa'
        ],
        naoFarmacologico: {
          medidas: [
            'Orientação dietética',
            'Cessar álcool',
            'Tratar doença GI subjacente'
          ],
          citations: [{ refId: 'bsh-b12-2014' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Vitamina B12 parenteral',
              medicamentos: ['Cianocobalamina', 'Hidroxocobalamina'],
              posologia: '1000 mcg IM diário x7 dias, depois semanal x4, depois mensal (para sempre se anemia perniciosa).'
            },
            {
              classe: 'Ácido fólico',
              medicamentos: ['Ácido fólico'],
              posologia: '1-5 mg/dia VO por 1-4 meses. Manter se hemólise crônica ou demanda aumentada.'
            }
          ],
          segundaLinha: [
            {
              classe: 'B12 oral alta dose',
              medicamentos: ['Cianocobalamina oral'],
              posologia: '1000-2000 mcg/dia. Alternativa à via IM se absorção por difusão passiva (não depende de FI).'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Sintomas neurológicos',
              conduta: 'B12 IM de urgência. Resposta pode ser parcial. Folato NÃO trata neurológico da deficiência de B12!'
            },
            {
              situacao: 'Anemia grave',
              conduta: 'Transfusão cautelosa (risco de sobrecarga). Suplementar potássio (captação celular durante correção).'
            }
          ],
          citations: [{ refId: 'bsh-b12-2014' }]
        },
        duracao: 'B12 em anemia perniciosa: para sempre. Folato: conforme causa.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno em 1-2 semanas (reticulócitos), depois mensal',
        examesControle: [
          'Reticulócitos em 5-7 dias (pico)',
          'Hemograma em 4-8 semanas',
          'B12/folato após 2-3 meses'
        ],
        metasTerapeuticas: [
          'Hb normal',
          'Níveis de B12/folato normais',
          'Estabilização de sintomas neurológicos'
        ],
        criteriosEncaminhamento: [
          'Sintomas neurológicos',
          'Anemia perniciosa (EDA para rastrear câncer gástrico)',
          'Não resposta ao tratamento',
          'Pancitopenia'
        ],
        citations: [{ refId: 'bsh-b12-2014' }]
      },
      prevencao: {
        primaria: [
          'Suplementação em veganos estritos',
          'B12 profilática pós-gastrectomia'
        ],
        secundaria: [
          'B12 vitalícia em anemia perniciosa',
          'Rastreio de câncer gástrico'
        ],
        citations: []
      },
    },
    protocolos: [],
    medicamentos: ['cianocobalamina', 'acido-folico', 'hidroxocobalamina'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'bsh-b12-2014' }],
    lastUpdate: '2024-12',
    tags: ['anemia', 'b12', 'folato', 'megaloblástica', 'perniciosa'],
  },
  {
    id: 'trombocitopenia',
    titulo: 'Trombocitopenia',
    sinonimos: ['Plaquetopenia', 'PTI', 'Púrpura trombocitopênica imune'],
    doid: 'DOID:1588',
    snomedCT: '302215000',
    meshId: 'D013921',
    umlsCui: 'C0040034',
    ciap2: ['B83'],
    cid10: ['D69.3', 'D69.6'],
    cid11: ['3B64'],
    categoria: 'hematologico',
    quickView: {
      definicao: 'Redução da contagem de plaquetas <150.000/µL. Pode ser leve e assintomática ou grave com sangramento. Causas: destruição imune (PTI), consumo (CIVD, PTT), sequestro esplênico, produção diminuída.',
      criteriosDiagnosticos: [
        'Plaquetas <150.000/µL (trombocitopenia)',
        'Leve: 100.000-150.000/µL',
        'Moderada: 50.000-100.000/µL',
        'Grave: <50.000/µL',
        'Muito grave: <20.000/µL (risco de sangramento espontâneo)',
        '',
        'PTI: Diagnóstico de exclusão (plaquetopenia isolada sem causa identificada)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar medicamentos que afetam plaquetas (AAS, AINEs)',
          'Evitar atividades com risco de trauma',
          'Evitar procedimentos invasivos se plaquetas <50.000'
        ],
        farmacologico: [
          'PTI AGUDA (adulto com sangramento ou <20.000-30.000):',
          'Prednisona 1-2 mg/kg/dia por 2-4 semanas, depois desmame',
          'OU Dexametasona 40mg/dia por 4 dias (ciclos)',
          'Imunoglobulina IV 1g/kg x1-2 dias (resposta rápida)',
          '',
          'PTI CRÔNICA REFRATÁRIA:',
          'Agonistas de trombopoietina (Eltrombopag, Romiplostim)',
          'Rituximabe',
          'Esplenectomia'
        ]
      },
      metasTerapeuticas: [
        'Plaquetas >30.000/µL (seguro na maioria)',
        'Plaquetas >50.000/µL para procedimentos',
        'Plaquetas >100.000/µL para grandes cirurgias',
        'Ausência de sangramento'
      ],
      examesIniciais: [
        'Hemograma completo (confirmar plaquetopenia isolada)',
        'Esfregaço de sangue periférico (descartar pseudotrombocitopenia por aglutinação)',
        'Coagulação (TP, TTPa)',
        'Função hepática e renal',
        'Sorologias: HIV, HCV, HBV',
        'TSH',
        'Anticorpos antiplaquetários (não sensíveis)',
        'Mielograma se suspeita de causa central'
      ],
      redFlags: [
        'Sangramento ativo significativo',
        'Plaquetas <10.000/µL (risco de sangramento intracraniano)',
        'Anemia hemolítica microangiopática (esquizócitos): PTT/SHU - emergência!',
        'Pancitopenia (doença medular)',
        'Febre + plaquetopenia: sepse, dengue, PTT',
        'Gestante com plaquetopenia (pré-eclâmpsia, HELLP)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'PTI: 3-4/100.000 adultos',
        incidencia: 'PTI mais comum em crianças (pós-viral)',
        faixaEtaria: 'Crianças: PTI aguda. Adultos: PTI crônica',
        fatoresRisco: [
          'Infecções virais recentes (crianças)',
          'Doenças autoimunes (LES)',
          'HIV, HCV',
          'Medicamentos (heparina, quinina, sulfas)',
          'Gestação',
          'Hepatopatia (sequestro esplênico)'
        ],
        citations: [{ refId: 'ash-itp-2019' }]
      },
      fisiopatologia: {
        texto: 'PTI: Autoanticorpos (IgG) contra glicoproteínas plaquetárias (GPIIb/IIIa, GPIb/IX) causam destruição de plaquetas pelo sistema reticuloendotelial (baço). Também há inibição da megacariopoiese. Outras causas: consumo (CIVD, PTT), sequestro esplênico, falência medular.',
        citations: [{ refId: 'ash-itp-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Frequentemente assintomática (achado incidental)',
          'Petéquias e equimoses',
          'Epistaxe',
          'Gengivorragia',
          'Menorragia',
          'Sangramento GI ou urinário (grave)'
        ],
        sinaisExameFisico: [
          'Petéquias (principalmente em MMII)',
          'Equimoses',
          'Púrpura',
          'Sangramento mucoso',
          'AUSÊNCIA de esplenomegalia (na PTI típica)'
        ],
        formasClinicas: [
          'PTI primária (idiopática)',
          'PTI secundária (HIV, HCV, LES, medicamentos)',
          'PTI aguda (crianças, pós-viral)',
          'PTI crônica (>12 meses)'
        ],
        citations: [{ refId: 'ash-itp-2019' }]
      },
      diagnostico: {
        criterios: [
          'Plaquetopenia isolada',
          'Exclusão de outras causas',
          'Esfregaço sem esquizócitos ou blastos'
        ],
        diagnosticoDiferencial: [
          'Pseudotrombocitopenia (aglutinação em EDTA)',
          'PTT/SHU (anemia hemolítica microangiopática)',
          'CIVD',
          'Hiperesplenismo',
          'Leucemia, mielodisplasia',
          'Medicamentos (heparina)',
          'Dengue'
        ],
        examesLaboratoriais: [
          'Hemograma + esfregaço',
          'TP, TTPa, fibrinogênio',
          'HIV, HCV, HBV',
          'FAN, complemento (se suspeita de LES)',
          'Mielograma (se atípico)',
          'Coombs direto (se anemia)'
        ],
        citations: [{ refId: 'ash-itp-2019' }]
      },
      tratamento: {
        objetivos: [
          'Prevenir sangramento',
          'Manter plaquetas em nível seguro',
          'Minimizar toxicidade do tratamento'
        ],
        naoFarmacologico: {
          medidas: [
            'Evitar trauma',
            'Suspender medicamentos antiagregantes',
            'Watchful waiting se assintomático e plaquetas >30.000'
          ],
          citations: [{ refId: 'ash-itp-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Corticoide',
              medicamentos: ['Prednisona', 'Dexametasona'],
              posologia: 'Prednisona 1-2mg/kg/dia por 2-4 semanas, desmame. OU Dexametasona 40mg/dia x4 dias.'
            },
            {
              classe: 'Imunoglobulina IV (resposta rápida)',
              medicamentos: ['IVIg'],
              posologia: '1g/kg x1-2 dias. Resposta em 24-48h. Temporária.'
            }
          ],
          segundaLinha: [
            {
              classe: 'Agonista de trombopoietina',
              medicamentos: ['Eltrombopag', 'Romiplostim'],
              posologia: 'Eltrombopag 50mg/dia VO. Romiplostim SC semanal. PTI crônica.'
            },
            {
              classe: 'Rituximabe',
              medicamentos: ['Rituximabe'],
              posologia: '375 mg/m² semanal x4 doses. Resposta em semanas.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Sangramento ativo grave',
              conduta: 'IVIg + Corticoide + Transfusão de plaquetas + Ácido tranexâmico.'
            },
            {
              situacao: 'Gestante',
              conduta: 'IVIg preferível a corticoide. Plaquetas >30.000 para parto vaginal, >50.000 para cesárea.'
            }
          ],
          citations: [{ refId: 'ash-itp-2019' }]
        },
        duracao: 'Conforme resposta. Agonistas TPO podem ser necessários cronicamente.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal até estabilização, depois mensal',
        examesControle: [
          'Hemograma seriado',
          'Esfregaço se mudança clínica'
        ],
        metasTerapeuticas: [
          'Plaquetas >30.000 estáveis',
          'Ausência de sangramento'
        ],
        criteriosEncaminhamento: [
          'PTI crônica ou refratária',
          'Necessidade de esplenectomia',
          'Candidato a agonista TPO ou rituximabe',
          'Sangramento grave'
        ],
        citations: [{ refId: 'ash-itp-2019' }]
      },
      prevencao: {
        primaria: [
          'Não há prevenção primária'
        ],
        secundaria: [
          'Evitar gatilhos',
          'Manter plaquetas em nível seguro'
        ],
        citations: []
      },
    },
    protocolos: [],
    medicamentos: ['prednisona', 'dexametasona', 'imunoglobulina-iv', 'eltrombopag'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ash-itp-2019' }],
    lastUpdate: '2024-12',
    tags: ['trombocitopenia', 'pti', 'plaqueta', 'purpura', 'sangramento'],
  }
];

