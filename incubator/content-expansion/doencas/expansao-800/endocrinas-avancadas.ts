/**
 * DOENCAS ENDOCRINAS AVANCADAS - DARWIN-MFC EXPANSAO 800
 * ======================================================
 * Doencas endocrinas raras e complexas da hipofise, adrenal e paratireoide
 */

import { Doenca } from '@/lib/types/doenca';

export const endocrinasAvancadas: Doenca[] = [
  // ============================================================================
  // HIPOFISE - HIPERSECRECAO
  // ============================================================================
  {
    id: 'acromegalia',
    titulo: 'Acromegalia',
    sinonimos: ['Gigantismo (se pre-puberal)', 'Adenoma somatotrofico'],
    doid: 'DOID:0050631',
    snomedCT: '74107003',
    meshId: 'D000172',
    umlsCui: 'C0001206',
    ordo: ['ORPHA:963'],
    ciap2: ['T99'],
    cid10: ['E22.0'],
    cid11: ['5A61.0'],
    categoria: 'endocrino',
    subcategoria: 'hipofise',
    quickView: {
      definicao: 'Doenca causada por excesso cronico de GH, geralmente por adenoma hipofisario. Caracteriza-se por crescimento acral (maos, pes, face) e complicacoes metabolicas e cardiovasculares. Incidencia 3-4/milhao/ano.',
      criteriosDiagnosticos: [
        'IGF-1 elevado para idade e sexo (triagem)',
        'GH nao suprimido (<1 ng/mL) apos TOTG 75g (confirmatorio)',
        'RM de sela turcica: adenoma hipofisario em >95% dos casos',
        'Caracteristicas clinicas: aumento de maos, pes, prognatismo',
        'Excluir outras causas de elevacao de GH (raro)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cirurgia transesfenoidal: primeira linha para microadenomas e macroadenomas sem invasao',
          'Radioterapia: adjuvante se resseccao incompleta ou recidiva',
          'Monitoramento de complicacoes cardiovasculares e metabolicas',
          'Rastreamento de polipos colonicos (colonoscopia)'
        ],
        farmacologico: [
          'ANALOGOS SOMATOSTATINA: Octreotida LAR 10-30mg/mes ou Lanreotida 60-120mg/mes',
          'AGONISTA DOPAMINERGICO: Cabergolina 0,5-3,5mg/semana (tumores co-secretores)',
          'ANTAGONISTA GH: Pegvisomanto 10-30mg/dia SC (refratarios)',
          'Tratamento medicamentoso se cirurgia contraindicada ou incompleta'
        ]
      },
      metasTerapeuticas: [
        'IGF-1 normalizado para idade e sexo',
        'GH <1 ng/mL (randomico) ou <0,4 ng/mL pos-TOTG',
        'Controle tumoral (estabilizacao ou reducao)',
        'Melhora dos sintomas e comorbidades'
      ],
      examesIniciais: [
        'IGF-1 (triagem)',
        'GH basal e pos-TOTG 75g',
        'RM de sela turcica com gadolinio',
        'Campimetria visual',
        'Funcao hipofisaria completa (prolactina, TSH, ACTH, LH/FSH)',
        'Glicemia, HbA1c, perfil lipidico',
        'Ecocardiograma, ECG'
      ],
      redFlags: [
        'Cefaleia intensa + defeito visual (apoplexia hipofisaria)',
        'Compressao de quiasma optico (hemianopsia bitemporal)',
        'Insuficiencia cardiaca',
        'Apneia do sono grave',
        'Sindrome do tunel do carpo bilateral'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '40-130/milhao',
        incidencia: '3-4 casos/milhao/ano',
        mortalidade: '2-3x maior que populacao geral se nao tratada',
        faixaEtaria: 'Diagnostico tipico entre 40-50 anos (atraso de ~10 anos)',
        fatoresRisco: [
          'Adenoma hipofisario esporadico (>95%)',
          'Sindromes familiares raras: MEN1, Complexo de Carney, AIP mutations',
          'Tumores ectopicos secretores de GHRH (raro <1%)'
        ],
        citations: [{ refId: 'endocrine-society-acromegaly-2014' }]
      },
      fisiopatologia: {
        texto: 'Adenomas somatotroficos secretam GH autonomamente, estimulando producao hepatica de IGF-1. O excesso de GH/IGF-1 causa crescimento de tecidos moles, ossos e orgaos, alem de resistencia insulinica, dislipidemia e cardiomiopatia especifica.',
        citations: [{ refId: 'jcem-acromegaly-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Aumento de maos e pes (troca de anel, calcado)',
          'Alteracoes faciais (prognatismo, macroglossia, espacamento dentario)',
          'Cefaleia persistente',
          'Hiperhidrose, pele oleosa',
          'Fadiga, artralgia',
          'Disfuncao sexual, irregularidade menstrual'
        ],
        sinaisExameFisico: [
          'Facies acromegalica: prognatismo, arcos supraorbitarios proeminentes',
          'Macroglossia',
          'Maos em pa, dedos em salsicha',
          'Pele espessada, seborreica',
          'Visceromegalia (tireoide, coracao, figado)',
          'Sindrome do tunel do carpo'
        ],
        formasClinicas: [
          'Acromegalia (pos-puberal): crescimento acral',
          'Gigantismo (pre-puberal): crescimento linear excessivo',
          'Adenoma misto (GH + prolactina): galactorreia associada'
        ],
        citations: [{ refId: 'endocrine-society-acromegaly-2014' }]
      },
      diagnostico: {
        criterios: [
          'IGF-1 elevado ajustado para idade e sexo',
          'GH nao suprimido (<1 ng/mL) apos TOTG 75g',
          'RM demonstrando adenoma hipofisario'
        ],
        diagnosticoDiferencial: [
          'Pseudo-acromegalia (paquidermoperiostose)',
          'Hipotireoidismo grave',
          'Sindrome de McCune-Albright',
          'Secrecao ectopica de GHRH'
        ],
        examesLaboratoriais: [
          'IGF-1',
          'GH basal e pos-TOTG',
          'Prolactina, TSH, T4L, cortisol, LH, FSH, testosterona/estradiol',
          'Glicemia, HbA1c, TOTG',
          'Calcio, fosforo'
        ],
        examesImagem: [
          'RM de sela turcica com contraste (padrao-ouro)',
          'TC de torax/abdome se suspeita de tumor ectopico',
          'Ecocardiograma (cardiomiopatia)',
          'Colonoscopia (polipos)'
        ],
        citations: [{ refId: 'jcem-acromegaly-2020' }]
      },
      tratamento: {
        objetivos: [
          'Normalizar GH e IGF-1',
          'Controlar tumor',
          'Prevenir/tratar comorbidades',
          'Preservar funcao hipofisaria'
        ],
        naoFarmacologico: {
          medidas: [
            'Cirurgia transesfenoidal: cura em 80-90% dos microadenomas',
            'Radioterapia estereotaxica: adjuvante',
            'Tratamento de comorbidades (DM, HAS, apneia)',
            'Colonoscopia de rastreamento'
          ],
          citations: [{ refId: 'endocrine-society-acromegaly-2014' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Analogos de somatostatina', medicamentos: ['Octreotida LAR', 'Lanreotida Autogel'], posologia: 'Octreotida LAR 20-30mg IM a cada 28 dias', observacoes: 'Normaliza IGF-1 em 50-70%' }
          ],
          segundaLinha: [
            { classe: 'Antagonista do receptor de GH', medicamentos: ['Pegvisomanto'], posologia: '10-30mg SC diario', observacoes: 'Normaliza IGF-1 em >90%, nao reduz tumor' },
            { classe: 'Agonista dopaminergico', medicamentos: ['Cabergolina'], posologia: '0,5-3,5mg/semana', observacoes: 'Util em tumores mistos GH/PRL' }
          ],
          situacoesEspeciais: [
            { situacao: 'Macroadenoma invasivo', conduta: 'Tratamento medicamentoso primario ou neoadjuvante' },
            { situacao: 'Diabetes mellitus', conduta: 'Preferir pasireotida com cautela (piora glicemia) ou pegvisomanto' }
          ],
          citations: [{ refId: 'jcem-acromegaly-2020' }]
        },
        duracao: 'Tratamento cronico se nao houver cura cirurgica'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses ate controle, depois anual',
        examesControle: [
          'IGF-1 a cada 3-6 meses',
          'GH randomico',
          'RM de sela anual (se residuo tumoral)',
          'Funcao hipofisaria anual',
          'Glicemia, HbA1c, lipidios',
          'Ecocardiograma a cada 1-2 anos'
        ],
        metasTerapeuticas: [
          'IGF-1 normal para idade',
          'GH <1 ng/mL ou <0,4 ng/mL pos-TOTG',
          'Estabilidade tumoral'
        ],
        criteriosEncaminhamento: [
          'Todo caso: endocrinologista e neurocirurgiao',
          'Oftalmologista se compressao de quiasma',
          'Cardiologista se cardiomiopatia'
        ],
        citations: [{ refId: 'endocrine-society-acromegaly-2014' }]
      },
      prevencao: {
        primaria: ['Nao ha prevencao primaria conhecida'],
        secundaria: [
          'Diagnostico precoce (atencao aos sinais sutis)',
          'Rastreamento de familiares em sindromes geneticas'
        ],
        citations: [{ refId: 'jcem-acromegaly-2020' }]
      }
    },
    protocolos: ['acromegalia-manejo'],
    medicamentos: ['octreotida', 'lanreotida', 'pegvisomanto', 'cabergolina'],
    calculadoras: ['igf1-sds'],
    rastreamentos: [],
    citations: [{ refId: 'endocrine-society-acromegaly-2014' }, { refId: 'jcem-acromegaly-2020' }],
    lastUpdate: '2026-01',
    tags: ['acromegalia', 'gh', 'igf1', 'adenoma-hipofisario', 'somatostatina']
  },

  // ============================================================================
  // ADRENAL - HIPERCORTISOLISMO
  // ============================================================================
  {
    id: 'sindrome-cushing',
    titulo: 'Sindrome de Cushing',
    sinonimos: ['Hipercortisolismo', 'Doenca de Cushing (se ACTH-dependente hipofisario)'],
    doid: 'DOID:12252',
    snomedCT: '47270006',
    meshId: 'D003480',
    umlsCui: 'C0010481',
    ordo: ['ORPHA:553'],
    ciap2: ['T99'],
    cid10: ['E24', 'E24.0', 'E24.2', 'E24.9'],
    cid11: ['5A71'],
    categoria: 'endocrino',
    subcategoria: 'adrenal',
    quickView: {
      definicao: 'Sindrome causada por exposicao cronica a excesso de glicocorticoides. Pode ser endogena (ACTH-dependente ou independente) ou exogena (iatrogena). Incidencia 2-3/milhao/ano para formas endogenas.',
      criteriosDiagnosticos: [
        'TRIAGEM (2 de 3 testes positivos): Cortisol livre urinario 24h (>3x LSN), Cortisol salivar noturno (23h-24h) elevado, Teste de supressao com dexametasona 1mg overnight (cortisol >1,8 mcg/dL)',
        'Excluir uso de glicocorticoides exogenos (pseudo-Cushing)',
        'ACTH para diferenciar ACTH-dependente vs independente',
        'Cateterismo de seios petrosos se ACTH-dependente',
        'Imagem (RM hipofise, TC adrenais) conforme ACTH'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'CIRURGIA: Tratamento de escolha conforme etiologia',
          'Doenca de Cushing: cirurgia transesfenoidal',
          'Adenoma adrenal: adrenalectomia unilateral',
          'Carcinoma adrenal: adrenalectomia + quimioterapia',
          'Radioterapia hipofisaria: adjuvante se recidiva'
        ],
        farmacologico: [
          'INIBIDORES ESTEROIDOGENESE: Cetoconazol 400-1200mg/dia, Metirapona 500-6000mg/dia',
          'BLOQUEADOR RECEPTOR GC: Mifepristona 300-1200mg/dia',
          'MODULADOR HIPOFISARIO: Pasireotida 600-900mcg SC 2x/dia (Doenca de Cushing)',
          'Tratamento medicamentoso pre-operatorio ou em casos inoperaveis'
        ]
      },
      metasTerapeuticas: [
        'Normalizacao do cortisol (UFC, cortisol salivar)',
        'Remissao clinica (melhora dos sinais/sintomas)',
        'Controle de comorbidades (DM, HAS, osteoporose)',
        'Preservar funcao adrenal se possivel'
      ],
      examesIniciais: [
        'Cortisol livre urinario 24h (2-3 amostras)',
        'Cortisol salivar noturno (2 amostras)',
        'Teste supressao dexametasona 1mg',
        'ACTH plasmatico',
        'RM de hipofise ou TC de adrenais (conforme ACTH)',
        'Glicemia, HbA1c, potassio, densitometria ossea'
      ],
      redFlags: [
        'Hipercortisolismo grave (cortisol muito elevado)',
        'Hipocalemia grave',
        'Psicose por cortisol',
        'Infeccoes oportunistas',
        'Suspeita de carcinoma adrenal (tumor >4cm, crescimento rapido)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '39-79/milhao para formas endogenas',
        incidencia: '2-3 casos/milhao/ano (endogena)',
        mortalidade: '4-5x maior se nao tratada; normaliza com remissao',
        faixaEtaria: '20-50 anos; Doenca de Cushing mais comum em mulheres 3:1',
        fatoresRisco: [
          'Adenoma hipofisario (70% dos casos ACTH-dependentes)',
          'Adenoma adrenal (maioria dos ACTH-independentes)',
          'Uso cronico de corticoides (causa mais comum de Cushing exogeno)',
          'Sindromes geneticas: MEN1, Complexo de Carney'
        ],
        citations: [{ refId: 'endocrine-society-cushing-2015' }]
      },
      fisiopatologia: {
        texto: 'O excesso cronico de cortisol causa catabolismo proteico (miopatia, estrias), redistribuicao de gordura (central), resistencia insulinica, hipertensao, imunossupressao e perda ossea. Na Doenca de Cushing, adenoma corticotrofico produz ACTH em excesso; em tumores adrenais, a producao de cortisol e autonoma.',
        citations: [{ refId: 'nejm-cushing-2017' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Ganho de peso central (obesidade truncal)',
          'Face em lua cheia, gibosidade dorsocervical',
          'Fraqueza muscular proximal',
          'Estrias violaceas largas (>1cm)',
          'Hirsutismo, acne (mulheres)',
          'Labilidade emocional, depressao, insonia'
        ],
        sinaisExameFisico: [
          'Facies cushingoide',
          'Obesidade central com membros finos',
          'Pletora facial',
          'Estrias violaceas em abdome, coxas',
          'Fragilidade capilar, equimoses',
          'Hipertensao arterial',
          'Miopatia proximal (dificuldade levantar da cadeira)'
        ],
        formasClinicas: [
          'ACTH-dependente: Doenca de Cushing (adenoma hipofisario), Sindrome do ACTH ectopico',
          'ACTH-independente: Adenoma adrenal, Carcinoma adrenal, Hiperplasia adrenal bilateral',
          'Cushing exogeno (iatrogeno): uso de corticoides'
        ],
        citations: [{ refId: 'endocrine-society-cushing-2015' }]
      },
      diagnostico: {
        criterios: [
          '1) Confirmar hipercortisolismo: 2 de 3 testes positivos',
          '2) ACTH: <5 pg/mL = ACTH-independente; >20 pg/mL = ACTH-dependente',
          '3) Localizar fonte: RM hipofise, TC adrenais, cateterismo petroso'
        ],
        diagnosticoDiferencial: [
          'Pseudo-Cushing (alcoolismo, depressao grave, obesidade morbida)',
          'Sindrome metabolica',
          'Sindrome do ovario policistico',
          'Uso exogeno de corticoides (nao relatado)'
        ],
        examesLaboratoriais: [
          'UFC 24h (2-3 coletas)',
          'Cortisol salivar noturno',
          'Teste supressao dexa 1mg',
          'ACTH plasmatico matinal',
          'Teste de supressao com dose alta (8mg) se ACTH-dependente',
          'CRH test, cateterismo de seios petrosos'
        ],
        examesImagem: [
          'RM de hipofise com contraste (ACTH-dependente)',
          'TC de adrenais (ACTH-independente)',
          'TC torax/abdome se suspeita de ectopico',
          'PET-Ga68-DOTATATE para tumores neuroendocrinos'
        ],
        citations: [{ refId: 'nejm-cushing-2017' }]
      },
      tratamento: {
        objetivos: [
          'Remissao do hipercortisolismo',
          'Remover/controlar tumor',
          'Tratar comorbidades',
          'Prevenir insuficiencia adrenal pos-tratamento'
        ],
        naoFarmacologico: {
          medidas: [
            'Cirurgia transesfenoidal para Doenca de Cushing (remissao 65-90%)',
            'Adrenalectomia para tumores adrenais',
            'Radioterapia hipofisaria se recidiva',
            'Adrenalectomia bilateral se todas opcoes falharem'
          ],
          citations: [{ refId: 'endocrine-society-cushing-2015' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Inibidor esteroidogenese', medicamentos: ['Cetoconazol', 'Metirapona'], posologia: 'Cetoconazol 400-1200mg/dia dividido em 2-3 doses', observacoes: 'Monitorar hepatotoxicidade' }
          ],
          segundaLinha: [
            { classe: 'Analogo somatostatina', medicamentos: ['Pasireotida'], posologia: '600-900mcg SC 2x/dia', observacoes: 'Para Doenca de Cushing; causa hiperglicemia' },
            { classe: 'Antagonista receptor GC', medicamentos: ['Mifepristona'], posologia: '300-1200mg/dia VO', observacoes: 'Nao normaliza cortisol (bloqueia receptor)' }
          ],
          situacoesEspeciais: [
            { situacao: 'Pre-operatorio', conduta: 'Controle rapido com cetoconazol ou metirapona' },
            { situacao: 'Carcinoma adrenal', conduta: 'Mitotano + quimioterapia' }
          ],
          citations: [{ refId: 'nejm-cushing-2017' }]
        },
        duracao: 'Ate remissao cirurgica; cronico se inoperavel'
      },
      acompanhamento: {
        frequenciaConsultas: 'Frequente no primeiro ano pos-tratamento, depois anual',
        examesControle: [
          'Cortisol matinal, UFC',
          'ACTH (se ACTH-dependente)',
          'RM/TC conforme etiologia',
          'Glicemia, potassio, densitometria'
        ],
        metasTerapeuticas: [
          'Cortisol normal',
          'Resolucao dos sinais/sintomas',
          'Nao desenvolver insuficiencia adrenal'
        ],
        criteriosEncaminhamento: [
          'Todo caso: endocrinologista',
          'Neurocirurgiao ou cirurgiao adrenal conforme etiologia',
          'Oncologista se carcinoma'
        ],
        citations: [{ refId: 'endocrine-society-cushing-2015' }]
      },
      prevencao: {
        primaria: ['Uso racional de corticoides (evitar Cushing iatrogeno)'],
        secundaria: ['Diagnostico precoce para evitar complicacoes cronicas'],
        citations: [{ refId: 'nejm-cushing-2017' }]
      }
    },
    protocolos: ['cushing-diagnostico', 'cushing-tratamento'],
    medicamentos: ['cetoconazol', 'metirapona', 'pasireotida', 'mifepristona'],
    calculadoras: ['cortisol-urinario'],
    rastreamentos: [],
    citations: [{ refId: 'endocrine-society-cushing-2015' }, { refId: 'nejm-cushing-2017' }],
    lastUpdate: '2026-01',
    tags: ['cushing', 'hipercortisolismo', 'cortisol', 'acth', 'adenoma-hipofisario', 'adrenal']
  },

  // ============================================================================
  // ADRENAL - FEOCROMOCITOMA
  // ============================================================================
  {
    id: 'feocromocitoma',
    titulo: 'Feocromocitoma',
    sinonimos: ['Paraganglioma adrenal', 'Tumor cromafim'],
    doid: 'DOID:0050771',
    snomedCT: '302835009',
    meshId: 'D010673',
    umlsCui: 'C0031511',
    ordo: ['ORPHA:29072'],
    ciap2: ['T99'],
    cid10: ['D35.0', 'C74.1'],
    cid11: ['XH46S3'],
    categoria: 'endocrino',
    subcategoria: 'adrenal',
    quickView: {
      definicao: 'Tumor neuroendocrino raro produtor de catecolaminas, originado das celulas cromafins da medula adrenal. Paragangliomas sao tumores extra-adrenais do mesmo tipo celular. Causa classica de hipertensao secundaria.',
      criteriosDiagnosticos: [
        'Metanefrinas plasmaticas fracionadas elevadas (>2x LSN = altamente sugestivo)',
        'Metanefrinas urinarias 24h elevadas (alternativa)',
        'TC ou RM de abdome: massa adrenal hipervascular',
        'Cintilografia com MIBG-I123 ou PET-Ga68-DOTATATE para localizacao',
        'Teste genetico recomendado para todos (30-40% tem mutacao germinativa)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'CIRURGIA: Adrenalectomia laparoscopica (tumores <6cm, nao invasivos)',
          'Adrenalectomia aberta para tumores grandes ou suspeita de malignidade',
          'Preparo pre-operatorio obrigatorio com alfa-bloqueio',
          'Paragangliomas: resseccao cirurgica quando possivel'
        ],
        farmacologico: [
          'PRE-OPERATORIO: Fenoxibenzamina 10-20mg 2-3x/dia (titular ate controle)',
          'Alternativa: Doxazosina 2-16mg/dia',
          'ADICIONAR beta-bloqueador APOS alfa-bloqueio adequado',
          'Hidratacao e dieta rica em sal para expandir volemia',
          'Metirosina (se disponivel) em casos graves'
        ]
      },
      metasTerapeuticas: [
        'PA <130/80 mmHg sentado com leve hipotensao ortostatica',
        'FC 60-70 bpm',
        'Ausencia de extrassistoles ventriculares',
        'Resolucao dos sintomas'
      ],
      examesIniciais: [
        'Metanefrinas plasmaticas fracionadas (metanefrina + normetanefrina)',
        'Metanefrinas urinarias 24h (alternativa)',
        'Cromogranina A',
        'TC ou RM de abdome/pelve',
        'ECG, ecocardiograma',
        'Glicemia (hiperglicemia por catecolaminas)'
      ],
      redFlags: [
        'Crise hipertensiva (PA >250/150 mmHg)',
        'Arritmia grave, taquicardia ventricular',
        'Edema agudo de pulmao',
        'Cardiomiopatia por catecolaminas (Takotsubo-like)',
        'Manipulacao tumoral sem preparo (risco de crise)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,1-0,6% dos hipertensos',
        incidencia: '2-8 casos/milhao/ano',
        mortalidade: 'Baixa se tratado; alta se nao diagnosticado (crises)',
        faixaEtaria: '30-50 anos; formas hereditarias mais jovens',
        fatoresRisco: [
          'Sindromes hereditarias (30-40%): MEN2, VHL, NF1, SDH mutations',
          'Historia familiar de feocromocitoma/paraganglioma',
          'Mutacoes germinativas: SDHB, SDHD, SDHA, SDHC, RET, VHL, NF1, MAX, TMEM127'
        ],
        citations: [{ refId: 'endocrine-society-pheo-2014' }]
      },
      fisiopatologia: {
        texto: 'Tumores das celulas cromafins produzem e secretam catecolaminas (norepinefrina, epinefrina, dopamina) de forma episodica ou continua. O excesso de catecolaminas causa vasoconstriccao, hipertensao, taquicardia e hiperglicemia. Podem ser benignos ou malignos (10-15% metastaticos).',
        citations: [{ refId: 'lancet-pheochromocytoma-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'TRIADE CLASSICA: Cefaleia, sudorese profusa, palpitacoes',
          'Hipertensao (sustentada ou paroxistica)',
          'Palidez durante crises',
          'Ansiedade, sensacao de morte iminente',
          'Perda de peso',
          'Crises desencadeadas por: cirurgia, anestesia, exercicio, alimentos (tiramina)'
        ],
        sinaisExameFisico: [
          'Hipertensao (pode ser normal entre crises)',
          'Taquicardia, arritmias',
          'Palidez (vasoconstriccao)',
          'Tremor fino',
          'Hipotensao ortostatica (paradoxal)',
          'Retinopatia hipertensiva'
        ],
        formasClinicas: [
          'Esporadico (60-70%)',
          'Hereditario (30-40%): MEN2, VHL, NF1, SDH',
          'Maligno/metastatico (10-15%): definido por metastases',
          'Paraganglioma (extra-adrenal): cabeca/pescoco, torax, abdome'
        ],
        citations: [{ refId: 'endocrine-society-pheo-2014' }]
      },
      diagnostico: {
        criterios: [
          'Metanefrinas plasmaticas ou urinarias elevadas',
          'Imagem demonstrando tumor adrenal/extra-adrenal',
          'Confirmacao histopatologica pos-resseccao'
        ],
        diagnosticoDiferencial: [
          'Hipertensao essencial',
          'Ansiedade/panico',
          'Hipertireoidismo',
          'Uso de drogas simpatomiméticas',
          'Incidentaloma adrenal nao funcionante',
          'Carcinoma adrenal'
        ],
        examesLaboratoriais: [
          'Metanefrinas plasmaticas fracionadas (sensibilidade 96-100%)',
          'Metanefrinas urinarias 24h',
          'Catecolaminas urinarias 24h',
          'Cromogranina A',
          'Teste genetico (todos os pacientes)'
        ],
        examesImagem: [
          'TC de abdome com contraste (massa hipervascular)',
          'RM (T2 hiperintenso "light bulb sign")',
          'Cintilografia com MIBG-I123',
          'PET-Ga68-DOTATATE (paragangliomas, metastatico)',
          'PET-FDG (tumores agressivos)'
        ],
        citations: [{ refId: 'lancet-pheochromocytoma-2019' }]
      },
      tratamento: {
        objetivos: [
          'Resseccao cirurgica curativa',
          'Preparo pre-operatorio adequado',
          'Controle de sintomas',
          'Rastreamento genetico e familiar'
        ],
        naoFarmacologico: {
          medidas: [
            'Adrenalectomia laparoscopica (padrao para tumores ate 6cm)',
            'Cirurgia aberta se tumor grande, invasao ou malignidade',
            'Dieta rica em sal + hidratacao pre-operatoria',
            'Evitar manipulacao tumoral sem preparo'
          ],
          citations: [{ refId: 'endocrine-society-pheo-2014' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Alfa-bloqueador', medicamentos: ['Fenoxibenzamina', 'Doxazosina'], posologia: 'Fenoxibenzamina 10mg 2x/dia, titular ate PA controlada', observacoes: 'Iniciar 10-14 dias antes da cirurgia' }
          ],
          segundaLinha: [
            { classe: 'Beta-bloqueador', medicamentos: ['Propranolol', 'Atenolol'], posologia: 'Adicionar APOS alfa-bloqueio adequado', observacoes: 'NUNCA usar beta sem alfa (risco de crise)' },
            { classe: 'Bloqueador canais calcio', medicamentos: ['Amlodipina', 'Nicardipina'], posologia: 'Adjuvante se alfa-bloqueio insuficiente', observacoes: 'Alternativa ou adicao' }
          ],
          situacoesEspeciais: [
            { situacao: 'Crise hipertensiva', conduta: 'Fentolamina IV ou nitroprussiato' },
            { situacao: 'Metastatico/inoperavel', conduta: 'Terapia com MIBG-I131, quimioterapia (CVD), TKIs' }
          ],
          citations: [{ refId: 'lancet-pheochromocytoma-2019' }]
        },
        duracao: 'Pre-operatorio; indefinido se inoperavel'
      },
      acompanhamento: {
        frequenciaConsultas: 'Anual por toda vida (risco de recorrencia/segundo tumor)',
        examesControle: [
          'Metanefrinas plasmaticas anuais',
          'Imagem se sintomas recorrentes',
          'Rastreamento de familiares se mutacao identificada'
        ],
        metasTerapeuticas: [
          'Metanefrinas normais',
          'PA controlada',
          'Ausencia de recorrencia'
        ],
        criteriosEncaminhamento: [
          'Todo caso: endocrinologista',
          'Cirurgiao com experiencia em adrenal',
          'Geneticista para teste e aconselhamento'
        ],
        citations: [{ refId: 'endocrine-society-pheo-2014' }]
      },
      prevencao: {
        primaria: ['Rastreamento de portadores de mutacoes germinativas'],
        secundaria: ['Acompanhamento pos-operatorio por toda vida'],
        citations: [{ refId: 'lancet-pheochromocytoma-2019' }]
      }
    },
    protocolos: ['feocromocitoma-preparo', 'feocromocitoma-cirurgia'],
    medicamentos: ['fenoxibenzamina', 'doxazosina', 'propranolol'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'endocrine-society-pheo-2014' }, { refId: 'lancet-pheochromocytoma-2019' }],
    lastUpdate: '2026-01',
    tags: ['feocromocitoma', 'paraganglioma', 'catecolaminas', 'metanefrinas', 'hipertensao-secundaria', 'adrenal']
  },

  // ============================================================================
  // ADRENAL - HIPERALDOSTERONISMO
  // ============================================================================
  {
    id: 'hiperaldosteronismo-primario',
    titulo: 'Hiperaldosteronismo Primario',
    sinonimos: ['Sindrome de Conn', 'Aldosteronismo primario', 'PA'],
    doid: 'DOID:12316',
    snomedCT: '87350002',
    meshId: 'D006929',
    umlsCui: 'C0020352',
    ordo: ['ORPHA:235936'],
    ciap2: ['T99'],
    cid10: ['E26.0'],
    cid11: ['5A72.0'],
    categoria: 'endocrino',
    subcategoria: 'adrenal',
    quickView: {
      definicao: 'Producao excessiva e autonoma de aldosterona pelo cortex adrenal, causando hipertensao, hipocalemia e alcalose metabolica. Causa mais comum de hipertensao secundaria endocrina, presente em 5-10% dos hipertensos.',
      criteriosDiagnosticos: [
        'TRIAGEM: Relacao aldosterona/renina (ARR) elevada (>30 ng/dL por ng/mL/h)',
        'CONFIRMACAO: Teste de sobrecarga salina, teste de fludrocortisona ou teste de captopril',
        'SUBTIPO: TC de adrenais + cateterismo de veias adrenais (lateralizacao)',
        'Hipocalemia espontanea ou induzida por diuretico',
        'Hipertensao resistente (3+ drogas)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'ADENOMA UNILATERAL: Adrenalectomia laparoscopica (cura em 30-60%)',
          'Dieta hipossodica',
          'Correcao de hipocalemia antes de cirurgia'
        ],
        farmacologico: [
          'HIPERPLASIA BILATERAL ou cirurgia recusada/contraindicada:',
          'Espironolactona 25-100mg/dia (primeira linha)',
          'Eplerenona 50-200mg/dia (menos efeitos antiandrogenos)',
          'Amilorida 5-30mg/dia (se intolerancia a espironolactona)',
          'Adicionar outros anti-hipertensivos conforme necessario'
        ]
      },
      metasTerapeuticas: [
        'PA <130/80 mmHg',
        'Potassio normal sem suplementacao',
        'Reducao do risco cardiovascular'
      ],
      examesIniciais: [
        'Aldosterona plasmatica',
        'Atividade de renina plasmatica (ARP) ou renina direta',
        'Potassio serico',
        'TC de adrenais com cortes finos',
        'Teste confirmatorio (sobrecarga salina IV ou oral)'
      ],
      redFlags: [
        'Hipocalemia grave (<2,5 mEq/L)',
        'Arritmias (por hipocalemia)',
        'Paralisia hipocalemica',
        'Hipertensao maligna',
        'Massa adrenal >4cm (excluir carcinoma)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '5-10% dos hipertensos; 20% dos resistentes',
        incidencia: 'Subdiagnosticada',
        faixaEtaria: '30-60 anos',
        fatoresRisco: [
          'Hipertensao resistente',
          'Hipertensao + hipocalemia',
          'Incidentaloma adrenal',
          'Historia familiar de hipertensao precoce ou AVC jovem',
          'Formas familiares: FH tipo I-IV (raras)'
        ],
        citations: [{ refId: 'endocrine-society-pa-2016' }]
      },
      fisiopatologia: {
        texto: 'A aldosterona em excesso atua nos receptores mineralocorticoides do tubulo coletor, aumentando reabsorcao de sodio e excrecao de potassio e hidrogenio. Isso causa hipertensao por expansao volemica, hipocalemia e alcalose metabolica. A aldosterona tambem tem efeitos deletérios diretos no coracao (fibrose), vasos (disfuncao endotelial) e rins.',
        citations: [{ refId: 'jcem-aldosteronism-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Hipertensao arterial (geralmente moderada a grave)',
          'Muitos pacientes sao normocalemicos',
          'Fadiga, fraqueza muscular (se hipocalemia)',
          'Caimbras, parestesias',
          'Poliuria, polidipsia (diabetes insipidus nefrogeico leve)',
          'Cefaleia'
        ],
        sinaisExameFisico: [
          'Hipertensao arterial',
          'Geralmente sem sinais especificos',
          'Fraqueza muscular se hipocalemia grave',
          'Arritmias (ECG)'
        ],
        formasClinicas: [
          'Adenoma produtor de aldosterona (APA) - 35%',
          'Hiperplasia adrenal bilateral (HAB) - 60%',
          'Carcinoma adrenal (raro)',
          'Formas familiares (FH-I a FH-IV) - <5%'
        ],
        citations: [{ refId: 'endocrine-society-pa-2016' }]
      },
      diagnostico: {
        criterios: [
          'Triagem: ARR >30 (aldosterona em ng/dL, renina em ng/mL/h)',
          'Confirmacao: aldosterona nao suprimida apos sobrecarga salina',
          'Subtipo: TC adrenais + cateterismo de veias adrenais'
        ],
        diagnosticoDiferencial: [
          'Hipertensao essencial com renina baixa',
          'Sindrome de Liddle',
          'Excesso aparente de mineralocorticoide (AME)',
          'Sindrome de Cushing',
          'Estenose de arteria renal (hiperaldosteronismo secundario)',
          'Uso de alcacuz (acido glicirrizico)'
        ],
        examesLaboratoriais: [
          'Aldosterona plasmatica (colher pela manha, sentado)',
          'Renina plasmatica ou ARP',
          'Potassio serico (corrigir antes de dosar ARR)',
          'Teste de sobrecarga salina IV (2L SF 0,9% em 4h)',
          'Teste genetico se suspeita de forma familiar'
        ],
        examesImagem: [
          'TC de adrenais com cortes finos',
          'Cateterismo de veias adrenais (padrao-ouro para lateralizacao)',
          'Nao usar apenas TC para decidir cirurgia'
        ],
        citations: [{ refId: 'jcem-aldosteronism-2020' }]
      },
      tratamento: {
        objetivos: [
          'Normalizar PA e potassio',
          'Reduzir risco cardiovascular',
          'Curar (adenoma) ou controlar (hiperplasia)'
        ],
        naoFarmacologico: {
          medidas: [
            'Adrenalectomia laparoscopica para adenoma unilateral',
            'Dieta pobre em sodio',
            'Perda de peso se obeso'
          ],
          citations: [{ refId: 'endocrine-society-pa-2016' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antagonista mineralocorticoide', medicamentos: ['Espironolactona'], posologia: '25-100mg/dia', observacoes: 'Pode causar ginecomastia, mastalgia' },
            { classe: 'Antagonista mineralocorticoide seletivo', medicamentos: ['Eplerenona'], posologia: '50-200mg/dia', observacoes: 'Menos efeitos antiandrogenos' }
          ],
          segundaLinha: [
            { classe: 'Bloqueador ENaC', medicamentos: ['Amilorida'], posologia: '5-30mg/dia', observacoes: 'Se intolerancia a espironolactona' }
          ],
          situacoesEspeciais: [
            { situacao: 'Hiperplasia bilateral', conduta: 'Tratamento medicamentoso (espironolactona/eplerenona) e vida' },
            { situacao: 'Adenoma + alto risco cirurgico', conduta: 'Tratamento medicamentoso cronico' }
          ],
          citations: [{ refId: 'jcem-aldosteronism-2020' }]
        },
        duracao: 'Cronico para hiperplasia; pos-operatorio avaliar cura em adenoma'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3 meses ate estabilizar, depois anual',
        examesControle: [
          'PA, potassio',
          'Funcao renal (creatinina)',
          'ARR pos-cirurgia ou para ajuste de dose'
        ],
        metasTerapeuticas: [
          'PA <130/80 mmHg',
          'Potassio 4-5 mEq/L sem suplementacao'
        ],
        criteriosEncaminhamento: [
          'Todo caso confirmado: endocrinologista',
          'Candidato a cirurgia: cirurgiao adrenal',
          'Cateterismo de veias adrenais: radiologia intervencionista'
        ],
        citations: [{ refId: 'endocrine-society-pa-2016' }]
      },
      prevencao: {
        primaria: ['Nao ha prevencao primaria conhecida'],
        secundaria: ['Triagem em populacoes de risco (HAS resistente, hipocalemia)'],
        citations: [{ refId: 'jcem-aldosteronism-2020' }]
      }
    },
    protocolos: ['hiperaldosteronismo-diagnostico', 'hiperaldosteronismo-tratamento'],
    medicamentos: ['espironolactona', 'eplerenona', 'amilorida'],
    calculadoras: ['arr-calculator'],
    rastreamentos: [],
    citations: [{ refId: 'endocrine-society-pa-2016' }, { refId: 'jcem-aldosteronism-2020' }],
    lastUpdate: '2026-01',
    tags: ['hiperaldosteronismo', 'aldosterona', 'conn', 'hipertensao-secundaria', 'hipocalemia', 'adrenal']
  },

  // ============================================================================
  // ADRENAL - INSUFICIENCIA ADRENAL
  // ============================================================================
  {
    id: 'insuficiencia-adrenal-primaria',
    titulo: 'Insuficiencia Adrenal Primaria',
    sinonimos: ['Doenca de Addison', 'Insuficiencia adrenocortical primaria', 'Hipoadrenalismo'],
    doid: 'DOID:10763',
    snomedCT: '386584007',
    meshId: 'D000309',
    umlsCui: 'C0001403',
    ordo: ['ORPHA:85138'],
    ciap2: ['T99'],
    cid10: ['E27.1', 'E27.2'],
    cid11: ['5A74.0'],
    categoria: 'endocrino',
    subcategoria: 'adrenal',
    quickView: {
      definicao: 'Destruicao ou disfuncao do cortex adrenal resultando em deficiencia de glicocorticoides, mineralocorticoides e androgenios adrenais. Causa mais comum no mundo desenvolvido: adrenalite autoimune (70-90%).',
      criteriosDiagnosticos: [
        'Cortisol matinal <3 mcg/dL: altamente sugestivo',
        'Cortisol matinal 3-18 mcg/dL: fazer teste de estimulo com ACTH',
        'Teste do ACTH (cosintropina 250mcg): cortisol <18 mcg/dL = insuficiencia',
        'ACTH elevado (>2x LSN) confirma origem primaria',
        'Anticorpos anti-21-hidroxilase positivos (autoimune)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Educacao do paciente e familiares sobre crise adrenal',
          'Cartao/bracelete de identificacao medica',
          'Kit de emergencia com hidrocortisona injetavel',
          'Orientacao sobre aumento de dose em estresse/doenca'
        ],
        farmacologico: [
          'GLICOCORTICOIDE: Hidrocortisona 15-25mg/dia (dividido 2-3x)',
          'Alternativa: Prednisona 3-5mg/dia ou Prednisolona',
          'MINERALOCORTICOIDE: Fludrocortisona 0,05-0,2mg/dia',
          'DHEA 25-50mg/dia em mulheres (opcional, para bem-estar)',
          'CRISE ADRENAL: Hidrocortisona 100mg IV bolus + SF 0,9% em bolus'
        ]
      },
      metasTerapeuticas: [
        'Bem-estar clinico, energia normal',
        'PA normal sem hipotensao ortostatica',
        'Sodio e potassio normais',
        'ACTH nao excessivamente elevado (evitar subtratamento)',
        'Evitar sinais de excesso de glicocorticoide'
      ],
      examesIniciais: [
        'Cortisol matinal (8h)',
        'ACTH plasmatico',
        'Teste de estimulo com ACTH (cosintropina)',
        'Anticorpos anti-21-hidroxilase',
        'Sodio, potassio, glicemia',
        'Renina, aldosterona',
        'TC de adrenais (se autoimune negativo)'
      ],
      redFlags: [
        'CRISE ADRENAL: hipotensao grave, choque, confusao mental',
        'Hipoglicemia grave',
        'Hipercalemia',
        'Febre + vomitos + dor abdominal em paciente com Addison',
        'Nao aumento da dose em situacao de estresse'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '100-140/milhao',
        incidencia: '4-6 casos/milhao/ano',
        mortalidade: 'Crise adrenal: mortalidade 6% por episodio',
        faixaEtaria: 'Qualquer idade; pico 30-50 anos (autoimune)',
        fatoresRisco: [
          'Outras doencas autoimunes (DM1, Hashimoto, vitiligo)',
          'Historia familiar de autoimunidade',
          'Infeccoes (tuberculose, HIV, fungos)',
          'Hemorragia adrenal (sepse, anticoagulacao)',
          'Hiperplasia adrenal congenita',
          'Adrenoleucodistrofia (homens jovens)'
        ],
        citations: [{ refId: 'jcem-adrenal-insufficiency-2016' }]
      },
      fisiopatologia: {
        texto: 'A destruicao do cortex adrenal elimina a producao de cortisol (zona fasciculada), aldosterona (zona glomerulosa) e androgenios (zona reticular). A falta de cortisol causa fadiga, hipoglicemia e incapacidade de responder ao estresse. A deficiencia de aldosterona causa perda de sodio, retencao de potassio e hipotensao. O ACTH elevado estimula melanocitos (hiperpigmentacao).',
        citations: [{ refId: 'lancet-addison-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Fadiga cronica, fraqueza',
          'Perda de peso, anorexia',
          'Hipotensao, tontura ortostatica',
          'Nausea, vomitos, dor abdominal',
          'Desejo por sal (salt craving)',
          'Hiperpigmentacao (areas expostas, dobras, mucosas)'
        ],
        sinaisExameFisico: [
          'Hiperpigmentacao cutanea e mucosa (patognomonico da forma primaria)',
          'Hipotensao arterial, hipotensao ortostatica',
          'Desidratacao',
          'Ausencia de pelos axilares/pubianos (mulheres)',
          'Vitiligo, outras manifestacoes autoimunes'
        ],
        formasClinicas: [
          'Autoimune isolada',
          'Sindrome poliglandular autoimune tipo 1 (APECED)',
          'Sindrome poliglandular autoimune tipo 2 (Schmidt)',
          'Infecciosa (TB, HIV)',
          'Hemorragica (Waterhouse-Friderichsen)',
          'Infiltrativa (metastases, amiloidose)'
        ],
        citations: [{ refId: 'jcem-adrenal-insufficiency-2016' }]
      },
      diagnostico: {
        criterios: [
          'Cortisol matinal <3 mcg/dL ou pos-ACTH <18 mcg/dL',
          'ACTH elevado (>2x) confirma primaria',
          'Anti-21-OH positivo confirma etiologia autoimune'
        ],
        diagnosticoDiferencial: [
          'Insuficiencia adrenal secundaria (hipofisaria)',
          'Insuficiencia adrenal terciaria (hipotalamica/iatrogena)',
          'Sindrome da fadiga cronica',
          'Anorexia nervosa',
          'Hipotireoidismo',
          'Doencas cronicas consumptivas'
        ],
        examesLaboratoriais: [
          'Cortisol matinal (8h)',
          'ACTH plasmatico (colher junto)',
          'Teste de estimulo com ACTH 250mcg',
          'Anticorpos anti-21-hidroxilase',
          'Sodio, potassio (hipoNa, hiperK)',
          'Glicemia (hipoglicemia)',
          'Renina, aldosterona'
        ],
        examesImagem: [
          'TC de adrenais: atrofia (autoimune), aumento (infeccao, hemorragia)',
          'RM de hipofise (se ACTH baixo/normal - secundaria)'
        ],
        citations: [{ refId: 'lancet-addison-2021' }]
      },
      tratamento: {
        objetivos: [
          'Repor glicocorticoide e mineralocorticoide',
          'Prevenir crise adrenal',
          'Manter qualidade de vida',
          'Evitar sub ou supertratamento'
        ],
        naoFarmacologico: {
          medidas: [
            'Educacao intensiva sobre a doenca',
            'Cartao de identificacao (steroid card)',
            'Kit de emergencia (hidrocortisona IM/SC)',
            'Regras de aumento de dose: dobrar ou triplicar em doenca',
            'Orientar familiares e equipe de saude'
          ],
          citations: [{ refId: 'jcem-adrenal-insufficiency-2016' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Glicocorticoide', medicamentos: ['Hidrocortisona'], posologia: '15-25mg/dia dividido em 2-3 doses (maior pela manha)', observacoes: 'Mimetiza ritmo circadiano' },
            { classe: 'Mineralocorticoide', medicamentos: ['Fludrocortisona'], posologia: '0,05-0,2mg/dia em dose unica', observacoes: 'Ajustar por PA e potassio' }
          ],
          segundaLinha: [
            { classe: 'Glicocorticoide alternativo', medicamentos: ['Prednisona', 'Prednisolona'], posologia: 'Prednisona 3-5mg/dia', observacoes: 'Nao requer doses multiplas, mas menos fisiologico' }
          ],
          situacoesEspeciais: [
            { situacao: 'CRISE ADRENAL', conduta: 'Hidrocortisona 100mg IV bolus, depois 200mg/24h IV continuo + SF 0,9% 1L em 1h' },
            { situacao: 'Cirurgia eletiva', conduta: 'Hidrocortisona 50-100mg IV no dia, manter IV ate ingesta oral' },
            { situacao: 'Gestacao', conduta: 'Aumentar hidrocortisona no 3o trimestre; dose de estresse no parto' }
          ],
          citations: [{ refId: 'lancet-addison-2021' }]
        },
        duracao: 'Tratamento de reposicao por toda a vida'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; mais frequente se instavel',
        examesControle: [
          'Sodio, potassio',
          'Renina (alvo: limite superior do normal)',
          'ACTH (nao deve estar muito elevado)',
          'PA, peso',
          'Glicemia se em uso de glicocorticoide de longa acao'
        ],
        metasTerapeuticas: [
          'Bem-estar clinico',
          'PA normal, potassio normal',
          'Sem sinais de excesso de corticoide'
        ],
        criteriosEncaminhamento: [
          'Todo caso: endocrinologista',
          'Crise adrenal: emergencia',
          'Investigacao de sindrome poliglandular'
        ],
        citations: [{ refId: 'jcem-adrenal-insufficiency-2016' }]
      },
      prevencao: {
        primaria: ['Nao ha prevencao primaria conhecida'],
        secundaria: [
          'Educacao para prevencao de crise adrenal',
          'Rastreamento de outras autoimunidades'
        ],
        citations: [{ refId: 'lancet-addison-2021' }]
      }
    },
    protocolos: ['addison-manejo', 'crise-adrenal'],
    medicamentos: ['hidrocortisona', 'fludrocortisona', 'prednisona'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'jcem-adrenal-insufficiency-2016' }, { refId: 'lancet-addison-2021' }],
    lastUpdate: '2026-01',
    tags: ['addison', 'insuficiencia-adrenal', 'cortisol', 'crise-adrenal', 'autoimune', 'adrenal']
  },

  // ============================================================================
  // HIPOFISE - HIPOPITUITARISMO
  // ============================================================================
  {
    id: 'hipopituitarismo',
    titulo: 'Hipopituitarismo',
    sinonimos: ['Insuficiencia hipofisaria', 'Pan-hipopituitarismo', 'Deficiencia multipla de hormonios hipofisarios'],
    doid: 'DOID:9406',
    snomedCT: '74728003',
    meshId: 'D007018',
    umlsCui: 'C0020635',
    ordo: ['ORPHA:90695'],
    ciap2: ['T99'],
    cid10: ['E23.0'],
    cid11: ['5A60'],
    categoria: 'endocrino',
    subcategoria: 'hipofise',
    quickView: {
      definicao: 'Deficiencia de um ou mais hormonios hipofisarios (GH, ACTH, TSH, LH/FSH, prolactina) devido a lesao da hipofise ou hipotalamo. Pode ser parcial ou completo (pan-hipopituitarismo). Causas: adenomas, cirurgia, radioterapia, trauma, Sheehan.',
      criteriosDiagnosticos: [
        'Deficiencia hormonal confirmada por testes especificos:',
        'ACTH: cortisol basal <3 mcg/dL ou pos-ITT/glucagon <18 mcg/dL',
        'TSH: T4L baixo com TSH baixo/normal',
        'LH/FSH: gonadotrofinas baixas com esteroides sexuais baixos',
        'GH: resposta ao ITT ou GHRH+arginina <3 ng/mL',
        'RM de hipofise para identificar causa'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Tratamento da causa base (cirurgia de tumor, etc.)',
          'Educacao sobre reposicao hormonal',
          'Cartao de identificacao medica (se deficiencia de ACTH)'
        ],
        farmacologico: [
          'CORTISOL: Hidrocortisona 15-25mg/dia (prioridade!)',
          'TIREOIDE: Levotiroxina (iniciar APOS cortisol)',
          'GONADAL: Testosterona (H) ou E2+P (M)',
          'GH: Somatropina 0,2-0,5mg/dia SC (adultos selecionados)',
          'DDAVP se diabetes insipidus associado'
        ]
      },
      metasTerapeuticas: [
        'Bem-estar clinico',
        'Niveis hormonais em faixa alvo',
        'Manter fertilidade se desejado',
        'Prevenir complicacoes (crise adrenal, mixedema)'
      ],
      examesIniciais: [
        'Cortisol matinal + ACTH',
        'TSH + T4 livre',
        'LH, FSH, testosterona/estradiol',
        'IGF-1, GH (se suspeita de deficiencia)',
        'Prolactina',
        'Sodio, osmolaridade (diabetes insipidus)',
        'RM de sela turcica'
      ],
      redFlags: [
        'Crise adrenal (deficiencia de ACTH nao tratada)',
        'Apoplexia hipofisaria (cefaleia subita + deficit visual)',
        'Hipotiroidismo grave (mixedema)',
        'Iniciar levotiroxina antes de cortisol (precipita crise)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '300-455/milhao',
        incidencia: '12-42 casos/milhao/ano',
        mortalidade: 'Aumentada, especialmente por doenca cardiovascular',
        faixaEtaria: 'Qualquer idade; adultos mais comum',
        fatoresRisco: [
          'Adenoma hipofisario e seu tratamento (cirurgia, radio)',
          'Craniofaringioma',
          'Traumatismo craniano',
          'Sindrome de Sheehan (hemorragia pos-parto)',
          'Hipofisite (autoimune, induzida por checkpoint inhibitors)',
          'Radioterapia craniana',
          'Doencas infiltrativas (sarcoidose, histiocitose)'
        ],
        citations: [{ refId: 'jcem-hypopituitarism-2016' }]
      },
      fisiopatologia: {
        texto: 'Lesao da hipofise anterior causa deficiencia de um ou mais hormonios troficos. A ordem tipica de perda: GH > LH/FSH > TSH > ACTH > prolactina. A deficiencia secundaria de orgaos-alvo (adrenais, tireoide, gonadas) resulta em sintomas correspondentes. Lesoes do talo hipofisario causam diabetes insipidus.',
        citations: [{ refId: 'lancet-hypopituitarism-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'ACTH: fadiga, hipotensao, hipoglicemia',
          'TSH: sintomas de hipotiroidismo',
          'LH/FSH: amenorreia, disfuncao eretil, infertilidade',
          'GH: fadiga, reducao massa muscular, aumento gordura abdominal',
          'ADH: poliuria, polidipsia (se diabetes insipidus)'
        ],
        sinaisExameFisico: [
          'Pele fina, palida (nao hiperpigmentada como Addison)',
          'Perda de pelos corporais',
          'Atrofia testicular, ginecomastia',
          'Amenorreia, hipotrofia mamaria',
          'Hipotensao',
          'Defeito de campo visual (compressao quiasmatica)'
        ],
        formasClinicas: [
          'Deficiencia isolada (ex: deficiencia de GH isolada)',
          'Deficiencia combinada',
          'Pan-hipopituitarismo (todas as linhagens)',
          'Com diabetes insipidus (lesao posterior/talo)'
        ],
        citations: [{ refId: 'jcem-hypopituitarism-2016' }]
      },
      diagnostico: {
        criterios: [
          'Demonstrar deficiencia hormonal por testes bioquimicos',
          'Identificar causa por imagem e historia'
        ],
        diagnosticoDiferencial: [
          'Insuficiencia de orgao-alvo primaria',
          'Doencas cronicas (baixa hormonal funcional)',
          'Uso de medicamentos (corticoides, opioides)',
          'Anorexia nervosa (amenorreia hipotalamica)'
        ],
        examesLaboratoriais: [
          'Cortisol matinal + ACTH',
          'TSH + T4L',
          'LH, FSH, estradiol/testosterona',
          'IGF-1, teste de estimulo para GH',
          'Prolactina',
          'Teste de privacao hidrica (diabetes insipidus)'
        ],
        examesImagem: [
          'RM de sela turcica com gadolinio',
          'Campimetria visual (lesoes grandes)'
        ],
        citations: [{ refId: 'lancet-hypopituitarism-2019' }]
      },
      tratamento: {
        objetivos: [
          'Repor hormonios deficientes',
          'Tratar causa base',
          'Manter qualidade de vida e prevenir complicacoes'
        ],
        naoFarmacologico: {
          medidas: [
            'Cirurgia de tumor se indicado',
            'Educacao sobre dose de estresse',
            'Identificacao medica'
          ],
          citations: [{ refId: 'jcem-hypopituitarism-2016' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Glicocorticoide', medicamentos: ['Hidrocortisona'], posologia: '15-25mg/dia', observacoes: 'SEMPRE iniciar antes de levotiroxina' },
            { classe: 'Hormonio tireoidiano', medicamentos: ['Levotiroxina'], posologia: '1,6 mcg/kg/dia', observacoes: 'Monitorar por T4L (nao TSH)' },
            { classe: 'Gonadotrofinas/esteroides', medicamentos: ['Testosterona', 'Estradiol + progesterona'], posologia: 'Conforme sexo e meta de fertilidade', observacoes: 'Gonadotrofinas se desejo de fertilidade' }
          ],
          segundaLinha: [
            { classe: 'Hormonio de crescimento', medicamentos: ['Somatropina'], posologia: '0,2-0,5mg/dia SC', observacoes: 'Criterios especificos para adultos' },
            { classe: 'ADH sintetico', medicamentos: ['Desmopressina (DDAVP)'], posologia: '10-40mcg intranasal ou 0,1-0,4mg VO', observacoes: 'Se diabetes insipidus central' }
          ],
          situacoesEspeciais: [
            { situacao: 'Desejo de fertilidade', conduta: 'Gonadotrofinas (FSH+LH) ao inves de esteroides' },
            { situacao: 'Gestacao', conduta: 'Ajustar doses; aumentar hidrocortisona no parto' }
          ],
          citations: [{ refId: 'lancet-hypopituitarism-2019' }]
        },
        duracao: 'Reposicao hormonal por toda a vida'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses inicialmente, depois anual',
        examesControle: [
          'T4L (nao usar TSH)',
          'Cortisol clinico (nao usar laboratorio de rotina)',
          'Testosterona/estradiol',
          'IGF-1 se em uso de GH',
          'RM periodica se tumor'
        ],
        metasTerapeuticas: [
          'Bem-estar clinico',
          'Hormonios em faixa fisiologica',
          'Estabilidade de residuo tumoral'
        ],
        criteriosEncaminhamento: [
          'Todo caso: endocrinologista',
          'Neurocirurgiao se tumor',
          'Especialista em reproducao se infertilidade'
        ],
        citations: [{ refId: 'jcem-hypopituitarism-2016' }]
      },
      prevencao: {
        primaria: ['Minimizar dano hipofisario em cirurgias e radioterapia'],
        secundaria: ['Rastreamento pos-trauma craniano, pos-radioterapia'],
        citations: [{ refId: 'lancet-hypopituitarism-2019' }]
      }
    },
    protocolos: ['hipopituitarismo-avaliacao', 'hipopituitarismo-reposicao'],
    medicamentos: ['hidrocortisona', 'levotiroxina', 'testosterona', 'somatropina', 'desmopressina'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'jcem-hypopituitarism-2016' }, { refId: 'lancet-hypopituitarism-2019' }],
    lastUpdate: '2026-01',
    tags: ['hipopituitarismo', 'insuficiencia-hipofisaria', 'acth', 'tsh', 'gh', 'hipofise']
  },

  // ============================================================================
  // PARATIREOIDE - HIPERPARATIREOIDISMO
  // ============================================================================
  {
    id: 'hiperparatireoidismo-primario',
    titulo: 'Hiperparatireoidismo Primario',
    sinonimos: ['HPTP', 'Adenoma de paratireoide'],
    doid: 'DOID:11202',
    snomedCT: '66999008',
    meshId: 'D049950',
    umlsCui: 'C0221002',
    ordo: ['ORPHA:99879'],
    ciap2: ['T99'],
    cid10: ['E21.0'],
    cid11: ['5A50.0'],
    categoria: 'endocrino',
    subcategoria: 'paratireoide',
    quickView: {
      definicao: 'Producao excessiva e autonoma de PTH por uma ou mais glandulas paratireoides, causando hipercalcemia. Terceira endocrinopatia mais comum. Causa: adenoma unico (85%), hiperplasia (15%), carcinoma (<1%).',
      criteriosDiagnosticos: [
        'Calcio serico elevado (total corrigido ou ionizado)',
        'PTH elevado ou inapropriadamente normal',
        'Calcio urinario normal ou elevado (excluir HHF)',
        'Fosforo normal ou baixo',
        '25-OH vitamina D: avaliar (deficiencia comum)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'CIRURGIA (paratireoidectomia): unico tratamento curativo',
          'Indicacoes: sintomatico, calcio >1mg/dL acima LSN, idade <50 anos, DFG <60, osteoporose, nefrolitiase',
          'Hidratacao adequada (evitar desidratacao)',
          'Evitar tiazidicos e litio'
        ],
        farmacologico: [
          'Se cirurgia recusada/contraindicada:',
          'CALCIMIMETICO: Cinacalcete 30-90mg 2x/dia (reduz calcio e PTH)',
          'BISFOSFONATO: Alendronato, Zoledronato (protecao ossea, nao reduz calcio muito)',
          'Vitamina D se deficiente (com cautela)',
          'HIPERCALCEMIA GRAVE: SF 0,9% IV + furosemida + bisfosfonato IV'
        ]
      },
      metasTerapeuticas: [
        'Calcio normal (pos-cirurgia) ou <11 mg/dL (tratamento conservador)',
        'Prevenir nefrolitiase e perda ossea',
        'Manter funcao renal'
      ],
      examesIniciais: [
        'Calcio total e albumina (ou calcio ionizado)',
        'PTH intacto',
        'Fosforo, magnesio',
        '25-OH vitamina D',
        'Creatinina, calcio urinario 24h',
        'Densitometria ossea (3 sitios)',
        'US renal (nefrolitiase)'
      ],
      redFlags: [
        'Hipercalcemia grave (>14 mg/dL): emergencia',
        'Alteracao do nivel de consciencia',
        'Arritmia, QT curto',
        'Desidratacao + insuficiencia renal',
        'Suspeita de carcinoma (calcio muito alto, massa palpavel)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-7/1000 adultos',
        incidencia: '25-30 casos/100.000/ano',
        faixaEtaria: 'Mais comum em mulheres pos-menopausa (50-60 anos)',
        fatoresRisco: [
          'Sexo feminino, pos-menopausa',
          'Radioterapia cervical previa',
          'Uso cronico de litio',
          'Sindromes geneticas: MEN1, MEN2A, HPT-JT'
        ],
        citations: [{ refId: 'aace-hyperparathyroidism-2022' }]
      },
      fisiopatologia: {
        texto: 'O adenoma (ou hiperplasia) de paratireoide secreta PTH de forma autonoma, independente do feedback do calcio. O PTH elevado aumenta reabsorcao ossea (liberando calcio), aumenta reabsorcao renal de calcio, aumenta excrecao de fosforo e estimula producao de 1,25-OH vitamina D (aumentando absorcao intestinal de calcio).',
        citations: [{ refId: 'nejm-hyperparathyroidism-2018' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Maioria assintomatica (descoberta incidental)',
          '"Bones, stones, groans, moans": dor ossea, nefrolitiase, dor abdominal, alteracoes neuropsiquiatricas',
          'Fadiga, fraqueza',
          'Depressao, dificuldade de concentracao',
          'Constipacao, nausea',
          'Poliuria, polidipsia'
        ],
        sinaisExameFisico: [
          'Geralmente exame fisico normal',
          'Massa cervical palpavel (raro, sugere carcinoma)',
          'Deformidades osseas (doenca avancada, raro atualmente)',
          'Fraqueza muscular proximal'
        ],
        formasClinicas: [
          'Assintomatico (maioria atual)',
          'Sintomatico classico (bones, stones, groans)',
          'Normocalcemico (PTH alto, calcio normal repetido)',
          'Crise hipercalcemica (rara, emergencia)'
        ],
        citations: [{ refId: 'aace-hyperparathyroidism-2022' }]
      },
      diagnostico: {
        criterios: [
          'Hipercalcemia + PTH elevado ou inapropriadamente normal',
          'Excluir hipercalcemia hipocalciurica familiar (calcio/creatinina clearance ratio <0,01)'
        ],
        diagnosticoDiferencial: [
          'Hipercalcemia por malignidade (PTHrP)',
          'Hipercalcemia hipocalciurica familiar (HHF)',
          'Intoxicacao por vitamina D',
          'Sarcoidose e outras granulomatoses',
          'Tiazidicos, litio',
          'Imobilizacao prolongada'
        ],
        examesLaboratoriais: [
          'Calcio total corrigido ou ionizado',
          'PTH intacto',
          'Fosforo (baixo ou normal-baixo)',
          '25-OH vitamina D',
          'Calcio urinario 24h e creatinina',
          'Calcular CCCR (calcium creatinine clearance ratio)'
        ],
        examesImagem: [
          'US de paratireoides (localizacao pre-op)',
          'Cintilografia com sestamibi',
          'TC 4D de paratireoide (alta resolucao)',
          'Densitometria ossea (3 sitios)',
          'US/TC renal (nefrolitiase)'
        ],
        citations: [{ refId: 'nejm-hyperparathyroidism-2018' }]
      },
      tratamento: {
        objetivos: [
          'Curar (cirurgia) ou controlar hipercalcemia',
          'Prevenir complicacoes osseas e renais',
          'Manter qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Paratireoidectomia: curativa em >95%',
            'Indicacoes cirurgicas bem definidas (Guidelines 2014/2022)',
            'Hidratacao (evitar desidratacao)',
            'Atividade fisica (protege osso)'
          ],
          citations: [{ refId: 'aace-hyperparathyroidism-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Calcimimetico', medicamentos: ['Cinacalcete'], posologia: '30mg 2x/dia, titular ate 90mg 2x/dia', observacoes: 'Reduz calcio e PTH; nao protege osso' }
          ],
          segundaLinha: [
            { classe: 'Bisfosfonato', medicamentos: ['Alendronato', 'Zoledronato'], posologia: 'Alendronato 70mg/semana', observacoes: 'Protege osso; efeito menor no calcio' }
          ],
          situacoesEspeciais: [
            { situacao: 'Hipercalcemia grave (>14 mg/dL)', conduta: 'SF 0,9% 3-4L/24h + furosemida apos hidratacao + zoledronato 4mg IV' },
            { situacao: 'Crise hipercalcemica', conduta: 'UTI, hidratacao agressiva, bisfosfonato, calcitonina, considerar dialise' }
          ],
          citations: [{ refId: 'nejm-hyperparathyroidism-2018' }]
        },
        duracao: 'Definitivo pos-cirurgia; cronico se conservador'
      },
      acompanhamento: {
        frequenciaConsultas: 'Anual se nao operado; pos-op: seguimento de calcio',
        examesControle: [
          'Calcio, PTH (anual)',
          'Creatinina, calcio urinario',
          'Densitometria ossea a cada 1-2 anos',
          'US renal periodico'
        ],
        metasTerapeuticas: [
          'Calcio normal (cura cirurgica)',
          'Ou calcio estavel <11 mg/dL (conservador)',
          'Massa ossea estavel'
        ],
        criteriosEncaminhamento: [
          'Todo caso: endocrinologista',
          'Cirurgiao de cabeca e pescoco experiente se indicacao cirurgica',
          'Geneticista se suspeita de sindrome hereditaria'
        ],
        citations: [{ refId: 'aace-hyperparathyroidism-2022' }]
      },
      prevencao: {
        primaria: ['Nao ha prevencao primaria conhecida'],
        secundaria: ['Rastreamento de familiares em sindromes geneticas'],
        citations: [{ refId: 'nejm-hyperparathyroidism-2018' }]
      }
    },
    protocolos: ['hiperparatireoidismo-avaliacao', 'hipercalcemia-manejo'],
    medicamentos: ['cinacalcete', 'alendronato', 'zoledronato'],
    calculadoras: ['calcio-corrigido', 'cccr'],
    rastreamentos: [],
    citations: [{ refId: 'aace-hyperparathyroidism-2022' }, { refId: 'nejm-hyperparathyroidism-2018' }],
    lastUpdate: '2026-01',
    tags: ['hiperparatireoidismo', 'hipercalcemia', 'pth', 'adenoma-paratireoide', 'paratireoide']
  },

  // ============================================================================
  // HIPOFISE - SIADH
  // ============================================================================
  {
    id: 'siadh',
    titulo: 'Sindrome de Secrecao Inadequada de ADH',
    sinonimos: ['SIADH', 'SIHAD', 'Sindrome de Schwartz-Bartter'],
    doid: 'DOID:11199',
    snomedCT: '27610001',
    meshId: 'D007177',
    umlsCui: 'C0021141',
    ciap2: ['T99'],
    cid10: ['E22.2'],
    cid11: ['5A60.2'],
    categoria: 'endocrino',
    subcategoria: 'hipofise',
    quickView: {
      definicao: 'Liberacao excessiva e inapropriada de ADH (vasopressina) causando retencao de agua livre, hiponatremia dilucional e hipoosmolaridade. Causa mais comum de hiponatremia euvolémica em pacientes hospitalizados.',
      criteriosDiagnosticos: [
        'CRITERIOS ESSENCIAIS (Bartter & Schwartz):',
        'Osmolaridade plasmatica <275 mOsm/kg',
        'Osmolaridade urinaria >100 mOsm/kg (urina inapropriadamente concentrada)',
        'Sodio urinario >40 mEq/L (em ingesta normal de sal)',
        'Euvolemia clinica (sem edema, sem desidratacao)',
        'Funcao tireoidiana e adrenal normais',
        'Sem uso de diureticos recente'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'TRATAR CAUSA BASE (fundamental!)',
          'Restricao hidrica: 800-1000 mL/dia (primeira linha)',
          'Aumento da ingesta de sal + proteina (aumenta carga de solutos)',
          'Suspender medicamentos causadores se possivel'
        ],
        farmacologico: [
          'HIPONATREMIA GRAVE (<120 mEq/L) ou SINTOMATICA:',
          'NaCl 3% IV: aumentar Na 1-2 mEq/L/h nas primeiras 2-3h (max 10-12 mEq/L/24h)',
          'CRONICA REFRATARIA:',
          'Tolvaptano 15-60mg/dia (vaptano - antagonista V2)',
          'Ureia 30-60g/dia VO (alternativa)',
          'Demeclociclina 600-1200mg/dia (menos usada)',
          'Furosemida + NaCl oral (gerar balanco negativo de agua)'
        ]
      },
      metasTerapeuticas: [
        'Correcao gradual do sodio (max 8-10 mEq/L/24h)',
        'Evitar mielinolise pontina (correcao muito rapida)',
        'Sodio >125-130 mEq/L para assintomaticos',
        'Resolver causa base'
      ],
      examesIniciais: [
        'Sodio serico',
        'Osmolaridade plasmatica',
        'Osmolaridade urinaria',
        'Sodio urinario',
        'Funcao renal, glicemia',
        'TSH, T4L (excluir hipotireoidismo)',
        'Cortisol matinal ou teste ACTH (excluir insuficiencia adrenal)',
        'Acido urico (tipicamente baixo na SIADH)'
      ],
      redFlags: [
        'Hiponatremia grave (<120 mEq/L)',
        'Sintomas neurologicos: confusao, convulsoes, coma',
        'Correcao muito rapida do sodio (risco de mielinolise)',
        'Nao identificacao da causa base',
        'SIADH paraneoplasica (ca pulmao pequenas celulas)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Causa mais comum de hiponatremia em hospitalizados',
        incidencia: 'Variavel conforme populacao',
        faixaEtaria: 'Qualquer idade; mais comum em idosos',
        fatoresRisco: [
          'Neoplasias (especialmente ca pulmao pequenas celulas)',
          'Doencas pulmonares (pneumonia, tuberculose)',
          'Doencas do SNC (meningite, AVC, trauma)',
          'Medicamentos: ISRS, carbamazepina, ciclofosfamida, opioides, desmopressina',
          'Pos-operatorio, dor, nausea'
        ],
        citations: [{ refId: 'ejim-siadh-2019' }]
      },
      fisiopatologia: {
        texto: 'O ADH e secretado de forma autonoma ou em resposta a estimulos nao osmoticos. A retencao de agua livre dilui o sodio plasmatico. A expansao volemica moderada suprime aldosterona e ANP, aumentando excrecao renal de sodio. O paciente permanece clinicamente euvolemico, mas hiponatremico.',
        citations: [{ refId: 'nejm-hyponatremia-2015' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Muitos pacientes sao assintomaticos (hiponatremia leve)',
          'Nausea, vomitos',
          'Cefaleia',
          'Confusao, desorientacao',
          'Convulsoes (hiponatremia grave)',
          'Coma (hiponatremia grave)'
        ],
        sinaisExameFisico: [
          'Euvolemia (sem edema, sem sinais de desidratacao)',
          'Alteracao do nivel de consciencia (se grave)',
          'Reflexos diminuidos',
          'Sinais da doenca de base (pneumonia, tumor, etc.)'
        ],
        formasClinicas: [
          'SIADH paraneoplasica (ca pulmao, etc.)',
          'SIADH por drogas',
          'SIADH por doenca do SNC',
          'SIADH por doenca pulmonar',
          'SIADH idiopatica'
        ],
        citations: [{ refId: 'ejim-siadh-2019' }]
      },
      diagnostico: {
        criterios: [
          'Hiponatremia hipotonica (<275 mOsm/kg)',
          'Urina inapropriadamente concentrada (>100 mOsm/kg)',
          'Natriurese (>40 mEq/L)',
          'Euvolemia clinica',
          'Exclusao de hipotireoidismo e insuficiencia adrenal'
        ],
        diagnosticoDiferencial: [
          'Hiponatremia hipovolemica (desidratacao)',
          'Hiponatremia hipervolemica (ICC, cirrose)',
          'Insuficiencia adrenal (pode mimetizar)',
          'Hipotireoidismo grave',
          'Sindrome cerebral perdedora de sal',
          'Polidipsia primaria'
        ],
        examesLaboratoriais: [
          'Sodio serico, osmolaridade plasmatica',
          'Osmolaridade urinaria, sodio urinario',
          'Creatinina, ureia, acido urico',
          'TSH, T4L',
          'Cortisol matinal ou teste ACTH'
        ],
        examesImagem: [
          'TC/RM de torax (buscar neoplasia pulmonar)',
          'TC/RM de cranio se doenca do SNC',
          'Conforme suspeita clinica'
        ],
        citations: [{ refId: 'nejm-hyponatremia-2015' }]
      },
      tratamento: {
        objetivos: [
          'Corrigir hiponatremia de forma segura',
          'Tratar causa base',
          'Prevenir mielinolise osmotica'
        ],
        naoFarmacologico: {
          medidas: [
            'Restricao hidrica 800-1000 mL/dia',
            'Tratar doenca de base',
            'Suspender medicamentos causadores',
            'Monitorar sodio a cada 4-6h inicialmente'
          ],
          citations: [{ refId: 'ejim-siadh-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Solucao salina hipertonica', medicamentos: ['NaCl 3%'], posologia: '100-150 mL em bolus se sintomatico grave; depois infusao lenta', observacoes: 'Max 10-12 mEq/L/24h de correcao' }
          ],
          segundaLinha: [
            { classe: 'Vaptano (antagonista V2)', medicamentos: ['Tolvaptano'], posologia: '15mg/dia, titular ate 60mg/dia', observacoes: 'Iniciar em hospital; monitorar Na de perto' },
            { classe: 'Agente osmotico', medicamentos: ['Ureia'], posologia: '30-60g/dia VO', observacoes: 'Alternativa eficaz, barata' }
          ],
          situacoesEspeciais: [
            { situacao: 'Hiponatremia grave sintomatica', conduta: 'NaCl 3% 100mL bolus, repetir se necessario; meta: aumentar Na 4-6 mEq/L em 6h' },
            { situacao: 'Correcao excessiva', conduta: 'Desmopressina 2-4mcg IV + agua livre para "rebaixar" sodio' }
          ],
          citations: [{ refId: 'nejm-hyponatremia-2015' }]
        },
        duracao: 'Ate resolver causa; cronico se SIADH persistente'
      },
      acompanhamento: {
        frequenciaConsultas: 'Sodio monitorado de perto ate estabilizar; depois conforme causa',
        examesControle: [
          'Sodio serico frequente (a cada 4-6h se corrigindo ativamente)',
          'Osmolaridade se necessario',
          'Funcao hepatica se em uso de tolvaptano'
        ],
        metasTerapeuticas: [
          'Sodio >130 mEq/L',
          'Assintomatico',
          'Correcao <10-12 mEq/L/24h'
        ],
        criteriosEncaminhamento: [
          'Endocrinologista se etiologia incerta ou refratario',
          'Oncologista se paraneoplasica',
          'Neurologista se doenca do SNC'
        ],
        citations: [{ refId: 'ejim-siadh-2019' }]
      },
      prevencao: {
        primaria: ['Uso cauteloso de medicamentos causadores'],
        secundaria: ['Monitorar sodio em pacientes de risco'],
        citations: [{ refId: 'nejm-hyponatremia-2015' }]
      }
    },
    protocolos: ['siadh-diagnostico', 'hiponatremia-manejo'],
    medicamentos: ['tolvaptano', 'ureia', 'nacl-3'],
    calculadoras: ['correcao-sodio', 'deficit-sodio'],
    rastreamentos: [],
    citations: [{ refId: 'ejim-siadh-2019' }, { refId: 'nejm-hyponatremia-2015' }],
    lastUpdate: '2026-01',
    tags: ['siadh', 'hiponatremia', 'adh', 'vasopressina', 'osmolaridade']
  },

  // ============================================================================
  // HIPOFISE - DIABETES INSIPIDUS
  // ============================================================================
  {
    id: 'diabetes-insipidus',
    titulo: 'Diabetes Insipidus',
    sinonimos: ['DI', 'Diabetes insipidus central', 'Diabetes insipidus nefrogenico'],
    doid: 'DOID:9409',
    snomedCT: '15771004',
    meshId: 'D003919',
    umlsCui: 'C0011848',
    ordo: ['ORPHA:178029'],
    ciap2: ['T99'],
    cid10: ['E23.2', 'N25.1'],
    cid11: ['5A60.1', 'GB90.4'],
    categoria: 'endocrino',
    subcategoria: 'hipofise',
    quickView: {
      definicao: 'Disturbio caracterizado por poliuria hipotonica (>3L/dia) e polidipsia devido a deficiencia de ADH (central) ou resistencia renal ao ADH (nefrogenico). Nao relacionado ao diabetes mellitus.',
      criteriosDiagnosticos: [
        'Poliuria (>3L/24h ou >50 mL/kg/24h)',
        'Osmolaridade urinaria <300 mOsm/kg (urina diluida)',
        'Osmolaridade plasmatica >295 mOsm/kg ou sodio >145 mEq/L',
        'Teste de privacao hidrica: urina permanece diluida',
        'Resposta a desmopressina diferencia central (responde) de nefrogenico (nao responde)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Acesso livre a agua (fundamental!)',
          'Tratar causa base (tumor, cirurgia, etc.)',
          'DI nefrogenico: dieta hipossodica e pobre em proteinas',
          'Evitar medicamentos nefrotoxicos'
        ],
        farmacologico: [
          'DI CENTRAL: Desmopressina (DDAVP)',
          'Intranasal: 10-40 mcg 1-2x/dia',
          'Oral: 0,1-0,4 mg 2-3x/dia',
          'Subcutaneo: 1-4 mcg/dia',
          'DI NEFROGENICO: Tiazidico (paradoxal) + amilorida',
          'Indometacina ou outros AINEs (adjuvante)',
          'Restricao proteica e sodica'
        ]
      },
      metasTerapeuticas: [
        'Controle da poliuria e polidipsia',
        'Sodio e osmolaridade normais',
        'Qualidade de vida adequada',
        'Evitar hiponatremia por excesso de desmopressina'
      ],
      examesIniciais: [
        'Volume urinario 24h',
        'Osmolaridade urinaria',
        'Osmolaridade plasmatica',
        'Sodio, potassio, calcio',
        'Glicemia (excluir DM)',
        'Funcao renal',
        'Teste de privacao hidrica (se diagnostico incerto)',
        'RM de hipofise (DI central)'
      ],
      redFlags: [
        'Hipernatremia grave (>160 mEq/L)',
        'Alteracao de consciencia',
        'Desidratacao grave',
        'Incapacidade de beber (criancas, idosos, acamados)',
        'DI pos-cirurgia hipofisaria (pode ser transitorio ou trifasico)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:25.000 para formas hereditarias',
        incidencia: 'Variavel; DI central mais comum que nefrogenico',
        faixaEtaria: 'Qualquer idade',
        fatoresRisco: [
          'DI Central: cirurgia hipofisaria, trauma, tumores, meningite, genetico',
          'DI Nefrogenico: litio, hipercalcemia, hipocalemia, doenca renal, genetico (AVPR2, AQP2)'
        ],
        citations: [{ refId: 'jcem-diabetes-insipidus-2019' }]
      },
      fisiopatologia: {
        texto: 'DI Central: deficiencia de producao/secrecao de ADH pelo hipotalamo/neuro-hipofise. DI Nefrogenico: os rins nao respondem ao ADH (mutacao de AVPR2 ou AQP2, ou adquirido por litio/hipercalcemia). Em ambos, a incapacidade de concentrar urina causa poliuria e, se a ingesta de agua for insuficiente, hipernatremia.',
        citations: [{ refId: 'nature-reviews-di-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Poliuria (3-20L/dia)',
          'Polidipsia intensa, preferencia por agua gelada',
          'Nocturia frequente',
          'Desidratacao se acesso a agua limitado',
          'Irritabilidade, letargia (se hipernatremico)'
        ],
        sinaisExameFisico: [
          'Sinais de desidratacao (se nao compensado)',
          'Mucosas secas, turgor diminuido',
          'Geralmente normal se acesso livre a agua',
          'Sinais da doenca de base (tumor, etc.)'
        ],
        formasClinicas: [
          'DI Central completo ou parcial',
          'DI Nefrogenico completo ou parcial',
          'DI gestacional (degradacao de ADH pela vasopressinase placentaria)',
          'Polidipsia primaria (diagnostico diferencial)'
        ],
        citations: [{ refId: 'jcem-diabetes-insipidus-2019' }]
      },
      diagnostico: {
        criterios: [
          'Poliuria + urina diluida + plasma concentrado',
          'Teste de privacao hidrica confirma incapacidade de concentrar',
          'Resposta a desmopressina distingue central de nefrogenico'
        ],
        diagnosticoDiferencial: [
          'Polidipsia primaria (psicogenica)',
          'Diabetes mellitus (poliuria osmotica)',
          'Diureticos',
          'Hipercalcemia',
          'Doenca renal cronica'
        ],
        examesLaboratoriais: [
          'Osmolaridade plasmatica e urinaria',
          'Sodio serico',
          'Glicemia, calcio, potassio',
          'Funcao renal',
          'Copeptina (marcador de ADH, se disponivel)',
          'Teste de privacao hidrica com desmopressina'
        ],
        examesImagem: [
          'RM de hipofise/hipotalamo (DI central): perda do bright spot posterior',
          'US renal (DI nefrogenico)'
        ],
        citations: [{ refId: 'nature-reviews-di-2019' }]
      },
      tratamento: {
        objetivos: [
          'Controlar poliuria e sede',
          'Manter hidratacao e eletrolitos normais',
          'Tratar causa base se possivel'
        ],
        naoFarmacologico: {
          medidas: [
            'Acesso livre a agua (essencial)',
            'Tratamento de tumor se presente',
            'Suspender litio se possivel (DI nefrogenico)',
            'Dieta pobre em sodio e proteinas (nefrogenico)'
          ],
          citations: [{ refId: 'jcem-diabetes-insipidus-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Analogo de ADH', medicamentos: ['Desmopressina (DDAVP)'], posologia: '10-40mcg intranasal 1-2x/dia ou 0,1-0,4mg VO 2-3x/dia', observacoes: 'DI Central; titular para controle de sintomas' }
          ],
          segundaLinha: [
            { classe: 'Tiazidico', medicamentos: ['Hidroclorotiazida'], posologia: '25-50mg/dia', observacoes: 'Paradoxalmente reduz poliuria no DI nefrogenico' },
            { classe: 'Bloqueador ENaC', medicamentos: ['Amilorida'], posologia: '5-20mg/dia', observacoes: 'Associar a tiazidico no DI nefrogenico por litio' },
            { classe: 'AINE', medicamentos: ['Indometacina'], posologia: '25-50mg 2-3x/dia', observacoes: 'Adjuvante no DI nefrogenico' }
          ],
          situacoesEspeciais: [
            { situacao: 'DI pos-cirurgia hipofisaria', conduta: 'Pode ser transitorio; monitorar Na; desmopressina conforme necessario' },
            { situacao: 'DI gestacional', conduta: 'Desmopressina segura na gestacao' },
            { situacao: 'Hipernatremia aguda', conduta: 'Reposicao de agua livre; correcao lenta (max 10-12 mEq/L/24h)' }
          ],
          citations: [{ refId: 'nature-reviews-di-2019' }]
        },
        duracao: 'Cronico se permanente; pode ser transitorio pos-cirurgia'
      },
      acompanhamento: {
        frequenciaConsultas: 'Frequente inicialmente; depois a cada 6-12 meses',
        examesControle: [
          'Sodio serico',
          'Volume urinario',
          'Osmolaridade se necessario'
        ],
        metasTerapeuticas: [
          'Sodio 135-145 mEq/L',
          'Poliuria controlada (<3L/dia)',
          'Qualidade de vida preservada'
        ],
        criteriosEncaminhamento: [
          'Endocrinologista para todos os casos',
          'Neurocirurgiao se tumor hipofisario',
          'Nefrologista se DI nefrogenico complexo'
        ],
        citations: [{ refId: 'jcem-diabetes-insipidus-2019' }]
      },
      prevencao: {
        primaria: ['Evitar litio se possivel; monitorar funcao renal'],
        secundaria: ['Diagnostico precoce para evitar desidratacao'],
        citations: [{ refId: 'nature-reviews-di-2019' }]
      }
    },
    protocolos: ['diabetes-insipidus-diagnostico', 'diabetes-insipidus-tratamento'],
    medicamentos: ['desmopressina', 'hidroclorotiazida', 'amilorida', 'indometacina'],
    calculadoras: ['deficit-agua-livre'],
    rastreamentos: [],
    citations: [{ refId: 'jcem-diabetes-insipidus-2019' }, { refId: 'nature-reviews-di-2019' }],
    lastUpdate: '2026-01',
    tags: ['diabetes-insipidus', 'poliuria', 'desmopressina', 'adh', 'vasopressina', 'hipernatremia']
  },

  // ============================================================================
  // SINDROME POLIGLANDULAR AUTOIMUNE
  // ============================================================================
  {
    id: 'sindrome-poliglandular-autoimune',
    titulo: 'Sindrome Poliglandular Autoimune',
    sinonimos: ['APS', 'SPA', 'Sindrome de Schmidt (tipo 2)', 'APECED (tipo 1)', 'Poliendocrinopatia autoimune'],
    doid: 'DOID:612',
    snomedCT: '36670009',
    meshId: 'D016884',
    umlsCui: 'C0085859',
    ordo: ['ORPHA:282196'],
    ciap2: ['T99'],
    cid10: ['E31.0'],
    cid11: ['5A40'],
    categoria: 'endocrino',
    subcategoria: 'poliglandular',
    quickView: {
      definicao: 'Grupo de sindromes caracterizadas por insuficiencia de multiplas glandulas endocrinas de origem autoimune. Tipo 1 (APECED): rara, pediatrica, mutacao AIRE. Tipo 2 (Schmidt): mais comum, adultos, associada a HLA.',
      criteriosDiagnosticos: [
        'APS TIPO 1 (APECED): 2 de 3 componentes maiores:',
        '- Candidiase mucocutanea cronica',
        '- Hipoparatireoidismo',
        '- Insuficiencia adrenal primaria',
        'APS TIPO 2 (Schmidt): Insuficiencia adrenal + pelo menos 1:',
        '- Doenca tireoidiana autoimune (Hashimoto ou Graves)',
        '- Diabetes mellitus tipo 1',
        'Outros componentes: vitiligo, anemia perniciosa, alopecia, hipogonadismo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Rastreamento ativo de novas manifestacoes autoimunes',
          'Educacao do paciente e familia',
          'Aconselhamento genetico (APS-1)',
          'Suporte psicologico'
        ],
        farmacologico: [
          'TRATAR CADA COMPONENTE INDIVIDUALMENTE:',
          'Insuficiencia adrenal: Hidrocortisona + Fludrocortisona',
          'Hipotireoidismo: Levotiroxina',
          'Hipoparatireoidismo: Calcio + Vitamina D ativa',
          'DM1: Insulinoterapia',
          'Candidiase: Antifungicos (fluconazol)',
          'ATENCAO: priorizar reposicao de cortisol antes de levotiroxina'
        ]
      },
      metasTerapeuticas: [
        'Controle adequado de cada componente endocrino',
        'Deteccao precoce de novos componentes',
        'Prevencao de crises (adrenal, hipocalcemica)',
        'Qualidade de vida preservada'
      ],
      examesIniciais: [
        'Cortisol matinal + ACTH, anticorpos anti-21-OH',
        'TSH, T4L, anti-TPO',
        'Glicemia, HbA1c, anti-GAD, anti-IA2',
        'Calcio, fosforo, PTH',
        'Hemograma, vitamina B12, anticorpos anti-celula parietal',
        'Teste genetico para AIRE (APS-1)',
        'Tipagem HLA (APS-2)'
      ],
      redFlags: [
        'Crise adrenal (hipotensao, choque)',
        'Hipocalcemia grave (tetania, convulsoes)',
        'Cetoacidose diabetica',
        'Candidiase disseminada ou esofagica',
        'Nao reconhecimento de novo componente'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'APS-1: 1:100.000 (mais comum em finlandeses, sardos, judeus iranianos); APS-2: 1,4-4,5/100.000',
        incidencia: 'APS-2 mais comum que APS-1',
        faixaEtaria: 'APS-1: infancia; APS-2: adultos jovens (20-40 anos)',
        fatoresRisco: [
          'APS-1: Mutacao AIRE (autossomica recessiva)',
          'APS-2: Associacao HLA (DR3, DR4), historia familiar',
          'Outras doencas autoimunes pessoais ou familiares'
        ],
        citations: [{ refId: 'jcem-aps-2018' }]
      },
      fisiopatologia: {
        texto: 'APS-1: mutacao no gene AIRE (regulador autoimune) causa falha na tolerancia central timica, levando a autoimunidade multipla. APS-2: poligenia complexa associada a HLA classe II; perda de tolerancia periferica. Autoanticorpos atacam multiplos orgaos endocrinos.',
        citations: [{ refId: 'nejm-apeced-2018' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'APS-1: Candidiase oral/ungueal recorrente (primeira manifestacao)',
          'APS-1: Hipoparatireoidismo (tetania, parestesias)',
          'APS-1/2: Insuficiencia adrenal (fadiga, hiperpigmentacao, hipotensao)',
          'APS-2: Hipotireoidismo ou hipertireoidismo',
          'DM1: poliuria, polidipsia, perda de peso',
          'Outras: vitiligo, alopecia, anemia'
        ],
        sinaisExameFisico: [
          'Candidiase oral/ungueal (APS-1)',
          'Hiperpigmentacao (Addison)',
          'Vitiligo, alopecia areata',
          'Sinais de Chvostek e Trousseau (hipocalcemia)',
          'Bocio ou tireoide atrofica'
        ],
        formasClinicas: [
          'APS Tipo 1 (APECED): infancia, AIRE mutation, candidiase + hipoparatireoidismo + Addison',
          'APS Tipo 2 (Schmidt): adultos, Addison + tireoide e/ou DM1',
          'APS Tipo 3: tireoide autoimune + outra autoimunidade (exceto Addison)',
          'APS Tipo 4: combinacoes que nao se enquadram nos tipos 1-3'
        ],
        citations: [{ refId: 'jcem-aps-2018' }]
      },
      diagnostico: {
        criterios: [
          'APS-1: 2 de 3 componentes maiores, ou 1 componente + mutacao AIRE, ou 1 componente + irmao afetado',
          'APS-2: Addison + tireoide autoimune e/ou DM1'
        ],
        diagnosticoDiferencial: [
          'Doencas endocrinas isoladas',
          'Outras imunodeficiencias',
          'Doencas autoimunes nao endocrinas',
          'Sindrome IPEX (ligada ao X)'
        ],
        examesLaboratoriais: [
          'Autoanticorpos especificos de cada orgao',
          'Anti-21-hidroxilase (adrenal)',
          'Anti-TPO, anti-Tg (tireoide)',
          'Anti-GAD, anti-IA2, anti-insulina (DM1)',
          'Anti-IFN-omega, anti-IL-17/22 (APS-1)',
          'Teste genetico AIRE (APS-1)'
        ],
        examesImagem: [
          'TC de adrenais se suspeita de Addison',
          'US de tireoide'
        ],
        citations: [{ refId: 'nejm-apeced-2018' }]
      },
      tratamento: {
        objetivos: [
          'Repor hormonios deficientes',
          'Rastrear novos componentes ao longo da vida',
          'Prevenir crises agudas',
          'Tratar manifestacoes nao endocrinas'
        ],
        naoFarmacologico: {
          medidas: [
            'Educacao intensiva sobre cada componente',
            'Cartao de identificacao medica',
            'Aconselhamento genetico (APS-1)',
            'Rastreamento anual de novos componentes'
          ],
          citations: [{ refId: 'jcem-aps-2018' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Glicocorticoide', medicamentos: ['Hidrocortisona'], posologia: '15-25mg/dia', observacoes: 'Prioridade se Addison presente' },
            { classe: 'Mineralocorticoide', medicamentos: ['Fludrocortisona'], posologia: '0,05-0,2mg/dia', observacoes: 'Se Addison' },
            { classe: 'Hormonio tireoidiano', medicamentos: ['Levotiroxina'], posologia: '1,6mcg/kg/dia', observacoes: 'APOS iniciar cortisol se Addison coexiste' },
            { classe: 'Calcio/Vitamina D', medicamentos: ['Calcio', 'Calcitriol'], posologia: 'Calcio 1-3g/dia + Calcitriol 0,25-2mcg/dia', observacoes: 'Se hipoparatireoidismo' }
          ],
          segundaLinha: [
            { classe: 'Antifungico', medicamentos: ['Fluconazol'], posologia: '100-200mg/dia ou intermitente', observacoes: 'Para candidiase cronica (APS-1)' }
          ],
          situacoesEspeciais: [
            { situacao: 'Crise adrenal', conduta: 'Hidrocortisona 100mg IV bolus + SF 0,9%' },
            { situacao: 'Hipocalcemia aguda', conduta: 'Gluconato de calcio 10% IV' },
            { situacao: 'Nova manifestacao', conduta: 'Iniciar tratamento especifico e ajustar outros' }
          ],
          citations: [{ refId: 'nejm-apeced-2018' }]
        },
        duracao: 'Tratamento de reposicao por toda a vida'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; rastreamento anual de novos componentes',
        examesControle: [
          'Funcao de cada eixo hormonal afetado',
          'Rastreamento de autoanticorpos periodico',
          'Hemograma, B12 (anemia perniciosa)',
          'Funcao renal, hepatica'
        ],
        metasTerapeuticas: [
          'Controle adequado de cada componente',
          'Deteccao precoce de novos componentes',
          'Ausencia de crises'
        ],
        criteriosEncaminhamento: [
          'Endocrinologista para todos',
          'Geneticista (APS-1)',
          'Especialistas conforme componentes (diabetologista, etc.)'
        ],
        citations: [{ refId: 'jcem-aps-2018' }]
      },
      prevencao: {
        primaria: ['Aconselhamento genetico para familias afetadas'],
        secundaria: [
          'Rastreamento de familiares em risco',
          'Vigilancia de novos componentes ao longo da vida'
        ],
        citations: [{ refId: 'nejm-apeced-2018' }]
      }
    },
    protocolos: ['aps-rastreamento', 'aps-manejo'],
    medicamentos: ['hidrocortisona', 'fludrocortisona', 'levotiroxina', 'calcitriol', 'fluconazol'],
    calculadoras: [],
    rastreamentos: ['rastreamento-autoimunidade'],
    citations: [{ refId: 'jcem-aps-2018' }, { refId: 'nejm-apeced-2018' }],
    lastUpdate: '2026-01',
    tags: ['aps', 'poliglandular', 'autoimune', 'apeced', 'schmidt', 'addison', 'hipotireoidismo', 'dm1']
  }
];
