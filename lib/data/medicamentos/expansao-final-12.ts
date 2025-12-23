/**
 * EXPANSÃO FINAL 12 - DARWIN-MFC
 * ===============================
 *
 * Últimos 15 medicamentos para completar 600+
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosFinal12: Partial<Medicamento>[] = [
  // Anticonvulsivantes essenciais
  {
    id: 'carbamazepina',
    nomeGenerico: 'Carbamazepina',
    nomesComerciais: ['Tegretol', 'Tegretard'],
    atcCode: 'N03AF01',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'bloqueador_canal_sodio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
      { forma: 'comprimido_cr', concentracao: '200mg', disponivelSUS: true },
      { forma: 'comprimido_cr', concentracao: '400mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '20mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Epilepsia (parcial, tônico-clônica)', 'Neuralgia do trigêmeo', 'Transtorno bipolar'],
    mecanismoAcao: 'Bloqueia canais de sódio voltagem-dependentes',
    posologias: [
      {
        indicacao: 'Epilepsia',
        adultos: { dose: '200mg 12/12h inicial', frequencia: 'Aumentar 200mg/semana', doseMaxima: '1600mg/dia' },
        pediatrico: { dose: '10-20mg/kg/dia', frequencia: 'Dividido 2-3x' },
      }
    ],
    contraindicacoes: ['Bloqueio AV', 'Porfiria', 'Uso de IMAO', 'Supressão medular'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Sonolência', 'Ataxia', 'Diplopia', 'Náuseas'],
      graves: ['Agranulocitose', 'Anemia aplásica', 'Stevens-Johnson', 'SIADH', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Contraceptivos hormonais', gravidade: 'grave', efeito: 'Reduz eficácia', conduta: 'Usar método adicional' },
      { medicamento: 'Varfarina', gravidade: 'grave', efeito: 'Reduz INR', conduta: 'Aumentar dose varfarina' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível com monitorização' },
    monitorizacao: ['Hemograma', 'TGO/TGP', 'Na+ (SIADH)', 'Nível sérico (4-12 mcg/ml)'],
    doencasRelacionadas: ['epilepsia', 'neuralgia-trigemeo', 'tab'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'fenitoina',
    nomeGenerico: 'Fenitoína',
    nomesComerciais: ['Hidantal', 'Epelin'],
    atcCode: 'N03AB02',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'bloqueador_canal_sodio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '50mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Epilepsia', 'Status epilepticus', 'Profilaxia convulsão pós-TCE'],
    mecanismoAcao: 'Bloqueia canais de sódio; estabiliza membranas',
    posologias: [
      {
        indicacao: 'Epilepsia crônica',
        adultos: { dose: '300-400mg', frequencia: '1x/dia ou dividido', doseMaxima: '600mg/dia' },
      },
      {
        indicacao: 'Status epilepticus',
        adultos: { dose: '15-20mg/kg IV', frequencia: 'Max 50mg/min' },
      }
    ],
    contraindicacoes: ['Bradicardia sinusal', 'Bloqueio AV', 'Síndrome de Adams-Stokes', 'Porfiria'],
    efeitosAdversos: {
      comuns: ['Hiperplasia gengival', 'Hirsutismo', 'Ataxia', 'Nistagmo'],
      graves: ['Arritmias (IV)', 'Síndrome Purple Glove', 'Stevens-Johnson', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'grave', efeito: 'Interação complexa', conduta: 'Monitorar INR' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Nível sérico (10-20 mcg/ml)', 'Hemograma', 'TGO/TGP'],
    doencasRelacionadas: ['epilepsia', 'status-epilepticus'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Hipoglicemiantes adicionais
  {
    id: 'glibenclamida',
    nomeGenerico: 'Glibenclamida',
    nomesComerciais: ['Daonil', 'Euglucon'],
    atcCode: 'A10BB01',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'sulfonilureia',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
    ],
    indicacoes: ['DM2'],
    mecanismoAcao: 'Sulfonilureia; estimula liberação de insulina',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '2,5-5mg', frequencia: '1-2x/dia com refeição', doseMaxima: '20mg/dia' },
      }
    ],
    contraindicacoes: ['DM1', 'Cetoacidose', 'Insuficiência hepática/renal grave'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Ganho de peso', 'Náuseas'],
      graves: ['Hipoglicemia grave e prolongada', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Mascara hipoglicemia', conduta: 'Monitorar glicemia' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Hipoglicemia neonatal' },
    ajusteDoseRenal: [
      { tfg: '<60', ajuste: 'Evitar; preferir outras classes' },
    ],
    doencasRelacionadas: ['diabetes-tipo2'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'glimepirida',
    nomeGenerico: 'Glimepirida',
    nomesComerciais: ['Amaryl', 'Glimepil'],
    atcCode: 'A10BB12',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'sulfonilureia',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: true },
    ],
    indicacoes: ['DM2'],
    mecanismoAcao: 'Sulfonilureia de 3ª geração; menor risco de hipoglicemia',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '1-2mg', frequencia: '1x/dia com primeira refeição', doseMaxima: '8mg/dia' },
      }
    ],
    contraindicacoes: ['DM1', 'Cetoacidose', 'Alergia a sulfonamidas'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Ganho de peso'],
      graves: ['Hipoglicemia grave']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    doencasRelacionadas: ['diabetes-tipo2'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antihipertensivos essenciais
  {
    id: 'anlodipino',
    nomeGenerico: 'Anlodipino',
    nomesComerciais: ['Norvasc', 'Pressat'],
    atcCode: 'C08CA01',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'bcc',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
    ],
    indicacoes: ['Hipertensão', 'Angina estável', 'Angina vasoespástica'],
    mecanismoAcao: 'BCC diidropiridínico; vasodilatador periférico',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '5mg', frequencia: '1x/dia', doseMaxima: '10mg/dia' },
      }
    ],
    contraindicacoes: ['Hipotensão grave', 'Choque cardiogênico', 'Estenose aórtica grave'],
    efeitosAdversos: {
      comuns: ['Edema periférico', 'Cefaleia', 'Rubor', 'Palpitações'],
      graves: ['Hipotensão']
    },
    interacoes: [
      { medicamento: 'Sinvastatina', gravidade: 'moderada', efeito: 'Aumenta estatina', conduta: 'Limitar sinvastatina 20mg' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['hipertensao', 'angina'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'atenolol',
    nomeGenerico: 'Atenolol',
    nomesComerciais: ['Atenol', 'Ablok'],
    atcCode: 'C07AB03',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'betabloqueador',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
    ],
    indicacoes: ['Hipertensão', 'Angina', 'Arritmias', 'Pós-IAM'],
    mecanismoAcao: 'Betabloqueador beta-1 seletivo; hidrofílico',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '25-50mg', frequencia: '1x/dia', doseMaxima: '100mg/dia' },
      }
    ],
    contraindicacoes: ['Bradicardia grave', 'Bloqueio AV 2º/3º grau', 'ICC descompensada', 'Asma'],
    efeitosAdversos: {
      comuns: ['Bradicardia', 'Fadiga', 'Extremidades frias', 'Tontura'],
      graves: ['Broncoespasmo', 'Bloqueio AV', 'Depressão']
    },
    interacoes: [
      { medicamento: 'Verapamil', gravidade: 'grave', efeito: 'Bradicardia/Bloqueio', conduta: 'Evitar' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    ajusteDoseRenal: [
      { tfg: '15-35', ajuste: '50mg/dia' },
      { tfg: '<15', ajuste: '25mg/dia ou dias alternados' },
    ],
    doencasRelacionadas: ['hipertensao', 'angina', 'arritmia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'propranolol',
    nomeGenerico: 'Propranolol',
    nomesComerciais: ['Inderal', 'Rebaten'],
    atcCode: 'C07AA05',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'betabloqueador',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '80mg', disponivelSUS: true },
    ],
    indicacoes: ['Hipertensão', 'Angina', 'Arritmias', 'Tremor essencial', 'Profilaxia enxaqueca', 'Ansiedade de desempenho'],
    mecanismoAcao: 'Betabloqueador não seletivo; lipofílico',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '40mg', frequencia: '12/12h, aumentar conforme resposta', doseMaxima: '640mg/dia' },
      },
      {
        indicacao: 'Profilaxia enxaqueca',
        adultos: { dose: '40mg', frequencia: '2-3x/dia' },
      }
    ],
    contraindicacoes: ['Asma', 'DPOC grave', 'Bradicardia grave', 'Bloqueio AV', 'ICC descompensada'],
    efeitosAdversos: {
      comuns: ['Bradicardia', 'Fadiga', 'Extremidades frias', 'Pesadelos', 'Broncoespasmo'],
      graves: ['Broncoespasmo grave', 'Bloqueio AV']
    },
    interacoes: [
      { medicamento: 'Clonidina', gravidade: 'grave', efeito: 'Hipertensão rebote', conduta: 'Descontinuar BB antes' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['hipertensao', 'enxaqueca', 'tremor', 'ansiedade'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Estatinas
  {
    id: 'sinvastatina',
    nomeGenerico: 'Sinvastatina',
    nomesComerciais: ['Zocor', 'Sinvascor'],
    atcCode: 'C10AA01',
    classeTerapeutica: 'hipolipemiante',
    subclasse: 'estatina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true },
    ],
    indicacoes: ['Hipercolesterolemia', 'Prevenção cardiovascular', 'Dislipidemia mista'],
    mecanismoAcao: 'Inibe HMG-CoA redutase; reduz síntese de colesterol',
    posologias: [
      {
        indicacao: 'Dislipidemia',
        adultos: { dose: '20-40mg', frequencia: '1x/dia à noite', doseMaxima: '40mg/dia' },
      }
    ],
    contraindicacoes: ['Doença hepática ativa', 'Gestação', 'Uso de potentes inibidores CYP3A4'],
    efeitosAdversos: {
      comuns: ['Mialgia', 'Cefaleia', 'Constipação'],
      graves: ['Rabdomiólise', 'Hepatotoxicidade', 'Miopatia']
    },
    interacoes: [
      { medicamento: 'Amiodarona', gravidade: 'grave', efeito: 'Miopatia', conduta: 'Max 20mg sinvastatina' },
      { medicamento: 'Diltiazem', gravidade: 'moderada', efeito: 'Miopatia', conduta: 'Max 10mg sinvastatina' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['TGO/TGP', 'CPK se mialgia'],
    doencasRelacionadas: ['dislipidemia', 'aterosclerose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
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
      { forma: 'comprimido', concentracao: '80mg', disponivelSUS: true },
    ],
    indicacoes: ['Hipercolesterolemia', 'Prevenção cardiovascular', 'SCA'],
    mecanismoAcao: 'Estatina de alta intensidade',
    posologias: [
      {
        indicacao: 'Prevenção primária',
        adultos: { dose: '10-20mg', frequencia: '1x/dia' },
      },
      {
        indicacao: 'Prevenção secundária/SCA',
        adultos: { dose: '40-80mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Doença hepática ativa', 'Gestação'],
    efeitosAdversos: {
      comuns: ['Mialgia', 'Artralgia', 'Diarreia'],
      graves: ['Rabdomiólise', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Ciclosporina', gravidade: 'grave', efeito: 'Rabdomiólise', conduta: 'Evitar' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['TGO/TGP', 'Perfil lipídico'],
    doencasRelacionadas: ['dislipidemia', 'sca'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // IECA essencial
  {
    id: 'enalapril',
    nomeGenerico: 'Enalapril',
    nomesComerciais: ['Renitec', 'Eupressin'],
    atcCode: 'C09AA02',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'ieca',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
    ],
    indicacoes: ['Hipertensão', 'ICC', 'Disfunção VE pós-IAM', 'Nefropatia diabética'],
    mecanismoAcao: 'Inibidor da ECA; reduz angiotensina II',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '5-10mg', frequencia: '1-2x/dia', doseMaxima: '40mg/dia' },
      },
      {
        indicacao: 'ICC',
        adultos: { dose: '2,5mg inicial', frequencia: '12/12h, titular até 10-20mg 12/12h' },
      }
    ],
    contraindicacoes: ['Angioedema prévio por IECA', 'Estenose bilateral artéria renal', 'Gestação'],
    efeitosAdversos: {
      comuns: ['Tosse seca', 'Tontura', 'Hipotensão (primeira dose)'],
      graves: ['Angioedema', 'Hipercalemia', 'IRA']
    },
    interacoes: [
      { medicamento: 'Suplementos de K+', gravidade: 'moderada', efeito: 'Hipercalemia', conduta: 'Monitorar K+' },
      { medicamento: 'AINEs', gravidade: 'moderada', efeito: 'Reduz efeito; IRA', conduta: 'Monitorar função renal' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    ajusteDoseRenal: [
      { tfg: '30-80', ajuste: 'Iniciar 2,5mg' },
      { tfg: '<30', ajuste: 'Iniciar 2,5mg; dias alternados se necessário' },
    ],
    monitorizacao: ['K+', 'Creatinina'],
    doencasRelacionadas: ['hipertensao', 'icc', 'nefropatia-diabetica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'losartana',
    nomeGenerico: 'Losartana',
    nomesComerciais: ['Cozaar', 'Losartan'],
    atcCode: 'C09CA01',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'bra',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
    ],
    indicacoes: ['Hipertensão', 'Nefropatia diabética', 'ICC (se intolerante a IECA)'],
    mecanismoAcao: 'Antagonista do receptor AT1 da angiotensina II',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '50mg', frequencia: '1x/dia', doseMaxima: '100mg/dia' },
      },
      {
        indicacao: 'Nefropatia diabética',
        adultos: { dose: '50-100mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Gestação', 'Estenose bilateral artéria renal'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Hipotensão', 'Fadiga'],
      graves: ['Hipercalemia', 'IRA', 'Angioedema (raro)']
    },
    interacoes: [
      { medicamento: 'Suplementos K+', gravidade: 'moderada', efeito: 'Hipercalemia', conduta: 'Monitorar K+' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Dados limitados' },
    monitorizacao: ['K+', 'Creatinina'],
    doencasRelacionadas: ['hipertensao', 'nefropatia-diabetica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antiplaquetário essencial
  {
    id: 'aas-acido-acetilsalicilico',
    nomeGenerico: 'Ácido Acetilsalicílico (AAS)',
    nomesComerciais: ['Aspirina', 'AAS', 'Somalgin'],
    atcCode: 'B01AC06',
    classeTerapeutica: 'antiagregante',
    subclasse: 'inibidor_cox',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
    ],
    indicacoes: ['Prevenção cardiovascular secundária', 'SCA', 'AVC isquêmico/AIT', 'Pós-stent'],
    mecanismoAcao: 'Inibe irreversivelmente COX-1 plaquetária',
    posologias: [
      {
        indicacao: 'Prevenção cardiovascular',
        adultos: { dose: '75-100mg', frequencia: '1x/dia' },
      },
      {
        indicacao: 'SCA (ataque)',
        adultos: { dose: '150-300mg mastigável', frequencia: 'Dose única' },
      }
    ],
    contraindicacoes: ['Úlcera péptica ativa', 'Hemofilia', 'Hipersensibilidade', 'Asma induzida por AINEs'],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Sangramento menor'],
      graves: ['Sangramento GI', 'Hemorragia intracraniana', 'Broncoespasmo']
    },
    interacoes: [
      { medicamento: 'Anticoagulantes', gravidade: 'moderada', efeito: 'Risco de sangramento', conduta: 'Monitorar' },
      { medicamento: 'Ibuprofeno', gravidade: 'moderada', efeito: 'Antagonismo do AAS', conduta: 'Dar AAS 2h antes' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Doses baixas são compatíveis' },
    doencasRelacionadas: ['sca', 'avc', 'dac'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Metformina
  {
    id: 'metformina',
    nomeGenerico: 'Metformina',
    nomesComerciais: ['Glifage', 'Glucoformin'],
    atcCode: 'A10BA02',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'biguanida',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '850mg', disponivelSUS: true },
      { forma: 'comprimido_xr', concentracao: '500mg', disponivelSUS: true },
    ],
    indicacoes: ['DM2', 'Pré-diabetes', 'SOP'],
    mecanismoAcao: 'Biguanida; reduz produção hepática de glicose; melhora sensibilidade insulínica',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '500-850mg', frequencia: 'Iniciar 1x/dia, aumentar gradualmente até 2550mg/dia', doseMaxima: '2550mg/dia' },
      }
    ],
    contraindicacoes: ['DRC grave (TFG<30)', 'Acidose láctica', 'Insuficiência hepática', 'Alcoolismo'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Diarreia', 'Flatulência', 'Gosto metálico'],
      graves: ['Acidose láctica', 'Deficiência B12']
    },
    interacoes: [
      { medicamento: 'Contraste iodado', gravidade: 'grave', efeito: 'Acidose láctica', conduta: 'Suspender 48h antes/depois' },
      { medicamento: 'Álcool', gravidade: 'moderada', efeito: 'Acidose láctica', conduta: 'Evitar excesso' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    ajusteDoseRenal: [
      { tfg: '30-45', ajuste: 'Máximo 1000mg/dia' },
      { tfg: '<30', ajuste: 'Contraindicado' },
    ],
    monitorizacao: ['Creatinina', 'B12 anual'],
    orientacoesPaciente: ['Tomar com refeições para reduzir efeitos GI'],
    doencasRelacionadas: ['diabetes-tipo2', 'sop'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Levotiroxina
  {
    id: 'levotiroxina',
    nomeGenerico: 'Levotiroxina',
    nomesComerciais: ['Puran T4', 'Euthyrox'],
    atcCode: 'H03AA01',
    classeTerapeutica: 'hormonio_tireoide',
    subclasse: 'tireoidiano',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '75mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '125mcg', disponivelSUS: true },
    ],
    indicacoes: ['Hipotireoidismo', 'Supressão de TSH (câncer tireoide)', 'Bócio'],
    mecanismoAcao: 'T4 sintético; convertido em T3 ativo',
    posologias: [
      {
        indicacao: 'Hipotireoidismo',
        adultos: { dose: '1,6-1,8mcg/kg/dia', frequencia: '1x/dia em jejum 30-60min antes do café' },
      },
      {
        indicacao: 'Idosos/Cardiopatas',
        adultos: { dose: '12,5-25mcg inicial', frequencia: 'Aumentar 12,5-25mcg a cada 4-6 semanas' },
      }
    ],
    contraindicacoes: ['Tireotoxicose não tratada', 'Insuficiência adrenal não tratada', 'IAM recente'],
    efeitosAdversos: {
      comuns: ['Palpitações', 'Tremor', 'Insônia', 'Perda de peso (hipertireoidismo iatrogênico)'],
      graves: ['Arritmias', 'Angina', 'Osteoporose (supressão crônica)']
    },
    interacoes: [
      { medicamento: 'Carbonato de cálcio', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar 4h' },
      { medicamento: 'Omeprazol', gravidade: 'leve', efeito: 'Pode reduzir absorção', conduta: 'Monitorar TSH' },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['TSH (6-8 semanas após ajuste)', 'T4 livre'],
    orientacoesPaciente: ['Tomar em jejum 30-60min antes do café; manter mesma marca'],
    doencasRelacionadas: ['hipotireoidismo'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
];
