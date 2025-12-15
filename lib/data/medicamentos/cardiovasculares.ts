/**
 * MEDICAMENTOS CARDIOVASCULARES - DARWIN-MFC
 * ===========================================
 * Medicamentos RENAME 2024
 */

import { Medicamento } from '../../types/medicamento';

export const cardiovasculares: Partial<Medicamento>[] = [
  {
    id: 'atenolol',
    nomeGenerico: 'Atenolol',
    nomesComerciais: ['Atenol', 'Angipress'],
    atcCode: 'C07AB03',
    rxNormCui: '1202',
    drugBankId: 'DB00335',
    snomedCT: '372274001',
    casNumber: '29122-68-7',
    dcbCode: '01124',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'betabloqueador',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: ['Hipertensão arterial', 'Angina estável', 'Fibrilação atrial (controle de FC)', 'Profilaxia pós-IAM'],
    mecanismoAcao: 'Betabloqueador β1 seletivo. Reduz FC, contratilidade e demanda de O2 miocárdico.',
    posologias: [{
      indicacao: 'HAS/Angina',
      adultos: { dose: '25-100mg', frequencia: '1x/dia', doseMaxima: '100mg/dia' }
    }],
    contraindicacoes: ['Bradicardia sintomática', 'BAV 2º/3º grau', 'IC descompensada', 'Asma grave'],
    efeitosAdversos: { comuns: ['Bradicardia', 'Fadiga', 'Extremidades frias'], graves: ['Broncoespasmo', 'Piora de IC', 'Bloqueio AV'] },
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['hipertensao-arterial', 'fibrilacao-atrial', 'doenca-arterial-coronariana'],
    lastUpdate: '2024-12',
    tags: ['betabloqueador', 'anti-hipertensivo', 'antianginoso']
  },
  {
    id: 'carvedilol',
    nomeGenerico: 'Carvedilol',
    nomesComerciais: ['Coreg', 'Cardilol'],
    atcCode: 'C07AG02',
    rxNormCui: '20352',
    drugBankId: 'DB01136',
    snomedCT: '386870007',
    casNumber: '72956-09-3',
    dcbCode: '02131',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'betabloqueador',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '3,125mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '6,25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '12,5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true }
    ],
    indicacoes: ['Insuficiência cardíaca (FE reduzida)', 'HAS', 'Pós-IAM com disfunção VE'],
    mecanismoAcao: 'Betabloqueador não seletivo + bloqueador alfa-1. Vasodilatação periférica.',
    posologias: [{
      indicacao: 'Insuficiência cardíaca',
      adultos: { dose: '3,125-25mg', frequencia: 'A cada 12h', observacoes: 'Titular lentamente a cada 2 semanas' }
    }],
    contraindicacoes: ['IC descompensada', 'Bradicardia grave', 'Hipotensão sintomática', 'Asma'],
    efeitosAdversos: { comuns: ['Tontura', 'Fadiga', 'Hipotensão', 'Bradicardia'], graves: ['Piora de IC (início)', 'Broncoespasmo'] },
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['insuficiencia-cardiaca', 'hipertensao-arterial'],
    lastUpdate: '2024-12',
    tags: ['betabloqueador', 'IC', 'carvedilol']
  },
  {
    id: 'propranolol',
    nomeGenerico: 'Cloridrato de propranolol',
    nomesComerciais: ['Inderal', 'Propanol'],
    atcCode: 'C07AA05',
    rxNormCui: '8787',
    drugBankId: 'DB00571',
    snomedCT: '372772003',
    casNumber: '525-66-6',
    dcbCode: '07447',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'betabloqueador',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '80mg', disponivelSUS: true }
    ],
    indicacoes: ['HAS', 'Profilaxia de enxaqueca', 'Tremor essencial', 'Hipertireoidismo', 'Ansiedade de desempenho'],
    mecanismoAcao: 'Betabloqueador não seletivo (β1 e β2). Atravessa barreira hematoencefálica.',
    posologias: [{
      indicacao: 'Profilaxia enxaqueca',
      adultos: { dose: '40-160mg', frequencia: 'Dividido em 2-3 doses', doseMaxima: '240mg/dia' }
    }, {
      indicacao: 'Tremor essencial',
      adultos: { dose: '40-320mg', frequencia: 'Dividido em 2-3 doses' }
    }],
    contraindicacoes: ['Asma/DPOC', 'Bradicardia', 'BAV', 'Fenômeno de Raynaud'],
    efeitosAdversos: { comuns: ['Fadiga', 'Bradicardia', 'Extremidades frias', 'Pesadelos'], graves: ['Broncoespasmo', 'Hipoglicemia mascarada'] },
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['enxaqueca', 'hipertensao-arterial'],
    lastUpdate: '2024-12',
    tags: ['betabloqueador', 'enxaqueca', 'tremor']
  },
  {
    id: 'hidroclorotiazida',
    nomeGenerico: 'Hidroclorotiazida (HCTZ)',
    nomesComerciais: ['Clorana', 'Drenol'],
    atcCode: 'C03AA03',
    rxNormCui: '5487',
    drugBankId: 'DB00999',
    snomedCT: '387525002',
    casNumber: '58-93-5',
    dcbCode: '04656',
    classeTerapeutica: 'diuretico',
    subclasse: 'tiazidico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true }
    ],
    indicacoes: ['Hipertensão arterial', 'Edema (IC, síndrome nefrótica)', 'Nefrolitíase por hipercalciúria'],
    mecanismoAcao: 'Inibe reabsorção de Na+ no túbulo contornado distal.',
    posologias: [{
      indicacao: 'HAS',
      adultos: { dose: '12,5-25mg', frequencia: '1x/dia', doseMaxima: '50mg/dia' }
    }],
    contraindicacoes: ['Anúria', 'Hipocalemia refratária', 'Hipersensibilidade a sulfonamidas'],
    efeitosAdversos: { comuns: ['Hipocalemia', 'Hiponatremia', 'Hiperuricemia', 'Hiperglicemia'], graves: ['Arritmias (hipocalemia)'] },
    interacoes: [{ medicamento: 'Lítio', gravidade: 'grave', efeito: 'Aumento da litemia', conduta: 'Monitorar ou evitar' }],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['hipertensao-arterial'],
    lastUpdate: '2024-12',
    tags: ['diurético', 'tiazídico', 'anti-hipertensivo']
  },
  {
    id: 'furosemida',
    nomeGenerico: 'Furosemida',
    nomesComerciais: ['Lasix', 'Furosemix'],
    atcCode: 'C03CA01',
    rxNormCui: '4603',
    drugBankId: 'DB00695',
    snomedCT: '387475002',
    casNumber: '54-31-9',
    dcbCode: '04360',
    classeTerapeutica: 'diuretico',
    subclasse: 'diuretico_alca',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '10mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Edema (IC, síndrome nefrótica, cirrose)', 'Edema agudo de pulmão', 'Hipercalcemia', 'DRC (TFG <30)'],
    mecanismoAcao: 'Inibe cotransportador Na-K-2Cl na alça de Henle. Diurético potente.',
    posologias: [{
      indicacao: 'IC com congestão',
      adultos: { dose: '20-80mg', frequencia: '1-2x/dia VO', doseMaxima: '600mg/dia' }
    }, {
      indicacao: 'EAP',
      adultos: { dose: '40-80mg IV', frequencia: 'Pode repetir ou dobrar dose' }
    }],
    contraindicacoes: ['Anúria', 'Hipovolemia', 'Hipocalemia grave'],
    efeitosAdversos: { comuns: ['Hipocalemia', 'Hiponatremia', 'Hipotensão', 'Hiperuricemia'], graves: ['Ototoxicidade (doses altas IV)'] },
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Pode necessitar doses maiores (resistência)' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['insuficiencia-cardiaca'],
    lastUpdate: '2024-12',
    tags: ['diurético', 'alça', 'IC', 'congestão']
  },
  {
    id: 'espironolactona',
    nomeGenerico: 'Espironolactona',
    nomesComerciais: ['Aldactone', 'Spiroctan'],
    atcCode: 'C03DA01',
    rxNormCui: '9997',
    drugBankId: 'DB00421',
    snomedCT: '387078006',
    casNumber: '52-01-7',
    dcbCode: '03736',
    classeTerapeutica: 'diuretico',
    subclasse: 'poupador_potassio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: ['IC com FE reduzida', 'Cirrose com ascite', 'HAS resistente', 'Hiperaldosteronismo', 'Hirsutismo/SOP'],
    mecanismoAcao: 'Antagonista do receptor de mineralocorticoide (aldosterona).',
    posologias: [{
      indicacao: 'IC',
      adultos: { dose: '25-50mg', frequencia: '1x/dia', doseMaxima: '50mg/dia se TFG>50' }
    }, {
      indicacao: 'Ascite',
      adultos: { dose: '100-400mg', frequencia: '1x/dia' }
    }],
    contraindicacoes: ['Hipercalemia', 'Anúria', 'Addison', 'Gestação'],
    efeitosAdversos: { comuns: ['Hipercalemia', 'Ginecomastia', 'Irregularidade menstrual'], graves: ['Hipercalemia grave'] },
    interacoes: [{ medicamento: 'IECA/BRA', gravidade: 'moderada', efeito: 'Hipercalemia', conduta: 'Monitorar K+' }],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['insuficiencia-cardiaca', 'hipertensao-arterial'],
    lastUpdate: '2024-12',
    tags: ['diurético', 'poupador-K', 'IC', 'aldosterona']
  },
  {
    id: 'sinvastatina',
    nomeGenerico: 'Sinvastatina',
    nomesComerciais: ['Zocor', 'Sinvascor'],
    atcCode: 'C10AA01',
    rxNormCui: '36567',
    drugBankId: 'DB00641',
    snomedCT: '387584000',
    casNumber: '79902-63-9',
    dcbCode: '08225',
    classeTerapeutica: 'hipolipemiante',
    subclasse: 'estatina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true }
    ],
    indicacoes: ['Dislipidemia', 'Prevenção primária e secundária CV', 'Pós-IAM'],
    mecanismoAcao: 'Inibe HMG-CoA redutase. Reduz síntese hepática de colesterol.',
    posologias: [{
      indicacao: 'Dislipidemia',
      adultos: { dose: '20-40mg', frequencia: '1x/noite', doseMaxima: '40mg/dia (80mg aumenta risco miopatia)' }
    }],
    contraindicacoes: ['Hepatopatia ativa', 'Gestação', 'Amamentação'],
    efeitosAdversos: { comuns: ['Mialgia', 'Cefaleia', 'Dispepsia'], graves: ['Rabdomiólise', 'Hepatotoxicidade', 'Diabetes (risco leve)'] },
    interacoes: [{ medicamento: 'Amiodarona/BCC', gravidade: 'moderada', efeito: 'Aumenta risco de miopatia', conduta: 'Limitar dose a 20mg' }],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Não recomendado' },
    doencasRelacionadas: ['dislipidemia', 'doenca-arterial-coronariana'],
    lastUpdate: '2024-12',
    tags: ['estatina', 'hipolipemiante', 'colesterol']
  },
  {
    id: 'atorvastatina',
    nomeGenerico: 'Atorvastatina cálcica',
    nomesComerciais: ['Lipitor', 'Citalor'],
    atcCode: 'C10AA05',
    rxNormCui: '83367',
    drugBankId: 'DB01076',
    snomedCT: '373444002',
    casNumber: '134523-00-5',
    dcbCode: '01110',
    classeTerapeutica: 'hipolipemiante',
    subclasse: 'estatina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '80mg', disponivelSUS: false }
    ],
    indicacoes: ['Dislipidemia', 'Prevenção CV em alto risco', 'Pós-SCA (alta intensidade)'],
    mecanismoAcao: 'Estatina de alta intensidade. Potente inibidor da HMG-CoA redutase.',
    posologias: [{
      indicacao: 'Alto risco CV',
      adultos: { dose: '40-80mg', frequencia: '1x/dia (qualquer horário)' }
    }],
    contraindicacoes: ['Hepatopatia ativa', 'Gestação'],
    efeitosAdversos: { comuns: ['Mialgia', 'Aumento CPK/transaminases'], graves: ['Rabdomiólise'] },
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Não recomendado' },
    doencasRelacionadas: ['dislipidemia', 'doenca-arterial-coronariana', 'acidente-vascular-cerebral'],
    lastUpdate: '2024-12',
    tags: ['estatina', 'alta-intensidade', 'prevenção-CV']
  },
  {
    id: 'aas',
    nomeGenerico: 'Ácido acetilsalicílico (AAS)',
    nomesComerciais: ['Aspirina', 'AAS', 'Bufferin'],
    atcCode: 'B01AC06',
    rxNormCui: '1191',
    drugBankId: 'DB00945',
    snomedCT: '387458008',
    casNumber: '50-78-2',
    dcbCode: '00061',
    classeTerapeutica: 'antiagregante',
    subclasse: 'inibidor_cox',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true }
    ],
    indicacoes: ['Prevenção secundária (pós-IAM, pós-AVC)', 'SCA', 'Antiagregação em stents', 'Dor/febre (doses altas)'],
    mecanismoAcao: 'Inibição irreversível da COX-1 plaquetária. Antiagregação por toda vida da plaqueta (7-10 dias).',
    posologias: [{
      indicacao: 'Prevenção CV secundária',
      adultos: { dose: '100mg', frequencia: '1x/dia' }
    }, {
      indicacao: 'SCA',
      adultos: { dose: '300mg', frequencia: 'Dose de ataque, depois 100mg/dia' }
    }],
    contraindicacoes: ['Úlcera péptica ativa', 'Sangramento GI', 'Hemofilia', 'Alergia a AINEs', 'Crianças com virose (Reye)'],
    efeitosAdversos: { comuns: ['Dispepsia', 'Sangramento menor'], graves: ['Hemorragia GI', 'Hemorragia cerebral'] },
    interacoes: [{ medicamento: 'Anticoagulantes', gravidade: 'grave', efeito: 'Sangramento', conduta: 'Usar com cautela' }],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['doenca-arterial-coronariana', 'acidente-vascular-cerebral', 'fibrilacao-atrial'],
    lastUpdate: '2024-12',
    tags: ['antiagregante', 'AAS', 'prevenção-CV']
  },
  {
    id: 'clopidogrel',
    nomeGenerico: 'Bissulfato de clopidogrel',
    nomesComerciais: ['Plavix', 'Iscover'],
    atcCode: 'B01AC04',
    rxNormCui: '32968',
    drugBankId: 'DB00758',
    snomedCT: '386952008',
    casNumber: '113665-84-2',
    dcbCode: '02365',
    classeTerapeutica: 'antiagregante',
    subclasse: 'inibidor_p2y12',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '75mg', disponivelSUS: true }
    ],
    indicacoes: ['SCA (com AAS)', 'Pós-stent (dupla antiagregação)', 'AVC/AIT (se intolerância a AAS)', 'DAP'],
    mecanismoAcao: 'Pró-droga convertida em inibidor irreversível do receptor P2Y12 plaquetário.',
    posologias: [{
      indicacao: 'SCA/Pós-stent',
      adultos: { dose: '300-600mg ataque, depois 75mg', frequencia: '1x/dia', observacoes: '12 meses de dupla antiagregação' }
    }],
    contraindicacoes: ['Sangramento ativo', 'Insuficiência hepática grave'],
    efeitosAdversos: { comuns: ['Sangramento', 'Dispepsia'], graves: ['Hemorragia grave', 'PTT (muito raro)'] },
    interacoes: [{ medicamento: 'Omeprazol', gravidade: 'moderada', efeito: 'Reduz ativação de clopidogrel', conduta: 'Preferir pantoprazol' }],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Não recomendado' },
    doencasRelacionadas: ['doenca-arterial-coronariana', 'acidente-vascular-cerebral'],
    lastUpdate: '2024-12',
    tags: ['antiagregante', 'P2Y12', 'stent']
  },
  {
    id: 'varfarina',
    nomeGenerico: 'Varfarina sódica',
    nomesComerciais: ['Marevan', 'Coumadin'],
    atcCode: 'B01AA03',
    rxNormCui: '11289',
    drugBankId: 'DB00682',
    snomedCT: '372756006',
    casNumber: '81-81-2',
    dcbCode: '09579',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'antagonista_vitamina_k',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true }
    ],
    indicacoes: ['FA com valva mecânica', 'Estenose mitral', 'TVP/TEP', 'Síndrome antifosfolípide'],
    mecanismoAcao: 'Inibe síntese de fatores vitamina K-dependentes (II, VII, IX, X, proteína C e S).',
    posologias: [{
      indicacao: 'Anticoagulação',
      adultos: { dose: '5mg', frequencia: '1x/dia, ajustar pelo INR', observacoes: 'Meta INR 2-3 (maioria) ou 2,5-3,5 (valva mecânica)' }
    }],
    contraindicacoes: ['Sangramento ativo', 'Gestação (1º e 3º tri)', 'HAS grave não controlada', 'Cirurgia recente SNC'],
    efeitosAdversos: { comuns: ['Sangramento menor'], graves: ['Hemorragia maior', 'Necrose cutânea (deficiência proteína C)'] },
    interacoes: [{ medicamento: 'Muitas (antibióticos, AINEs, amiodarona)', gravidade: 'grave', efeito: 'Alteração do INR', conduta: 'Monitorar INR frequente' }],
    gestacao: 'X',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['fibrilacao-atrial'],
    lastUpdate: '2024-12',
    tags: ['anticoagulante', 'varfarina', 'INR']
  },
  {
    id: 'rivaroxabana',
    nomeGenerico: 'Rivaroxabana',
    nomesComerciais: ['Xarelto'],
    atcCode: 'B01AF01',
    rxNormCui: '1114195',
    drugBankId: 'DB06228',
    snomedCT: '442031002',
    casNumber: '366789-02-8',
    dcbCode: '08095',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'doac',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '15mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false }
    ],
    indicacoes: ['FA não valvar', 'TVP/TEP', 'Profilaxia TVP pós-ortopedia'],
    mecanismoAcao: 'Inibidor direto do fator Xa. Não requer monitorização.',
    posologias: [{
      indicacao: 'FA',
      adultos: { dose: '20mg', frequencia: '1x/dia com refeição' }
    }],
    contraindicacoes: ['Valva mecânica', 'Estenose mitral', 'Gestação', 'TFG <15'],
    efeitosAdversos: { comuns: ['Sangramento'], graves: ['Hemorragia maior'] },
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: '20mg/dia' },
      { tfg: '15-50', ajuste: '15mg/dia' },
      { tfg: '<15', ajuste: 'Contraindicado' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Não recomendado' },
    doencasRelacionadas: ['fibrilacao-atrial'],
    lastUpdate: '2024-12',
    tags: ['anticoagulante', 'DOAC', 'FA']
  },
  {
    id: 'digoxina',
    nomeGenerico: 'Digoxina',
    nomesComerciais: ['Lanoxin', 'Digoxina'],
    atcCode: 'C01AA05',
    rxNormCui: '3407',
    drugBankId: 'DB00390',
    snomedCT: '387461009',
    casNumber: '20830-75-5',
    dcbCode: '02919',
    classeTerapeutica: 'cardiotonico',
    subclasse: 'glicosideo_cardiaco',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,25mg', disponivelSUS: true },
      { forma: 'elixir', concentracao: '0,05mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['IC com FA (controle de FC)', 'FA (controle de FC em repouso)', 'Taquicardia supraventricular'],
    mecanismoAcao: 'Inibe bomba Na/K-ATPase. Aumenta tônus vagal (reduz FC) e contratilidade.',
    posologias: [{
      indicacao: 'FA/IC',
      adultos: { dose: '0,125-0,25mg', frequencia: '1x/dia', observacoes: 'Nível sérico 0,5-1,0 ng/mL' }
    }],
    contraindicacoes: ['BAV 2º/3º grau', 'Cardiomiopatia hipertrófica obstrutiva', 'WPW', 'Hipocalemia'],
    efeitosAdversos: { comuns: ['Náusea', 'Anorexia', 'Visão amarelada'], graves: ['Arritmias (intoxicação)', 'Bradicardia extrema'] },
    interacoes: [{ medicamento: 'Amiodarona/Verapamil', gravidade: 'grave', efeito: 'Aumento dos níveis de digoxina', conduta: 'Reduzir dose pela metade' }],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: '0,0625-0,125mg/dia ou a cada 48h' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['insuficiencia-cardiaca', 'fibrilacao-atrial'],
    lastUpdate: '2024-12',
    tags: ['digitálico', 'FC', 'IC']
  }
];

