/**
 * DOENCAS NEFROLOGICAS AVANCADAS - DARWIN-MFC EXPANSAO 800
 * ========================================================
 * Doencas renais cronicas, glomerulopatias e nefropatias especificas
 */

import { Doenca } from '@/lib/types/doenca';

export const nefrologicasAvancadas: Doenca[] = [
  // ============================================================================
  // DOENCA RENAL CRONICA
  // ============================================================================
  {
    id: 'doenca-renal-cronica',
    titulo: 'Doenca Renal Cronica',
    sinonimos: ['DRC', 'Insuficiencia Renal Cronica', 'IRC', 'Chronic Kidney Disease', 'CKD'],
    doid: 'DOID:784',
    snomedCT: '709044004',
    meshId: 'D051436',
    umlsCui: 'C1561643',
    ciap2: ['U99'],
    cid10: ['N18', 'N18.1', 'N18.2', 'N18.3', 'N18.4', 'N18.5'],
    cid11: ['GB61'],
    categoria: 'urologico',
    subcategoria: 'nefropatias',
    quickView: {
      definicao: 'Anormalidades da estrutura ou funcao renal presentes por >3 meses com implicacoes para a saude. Classificada em estagios 1-5 pela TFG e categorias de albuminuria (A1-A3). Principais causas: diabetes, hipertensao, glomerulopatias.',
      criteriosDiagnosticos: [
        'TFG <60 mL/min/1,73m2 por >=3 meses',
        'OU marcadores de dano renal por >=3 meses:',
        'Albuminuria (RAC >=30 mg/g)',
        'Alteracoes no sedimento urinario',
        'Anormalidades eletroliticas por tubulopatias',
        'Alteracoes estruturais em imagem',
        'Historia de transplante renal'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Restricao de sodio (<2g/dia)',
          'Restricao proteica (0,8g/kg/dia em G3-5)',
          'Controle de peso e exercicio regular',
          'Cessacao do tabagismo',
          'Evitar nefrotoxicos (AINEs, contraste)'
        ],
        farmacologico: [
          'IECA ou BRA (primeira linha para proteinuria)',
          'Meta PA <130/80 mmHg (ou <120/80 se tolerado)',
          'Inibidor SGLT2 (independente do diabetes) - Dapagliflozina, Empagliflozina',
          'Estatina para DRC G3-5 (risco CV)',
          'Finerenona (se DRC diabetica com RAC >30)'
        ]
      },
      metasTerapeuticas: [
        'Retardar progressao da DRC',
        'PA <130/80 mmHg',
        'RAC estavel ou em reducao',
        'HbA1c <7% em diabeticos',
        'LDL <70 mg/dL'
      ],
      examesIniciais: [
        'Creatinina serica e TFG estimada',
        'Relacao albumina/creatinina urinaria (RAC)',
        'Sedimento urinario',
        'Ultrassom renal',
        'Eletrólitos (Na, K, Ca, P), Bicarbonato',
        'Hemograma completo',
        'PTH e vitamina D (se G3b-5)'
      ],
      redFlags: [
        'Queda rapida da TFG (>5 mL/min/ano)',
        'Hematuria macroscopica',
        'Hipercalemia >6,0 mEq/L',
        'Sinais de uremia (nauseas, confusao, pericardite)',
        'Sobrecarga de volume refrataria',
        'TFG <15 mL/min (preparar TRS)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-15% da populacao adulta mundial; Brasil ~12%',
        incidencia: 'Incidencia de DRCT (dialise) ~200/milhao/ano no Brasil',
        mortalidade: 'Risco CV 5-10x maior que populacao geral; principal causa de morte',
        faixaEtaria: 'Aumenta com idade; >50% dos >60 anos tem G3+',
        fatoresRisco: [
          'Diabetes mellitus (principal causa ~40%)',
          'Hipertensao arterial (~30%)',
          'Glomerulopatias primarias',
          'Historia familiar de DRC',
          'Obesidade',
          'Tabagismo',
          'Uso cronico de AINEs',
          'Idade avancada'
        ],
        citations: [{ refId: 'kdigo-ckd-2024' }]
      },
      fisiopatologia: {
        texto: 'Perda progressiva de nefrons leva a hipertensao glomerular nos nefrons remanescentes, causando hiperfiltração, proteinuria e esclerose glomerular. Fibrose tubulointersticial progressiva. Via final comum independente da etiologia inicial.',
        citations: [{ refId: 'nejm-ckd-progression-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Estagios iniciais (G1-3a): geralmente assintomatico',
          'Fadiga e fraqueza',
          'Edema de membros inferiores',
          'Nocturia e poliuria',
          'Nauseas e anorexia (uremia)',
          'Prurido uremico',
          'Dispneia (sobrecarga, anemia)'
        ],
        sinaisExameFisico: [
          'Hipertensao arterial',
          'Edema periferico',
          'Palidez (anemia)',
          'Hematomas (disfuncao plaquetaria)',
          'Atrito pericardico (uremia avancada)',
          'Asterixis (encefalopatia uremica)'
        ],
        formasClinicas: [
          'G1: TFG >=90, com marcadores de dano',
          'G2: TFG 60-89',
          'G3a: TFG 45-59',
          'G3b: TFG 30-44',
          'G4: TFG 15-29',
          'G5: TFG <15 (DRCT)'
        ],
        citations: [{ refId: 'kdigo-ckd-2024' }]
      },
      diagnostico: {
        criterios: [
          'TFG <60 por >=3 meses OU',
          'Marcadores de dano renal por >=3 meses',
          'Classificar por TFG (G1-5) e albuminuria (A1-3)',
          'Identificar etiologia'
        ],
        diagnosticoDiferencial: [
          'Lesao renal aguda',
          'Desidratacao',
          'Obstrucao urinaria',
          'Variacao biologica da creatinina'
        ],
        examesLaboratoriais: [
          'Creatinina e TFG estimada (CKD-EPI)',
          'RAC ou proteinuria 24h',
          'Sedimento urinario',
          'Eletrolitos, gasometria',
          'Hemograma, ferro, ferritina',
          'PTH, calcio, fosforo, vitamina D',
          'Perfil lipidico'
        ],
        examesImagem: [
          'Ultrassom renal (tamanho, ecogenicidade)',
          'Doppler de arterias renais se suspeita renovascular'
        ],
        outrosExames: [
          'Biopsia renal se indicada (proteinuria nefrotica, hematuria glomerular, causa incerta)'
        ],
        citations: [{ refId: 'kdigo-ckd-2024' }]
      },
      tratamento: {
        objetivos: [
          'Retardar progressao da DRC',
          'Prevenir complicacoes cardiovasculares',
          'Tratar complicacoes metabolicas',
          'Preparar para TRS quando indicado'
        ],
        naoFarmacologico: {
          medidas: [
            'Dieta hipossodica (<2g Na/dia)',
            'Restricao proteica moderada (0,8g/kg/dia G3-5)',
            'Restricao de potassio e fosforo se elevados',
            'Cessacao do tabagismo',
            'Exercicio aerobico regular',
            'Evitar nefrotoxicos (AINEs, aminoglicosideos, contraste)'
          ],
          citations: [{ refId: 'kdigo-ckd-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'IECA/BRA', medicamentos: ['Enalapril', 'Losartana'], posologia: 'Dose maxima tolerada', observacoes: 'Reduz proteinuria e progressao; monitorar K e Cr' },
            { classe: 'Inibidor SGLT2', medicamentos: ['Dapagliflozina', 'Empagliflozina'], posologia: 'Dapagliflozina 10mg/dia', observacoes: 'Beneficio independente do diabetes; TFG >=20' },
            { classe: 'Estatina', medicamentos: ['Atorvastatina', 'Rosuvastatina'], posologia: 'Atorvastatina 20-40mg/dia', observacoes: 'Todos G3-5 (alto risco CV)' }
          ],
          segundaLinha: [
            { classe: 'Antagonista mineralocorticoide', medicamentos: ['Finerenona'], posologia: '10-20mg/dia', observacoes: 'DRC diabetica com RAC >30; monitorar K' },
            { classe: 'Anti-hipertensivo adicional', medicamentos: ['Anlodipino', 'Diuretico'], posologia: 'Conforme necessidade', observacoes: 'Meta PA <130/80' }
          ],
          situacoesEspeciais: [
            { situacao: 'Anemia de DRC (Hb <10)', conduta: 'Agentes estimuladores de eritropoiese + ferro IV; meta Hb 10-11,5' },
            { situacao: 'Hiperfosfatemia', conduta: 'Quelantes de fosforo (Sevelamer, Carbonato de calcio)' },
            { situacao: 'Hiperparatireoidismo secundario', conduta: 'Calcitriol ou analogos de vitamina D; calcimimeticos' },
            { situacao: 'Acidose metabolica (HCO3 <22)', conduta: 'Bicarbonato de sodio 1-3g/dia' }
          ],
          citations: [{ refId: 'kdigo-ckd-2024' }, { refId: 'nejm-dapagliflozin-ckd-2020' }]
        },
        duracao: 'Tratamento continuo; progressao para TRS em estagio 5'
      },
      acompanhamento: {
        frequenciaConsultas: 'G1-2: anual; G3a: 6/6 meses; G3b-4: 3-4/4 meses; G5: mensal',
        examesControle: [
          'Creatinina e TFG (frequencia conforme estagio)',
          'RAC',
          'Eletrolitos, bicarbonato',
          'Hemograma, perfil de ferro',
          'PTH, Ca, P, vitamina D (G3b-5)'
        ],
        metasTerapeuticas: [
          'Declínio da TFG <5 mL/min/ano',
          'PA <130/80 mmHg',
          'RAC estavel ou reduzindo',
          'Hb 10-11,5 g/dL',
          'P <4,5 mg/dL, Ca 8,4-9,5 mg/dL'
        ],
        criteriosEncaminhamento: [
          'TFG <30 (G4-5): nefrologista para preparacao TRS',
          'Proteinuria >500 mg/dia ou hematuria glomerular',
          'Queda rapida TFG (>5/ano)',
          'DRC de etiologia incerta',
          'Hipercalemia ou complicacoes metabolicas refratarias'
        ],
        citations: [{ refId: 'kdigo-ckd-2024' }]
      },
      prevencao: {
        primaria: [
          'Controle de diabetes e hipertensao',
          'Evitar obesidade',
          'Evitar tabagismo',
          'Uso criterioso de nefrotoxicos'
        ],
        secundaria: [
          'Rastreamento de DRC em grupos de risco',
          'Intervencao precoce com IECA/BRA e iSGLT2'
        ],
        citations: [{ refId: 'kdigo-ckd-2024' }]
      },
      populacoesEspeciais: {
        idosos: 'TFG declina naturalmente; avaliar funcionalidade; evitar hipotensao',
        gestantes: 'DRC aumenta risco de pre-eclampsia; IECA/BRA contraindicados',
        drc: 'Esta e a propria condicao',
        hepatopatas: 'Cuidado com sindrome hepatorrenal; ajuste de medicacoes'
      }
    },
    protocolos: ['drc-estadiamento-kdigo', 'drc-manejo-aps'],
    medicamentos: ['enalapril', 'losartana', 'dapagliflozina', 'empagliflozina', 'finerenona'],
    calculadoras: ['tfg-ckd-epi', 'risco-cv-drc'],
    rastreamentos: ['rastreamento-drc-diabeticos'],
    citations: [{ refId: 'kdigo-ckd-2024' }, { refId: 'nejm-dapagliflozin-ckd-2020' }],
    lastUpdate: '2025-01',
    tags: ['DRC', 'insuficiencia-renal', 'cronica', 'KDIGO', 'proteinuria', 'iSGLT2']
  },

  // ============================================================================
  // GLOMERULOPATIAS PRIMARIAS
  // ============================================================================
  {
    id: 'glomerulonefrite-membranosa',
    titulo: 'Glomerulonefrite Membranosa',
    sinonimos: ['Nefropatia Membranosa', 'GNM', 'Membranous Nephropathy'],
    doid: 'DOID:10967',
    snomedCT: '236403004',
    meshId: 'D015433',
    umlsCui: 'C0017665',
    ciap2: ['U88'],
    cid10: ['N05.2', 'N03.2'],
    cid11: ['GB43.2'],
    categoria: 'urologico',
    subcategoria: 'glomerulopatias',
    quickView: {
      definicao: 'Glomerulopatia caracterizada por espessamento da membrana basal glomerular com depositos subepiteliais de IgG e C3. Principal causa de sindrome nefrotica em adultos caucasianos. 70-80% primaria (anti-PLA2R); 20-30% secundaria.',
      criteriosDiagnosticos: [
        'Sindrome nefrotica (proteinuria >3,5g/dia, hipoalbuminemia, edema)',
        'Biopsia renal: espessamento MBG, depositos subepiteliais',
        'Imunofluorescencia: IgG e C3 granular ao longo da MBG',
        'Anti-PLA2R positivo (70-80% dos casos primarios)',
        'Anti-THSD7A (3-5% dos primarios)',
        'Excluir causas secundarias (neoplasia, lupus, hepatite B, drogas)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Restricao de sodio',
          'Dieta normoproteica',
          'Controle do edema',
          'Anticoagulacao se albumina <2,5 g/dL (alto risco tromboembolico)'
        ],
        farmacologico: [
          'TODOS: IECA ou BRA (maxima dose tolerada)',
          'BAIXO RISCO: Tratamento conservador 6 meses',
          'ALTO RISCO: Rituximabe 1g dias 1 e 15 (primeira linha)',
          'Alternativa: Ciclofosfamida + Corticoide (Ponticelli)',
          'Ciclosporina se contraindicacao a rituximabe'
        ]
      },
      metasTerapeuticas: [
        'Remissao da proteinuria (parcial <3,5g/dia; completa <0,3g/dia)',
        'Prevenir progressao para DRC',
        'Prevenir tromboembolismo',
        'Negativacao do anti-PLA2R'
      ],
      examesIniciais: [
        'Proteinuria 24h ou RAC',
        'Albumina serica',
        'Anti-PLA2R serico',
        'Funcao renal (Cr, TFG)',
        'Perfil lipidico',
        'Biopsia renal (confirmacao)',
        'Rastreamento neoplasia (se >50 anos ou suspeita)'
      ],
      redFlags: [
        'Trombose venosa profunda ou embolia pulmonar',
        'Albumina <2,0 g/dL (alto risco trombotico)',
        'Queda rapida da TFG',
        'Suspeita de neoplasia subjacente',
        'Infeccao grave em imunossuprimidos'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-12/milhao (uma das glomerulopatias mais comuns)',
        incidencia: '1-2/100.000/ano',
        faixaEtaria: 'Pico 50-60 anos; raro em criancas',
        fatoresRisco: [
          'Idade >50 anos',
          'Sexo masculino discretamente mais comum',
          'Neoplasias (10-20% dos casos em idosos)',
          'Hepatite B',
          'Lupus eritematoso sistemico',
          'Uso de AINEs, ouro, penicilamina'
        ],
        citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
      },
      fisiopatologia: {
        texto: 'Na forma primaria, autoanticorpos (principalmente anti-PLA2R) ligam-se a antigenos podocitarios, formando imunocomplexos in situ. Ativacao do complemento (via das lectinas) causa lesao podocitaria e aumento da permeabilidade glomerular.',
        citations: [{ refId: 'nejm-membranous-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Sindrome nefrotica (80%): edema, proteinuria macica',
          'Proteinuria subnefrotica (20%)',
          'Hipertensao (30%)',
          'Hematuria microscopica (30-50%)',
          'Complicacoes tromboembolicas (TVP, TEP, trombose veia renal)'
        ],
        sinaisExameFisico: [
          'Edema periferico, anasarca',
          'Xantelasmas (hiperlipidemia)',
          'Sinais de trombose (assimetria de membros)'
        ],
        formasClinicas: [
          'Primaria (idiopatica): anti-PLA2R+ ou THSD7A+',
          'Secundaria: neoplasia, LES, hepatite B, drogas'
        ],
        citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
      },
      diagnostico: {
        criterios: [
          'Sindrome nefrotica',
          'Anti-PLA2R positivo (sensibilidade 70-80%)',
          'Biopsia renal: padrao membranoso'
        ],
        diagnosticoDiferencial: [
          'Glomeruloesclerose segmentar e focal',
          'Nefropatia diabetica',
          'Amiloidose renal',
          'Nefrite lupica classe V',
          'Glomerulonefrite membranoproliferativa'
        ],
        examesLaboratoriais: [
          'Anti-PLA2R serico',
          'Anti-THSD7A',
          'Complemento (C3, C4 normais na primaria)',
          'ANA, anti-dsDNA (excluir lupus)',
          'Sorologias hepatite B e C',
          'Rastreamento de neoplasia (>50 anos)'
        ],
        examesImagem: [
          'Ultrassom renal',
          'TC torax/abdome se suspeita de neoplasia'
        ],
        outrosExames: [
          'Biopsia renal: MO, IF, ME'
        ],
        citations: [{ refId: 'nejm-membranous-2022' }]
      },
      tratamento: {
        objetivos: [
          'Remissao da proteinuria',
          'Preservar funcao renal',
          'Prevenir tromboembolismo'
        ],
        naoFarmacologico: {
          medidas: [
            'Restricao de sodio',
            'Dieta normoproteica (nao hipoproteica)',
            'Estatina para dislipidemia nefrotica',
            'Anticoagulacao profilatica se albumina <2,5 g/dL'
          ],
          citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Anti-CD20', medicamentos: ['Rituximabe'], posologia: '1g IV dias 1 e 15; ou 375mg/m2 semanal x4', observacoes: 'Primeira linha em alto risco (KDIGO 2021)' },
            { classe: 'IECA/BRA', medicamentos: ['Enalapril', 'Losartana'], posologia: 'Dose maxima tolerada', observacoes: 'Todos os pacientes; antiproteinurico' }
          ],
          segundaLinha: [
            { classe: 'Ciclofosfamida + Corticoide', medicamentos: ['Ciclofosfamida', 'Metilprednisolona'], posologia: 'Esquema Ponticelli modificado', observacoes: 'Alternativa ao rituximabe' },
            { classe: 'Inibidor calcineurina', medicamentos: ['Ciclosporina', 'Tacrolimus'], posologia: 'Ciclosporina 3-5mg/kg/dia', observacoes: 'Se CI a rituximabe e ciclofosfamida' }
          ],
          situacoesEspeciais: [
            { situacao: 'Baixo risco (Cr normal, anti-PLA2R baixo)', conduta: 'Tratamento conservador por 6 meses; 30% remissao espontanea' },
            { situacao: 'Secundaria', conduta: 'Tratar causa de base; imunoterapia nao indicada' }
          ],
          citations: [{ refId: 'kdigo-glomerulonephritis-2021' }, { refId: 'nejm-mentor-rituximab-2019' }]
        },
        duracao: 'Monitorar anti-PLA2R; tratamento ate remissao'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal no inicio; apos estabilizacao 3-6 meses',
        examesControle: [
          'Proteinuria e RAC',
          'Anti-PLA2R serico (predictor de recidiva)',
          'Funcao renal',
          'Albumina serica'
        ],
        metasTerapeuticas: [
          'Remissao parcial: proteinuria <3,5g/dia + estabilidade renal',
          'Remissao completa: proteinuria <0,3g/dia',
          'Negativacao anti-PLA2R'
        ],
        criteriosEncaminhamento: [
          'Todos: nefrologista',
          'Sindrome nefrotica: internacao se anasarca ou trombose',
          'Oncologia se neoplasia detectada'
        ],
        citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
      }
    },
    protocolos: ['gnm-rituximabe', 'gnm-ponticelli'],
    medicamentos: ['rituximabe', 'ciclofosfamida', 'ciclosporina', 'enalapril'],
    calculadoras: ['risco-gnm-toronto'],
    rastreamentos: [],
    citations: [{ refId: 'kdigo-glomerulonephritis-2021' }, { refId: 'nejm-membranous-2022' }],
    lastUpdate: '2025-01',
    tags: ['membranosa', 'glomerulonefrite', 'nefrotica', 'anti-PLA2R', 'rituximabe']
  },

  {
    id: 'nefropatia-iga',
    titulo: 'Nefropatia por IgA',
    sinonimos: ['Doenca de Berger', 'IgA Nephropathy', 'NIgA'],
    doid: 'DOID:10580',
    snomedCT: '236407003',
    meshId: 'D005922',
    umlsCui: 'C0017661',
    ciap2: ['U88'],
    cid10: ['N02.8'],
    cid11: ['GB44.0'],
    categoria: 'urologico',
    subcategoria: 'glomerulopatias',
    quickView: {
      definicao: 'Glomerulonefrite mais comum no mundo, caracterizada por depositos mesangiais de IgA. Apresentacao variavel: hematuria macroscopica recorrente, hematuria microscopica persistente ou sindrome nefrotica. Progressao para DRC em 30-40% em 20 anos.',
      criteriosDiagnosticos: [
        'Diagnostico histopatologico (biopsia renal obrigatoria)',
        'Imunofluorescencia: depositos mesangiais de IgA dominante ou codominante',
        'Microscopia optica: proliferacao mesangial variavel',
        'Classificacao Oxford (MEST-C): M, E, S, T, C',
        'Excluir causas secundarias de depositos de IgA (cirrose, HIV, DII)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Restricao de sodio',
          'Cessacao do tabagismo',
          'Controle pressórico estrito'
        ],
        farmacologico: [
          'TODOS: IECA ou BRA (maxima dose tolerada) - reduz proteinuria',
          'Inibidor SGLT2 (Dapagliflozina) - beneficio comprovado em IgAN',
          'ALTO RISCO (proteinuria >1g apesar de tratamento suportivo):',
          'Corticoterapia sistemica (protocolos TESTING ou Pozzi)',
          'Budesonida de liberacao direcionada (Nefecon/Tarpeyo)'
        ]
      },
      metasTerapeuticas: [
        'Proteinuria <1g/dia (ideal <0,5g/dia)',
        'PA <130/80 mmHg',
        'Preservar funcao renal',
        'Prevenir progressao para DRC terminal'
      ],
      examesIniciais: [
        'Proteinuria 24h ou RAC',
        'Creatinina e TFG',
        'Sedimento urinario (hematuria)',
        'Complemento C3, C4 (geralmente normais)',
        'IgA serica (elevada em 50%)',
        'Biopsia renal (confirmacao diagnostica)'
      ],
      redFlags: [
        'Proteinuria >3g/dia',
        'TFG <30 mL/min ao diagnostico',
        'Crescentes em >50% dos glomerulos',
        'Hematuria macroscopica com lesao renal aguda',
        'Progressao rapida da DRC'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Glomerulonefrite primaria mais comum mundialmente',
        incidencia: '2,5/100.000/ano; maior em asiaticos e caucasianos',
        mortalidade: '30-40% evoluem para DRCT em 20-30 anos',
        faixaEtaria: 'Pico na 2a-3a decada; homens 2:1',
        fatoresRisco: [
          'Sexo masculino',
          'Ascendencia asiatica',
          'Historia familiar',
          'Fatores geneticos (GWAS identificou loci de risco)'
        ],
        citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
      },
      fisiopatologia: {
        texto: 'Producao de IgA1 com deficiencia de galactosilacao (Gd-IgA1) leva a formacao de autoanticorpos e imunocomplexos circulantes. Deposicao mesangial ativa complemento via lectinas, causando proliferacao mesangial e lesao glomerular.',
        citations: [{ refId: 'nejm-igan-pathophysiology-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Hematuria macroscopica episodica sinfaringitica (40-50%)',
          'Hematuria microscopica persistente assintomatica (30-40%)',
          'Proteinuria (presente na maioria)',
          'Hipertensao (30%)',
          'Sindrome nefrotica ou nefritica (10%)'
        ],
        sinaisExameFisico: [
          'Pode ser normal',
          'Hipertensao arterial',
          'Edema se sindrome nefrotica'
        ],
        formasClinicas: [
          'Hematuria macroscopica recorrente (melhor prognostico)',
          'Hematuria microscopica com proteinuria',
          'Sindrome nefrotica',
          'Glomerulonefrite rapidamente progressiva (rara)'
        ],
        citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
      },
      diagnostico: {
        criterios: [
          'Biopsia renal com depositos mesangiais de IgA',
          'Classificacao Oxford MEST-C obrigatoria',
          'Excluir formas secundarias'
        ],
        diagnosticoDiferencial: [
          'Sindrome de Alport',
          'Doenca de membrana basal fina',
          'Purpura de Henoch-Schonlein (IgA vasculitis)',
          'Nefrite lupica'
        ],
        examesLaboratoriais: [
          'Urinalise e sedimento',
          'Proteinuria',
          'IgA serica',
          'Complemento (geralmente normal)',
          'Funcao renal'
        ],
        examesImagem: [
          'Ultrassom renal'
        ],
        outrosExames: [
          'Biopsia renal obrigatoria para diagnostico'
        ],
        citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
      },
      tratamento: {
        objetivos: [
          'Reduzir proteinuria para <1g/dia',
          'Controle pressórico rigoroso',
          'Preservar funcao renal'
        ],
        naoFarmacologico: {
          medidas: [
            'Restricao de sodio',
            'Cessacao tabagismo',
            'Controle de peso'
          ],
          citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'IECA/BRA', medicamentos: ['Enalapril', 'Losartana', 'Irbesartana'], posologia: 'Dose maxima tolerada', observacoes: 'Base do tratamento; meta proteinuria <1g' },
            { classe: 'Inibidor SGLT2', medicamentos: ['Dapagliflozina'], posologia: '10mg/dia', observacoes: 'Estudo DAPA-CKD incluiu IgAN; beneficio comprovado' }
          ],
          segundaLinha: [
            { classe: 'Corticoide sistemico', medicamentos: ['Prednisona', 'Metilprednisolona'], posologia: 'Protocolo TESTING modificado', observacoes: 'Se proteinuria >1g apesar de tratamento otimizado por 3-6 meses' },
            { classe: 'Budesonida enteral', medicamentos: ['Nefecon (TRF-budesonida)'], posologia: '16mg/dia por 9 meses', observacoes: 'Liberacao direcionada ao ileo; menos efeitos sistemicos' }
          ],
          situacoesEspeciais: [
            { situacao: 'GNRP com crescentes', conduta: 'Metilprednisolona IV + ciclofosfamida' },
            { situacao: 'Sindrome nefrotica', conduta: 'Considerar corticoide; avaliar sobreposicao de lesoes' }
          ],
          citations: [{ refId: 'kdigo-glomerulonephritis-2021' }, { refId: 'lancet-testing-2022' }]
        },
        duracao: 'Tratamento suportivo continuo; imunoterapia por tempo definido'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; mais frequente se ativo',
        examesControle: [
          'Proteinuria e RAC',
          'Funcao renal',
          'Hematuria',
          'PA'
        ],
        metasTerapeuticas: [
          'Proteinuria <1g/dia (ideal <0,5g)',
          'PA <130/80',
          'Estabilidade da TFG'
        ],
        criteriosEncaminhamento: [
          'Todos: nefrologista para biopsia e manejo',
          'Alto risco: centro de referencia'
        ],
        citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
      }
    },
    protocolos: ['igan-testing-protocol', 'igan-suportivo'],
    medicamentos: ['enalapril', 'losartana', 'dapagliflozina', 'nefecon'],
    calculadoras: ['igan-risk-calculator', 'oxford-mest-c'],
    rastreamentos: [],
    citations: [{ refId: 'kdigo-glomerulonephritis-2021' }, { refId: 'lancet-testing-2022' }],
    lastUpdate: '2025-01',
    tags: ['IgA', 'glomerulonefrite', 'hematuria', 'Berger', 'MEST-C']
  },

  {
    id: 'gesf',
    titulo: 'Glomeruloesclerose Segmentar e Focal',
    sinonimos: ['GESF', 'FSGS', 'Focal Segmental Glomerulosclerosis'],
    doid: 'DOID:1312',
    snomedCT: '236399007',
    meshId: 'D005923',
    umlsCui: 'C0017668',
    ciap2: ['U88'],
    cid10: ['N05.1', 'N03.1'],
    cid11: ['GB43.1'],
    categoria: 'urologico',
    subcategoria: 'glomerulopatias',
    quickView: {
      definicao: 'Padrao histopatologico caracterizado por esclerose de parte (segmentar) de alguns (focal) glomerulos. Pode ser primaria (idiopatica), genetica, ou secundaria (adaptativa, por virus, drogas). Principal causa de sindrome nefrotica em afro-americanos.',
      criteriosDiagnosticos: [
        'Biopsia renal: esclerose segmentar e focal',
        'Classicamente: sindrome nefrotica',
        'Classificacao de Columbia: tip, perihilar, cellular, collapsing, NOS',
        'GESF primaria: inicio abrupto, proteinuria macica, sem causa secundaria',
        'Investigar causas secundarias: obesidade, refluxo, HIV, heroina, anemia falciforme'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Restricao de sodio',
          'Controle de peso (se obesidade associada)',
          'Evitar nefrotoxicos'
        ],
        farmacologico: [
          'IECA ou BRA em todos',
          'GESF PRIMARIA: Prednisona 1mg/kg/dia (max 80mg) por minimo 4-16 semanas',
          'Se resistente a corticoide: Inibidor calcineurina (Ciclosporina, Tacrolimus)',
          'GESF SECUNDARIA: Tratar causa de base; imunoterapia nao indicada'
        ]
      },
      metasTerapeuticas: [
        'Remissao completa: proteinuria <0,3g/dia',
        'Remissao parcial: reducao >50% e <3,5g/dia',
        'Preservar funcao renal'
      ],
      examesIniciais: [
        'Proteinuria 24h ou RAC',
        'Albumina serica',
        'Funcao renal',
        'Perfil lipidico',
        'Sorologia HIV',
        'Biopsia renal',
        'Teste genetico se suspeita de forma familiar'
      ],
      redFlags: [
        'Variante collapsing (pior prognostico, investigar HIV)',
        'Proteinuria macica persistente',
        'Rapida progressao para DRC',
        'Resistencia a corticoide',
        'Recidiva precoce pos-transplante'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Causa mais comum de sindrome nefrotica em adultos negros',
        incidencia: '2-3/100.000/ano; aumentando',
        mortalidade: '50% evoluem para DRCT em 10 anos se nao tratados',
        faixaEtaria: 'Qualquer idade; pico na 4a-5a decada',
        fatoresRisco: [
          'Ascendencia africana (variantes APOL1)',
          'Obesidade',
          'Uso de heroina/cocaina',
          'Infeccao por HIV',
          'Anemia falciforme',
          'Refluxo vesicoureteral'
        ],
        citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
      },
      fisiopatologia: {
        texto: 'Na GESF primaria, fator circulante permeabilizante (suPAR?) causa lesao podocitaria e desprendimento, levando a desnudamento da MBG e esclerose. Variantes geneticas de APOL1 em africanos aumentam susceptibilidade. GESF secundaria resulta de hiperfiltração adaptativa.',
        citations: [{ refId: 'nejm-fsgs-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Sindrome nefrotica (60-75%): edema, proteinuria macica',
          'Proteinuria subnefrotica',
          'Hipertensao (30-50%)',
          'Hematuria microscopica (20-30%)',
          'DRC ao diagnostico (frequente)'
        ],
        sinaisExameFisico: [
          'Edema periferico, anasarca',
          'Hipertensao',
          'Obesidade (se forma adaptativa)'
        ],
        formasClinicas: [
          'Primaria (idiopatica)',
          'Genetica (NPHS1, NPHS2, ACTN4, TRPC6, INF2, APOL1)',
          'Secundaria adaptativa (obesidade, agenesia renal)',
          'Secundaria por virus (HIV collapsing)',
          'Secundaria por drogas (heroina, pamidronato)'
        ],
        citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
      },
      diagnostico: {
        criterios: [
          'Biopsia renal com padrao GESF',
          'Classificacao de Columbia',
          'Exclusao de formas secundarias'
        ],
        diagnosticoDiferencial: [
          'Doenca de lesoes minimas',
          'Nefropatia diabetica nodular',
          'Amiloidose',
          'Glomerulonefrite membranosa'
        ],
        examesLaboratoriais: [
          'Proteinuria',
          'Albumina',
          'Funcao renal',
          'HIV',
          'Painel genetico se <25 anos ou historia familiar'
        ],
        examesImagem: [
          'Ultrassom renal (tamanho, ecogenicidade)'
        ],
        outrosExames: [
          'Biopsia renal (minimo 8 glomerulos; pode sub-amostrar)'
        ],
        citations: [{ refId: 'nejm-fsgs-2021' }]
      },
      tratamento: {
        objetivos: [
          'Remissao da proteinuria',
          'Preservar funcao renal',
          'Evitar toxicidade de drogas'
        ],
        naoFarmacologico: {
          medidas: [
            'Restricao de sodio',
            'Controle de peso',
            'Evitar AINEs e nefrotoxicos'
          ],
          citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide', medicamentos: ['Prednisona'], posologia: '1mg/kg/dia (max 80mg) por 4-16 semanas', observacoes: 'GESF primaria; resposta em 30-50%' },
            { classe: 'IECA/BRA', medicamentos: ['Enalapril', 'Losartana'], posologia: 'Dose maxima tolerada', observacoes: 'Todos os pacientes' }
          ],
          segundaLinha: [
            { classe: 'Inibidor calcineurina', medicamentos: ['Ciclosporina', 'Tacrolimus'], posologia: 'Ciclosporina 3-5mg/kg/dia por 4-6 meses', observacoes: 'Cortico-resistente ou dependente' },
            { classe: 'Micofenolato', medicamentos: ['Micofenolato mofetil'], posologia: '1-2g/dia', observacoes: 'Alternativa; menos evidencia' }
          ],
          situacoesEspeciais: [
            { situacao: 'GESF genetica', conduta: 'Imunoterapia geralmente ineficaz; suporte' },
            { situacao: 'GESF secundaria', conduta: 'Tratar causa de base; IECA/BRA; evitar imunoterapia' },
            { situacao: 'Collapsing (HIV)', conduta: 'TARV + IECA/BRA; corticoide controverso' }
          ],
          citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
        },
        duracao: 'Corticoide: resposta avaliada em 4-16 semanas; desmame lento'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal durante tratamento ativo; 3-6 meses apos estabilizacao',
        examesControle: [
          'Proteinuria',
          'Funcao renal',
          'Albumina',
          'Efeitos adversos de drogas'
        ],
        metasTerapeuticas: [
          'Remissao completa <0,3g/dia',
          'Remissao parcial >50% reducao e <3,5g/dia'
        ],
        criteriosEncaminhamento: [
          'Todos: nefrologista',
          'Resistente: centro de referencia',
          'Preparar transplante se DRC avancada (alto risco recidiva)'
        ],
        citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
      }
    },
    protocolos: ['gesf-tratamento-kdigo'],
    medicamentos: ['prednisona', 'ciclosporina', 'tacrolimus', 'micofenolato'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'kdigo-glomerulonephritis-2021' }, { refId: 'nejm-fsgs-2021' }],
    lastUpdate: '2025-01',
    tags: ['GESF', 'FSGS', 'glomeruloesclerose', 'nefrotica', 'APOL1']
  },

  {
    id: 'sindrome-nefrotica',
    titulo: 'Sindrome Nefrotica',
    sinonimos: ['Nephrotic Syndrome', 'SN'],
    doid: 'DOID:1184',
    snomedCT: '52254009',
    meshId: 'D009404',
    umlsCui: 'C0027726',
    ciap2: ['U88'],
    cid10: ['N04', 'N04.0', 'N04.1', 'N04.2', 'N04.9'],
    cid11: ['GB40'],
    categoria: 'urologico',
    subcategoria: 'glomerulopatias',
    quickView: {
      definicao: 'Sindrome clinica caracterizada por proteinuria macica (>3,5g/dia ou RAC >3500mg/g), hipoalbuminemia (<3g/dL), edema e hiperlipidemia. Resulta de diversas glomerulopatias. Complicacoes graves: tromboembolismo, infeccoes, IRA.',
      criteriosDiagnosticos: [
        'Proteinuria >3,5g/24h ou RAC >3500mg/g',
        'Hipoalbuminemia <3,0 g/dL',
        'Edema periferico',
        'Hiperlipidemia (aumento de LDL, colesterol total)',
        'Identificar etiologia (biopsia renal em adultos)',
        'Causas: DLM, GESF, membranosa, diabetica, amiloidose'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Restricao de sodio (<2g/dia)',
          'Restricao hidrica se edema grave',
          'Elevacao de membros',
          'Mobilizacao (prevenir TVP)'
        ],
        farmacologico: [
          'CONTROLE DO EDEMA: Furosemida (altas doses podem ser necessarias)',
          'ANTIPROTEINURICO: IECA ou BRA',
          'DISLIPIDEMIA: Estatina',
          'ANTICOAGULACAO: Se albumina <2,5g/dL ou trombose',
          'IMUNOSSUPRESSAO: Conforme doenca de base'
        ]
      },
      metasTerapeuticas: [
        'Controle do edema',
        'Proteinuria <1g/dia (idealmente remissao)',
        'Albumina >3g/dL',
        'Prevenir complicacoes (trombose, infeccao)'
      ],
      examesIniciais: [
        'Proteinuria 24h ou RAC',
        'Albumina serica',
        'Perfil lipidico',
        'Funcao renal',
        'Complemento C3, C4',
        'ANA, anti-dsDNA',
        'Sorologias (hepatite B, C, HIV)',
        'Glicemia/HbA1c',
        'Biopsia renal (adultos)'
      ],
      redFlags: [
        'Trombose venosa (TVP, TEP, trombose veia renal)',
        'Infeccao bacteriana grave (peritonite, celulite)',
        'Lesao renal aguda',
        'Edema pulmonar/anasarca refrataria',
        'Albumina <2,0 g/dL'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Variavel conforme causa de base',
        incidencia: '3/100.000 adultos; 2-7/100.000 criancas',
        faixaEtaria: 'Criancas: predomina DLM; Adultos: GNM, GESF, diabetica',
        fatoresRisco: [
          'Diabetes mellitus',
          'Infeccoes (hepatite B, HIV)',
          'Neoplasias',
          'Uso de drogas (AINEs, heroina)',
          'Doencas autoimunes (LES)'
        ],
        citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
      },
      fisiopatologia: {
        texto: 'Lesao glomerular (podocitaria principalmente) causa aumento da permeabilidade a proteinas. Perda urinaria de albumina leva a reducao da pressao oncotica e edema. Figado aumenta sintese de lipoproteinas (hiperlipidemia) e fatores de coagulacao (hipercoagulabilidade).',
        citations: [{ refId: 'nejm-nephrotic-syndrome-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Edema: palpebral matutino, membros inferiores, anasarca',
          'Urina espumosa (proteinuria)',
          'Ganho de peso',
          'Fadiga, mal-estar',
          'Dispneia (derrame pleural, edema pulmonar)'
        ],
        sinaisExameFisico: [
          'Edema depressivel (cacifo +)',
          'Ascite',
          'Derrame pleural',
          'Xantelasmas (hiperlipidemia cronica)',
          'Linhas de Muehrcke (unhas)'
        ],
        formasClinicas: [
          'Primaria: DLM, GESF, membranosa, IgA',
          'Secundaria: diabetica, lupica, amiloidose, infecciosa'
        ],
        citations: [{ refId: 'nejm-nephrotic-syndrome-2022' }]
      },
      diagnostico: {
        criterios: [
          'Proteinuria >3,5g/24h',
          'Hipoalbuminemia <3,0g/dL',
          'Edema clinico',
          'Biopsia renal para etiologia (adultos)'
        ],
        diagnosticoDiferencial: [
          'Sindrome nefritica',
          'Insuficiencia cardiaca',
          'Cirrose hepatica',
          'Enteropatia perdedora de proteina'
        ],
        examesLaboratoriais: [
          'Proteinuria 24h e RAC',
          'Albumina serica',
          'Perfil lipidico',
          'Funcao renal, eletrolitos',
          'Complemento',
          'ANA, anti-dsDNA',
          'Sorologias virais',
          'Eletroforese de proteinas'
        ],
        examesImagem: [
          'Ultrassom renal',
          'Doppler de veias renais se suspeita de trombose'
        ],
        outrosExames: [
          'Biopsia renal em adultos'
        ],
        citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
      },
      tratamento: {
        objetivos: [
          'Controle do edema',
          'Reducao da proteinuria',
          'Prevencao de complicacoes',
          'Tratamento da doenca de base'
        ],
        naoFarmacologico: {
          medidas: [
            'Restricao de sodio <2g/dia',
            'Restricao hidrica se hiponatremia',
            'Mobilizacao precoce',
            'Dieta normoproteica'
          ],
          citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Diuretico de alca', medicamentos: ['Furosemida'], posologia: '40-160mg/dia ou mais (resistencia comum)', observacoes: 'IV se anasarca; associar tiazidico se refratario' },
            { classe: 'IECA/BRA', medicamentos: ['Enalapril', 'Losartana'], posologia: 'Dose maxima tolerada', observacoes: 'Antiproteinurico' },
            { classe: 'Estatina', medicamentos: ['Atorvastatina'], posologia: '20-40mg/dia', observacoes: 'Dislipidemia nefrotica' }
          ],
          segundaLinha: [
            { classe: 'Anticoagulacao', medicamentos: ['Enoxaparina', 'Varfarina'], posologia: 'Profilatica ou terapeutica', observacoes: 'Se albumina <2,5g/dL ou trombose documentada' },
            { classe: 'Imunossupressor', medicamentos: ['Conforme doenca de base'], posologia: 'Variavel', observacoes: 'Corticoide, rituximabe, ciclofosfamida conforme etiologia' }
          ],
          situacoesEspeciais: [
            { situacao: 'Edema refratario', conduta: 'Furosemida IV + albumina 20% (controverso); ultrafiltração' },
            { situacao: 'Infeccao grave', conduta: 'ATB precoce; encapsulados mais comuns; vacinar pneumococo' }
          ],
          citations: [{ refId: 'nejm-nephrotic-syndrome-2022' }]
        },
        duracao: 'Tratamento da causa de base determina duracao'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal durante fase aguda; mensal apos estabilizacao',
        examesControle: [
          'Peso diario (edema)',
          'Proteinuria',
          'Albumina',
          'Funcao renal',
          'Perfil lipidico'
        ],
        metasTerapeuticas: [
          'Edema controlado',
          'Proteinuria <3,5g/dia (idealmente remissao)',
          'Albumina >3g/dL',
          'Ausencia de complicacoes'
        ],
        criteriosEncaminhamento: [
          'Todos: nefrologista',
          'Trombose: anticoagulacao urgente',
          'Infeccao grave: internacao'
        ],
        citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
      }
    },
    protocolos: ['sindrome-nefrotica-manejo'],
    medicamentos: ['furosemida', 'enalapril', 'atorvastatina', 'enoxaparina'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'kdigo-glomerulonephritis-2021' }, { refId: 'nejm-nephrotic-syndrome-2022' }],
    lastUpdate: '2025-01',
    tags: ['nefrotica', 'proteinuria', 'edema', 'hipoalbuminemia', 'trombose']
  },

  // ============================================================================
  // NEFRITES SISTEMICAS
  // ============================================================================
  {
    id: 'nefrite-lupica',
    titulo: 'Nefrite Lupica',
    sinonimos: ['Lupus Nephritis', 'LN', 'Nefropatia Lupica'],
    doid: 'DOID:0080162',
    snomedCT: '68815009',
    meshId: 'D008181',
    umlsCui: 'C0024143',
    ciap2: ['U88'],
    cid10: ['M32.1'],
    cid11: ['FA21.Z'],
    categoria: 'urologico',
    subcategoria: 'nefropatias_sistemicas',
    quickView: {
      definicao: 'Acometimento renal do LES, presente em 50-70% dos pacientes. Classificacao ISN/RPS em 6 classes. Classes III/IV (proliferativas) e V (membranosa) sao as mais graves. Principal causa de morbimortalidade no LES.',
      criteriosDiagnosticos: [
        'Paciente com LES (criterios ACR/EULAR)',
        'Proteinuria >0,5g/24h ou RAC >500mg/g',
        'Sedimento urinario ativo (hematuria, cilindros)',
        'Biopsia renal (classificacao ISN/RPS obrigatoria):',
        'Classe I: mesangial minima; II: mesangial proliferativa',
        'Classe III: focal; IV: difusa (piores prognosticos)',
        'Classe V: membranosa; VI: esclerosante'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Fotoproteção (evitar flares)',
          'Cessacao tabagismo',
          'Controle de comorbidades'
        ],
        farmacologico: [
          'TODOS COM LES: Hidroxicloroquina 200-400mg/dia',
          'CLASSE III/IV - INDUCAO:',
          'Micofenolato 2-3g/dia + Corticoide OU',
          'Ciclofosfamida Euro-Lupus + Corticoide',
          'CLASSE III/IV - MANUTENCAO: Micofenolato ou Azatioprina',
          'CLASSE V PURA: Micofenolato + IECA/BRA',
          'REFRATARIO: Rituximabe, Belimumabe, Voclosporina'
        ]
      },
      metasTerapeuticas: [
        'Resposta renal completa: Cr normal + proteinuria <0,5g/dia',
        'Resposta parcial: reducao >50% proteinuria, sem piora Cr',
        'Prevenir flares',
        'Prevenir DRC terminal'
      ],
      examesIniciais: [
        'Creatinina e TFG',
        'Proteinuria 24h ou RAC',
        'Sedimento urinario',
        'Complemento C3, C4 (consumidos)',
        'Anti-dsDNA (correlaciona com atividade)',
        'Hemograma, perfil hepatico',
        'Biopsia renal (confirmacao e classificacao)'
      ],
      redFlags: [
        'GNRP com crescentes',
        'Proteinuria >3,5g/dia com queda rapida TFG',
        'Flare grave durante tratamento',
        'Classe IV com indice de cronicidade alto',
        'Hipertensao maligna'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '50-70% dos pacientes com LES desenvolvem nefrite',
        incidencia: 'Mais comum em negros, hispanicos e asiaticos',
        mortalidade: 'Sobrevida renal 80-90% em 10 anos com tratamento moderno',
        faixaEtaria: 'LES predomina em mulheres jovens (15-45 anos)',
        fatoresRisco: [
          'Sexo masculino (pior prognostico)',
          'Ascendencia africana ou asiatica',
          'Inicio precoce do LES (<18 anos)',
          'Niveis elevados de anti-dsDNA',
          'Hipocomplementemia persistente'
        ],
        citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
      },
      fisiopatologia: {
        texto: 'Deposicao de imunocomplexos (DNA-anti-dsDNA) nos glomerulos ativa complemento e recruta celulas inflamatorias. Padrao de deposicao determina a classe: mesangial, subendotelial (proliferativa), subepitelial (membranosa).',
        citations: [{ refId: 'nejm-lupus-nephritis-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Muitas vezes assintomatica inicialmente',
          'Edema (sindrome nefrotica na classe V)',
          'Hematuria macro ou microscopica',
          'Hipertensao',
          'Manifestacoes extrarenais do LES'
        ],
        sinaisExameFisico: [
          'Edema',
          'Hipertensao',
          'Manifestacoes cutaneas do LES (rash malar)',
          'Artrite',
          'Serosites'
        ],
        formasClinicas: [
          'Classe I: minima alteracao mesangial',
          'Classe II: proliferacao mesangial',
          'Classe III: GN focal (<50% glomerulos)',
          'Classe IV: GN difusa (>=50% glomerulos)',
          'Classe V: membranosa',
          'Classe VI: esclerosante avancada'
        ],
        citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
      },
      diagnostico: {
        criterios: [
          'LES confirmado + envolvimento renal',
          'Biopsia renal com classificacao ISN/RPS',
          'Indices de atividade e cronicidade'
        ],
        diagnosticoDiferencial: [
          'Outras glomerulopatias primarias',
          'Nefrite por drogas',
          'Microangiopatia trombotica',
          'Nefropatia por sindrome antifosfolipide'
        ],
        examesLaboratoriais: [
          'Proteinuria e RAC',
          'Sedimento urinario',
          'Creatinina e TFG',
          'Complemento C3, C4',
          'Anti-dsDNA, anti-Sm',
          'Anticorpos antifosfolipides'
        ],
        examesImagem: [
          'Ultrassom renal'
        ],
        outrosExames: [
          'Biopsia renal obrigatoria'
        ],
        citations: [{ refId: 'nejm-lupus-nephritis-2022' }]
      },
      tratamento: {
        objetivos: [
          'Inducao de remissao',
          'Manutencao da remissao',
          'Prevencao de flares',
          'Preservacao da funcao renal'
        ],
        naoFarmacologico: {
          medidas: [
            'Fotoproteção',
            'Cessacao tabagismo',
            'Controle PA e dislipidemia',
            'Vacinacao (antes de imunossupressao)'
          ],
          citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antimalárico', medicamentos: ['Hidroxicloroquina'], posologia: '200-400mg/dia', observacoes: 'Todos os pacientes com LES; reduz flares e mortalidade' },
            { classe: 'Inducao Classe III/IV', medicamentos: ['Micofenolato', 'Ciclofosfamida'], posologia: 'MMF 2-3g/dia ou Euro-Lupus CFM', observacoes: 'Com corticoide; MMF preferido se gestacao futura' },
            { classe: 'Corticoide', medicamentos: ['Metilprednisolona', 'Prednisona'], posologia: 'Pulso 500-1000mg 3 dias, depois prednisona 0,5-1mg/kg', observacoes: 'Desmame ao longo de meses' }
          ],
          segundaLinha: [
            { classe: 'Manutencao', medicamentos: ['Micofenolato', 'Azatioprina'], posologia: 'MMF 1-2g/dia ou AZA 2mg/kg/dia', observacoes: 'Por minimo 3-5 anos' },
            { classe: 'Biologico', medicamentos: ['Rituximabe', 'Belimumabe', 'Voclosporina'], posologia: 'Belimumabe 10mg/kg mensal', observacoes: 'Refratarios ou add-on' }
          ],
          situacoesEspeciais: [
            { situacao: 'Classe V pura', conduta: 'Micofenolato + IECA/BRA; corticoide menor dose' },
            { situacao: 'GNRP com crescentes', conduta: 'Pulso de metilprednisolona + CFM ou MMF; plasmaferese controversa' },
            { situacao: 'Gestacao', conduta: 'Hidroxicloroquina segura; Azatioprina pode ser mantida; evitar MMF e CFM' }
          ],
          citations: [{ refId: 'kdigo-glomerulonephritis-2021' }, { refId: 'nejm-voclosporin-2021' }]
        },
        duracao: 'Inducao 6 meses; manutencao minimo 3-5 anos'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal durante inducao; 3-6 meses em manutencao',
        examesControle: [
          'Proteinuria e RAC',
          'Creatinina',
          'Complemento C3, C4',
          'Anti-dsDNA',
          'Hemograma (toxicidade)'
        ],
        metasTerapeuticas: [
          'Resposta completa em 12 meses',
          'C3/C4 normalizados',
          'Anti-dsDNA reduzido ou negativo',
          'Corticoide <=5mg/dia'
        ],
        criteriosEncaminhamento: [
          'Todos: nefrologista + reumatologista',
          'Refratarios: centro de lupus',
          'DRC avancada: preparar transplante'
        ],
        citations: [{ refId: 'kdigo-glomerulonephritis-2021' }]
      }
    },
    protocolos: ['nefrite-lupica-inducao', 'nefrite-lupica-manutencao'],
    medicamentos: ['hidroxicloroquina', 'micofenolato', 'ciclofosfamida', 'rituximabe', 'belimumabe'],
    calculadoras: ['sledai', 'slicc-danos'],
    rastreamentos: [],
    citations: [{ refId: 'kdigo-glomerulonephritis-2021' }, { refId: 'nejm-lupus-nephritis-2022' }],
    lastUpdate: '2025-01',
    tags: ['lupus', 'nefrite', 'LES', 'autoimune', 'micofenolato']
  },

  // ============================================================================
  // MICROANGIOPATIAS TROMBOTICAS
  // ============================================================================
  {
    id: 'shu-atipica',
    titulo: 'Sindrome Hemolitico-Uremica Atipica',
    sinonimos: ['aHUS', 'SHUa', 'Atypical Hemolytic Uremic Syndrome'],
    doid: 'DOID:0080356',
    snomedCT: '111407006',
    meshId: 'D065766',
    umlsCui: 'C3160734',
    ordo: ['ORPHA:2134'],
    ciap2: ['U99'],
    cid10: ['D59.3'],
    cid11: ['3B61'],
    categoria: 'hematologico',
    subcategoria: 'microangiopatias_tromboticas',
    quickView: {
      definicao: 'Microangiopatia trombotica causada por desregulacao da via alternativa do complemento. Triade: anemia hemolitica microangiopatica, trombocitopenia, lesao renal aguda. Diferencia-se da SHU tipica (STEC) e PTT. Doenca rara, potencialmente fatal.',
      criteriosDiagnosticos: [
        'Microangiopatia trombotica:',
        '- Anemia hemolitica Coombs-negativa com esquizocitos',
        '- Trombocitopenia',
        '- Lesao de orgao-alvo (rim principal)',
        'Excluir SHU por STEC (cultura, PCR Shiga toxina negativas)',
        'ADAMTS13 >10% (exclui PTT)',
        'Investigar mutacoes em genes do complemento (CFH, CFI, CFB, C3, MCP)',
        'Investigar anticorpos anti-CFH'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suporte em UTI',
          'Controle pressórico',
          'Dialise se necessario'
        ],
        farmacologico: [
          'TRATAMENTO EMERGENCIAL: Plasmaferese enquanto aguarda diagnóstico',
          'TRATAMENTO ESPECIFICO: Eculizumabe (inibidor de C5) - primeira linha',
          'Eculizumabe 900mg semanal x4, depois 1200mg a cada 2 semanas',
          'Vacinacao anti-meningococo OBRIGATORIA antes ou ATB profilatico',
          'Alternativa: Ravulizumabe (meia-vida longa)'
        ]
      },
      metasTerapeuticas: [
        'Normalizacao de plaquetas e hemoglobina',
        'Recuperacao da funcao renal',
        'Prevencao de recidivas',
        'LDH normalizada'
      ],
      examesIniciais: [
        'Hemograma com esfregaco (esquizocitos)',
        'LDH, bilirrubinas, haptoglobina',
        'Creatinina e ureia',
        'ADAMTS13 (>10% exclui PTT)',
        'Coombs direto (negativo)',
        'Cultura fezes e Shiga toxina (excluir STEC)',
        'Complemento C3, C4',
        'Painel genetico do complemento'
      ],
      redFlags: [
        'LRA oligoanúrica necessitando dialise',
        'Hipertensao maligna',
        'Envolvimento neurologico',
        'Envolvimento cardiaco',
        'Gravidez (pode desencadear SHUa)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '2-7/milhao (doenca rara)',
        incidencia: '0,5/milhao/ano',
        mortalidade: 'Historicamente 25% em 1 ano sem tratamento; <5% com eculizumabe',
        faixaEtaria: 'Qualquer idade; 60% adultos, 40% pediatricos',
        fatoresRisco: [
          'Mutacoes em genes do complemento (60%)',
          'Anticorpos anti-CFH (10%)',
          'Gatilhos: infeccoes, gestacao, drogas, transplante',
          'Historia familiar'
        ],
        citations: [{ refId: 'blood-ahus-2021' }]
      },
      fisiopatologia: {
        texto: 'Desregulacao da via alternativa do complemento leva a ativação descontrolada sobre superficies celulares proprias, especialmente endotelio renal. Deposicao de C3b e MAC causa lesao endotelial, trombose microvascular e consumo plaquetario.',
        citations: [{ refId: 'nejm-ahus-complement-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Palidez, ictericia (hemolise)',
          'Petequias, equimoses (trombocitopenia)',
          'Oliguria, edema (IRA)',
          'Hipertensao',
          'Sintomas neurologicos (20%)',
          'Dor abdominal'
        ],
        sinaisExameFisico: [
          'Palidez',
          'Ictericia leve',
          'Petequias',
          'Hipertensao',
          'Edema'
        ],
        formasClinicas: [
          'Primaria (genetica): mutacoes germinativas',
          'Adquirida: anticorpos anti-CFH',
          'Secundaria: gestacao, transplante, drogas (controverso)'
        ],
        citations: [{ refId: 'blood-ahus-2021' }]
      },
      diagnostico: {
        criterios: [
          'MAT (anemia hemolitica + trombocitopenia + lesao orgao)',
          'ADAMTS13 >10%',
          'STEC negativo',
          'Investigacao do complemento'
        ],
        diagnosticoDiferencial: [
          'PTT (ADAMTS13 <10%)',
          'SHU tipica por STEC',
          'HELLP syndrome',
          'Hipertensao maligna',
          'Crise renal esclerodermica'
        ],
        examesLaboratoriais: [
          'Hemograma com esfregaco',
          'LDH, bilirrubinas, haptoglobina, reticulocitos',
          'Coombs direto',
          'ADAMTS13',
          'Shiga toxina, cultura fezes',
          'Complemento C3 (frequentemente baixo)',
          'Painel genetico (CFH, CFI, MCP, C3, CFB)',
          'Anti-CFH'
        ],
        examesImagem: [
          'Ultrassom renal',
          'TC cranio se sintomas neurologicos'
        ],
        citations: [{ refId: 'nejm-ahus-complement-2022' }]
      },
      tratamento: {
        objetivos: [
          'Bloquear ativacao do complemento',
          'Recuperar funcao renal',
          'Prevenir dano de orgao permanente'
        ],
        naoFarmacologico: {
          medidas: [
            'Suporte em UTI',
            'Dialise se necessario',
            'Controle PA'
          ],
          citations: [{ refId: 'blood-ahus-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Inibidor de C5', medicamentos: ['Eculizumabe'], posologia: '900mg semanal x4, depois 1200mg 2/2 semanas', observacoes: 'Vacinar meningococo antes ou ATB profilatico' },
            { classe: 'Inibidor C5 longa acao', medicamentos: ['Ravulizumabe'], posologia: 'Peso-baseado; a cada 8 semanas', observacoes: 'Maior conveniencia' }
          ],
          segundaLinha: [
            { classe: 'Plasmaferese', medicamentos: ['Plasmaferese'], posologia: 'Diaria ate diagnostico', observacoes: 'Ponte ate eculizumabe; menos eficaz que na PTT' }
          ],
          situacoesEspeciais: [
            { situacao: 'Anticorpos anti-CFH', conduta: 'Eculizumabe + imunossupressao (micofenolato, rituximabe)' },
            { situacao: 'Gestacao', conduta: 'Eculizumabe seguro; manter apos parto (alto risco recidiva)' },
            { situacao: 'Transplante renal', conduta: 'Eculizumabe profilatico se mutacoes de alto risco' }
          ],
          citations: [{ refId: 'nejm-ahus-complement-2022' }]
        },
        duracao: 'Eculizumabe geralmente por tempo indeterminado; tentativa de suspensao em casos selecionados'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal no inicio; mensal apos estabilizacao',
        examesControle: [
          'Hemograma, LDH, haptoglobina',
          'Funcao renal',
          'Proteinuria'
        ],
        metasTerapeuticas: [
          'Plaquetas e Hb normais',
          'LDH normal',
          'Funcao renal estavel ou melhorando'
        ],
        criteriosEncaminhamento: [
          'Centro de referencia em MAT',
          'Nefrologista',
          'Hematologista',
          'Geneticista'
        ],
        citations: [{ refId: 'blood-ahus-2021' }]
      }
    },
    protocolos: ['shua-eculizumabe'],
    medicamentos: ['eculizumabe', 'ravulizumabe'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'blood-ahus-2021' }, { refId: 'nejm-ahus-complement-2022' }],
    lastUpdate: '2025-01',
    tags: ['SHUa', 'aHUS', 'complemento', 'eculizumabe', 'microangiopatia', 'rara']
  },

  // ============================================================================
  // DOENCAS RENAIS GENETICAS
  // ============================================================================
  {
    id: 'doenca-renal-policistica',
    titulo: 'Doenca Renal Policistica Autossomica Dominante',
    sinonimos: ['DRPAD', 'ADPKD', 'Rins Policisticos'],
    doid: 'DOID:0110121',
    snomedCT: '28728008',
    meshId: 'D016891',
    umlsCui: 'C0085413',
    ciap2: ['U99'],
    cid10: ['Q61', 'Q61.2'],
    cid11: ['LA95.0'],
    categoria: 'urologico',
    subcategoria: 'geneticas',
    quickView: {
      definicao: 'Doenca genetica autossomica dominante mais comum, causada por mutacoes em PKD1 (85%) ou PKD2 (15%). Caracterizada por cistos renais bilaterais progressivos levando a DRC. Manifestacoes extrarenais frequentes: cistos hepaticos, aneurismas cerebrais.',
      criteriosDiagnosticos: [
        'CRITERIOS ULTRASSONOGRAFICOS (com historia familiar):',
        '15-39 anos: >=3 cistos (uni ou bilateral)',
        '40-59 anos: >=2 cistos em cada rim',
        '>=60 anos: >=4 cistos em cada rim',
        'SEM historia familiar: bilateral, >=10 cistos/rim, aumento renal',
        'Teste genetico se criterios incertos',
        'PKD1: doenca mais precoce e grave',
        'PKD2: mais lento, DRCT ~10 anos depois'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratacao abundante (>3L/dia) - suprime vasopressina',
          'Restricao de sodio',
          'Dieta normoproteica',
          'Evitar cafeina (controverso)',
          'Exercicio moderado (evitar trauma)'
        ],
        farmacologico: [
          'TOLVAPTAN (antagonista V2): indicado se progressão rápida',
          'Tolvaptan: iniciar 45/15mg, titular ate 90/30mg',
          'Requer monitoramento hepatico rigoroso',
          'IECA/BRA: controle PA; meta <130/80 (ou <110/75 se jovem)',
          'Estatina: se DRC estabelecida'
        ]
      },
      metasTerapeuticas: [
        'PA <130/80 mmHg (ou <110/75 se jovem, TFG >60)',
        'Retardar crescimento renal e cistico',
        'Prevenir complicacoes (infeccao, sangramento, dor)',
        'Rastrear e tratar aneurismas cerebrais'
      ],
      examesIniciais: [
        'Ultrassom renal (diagnostico)',
        'Creatinina e TFG',
        'Proteinuria',
        'Ultrassom abdominal (cistos hepaticos)',
        'AngioRM cerebral se historia familiar de aneurisma',
        'Volume renal total (VRT) por RM - prognostico',
        'Teste genetico se duvida diagnostica'
      ],
      redFlags: [
        'Hematuria macroscopica (sangramento cistico)',
        'Febre e dor lombar (infeccao cistica)',
        'Cefaleia subita intensa (aneurisma roto)',
        'Declinio rapido TFG (progressao acelerada)',
        'Aumento rapido do volume renal'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1/400 a 1/1000 nascidos vivos; uma das geneticas mais comuns',
        incidencia: 'Representa 5-10% dos casos de DRCT',
        mortalidade: 'Sobrevida semelhante a populacao geral ate DRCT',
        faixaEtaria: 'Cistos desde infancia; DRC tipicamente 4a-6a decada',
        fatoresRisco: [
          'Mutacao PKD1 (mais grave que PKD2)',
          'Mutacao truncante (pior que nao-truncante)',
          'Sexo masculino (discretamente pior)',
          'Historia de hipertensao precoce',
          'Hematuria macroscopica precoce'
        ],
        citations: [{ refId: 'jasn-adpkd-2022' }]
      },
      fisiopatologia: {
        texto: 'Mutacoes em PKD1 ou PKD2 alteram policistinas 1 e 2, proteinas ciliares que regulam proliferacao e secrecao celular. Perda de funcao causa proliferacao epitelial tubular e secrecao de fluido, formando cistos. Cistos comprimem parenquima normal levando a DRC.',
        citations: [{ refId: 'nejm-adpkd-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Inicialmente assintomatico',
          'Dor lombar ou abdominal (efeito de massa)',
          'Hematuria macroscopica (sangramento cistico)',
          'Infeccoes urinarias recorrentes',
          'Hipertensao (precoce, antes de DRC)',
          'Nefrolitiase (acido urico, oxalato)'
        ],
        sinaisExameFisico: [
          'Rins palpáveis aumentados',
          'Hepatomegalia (cistos hepaticos)',
          'Hipertensao'
        ],
        formasClinicas: [
          'PKD1 (~85%): mais cistos, DRC mais precoce (idade media DRCT ~58 anos)',
          'PKD2 (~15%): mais lento (DRCT ~79 anos)',
          'Formas de novo (~10% sem historia familiar)'
        ],
        citations: [{ refId: 'jasn-adpkd-2022' }]
      },
      diagnostico: {
        criterios: [
          'Criterios ultrassonograficos conforme idade',
          'Historia familiar positiva (AD)',
          'Teste genetico se criterios incertos ou reprodução assistida'
        ],
        diagnosticoDiferencial: [
          'Cistos renais simples',
          'Doença renal policística autossômica recessiva',
          'Esclerose tuberosa',
          'Von Hippel-Lindau',
          'Doença cística medular'
        ],
        examesLaboratoriais: [
          'Funcao renal',
          'Proteinuria',
          'EAS',
          'Teste genetico'
        ],
        examesImagem: [
          'Ultrassom renal (diagnostico)',
          'RM com VRT (volume renal total - prognostico)',
          'AngioRM cerebral (rastreamento aneurisma)'
        ],
        citations: [{ refId: 'nejm-adpkd-2021' }]
      },
      tratamento: {
        objetivos: [
          'Retardar progressao para DRC terminal',
          'Controlar PA',
          'Manejar complicacoes',
          'Rastrear manifestacoes extrarenais'
        ],
        naoFarmacologico: {
          medidas: [
            'Hidratacao abundante (>3L/dia)',
            'Restricao de sodio',
            'Evitar trauma abdominal',
            'Exercicio moderado'
          ],
          citations: [{ refId: 'jasn-adpkd-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antagonista V2', medicamentos: ['Tolvaptan'], posologia: 'Iniciar 45/15mg, titular ate 90/30mg', observacoes: 'Se progressao rapida; monitorar funcao hepatica mensal' },
            { classe: 'IECA/BRA', medicamentos: ['Lisinopril', 'Losartana'], posologia: 'Dose maxima tolerada', observacoes: 'Todos; meta PA <130/80 (ou <110/75 se jovem)' }
          ],
          segundaLinha: [
            { classe: 'Analgesico', medicamentos: ['Paracetamol'], posologia: 'Conforme necessidade', observacoes: 'Evitar AINEs' },
            { classe: 'Estatina', medicamentos: ['Atorvastatina'], posologia: '20mg/dia', observacoes: 'Se DRC G3+' }
          ],
          situacoesEspeciais: [
            { situacao: 'Infeccao cistica', conduta: 'ATB com penetracao em cisto: fluoroquinolona, SMX-TMP; prolongado 4-6 semanas' },
            { situacao: 'Sangramento cistico', conduta: 'Geralmente autolimitado; repouso, hidratacao; angioembolizacao se grave' },
            { situacao: 'Dor refrataria', conduta: 'Marsupializacao laparoscopica de cistos; nefrectomia em ultimo caso' }
          ],
          citations: [{ refId: 'nejm-tempo-tolvaptan-2012' }, { refId: 'jasn-adpkd-2022' }]
        },
        duracao: 'Tratamento continuo; preparo para transplante quando DRCT'
      },
      acompanhamento: {
        frequenciaConsultas: 'Anual se TFG >60; 3-6 meses se TFG <60',
        examesControle: [
          'Funcao renal',
          'Proteinuria',
          'VRT por RM (basal e periodico)',
          'Funcao hepatica se em tolvaptan',
          'AngioRM cerebral a cada 5-10 anos se HF aneurisma'
        ],
        metasTerapeuticas: [
          'PA <130/80 (ou <110/75)',
          'Declinio TFG <5 mL/min/ano',
          'Controle de sintomas'
        ],
        criteriosEncaminhamento: [
          'Nefrologista: todos',
          'Geneticista: aconselhamento',
          'Neurocirurgia: se aneurisma detectado',
          'Cirurgiao: se cistos hepaticos sintomaticos'
        ],
        citations: [{ refId: 'jasn-adpkd-2022' }]
      }
    },
    protocolos: ['adpkd-tolvaptan', 'adpkd-rastreamento-aneurisma'],
    medicamentos: ['tolvaptan', 'lisinopril', 'losartana'],
    calculadoras: ['mayo-classification-adpkd', 'propkd-score'],
    rastreamentos: ['rastreamento-aneurisma-adpkd'],
    citations: [{ refId: 'jasn-adpkd-2022' }, { refId: 'nejm-adpkd-2021' }],
    lastUpdate: '2025-01',
    tags: ['policistica', 'ADPKD', 'PKD1', 'PKD2', 'tolvaptan', 'cistos']
  },

  // ============================================================================
  // NEFROPATIAS METABOLICAS
  // ============================================================================
  {
    id: 'nefropatia-diabetica',
    titulo: 'Nefropatia Diabetica',
    sinonimos: ['Doenca Renal Diabetica', 'DRD', 'Diabetic Kidney Disease', 'DKD'],
    doid: 'DOID:4195',
    snomedCT: '127013003',
    meshId: 'D003928',
    umlsCui: 'C0011881',
    ciap2: ['U88', 'T90'],
    cid10: ['N08.3', 'E10.2', 'E11.2'],
    cid11: ['GB60.0'],
    categoria: 'urologico',
    subcategoria: 'nefropatias_metabolicas',
    quickView: {
      definicao: 'Complicacao microvascular do diabetes mellitus, principal causa de DRC e DRCT no mundo. Caracterizada por albuminuria progressiva e queda da TFG. Frequentemente associada a retinopatia diabetica. Risco CV muito elevado.',
      criteriosDiagnosticos: [
        'Diabetes mellitus (tipo 1 ou 2)',
        'Albuminuria persistente: RAC >=30mg/g em 2 de 3 amostras',
        'Categorias: A1 (<30), A2 (30-300, moderada), A3 (>300, grave)',
        'Queda da TFG',
        'Retinopatia diabetica concomitante (apoia diagnostico)',
        'Exclusao de outras causas (biopsia se atipico)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Controle glicemico rigoroso (HbA1c <7%)',
          'Restricao de sodio (<2g/dia)',
          'Dieta com proteina moderada (0,8g/kg)',
          'Cessacao tabagismo',
          'Exercicio regular',
          'Controle de peso'
        ],
        farmacologico: [
          'IECA ou BRA (primeira linha para albuminuria) - dose maxima',
          'Inibidor SGLT2 (Dapagliflozina, Empagliflozina) - beneficio CV e renal',
          'Agonista GLP-1 (Semaglutida, Liraglutida) se obesidade/DCV',
          'Finerenona (antagonista MR nao-esteroidal) se RAC >30',
          'Estatina de alta potencia (alto risco CV)'
        ]
      },
      metasTerapeuticas: [
        'HbA1c <7% (individualizar)',
        'PA <130/80 mmHg',
        'RAC: reduzir ou estabilizar',
        'LDL <70 mg/dL (ou <55 se muito alto risco)',
        'Retardar progressao para DRCT'
      ],
      examesIniciais: [
        'Creatinina e TFG estimada',
        'RAC (relacao albumina/creatinina)',
        'HbA1c',
        'Perfil lipidico',
        'Fundoscopia (retinopatia)',
        'Potassio serico (antes de IECA/BRA)',
        'ECG'
      ],
      redFlags: [
        'Proteinuria nefrotica sem retinopatia (considerar biopsia)',
        'Queda rapida da TFG (>5/ano)',
        'Hematuria glomerular',
        'Inicio de DRC <5 anos de diabetes tipo 1',
        'Hipercalemia grave recorrente'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '20-40% dos diabeticos desenvolvem DRD',
        incidencia: 'Principal causa de DRCT no mundo ocidental',
        mortalidade: 'Risco CV 3-5x maior; principal causa de morte',
        faixaEtaria: 'Apos 5-10 anos de diabetes',
        fatoresRisco: [
          'Mau controle glicemico',
          'Hipertensao arterial',
          'Tabagismo',
          'Obesidade',
          'Historia familiar de DRD',
          'Ascendencia africana, hispanica, asiatica'
        ],
        citations: [{ refId: 'kdigo-diabetes-ckd-2022' }]
      },
      fisiopatologia: {
        texto: 'Hiperglicemia cronica causa hiperfiltração glomerular inicial, espessamento da MBG, expansao mesangial e esclerose nodular (nodulos de Kimmelstiel-Wilson). Estresse oxidativo, AGEs, ativacao do SRAA e inflamacao contribuem para fibrose progressiva.',
        citations: [{ refId: 'nejm-dkd-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Inicialmente assintomatico',
          'Edema (sindrome nefrotica em fases avancadas)',
          'Hipertensao de dificil controle',
          'Sintomas de uremia (fases avancadas)',
          'Frequentemente associada a outras complicacoes (retinopatia, neuropatia)'
        ],
        sinaisExameFisico: [
          'Hipertensao',
          'Edema periferico',
          'Retinopatia ao exame de fundo de olho',
          'Neuropatia periferica'
        ],
        formasClinicas: [
          'Hiperfiltração (TFG elevada)',
          'Normoalbuminuria (TFG normal, sem albuminuria ainda)',
          'Albuminuria moderada (microalbuminuria)',
          'Albuminuria grave (macroalbuminuria)',
          'DRC progressiva'
        ],
        citations: [{ refId: 'kdigo-diabetes-ckd-2022' }]
      },
      diagnostico: {
        criterios: [
          'Diabetes + albuminuria persistente',
          'Presenca de retinopatia apoia diagnostico',
          'Exclusao de outras causas se apresentacao atipica'
        ],
        diagnosticoDiferencial: [
          'Outras glomerulopatias (biopsia se atipico)',
          'Nefroesclerose hipertensiva',
          'Nefrite isquemica',
          'Doenca renal policistica'
        ],
        examesLaboratoriais: [
          'Creatinina e TFG',
          'RAC ou proteinuria 24h',
          'HbA1c, glicemia',
          'Perfil lipidico',
          'Potassio',
          'EAS'
        ],
        examesImagem: [
          'Ultrassom renal (rins podem estar aumentados inicialmente)'
        ],
        outrosExames: [
          'Biopsia renal se: proteinuria sem retinopatia, hematuria glomerular, progressao atipica'
        ],
        citations: [{ refId: 'nejm-dkd-2023' }]
      },
      tratamento: {
        objetivos: [
          'Retardar progressao da DRC',
          'Reduzir risco cardiovascular',
          'Controle metabolico'
        ],
        naoFarmacologico: {
          medidas: [
            'Controle glicemico (HbA1c <7%)',
            'Restricao de sodio',
            'Dieta com proteina controlada',
            'Cessacao tabagismo',
            'Exercicio',
            'Controle de peso'
          ],
          citations: [{ refId: 'kdigo-diabetes-ckd-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'IECA/BRA', medicamentos: ['Enalapril', 'Losartana'], posologia: 'Dose maxima tolerada', observacoes: 'Primeira linha se albuminuria; monitorar K e Cr' },
            { classe: 'Inibidor SGLT2', medicamentos: ['Dapagliflozina', 'Empagliflozina', 'Canagliflozina'], posologia: 'Dapagliflozina 10mg/dia', observacoes: 'Beneficio CV e renal comprovado; TFG >=20' },
            { classe: 'Estatina', medicamentos: ['Atorvastatina', 'Rosuvastatina'], posologia: 'Alta potencia', observacoes: 'Todos com DRD (alto risco CV)' }
          ],
          segundaLinha: [
            { classe: 'Antagonista MR nao-esteroidal', medicamentos: ['Finerenona'], posologia: '10-20mg/dia', observacoes: 'Se RAC >30 apesar de IECA+iSGLT2; monitorar K' },
            { classe: 'Agonista GLP-1', medicamentos: ['Semaglutida', 'Liraglutida', 'Dulaglutida'], posologia: 'Semaglutida 0,5-1mg/semana', observacoes: 'Se obesidade ou DCV estabelecida; beneficio CV' }
          ],
          situacoesEspeciais: [
            { situacao: 'TFG <30', conduta: 'Manter iSGLT2 ate dialise; suspender metformina' },
            { situacao: 'Hipercalemia', conduta: 'Quelantes de potassio (Patiromer, SZC) para manter IECA/BRA' },
            { situacao: 'Idosos', conduta: 'Meta HbA1c menos rigida (7,5-8%); evitar hipoglicemia' }
          ],
          citations: [{ refId: 'kdigo-diabetes-ckd-2022' }, { refId: 'nejm-credence-2019' }]
        },
        duracao: 'Tratamento continuo; progressao para TRS em alguns'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses conforme estagio',
        examesControle: [
          'HbA1c a cada 3 meses',
          'Creatinina, TFG, RAC a cada 3-12 meses',
          'Potassio',
          'Perfil lipidico anual',
          'Fundoscopia anual'
        ],
        metasTerapeuticas: [
          'HbA1c <7%',
          'PA <130/80',
          'RAC estavel ou reduzindo',
          'LDL <70 (ou <55)',
          'Declinio TFG <5/ano'
        ],
        criteriosEncaminhamento: [
          'TFG <30: nefrologista',
          'Proteinuria >500mg sem retinopatia: nefrologista para biopsia',
          'Retinopatia: oftalmologista'
        ],
        citations: [{ refId: 'kdigo-diabetes-ckd-2022' }]
      },
      prevencao: {
        primaria: [
          'Controle glicemico desde diagnostico do diabetes',
          'Controle PA',
          'Rastreamento anual com RAC e TFG'
        ],
        secundaria: [
          'IECA/BRA ao detectar albuminuria',
          'Adicionar iSGLT2 precocemente'
        ],
        citations: [{ refId: 'ada-standards-2024' }]
      }
    },
    protocolos: ['drd-kdigo-2022', 'diabetes-prevencao-complicacoes'],
    medicamentos: ['enalapril', 'losartana', 'dapagliflozina', 'finerenona', 'semaglutida'],
    calculadoras: ['tfg-ckd-epi', 'risco-cv-diabetes'],
    rastreamentos: ['rastreamento-drd'],
    citations: [{ refId: 'kdigo-diabetes-ckd-2022' }, { refId: 'nejm-dkd-2023' }],
    lastUpdate: '2025-01',
    tags: ['diabetica', 'nefropatia', 'diabetes', 'albuminuria', 'iSGLT2', 'finerenona']
  },

  // ============================================================================
  // LESAO RENAL AGUDA
  // ============================================================================
  {
    id: 'necrose-tubular-aguda',
    titulo: 'Necrose Tubular Aguda',
    sinonimos: ['NTA', 'Acute Tubular Necrosis', 'ATN'],
    doid: 'DOID:12556',
    snomedCT: '35455006',
    meshId: 'D007683',
    umlsCui: 'C0022672',
    ciap2: ['U99'],
    cid10: ['N17.0'],
    cid11: ['GB90.0'],
    categoria: 'urologico',
    subcategoria: 'lesao_renal_aguda',
    quickView: {
      definicao: 'Principal causa de lesao renal aguda intrinseca, resultante de isquemia ou toxinas. Caracterizada por dano ao epitelio tubular com oliguria ou nao-oliguria. Potencialmente reversivel com suporte adequado. Mortalidade elevada em UTI.',
      criteriosDiagnosticos: [
        'Lesao renal aguda (criterios KDIGO):',
        '- Aumento Cr >=0,3mg/dL em 48h OU',
        '- Aumento Cr >=1,5x basal em 7 dias OU',
        '- Diurese <0,5mL/kg/h por 6h',
        'Contexto clinico: hipotensao, sepse, nefrotoxicos',
        'EAS: cilindros granulosos (muddy brown casts)',
        'FeNa >2% e FeUreia >35% (vs pre-renal)',
        'Excluir obstrucao (USG) e glomerulopatias'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suporte hemodinamico (euvolemia)',
          'Evitar hipotensao',
          'Suspender nefrotoxicos',
          'Ajustar doses de medicamentos pela TFG'
        ],
        farmacologico: [
          'NAO ha tratamento farmacologico especifico para NTA',
          'RESSUSCITAÇÃO VOLEMICA: Cristaloides balanceados (Ringer lactato)',
          'VASOPRESSORES: Noradrenalina se choque (alvo PAM >=65mmHg)',
          'DIURETICOS: Furosemida para manejo de volume, nao melhora prognostico',
          'DIALISE: Se indicacao (hipercalemia, acidose, uremia, hipervolemia refratarias)'
        ]
      },
      metasTerapeuticas: [
        'Estabilizacao hemodinamica',
        'Evitar insultos adicionais',
        'Suporte ate recuperacao tubular',
        'Evitar necessidade de dialise quando possivel'
      ],
      examesIniciais: [
        'Creatinina, ureia, eletrolitos',
        'EAS com sedimento (cilindros granulosos)',
        'Fracao de excrecao de sodio (FeNa)',
        'Fracao de excrecao de ureia (FeUreia)',
        'Gasometria (acidose)',
        'Ultrassom renal (excluir obstrucao)',
        'Revisar medicamentos nefrotoxicos'
      ],
      redFlags: [
        'Hipercalemia >6,5mEq/L ou com alteracao ECG',
        'Acidose metabolica grave (pH <7,1)',
        'Edema pulmonar refratario',
        'Uremia sintomatica (encefalopatia, pericardite)',
        'Oligoanuria prolongada'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '70-80% das causas de LRA intrinseca em hospitalizados',
        incidencia: 'LRA afeta 10-15% de hospitalizados; ate 50% em UTI',
        mortalidade: 'Mortalidade 20-50% em UTI; maior se dialise necessaria',
        faixaEtaria: 'Qualquer idade; mais comum em idosos e criticos',
        fatoresRisco: [
          'Sepse (causa mais comum)',
          'Cirurgias de grande porte (especialmente cardiaca)',
          'Hipotensao/choque',
          'Contraste iodado',
          'Aminoglicosideos, anfotericina B',
          'Rabdomiolise',
          'DRC previa'
        ],
        citations: [{ refId: 'kdigo-aki-2021' }]
      },
      fisiopatologia: {
        texto: 'Isquemia ou toxinas causam depleção de ATP nas células tubulares, levando a disfunção celular e morte. Descamação de células tubulares obstrui lúmen, e retrovasamento de filtrado por epitélio lesado reduz TFG. Fase de recuperação com regeneração tubular ocorre em dias a semanas.',
        citations: [{ refId: 'nejm-aki-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Oliguria (<400mL/dia) ou nao-oliguria',
          'Sintomas da causa de base (sepse, hipotensao)',
          'Edema se hipervolemia',
          'Nauseas, vomitos (uremia)',
          'Confusao (encefalopatia uremica)'
        ],
        sinaisExameFisico: [
          'Sinais de hipovolemia ou hipervolemia',
          'Hipotensao ou hipertensao',
          'Taquicardia',
          'Estertores pulmonares se sobrecarga',
          'Asterixis (uremia)'
        ],
        formasClinicas: [
          'NTA isquemica (hipoperfusao)',
          'NTA nefrotoxica (aminoglicosideos, contraste, mioglobina)',
          'NTA septica (mecanismos mistos)'
        ],
        citations: [{ refId: 'kdigo-aki-2021' }]
      },
      diagnostico: {
        criterios: [
          'Contexto clinico compativel',
          'Elevacao de creatinina (KDIGO)',
          'Sedimento urinario: cilindros granulosos',
          'FeNa >2% (ou FeUreia >35%)',
          'Exclusao de obstrucao e glomerulonefrite'
        ],
        diagnosticoDiferencial: [
          'LRA pre-renal (FeNa <1%)',
          'LRA pos-renal (obstrucao)',
          'Glomerulonefrite rapidamente progressiva',
          'Nefrite intersticial aguda',
          'Microangiopatia trombotica'
        ],
        examesLaboratoriais: [
          'Creatinina, ureia',
          'Eletrolitos (K, Na)',
          'Gasometria',
          'EAS e sedimento',
          'FeNa = (Na urinario x Cr plasmatica) / (Na plasmatico x Cr urinaria) x 100',
          'CPK se suspeita de rabdomiolise'
        ],
        examesImagem: [
          'Ultrassom renal (tamanho normal, excluir obstrucao)'
        ],
        outrosExames: [
          'Biopsia renal raramente necessaria (casos atipicos)'
        ],
        citations: [{ refId: 'nejm-aki-2021' }]
      },
      tratamento: {
        objetivos: [
          'Tratar causa de base',
          'Evitar insultos adicionais',
          'Suporte ate recuperacao renal',
          'Indicar dialise quando necessario'
        ],
        naoFarmacologico: {
          medidas: [
            'Suspender nefrotoxicos',
            'Ajuste de doses pela TFG',
            'Monitoramento rigoroso de diurese',
            'Balanco hidrico cuidadoso'
          ],
          citations: [{ refId: 'kdigo-aki-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Ressuscitacao volemica', medicamentos: ['Cristaloides balanceados'], posologia: 'Conforme status volemico', observacoes: 'Ringer lactato preferivel; evitar solucoes hipotonicas' },
            { classe: 'Vasopressor', medicamentos: ['Noradrenalina'], posologia: '0,05-1 mcg/kg/min', observacoes: 'Se choque; alvo PAM >=65mmHg' }
          ],
          segundaLinha: [
            { classe: 'Diuretico de alca', medicamentos: ['Furosemida'], posologia: '40-200mg IV', observacoes: 'Para manejo de hipervolemia; nao melhora prognostico renal' }
          ],
          situacoesEspeciais: [
            { situacao: 'Rabdomiolise', conduta: 'Hidratacao agressiva (200-300mL/h); alcalinizacao controversa; monitorar compartimento' },
            { situacao: 'Contraste', conduta: 'Hidratacao pre e pos; usar menor volume possivel; evitar em alto risco' },
            { situacao: 'Indicacao de dialise', conduta: 'Hipercalemia refrataria, acidose grave, sobrecarga de volume, uremia sintomatica' }
          ],
          citations: [{ refId: 'kdigo-aki-2021' }]
        },
        duracao: 'Ate recuperacao renal (dias a semanas); alguns necessitam dialise cronica'
      },
      acompanhamento: {
        frequenciaConsultas: 'Diario durante fase aguda; apos alta, reavaliar em 30-90 dias',
        examesControle: [
          'Creatinina diaria durante LRA',
          'Eletrolitos, gasometria',
          'Diurese horária',
          'Creatinina ambulatorial apos alta'
        ],
        metasTerapeuticas: [
          'Recuperacao de funcao renal',
          'Evitar transicao para DRC'
        ],
        criteriosEncaminhamento: [
          'Nefrologista se dialise necessaria ou LRA prolongada',
          'Seguimento ambulatorial: LRA aumenta risco futuro de DRC'
        ],
        citations: [{ refId: 'nejm-aki-2021' }]
      },
      prevencao: {
        primaria: [
          'Evitar nefrotoxicos em pacientes de risco',
          'Hidratacao pre-contraste',
          'Monitoramento de creatinina em pacientes de risco'
        ],
        secundaria: [
          'Reconhecimento precoce de LRA',
          'Suspensao rapida de nefrotoxicos'
        ],
        citations: [{ refId: 'kdigo-aki-2021' }]
      }
    },
    protocolos: ['nta-manejo-uti', 'lra-prevencao-contraste'],
    medicamentos: ['noradrenalina', 'furosemida'],
    calculadoras: ['fena-calculator', 'kdigo-aki-staging'],
    rastreamentos: [],
    citations: [{ refId: 'kdigo-aki-2021' }, { refId: 'nejm-aki-2021' }],
    lastUpdate: '2025-01',
    tags: ['NTA', 'LRA', 'isquemica', 'nefrotoxica', 'dialise', 'critica']
  }
];
