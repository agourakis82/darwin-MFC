/**
 * DERMATOLOGIA NOVOS - DARWIN-MFC EXPANSAO 1000
 * ==============================================
 * Medicamentos dermatologicos avancados: biologicos, retinoides,
 * inibidores de calcineurina, sulfonas e tratamentos para alopecia
 *
 * Referencias:
 * - FDA Prescribing Information
 * - EMA Summary of Product Characteristics
 * - AAD Guidelines for Atopic Dermatitis
 * - AAD-NPF Guidelines for Psoriasis
 * - PharmGKB Pharmacogenomics Database
 * - DrugBank Database
 */

import { Medicamento } from '@/lib/types/medicamento';

export const dermatologiaNovos: Partial<Medicamento>[] = [
  // ============================================================================
  // BIOLOGICOS PARA DERMATITE ATOPICA
  // ============================================================================
  {
    id: 'dupilumab',
    nomeGenerico: 'Dupilumabe',
    nomesComerciais: ['Dupixent'],
    atcCode: 'D11AH05',
    rxNormCui: '1876366',
    drugBankId: 'DB12159',
    snomedCT: '775691000',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_il4_il13',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '200mg/1,14ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '300mg/2ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Dermatite atopica moderada a grave em adultos e criancas >=6 meses',
      'Asma eosinofilica moderada a grave',
      'Rinossinusite cronica com polipose nasal',
      'Esofagite eosinofilica',
      'Prurigo nodular'
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG4 totalmente humano que se liga a subunidade alfa do receptor de IL-4 (IL-4Ralfa), bloqueando sinalizacao de IL-4 E IL-13. Estas citocinas Th2 sao centrais na patogenese da dermatite atopica: promovem inflamacao tipo 2, disfuncao de barreira epidermica e prurido. Bloqueio dual resulta em reducao rapida do prurido e melhora da inflamacao cutanea.',
    posologias: [
      {
        indicacao: 'Dermatite atopica adultos',
        adultos: { dose: '600mg dose de ataque (2x300mg), depois 300mg', frequencia: 'SC a cada 2 semanas', observacoes: 'Resposta clinica rapida, especialmente no prurido' }
      },
      {
        indicacao: 'Dermatite atopica pediatrica (6-17 anos)',
        pediatrico: { dose: '15-30kg: 300mg ataque, 300mg a cada 4sem; 30-60kg: 400mg ataque, 200mg a cada 2sem; >60kg: 600mg ataque, 300mg a cada 2sem', frequencia: 'Ver dose por peso', idadeMinima: '6 anos' }
      },
      {
        indicacao: 'Dermatite atopica pediatrica (6 meses a 5 anos)',
        pediatrico: { dose: '5-15kg: 200mg ataque, 200mg a cada 4sem; 15-30kg: 300mg ataque, 300mg a cada 4sem', frequencia: 'Ver dose por peso', idadeMinima: '6 meses' }
      },
      {
        indicacao: 'Asma eosinofilica',
        adultos: { dose: '400mg ou 600mg ataque (se corticoide oral), depois 200mg ou 300mg', frequencia: 'SC a cada 2 semanas', observacoes: 'Pode permitir reducao de corticoides orais' }
      },
      {
        indicacao: 'Rinossinusite com polipose',
        adultos: { dose: '300mg', frequencia: 'SC a cada 2 semanas', observacoes: 'Adjuvante a corticoide nasal' }
      },
      {
        indicacao: 'Esofagite eosinofilica',
        adultos: { dose: '300mg', frequencia: 'SC semanalmente' }
      },
      {
        indicacao: 'Prurigo nodular',
        adultos: { dose: '600mg ataque, depois 300mg', frequencia: 'SC a cada 2 semanas' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao dupilumabe ou excipientes'
    ],
    precaucoes: [
      'Conjuntivite e queratite - muito comum; encaminhar a oftalmo se sintomas oculares',
      'Nao usar para asma aguda ou status asmaticus',
      'Reduzir corticoides sistemicos gradualmente se usados para asma',
      'Reacoes de hipersensibilidade podem ocorrer (tardias)',
      'Infeccoes por helmintos - tratar antes de iniciar',
      'Evitar vacinas vivas durante tratamento'
    ],
    efeitosAdversos: {
      comuns: ['Conjuntivite (ate 20%)', 'Blefarite', 'Queratite', 'Cefaleia', 'Reacoes no local de injecao', 'Herpes oral'],
      graves: ['Anafilaxia (raro)', 'Conjuntivite grave/queratite ulcerativa', 'Eosinofilia', 'Artralgia transitoria']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'moderada', efeito: 'Resposta vacinal pode ser reduzida', conduta: 'Evitar durante tratamento; vacinar antes se possivel' },
      { medicamento: 'Substratos CYP450', gravidade: 'leve', efeito: 'IL-4 pode modular CYP450; normalizacao teorica', conduta: 'Monitorar farmacos de indice terapeutico estreito (varfarina)' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes; IgG excretada no leite mas provavelmente degradada no TGI do lactente' },
    monitorizacao: ['Sintomas oculares', 'Eosinofilos se sintomas pulmonares', 'Parasitoses antes de iniciar'],
    doencasRelacionadas: ['dermatite-atopica', 'asma', 'rinossinusite', 'esofagite-eosinofilica'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-il4', 'anti-il13', 'biologico', 'dermatite-atopica', 'th2']
  },
  {
    id: 'tralokinumab',
    nomeGenerico: 'Tralocinumabe',
    nomesComerciais: ['Adbry', 'Adtralza'],
    atcCode: 'D11AH07',
    rxNormCui: '2550506',
    drugBankId: 'DB15679',
    snomedCT: '870305005',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_il4_il13',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '150mg/ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Dermatite atopica moderada a grave em adultos candidatos a terapia sistemica'
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG4 totalmente humano que se liga ESPECIFICAMENTE a IL-13, impedindo sua interacao com receptores IL-13Ralfa1 e IL-13Ralfa2. DIFERENTE de dupilumabe que bloqueia IL-4 E IL-13, tralocinumabe bloqueia APENAS IL-13. IL-13 e a principal citocina efetora Th2 na dermatite atopica: causa disfuncao de barreira, inflamacao e prurido.',
    posologias: [
      {
        indicacao: 'Dermatite atopica',
        adultos: { dose: '600mg dose de ataque (4x150mg), depois 300mg (2x150mg)', frequencia: 'SC a cada 2 semanas', observacoes: 'Respondedores podem estender para a cada 4 semanas apos 16 semanas' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao tralocinumabe'
    ],
    precaucoes: [
      'Conjuntivite e queratite - comum (menor incidencia que dupilumabe em alguns estudos)',
      'Infeccoes por helmintos - tratar antes de iniciar',
      'Evitar vacinas vivas',
      'Reacoes de hipersensibilidade tardias possiveis'
    ],
    efeitosAdversos: {
      comuns: ['Infeccoes respiratorias superiores', 'Conjuntivite', 'Reacoes no local de injecao', 'Eosinofilia'],
      graves: ['Conjuntivite grave', 'Queratite', 'Hipersensibilidade']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'moderada', efeito: 'Seguranca e eficacia nao estabelecidas', conduta: 'Evitar' },
      { medicamento: 'Substratos CYP450', gravidade: 'leve', efeito: 'Sem interacoes significativas esperadas', conduta: 'Sem ajuste' }
    ],
    gestacao: 'N',
    amamentacao: { compativel: false, observacao: 'Dados humanos insuficientes' },
    monitorizacao: ['Sintomas oculares', 'Eosinofilos', 'Parasitoses'],
    doencasRelacionadas: ['dermatite-atopica'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-il13', 'biologico', 'dermatite-atopica', 'seletivo']
  },

  // ============================================================================
  // ANTI-IGE PARA URTICARIA CRONICA
  // ============================================================================
  {
    id: 'omalizumab',
    nomeGenerico: 'Omalizumabe',
    nomesComerciais: ['Xolair'],
    atcCode: 'R03DX05',
    rxNormCui: '353389',
    drugBankId: 'DB00043',
    snomedCT: '407097007',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_il4_il13',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '75mg/0,5ml', disponivelSUS: true },
      { forma: 'injetavel_sc', concentracao: '150mg/ml', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '150mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Asma alergica moderada a grave inadequadamente controlada',
      'Urticaria cronica espontanea refrataria a anti-histaminicos',
      'Rinossinusite cronica com polipose nasal (adjuvante)',
      'Alergia alimentar mediada por IgE (reducao de reacoes)'
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG1-kappa humanizado anti-IgE. Liga-se a regiao Fc da IgE livre circulante, impedindo sua ligacao ao receptor de alta afinidade (FcepsilonRI) em mastocitos e basofilos. Reduz IgE livre >95% e downregula receptores FcepsilonRI. Na urticaria, reduz ativacao de mastocitos e liberacao de histamina. NA URTICARIA: mecanismo independente de IgE total.',
    posologias: [
      {
        indicacao: 'Urticaria cronica espontanea',
        adultos: { dose: '300mg', frequencia: 'SC a cada 4 semanas', observacoes: 'Dose fixa independente de IgE ou peso; reavaliar necessidade apos 6 meses' }
      },
      {
        indicacao: 'Asma alergica',
        adultos: { dose: '75-600mg', frequencia: 'SC a cada 2-4 semanas', observacoes: 'Dose baseada em IgE serica e peso corporal (ver tabela)' }
      },
      {
        indicacao: 'Rinossinusite com polipose',
        adultos: { dose: '75-600mg', frequencia: 'SC a cada 2-4 semanas', observacoes: 'Dose baseada em IgE e peso' }
      },
      {
        indicacao: 'Alergia alimentar mediada por IgE',
        adultos: { dose: '75-600mg', frequencia: 'SC a cada 2-4 semanas', observacoes: 'Permite tolerancia a quantidades maiores do alergeno' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade grave ao omalizumabe'
    ],
    precaucoes: [
      'BLACK BOX: Anafilaxia pode ocorrer apos qualquer dose, mesmo apos anos de tratamento',
      'Observar paciente por 30 minutos apos cada injecao (especialmente primeiras 3)',
      'Prescrever epinefrina autoinjetavel',
      'Nao usar para broncoespasmo agudo ou status asmaticus',
      'Infeccoes por helmintos - pode reduzir resposta ao tratamento',
      'Sindrome de Churg-Strauss relatada (associacao incerta)',
      'Eventos tromboembolicos arteriais relatados (raro)'
    ],
    efeitosAdversos: {
      comuns: ['Reacoes no local de injecao', 'Artralgia', 'Cefaleia', 'Infeccoes virais'],
      graves: ['Anafilaxia (0,1-0,2%)', 'Eventos cardiovasculares (raro)', 'Malignidades (associacao nao estabelecida)', 'Sindrome Churg-Strauss']
    },
    interacoes: [
      { medicamento: 'Imunoterapia alergeno-especifica', gravidade: 'leve', efeito: 'Pode ser usada concomitantemente', conduta: 'Associacao segura e pode melhorar tolerancia' },
      { medicamento: 'Corticoides inalatorios', gravidade: 'leve', efeito: 'Pode permitir reducao de dose', conduta: 'Reduzir gradualmente sob supervisao' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'IgG excretada no leite; provavelmente seguro' },
    monitorizacao: ['Observacao pos-injecao', 'IgE serica (nao util para monitorar resposta)', 'Sintomas anafilaticos'],
    doencasRelacionadas: ['urticaria-cronica', 'asma', 'rinossinusite'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-ige', 'biologico', 'urticaria', 'asma', 'black-box-anafilaxia']
  },

  // ============================================================================
  // RETINOIDES SISTEMICOS
  // ============================================================================
  {
    id: 'acitretin',
    nomeGenerico: 'Acitretina',
    nomesComerciais: ['Neotigason', 'Soriatane'],
    atcCode: 'D05BB02',
    rxNormCui: '17669',
    drugBankId: 'DB00459',
    snomedCT: '391746003',
    classeTerapeutica: 'antipsoríatico',
    subclasse: 'retinoide_sistemico',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '10mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '25mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Psoriase grave (em placas, pustulosa, eritrodermica)',
      'Ictioses hereditarias graves',
      'Doenca de Darier',
      'Pitiriase rubra pilar',
      'Liquen plano grave refratario'
    ],
    mecanismoAcao: 'Retinoide de segunda geracao (metabolito do etretinato). Liga-se a receptores nucleares RAR (acido retinoico) e modula transcricao genica. Normaliza diferenciacao e proliferacao de queratinocitos, reduz hiperqueratose e tem efeitos anti-inflamatorios. MEIA-VIDA MUITO LONGA quando convertido a etretinato (pelo alcool) - implicacoes para contracepcao.',
    posologias: [
      {
        indicacao: 'Psoriase',
        adultos: { dose: '25-50mg', frequencia: '1x/dia com refeicao gordurosa', doseMaxima: '75mg/dia', observacoes: 'Iniciar com dose baixa; ajustar conforme resposta e tolerancia' }
      },
      {
        indicacao: 'Ictioses',
        adultos: { dose: '10-25mg', frequencia: '1x/dia', observacoes: 'Doses menores geralmente suficientes' },
        pediatrico: { dose: '0,5mg/kg/dia', frequencia: '1x/dia', doseMaxima: '35mg/dia', observacoes: 'Monitorar crescimento e ossos' }
      }
    ],
    contraindicacoes: [
      'Gestacao (Categoria X) - teratogenico',
      'Mulheres em idade fertil sem contracepcao adequada',
      'Amamentacao',
      'Insuficiencia hepatica grave',
      'Insuficiencia renal grave',
      'Hiperlipidemia grave nao controlada',
      'Uso concomitante de metotrexato ou tetraciclinas'
    ],
    precaucoes: [
      'TERATOGENICIDADE GRAVE - contracepcao obrigatoria por 3 ANOS apos descontinuacao',
      'Nao consumir alcool durante e ate 2 meses apos (converte para etretinato de meia-vida longa)',
      'Nao doar sangue durante tratamento e por 3 anos apos',
      'Hepatotoxicidade - monitorar transaminases',
      'Dislipidemia - hipertrigliceridemia comum',
      'Hiperostose esqueletica em uso prolongado',
      'Pseudotumor cerebral com tetraciclinas'
    ],
    efeitosAdversos: {
      comuns: ['Queilite (>75%)', 'Xerose cutanea', 'Alopecia', 'Epistaxe', 'Descamacao palmo-plantar', 'Prurido', 'Dislipidemia', 'Elevacao de transaminases'],
      graves: ['Teratogenicidade', 'Hepatotoxicidade', 'Pancreatite (hipertrigliceridemia grave)', 'Pseudotumor cerebral', 'Hiperostose', 'Depressao']
    },
    interacoes: [
      { medicamento: 'Metotrexato', gravidade: 'contraindicada', efeito: 'Hepatotoxicidade aditiva; risco de hepatite', conduta: 'Contraindicado' },
      { medicamento: 'Tetraciclinas (doxiciclina, minociclina)', gravidade: 'contraindicada', efeito: 'Pseudotumor cerebral', conduta: 'Contraindicado' },
      { medicamento: 'Vitamina A', gravidade: 'grave', efeito: 'Hipervitaminose A', conduta: 'Evitar suplementacao' },
      { medicamento: 'Alcool', gravidade: 'grave', efeito: 'Converte acitretina em etretinato (meia-vida de anos)', conduta: 'Abstinencia durante e 2 meses apos' },
      { medicamento: 'Fenitoina', gravidade: 'moderada', efeito: 'Retinoides podem reduzir ligacao de fenitoina', conduta: 'Monitorar niveis' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado - excretado no leite' },
    monitorizacao: ['Teste de gravidez mensal', 'Lipidograma (basal, 4 sem, depois trimestral)', 'Transaminases (basal, 4 sem, depois trimestral)', 'Hemograma', 'Funcao renal'],
    consideracoesEspeciais: {
      pediatrico: 'Risco de fechamento prematuro de epifises; monitorar crescimento e radiografias',
      hepatopatas: 'Contraindicado em insuficiencia hepatica grave'
    },
    doencasRelacionadas: ['psoriase', 'ictiose', 'doenca-darier'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['retinoide', 'psoriase', 'teratogenico', 'categoria-x']
  },
  {
    id: 'isotretinoin',
    nomeGenerico: 'Isotretinoina',
    nomesComerciais: ['Roacutan', 'Accutane', 'Absorica', 'Claravis', 'Myorisan'],
    atcCode: 'D10BA01',
    rxNormCui: '6064',
    drugBankId: 'DB00982',
    snomedCT: '387208003',
    classeTerapeutica: 'antiacneico',
    subclasse: 'retinoide_sistemico',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '10mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '20mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '40mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Acne nodular/cistica grave',
      'Acne moderada refrataria a tratamento convencional',
      'Acne com tendencia a cicatrizes',
      'Acne conglobata',
      'Foliculite gram-negativa'
    ],
    mecanismoAcao: 'Isomero 13-cis do acido retinoico. UNICO farmaco que afeta TODOS os 4 fatores patogenicos da acne: (1) Suprime drasticamente producao sebacea (reducao de 70-90%); (2) Normaliza queratinizacao folicular; (3) Reduz colonizacao por P. acnes (secundario a reducao de sebo); (4) Acao anti-inflamatoria. Efeito CURATIVO em muitos pacientes.',
    posologias: [
      {
        indicacao: 'Acne grave',
        adultos: { dose: '0,5-1mg/kg/dia', frequencia: 'Dividido em 2 tomadas com gordura', doseMaxima: '2mg/kg/dia', observacoes: 'Dose cumulativa alvo: 120-150mg/kg para remissao duradoura' }
      },
      {
        indicacao: 'Acne moderada/protocolo baixa dose',
        adultos: { dose: '0,25-0,5mg/kg/dia ou 10-20mg/dia fixo', frequencia: '1x/dia com gordura', observacoes: 'Menor incidencia de efeitos adversos; pode requerer tratamento mais longo' }
      }
    ],
    contraindicacoes: [
      'Gestacao (Categoria X) - ALTAMENTE TERATOGENICO',
      'Amamentacao',
      'Hipersensibilidade a isotretinoina ou parabenos',
      'Hipervitaminose A',
      'Disfuncao hepatica significativa',
      'Hipertrigliceridemia nao controlada'
    ],
    precaucoes: [
      'iPLEDGE PROGRAM (EUA) ou equivalente - programa de prevencao de gravidez',
      'Contracepcao dupla 1 mes antes, durante e 1 mes apos',
      'Teste de gravidez mensal obrigatorio',
      'BLACK BOX: Teratogenicidade - malformacoes craniofaciais, cardiacas, SNC',
      'Depressao e ideacao suicida - controverso mas monitorar',
      'Doenca inflamatoria intestinal - relatos (associacao incerta)',
      'Nao doar sangue durante e por 1 mes apos',
      'Pseudotumor cerebral com tetraciclinas',
      'Fotossensibilidade - usar protetor solar'
    ],
    efeitosAdversos: {
      comuns: ['Queilite (>90%)', 'Xerose cutanea e mucosas', 'Epistaxe', 'Xeroftalmia', 'Dor muscular/articular', 'Elevacao de transaminases', 'Hipertrigliceridemia', 'Cefaleia', 'Fotossensibilidade'],
      graves: ['Teratogenicidade (sindrome isotretinoina fetal)', 'Depressao/suicidio (controverso)', 'Pseudotumor cerebral', 'Hepatotoxicidade', 'Pancreatite', 'Doenca inflamatoria intestinal (controverso)', 'Reacoes cutaneas graves']
    },
    interacoes: [
      { medicamento: 'Tetraciclinas (doxiciclina, minociclina)', gravidade: 'contraindicada', efeito: 'Pseudotumor cerebral (hipertensao intracraniana)', conduta: 'Contraindicado' },
      { medicamento: 'Vitamina A', gravidade: 'grave', efeito: 'Hipervitaminose A', conduta: 'Evitar suplementacao' },
      { medicamento: 'Metotrexato', gravidade: 'grave', efeito: 'Hepatotoxicidade aditiva', conduta: 'Evitar' },
      { medicamento: 'Fenitoina', gravidade: 'moderada', efeito: 'Pode reduzir niveis de fenitoina', conduta: 'Monitorar' },
      { medicamento: 'Corticoides sistemicos', gravidade: 'moderada', efeito: 'Pode precipitar osteoporose', conduta: 'Usar menor dose possivel' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['Teste de gravidez mensal (mulheres)', 'Lipidograma (basal, 4-8 sem)', 'Transaminases (basal, 4-8 sem)', 'Hemograma', 'Avaliacao de humor'],
    doencasRelacionadas: ['acne'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['retinoide', 'acne', 'teratogenico', 'categoria-x', 'ipledge']
  },
  {
    id: 'tazarotene',
    nomeGenerico: 'Tazaroteno',
    nomesComerciais: ['Tazorac', 'Avage', 'Zorac'],
    atcCode: 'D05AX05',
    rxNormCui: '72625',
    drugBankId: 'DB00799',
    snomedCT: '387131007',
    classeTerapeutica: 'antipsoríatico',
    subclasse: 'retinoide_topico',
    rename: false,
    apresentacoes: [
      { forma: 'gel_topico', concentracao: '0,05%', disponivelSUS: false },
      { forma: 'gel_topico', concentracao: '0,1%', disponivelSUS: false },
      { forma: 'creme', concentracao: '0,05%', disponivelSUS: false },
      { forma: 'creme', concentracao: '0,1%', disponivelSUS: false }
    ],
    indicacoes: [
      'Psoriase em placas (corpo)',
      'Acne vulgar',
      'Fotoenvelhecimento/rugas finas',
      'Lentigines solares'
    ],
    mecanismoAcao: 'Retinoide de terceira geracao - profarmaco que e rapidamente convertido em acido tazarotenico (metabolito ativo). Liga-se SELETIVAMENTE a RAR-beta e RAR-gama (vs. tretinoina que e nao seletiva). Na psoriase: normaliza diferenciacao e reduz hiperproliferacao de queratinocitos. Na acne: comedolitico e anti-inflamatorio.',
    posologias: [
      {
        indicacao: 'Psoriase',
        adultos: { dose: 'Aplicar camada fina nas placas', frequencia: '1x/dia a noite', observacoes: 'Iniciar com 0,05% e progredir para 0,1% se tolerado. Evitar pele sadia.' }
      },
      {
        indicacao: 'Acne',
        adultos: { dose: 'Aplicar camada fina', frequencia: '1x/dia a noite', observacoes: 'Usar em dias alternados se irritacao' }
      },
      {
        indicacao: 'Fotoenvelhecimento',
        adultos: { dose: 'Aplicar camada fina na face', frequencia: '1x/dia a noite', observacoes: 'Usar 0,1% creme; resultados em 12-24 semanas' }
      }
    ],
    contraindicacoes: [
      'Gestacao (Categoria X) - teratogenico',
      'Amamentacao',
      'Eczema ou dermatite irritativa ativa',
      'Hipersensibilidade a retinoides'
    ],
    precaucoes: [
      'TERATOGENICO - contracepcao obrigatoria em mulheres em idade fertil',
      'Descontinuar se gravidez suspeita',
      'Irritacao local comum - iniciar com baixa frequencia',
      'Fotossensibilidade intensa - evitar sol e usar protetor',
      'Evitar aplicacao em pele com eczema ou feridas',
      'Nao aplicar em mais de 20% da superficie corporal (psoriase)',
      'Evitar contato com olhos, boca e mucosas'
    ],
    efeitosAdversos: {
      comuns: ['Irritacao local (eritema, descamacao, ardor)', 'Ressecamento', 'Prurido', 'Fotossensibilidade', 'Piora inicial da acne'],
      graves: ['Teratogenicidade (se absorvido)', 'Dermatite grave']
    },
    interacoes: [
      { medicamento: 'Cosmeticos irritantes/abrasivos', gravidade: 'moderada', efeito: 'Potencializa irritacao', conduta: 'Evitar uso concomitante' },
      { medicamento: 'Peroxido de benzoila', gravidade: 'leve', efeito: 'Pode inativar; irritacao aditiva', conduta: 'Usar em horarios diferentes (manha/noite)' },
      { medicamento: 'Outros retinoides topicos', gravidade: 'moderada', efeito: 'Irritacao excessiva', conduta: 'Nao associar' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Evitar - absorvido sistemicamente' },
    monitorizacao: ['Irritacao local', 'Sinais de gravidez'],
    doencasRelacionadas: ['psoriase', 'acne', 'fotoenvelhecimento'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['retinoide', 'topico', 'psoriase', 'acne', 'categoria-x']
  },

  // ============================================================================
  // ANALOGO DE VITAMINA D
  // ============================================================================
  {
    id: 'calcipotriol',
    nomeGenerico: 'Calcipotriol',
    nomesComerciais: ['Daivonex', 'Dovonex', 'Daivobet'],
    atcCode: 'D05AX02',
    rxNormCui: '20352',
    drugBankId: 'DB02300',
    snomedCT: '395945007',
    classeTerapeutica: 'antipsoríatico',
    subclasse: 'analogo_vitamina_d',
    rename: false,
    apresentacoes: [
      { forma: 'pomada', concentracao: '50mcg/g', disponivelSUS: false },
      { forma: 'creme', concentracao: '50mcg/g', disponivelSUS: false },
      { forma: 'locao', concentracao: '50mcg/ml', disponivelSUS: false },
      { forma: 'gel_topico', concentracao: '50mcg/g', disponivelSUS: false }
    ],
    indicacoes: [
      'Psoriase em placas leve a moderada',
      'Psoriase do couro cabeludo'
    ],
    mecanismoAcao: 'Analogo sintetico da vitamina D3 (calcitriol) com modificacao estrutural que reduz efeitos sobre metabolismo do calcio. Liga-se ao receptor de vitamina D (VDR) nos queratinocitos, INIBINDO proliferacao e INDUZINDO diferenciacao terminal. Tambem modula resposta imune - reduz citocinas pro-inflamatorias (IL-6, IL-8). Efeito antiproliferativo 100-200x maior que calcitriol com minimo efeito sistemico.',
    posologias: [
      {
        indicacao: 'Psoriase em placas',
        adultos: { dose: 'Aplicar camada fina nas placas', frequencia: '1-2x/dia', doseMaxima: '100g/semana', observacoes: 'Nao exceder 30% superficie corporal' }
      },
      {
        indicacao: 'Psoriase couro cabeludo',
        adultos: { dose: 'Aplicar solucao/locao', frequencia: '1-2x/dia', doseMaxima: '60ml/semana' }
      },
      {
        indicacao: 'Psoriase pediatrica',
        pediatrico: { dose: 'Aplicar camada fina', frequencia: '1x/dia', doseMaxima: '50g/semana (6-12a); 75g/semana (>12a)', idadeMinima: '6 anos' }
      }
    ],
    contraindicacoes: [
      'Hipercalcemia ou disturbios do metabolismo do calcio',
      'Hipervitaminose D',
      'Psoriase eritrodermica ou pustulosa generalizada',
      'Aplicacao na face'
    ],
    precaucoes: [
      'Hipercalcemia possivel se uso extenso (>30% superficie ou >100g/semana)',
      'Monitorar calcio serico se uso prolongado em grandes areas',
      'Evitar face e dobras (irritante)',
      'Pode causar irritacao local inicial',
      'Lavar maos apos aplicacao',
      'Fotossensibilidade pode ocorrer'
    ],
    efeitosAdversos: {
      comuns: ['Irritacao local', 'Queimacao/ardor', 'Eritema', 'Prurido', 'Ressecamento'],
      graves: ['Hipercalcemia (uso extenso)', 'Dermatite perilesional']
    },
    interacoes: [
      { medicamento: 'Suplementos de calcio/vitamina D', gravidade: 'moderada', efeito: 'Risco aumentado de hipercalcemia', conduta: 'Monitorar calcio se uso concomitante' },
      { medicamento: 'Diureticos tiazidicos', gravidade: 'moderada', efeito: 'Reduzem excrecao de calcio', conduta: 'Monitorar calcio' },
      { medicamento: 'Corticoides topicos', gravidade: 'leve', efeito: 'Sinergismo terapeutico; pode reduzir irritacao', conduta: 'Combinacao frequente e eficaz (Daivobet)' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro - absorvao sistemica minima; evitar aplicacao em mamas' },
    monitorizacao: ['Calcio serico se uso extenso ou prolongado', 'Tolerancia local'],
    doencasRelacionadas: ['psoriase'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['vitamina-d', 'psoriase', 'topico', 'queratinocito']
  },

  // ============================================================================
  // INIBIDORES DE CALCINEURINA TOPICOS
  // ============================================================================
  {
    id: 'tacrolimus-topical',
    nomeGenerico: 'Tacrolimo Topico',
    nomesComerciais: ['Protopic'],
    atcCode: 'D11AH01',
    rxNormCui: '203538',
    drugBankId: 'DB00864',
    snomedCT: '373477003',
    classeTerapeutica: 'imunomodulador_topico',
    subclasse: 'inibidor_calcineurina_topico',
    rename: false,
    apresentacoes: [
      { forma: 'pomada', concentracao: '0,03%', disponivelSUS: false },
      { forma: 'pomada', concentracao: '0,1%', disponivelSUS: false }
    ],
    indicacoes: [
      'Dermatite atopica moderada a grave (segunda linha)',
      'Dermatite atopica em areas sensiveis (face, dobras)',
      'Vitiligo (uso off-label)',
      'Dermatite seborreica facial refrataria'
    ],
    mecanismoAcao: 'Macrolideo imunomodulador que inibe CALCINEURINA nas celulas T. Liga-se a FKBP-12 (imunofilina); complexo inibe fosfatase calcineurina, bloqueando desfosforilacao de NFAT e impedindo transcricao de citocinas (IL-2, IL-4, IFN-gama). Diferente de corticoides: NAO causa atrofia cutanea. Potencia similar a corticoide de media-alta potencia sem efeitos atroficos.',
    posologias: [
      {
        indicacao: 'Dermatite atopica adultos',
        adultos: { dose: 'Aplicar pomada 0,1% camada fina', frequencia: '2x/dia', observacoes: 'Continuar ate clearance; manter com 2-3x/semana se recidivas frequentes (proativo)' }
      },
      {
        indicacao: 'Dermatite atopica pediatrica',
        pediatrico: { dose: 'Pomada 0,03% camada fina', frequencia: '2x/dia', idadeMinima: '2 anos', observacoes: '0,1% pode ser usado em >16 anos' }
      },
      {
        indicacao: 'Vitiligo (off-label)',
        adultos: { dose: 'Pomada 0,1%', frequencia: '2x/dia', observacoes: 'Melhor resposta em face/pescoco; associar a fototerapia' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao tacrolimo',
      'Infeccao cutanea ativa na area de aplicacao',
      'Sindrome de Netherton ou outras condicoes com barreira cutanea muito comprometida',
      '<2 anos de idade'
    ],
    precaucoes: [
      'BLACK BOX: Risco teorico de malignidade (linfoma, cancer de pele) - dados epidemiologicos nao confirmam',
      'Usar menor quantidade e duracao necessarias',
      'Nao usar sob oclusao',
      'Queimacao/ardor comum nas primeiras aplicacoes (melhora com uso)',
      'Intolerancia ao alcool - flushing',
      'Evitar exposicao solar excessiva',
      'Nao usar em lesoes infectadas'
    ],
    efeitosAdversos: {
      comuns: ['Queimacao/ardor local (50% - transitorio)', 'Prurido', 'Eritema', 'Foliculite', 'Intolerancia ao alcool'],
      graves: ['Risco teorico de linfoma/cancer (black box)', 'Eczema herpeticum (se HSV presente)', 'Infeccoes cutaneas']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4 (se absorvido)', gravidade: 'leve', efeito: 'Absorcao sistemica minima em pele intacta', conduta: 'Cuidado se grande area ou pele muito comprometida' },
      { medicamento: 'Alcool', gravidade: 'leve', efeito: 'Flushing facial', conduta: 'Informar paciente' },
      { medicamento: 'Fotossensibilizantes', gravidade: 'leve', efeito: 'Pode aumentar sensibilidade ao sol', conduta: 'Protetor solar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorvao sistemica minima; evitar aplicacao nas mamas' },
    monitorizacao: ['Resposta clinica', 'Infeccoes cutaneas', 'Sinais de malignidade (controverso)'],
    doencasRelacionadas: ['dermatite-atopica', 'vitiligo'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['inibidor-calcineurina', 'topico', 'dermatite-atopica', 'poupador-corticoide']
  },
  {
    id: 'pimecrolimus',
    nomeGenerico: 'Pimecrolimo',
    nomesComerciais: ['Elidel'],
    atcCode: 'D11AH02',
    rxNormCui: '308082',
    drugBankId: 'DB00337',
    snomedCT: '407038002',
    classeTerapeutica: 'imunomodulador_topico',
    subclasse: 'inibidor_calcineurina_topico',
    rename: false,
    apresentacoes: [
      { forma: 'creme', concentracao: '1%', disponivelSUS: false }
    ],
    indicacoes: [
      'Dermatite atopica leve a moderada (segunda linha)',
      'Dermatite atopica em areas sensiveis (face, dobras, genitais)',
      'Dermatite seborreica facial'
    ],
    mecanismoAcao: 'Derivado ascomicina - inibidor de calcineurina TOPICO SELETIVO para pele. Liga-se a FKBP-12 (macrofilina); complexo inibe calcineurina e bloqueia transcricao de citocinas Th1 e Th2. Tambem inibe liberacao de mediadores de mastocitos. MENOS POTENTE que tacrolimo - apropriado para doenca leve-moderada. Formulacao em creme mais cosmetica.',
    posologias: [
      {
        indicacao: 'Dermatite atopica',
        adultos: { dose: 'Aplicar camada fina nas lesoes', frequencia: '2x/dia', observacoes: 'Continuar ate clearance; pode usar a longo prazo' },
        pediatrico: { dose: 'Aplicar camada fina', frequencia: '2x/dia', idadeMinima: '3 meses', observacoes: 'Aprovado em criancas a partir de 3 meses' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao pimecrolimo',
      'Infeccao cutanea ativa na area',
      'Sindrome de Netherton'
    ],
    precaucoes: [
      'BLACK BOX: Risco teorico de malignidade (mesmas advertencias de tacrolimo)',
      'Usar menor quantidade e duracao necessarias',
      'Menos ardor inicial que tacrolimo',
      'Evitar exposicao solar excessiva',
      'Nao usar sob oclusao',
      'Nao aplicar em pele infectada'
    ],
    efeitosAdversos: {
      comuns: ['Queimacao local (menos que tacrolimo)', 'Eritema', 'Prurido', 'Foliculite', 'Cefaleia'],
      graves: ['Risco teorico de malignidade (black box)', 'Infeccoes cutaneas']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4', gravidade: 'leve', efeito: 'Absorvao sistemica muito baixa', conduta: 'Sem ajuste necessario' },
      { medicamento: 'Alcool', gravidade: 'leve', efeito: 'Flushing menos comum que tacrolimo', conduta: 'Informar paciente' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorvao sistemica minima; provavelmente seguro' },
    monitorizacao: ['Resposta clinica', 'Infeccoes cutaneas'],
    doencasRelacionadas: ['dermatite-atopica'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['inibidor-calcineurina', 'topico', 'dermatite-atopica', 'pediatria']
  },

  // ============================================================================
  // SULFONA
  // ============================================================================
  {
    id: 'dapsone',
    nomeGenerico: 'Dapsona',
    nomesComerciais: ['Dapsona', 'Aczone'],
    atcCode: 'J04BA02',
    rxNormCui: '3108',
    drugBankId: 'DB00250',
    snomedCT: '387521005',
    classeTerapeutica: 'antibiotico',
    subclasse: 'sulfonamida',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'gel_topico', concentracao: '5%', disponivelSUS: false },
      { forma: 'gel_topico', concentracao: '7,5%', disponivelSUS: false }
    ],
    indicacoes: [
      'Hanseníase (esquema multidroga OMS)',
      'Dermatite herpetiforme',
      'Penfigo/Penfigoide bolhoso (adjuvante)',
      'Acne vulgar (gel topico)',
      'Pneumonia por Pneumocystis jirovecii (profilaxia)',
      'Vasculite leucocitoclastica',
      'Doencas neutrofilicas (Sindrome de Sweet, Pioderma gangrenoso)'
    ],
    mecanismoAcao: 'Sulfona com duplo mecanismo: (1) ANTIBACTERIANO - inibe sintese de folato (competidor de PABA) em Mycobacterium leprae; (2) ANTI-INFLAMATORIO - inibe quimiotaxia de neutrofilos, suprime sistema mieloperoxidase-haleto, estabiliza lisossomos. Acao anti-inflamatoria e base do uso em dermatoses neutrofilicas e bolhosas.',
    posologias: [
      {
        indicacao: 'Hanseniase multibacilar (OMS)',
        adultos: { dose: '100mg', frequencia: '1x/dia x 12 meses', observacoes: 'Com rifampicina e clofazimina' }
      },
      {
        indicacao: 'Hanseniase paucibacilar',
        adultos: { dose: '100mg', frequencia: '1x/dia x 6 meses', observacoes: 'Com rifampicina' }
      },
      {
        indicacao: 'Dermatite herpetiforme',
        adultos: { dose: '50-100mg', frequencia: '1x/dia', observacoes: 'Ajustar ate menor dose efetiva; dieta sem gluten e essencial' }
      },
      {
        indicacao: 'Pneumocistose profilaxia',
        adultos: { dose: '100mg', frequencia: '1x/dia', observacoes: 'Alternativa a TMP-SMX' }
      },
      {
        indicacao: 'Acne (gel topico)',
        adultos: { dose: 'Aplicar camada fina', frequencia: '2x/dia', observacoes: 'Eficaz para lesoes inflamatorias' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a dapsona ou sulfonas',
      'Anemia grave',
      'Deficiencia de G6PD (relativa - pode usar com cautela)'
    ],
    precaucoes: [
      'Hemolise dose-dependente UNIVERSAL - monitorar Hb',
      'Metahemoglobinemia - pode ser sintomatica',
      'Deficiencia de G6PD - hemolise mais grave; evitar se grave',
      'Agranulocitose - rara mas potencialmente fatal (primeiras 12 semanas)',
      'Sindrome da sulfona (DRESS) - hipersensibilidade grave',
      'Hepatotoxicidade',
      'Neuropatia periferica motora',
      'Monitorar hemograma e funcao hepatica'
    ],
    efeitosAdversos: {
      comuns: ['Hemolise (todos os pacientes em algum grau)', 'Metahemoglobinemia', 'Cefaleia', 'Nauseas', 'Rash'],
      graves: ['Agranulocitose', 'Sindrome da sulfona (DRESS)', 'Hepatite', 'Neuropatia periferica', 'Anemia aplastica']
    },
    interacoes: [
      { medicamento: 'Rifampicina', gravidade: 'moderada', efeito: 'Induz metabolismo de dapsona; reduz niveis 7-10x', conduta: 'Manter dose padrao no esquema hanseniase' },
      { medicamento: 'Trimetoprima', gravidade: 'moderada', efeito: 'Aumenta niveis de dapsona e metahemoglobinemia', conduta: 'Monitorar; reduzir dose se necessario' },
      { medicamento: 'Probenecida', gravidade: 'moderada', efeito: 'Reduz excrecao de dapsona', conduta: 'Monitorar niveis' },
      { medicamento: 'Fenitoina/carbamazepina', gravidade: 'moderada', efeito: 'Induzem metabolismo', conduta: 'Pode necessitar dose maior' },
      { medicamento: 'Oxidantes (primaquina, nitrofurantoina)', gravidade: 'grave', efeito: 'Hemolise aditiva', conduta: 'Evitar associacao' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Excretado no leite; monitorar ictericia/hemolise no lactente' },
    monitorizacao: ['Hemograma semanal x 1 mes, depois mensal x 6 meses, depois trimestral', 'Reticulocitos', 'G6PD antes de iniciar', 'Funcao hepatica', 'Metahemoglobina se cianose'],
    doencasRelacionadas: ['hanseniase', 'dermatite-herpetiforme', 'penfigo'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['sulfona', 'hanseniase', 'anti-inflamatorio', 'hemolise']
  },

  // ============================================================================
  // ANTIPARASITARIO/ROSACEA
  // ============================================================================
  {
    id: 'ivermectin-dermatology',
    nomeGenerico: 'Ivermectina',
    nomesComerciais: ['Soolantra', 'Rosiver', 'Sklice', 'Stromectol'],
    atcCode: 'D11AX22',
    rxNormCui: '311204',
    drugBankId: 'DB00602',
    snomedCT: '387559003',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'avermectina',
    rename: true,
    apresentacoes: [
      { forma: 'creme', concentracao: '1%', disponivelSUS: false },
      { forma: 'locao', concentracao: '0,5%', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '3mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '6mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Rosacea inflamatoria (creme 1%)',
      'Pediculose capitis (locao 0,5%)',
      'Escabiose (oral)',
      'Oncocercose',
      'Estrongiloidiase',
      'Demodicose'
    ],
    mecanismoAcao: 'Lactona macrociclica - avermectina derivada de Streptomyces avermitilis. MECANISMO ANTIPARASITARIO: liga-se a canais de cloreto glutamato-dependentes em invertebrados, causando hiperpolarizacao e paralisia. MECANISMO NA ROSACEA: (1) elimina Demodex folliculorum; (2) efeito anti-inflamatorio independente - inibe producao de citocinas e quimiotaxia de neutrofilos.',
    posologias: [
      {
        indicacao: 'Rosacea inflamatoria (topico)',
        adultos: { dose: 'Creme 1% - aplicar camada fina na face', frequencia: '1x/dia', observacoes: 'Resultados em 4-8 semanas; uso prolongado seguro' }
      },
      {
        indicacao: 'Pediculose (topico)',
        adultos: { dose: 'Locao 0,5% - aplicar no cabelo seco', frequencia: 'Dose unica por 10min, depois enxaguar', observacoes: 'Eficaz com aplicacao unica' },
        pediatrico: { dose: 'Locao 0,5%', frequencia: 'Dose unica', idadeMinima: '6 meses' }
      },
      {
        indicacao: 'Escabiose (oral)',
        adultos: { dose: '200mcg/kg', frequencia: 'Dose unica, repetir em 7-14 dias', observacoes: 'Primeira linha em surtos/instituicoes' }
      },
      {
        indicacao: 'Demodicose (oral + topico)',
        adultos: { dose: '200mcg/kg dose unica + creme 1% na face', frequencia: 'Oral repetir em 7 dias se necessario; topico 1x/dia' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a ivermectina',
      'Criancas <15kg para uso oral (geralmente)',
      'Areas proximas aos olhos (creme)'
    ],
    precaucoes: [
      'REACAO DE MAZZOTTI - em oncocercose: reacao inflamatoria a morte de microfilarias',
      'Neurotoxicidade teorica se barreira hematoencefalica comprometida',
      'Loa loa coinfeccao - risco de encefalopatia (rastrear em areas endemicas)',
      'Interacao com inibidores CYP3A4 e P-gp (oral)',
      'Evitar amamentacao por 1 semana apos uso oral'
    ],
    efeitosAdversos: {
      comuns: ['Queimacao local (topico)', 'Ressecamento', 'Prurido', 'Nauseas (oral)', 'Tontura'],
      graves: ['Reacao de Mazzotti (oncocercose)', 'Encefalopatia (Loa loa)', 'Hepatotoxicidade (raro)']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4 e P-gp (itraconazol, ritonavir)', gravidade: 'moderada', efeito: 'Aumenta niveis de ivermectina oral', conduta: 'Monitorar toxicidade' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Pode aumentar INR', conduta: 'Monitorar INR' },
      { medicamento: 'Alcool', gravidade: 'leve', efeito: 'Pode aumentar absorvao', conduta: 'Evitar alcool proximo a dose' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Topico seguro; oral - evitar por 1 semana (excrecao no leite)' },
    monitorizacao: ['Resposta clinica', 'Funcao hepatica se uso repetido oral'],
    doencasRelacionadas: ['rosacea', 'escabiose', 'pediculose', 'demodicose'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['antiparasitario', 'rosacea', 'demodex', 'escabiose']
  },

  // ============================================================================
  // TRATAMENTO PARA ALOPECIA
  // ============================================================================
  {
    id: 'minoxidil',
    nomeGenerico: 'Minoxidil',
    nomesComerciais: ['Rogaine', 'Regaine', 'Pant', 'Kirkland'],
    atcCode: 'D11AX01',
    rxNormCui: '6984',
    drugBankId: 'DB00350',
    snomedCT: '387272001',
    classeTerapeutica: 'antialopecia',
    subclasse: 'vasodilatador_topico',
    rename: false,
    apresentacoes: [
      { forma: 'locao', concentracao: '2%', disponivelSUS: false },
      { forma: 'locao', concentracao: '5%', disponivelSUS: false },
      { forma: 'gel_topico', concentracao: '5%', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '2,5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Alopecia androgenetica masculina e feminina',
      'Alopecia areata (adjuvante)',
      'Efluvio telogenico cronico',
      'Alopecia induzida por quimioterapia (prevencao/tratamento)'
    ],
    mecanismoAcao: 'Originalmente desenvolvido como anti-hipertensivo oral (vasodilatador arterial). Mecanismo na alopecia NAO E COMPLETAMENTE ELUCIDADO: (1) Abre canais de potassio ATP-dependentes - vasodilatacao e aumento do fluxo sanguineo folicular; (2) Estimula proliferacao de celulas da papila dermica; (3) PROLONGA FASE ANAGENA (crescimento) e aumenta diametro do pelo; (4) Metabolito ativo: sulfato de minoxidil (via sulfotransferase SULT1A1).',
    posologias: [
      {
        indicacao: 'Alopecia androgenetica masculina',
        adultos: { dose: 'Solucao 5% - 1ml', frequencia: '2x/dia no couro cabeludo seco', observacoes: 'Massagear levemente; resultados em 4-6 meses; efeito maximo 12 meses' }
      },
      {
        indicacao: 'Alopecia androgenetica feminina',
        adultos: { dose: 'Solucao 2% - 1ml ou espuma 5% - 1/2 tampa', frequencia: '2x/dia (2%) ou 1x/dia (5%)', observacoes: '5% mais eficaz mas maior risco de hipertricose facial' }
      },
      {
        indicacao: 'Minoxidil oral baixa dose (off-label)',
        adultos: { dose: '0,625-5mg', frequencia: '1x/dia', observacoes: 'Homens: 2,5-5mg; Mulheres: 0,625-2,5mg; monitorar PA e edema' }
      },
      {
        indicacao: 'Alopecia areata (off-label)',
        adultos: { dose: 'Solucao 5%', frequencia: '2x/dia', observacoes: 'Adjuvante a corticoides; eficacia variavel' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao minoxidil ou propilenoglicol (solucao)',
      'Feocromocitoma (oral)',
      'Hipotensao grave (oral)',
      'Gravidez'
    ],
    precaucoes: [
      'Hipertricose facial - mais comum em mulheres usando 5%',
      'Dermatite de contato ao propilenoglicol - trocar para espuma',
      'SHEDDING INICIAL (efluvio) nas primeiras 2-8 semanas - informar paciente',
      'Descontinuacao resulta em perda do beneficio em 3-6 meses',
      'Minoxidil oral: risco de hipotensao, retencao hidrica, pericardite',
      'Absorvao sistemica possivel se couro cabeludo inflamado',
      'Evitar contato com olhos e pele facial'
    ],
    efeitosAdversos: {
      comuns: ['Hipertricose facial', 'Irritacao local', 'Prurido', 'Ressecamento', 'Shedding inicial', 'Cefaleia'],
      graves: ['Hipotensao (sistemico)', 'Taquicardia', 'Retencao hidrica', 'Pericardite/derrame pericardico (oral alto dose)', 'Angina']
    },
    interacoes: [
      { medicamento: 'Anti-hipertensivos', gravidade: 'moderada', efeito: 'Hipotensao aditiva', conduta: 'Monitorar PA se uso oral concomitante' },
      { medicamento: 'Guanetidina', gravidade: 'grave', efeito: 'Hipotensao ortostática grave', conduta: 'Evitar associacao oral' },
      { medicamento: 'Retinoides topicos', gravidade: 'leve', efeito: 'Pode aumentar absorvao de minoxidil', conduta: 'Pode ser usado para potencializar efeito' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excretado no leite; evitar uso sistemico' },
    monitorizacao: ['Resposta clinica (fotos)', 'PA e FC se uso oral', 'Sinais de retencao hidrica'],
    doencasRelacionadas: ['alopecia-androgenetica', 'alopecia-areata'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['alopecia', 'vasodilatador', 'crescimento-capilar', 'topico', 'oral']
  }
];
