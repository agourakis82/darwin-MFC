/**
 * Expansão: Doenças Genéticas e Ocupacionais
 * 50 doenças: distúrbios cromossômicos, monogênicos e condições relacionadas ao trabalho
 * Darwin-MFC v1.6.0
 */

import type { Doenca } from '@/lib/types/doenca';

export const doencasGeneticasOcupacionais: Partial<Doenca>[] = [
  // ==================== CROMOSSÔMICAS ====================
  {
    id: 'sindrome-down',
    titulo: 'Síndrome de Down',
    sinonimos: ['Trissomia 21', 'Trissomia do cromossomo 21'],
    doid: 'DOID:14250',
    snomedCT: '41040004',
    meshId: 'D004314',
    ciap2: ['A90'],
    cid10: ['Q90', 'Q90.0', 'Q90.9'],
    categoria: 'outros',
    subcategoria: 'cromossomica',
    quickView: {
      definicao: 'Aneuploidia mais comum em nascidos vivos. Trissomia livre (95%), translocação (4%), mosaicismo (1%). Incidência: 1:700 nascidos vivos, aumenta com idade materna.',
      criteriosDiagnosticos: [
        'Cariótipo: 47,XX,+21 ou 47,XY,+21',
        'Fenótipo característico: hipotonia, fácies típica, prega palmar única',
        'Diagnóstico pré-natal: translucência nucal aumentada, NIPT, amniocentese'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Estimulação precoce', 'Fonoaudiologia', 'Fisioterapia', 'Terapia ocupacional', 'Inclusão escolar'],
        farmacologico: ['Tratamento de comorbidades específicas', 'Levotiroxina se hipotireoidismo']
      },
      redFlags: ['Cardiopatia congênita (40-50%)', 'Leucemia (risco 10-20x maior)', 'Instabilidade atlantoaxial', 'Hipotireoidismo', 'Apneia obstrutiva do sono']
    },
    protocolos: ['protocolo-down-ms'],
    medicamentos: ['levotiroxina'],
    calculadoras: [],
    citations: [{ refId: 'bull-2011-health-supervision-down' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'pediatria', 'cromossomica', 'deficiencia-intelectual']
  },
  {
    id: 'sindrome-turner',
    titulo: 'Síndrome de Turner',
    sinonimos: ['Monossomia do X', 'Disgenesia gonadal 45,X'],
    doid: 'DOID:3911',
    snomedCT: '38804009',
    meshId: 'D014424',
    ciap2: ['A90'],
    cid10: ['Q96', 'Q96.0', 'Q96.9'],
    categoria: 'endocrino',
    subcategoria: 'cromossomica',
    quickView: {
      definicao: 'Monossomia completa ou parcial do cromossomo X em indivíduos fenotipicamente femininos. Incidência: 1:2500 nascidas vivas. Causa mais comum de baixa estatura em meninas.',
      criteriosDiagnosticos: [
        'Cariótipo: 45,X (50%) ou variantes (mosaicismo, deleções parciais)',
        'Baixa estatura (<percentil 5)',
        'Disgenesia gonadal com amenorreia primária',
        'Fenótipo: pescoço alado, cúbito valgo, linfedema'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Acompanhamento multidisciplinar', 'Suporte psicológico'],
        farmacologico: ['GH recombinante para estatura', 'TRH para indução puberal']
      },
      redFlags: ['Coarctação de aorta (15-30%)', 'Valva aórtica bicúspide (30%)', 'Dilatação da raiz aórtica', 'Dissecção aórtica']
    },
    protocolos: [],
    medicamentos: ['somatropina', 'estradiol', 'progesterona'],
    calculadoras: [],
    citations: [{ refId: 'gravholt-2017-turner-guidelines' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'endocrinologia', 'cromossomica', 'baixa-estatura']
  },
  {
    id: 'sindrome-klinefelter',
    titulo: 'Síndrome de Klinefelter',
    sinonimos: ['47,XXY', 'Disgenesia dos túbulos seminíferos'],
    doid: 'DOID:1921',
    snomedCT: '405769009',
    meshId: 'D007713',
    ciap2: ['A90'],
    cid10: ['Q98.0', 'Q98.4'],
    categoria: 'endocrino',
    subcategoria: 'cromossomica',
    quickView: {
      definicao: 'Aneuploidia mais comum em homens (47,XXY). Incidência: 1:500-1:1000 nascidos masculinos. Caracterizada por hipogonadismo hipergonadotrófico e infertilidade.',
      criteriosDiagnosticos: [
        'Cariótipo: 47,XXY (80-90%) ou variantes',
        'Hipogonadismo hipergonadotrófico',
        'Testículos pequenos e firmes (<4ml)',
        'Azoospermia ou oligospermia grave'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Suporte psicológico', 'Fonoaudiologia se atraso de linguagem'],
        farmacologico: ['Reposição de testosterona a partir da puberdade']
      },
      redFlags: ['Risco aumentado de câncer de mama masculino', 'Tromboembolismo', 'Osteoporose', 'Síndrome metabólica']
    },
    protocolos: [],
    medicamentos: ['testosterona'],
    calculadoras: [],
    citations: [{ refId: 'groth-2013-klinefelter-guidelines' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'endocrinologia', 'cromossomica', 'hipogonadismo']
  },
  {
    id: 'sindrome-patau',
    titulo: 'Síndrome de Patau',
    sinonimos: ['Trissomia 13', 'Trissomia do cromossomo 13'],
    doid: 'DOID:0060412',
    snomedCT: '21111006',
    meshId: 'D014314',
    ciap2: ['A90'],
    cid10: ['Q91', 'Q91.7'],
    categoria: 'pediatrico',
    subcategoria: 'cromossomica',
    quickView: {
      definicao: 'Terceira trissomia autossômica mais comum. Incidência: 1:10.000-1:20.000. Malformações graves com sobrevida mediana de 7-10 dias.',
      criteriosDiagnosticos: [
        'Cariótipo: 47,+13',
        'Holoprosencefalia',
        'Fenda labiopalatina',
        'Polidactilia pós-axial',
        'Microftalmia/anoftalmia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Cuidados paliativos', 'Suporte à família'],
        farmacologico: ['Manejo sintomático']
      },
      redFlags: ['Cardiopatia congênita (80%)', 'Defeitos do SNC', 'Apneias', 'Convulsões']
    },
    protocolos: [],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'patau-syndrome-ghr' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'neonatologia', 'cromossomica', 'cuidados-paliativos']
  },
  {
    id: 'sindrome-edwards',
    titulo: 'Síndrome de Edwards',
    sinonimos: ['Trissomia 18', 'Trissomia do cromossomo 18'],
    doid: 'DOID:0060413',
    snomedCT: '51500006',
    meshId: 'D014314',
    ciap2: ['A90'],
    cid10: ['Q91.0', 'Q91.3'],
    categoria: 'pediatrico',
    subcategoria: 'cromossomica',
    quickView: {
      definicao: 'Segunda trissomia autossômica mais comum. Incidência: 1:6.000-1:8.000. Sobrevida mediana: 14 dias. 90% morrem no primeiro ano.',
      criteriosDiagnosticos: [
        'Cariótipo: 47,+18',
        'RCIU grave',
        'Mãos cerradas com sobreposição de dedos',
        'Pé em mata-borrão',
        'Micrognatia, occipício proeminente'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Cuidados paliativos', 'Suporte familiar'],
        farmacologico: ['Manejo sintomático de comorbidades']
      },
      redFlags: ['Cardiopatia congênita (90%)', 'Apneias centrais', 'Dificuldade alimentar grave']
    },
    protocolos: [],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'edwards-syndrome-ghr' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'neonatologia', 'cromossomica', 'cuidados-paliativos']
  },
  {
    id: 'sindrome-cri-du-chat',
    titulo: 'Síndrome do Cri-du-Chat',
    sinonimos: ['Síndrome do miado do gato', 'Deleção 5p', 'Síndrome 5p-'],
    doid: 'DOID:0060415',
    snomedCT: '55993003',
    meshId: 'D003410',
    ciap2: ['A90'],
    cid10: ['Q93.4'],
    categoria: 'pediatrico',
    subcategoria: 'cromossomica',
    quickView: {
      definicao: 'Deleção do braço curto do cromossomo 5. Incidência: 1:20.000-1:50.000. Caracterizada por choro de alta frequência semelhante a miado de gato.',
      criteriosDiagnosticos: [
        'Cariótipo ou array-CGH: deleção 5p',
        'Choro característico de alta frequência',
        'Microcefalia',
        'Fácies arredondada com hipertelorismo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Estimulação precoce', 'Fonoaudiologia', 'Fisioterapia'],
        farmacologico: ['Tratamento de comorbidades']
      },
      redFlags: ['Cardiopatia congênita (15-20%)', 'Deficiência intelectual moderada a grave']
    },
    protocolos: [],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'cri-du-chat-ghr' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'pediatria', 'cromossomica', 'delecao']
  },

  // ==================== MONOGÊNICAS - NEUROLÓGICAS ====================
  {
    id: 'doenca-huntington',
    titulo: 'Doença de Huntington',
    sinonimos: ['Coreia de Huntington', 'HD'],
    doid: 'DOID:12858',
    snomedCT: '58756001',
    meshId: 'D006816',
    ciap2: ['N87'],
    cid10: ['G10'],
    categoria: 'neurologico',
    subcategoria: 'neurodegenerativa',
    quickView: {
      definicao: 'Doença neurodegenerativa autossômica dominante por expansão de trinucleotídeo CAG no gene HTT. Prevalência: 5-10/100.000. Início: 30-50 anos. Penetrância completa com ≥40 repetições.',
      criteriosDiagnosticos: [
        'Teste genético: ≥36 repetições CAG no gene HTT',
        'Tríade: coreia, declínio cognitivo, alterações psiquiátricas',
        'História familiar positiva (exceto casos de novo ~8%)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia', 'Fonoaudiologia', 'Suporte nutricional', 'Suporte psicológico'],
        farmacologico: ['Tetrabenazina para coreia', 'Antidepressivos para sintomas psiquiátricos']
      },
      redFlags: ['Disfagia progressiva', 'Perda de peso significativa', 'Ideação suicida', 'Pneumonia aspirativa']
    },
    protocolos: [],
    medicamentos: ['tetrabenazina', 'haloperidol', 'risperidona', 'sertralina'],
    calculadoras: [],
    citations: [{ refId: 'roos-2010-huntington-guidelines' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'neurologia', 'monogenica', 'neurodegenerativa']
  },
  {
    id: 'neurofibromatose-tipo1',
    titulo: 'Neurofibromatose Tipo 1',
    sinonimos: ['NF1', 'Doença de von Recklinghausen'],
    doid: 'DOID:8712',
    snomedCT: '92824003',
    meshId: 'D009456',
    ciap2: ['S83'],
    cid10: ['Q85.0'],
    categoria: 'neurologico',
    subcategoria: 'neurocutanea',
    quickView: {
      definicao: 'Síndrome neurocutânea autossômica dominante por mutação no gene NF1 (neurofibromina). Incidência: 1:3.000. 50% casos de novo.',
      criteriosDiagnosticos: [
        'Critérios NIH (2 ou mais): ≥6 manchas café com leite >5mm (pré-púberes) ou >15mm (pós-púberes)',
        'Efélides axilares ou inguinais',
        '≥2 neurofibromas ou 1 plexiforme',
        'Glioma óptico',
        '≥2 nódulos de Lisch',
        'Lesão óssea característica',
        'Parente de 1º grau com NF1'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Vigilância ativa', 'Exames de imagem periódicos'],
        farmacologico: ['Selumetinibe para neurofibromas plexiformes inoperáveis']
      },
      redFlags: ['Neurofibroma plexiforme de crescimento rápido (transformação maligna)', 'Déficit neurológico progressivo', 'Hipertensão (feocromocitoma)']
    },
    protocolos: [],
    medicamentos: ['selumetinibe'],
    calculadoras: [],
    citations: [{ refId: 'nf1-guidelines-2021' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'neurologia', 'dermatologia', 'monogenica']
  },
  {
    id: 'sindrome-marfan',
    titulo: 'Síndrome de Marfan',
    sinonimos: ['MFS'],
    doid: 'DOID:14323',
    snomedCT: '19346006',
    meshId: 'D008382',
    ciap2: ['L82'],
    cid10: ['Q87.4'],
    categoria: 'cardiovascular',
    subcategoria: 'tecido-conjuntivo',
    quickView: {
      definicao: 'Doença do tecido conjuntivo por mutação no gene FBN1 (fibrilina-1). Prevalência: 1:5.000-1:10.000. Afeta principalmente sistemas cardiovascular, ocular e esquelético.',
      criteriosDiagnosticos: [
        'Critérios de Ghent revisados (2010)',
        'Dilatação/dissecção de raiz aórtica + ectopia lentis = diagnóstico',
        'Ou: dilatação aórtica + mutação FBN1',
        'Ou: dilatação aórtica + score sistêmico ≥7'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Restrição de exercício isométrico intenso', 'Evitar esportes de contato'],
        farmacologico: ['Beta-bloqueador para proteção aórtica', 'Losartana como alternativa/adjuvante']
      },
      redFlags: ['Dilatação aórtica >50mm ou progressão rápida', 'Dor torácica aguda (dissecção)', 'Subluxação do cristalino progressiva']
    },
    protocolos: [],
    medicamentos: ['atenolol', 'metoprolol', 'losartana'],
    calculadoras: [],
    citations: [{ refId: 'loeys-2010-marfan-criteria' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'cardiologia', 'oftalmologia', 'tecido-conjuntivo']
  },
  {
    id: 'acondroplasia',
    titulo: 'Acondroplasia',
    sinonimos: ['Nanismo acondroplásico'],
    doid: 'DOID:4480',
    snomedCT: '86268005',
    meshId: 'D000130',
    ciap2: ['L82'],
    cid10: ['Q77.4'],
    categoria: 'musculoesqueletico',
    subcategoria: 'displasia-ossea',
    quickView: {
      definicao: 'Displasia óssea mais comum. Mutação no gene FGFR3. Incidência: 1:15.000-1:40.000. 80% casos de novo. Causa mais comum de baixa estatura desproporcional.',
      criteriosDiagnosticos: [
        'Fenótipo característico: rizomelia, macrocefalia, hipoplasia de face média',
        'Radiografia: encurtamento rizomélico, mãos em tridente, forame magno estreito',
        'Teste genético: mutação G380R no FGFR3 (>98%)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Acompanhamento multidisciplinar', 'Fisioterapia', 'Avaliação neurocirúrgica se estenose'],
        farmacologico: ['Vosoritide (análogo de CNP) para crianças em crescimento']
      },
      redFlags: ['Apneia central (compressão do tronco)', 'Hidrocefalia', 'Estenose do forame magno', 'Estenose espinhal']
    },
    protocolos: [],
    medicamentos: ['vosoritide'],
    calculadoras: [],
    citations: [{ refId: 'achondroplasia-guidelines-2020' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'ortopedia', 'pediatria', 'displasia-ossea']
  },
  {
    id: 'esclerose-tuberosa',
    titulo: 'Complexo Esclerose Tuberosa',
    sinonimos: ['CET', 'TSC', 'Doença de Bourneville'],
    doid: 'DOID:13515',
    snomedCT: '7199000',
    meshId: 'D014402',
    ciap2: ['N87'],
    cid10: ['Q85.1'],
    categoria: 'neurologico',
    subcategoria: 'neurocutanea',
    quickView: {
      definicao: 'Síndrome neurocutânea por mutação em TSC1/TSC2. Incidência: 1:6.000. Caracterizada por hamartomas múltiplos em vários órgãos.',
      criteriosDiagnosticos: [
        'Critérios diagnósticos: ≥2 maiores ou 1 maior + ≥2 menores',
        'Critérios maiores: manchas hipocrômicas, angiofibromas, placa de Shagreen, túberes corticais, nódulos subependimários, SEGA, rabdomioma cardíaco, linfangioleiomiomatose, angiomiolipoma renal',
        'Teste genético: mutação TSC1 ou TSC2'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Vigilância com RM cerebral e USG/RM renal', 'Controle de crises epilépticas'],
        farmacologico: ['Everolimus para SEGA, angiomiolipoma, LAM']
      },
      redFlags: ['SEGA com hidrocefalia', 'Sangramento de angiomiolipoma', 'Espasmos infantis', 'Status epilepticus']
    },
    protocolos: [],
    medicamentos: ['everolimus', 'vigabatrina', 'carbamazepina'],
    calculadoras: [],
    citations: [{ refId: 'tsc-guidelines-2021' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'neurologia', 'nefrologia', 'dermatologia']
  },
  {
    id: 'hipercolesterolemia-familiar',
    titulo: 'Hipercolesterolemia Familiar',
    sinonimos: ['HF', 'FH'],
    doid: 'DOID:13810',
    snomedCT: '398036000',
    meshId: 'D006938',
    ciap2: ['T93'],
    cid10: ['E78.0'],
    categoria: 'cardiovascular',
    subcategoria: 'dislipidemia',
    quickView: {
      definicao: 'Doença autossômica dominante com LDL-c muito elevado desde o nascimento. Mutações em LDLR (85-90%), APOB (5-10%), PCSK9 (1-3%). Prevalência: 1:200-1:500.',
      criteriosDiagnosticos: [
        'Critérios Dutch Lipid Clinic Network (DLCN)',
        'LDL-c >190 mg/dL em adultos ou >160 mg/dL em crianças',
        'História familiar de DCV precoce ou hipercolesterolemia',
        'Xantomas tendinosos, arco corneano <45 anos'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Dieta com restrição de gordura saturada', 'Atividade física'],
        farmacologico: ['Estatina de alta potência', 'Ezetimiba adjuvante', 'Inibidor de PCSK9 se necessário']
      },
      redFlags: ['DCV precoce (<55 anos homens, <60 anos mulheres)', 'LDL-c >500 mg/dL (forma homozigota)', 'Estenose aórtica supravalvar']
    },
    protocolos: [],
    medicamentos: ['atorvastatina', 'rosuvastatina', 'ezetimiba', 'evolocumabe', 'alirocumabe'],
    calculadoras: ['dlcn-score'],
    citations: [{ refId: 'fh-guidelines-eas-2020' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'cardiologia', 'lipidios', 'aterosclerose']
  },

  // ==================== MONOGÊNICAS - METABÓLICAS ====================
  {
    id: 'fibrose-cistica',
    titulo: 'Fibrose Cística',
    sinonimos: ['Mucoviscidose', 'FC', 'CF'],
    doid: 'DOID:1485',
    snomedCT: '190905008',
    meshId: 'D003550',
    ciap2: ['R99'],
    cid10: ['E84', 'E84.0', 'E84.9'],
    categoria: 'respiratorio',
    subcategoria: 'genetica',
    quickView: {
      definicao: 'Doença autossômica recessiva mais comum em caucasianos. Mutação no gene CFTR. Incidência: 1:2.500-1:3.500. Afeta glândulas exócrinas causando secreções espessas.',
      criteriosDiagnosticos: [
        'Triagem neonatal positiva (IRT elevado)',
        'Teste do suor: cloro ≥60 mEq/L (positivo)',
        'Teste genético: 2 mutações patogênicas no CFTR',
        'Manifestações clínicas: doença pulmonar, insuficiência pancreática, íleo meconial'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia respiratória diária', 'Nutrição hipercalórica', 'Atividade física'],
        farmacologico: ['Moduladores de CFTR (ivacaftor, lumacaftor, tezacaftor, elexacaftor)', 'Dornase alfa', 'Solução salina hipertônica']
      },
      redFlags: ['Exacerbação pulmonar', 'Hemoptise maciça', 'Pneumotórax', 'ABPA', 'Diabetes relacionado à FC']
    },
    protocolos: ['protocolo-fc-ms'],
    medicamentos: ['ivacaftor', 'lumacaftor', 'tezacaftor', 'elexacaftor', 'dornase-alfa', 'azitromicina', 'tobramicina'],
    calculadoras: [],
    citations: [{ refId: 'cf-foundation-guidelines-2023' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'pneumologia', 'gastroenterologia', 'triagem-neonatal']
  },
  {
    id: 'anemia-falciforme',
    titulo: 'Doença Falciforme',
    sinonimos: ['Anemia falciforme', 'Drepanocitose', 'HbSS'],
    doid: 'DOID:10923',
    snomedCT: '417357006',
    meshId: 'D000755',
    ciap2: ['B78'],
    cid10: ['D57', 'D57.0', 'D57.1'],
    categoria: 'hematologico',
    subcategoria: 'hemoglobinopatia',
    quickView: {
      definicao: 'Hemoglobinopatia mais prevalente no Brasil. Mutação no gene HBB (Glu6Val). Prevalência de traço falciforme: 6-10% em afrodescendentes.',
      criteriosDiagnosticos: [
        'Triagem neonatal (teste do pezinho): padrão FS',
        'Eletroforese de hemoglobina: HbS >50%, HbA ausente',
        'HPLC ou cromatografia',
        'Teste de solubilidade positivo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação adequada', 'Evitar extremos de temperatura', 'Vacinação completa incluindo pneumocócica'],
        farmacologico: ['Hidroxiureia', 'Penicilina profilática até 5 anos', 'Ácido fólico']
      },
      redFlags: ['Síndrome torácica aguda', 'AVC', 'Sequestro esplênico', 'Priapismo >4h', 'Crise aplástica']
    },
    protocolos: ['protocolo-falciforme-ms'],
    medicamentos: ['hidroxiureia', 'penicilina-v', 'voxelotor', 'crizanlizumabe', 'acido-folico'],
    calculadoras: [],
    citations: [{ refId: 'nhlbi-scd-guidelines-2014' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'hematologia', 'triagem-neonatal', 'hemoglobinopatia']
  },
  {
    id: 'fenilcetonuria',
    titulo: 'Fenilcetonúria',
    sinonimos: ['PKU', 'Deficiência de PAH'],
    doid: 'DOID:9281',
    snomedCT: '7573000',
    meshId: 'D010661',
    ciap2: ['T99'],
    cid10: ['E70.0', 'E70.1'],
    categoria: 'metabolico',
    subcategoria: 'erro-inato',
    quickView: {
      definicao: 'Erro inato do metabolismo da fenilalanina por deficiência de fenilalanina hidroxilase. Incidência: 1:10.000-1:15.000. Detectada na triagem neonatal.',
      criteriosDiagnosticos: [
        'Triagem neonatal: fenilalanina elevada (>2mg/dL)',
        'Confirmação: fenilalanina plasmática >10mg/dL',
        'Teste de BH4 para diagnóstico diferencial',
        'Teste genético: mutações no gene PAH'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Dieta restrita em fenilalanina vitalícia', 'Fórmula metabólica especial', 'Acompanhamento nutricional regular'],
        farmacologico: ['Sapropterina (BH4) para casos responsivos', 'Pegvaliase para adultos não responsivos a BH4']
      },
      redFlags: ['Atraso no início do tratamento (dano neurológico irreversível)', 'Síndrome de PKU materna (gestante não controlada)', 'Níveis de Phe persistentemente >10mg/dL']
    },
    protocolos: ['protocolo-pku-ms'],
    medicamentos: ['sapropterina', 'pegvaliase'],
    calculadoras: [],
    citations: [{ refId: 'pku-guidelines-acmg-2014' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'metabolismo', 'triagem-neonatal', 'erro-inato']
  },
  {
    id: 'galactosemia',
    titulo: 'Galactosemia Clássica',
    sinonimos: ['Deficiência de GALT', 'Galactosemia tipo I'],
    doid: 'DOID:9870',
    snomedCT: '190745006',
    meshId: 'D005693',
    ciap2: ['T99'],
    cid10: ['E74.2'],
    categoria: 'metabolico',
    subcategoria: 'erro-inato',
    quickView: {
      definicao: 'Erro inato do metabolismo da galactose por deficiência de GALT. Incidência: 1:40.000-1:60.000. Emergência neonatal se não tratada.',
      criteriosDiagnosticos: [
        'Triagem neonatal: galactose total elevada, GALT reduzida',
        'Confirmação: atividade de GALT <1% do normal',
        'Teste genético: mutações no gene GALT',
        'Sintomas neonatais: icterícia, hepatomegalia, catarata, sepse por E. coli'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Dieta livre de galactose vitalícia', 'Suspensão imediata do aleitamento materno e fórmulas com lactose'],
        farmacologico: ['Suplementação de cálcio e vitamina D']
      },
      redFlags: ['Sepse neonatal por E. coli', 'Insuficiência hepática aguda', 'Catarata bilateral', 'Falência ovariana precoce']
    },
    protocolos: [],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'galactosemia-guidelines-2017' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'metabolismo', 'triagem-neonatal', 'erro-inato', 'emergencia']
  },
  {
    id: 'atrofia-muscular-espinhal',
    titulo: 'Atrofia Muscular Espinhal',
    sinonimos: ['AME', 'SMA'],
    doid: 'DOID:12377',
    snomedCT: '5262007',
    meshId: 'D009134',
    ciap2: ['N87'],
    cid10: ['G12.0', 'G12.1'],
    categoria: 'neurologico',
    subcategoria: 'neuromuscular',
    quickView: {
      definicao: 'Doença neuromuscular por deleção/mutação do gene SMN1. Incidência: 1:6.000-1:10.000. Degeneração de neurônios motores do corno anterior.',
      criteriosDiagnosticos: [
        'Teste genético: deleção homozigótica de SMN1 (95%)',
        'ENMG: padrão neurogênico',
        'Fraqueza proximal simétrica',
        'Classificação: Tipo I (grave), II (intermediária), III (leve), IV (adulto)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia motora e respiratória', 'Suporte ventilatório conforme necessidade', 'Suporte nutricional'],
        farmacologico: ['Nusinersena intratecal', 'Onasemnogene (terapia gênica)', 'Risdiplam oral']
      },
      redFlags: ['Insuficiência respiratória', 'Disfagia grave', 'Escoliose progressiva']
    },
    protocolos: ['protocolo-ame-ms'],
    medicamentos: ['nusinersena', 'risdiplam'],
    calculadoras: [],
    citations: [{ refId: 'sma-guidelines-2018' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'neurologia', 'pediatria', 'doenca-neuromuscular']
  },
  {
    id: 'doenca-tay-sachs',
    titulo: 'Doença de Tay-Sachs',
    sinonimos: ['Gangliosidose GM2 tipo I', 'Deficiência de hexosaminidase A'],
    doid: 'DOID:3320',
    snomedCT: '111385000',
    meshId: 'D013661',
    ciap2: ['N87'],
    cid10: ['E75.0'],
    categoria: 'neurologico',
    subcategoria: 'lisossomica',
    quickView: {
      definicao: 'Doença de depósito lisossômico por deficiência de hexosaminidase A. Incidência: 1:3.600 em judeus Ashkenazi, 1:320.000 geral. Forma infantil é fatal.',
      criteriosDiagnosticos: [
        'Atividade de hexosaminidase A <5% do normal',
        'Mancha vermelho-cereja na mácula',
        'Regressão neurológica progressiva',
        'Teste genético: mutações no gene HEXA'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Cuidados paliativos', 'Suporte nutricional', 'Fisioterapia de conforto'],
        farmacologico: ['Tratamento sintomático de crises epilépticas']
      },
      redFlags: ['Macrocefalia progressiva', 'Crises epilépticas refratárias', 'Dificuldade respiratória']
    },
    protocolos: [],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'tay-sachs-ghr' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'neurologia', 'lisossomica', 'cuidados-paliativos']
  },
  {
    id: 'hemocromatose-hereditaria',
    titulo: 'Hemocromatose Hereditária',
    sinonimos: ['Hemocromatose tipo 1', 'Sobrecarga de ferro hereditária'],
    doid: 'DOID:2352',
    snomedCT: '399187006',
    meshId: 'D006432',
    ciap2: ['T99'],
    cid10: ['E83.1'],
    categoria: 'hematologico',
    subcategoria: 'sobrecarga-ferro',
    quickView: {
      definicao: 'Doença de sobrecarga de ferro por mutação no gene HFE. Prevalência: 1:200-1:500 em caucasianos. Mutação C282Y é a mais comum.',
      criteriosDiagnosticos: [
        'Saturação de transferrina >45%',
        'Ferritina elevada',
        'Teste genético: C282Y homozigoto ou C282Y/H63D',
        'RM hepática: sobrecarga de ferro',
        'Biópsia hepática se necessário'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Flebotomia terapêutica (500ml sangue = 200-250mg ferro)', 'Evitar suplementos de ferro e vitamina C'],
        farmacologico: ['Quelantes de ferro se flebotomia contraindicada']
      },
      redFlags: ['Cirrose hepática', 'Carcinoma hepatocelular', 'Cardiomiopatia', 'Diabetes secundário']
    },
    protocolos: [],
    medicamentos: ['deferoxamina', 'deferasirox'],
    calculadoras: [],
    citations: [{ refId: 'hemochromatosis-guidelines-2019' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'hepatologia', 'hematologia', 'sobrecarga-ferro']
  },
  {
    id: 'doenca-wilson',
    titulo: 'Doença de Wilson',
    sinonimos: ['Degeneração hepatolenticular', 'Sobrecarga de cobre'],
    doid: 'DOID:893',
    snomedCT: '88518009',
    meshId: 'D006527',
    ciap2: ['T99'],
    cid10: ['E83.0'],
    categoria: 'gastrointestinal',
    subcategoria: 'hepatopatia-genetica',
    quickView: {
      definicao: 'Doença de acúmulo de cobre por mutação no gene ATP7B. Prevalência: 1:30.000. Afeta principalmente fígado e sistema nervoso central.',
      criteriosDiagnosticos: [
        'Ceruloplasmina sérica baixa (<20mg/dL)',
        'Cobre urinário 24h elevado (>100mcg/24h)',
        'Anéis de Kayser-Fleischer (exame com lâmpada de fenda)',
        'Cobre hepático >250mcg/g peso seco',
        'Teste genético: mutações ATP7B'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Dieta pobre em cobre (evitar fígado, mariscos, chocolate, nozes)', 'Transplante hepático se falência hepática'],
        farmacologico: ['D-penicilamina ou trientina (quelantes)', 'Zinco (manutenção)']
      },
      redFlags: ['Insuficiência hepática aguda', 'Anemia hemolítica', 'Sintomas neurológicos progressivos', 'Crises psiquiátricas']
    },
    protocolos: [],
    medicamentos: ['d-penicilamina', 'trientina', 'zinco'],
    calculadoras: [],
    citations: [{ refId: 'wilson-easl-guidelines-2012' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'hepatologia', 'neurologia', 'sobrecarga-cobre']
  },

  // ==================== LIGADAS AO X ====================
  {
    id: 'distrofia-duchenne',
    titulo: 'Distrofia Muscular de Duchenne',
    sinonimos: ['DMD', 'Duchenne'],
    doid: 'DOID:11723',
    snomedCT: '76670001',
    meshId: 'D020388',
    ciap2: ['N87'],
    cid10: ['G71.0'],
    categoria: 'neurologico',
    subcategoria: 'distrofia-muscular',
    quickView: {
      definicao: 'Distrofia muscular progressiva ligada ao X por mutação no gene DMD (distrofina). Incidência: 1:3.500-1:5.000 meninos. Forma mais grave das distrofinopatias.',
      criteriosDiagnosticos: [
        'CK muito elevada (10-100x normal)',
        'Biópsia muscular: ausência de distrofina',
        'Teste genético: deleção/duplicação/mutação pontual no gene DMD',
        'Fraqueza proximal progressiva, sinal de Gowers'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia', 'Órteses', 'Suporte ventilatório', 'Acompanhamento cardíaco'],
        farmacologico: ['Corticosteroides (deflazacort ou prednisona)', 'Terapias antisense para mutações elegíveis']
      },
      redFlags: ['Perda da marcha (<12 anos)', 'Cardiomiopatia', 'Insuficiência respiratória', 'Escoliose progressiva']
    },
    protocolos: [],
    medicamentos: ['deflazacort', 'prednisona', 'eteplirsen', 'golodirsen'],
    calculadoras: [],
    citations: [{ refId: 'dmd-guidelines-2018' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'neurologia', 'pediatria', 'distrofia-muscular']
  },
  {
    id: 'hemofilia-a',
    titulo: 'Hemofilia A',
    sinonimos: ['Deficiência de fator VIII', 'Hemofilia clássica'],
    doid: 'DOID:12134',
    snomedCT: '28293008',
    meshId: 'D006467',
    ciap2: ['B83'],
    cid10: ['D66'],
    categoria: 'hematologico',
    subcategoria: 'coagulopatia',
    quickView: {
      definicao: 'Coagulopatia hereditária ligada ao X por deficiência de fator VIII. Incidência: 1:5.000 meninos. Classificada em grave (<1%), moderada (1-5%), leve (5-40%).',
      criteriosDiagnosticos: [
        'PTTa prolongado com TP normal',
        'Dosagem de fator VIII reduzida',
        'História familiar positiva (mas 30% de novo)',
        'Teste genético: mutação no gene F8'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar trauma', 'Identificação médica (pulseira)', 'Fisioterapia para articulações'],
        farmacologico: ['Fator VIII recombinante sob demanda ou profilaxia', 'Emicizumabe para profilaxia', 'Desmopressina para formas leves']
      },
      redFlags: ['Sangramento intracraniano', 'Sangramento em compartimento fechado', 'Desenvolvimento de inibidores', 'Artropatia hemofílica']
    },
    protocolos: ['protocolo-hemofilia-ms'],
    medicamentos: ['fator-viii', 'emicizumabe', 'desmopressina', 'acido-tranexamico'],
    calculadoras: [],
    citations: [{ refId: 'wfh-hemophilia-guidelines-2020' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'hematologia', 'coagulopatia', 'sangramento']
  },
  {
    id: 'hemofilia-b',
    titulo: 'Hemofilia B',
    sinonimos: ['Deficiência de fator IX', 'Doença de Christmas'],
    doid: 'DOID:12259',
    snomedCT: '1563006',
    meshId: 'D002836',
    ciap2: ['B83'],
    cid10: ['D67'],
    categoria: 'hematologico',
    subcategoria: 'coagulopatia',
    quickView: {
      definicao: 'Coagulopatia hereditária ligada ao X por deficiência de fator IX. Incidência: 1:25.000-1:30.000 meninos. Clinicamente indistinguível da hemofilia A.',
      criteriosDiagnosticos: [
        'PTTa prolongado com TP normal',
        'Dosagem de fator IX reduzida',
        'Teste genético: mutação no gene F9'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar trauma', 'Fisioterapia'],
        farmacologico: ['Fator IX recombinante', 'Fator IX de meia-vida estendida', 'Terapia gênica (etranacogene dezaparvovec)']
      },
      redFlags: ['Sangramento intracraniano', 'Desenvolvimento de inibidores (menos comum que hemofilia A)']
    },
    protocolos: ['protocolo-hemofilia-ms'],
    medicamentos: ['fator-ix'],
    calculadoras: [],
    citations: [{ refId: 'wfh-hemophilia-guidelines-2020' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'hematologia', 'coagulopatia', 'sangramento']
  },
  {
    id: 'sindrome-x-fragil',
    titulo: 'Síndrome do X Frágil',
    sinonimos: ['FXS', 'Síndrome de Martin-Bell'],
    doid: 'DOID:14261',
    snomedCT: '205615000',
    meshId: 'D005600',
    ciap2: ['P85'],
    cid10: ['Q99.2'],
    categoria: 'saude_mental',
    subcategoria: 'deficiencia-intelectual',
    quickView: {
      definicao: 'Causa hereditária mais comum de deficiência intelectual. Expansão de repetição CGG no gene FMR1. Incidência: 1:4.000 meninos, 1:8.000 meninas.',
      criteriosDiagnosticos: [
        'Teste genético: >200 repetições CGG = mutação completa',
        'Fenótipo: face alongada, orelhas proeminentes, macroorquidismo',
        'Deficiência intelectual leve a moderada',
        'Comportamento: hiperatividade, evitação do olhar, traços autísticos'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Estimulação precoce', 'Fonoaudiologia', 'Terapia ocupacional', 'Suporte educacional'],
        farmacologico: ['Tratamento sintomático: ISRS para ansiedade, estimulantes para TDAH']
      },
      redFlags: ['Convulsões (20%)', 'Prolapso de valva mitral', 'Síndrome de tremor/ataxia associada ao X frágil (FXTAS) em portadores']
    },
    protocolos: [],
    medicamentos: ['metilfenidato', 'sertralina', 'risperidona'],
    calculadoras: [],
    citations: [{ refId: 'fragile-x-guidelines-2019' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'neurologia', 'psiquiatria', 'deficiencia-intelectual']
  },

  // ==================== DOENÇAS OCUPACIONAIS - RESPIRATÓRIAS ====================
  {
    id: 'silicose',
    titulo: 'Silicose',
    sinonimos: ['Pneumoconiose por sílica', 'Doença dos mineiros'],
    doid: 'DOID:10325',
    snomedCT: '805002',
    meshId: 'D012829',
    ciap2: ['R99'],
    cid10: ['J62', 'J62.8'],
    categoria: 'respiratorio',
    subcategoria: 'pneumoconiose',
    quickView: {
      definicao: 'Pneumoconiose por inalação de sílica cristalina. Ocupações de risco: mineração, jateamento de areia, cerâmica, construção. Formas: crônica, acelerada, aguda.',
      criteriosDiagnosticos: [
        'História ocupacional de exposição a sílica',
        'TC de tórax: nódulos silicóticos, fibrose',
        'Espirometria: padrão restritivo ou misto',
        'Exclusão de outras causas (TB, sarcoidose)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Cessação da exposição', 'Cessação do tabagismo', 'Reabilitação pulmonar', 'Oxigenoterapia se hipoxemia'],
        farmacologico: ['Não há tratamento específico', 'Broncodilatadores sintomáticos']
      },
      redFlags: ['Silicose acelerada (exposição intensa)', 'Silicotuberculose (risco 3x maior de TB)', 'Fibrose maciça progressiva', 'Insuficiência respiratória']
    },
    protocolos: [],
    medicamentos: ['salbutamol'],
    calculadoras: [],
    citations: [{ refId: 'silicosis-ats-ers-2020' }],
    lastUpdate: '2025-01',
    tags: ['ocupacional', 'pneumologia', 'pneumoconiose', 'fibrose']
  },
  {
    id: 'asbestose',
    titulo: 'Asbestose',
    sinonimos: ['Fibrose pulmonar por amianto'],
    doid: 'DOID:2350',
    snomedCT: '22607003',
    meshId: 'D001195',
    ciap2: ['R99'],
    cid10: ['J61'],
    categoria: 'respiratorio',
    subcategoria: 'pneumoconiose',
    quickView: {
      definicao: 'Pneumoconiose por inalação de fibras de amianto. Latência: 15-40 anos. Associada a mesotelioma pleural e carcinoma broncogênico.',
      criteriosDiagnosticos: [
        'História ocupacional de exposição a amianto',
        'TC de tórax: fibrose intersticial basal bilateral, placas pleurais',
        'Espirometria: padrão restritivo',
        'Corpúsculos de asbesto no escarro ou LBA'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Cessação da exposição', 'Cessação do tabagismo', 'Vacinação (pneumocócica, influenza)', 'Reabilitação pulmonar'],
        farmacologico: ['Tratamento sintomático', 'Oxigenoterapia se hipoxemia']
      },
      redFlags: ['Derrame pleural (investigar mesotelioma)', 'Perda de peso (neoplasia)', 'Progressão rápida da dispneia']
    },
    protocolos: [],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'asbestosis-ats-ers' }],
    lastUpdate: '2025-01',
    tags: ['ocupacional', 'pneumologia', 'pneumoconiose', 'cancer']
  },
  {
    id: 'pneumoconiose-carvao',
    titulo: 'Pneumoconiose dos Mineiros de Carvão',
    sinonimos: ['Pulmão negro', 'CWP', 'Antracose'],
    doid: 'DOID:10331',
    snomedCT: '40122008',
    meshId: 'D011009',
    ciap2: ['R99'],
    cid10: ['J60'],
    categoria: 'respiratorio',
    subcategoria: 'pneumoconiose',
    quickView: {
      definicao: 'Pneumoconiose por inalação de poeira de carvão. Formas: simples (nódulos <10mm) e complicada (fibrose maciça progressiva).',
      criteriosDiagnosticos: [
        'História ocupacional em mineração de carvão',
        'RX/TC tórax: opacidades nodulares, fibrose maciça progressiva',
        'Espirometria: padrão restritivo ou misto'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Afastamento da exposição', 'Cessação do tabagismo', 'Reabilitação pulmonar'],
        farmacologico: ['Tratamento sintomático', 'Broncodilatadores']
      },
      redFlags: ['Fibrose maciça progressiva', 'Síndrome de Caplan (AR + pneumoconiose)', 'Insuficiência respiratória']
    },
    protocolos: [],
    medicamentos: ['salbutamol'],
    calculadoras: [],
    citations: [{ refId: 'cwp-niosh-2020' }],
    lastUpdate: '2025-01',
    tags: ['ocupacional', 'pneumologia', 'pneumoconiose', 'mineracao']
  },
  {
    id: 'bissinose',
    titulo: 'Bissinose',
    sinonimos: ['Pulmão dos trabalhadores de algodão', 'Febre da segunda-feira'],
    doid: 'DOID:3020',
    snomedCT: '73128006',
    meshId: 'D002095',
    ciap2: ['R99'],
    cid10: ['J66.0'],
    categoria: 'respiratorio',
    subcategoria: 'ocupacional',
    quickView: {
      definicao: 'Doença ocupacional por inalação de poeira de fibras vegetais (algodão, linho, cânhamo). Característica: sintomas piores às segundas-feiras.',
      criteriosDiagnosticos: [
        'Exposição ocupacional a poeira de algodão',
        'Aperto torácico típico de segunda-feira',
        'Queda do VEF1 durante jornada de trabalho',
        'Melhora com afastamento'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Controle ambiental', 'Afastamento da exposição se necessário'],
        farmacologico: ['Broncodilatadores', 'Corticoides inalatórios se asma sobreposta']
      },
      redFlags: ['Bissinose grau 3 (sintomas todos os dias)', 'DPOC estabelecida', 'Insuficiência respiratória']
    },
    protocolos: [],
    medicamentos: ['salbutamol', 'beclometasona'],
    calculadoras: [],
    citations: [{ refId: 'byssinosis-ilo' }],
    lastUpdate: '2025-01',
    tags: ['ocupacional', 'pneumologia', 'industria-textil']
  },
  {
    id: 'asma-ocupacional',
    titulo: 'Asma Ocupacional',
    sinonimos: ['Asma relacionada ao trabalho'],
    doid: 'DOID:2841',
    snomedCT: '57607007',
    meshId: 'D059366',
    ciap2: ['R96'],
    cid10: ['J45.0', 'J68.3'],
    categoria: 'respiratorio',
    subcategoria: 'ocupacional',
    quickView: {
      definicao: 'Asma causada ou exacerbada por exposição no ambiente de trabalho. Representa 10-25% dos casos de asma em adultos. >400 agentes sensibilizantes conhecidos.',
      criteriosDiagnosticos: [
        'Relação temporal com exposição ocupacional',
        'Melhora nos períodos afastados do trabalho',
        'PFE seriado no trabalho vs. fora',
        'Teste de provocação específico (padrão-ouro)',
        'IgE específica para alérgeno ocupacional'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Afastamento do agente causal', 'Controle ambiental', 'Equipamentos de proteção'],
        farmacologico: ['Corticoide inalatório + LABA', 'Corticoide sistêmico nas exacerbações']
      },
      redFlags: ['Sintomas persistentes após afastamento', 'Asma grave não controlada', 'RADS (síndrome de disfunção reativa de vias aéreas)']
    },
    protocolos: [],
    medicamentos: ['beclometasona', 'budesonida', 'formoterol', 'salbutamol'],
    calculadoras: [],
    citations: [{ refId: 'occupational-asthma-gina-2023' }],
    lastUpdate: '2025-01',
    tags: ['ocupacional', 'pneumologia', 'asma', 'alergia']
  },

  // ==================== DOENÇAS OCUPACIONAIS - DERMATOLÓGICAS ====================
  {
    id: 'dermatite-contato-ocupacional',
    titulo: 'Dermatite de Contato Ocupacional',
    sinonimos: ['Eczema ocupacional', 'Dermatose ocupacional'],
    doid: 'DOID:3298',
    snomedCT: '40275004',
    meshId: 'D003877',
    ciap2: ['S88'],
    cid10: ['L23', 'L24', 'L25'],
    categoria: 'dermatologico',
    subcategoria: 'ocupacional',
    quickView: {
      definicao: 'Dermatite causada por agentes do ambiente de trabalho. Tipos: irritativa (80%) e alérgica (20%). Doença ocupacional mais comum.',
      criteriosDiagnosticos: [
        'Lesões em áreas expostas no trabalho (mãos, antebraços)',
        'Relação temporal com exposição',
        'Melhora com afastamento',
        'Teste de contato (patch test) para forma alérgica'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Identificação e evitação do agente', 'Uso de luvas adequadas', 'Hidratação cutânea'],
        farmacologico: ['Corticoide tópico', 'Emolientes', 'Anti-histamínicos para prurido']
      },
      redFlags: ['Infecção secundária', 'Dermatite crônica liquenificada', 'Incapacidade laboral']
    },
    protocolos: [],
    medicamentos: ['betametasona', 'mometasona', 'hidroxizina'],
    calculadoras: [],
    citations: [{ refId: 'occupational-dermatitis-guidelines' }],
    lastUpdate: '2025-01',
    tags: ['ocupacional', 'dermatologia', 'alergia', 'contato']
  },

  // ==================== DOENÇAS OCUPACIONAIS - MUSCULOESQUELÉTICAS ====================
  {
    id: 'dort-ler',
    titulo: 'DORT/LER',
    sinonimos: ['Distúrbios Osteomusculares Relacionados ao Trabalho', 'Lesões por Esforços Repetitivos', 'LER'],
    doid: 'DOID:0080015',
    snomedCT: '182560007',
    meshId: 'D012090',
    ciap2: ['L87'],
    cid10: ['M70', 'M75', 'M77'],
    categoria: 'musculoesqueletico',
    subcategoria: 'ocupacional',
    quickView: {
      definicao: 'Conjunto de afecções musculoesqueléticas relacionadas ao trabalho. Inclui tendinites, tenossinovites, epicondilites, síndrome do túnel do carpo.',
      criteriosDiagnosticos: [
        'Dor musculoesquelética relacionada a atividade laboral',
        'Movimentos repetitivos, posturas inadequadas, sobrecarga',
        'Exame físico: pontos dolorosos, testes específicos',
        'Exames de imagem conforme necessário'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Ergonomia adequada', 'Pausas regulares', 'Fisioterapia', 'Modificação de atividades'],
        farmacologico: ['AINEs', 'Analgésicos', 'Infiltração local em casos selecionados']
      },
      redFlags: ['Déficit neurológico', 'Fraqueza muscular progressiva', 'Atrofia muscular', 'Síndrome compartimental']
    },
    protocolos: ['protocolo-dort-ms'],
    medicamentos: ['ibuprofeno', 'diclofenaco', 'paracetamol'],
    calculadoras: [],
    citations: [{ refId: 'dort-ms-brasil-2012' }],
    lastUpdate: '2025-01',
    tags: ['ocupacional', 'ortopedia', 'reumatologia', 'ergonomia']
  },
  {
    id: 'sindrome-tunel-carpo-ocupacional',
    titulo: 'Síndrome do Túnel do Carpo Ocupacional',
    sinonimos: ['STC ocupacional', 'Compressão do nervo mediano'],
    doid: 'DOID:12169',
    snomedCT: '57406009',
    meshId: 'D002349',
    ciap2: ['N93'],
    cid10: ['G56.0'],
    categoria: 'neurologico',
    subcategoria: 'neuropatia-compressiva',
    quickView: {
      definicao: 'Neuropatia compressiva do nervo mediano no punho relacionada a atividades ocupacionais repetitivas. Prevalência: 3-6% da população geral.',
      criteriosDiagnosticos: [
        'Parestesias noturnas em território do mediano',
        'Testes de Phalen e Tinel positivos',
        'ENMG: latência motora e sensitiva prolongadas',
        'Relação com atividade ocupacional'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Órtese noturna', 'Modificação de atividades', 'Ergonomia'],
        farmacologico: ['AINEs para fase aguda', 'Infiltração de corticoide (máximo 2-3)']
      },
      redFlags: ['Atrofia tenar', 'Fraqueza de oponência', 'Déficit sensitivo permanente']
    },
    protocolos: [],
    medicamentos: ['ibuprofeno', 'metilprednisolona'],
    calculadoras: [],
    citations: [{ refId: 'carpal-tunnel-aaos-2016' }],
    lastUpdate: '2025-01',
    tags: ['ocupacional', 'ortopedia', 'neurologia', 'neuropatia']
  },
  {
    id: 'lombalgia-ocupacional',
    titulo: 'Lombalgia Ocupacional',
    sinonimos: ['Dor lombar relacionada ao trabalho'],
    doid: 'DOID:0050563',
    snomedCT: '279039007',
    meshId: 'D017116',
    ciap2: ['L03'],
    cid10: ['M54.5'],
    categoria: 'musculoesqueletico',
    subcategoria: 'ocupacional',
    quickView: {
      definicao: 'Dor na região lombar relacionada a atividades laborais. Causa mais comum de incapacidade laboral. Fatores: levantamento de peso, vibração, postura.',
      criteriosDiagnosticos: [
        'Dor lombar com relação temporal com atividade ocupacional',
        'Exclusão de causas específicas (red flags)',
        'Avaliação de fatores biomecânicos e psicossociais'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Manter atividade física', 'Ergonomia', 'Fisioterapia', 'Educação do paciente'],
        farmacologico: ['AINEs por curto período', 'Relaxantes musculares se espasmo']
      },
      redFlags: ['Síndrome da cauda equina', 'Déficit neurológico progressivo', 'Trauma significativo', 'Perda de peso inexplicada', 'Febre']
    },
    protocolos: [],
    medicamentos: ['ibuprofeno', 'ciclobenzaprina', 'paracetamol'],
    calculadoras: [],
    citations: [{ refId: 'low-back-pain-nice-2020' }],
    lastUpdate: '2025-01',
    tags: ['ocupacional', 'ortopedia', 'reumatologia', 'dor']
  },

  // ==================== DOENÇAS OCUPACIONAIS - INTOXICAÇÕES ====================
  {
    id: 'intoxicacao-chumbo',
    titulo: 'Intoxicação por Chumbo',
    sinonimos: ['Saturnismo', 'Plumbismo'],
    doid: 'DOID:9878',
    snomedCT: '1402001',
    meshId: 'D007855',
    ciap2: ['A86'],
    cid10: ['T56.0'],
    categoria: 'outros',
    subcategoria: 'intoxicacao-ocupacional',
    quickView: {
      definicao: 'Intoxicação por exposição ao chumbo. Ocupações de risco: fundições, baterias, pinturas antigas, soldagem. Limite de exposição ocupacional: 30mcg/dL.',
      criteriosDiagnosticos: [
        'Chumbo sanguíneo >10mcg/dL (crianças) ou >25mcg/dL (adultos)',
        'Sintomas: dor abdominal, constipação, fadiga, cefaleia',
        'Linha gengival de Burton',
        'Pontilhado basofílico em hemácias'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Afastamento da exposição', 'Descontaminação do ambiente'],
        farmacologico: ['Quelação: EDTA cálcico, DMSA, D-penicilamina', 'Indicação: sintomáticos ou níveis muito elevados']
      },
      redFlags: ['Encefalopatia (chumbo >70mcg/dL)', 'Cólica saturnina', 'Nefropatia', 'Neuropatia periférica']
    },
    protocolos: [],
    medicamentos: ['edta-calcico', 'succimer', 'd-penicilamina'],
    calculadoras: [],
    citations: [{ refId: 'lead-poisoning-cdc-2021' }],
    lastUpdate: '2025-01',
    tags: ['ocupacional', 'toxicologia', 'neurologia', 'metal-pesado']
  },
  {
    id: 'intoxicacao-mercurio',
    titulo: 'Intoxicação por Mercúrio',
    sinonimos: ['Hidrargirismo', 'Mercurialismo'],
    doid: 'DOID:9885',
    snomedCT: '56968009',
    meshId: 'D008630',
    ciap2: ['A86'],
    cid10: ['T56.1'],
    categoria: 'outros',
    subcategoria: 'intoxicacao-ocupacional',
    quickView: {
      definicao: 'Intoxicação por mercúrio. Formas: elementar (termômetros, garimpo), inorgânica, orgânica (metilmercúrio). Ocupações: garimpo, odontologia, indústria.',
      criteriosDiagnosticos: [
        'Mercúrio urinário >20mcg/L ou sanguíneo >10mcg/L',
        'Tríade clássica: tremor, gengivite, eretismo (irritabilidade)',
        'História de exposição ocupacional ou ambiental'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Afastamento da fonte', 'Descontaminação'],
        farmacologico: ['Quelação: DMSA, DMPS', 'D-penicilamina para mercúrio inorgânico']
      },
      redFlags: ['Síndrome de Minamata (metilmercúrio)', 'Nefropatia', 'Ataxia cerebelar', 'Encefalopatia']
    },
    protocolos: [],
    medicamentos: ['succimer', 'd-penicilamina'],
    calculadoras: [],
    citations: [{ refId: 'mercury-poisoning-who' }],
    lastUpdate: '2025-01',
    tags: ['ocupacional', 'toxicologia', 'neurologia', 'metal-pesado']
  },
  {
    id: 'intoxicacao-solventes',
    titulo: 'Intoxicação por Solventes Orgânicos',
    sinonimos: ['Encefalopatia tóxica por solventes'],
    doid: 'DOID:0080016',
    snomedCT: '242833007',
    meshId: 'D020258',
    ciap2: ['A86'],
    cid10: ['T52', 'G92'],
    categoria: 'outros',
    subcategoria: 'intoxicacao-ocupacional',
    quickView: {
      definicao: 'Intoxicação por solventes (benzeno, tolueno, xileno, tricloroetileno). Efeitos: neurotoxicidade, hepatotoxicidade, carcinogenicidade (benzeno).',
      criteriosDiagnosticos: [
        'História de exposição ocupacional a solventes',
        'Sintomas neurológicos: cefaleia, tontura, confusão',
        'Biomarcadores: ácido trans,trans-mucônico (benzeno), ácido hipúrico (tolueno)',
        'Alterações hematológicas (benzeno)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Afastamento imediato', 'Suporte ventilatório se necessário', 'Monitoramento hematológico'],
        farmacologico: ['Tratamento sintomático', 'Não há antídoto específico']
      },
      redFlags: ['Pancitopenia (benzeno)', 'Leucemia (exposição crônica a benzeno)', 'Neuropatia periférica', 'Hepatotoxicidade']
    },
    protocolos: [],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'solvents-osha' }],
    lastUpdate: '2025-01',
    tags: ['ocupacional', 'toxicologia', 'hematologia', 'neurologia']
  },
  {
    id: 'pair',
    titulo: 'PAIR - Perda Auditiva Induzida pelo Ruído',
    sinonimos: ['Perda auditiva ocupacional', 'PAINPSE', 'Surdez ocupacional'],
    doid: 'DOID:0080017',
    snomedCT: '262567009',
    meshId: 'D006317',
    ciap2: ['H86'],
    cid10: ['H83.3'],
    categoria: 'outros',
    subcategoria: 'ocupacional-otologica',
    quickView: {
      definicao: 'Perda auditiva neurossensorial por exposição ocupacional a ruído >85dB. Irreversível e progressiva. Frequências mais afetadas: 3000-6000Hz (entalhe em 4000Hz).',
      criteriosDiagnosticos: [
        'Exposição ocupacional a ruído >85dB por >8h/dia',
        'Audiometria: perda neurossensorial bilateral simétrica',
        'Entalhe característico em 4000Hz',
        'Progressão relacionada ao tempo de exposição'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Afastamento da exposição', 'Proteção auditiva adequada', 'Aparelho auditivo se indicado'],
        farmacologico: ['Não há tratamento farmacológico efetivo']
      },
      redFlags: ['Perda auditiva assimétrica (investigar outras causas)', 'Zumbido incapacitante', 'Progressão rápida mesmo com proteção']
    },
    protocolos: [],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'pair-niosh-2018' }],
    lastUpdate: '2025-01',
    tags: ['ocupacional', 'otorrinolaringologia', 'audiologia', 'prevenivel']
  },

  // ==================== DOENÇAS GENÉTICAS ADICIONAIS ====================
  {
    id: 'osteogenese-imperfeita',
    titulo: 'Osteogênese Imperfeita',
    sinonimos: ['Doença dos ossos de vidro', 'OI'],
    doid: 'DOID:12347',
    snomedCT: '78314001',
    meshId: 'D010013',
    ciap2: ['L82'],
    cid10: ['Q78.0'],
    categoria: 'musculoesqueletico',
    subcategoria: 'colageno',
    quickView: {
      definicao: 'Displasia óssea por defeito no colágeno tipo I (genes COL1A1/COL1A2). Prevalência: 1:10.000-1:20.000. Tipos I-V com gravidade variável.',
      criteriosDiagnosticos: [
        'Fraturas recorrentes com trauma mínimo',
        'Escleras azuladas (tipos I, III, IV)',
        'Dentinogênese imperfeita',
        'Hiperfrouxidão ligamentar',
        'Teste genético: mutações em COL1A1/COL1A2'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia', 'Prevenção de quedas', 'Cirurgia ortopédica (hastes intramedulares)'],
        farmacologico: ['Bisfosfonatos (pamidronato IV em crianças)', 'Cálcio e vitamina D']
      },
      redFlags: ['Invaginação basilar', 'Estenose espinhal', 'Fraturas vertebrais', 'Comprometimento respiratório (formas graves)']
    },
    protocolos: [],
    medicamentos: ['pamidronato', 'acido-zoledronico', 'calcio', 'colecalciferol'],
    calculadoras: [],
    citations: [{ refId: 'oi-guidelines-2016' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'ortopedia', 'pediatria', 'colageno']
  },
  {
    id: 'sindrome-ehlers-danlos',
    titulo: 'Síndrome de Ehlers-Danlos',
    sinonimos: ['EDS', 'Cutis hyperelastica'],
    doid: 'DOID:13359',
    snomedCT: '398114001',
    meshId: 'D004535',
    ciap2: ['L82'],
    cid10: ['Q79.6'],
    categoria: 'musculoesqueletico',
    subcategoria: 'tecido-conjuntivo',
    quickView: {
      definicao: 'Grupo de doenças hereditárias do tecido conjuntivo. 13 subtipos. Prevalência: 1:5.000 (tipo hipermóvel). Caracterizada por hipermobilidade articular e fragilidade cutânea.',
      criteriosDiagnosticos: [
        'Critérios de Brighton para hipermobilidade (score de Beighton)',
        'Pele hiperextensível e frágil',
        'Cicatrização anormal (cicatrizes atróficas)',
        'Teste genético específico para cada subtipo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia para estabilização articular', 'Proteção cutânea', 'Evitar esportes de contato'],
        farmacologico: ['Analgésicos para dor crônica', 'Não há tratamento específico']
      },
      redFlags: ['EDS vascular (risco de ruptura arterial/intestinal)', 'Subluxações/luxações recorrentes', 'Prolapso de órgãos pélvicos']
    },
    protocolos: [],
    medicamentos: ['paracetamol', 'tramadol'],
    calculadoras: ['beighton-score'],
    citations: [{ refId: 'eds-criteria-2017' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'reumatologia', 'tecido-conjuntivo', 'hipermobilidade']
  },
  {
    id: 'porfiria-aguda-intermitente',
    titulo: 'Porfiria Aguda Intermitente',
    sinonimos: ['PAI', 'Porfiria sueca'],
    doid: 'DOID:3890',
    snomedCT: '39925001',
    meshId: 'D017118',
    ciap2: ['T99'],
    cid10: ['E80.2'],
    categoria: 'metabolico',
    subcategoria: 'porfiria',
    quickView: {
      definicao: 'Porfiria hepática mais comum. Deficiência de porfobilinogênio deaminase. Prevalência: 1:20.000. Crises desencadeadas por drogas, jejum, hormônios.',
      criteriosDiagnosticos: [
        'Crise: dor abdominal intensa, vômitos, constipação',
        'Urina escurecendo à luz (cor de vinho do porto)',
        'PBG e ALA urinários elevados durante crise',
        'Teste genético: mutação no gene HMBS'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar fatores desencadeantes', 'Lista de drogas seguras/inseguras', 'Dieta rica em carboidratos'],
        farmacologico: ['Heme arginato IV (crise)', 'Glicose IV (crises leves)', 'Givosiran (prevenção)']
      },
      redFlags: ['Neuropatia motora (pode levar a paralisia)', 'Hipertensão grave', 'Hiponatremia', 'Convulsões', 'Insuficiência respiratória']
    },
    protocolos: [],
    medicamentos: ['hemin', 'givosiran'],
    calculadoras: [],
    citations: [{ refId: 'porphyria-guidelines-2019' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'metabolismo', 'emergencia', 'dor-abdominal']
  },
  {
    id: 'deficiencia-alfa1-antitripsina',
    titulo: 'Deficiência de Alfa-1 Antitripsina',
    sinonimos: ['DAAT', 'Alpha-1'],
    doid: 'DOID:14244',
    snomedCT: '30188007',
    meshId: 'D019896',
    ciap2: ['R95'],
    cid10: ['E88.0'],
    categoria: 'respiratorio',
    subcategoria: 'genetica',
    quickView: {
      definicao: 'Doença genética com deficiência de AAT, inibidor de protease. Prevalência: 1:2.500-1:5.000 caucasianos. Afeta pulmões (enfisema) e fígado (cirrose).',
      criteriosDiagnosticos: [
        'Nível sérico de AAT <11mcmol/L (<57mg/dL)',
        'Fenótipo: Pi*ZZ (mais grave), Pi*SZ, Pi*MZ',
        'Enfisema panacinar basal precoce',
        'Hepatopatia (crianças ou adultos)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Cessação do tabagismo (fundamental)', 'Reabilitação pulmonar', 'Vacinação'],
        farmacologico: ['Terapia de reposição de AAT IV semanal', 'Broncodilatadores', 'Corticoides inalatórios']
      },
      redFlags: ['VEF1 <50% do predito', 'Exacerbações frequentes', 'Cirrose hepática', 'Carcinoma hepatocelular']
    },
    protocolos: [],
    medicamentos: ['alfa1-antitripsina-humana', 'tiotropio', 'budesonida'],
    calculadoras: [],
    citations: [{ refId: 'aatd-ers-ats-2017' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'pneumologia', 'hepatologia', 'enfisema']
  },
  {
    id: 'sindrome-angelman',
    titulo: 'Síndrome de Angelman',
    sinonimos: ['AS', 'Síndrome do boneco feliz'],
    doid: 'DOID:1932',
    snomedCT: '76880004',
    meshId: 'D017204',
    ciap2: ['P85'],
    cid10: ['Q93.5'],
    categoria: 'neurologico',
    subcategoria: 'imprinting',
    quickView: {
      definicao: 'Síndrome de imprinting genômico por perda da expressão materna do gene UBE3A (15q11-13). Incidência: 1:12.000-1:20.000.',
      criteriosDiagnosticos: [
        'Atraso do desenvolvimento motor e cognitivo grave',
        'Ausência ou mínimo de fala',
        'Ataxia e tremor',
        'Comportamento: risos frequentes, hiperatividade',
        'EEG característico',
        'Teste genético: metilação, deleção 15q, mutação UBE3A'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Estimulação precoce', 'Comunicação alternativa', 'Fisioterapia'],
        farmacologico: ['Antiepilépticos para crises (valproato, clobazam)']
      },
      redFlags: ['Crises epilépticas refratárias', 'Escoliose', 'Distúrbios do sono graves']
    },
    protocolos: [],
    medicamentos: ['valproato', 'clobazam', 'levetiracetam'],
    calculadoras: [],
    citations: [{ refId: 'angelman-guidelines-2020' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'neurologia', 'pediatria', 'imprinting']
  },
  {
    id: 'sindrome-prader-willi',
    titulo: 'Síndrome de Prader-Willi',
    sinonimos: ['PWS'],
    doid: 'DOID:11983',
    snomedCT: '89392001',
    meshId: 'D011218',
    ciap2: ['T83'],
    cid10: ['Q87.1'],
    categoria: 'endocrino',
    subcategoria: 'imprinting',
    quickView: {
      definicao: 'Síndrome de imprinting genômico por perda da expressão paterna em 15q11-13. Incidência: 1:10.000-1:30.000. Fases: hipotonia neonatal → hiperfagia na infância.',
      criteriosDiagnosticos: [
        'Hipotonia neonatal grave com dificuldade alimentar',
        'Hiperfagia após 2-4 anos, obesidade',
        'Baixa estatura, mãos e pés pequenos',
        'Hipogonadismo hipogonadotrófico',
        'Teste genético: metilação alterada em 15q11-13'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Controle alimentar rigoroso', 'Exercício físico regular', 'Terapia comportamental'],
        farmacologico: ['GH recombinante (melhora composição corporal)', 'TRH na puberdade']
      },
      redFlags: ['Obesidade mórbida', 'Diabetes tipo 2', 'Apneia obstrutiva do sono', 'Comportamentos compulsivos']
    },
    protocolos: [],
    medicamentos: ['somatropina'],
    calculadoras: [],
    citations: [{ refId: 'pws-guidelines-2021' }],
    lastUpdate: '2025-01',
    tags: ['genetica', 'endocrinologia', 'obesidade', 'imprinting']
  }
];

export default doencasGeneticasOcupacionais;
