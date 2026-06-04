/**
 * DOENCAS GENETICAS E CONGENITAS - DARWIN-MFC EXPANSAO 800
 * =========================================================
 * Sindromes geneticas e malformacoes congenitas
 */

import { Doenca } from '@/lib/types/doenca';

export const geneticasCongenitas: Doenca[] = [
  // ============================================================================
  // SINDROMES CROMOSSOMICAS
  // ============================================================================
  {
    id: 'sindrome-turner',
    titulo: 'Sindrome de Turner',
    sinonimos: ['Turner Syndrome', 'Monossomia X', 'Disgenesia Gonadal 45,X'],
    doid: 'DOID:3911',
    snomedCT: '38804009',
    meshId: 'D014424',
    ordo: ['ORPHA:881'],
    ciap2: ['A90'],
    cid10: ['Q96.0', 'Q96.1', 'Q96.9'],
    categoria: 'pediatrico',
    subcategoria: 'sindromes_cromossomicas',
    quickView: {
      definicao: 'Aneuploidia com monossomia total ou parcial do cromossomo X em fenotipo feminino. Baixa estatura, disgenesia gonadal, malformacoes cardiacas e renais.',
      criteriosDiagnosticos: [
        'Cariotipo 45,X ou mosaico',
        'Baixa estatura (<percentil 5)',
        'Disgenesia gonadal (amenorreia primaria)',
        'Pescoco alado (pterygium colli)',
        'Linfedema congenito',
        'Cardiopatia (coarctacao aorta, valva aortica bicuspide)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Acompanhamento multidisciplinar', 'Suporte psicologico', 'Avaliacao cardiaca periodica'],
        farmacologico: ['GH recombinante: 0,045-0,05 mg/kg/dia SC', 'TRH: estradiol + progesterona na puberdade']
      },
      metasTerapeuticas: ['Otimizar estatura final', 'Inducao puberal adequada', 'Prevencao de osteoporose'],
      examesIniciais: ['Cariotipo (50 celulas)', 'Ecocardiograma', 'USG renal', 'Funcao tireoidiana', 'Glicemia'],
      redFlags: ['Disseccao aortica', 'Dilatacao aortica >25mm/m2', 'Hipertensao nao controlada']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:2.500 nascidas vivas femininas',
        faixaEtaria: 'Diagnostico: pre-natal a adolescencia',
        fatoresRisco: ['Nao ha fatores de risco modificaveis', 'Idade materna nao influencia'],
        citations: [{ refId: 'lancet-turner-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Baixa estatura', 'Amenorreia primaria', 'Infertilidade', 'Dificuldade aprendizado matematica'],
        sinaisExameFisico: ['Pescoco alado', 'Torax em escudo', 'Cubitus valgus', 'Linha capilar baixa'],
        citations: [{ refId: 'nejm-turner-2019' }]
      },
      diagnostico: {
        criterios: ['Cariotipo com ausencia parcial ou total de um X', 'Fenotipo feminino'],
        diagnosticoDiferencial: ['Sindrome de Noonan', 'Baixa estatura idiopatica', 'Insuficiencia ovariana primaria'],
        examesLaboratoriais: ['Cariotipo', 'FSH/LH elevados', 'TSH', 'Glicemia'],
        examesImagem: ['Ecocardiograma', 'Angio-TC/RM aorta', 'USG renal', 'DXA'],
        citations: [{ refId: 'lancet-turner-2020' }]
      },
      tratamento: {
        objetivos: ['Maximizar estatura', 'Inducao puberal', 'Prevenir complicacoes CV'],
        naoFarmacologico: {
          medidas: ['Monitoramento cardiaco regular', 'Suporte psicologico', 'Educacao sobre fertilidade'],
          citations: [{ refId: 'jcem-turner-2017' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Hormonio de crescimento', medicamentos: ['Somatropina'], posologia: '0,045-0,05 mg/kg/dia SC' },
            { classe: 'TRH', medicamentos: ['Estradiol', 'Progesterona'], posologia: 'Estradiol baixa dose a partir 11-12 anos' }
          ],
          citations: [{ refId: 'jcem-turner-2017' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses na infancia; anual na vida adulta',
        examesControle: ['Ecocardiograma a cada 5 anos', 'Funcao tireoidiana anual', 'Audiometria periodica'],
        metasTerapeuticas: ['Estatura proxima do alvo genetico', 'Puberdade completa', 'PA controlada'],
        criteriosEncaminhamento: ['Endocrinologia pediatrica', 'Cardiologia', 'Genetica'],
        citations: [{ refId: 'nejm-turner-2019' }]
      },
      prevencao: {
        primaria: ['Nao ha prevencao primaria'],
        secundaria: ['Diagnostico precoce', 'Vigilancia de complicacoes'],
        citations: [{ refId: 'lancet-turner-2020' }]
      }
    },
    protocolos: ['turner-manejo-aps'],
    medicamentos: ['somatropina', 'estradiol'],
    calculadoras: ['estatura-alvo-turner'],
    citations: [{ refId: 'lancet-turner-2020' }, { refId: 'nejm-turner-2019' }],
    lastUpdate: '2026-01',
    tags: ['turner', 'aneuploidia', 'baixa estatura', 'disgenesia gonadal']
  },

  {
    id: 'sindrome-klinefelter',
    titulo: 'Sindrome de Klinefelter',
    sinonimos: ['Klinefelter Syndrome', '47,XXY', 'Disgenesia dos Tubulos Seminiferos'],
    doid: 'DOID:1921',
    snomedCT: '405769009',
    meshId: 'D007713',
    ordo: ['ORPHA:484'],
    ciap2: ['A90'],
    cid10: ['Q98.0', 'Q98.1', 'Q98.4'],
    categoria: 'pediatrico',
    subcategoria: 'sindromes_cromossomicas',
    quickView: {
      definicao: 'Aneuploidia mais comum em homens (47,XXY). Hipogonadismo hipergonadotrofico, infertilidade, ginecomastia. Variabilidade fenotipica ampla.',
      criteriosDiagnosticos: [
        'Cariotipo 47,XXY ou mosaico',
        'Hipogonadismo hipergonadotrofico',
        'Testiculos pequenos (<4mL)',
        'Azoospermia',
        'Ginecomastia',
        'Proporcoes eunucoides'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Apoio educacional', 'Suporte psicologico', 'Aconselhamento sobre fertilidade'],
        farmacologico: ['Testosterona: cipionato/enantato 100-200mg IM a cada 2-4 semanas', 'Inicio na puberdade se atrasada']
      },
      metasTerapeuticas: ['Masculinizacao adequada', 'Prevencao de osteoporose', 'Qualidade de vida'],
      examesIniciais: ['Cariotipo', 'FSH/LH/Testosterona', 'Espermograma', 'DXA', 'Glicemia/lipideos'],
      redFlags: ['Trombose venosa', 'Cancer de mama (risco aumentado)', 'Sindrome metabolica']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:500-1000 nascidos vivos masculinos',
        faixaEtaria: 'Diagnostico frequentemente tardio (puberdade ou infertilidade)',
        fatoresRisco: ['Idade materna avancada e leve associacao'],
        citations: [{ refId: 'lancet-klinefelter-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Testiculos pequenos', 'Infertilidade', 'Ginecomastia', 'Dificuldades linguisticas'],
        sinaisExameFisico: ['Testiculos <4mL', 'Proporcoes eunucoides', 'Ginecomastia', 'Pelos escassos'],
        citations: [{ refId: 'nejm-klinefelter-2018' }]
      },
      diagnostico: {
        criterios: ['Cariotipo 47,XXY confirmatorio', 'Clinica sugestiva'],
        diagnosticoDiferencial: ['Hipogonadismo de outras causas', 'Sindrome de Kallmann', 'Ginecomastia idiopatica'],
        examesLaboratoriais: ['Cariotipo', 'FSH/LH elevados', 'Testosterona baixa', 'Espermograma'],
        citations: [{ refId: 'lancet-klinefelter-2020' }]
      },
      tratamento: {
        objetivos: ['Masculinizacao', 'Prevenir complicacoes metabolicas', 'Suporte fertilidade'],
        naoFarmacologico: {
          medidas: ['Suporte educacional', 'Terapia fono se dificuldades linguisticas'],
          citations: [{ refId: 'jcem-klinefelter-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Testosterona', medicamentos: ['Cipionato de testosterona', 'Undecanoato de testosterona'], posologia: '100-200mg IM 2-4 sem ou 1000mg IM 10-14 sem' }
          ],
          citations: [{ refId: 'jcem-klinefelter-2021' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-12 meses',
        examesControle: ['Testosterona a cada 6 meses', 'Hematocrito', 'PSA apos 40 anos', 'DXA'],
        metasTerapeuticas: ['Testosterona em faixa normal', 'Hematocrito <54%', 'DMO normal'],
        criteriosEncaminhamento: ['Endocrinologia', 'Genetica', 'Medicina reprodutiva'],
        citations: [{ refId: 'nejm-klinefelter-2018' }]
      },
      prevencao: {
        primaria: ['Nao ha prevencao primaria'],
        secundaria: ['Diagnostico precoce para suporte adequado'],
        citations: [{ refId: 'lancet-klinefelter-2020' }]
      }
    },
    protocolos: ['klinefelter-manejo'],
    medicamentos: ['testosterona-cipionato'],
    calculadoras: [],
    citations: [{ refId: 'lancet-klinefelter-2020' }, { refId: 'nejm-klinefelter-2018' }],
    lastUpdate: '2026-01',
    tags: ['klinefelter', 'XXY', 'hipogonadismo', 'infertilidade masculina']
  },

  // ============================================================================
  // NEUROFIBROMATOSE E FACOMATOSES
  // ============================================================================
  {
    id: 'neurofibromatose-tipo-1',
    titulo: 'Neurofibromatose Tipo 1',
    sinonimos: ['NF1', 'Doenca de von Recklinghausen', 'Neurofibromatosis Type 1'],
    doid: 'DOID:8712',
    snomedCT: '19133005',
    meshId: 'D009456',
    ordo: ['ORPHA:636'],
    ciap2: ['N99'],
    cid10: ['Q85.0'],
    categoria: 'neurologico',
    subcategoria: 'facomatoses',
    quickView: {
      definicao: 'Doenca autossomica dominante por mutacao no gene NF1 (neurofibromina). Manchas cafe-com-leite, neurofibromas, nodulos de Lisch e gliomas opticos.',
      criteriosDiagnosticos: [
        '>=6 manchas cafe-com-leite (>5mm pre-pubere, >15mm pos)',
        '>=2 neurofibromas ou 1 plexiforme',
        'Efélides axilares/inguinais',
        '>=2 nodulos de Lisch',
        'Glioma optico',
        'Displasia esfenoide ou pseudoartrose',
        'Parente 1o grau com NF1'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Vigilancia anual', 'Avaliacao oftalmologica', 'Monitoramento de neurofibromas'],
        farmacologico: ['Selumetinib para neurofibromas plexiformes inoperaveis (pediatrico)', 'Tratamento sintomatico de complicacoes']
      },
      metasTerapeuticas: ['Deteccao precoce de complicacoes', 'Qualidade de vida', 'Manejo de tumores'],
      examesIniciais: ['Exame oftalmologico completo', 'RM cerebral e orbitas', 'Avaliacao PA', 'Analise molecular NF1'],
      redFlags: ['Crescimento rapido de neurofibroma', 'Dor persistente', 'Deficit neurologico novo', 'Hipertensao']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:3.000',
        faixaEtaria: 'Manifestacoes desde infancia',
        fatoresRisco: ['50% casos novos (mutacao de novo)', 'Historia familiar'],
        citations: [{ refId: 'nejm-nf1-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Manchas cafe-com-leite', 'Neurofibromas cutaneos', 'Dificuldades aprendizado'],
        sinaisExameFisico: ['Manchas cafe-com-leite', 'Neurofibromas', 'Nodulos de Lisch', 'Escoliose'],
        citations: [{ refId: 'lancet-neurol-nf1-2021' }]
      },
      diagnostico: {
        criterios: ['Criterios NIH revisados: 2 ou mais criterios clinicos ou mutacao patogenica NF1'],
        diagnosticoDiferencial: ['Sindrome de Legius', 'NF2', 'Schwannomatose'],
        examesImagem: ['RM cerebral', 'RM orbitas', 'RM coluna se sintomas'],
        citations: [{ refId: 'nejm-nf1-2020' }]
      },
      tratamento: {
        objetivos: ['Vigilancia de complicacoes', 'Tratamento de tumores sintomaticos'],
        naoFarmacologico: {
          medidas: ['Exame clinico anual', 'Suporte educacional', 'Aconselhamento genetico'],
          citations: [{ refId: 'lancet-neurol-nf1-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Inibidor MEK', medicamentos: ['Selumetinib'], posologia: '25mg/m2 2x/dia VO', observacoes: 'Neurofibromas plexiformes inoperaveis sintomaticos em criancas' }
          ],
          citations: [{ refId: 'nejm-nf1-2020' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Anual; mais frequente se complicacoes',
        examesControle: ['Exame oftalmologico anual ate 8 anos', 'PA anual', 'RM se sintomas'],
        metasTerapeuticas: ['Ausencia de complicacoes graves', 'Desenvolvimento adequado'],
        criteriosEncaminhamento: ['Genetica', 'Oftalmologia', 'Neurologia', 'Oncologia se tumor'],
        citations: [{ refId: 'lancet-neurol-nf1-2021' }]
      },
      prevencao: {
        primaria: ['Aconselhamento genetico'],
        secundaria: ['Vigilancia sistematica de complicacoes'],
        citations: [{ refId: 'nejm-nf1-2020' }]
      }
    },
    protocolos: ['nf1-vigilancia'],
    medicamentos: ['selumetinib'],
    calculadoras: [],
    citations: [{ refId: 'nejm-nf1-2020' }, { refId: 'lancet-neurol-nf1-2021' }],
    lastUpdate: '2026-01',
    tags: ['NF1', 'neurofibromatose', 'facomatose', 'manchas cafe com leite']
  },

  {
    id: 'esclerose-tuberosa',
    titulo: 'Esclerose Tuberosa',
    sinonimos: ['TSC', 'Tuberous Sclerosis Complex', 'Doenca de Bourneville'],
    doid: 'DOID:13515',
    snomedCT: '7199000',
    meshId: 'D014402',
    ordo: ['ORPHA:805'],
    ciap2: ['N99'],
    cid10: ['Q85.1'],
    categoria: 'neurologico',
    subcategoria: 'facomatoses',
    quickView: {
      definicao: 'Doenca autossomica dominante por mutacao TSC1 ou TSC2. Hamartomas multissistemicos: cerebro, pele, rins, coracao e pulmoes. Epilepsia e TEA frequentes.',
      criteriosDiagnosticos: [
        'CRITERIOS MAIORES: Manchas hipocromicas (>=3), angiofibromas faciais, fibroma ungueal, placa de Shagreen, hamartomas retinianos, tuberes corticais, nodulos subependimarios, SEGA, rabdomioma cardiaco, LAM, angiomiolipomas renais',
        'CRITERIOS MENORES: Lesoes dentarias, fibromas gengivais, policistos renais',
        'Diagnostico definitivo: 2 maiores ou 1 maior + 2 menores'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Vigilancia multidisciplinar', 'Suporte para TEA/TDAH', 'Monitoramento renal/cerebral'],
        farmacologico: ['Everolimus para SEGA e angiomiolipomas', 'Anticonvulsivantes: vigabatrina para espasmos', 'Sirolimus topico para angiofibromas']
      },
      metasTerapeuticas: ['Controle de crises', 'Prevencao de complicacoes renais', 'Neurodesenvolvimento'],
      examesIniciais: ['RM cerebral', 'USG ou TC renal', 'Ecocardiograma', 'Exame oftalmologico', 'EEG'],
      redFlags: ['Crescimento de SEGA', 'Hemorragia renal', 'Status epilepticus', 'Pneumotorax (LAM)']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:6.000-10.000',
        faixaEtaria: 'Desde periodo neonatal',
        fatoresRisco: ['60% mutacoes de novo', 'Historia familiar'],
        citations: [{ refId: 'lancet-tsc-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Epilepsia (80%)', 'TEA (50%)', 'Lesoes cutaneas', 'Angiomiolipomas renais'],
        sinaisExameFisico: ['Manchas hipocromicas', 'Angiofibromas faciais', 'Fibroma ungueal', 'Placa de Shagreen'],
        citations: [{ refId: 'nejm-tsc-2019' }]
      },
      diagnostico: {
        criterios: ['Criterios clinicos de Tuberous Sclerosis Consensus Conference', 'Mutacao patogenica TSC1/TSC2 confirma'],
        diagnosticoDiferencial: ['Outras facomatoses', 'Epilepsia de outras causas'],
        examesImagem: ['RM cerebral', 'TC/RM abdominal', 'Ecocardiograma'],
        citations: [{ refId: 'lancet-tsc-2021' }]
      },
      tratamento: {
        objetivos: ['Controle de epilepsia', 'Reducao de tumores', 'Suporte neurodesenvolvimento'],
        naoFarmacologico: {
          medidas: ['Terapias para TEA', 'Suporte educacional', 'Vigilancia oncologica'],
          citations: [{ refId: 'nejm-tsc-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Inibidor mTOR', medicamentos: ['Everolimus'], posologia: 'Titulado para nivel serico 5-15 ng/mL', observacoes: 'Para SEGA e angiomiolipomas' },
            { classe: 'Anticonvulsivante', medicamentos: ['Vigabatrina'], posologia: '50-150 mg/kg/dia', observacoes: 'Primeira linha para espasmos infantis na TSC' }
          ],
          citations: [{ refId: 'lancet-tsc-2021' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses na infancia; anual adultos',
        examesControle: ['RM cerebral a cada 1-3 anos', 'RM renal anual', 'PFP se LAM'],
        metasTerapeuticas: ['Epilepsia controlada', 'Tumores estaveis', 'Funcao renal preservada'],
        criteriosEncaminhamento: ['Neurologia', 'Nefrologia', 'Genetica', 'Pneumologia se LAM'],
        citations: [{ refId: 'nejm-tsc-2019' }]
      },
      prevencao: {
        primaria: ['Aconselhamento genetico'],
        secundaria: ['Vigilancia sistematica', 'Tratamento precoce'],
        citations: [{ refId: 'lancet-tsc-2021' }]
      }
    },
    protocolos: ['tsc-vigilancia'],
    medicamentos: ['everolimus', 'vigabatrina'],
    calculadoras: [],
    citations: [{ refId: 'lancet-tsc-2021' }, { refId: 'nejm-tsc-2019' }],
    lastUpdate: '2026-01',
    tags: ['esclerose tuberosa', 'TSC', 'facomatose', 'epilepsia', 'angiomiolipoma']
  },

  // ============================================================================
  // DOENCAS DO TECIDO CONJUNTIVO HEREDITARIAS
  // ============================================================================
  {
    id: 'sindrome-marfan',
    titulo: 'Sindrome de Marfan',
    sinonimos: ['Marfan Syndrome', 'MFS'],
    doid: 'DOID:14323',
    snomedCT: '19346006',
    meshId: 'D008382',
    ordo: ['ORPHA:558'],
    ciap2: ['L99'],
    cid10: ['Q87.4'],
    categoria: 'musculoesqueletico',
    subcategoria: 'doencas_tecido_conjuntivo',
    quickView: {
      definicao: 'Doenca autossomica dominante do tecido conjuntivo por mutacao FBN1 (fibrilina-1). Afeta sistema cardiovascular, esqueletico e ocular. Risco de disseccao aortica.',
      criteriosDiagnosticos: [
        'Criterios de Ghent revisados (2010)',
        'Dilatacao/disseccao raiz aortica (Z-score >=2)',
        'Ectopia lentis',
        'Score sistemico >=7 pontos',
        'Mutacao patogenica FBN1',
        'Historia familiar positiva'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar esportes de contato e isometricos intensos', 'Restricao de atividade extenuante', 'Monitoramento cardiaco'],
        farmacologico: ['Losartana 50-100mg/dia ou beta-bloqueador', 'Objetivo: FC <70bpm e PAS <120mmHg']
      },
      metasTerapeuticas: ['Prevenir disseccao aortica', 'Raiz aortica estavel', 'Qualidade de vida'],
      examesIniciais: ['Ecocardiograma com medidas de raiz aortica', 'Exame oftalmologico', 'Radiografia de coluna', 'Analise molecular FBN1'],
      redFlags: ['Dor toracica/dorsal aguda', 'Dilatacao aortica progressiva', 'Disseccao aortica familiar precoce']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:5.000-10.000',
        faixaEtaria: 'Diagnostico em qualquer idade',
        fatoresRisco: ['25% mutacoes de novo', 'Historia familiar'],
        citations: [{ refId: 'nejm-marfan-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Estatura alta', 'Membros longos', 'Aracnodactilia', 'Miopia', 'Pectus'],
        sinaisExameFisico: ['Sinal do polegar e punho', 'Pectus excavatum/carinatum', 'Escoliose', 'Pes planos'],
        citations: [{ refId: 'lancet-marfan-2021' }]
      },
      diagnostico: {
        criterios: ['Criterios de Ghent revisados 2010'],
        diagnosticoDiferencial: ['Sindrome de Loeys-Dietz', 'EDS vascular', 'Homocistinuria', 'Sindrome de Beals'],
        examesImagem: ['Ecocardiograma', 'Angio-TC/RM aorta toracica', 'RM coluna'],
        citations: [{ refId: 'nejm-marfan-2020' }]
      },
      tratamento: {
        objetivos: ['Prevenir disseccao aortica', 'Correcao de ectopia lentis se necessario'],
        naoFarmacologico: {
          medidas: ['Restricao de exercicios isometricos intensos', 'Esportes aerobicos leves permitidos'],
          citations: [{ refId: 'lancet-marfan-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'BRA', medicamentos: ['Losartana'], posologia: '50-100mg/dia', observacoes: 'Reduz taxa de dilatacao aortica' },
            { classe: 'Beta-bloqueador', medicamentos: ['Atenolol', 'Bisoprolol'], posologia: 'Titular para FC <70bpm' }
          ],
          situacoesEspeciais: [
            { situacao: 'Cirurgia aortica', conduta: 'Indicada se raiz >=50mm ou >=45mm com fatores de risco' }
          ],
          citations: [{ refId: 'nejm-marfan-2020' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Anual; semestral se dilatacao',
        examesControle: ['Ecocardiograma anual', 'Angio-TC/RM se eco insuficiente', 'Exame oftalmologico anual'],
        metasTerapeuticas: ['Raiz aortica estavel ou crescimento <1mm/ano', 'Sem disseccao'],
        criteriosEncaminhamento: ['Cardiologia', 'Genetica', 'Oftalmologia', 'Cirurgia cardiaca se indicacao'],
        citations: [{ refId: 'lancet-marfan-2021' }]
      },
      prevencao: {
        primaria: ['Aconselhamento genetico', 'PGD disponivel'],
        secundaria: ['Vigilancia aortica regular', 'Tratamento farmacologico precoce'],
        citations: [{ refId: 'nejm-marfan-2020' }]
      }
    },
    protocolos: ['marfan-vigilancia-aortica'],
    medicamentos: ['losartana', 'atenolol'],
    calculadoras: ['z-score-aorta'],
    citations: [{ refId: 'nejm-marfan-2020' }, { refId: 'lancet-marfan-2021' }],
    lastUpdate: '2026-01',
    tags: ['marfan', 'aortopatia', 'fibrilina', 'ectopia lentis', 'disseccao aortica']
  },

  {
    id: 'sindrome-ehlers-danlos',
    titulo: 'Sindrome de Ehlers-Danlos',
    sinonimos: ['EDS', 'Ehlers-Danlos Syndrome'],
    doid: 'DOID:13359',
    snomedCT: '398114001',
    meshId: 'D004535',
    ordo: ['ORPHA:287'],
    ciap2: ['L99'],
    cid10: ['Q79.6'],
    categoria: 'musculoesqueletico',
    subcategoria: 'doencas_tecido_conjuntivo',
    quickView: {
      definicao: 'Grupo de doencas hereditarias do tecido conjuntivo. Caracterizadas por hipermobilidade articular, pele hiperelastica e fragilidade tecidual. 13 subtipos reconhecidos.',
      criteriosDiagnosticos: [
        'HIPERMOBILE (hEDS): Escore Beighton >=5 + criterios sistemicos',
        'CLASSICO (cEDS): Pele hiperelastica, cicatrizes atroficas, hipermobilidade',
        'VASCULAR (vEDS): Ruptura arterial/intestinal, facies caracteristica, mutacao COL3A1',
        'Confirmacao genetica para maioria dos subtipos'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia para estabilizacao articular', 'Evitar traumas', 'Protecao da pele'],
        farmacologico: ['Analgesia para dor cronica', 'Evitar AINEs em vEDS', 'Celiprolol no vEDS (se disponivel)']
      },
      metasTerapeuticas: ['Prevenir luxacoes', 'Controle da dor', 'Qualidade de vida'],
      examesIniciais: ['Escore Beighton', 'Avaliacao sistemica', 'Teste genetico (subtipos especificos)', 'Ecocardiograma (excluir prolapso mitral)'],
      redFlags: ['Ruptura arterial (vEDS)', 'Ruptura intestinal', 'Subluxacao atlantoaxial', 'Aneurismas']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'hEDS: 1:5.000-20.000; vEDS: 1:50.000-200.000',
        faixaEtaria: 'Sintomas desde infancia',
        fatoresRisco: ['Padrao de heranca varia por subtipo', 'Historia familiar'],
        citations: [{ refId: 'ajmg-eds-2017' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Hipermobilidade articular', 'Dor cronica', 'Luxacoes recorrentes', 'Pele fragil'],
        sinaisExameFisico: ['Escore Beighton elevado', 'Pele hiperelastica', 'Cicatrizes atroficas', 'Equimoses faceis'],
        citations: [{ refId: 'lancet-eds-2020' }]
      },
      diagnostico: {
        criterios: ['Criterios de 2017 para cada subtipo', 'Teste genetico confirmatorio para maioria'],
        diagnosticoDiferencial: ['Hipermobilidade benigna', 'Sindrome de Marfan', 'Cutis laxa', 'Osteogenese imperfeita'],
        citations: [{ refId: 'ajmg-eds-2017' }]
      },
      tratamento: {
        objetivos: ['Estabilizacao articular', 'Controle da dor', 'Prevencao de complicacoes'],
        naoFarmacologico: {
          medidas: ['Fisioterapia especializada', 'Orteses', 'Terapia ocupacional'],
          citations: [{ refId: 'lancet-eds-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Analgesicos', medicamentos: ['Paracetamol', 'Tramadol'], observacoes: 'Evitar AINEs em vEDS' },
            { classe: 'Beta-bloqueador', medicamentos: ['Celiprolol'], posologia: '100-400mg/dia', observacoes: 'Especifico para vEDS; reduz eventos vasculares' }
          ],
          citations: [{ refId: 'ajmg-eds-2017' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Anual ou conforme necessidade',
        examesControle: ['Ecocardiograma periodico', 'Angio-TC/RM em vEDS'],
        metasTerapeuticas: ['Funcionalidade preservada', 'Dor controlada'],
        criteriosEncaminhamento: ['Genetica', 'Reumatologia', 'Cardiologia (vEDS)', 'Cirurgia vascular (vEDS)'],
        citations: [{ refId: 'lancet-eds-2020' }]
      },
      prevencao: {
        primaria: ['Aconselhamento genetico'],
        secundaria: ['Evitar traumas', 'Vigilancia vascular em vEDS'],
        citations: [{ refId: 'ajmg-eds-2017' }]
      }
    },
    protocolos: ['eds-manejo'],
    medicamentos: ['celiprolol', 'paracetamol'],
    calculadoras: ['escore-beighton'],
    citations: [{ refId: 'ajmg-eds-2017' }, { refId: 'lancet-eds-2020' }],
    lastUpdate: '2026-01',
    tags: ['ehlers-danlos', 'hipermobilidade', 'colageno', 'fragilidade vascular']
  },

  // ============================================================================
  // DISPLASIAS OSSEAS
  // ============================================================================
  {
    id: 'osteogenese-imperfeita',
    titulo: 'Osteogenese Imperfeita',
    sinonimos: ['OI', 'Brittle Bone Disease', 'Doenca dos Ossos de Vidro'],
    doid: 'DOID:12347',
    snomedCT: '78314001',
    meshId: 'D010013',
    ordo: ['ORPHA:666'],
    ciap2: ['L99'],
    cid10: ['Q78.0'],
    categoria: 'musculoesqueletico',
    subcategoria: 'displasias_osseas',
    quickView: {
      definicao: 'Grupo de doencas geneticas com fragilidade ossea por defeito do colageno tipo I. Fraturas recorrentes, escleroticas azuladas, surdez. Gravidade variavel (tipos I-IV Sillence).',
      criteriosDiagnosticos: [
        'Fraturas recorrentes com trauma minimo',
        'Escleroticas azuladas',
        'Dentinogenese imperfeita',
        'Surdez condutiva/mista',
        'Baixa estatura',
        'Hipermobilidade articular',
        'Mutacao em COL1A1/COL1A2 ou genes relacionados'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia aquatica', 'Prevencao de quedas', 'Reabilitacao pos-fratura'],
        farmacologico: ['Bifosfonatos: Pamidronato IV ou Acido zoledronico', 'Calcio e vitamina D suplementares']
      },
      metasTerapeuticas: ['Reduzir frequencia de fraturas', 'Melhorar densidade ossea', 'Mobilidade'],
      examesIniciais: ['Radiografias esqueleticas', 'DXA', 'Audiometria', 'Teste genetico COL1A1/COL1A2'],
      redFlags: ['Fraturas vertebrais multiplas', 'Impressao basilar', 'Insuficiencia respiratoria']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:10.000-20.000',
        faixaEtaria: 'Desde nascimento (formas graves) a vida adulta',
        fatoresRisco: ['Maioria autossomica dominante', 'Historia familiar'],
        citations: [{ refId: 'lancet-oi-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fraturas com trauma minimo', 'Dor ossea cronica', 'Baixa estatura', 'Perda auditiva'],
        sinaisExameFisico: ['Escleroticas azuladas', 'Deformidades osseas', 'Dentinogenese imperfeita'],
        formasClinicas: ['Tipo I: leve', 'Tipo II: letal perinatal', 'Tipo III: grave progressivo', 'Tipo IV: moderado'],
        citations: [{ refId: 'nejm-oi-2019' }]
      },
      diagnostico: {
        criterios: ['Clinica + historia familiar', 'Teste genetico confirmatorio'],
        diagnosticoDiferencial: ['Maus-tratos (criancas)', 'Osteoporose juvenil', 'Hipofosfatasia'],
        examesImagem: ['Radiografias', 'DXA coluna e femur'],
        citations: [{ refId: 'lancet-oi-2020' }]
      },
      tratamento: {
        objetivos: ['Reduzir fraturas', 'Melhorar mobilidade', 'Controlar dor'],
        naoFarmacologico: {
          medidas: ['Fisioterapia', 'Hidroterapia', 'Orteses', 'Cirurgia ortopedica (hastes)'],
          citations: [{ refId: 'nejm-oi-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Bifosfonato IV', medicamentos: ['Pamidronato', 'Acido zoledronico'], posologia: 'Pamidronato 1 mg/kg/dose ciclos 3/3 meses', observacoes: 'Reduz fraturas e dor' },
            { classe: 'Suplementos', medicamentos: ['Calcio', 'Vitamina D'], posologia: 'Conforme necessidade' }
          ],
          citations: [{ refId: 'lancet-oi-2020' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses na infancia; anual adultos',
        examesControle: ['DXA anual', 'Radiografias conforme sintomas', 'Audiometria periodica'],
        metasTerapeuticas: ['Reducao de fraturas em 50%', 'DMO estavel ou em melhora'],
        criteriosEncaminhamento: ['Genetica', 'Ortopedia', 'Fisiatria', 'Otorrino'],
        citations: [{ refId: 'nejm-oi-2019' }]
      },
      prevencao: {
        primaria: ['Aconselhamento genetico', 'PGD disponivel'],
        secundaria: ['Prevencao de quedas', 'Tratamento precoce com bifosfonatos'],
        citations: [{ refId: 'lancet-oi-2020' }]
      }
    },
    protocolos: ['oi-manejo'],
    medicamentos: ['pamidronato', 'acido-zoledronico'],
    calculadoras: ['z-score-dxa'],
    citations: [{ refId: 'lancet-oi-2020' }, { refId: 'nejm-oi-2019' }],
    lastUpdate: '2026-01',
    tags: ['osteogenese imperfeita', 'fragilidade ossea', 'colageno', 'bifosfonatos']
  },

  {
    id: 'acondroplasia',
    titulo: 'Acondroplasia',
    sinonimos: ['Achondroplasia', 'ACH'],
    doid: 'DOID:4480',
    snomedCT: '86268005',
    meshId: 'D000130',
    ordo: ['ORPHA:15'],
    ciap2: ['L82'],
    cid10: ['Q77.4'],
    categoria: 'musculoesqueletico',
    subcategoria: 'displasias_osseas',
    quickView: {
      definicao: 'Displasia ossea mais comum. Autossomica dominante por mutacao FGFR3. Baixa estatura desproporcionada com rizomelia, macrocefalia e facies caracteristica.',
      criteriosDiagnosticos: [
        'Baixa estatura desproporcionada (rizomelia)',
        'Macrocefalia com frontal proeminente',
        'Hipoplasia de face media',
        'Mao em tridente',
        'Lordose lombar acentuada',
        'Mutacao FGFR3 (G380R em 98%)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Vigilancia de complicacoes', 'Fisioterapia', 'Adaptacoes ambientais'],
        farmacologico: ['Vosoritide (analogo CNP) para aumento de estatura em criancas', 'Tratamento de apneia se indicado']
      },
      metasTerapeuticas: ['Deteccao precoce de complicacoes', 'Otimizar estatura', 'Qualidade de vida'],
      examesIniciais: ['Radiografias esqueleticas', 'RM de transicao cranio-cervical', 'Polissonografia', 'Teste genetico FGFR3'],
      redFlags: ['Apneia obstrutiva grave', 'Estenose de forame magno', 'Hidrocefalia', 'Estenose espinhal']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:15.000-40.000 nascidos vivos',
        faixaEtaria: 'Diagnostico ao nascimento ou pre-natal',
        fatoresRisco: ['80% mutacoes de novo', 'Idade paterna avancada'],
        citations: [{ refId: 'lancet-acondroplasia-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Baixa estatura', 'Membros curtos (rizomelia)', 'Limitacao de extensao do cotovelo'],
        sinaisExameFisico: ['Macrocefalia', 'Frontal proeminente', 'Hipoplasia face media', 'Lordose lombar', 'Mao em tridente'],
        citations: [{ refId: 'nejm-acondroplasia-2020' }]
      },
      diagnostico: {
        criterios: ['Fenotipo clinico caracteristico', 'Confirmacao genetica FGFR3'],
        diagnosticoDiferencial: ['Hipocondroplasia', 'Outras displasias esqueleticas'],
        examesImagem: ['Radiografias esqueleticas', 'RM cranio-cervical', 'RM coluna lombar'],
        citations: [{ refId: 'lancet-acondroplasia-2021' }]
      },
      tratamento: {
        objetivos: ['Prevenir complicacoes', 'Aumentar estatura', 'Independencia funcional'],
        naoFarmacologico: {
          medidas: ['Evitar atividades com risco cervical', 'Fisioterapia', 'Adaptacoes ergonomicas'],
          citations: [{ refId: 'nejm-acondroplasia-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Analogo CNP', medicamentos: ['Vosoritide'], posologia: '15 mcg/kg SC 1x/dia', observacoes: 'Aprovado para criancas >=5 anos com epifises abertas' }
          ],
          situacoesEspeciais: [
            { situacao: 'Estenose forame magno', conduta: 'Descompressao cirurgica' },
            { situacao: 'Apneia grave', conduta: 'Adenoamigdalectomia, CPAP ou traqueostomia' }
          ],
          citations: [{ refId: 'nejm-vosoritide-2020' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Trimestral no 1o ano; semestral ate 5 anos; anual depois',
        examesControle: ['RM cranio-cervical no 1o ano', 'Polissonografia anual ate 5 anos', 'Audiometria periodica'],
        metasTerapeuticas: ['Neurodesenvolvimento adequado', 'Sem complicacoes neurologicas'],
        criteriosEncaminhamento: ['Genetica', 'Ortopedia', 'Neurocirurgia', 'ORL', 'Pneumologia'],
        citations: [{ refId: 'lancet-acondroplasia-2021' }]
      },
      prevencao: {
        primaria: ['Aconselhamento genetico'],
        secundaria: ['Vigilancia de complicacoes', 'Intervencao precoce'],
        citations: [{ refId: 'nejm-acondroplasia-2020' }]
      }
    },
    protocolos: ['acondroplasia-vigilancia'],
    medicamentos: ['vosoritide'],
    calculadoras: ['curvas-crescimento-acondroplasia'],
    citations: [{ refId: 'lancet-acondroplasia-2021' }, { refId: 'nejm-acondroplasia-2020' }],
    lastUpdate: '2026-01',
    tags: ['acondroplasia', 'displasia ossea', 'FGFR3', 'baixa estatura', 'vosoritide']
  }
];
