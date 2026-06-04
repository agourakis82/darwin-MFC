/**
 * GINECOLOGIA NOVOS - DARWIN-MFC EXPANSAO 1000
 * ============================================
 * Medicamentos para saude da mulher
 *
 * Referencias:
 * - ACOG Practice Bulletins
 * - Endocrine Society Clinical Practice Guidelines
 * - ESHRE Guidelines
 * - FDA Prescribing Information
 * - NAMS (North American Menopause Society) Position Statements
 * - WHO Medical Eligibility Criteria for Contraceptive Use
 */

import { Medicamento } from '@/lib/types/medicamento';

export const ginecologiaNovos: Partial<Medicamento>[] = [
  // =============================================================================
  // CONTRACEPTIVOS DE LONGA DURACAO
  // =============================================================================
  {
    id: 'etonogestrel-implante',
    nomeGenerico: 'Etonogestrel (implante subdermico)',
    nomesComerciais: ['Implanon NXT', 'Nexplanon'],
    atcCode: 'G03AC08',
    rxNormCui: '727346',
    drugBankId: 'DB00294',
    snomedCT: '346287007',
    casNumber: '54048-10-1',
    classeTerapeutica: 'contraceptivo',
    subclasse: 'progestageno',
    rename: false,
    apresentacoes: [
      { forma: 'outros', concentracao: '68mg (implante subdermico)', disponivelSUS: false },
    ],
    indicacoes: [
      'Contracepcao de longa duracao (3 anos)',
      'Alternativa para mulheres com contraindicacao a estrogenos',
      'Contracepcao pos-parto e durante amamentacao',
    ],
    mecanismoAcao: 'Implante subdermico contendo etonogestrel (metabolito ativo do desogestrel), um progestageno de terceira geracao. Liberacao continua de 25-70mcg/dia (decrescente ao longo dos 3 anos). Inibe ovulacao suprimindo o pico de LH, espessa o muco cervical e atrofia o endometrio. Eficacia >99,9% (um dos metodos mais eficazes disponiveis).',
    posologias: [
      {
        indicacao: 'Contracepcao',
        adultos: {
          dose: '1 implante subdermico na face interna do braco nao dominante',
          frequencia: 'Inserido uma vez; eficaz por 3 anos',
          observacoes: 'Inserir entre D1-D5 do ciclo, ou qualquer momento se uso correto de contracepcao previa. Remover e substituir apos 3 anos se continuar contracepcao.',
        },
      },
    ],
    contraindicacoes: [
      'Gestacao confirmada ou suspeita',
      'Trombose venosa ou arterial ativa',
      'Tumor hepatico (benigno ou maligno)',
      'Cancer de mama atual ou passado',
      'Sangramento vaginal nao diagnosticado',
      'Hipersensibilidade ao etonogestrel',
    ],
    precaucoes: [
      'Risco de TEV menor que contraceptivos combinados, mas nao zero',
      'Insercao/remocao requer profissional treinado',
      'Pode migrar - verificar palpacao anual',
      'Nao protege contra ISTs',
      'Eficacia pode ser menor em mulheres >130kg (considerar troca mais precoce)',
      'Interacoes com indutores enzimaticos (rifampicina, anticonvulsivantes)',
    ],
    efeitosAdversos: {
      comuns: ['Alteracao do padrao menstrual (amenorreia, spotting irregular)', 'Cefaleia', 'Acne', 'Mastalgia', 'Ganho de peso', 'Alteracao de humor', 'Dor no local de insercao'],
      graves: ['Migracao do implante', 'Insercao profunda (lesao neurovascular)', 'Gravidez ectopica (se falha)', 'Eventos tromboembolicos (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Rifampicina, rifabutina',
        gravidade: 'grave',
        efeito: 'Reducao significativa da eficacia contraceptiva',
        mecanismo: 'Inducao de CYP3A4',
        conduta: 'Usar metodo adicional durante e 28 dias apos; considerar metodo alternativo',
      },
      {
        medicamento: 'Anticonvulsivantes (fenitoina, carbamazepina, fenobarbital, primidona)',
        gravidade: 'grave',
        efeito: 'Reducao da eficacia contraceptiva',
        mecanismo: 'Inducao enzimatica hepatica',
        conduta: 'Considerar DIU de cobre ou metodo adicional',
      },
      {
        medicamento: 'Efavirenz, nevirapina',
        gravidade: 'moderada',
        efeito: 'Pode reduzir eficacia',
        conduta: 'Metodo adicional recomendado',
      },
      {
        medicamento: 'Erva de Sao Joao (Hypericum)',
        gravidade: 'moderada',
        efeito: 'Pode reduzir niveis de etonogestrel',
        conduta: 'Evitar uso concomitante',
      },
    ],
    gestacao: 'X',
    amamentacao: { compativel: true, observacao: 'Pode ser inserido apos 4-6 semanas pos-parto; nao afeta quantidade ou qualidade do leite' },
    monitorizacao: [
      'Verificar palpabilidade do implante anualmente',
      'Monitorar padrao menstrual',
      'PA em visitas de seguimento',
      'Peso corporal',
    ],
    orientacoesPaciente: [
      'Palpar o implante regularmente para confirmar posicao',
      'Alteracoes menstruais sao esperadas (spotting comum no 1o ano)',
      'Nao protege contra HIV/ISTs',
      'Retorno imediato da fertilidade apos remocao',
      'Informar todos os profissionais de saude sobre o implante',
    ],
    consideracoesEspeciais: {
      hepatopatas: 'Evitar em doenca hepatica ativa; pode usar se funcao hepatica normal',
    },
    doencasRelacionadas: ['contracepcao', 'planejamento-familiar'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['etonogestrel', 'Implanon', 'Nexplanon', 'implante', 'LARC', 'contracepcao-longa-duracao', 'progestageno-isolado'],
  },

  {
    id: 'levonorgestrel-diu',
    nomeGenerico: 'Levonorgestrel (DIU liberador)',
    nomesComerciais: ['Mirena', 'Kyleena', 'Liletta', 'Jaydess'],
    atcCode: 'G02BA03',
    rxNormCui: '807283',
    drugBankId: 'DB00367',
    snomedCT: '169553002',
    casNumber: '797-63-7',
    classeTerapeutica: 'contraceptivo',
    subclasse: 'progestageno',
    rename: false,
    apresentacoes: [
      { forma: 'outros', concentracao: '52mg (DIU Mirena/Liletta - 5-8 anos)', disponivelSUS: false },
      { forma: 'outros', concentracao: '19.5mg (DIU Kyleena - 5 anos)', disponivelSUS: false },
      { forma: 'outros', concentracao: '13.5mg (DIU Jaydess - 3 anos)', disponivelSUS: false },
    ],
    indicacoes: [
      'Contracepcao de longa duracao',
      'Sangramento uterino anormal/menorragia',
      'Protecao endometrial na TRH com estrogeno',
      'Dismenorreia',
      'Endometriose (off-label)',
      'Adenomiose (off-label)',
    ],
    mecanismoAcao: 'DIU com reservatorio de levonorgestrel que libera progestageno localmente no utero (Mirena: 20mcg/dia inicialmente, decrescendo para ~10mcg/dia ao fim). Efeitos predominantemente locais: supressao endometrial (atrofia), espessamento do muco cervical, alteracao da motilidade tubaria. Inibicao parcial da ovulacao. Eficacia >99%.',
    posologias: [
      {
        indicacao: 'Contracepcao e indicacoes uterinas',
        adultos: {
          dose: '1 DIU inserido intrauterino',
          frequencia: 'Mirena: eficaz por 8 anos para contracepcao; Kyleena: 5 anos; Jaydess: 3 anos',
          observacoes: 'Inserir idealmente durante menstruacao (colo mais patente). Pode ser inserido imediatamente pos-parto/aborto. Verificar fios em 4-6 semanas.',
        },
      },
    ],
    contraindicacoes: [
      'Gestacao',
      'Infeccao pelvica ativa (DIP, cervicite, endometrite)',
      'Aborto septico recente',
      'Sangramento uterino nao diagnosticado',
      'Anomalias uterinas que distorcem cavidade',
      'Cancer cervical ou uterino',
      'Cancer de mama atual',
      'Doenca hepatica aguda',
    ],
    precaucoes: [
      'Risco de expulsao (especialmente nos primeiros meses)',
      'Perfuracao uterina rara (maior risco se posparto/lactantes)',
      'Cistos ovarianos funcionais podem se formar (geralmente resolvem)',
      'Spotting irregular comum nos primeiros 3-6 meses',
      'Amenorreia ocorre em ~20% apos 1 ano (esperado)',
    ],
    efeitosAdversos: {
      comuns: ['Spotting irregular (especialmente primeiros meses)', 'Amenorreia', 'Cefaleia', 'Mastalgia', 'Acne', 'Cistos ovarianos funcionais', 'Dor/colicas apos insercao'],
      graves: ['Perfuracao uterina', 'Expulsao', 'Infeccao pelvica', 'Gravidez ectopica (se falha)'],
    },
    interacoes: [
      {
        medicamento: 'Indutores enzimaticos (rifampicina, anticonvulsivantes)',
        gravidade: 'leve',
        efeito: 'Efeito local - interacoes menos clinicamente significativas que hormonais sistemicos',
        conduta: 'Geralmente nao necessita metodo adicional, mas discutir com paciente',
      },
    ],
    gestacao: 'X',
    amamentacao: { compativel: true, observacao: 'Pode ser inserido apos 4-6 semanas pos-parto; acao predominantemente local' },
    monitorizacao: [
      'Verificar fios em 4-6 semanas pos-insercao',
      'Ensinar paciente a verificar fios mensalmente',
      'Avaliacao anual',
      'USG se fios nao visiveis/palpaveis',
    ],
    orientacoesPaciente: [
      'Verificar fios mensalmente (apos cada menstruacao se tiver)',
      'Spotting e comum nos primeiros meses',
      'Amenorreia pode ocorrer e nao significa problema',
      'Retornar se dor severa, febre, corrimento anormal',
      'Nao protege contra ISTs',
    ],
    consideracoesEspeciais: {
      idosos: 'Pode ser usado para protecao endometrial em TRH na pos-menopausa',
    },
    doencasRelacionadas: ['contracepcao', 'menorragia', 'endometriose', 'adenomiose', 'dismenorreia'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['levonorgestrel', 'DIU', 'Mirena', 'Kyleena', 'LARC', 'progestageno-local', 'SIU-LNG'],
  },

  {
    id: 'dienogeste',
    nomeGenerico: 'Dienogeste',
    nomesComerciais: ['Allurene', 'Visanne'],
    atcCode: 'G03DB08',
    rxNormCui: '1243046',
    drugBankId: 'DB09123',
    snomedCT: '703786009',
    casNumber: '65928-58-7',
    classeTerapeutica: 'hormonio',
    subclasse: 'progestageno',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Endometriose - tratamento clinico',
      'Dor pelvica associada a endometriose',
    ],
    mecanismoAcao: 'Progestageno derivado da 19-nortestosterona com forte atividade progestagenica e moderada atividade antiandrogenica. Inibe parcialmente a ovulacao (dose-dependente), promove decidualizacao e atrofia do tecido endometriotico, reduz producao local de estradiol nas lesoes de endometriose (inibe aromatase), possui atividade anti-inflamatoria local. Nao possui atividade estrogenica, androgenica ou glicocorticoide clinicamente significativa.',
    posologias: [
      {
        indicacao: 'Endometriose',
        adultos: {
          dose: '2mg',
          frequencia: '1x/dia continuamente (sem pausa)',
          observacoes: 'Iniciar em qualquer dia do ciclo. Uso continuo; nao e contraceptivo aprovado.',
        },
      },
    ],
    contraindicacoes: [
      'Tromboflebite ou doenca tromboembolica ativa',
      'Doenca arterial ou cardovascular',
      'Diabetes com comprometimento vascular',
      'Doenca hepatica grave',
      'Tumor hepatico',
      'Cancer de mama conhecido ou suspeito',
      'Sangramento vaginal nao diagnosticado',
      'Gestacao',
    ],
    precaucoes: [
      'NAO e contraceptivo - usar metodo adicional se nao desejar gestacao',
      'Spotting irregular muito comum',
      'Pode afetar DMO em uso muito prolongado (monitorar)',
      'Historia de depressao - monitorar humor',
      'Enxaqueca - monitorar',
      'Risco de TEV menor que contraceptivos combinados',
    ],
    efeitosAdversos: {
      comuns: ['Spotting/sangramento irregular (80%)', 'Amenorreia', 'Cefaleia', 'Mastalgia', 'Humor deprimido', 'Acne', 'Ganho de peso', 'Diminuicao libido'],
      graves: ['Eventos tromboembolicos (raro)', 'Depressao'],
    },
    interacoes: [
      {
        medicamento: 'Indutores de CYP3A4 (rifampicina, fenitoina, carbamazepina)',
        gravidade: 'moderada',
        efeito: 'Reducao dos niveis de dienogeste',
        mecanismo: 'Aumento do metabolismo hepatico',
        conduta: 'Eficacia pode ser reduzida',
      },
      {
        medicamento: 'Inibidores de CYP3A4 (cetoconazol, eritromicina)',
        gravidade: 'leve',
        efeito: 'Aumento dos niveis de dienogeste',
        conduta: 'Geralmente sem ajuste necessario',
      },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Dados limitados; passa para o leite' },
    monitorizacao: [
      'Dor pelvica e sintomas de endometriose',
      'Padrao de sangramento',
      'Humor (depressao)',
      'DMO se uso >2 anos em pacientes de risco',
    ],
    orientacoesPaciente: [
      'Tomar no mesmo horario diariamente, continuamente',
      'Sangramento irregular e esperado especialmente nos primeiros meses',
      'NAO e contraceptivo - usar preservativo ou outro metodo',
      'Relatar sintomas de depressao',
      'Pode levar 3-6 meses para efeito maximo na dor',
    ],
    consideracoesEspeciais: {
      idosos: 'Nao indicado apos menopausa',
    },
    doencasRelacionadas: ['endometriose', 'dor-pelvica-cronica'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['dienogeste', 'Allurene', 'Visanne', 'endometriose', 'progestageno', 'tratamento-clinico'],
  },

  {
    id: 'drospirenona-isolada',
    nomeGenerico: 'Drospirenona (pilula isolada)',
    nomesComerciais: ['Slynd', 'Slinda'],
    atcCode: 'G03AC10',
    rxNormCui: '2181207',
    drugBankId: 'DB01395',
    snomedCT: '1156247001',
    casNumber: '67392-87-4',
    classeTerapeutica: 'contraceptivo',
    subclasse: 'progestageno',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Contracepcao em mulheres com contraindicacao ou intolerancia a estrogenos',
      'Contracepcao durante amamentacao',
    ],
    mecanismoAcao: 'Progestageno sintetico derivado da espironolactona com forte atividade antialdosterona (antimineralocorticoide) e antiandrogencia. Inibe ovulacao consistentemente (diferente de outras pilulas progestageno-only como desogestrel que dependem mais do muco cervical). Eficacia similar a contraceptivos combinados. Janela de esquecimento de 24 horas (vs 3h de outras pilulas progestageno).',
    posologias: [
      {
        indicacao: 'Contracepcao',
        adultos: {
          dose: '4mg',
          frequencia: '1x/dia continuamente (24 dias ativos + 4 dias placebo)',
          doseMaxima: '4mg/dia',
          observacoes: 'Tomar no mesmo horario. Janela de 24h para esquecimento (mais permissiva que outras pilulas de progestageno).',
        },
      },
    ],
    contraindicacoes: [
      'Insuficiencia renal',
      'Insuficiencia adrenal',
      'Doenca hepatica grave',
      'Cancer de mama',
      'Sangramento uterino nao diagnosticado',
      'Uso de inibidores fortes de CYP3A4 (aumenta potassio)',
    ],
    precaucoes: [
      'RISCO DE HIPERCALEMIA - nao usar com poupadores de potassio, IECA, BRA em pacientes de risco',
      'Evitar em DRC ou predisposicao a hipercalemia',
      'TEV: risco menor que ACO combinado, mas nao zero',
      'Monitorar potassio se fatores de risco',
      'Pode melhorar acne e sintomas de SOP (efeito antiandrogenico)',
    ],
    efeitosAdversos: {
      comuns: ['Sangramento irregular', 'Acne (pode melhorar ou piorar)', 'Cefaleia', 'Nausea', 'Mastalgia', 'Alteracoes de humor'],
      graves: ['Hipercalemia', 'TEV (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes de CYP3A4 (cetoconazol, itraconazol)',
        gravidade: 'contraindicada',
        efeito: 'Aumento significativo dos niveis de drospirenona - risco de hipercalemia',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Diureticos poupadores de potassio, IECA, BRA',
        gravidade: 'moderada',
        efeito: 'Risco aumentado de hipercalemia',
        mecanismo: 'Efeito antimineralocorticoide da drospirenona',
        conduta: 'Monitorar potassio serico; considerar alternativa',
      },
      {
        medicamento: 'Suplementos de potassio',
        gravidade: 'moderada',
        efeito: 'Hipercalemia',
        conduta: 'Evitar ou monitorar potassio',
      },
      {
        medicamento: 'Indutores de CYP3A4 (rifampicina)',
        gravidade: 'moderada',
        efeito: 'Reducao dos niveis de drospirenona',
        conduta: 'Usar metodo adicional',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Sem ajuste' },
      { tfg: '<60', ajuste: 'Contraindicado - risco de hipercalemia' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: true, observacao: 'Pode ser usada durante amamentacao; passar para leite em pequenas quantidades' },
    monitorizacao: [
      'Potassio serico se fatores de risco (DRC, uso de IECA/BRA/poupadores K+)',
      'Padrao menstrual',
      'PA',
    ],
    orientacoesPaciente: [
      'Tomar no mesmo horario diariamente',
      'Janela de esquecimento de 24h (mais flexivel)',
      'Pode ajudar com retencao liquida e acne',
      'Evitar suplementos de potassio e substitutos de sal',
      'Informar se usa medicamentos para pressao alta',
    ],
    consideracoesEspeciais: {
      idosos: 'Nao aplicavel (contracepcao)',
      hepatopatas: 'Contraindicado em hepatopatia grave',
    },
    doencasRelacionadas: ['contracepcao', 'sop'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['drospirenona', 'Slynd', 'progestageno-isolado', 'antimineralocorticoide', 'antiandrogenico'],
  },

  // =============================================================================
  // TERAPIA HORMONAL DA MENOPAUSA
  // =============================================================================
  {
    id: 'estradiol-transdermico',
    nomeGenerico: 'Estradiol transdermico',
    nomesComerciais: ['Systen', 'Estraderm', 'Oestrogel', 'Sandrena'],
    atcCode: 'G03CA03',
    rxNormCui: '310196',
    drugBankId: 'DB00783',
    snomedCT: '126108003',
    casNumber: '50-28-2',
    classeTerapeutica: 'hormonio',
    subclasse: 'estrogeno',
    rename: false,
    apresentacoes: [
      { forma: 'adesivo', concentracao: '25mcg/dia', disponivelSUS: false },
      { forma: 'adesivo', concentracao: '50mcg/dia', disponivelSUS: false },
      { forma: 'adesivo', concentracao: '100mcg/dia', disponivelSUS: false },
      { forma: 'gel_topico', concentracao: '0.06% (1mg/g)', disponivelSUS: false },
    ],
    indicacoes: [
      'Sintomas vasomotores da menopausa (fogachos, sudorese noturna)',
      'Atrofia urogenital',
      'Prevencao de osteoporose em mulheres pos-menopausa de alto risco',
      'Insuficiencia ovariana prematura',
    ],
    mecanismoAcao: 'Estrogeno natural (17-beta-estradiol) administrado por via transdermica, evitando o metabolismo de primeira passagem hepatica. Resulta em niveis mais fisiologicos de estradiol:estroma (similar ao pre-menopausa) e menor estimulo de fatores de coagulacao hepaticos comparado a via oral. Atua em receptores estrogenicos em multiplos tecidos aliviando sintomas vasomotores, melhorando trofismo urogenital e mantendo DMO.',
    posologias: [
      {
        indicacao: 'Sintomas vasomotores',
        adultos: {
          dose: 'Adesivo: iniciar 25-50mcg/dia, ajustar conforme resposta; Gel: 1-2g/dia',
          frequencia: 'Adesivo: trocar 2x/semana (ou 1x/semana para algumas marcas); Gel: diariamente',
          observacoes: 'OBRIGATORIO associar progestageno se utero presente (protecao endometrial). Usar menor dose efetiva pelo menor tempo necessario.',
        },
      },
    ],
    contraindicacoes: [
      'Cancer de mama conhecido ou suspeito',
      'Neoplasia estrogeno-dependente conhecida',
      'Sangramento vaginal nao diagnosticado',
      'TEV ou TEP ativa ou historia de',
      'Doenca tromboembolica arterial ativa (AVC, IAM recente)',
      'Doenca hepatica ativa ou grave',
      'Hipersensibilidade',
      'Porfiria',
    ],
    precaucoes: [
      'SEMPRE associar progestageno se utero intacto (prevenir cancer endometrial)',
      'Risco de TEV: menor que via oral, mas ainda presente',
      'Risco de cancer de mama: aumenta com duracao do uso (>5 anos)',
      'Monitorar lipidios e funcao hepatica',
      'Descontinuar se trombose, ictericia ou enxaqueca nova/piorando',
      'Historia familiar forte de cancer de mama',
      'Endometriose, leiomioma - estrogeno pode estimular',
    ],
    efeitosAdversos: {
      comuns: ['Mastalgia', 'Cefaleia', 'Irritacao no local do adesivo', 'Nausea (menos que oral)', 'Sangramento irregular'],
      graves: ['TEV/TEP', 'AVC', 'Cancer de mama (uso prolongado)', 'Cancer de endometrio (se nao usar progestageno)', 'Colecistite'],
    },
    interacoes: [
      {
        medicamento: 'Indutores de CYP3A4 (rifampicina, fenitoina, carbamazepina)',
        gravidade: 'moderada',
        efeito: 'Via transdermica: menor impacto que oral, mas pode reduzir niveis',
        conduta: 'Monitorar sintomas; ajustar dose se necessario',
      },
      {
        medicamento: 'Inibidores de aromatase',
        gravidade: 'grave',
        efeito: 'Antagonismo farmacologico',
        conduta: 'Combinacao nao faz sentido clinico',
      },
      {
        medicamento: 'Levotiroxina',
        gravidade: 'leve',
        efeito: 'Estrogeno pode aumentar TBG',
        conduta: 'Pode necessitar ajuste da dose de levotiroxina',
      },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Reduz quantidade e qualidade do leite; usar apos desmame' },
    monitorizacao: [
      'Mamografia anual',
      'Exame ginecologico anual',
      'PA periodicamente',
      'Avaliacao de sangramento anormal',
      'DMO se indicacao de prevencao de osteoporose',
    ],
    orientacoesPaciente: [
      'Aplicar adesivo em pele limpa, seca, sem pelos (nao usar no seio)',
      'Alternar local de aplicacao',
      'Gel: aplicar em bracos ou coxas; deixar secar antes de vestir',
      'Relatar sangramento vaginal anormal',
      'Realizar mamografia anualmente',
      'Menor dose pelo menor tempo necessario',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco CV; individualizar decisao; via transdermica preferivel se >60 anos ou >10 anos pos-menopausa',
      hepatopatas: 'Via transdermica preferivel por evitar primeira passagem hepatica',
    },
    doencasRelacionadas: ['menopausa', 'sintomas-vasomotores', 'atrofia-urogenital', 'osteoporose', 'iop'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['estradiol', 'TRH', 'menopausa', 'transdermico', 'patch', 'gel', 'fogachos'],
  },

  {
    id: 'tibolona',
    nomeGenerico: 'Tibolona',
    nomesComerciais: ['Livial', 'Libiam'],
    atcCode: 'G03CX01',
    rxNormCui: '37418',
    drugBankId: 'DB00269',
    snomedCT: '109047005',
    casNumber: '5630-53-5',
    classeTerapeutica: 'hormonio',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2.5mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Sintomas vasomotores da menopausa',
      'Prevencao de osteoporose na pos-menopausa',
      'Melhora da libido na pos-menopausa',
    ],
    mecanismoAcao: 'Esteroide sintetico com atividade mista estrogencia, progestagenica e androgenica tecido-especifica. Metabolizada em 3 metabolitos ativos com diferentes atividades: 3-alfa-OH e 3-beta-OH (atividade estrogenica) e isomero delta-4 (atividade progestagenica e androgenica). Alivia sintomas menopausais, nao estimula endometrio significativamente (nao requer progestageno adicional), e pode melhorar libido devido ao componente androgenico.',
    posologias: [
      {
        indicacao: 'Sintomas da menopausa e prevencao osteoporose',
        adultos: {
          dose: '2.5mg',
          frequencia: '1x/dia continuamente',
          observacoes: 'Iniciar apenas 12 meses apos ultima menstruacao (para evitar sangramento irregular). NAO requer adicao de progestageno mesmo com utero intacto.',
        },
      },
    ],
    contraindicacoes: [
      'Cancer de mama atual ou historico',
      'Tumor estrogeno-dependente',
      'TEV ativa ou historica',
      'Doenca cardiovascular ou cerebrovascular',
      'Sangramento vaginal nao diagnosticado',
      'Doenca hepatica grave',
      'Menos de 12 meses desde ultima menstruacao',
      'Porfiria',
    ],
    precaucoes: [
      'Aumenta risco de AVC (especialmente em >60 anos)',
      'Estudo LIBERATE: aumentou recorrencia de cancer de mama em sobreviventes',
      'Pode estimular endometriose residual',
      'Pode estimular leiomiomas',
      'Efeitos androgenicos (acne, hirsutismo) possiveis',
      'Nao iniciar antes de 12 meses de amenorreia',
    ],
    efeitosAdversos: {
      comuns: ['Dor abdominal', 'Sangramento vaginal', 'Leucorreia', 'Mastalgia', 'Prurido genital', 'Acne', 'Ganho de peso', 'Cefaleia'],
      graves: ['AVC', 'Cancer de mama (em sobreviventes)', 'TEV', 'Cancer de endometrio (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Anticoagulantes (varfarina)',
        gravidade: 'moderada',
        efeito: 'Pode potencializar efeito anticoagulante',
        conduta: 'Monitorar INR ao iniciar/descontinuar tibolona',
      },
      {
        medicamento: 'Indutores enzimaticos (rifampicina, anticonvulsivantes)',
        gravidade: 'moderada',
        efeito: 'Podem reduzir eficacia da tibolona',
        conduta: 'Monitorar sintomas',
      },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Nao indicado durante amamentacao' },
    monitorizacao: [
      'Mamografia anual',
      'Exame ginecologico anual',
      'Avaliacao de sangramento vaginal',
      'Avaliacao de sintomas androgenicos',
      'DMO se indicacao de osteoporose',
    ],
    orientacoesPaciente: [
      'Tomar no mesmo horario diariamente',
      'NAO usar se tiver sangramento vaginal nao investigado',
      'Realizar mamografia anualmente',
      'Pode melhorar libido e energia',
      'Relatar qualquer sangramento vaginal',
    ],
    consideracoesEspeciais: {
      idosos: 'Risco aumentado de AVC em >60 anos; usar com cautela',
    },
    doencasRelacionadas: ['menopausa', 'osteoporose', 'sintomas-vasomotores', 'libido'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['tibolona', 'Livial', 'TRH', 'menopausa', 'STEAR', 'libido'],
  },

  {
    id: 'ospemifeno',
    nomeGenerico: 'Ospemifeno',
    nomesComerciais: ['Osphena', 'Senshio'],
    atcCode: 'G03XC05',
    rxNormCui: '1367439',
    drugBankId: 'DB04938',
    snomedCT: '710116001',
    casNumber: '128607-22-7',
    classeTerapeutica: 'hormonio',
    subclasse: 'serm',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '60mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Dispareunia moderada a grave por atrofia vulvovaginal da menopausa',
      'Secura vaginal da pos-menopausa',
    ],
    mecanismoAcao: 'Modulador seletivo do receptor de estrogeno (SERM) com atividade agonista no tecido vaginal e osseo, e atividade antagonista/neutra no endometrio e mama. Aumenta maturacao do epitelio vaginal, melhora lubrificacao e reduz pH vaginal, aliviando dispareunia e secura sem estimular significativamente o endometrio.',
    posologias: [
      {
        indicacao: 'Atrofia vulvovaginal / dispareunia',
        adultos: {
          dose: '60mg',
          frequencia: '1x/dia com alimentos',
          observacoes: 'Tomar COM ALIMENTOS para absorcao adequada. Beneficio pode levar semanas a ser percebido.',
        },
      },
    ],
    contraindicacoes: [
      'TEV ativa ou historica (TVP, EP)',
      'AVC ou IAM ativos ou historicos',
      'Sangramento uterino nao diagnosticado',
      'Cancer de mama conhecido ou suspeito',
      'Cancer de endometrio',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'BLACK BOX: Risco de TEV e AVC (classe SERM)',
      'Monitorar endometrio se sangramento anormal',
      'Pode haver espessamento endometrial (benigno)',
      'Evitar em imobilizacao prolongada (risco TEV aumentado)',
      'Fogachos podem ocorrer ou piorar inicialmente',
    ],
    efeitosAdversos: {
      comuns: ['Fogachos (7%)', 'Corrimento vaginal', 'Espasmos musculares', 'Hiperhidrose', 'Secrecao genital'],
      graves: ['TEV', 'AVC', 'Hiperplasia endometrial'],
    },
    interacoes: [
      {
        medicamento: 'Estrogenos',
        gravidade: 'grave',
        efeito: 'Nao estudado; nao combinar',
        conduta: 'Nao usar concomitantemente',
      },
      {
        medicamento: 'Inibidores de CYP3A4/CYP2C9 (fluconazol, cetoconazol)',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de ospemifeno',
        conduta: 'Usar com cautela; monitorar efeitos adversos',
      },
      {
        medicamento: 'Indutores de CYP3A4/CYP2C9 (rifampicina)',
        gravidade: 'moderada',
        efeito: 'Reducao da eficacia',
        conduta: 'Monitorar resposta terapeutica',
      },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Nao indicado em mulheres em idade fertil' },
    monitorizacao: [
      'Sangramento vaginal anormal - investigar',
      'Sintomas de TEV (dor em pernas, dispneia)',
      'Resposta clinica (melhora da dispareunia)',
    ],
    orientacoesPaciente: [
      'SEMPRE tomar com alimentos para absorcao adequada',
      'Pode levar algumas semanas para notar melhora',
      'Relatar sangramento vaginal inesperado',
      'Relatar dor nas pernas ou dificuldade para respirar',
      'Nao e contraceptivo; nao previne gravidez',
    ],
    consideracoesEspeciais: {
      idosos: 'Principal populacao-alvo (pos-menopausa); monitorar risco CV',
    },
    doencasRelacionadas: ['atrofia-vulvovaginal', 'dispareunia', 'menopausa', 'sindrome-geniturinaria-menopausa'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['ospemifeno', 'Osphena', 'SERM', 'atrofia-vaginal', 'dispareunia', 'GSM'],
  },

  // =============================================================================
  // TRATAMENTO DE ENDOMETRIOSE E MIOMA
  // =============================================================================
  {
    id: 'elagolix',
    nomeGenerico: 'Elagolix',
    nomesComerciais: ['Orilissa'],
    atcCode: 'H01CC02',
    rxNormCui: '2049100',
    drugBankId: 'DB11979',
    snomedCT: '1145447005',
    casNumber: '834153-87-6',
    classeTerapeutica: 'hormonio',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '150mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Dor moderada a grave associada a endometriose',
      'Sangramento menstrual intenso associado a leiomiomas uterinos (com add-back therapy)',
    ],
    mecanismoAcao: 'Antagonista oral do receptor de GnRH. Bloqueia competitivamente o receptor de GnRH na hipofise, suprimindo rapidamente a liberacao de LH e FSH, resultando em reducao dose-dependente de estradiol. Dose de 150mg: supressao parcial (estradiol ~40pg/mL, preserva alguma funcao ovariana); dose de 200mg 2x/dia: supressao mais profunda. Para miomas, usar 300mg 2x/dia + add-back (estrogeno + progestageno) para prevenir perda ossea.',
    posologias: [
      {
        indicacao: 'Endometriose',
        adultos: {
          dose: '150mg 1x/dia (supressao parcial) ou 200mg 2x/dia (supressao maior)',
          frequencia: '1-2x/dia',
          doseMaxima: '200mg 2x/dia',
          observacoes: 'Dose 150mg: max 24 meses; Dose 200mg 2x/dia: max 6 meses (maior risco de perda ossea).',
        },
      },
      {
        indicacao: 'Leiomiomas uterinos com sangramento intenso',
        adultos: {
          dose: '300mg 2x/dia + add-back therapy obrigatoria (estradiol 1mg + noretisterona 0.5mg/dia)',
          frequencia: '2x/dia com add-back diario',
          doseMaxima: '300mg 2x/dia por max 24 meses',
          observacoes: 'Add-back therapy OBRIGATORIA para miomas para proteger osso.',
        },
      },
    ],
    contraindicacoes: [
      'Gestacao conhecida ou suspeita',
      'Osteoporose conhecida',
      'Insuficiencia hepatica grave (Child-Pugh C)',
      'Uso de inibidores fortes de OATP1B1 (ciclosporina, genfibrozila)',
    ],
    precaucoes: [
      'PERDA DE DMO: dose-dependente e tempo-dependente; pode nao ser totalmente reversivel',
      'Nao exceder duracao maxima de tratamento',
      'Suicidio e humor: monitorar (estudos em andamento)',
      'Alteracoes lipidicas podem ocorrer',
      'Nao e contraceptivo - usar metodo nao-hormonal',
      'Fogachos e suores noturnos esperados (efeito hipoestrogenico)',
    ],
    efeitosAdversos: {
      comuns: ['Fogachos (24-46%)', 'Cefaleia', 'Nausea', 'Insonia', 'Amenorreia', 'Ansiedade', 'Artralgia', 'Depressao'],
      graves: ['Perda ossea', 'Ideacao suicida (raro)', 'Hepatotoxicidade (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores de OATP1B1 (ciclosporina, genfibrozila)',
        gravidade: 'contraindicada',
        efeito: 'Aumento significativo dos niveis de elagolix',
        mecanismo: 'Elagolix e substrato de OATP1B1',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Indutores de CYP3A (rifampicina)',
        gravidade: 'moderada',
        efeito: 'Reducao dos niveis de elagolix',
        conduta: 'Evitar uso cronico concomitante',
      },
      {
        medicamento: 'Digoxina (substrato P-gp)',
        gravidade: 'leve',
        efeito: 'Pode aumentar niveis de digoxina',
        conduta: 'Monitorar niveis de digoxina',
      },
      {
        medicamento: 'Rosuvastatina',
        gravidade: 'leve',
        efeito: 'Aumento da exposicao a rosuvastatina',
        conduta: 'Monitorar efeitos adversos de estatina',
      },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: [
      'DMO basal e durante tratamento (se uso >6 meses)',
      'Funcao hepatica',
      'Lipidios',
      'Humor e sintomas depressivos',
      'Resposta clinica (dor, sangramento)',
    ],
    orientacoesPaciente: [
      'Usar metodo contraceptivo nao-hormonal durante tratamento',
      'Fogachos sao esperados (significa que esta funcionando)',
      'Relatar mudancas de humor ou pensamentos suicidas',
      'Nao usar alem do tempo prescrito (risco para ossos)',
      'Ingerir calcio e vitamina D adequados',
    ],
    consideracoesEspeciais: {
      hepatopatas: 'Moderada (Child-Pugh B): max 150mg 1x/dia; Grave: contraindicado',
    },
    doencasRelacionadas: ['endometriose', 'leiomioma', 'mioma-uterino', 'dor-pelvica'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['elagolix', 'Orilissa', 'GnRH-antagonista', 'endometriose', 'mioma', 'leiomioma'],
  },

  {
    id: 'relugolix',
    nomeGenerico: 'Relugolix (combinacao)',
    nomesComerciais: ['Myfembree', 'Ryeqo'],
    atcCode: 'G03XA02',
    rxNormCui: '2473478',
    drugBankId: 'DB14703',
    snomedCT: '1217566007',
    casNumber: '737789-87-6',
    classeTerapeutica: 'hormonio',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: 'Relugolix 40mg + Estradiol 1mg + Noretisterona 0.5mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Sangramento menstrual intenso associado a leiomiomas uterinos',
      'Dor moderada a grave associada a endometriose (Ryeqo)',
    ],
    mecanismoAcao: 'Combinacao fixa de: 1) Relugolix - antagonista oral do receptor GnRH que suprime rapidamente gonadotrofinas e esteroides sexuais; 2) Estradiol - add-back de estrogeno para minimizar sintomas hipoestrogenicos e perda ossea; 3) Noretisterona - progestageno para protecao endometrial. Esta combinacao permite supressao de doenca estrogeno-dependente enquanto mantem estrogeno suficiente para saude ossea e controle de sintomas.',
    posologias: [
      {
        indicacao: 'Miomas uterinos com sangramento',
        adultos: {
          dose: '1 comprimido (40mg relugolix + 1mg estradiol + 0.5mg noretisterona)',
          frequencia: '1x/dia',
          doseMaxima: '1 comprimido/dia',
          observacoes: 'Pode usar por ate 24 meses. Iniciar com inicio do ciclo menstrual (se possivel) ou apos teste de gravidez negativo.',
        },
      },
      {
        indicacao: 'Endometriose (Ryeqo)',
        adultos: {
          dose: '1 comprimido/dia',
          frequencia: '1x/dia',
          observacoes: 'Tratamento continuo; duracao conforme resposta clinica',
        },
      },
    ],
    contraindicacoes: [
      'Gestacao conhecida ou suspeita',
      'Osteoporose',
      'Historia de TEV ou TEP',
      'Historia de AVC ou IAM',
      'Doenca trombofila conhecida',
      'Cancer de mama ou outro cancer estrogeno-dependente',
      'Doenca hepatica ativa ou tumor hepatico',
      'Sangramento uterino nao diagnosticado',
      'Uso de inibidores fortes de OATP1B1/1B3',
    ],
    precaucoes: [
      'Risco de TEV - evitar em obesidade, tabagismo, imobilizacao',
      'Monitorar DMO em uso prolongado',
      'Pode causar suicidio/humor deprimido - monitorar',
      'Alteracoes lipidicas',
      'Nao e contraceptivo - usar metodo nao-hormonal adicional se necessario',
      'Enxaqueca com aura - evitar',
    ],
    efeitosAdversos: {
      comuns: ['Fogachos (reduzidos pelo add-back)', 'Cefaleia', 'Sangramento uterino', 'Alopecia', 'Diminuicao libido', 'Alteracao humor'],
      graves: ['TEV/AVC (risco do estrogeno)', 'Perda ossea', 'Depressao/ideacao suicida', 'Reacoes hepaticas'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores de OATP1B1/1B3 (ciclosporina)',
        gravidade: 'contraindicada',
        efeito: 'Aumento significativo dos niveis de relugolix',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Indutores de P-gp ou CYP3A (rifampicina)',
        gravidade: 'grave',
        efeito: 'Reducao significativa dos niveis de relugolix',
        conduta: 'Uso concomitante nao recomendado',
      },
      {
        medicamento: 'Inibidores de P-gp (eritromicina, ciclosporina)',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de relugolix',
        conduta: 'Cautela; pode ser necessario ajuste',
      },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado durante amamentacao' },
    monitorizacao: [
      'Sangramento e resposta clinica',
      'DMO se uso >1 ano',
      'Humor e sintomas psiquiatricos',
      'Perfil lipidico',
      'Sinais de TEV',
    ],
    orientacoesPaciente: [
      'Tomar 1x ao dia, com ou sem alimentos',
      'Usar contracepcao nao-hormonal se nao desejar gravidez',
      'Relatar depressao, mudancas de humor',
      'Relatar dor nas pernas ou dificuldade respiratoria',
      'Add-back esta incluido no comprimido (nao precisa de outro)',
    ],
    consideracoesEspeciais: {
      hepatopatas: 'Contraindicado em doenca hepatica ativa',
    },
    doencasRelacionadas: ['leiomioma', 'mioma-uterino', 'sangramento-uterino-anormal', 'endometriose'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['relugolix', 'Myfembree', 'Ryeqo', 'GnRH-antagonista', 'add-back', 'mioma', 'endometriose'],
  },

  // =============================================================================
  // FERTILIDADE
  // =============================================================================
  {
    id: 'letrozol-inducao-ovulacao',
    nomeGenerico: 'Letrozol (inducao de ovulacao)',
    nomesComerciais: ['Femara'],
    atcCode: 'L02BG04',
    rxNormCui: '72965',
    drugBankId: 'DB01006',
    snomedCT: '386911004',
    casNumber: '112809-51-5',
    classeTerapeutica: 'indutor_ovulacao',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2.5mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Inducao de ovulacao em SOP (off-label, mas primeira linha ASRM/ESHRE)',
      'Infertilidade anovulatoria',
      'Superovulacao para inseminacao intrauterina',
    ],
    mecanismoAcao: 'Inibidor da aromatase de terceira geracao. Bloqueia a conversao de androgenos em estrogenos, reduzindo feedback negativo de estrogeno no hipotalamo/hipofise. Isto resulta em aumento de FSH endogeno, estimulando desenvolvimento folicular. Comparado ao clomifeno: menor taxa de gestacoes multiplas, melhor perfil endometrial, maior taxa de nascidos vivos em SOP.',
    posologias: [
      {
        indicacao: 'Inducao ovulacao / SOP',
        adultos: {
          dose: '2.5-7.5mg/dia',
          frequencia: 'Por 5 dias, iniciando D3-D5 do ciclo',
          doseMaxima: '7.5mg/dia',
          observacoes: 'Iniciar 2.5mg; pode aumentar para 5mg ou 7.5mg em ciclos subsequentes se nao ovular. Monitorar com USG para avaliar resposta folicular.',
        },
      },
    ],
    contraindicacoes: [
      'Gestacao (teratogenico)',
      'Pre-menopausa (para indicacao de cancer de mama)',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'USO OFF-LABEL para fertilidade (aprovado para cancer de mama)',
      'Monitorar com ultrassom para evitar hiperestimulacao',
      'Risco de gestacao multipla (menor que clomifeno, mas existe)',
      'Pode causar fogachos, fadiga',
      'Evitar contato com gestantes (comprimidos)',
    ],
    efeitosAdversos: {
      comuns: ['Fogachos', 'Fadiga', 'Cefaleia', 'Tontura', 'Nausea'],
      graves: ['Sindrome de hiperestimulacao ovariana (rara)', 'Gestacao multipla'],
    },
    interacoes: [
      {
        medicamento: 'Tamoxifeno',
        gravidade: 'moderada',
        efeito: 'Tamoxifeno pode reduzir niveis de letrozol',
        mecanismo: 'Inducao de CYP3A4',
        conduta: 'Evitar combinacao',
      },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado - pode suprimir lactacao e efeitos no lactente desconhecidos' },
    monitorizacao: [
      'USG transvaginal para monitorar desenvolvimento folicular',
      'Numero de foliculos dominantes (evitar multiplos)',
      'Espessura endometrial',
      'LH ou kit de ovulacao para timing',
    ],
    orientacoesPaciente: [
      'Tomar por 5 dias conforme prescrito (geralmente D3-D7 ou D5-D9)',
      'USG sera feito para monitorar resposta',
      'Relacoes no periodo fertil conforme orientacao',
      'Risco menor de gemeos que clomifeno, mas existe',
      'Fogachos sao temporarios',
    ],
    consideracoesEspeciais: {
      hepatopatas: 'Usar com cautela em insuficiencia hepatica grave',
    },
    doencasRelacionadas: ['sop', 'anovulacao', 'infertilidade', 'inducao-ovulacao'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['letrozol', 'Femara', 'inducao-ovulacao', 'SOP', 'infertilidade', 'aromatase', 'off-label'],
  },

  {
    id: 'progesterona-micronizada-suporte-luteal',
    nomeGenerico: 'Progesterona micronizada (suporte de fase lutea)',
    nomesComerciais: ['Utrogestan', 'Evocanil', 'Prometrium', 'Crinone'],
    atcCode: 'G03DA04',
    rxNormCui: '8803',
    drugBankId: 'DB00396',
    snomedCT: '126098003',
    casNumber: '57-83-0',
    classeTerapeutica: 'hormonio',
    subclasse: 'progestageno',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '100mg (oral ou vaginal)', disponivelSUS: false },
      { forma: 'capsula', concentracao: '200mg (oral ou vaginal)', disponivelSUS: false },
      { forma: 'gel_vaginal', concentracao: '8% (90mg/aplicador) - Crinone', disponivelSUS: false },
    ],
    indicacoes: [
      'Suporte de fase lutea em reproducao assistida (FIV)',
      'Suporte de fase lutea apos inducao de ovulacao',
      'Ameaca de abortamento (controverso)',
      'Insuficiencia de corpo luteo',
      'Protecao endometrial em TRH',
    ],
    mecanismoAcao: 'Progesterona natural micronizada para melhor absorcao. Prepara e mantem o endometrio em fase secretora, essencial para implantacao e manutencao da gestacao inicial. Via vaginal: altas concentracoes uterinas locais com menores niveis sistemicos (preferida em FIV). Via oral: boa absorcao mas maior metabolismo de primeira passagem e efeitos sedativos.',
    posologias: [
      {
        indicacao: 'Suporte luteal em FIV',
        adultos: {
          dose: 'Vaginal: 200mg 2-3x/dia ou gel 90mg 1-2x/dia; Oral: 200mg 2-3x/dia',
          frequencia: 'Iniciar no dia da captacao oocitaria ou transferencia; continuar ate 10-12 semanas de gestacao',
          observacoes: 'Via vaginal preferida para FIV (acao local, menos sedacao). Continuar ate placenta assumir producao (~12 sem).',
        },
      },
      {
        indicacao: 'Ameaca de aborto',
        adultos: {
          dose: '200-400mg vaginal',
          frequencia: '2-3x/dia',
          observacoes: 'Evidencia limitada; beneficio provavel em perdas recorrentes e concepnao por FIV',
        },
      },
      {
        indicacao: 'TRH (protecao endometrial)',
        adultos: {
          dose: '100-200mg oral ao deitar',
          frequencia: 'Por 12-14 dias/mes (sequencial) ou diariamente (continuo)',
          observacoes: 'Usar com estrogeno se utero presente',
        },
      },
    ],
    contraindicacoes: [
      'Sangramento vaginal nao diagnosticado',
      'Cancer de mama',
      'Tromboflebite ativa',
      'Doenca hepatica aguda',
      'Alergia a amendoim (algumas formulacoes usam oleo de amendoim)',
      'Porfiria',
    ],
    precaucoes: [
      'Via oral: sedacao, tontura (tomar ao deitar)',
      'Via vaginal: menos efeitos sistemicos, preferida em gestantes',
      'Pode causar sangramento de escape',
      'Nao usar para diagnostico de gravidez',
      'Verificar alergia a amendoim antes de prescrever',
    ],
    efeitosAdversos: {
      comuns: ['Sonolencia, tontura (via oral)', 'Mastalgia', 'Cefaleia', 'Irritacao vaginal (via vaginal)', 'Distensao abdominal', 'Nausea'],
      graves: ['Reacoes alergicas (oleo de amendoim)', 'Trombose (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Indutores de CYP3A4 (rifampicina, carbamazepina)',
        gravidade: 'moderada',
        efeito: 'Pode reduzir niveis de progesterona (mais relevante via oral)',
        conduta: 'Via vaginal menos afetada; monitorar',
      },
      {
        medicamento: 'Inibidores de CYP3A4 (cetoconazol)',
        gravidade: 'leve',
        efeito: 'Pode aumentar niveis',
        conduta: 'Geralmente sem ajuste necessario',
      },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Hormonio natural; compativel com amamentacao' },
    monitorizacao: [
      'USG para viabilidade gestacional (se suporte luteal em FIV)',
      'Sintomas de sedacao (via oral)',
      'Resposta clinica',
    ],
    orientacoesPaciente: [
      'Via oral: tomar ao deitar (causa sonolencia)',
      'Via vaginal: inserir profundamente; pode haver secrecao residual',
      'Continuar ate orientacao medica (nao parar por conta propria)',
      'Via vaginal nao afeta relacoes sexuais (pode usar apos)',
      'Informar se alergia a amendoim/soja',
    ],
    consideracoesEspeciais: {
      hepatopatas: 'Via oral: evitar em doenca hepatica significativa; vaginal: preferivel',
    },
    doencasRelacionadas: ['suporte-luteal', 'fiv', 'reproducao-assistida', 'ameaca-aborto', 'trh'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['progesterona', 'Utrogestan', 'suporte-luteal', 'FIV', 'fase-lutea', 'gestacao'],
  },

  // =============================================================================
  // OUTROS
  // =============================================================================
  {
    id: 'ulipristal-acetato',
    nomeGenerico: 'Acetato de Ulipristal',
    nomesComerciais: ['Ella', 'EllaOne', 'Esmya'],
    atcCode: 'G03AD02',
    rxNormCui: '1000125',
    drugBankId: 'DB08867',
    snomedCT: '698021005',
    casNumber: '126784-99-4',
    classeTerapeutica: 'contraceptivo',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '30mg (Ella - emergencia)', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '5mg (Esmya - miomas)', disponivelSUS: false },
    ],
    indicacoes: [
      'Contracepcao de emergencia ate 120 horas (5 dias) apos relacao desprotegida (Ella 30mg)',
      'Tratamento pre-operatorio de sintomas de leiomioma uterino (Esmya 5mg - SUSPENSO/restrito em alguns paises por hepatotoxicidade)',
    ],
    mecanismoAcao: 'Modulador seletivo do receptor de progesterona (SPRM) com efeitos agonistas e antagonistas tecido-especificos. Como contraceptivo de emergencia: inibe ou atrasa ovulacao mesmo quando LH ja comecou a subir (mais eficaz que levonorgestrel nesta fase). Como tratamento de miomas: reduz sangramento e volume uterino atraves de efeitos diretos no mioma (antiproliferativo, pro-apoptotico) e endometrio.',
    posologias: [
      {
        indicacao: 'Contracepcao de emergencia',
        adultos: {
          dose: '30mg',
          frequencia: 'Dose unica, ate 120h (5 dias) apos relacao desprotegida',
          observacoes: 'Quanto mais cedo, mais eficaz. Eficaz mesmo ate D5. Se vomitar em 3h, repetir dose.',
        },
      },
      {
        indicacao: 'Leiomioma uterino (Esmya) - ATENCAO: indicacao restrita em alguns paises',
        adultos: {
          dose: '5mg',
          frequencia: '1x/dia por ate 3 meses (pre-operatorio)',
          doseMaxima: '1 curso de 3 meses (anteriormente permitia-se cursos intermitentes)',
          observacoes: 'ALERTA HEPATOTOXICIDADE: Esmya foi suspenso/restrito na Europa apos casos de insuficiencia hepatica grave. Verificar regulamentacao local.',
        },
      },
    ],
    contraindicacoes: [
      'Gestacao conhecida ou suspeita (para miomas)',
      'Gestacao apos uso de emergencia nao contraindica (nao e abortivo)',
      'Asma grave nao controlada',
      'Doenca hepatica (para Esmya)',
      'Aleitamento materno (para Esmya)',
    ],
    precaucoes: [
      'NAO e abortivo - nao interrompe gestacao estabelecida',
      'Apos uso de emergencia: usar metodo barreira ate proxima menstruacao',
      'ESMYA: HEPATOTOXICIDADE - LFTs antes, durante e apos tratamento; indicacao muito restrita',
      'Interacao com contraceptivos hormonais (reduz eficacia de ambos)',
      'Nao usar repetidamente como contracepcao de rotina',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Nausea', 'Dismenorreia', 'Dor abdominal', 'Fadiga', 'Tontura', 'Atraso menstrual'],
      graves: ['Hepatotoxicidade grave (Esmya - raro mas severo)', 'Alteracoes endometriais reversiveis (PAEC)'],
    },
    interacoes: [
      {
        medicamento: 'Contraceptivos hormonais (progestagenos)',
        gravidade: 'grave',
        efeito: 'Antagonismo mutuo - reduz eficacia de ambos',
        mecanismo: 'Ulipristal bloqueia receptor de progesterona',
        conduta: 'Apos Ella: usar barreira por 14 dias ou ate proxima menstruacao; nao iniciar/continuar pilula imediatamente',
      },
      {
        medicamento: 'Indutores de CYP3A4 (rifampicina, fenitoina, carbamazepina, Hypericum)',
        gravidade: 'moderada',
        efeito: 'Pode reduzir eficacia de ulipristal',
        conduta: 'Considerar DIU de cobre como emergencia se uso recente de indutores',
      },
      {
        medicamento: 'Inibidores de CYP3A4 (cetoconazol, itraconazol, ritonavir)',
        gravidade: 'leve',
        efeito: 'Aumento dos niveis de ulipristal',
        conduta: 'Geralmente sem ajuste para dose unica de emergencia',
      },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Evitar amamentacao por 24h apos dose de emergencia; contraindicado para Esmya' },
    monitorizacao: [
      'Menstruacao apos uso de emergencia (confirmar nao-gravidez)',
      'Para Esmya (se usado): LFTs antes, mensalmente durante, e 2-4 semanas apos',
      'Funcao hepatica vigilante para Esmya',
    ],
    orientacoesPaciente: [
      'Emergencia: tomar o mais rapido possivel (eficaz ate 5 dias)',
      'Se vomitar em 3h, tomar outra dose',
      'Usar preservativo ate proxima menstruacao',
      'NAO iniciar pilula anticoncepcional imediatamente (esperar menstruacao)',
      'Nao e abortivo - nao funciona se ja estiver gravida',
      'Fazer teste de gravidez se menstruacao atrasar >7 dias',
    ],
    consideracoesEspeciais: {
      idosos: 'Nao aplicavel (indicacoes sao para idade fertil)',
    },
    doencasRelacionadas: ['contracepcao-emergencia', 'leiomioma', 'mioma'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['ulipristal', 'Ella', 'Esmya', 'SPRM', 'emergencia', 'morning-after', 'mioma', 'contracepcao-emergencia'],
  },
];
