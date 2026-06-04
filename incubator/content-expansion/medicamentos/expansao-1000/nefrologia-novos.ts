/**
 * NEFROLOGIA NOVOS - DARWIN-MFC EXPANSAO 1000
 * ============================================
 * Medicamentos para doenca renal cronica e complicacoes
 *
 * Referencias:
 * - FIDELIO-DKD / FIGARO-DKD (Finerenone)
 * - DAPA-CKD (Dapagliflozin)
 * - TEMPO 3:4 / REPRISE (Tolvaptan)
 * - EVOLVE (Cinacalcet)
 * - KDIGO CKD-MBD Guidelines 2024
 * - TREAT / CHOIR (ESAs)
 * - ALPS / HIMALAYAS (Roxadustat)
 * - OPAL-HK / AMETHYST-DN (Patiromer)
 */

import { Medicamento } from '@/lib/types/medicamento';

export const nefrologiaNovos: Partial<Medicamento>[] = [
  // =============================================================================
  // ANTAGONISTAS DE MINERALOCORTICOIDE NAO ESTEROIDAL
  // =============================================================================
  {
    id: 'finerenone',
    nomeGenerico: 'Finerenona',
    nomesComerciais: ['Kerendia'],
    atcCode: 'C03DA05',
    rxNormCui: '2468231',
    drugBankId: 'DB16121',
    snomedCT: '1179347001',
    casNumber: '1260141-27-2',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'poupador_potassio',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Doenca renal cronica associada a diabetes mellitus tipo 2',
      'Reducao do risco de declinio sustentado da TFG, ESRD e morte cardiovascular',
      'Reducao do risco de eventos cardiovasculares (IAM, AVC nao fatal)',
      'Pacientes com albuminuria (RAC >= 30mg/g)',
    ],
    mecanismoAcao: 'Antagonista seletivo nao esteroidal do receptor mineralocorticoide (MRA). Diferente da espironolactona/eplerenona, possui estrutura nao esteroidal com maior seletividade pelo MR e distribuicao tecidual preferencial para coracao e rins. Bloqueia os efeitos pro-inflamatorios e pro-fibroticos da aldosterona no rim e coracao, reduzindo albuminuria e progressao da DRC.',
    posologias: [
      {
        indicacao: 'DRC associada a DM2',
        adultos: {
          dose: '10-20mg 1x/dia baseado na TFG: TFG >=60: iniciar 20mg; TFG 25-59: iniciar 10mg',
          frequencia: '1x/dia',
          doseMaxima: '20mg/dia',
          observacoes: 'Verificar K+ serio antes de iniciar (nao iniciar se K+ >5,0mEq/L). Titular para 20mg apos 4 semanas se K+ <=4,8mEq/L e TFG estavel.',
        },
      },
    ],
    contraindicacoes: [
      'K+ serio >5,0mEq/L ao inicio',
      'Insuficiencia adrenal',
      'Uso concomitante com inibidores fortes de CYP3A4',
      'TFG <25mL/min/1,73m2',
      'Hepatopatia grave (Child-Pugh C)',
    ],
    precaucoes: [
      'Risco de hipercalemia - monitorar K+ frequentemente',
      'Ajustar/suspender se K+ >5,5mEq/L',
      'Inibidores moderados de CYP3A4 requerem ajuste de dose',
      'Evitar grapefruit/pomelo',
      'Nao iniciar durante AKI',
    ],
    efeitosAdversos: {
      comuns: ['Hipercalemia (10-15%)', 'Hipotensao', 'Hiponatremia'],
      graves: ['Hipercalemia grave (>6,0mEq/L)', 'Insuficiencia renal aguda'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes de CYP3A4 (itraconazol, cetoconazol, ritonavir)',
        gravidade: 'contraindicada',
        efeito: 'Aumento significativo dos niveis de finerenona',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Inibidores moderados de CYP3A4 (eritromicina, verapamil, diltiazem)',
        gravidade: 'grave',
        efeito: 'Aumento dos niveis de finerenona',
        conduta: 'Dose maxima 10mg/dia',
      },
      {
        medicamento: 'IECA/BRA',
        gravidade: 'moderada',
        efeito: 'Risco aditivo de hipercalemia',
        conduta: 'Monitorar K+ mais frequentemente',
      },
      {
        medicamento: 'Suplementos de potassio, outros poupadores de K+',
        gravidade: 'grave',
        efeito: 'Risco aumentado de hipercalemia',
        conduta: 'Evitar ou ajustar com monitorizacao intensiva',
      },
      {
        medicamento: 'Indutores de CYP3A4 (rifampicina, carbamazepina)',
        gravidade: 'moderada',
        efeito: 'Reducao da eficacia de finerenona',
        conduta: 'Evitar uso concomitante',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>=60', ajuste: 'Iniciar 20mg/dia' },
      { tfg: '25-59', ajuste: 'Iniciar 10mg/dia, titular para 20mg se tolerado' },
      { tfg: '<25', ajuste: 'Nao recomendado iniciar; pode continuar se ja em uso e tolerado' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Nao recomendado - dados insuficientes' },
    monitorizacao: [
      'K+ serio: antes do inicio, 4 semanas apos inicio/titulacao, periodicamente',
      'TFG basal e periodica',
      'PA',
      'Albuminuria (UACR) para avaliar resposta',
    ],
    orientacoesPaciente: [
      'Tomar 1x/dia com ou sem alimentos',
      'Evitar grapefruit e pomelo',
      'Evitar suplementos de potassio sem orientacao medica',
      'Exames de sangue frequentes para monitorar potassio',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste por idade; monitorar K+ e funcao renal',
      hepatopatas: 'Child-Pugh A/B: sem ajuste; Child-Pugh C: contraindicado',
    },
    doencasRelacionadas: ['doenca-renal-cronica', 'nefropatia-diabetica', 'drc-dkd'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['finerenone', 'MRA', 'nao-esteroidal', 'FIDELIO-DKD', 'FIGARO-DKD', 'DRC', 'diabetes', 'nefroprotetor'],
  },

  // =============================================================================
  // INIBIDORES SGLT2 PARA DRC
  // =============================================================================
  {
    id: 'dapagliflozina-ckd',
    nomeGenerico: 'Dapagliflozina',
    nomesComerciais: ['Forxiga', 'Farxiga'],
    atcCode: 'A10BK01',
    rxNormCui: '1488564',
    drugBankId: 'DB06292',
    snomedCT: '703677008',
    casNumber: '461432-26-8',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'isglt2',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Doenca renal cronica em risco de progressao (com ou sem DM2)',
      'Reducao do risco de declinio sustentado da TFG, ESRD e morte cardiovascular/renal',
      'Pacientes com TFG >=25mL/min/1,73m2 e albuminuria',
      'Insuficiencia cardiaca com FE reduzida (indicacao adicional)',
    ],
    mecanismoAcao: 'Inibidor seletivo do co-transportador sodio-glicose tipo 2 (SGLT2) no tubulo proximal renal. Alem do efeito glicossurico, promove natriurese, reducao da pressao intraglomerular, reducao da hipoxia medular renal e efeitos anti-inflamatorios/antifibroticos. Efeito nefroprotetor independente do controle glicemico (demonstrado em DRC nao diabetica no DAPA-CKD).',
    posologias: [
      {
        indicacao: 'DRC (com ou sem DM2)',
        adultos: {
          dose: '10mg',
          frequencia: '1x/dia pela manha',
          observacoes: 'Pode ser iniciado em TFG >=25 e continuado ate dialise/transplante. Efeito glicemico reduzido em TFG baixa, mas nefroprotetor mantido.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a dapagliflozina',
      'Dialise',
      'DM tipo 1 (risco de CAD)',
    ],
    precaucoes: [
      'Risco de cetoacidose diabetica (mesmo com glicemia normal - euglicemica)',
      'Infeccoes genitais fungicas (candidíase)',
      'Infeccoes urinarias',
      'Hipotensao volumetrica - especialmente com diureticos',
      'Gangrena de Fournier (raro)',
      'Suspender antes de cirurgias maiores',
    ],
    efeitosAdversos: {
      comuns: ['Infeccao genital fungica', 'Infeccao urinaria', 'Poliuria', 'Sede', 'Hipotensao'],
      graves: ['Cetoacidose diabetica', 'Gangrena de Fournier', 'Desidratacao grave', 'AKI'],
    },
    interacoes: [
      {
        medicamento: 'Diureticos de alca (furosemida)',
        gravidade: 'moderada',
        efeito: 'Risco aumentado de deplecao volumetrica e hipotensao',
        conduta: 'Avaliar reducao da dose do diuretico; monitorar PA e volemia',
      },
      {
        medicamento: 'Insulina e secretagogos',
        gravidade: 'moderada',
        efeito: 'Risco aumentado de hipoglicemia',
        conduta: 'Considerar reducao da dose de insulina/sulfonilureia',
      },
      {
        medicamento: 'IECA/BRA',
        gravidade: 'leve',
        efeito: 'Efeito nefroprotetor aditivo (benefico)',
        conduta: 'Combinacao recomendada em DRC',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>=25', ajuste: '10mg/dia - sem ajuste' },
      { tfg: '<25', ajuste: 'Pode continuar se ja em uso; nao iniciar para diabetes (iniciar ok para IC/DRC)' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Nao recomendado' },
    monitorizacao: [
      'TFG e albuminuria basal e periodica',
      'HbA1c (se diabetico)',
      'PA e sinais de deplecao volumetrica',
      'Cetonas se sintomas sugestivos de CAD',
      'Sintomas de infeccao genital/urinaria',
    ],
    orientacoesPaciente: [
      'Tomar pela manha',
      'Manter boa hidratacao',
      'Higiene genital adequada',
      'Sinais de infeccao urinaria/genital - procurar atendimento',
      'Sintomas de CAD (nausea, vomito, dor abdominal, confusao) - urgencia',
      'Suspender 3-4 dias antes de cirurgias eletivas',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de deplecao volumetrica; avaliar volemia',
      hepatopatas: 'Hepatopatia leve/moderada: sem ajuste; grave: iniciar com cautela',
    },
    doencasRelacionadas: ['doenca-renal-cronica', 'insuficiencia-cardiaca', 'diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['dapagliflozina', 'SGLT2', 'DAPA-CKD', 'DRC', 'nefroprotetor', 'cardioprotetor'],
  },

  // =============================================================================
  // ANTAGONISTAS DO RECEPTOR V2 DA VASOPRESSINA
  // =============================================================================
  {
    id: 'tolvaptan',
    nomeGenerico: 'Tolvaptan',
    nomesComerciais: ['Jynarque', 'Samsca'],
    atcCode: 'C03XA01',
    rxNormCui: '613391',
    drugBankId: 'DB06212',
    snomedCT: '421747003',
    casNumber: '150683-30-0',
    classeTerapeutica: 'diuretico',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '15mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '45mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '60mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '90mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Doenca renal policistica autossomica dominante (ADPKD) - retardar progressao',
      'Hiponatremia euvolëmica ou hipervolëmica (SIADH, IC, cirrose)',
    ],
    mecanismoAcao: 'Antagonista seletivo do receptor V2 da vasopressina (AVP) nos ductos coletores renais. Bloqueia a reabsorcao de agua livre mediada pela aquaporina-2, causando aquarese (excrecao de agua sem eletrolitos). Na ADPKD, reduz os niveis intracelulares de AMPc, diminuindo a proliferacao celular e secrecao de fluido nos cistos.',
    posologias: [
      {
        indicacao: 'ADPKD (Jynarque)',
        adultos: {
          dose: 'Iniciar 45mg manha + 15mg tarde (60mg/dia)',
          frequencia: '2x/dia (dose dividida manha e tarde)',
          doseMaxima: '90mg + 30mg (120mg/dia)',
          observacoes: 'Titular mensalmente: 45+15mg -> 60+30mg -> 90+30mg conforme tolerancia. Manter ingestao adequada de agua.',
        },
      },
      {
        indicacao: 'Hiponatremia',
        adultos: {
          dose: 'Iniciar 15mg/dia',
          frequencia: '1x/dia',
          doseMaxima: '60mg/dia',
          observacoes: 'Iniciar em ambiente hospitalar. Correcao do sodio nao deve exceder 10-12mEq/L em 24h (risco de desmielinizacao osmotica).',
        },
      },
    ],
    contraindicacoes: [
      'Hiponatremia hipovolemica',
      'Incapacidade de perceber ou responder a sede',
      'Anurica',
      'Uso concomitante com inibidores fortes de CYP3A4',
      'Hepatopatia incluindo cirrose (para ADPKD)',
    ],
    precaucoes: [
      'Hepatotoxicidade - monitorar funcao hepatica rigorosamente',
      'Correcao rapida de sodio - risco de sindrome de desmielinizacao osmotica',
      'Desidratacao se ingesta hidrica inadequada',
      'Hipernatremia',
      'Interacoes via CYP3A4',
    ],
    efeitosAdversos: {
      comuns: ['Sede excessiva', 'Poliuria', 'Nocturia', 'Boca seca', 'Fadiga', 'Polidipsia'],
      graves: ['Hepatotoxicidade grave', 'Sindrome desmielinizacao osmotica', 'Desidratacao grave', 'Hipernatremia'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes de CYP3A4 (cetoconazol, itraconazol, claritromicina)',
        gravidade: 'contraindicada',
        efeito: 'Aumento significativo dos niveis de tolvaptan',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Inibidores moderados de CYP3A4 (fluconazol, eritromicina, diltiazem)',
        gravidade: 'grave',
        efeito: 'Aumento dos niveis de tolvaptan',
        conduta: 'Reduzir dose de tolvaptan',
      },
      {
        medicamento: 'Indutores de CYP3A4 (rifampicina, fenitoina)',
        gravidade: 'moderada',
        efeito: 'Reducao da eficacia',
        conduta: 'Evitar; pode necessitar dose maior',
      },
      {
        medicamento: 'Digoxina',
        gravidade: 'moderada',
        efeito: 'Tolvaptan aumenta niveis de digoxina',
        conduta: 'Monitorar digoxinemia',
      },
      {
        medicamento: 'Grapefruit',
        gravidade: 'moderada',
        efeito: 'Aumenta niveis de tolvaptan',
        conduta: 'Evitar grapefruit',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>10', ajuste: 'Sem ajuste para ADPKD enquanto TFG permitir beneficio' },
      { tfg: '<10', ajuste: 'Eficacia limitada; nao recomendado' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Nao recomendado' },
    monitorizacao: [
      'Funcao hepatica: ALT/AST/bilirrubinas antes e mensalmente por 18 meses, depois trimestralmente',
      'Sodio serio frequente (especialmente para hiponatremia)',
      'Volume urinario e peso',
      'Sinais de desidratacao',
      'TFG e volume renal total (ADPKD)',
    ],
    orientacoesPaciente: [
      'Beber agua suficiente para satisfazer a sede (pode ser 3-4L/dia)',
      'Acordar a noite para beber agua se tiver sede',
      'Tomar doses divididas: maior dose de manha',
      'Nao restringir liquidos',
      'Sintomas hepaticos (ictericia, urina escura, fadiga) - procurar atendimento imediato',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de hipernatremia e desidratacao; monitorar',
      hepatopatas: 'Para ADPKD: contraindicado se doenca hepatica; para hiponatremia: cautela extrema',
    },
    doencasRelacionadas: ['doenca-renal-policistica', 'adpkd', 'hiponatremia', 'siadh'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['tolvaptan', 'vaptano', 'V2', 'ADPKD', 'policistico', 'TEMPO', 'REPRISE', 'hiponatremia'],
  },

  // =============================================================================
  // CALCIMIMETICOS
  // =============================================================================
  {
    id: 'cinacalcete',
    nomeGenerico: 'Cinacalcete',
    nomesComerciais: ['Mimpara', 'Sensipar'],
    atcCode: 'H05BX01',
    rxNormCui: '328163',
    drugBankId: 'DB01012',
    snomedCT: '407032004',
    casNumber: '226256-56-0',
    classeTerapeutica: 'antihiperparatireoideo',
    subclasse: 'calcimimetico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '60mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '90mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Hiperparatireoidismo secundario em pacientes com DRC em dialise',
      'Hipercalcemia em carcinoma de paratireoide',
      'Hipercalcemia em hiperparatireoidismo primario grave quando paratireoidectomia nao e possivel',
    ],
    mecanismoAcao: 'Calcimimetico tipo II - modulador alosterico do receptor sensor de calcio (CaSR) nas celulas paratireoidianas. Aumenta a sensibilidade do CaSR ao calcio extracelular, suprimindo a secrecao de PTH de forma dose-dependente. Reduz PTH, calcio serio e fosforo, diminuindo o produto calcio-fosforo.',
    posologias: [
      {
        indicacao: 'HPTS em dialise',
        adultos: {
          dose: 'Iniciar 30mg 1x/dia',
          frequencia: '1x/dia com alimentos ou logo apos refeicao',
          doseMaxima: '180mg/dia',
          observacoes: 'Titular a cada 2-4 semanas em incrementos de 30mg baseado em PTH e calcio. Alvo: PTH 150-300pg/mL (2-9x limite superior).',
        },
      },
      {
        indicacao: 'Carcinoma de paratireoide / HPP grave',
        adultos: {
          dose: 'Iniciar 30mg 2x/dia',
          frequencia: '12/12h com alimentos',
          doseMaxima: '90mg 4x/dia (360mg/dia)',
          observacoes: 'Titular a cada 2-4 semanas para normalizar calcio serio.',
        },
      },
    ],
    contraindicacoes: [
      'Hipocalcemia (calcio corrigido <8,4mg/dL antes de iniciar)',
      'Hipersensibilidade ao cinacalcete',
    ],
    precaucoes: [
      'Risco de hipocalcemia grave - pode causar convulsoes, QT prolongado',
      'Monitorar calcio serio frequentemente',
      'Doenca convulsiva - maior risco',
      'Nausea e vomitos comuns',
      'Interacoes via CYP2D6',
    ],
    efeitosAdversos: {
      comuns: ['Nausea (30%)', 'Vomitos', 'Diarreia', 'Mialgia', 'Tontura', 'Parestesias'],
      graves: ['Hipocalcemia grave', 'Convulsoes', 'Arritmias (QT longo)', 'Doenca ossea adinamica'],
    },
    interacoes: [
      {
        medicamento: 'Substratos de CYP2D6 (antidepressivos triciclicos, flecainida, metoprolol)',
        gravidade: 'moderada',
        efeito: 'Cinacalcete inibe CYP2D6 - aumenta niveis destes farmacos',
        conduta: 'Ajustar dose se necessario; monitorar',
      },
      {
        medicamento: 'Inibidores fortes de CYP3A4',
        gravidade: 'moderada',
        efeito: 'Aumentam niveis de cinacalcete',
        conduta: 'Monitorar PTH e calcio; pode precisar de dose menor',
      },
      {
        medicamento: 'Quelantes de fosfato calcicos',
        gravidade: 'leve',
        efeito: 'Hipercalcemia pode mascarar hipocalcemia por cinacalcete',
        conduta: 'Preferir quelantes nao calcicos se Ca baixo',
      },
    ],
    ajusteDoseRenal: [
      { tfg: 'dialise', ajuste: 'Sem ajuste - indicacao principal e dialise' },
      { tfg: 'pre-dialise', ajuste: 'Nao aprovado para DRC pre-dialise' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Nao recomendado - dados insuficientes' },
    monitorizacao: [
      'Calcio serio: 1 semana apos inicio/ajuste, depois mensalmente',
      'PTH: 1-4 semanas apos ajuste de dose, depois a cada 1-3 meses',
      'Fosforo serio',
      'Sintomas de hipocalcemia (parestesias, caibras, tetania)',
    ],
    orientacoesPaciente: [
      'Tomar com alimentos para reduzir nausea',
      'Nao mastigar ou dividir o comprimido',
      'Sinais de hipocalcemia (formigamentos, caibras, espasmos) - procurar atendimento',
      'Manter suplementacao de calcio e vitamina D conforme prescrito',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste por idade; monitorar calcio',
      hepatopatas: 'Hepatopatia moderada: iniciar dose baixa; grave: cautela',
    },
    doencasRelacionadas: ['hiperparatireoidismo-secundario', 'drc-mbd', 'carcinoma-paratireoide'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['cinacalcete', 'calcimimetico', 'HPTS', 'PTH', 'DRC-MBD', 'EVOLVE', 'hipercalcemia'],
  },

  {
    id: 'etelcalcetide',
    nomeGenerico: 'Etelcalcetide',
    nomesComerciais: ['Parsabiv'],
    atcCode: 'H05BX04',
    rxNormCui: '1873983',
    drugBankId: 'DB12865',
    snomedCT: '735244000',
    casNumber: '1174046-26-2',
    classeTerapeutica: 'antihiperparatireoideo',
    subclasse: 'calcimimetico',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '2,5mg/0,5mL', disponivelSUS: false },
      { forma: 'injetavel_iv', concentracao: '5mg/mL', disponivelSUS: false },
      { forma: 'injetavel_iv', concentracao: '10mg/2mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Hiperparatireoidismo secundario em pacientes adultos com DRC em hemodialise',
    ],
    mecanismoAcao: 'Agonista peptidico sintetico do receptor sensor de calcio (CaSR). Liga-se e ativa o CaSR nas celulas paratireoidianas, suprimindo a secrecao de PTH. Diferente do cinacalcete, e administrado IV ao final da hemodialise, garantindo adesao e evitando efeitos GI. Peptideo linear de 8 aminoacidos ligado a D-cisteina.',
    posologias: [
      {
        indicacao: 'HPTS em hemodialise',
        adultos: {
          dose: 'Iniciar 5mg 3x/semana ao final da hemodialise',
          frequencia: '3x/semana (dias de dialise)',
          doseMaxima: '15mg 3x/semana',
          observacoes: 'Titular a cada 4 semanas em incrementos de 2,5-5mg baseado em PTH e calcio. Se PTH <100pg/mL, reduzir dose ou suspender.',
        },
      },
    ],
    contraindicacoes: [
      'Hipocalcemia (calcio corrigido <limite inferior da normalidade)',
      'Hipersensibilidade ao etelcalcetide',
    ],
    precaucoes: [
      'Risco de hipocalcemia - monitorar calcio antes de cada sessao inicial',
      'Sintomas de hipocalcemia (parestesias, mialgias, caibras, convulsoes)',
      'Nao usar com cinacalcete (nao combinar calcimimeticos)',
      'Prolongamento de QT',
    ],
    efeitosAdversos: {
      comuns: ['Hipocalcemia (64%)', 'Espasmos musculares', 'Diarreia', 'Nausea', 'Vomitos', 'Cefaleia', 'Parestesias'],
      graves: ['Hipocalcemia grave/sintomatica', 'Convulsoes', 'Arritmias ventriculares', 'Insuficiencia cardiaca agudizada'],
    },
    interacoes: [
      {
        medicamento: 'Cinacalcete',
        gravidade: 'contraindicada',
        efeito: 'Risco severo de hipocalcemia',
        conduta: 'Nunca usar concomitantemente',
      },
      {
        medicamento: 'Medicamentos que prolongam QT',
        gravidade: 'moderada',
        efeito: 'Hipocalcemia pode exacerbar prolongamento de QT',
        conduta: 'Monitorar calcio e ECG',
      },
      {
        medicamento: 'Quelantes de fosfato calcicos',
        gravidade: 'leve',
        efeito: 'Interacao minima; pode ajudar a manter calcio',
        conduta: 'Ajustar conforme calcemia',
      },
    ],
    ajusteDoseRenal: [
      { tfg: 'hemodialise', ajuste: 'Indicacao especifica - sem ajuste adicional' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Calcio serio: antes do inicio, semanalmente durante titulacao, mensalmente em manutencao',
      'PTH: 4 semanas apos inicio/ajuste, depois a cada 1-3 meses',
      'Fosforo serio',
      'ECG se hipocalcemia ou uso de prolongadores de QT',
    ],
    orientacoesPaciente: [
      'Medicamento administrado na clinica de dialise',
      'Informar sintomas de caibras, formigamentos ou espasmos',
      'Manter suplementacao prescrita entre dialises',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste; monitorar calcio',
    },
    doencasRelacionadas: ['hiperparatireoidismo-secundario', 'drc-mbd'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['etelcalcetide', 'calcimimetico', 'IV', 'hemodialise', 'HPTS', 'parsabiv'],
  },

  // =============================================================================
  // QUELANTES DE FOSFORO
  // =============================================================================
  {
    id: 'sevelamer',
    nomeGenerico: 'Sevelamer',
    nomesComerciais: ['Renagel (HCl)', 'Renvela (carbonato)'],
    atcCode: 'V03AE02',
    rxNormCui: '203175',
    drugBankId: 'DB00658',
    snomedCT: '386924003',
    casNumber: '52757-95-6',
    classeTerapeutica: 'quelante_fosfato',
    subclasse: 'resina',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '800mg', disponivelSUS: true },
      { forma: 'po_oral', concentracao: '0,8g/sache', disponivelSUS: true },
      { forma: 'po_oral', concentracao: '2,4g/sache', disponivelSUS: true },
    ],
    indicacoes: [
      'Hiperfosfatemia em pacientes com DRC em dialise',
      'Hiperfosfatemia em DRC estagio 3-5 nao dialítica (off-label, mas usado)',
    ],
    mecanismoAcao: 'Polimero cationico que se liga ao fosfato dietario no trato GI atraves de troca ionica e ligacao de hidrogenio, formando complexo insolavel eliminado nas fezes. Nao contem calcio, aluminio ou magnesio. Sevelamer carbonato tambem funciona como tampao de acido, enquanto HCl pode causar acidose.',
    posologias: [
      {
        indicacao: 'Hiperfosfatemia em dialise',
        adultos: {
          dose: 'Iniciar 800-1600mg 3x/dia',
          frequencia: '3x/dia com as refeicoes',
          doseMaxima: '14g/dia (pratico ate ~13g)',
          observacoes: 'Titular a cada 2 semanas baseado no fosforo serio. Alvo: fosforo 3,5-5,5mg/dL. Equivalencia: 667mg sevelamer HCl = 800mg carbonato.',
        },
      },
    ],
    contraindicacoes: [
      'Obstrucao intestinal',
      'Hipofosfatemia',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Constipacao grave',
      'Cirurgia GI recente',
      'Disturbios de motilidade GI',
      'Pode reduzir absorcao de vitaminas lipossolúveis (A, D, E, K)',
      'Interacoes com outros medicamentos (quelacao)',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Vomitos', 'Diarreia', 'Constipacao', 'Dispepsia', 'Dor abdominal', 'Flatulencia'],
      graves: ['Obstrucao intestinal', 'Perfuracao intestinal (raro)', 'Fecaloma', 'Bezoar'],
    },
    interacoes: [
      {
        medicamento: 'Ciprofloxacino e outras quinolonas',
        gravidade: 'grave',
        efeito: 'Reducao significativa da absorcao do antibiotico',
        conduta: 'Administrar quinolona 2h antes ou 6h apos sevelamer',
      },
      {
        medicamento: 'Levotiroxina',
        gravidade: 'moderada',
        efeito: 'Reducao da absorcao de levotiroxina',
        conduta: 'Administrar levotiroxina 4h antes do sevelamer',
      },
      {
        medicamento: 'Micofenolato',
        gravidade: 'moderada',
        efeito: 'Reducao da absorcao de micofenolato',
        conduta: 'Administrar micofenolato 2h antes ou apos',
      },
      {
        medicamento: 'Ciclosporina, tacrolimo',
        gravidade: 'moderada',
        efeito: 'Possivel reducao da absorcao',
        conduta: 'Monitorar niveis; separar administracao',
      },
    ],
    ajusteDoseRenal: [
      { tfg: 'dialise', ajuste: 'Indicacao principal - sem ajuste' },
      { tfg: '<30', ajuste: 'Pode ser usado em pre-dialise conforme KDIGO' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Nao absorvido sistemicamente - improvavel risco' },
    monitorizacao: [
      'Fosforo serio a cada 2-4 semanas durante titulacao, depois mensalmente',
      'Calcio serio',
      'PTH',
      'Bicarbonato (especialmente com sevelamer HCl)',
      'Vitaminas lipossolúveis se suspeita de deficiencia',
    ],
    orientacoesPaciente: [
      'Tomar com as refeicoes (durante ou imediatamente apos)',
      'Engolir comprimidos inteiros, nao mastigar',
      'Separar de outros medicamentos por pelo menos 2 horas',
      'Manter dieta pobre em fosforo',
      'Relatar constipacao persistente',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste; monitorar constipacao',
      hepatopatas: 'Sem ajuste necessario',
    },
    doencasRelacionadas: ['hiperfosfatemia', 'drc-mbd', 'doenca-renal-cronica'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['sevelamer', 'quelante', 'fosforo', 'hiperfosfatemia', 'DRC-MBD', 'nao-calcico'],
  },

  {
    id: 'carbonato-lantanio',
    nomeGenerico: 'Carbonato de lantanio',
    nomesComerciais: ['Fosrenol'],
    atcCode: 'V03AE03',
    rxNormCui: '358274',
    drugBankId: 'DB04826',
    snomedCT: '421343000',
    casNumber: '587-26-8',
    classeTerapeutica: 'quelante_fosfato',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido_mastigavel', concentracao: '500mg', disponivelSUS: false },
      { forma: 'comprimido_mastigavel', concentracao: '750mg', disponivelSUS: false },
      { forma: 'comprimido_mastigavel', concentracao: '1000mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Hiperfosfatemia em pacientes com DRC em dialise',
      'Hiperfosfatemia em DRC avancada nao dialítica',
    ],
    mecanismoAcao: 'Cation trivalente de terra rara (lantanio) que se liga fortemente ao fosfato dietario no trato GI superior (pH 3-7), formando fosfato de lantanio insolúvel eliminado nas fezes. Nao contem calcio ou aluminio. Absorcao sistemica do lantanio e muito baixa (<0,001%).',
    posologias: [
      {
        indicacao: 'Hiperfosfatemia em DRC/dialise',
        adultos: {
          dose: 'Iniciar 750-1500mg/dia divididos nas refeicoes',
          frequencia: '3x/dia (dividido entre as refeicoes principais)',
          doseMaxima: '3750mg/dia',
          observacoes: 'Comprimidos devem ser MASTIGADOS completamente, nao engolidos inteiros. Titular a cada 2-3 semanas baseado no fosforo serio.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao lantanio',
      'Obstrucao GI',
    ],
    precaucoes: [
      'Deve ser mastigado - risco de obstrucao se engolido inteiro',
      'Acumulo tecidual de lantanio (significado clinico incerto)',
      'Interacoes com absorcao de outros farmacos',
      'Disturbios de motilidade GI',
    ],
    efeitosAdversos: {
      comuns: ['Nausea (12%)', 'Vomitos', 'Diarreia', 'Dor abdominal', 'Constipacao', 'Hipocalcemia'],
      graves: ['Obstrucao GI (se nao mastigado)', 'Fecaloma', 'Ileo'],
    },
    interacoes: [
      {
        medicamento: 'Quinolonas (ciprofloxacino, levofloxacino)',
        gravidade: 'grave',
        efeito: 'Reducao da absorcao de quinolonas',
        conduta: 'Administrar quinolona 2h antes ou 4h apos lantanio',
      },
      {
        medicamento: 'Levotiroxina',
        gravidade: 'moderada',
        efeito: 'Pode reduzir absorcao',
        conduta: 'Administrar levotiroxina 2h antes',
      },
      {
        medicamento: 'Tetraciclinas',
        gravidade: 'moderada',
        efeito: 'Quelacao e reducao da absorcao',
        conduta: 'Separar administracao',
      },
    ],
    ajusteDoseRenal: [
      { tfg: 'dialise', ajuste: 'Sem ajuste - indicacao principal' },
      { tfg: '<30', ajuste: 'Pode ser usado em pre-dialise' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorcao minima - baixo risco' },
    monitorizacao: [
      'Fosforo serio a cada 2-3 semanas durante titulacao, mensalmente depois',
      'Calcio serio',
      'PTH',
    ],
    orientacoesPaciente: [
      'MASTIGAR completamente os comprimidos - nunca engolir inteiro',
      'Tomar durante ou imediatamente apos as refeicoes',
      'Dividir dose diaria entre as refeicoes principais',
      'Separar de outros medicamentos',
      'Manter dieta pobre em fosforo',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste; assegurar capacidade de mastigar',
    },
    doencasRelacionadas: ['hiperfosfatemia', 'drc-mbd'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['lantanio', 'quelante', 'fosforo', 'mastigavel', 'Fosrenol', 'DRC-MBD'],
  },

  {
    id: 'oxihidroxido-sucroferrico',
    nomeGenerico: 'Oxihidroxido sucroferrico',
    nomesComerciais: ['Velphoro'],
    atcCode: 'V03AE05',
    rxNormCui: '1551488',
    drugBankId: 'DB09501',
    snomedCT: '714081009',
    casNumber: '1007207-67-3',
    classeTerapeutica: 'quelante_fosfato',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido_mastigavel', concentracao: '500mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Hiperfosfatemia em pacientes com DRC em dialise',
    ],
    mecanismoAcao: 'Quelante de fosfato a base de ferro que consiste em oxi-hidroxido de ferro polibuclear estabilizado por sacarose e amido. Liga-se ao fosfato dietario no trato GI formando complexo insolúvel. Liberacao minima de ferro absorvível sistemicamente. Alta capacidade de ligacao ao fosfato por comprimido.',
    posologias: [
      {
        indicacao: 'Hiperfosfatemia em dialise',
        adultos: {
          dose: 'Iniciar 500mg (1 comprimido) 3x/dia',
          frequencia: '3x/dia com as refeicoes',
          doseMaxima: '3000mg/dia (6 comprimidos)',
          observacoes: 'Comprimidos devem ser MASTIGADOS, nao engolidos inteiros. Titular semanalmente em incrementos de 500mg/dia.',
        },
      },
    ],
    contraindicacoes: [
      'Hemocromatose ou outros disturbios de sobrecarga de ferro',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Deve ser mastigado',
      'Pode causar fezes escuras (esperado - ferro)',
      'Peritonite em pacientes em dialise peritoneal',
      'Interacoes com absorcao de medicamentos',
    ],
    efeitosAdversos: {
      comuns: ['Diarreia (24%)', 'Fezes escuras/descoloridas', 'Nausea', 'Constipacao', 'Vomitos'],
      graves: ['Obstrucao GI (se nao mastigado)', 'Peritonite (dialise peritoneal)'],
    },
    interacoes: [
      {
        medicamento: 'Doxiciclina',
        gravidade: 'grave',
        efeito: 'Reducao significativa da absorcao',
        conduta: 'Administrar doxiciclina 1h antes do Velphoro',
      },
      {
        medicamento: 'Levotiroxina',
        gravidade: 'moderada',
        efeito: 'Pode reduzir absorcao',
        conduta: 'Separar administracao por pelo menos 2h',
      },
      {
        medicamento: 'Alopurinol',
        gravidade: 'leve',
        efeito: 'Possivel reducao de absorcao',
        conduta: 'Separar se possivel',
      },
    ],
    ajusteDoseRenal: [
      { tfg: 'dialise', ajuste: 'Indicacao principal - sem ajuste' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Absorcao minima de ferro - baixo risco' },
    monitorizacao: [
      'Fosforo serio semanalmente durante titulacao, depois mensalmente',
      'Calcio, PTH',
      'Ferritina e saturacao de transferrina (monitorar periodicamente)',
    ],
    orientacoesPaciente: [
      'MASTIGAR completamente - nao engolir inteiro',
      'Tomar durante as refeicoes',
      'Fezes escuras sao normais (efeito do ferro)',
      'Separar de outros medicamentos',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
    },
    doencasRelacionadas: ['hiperfosfatemia', 'drc-mbd'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['sucroferrico', 'velphoro', 'quelante', 'fosforo', 'ferro', 'DRC-MBD'],
  },

  // =============================================================================
  // AGENTES ESTIMULADORES DE ERITROPOIESE (ESAs)
  // =============================================================================
  {
    id: 'epoetina-alfa',
    nomeGenerico: 'Epoetina alfa',
    nomesComerciais: ['Eprex', 'Hemax', 'Eritromax', 'Eritina'],
    atcCode: 'B03XA01',
    rxNormCui: '3221',
    drugBankId: 'DB00016',
    snomedCT: '109063009',
    casNumber: '113427-24-0',
    classeTerapeutica: 'antianemico',
    subclasse: 'estimulante_eritropoiese',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '2000UI/0,5mL', disponivelSUS: true },
      { forma: 'injetavel_sc', concentracao: '4000UI/0,4mL', disponivelSUS: true },
      { forma: 'injetavel_sc', concentracao: '10000UI/1mL', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '2000UI/0,5mL', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '4000UI/0,4mL', disponivelSUS: true },
    ],
    indicacoes: [
      'Anemia associada a DRC (em dialise e pre-dialise)',
      'Anemia induzida por quimioterapia',
      'Reducao de transfusao alogeneica em cirurgias',
      'Anemia em pacientes com HIV tratados com zidovudina',
    ],
    mecanismoAcao: 'Glicoproteina recombinante identica a eritropoetina humana endogena. Estimula a eritropoiese ligando-se ao receptor de eritropoetina (EpoR) em progenitores eritroides na medula ossea, promovendo sobrevida, proliferacao e diferenciacao terminal em eritrocitos maduros.',
    posologias: [
      {
        indicacao: 'Anemia da DRC em dialise',
        adultos: {
          dose: 'Iniciar 50-100UI/kg 3x/semana',
          frequencia: '3x/semana (IV ou SC)',
          observacoes: 'Alvo Hb 10-12g/dL. Titular dose em 25% a cada 4 semanas. Via SC preferida se possivel (maior biodisponibilidade). Nao exceder Hb >12g/dL.',
        },
      },
      {
        indicacao: 'Anemia da DRC pre-dialise',
        adultos: {
          dose: '50-100UI/kg 1-3x/semana SC',
          frequencia: '1-3x/semana',
          observacoes: 'Dose menos frequente possivel. Alvo Hb 10-11,5g/dL.',
        },
      },
    ],
    contraindicacoes: [
      'Aplasia pura de serie vermelha (PRCA) mediada por anti-EPO',
      'Hipertensao nao controlada',
      'Hipersensibilidade a epoetina alfa ou componentes',
    ],
    precaucoes: [
      'Risco de eventos cardiovasculares/tromboembolicos se Hb >12g/dL',
      'Hipertensao nova ou agravada',
      'Convulsoes',
      'PRCA (rara) - suspender permanentemente',
      'Deficiencia de ferro concomitante - tratar antes/durante',
      'Cirurgia - risco de TVP',
    ],
    efeitosAdversos: {
      comuns: ['Hipertensao (5-25%)', 'Cefaleia', 'Artralgia', 'Nausea', 'Edema', 'Reacoes no local da injecao (SC)'],
      graves: ['Eventos tromboembolicos (TEP, TVP, AVC, IAM)', 'Hipertensao grave/crise hipertensiva', 'PRCA', 'Convulsoes'],
    },
    interacoes: [
      {
        medicamento: 'Anti-hipertensivos',
        gravidade: 'moderada',
        efeito: 'Pode ser necessario ajuste da dose de anti-hipertensivos',
        conduta: 'Monitorar PA; ajustar medicacao',
      },
      {
        medicamento: 'Heparina',
        gravidade: 'leve',
        efeito: 'Pode necessitar aumento da dose de heparina na dialise',
        conduta: 'Monitorar coagulacao',
      },
    ],
    ajusteDoseRenal: [
      { tfg: 'qualquer', ajuste: 'Indicacao especifica para DRC - titular pela resposta' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Excretada no leite em pequenas quantidades; provavelmente segura' },
    monitorizacao: [
      'Hemoglobina: semanalmente durante titulacao, mensalmente em manutencao',
      'Ferritina e saturacao de transferrina (manter reservas de ferro)',
      'PA regularmente',
      'Contagem de reticulocitos se resposta inadequada',
      'Sinais de trombose',
    ],
    orientacoesPaciente: [
      'Nao substitui transfusao em anemia grave/sintomatica aguda',
      'Resposta leva 2-6 semanas',
      'Manter suplementacao de ferro se prescrita',
      'Monitorar PA em casa',
      'Sinais de coagulo (dor/inchaco na perna, falta de ar) - procurar emergencia',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste por idade; monitorar eventos CV',
      hepatopatas: 'Sem ajuste especifico',
    },
    doencasRelacionadas: ['anemia-drc', 'doenca-renal-cronica', 'anemia-quimioterapia'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['epoetina', 'EPO', 'ESA', 'eritropoetina', 'anemia', 'DRC', 'TREAT', 'CHOIR'],
  },

  {
    id: 'darbepoetina-alfa',
    nomeGenerico: 'Darbepoetina alfa',
    nomesComerciais: ['Aranesp'],
    atcCode: 'B03XA02',
    rxNormCui: '237076',
    drugBankId: 'DB00012',
    snomedCT: '372511001',
    casNumber: '209810-58-2',
    classeTerapeutica: 'antianemico',
    subclasse: 'estimulante_eritropoiese',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '10mcg/0,4mL', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '20mcg/0,5mL', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '40mcg/0,4mL', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '60mcg/0,3mL', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '100mcg/0,5mL', disponivelSUS: false },
      { forma: 'injetavel_iv', concentracao: '40mcg/0,4mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Anemia associada a DRC (em dialise e pre-dialise)',
      'Anemia induzida por quimioterapia em tumores nao mieloides',
    ],
    mecanismoAcao: 'Proteina estimuladora de eritropoiese de longa duracao. Modificacao de epoetina alfa com 2 cadeias de carboidratos adicionais (5 cadeias N-ligadas vs 3), resultando em maior conteudo de acido sialico e meia-vida serica 3x maior. Permite administracao menos frequente (semanal ou quinzenal).',
    posologias: [
      {
        indicacao: 'Anemia da DRC',
        adultos: {
          dose: 'Iniciar 0,45mcg/kg SC/IV 1x/semana ou 0,75mcg/kg a cada 2 semanas',
          frequencia: '1x/semana ou a cada 2 semanas',
          observacoes: 'Conversao de epoetina: 1mcg darbepoetina = 200UI epoetina (aproximado). Alvo Hb 10-12g/dL. Administracao mensal possivel em alguns pacientes estaveis.',
        },
      },
      {
        indicacao: 'Anemia por quimioterapia',
        adultos: {
          dose: '2,25mcg/kg SC semanalmente ou 500mcg SC a cada 3 semanas',
          frequencia: 'Semanal ou a cada 3 semanas',
          observacoes: 'Iniciar se Hb <10g/dL. Continuar ate 6 semanas apos fim da QT.',
        },
      },
    ],
    contraindicacoes: [
      'PRCA por anticorpos anti-eritropoetina',
      'Hipertensao nao controlada',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Mesmos riscos da epoetina: eventos CV, HAS, trombose',
      'Nao exceder Hb >12g/dL',
      'Reposicao de ferro adequada',
      'Cancer: pode estimular progressao tumoral',
    ],
    efeitosAdversos: {
      comuns: ['Hipertensao', 'Cefaleia', 'Artralgia', 'Mialgia', 'Edema periferico', 'Diarreia'],
      graves: ['Eventos tromboembolicos', 'Hipertensao grave', 'PRCA', 'Progressao tumoral (cancer)', 'Convulsoes'],
    },
    interacoes: [
      {
        medicamento: 'Anti-hipertensivos',
        gravidade: 'moderada',
        efeito: 'Pode necessitar ajuste',
        conduta: 'Monitorar PA',
      },
    ],
    ajusteDoseRenal: [
      { tfg: 'qualquer', ajuste: 'Titular conforme resposta de Hb' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' },
    monitorizacao: [
      'Hemoglobina: semanalmente inicialmente, depois mensalmente',
      'Ferritina e TSAT',
      'PA',
      'Reticulocitos se resposta inadequada',
    ],
    orientacoesPaciente: [
      'Administracao menos frequente que epoetina convencional',
      'Manter ferro conforme prescrito',
      'Monitorar PA',
      'Resposta leva semanas',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste; monitorar eventos CV',
    },
    doencasRelacionadas: ['anemia-drc', 'anemia-quimioterapia'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['darbepoetina', 'aranesp', 'ESA', 'longa-duracao', 'anemia', 'DRC'],
  },

  // =============================================================================
  // INIBIDORES DE HIF-PHI
  // =============================================================================
  {
    id: 'roxadustat',
    nomeGenerico: 'Roxadustat',
    nomesComerciais: ['Evrenzo'],
    atcCode: 'B03XA05',
    rxNormCui: '2393326',
    drugBankId: 'DB11969',
    snomedCT: '1149200005',
    casNumber: '808118-40-3',
    classeTerapeutica: 'antianemico',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '70mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '150mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Anemia associada a DRC em pacientes adultos em dialise',
      'Anemia da DRC em pacientes nao dialiticos (em alguns paises)',
    ],
    mecanismoAcao: 'Inibidor oral da prolil-hidroxilase do fator induzido por hipoxia (HIF-PHI). Estabiliza o fator HIF-alfa, simulando resposta fisiologica a hipoxia. Aumenta producao endogena de eritropoetina, melhora utilizacao de ferro (suprime hepcidina), aumenta absorcao intestinal de ferro e mobilizacao de estoques. Nao requer injecao e pode ser eficaz mesmo com inflamacao.',
    posologias: [
      {
        indicacao: 'Anemia da DRC em dialise',
        adultos: {
          dose: 'Iniciar 70mg 3x/semana (se nao em ESA) ou converter de ESA conforme tabela',
          frequencia: '3x/semana (nao em dias consecutivos)',
          doseMaxima: '400mg 3x/semana',
          observacoes: 'Titular a cada 4 semanas em incrementos de 20mg para manter Hb 10-12g/dL. Em dias de dialise, tomar apos a sessao.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao roxadustat',
    ],
    precaucoes: [
      'Eventos tromboembolicos (TVP, TEP, trombose de acesso vascular)',
      'Risco CV potencial (dados de seguranca em evolucao)',
      'Convulsoes (menos estudado que ESAs)',
      'Evitar em cancer ativo (estabilizacao de HIF pode promover progressao)',
      'Interacoes com quelantes e outros medicamentos',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Diarreia', 'Constipacao', 'Edema periferico', 'Hipertensao', 'Cefaleia', 'Infeccao respiratoria'],
      graves: ['Eventos tromboembolicos', 'Trombose de acesso vascular', 'Convulsoes', 'Hipertensao grave'],
    },
    interacoes: [
      {
        medicamento: 'Quelantes de fosfato (sevelamer, carbonato de calcio)',
        gravidade: 'grave',
        efeito: 'Reducao significativa da absorcao de roxadustat',
        conduta: 'Administrar roxadustat pelo menos 1h antes dos quelantes',
      },
      {
        medicamento: 'Estatinas (sinvastatina, rosuvastatina, atorvastatina)',
        gravidade: 'moderada',
        efeito: 'Roxadustat inibe BCRP/OATP1B1 - aumenta niveis de estatinas',
        conduta: 'Usar menor dose de estatina; monitorar miopatia',
      },
      {
        medicamento: 'Probenecida',
        gravidade: 'moderada',
        efeito: 'Aumenta niveis de roxadustat (inibe OAT1/3)',
        conduta: 'Evitar combinacao ou reduzir dose',
      },
      {
        medicamento: 'Suplementos de ferro oral',
        gravidade: 'moderada',
        efeito: 'Podem reduzir absorcao de roxadustat',
        conduta: 'Separar administracao por pelo menos 1h',
      },
    ],
    ajusteDoseRenal: [
      { tfg: 'dialise', ajuste: 'Indicacao principal - sem ajuste especifico' },
      { tfg: 'pre-dialise', ajuste: 'Aprovado em alguns paises; mesma dose inicial' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado - dados insuficientes e potencial risco' },
    monitorizacao: [
      'Hemoglobina: a cada 2 semanas inicialmente, depois mensalmente',
      'Ferritina e TSAT (roxadustat melhora utilizacao de ferro)',
      'PA',
      'Sinais de trombose',
      'Funcao hepatica periodica',
    ],
    orientacoesPaciente: [
      'Tomar 3x/semana, nao em dias consecutivos',
      'Separar de quelantes de fosforo e suplementos de ferro',
      'Em dias de dialise, tomar apos a sessao',
      'Monitorar PA em casa',
      'Sinais de coagulo - procurar atendimento',
      'Medicamento oral - mais conveniente que injecoes',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste por idade; monitorar eventos CV',
      hepatopatas: 'Hepatopatia leve: sem ajuste; moderada/grave: cautela',
    },
    doencasRelacionadas: ['anemia-drc', 'doenca-renal-cronica'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['roxadustat', 'HIF-PHI', 'evrenzo', 'anemia', 'DRC', 'oral', 'ALPS', 'HIMALAYAS'],
  },

  // =============================================================================
  // QUELANTES DE POTASSIO
  // =============================================================================
  {
    id: 'patiromer',
    nomeGenerico: 'Patiromer',
    nomesComerciais: ['Veltassa'],
    atcCode: 'V03AE09',
    rxNormCui: '1790100',
    drugBankId: 'DB09279',
    snomedCT: '724181004',
    casNumber: 'ite1260649-81-5',
    classeTerapeutica: 'outros',
    subclasse: 'resina',
    rename: false,
    apresentacoes: [
      { forma: 'po_oral', concentracao: '8,4g/sache', disponivelSUS: false },
      { forma: 'po_oral', concentracao: '16,8g/sache', disponivelSUS: false },
      { forma: 'po_oral', concentracao: '25,2g/sache', disponivelSUS: false },
    ],
    indicacoes: [
      'Hipercalemia em adultos',
      'Permite manutencao de IECA/BRA/MRA em pacientes com hipercalemia',
    ],
    mecanismoAcao: 'Polimero cationico nao absorvido que se liga ao potassio no trato GI (principalmente no colon) em troca por calcio, aumentando a excrecao fecal de potassio. Diferente do poliestirenossulfonato de sodio, libera calcio (nao sodio) e tem perfil de tolerabilidade superior (menos constipacao e necrose intestinal).',
    posologias: [
      {
        indicacao: 'Hipercalemia',
        adultos: {
          dose: 'Iniciar 8,4g 1x/dia',
          frequencia: '1x/dia',
          doseMaxima: '25,2g/dia',
          observacoes: 'Misturar o po em 40mL de agua, agitar e beber imediatamente. Pode titular em incrementos de 8,4g a cada semana ou mais. Administrar com alimentos.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao patiromer',
    ],
    precaucoes: [
      'Hipomagnesemia - monitorar magnesio',
      'Hipocalemia se uso excessivo',
      'Disturbios GI graves (obstrucao, impactacao)',
      'Interacoes com absorcao de outros medicamentos',
    ],
    efeitosAdversos: {
      comuns: ['Constipacao (7%)', 'Diarreia', 'Nausea', 'Dor abdominal', 'Flatulencia', 'Hipomagnesemia'],
      graves: ['Hipocalemia grave', 'Obstrucao GI (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Ciprofloxacino',
        gravidade: 'grave',
        efeito: 'Reducao de 28% na absorcao de ciprofloxacino',
        conduta: 'Administrar cipro 3h antes ou 3h apos patiromer',
      },
      {
        medicamento: 'Metformina',
        gravidade: 'moderada',
        efeito: 'Reducao de 23% na absorcao de metformina',
        conduta: 'Administrar metformina 3h antes ou 3h apos',
      },
      {
        medicamento: 'Levotiroxina',
        gravidade: 'moderada',
        efeito: 'Pode reduzir absorcao',
        conduta: 'Separar por pelo menos 3h',
      },
      {
        medicamento: 'Outros medicamentos orais',
        gravidade: 'moderada',
        efeito: 'Potencial de reducao de absorcao',
        conduta: 'Administrar outros medicamentos 3h antes ou 3h apos patiromer',
      },
    ],
    ajusteDoseRenal: [
      { tfg: 'qualquer', ajuste: 'Sem ajuste - nao absorvido sistemicamente' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Nao absorvido - seguro' },
    monitorizacao: [
      'Potassio serio: inicialmente frequente, depois conforme clinica',
      'Magnesio serio (pode causar hipomagnesemia)',
      'Sintomas GI',
    ],
    orientacoesPaciente: [
      'Misturar po em agua e beber imediatamente (nao aquecer)',
      'Tomar com alimentos',
      'Separar de outros medicamentos por pelo menos 3 horas',
      'Nao tomar o po seco',
      'Relatar constipacao persistente',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste; monitorar constipacao',
    },
    doencasRelacionadas: ['hipercalemia', 'doenca-renal-cronica', 'insuficiencia-cardiaca'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['patiromer', 'veltassa', 'hipercalemia', 'quelante-potassio', 'OPAL-HK', 'AMETHYST-DN'],
  },
];
