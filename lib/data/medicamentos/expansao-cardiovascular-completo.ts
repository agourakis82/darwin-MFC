/**
 * EXPANSÃO CARDIOVASCULAR COMPLETA - DARWIN-MFC
 * ==============================================
 *
 * Medicamentos cardiovasculares essenciais para APS
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosCardiovascularesCompleto: Partial<Medicamento>[] = [
  // ============================================================================
  // IECA (INIBIDORES DA ECA)
  // ============================================================================
  {
    id: 'enalapril',
    nomeGenerico: 'Enalapril',
    nomesComerciais: ['Renitec', 'Eupressin', 'Vasopril'],
    atcCode: 'C09AA02',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'ieca',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Hipertensão arterial',
      'Insuficiência cardíaca com FE reduzida',
      'Pós-IAM com disfunção de VE',
      'Nefropatia diabética'
    ],
    mecanismoAcao: 'Pró-fármaco convertido em enalaprilato. Inibe a ECA, reduzindo formação de angiotensina II e degradação de bradicinina.',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '5-20mg', frequencia: '1-2x/dia', doseMaxima: '40mg/dia' },
        idosos: { dose: '2,5mg', observacoes: 'Iniciar com dose baixa' }
      },
      {
        indicacao: 'Insuficiência cardíaca',
        adultos: { dose: '2,5mg', frequencia: 'Iniciar 2x/dia, titular até 10-20mg 2x/dia' }
      }
    ],
    contraindicacoes: ['Gestação', 'Angioedema prévio por IECA', 'Estenose bilateral de artéria renal', 'Hipercalemia grave'],
    efeitosAdversos: {
      comuns: ['Tosse seca (5-20%)', 'Hipotensão', 'Hipercalemia', 'Tontura'],
      graves: ['Angioedema', 'IRA', 'Agranulocitose (raro)']
    },
    interacoes: [
      { medicamento: 'AINEs', gravidade: 'moderada', efeito: 'Redução efeito anti-hipertensivo e piora renal', conduta: 'Evitar uso prolongado' },
      { medicamento: 'Diuréticos poupadores de K', gravidade: 'moderada', efeito: 'Hipercalemia', conduta: 'Monitorar K+' },
      { medicamento: 'Lítio', gravidade: 'moderada', efeito: 'Aumento níveis de lítio', conduta: 'Monitorar litemia' }
    ],
    ajusteDoseRenal: [
      { tfg: '30-60', ajuste: 'Iniciar 2,5mg/dia' },
      { tfg: '<30', ajuste: 'Iniciar 2,5mg/dia, titular com cautela' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível, monitorar PA do lactente' }
  },
  {
    id: 'ramipril',
    nomeGenerico: 'Ramipril',
    nomesComerciais: ['Triatec', 'Naprix'],
    atcCode: 'C09AA05',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'ieca',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2,5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Hipertensão arterial',
      'Insuficiência cardíaca',
      'Prevenção cardiovascular em alto risco',
      'Nefropatia diabética'
    ],
    mecanismoAcao: 'Pró-fármaco convertido em ramiprilato. IECA com evidência robusta em prevenção cardiovascular (HOPE trial).',
    posologias: [
      {
        indicacao: 'Hipertensão/Prevenção CV',
        adultos: { dose: '2,5-10mg', frequencia: '1x/dia', doseMaxima: '10mg/dia' }
      }
    ],
    contraindicacoes: ['Gestação', 'Angioedema prévio', 'Estenose renal bilateral'],
    efeitosAdversos: {
      comuns: ['Tosse seca', 'Tontura', 'Hipercalemia'],
      graves: ['Angioedema', 'IRA']
    },
    interacoes: [
      { medicamento: 'AINEs', gravidade: 'moderada', efeito: 'Redução eficácia', conduta: 'Evitar' },
      { medicamento: 'Espironolactona', gravidade: 'moderada', efeito: 'Hipercalemia', conduta: 'Monitorar K+' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },
  {
    id: 'lisinopril',
    nomeGenerico: 'Lisinopril',
    nomesComerciais: ['Zestril', 'Prinivil'],
    atcCode: 'C09AA03',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'ieca',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false }
    ],
    indicacoes: ['Hipertensão', 'Insuficiência cardíaca', 'Pós-IAM'],
    mecanismoAcao: 'Fármaco ativo (não requer conversão hepática). IECA hidrofílico.',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '10-40mg', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Gestação', 'Angioedema prévio'],
    efeitosAdversos: {
      comuns: ['Tosse', 'Tontura'],
      graves: ['Angioedema', 'IRA']
    },
    interacoes: [],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },

  // ============================================================================
  // BRA (BLOQUEADORES DE RECEPTOR DE ANGIOTENSINA)
  // ============================================================================
  {
    id: 'losartana',
    nomeGenerico: 'Losartana',
    nomesComerciais: ['Cozaar', 'Aradois', 'Losartan'],
    atcCode: 'C09CA01',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'bra',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Hipertensão arterial',
      'Nefropatia diabética em DM2',
      'Insuficiência cardíaca (quando intolerância a IECA)',
      'Prevenção de AVC em hipertensos com HVE'
    ],
    mecanismoAcao: 'Bloqueia seletivamente o receptor AT1 da angiotensina II. Não causa tosse (não afeta bradicinina).',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '50-100mg', frequencia: '1x/dia', doseMaxima: '100mg/dia' }
      },
      {
        indicacao: 'Nefropatia diabética',
        adultos: { dose: '50mg', frequencia: '1x/dia, titular até 100mg' }
      }
    ],
    contraindicacoes: ['Gestação', 'Hipercalemia grave'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Hipotensão', 'Hipercalemia'],
      graves: ['Angioedema (raro)', 'IRA']
    },
    interacoes: [
      { medicamento: 'AINEs', gravidade: 'moderada', efeito: 'Redução eficácia, piora renal', conduta: 'Evitar' },
      { medicamento: 'Suplementos de K', gravidade: 'moderada', efeito: 'Hipercalemia', conduta: 'Evitar' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar - dados insuficientes' }
  },
  {
    id: 'valsartana',
    nomeGenerico: 'Valsartana',
    nomesComerciais: ['Diovan', 'Tareg'],
    atcCode: 'C09CA03',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'bra',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '80mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '160mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '320mg', disponivelSUS: false }
    ],
    indicacoes: ['Hipertensão', 'Insuficiência cardíaca', 'Pós-IAM'],
    mecanismoAcao: 'BRA com evidência em IC (Val-HeFT). Pode ser usado em sacubitril/valsartana.',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '80-320mg', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Gestação', 'Uso com sacubitril sem washout de IECA'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Fadiga'],
      graves: ['Angioedema', 'IRA']
    },
    interacoes: [],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar' }
  },
  {
    id: 'candesartana',
    nomeGenerico: 'Candesartana',
    nomesComerciais: ['Atacand', 'Blopress'],
    atcCode: 'C09CA06',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'bra',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '8mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '16mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '32mg', disponivelSUS: false }
    ],
    indicacoes: ['Hipertensão', 'Insuficiência cardíaca'],
    mecanismoAcao: 'BRA potente com meia-vida longa.',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '8-32mg', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Gestação'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Cefaleia'],
      graves: ['Hipercalemia']
    },
    interacoes: [],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar' }
  },

  // ============================================================================
  // BLOQUEADORES DE CANAIS DE CÁLCIO
  // ============================================================================
  {
    id: 'anlodipino',
    nomeGenerico: 'Anlodipino',
    nomesComerciais: ['Norvasc', 'Pressat', 'Amlodil'],
    atcCode: 'C08CA01',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'bcc',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Hipertensão arterial',
      'Angina estável',
      'Angina vasoespástica (Prinzmetal)'
    ],
    mecanismoAcao: 'BCC diidropiridínico. Bloqueia canais de cálcio tipo L na musculatura lisa vascular, causando vasodilatação.',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '5-10mg', frequencia: '1x/dia', doseMaxima: '10mg/dia' },
        idosos: { dose: '2,5-5mg', observacoes: 'Iniciar com dose baixa' }
      }
    ],
    contraindicacoes: ['Choque cardiogênico', 'Estenose aórtica grave'],
    efeitosAdversos: {
      comuns: ['Edema periférico (tornozelos)', 'Cefaleia', 'Rubor facial', 'Palpitações'],
      graves: ['Hipotensão grave', 'Edema pulmonar (raro)']
    },
    interacoes: [
      { medicamento: 'Sinvastatina', gravidade: 'moderada', efeito: 'Aumento de sinvastatina', conduta: 'Limitar sinvastatina a 20mg' },
      { medicamento: 'Ciclosporina', gravidade: 'moderada', efeito: 'Aumento de ciclosporina', conduta: 'Monitorar níveis' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' }
  },
  {
    id: 'nifedipino',
    nomeGenerico: 'Nifedipino',
    nomesComerciais: ['Adalat', 'Oxcord'],
    atcCode: 'C08CA05',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'bcc',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg (retard)', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '30mg (retard)', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '60mg (OROS)', disponivelSUS: false }
    ],
    indicacoes: [
      'Hipertensão arterial',
      'Angina vasoespástica',
      'Fenômeno de Raynaud',
      'Tocólise (uso hospitalar)'
    ],
    mecanismoAcao: 'BCC diidropiridínico de ação curta (liberação imediata) ou prolongada (retard/OROS).',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '30-60mg (retard)', frequencia: '1x/dia', observacoes: 'NÃO usar liberação imediata para HAS crônica' }
      }
    ],
    contraindicacoes: ['IAM agudo', 'Choque cardiogênico', 'Estenose aórtica grave'],
    precaucoes: ['Formulação de liberação imediata SL pode causar hipotensão grave e isquemia'],
    efeitosAdversos: {
      comuns: ['Edema', 'Cefaleia', 'Rubor', 'Taquicardia reflexa'],
      graves: ['Hipotensão grave', 'Isquemia miocárdica']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'leve', efeito: 'Efeito aditivo', conduta: 'Pode ser usado com cuidado' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },
  {
    id: 'verapamil',
    nomeGenerico: 'Verapamil',
    nomesComerciais: ['Dilacoron', 'Verapamil'],
    atcCode: 'C08DA01',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'bcc',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '80mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '120mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '240mg (retard)', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '5mg/2mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Hipertensão arterial',
      'Angina estável',
      'Controle de FC em FA/Flutter',
      'TPSV (IV)',
      'Enxaqueca (profilaxia)'
    ],
    mecanismoAcao: 'BCC fenilalquilamina. Atua em coração (cronotrópico e inotrópico negativo) e vasos.',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '120-480mg', frequencia: 'Dividido em 2-3x/dia ou 1x/dia (retard)' }
      },
      {
        indicacao: 'TPSV',
        adultos: { dose: '5-10mg IV lento', frequencia: 'Em 2 minutos' }
      }
    ],
    contraindicacoes: ['Bradicardia grave', 'BAV 2º/3º grau', 'IC descompensada', 'Uso com betabloqueador IV', 'WPW com FA'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Tontura', 'Edema', 'Bradicardia'],
      graves: ['BAV', 'Assistolia (IV)', 'ICC']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'grave', efeito: 'Bradicardia, BAV, hipotensão', conduta: 'Evitar associação IV; VO com cautela' },
      { medicamento: 'Digoxina', gravidade: 'moderada', efeito: 'Aumento de digoxina', conduta: 'Reduzir digoxina 50%' },
      { medicamento: 'Estatinas', gravidade: 'moderada', efeito: 'Miopatia', conduta: 'Limitar dose de estatina' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },
  {
    id: 'diltiazem',
    nomeGenerico: 'Diltiazem',
    nomesComerciais: ['Cardizem', 'Balcor'],
    atcCode: 'C08DB01',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'bcc',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '60mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '90mg (retard)', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '25mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Hipertensão',
      'Angina estável',
      'Controle de FC em FA/Flutter',
      'TPSV'
    ],
    mecanismoAcao: 'BCC benzotiazepínico. Efeitos intermediários entre verapamil e diidropiridínicos.',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '180-360mg', frequencia: '1x/dia (retard) ou dividido' }
      }
    ],
    contraindicacoes: ['Bradicardia grave', 'BAV', 'IC sistólica descompensada'],
    efeitosAdversos: {
      comuns: ['Edema', 'Cefaleia', 'Bradicardia'],
      graves: ['BAV', 'ICC']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Bradicardia', conduta: 'Usar com cautela' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },

  // ============================================================================
  // BETABLOQUEADORES
  // ============================================================================
  {
    id: 'metoprolol',
    nomeGenerico: 'Metoprolol',
    nomesComerciais: ['Seloken', 'Lopressor'],
    atcCode: 'C07AB02',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'betabloqueador',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '25mg (succinato XR)', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '5mg/5mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Hipertensão arterial',
      'Insuficiência cardíaca com FE reduzida',
      'Angina estável',
      'Pós-IAM',
      'Controle de FC em FA',
      'Arritmias supraventriculares'
    ],
    mecanismoAcao: 'Betabloqueador β1-seletivo. Reduz cronotropismo, inotropismo e consumo miocárdico de O2.',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '50-200mg', frequencia: '1-2x/dia' }
      },
      {
        indicacao: 'Insuficiência cardíaca',
        adultos: { dose: '12,5-25mg', frequencia: 'Iniciar baixo, titular a cada 2 sem até 200mg/dia (succinato)' }
      }
    ],
    contraindicacoes: ['Bradicardia grave', 'BAV 2º/3º grau', 'Choque cardiogênico', 'IC descompensada aguda', 'Asma'],
    efeitosAdversos: {
      comuns: ['Bradicardia', 'Fadiga', 'Extremidades frias', 'Tontura'],
      graves: ['Broncoespasmo', 'BAV', 'IC descompensada', 'Depressão']
    },
    interacoes: [
      { medicamento: 'Verapamil/Diltiazem', gravidade: 'grave', efeito: 'Bradicardia/BAV', conduta: 'Evitar, especialmente IV' },
      { medicamento: 'Clonidina', gravidade: 'moderada', efeito: 'Crise hipertensiva na retirada', conduta: 'Retirar BB antes da clonidina' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível, monitorar bradicardia no lactente' }
  },
  {
    id: 'bisoprolol',
    nomeGenerico: 'Bisoprolol',
    nomesComerciais: ['Concor', 'Bisoprolol'],
    atcCode: 'C07AB07',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'betabloqueador',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1,25mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '2,5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false }
    ],
    indicacoes: ['Hipertensão', 'Insuficiência cardíaca', 'Angina'],
    mecanismoAcao: 'BB β1-seletivo altamente cardiosseletivo. Dose única diária.',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '5-10mg', frequencia: '1x/dia' }
      },
      {
        indicacao: 'IC',
        adultos: { dose: '1,25mg', frequencia: 'Iniciar, titular até 10mg' }
      }
    ],
    contraindicacoes: ['Bradicardia', 'BAV', 'Asma descompensada'],
    efeitosAdversos: {
      comuns: ['Fadiga', 'Cefaleia', 'Bradicardia'],
      graves: ['Broncoespasmo', 'BAV']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' }
  },
  {
    id: 'nebivolol',
    nomeGenerico: 'Nebivolol',
    nomesComerciais: ['Nebilet', 'Bystolic'],
    atcCode: 'C07AB12',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'betabloqueador',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false }
    ],
    indicacoes: ['Hipertensão', 'Insuficiência cardíaca (idosos)'],
    mecanismoAcao: 'BB β1-seletivo com propriedade vasodilatadora (liberação de óxido nítrico). Metabolicamente neutro.',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '5-10mg', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Bradicardia', 'BAV', 'Hepatopatia grave'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Fadiga', 'Edema'],
      graves: ['Bradicardia grave']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  },

  // ============================================================================
  // DIURÉTICOS
  // ============================================================================
  {
    id: 'indapamida',
    nomeGenerico: 'Indapamida',
    nomesComerciais: ['Natrilix', 'Indapen'],
    atcCode: 'C03BA11',
    classeTerapeutica: 'diuretico',
    subclasse: 'tiazidico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1,5mg SR', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2,5mg', disponivelSUS: true }
    ],
    indicacoes: ['Hipertensão arterial'],
    mecanismoAcao: 'Tiazídico-símile. Efeito vasodilatador além do diurético. Menos efeitos metabólicos que HCTZ.',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '1,5mg SR', frequencia: '1x/dia pela manhã' }
      }
    ],
    contraindicacoes: ['Anúria', 'Insuficiência hepática grave', 'Hipocalemia grave'],
    efeitosAdversos: {
      comuns: ['Hipocalemia (menos que HCTZ)', 'Hiperuricemia'],
      graves: ['Hiponatremia', 'Prolongamento QT']
    },
    interacoes: [
      { medicamento: 'Lítio', gravidade: 'moderada', efeito: 'Aumento de lítio', conduta: 'Monitorar litemia' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Dados limitados' }
  },
  {
    id: 'clortalidona',
    nomeGenerico: 'Clortalidona',
    nomesComerciais: ['Higroton'],
    atcCode: 'C03BA04',
    classeTerapeutica: 'diuretico',
    subclasse: 'tiazidico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '12,5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true }
    ],
    indicacoes: ['Hipertensão', 'Edema'],
    mecanismoAcao: 'Tiazídico-símile de longa ação. Mais potente que HCTZ em redução de PA.',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '12,5-25mg', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Anúria', 'Hipocalemia refratária'],
    efeitosAdversos: {
      comuns: ['Hipocalemia', 'Hiperuricemia', 'Hiperglicemia'],
      graves: ['Hiponatremia grave']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },

  // ============================================================================
  // ANTICOAGULANTES
  // ============================================================================
  {
    id: 'rivaroxabana',
    nomeGenerico: 'Rivaroxabana',
    nomesComerciais: ['Xarelto'],
    atcCode: 'B01AF01',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'doac',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '15mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Prevenção de AVC em FA não valvar',
      'Tratamento e profilaxia de TVP/TEP',
      'Prevenção de TEV pós-cirurgia ortopédica',
      'Doença arterial coronariana/periférica (2,5mg 2x)'
    ],
    mecanismoAcao: 'Inibidor direto do fator Xa. DOAC com dose única diária (FA) ou 2x/dia (TEV agudo).',
    posologias: [
      {
        indicacao: 'FA não valvar',
        adultos: { dose: '20mg', frequencia: '1x/dia com alimento', observacoes: '15mg se ClCr 15-50' }
      },
      {
        indicacao: 'TVP/TEP agudo',
        adultos: { dose: '15mg', frequencia: '2x/dia por 21 dias, depois 20mg 1x/dia' }
      }
    ],
    contraindicacoes: ['Sangramento ativo', 'Hepatopatia com coagulopatia', 'ClCr <15mL/min', 'Prótese valvar mecânica'],
    efeitosAdversos: {
      comuns: ['Sangramento menor', 'Náuseas'],
      graves: ['Hemorragia grave', 'Sangramento intracraniano']
    },
    interacoes: [
      { medicamento: 'Antifúngicos azólicos', gravidade: 'grave', efeito: 'Aumento de rivaroxabana', conduta: 'Evitar' },
      { medicamento: 'Rifampicina', gravidade: 'grave', efeito: 'Redução de rivaroxabana', conduta: 'Evitar' },
      { medicamento: 'AAS/AINEs', gravidade: 'moderada', efeito: 'Aumento risco sangramento', conduta: 'Usar com cautela' }
    ],
    ajusteDoseRenal: [
      { tfg: '15-50', ajuste: '15mg 1x/dia para FA; manter doses para TEV' },
      { tfg: '<15', ajuste: 'Evitar' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' }
  },
  {
    id: 'apixabana',
    nomeGenerico: 'Apixabana',
    nomesComerciais: ['Eliquis'],
    atcCode: 'B01AF02',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'doac',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2,5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false }
    ],
    indicacoes: [
      'FA não valvar',
      'Tratamento e profilaxia de TVP/TEP',
      'Profilaxia TEV pós-cirurgia ortopédica'
    ],
    mecanismoAcao: 'Inibidor direto do fator Xa. Menor eliminação renal que outros DOACs.',
    posologias: [
      {
        indicacao: 'FA',
        adultos: { dose: '5mg', frequencia: '12/12h', observacoes: '2,5mg 12/12h se ≥2 de: idade≥80, peso≤60kg, Cr≥1,5' }
      },
      {
        indicacao: 'TEV',
        adultos: { dose: '10mg 12/12h por 7 dias', frequencia: 'Depois 5mg 12/12h' }
      }
    ],
    contraindicacoes: ['Sangramento ativo', 'Hepatopatia grave', 'Prótese valvar'],
    efeitosAdversos: {
      comuns: ['Sangramento menor'],
      graves: ['Hemorragia grave']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4/P-gp', gravidade: 'grave', efeito: 'Aumento de apixabana', conduta: 'Evitar ou reduzir dose' }
    ],
    ajusteDoseRenal: [
      { tfg: '15-29', ajuste: 'Usar com cautela' },
      { tfg: '<15', ajuste: 'Evitar' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' }
  },
  {
    id: 'dabigatrana',
    nomeGenerico: 'Dabigatrana',
    nomesComerciais: ['Pradaxa'],
    atcCode: 'B01AE07',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'doac',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '75mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '110mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '150mg', disponivelSUS: false }
    ],
    indicacoes: [
      'FA não valvar',
      'Tratamento e profilaxia de TVP/TEP',
      'Profilaxia TEV pós-ortopédica'
    ],
    mecanismoAcao: 'Inibidor direto da trombina. Tem antídoto específico (idarucizumabe).',
    posologias: [
      {
        indicacao: 'FA',
        adultos: { dose: '150mg', frequencia: '12/12h', observacoes: '110mg 12/12h se >80 anos ou ClCr 30-50' }
      }
    ],
    contraindicacoes: ['Sangramento ativo', 'ClCr <30', 'Prótese valvar', 'Uso com cetoconazol sistêmico'],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Sangramento'],
      graves: ['Hemorragia grave']
    },
    interacoes: [
      { medicamento: 'Verapamil', gravidade: 'moderada', efeito: 'Aumento dabigatrana', conduta: 'Reduzir dose' },
      { medicamento: 'Rifampicina', gravidade: 'grave', efeito: 'Redução dabigatrana', conduta: 'Evitar' }
    ],
    ajusteDoseRenal: [
      { tfg: '30-50', ajuste: '110mg 12/12h' },
      { tfg: '<30', ajuste: 'Contraindicado' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' }
  },
  {
    id: 'varfarina',
    nomeGenerico: 'Varfarina',
    nomesComerciais: ['Marevan', 'Coumadin'],
    atcCode: 'B01AA03',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'antagonista_vitamina_k',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true }
    ],
    indicacoes: [
      'FA valvar e não valvar',
      'Prótese valvar mecânica',
      'TVP/TEP',
      'Síndrome antifosfolípide'
    ],
    mecanismoAcao: 'Antagonista da vitamina K. Inibe fatores de coagulação II, VII, IX, X.',
    posologias: [
      {
        indicacao: 'Anticoagulação',
        adultos: { dose: 'Variável', frequencia: 'Guiada pelo INR', observacoes: 'Iniciar 5mg/dia, ajustar para INR 2-3' }
      }
    ],
    contraindicacoes: ['Sangramento ativo', 'Gestação (1º trimestre)', 'Cirurgia recente em SNC'],
    precaucoes: ['Múltiplas interações medicamentosas e alimentares', 'Monitorização frequente de INR'],
    efeitosAdversos: {
      comuns: ['Sangramento menor'],
      graves: ['Hemorragia maior', 'Necrose cutânea (deficiência de proteína C)']
    },
    interacoes: [
      { medicamento: 'AINEs', gravidade: 'grave', efeito: 'Sangramento', conduta: 'Evitar, monitorar INR' },
      { medicamento: 'Antibióticos', gravidade: 'moderada', efeito: 'Alteração INR', conduta: 'Monitorar INR' },
      { medicamento: 'Amiodarona', gravidade: 'grave', efeito: 'Aumento INR', conduta: 'Reduzir varfarina 30-50%' },
      { medicamento: 'Vitamina K (alimentos)', gravidade: 'moderada', efeito: 'Redução INR', conduta: 'Manter dieta constante' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },

  // ============================================================================
  // ANTIPLAQUETÁRIOS
  // ============================================================================
  {
    id: 'clopidogrel',
    nomeGenerico: 'Clopidogrel',
    nomesComerciais: ['Plavix', 'Plagrel'],
    atcCode: 'B01AC04',
    classeTerapeutica: 'antiagregante',
    subclasse: 'inibidor_p2y12',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '75mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Prevenção secundária após IAM/AVC/DAP',
      'Após stent coronariano (terapia dupla)',
      'SCA (em associação com AAS)',
      'Alternativa a AAS em intolerantes'
    ],
    mecanismoAcao: 'Pró-fármaco que inibe irreversivelmente receptor P2Y12 plaquetário. Efeito dura a vida da plaqueta (~7-10 dias).',
    posologias: [
      {
        indicacao: 'Prevenção secundária',
        adultos: { dose: '75mg', frequencia: '1x/dia' }
      },
      {
        indicacao: 'SCA',
        adultos: { dose: '300-600mg (ataque)', frequencia: 'Depois 75mg/dia' }
      }
    ],
    contraindicacoes: ['Sangramento ativo patológico', 'Insuficiência hepática grave'],
    precaucoes: ['Polimorfismo CYP2C19 (metabolizadores lentos têm resposta reduzida)'],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Rash', 'Equimoses'],
      graves: ['Hemorragia grave', 'Púrpura trombocitopênica trombótica (raro)']
    },
    interacoes: [
      { medicamento: 'Omeprazol', gravidade: 'moderada', efeito: 'Redução de eficácia', conduta: 'Preferir pantoprazol' },
      { medicamento: 'Anticoagulantes', gravidade: 'moderada', efeito: 'Aumento sangramento', conduta: 'Cuidado em terapia tripla' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  },
  {
    id: 'ticagrelor',
    nomeGenerico: 'Ticagrelor',
    nomesComerciais: ['Brilinta'],
    atcCode: 'B01AC24',
    classeTerapeutica: 'antiagregante',
    subclasse: 'inibidor_p2y12',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '90mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '60mg', disponivelSUS: false }
    ],
    indicacoes: [
      'SCA (com ou sem intervenção)',
      'Pós-IAM (prevenção secundária)',
      'DAC com alto risco (60mg)'
    ],
    mecanismoAcao: 'Inibidor reversível do P2Y12. Não requer ativação metabólica. Início de ação rápido.',
    posologias: [
      {
        indicacao: 'SCA',
        adultos: { dose: '180mg (ataque)', frequencia: 'Depois 90mg 12/12h por 12 meses' }
      }
    ],
    contraindicacoes: ['Sangramento ativo', 'AVC hemorrágico prévio', 'Hepatopatia grave', 'Uso com inibidores potentes de CYP3A4'],
    efeitosAdversos: {
      comuns: ['Dispneia (14%)', 'Cefaleia', 'Bradicardia'],
      graves: ['Hemorragia grave']
    },
    interacoes: [
      { medicamento: 'Sinvastatina/lovastatina', gravidade: 'moderada', efeito: 'Aumento estatina', conduta: 'Limitar dose' },
      { medicamento: 'Digoxina', gravidade: 'leve', efeito: 'Aumento de digoxina', conduta: 'Monitorar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' }
  },

  // ============================================================================
  // ESTATINAS
  // ============================================================================
  {
    id: 'atorvastatina',
    nomeGenerico: 'Atorvastatina',
    nomesComerciais: ['Lipitor', 'Citalor'],
    atcCode: 'C10AA05',
    classeTerapeutica: 'hipolipemiante',
    subclasse: 'estatina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '80mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Dislipidemia',
      'Prevenção primária e secundária cardiovascular',
      'Pós-SCA (alta intensidade)'
    ],
    mecanismoAcao: 'Inibe HMG-CoA redutase. Estatina de alta potência. Reduz LDL em 50% ou mais em dose alta.',
    posologias: [
      {
        indicacao: 'Alta intensidade',
        adultos: { dose: '40-80mg', frequencia: '1x/dia (preferencialmente à noite)' }
      },
      {
        indicacao: 'Intensidade moderada',
        adultos: { dose: '10-20mg', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Hepatopatia ativa', 'Gestação', 'Amamentação'],
    efeitosAdversos: {
      comuns: ['Mialgia', 'Cefaleia', 'Constipação'],
      graves: ['Rabdomiólise', 'Hepatotoxicidade', 'Diabetes de novo']
    },
    interacoes: [
      { medicamento: 'Fibratos', gravidade: 'grave', efeito: 'Rabdomiólise', conduta: 'Evitar gemfibrozila; fenofibrato com cautela' },
      { medicamento: 'Ciclosporina', gravidade: 'grave', efeito: 'Miopatia', conduta: 'Limitar dose de estatina' },
      { medicamento: 'Claritromicina/Itraconazol', gravidade: 'moderada', efeito: 'Aumento de estatina', conduta: 'Suspender temporariamente' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' }
  },
  {
    id: 'rosuvastatina',
    nomeGenerico: 'Rosuvastatina',
    nomesComerciais: ['Crestor', 'Rosucor'],
    atcCode: 'C10AA07',
    classeTerapeutica: 'hipolipemiante',
    subclasse: 'estatina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: false }
    ],
    indicacoes: ['Dislipidemia', 'Prevenção CV primária e secundária'],
    mecanismoAcao: 'Estatina de alta potência, mais hidrofílica. Menos metabolizada por CYP450.',
    posologias: [
      {
        indicacao: 'Alta intensidade',
        adultos: { dose: '20-40mg', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Hepatopatia ativa', 'Gestação'],
    efeitosAdversos: {
      comuns: ['Mialgia', 'Cefaleia'],
      graves: ['Rabdomiólise', 'Proteinúria (doses altas)']
    },
    interacoes: [
      { medicamento: 'Ciclosporina', gravidade: 'grave', efeito: 'Miopatia', conduta: 'Dose máx 5mg' }
    ],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Iniciar 5mg, máximo 10mg' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' }
  },

  // ============================================================================
  // ANTIARRÍTMICOS
  // ============================================================================
  {
    id: 'amiodarona',
    nomeGenerico: 'Amiodarona',
    nomesComerciais: ['Ancoron', 'Cordarone'],
    atcCode: 'C01BD01',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '150mg/3mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Fibrilação atrial (controle de ritmo/FC)',
      'Flutter atrial',
      'Taquicardia ventricular',
      'Prevenção de morte súbita (com CDI)',
      'PCR com TV/FV refratária'
    ],
    mecanismoAcao: 'Antiarrítmico classe III (bloqueia canais K+), mas também tem efeito classe I, II e IV. Prolonga duração do potencial de ação.',
    posologias: [
      {
        indicacao: 'FA (impregnação oral)',
        adultos: { dose: '200mg 3x/dia por 1-2 semanas', frequencia: 'Depois 200mg 2x/dia por 2-4 semanas, manutenção 200mg/dia' }
      },
      {
        indicacao: 'PCR',
        adultos: { dose: '300mg IV em bolus', frequencia: 'Dose única', observacoes: 'Pode repetir 150mg' }
      }
    ],
    contraindicacoes: ['Disfunção tireoidiana grave', 'Bradicardia/BAV grave sem marcapasso', 'Pneumopatia grave'],
    precaucoes: ['Monitorar função tireoidiana, hepática e pulmonar regularmente', 'Fotossensibilidade'],
    efeitosAdversos: {
      comuns: ['Fotossensibilidade', 'Bradicardia', 'Náuseas', 'Microdepósitos corneanos'],
      graves: ['Tireotoxicose/hipotireoidismo', 'Fibrose pulmonar', 'Hepatotoxicidade', 'Torsades de pointes']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'grave', efeito: 'Aumento INR 50-100%', conduta: 'Reduzir varfarina pela metade' },
      { medicamento: 'Digoxina', gravidade: 'grave', efeito: 'Aumento de digoxina 50%', conduta: 'Reduzir digoxina' },
      { medicamento: 'Estatinas', gravidade: 'moderada', efeito: 'Miopatia', conduta: 'Usar doses baixas' },
      { medicamento: 'Betabloqueadores/BCC', gravidade: 'moderada', efeito: 'Bradicardia/BAV', conduta: 'Cautela' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado - concentração alta no leite' }
  },
  {
    id: 'digoxina',
    nomeGenerico: 'Digoxina',
    nomesComerciais: ['Digoxina', 'Lanoxin'],
    atcCode: 'C01AA05',
    classeTerapeutica: 'cardiotonico',
    subclasse: 'glicosideo_cardiaco',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,25mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '0,5mg/2mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Controle de FC em FA',
      'IC com FE reduzida sintomática (adjuvante)'
    ],
    mecanismoAcao: 'Inibe Na+/K+-ATPase, aumentando cálcio intracelular (inotrópico +). Também atua em barorreceptores (diminui tônus simpático).',
    posologias: [
      {
        indicacao: 'FA (sem impregnação)',
        adultos: { dose: '0,125-0,25mg', frequencia: '1x/dia', observacoes: 'Alvo nível sérico 0,5-0,9 ng/mL' }
      }
    ],
    contraindicacoes: ['Bradicardia grave', 'BAV 2º/3º grau', 'TV/FV', 'WPW', 'Miocardiopatia hipertrófica obstrutiva'],
    precaucoes: ['Estreita janela terapêutica', 'Hipocalemia potencializa toxicidade'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Anorexia', 'Alteração visual (halos amarelos)'],
      graves: ['Arritmias graves (BAV, TV)', 'Toxicidade digitálica']
    },
    interacoes: [
      { medicamento: 'Amiodarona', gravidade: 'grave', efeito: 'Aumento 50% digoxina', conduta: 'Reduzir digoxina' },
      { medicamento: 'Verapamil', gravidade: 'grave', efeito: 'Aumento digoxina', conduta: 'Reduzir digoxina' },
      { medicamento: 'Diuréticos', gravidade: 'moderada', efeito: 'Hipocalemia aumenta toxicidade', conduta: 'Monitorar K+' },
      { medicamento: 'Claritromicina', gravidade: 'grave', efeito: 'Aumento digoxina', conduta: 'Monitorar nível' }
    ],
    ajusteDoseRenal: [
      { tfg: '30-60', ajuste: '0,125mg/dia' },
      { tfg: '<30', ajuste: '0,0625-0,125mg/dia ou alternado' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  }
];
