/**
 * Expansão: Doenças Raras - Parte 2
 * 25 doenças raras (neuropatias hereditárias, erros inatos, conectivopatias)
 * Darwin-MFC v1.6.0
 */

import type { Doenca } from '@/lib/types/doenca';

export const doencasRarasParte2: Partial<Doenca>[] = [
  // ============================================
  // NEUROPATIAS HEREDITÁRIAS (continuação)
  // ============================================
  {
    id: 'ataxia-friedreich',
    titulo: 'Ataxia de Friedreich',
    sinonimos: ['FRDA', 'Ataxia espinocerebelar autossômica recessiva'],
    doid: 'DOID:12858',
    snomedCT: '5765003',
    ordo: ['ORPHA:95'],
    ciap2: ['N99'],
    cid10: ['G11.1'],
    categoria: 'neurologico',
    subcategoria: 'ataxia-hereditaria',
    quickView: {
      definicao: 'Ataxia autossômica recessiva por expansão GAA no gene FXN, causando deficiência de frataxina com ataxia progressiva, cardiomiopatia e diabetes.',
      criteriosDiagnosticos: [
        'Ataxia de marcha progressiva (início <25 anos)',
        'Disartria cerebelar',
        'Arreflexia',
        'Sinal de Babinski',
        'Perda de sensibilidade profunda',
        'Cardiomiopatia hipertrófica'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia', 'Fonoaudiologia', 'Cardiologia regular'],
        farmacologico: ['Omaveloxolona (aprovada FDA)', 'Tratamento de complicações (IC, DM)']
      },
      redFlags: ['Cardiomiopatia grave', 'Arritmias', 'Diabetes descompensado', 'Escoliose grave']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:50.000 (ataxia hereditária mais comum)',
        faixaEtaria: 'Início tipicamente 5-15 anos',
        fatoresRisco: ['Autossômica recessiva'],
        citations: [{ refId: 'frda-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Desequilíbrio', 'Fala arrastada', 'Fraqueza de pernas', 'Fadiga'],
        sinaisExameFisico: ['Ataxia de marcha e membros', 'Nistagmo', 'Pé cavo', 'Escoliose'],
        formasClinicas: ['Clássica', 'Tardia (LOFA)', 'Com reflexos preservados (FARR)'],
        citations: [{ refId: 'frda-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Expansão GAA homozigota no gene FXN (>66 repetições)'],
        diagnosticoDiferencial: ['Outras ataxias espinocerebelares', 'Deficiência de vitamina E', 'Abetalipoproteinemia'],
        examesLaboratoriais: ['Análise molecular FXN', 'Frataxina em linfócitos', 'Glicemia', 'HbA1c'],
        examesImagem: ['RM medula (atrofia medular)', 'Eco cardíaco', 'RM cardíaca'],
        citations: [{ refId: 'frda-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Retardar progressão', 'Tratar cardiomiopatia', 'Controlar diabetes'],
        naoFarmacologico: {
          medidas: ['Fisioterapia contínua', 'Cadeira de rodas quando necessário'],
          citations: [{ refId: 'frda-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Ativador Nrf2', medicamentos: ['Omaveloxolona 150 mg/dia'] },
            { classe: 'Cardioproteção', medicamentos: ['IECA/BRA', 'Betabloqueador'] }
          ],
          citations: [{ refId: 'frda-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-12 meses',
        examesControle: ['SARA/FARS score', 'Eco cardíaco anual', 'HbA1c'],
        metasTerapeuticas: ['Estabilização funcional', 'FE cardíaca preservada'],
        criteriosEncaminhamento: ['Neurologia', 'Cardiologia', 'Endocrinologia'],
        citations: [{ refId: 'frda-follow-up-2022' }]
      }
    },
    protocolos: [],
    medicamentos: ['omaveloxolona'],
    calculadoras: [],
    citations: [{ refId: 'frda-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'ataxia', 'cardiomiopatia', 'frataxina']
  },
  {
    id: 'paraparesia-espastica-hereditaria',
    titulo: 'Paraparesia Espástica Hereditária',
    sinonimos: ['PEH', 'HSP', 'Strümpell-Lorrain'],
    doid: 'DOID:2476',
    snomedCT: '23853001',
    ordo: ['ORPHA:685'],
    ciap2: ['N99'],
    cid10: ['G11.4'],
    categoria: 'neurologico',
    subcategoria: 'paraparesia-hereditaria',
    quickView: {
      definicao: 'Grupo de doenças neurodegenerativas hereditárias com espasticidade progressiva de MMII por degeneração do trato corticoespinhal.',
      criteriosDiagnosticos: [
        'Espasticidade progressiva de MMII',
        'Fraqueza de MMII',
        'Hiperreflexia com clônus',
        'Babinski bilateral',
        'Marcha espástica',
        'História familiar (maioria)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia', 'Órteses', 'Toxina botulínica'],
        farmacologico: ['Baclofeno', 'Tizanidina', 'Toxina botulínica']
      },
      redFlags: ['Disfunção vesical grave', 'Ataxia associada', 'Déficit cognitivo']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '2-10:100.000',
        faixaEtaria: 'Variável (infância a adulto)',
        fatoresRisco: ['AD, AR ou ligada ao X (>80 genes conhecidos)'],
        citations: [{ refId: 'hsp-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Rigidez de pernas', 'Dificuldade de marcha', 'Urgência urinária'],
        sinaisExameFisico: ['Espasticidade', 'Hiperreflexia', 'Clônus', 'Pé equino'],
        formasClinicas: ['Pura (apenas espasticidade)', 'Complicada (com outras manifestações)'],
        citations: [{ refId: 'hsp-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Clínica característica', 'Exclusão de outras causas', 'Painel genético/exoma'],
        diagnosticoDiferencial: ['Esclerose múltipla', 'Mielopatia cervical', 'ELA', 'Deficiência de B12'],
        examesLaboratoriais: ['B12', 'Cobre', 'VDRL'],
        examesImagem: ['RM medula (atrofia medular, descartar compressão)', 'RM crânio'],
        citations: [{ refId: 'hsp-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Reduzir espasticidade', 'Manter marcha', 'Qualidade de vida'],
        naoFarmacologico: {
          medidas: ['Alongamentos diários', 'Bomba de baclofeno intratecal em casos graves'],
          citations: [{ refId: 'hsp-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antiespásticos', medicamentos: ['Baclofeno 10-80 mg/dia', 'Tizanidina 4-36 mg/dia'] },
            { classe: 'Toxina botulínica', medicamentos: ['OnabotulinumtoxinA em músculos-alvo'] }
          ],
          citations: [{ refId: 'hsp-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-12 meses',
        examesControle: ['Avaliação funcional de marcha', 'Urodinâmica se sintomas vesicais'],
        metasTerapeuticas: ['Manter deambulação'],
        criteriosEncaminhamento: ['Neurologia', 'Fisiatria', 'Urologia'],
        citations: [{ refId: 'hsp-follow-up-2022' }]
      }
    },
    protocolos: [],
    medicamentos: ['baclofeno', 'tizanidina', 'toxina-botulinica'],
    calculadoras: [],
    citations: [{ refId: 'hsp-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'espasticidade', 'hereditaria', 'trato-corticoespinhal']
  },
  {
    id: 'neuropatia-optica-leber',
    titulo: 'Neuropatia Óptica Hereditária de Leber',
    sinonimos: ['LHON', 'Atrofia óptica de Leber'],
    doid: 'DOID:705',
    snomedCT: '79399009',
    ordo: ['ORPHA:104'],
    ciap2: ['N99', 'F99'],
    cid10: ['H47.2'],
    categoria: 'neurologico',
    subcategoria: 'neuropatia-optica',
    quickView: {
      definicao: 'Neuropatia óptica mitocondrial causando perda visual central bilateral subaguda, predominante em homens jovens.',
      criteriosDiagnosticos: [
        'Perda visual central aguda/subaguda',
        'Acometimento bilateral (sequencial em semanas)',
        'Escotoma central',
        'Discromatopsia vermelho-verde',
        'Mutação mtDNA (m.11778G>A, m.3460G>A, m.14484T>C)',
        'Idade típica 15-35 anos'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar tabagismo e álcool', 'Reabilitação visual'],
        farmacologico: ['Idebenona 900 mg/dia']
      },
      redFlags: ['Perda visual bilateral rápida', 'Sintomas neurológicos associados (LHON plus)']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:30.000-50.000',
        faixaEtaria: 'Tipicamente 15-35 anos, predomínio masculino (4:1)',
        fatoresRisco: ['Herança mitocondrial materna', 'Tabagismo', 'Álcool'],
        citations: [{ refId: 'lhon-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Perda visual central indolor', 'Borramento visual', 'Perda de percepção de cores'],
        sinaisExameFisico: ['Edema de disco óptico', 'Atrofia óptica (tardia)', 'Telangiectasias peripapilares'],
        formasClinicas: ['LHON clássico', 'LHON plus (com distonia, esclerose múltipla-like)'],
        citations: [{ refId: 'lhon-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Mutação mtDNA primária', 'OCT (perda de fibras retinianas)', 'Campo visual com escotoma central'],
        diagnosticoDiferencial: ['Neurite óptica (EM)', 'NAION', 'Neurite óptica autoimune'],
        examesLaboratoriais: ['Sequenciamento mtDNA', 'B12, ácido fólico'],
        examesImagem: ['RM crânio/órbitas', 'OCT'],
        citations: [{ refId: 'lhon-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Preservar visão residual', 'Prevenir progressão'],
        naoFarmacologico: {
          medidas: ['Cessação tabagismo/álcool', 'Auxílios ópticos'],
          citations: [{ refId: 'lhon-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Análogo CoQ10', medicamentos: ['Idebenona 300 mg 3x/dia'] }
          ],
          situacoesEspeciais: [
            { situacao: 'Terapia gênica', conduta: 'Lenadogene nolparvovec (em investigação/aprovado Europa)' }
          ],
          citations: [{ refId: 'lhon-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal na fase aguda, depois a cada 6-12 meses',
        examesControle: ['Acuidade visual', 'Campo visual', 'OCT'],
        metasTerapeuticas: ['Estabilização/recuperação visual'],
        criteriosEncaminhamento: ['Neuroftalmologia', 'Genética'],
        citations: [{ refId: 'lhon-follow-up-2022' }]
      }
    },
    protocolos: [],
    medicamentos: ['idebenona'],
    calculadoras: [],
    citations: [{ refId: 'lhon-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'mitocondrial', 'neuropatia-optica', 'cegueira']
  },

  // ============================================
  // ERROS INATOS DO METABOLISMO (10)
  // ============================================
  {
    id: 'fenilcetonuria',
    titulo: 'Fenilcetonúria',
    sinonimos: ['PKU', 'Deficiência de fenilalanina hidroxilase'],
    doid: 'DOID:9281',
    snomedCT: '7573000',
    ordo: ['ORPHA:716'],
    ciap2: ['T99'],
    cid10: ['E70.0'],
    categoria: 'metabolico',
    subcategoria: 'aminoacidopatia',
    quickView: {
      definicao: 'Erro inato do metabolismo por deficiência de fenilalanina hidroxilase, causando acúmulo de fenilalanina e deficiência intelectual se não tratada.',
      criteriosDiagnosticos: [
        'Fenilalanina sérica >120 μmol/L (triagem neonatal)',
        'Razão Phe/Tyr elevada',
        'Confirmação molecular gene PAH',
        'Deficiência intelectual se não tratada precocemente'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Dieta restrita em fenilalanina desde o nascimento', 'Fórmulas metabólicas'],
        farmacologico: ['Sapropterina (respondedores a BH4)', 'Pegvaliase (adultos)']
      },
      redFlags: ['Phe >600 μmol/L', 'Gravidez com Phe descontrolada', 'Sintomas neuropsiquiátricos']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:10.000-15.000 nascidos vivos',
        faixaEtaria: 'Diagnóstico neonatal (teste do pezinho)',
        fatoresRisco: ['Autossômica recessiva'],
        citations: [{ refId: 'pku-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Sem sintomas se tratada precocemente', 'Deficiência intelectual se não tratada'],
        sinaisExameFisico: ['Cabelos claros', 'Pele clara', 'Odor de mofo (não tratados)', 'Eczema'],
        formasClinicas: ['PKU clássica', 'PKU leve', 'Hiperfenilalaninemia benigna'],
        citations: [{ refId: 'pku-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Phe >120 μmol/L', 'Análise molecular PAH', 'Teste de carga de BH4'],
        diagnosticoDiferencial: ['Deficiências de BH4', 'Hiperfenilalaninemia transitória'],
        examesLaboratoriais: ['Phe sérica', 'Tyr sérica', 'Pterinas urinárias', 'DHPR'],
        examesImagem: ['RM cerebral se sintomático'],
        citations: [{ refId: 'pku-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Manter Phe 120-360 μmol/L', 'Desenvolvimento neurológico normal', 'Vida normal'],
        naoFarmacologico: {
          medidas: ['Dieta restrita em Phe para toda a vida', 'Fórmula de aminoácidos isenta de Phe'],
          citations: [{ refId: 'pku-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Cofator', medicamentos: ['Sapropterina 5-20 mg/kg/dia (respondedores)'] }
          ],
          segundaLinha: [
            { classe: 'Terapia de substituição enzimática', medicamentos: ['Pegvaliase SC (adultos)'] }
          ],
          citations: [{ refId: 'pku-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal no 1º ano, depois 3-6 meses',
        examesControle: ['Phe sérica semanal/mensal', 'Aminograma', 'Avaliação nutricional'],
        metasTerapeuticas: ['Phe 120-360 μmol/L'],
        criteriosEncaminhamento: ['Centro de referência em erros inatos', 'Nutrição especializada'],
        citations: [{ refId: 'pku-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-pku-ms'],
    medicamentos: ['sapropterina', 'pegvaliase'],
    calculadoras: [],
    citations: [{ refId: 'pku-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'triagem-neonatal', 'aminoacidopatia', 'dieta']
  },
  {
    id: 'homocistinuria',
    titulo: 'Homocistinúria Clássica',
    sinonimos: ['Deficiência de cistationina beta-sintase', 'CBS deficiency'],
    doid: 'DOID:9263',
    snomedCT: '8454001',
    ordo: ['ORPHA:394'],
    ciap2: ['T99'],
    cid10: ['E72.1'],
    categoria: 'metabolico',
    subcategoria: 'aminoacidopatia',
    quickView: {
      definicao: 'Erro inato do metabolismo da metionina por deficiência de CBS, causando acúmulo de homocisteína com tromboembolismo, ectopia de cristalino e déficit cognitivo.',
      criteriosDiagnosticos: [
        'Homocisteína total elevada (>100 μmol/L)',
        'Metionina elevada',
        'Ectopia de cristalino',
        'Hábito marfanoide',
        'Tromboembolismo',
        'Déficit intelectual variável'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Dieta restrita em metionina'],
        farmacologico: ['Piridoxina (B6) - respondedores', 'Betaína', 'Folato e B12']
      },
      redFlags: ['TEV/TEA', 'Descolamento de cristalino', 'AVC em jovem']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:200.000-300.000 (geral); mais comum em certas populações',
        faixaEtaria: 'Infância (diagnóstico)',
        fatoresRisco: ['Autossômica recessiva'],
        citations: [{ refId: 'homocystinuria-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Miopia progressiva', 'Ectopia de cristalino', 'Trombose'],
        sinaisExameFisico: ['Alta estatura', 'Aracnodactilia', 'Genu valgum', 'Osteoporose'],
        formasClinicas: ['Responsiva a B6', 'Não-responsiva a B6'],
        citations: [{ refId: 'homocystinuria-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Homocisteína total >100 μmol/L', 'Metionina elevada', 'Análise molecular CBS'],
        diagnosticoDiferencial: ['Síndrome de Marfan', 'Deficiência de MTHFR', 'Deficiências de remethylation'],
        examesLaboratoriais: ['Homocisteína total', 'Metionina', 'Teste de resposta a B6'],
        examesImagem: ['Avaliação oftalmológica', 'DXA'],
        citations: [{ refId: 'homocystinuria-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Reduzir homocisteína <50 μmol/L', 'Prevenir complicações tromboembólicas'],
        naoFarmacologico: {
          medidas: ['Dieta restrita em metionina', 'Fórmula isenta de metionina'],
          citations: [{ refId: 'homocystinuria-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Cofator', medicamentos: ['Piridoxina (B6) 100-500 mg/dia'] },
            { classe: 'Doador de metil', medicamentos: ['Betaína 6-9 g/dia'] }
          ],
          citations: [{ refId: 'homocystinuria-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: ['Homocisteína total', 'Metionina', 'Avaliação oftalmológica anual'],
        metasTerapeuticas: ['Homocisteína <50 μmol/L'],
        criteriosEncaminhamento: ['Centro de erros inatos', 'Oftalmologia', 'Hematologia'],
        citations: [{ refId: 'homocystinuria-follow-up-2022' }]
      }
    },
    protocolos: [],
    medicamentos: ['piridoxina', 'betaina'],
    calculadoras: [],
    citations: [{ refId: 'homocystinuria-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'aminoacidopatia', 'trombofilia', 'ectopia-cristalino']
  },
  {
    id: 'galactosemia',
    titulo: 'Galactosemia Clássica',
    sinonimos: ['Deficiência de GALT'],
    doid: 'DOID:9870',
    snomedCT: '190745006',
    ordo: ['ORPHA:79239'],
    ciap2: ['T99'],
    cid10: ['E74.2'],
    categoria: 'metabolico',
    subcategoria: 'erro-carboidrato',
    quickView: {
      definicao: 'Erro inato do metabolismo da galactose por deficiência de GALT, causando toxicidade multissistêmica ao ingerir lactose/galactose.',
      criteriosDiagnosticos: [
        'Vômitos e diarreia com introdução de leite',
        'Icterícia',
        'Hepatomegalia/insuficiência hepática',
        'Catarata',
        'Sepse neonatal (E. coli)',
        'GALT ausente ou muito reduzida'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Dieta sem galactose/lactose para toda a vida'],
        farmacologico: ['Sem tratamento farmacológico específico']
      },
      redFlags: ['Sepse neonatal', 'Coagulopatia', 'Edema cerebral']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:40.000-60.000 nascidos vivos',
        faixaEtaria: 'Neonatal',
        fatoresRisco: ['Autossômica recessiva'],
        citations: [{ refId: 'galactosemia-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Recusa alimentar', 'Vômitos', 'Letargia', 'Icterícia'],
        sinaisExameFisico: ['Hepatomegalia', 'Ascite', 'Catarata', 'Hipotonia'],
        formasClinicas: ['Clássica', 'Variante Duarte (mais branda)'],
        citations: [{ refId: 'galactosemia-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Atividade de GALT ausente/muito reduzida', 'Gal-1-P elevado em eritrócitos'],
        diagnosticoDiferencial: ['Outras causas de icterícia neonatal', 'Sepse neonatal', 'Tirosinemia'],
        examesLaboratoriais: ['GALT em eritrócitos', 'Gal-1-P', 'Galactitol urinário'],
        examesImagem: ['USG abdominal', 'Avaliação oftalmológica'],
        citations: [{ refId: 'galactosemia-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Eliminar galactose da dieta', 'Prevenir complicações agudas e crônicas'],
        naoFarmacologico: {
          medidas: ['Fórmula de soja ou elementar', 'Dieta sem lactose/galactose vitalícia'],
          citations: [{ refId: 'galactosemia-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Suplementação', medicamentos: ['Cálcio', 'Vitamina D'] }
          ],
          citations: [{ refId: 'galactosemia-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Frequente no 1º ano, depois 6-12 meses',
        examesControle: ['Gal-1-P', 'Desenvolvimento neuropsicomotor', 'Função ovariana (meninas)'],
        metasTerapeuticas: ['Gal-1-P <3-5 mg/dL'],
        criteriosEncaminhamento: ['Centro de erros inatos', 'Endocrinologia (função gonadal)'],
        citations: [{ refId: 'galactosemia-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-galactosemia-ms'],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'galactosemia-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'triagem-neonatal', 'carboidrato', 'catarata']
  },
  {
    id: 'acidemia-propionica',
    titulo: 'Acidemia Propiônica',
    sinonimos: ['Deficiência de propionil-CoA carboxilase', 'PA'],
    doid: 'DOID:13814',
    snomedCT: '237932004',
    ordo: ['ORPHA:35'],
    ciap2: ['T99'],
    cid10: ['E71.1'],
    categoria: 'metabolico',
    subcategoria: 'acidemia-organica',
    quickView: {
      definicao: 'Acidemia orgânica por deficiência de propionil-CoA carboxilase, causando acidose metabólica, hiperamonemia e cardiomiopatia.',
      criteriosDiagnosticos: [
        'Acidose metabólica com ânion gap elevado',
        'Hiperamonemia',
        'Cetose',
        'Citopenias',
        'Propionilcarnitina (C3) elevada',
        'Ácidos orgânicos característicos na urina'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Dieta restrita em proteínas (isoleucina, valina, metionina, treonina)'],
        farmacologico: ['L-carnitina', 'Metronidazol (reduz produção propionato intestinal)', 'Biotina']
      },
      redFlags: ['Descompensação metabólica', 'Cardiomiopatia', 'Pancreatite', 'AVC metabólico']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:100.000-150.000 nascidos vivos',
        faixaEtaria: 'Neonatal ou lactente',
        fatoresRisco: ['Autossômica recessiva'],
        citations: [{ refId: 'pa-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Letargia', 'Vômitos', 'Recusa alimentar', 'Hipotonia'],
        sinaisExameFisico: ['Desidratação', 'Hepatomegalia', 'Sinais de encefalopatia'],
        formasClinicas: ['Neonatal grave', 'Tardia (mais branda)'],
        citations: [{ refId: 'pa-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['C3 elevada no perfil de acilcarnitinas', 'Ácido metilcítrico, 3-OH-propiônico elevados'],
        diagnosticoDiferencial: ['Acidemia metilmalônica', 'Outras acidemias orgânicas'],
        examesLaboratoriais: ['Gasometria', 'Amônia', 'Acilcarnitinas', 'Ácidos orgânicos urinários'],
        examesImagem: ['RM encéfalo (gânglios da base)', 'Eco cardíaco'],
        citations: [{ refId: 'pa-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Prevenir descompensações', 'Otimizar desenvolvimento', 'Prevenir cardiomiopatia'],
        naoFarmacologico: {
          medidas: ['Dieta hipoproteica com fórmula metabólica', 'Transplante hepático em casos graves'],
          citations: [{ refId: 'pa-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Suplemento', medicamentos: ['L-carnitina 100-200 mg/kg/dia'] },
            { classe: 'Antibiótico', medicamentos: ['Metronidazol intermitente'] }
          ],
          situacoesEspeciais: [
            { situacao: 'Descompensação', conduta: 'Jejum proteico, glicose IV, carnitina IV, tratar hiperamonemia' }
          ],
          citations: [{ refId: 'pa-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal no 1º ano, depois a cada 3-6 meses',
        examesControle: ['Amônia', 'Acilcarnitinas', 'Aminoácidos', 'Eco cardíaco'],
        metasTerapeuticas: ['Crescimento adequado', 'Sem descompensações'],
        criteriosEncaminhamento: ['Centro de erros inatos', 'Cardiologia', 'Neurologia'],
        citations: [{ refId: 'pa-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-acidemias-organicas-ms'],
    medicamentos: ['l-carnitina', 'metronidazol'],
    calculadoras: [],
    citations: [{ refId: 'pa-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'acidemia-organica', 'hiperamonemia', 'triagem-neonatal']
  },
  {
    id: 'acidemia-metilmalonica',
    titulo: 'Acidemia Metilmalônica',
    sinonimos: ['MMA', 'Deficiência de metilmalonil-CoA mutase'],
    doid: 'DOID:14749',
    snomedCT: '20052008',
    ordo: ['ORPHA:26'],
    ciap2: ['T99'],
    cid10: ['E71.1'],
    categoria: 'metabolico',
    subcategoria: 'acidemia-organica',
    quickView: {
      definicao: 'Acidemia orgânica por defeitos na metilmalonil-CoA mutase ou no metabolismo da cobalamina, com quadro similar à acidemia propiônica.',
      criteriosDiagnosticos: [
        'Acidose metabólica grave',
        'Hiperamonemia',
        'Ácido metilmalônico muito elevado na urina',
        'Propionilcarnitina (C3) elevada',
        'Pode ter homocisteína elevada (formas cobalamina)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Dieta restrita em proteínas'],
        farmacologico: ['Hidroxicobalamina (formas responsivas)', 'L-carnitina']
      },
      redFlags: ['Insuficiência renal', 'Descompensação aguda', 'AVC metabólico']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:50.000-100.000 nascidos vivos',
        faixaEtaria: 'Neonatal ou lactente',
        fatoresRisco: ['Autossômica recessiva'],
        citations: [{ refId: 'mma-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Vômitos', 'Letargia', 'Desidratação', 'Falência de crescimento'],
        sinaisExameFisico: ['Hepatomegalia', 'Hipotonia', 'Sinais de encefalopatia'],
        formasClinicas: ['Mut0 (grave)', 'Mut- (residual)', 'CblA, CblB, CblC, CblD (cobalamina)'],
        citations: [{ refId: 'mma-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Ácido metilmalônico urinário muito elevado', 'C3 elevada', 'Estudos de complementação'],
        diagnosticoDiferencial: ['Acidemia propiônica', 'Deficiência isolada de B12'],
        examesLaboratoriais: ['Ácidos orgânicos', 'Acilcarnitinas', 'Homocisteína', 'B12'],
        examesImagem: ['RM encéfalo', 'Função renal'],
        citations: [{ refId: 'mma-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Prevenir descompensações', 'Preservar função renal', 'Otimizar desenvolvimento'],
        naoFarmacologico: {
          medidas: ['Dieta hipoproteica', 'Transplante hepático/renal em casos graves'],
          citations: [{ refId: 'mma-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Cofator', medicamentos: ['Hidroxicobalamina IM (formas responsivas)'] },
            { classe: 'Suplemento', medicamentos: ['L-carnitina 100-200 mg/kg/dia'] }
          ],
          citations: [{ refId: 'mma-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal a trimestral',
        examesControle: ['Função renal', 'Amônia', 'Acilcarnitinas', 'Ácido metilmalônico'],
        metasTerapeuticas: ['Função renal preservada', 'Crescimento adequado'],
        criteriosEncaminhamento: ['Centro de erros inatos', 'Nefrologia'],
        citations: [{ refId: 'mma-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-acidemias-organicas-ms'],
    medicamentos: ['hidroxicobalamina', 'l-carnitina'],
    calculadoras: [],
    citations: [{ refId: 'mma-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'acidemia-organica', 'cobalamina', 'insuficiencia-renal']
  },
  {
    id: 'tirosinemia-tipo1',
    titulo: 'Tirosinemia Tipo I',
    sinonimos: ['Tirosinemia hepatorrenal', 'Deficiência de FAH'],
    doid: 'DOID:0060636',
    snomedCT: '44664008',
    ordo: ['ORPHA:882'],
    ciap2: ['T99'],
    cid10: ['E70.2'],
    categoria: 'metabolico',
    subcategoria: 'aminoacidopatia',
    quickView: {
      definicao: 'Erro inato do metabolismo da tirosina por deficiência de FAH, causando doença hepática grave, disfunção tubular renal e risco de carcinoma hepatocelular.',
      criteriosDiagnosticos: [
        'Succinilacetona elevada (patognomônica)',
        'Tirosina elevada',
        'Alfafetoproteína muito elevada',
        'Coagulopatia',
        'Síndrome de Fanconi',
        'Crises neurológicas (porfiria-like)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Dieta restrita em fenilalanina e tirosina'],
        farmacologico: ['Nitisinona (NTBC)']
      },
      redFlags: ['Insuficiência hepática aguda', 'Crises neurológicas', 'Carcinoma hepatocelular']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:100.000-120.000 (geral); 1:1.800 em Quebec',
        faixaEtaria: 'Neonatal a lactente',
        fatoresRisco: ['Autossômica recessiva'],
        citations: [{ refId: 'tyr1-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Irritabilidade', 'Vômitos', 'Icterícia', 'Hepatomegalia', 'Sangramento'],
        sinaisExameFisico: ['Hepatomegalia', 'Ascite', 'Raquitismo', 'Odor de repolho'],
        formasClinicas: ['Aguda (neonatal)', 'Subaguda (lactente)', 'Crônica'],
        citations: [{ refId: 'tyr1-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Succinilacetona urinária ou sanguínea elevada', 'Análise molecular gene FAH'],
        diagnosticoDiferencial: ['Galactosemia', 'Outras causas de insuficiência hepática neonatal'],
        examesLaboratoriais: ['Succinilacetona', 'Tirosina', 'AFP', 'Coagulograma'],
        examesImagem: ['USG hepático', 'RX de punho (raquitismo)'],
        citations: [{ refId: 'tyr1-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Bloquear via metabólica', 'Prevenir CHC', 'Preservar função renal'],
        naoFarmacologico: {
          medidas: ['Dieta restrita em Phe/Tyr', 'Transplante hepático se falha terapêutica'],
          citations: [{ refId: 'tyr1-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Inibidor HPPD', medicamentos: ['Nitisinona 1 mg/kg/dia'] }
          ],
          citations: [{ refId: 'tyr1-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal no 1º ano, depois a cada 3-6 meses',
        examesControle: ['Succinilacetona', 'AFP', 'USG/RM hepática', 'Tirosina'],
        metasTerapeuticas: ['Succinilacetona indetectável', 'AFP normalizada', 'Tyr <400 μmol/L'],
        criteriosEncaminhamento: ['Centro de erros inatos', 'Hepatologia'],
        citations: [{ refId: 'tyr1-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-tirosinemia-ms'],
    medicamentos: ['nitisinona'],
    calculadoras: [],
    citations: [{ refId: 'tyr1-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'aminoacidopatia', 'hepatico', 'carcinoma', 'nitisinona']
  },
  {
    id: 'deficiencia-ornitina-transcarbamilase',
    titulo: 'Deficiência de Ornitina Transcarbamilase',
    sinonimos: ['Deficiência de OTC', 'Hiperamonemia ligada ao X'],
    doid: 'DOID:9277',
    snomedCT: '360516005',
    ordo: ['ORPHA:664'],
    ciap2: ['T99'],
    cid10: ['E72.4'],
    categoria: 'metabolico',
    subcategoria: 'ciclo-ureia',
    quickView: {
      definicao: 'Defeito do ciclo da ureia mais comum, ligado ao X, causando hiperamonemia potencialmente fatal.',
      criteriosDiagnosticos: [
        'Hiperamonemia (>100-200 μmol/L)',
        'Alcalose respiratória',
        'Ácido orótico urinário elevado',
        'Glutamina elevada, citrulina baixa/normal',
        'Mutação no gene OTC'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Dieta restrita em proteínas', 'Transplante hepático em casos graves'],
        farmacologico: ['Fenilbutirato de sódio/glicerol', 'L-arginina/citrulina', 'Scavengers de nitrogênio']
      },
      redFlags: ['Coma hiperamonêmico', 'Amônia >500 μmol/L', 'Edema cerebral']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:14.000-77.000 nascidos vivos',
        faixaEtaria: 'Neonatal (homens graves), qualquer idade (heterozigotas)',
        fatoresRisco: ['Ligada ao X', 'Heterozigotas podem ser sintomáticas'],
        citations: [{ refId: 'otc-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Letargia', 'Vômitos', 'Recusa alimentar', 'Hiperventilação', 'Convulsões'],
        sinaisExameFisico: ['Encefalopatia', 'Hepatomegalia', 'Hipotonia ou hipertonia'],
        formasClinicas: ['Neonatal grave (homens)', 'Tardia (homozigotas leves e heterozigotas)'],
        citations: [{ refId: 'otc-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Hiperamonemia', 'Ácido orótico urinário elevado', 'Perfil de aminoácidos característico'],
        diagnosticoDiferencial: ['Outros defeitos do ciclo da ureia', 'Acidemias orgânicas'],
        examesLaboratoriais: ['Amônia', 'Aminoácidos plasmáticos', 'Ácido orótico urinário', 'Análise molecular'],
        examesImagem: ['RM encéfalo'],
        citations: [{ refId: 'otc-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Manter amônia <80 μmol/L', 'Prevenir crises', 'Otimizar desenvolvimento'],
        naoFarmacologico: {
          medidas: ['Dieta hipoproteica com AAE', 'Transplante hepático definitivo'],
          citations: [{ refId: 'otc-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Scavenger', medicamentos: ['Fenilbutirato de sódio 450-600 mg/kg/dia', 'Fenilbutirato de glicerol'] },
            { classe: 'Suplemento', medicamentos: ['L-citrulina 100-200 mg/kg/dia'] }
          ],
          situacoesEspeciais: [
            { situacao: 'Crise aguda', conduta: 'Benzoato de sódio + fenilacetato IV, diálise se refratário' }
          ],
          citations: [{ refId: 'otc-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal no 1º ano, depois a cada 3-6 meses',
        examesControle: ['Amônia', 'Aminoácidos', 'Glutamina', 'Função hepática'],
        metasTerapeuticas: ['Amônia <80 μmol/L', 'Glutamina <1000 μmol/L'],
        criteriosEncaminhamento: ['Centro de erros inatos', 'Hepatologia/transplante'],
        citations: [{ refId: 'otc-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-ciclo-ureia-ms'],
    medicamentos: ['fenilbutirato-sodio', 'l-citrulina'],
    calculadoras: [],
    citations: [{ refId: 'otc-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'ciclo-ureia', 'hiperamonemia', 'ligada-x']
  },

  // ============================================
  // CONECTIVOPATIAS HEREDITÁRIAS (5)
  // ============================================
  {
    id: 'sindrome-marfan',
    titulo: 'Síndrome de Marfan',
    sinonimos: ['Marfan syndrome'],
    doid: 'DOID:14323',
    snomedCT: '19346006',
    ordo: ['ORPHA:558'],
    ciap2: ['L99'],
    cid10: ['Q87.4'],
    categoria: 'musculoesqueletico',
    subcategoria: 'conectivopatia',
    quickView: {
      definicao: 'Conectivopatia hereditária por mutação no gene FBN1 (fibrilina-1), afetando sistema cardiovascular, esquelético e ocular.',
      criteriosDiagnosticos: [
        'Dilatação/dissecção de aorta',
        'Ectopia de cristalino',
        'Sinais esqueléticos (escore sistêmico ≥7)',
        'História familiar positiva',
        'Mutação FBN1 patogênica',
        'Critérios de Ghent revisados (2010)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Restrição de exercício intenso', 'Cirurgia aórtica profilática'],
        farmacologico: ['Betabloqueador', 'Losartana']
      },
      redFlags: ['Diâmetro aórtico >5 cm', 'Crescimento rápido (>0.5 cm/ano)', 'Dissecção aórtica', 'Descolamento de retina']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:5.000-10.000',
        faixaEtaria: 'Qualquer idade (diagnóstico frequente na adolescência)',
        fatoresRisco: ['Autossômica dominante', '25% mutações de novo'],
        citations: [{ refId: 'marfan-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Alta estatura', 'Dor articular', 'Miopia', 'Palpitações'],
        sinaisExameFisico: ['Aracnodactilia', 'Pectus excavatum/carinatum', 'Escoliose', 'Hipermobilidade'],
        formasClinicas: ['Clássica', 'Neonatal (grave)', 'Incompleta'],
        citations: [{ refId: 'marfan-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Critérios de Ghent 2010', 'Mutação FBN1 patogênica confirma diagnóstico'],
        diagnosticoDiferencial: ['Loeys-Dietz', 'Ehlers-Danlos vascular', 'Homocistinúria', 'MASS phenotype'],
        examesLaboratoriais: ['Sequenciamento FBN1'],
        examesImagem: ['Eco cardíaco (raiz aórtica)', 'Angio-TC/RM aorta', 'Exame oftalmológico completo'],
        citations: [{ refId: 'marfan-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Prevenir dissecção aórtica', 'Monitorar cristalino', 'Tratar escoliose'],
        naoFarmacologico: {
          medidas: ['Evitar esportes de contato e isométricos', 'Cirurgia aórtica se critério atingido'],
          citations: [{ refId: 'marfan-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Betabloqueador', medicamentos: ['Atenolol 1-2 mg/kg/dia', 'Propranolol'] },
            { classe: 'BRA', medicamentos: ['Losartana 0.5-1 mg/kg/dia'] }
          ],
          citations: [{ refId: 'marfan-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-12 meses',
        examesControle: ['Eco cardíaco anual', 'TC/RM aorta conforme evolução', 'Oftalmologia anual'],
        metasTerapeuticas: ['Raiz aórtica estável', 'Cristalino estável'],
        criteriosEncaminhamento: ['Cardiologia (cirurgia cardiovascular)', 'Oftalmologia', 'Ortopedia'],
        citations: [{ refId: 'marfan-follow-up-2022' }]
      }
    },
    protocolos: [],
    medicamentos: ['atenolol', 'losartana'],
    calculadoras: [],
    citations: [{ refId: 'marfan-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'conectivopatia', 'aorta', 'fibrilina']
  },
  {
    id: 'sindrome-ehlers-danlos-hipermobile',
    titulo: 'Síndrome de Ehlers-Danlos Hipermóvel',
    sinonimos: ['hEDS', 'EDS tipo III'],
    doid: 'DOID:13359',
    snomedCT: '398114001',
    ordo: ['ORPHA:285'],
    ciap2: ['L99'],
    cid10: ['Q79.6'],
    categoria: 'musculoesqueletico',
    subcategoria: 'conectivopatia',
    quickView: {
      definicao: 'Forma mais comum de EDS, caracterizada por hipermobilidade articular generalizada, dor crônica e fragilidade tecidual, sem gene identificado.',
      criteriosDiagnosticos: [
        'Hipermobilidade articular generalizada (Beighton ≥5)',
        'Dois ou mais critérios A (pele hiperextensível, prolapso pélvico, etc.)',
        'Um ou mais critério B (dor crônica, história familiar)',
        'Exclusão de outras EDS e doenças do tecido conjuntivo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia', 'Exercício de fortalecimento', 'Órteses'],
        farmacologico: ['Analgésicos', 'Tratamento de comorbidades (POTS, MCAS)']
      },
      redFlags: ['Subluxações frequentes', 'Dor incapacitante', 'Disautonomia grave']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Estimada 1:500-5.000 (subdiagnosticada)',
        faixaEtaria: 'Infância a adulto (diagnóstico frequente após puberdade)',
        fatoresRisco: ['Provavelmente autossômica dominante', 'Gene não identificado'],
        citations: [{ refId: 'heds-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Dor articular crônica', 'Fadiga', 'Subluxações recorrentes', 'Sintomas GI'],
        sinaisExameFisico: ['Hipermobilidade', 'Pele macia/aveludada', 'Equimoses fáceis', 'Pápulas piezogênicas'],
        formasClinicas: ['Leve', 'Moderada', 'Grave (incapacitante)'],
        citations: [{ refId: 'heds-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Critérios diagnósticos 2017 (três critérios obrigatórios)'],
        diagnosticoDiferencial: ['Outras EDS', 'Síndrome de hipermobilidade articular', 'Marfan', 'Osteogênese imperfeita'],
        examesLaboratoriais: ['Exclusão de outras EDS (painel genético)', 'Exclusão de doenças reumatológicas'],
        examesImagem: ['RX de articulações sintomáticas', 'RM se indicado'],
        citations: [{ refId: 'heds-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Controle da dor', 'Estabilização articular', 'Qualidade de vida'],
        naoFarmacologico: {
          medidas: ['Fisioterapia especializada', 'Exercício aquático', 'Terapia ocupacional'],
          citations: [{ refId: 'heds-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Analgésicos', medicamentos: ['Paracetamol', 'AINEs com cautela'] },
            { classe: 'Neuromoduladores', medicamentos: ['Duloxetina', 'Pregabalina'] }
          ],
          citations: [{ refId: 'heds-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Conforme necessidade',
        examesControle: ['Avaliação funcional', 'Screening de comorbidades (POTS, MCAS)'],
        metasTerapeuticas: ['Funcionalidade', 'Controle de dor'],
        criteriosEncaminhamento: ['Reumatologia', 'Fisiatria', 'Genética'],
        citations: [{ refId: 'heds-follow-up-2022' }]
      }
    },
    protocolos: [],
    medicamentos: ['duloxetina', 'pregabalina'],
    calculadoras: ['beighton-score'],
    citations: [{ refId: 'heds-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'conectivopatia', 'hipermobilidade', 'dor-cronica']
  },
  {
    id: 'sindrome-ehlers-danlos-vascular',
    titulo: 'Síndrome de Ehlers-Danlos Vascular',
    sinonimos: ['vEDS', 'EDS tipo IV'],
    doid: 'DOID:0050765',
    snomedCT: '236666006',
    ordo: ['ORPHA:286'],
    ciap2: ['L99'],
    cid10: ['Q79.6'],
    categoria: 'musculoesqueletico',
    subcategoria: 'conectivopatia',
    quickView: {
      definicao: 'Forma grave de EDS por mutação em COL3A1, com fragilidade arterial/visceral e alto risco de ruptura arterial ou intestinal.',
      criteriosDiagnosticos: [
        'Ruptura arterial (carótida, ilíaca, aorta)',
        'Ruptura intestinal (sigmoide)',
        'Ruptura uterina em gestantes',
        'Fácies característica (nariz fino, lábios finos, olhos proeminentes)',
        'Pele fina e translúcida',
        'Mutação COL3A1'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar trauma', 'Evitar procedimentos invasivos desnecessários'],
        farmacologico: ['Celiprolol (reduz eventos)']
      },
      redFlags: ['Dor abdominal aguda', 'Dor torácica', 'Cefaleia súbita', 'Qualquer sangramento']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:50.000-200.000',
        faixaEtaria: 'Eventos vasculares tipicamente 20-40 anos',
        fatoresRisco: ['Autossômica dominante', '50% mutações de novo'],
        citations: [{ refId: 'veds-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Equimoses espontâneas', 'Ruptura arterial', 'Perfuração intestinal'],
        sinaisExameFisico: ['Fácies típica', 'Pele fina translúcida com veias visíveis', 'Acrogeria'],
        formasClinicas: ['Clássica', 'Arterial pura', 'Digestiva pura'],
        citations: [{ refId: 'veds-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Critérios maiores + mutação COL3A1 confirma', 'Biópsia de pele (colágeno tipo III)'],
        diagnosticoDiferencial: ['Outras EDS', 'Marfan', 'Loeys-Dietz'],
        examesLaboratoriais: ['Sequenciamento COL3A1'],
        examesImagem: ['Angio-TC/RM de crânio a pelve (baseline)', 'Evitar procedimentos invasivos'],
        citations: [{ refId: 'veds-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Prevenir eventos vasculares', 'Manejo conservador de complicações'],
        naoFarmacologico: {
          medidas: ['Evitar traumas', 'Parto cesáreo eletivo', 'Evitar colonoscopia se possível'],
          citations: [{ refId: 'veds-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Betabloqueador', medicamentos: ['Celiprolol 200-400 mg/dia (reduz eventos)'] }
          ],
          citations: [{ refId: 'veds-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-12 meses',
        examesControle: ['Avaliação vascular não-invasiva', 'Aconselhamento gestacional'],
        metasTerapeuticas: ['Prevenção de eventos', 'Sobrevida'],
        criteriosEncaminhamento: ['Centro especializado em EDS vascular', 'Cirurgia vascular (emergências)'],
        citations: [{ refId: 'veds-follow-up-2022' }]
      }
    },
    protocolos: [],
    medicamentos: ['celiprolol'],
    calculadoras: [],
    citations: [{ refId: 'veds-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'conectivopatia', 'vascular', 'colageno-iii', 'emergencia']
  },
  {
    id: 'osteogenese-imperfeita',
    titulo: 'Osteogênese Imperfeita',
    sinonimos: ['Doença dos ossos de vidro', 'OI'],
    doid: 'DOID:12347',
    snomedCT: '78314001',
    ordo: ['ORPHA:666'],
    ciap2: ['L99'],
    cid10: ['Q78.0'],
    categoria: 'musculoesqueletico',
    subcategoria: 'displasia-ossea',
    quickView: {
      definicao: 'Grupo de doenças hereditárias do colágeno tipo I causando fragilidade óssea com fraturas recorrentes.',
      criteriosDiagnosticos: [
        'Fraturas de repetição com trauma mínimo',
        'Escleróticas azuladas',
        'Dentinogênese imperfeita',
        'Perda auditiva condutiva',
        'Hipermobilidade articular',
        'Mutação em COL1A1/COL1A2 ou genes relacionados'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia', 'Cirurgia ortopédica (hastes intramedulares)'],
        farmacologico: ['Bisfosfonatos (pamidronato, ácido zoledrônico)']
      },
      redFlags: ['Fraturas vertebrais', 'Impressão basilar', 'Insuficiência respiratória (formas graves)']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:15.000-20.000 nascidos vivos',
        faixaEtaria: 'Diagnóstico pré-natal a adulto',
        fatoresRisco: ['AD (maioria) ou AR', '60% mutações de novo nas formas graves'],
        citations: [{ refId: 'oi-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fraturas frequentes', 'Deformidades ósseas', 'Baixa estatura', 'Dor crônica'],
        sinaisExameFisico: ['Escleróticas azuis', 'Fácies triangular', 'Cifoscoliose', 'Dentes opalescentes'],
        formasClinicas: ['Tipo I (leve)', 'Tipo II (letal perinatal)', 'Tipo III (grave progressiva)', 'Tipo IV (moderada)'],
        citations: [{ refId: 'oi-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Clínica + história familiar + confirmação molecular'],
        diagnosticoDiferencial: ['Abuso infantil', 'Raquitismo', 'Osteoporose juvenil', 'Hipofosfatasia'],
        examesLaboratoriais: ['Cálcio, fósforo, FA, vitamina D (normais)', 'Análise molecular'],
        examesImagem: ['RX esqueleto', 'DXA', 'RM coluna (impressão basilar)'],
        citations: [{ refId: 'oi-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Reduzir fraturas', 'Melhorar densidade óssea', 'Maximizar função'],
        naoFarmacologico: {
          medidas: ['Fisioterapia aquática', 'Hastes telescópicas', 'Correção de escoliose'],
          citations: [{ refId: 'oi-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Bisfosfonatos', medicamentos: ['Pamidronato IV 1 mg/kg/dia x 3 dias a cada 3-4 meses', 'Ácido zoledrônico'] }
          ],
          segundaLinha: [
            { classe: 'Anticorpo anti-esclerostina', medicamentos: ['Romosozumabe (investigacional em OI)'] }
          ],
          citations: [{ refId: 'oi-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: ['RX esqueleto anual', 'DXA', 'Audiometria', 'RM craniocervical'],
        metasTerapeuticas: ['Redução de fraturas', 'Melhora de DMO'],
        criteriosEncaminhamento: ['Centro de referência OI', 'Ortopedia', 'Otorrinolaringologia'],
        citations: [{ refId: 'oi-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-oi-ms'],
    medicamentos: ['pamidronato', 'acido-zoledronico'],
    calculadoras: [],
    citations: [{ refId: 'oi-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'displasia-ossea', 'colageno', 'fraturas', 'bisfosfonatos']
  },
  {
    id: 'sindrome-loeys-dietz',
    titulo: 'Síndrome de Loeys-Dietz',
    sinonimos: ['LDS'],
    doid: 'DOID:0050466',
    snomedCT: '702439008',
    ordo: ['ORPHA:60030'],
    ciap2: ['L99'],
    cid10: ['Q87.4'],
    categoria: 'musculoesqueletico',
    subcategoria: 'conectivopatia',
    quickView: {
      definicao: 'Conectivopatia com aneurismas arteriais difusos e tortuosidade arterial, por mutações em genes da via TGF-β (TGFBR1, TGFBR2, SMAD3, TGFB2, TGFB3).',
      criteriosDiagnosticos: [
        'Aneurisma/dissecção de aorta (pode ocorrer em diâmetros menores)',
        'Tortuosidade arterial difusa',
        'Hipertelorismo',
        'Úvula bífida ou fenda palatina',
        'Pé torto congênito',
        'Mutação em gene LDS'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Cirurgia aórtica precoce (limiares menores que Marfan)'],
        farmacologico: ['Losartana', 'Betabloqueador']
      },
      redFlags: ['Dissecção em qualquer artéria', 'Dilatação progressiva', 'Ruptura uterina']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Desconhecida (rara)',
        faixaEtaria: 'Diagnóstico na infância ou adulto jovem',
        fatoresRisco: ['Autossômica dominante'],
        citations: [{ refId: 'lds-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Pode ser assintomático até evento vascular', 'Dor torácica/abdominal (dissecção)'],
        sinaisExameFisico: ['Hipertelorismo', 'Úvula bífida', 'Pele translúcida', 'Cicatrizes atróficas'],
        formasClinicas: ['LDS tipo 1-5 (por gene)', 'Fenótipos variáveis'],
        citations: [{ refId: 'lds-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Critérios clínicos + mutação patogênica em gene LDS'],
        diagnosticoDiferencial: ['Marfan', 'EDS vascular', 'Aneurisma familiar'],
        examesLaboratoriais: ['Painel genético LDS/conectivopatias'],
        examesImagem: ['Angio-TC/RM de crânio a pelve', 'Eco cardíaco'],
        citations: [{ refId: 'lds-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Prevenir dissecção/ruptura', 'Cirurgia profilática precoce'],
        naoFarmacologico: {
          medidas: ['Cirurgia aórtica com diâmetro menor (4.0-4.2 cm)', 'Vigilância arterial difusa'],
          citations: [{ refId: 'lds-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'BRA', medicamentos: ['Losartana'] },
            { classe: 'Betabloqueador', medicamentos: ['Atenolol'] }
          ],
          citations: [{ refId: 'lds-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6 meses',
        examesControle: ['Angio-TC/RM anual (todo árvore arterial)', 'Eco cardíaco'],
        metasTerapeuticas: ['Estabilidade arterial', 'Detecção precoce de dilatação'],
        criteriosEncaminhamento: ['Cirurgia cardiovascular com experiência em conectivopatias', 'Genética'],
        citations: [{ refId: 'lds-follow-up-2022' }]
      }
    },
    protocolos: [],
    medicamentos: ['losartana', 'atenolol'],
    calculadoras: [],
    citations: [{ refId: 'lds-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'conectivopatia', 'tgf-beta', 'aneurisma', 'tortuosidade']
  },

  // ============================================
  // OUTRAS DOENÇAS RARAS (5)
  // ============================================
  {
    id: 'esclerose-lateral-amiotrofica',
    titulo: 'Esclerose Lateral Amiotrófica',
    sinonimos: ['ELA', 'ALS', 'Doença de Lou Gehrig', 'Doença do neurônio motor'],
    doid: 'DOID:332',
    snomedCT: '86044005',
    ordo: ['ORPHA:803'],
    ciap2: ['N99'],
    cid10: ['G12.2'],
    categoria: 'neurologico',
    subcategoria: 'neuronio-motor',
    quickView: {
      definicao: 'Doença neurodegenerativa progressiva e fatal que afeta neurônios motores superiores e inferiores, causando fraqueza muscular progressiva.',
      criteriosDiagnosticos: [
        'Sinais de NMS (espasticidade, hiperreflexia, Babinski)',
        'Sinais de NMI (atrofia, fasciculações, fraqueza)',
        'Progressão para outras regiões',
        'Exclusão de outras causas',
        'Critérios de El Escorial revisados'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['VNI', 'Gastrostomia', 'Fisioterapia/fonoaudiologia', 'Cuidados paliativos'],
        farmacologico: ['Riluzol', 'Edaravone']
      },
      redFlags: ['Insuficiência respiratória', 'Disfagia grave', 'Demência frontotemporal associada']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '5:100.000',
        incidencia: '2:100.000/ano',
        faixaEtaria: 'Tipicamente 50-70 anos',
        fatoresRisco: ['Esporádica (90%)', 'Familiar (10%, genes SOD1, C9orf72, FUS, TARDBP)'],
        citations: [{ refId: 'als-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fraqueza assimétrica', 'Atrofia muscular', 'Câimbras', 'Disartria', 'Disfagia'],
        sinaisExameFisico: ['Fasciculações', 'Atrofia de mãos/língua', 'Hiperreflexia', 'Babinski'],
        formasClinicas: ['Espinhal (membros)', 'Bulbar', 'Respiratória', 'ELA-DFT'],
        citations: [{ refId: 'als-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Critérios de El Escorial/Awaji', 'ENMG com desnervação ativa em múltiplas regiões'],
        diagnosticoDiferencial: ['Mielopatia cervical', 'Neuropatia motora multifocal', 'Kennedy', 'Miastenia'],
        examesLaboratoriais: ['ENMG', 'CPK', 'Anticorpos anti-GM1'],
        examesImagem: ['RM encéfalo e coluna'],
        citations: [{ refId: 'als-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Prolongar sobrevida', 'Manter qualidade de vida', 'Suporte respiratório/nutricional'],
        naoFarmacologico: {
          medidas: ['VNI precoce', 'Gastrostomia quando disfagia', 'Equipe multidisciplinar'],
          citations: [{ refId: 'als-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antiglutamatérgico', medicamentos: ['Riluzol 50 mg 2x/dia'] }
          ],
          segundaLinha: [
            { classe: 'Antioxidante', medicamentos: ['Edaravone'] }
          ],
          citations: [{ refId: 'als-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 2-3 meses',
        examesControle: ['ALSFRS-R', 'CVF', 'Avaliação de disfagia', 'Peso'],
        metasTerapeuticas: ['CVF >50%', 'Nutrição adequada', 'Qualidade de vida'],
        criteriosEncaminhamento: ['Centro de ELA', 'Pneumologia', 'Nutrição', 'Cuidados paliativos'],
        citations: [{ refId: 'als-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-ela-ms'],
    medicamentos: ['riluzol', 'edaravone'],
    calculadoras: ['alsfrs-r'],
    citations: [{ refId: 'als-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'neuronio-motor', 'neurodegenerativa', 'riluzol']
  },
  {
    id: 'huntington',
    titulo: 'Doença de Huntington',
    sinonimos: ['Coreia de Huntington', 'HD'],
    doid: 'DOID:12858',
    snomedCT: '58756001',
    ordo: ['ORPHA:399'],
    ciap2: ['N99'],
    cid10: ['G10'],
    categoria: 'neurologico',
    subcategoria: 'neurodegeneracao',
    quickView: {
      definicao: 'Doença neurodegenerativa autossômica dominante por expansão CAG no gene HTT, causando coreia, declínio cognitivo e alterações psiquiátricas.',
      criteriosDiagnosticos: [
        'Movimentos coreicos',
        'Declínio cognitivo progressivo',
        'Alterações psiquiátricas (depressão, irritabilidade)',
        'História familiar positiva',
        'Expansão CAG ≥36 no gene HTT'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Suporte multidisciplinar', 'Terapia ocupacional', 'Aconselhamento genético'],
        farmacologico: ['Tetrabenazina (coreia)', 'Antidepressivos', 'Antipsicóticos atípicos']
      },
      redFlags: ['Suicidalidade', 'Disfagia grave', 'Quedas frequentes', 'Demência avançada']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '5-10:100.000 (população caucasiana)',
        faixaEtaria: 'Início tipicamente 35-45 anos (range 2-80)',
        fatoresRisco: ['Autossômica dominante', 'Penetrância completa com ≥40 CAG'],
        citations: [{ refId: 'hd-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Movimentos involuntários', 'Alteração de personalidade', 'Dificuldade de memória', 'Depressão'],
        sinaisExameFisico: ['Coreia', 'Impersistência motora', 'Disartria', 'Distúrbio de marcha'],
        formasClinicas: ['Adulta (mais comum)', 'Juvenil (Westphal, rigidez > coreia)'],
        citations: [{ refId: 'hd-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Clínica característica + expansão CAG ≥36'],
        diagnosticoDiferencial: ['Coreias secundárias', 'HDL2', 'Neuroacantocitose', 'Ataxia espinocerebelar'],
        examesLaboratoriais: ['Teste genético para expansão CAG'],
        examesImagem: ['RM encéfalo (atrofia caudado)'],
        citations: [{ refId: 'hd-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Controlar coreia', 'Tratar sintomas psiquiátricos', 'Manter função'],
        naoFarmacologico: {
          medidas: ['Fisioterapia', 'Fonoaudiologia', 'Suporte nutricional'],
          citations: [{ refId: 'hd-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Depleto dopamina', medicamentos: ['Tetrabenazina 12.5-100 mg/dia', 'Deutetrabenazina'] },
            { classe: 'Antidepressivo', medicamentos: ['ISRS'] }
          ],
          citations: [{ refId: 'hd-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-12 meses',
        examesControle: ['UHDRS', 'Avaliação psiquiátrica', 'Nutrição', 'Deglutição'],
        metasTerapeuticas: ['Controle de sintomas', 'Segurança'],
        criteriosEncaminhamento: ['Centro de Huntington', 'Psiquiatria', 'Genética'],
        citations: [{ refId: 'hd-follow-up-2022' }]
      }
    },
    protocolos: [],
    medicamentos: ['tetrabenazina', 'deutetrabenazina'],
    calculadoras: ['uhdrs'],
    citations: [{ refId: 'hd-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'neurodegenerativa', 'coreia', 'tripleto-cag']
  },
  {
    id: 'miastenia-gravis',
    titulo: 'Miastenia Gravis',
    sinonimos: ['MG'],
    doid: 'DOID:437',
    snomedCT: '17096001',
    ordo: ['ORPHA:589'],
    ciap2: ['N99'],
    cid10: ['G70.0'],
    categoria: 'neurologico',
    subcategoria: 'juncao-neuromuscular',
    quickView: {
      definicao: 'Doença autoimune da junção neuromuscular por anticorpos contra receptores de acetilcolina (AChR) ou MuSK, causando fraqueza flutuante.',
      criteriosDiagnosticos: [
        'Fraqueza muscular flutuante (piora com exercício)',
        'Ptose e/ou diplopia',
        'Fraqueza bulbar (disfagia, disartria)',
        'Melhora com anticolinesterásicos',
        'Anticorpos anti-AChR ou anti-MuSK positivos',
        'Decremento na estimulação repetitiva'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Timectomia (se timoma ou AChR+ generalizada)'],
        farmacologico: ['Piridostigmina', 'Corticosteroides', 'Imunossupressores']
      },
      redFlags: ['Crise miastênica (insuficiência respiratória)', 'Disfagia grave', 'Dispneia']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '15-20:100.000',
        faixaEtaria: 'Bimodal: mulheres jovens (20-30), homens idosos (60-70)',
        fatoresRisco: ['Timoma (10-15%)', 'Outras doenças autoimunes'],
        citations: [{ refId: 'mg-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Ptose', 'Diplopia', 'Fraqueza de membros', 'Disfagia', 'Dispneia'],
        sinaisExameFisico: ['Ptose fatigável', 'Fraqueza proximal', 'Voz nasalada'],
        formasClinicas: ['Ocular', 'Generalizada', 'Bulbar predominante', 'MuSK+', 'Seronegativa'],
        citations: [{ refId: 'mg-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Clínica + anticorpos (AChR, MuSK, LRP4) + ENMG'],
        diagnosticoDiferencial: ['Lambert-Eaton', 'Miopatias mitocondriais', 'Botulismo', 'AVC tronco'],
        examesLaboratoriais: ['Anti-AChR', 'Anti-MuSK', 'Anti-LRP4', 'Função tireoidiana'],
        examesImagem: ['TC de tórax (timoma)'],
        citations: [{ refId: 'mg-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Remissão ou mínima manifestação', 'Prevenir crises', 'Ressecção de timoma'],
        naoFarmacologico: {
          medidas: ['Timectomia (se indicada)', 'Evitar drogas que pioram MG'],
          citations: [{ refId: 'mg-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Anticolinesterásico', medicamentos: ['Piridostigmina 30-120 mg 3-4x/dia'] },
            { classe: 'Corticosteroide', medicamentos: ['Prednisona (início lento, escalonado)'] }
          ],
          segundaLinha: [
            { classe: 'Imunossupressor', medicamentos: ['Azatioprina', 'Micofenolato', 'Ciclosporina'] },
            { classe: 'Biológicos', medicamentos: ['Rituximabe (MuSK+)', 'Eculizumabe', 'Efgartigimod'] }
          ],
          situacoesEspeciais: [
            { situacao: 'Crise miastênica', conduta: 'Plasmaférese ou IgIV + UTI + suporte ventilatório' }
          ],
          citations: [{ refId: 'mg-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: ['MGFA status', 'MG-ADL', 'Função pulmonar se sintomas'],
        metasTerapeuticas: ['Remissão estável ou mínima manifestação'],
        criteriosEncaminhamento: ['Neurologia', 'Cirurgia torácica (timoma)', 'UTI (crise)'],
        citations: [{ refId: 'mg-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-mg-ms'],
    medicamentos: ['piridostigmina', 'prednisona', 'azatioprina', 'rituximabe', 'eculizumabe'],
    calculadoras: ['mg-adl', 'qmg'],
    citations: [{ refId: 'mg-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'autoimune', 'juncao-neuromuscular', 'timoma']
  },
  {
    id: 'hipertensao-arterial-pulmonar',
    titulo: 'Hipertensão Arterial Pulmonar',
    sinonimos: ['HAP', 'PAH'],
    doid: 'DOID:6432',
    snomedCT: '70995007',
    ordo: ['ORPHA:182090'],
    ciap2: ['K99'],
    cid10: ['I27.0'],
    categoria: 'cardiovascular',
    subcategoria: 'hipertensao-pulmonar',
    quickView: {
      definicao: 'Doença vascular pulmonar caracterizada por remodelamento das artérias pulmonares, levando a hipertensão pulmonar e insuficiência cardíaca direita.',
      criteriosDiagnosticos: [
        'PAPm ≥20 mmHg no cateterismo direito',
        'PCP ≤15 mmHg (pré-capilar)',
        'RVP >2 unidades Wood',
        'Exclusão de causas secundárias',
        'Sintomas de IC direita'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Restrição de sal e líquidos', 'Exercício supervisionado', 'Oxigenoterapia se hipoxemia'],
        farmacologico: ['Terapia vasodilatadora específica: ERA, PDE5i, prostaciclinas, agonista receptor IP']
      },
      redFlags: ['Síncope', 'IC direita refratária', 'BNP muito elevado', 'Hipoxemia grave']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '15-50:1.000.000',
        faixaEtaria: 'Qualquer idade (pico 30-60 anos)',
        fatoresRisco: ['BMPR2 mutação', 'Esclerodermia', 'HIV', 'Porto-pulmonar'],
        citations: [{ refId: 'pah-epidemiology-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Dispneia aos esforços', 'Fadiga', 'Síncope', 'Dor torácica'],
        sinaisExameFisico: ['Turgência jugular', 'Edema de MMII', 'Hepatomegalia', 'Sopro de IT'],
        formasClinicas: ['Idiopática', 'Hereditária', 'Associada a doenças (esclerodermia, HIV, cardiopatia)'],
        citations: [{ refId: 'pah-phenotypes-2021' }]
      },
      diagnostico: {
        criterios: ['Cateterismo cardíaco direito confirmatório', 'Exclusão de outras causas (Grupo 2-5)'],
        diagnosticoDiferencial: ['HP por cardiopatia esquerda', 'HP por pneumopatia', 'CTEPH'],
        examesLaboratoriais: ['BNP/NT-proBNP', 'Autoanticorpos', 'HIV', 'Função hepática'],
        examesImagem: ['Eco cardíaco', 'Cintilografia V/Q', 'Angio-TC tórax', 'Cateterismo direito'],
        citations: [{ refId: 'pah-diagnosis-2022' }]
      },
      tratamento: {
        objetivos: ['Melhorar classe funcional', 'Reduzir hospitalização', 'Melhorar sobrevida'],
        naoFarmacologico: {
          medidas: ['Reabilitação cardiopulmonar', 'Anticoagulação seletiva', 'Transplante pulmonar se refratário'],
          citations: [{ refId: 'pah-management-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'ERA', medicamentos: ['Ambrisentana', 'Bosentana', 'Macitentana'] },
            { classe: 'PDE5i', medicamentos: ['Sildenafila', 'Tadalafila'] },
            { classe: 'Estimulador sGC', medicamentos: ['Riociguate'] }
          ],
          segundaLinha: [
            { classe: 'Prostaciclinas', medicamentos: ['Epoprostenol IV', 'Treprostinil', 'Iloprost', 'Selexipag'] }
          ],
          citations: [{ refId: 'pah-treatment-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: ['BNP', 'Eco cardíaco', 'Teste de caminhada 6 min', 'CF OMS'],
        metasTerapeuticas: ['CF I-II', 'TC6M >440m', 'BNP normal'],
        criteriosEncaminhamento: ['Centro de referência em HAP', 'Transplante pulmonar'],
        citations: [{ refId: 'pah-follow-up-2022' }]
      }
    },
    protocolos: ['protocolo-hap-ms'],
    medicamentos: ['ambrisentana', 'bosentana', 'sildenafila', 'tadalafila', 'epoprostenol', 'selexipag'],
    calculadoras: ['risk-score-pah'],
    citations: [{ refId: 'pah-registry-2023' }],
    lastUpdate: '2025-01',
    tags: ['doenca-rara', 'hipertensao-pulmonar', 'vascular', 'ic-direita']
  }
];
