/**
 * DOENCAS MUSCULOESQUELETICAS AVANCADAS - DARWIN-MFC EXPANSAO 800
 * ================================================================
 * Doencas reumatologicas autoimunes, inflamatorias e metabolicas
 */

import { Doenca } from '@/lib/types/doenca';

export const musculoesqueleticasAvancadas: Doenca[] = [
  // ============================================================================
  // ARTRITES INFLAMATORIAS
  // ============================================================================
  {
    id: 'artrite-reumatoide',
    titulo: 'Artrite Reumatoide',
    sinonimos: ['AR', 'Rheumatoid Arthritis', 'RA'],
    doid: 'DOID:7148',
    snomedCT: '69896004',
    meshId: 'D001172',
    umlsCui: 'C0003873',
    ciap2: ['L88'],
    cid10: ['M05', 'M06'],
    cid11: ['FA20'],
    categoria: 'musculoesqueletico',
    subcategoria: 'artrite_inflamatoria',
    quickView: {
      definicao: 'Doenca autoimune sistemica caracterizada por poliartrite simetrica cronica das pequenas articulacoes, com potencial erosivo e deformante. Acomete principalmente mulheres 30-50 anos.',
      criteriosDiagnosticos: [
        'CRITERIOS ACR/EULAR 2010 (>=6 pontos):',
        'Articulacoes envolvidas (0-5 pontos)',
        'Sorologia: FR e/ou anti-CCP (0-3 pontos)',
        'Reagentes de fase aguda: PCR e/ou VHS (0-1 ponto)',
        'Duracao dos sintomas >=6 semanas (1 ponto)',
        'Poliartrite simetrica de pequenas articulacoes',
        'Rigidez matinal >1 hora'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Fisioterapia e exercicios de amplitude',
          'Terapia ocupacional',
          'Protecao articular',
          'Educacao do paciente',
          'Cessacao do tabagismo'
        ],
        farmacologico: [
          'DMARD convencional: Metotrexato 15-25mg/semana (primeira linha)',
          'Acido folico 5-10mg/semana (suplementacao)',
          'Prednisona 5-10mg/dia (ponte inicial, desmame rapido)',
          'Se falha MTX: adicionar Leflunomida ou Sulfassalazina',
          'DMARD biologico se falha: anti-TNF, Tocilizumabe, Abatacepte'
        ]
      },
      metasTerapeuticas: [
        'Remissao clinica ou baixa atividade (DAS28 <3,2)',
        'Prevencao de erosoes e deformidades',
        'Manutencao da funcao'
      ],
      examesIniciais: [
        'Fator reumatoide (FR)',
        'Anti-CCP (anti-peptideo citrulinado ciclico)',
        'VHS e PCR',
        'Hemograma, funcao hepatica e renal',
        'Radiografia de maos e pes',
        'Sorologias (hepatites, HIV) pre-DMARD'
      ],
      redFlags: [
        'Vasculite reumatoide',
        'Doenca pulmonar intersticial',
        'Subluxacao atlantoaxial',
        'Sindrome de Felty',
        'Amiloidose secundaria'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,5-1% da populacao mundial',
        incidencia: '20-50/100.000/ano',
        faixaEtaria: 'Pico 30-50 anos; pode ocorrer em qualquer idade',
        fatoresRisco: [
          'Sexo feminino (3:1)',
          'Historia familiar',
          'Tabagismo (principal fator ambiental)',
          'HLA-DR4 e HLA-DR1 (epitopo compartilhado)',
          'Infeccoes (Porphyromonas gingivalis)'
        ],
        citations: [{ refId: 'acr-ra-guidelines-2021' }]
      },
      fisiopatologia: {
        texto: 'Resposta autoimune contra antigenos sinoviais com formacao de autoanticorpos (FR, anti-CCP). Infiltracao sinovial por celulas T, B e macrofagos forma pannus que erode cartilagem e osso. Citocinas pro-inflamatorias (TNF-alfa, IL-6, IL-1) perpetuam inflamacao.',
        citations: [{ refId: 'nejm-ra-pathogenesis-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Poliartrite simetrica de pequenas articulacoes',
          'Rigidez matinal prolongada (>1 hora)',
          'Dor e edema articular',
          'Fadiga e mal-estar',
          'Nodulos reumatoides (20-30%)'
        ],
        sinaisExameFisico: [
          'Sinovite palpavel (articulacoes quentes, edemaciadas)',
          'Desvio ulnar dos dedos',
          'Deformidades em pescoço de cisne e botoeira',
          'Atrofia interossea',
          'Nodulos subcutaneos em superficies extensoras'
        ],
        formasClinicas: [
          'AR soropositiva (FR+ e/ou anti-CCP+)',
          'AR soronegativa',
          'AR de inicio tardio (>60 anos)',
          'AR palindromica'
        ],
        citations: [{ refId: 'acr-ra-guidelines-2021' }]
      },
      diagnostico: {
        criterios: [
          'Criterios ACR/EULAR 2010',
          'Sinovite clinica em >=1 articulacao',
          'Exclusao de outras causas',
          'Score >=6 pontos confirma AR'
        ],
        diagnosticoDiferencial: [
          'Lupus eritematoso sistemico',
          'Artrite psoriasica',
          'Osteoartrite erosiva',
          'Artrite viral',
          'Gota poliarticular'
        ],
        examesLaboratoriais: [
          'FR (sensibilidade 70%, especificidade 80%)',
          'Anti-CCP (sensibilidade 70%, especificidade 95%)',
          'VHS e PCR elevados',
          'Anemia de doenca cronica'
        ],
        examesImagem: [
          'Radiografia: erosoes marginais, osteopenia periarticular',
          'Ultrassom: sinovite, erosoes precoces',
          'RM: edema osseo (preditor de erosao)'
        ],
        citations: [{ refId: 'eular-ra-recommendations-2022' }]
      },
      tratamento: {
        objetivos: [
          'Remissao ou baixa atividade de doenca',
          'Prevenir dano estrutural',
          'Manter funcao e qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Fisioterapia regular',
            'Exercicios aerobicos e fortalecimento',
            'Terapia ocupacional',
            'Cessacao do tabagismo',
            'Controle de comorbidades cardiovasculares'
          ],
          citations: [{ refId: 'acr-ra-guidelines-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'DMARD convencional', medicamentos: ['Metotrexato'], posologia: '15-25mg/semana VO ou SC', observacoes: 'Suplementar acido folico; monitorar hepatotoxicidade' }
          ],
          segundaLinha: [
            { classe: 'DMARD convencional combinado', medicamentos: ['Leflunomida', 'Sulfassalazina', 'Hidroxicloroquina'], posologia: 'Leflunomida 20mg/dia; SSZ 2-3g/dia', observacoes: 'Tripla terapia se falha MTX' },
            { classe: 'DMARD biologico', medicamentos: ['Adalimumabe', 'Etanercepte', 'Tocilizumabe', 'Abatacepte'], posologia: 'Conforme agente especifico', observacoes: 'Se falha a DMARDs convencionais' }
          ],
          situacoesEspeciais: [
            { situacao: 'Doenca intersticial pulmonar', conduta: 'Evitar MTX; preferir Rituximabe ou Abatacepte' },
            { situacao: 'Gestacao', conduta: 'Suspender MTX 3 meses antes; usar Sulfassalazina, HCQ, Certolizumabe' }
          ],
          citations: [{ refId: 'acr-ra-guidelines-2021' }]
        },
        duracao: 'Tratamento continuo; reavaliacao a cada 3 meses ate meta'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 1-3 meses ate remissao; depois a cada 3-6 meses',
        examesControle: [
          'DAS28 ou CDAI a cada consulta',
          'Hemograma, TGO/TGP a cada 1-3 meses em uso de MTX',
          'Radiografia anual de maos e pes'
        ],
        metasTerapeuticas: [
          'DAS28 <2,6 (remissao) ou <3,2 (baixa atividade)',
          'Ausencia de progressao radiografica'
        ],
        criteriosEncaminhamento: [
          'Todo paciente: reumatologista',
          'Doenca intersticial: pneumologista',
          'Manifestacoes oculares: oftalmologista'
        ],
        citations: [{ refId: 'eular-ra-recommendations-2022' }]
      },
      prevencao: {
        primaria: [
          'Cessacao do tabagismo',
          'Saude periodontal'
        ],
        secundaria: [
          'Tratamento precoce (janela de oportunidade)',
          'Estrategia treat-to-target'
        ],
        citations: [{ refId: 'acr-ra-guidelines-2021' }]
      }
    },
    protocolos: ['artrite-reumatoide-tratamento'],
    medicamentos: ['metotrexato', 'leflunomida', 'adalimumabe', 'prednisona'],
    calculadoras: ['das28', 'cdai', 'sdai'],
    rastreamentos: [],
    citations: [{ refId: 'acr-ra-guidelines-2021' }, { refId: 'eular-ra-recommendations-2022' }],
    lastUpdate: '2025-01',
    tags: ['artrite', 'reumatoide', 'autoimune', 'metotrexato', 'biologico']
  },

  {
    id: 'espondilite-anquilosante',
    titulo: 'Espondilite Anquilosante',
    sinonimos: ['EA', 'Ankylosing Spondylitis', 'Espondiloartrite axial radiografica'],
    doid: 'DOID:7147',
    snomedCT: '9631008',
    meshId: 'D013167',
    umlsCui: 'C0038013',
    ciap2: ['L88'],
    cid10: ['M45'],
    cid11: ['FA92.0'],
    categoria: 'musculoesqueletico',
    subcategoria: 'espondiloartrite',
    quickView: {
      definicao: 'Espondiloartrite axial cronica caracterizada por inflamacao das articulacoes sacroiliacas e coluna vertebral, com potencial para anquilose. Associacao forte com HLA-B27.',
      criteriosDiagnosticos: [
        'CRITERIOS ASAS 2009 (espondiloartrite axial):',
        'Lombalgia cronica (>=3 meses, inicio <45 anos)',
        'VIA IMAGEM: Sacroiliite em RM ou RX + >=1 caracteristica SpA',
        'VIA CLINICA: HLA-B27 + >=2 caracteristicas SpA',
        'Caracteristicas: lombalgia inflamatoria, artrite, entesite, uveite, dactilite, psoriase, DII, resposta a AINE, historia familiar, HLA-B27, PCR elevado'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Exercicios diarios (alongamento, fortalecimento)',
          'Fisioterapia supervisionada',
          'Hidroterapia',
          'Cessacao do tabagismo',
          'Postura adequada'
        ],
        farmacologico: [
          'AINE em dose plena continua (primeira linha): Naproxeno, Indometacina, Etoricoxibe',
          'Se falha >=2 AINEs: anti-TNF (Adalimumabe, Etanercepte, Infliximabe)',
          'Alternativa: Secuquinumabe (anti-IL-17)',
          'Sulfassalazina apenas para artrite periferica',
          'Corticoide local para entesite/artrite periferica'
        ]
      },
      metasTerapeuticas: [
        'ASDAS <1,3 (doenca inativa) ou <2,1 (baixa atividade)',
        'Manutencao da mobilidade espinhal',
        'Prevencao de anquilose'
      ],
      examesIniciais: [
        'HLA-B27',
        'VHS e PCR',
        'Radiografia de sacroiliacas e coluna',
        'RM de sacroiliacas (se RX normal)',
        'Hemograma, funcao renal'
      ],
      redFlags: [
        'Fratura vertebral por trauma minimo',
        'Sindrome da cauda equina',
        'Uveite aguda',
        'Insuficiencia aortica',
        'Fibrose pulmonar apical'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,1-1,4% da populacao',
        incidencia: '0,5-14/100.000/ano',
        faixaEtaria: 'Inicio tipico 20-30 anos; raro apos 45 anos',
        fatoresRisco: [
          'HLA-B27 positivo (90-95% dos casos)',
          'Sexo masculino (2-3:1)',
          'Historia familiar de espondiloartrite',
          'Infeccoes entericas previas'
        ],
        citations: [{ refId: 'asas-axspa-recommendations-2022' }]
      },
      fisiopatologia: {
        texto: 'Associacao com HLA-B27 sugere papel de celulas T CD8+. Inflamacao nas enteses (entesite) e articulacoes sacroiliacas e facetarias. IL-17 e IL-23 sao citocinas-chave. Processo de ossificacao endocondral leva a sindesmofitos e anquilose.',
        citations: [{ refId: 'nat-rev-rheumatol-axspa-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Lombalgia inflamatoria (piora repouso, melhora exercicio)',
          'Rigidez matinal prolongada (>30 min)',
          'Dor glutea alternante',
          'Limitacao progressiva da mobilidade espinhal',
          'Manifestacoes extra-articulares: uveite, DII, psoriase'
        ],
        sinaisExameFisico: [
          'Limitacao da flexao lombar (Schober modificado)',
          'Reducao da expansao toracica (<5 cm)',
          'Perda da lordose lombar',
          'Cifose toracica aumentada',
          'Entesite (tendao de Aquiles, fascia plantar)'
        ],
        formasClinicas: [
          'Espondiloartrite axial radiografica (EA classica)',
          'Espondiloartrite axial nao-radiografica',
          'Espondiloartrite periferica'
        ],
        citations: [{ refId: 'asas-axspa-recommendations-2022' }]
      },
      diagnostico: {
        criterios: [
          'Criterios ASAS 2009 para espondiloartrite axial',
          'Criterios de Nova York modificados para EA classica',
          'Sacroiliite bilateral grau >=2 ou unilateral grau >=3'
        ],
        diagnosticoDiferencial: [
          'Lombalgia mecanica',
          'Hiperostose esqueletica idiopatica difusa (DISH)',
          'Osteite condensante do iliaco',
          'Artrite reativa',
          'Artrite psoriasica axial'
        ],
        examesLaboratoriais: [
          'HLA-B27 (presente em 90-95%)',
          'VHS e PCR (podem estar normais)',
          'Hemograma'
        ],
        examesImagem: [
          'RX sacroiliacas: esclerose, erosoes, anquilose',
          'RX coluna: sindesmofitos, coluna em bambu',
          'RM sacroiliacas: edema osseo (osteite) - alteracao precoce'
        ],
        citations: [{ refId: 'eular-axspa-imaging-2021' }]
      },
      tratamento: {
        objetivos: [
          'Controlar sintomas e inflamacao',
          'Manter funcao e mobilidade',
          'Prevenir dano estrutural'
        ],
        naoFarmacologico: {
          medidas: [
            'Exercicios diarios obrigatorios',
            'Fisioterapia supervisionada',
            'Natacao e hidroterapia',
            'Evitar imobilizacao prolongada',
            'Cessacao tabagica (acelera progressao)'
          ],
          citations: [{ refId: 'asas-axspa-recommendations-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'AINE', medicamentos: ['Naproxeno', 'Indometacina', 'Etoricoxibe'], posologia: 'Dose plena continua; Naproxeno 1000mg/dia', observacoes: 'Uso continuo superior a sob demanda para prevencao de progressao' }
          ],
          segundaLinha: [
            { classe: 'Anti-TNF', medicamentos: ['Adalimumabe', 'Etanercepte', 'Infliximabe', 'Golimumabe'], posologia: 'Adalimumabe 40mg SC a cada 2 semanas', observacoes: 'Se falha a >=2 AINEs; alta eficacia' },
            { classe: 'Anti-IL-17', medicamentos: ['Secuquinumabe', 'Ixequizumabe'], posologia: 'Secuquinumabe 150mg SC mensal', observacoes: 'Alternativa aos anti-TNF; evitar se DII' }
          ],
          situacoesEspeciais: [
            { situacao: 'Doenca inflamatoria intestinal associada', conduta: 'Preferir anticorpo monoclonal anti-TNF; evitar anti-IL-17' },
            { situacao: 'Uveite recorrente', conduta: 'Adalimumabe ou Infliximabe (melhores para uveite)' }
          ],
          citations: [{ refId: 'asas-axspa-recommendations-2022' }]
        },
        duracao: 'Tratamento cronico; possivel reducao de biologico em remissao sustentada'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; anual se estavel',
        examesControle: [
          'BASDAI e ASDAS a cada consulta',
          'VHS/PCR periodicos',
          'RX coluna a cada 2 anos (progressao)'
        ],
        metasTerapeuticas: [
          'ASDAS <1,3 (inativo) ou <2,1 (baixa atividade)',
          'BASDAI <4',
          'Manutencao da mobilidade'
        ],
        criteriosEncaminhamento: [
          'Todo paciente: reumatologista',
          'Uveite: oftalmologista de urgencia',
          'Fratura vertebral: ortopedia/neurocirurgia'
        ],
        citations: [{ refId: 'asas-axspa-recommendations-2022' }]
      }
    },
    protocolos: ['espondilite-anquilosante-tratamento'],
    medicamentos: ['naproxeno', 'indometacina', 'adalimumabe', 'secuquinumabe'],
    calculadoras: ['basdai', 'asdas', 'basfi'],
    rastreamentos: [],
    citations: [{ refId: 'asas-axspa-recommendations-2022' }, { refId: 'eular-axspa-imaging-2021' }],
    lastUpdate: '2025-01',
    tags: ['espondilite', 'anquilosante', 'HLA-B27', 'sacroiliite', 'biologico']
  },

  {
    id: 'artrite-psoriasica',
    titulo: 'Artrite Psoriasica',
    sinonimos: ['APs', 'Psoriatic Arthritis', 'PsA'],
    doid: 'DOID:9008',
    snomedCT: '156370009',
    meshId: 'D015535',
    umlsCui: 'C0003872',
    ciap2: ['L88', 'S91'],
    cid10: ['M07.3'],
    cid11: ['FA21'],
    categoria: 'musculoesqueletico',
    subcategoria: 'espondiloartrite',
    quickView: {
      definicao: 'Artrite inflamatoria associada a psoriase, com acometimento axial e/ou periferico. Caracterizada por dactilite (dedo em salsicha), entesite e alteracoes ungueais.',
      criteriosDiagnosticos: [
        'CRITERIOS CASPAR (>=3 pontos):',
        'Evidencia de psoriase atual (2 pontos) ou historia/familiar (1 ponto)',
        'Distrofia ungueal tipica (1 ponto)',
        'Fator reumatoide negativo (1 ponto)',
        'Dactilite atual ou historia (1 ponto)',
        'Evidencia radiografica de neoformacao ossea justa-articular (1 ponto)',
        'Sensibilidade 91%, especificidade 99%'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Fisioterapia',
          'Exercicios regulares',
          'Controle de peso',
          'Cessacao do tabagismo',
          'Tratamento da psoriase cutanea'
        ],
        farmacologico: [
          'AINE para sintomas leves',
          'DMARD: Metotrexato 15-25mg/semana (primeira linha se poliartrite)',
          'Alternativas: Leflunomida, Sulfassalazina (periferica)',
          'Biologico: anti-TNF, anti-IL-17, anti-IL-12/23',
          'Apremilaste (inibidor PDE4) se contraindicacao a biologico'
        ]
      },
      metasTerapeuticas: [
        'Remissao ou minima atividade de doenca (MDA)',
        'Controle de todos os dominios: articular, cutaneo, entesite, dactilite',
        'Prevencao de dano estrutural'
      ],
      examesIniciais: [
        'Fator reumatoide e anti-CCP (geralmente negativos)',
        'VHS e PCR',
        'Radiografia de articulacoes afetadas',
        'Hemograma, funcao hepatica e renal',
        'Sorologias pre-DMARD'
      ],
      redFlags: [
        'Artrite mutilante (forma destrutiva grave)',
        'Acometimento axial rapido progressivo',
        'Uveite',
        'Doenca cutanea extensa refrataria'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,05-0,25% da populacao; 6-42% dos pacientes com psoriase',
        incidencia: '3-8/100.000/ano',
        faixaEtaria: 'Pico 30-50 anos; geralmente 10 anos apos inicio da psoriase',
        fatoresRisco: [
          'Psoriase cutanea (especialmente ungueal e couro cabeludo)',
          'Historia familiar',
          'Obesidade',
          'Trauma articular (fenomeno de Koebner)'
        ],
        citations: [{ refId: 'grappa-psa-recommendations-2021' }]
      },
      fisiopatologia: {
        texto: 'Compartilha vias inflamatorias com psoriase cutanea. Eixo IL-23/IL-17 central na patogenese. Entesite como lesao primaria. Diferencia-se da AR pela ausencia de autoanticorpos e presenca de neoformacao ossea.',
        citations: [{ refId: 'nat-rev-rheumatol-psa-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Artrite oligoarticular ou poliarticular assimetrica',
          'Dactilite (dedo em salsicha)',
          'Entesite (tendao de Aquiles, fascia plantar)',
          'Espondilite (acometimento axial em 40%)',
          'Distrofia ungueal (onicólise, pitting)'
        ],
        sinaisExameFisico: [
          'Artrite de IFD (caracteristica)',
          'Dactilite com edema difuso do dedo',
          'Entesite palpavel',
          'Psoriase cutanea (pode estar oculta)',
          'Alteracoes ungueais'
        ],
        formasClinicas: [
          'Oligoartrite assimetrica (mais comum)',
          'Poliartrite simetrica (semelhante a AR)',
          'Distal (IFD predominante)',
          'Axial (espondilite)',
          'Artrite mutilante (forma grave)'
        ],
        citations: [{ refId: 'grappa-psa-recommendations-2021' }]
      },
      diagnostico: {
        criterios: [
          'Criterios CASPAR (>=3 pontos)',
          'Doenca articular inflamatoria estabelecida',
          'Correlacao com psoriase cutanea'
        ],
        diagnosticoDiferencial: [
          'Artrite reumatoide',
          'Osteoartrite erosiva',
          'Gota',
          'Artrite reativa',
          'Espondilite anquilosante'
        ],
        examesLaboratoriais: [
          'FR e anti-CCP negativos (maioria)',
          'VHS e PCR podem estar elevados',
          'Acido urico (diferenciar de gota)'
        ],
        examesImagem: [
          'RX: erosoes com proliferacao ossea (pencil-in-cup)',
          'Neoformacao ossea justa-articular',
          'RM/US: entesite, sinovite, dactilite'
        ],
        citations: [{ refId: 'eular-psa-recommendations-2020' }]
      },
      tratamento: {
        objetivos: [
          'Controlar inflamacao em todos os dominios',
          'Prevenir dano articular',
          'Melhorar qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Exercicio aerobico regular',
            'Fisioterapia',
            'Perda de peso (melhora resposta ao tratamento)',
            'Cessacao tabagica',
            'Tratamento coordenado pele-articulacao'
          ],
          citations: [{ refId: 'grappa-psa-recommendations-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'DMARD convencional', medicamentos: ['Metotrexato'], posologia: '15-25mg/semana', observacoes: 'Eficaz para pele e articulacao periferica; nao previne dano radiografico' }
          ],
          segundaLinha: [
            { classe: 'Anti-TNF', medicamentos: ['Adalimumabe', 'Etanercepte', 'Infliximabe', 'Golimumabe', 'Certolizumabe'], posologia: 'Conforme agente', observacoes: 'Primeira linha se entesite/dactilite predominante ou axial' },
            { classe: 'Anti-IL-17', medicamentos: ['Secuquinumabe', 'Ixequizumabe'], posologia: 'Secuquinumabe 150-300mg SC', observacoes: 'Excelente para pele; evitar se DII' },
            { classe: 'Anti-IL-12/23', medicamentos: ['Ustekinumabe'], posologia: '45-90mg SC a cada 12 semanas', observacoes: 'Boa opcao para pele e articulacao' }
          ],
          situacoesEspeciais: [
            { situacao: 'Predominio axial', conduta: 'Biologico primeira linha (DMARD convencional nao eficaz)' },
            { situacao: 'Psoriase cutanea extensa', conduta: 'Priorizar agentes com melhor eficacia cutanea (IL-17, IL-23)' }
          ],
          citations: [{ refId: 'grappa-psa-recommendations-2021' }]
        },
        duracao: 'Tratamento cronico; individualizacao conforme dominios afetados'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; integrado reumatologia-dermatologia',
        examesControle: [
          'DAPSA ou MDA a cada consulta',
          'PASI para pele',
          'Radiografias periodicas'
        ],
        metasTerapeuticas: [
          'Minima atividade de doenca (MDA)',
          'Remissao DAPSA <=4',
          'Clearance cutaneo'
        ],
        criteriosEncaminhamento: [
          'Todo paciente: reumatologista + dermatologista',
          'Uveite: oftalmologista',
          'DII associada: gastroenterologista'
        ],
        citations: [{ refId: 'eular-psa-recommendations-2020' }]
      }
    },
    protocolos: ['artrite-psoriasica-tratamento'],
    medicamentos: ['metotrexato', 'adalimumabe', 'secuquinumabe', 'ustekinumabe'],
    calculadoras: ['dapsa', 'mda-psa', 'pasi'],
    rastreamentos: [],
    citations: [{ refId: 'grappa-psa-recommendations-2021' }, { refId: 'eular-psa-recommendations-2020' }],
    lastUpdate: '2025-01',
    tags: ['artrite', 'psoriasica', 'psoriase', 'dactilite', 'entesite']
  },

  // ============================================================================
  // DOENCAS AUTOIMUNES SISTEMICAS
  // ============================================================================
  {
    id: 'lupus-eritematoso-sistemico',
    titulo: 'Lupus Eritematoso Sistemico',
    sinonimos: ['LES', 'Lupus', 'SLE', 'Systemic Lupus Erythematosus'],
    doid: 'DOID:9074',
    snomedCT: '55464009',
    meshId: 'D008180',
    umlsCui: 'C0024141',
    ciap2: ['L99'],
    cid10: ['M32'],
    cid11: ['4A40'],
    categoria: 'musculoesqueletico',
    subcategoria: 'autoimune_sistemica',
    quickView: {
      definicao: 'Doenca autoimune sistemica cronica caracterizada por producao de autoanticorpos contra antigenos nucleares, com acometimento multiorganico. Predomina em mulheres jovens.',
      criteriosDiagnosticos: [
        'CRITERIOS ACR/EULAR 2019 (>=10 pontos + ANA positivo):',
        'ANA positivo: criterio de entrada obrigatorio',
        'DOMINIOS CLINICOS: constitucional, hematologico, neuropsiquiatrico, mucocutaneo, seroso, musculoesqueletico, renal',
        'DOMINIOS IMUNOLOGICOS: anti-dsDNA, anti-Sm, antifosfolipide, complemento',
        'Alta especificidade (93%) e sensibilidade (96%)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Fotoprotetores rigorosos (FPS >=50)',
          'Evitar exposicao solar',
          'Cessacao do tabagismo',
          'Exercicio regular adaptado',
          'Vacinacao (exceto vivas atenuadas se imunossupressao)'
        ],
        farmacologico: [
          'TODOS: Hidroxicloroquina 5mg/kg/dia (base do tratamento)',
          'LEVE: AINE, corticoide topico',
          'MODERADO: Prednisona 0,5mg/kg/dia + Azatioprina ou Metotrexato',
          'GRAVE (renal/neurologico): Pulsoterapia + Ciclofosfamida ou Micofenolato',
          'REFRATARIO: Rituximabe, Belimumabe, Voclosporina (nefrite)'
        ]
      },
      metasTerapeuticas: [
        'LLDAS (Lupus Low Disease Activity State) ou remissao',
        'Prednisona <=5mg/dia',
        'Prevenir dano organico cumulativo'
      ],
      examesIniciais: [
        'ANA (fator antinuclear)',
        'Anti-dsDNA, anti-Sm, anti-RNP',
        'Complemento (C3, C4, CH50)',
        'Hemograma completo',
        'Creatinina, ureia, EAS, proteinuria 24h',
        'Perfil lipidico, glicemia',
        'Anticorpos antifosfolipide'
      ],
      redFlags: [
        'Nefrite lupica (proteinuria, sedimento ativo)',
        'Serosite (pericardite, pleurite)',
        'Manifestacoes neuropsiquiatricas',
        'Anemia hemolitica/trombocitopenia grave',
        'Sindrome de ativacao macrofagica'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '20-150/100.000 (varia por etnia)',
        incidencia: '1-10/100.000/ano',
        mortalidade: 'Sobrevida 10 anos >90% com tratamento moderno',
        faixaEtaria: 'Pico 15-45 anos (idade fertil)',
        fatoresRisco: [
          'Sexo feminino (9:1)',
          'Afrodescendentes e asiaticos (maior prevalencia e gravidade)',
          'Historia familiar',
          'Exposicao solar',
          'Infeccoes (EBV)',
          'Hormonios (estrogenos)'
        ],
        citations: [{ refId: 'eular-sle-recommendations-2023' }]
      },
      fisiopatologia: {
        texto: 'Perda de tolerancia a antigenos nucleares com producao de autoanticorpos. Deposicao de imunocomplexos e ativacao de complemento causam dano tecidual. IFN tipo I tem papel central. Fatores geneticos (HLA-DR2, DR3) e ambientais contribuem.',
        citations: [{ refId: 'nejm-sle-pathogenesis-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Fadiga (90%)',
          'Artralgia/artrite (90%)',
          'Rash malar (30-50%)',
          'Fotossensibilidade (70%)',
          'Ulceras orais',
          'Alopecia',
          'Fenomeno de Raynaud'
        ],
        sinaisExameFisico: [
          'Rash malar em asa de borboleta',
          'Lupus discoide',
          'Artrite nao erosiva',
          'Serosite (atrito pericardico/pleural)',
          'Adenopatia, esplenomegalia'
        ],
        formasClinicas: [
          'LES cutaneo-articular (mais comum)',
          'LES com nefrite',
          'LES neuropsiquiatrico',
          'LES hematologico',
          'LES neonatal'
        ],
        citations: [{ refId: 'eular-sle-recommendations-2023' }]
      },
      diagnostico: {
        criterios: [
          'Criterios ACR/EULAR 2019',
          'ANA positivo (>=1:80 em HEp-2) obrigatorio',
          '>=10 pontos nos dominios clinicos e imunologicos'
        ],
        diagnosticoDiferencial: [
          'Artrite reumatoide',
          'Sindrome de Sjogren',
          'Dermatomiosite',
          'Vasculites sistemicas',
          'Lupus induzido por drogas'
        ],
        examesLaboratoriais: [
          'ANA (sensibilidade >95%)',
          'Anti-dsDNA (especifico, correlaciona com nefrite)',
          'Anti-Sm (altamente especifico)',
          'C3, C4 (baixos na atividade)',
          'Hemograma (citopenias)'
        ],
        examesImagem: [
          'Ecocardiograma (pericardite, Libman-Sacks)',
          'Radiografia torax (serosite, infeccao)',
          'RM cerebro se manifestacoes neuropsiquiatricas'
        ],
        outrosExames: [
          'Biopsia renal (estadiar nefrite)',
          'LCR se acometimento neurologico'
        ],
        citations: [{ refId: 'acr-eular-sle-criteria-2019' }]
      },
      tratamento: {
        objetivos: [
          'Controlar atividade de doenca',
          'Minimizar dano organico',
          'Reduzir corticoide'
        ],
        naoFarmacologico: {
          medidas: [
            'Fotoprotetores FPS >=50 diarios',
            'Evitar sol entre 10h-16h',
            'Cessacao tabagica (reduz eficacia da HCQ)',
            'Exercicio regular',
            'Controle de fatores de risco cardiovascular'
          ],
          citations: [{ refId: 'eular-sle-recommendations-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antimalárico', medicamentos: ['Hidroxicloroquina'], posologia: '<=5mg/kg/dia', observacoes: 'Base do tratamento; nunca suspender; monitorar retina' }
          ],
          segundaLinha: [
            { classe: 'Imunossupressor', medicamentos: ['Azatioprina', 'Metotrexato', 'Micofenolato'], posologia: 'AZA 2-3mg/kg/dia; MTX 15-25mg/sem; MMF 2-3g/dia', observacoes: 'Conforme acometimento e gravidade' },
            { classe: 'Biologico', medicamentos: ['Belimumabe', 'Rituximabe', 'Anifrolumabe'], posologia: 'Belimumabe 200mg SC semanal', observacoes: 'Para doenca refrataria ou como poupador de corticoide' }
          ],
          situacoesEspeciais: [
            { situacao: 'Nefrite lupica classe III/IV', conduta: 'Pulsoterapia + Micofenolato ou Ciclofosfamida; adicionar Voclosporina' },
            { situacao: 'LES e gestacao', conduta: 'Manter HCQ; AZA segura; suspender MTX, MMF, CYC' }
          ],
          citations: [{ refId: 'eular-sle-recommendations-2023' }]
        },
        duracao: 'Tratamento cronico; HCQ por toda a vida; possivel reducao de imunossupressor em remissao'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 1-3 meses se ativo; a cada 6 meses se estavel',
        examesControle: [
          'SLEDAI-2K ou BILAG a cada consulta',
          'Anti-dsDNA e complemento (marcadores de atividade)',
          'EAS e proteinuria periodicos',
          'Fundoscopia anual (HCQ)'
        ],
        metasTerapeuticas: [
          'Remissao clinica ou LLDAS',
          'Prednisona <=5mg/dia',
          'SLICC/ACR DI estavel (sem acumulo de dano)'
        ],
        criteriosEncaminhamento: [
          'Todo paciente: reumatologista',
          'Nefrite: nefrologista',
          'Gestacao: alto risco obstetrico',
          'SAF: hematologista'
        ],
        citations: [{ refId: 'eular-sle-recommendations-2023' }]
      },
      prevencao: {
        primaria: [
          'Evitar exposicao solar excessiva',
          'Nao fumar'
        ],
        secundaria: [
          'HCQ continua previne flares',
          'Controle rigoroso dos fatores de risco CV'
        ],
        citations: [{ refId: 'eular-sle-recommendations-2023' }]
      },
      populacoesEspeciais: {
        gestantes: 'Planejar gestacao em remissao >=6 meses; manter HCQ; AAS baixa dose se anticorpos antifosfolipide'
      }
    },
    protocolos: ['lupus-tratamento', 'nefrite-lupica'],
    medicamentos: ['hidroxicloroquina', 'prednisona', 'azatioprina', 'micofenolato', 'belimumabe'],
    calculadoras: ['sledai-2k', 'slicc-di', 'lldas'],
    rastreamentos: [],
    citations: [{ refId: 'eular-sle-recommendations-2023' }, { refId: 'acr-eular-sle-criteria-2019' }],
    lastUpdate: '2025-01',
    tags: ['lupus', 'LES', 'autoimune', 'hidroxicloroquina', 'nefrite']
  },

  {
    id: 'esclerose-sistemica',
    titulo: 'Esclerose Sistemica',
    sinonimos: ['Esclerodermia', 'SSc', 'Systemic Sclerosis', 'Scleroderma'],
    doid: 'DOID:419',
    snomedCT: '89155008',
    meshId: 'D012595',
    umlsCui: 'C0036421',
    ordo: ['ORPHA:90291'],
    ciap2: ['L99'],
    cid10: ['M34'],
    cid11: ['4A41'],
    categoria: 'musculoesqueletico',
    subcategoria: 'autoimune_sistemica',
    quickView: {
      definicao: 'Doenca autoimune caracterizada por fibrose cutanea e visceral progressiva, vasculopatia e autoanticorpos especificos. Formas limitada (CREST) e difusa.',
      criteriosDiagnosticos: [
        'CRITERIOS ACR/EULAR 2013 (>=9 pontos):',
        'Espessamento cutaneo dos dedos de ambas maos proximal as MCF (9 pontos - suficiente)',
        'Espessamento cutaneo dos dedos: dedos edemaciados (2) ou esclerodactilia (4)',
        'Lesoes de polpas digitais: ulceras (2) ou cicatrizes (3)',
        'Telangiectasias (2 pontos)',
        'Capilaroscopia anormal (2 pontos)',
        'HAP e/ou DPI (2 pontos)',
        'Fenomeno de Raynaud (3 pontos)',
        'Autoanticorpos: anti-centrômero, anti-Scl70, anti-RNA pol III (3 pontos)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Protecao contra frio (Raynaud)',
          'Cessacao do tabagismo',
          'Fisioterapia (prevenir contraturas)',
          'Cuidados com a pele',
          'Reabilitacao pulmonar'
        ],
        farmacologico: [
          'RAYNAUD: BCC (Nifedipina, Anlodipino); Sildenafila se grave',
          'FIBROSE CUTANEA: Metotrexato, Micofenolato',
          'DPI: Micofenolato, Nintedanibe, Tocilizumabe',
          'HAP: Terapia combinada (ERA + iPDE5 +/- prostaciclina)',
          'ULCERAS DIGITAIS: Bosentana, Iloprost IV'
        ]
      },
      metasTerapeuticas: [
        'Estabilizar fibrose cutanea e pulmonar',
        'Controlar fenomeno de Raynaud',
        'Prevenir complicacoes vasculares'
      ],
      examesIniciais: [
        'Autoanticorpos: ANA, anti-centrômero, anti-Scl70, anti-RNA pol III',
        'Capilaroscopia periungueal',
        'TC de torax de alta resolucao',
        'Provas de funcao pulmonar (CVF, DLCO)',
        'Ecocardiograma (HAP)',
        'Funcao renal, hemograma'
      ],
      redFlags: [
        'Crise renal esclerodermica (HAS maligna, IRA)',
        'Hipertensao pulmonar',
        'Doenca pulmonar intersticial progressiva',
        'Envolvimento cardiaco',
        'Ulceras digitais de dificil cicatrizacao'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-30/100.000',
        incidencia: '1-2/100.000/ano',
        mortalidade: 'Sobrevida 10 anos: 70-80%',
        faixaEtaria: 'Pico 30-50 anos',
        fatoresRisco: [
          'Sexo feminino (4:1)',
          'Exposicao a silica, solventes',
          'Historia familiar',
          'HLA-DRB1'
        ],
        citations: [{ refId: 'eular-ssc-recommendations-2023' }]
      },
      fisiopatologia: {
        texto: 'Triade: autoimunidade, vasculopatia e fibrose. Lesao endotelial inicial ativa fibroblastos. Producao excessiva de colageno I e III. Autoanticorpos tem valor prognostico: anti-Scl70 (DPI), anti-centrômero (HAP), anti-RNA pol III (crise renal).',
        citations: [{ refId: 'lancet-ssc-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Fenomeno de Raynaud (90%)',
          'Espessamento cutaneo progressivo',
          'Esclerodactilia',
          'Ulceras digitais',
          'Dispneia (DPI ou HAP)',
          'Disfagia (dismotilidade esofagica)'
        ],
        sinaisExameFisico: [
          'Pele espessada e endurecida',
          'Facies esclerodermico',
          'Telangiectasias',
          'Calcinose subcutanea',
          'Crepitantes pulmonares (DPI)'
        ],
        formasClinicas: [
          'SSc limitada (anti-centrômero; CREST)',
          'SSc difusa (anti-Scl70; progressao rapida)',
          'SSc sine scleroderma (sem pele)',
          'Sindrome de overlap'
        ],
        citations: [{ refId: 'eular-ssc-recommendations-2023' }]
      },
      diagnostico: {
        criterios: [
          'Criterios ACR/EULAR 2013 (>=9 pontos)',
          'Espessamento proximal a MCF e suficiente isoladamente'
        ],
        diagnosticoDiferencial: [
          'Esclerodermia localizada (morfeia)',
          'Escleromixedema',
          'Fascite eosinofilica',
          'DMTC'
        ],
        examesLaboratoriais: [
          'ANA positivo (>95%)',
          'Anti-Scl70 (topoisomerase I) - difusa/DPI',
          'Anti-centrômero - limitada/HAP',
          'Anti-RNA polimerase III - crise renal'
        ],
        examesImagem: [
          'TC torax: vidro fosco, faveolamento (DPI)',
          'Ecocardiograma com estimativa de PAP',
          'Capilaroscopia: megacapilar, areas avasculares'
        ],
        outrosExames: [
          'Cateterismo direito se suspeita de HAP',
          'Manometria esofagica'
        ],
        citations: [{ refId: 'eular-ssc-recommendations-2023' }]
      },
      tratamento: {
        objetivos: [
          'Modificar curso da doenca',
          'Tratar manifestacoes especificas',
          'Prevenir complicacoes'
        ],
        naoFarmacologico: {
          medidas: [
            'Protecao contra frio',
            'Cessacao tabagica',
            'Fisioterapia e exercicios para prevenir contraturas',
            'Hidratacao cutanea',
            'Refeicoes pequenas e frequentes (refluxo)'
          ],
          citations: [{ refId: 'eular-ssc-recommendations-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Vasodilatador', medicamentos: ['Nifedipina', 'Anlodipino'], posologia: 'Nifedipina retard 30-60mg/dia', observacoes: 'Primeira linha para Raynaud' },
            { classe: 'Imunossupressor', medicamentos: ['Micofenolato', 'Metotrexato'], posologia: 'MMF 2-3g/dia', observacoes: 'Para DPI e fibrose cutanea' }
          ],
          segundaLinha: [
            { classe: 'Antifibrotico', medicamentos: ['Nintedanibe', 'Tocilizumabe'], posologia: 'Nintedanibe 150mg 2x/dia', observacoes: 'Para DPI progressiva' },
            { classe: 'Terapia para HAP', medicamentos: ['Bosentana', 'Ambrisentana', 'Sildenafila', 'Tadalafila'], posologia: 'Terapia combinada conforme risco', observacoes: 'Centro especializado' }
          ],
          situacoesEspeciais: [
            { situacao: 'Crise renal esclerodermica', conduta: 'IECA imediatamente (Captopril); evitar corticoide em dose alta (precipitante)' },
            { situacao: 'Ulceras digitais refratarias', conduta: 'Iloprost IV; Bosentana para prevencao de novas ulceras' }
          ],
          citations: [{ refId: 'eular-ssc-recommendations-2023' }]
        },
        duracao: 'Tratamento cronico; modulado conforme manifestacoes'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; mais frequente se difusa precoce',
        examesControle: [
          'Provas de funcao pulmonar a cada 6-12 meses',
          'Ecocardiograma anual',
          'mRSS (escore cutaneo) a cada consulta',
          'NT-proBNP (HAP)'
        ],
        metasTerapeuticas: [
          'Estabilizacao da CVF',
          'Controle do Raynaud',
          'Prevencao de crise renal'
        ],
        criteriosEncaminhamento: [
          'Todo paciente: reumatologista',
          'DPI: pneumologista',
          'HAP: centro especializado',
          'Crise renal: nefrologia de urgencia'
        ],
        citations: [{ refId: 'eular-ssc-recommendations-2023' }]
      }
    },
    protocolos: ['esclerose-sistemica-manejo'],
    medicamentos: ['nifedipina', 'micofenolato', 'bosentana', 'nintedanibe'],
    calculadoras: ['mrss', 'eustar'],
    rastreamentos: [],
    citations: [{ refId: 'eular-ssc-recommendations-2023' }, { refId: 'lancet-ssc-2022' }],
    lastUpdate: '2025-01',
    tags: ['esclerose', 'esclerodermia', 'raynaud', 'fibrose', 'HAP']
  },

  {
    id: 'dermatomiosite-polimiosite',
    titulo: 'Dermatomiosite e Polimiosite',
    sinonimos: ['DM', 'PM', 'Miopatias Inflamatorias Idiopaticas', 'IIM'],
    doid: 'DOID:10223',
    snomedCT: '396230008',
    meshId: 'D003882',
    umlsCui: 'C0011633',
    ciap2: ['L99'],
    cid10: ['M33'],
    cid11: ['4A42'],
    categoria: 'musculoesqueletico',
    subcategoria: 'autoimune_sistemica',
    quickView: {
      definicao: 'Miopatias inflamatorias idiopaticas caracterizadas por fraqueza muscular proximal simetrica. DM tem manifestacoes cutaneas patognomonicas (heliotropo, papulas de Gottron).',
      criteriosDiagnosticos: [
        'CRITERIOS ACR/EULAR 2017:',
        'Fraqueza muscular proximal simetrica',
        'Elevacao de enzimas musculares (CK, aldolase)',
        'EMG com padrao miopatico',
        'Biopsia muscular: infiltrado inflamatorio',
        'DERMATOMIOSITE: rash heliotropo, papulas de Gottron',
        'Autoanticorpos especificos (anti-Jo1, anti-Mi2, anti-MDA5, anti-TIF1-gamma)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Fisioterapia (exercicios ativos na fase cronica)',
          'Reabilitacao',
          'Fotoprotecao (DM)',
          'Rastreamento de neoplasias',
          'Avaliacao da degluticao'
        ],
        farmacologico: [
          'Prednisona 1mg/kg/dia (inicio)',
          'DMARD poupador: Metotrexato ou Azatioprina desde inicio',
          'Casos refratarios: Imunoglobulina IV, Rituximabe',
          'DPI associada: Micofenolato, Tacrolimus',
          'Anti-MDA5+ com DPI rapida: terapia agressiva precoce'
        ]
      },
      metasTerapeuticas: [
        'Recuperacao da forca muscular',
        'Normalizacao de CK',
        'Desmame de corticoide',
        'Estabilizacao pulmonar (DPI)'
      ],
      examesIniciais: [
        'CK, aldolase, TGO, TGP, DHL',
        'Autoanticorpos: ANA, anti-Jo1, anti-Mi2, anti-MDA5, anti-TIF1-gamma',
        'EMG',
        'RM de coxas (edema muscular)',
        'TC de torax (DPI)',
        'Rastreamento oncologico'
      ],
      redFlags: [
        'Disfagia (risco de aspiracao)',
        'Doenca pulmonar intersticial rapidamente progressiva',
        'Fraqueza respiratoria',
        'Neoplasia oculta (especialmente DM)',
        'Anti-MDA5+ (alto risco de DPI fatal)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '5-10/100.000',
        incidencia: '1-10/1.000.000/ano',
        faixaEtaria: 'DM: picos 5-15 anos e 45-65 anos; PM: adultos >20 anos',
        fatoresRisco: [
          'Sexo feminino (2:1)',
          'Neoplasia (DM > PM)',
          'HLA-DRB1',
          'Infeccoes virais'
        ],
        citations: [{ refId: 'eular-iim-recommendations-2022' }]
      },
      fisiopatologia: {
        texto: 'DM: vasculopatia mediada por complemento com isquemia muscular. PM: ataque citotoxico CD8+ direto a fibras musculares. Autoanticorpos definem subtipos e prognostico (anti-Jo1: DPI; anti-TIF1-gamma: cancer; anti-MDA5: DPI rapidamente progressiva).',
        citations: [{ refId: 'nejm-myositis-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Fraqueza proximal simetrica (dificuldade subir escadas, levantar bracos)',
          'Rash heliotropo (palpebras) - DM',
          'Papulas de Gottron (MCF, IFP) - DM',
          'Disfagia (30-50%)',
          'Dispneia (DPI)'
        ],
        sinaisExameFisico: [
          'Fraqueza de cinturas (escapular e pelvica)',
          'Rash heliotropo e Gottron',
          'Maos de mecanico (fissuras)',
          'Sinal do xale (eritema)',
          'Calcinose (DM juvenil)'
        ],
        formasClinicas: [
          'Dermatomiosite classica',
          'Dermatomiosite amiopatica',
          'Polimiosite',
          'Miopatia por corpos de inclusao',
          'Miopatia necrotizante imunomediada',
          'Sindrome antissintetase'
        ],
        citations: [{ refId: 'eular-iim-recommendations-2022' }]
      },
      diagnostico: {
        criterios: [
          'Criterios ACR/EULAR 2017 (probabilidade)',
          'Combinacao de clinica + laboratorio + EMG + biopsia + autoanticorpos'
        ],
        diagnosticoDiferencial: [
          'Distrofias musculares',
          'Miopatias endocrinas (hipotireoidismo)',
          'Miopatia induzida por estatinas',
          'Miastenia gravis',
          'Esclerose lateral amiotrofica'
        ],
        examesLaboratoriais: [
          'CK (elevada 10-50x)',
          'Aldolase, TGO, TGP, DHL',
          'Autoanticorpos especificos de miosite'
        ],
        examesImagem: [
          'RM de coxas: edema muscular (STIR)',
          'TC torax: DPI (vidro fosco, consolidacoes)'
        ],
        outrosExames: [
          'EMG: padrao miopatico',
          'Biopsia muscular (padrao-ouro)',
          'Rastreamento oncologico (TC, PET-CT, colonoscopia, mamografia)'
        ],
        citations: [{ refId: 'nejm-myositis-2021' }]
      },
      tratamento: {
        objetivos: [
          'Recuperar forca muscular',
          'Tratar manifestacoes extramusculares',
          'Rastrear e tratar neoplasia'
        ],
        naoFarmacologico: {
          medidas: [
            'Repouso relativo na fase inflamatoria aguda',
            'Fisioterapia ativa na fase cronica',
            'Fotoprotecao (DM)',
            'Avaliacao fonoaudiologica (disfagia)',
            'Suporte nutricional'
          ],
          citations: [{ refId: 'eular-iim-recommendations-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticosteroide', medicamentos: ['Prednisona'], posologia: '1mg/kg/dia; pulsoterapia se grave', observacoes: 'Desmame lento apos melhora' },
            { classe: 'Imunossupressor poupador', medicamentos: ['Metotrexato', 'Azatioprina'], posologia: 'MTX 15-25mg/sem; AZA 2-3mg/kg/dia', observacoes: 'Iniciar junto com corticoide' }
          ],
          segundaLinha: [
            { classe: 'Imunoglobulina IV', medicamentos: ['IVIG'], posologia: '2g/kg dividido em 2-5 dias, mensal', observacoes: 'Casos refratarios; primeira linha se disfagia grave' },
            { classe: 'Biologico', medicamentos: ['Rituximabe'], posologia: '1g a cada 2 semanas (2 doses)', observacoes: 'Refratarios; anti-sintetase' }
          ],
          situacoesEspeciais: [
            { situacao: 'DPI rapidamente progressiva (anti-MDA5+)', conduta: 'Terapia combinada agressiva: pulsoterapia + CYC + tacrolimus +/- plasmaferese' },
            { situacao: 'Neoplasia associada', conduta: 'Tratar cancer; miosite pode melhorar com tratamento oncologico' }
          ],
          citations: [{ refId: 'eular-iim-recommendations-2022' }]
        },
        duracao: 'Anos; ajustar conforme CK e forca'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 1-3 meses na fase ativa; a cada 3-6 meses estavel',
        examesControle: [
          'CK a cada consulta',
          'Forca muscular (MMT, dinamometria)',
          'PFP se DPI',
          'Rastreamento oncologico periodico (especialmente DM)'
        ],
        metasTerapeuticas: [
          'Normalizacao de CK',
          'Forca muscular normal ou proxima do normal',
          'Prednisona <=10mg/dia'
        ],
        criteriosEncaminhamento: [
          'Reumatologista obrigatorio',
          'Pneumologista se DPI',
          'Oncologista se neoplasia',
          'Gastroenterologia se disfagia grave'
        ],
        citations: [{ refId: 'eular-iim-recommendations-2022' }]
      }
    },
    protocolos: ['miopatias-inflamatorias-tratamento'],
    medicamentos: ['prednisona', 'metotrexato', 'azatioprina', 'rituximabe', 'ivig'],
    calculadoras: ['mmt8', 'myositis-damage-index'],
    rastreamentos: [],
    citations: [{ refId: 'eular-iim-recommendations-2022' }, { refId: 'nejm-myositis-2021' }],
    lastUpdate: '2025-01',
    tags: ['dermatomiosite', 'polimiosite', 'miosite', 'CK', 'DPI']
  },

  {
    id: 'sindrome-sjogren',
    titulo: 'Sindrome de Sjogren',
    sinonimos: ['SS', 'Sjogren Syndrome', 'Sindrome Sicca'],
    doid: 'DOID:12894',
    snomedCT: '83901003',
    meshId: 'D012859',
    umlsCui: 'C0037199',
    ciap2: ['L99'],
    cid10: ['M35.0'],
    cid11: ['4A43'],
    categoria: 'musculoesqueletico',
    subcategoria: 'autoimune_sistemica',
    quickView: {
      definicao: 'Doenca autoimune cronica caracterizada por infiltracao linfocitaria de glandulas exocrinas, causando xeroftalmia e xerostomia. Pode ter manifestacoes sistemicas e risco de linfoma.',
      criteriosDiagnosticos: [
        'CRITERIOS ACR/EULAR 2016 (>=4 pontos):',
        'Focus score >=1 em biopsia de glandula salivar (3 pontos)',
        'Anti-SSA/Ro positivo (3 pontos)',
        'Escore de coloracao ocular >=5 (1 ponto)',
        'Teste de Schirmer <=5mm/5min (1 ponto)',
        'Fluxo salivar nao estimulado <=0,1ml/min (1 ponto)',
        'Exclusao de outras causas de sicca'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Lagrimas artificiais frequentes',
          'Saliva artificial / gomas sem acucar',
          'Hidratacao oral adequada',
          'Higiene oral rigorosa',
          'Umidificador de ambiente'
        ],
        farmacologico: [
          'XEROFTALMIA: lagrimas artificiais, ciclosporina topica',
          'XEROSTOMIA: Pilocarpina 5mg 3-4x/dia ou Cevimelina',
          'ARTRALGIA: Hidroxicloroquina',
          'MANIFESTACOES SISTEMICAS: Corticoide, Metotrexato, Azatioprina',
          'GRAVE/REFRATARIO: Rituximabe'
        ]
      },
      metasTerapeuticas: [
        'Alivio sintomatico da sicca',
        'Prevenir complicacoes oculares e orais',
        'Controlar manifestacoes sistemicas',
        'Vigilancia para linfoma'
      ],
      examesIniciais: [
        'Anti-SSA/Ro e anti-SSB/La',
        'ANA, FR',
        'Hemograma, VHS, PCR',
        'Eletroforese de proteinas (hipergamaglobulinemia)',
        'Funcao renal',
        'Teste de Schirmer',
        'Fluxo salivar'
      ],
      redFlags: [
        'Linfadenopatia persistente ou crescente (linfoma)',
        'Parotidite recorrente',
        'Vasculite cutanea',
        'Neuropatia periferica',
        'Crioglobulinemia'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,5-1% da populacao',
        incidencia: '4-5/100.000/ano',
        faixaEtaria: 'Pico 40-60 anos',
        fatoresRisco: [
          'Sexo feminino (9:1)',
          'Outras doencas autoimunes (SS secundaria)',
          'Historia familiar',
          'Infeccao por EBV'
        ],
        citations: [{ refId: 'eular-sjogren-recommendations-2020' }]
      },
      fisiopatologia: {
        texto: 'Infiltracao linfocitaria (predominio CD4+) de glandulas exocrinas. Autoanticorpos anti-Ro/SSA e anti-La/SSB. Ativacao de IFN tipo I. Risco aumentado de linfoma de celulas B (40x), especialmente MALT.',
        citations: [{ refId: 'nejm-sjogren-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Xeroftalmia (olho seco, sensacao de areia)',
          'Xerostomia (boca seca, dificuldade engolir)',
          'Aumento parotideo',
          'Fadiga (80%)',
          'Artralgias (60%)'
        ],
        sinaisExameFisico: [
          'Ceratoconjuntivite seca',
          'Caries dentarias multiplas',
          'Lingua fissurada',
          'Parotidite',
          'Purpura palpavel (vasculite)'
        ],
        formasClinicas: [
          'SS primaria',
          'SS secundaria (com LES, AR, SSc)',
          'SS com manifestacoes sistemicas'
        ],
        citations: [{ refId: 'eular-sjogren-recommendations-2020' }]
      },
      diagnostico: {
        criterios: [
          'Criterios ACR/EULAR 2016 (>=4 pontos)',
          'Biopsia ou anti-SSA sao os itens de maior peso'
        ],
        diagnosticoDiferencial: [
          'Sicca induzida por medicamentos',
          'Sarcoidose',
          'Doenca IgG4-relacionada',
          'Linfoma primario',
          'Hepatite C'
        ],
        examesLaboratoriais: [
          'Anti-SSA/Ro (70%)',
          'Anti-SSB/La (40%)',
          'FR positivo (60%)',
          'Hipergamaglobulinemia',
          'Crioglobulinas'
        ],
        examesImagem: [
          'USG de parotidas (alteracoes parenquimatosas)',
          'Sialografia (se indicada)'
        ],
        outrosExames: [
          'Teste de Schirmer',
          'Rosa bengala / fluoresceina',
          'Biopsia de glandula salivar menor'
        ],
        citations: [{ refId: 'acr-eular-sjogren-criteria-2016' }]
      },
      tratamento: {
        objetivos: [
          'Aliviar sintomas de sicca',
          'Tratar manifestacoes sistemicas',
          'Vigilancia oncologica'
        ],
        naoFarmacologico: {
          medidas: [
            'Lagrimas artificiais sem conservantes (frequentes)',
            'Gomas de mascar sem acucar',
            'Hidratacao oral abundante',
            'Umidificador de ambiente',
            'Higiene oral intensiva / fluor'
          ],
          citations: [{ refId: 'eular-sjogren-recommendations-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Secretagogo', medicamentos: ['Pilocarpina', 'Cevimelina'], posologia: 'Pilocarpina 5mg 3-4x/dia', observacoes: 'Para xerostomia; contraindicado em glaucoma, asma' },
            { classe: 'Topico ocular', medicamentos: ['Ciclosporina colirio', 'Lifitegrast'], posologia: 'Ciclosporina 0,05% 2x/dia', observacoes: 'Para xeroftalmia moderada-grave' }
          ],
          segundaLinha: [
            { classe: 'Antimalárico', medicamentos: ['Hidroxicloroquina'], posologia: '<=5mg/kg/dia', observacoes: 'Para artralgias e fadiga' },
            { classe: 'Imunossupressor', medicamentos: ['Metotrexato', 'Azatioprina'], posologia: 'MTX 15-25mg/semana', observacoes: 'Para manifestacoes sistemicas' }
          ],
          situacoesEspeciais: [
            { situacao: 'Manifestacoes graves (vasculite, neuropatia, glomerulonefrite)', conduta: 'Corticoide + Rituximabe' },
            { situacao: 'Gestacao com anti-Ro+', conduta: 'Monitorar bloqueio cardiaco fetal; considerar HCQ profilatica' }
          ],
          citations: [{ refId: 'eular-sjogren-recommendations-2020' }]
        },
        duracao: 'Tratamento cronico; sintomaticos conforme necessidade'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-12 meses se estavel; mais frequente se sistemico',
        examesControle: [
          'ESSDAI (atividade sistemica)',
          'ESSPRI (sintomas paciente)',
          'Eletroforese de proteinas anual',
          'Avaliacao oftalmologica periodica'
        ],
        metasTerapeuticas: [
          'Controle de sintomas sicca',
          'ESSDAI baixo/inativo',
          'Deteccao precoce de linfoma'
        ],
        criteriosEncaminhamento: [
          'Reumatologista',
          'Oftalmologista',
          'Dentista/estomatologista',
          'Hematologista se suspeita de linfoma'
        ],
        citations: [{ refId: 'eular-sjogren-recommendations-2020' }]
      }
    },
    protocolos: ['sjogren-tratamento'],
    medicamentos: ['pilocarpina', 'hidroxicloroquina', 'ciclosporina-colirio', 'rituximabe'],
    calculadoras: ['essdai', 'esspri'],
    rastreamentos: [],
    citations: [{ refId: 'eular-sjogren-recommendations-2020' }, { refId: 'acr-eular-sjogren-criteria-2016' }],
    lastUpdate: '2025-01',
    tags: ['sjogren', 'xeroftalmia', 'xerostomia', 'sicca', 'linfoma']
  },

  // ============================================================================
  // ARTROPATIAS METABOLICAS E DEGENERATIVAS
  // ============================================================================
  {
    id: 'gota',
    titulo: 'Gota',
    sinonimos: ['Artrite gotosa', 'Podagra', 'Gout'],
    doid: 'DOID:13189',
    snomedCT: '90560007',
    meshId: 'D006073',
    umlsCui: 'C0018099',
    ciap2: ['T92'],
    cid10: ['M10'],
    cid11: ['FA25'],
    categoria: 'musculoesqueletico',
    subcategoria: 'artropatia_cristal',
    quickView: {
      definicao: 'Artrite inflamatoria causada por deposito de cristais de urato monossodico (UMS) nas articulacoes. Manifesta-se com crises agudas, periodos intercriticos e gota tofacea cronica.',
      criteriosDiagnosticos: [
        'CRITERIOS ACR/EULAR 2015:',
        'Padrao-ouro: cristais de UMS em liquido sinovial ou tofo',
        'Criterios clinicos se microscopia indisponivel:',
        'Envolvimento articular (primeira MTF: 2 pontos)',
        'Caracteristicas do episodio (eritema, pico <24h, resolucao <14 dias)',
        'Tempo: >=2 episodios tipicos',
        'Evidencia de tofos',
        'Uricemia >6mg/dL',
        'Imagem: sinal do duplo contorno, erosoes'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Reducao de peso',
          'Evitar alcool (especialmente cerveja)',
          'Limitar purinas (carnes, frutos do mar)',
          'Hidratacao adequada',
          'Evitar diureticos se possivel'
        ],
        farmacologico: [
          'CRISE AGUDA: Colchicina (ate 12h do inicio) OU AINE OU Corticoide',
          'Colchicina: 1mg + 0,5mg apos 1h (total 1,5mg no primeiro dia)',
          'AINE: Indometacina 50mg 3x/dia ou Naproxeno 500mg 2x/dia',
          'Prednisona 30-40mg/dia por 5-7 dias',
          'URICOSURICO (cronico): Alopurinol iniciar apos crise, dose baixa',
          'META: acido urico <6mg/dL (ou <5mg/dL se tofos)'
        ]
      },
      metasTerapeuticas: [
        'Resolucao rapida da crise aguda',
        'Acido urico <6mg/dL (<5 se tofos)',
        'Prevencao de novas crises',
        'Dissolucao de tofos'
      ],
      examesIniciais: [
        'Acido urico serico (pode estar normal na crise)',
        'Funcao renal',
        'Hemograma',
        'Perfil lipidico, glicemia',
        'Analise de liquido sinovial (padrao-ouro)',
        'Radiografia da articulacao afetada'
      ],
      redFlags: [
        'Gota poliarticular',
        'Doenca renal cronica associada',
        'Tophi extensos',
        'Frequencia de crises aumentando',
        'Sindrome de lise tumoral'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-4% da populacao adulta',
        incidencia: '1-2/1.000/ano',
        faixaEtaria: 'Homens >30 anos; mulheres pos-menopausa',
        fatoresRisco: [
          'Sexo masculino',
          'Hiperuricemia (>7mg/dL)',
          'Obesidade',
          'Dieta rica em purinas',
          'Alcool (cerveja)',
          'Diureticos tiazidicose de alça',
          'Doenca renal cronica',
          'Sindrome metabolica'
        ],
        citations: [{ refId: 'acr-gout-guidelines-2020' }]
      },
      fisiopatologia: {
        texto: 'Hiperuricemia leva a formacao e deposito de cristais de urato monossodico nas articulacoes e tecidos moles. Cristais ativam inflamassoma NLRP3 e liberacao de IL-1beta, causando inflamacao intensa. Fatores precipitantes: trauma, cirurgia, desidratacao, variacao de acido urico.',
        citations: [{ refId: 'nejm-gout-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Monoartrite aguda intensamente dolorosa',
          'Primeira MTF mais comum (podagra)',
          'Inicio abrupto, frequentemente noturno',
          'Eritema e edema periarticular',
          'Tofos (depositos subcutaneos) em gota cronica'
        ],
        sinaisExameFisico: [
          'Articulacao quente, eritematosa, extremamente dolorosa',
          'Descamacao cutanea na resolucao',
          'Tofos em pavilhao auricular, cotovelos, dedos, tendao de Aquiles',
          'Deformidades em gota tofacea'
        ],
        formasClinicas: [
          'Gota aguda (crise)',
          'Gota intercritica',
          'Gota tofacea cronica',
          'Artropatia gotosa cronica'
        ],
        citations: [{ refId: 'acr-gout-guidelines-2020' }]
      },
      diagnostico: {
        criterios: [
          'Criterios ACR/EULAR 2015',
          'Cristais de UMS em liquido sinovial ou tofo (definitivo)',
          'Score clinico >=8 pontos na ausencia de cristais'
        ],
        diagnosticoDiferencial: [
          'Artrite septica',
          'Pseudogota (CPPD)',
          'Artrite reativa',
          'Celulite',
          'Trauma'
        ],
        examesLaboratoriais: [
          'Acido urico serico',
          'Funcao renal',
          'Analise de liquido sinovial: cristais de UMS (birrefringencia negativa)'
        ],
        examesImagem: [
          'RX: erosoes em saca-bocado com bordas esclerosadas',
          'USG: sinal do duplo contorno',
          'TC de dupla energia: depositos de urato'
        ],
        citations: [{ refId: 'eular-gout-recommendations-2023' }]
      },
      tratamento: {
        objetivos: [
          'Tratar crise aguda rapidamente',
          'Reduzir acido urico para meta',
          'Prevenir novas crises e dano articular'
        ],
        naoFarmacologico: {
          medidas: [
            'Reducao de peso gradual',
            'Evitar alcool, especialmente cerveja',
            'Limitar carnes vermelhas, visceras, frutos do mar',
            'Hidratacao adequada',
            'Revisar medicamentos (descontinuar diureticos se possivel)'
          ],
          citations: [{ refId: 'acr-gout-guidelines-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Anti-inflamatorio (crise)', medicamentos: ['Colchicina', 'Naproxeno', 'Indometacina', 'Prednisona'], posologia: 'Colchicina 1mg + 0,5mg 1h depois; AINE dose maxima 5-7 dias', observacoes: 'Iniciar nas primeiras 24h da crise' },
            { classe: 'Hipouricemiante', medicamentos: ['Alopurinol'], posologia: 'Iniciar 100mg/dia, titular ate meta', observacoes: 'Iniciar 2-4 semanas apos crise; usar profilaxia com colchicina' }
          ],
          segundaLinha: [
            { classe: 'Hipouricemiante alternativo', medicamentos: ['Febuxostat'], posologia: '40-80mg/dia', observacoes: 'Se intolerancia a Alopurinol; cuidado se DCV' },
            { classe: 'Uricosurico', medicamentos: ['Probenecida', 'Benzbromarona'], posologia: 'Probenecida 500mg-2g/dia', observacoes: 'Se subexcretor de acido urico; evitar se nefrolitiase' }
          ],
          situacoesEspeciais: [
            { situacao: 'DRC grave', conduta: 'Alopurinol dose reduzida ou Febuxostat; Colchicina contraindicada se ClCr <30' },
            { situacao: 'Gota tofacea grave refrataria', conduta: 'Pegloticase (raramente disponivel)' }
          ],
          citations: [{ refId: 'acr-gout-guidelines-2020' }]
        },
        duracao: 'Hipouricemiante continuo; profilaxia com Colchicina por 3-6 meses apos inicio'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 1-3 meses ate meta; depois a cada 6-12 meses',
        examesControle: [
          'Acido urico a cada consulta ate meta',
          'Funcao renal periodica',
          'Hemograma se em uso de colchicina prolongada'
        ],
        metasTerapeuticas: [
          'Acido urico <6mg/dL',
          '<5mg/dL se tofos',
          'Ausencia de crises'
        ],
        criteriosEncaminhamento: [
          'Refratario a tratamento',
          'Gota tofacea extensa',
          'Doenca renal associada'
        ],
        citations: [{ refId: 'eular-gout-recommendations-2023' }]
      },
      prevencao: {
        primaria: [
          'Controle de peso',
          'Dieta saudavel',
          'Evitar alcool excessivo'
        ],
        secundaria: [
          'Manter acido urico na meta',
          'Tratar comorbidades (HAS, DM, DLP)'
        ],
        citations: [{ refId: 'acr-gout-guidelines-2020' }]
      }
    },
    protocolos: ['gota-tratamento'],
    medicamentos: ['colchicina', 'alopurinol', 'febuxostat', 'naproxeno'],
    calculadoras: ['gout-calculator', 'clcr'],
    rastreamentos: [],
    citations: [{ refId: 'acr-gout-guidelines-2020' }, { refId: 'eular-gout-recommendations-2023' }],
    lastUpdate: '2025-01',
    tags: ['gota', 'hiperuricemia', 'cristais', 'alopurinol', 'colchicina']
  },

  {
    id: 'fibromialgia',
    titulo: 'Fibromialgia',
    sinonimos: ['FM', 'Fibromyalgia', 'Sindrome fibromialgica'],
    doid: 'DOID:631',
    snomedCT: '203082005',
    meshId: 'D005356',
    umlsCui: 'C0016053',
    ciap2: ['L18'],
    cid10: ['M79.7'],
    cid11: ['MG30.01'],
    categoria: 'musculoesqueletico',
    subcategoria: 'dor_cronica',
    quickView: {
      definicao: 'Sindrome de dor cronica generalizada associada a fadiga, disturbios do sono, alteracoes cognitivas e sintomas somaticos multiplos. Sensibilizacao central e desregulacao da modulacao da dor.',
      criteriosDiagnosticos: [
        'CRITERIOS ACR 2016 (modificados):',
        'Dor generalizada em >=4 de 5 regioes (exceto mandibula, torax, abdome)',
        'Sintomas presentes por >=3 meses',
        'WPI (Widespread Pain Index) >=7 E SSS (Symptom Severity Score) >=5',
        'OU WPI 4-6 E SSS >=9',
        'SSS: fadiga, sono nao reparador, sintomas cognitivos (0-12)',
        'Nao exclui outras doencas (diagnóstico positivo)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Exercicio aerobico regular (mais importante)',
          'Educacao do paciente sobre a doenca',
          'Higiene do sono',
          'Terapia cognitivo-comportamental',
          'Reducao de estresse'
        ],
        farmacologico: [
          'Amitriptilina 10-50mg a noite (primeira linha)',
          'Duloxetina 30-60mg/dia',
          'Pregabalina 150-450mg/dia',
          'Ciclobenzaprina 10-30mg a noite',
          'Evitar opioides (ineficazes e risco de dependencia)'
        ]
      },
      metasTerapeuticas: [
        'Reducao da dor (nao eliminacao)',
        'Melhora da funcionalidade',
        'Qualidade do sono',
        'Retorno as atividades'
      ],
      examesIniciais: [
        'Hemograma',
        'VHS, PCR',
        'TSH',
        'Vitamina D',
        'CPK',
        'Exames para excluir outras causas se indicado'
      ],
      redFlags: [
        'Perda de peso inexplicada',
        'Febre',
        'Sinais neurologicos focais',
        'Artrite verdadeira (sinovite)',
        'Fraqueza muscular objetiva'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '2-4% da populacao geral',
        faixaEtaria: 'Mais comum 30-50 anos; pode ocorrer em qualquer idade',
        fatoresRisco: [
          'Sexo feminino (7:1)',
          'Historia de trauma fisico ou emocional',
          'Outras sindromes de dor cronica',
          'Disturbios de humor (depressao, ansiedade)',
          'Historia familiar'
        ],
        citations: [{ refId: 'eular-fibromyalgia-2017' }]
      },
      fisiopatologia: {
        texto: 'Sensibilizacao central com amplificacao do processamento da dor no SNC. Disfuncao das vias descendentes inibitórias da dor. Alteracoes em neurotransmissores (serotonina, norepinefrina reduzidas; substancia P aumentada). Fatores geneticos e ambientais contribuem.',
        citations: [{ refId: 'nat-rev-fibromyalgia-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor difusa cronica (>=3 meses)',
          'Fadiga persistente',
          'Sono nao reparador',
          'Disfuncao cognitiva (fibro fog)',
          'Cefaleia, sindrome do intestino irritavel',
          'Parestesias, rigidez matinal'
        ],
        sinaisExameFisico: [
          'Dor a palpacao difusa (nao apenas tender points)',
          'Exame articular normal',
          'Forca muscular preservada',
          'Exame neurologico normal'
        ],
        formasClinicas: [
          'Fibromialgia primaria',
          'Fibromialgia secundaria/concomitante (com AR, LES, etc.)'
        ],
        citations: [{ refId: 'acr-fibromyalgia-criteria-2016' }]
      },
      diagnostico: {
        criterios: [
          'Criterios ACR 2016 (modificados)',
          'Diagnostico clinico (nao ha exame confirmatorio)',
          'Exames servem para excluir outras doencas'
        ],
        diagnosticoDiferencial: [
          'Hipotireoidismo',
          'Deficiencia de vitamina D',
          'Polimialgia reumatica',
          'Miopatias inflamatorias',
          'Artrite inflamatoria inicial',
          'Espondiloartrite',
          'Sindrome de fadiga cronica'
        ],
        examesLaboratoriais: [
          'Todos normais na fibromialgia',
          'Hemograma, VHS, PCR para excluir inflamacao',
          'TSH para excluir hipotireoidismo',
          'Vitamina D'
        ],
        examesImagem: [
          'Geralmente desnecessarios',
          'Se duvida diagnostica'
        ],
        citations: [{ refId: 'eular-fibromyalgia-2017' }]
      },
      tratamento: {
        objetivos: [
          'Reducao da intensidade da dor',
          'Melhora da funcao',
          'Melhora do sono e humor'
        ],
        naoFarmacologico: {
          medidas: [
            'Exercicio aerobico regular (caminhada, natacao, bicicleta)',
            'Exercicios aquaticos',
            'Educacao sobre a doenca',
            'Terapia cognitivo-comportamental',
            'Higiene do sono',
            'Acupuntura (pode ajudar)'
          ],
          citations: [{ refId: 'eular-fibromyalgia-2017' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antidepressivo triciclico', medicamentos: ['Amitriptilina'], posologia: '10-50mg a noite', observacoes: 'Baixas doses; melhora sono e dor' },
            { classe: 'IRSN', medicamentos: ['Duloxetina', 'Milnaciprano'], posologia: 'Duloxetina 30-60mg/dia', observacoes: 'Eficaz para dor e humor' }
          ],
          segundaLinha: [
            { classe: 'Anticonvulsivante', medicamentos: ['Pregabalina', 'Gabapentina'], posologia: 'Pregabalina 150-450mg/dia dividido', observacoes: 'Aprovado para fibromialgia; cuidado com sedacao' },
            { classe: 'Relaxante muscular', medicamentos: ['Ciclobenzaprina'], posologia: '10-30mg a noite', observacoes: 'Melhora sono e rigidez' }
          ],
          situacoesEspeciais: [
            { situacao: 'Depressao comorbida', conduta: 'Preferir IRSN em doses antidepressivas' },
            { situacao: 'Disturbio do sono predominante', conduta: 'Amitriptilina ou Trazodona' }
          ],
          citations: [{ refId: 'acr-fibromyalgia-guidelines-2021' }]
        },
        duracao: 'Cronico; ajuste individualizado; multimodal'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 1-3 meses inicialmente; a cada 3-6 meses se estavel',
        examesControle: [
          'FIQ (Fibromyalgia Impact Questionnaire)',
          'Escala de dor',
          'Avaliacao funcional',
          'Monitorar efeitos adversos dos medicamentos'
        ],
        metasTerapeuticas: [
          'Reducao de pelo menos 30% na dor',
          'Melhora da funcionalidade',
          'Retorno ao trabalho/atividades'
        ],
        criteriosEncaminhamento: [
          'Reumatologista se duvida diagnostica',
          'Psiquiatria se transtorno de humor grave',
          'Clinica de dor se refratario'
        ],
        citations: [{ refId: 'eular-fibromyalgia-2017' }]
      }
    },
    protocolos: ['fibromialgia-tratamento'],
    medicamentos: ['amitriptilina', 'duloxetina', 'pregabalina', 'ciclobenzaprina'],
    calculadoras: ['fiq-r', 'wpi-sss'],
    rastreamentos: [],
    citations: [{ refId: 'eular-fibromyalgia-2017' }, { refId: 'acr-fibromyalgia-criteria-2016' }],
    lastUpdate: '2025-01',
    tags: ['fibromialgia', 'dor-cronica', 'fadiga', 'sono', 'sensibilizacao-central']
  },

  {
    id: 'osteoporose',
    titulo: 'Osteoporose',
    sinonimos: ['OP', 'Osteoporosis', 'Doenca ossea metabolica'],
    doid: 'DOID:11476',
    snomedCT: '64859006',
    meshId: 'D010024',
    umlsCui: 'C0029456',
    ciap2: ['L95'],
    cid10: ['M81'],
    cid11: ['FB83'],
    categoria: 'musculoesqueletico',
    subcategoria: 'metabolica_ossea',
    quickView: {
      definicao: 'Doenca esqueletica sistemica caracterizada por baixa massa ossea e deterioracao da microarquitetura, com aumento da fragilidade e risco de fraturas.',
      criteriosDiagnosticos: [
        'CRITERIOS OMS (densitometria):',
        'T-score <=-2,5 em coluna lombar, colo femoral ou femur total',
        'Osteopenia: T-score entre -1,0 e -2,5',
        'DIAGNOSTICO CLINICO: fratura por fragilidade (vertebra, quadril, punho) independente do T-score',
        'Usar FRAX para decisao terapeutica em osteopenia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Calcio 1000-1200mg/dia (preferencialmente dieta)',
          'Vitamina D 800-2000UI/dia (manter 25-OH-D >30ng/mL)',
          'Exercicio com carga e resistencia',
          'Prevencao de quedas',
          'Cessacao do tabagismo e moderacao de alcool'
        ],
        farmacologico: [
          'BISFOSFONATOS (primeira linha): Alendronato 70mg/semana OU Risedronato 35mg/semana OU Acido Zoledronico 5mg IV anual',
          'DENOSUMABE 60mg SC a cada 6 meses (alternativa)',
          'TERIPARATIDA 20mcg/dia SC (osteoporose grave, alto risco)',
          'ROMOSOZUMABE 210mg/mes SC (12 meses) - muito alto risco',
          'TRH em mulheres perimenopausa sintomaticas'
        ]
      },
      metasTerapeuticas: [
        'Prevenir fraturas',
        'Manter ou aumentar DMO',
        'T-score >-2,5 ou melhora significativa'
      ],
      examesIniciais: [
        'Densitometria ossea (DXA) coluna e quadril',
        'Calcio, fosforo, fosfatase alcalina',
        '25-OH-vitamina D',
        'Creatinina, hemograma',
        'TSH',
        'PTH (se suspeita de hiperparatireoidismo)',
        'Eletroforese de proteinas (excluir mieloma)'
      ],
      redFlags: [
        'Perda de altura >4cm',
        'Cifose dorsas progressiva',
        'Fratura vertebral multipla',
        'Fratura de quadril',
        'Osteoporose em homem jovem ou pre-menopausa'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '30% das mulheres pos-menopausa; 8% dos homens >50 anos',
        incidencia: 'Fraturas: quadril 250/100.000; vertebra 500/100.000 em >50 anos',
        mortalidade: 'Fratura de quadril: 20-30% mortalidade em 1 ano',
        faixaEtaria: 'Aumenta com idade; pico de massa ossea aos 30 anos',
        fatoresRisco: [
          'Idade avancada',
          'Sexo feminino',
          'Menopausa precoce',
          'Historia familiar de fratura de quadril',
          'Baixo peso (IMC <19)',
          'Corticoterapia cronica',
          'Tabagismo, alcool',
          'Imobilizacao'
        ],
        citations: [{ refId: 'nof-osteoporosis-2023' }]
      },
      fisiopatologia: {
        texto: 'Desbalanco entre reabsorcao (osteoclastos) e formacao (osteoblastos) ossea. Deficiencia estrogenica na menopausa aumenta reabsorcao. Envelhecimento reduz formacao. Via RANK-RANKL-OPG e Wnt/esclerostina regulam remodelamento.',
        citations: [{ refId: 'nejm-osteoporosis-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Assintomatica ate ocorrer fratura',
          'Dor aguda apos fratura',
          'Perda de altura progressiva',
          'Cifose dorsal (corcunda de viuva)',
          'Dor cronica (fraturas vertebrais multiplas)'
        ],
        sinaisExameFisico: [
          'Cifose toracica aumentada',
          'Perda de altura documentada',
          'Sensibilidade a percussao vertebral (fratura)',
          'Espaco iliocostal reduzido'
        ],
        formasClinicas: [
          'Osteoporose pos-menopausa (tipo I)',
          'Osteoporose senil (tipo II)',
          'Osteoporose secundaria'
        ],
        citations: [{ refId: 'nof-osteoporosis-2023' }]
      },
      diagnostico: {
        criterios: [
          'T-score <=-2,5 na DXA',
          'Fratura por fragilidade (clinico)',
          'FRAX >=3% para quadril ou >=20% para fratura maior'
        ],
        diagnosticoDiferencial: [
          'Osteomalacia',
          'Mieloma multiplo',
          'Metastases osseas',
          'Hiperparatireoidismo',
          'Mastocitose'
        ],
        examesLaboratoriais: [
          'Calcio, fosforo, fosfatase alcalina',
          '25-OH-vitamina D',
          'PTH',
          'TSH',
          'Creatinina',
          'CTX ou P1NP (marcadores de turnover)'
        ],
        examesImagem: [
          'DXA (padrao-ouro para DMO)',
          'RX coluna (fraturas vertebrais)',
          'VFA (Vertebral Fracture Assessment) na DXA'
        ],
        citations: [{ refId: 'iscd-positions-2023' }]
      },
      tratamento: {
        objetivos: [
          'Prevenir primeira fratura (primaria)',
          'Prevenir fraturas subsequentes (secundaria)',
          'Manter qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Calcio 1000-1200mg/dia (dieta + suplemento se necessario)',
            'Vitamina D 800-2000UI/dia',
            'Exercicios de resistencia e impacto',
            'Prevencao de quedas (avaliacao ambiental, equilibrio)',
            'Cessacao do tabagismo'
          ],
          citations: [{ refId: 'nof-osteoporosis-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Bisfosfonato oral', medicamentos: ['Alendronato', 'Risedronato'], posologia: 'Alendronato 70mg/semana; Risedronato 35mg/semana ou 150mg/mes', observacoes: 'Tomar em jejum com agua; permanecer ereto 30min' },
            { classe: 'Bisfosfonato IV', medicamentos: ['Acido Zoledronico'], posologia: '5mg IV anual', observacoes: 'Boa opcao se intolerancia oral ou baixa adesao' }
          ],
          segundaLinha: [
            { classe: 'Anticorpo anti-RANKL', medicamentos: ['Denosumabe'], posologia: '60mg SC a cada 6 meses', observacoes: 'Nao usar se DRC grave; risco de hipocalcemia e rebound ao suspender' },
            { classe: 'Anabolico', medicamentos: ['Teriparatida', 'Abaloparatida'], posologia: 'Teriparatida 20mcg SC/dia por 2 anos', observacoes: 'Osteoporose grave; seguir com antirreabsortivo' }
          ],
          situacoesEspeciais: [
            { situacao: 'Muito alto risco (fraturas multiplas, T-score muito baixo)', conduta: 'Iniciar com Romosozumabe 210mg/mes por 12 meses, depois bisfosfonato ou Denosumabe' },
            { situacao: 'Corticoterapia cronica', conduta: 'Bisfosfonato ou Teriparatida; calcio e vitamina D obrigatorios' }
          ],
          citations: [{ refId: 'aace-osteoporosis-2020' }]
        },
        duracao: '3-5 anos de bisfosfonato oral; reavaliar holiday; Teriparatida max 2 anos'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-12 meses; anual se estavel',
        examesControle: [
          'DXA a cada 1-2 anos',
          '25-OH-vitamina D anual',
          'Calcio serico',
          'Altura a cada consulta',
          'CTX ou P1NP (opcional, para monitorar resposta)'
        ],
        metasTerapeuticas: [
          'T-score >-2,5 ou ganho significativo de DMO',
          'Ausencia de novas fraturas',
          'Vitamina D >=30ng/mL'
        ],
        criteriosEncaminhamento: [
          'Fratura apesar de tratamento',
          'Osteoporose em homem ou pre-menopausa',
          'Suspeita de causa secundaria',
          'Candidato a terapia anabolica'
        ],
        citations: [{ refId: 'nof-osteoporosis-2023' }]
      },
      prevencao: {
        primaria: [
          'Calcio e vitamina D adequados desde infancia',
          'Exercicio regular',
          'Evitar tabaco e alcool excessivo',
          'Prevenir quedas'
        ],
        secundaria: [
          'Rastreamento com DXA (mulheres >=65, homens >=70, ou antes se fatores de risco)',
          'Tratar apos fratura por fragilidade'
        ],
        citations: [{ refId: 'uspstf-osteoporosis-2024' }]
      }
    },
    protocolos: ['osteoporose-tratamento'],
    medicamentos: ['alendronato', 'acido-zoledronico', 'denosumabe', 'teriparatida', 'vitamina-d'],
    calculadoras: ['frax', 't-score'],
    rastreamentos: ['osteoporose-dxa'],
    citations: [{ refId: 'nof-osteoporosis-2023' }, { refId: 'aace-osteoporosis-2020' }],
    lastUpdate: '2025-01',
    tags: ['osteoporose', 'fratura', 'bisfosfonato', 'densitometria', 'vitamina-D']
  }
];
