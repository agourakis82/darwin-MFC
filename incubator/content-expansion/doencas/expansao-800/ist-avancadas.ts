/**
 * IST AVANCADAS - DARWIN-MFC EXPANSAO 800
 * ========================================
 * Infeccoes Sexualmente Transmissiveis
 * 12 condicoes com estrutura completa
 */

import { Doenca } from '@/lib/types/doenca';

export const istAvancadas: Doenca[] = [
  // ============================================================================
  // 1. SIFILIS PRIMARIA
  // ============================================================================
  {
    id: 'sifilis-primaria',
    titulo: 'Sifilis Primaria',
    sinonimos: ['Cancro duro', 'Ulcera sifilitica'],
    doid: 'DOID:4166',
    snomedCT: '186847001',
    meshId: 'D013587',
    ciap2: ['X70', 'Y70'],
    cid10: ['A51.0'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Fase inicial da sifilis causada pelo Treponema pallidum. Caracterizada por ulcera genital unica, indolor, de base limpa (cancro duro) no local de inoculacao.',
      criteriosDiagnosticos: [
        'Ulcera genital unica, indolor, bordas elevadas, fundo limpo',
        'Linfadenopatia inguinal bilateral indolor',
        'Teste treponemico (teste rapido) ou nao-treponemico (VDRL) reagente',
        'Periodo de incubacao: 10-90 dias (media 21 dias)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Abstinencia sexual ate cura', 'Notificacao compulsoria', 'Convocacao de parceiros'],
        farmacologico: ['Penicilina G benzatina 2,4 milhoes UI IM dose unica']
      },
      metasTerapeuticas: ['Cura clinica e sorologica', 'Interrupcao da transmissao'],
      examesIniciais: ['Teste rapido treponemico', 'VDRL quantitativo', 'Anti-HIV', 'Hepatite B e C'],
      redFlags: ['Gestante (risco de sifilis congenita)', 'Coinfeccao HIV', 'Neurossifilis']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Aumento de 75% dos casos no Brasil entre 2016-2022',
        incidencia: '152.915 casos em 2022 (Brasil)',
        faixaEtaria: '20-29 anos (maior incidencia)',
        fatoresRisco: ['Multiplos parceiros', 'Sexo desprotegido', 'HSH', 'Uso de drogas', 'HIV positivo'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      fisiopatologia: {
        texto: 'T. pallidum penetra mucosa ou pele lesada, multiplica-se localmente formando cancro. Disseminacao hematogenica e linfatica ocorre precocemente.',
        citations: [{ refId: 'cdc-std-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Ulcera genital indolor unica', 'Base endurecida (cancro duro)', 'Linfadenopatia regional'],
        sinaisExameFisico: ['Ulcera de bordas elevadas e fundo limpo', 'Linfonodos inguinais bilaterais, moveis, indolores'],
        formasClinicas: ['Cancro genital', 'Cancro extragenital (oral, anal)'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      diagnostico: {
        criterios: ['Clinica sugestiva + teste treponemico reagente', 'VDRL/RPR reagente (pode ser negativo no inicio)', 'Pesquisa em campo escuro (se disponivel)'],
        diagnosticoDiferencial: ['Herpes genital', 'Cancro mole', 'Linfogranuloma venereo', 'Donovanose'],
        examesLaboratoriais: ['Teste rapido treponemico', 'VDRL quantitativo', 'FTA-Abs'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      tratamento: {
        objetivos: ['Erradicar T. pallidum', 'Prevenir progressao', 'Interromper transmissao'],
        naoFarmacologico: {
          medidas: ['Abstinencia sexual por 30 dias', 'Tratamento de parceiros', 'Notificacao compulsoria'],
          citations: [{ refId: 'ms-sifilis-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Penicilina', medicamentos: ['Penicilina G benzatina'], posologia: '2,4 milhoes UI IM dose unica' }
          ],
          segundaLinha: [
            { classe: 'Alternativa (alergia)', medicamentos: ['Doxiciclina'], posologia: '100mg VO 12/12h por 15 dias' }
          ],
          citations: [{ refId: 'cdc-std-2021' }]
        },
        duracao: 'Dose unica (penicilina) ou 15 dias (doxiciclina)'
      },
      acompanhamento: {
        frequenciaConsultas: 'VDRL trimestral por 1 ano',
        examesControle: ['VDRL 3, 6, 9, 12 meses'],
        metasTerapeuticas: ['Queda de 2 diluicoes do VDRL em 6 meses'],
        criteriosEncaminhamento: ['Falha terapeutica', 'Neurossifilis', 'Gestante'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      prevencao: {
        primaria: ['Uso de preservativo', 'PrEP (populacoes vulneraveis)', 'Educacao em saude'],
        secundaria: ['Triagem em gestantes', 'Testagem de parceiros'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      }
    },
    protocolos: ['sifilis-manejo'],
    medicamentos: ['penicilina-benzatina', 'doxiciclina'],
    calculadoras: [],
    rastreamentos: ['sifilis-gestante'],
    citations: [{ refId: 'ms-sifilis-2024' }, { refId: 'cdc-std-2021' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 2. SIFILIS SECUNDARIA
  // ============================================================================
  {
    id: 'sifilis-secundaria',
    titulo: 'Sifilis Secundaria',
    sinonimos: ['Sifilis disseminada', 'Roseola sifilitica'],
    doid: 'DOID:4166',
    snomedCT: '186849003',
    meshId: 'D013587',
    ciap2: ['X70', 'Y70'],
    cid10: ['A51.3'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Fase de disseminacao hematogenica do T. pallidum, 6-8 semanas apos cancro. Caracterizada por erupcao cutanea disseminada, lesoes mucosas e sintomas sistemicos.',
      criteriosDiagnosticos: [
        'Erupcao maculopapular disseminada (incluindo palmas e plantas)',
        'Condiloma plano (lesoes umidas perianais/genitais)',
        'Placas mucosas orais',
        'Alopecia em clareiras',
        'VDRL reagente com titulos elevados'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Abstinencia sexual ate cura', 'Notificacao', 'Tratamento de parceiros'],
        farmacologico: ['Penicilina G benzatina 2,4 milhoes UI IM dose unica']
      },
      metasTerapeuticas: ['Resolucao das lesoes', 'Queda dos titulos de VDRL'],
      examesIniciais: ['VDRL quantitativo', 'Anti-HIV', 'Hepatites B e C', 'Funcao hepatica'],
      redFlags: ['Sintomas neurologicos', 'Uveite', 'Gestante', 'HIV positivo']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Ocorre em 25% dos casos de sifilis primaria nao tratada',
        faixaEtaria: 'Adultos jovens',
        fatoresRisco: ['Sifilis primaria nao tratada', 'Imunossupressao'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      fisiopatologia: {
        texto: 'Disseminacao hematogenica do T. pallidum com deposicao em pele, mucosas e orgaos. Resposta imune causa inflamacao sistemica.',
        citations: [{ refId: 'cdc-std-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Erupcao cutanea difusa', 'Lesoes palmoplantares', 'Febre baixa', 'Mal-estar', 'Cefaleia'],
        sinaisExameFisico: ['Roseola sifilitica', 'Condiloma plano', 'Placas mucosas', 'Linfadenopatia generalizada', 'Alopecia areata'],
        formasClinicas: ['Forma cutanea', 'Forma mucosa', 'Neurossifilis precoce'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      diagnostico: {
        criterios: ['Clinica tipica + VDRL reagente (titulos geralmente >1:16)', 'Teste treponemico positivo'],
        diagnosticoDiferencial: ['Pitiríase rosea', 'Farmacodermia', 'Exantema viral', 'Psoriase gutata'],
        examesLaboratoriais: ['VDRL quantitativo', 'FTA-Abs', 'Hemograma'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      tratamento: {
        objetivos: ['Erradicar treponema', 'Prevenir sifilis terciaria'],
        naoFarmacologico: {
          medidas: ['Abstinencia sexual', 'Tratamento de parceiros', 'Notificacao compulsoria'],
          citations: [{ refId: 'ms-sifilis-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Penicilina', medicamentos: ['Penicilina G benzatina'], posologia: '2,4 milhoes UI IM dose unica' }
          ],
          segundaLinha: [
            { classe: 'Alternativa', medicamentos: ['Doxiciclina'], posologia: '100mg VO 12/12h por 15 dias' }
          ],
          citations: [{ refId: 'cdc-std-2021' }]
        },
        duracao: 'Dose unica ou 15 dias'
      },
      acompanhamento: {
        frequenciaConsultas: 'VDRL trimestral por 1 ano',
        metasTerapeuticas: ['Queda de 2 diluicoes em 6 meses', 'Resolucao clinica'],
        criteriosEncaminhamento: ['Sintomas neurologicos', 'Falha terapeutica'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      prevencao: {
        primaria: ['Preservativo', 'Educacao em saude'],
        secundaria: ['Tratamento precoce da sifilis primaria'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      }
    },
    protocolos: ['sifilis-manejo'],
    medicamentos: ['penicilina-benzatina', 'doxiciclina'],
    calculadoras: [],
    citations: [{ refId: 'ms-sifilis-2024' }, { refId: 'cdc-std-2021' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 3. SIFILIS TERCIARIA
  // ============================================================================
  {
    id: 'sifilis-terciaria',
    titulo: 'Sifilis Terciaria',
    sinonimos: ['Sifilis tardia', 'Neurossifilis', 'Sifilis cardiovascular', 'Goma sifilitica'],
    doid: 'DOID:4166',
    snomedCT: '186855005',
    meshId: 'D013587',
    ciap2: ['X70', 'Y70', 'N70'],
    cid10: ['A52.0', 'A52.1', 'A52.7'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Fase tardia da sifilis (3-20 anos apos infeccao) com acometimento cardiovascular, neurologico ou formacao de gomas. Potencialmente fatal se nao tratada.',
      criteriosDiagnosticos: [
        'Neurossifilis: tabes dorsalis, paralisia geral, meningite',
        'Sifilis cardiovascular: aortite, aneurisma de aorta',
        'Gomas sifiliticas (lesoes granulomatosas)',
        'VDRL pode ser negativo; FTA-Abs geralmente positivo',
        'LCR: pleocitose, proteinorraquia, VDRL positivo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Internacao para neurossifilis', 'Avaliacao cardiologica/neurologica'],
        farmacologico: ['Penicilina G cristalina 3-4 milhoes UI IV 4/4h por 14 dias (neurossifilis)']
      },
      metasTerapeuticas: ['Estabilizacao neurologica', 'Prevencao de progressao'],
      examesIniciais: ['VDRL e FTA-Abs', 'Puncao lombar', 'RNM cerebro', 'Ecocardiograma', 'TC/angio aorta'],
      redFlags: ['Sintomas neurologicos agudos', 'Aneurisma de aorta', 'Insuficiencia aortica']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Ocorre em 30-40% dos casos nao tratados',
        faixaEtaria: 'Adultos, decadas apos infeccao inicial',
        fatoresRisco: ['Sifilis nao tratada', 'HIV', 'Alcoolismo'],
        citations: [{ refId: 'cdc-std-2021' }]
      },
      fisiopatologia: {
        texto: 'Inflamacao cronica granulomatosa com formacao de gomas. Endarterite obliterante causa lesao vascular. Desmielinizacao na neurossifilis.',
        citations: [{ refId: 'cdc-std-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Alteracoes cognitivas', 'Ataxia', 'Dor lancinante (tabes)', 'Dispneia', 'Lesoes nodulares'],
        sinaisExameFisico: ['Pupila de Argyll Robertson', 'Romberg positivo', 'Sopro de insuficiencia aortica', 'Gomas cutaneas/osseas'],
        formasClinicas: ['Neurossifilis', 'Sifilis cardiovascular', 'Sifilis gomosa'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      diagnostico: {
        criterios: ['Clinica compativel + sorologia treponêmica positiva', 'LCR alterado na neurossifilis', 'Imagem sugestiva'],
        diagnosticoDiferencial: ['Demencia', 'AVC', 'Aneurisma de outras causas', 'Tumores'],
        examesLaboratoriais: ['VDRL', 'FTA-Abs', 'LCR completo'],
        examesImagem: ['RNM cerebro', 'Angio-TC aorta', 'Ecocardiograma'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      tratamento: {
        objetivos: ['Erradicar treponema do SNC', 'Prevenir progressao'],
        naoFarmacologico: {
          medidas: ['Internacao hospitalar', 'Reabilitacao neurologica', 'Cirurgia vascular se indicada'],
          citations: [{ refId: 'cdc-std-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Penicilina IV', medicamentos: ['Penicilina G cristalina'], posologia: '3-4 milhoes UI IV 4/4h por 14 dias' }
          ],
          segundaLinha: [
            { classe: 'Alternativa', medicamentos: ['Ceftriaxona'], posologia: '2g IV/IM 1x/dia por 14 dias' }
          ],
          citations: [{ refId: 'cdc-std-2021' }]
        },
        duracao: '14 dias de tratamento parenteral'
      },
      acompanhamento: {
        frequenciaConsultas: 'LCR a cada 6 meses ate normalizacao',
        metasTerapeuticas: ['Normalizacao do LCR', 'Estabilizacao clinica'],
        criteriosEncaminhamento: ['Neurologista', 'Cardiologista', 'Infectologista'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      prevencao: {
        primaria: ['Tratamento precoce da sifilis'],
        secundaria: ['Triagem populacional', 'Busca ativa de casos'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      }
    },
    protocolos: ['sifilis-manejo', 'neurossifilis'],
    medicamentos: ['penicilina-cristalina', 'ceftriaxona'],
    calculadoras: [],
    citations: [{ refId: 'ms-sifilis-2024' }, { refId: 'cdc-std-2021' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 4. GONORREIA
  // ============================================================================
  {
    id: 'gonorreia',
    titulo: 'Gonorreia',
    sinonimos: ['Blenorragia', 'Uretrite gonococica', 'Pingadeira'],
    doid: 'DOID:7551',
    snomedCT: '15628003',
    meshId: 'D006069',
    ciap2: ['X71', 'Y71'],
    cid10: ['A54.0', 'A54.9'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'IST causada pela Neisseria gonorrhoeae. Manifesta-se como uretrite purulenta no homem e cervicite na mulher. Pode ser assintomatica.',
      criteriosDiagnosticos: [
        'Homem: corrimento uretral purulento abundante + disuria',
        'Mulher: corrimento cervical mucopurulento (frequentemente assintomatica)',
        'Gram de secrecao: diplococos Gram-negativos intracelulares',
        'PCR/NAAT positivo para N. gonorrhoeae'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Abstinencia sexual por 7 dias', 'Tratamento de parceiros', 'Notificacao'],
        farmacologico: ['Ceftriaxona 500mg IM dose unica + Azitromicina 1g VO dose unica']
      },
      metasTerapeuticas: ['Cura clinica', 'Erradicacao bacteriana'],
      examesIniciais: ['Gram de secrecao', 'PCR/NAAT', 'Cultura (se disponivel)', 'Sorologias (HIV, sifilis, hepatites)'],
      redFlags: ['Doenca inflamatoria pelvica', 'Artrite septica', 'Gonococcemia disseminada']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Segunda IST bacteriana mais comum',
        incidencia: '82 milhoes de casos/ano (OMS)',
        faixaEtaria: '15-24 anos',
        fatoresRisco: ['Multiplos parceiros', 'Sexo desprotegido', 'Historia de IST previa'],
        citations: [{ refId: 'who-std-2021' }]
      },
      fisiopatologia: {
        texto: 'N. gonorrhoeae adere ao epitélio colunar da uretra/cervice atraves de pili. Invade celulas epiteliais e desencadeia resposta inflamatoria intensa.',
        citations: [{ refId: 'cdc-std-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Corrimento uretral purulento', 'Disuria', 'Cervicite', 'Proctite', 'Faringite'],
        sinaisExameFisico: ['Secrecao uretral purulenta', 'Hiperemia de meato', 'Colo uterino friavel'],
        formasClinicas: ['Uretrite', 'Cervicite', 'Proctite', 'Faringite', 'Conjuntivite', 'DIP', 'Gonococcemia'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      diagnostico: {
        criterios: ['Clinica + Gram com diplococos intracelulares', 'PCR/NAAT positivo'],
        diagnosticoDiferencial: ['Uretrite por clamidia', 'Tricomoniase', 'Vaginose bacteriana'],
        examesLaboratoriais: ['Gram de secrecao', 'PCR/NAAT', 'Cultura com antibiograma'],
        citations: [{ refId: 'cdc-std-2021' }]
      },
      tratamento: {
        objetivos: ['Erradicar N. gonorrhoeae', 'Tratar coinfeccao por clamidia'],
        naoFarmacologico: {
          medidas: ['Abstinencia sexual por 7 dias', 'Tratamento de parceiros dos ultimos 60 dias'],
          citations: [{ refId: 'cdc-std-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Cefalosporina + Macrolideo', medicamentos: ['Ceftriaxona', 'Azitromicina'], posologia: 'Ceftriaxona 500mg IM + Azitromicina 1g VO dose unica' }
          ],
          segundaLinha: [
            { classe: 'Alternativa', medicamentos: ['Gentamicina', 'Azitromicina'], posologia: 'Gentamicina 240mg IM + Azitromicina 2g VO (se alergia a cefalosporina)' }
          ],
          citations: [{ refId: 'cdc-std-2021' }]
        },
        duracao: 'Dose unica'
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno em 7 dias; teste de cura se sintomas persistirem',
        metasTerapeuticas: ['Resolucao dos sintomas', 'PCR negativo se teste de cura'],
        criteriosEncaminhamento: ['DIP', 'Artrite gonococcica', 'Resistencia antimicrobiana'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      prevencao: {
        primaria: ['Uso de preservativo', 'Educacao em saude'],
        secundaria: ['Triagem de assintomaticos em populacoes de risco'],
        citations: [{ refId: 'who-std-2021' }]
      }
    },
    protocolos: ['gonorreia-manejo'],
    medicamentos: ['ceftriaxona', 'azitromicina'],
    calculadoras: [],
    citations: [{ refId: 'cdc-std-2021' }, { refId: 'who-std-2021' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 5. CLAMIDIA
  // ============================================================================
  {
    id: 'clamidia-genital',
    titulo: 'Clamidia',
    sinonimos: ['Infeccao por Chlamydia trachomatis', 'Uretrite nao-gonococica', 'Cervicite por clamidia'],
    doid: 'DOID:11263',
    snomedCT: '240589008',
    meshId: 'D002690',
    ciap2: ['X71', 'Y71'],
    cid10: ['A56.0', 'A56.2'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'IST mais prevalente no mundo, causada por Chlamydia trachomatis. Frequentemente assintomatica. Principal causa de DIP e infertilidade tubaria.',
      criteriosDiagnosticos: [
        'Corrimento uretral/cervical mucoso escasso',
        'Disuria leve',
        'Frequentemente assintomatica (70% mulheres, 50% homens)',
        'PCR/NAAT positivo para C. trachomatis'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Abstinencia sexual por 7 dias', 'Tratamento de parceiros', 'Notificacao'],
        farmacologico: ['Azitromicina 1g VO dose unica OU Doxiciclina 100mg VO 12/12h por 7 dias']
      },
      metasTerapeuticas: ['Erradicacao bacteriana', 'Prevencao de DIP'],
      examesIniciais: ['PCR/NAAT para clamidia', 'Sorologias (HIV, sifilis)', 'PCR gonorreia'],
      redFlags: ['DIP', 'Epididimite', 'Sindrome de Reiter', 'Gestante']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'IST bacteriana mais comum no mundo',
        incidencia: '129 milhoes de casos/ano (OMS)',
        faixaEtaria: '15-24 anos (maior prevalencia)',
        fatoresRisco: ['Idade jovem', 'Multiplos parceiros', 'Nao uso de preservativo'],
        citations: [{ refId: 'who-std-2021' }]
      },
      fisiopatologia: {
        texto: 'C. trachomatis e patogeno intracelular obrigatorio. Infecta epitélio colunar causando inflamacao cronica que pode levar a fibrose e obstrucao tubaria.',
        citations: [{ refId: 'cdc-std-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Corrimento mucoso escasso', 'Disuria leve', 'Dispareunia', 'Sangramento pos-coito'],
        sinaisExameFisico: ['Colo friavel', 'Secrecao mucoide', 'Uretrite com secrecao clara'],
        formasClinicas: ['Uretrite', 'Cervicite', 'Proctite', 'DIP', 'Epididimite', 'Sindrome de Reiter'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      diagnostico: {
        criterios: ['PCR/NAAT positivo', 'Cultura (padrao-ouro mas pouco disponivel)'],
        diagnosticoDiferencial: ['Gonorreia', 'Tricomoniase', 'Vaginose bacteriana', 'Micoplasma'],
        examesLaboratoriais: ['PCR/NAAT (urina ou swab)', 'Cultura'],
        citations: [{ refId: 'cdc-std-2021' }]
      },
      tratamento: {
        objetivos: ['Erradicar C. trachomatis', 'Prevenir complicacoes'],
        naoFarmacologico: {
          medidas: ['Abstinencia sexual por 7 dias', 'Tratamento de parceiros'],
          citations: [{ refId: 'cdc-std-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Macrolideo', medicamentos: ['Azitromicina'], posologia: '1g VO dose unica' },
            { classe: 'Tetraciclina', medicamentos: ['Doxiciclina'], posologia: '100mg VO 12/12h por 7 dias' }
          ],
          situacoesEspeciais: [
            { situacao: 'Gestante', conduta: 'Azitromicina 1g dose unica (doxiciclina contraindicada)' }
          ],
          citations: [{ refId: 'cdc-std-2021' }]
        },
        duracao: 'Dose unica ou 7 dias'
      },
      acompanhamento: {
        frequenciaConsultas: 'Teste de cura nao e rotina; repetir PCR em 3 meses (reinfeccao)',
        metasTerapeuticas: ['Resolucao clinica', 'Tratamento de parceiros'],
        criteriosEncaminhamento: ['DIP', 'Infertilidade', 'Gestante'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      prevencao: {
        primaria: ['Preservativo', 'Educacao em saude'],
        secundaria: ['Rastreamento em mulheres <25 anos sexualmente ativas'],
        citations: [{ refId: 'who-std-2021' }]
      }
    },
    protocolos: ['clamidia-manejo'],
    medicamentos: ['azitromicina', 'doxiciclina'],
    calculadoras: [],
    citations: [{ refId: 'cdc-std-2021' }, { refId: 'who-std-2021' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 6. HERPES GENITAL
  // ============================================================================
  {
    id: 'herpes-genital',
    titulo: 'Herpes Genital',
    sinonimos: ['Infeccao por HSV-2', 'Herpes simples genital'],
    doid: 'DOID:8566',
    snomedCT: '33839006',
    meshId: 'D006558',
    ciap2: ['X90', 'Y72'],
    cid10: ['A60.0'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'IST causada pelo Herpes Simplex Virus (principalmente HSV-2). Caracterizada por vesiculas dolorosas que evoluem para ulceras. Infeccao cronica com recorrencias.',
      criteriosDiagnosticos: [
        'Vesiculas agrupadas sobre base eritematosa',
        'Ulceras rasas dolorosas',
        'Linfadenopatia inguinal dolorosa',
        'Prodromo: queimacao, prurido local',
        'PCR ou cultura viral positiva'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Higiene local', 'Analgesicos topicos', 'Abstinencia durante lesoes'],
        farmacologico: ['Aciclovir 400mg VO 8/8h por 7-10 dias (primeiro episodio)']
      },
      metasTerapeuticas: ['Reducao da duracao e gravidade', 'Prevencao de recorrencias'],
      examesIniciais: ['PCR para HSV', 'Sorologia HSV IgG (distinguir HSV-1 e HSV-2)', 'Sorologias outras ISTs'],
      redFlags: ['Imunossupressao', 'Gestante proxima ao parto', 'Encefalite herpetica', 'Herpes disseminado']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '11% da populacao mundial tem HSV-2',
        incidencia: '417 milhoes infectados globalmente',
        faixaEtaria: 'Pico em 20-30 anos',
        fatoresRisco: ['Multiplos parceiros', 'Sexo feminino', 'HIV positivo'],
        citations: [{ refId: 'who-std-2021' }]
      },
      fisiopatologia: {
        texto: 'HSV infecta celulas epiteliais e estabelece latencia nos ganglios sacrais. Reativacoes periodicas causam recorrencias. Excrecao viral assintomatica e comum.',
        citations: [{ refId: 'cdc-std-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Vesiculas dolorosas', 'Ulceras genitais', 'Disuria', 'Sintomas sistemicos no primeiro episodio'],
        sinaisExameFisico: ['Vesiculas agrupadas', 'Ulceras rasas com borda eritematosa', 'Linfadenopatia inguinal'],
        formasClinicas: ['Primeiro episodio primario', 'Primeiro episodio nao-primario', 'Recorrencias'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      diagnostico: {
        criterios: ['Clinica tipica', 'PCR positivo (padrao-ouro)', 'Cultura viral', 'Sorologia tipo-especifica'],
        diagnosticoDiferencial: ['Sifilis (cancro duro)', 'Cancro mole', 'Aphthosis', 'Trauma'],
        examesLaboratoriais: ['PCR HSV', 'Cultura viral', 'Sorologia IgG tipo-especifica'],
        citations: [{ refId: 'cdc-std-2021' }]
      },
      tratamento: {
        objetivos: ['Reduzir sintomas', 'Acelerar cicatrizacao', 'Prevenir recorrencias'],
        naoFarmacologico: {
          medidas: ['Banhos de assento', 'Analgesicos', 'Uso de preservativo'],
          citations: [{ refId: 'cdc-std-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antiviral', medicamentos: ['Aciclovir'], posologia: '400mg VO 8/8h por 7-10 dias (1o episodio) ou 5 dias (recorrencia)' },
            { classe: 'Antiviral', medicamentos: ['Valaciclovir'], posologia: '1g VO 12/12h por 7-10 dias' }
          ],
          situacoesEspeciais: [
            { situacao: 'Supressao cronica (>6 recorrencias/ano)', conduta: 'Aciclovir 400mg 12/12h ou Valaciclovir 500mg 1x/dia' },
            { situacao: 'Gestante', conduta: 'Aciclovir 400mg 8/8h a partir de 36 semanas' }
          ],
          citations: [{ refId: 'cdc-std-2021' }]
        },
        duracao: '5-10 dias; supressao continua se indicada'
      },
      acompanhamento: {
        frequenciaConsultas: 'Conforme frequencia de recorrencias',
        metasTerapeuticas: ['Reducao de recorrencias', 'Orientacao sobre transmissao'],
        criteriosEncaminhamento: ['Imunossupressao', 'Gestante', 'Herpes grave ou atipico'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      prevencao: {
        primaria: ['Preservativo (reducao de 50%)', 'Evitar contato durante lesoes'],
        secundaria: ['Terapia supressiva para parceiro discordante'],
        citations: [{ refId: 'who-std-2021' }]
      }
    },
    protocolos: ['herpes-genital-manejo'],
    medicamentos: ['aciclovir', 'valaciclovir'],
    calculadoras: [],
    citations: [{ refId: 'cdc-std-2021' }, { refId: 'who-std-2021' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 7. HPV / CONDILOMA ACUMINADO
  // ============================================================================
  {
    id: 'condiloma-acuminado',
    titulo: 'HPV/Condiloma Acuminado',
    sinonimos: ['Verrugas genitais', 'Crista de galo', 'Papilomavirus humano'],
    doid: 'DOID:11168',
    snomedCT: '240542006',
    meshId: 'D003218',
    ciap2: ['X81', 'Y76'],
    cid10: ['A63.0'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Lesoes verrucosas anogenitais causadas pelo HPV (tipos 6 e 11 principalmente). Manifestacao mais visivel da infeccao por HPV, que tambem causa cancer cervical (tipos 16 e 18).',
      criteriosDiagnosticos: [
        'Lesoes papilomatosas/verrucosas em regiao anogenital',
        'Aspecto de couve-flor ou crista de galo',
        'Teste do acido acetico positivo (lesoes esbranquicadas)',
        'Diagnostico clinico; biopsia se duvida'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Crioterapia com nitrogenio liquido', 'Eletrocauterizacao', 'Exerese cirurgica'],
        farmacologico: ['Podofilotoxina 0,5% 2x/dia por 3 dias (ciclos) OU Imiquimode 5% 3x/semana por 16 semanas']
      },
      metasTerapeuticas: ['Remocao das lesoes visiveis', 'Prevencao de recorrencias'],
      examesIniciais: ['Exame clinico', 'Colposcopia (mulheres)', 'Anuscopia (se lesoes perianais)', 'Citologia cervical'],
      redFlags: ['Lesoes atipicas (suspeita de neoplasia)', 'Imunossupressao', 'Lesoes extensas']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1% da populacao sexualmente ativa tem condilomas',
        incidencia: 'HPV infecta 80% das pessoas sexualmente ativas durante a vida',
        faixaEtaria: '15-24 anos (maior incidencia)',
        fatoresRisco: ['Inicio precoce da vida sexual', 'Multiplos parceiros', 'Imunossupressao', 'Tabagismo'],
        citations: [{ refId: 'who-std-2021' }]
      },
      fisiopatologia: {
        texto: 'HPV infecta celulas basais do epitélio atraves de microabrasoes. Tipos de baixo risco (6,11) causam condilomas; tipos de alto risco (16,18) causam neoplasias.',
        citations: [{ refId: 'cdc-std-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Lesoes verrucosas indolores', 'Prurido local', 'Sangramento (se trauma)'],
        sinaisExameFisico: ['Papulas/placas verrucosas', 'Lesoes unicas ou multiplas', 'Localizacao: vulva, penis, anus, vagina, colo'],
        formasClinicas: ['Condiloma acuminado', 'Condiloma plano', 'Papulose bowenoide'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      diagnostico: {
        criterios: ['Clinico (aspecto caracteristico)', 'Teste do acido acetico', 'Biopsia se atipico'],
        diagnosticoDiferencial: ['Molusco contagioso', 'Condiloma plano (sifilis)', 'Carcinoma verrucoso', 'Nevos'],
        examesLaboratoriais: ['Citologia cervical', 'Captura hibrida/PCR HPV (nao rotina para condilomas)'],
        citations: [{ refId: 'cdc-std-2021' }]
      },
      tratamento: {
        objetivos: ['Remocao das lesoes', 'Reducao de transmissao', 'Rastreamento de parceiros'],
        naoFarmacologico: {
          medidas: ['Crioterapia', 'Eletrocauterizacao', 'Laser CO2', 'Exerese cirurgica'],
          citations: [{ refId: 'cdc-std-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antiproliferativo', medicamentos: ['Podofilotoxina 0,5%'], posologia: 'Aplicar 2x/dia por 3 dias, pausa 4 dias, repetir ate 4 ciclos' },
            { classe: 'Imunomodulador', medicamentos: ['Imiquimode 5%'], posologia: 'Aplicar 3x/semana a noite por 16 semanas' }
          ],
          segundaLinha: [
            { classe: 'Acido tricloroacetico', medicamentos: ['ATA 80-90%'], posologia: 'Aplicacao pelo medico, semanal' }
          ],
          citations: [{ refId: 'cdc-std-2021' }]
        },
        duracao: 'Ate remissao; recorrencias sao comuns'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses ate resolucao; citologia conforme protocolo',
        metasTerapeuticas: ['Clearance das lesoes', 'Rastreamento de neoplasia cervical'],
        criteriosEncaminhamento: ['Lesoes extensas', 'Imunossupressao', 'Lesoes cervicais de alto grau'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      prevencao: {
        primaria: ['Vacinacao HPV (9-26 anos)', 'Preservativo (protecao parcial)'],
        secundaria: ['Citologia cervical', 'Tratamento precoce de lesoes precursoras'],
        citations: [{ refId: 'who-std-2021' }]
      }
    },
    protocolos: ['hpv-manejo'],
    medicamentos: ['imiquimode', 'podofilotoxina'],
    calculadoras: [],
    rastreamentos: ['cancer-colo-utero'],
    citations: [{ refId: 'cdc-std-2021' }, { refId: 'who-std-2021' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 8. CANCRO MOLE
  // ============================================================================
  {
    id: 'cancro-mole',
    titulo: 'Cancro Mole',
    sinonimos: ['Cancroide', 'Ulcera de Ducrey', 'Cancro venéreo'],
    doid: 'DOID:13637',
    snomedCT: '186940001',
    meshId: 'D002602',
    ciap2: ['X90', 'Y76'],
    cid10: ['A57'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'IST causada pelo Haemophilus ducreyi. Caracterizada por ulceras genitais multiplas, dolorosas, com bordas irregulares e base suja, associadas a linfadenopatia inguinal supurativa (bubao).',
      criteriosDiagnosticos: [
        'Ulceras genitais multiplas dolorosas',
        'Bordas irregulares, base purulenta/suja',
        'Adenopatia inguinal unilateral dolorosa (bubao)',
        'Exclusao de sifilis e herpes',
        'PCR ou cultura para H. ducreyi (dificil)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Higiene local', 'Drenagem do bubao se flutuante', 'Abstinencia sexual'],
        farmacologico: ['Azitromicina 1g VO dose unica OU Ceftriaxona 250mg IM dose unica']
      },
      metasTerapeuticas: ['Cicatrizacao das ulceras', 'Resolucao do bubao'],
      examesIniciais: ['Sorologias para sifilis e HIV', 'PCR HSV', 'Gram/cultura da lesao'],
      redFlags: ['HIV positivo (cicatrizacao lenta)', 'Bubao com risco de ruptura espontanea']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Raro em paises desenvolvidos; comum na Africa e Asia',
        incidencia: 'Declinio global; esporadico no Brasil',
        faixaEtaria: 'Adultos jovens',
        fatoresRisco: ['Sexo comercial', 'Baixo nivel socioeconomico', 'HIV'],
        citations: [{ refId: 'cdc-std-2021' }]
      },
      fisiopatologia: {
        texto: 'H. ducreyi penetra atraves de microabrasoes. Producao de citotoxinas causa necrose tecidual e formacao de ulcera. Disseminacao linfatica causa bubao.',
        citations: [{ refId: 'cdc-std-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Ulceras dolorosas multiplas', 'Bubao inguinal doloroso', 'Dor intensa'],
        sinaisExameFisico: ['Ulceras com base suja/purulenta', 'Bordas irregulares e escavadas', 'Adenopatia inguinal unilateral, flutuante'],
        formasClinicas: ['Cancro mole classico', 'Forma transitoria', 'Forma fagedênica'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      diagnostico: {
        criterios: ['Clinica sugestiva + exclusao de sifilis e herpes', 'PCR para H. ducreyi', 'Cultura (dificil, <80% sensibilidade)'],
        diagnosticoDiferencial: ['Sifilis primaria', 'Herpes genital', 'Linfogranuloma venereo', 'Donovanose'],
        examesLaboratoriais: ['VDRL', 'PCR HSV', 'PCR H. ducreyi', 'Anti-HIV'],
        citations: [{ refId: 'cdc-std-2021' }]
      },
      tratamento: {
        objetivos: ['Erradicar H. ducreyi', 'Prevenir complicacoes do bubao'],
        naoFarmacologico: {
          medidas: ['Aspiracao do bubao com agulha (nao incisar)', 'Higiene local', 'Tratamento de parceiros'],
          citations: [{ refId: 'cdc-std-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Macrolideo', medicamentos: ['Azitromicina'], posologia: '1g VO dose unica' },
            { classe: 'Cefalosporina', medicamentos: ['Ceftriaxona'], posologia: '250mg IM dose unica' }
          ],
          segundaLinha: [
            { classe: 'Alternativa', medicamentos: ['Ciprofloxacino'], posologia: '500mg VO 12/12h por 3 dias' }
          ],
          citations: [{ refId: 'cdc-std-2021' }]
        },
        duracao: 'Dose unica; resposta em 3-7 dias'
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno em 7 dias para avaliar cicatrizacao',
        metasTerapeuticas: ['Cicatrizacao em 1-2 semanas', 'Resolucao do bubao'],
        criteriosEncaminhamento: ['HIV positivo', 'Falha terapeutica', 'Fistulizacao do bubao'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      prevencao: {
        primaria: ['Preservativo', 'Educacao em saude'],
        secundaria: ['Tratamento precoce', 'Tratamento de parceiros'],
        citations: [{ refId: 'cdc-std-2021' }]
      }
    },
    protocolos: ['ulceras-genitais'],
    medicamentos: ['azitromicina', 'ceftriaxona'],
    calculadoras: [],
    citations: [{ refId: 'cdc-std-2021' }, { refId: 'ms-sifilis-2024' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 9. LINFOGRANULOMA VENEREO
  // ============================================================================
  {
    id: 'linfogranuloma-venereo',
    titulo: 'Linfogranuloma Venereo',
    sinonimos: ['LGV', 'Doenca de Nicolas-Favre', 'Linfogranuloma inguinal'],
    doid: 'DOID:13691',
    snomedCT: '186946007',
    meshId: 'D008219',
    ciap2: ['X90', 'Y76'],
    cid10: ['A55'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'IST causada pelos sorotipos L1, L2, L3 da Chlamydia trachomatis. Caracterizada por ulcera genital transitoria seguida de linfadenopatia inguinal volumosa (bubao) que pode fistulizar.',
      criteriosDiagnosticos: [
        'Fase primaria: papula/ulcera genital transitoria e indolor',
        'Fase secundaria: adenopatia inguinal volumosa, unilateral, dolorosa',
        'Sinal do sulco (sulco entre linfonodos inguinais e femorais)',
        'Proctite em HSH (forma mais comum atualmente)',
        'PCR positivo para C. trachomatis L1-L3'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Aspiracao do bubao', 'Abstinencia sexual', 'Tratamento de parceiros'],
        farmacologico: ['Doxiciclina 100mg VO 12/12h por 21 dias']
      },
      metasTerapeuticas: ['Resolucao da linfadenopatia', 'Prevencao de sequelas'],
      examesIniciais: ['PCR C. trachomatis', 'Sorologias sifilis e HIV', 'Anuscopia se proctite'],
      redFlags: ['Proctite grave', 'Fistulas', 'Estenose retal', 'Elefantiase genital']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Raro; surtos em HSH na Europa e EUA',
        incidencia: 'Aumento de casos de proctite por LGV em HSH',
        faixaEtaria: 'Adultos jovens',
        fatoresRisco: ['HSH', 'HIV positivo', 'Multiplos parceiros'],
        citations: [{ refId: 'cdc-std-2021' }]
      },
      fisiopatologia: {
        texto: 'C. trachomatis L1-L3 tem tropismo por tecido linfoide. Infeccao local progride para linfaticos regionais causando linfadenite granulomatosa e necrose.',
        citations: [{ refId: 'cdc-std-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Ulcera genital fugaz', 'Adenopatia inguinal volumosa', 'Proctite (tenesmo, dor retal, secrecao)'],
        sinaisExameFisico: ['Bubao inguinal unilateral', 'Sinal do sulco', 'Fistulas cutaneas', 'Proctite hemorragica'],
        formasClinicas: ['Inguinal (classica)', 'Anorretal (HSH)', 'Genital'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      diagnostico: {
        criterios: ['Clinica + PCR positivo para C. trachomatis', 'Sorologia com titulos elevados', 'Exclusao de outras causas de ulcera/bubao'],
        diagnosticoDiferencial: ['Cancro mole', 'Herpes', 'Tuberculose ganglionar', 'Linfoma'],
        examesLaboratoriais: ['PCR C. trachomatis', 'Sorologia clamidia', 'Anuscopia + biopsia'],
        citations: [{ refId: 'cdc-std-2021' }]
      },
      tratamento: {
        objetivos: ['Erradicar C. trachomatis', 'Prevenir sequelas fibroticas'],
        naoFarmacologico: {
          medidas: ['Aspiracao do bubao flutuante (NAO incisar)', 'Tratamento de parceiros'],
          citations: [{ refId: 'cdc-std-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Tetraciclina', medicamentos: ['Doxiciclina'], posologia: '100mg VO 12/12h por 21 dias' }
          ],
          segundaLinha: [
            { classe: 'Alternativa', medicamentos: ['Eritromicina'], posologia: '500mg VO 6/6h por 21 dias' }
          ],
          citations: [{ refId: 'cdc-std-2021' }]
        },
        duracao: '21 dias (mais longo que outras ISTs por clamidia)'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal ate resolucao do bubao',
        metasTerapeuticas: ['Resolucao da adenopatia', 'Ausencia de sequelas'],
        criteriosEncaminhamento: ['Proctite grave', 'Estenoses', 'Fistulas', 'HIV positivo'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      prevencao: {
        primaria: ['Preservativo', 'Educacao em saude'],
        secundaria: ['Tratamento precoce', 'Rastreamento em HSH'],
        citations: [{ refId: 'cdc-std-2021' }]
      }
    },
    protocolos: ['lgv-manejo'],
    medicamentos: ['doxiciclina', 'eritromicina'],
    calculadoras: [],
    citations: [{ refId: 'cdc-std-2021' }, { refId: 'ms-sifilis-2024' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 10. TRICOMONIASE
  // ============================================================================
  {
    id: 'tricomoniase',
    titulo: 'Tricomoniase',
    sinonimos: ['Infeccao por Trichomonas vaginalis', 'Vaginite por trichomonas'],
    doid: 'DOID:1947',
    snomedCT: '72042002',
    meshId: 'D014247',
    ciap2: ['X73', 'Y99'],
    cid10: ['A59.0'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'IST causada pelo protozoario flagelado Trichomonas vaginalis. Causa vaginite com corrimento amarelo-esverdeado bolhoso e odor fetido. Homens geralmente assintomaticos.',
      criteriosDiagnosticos: [
        'Corrimento vaginal amarelo-esverdeado, bolhoso, fetido',
        'Prurido vulvar intenso',
        'Colo em framboesa (colpite macular)',
        'pH vaginal >4,5',
        'Exame a fresco: protozoarios flagelados moveis'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Abstinencia sexual por 7 dias', 'Tratamento do parceiro obrigatorio'],
        farmacologico: ['Metronidazol 2g VO dose unica OU 500mg VO 12/12h por 7 dias']
      },
      metasTerapeuticas: ['Cura clinica e parasitologica', 'Tratamento do casal'],
      examesIniciais: ['Exame a fresco', 'PCR/NAAT', 'Cultura (padrao-ouro)', 'pH vaginal'],
      redFlags: ['Gestante (risco de parto prematuro)', 'Resistencia ao metronidazol']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'IST curavel mais comum no mundo',
        incidencia: '156 milhoes de casos/ano (OMS)',
        faixaEtaria: 'Mulheres em idade reprodutiva',
        fatoresRisco: ['Multiplos parceiros', 'Outras ISTs concomitantes', 'Nao uso de preservativo'],
        citations: [{ refId: 'who-std-2021' }]
      },
      fisiopatologia: {
        texto: 'T. vaginalis adere ao epitélio vaginal atraves de adesinas. Produz enzimas proteoliticas que causam inflamacao e destruicao celular. Altera flora vaginal.',
        citations: [{ refId: 'cdc-std-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Corrimento bolhoso amarelo-esverdeado', 'Odor fetido', 'Prurido vulvar', 'Disuria', 'Dispareunia'],
        sinaisExameFisico: ['Vulvovaginite', 'Colo em framboesa', 'Corrimento espumoso'],
        formasClinicas: ['Vaginite', 'Uretrite (homem)', 'Assintomatica (comum em homens)'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      diagnostico: {
        criterios: ['Exame a fresco positivo', 'PCR/NAAT', 'Cultura (padrao-ouro)'],
        diagnosticoDiferencial: ['Vaginose bacteriana', 'Candidiase', 'Gonorreia', 'Clamidia'],
        examesLaboratoriais: ['Exame a fresco', 'PCR', 'Cultura', 'pH vaginal'],
        citations: [{ refId: 'cdc-std-2021' }]
      },
      tratamento: {
        objetivos: ['Erradicar T. vaginalis', 'Tratar parceiro'],
        naoFarmacologico: {
          medidas: ['Abstinencia alcoolica durante tratamento', 'Tratamento do parceiro sexual'],
          citations: [{ refId: 'cdc-std-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Nitroimidazol', medicamentos: ['Metronidazol'], posologia: '2g VO dose unica OU 500mg VO 12/12h por 7 dias' }
          ],
          segundaLinha: [
            { classe: 'Alternativa', medicamentos: ['Tinidazol'], posologia: '2g VO dose unica' }
          ],
          situacoesEspeciais: [
            { situacao: 'Gestante', conduta: 'Metronidazol 2g dose unica (pode usar apos 1o trimestre)' }
          ],
          citations: [{ refId: 'cdc-std-2021' }]
        },
        duracao: 'Dose unica ou 7 dias'
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno se sintomas persistirem; retestagem em 3 meses',
        metasTerapeuticas: ['Resolucao dos sintomas', 'Tratamento do parceiro confirmado'],
        criteriosEncaminhamento: ['Falha terapeutica', 'Suspeita de resistencia'],
        citations: [{ refId: 'ms-sifilis-2024' }]
      },
      prevencao: {
        primaria: ['Preservativo', 'Educacao em saude'],
        secundaria: ['Tratamento de parceiros', 'Rastreamento de outras ISTs'],
        citations: [{ refId: 'who-std-2021' }]
      }
    },
    protocolos: ['tricomoniase-manejo'],
    medicamentos: ['metronidazol', 'tinidazol'],
    calculadoras: [],
    citations: [{ refId: 'cdc-std-2021' }, { refId: 'who-std-2021' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 11. HEPATITE B (TRANSMISSAO SEXUAL)
  // ============================================================================
  {
    id: 'hepatite-b-sexual',
    titulo: 'Hepatite B (Transmissao Sexual)',
    sinonimos: ['HBV', 'Hepatite B aguda'],
    doid: 'DOID:2043',
    snomedCT: '66071002',
    meshId: 'D006509',
    ciap2: ['D72'],
    cid10: ['B16', 'B18.1'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Infeccao hepatica pelo virus da hepatite B, transmissivel por via sexual. Pode ser aguda (autolimitada) ou evoluir para cronicidade (5-10% adultos). Prevenivel por vacina.',
      criteriosDiagnosticos: [
        'Exposicao de risco sexual',
        'Sintomas: ictericia, coluria, acolia, fadiga, nauseas',
        'HBsAg positivo',
        'Anti-HBc IgM positivo (aguda)',
        'Transaminases elevadas (>10x)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Repouso relativo', 'Abster-se de alcool', 'Dieta hipogordurosa'],
        farmacologico: ['Hepatite B aguda: tratamento de suporte (sem antiviral)', 'Hepatite B cronica: Tenofovir ou Entecavir']
      },
      metasTerapeuticas: ['Resolucao da fase aguda', 'Prevencao de cronicidade'],
      examesIniciais: ['HBsAg', 'Anti-HBc total e IgM', 'Anti-HBs', 'HBeAg/Anti-HBe', 'Transaminases', 'Coagulograma'],
      redFlags: ['Hepatite fulminante (encefalopatia, INR>1,5)', 'Coinfeccao HIV ou HDV']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '296 milhoes de portadores cronicos no mundo',
        incidencia: '820.000 mortes/ano por complicacoes (cirrose, CHC)',
        faixaEtaria: 'Adultos jovens (transmissao sexual)',
        fatoresRisco: ['Multiplos parceiros', 'HSH', 'Parceiro HBsAg+', 'Nao vacinado'],
        citations: [{ refId: 'who-hepatitis-2024' }]
      },
      fisiopatologia: {
        texto: 'HBV infecta hepatocitos. Lesao hepatica e mediada pela resposta imune do hospedeiro. Integracao do DNA viral pode levar a carcinoma hepatocelular.',
        citations: [{ refId: 'easl-hbv-2017' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Ictericia', 'Coluria', 'Acolia', 'Fadiga', 'Nauseas', 'Dor em hipocondrio direito'],
        sinaisExameFisico: ['Ictericia de escleróticas', 'Hepatomegalia dolorosa', 'Esplenomegalia (rara)'],
        formasClinicas: ['Hepatite aguda sintomatica', 'Hepatite aguda anicterica', 'Hepatite cronica', 'Portador inativo', 'Hepatite fulminante'],
        citations: [{ refId: 'ms-hepatites-2024' }]
      },
      diagnostico: {
        criterios: ['HBsAg positivo', 'Anti-HBc IgM positivo (aguda)', 'Transaminases elevadas'],
        diagnosticoDiferencial: ['Outras hepatites virais', 'Hepatite medicamentosa', 'Hepatite alcoolica', 'Doenca de Wilson'],
        examesLaboratoriais: ['Painel hepatite B completo', 'Transaminases', 'Bilirrubinas', 'Coagulograma', 'HBV-DNA'],
        examesImagem: ['USG abdominal'],
        citations: [{ refId: 'easl-hbv-2017' }]
      },
      tratamento: {
        objetivos: ['Suporte na fase aguda', 'Supressao viral na cronica', 'Prevencao de cirrose/CHC'],
        naoFarmacologico: {
          medidas: ['Abster-se de alcool', 'Evitar medicamentos hepatotoxicos', 'Vacinacao de contactantes'],
          citations: [{ refId: 'ms-hepatites-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antivirais (somente cronica)', medicamentos: ['Tenofovir', 'Entecavir'], posologia: 'Tenofovir 300mg/dia ou Entecavir 0,5-1mg/dia' }
          ],
          situacoesEspeciais: [
            { situacao: 'Gestante HBsAg+', conduta: 'Tenofovir no 3o trimestre para prevenir transmissao vertical' }
          ],
          citations: [{ refId: 'easl-hbv-2017' }]
        },
        duracao: 'Aguda: suporte. Cronica: longo prazo (anos)'
      },
      acompanhamento: {
        frequenciaConsultas: 'Aguda: semanal ate resolucao. Cronica: trimestral',
        examesControle: ['Transaminases', 'HBV-DNA', 'Alfa-fetoproteina', 'USG 6/6 meses (rastreamento CHC)'],
        metasTerapeuticas: ['Soroconversao HBsAg (rara)', 'Supressao viral', 'Prevencao de cirrose'],
        criteriosEncaminhamento: ['Hepatite cronica', 'Cirrose', 'Coinfeccao HIV/HDV'],
        citations: [{ refId: 'ms-hepatites-2024' }]
      },
      prevencao: {
        primaria: ['Vacinacao (3 doses)', 'Preservativo', 'Triagem de doadores de sangue'],
        secundaria: ['Imunoglobulina + vacina pos-exposicao', 'Rastreamento de parceiros'],
        citations: [{ refId: 'who-hepatitis-2024' }]
      }
    },
    protocolos: ['hepatite-b-manejo'],
    medicamentos: ['tenofovir', 'entecavir'],
    calculadoras: [],
    rastreamentos: ['hepatite-b-gestante'],
    citations: [{ refId: 'easl-hbv-2017' }, { refId: 'who-hepatitis-2024' }, { refId: 'ms-hepatites-2024' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 12. HIV/AIDS (FASE AGUDA)
  // ============================================================================
  {
    id: 'hiv-fase-aguda',
    titulo: 'HIV/AIDS (Fase Aguda)',
    sinonimos: ['Sindrome retroviral aguda', 'Infeccao primaria pelo HIV', 'Soroconversao HIV'],
    doid: 'DOID:526',
    snomedCT: '86406008',
    meshId: 'D015658',
    ciap2: ['B90'],
    cid10: ['B20', 'B23.0'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Fase inicial da infeccao pelo HIV, 2-4 semanas apos exposicao. Sindrome mononucleose-like com febre, linfadenopatia e rash. Alta viremia e transmissibilidade. Janela imunologica pode dar teste negativo.',
      criteriosDiagnosticos: [
        'Exposicao de risco recente (2-4 semanas)',
        'Sindrome retroviral aguda: febre, adenopatia, faringite, rash, ulceras orais',
        'CV-HIV elevada (>100.000 copias/mL)',
        'Teste de 4a geracao (Ag p24 + Ac) positivo',
        'Western blot pode ser indeterminado/negativo (janela)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Aconselhamento', 'Reducao de risco', 'Notificacao de parceiros'],
        farmacologico: ['TARV imediata: Tenofovir/Lamivudina + Dolutegravir (TDF/3TC/DTG)']
      },
      metasTerapeuticas: ['Supressao viral (<50 copias/mL)', 'Preservacao de CD4', 'Reducao de transmissao'],
      examesIniciais: ['Teste rapido HIV', 'CV-HIV', 'CD4', 'Genotipagem', 'Sorologias (sifilis, hepatites)', 'Funcao renal e hepatica'],
      redFlags: ['Sintomas neurologicos', 'Infeccoes oportunistas', 'CD4 muito baixo ao diagnostico']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '38,4 milhoes vivendo com HIV no mundo (2021)',
        incidencia: '1,5 milhoes de novas infeccoes/ano',
        faixaEtaria: '15-49 anos (maior incidencia)',
        fatoresRisco: ['Sexo desprotegido', 'Multiplos parceiros', 'HSH', 'Uso de drogas injetaveis', 'Parceiro HIV+'],
        citations: [{ refId: 'unaids-2023' }]
      },
      fisiopatologia: {
        texto: 'HIV infecta celulas CD4 atraves dos receptores CD4 e CCR5/CXCR4. Replicacao viral intensa na fase aguda com destruicao de CD4 do GALT. Estabelece reservatorios latentes.',
        citations: [{ refId: 'ms-hiv-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Febre prolongada', 'Linfadenopatia generalizada', 'Faringite', 'Rash maculopapular', 'Ulceras orais/genitais', 'Cefaleia', 'Mialgia'],
        sinaisExameFisico: ['Adenopatia cervical/axilar', 'Exantema morbiliforme', 'Hepatoesplenomegalia', 'Ulceras aftosas'],
        formasClinicas: ['Sindrome retroviral aguda sintomatica (50-70%)', 'Assintomatica', 'Meningite asseptica'],
        citations: [{ refId: 'ms-hiv-2023' }]
      },
      diagnostico: {
        criterios: ['Clinica sugestiva + exposicao de risco', 'Teste de 4a geracao positivo', 'CV-HIV elevada', 'Soroconversao documentada'],
        diagnosticoDiferencial: ['Mononucleose', 'Citomegalovirose', 'Sifilis secundaria', 'Toxoplasmose', 'Farmacodermia'],
        examesLaboratoriais: ['Teste rapido HIV (4a geracao)', 'CV-HIV', 'CD4/CD8', 'Genotipagem HIV'],
        citations: [{ refId: 'ms-hiv-2023' }]
      },
      tratamento: {
        objetivos: ['Supressao viral', 'Preservacao imunologica', 'Reducao de transmissao'],
        naoFarmacologico: {
          medidas: ['Aconselhamento e adesao', 'Uso de preservativo', 'PrEP para parceiros negativos'],
          citations: [{ refId: 'ms-hiv-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'TARV', medicamentos: ['Tenofovir/Lamivudina/Dolutegravir'], posologia: '1 comprimido 1x/dia (TDF 300mg + 3TC 300mg + DTG 50mg)' }
          ],
          segundaLinha: [
            { classe: 'Alternativa', medicamentos: ['TAF/FTC + DTG', 'ABC/3TC + DTG'], posologia: 'Conforme perfil de resistencia ou tolerabilidade' }
          ],
          citations: [{ refId: 'ms-hiv-2023' }]
        },
        duracao: 'TARV por toda a vida'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal nos primeiros 3 meses, depois trimestral',
        examesControle: ['CV-HIV', 'CD4 (semestral)', 'Funcao renal', 'Perfil lipidico', 'Glicemia'],
        metasTerapeuticas: ['CV indetectavel em 6 meses', 'CD4 >500', 'I=I (indetectavel = intransmissivel)'],
        criteriosEncaminhamento: ['Falha virologica', 'Infeccoes oportunistas', 'Coinfeccoes'],
        citations: [{ refId: 'ms-hiv-2023' }]
      },
      prevencao: {
        primaria: ['Preservativo', 'PrEP', 'PEP (ate 72h pos-exposicao)', 'Educacao em saude'],
        secundaria: ['TARV precoce (tratamento como prevencao)', 'Testagem de parceiros'],
        citations: [{ refId: 'unaids-2023' }]
      }
    },
    protocolos: ['hiv-tarv'],
    medicamentos: ['tenofovir', 'lamivudina', 'dolutegravir'],
    calculadoras: [],
    rastreamentos: ['hiv-populacao-geral'],
    citations: [{ refId: 'ms-hiv-2023' }, { refId: 'unaids-2023' }],
    lastUpdate: '2026-01'
  }
];
