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
    pharmgkb: [
      {
        gene: 'CYP2D6',
        phenotype: 'poor_metabolizer',
        implications: ['Increased carvedilol plasma levels', 'Enhanced beta-blockade effect'],
        dosageRecommendations: ['Start with lower dose', 'Monitor for bradycardia and hypotension'],
      },
      {
        gene: 'CYP2D6',
        phenotype: 'ultra_rapid_metabolizer',
        implications: ['Decreased carvedilol plasma levels', 'May have reduced efficacy'],
        dosageRecommendations: ['Standard dosing, may need dose increase', 'Monitor clinical response'],
      },
    ],
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
    pharmgkb: [
      {
        gene: 'CYP2D6',
        variant: '*3, *4, *5, *6',
        phenotype: 'poor_metabolizer',
        implications: [
          'Reduced propranolol metabolism',
          'Higher plasma levels (2-3x increase)',
          'More pronounced beta-blockade effects',
          'Increased risk of bradycardia and hypotension',
        ],
        dosageRecommendations: [
          'Start with lower doses (10-20mg)',
          'Titrate based on heart rate and blood pressure',
          'May need dose reduction',
          'Monitor for excessive bradycardia',
        ],
      },
      {
        gene: 'CYP2D6',
        variant: '*1xN, *2xN',
        phenotype: 'ultra_rapid_metabolizer',
        implications: [
          'Rapid propranolol metabolism',
          'Lower plasma levels',
          'May have reduced efficacy',
        ],
        dosageRecommendations: [
          'May need higher doses for effect',
          'Consider shorter dosing intervals',
          'Alternative beta-blocker may be considered if poor response',
        ],
      },
    ],
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
    pharmgkb: [
      {
        gene: 'SLCO1B1',
        variant: '*5/*5, *15/*15',
        phenotype: 'poor_metabolizer',
        implications: ['Significantly increased simvastatin plasma levels', 'High risk of myopathy and rhabdomyolysis'],
        dosageRecommendations: ['Avoid simvastatin >20mg', 'Consider pravastatin or rosuvastatin', 'Monitor CK levels'],
      },
      {
        gene: 'SLCO1B1',
        variant: '*1/*5, *1/*15',
        phenotype: 'intermediate_metabolizer',
        implications: ['Increased simvastatin levels', 'Elevated myopathy risk'],
        dosageRecommendations: ['Limit dose to 40mg/day', 'Monitor for muscle symptoms'],
      },
    ],
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
    pharmgkb: [
      {
        gene: 'SLCO1B1',
        variant: '*5/*5, *15/*15',
        phenotype: 'poor_metabolizer',
        implications: ['Increased atorvastatin plasma levels', 'Elevated myopathy risk'],
        dosageRecommendations: ['Start with lower dose (10-20mg)', 'Consider pravastatin or rosuvastatin', 'Monitor CK levels'],
      },
      {
        gene: 'SLCO1B1',
        variant: '*1/*5, *1/*15',
        phenotype: 'intermediate_metabolizer',
        implications: ['Moderately increased atorvastatin levels'],
        dosageRecommendations: ['Standard dosing with monitoring', 'Monitor for muscle symptoms'],
      },
    ],
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
    pharmgkb: [
      {
        gene: 'CYP2C19',
        level: '1A',
        summary: 'Clopidogrel é um pró-fármaco que requer ativação pelo CYP2C19 para gerar o metabólito ativo antiagregante',
        guidelineUrl: 'https://cpicpgx.org/guidelines/guideline-for-clopidogrel-and-cyp2c19/',
        variants: [
          {
            allele: '*1/*1',
            phenotype: 'normal_metabolizer',
            frequency: {
              european: 0.65,
              african: 0.82,
              asian: 0.35,
              hispanic: 0.62,
              southAsian: 0.48,
            },
            implications: [
              'Ativação normal de clopidogrel ao metabólito ativo',
              'Efeito antiagregante plaquetário adequado',
              'Risco cardiovascular padrão em pacientes com SCA/pós-stent',
            ],
            dosageRecommendation: {
              recommendation: 'Usar dose padrão de clopidogrel (dose de ataque 300-600 mg, manutenção 75 mg/dia)',
              reasoning: 'Função enzimática normal permite ativação adequada do pró-fármaco',
              strength: 'strong',
              classification: 'CPIC Level A - Normal metabolizer',
            },
          },
          {
            allele: '*1/*2',
            phenotype: 'intermediate_metabolizer',
            frequency: {
              european: 0.27,
              african: 0.15,
              asian: 0.45,
              hispanic: 0.30,
              southAsian: 0.38,
            },
            implications: [
              'Ativação reduzida de clopidogrel (~50% do normal)',
              'Efeito antiagregante reduzido',
              'RISCO AUMENTADO de eventos cardiovasculares (IAM, AVC, trombose de stent)',
              'Meta-análise: risco 1.5-2x maior de eventos adversos cardiovasculares',
            ],
            dosageRecommendation: {
              recommendation: 'Considerar antiagregante alternativo (prasugrel ou ticagrelor) OU aumentar dose de clopidogrel (dupla dose 150 mg/dia)',
              reasoning: 'Atividade enzimática reduzida resulta em menor formação do metabólito ativo, comprometendo a eficácia',
              strength: 'moderate',
              classification: 'CPIC Level B - Intermediate metabolizer',
            },
            alternatives: ['prasugrel', 'ticagrelor'],
          },
          {
            allele: '*2/*2',
            phenotype: 'poor_metabolizer',
            frequency: {
              european: 0.02,
              african: 0.01,
              asian: 0.14,
              hispanic: 0.04,
              southAsian: 0.09,
            },
            implications: [
              'Ativação mínima de clopidogrel (<25% do normal)',
              'Efeito antiagregante muito reduzido ou ausente',
              'ALTO RISCO de eventos cardiovasculares (2-3x maior)',
              'FDA Black Box Warning: maior risco de trombose de stent',
              'Prevalência alta em asiáticos (~14%)',
            ],
            dosageRecommendation: {
              recommendation: 'EVITAR clopidogrel. Escolher antiagregante alternativo (prasugrel ou ticagrelor)',
              reasoning: 'Ausência de atividade enzimática impede formação do metabólito ativo, tornando o medicamento ineficaz e aumentando risco de eventos cardiovasculares graves',
              strength: 'strong',
              classification: 'CPIC Level A - Poor metabolizer (CONTRAINDICAÇÃO RELATIVA)',
            },
            alternatives: ['prasugrel', 'ticagrelor'],
          },
          {
            allele: '*1/*17',
            phenotype: 'increased_function',
            frequency: {
              european: 0.21,
              african: 0.28,
              asian: 0.04,
              hispanic: 0.16,
              southAsian: 0.19,
            },
            implications: [
              'Ativação aumentada de clopidogrel (~150% do normal)',
              'Efeito antiagregante aumentado',
              'Risco levemente aumentado de sangramento',
            ],
            dosageRecommendation: {
              recommendation: 'Usar dose padrão de clopidogrel. Monitorar sinais de sangramento',
              reasoning: 'Atividade enzimática aumentada resulta em maior formação do metabólito ativo',
              strength: 'optional',
              classification: 'Observação clínica - maior eficácia mas risco de sangramento',
            },
          },
          {
            allele: '*17/*17',
            phenotype: 'ultra_rapid_metabolizer',
            frequency: {
              european: 0.03,
              african: 0.06,
              asian: 0.01,
              hispanic: 0.02,
              southAsian: 0.03,
            },
            implications: [
              'Ativação muito aumentada de clopidogrel (>200% do normal)',
              'Efeito antiagregante muito aumentado',
              'Risco significativamente aumentado de sangramento',
            ],
            dosageRecommendation: {
              recommendation: 'Usar dose padrão, mas monitorar rigorosamente para sangramento. Considerar redução de dose se sangramento',
              reasoning: 'Formação excessiva do metabólito ativo aumenta risco de hemorragia',
              strength: 'moderate',
              classification: 'Monitoração intensiva necessária',
            },
          },
        ],
      },
    ],
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
    pharmgkb: [
      {
        gene: 'CYP2C9',
        level: '1A',
        summary: 'CYP2C9 metaboliza varfarina. Polimorfismos reduzem clearance e aumentam risco hemorrágico, requerendo redução de dose e monitorização intensiva de INR.',
        guidelineUrl: 'https://cpicpgx.org/guidelines/guideline-for-warfarin-and-cyp2c9-and-vkorc1/',
        variants: [
          {
            allele: '*1/*1',
            phenotype: 'normal_metabolizer',
            frequency: { european: 0.65, african: 0.85, asian: 0.95, hispanic: 0.70, southAsian: 0.80 },
            implications: [
              'Metabolismo normal da varfarina',
              'Resposta esperada ao INR-alvo',
            ],
            dosageRecommendation: {
              recommendation: 'Dose padrão inicial de 5mg/dia, ajustar pelo INR',
              reasoning: 'Atividade enzimática CYP2C9 normal, clearance adequado da S-varfarina',
              strength: 'strong',
              classification: 'CPIC Level A - Normal metabolizer',
            },
          },
          {
            allele: '*1/*2',
            phenotype: 'intermediate_metabolizer',
            frequency: { european: 0.20, african: 0.03, asian: 0.01, hispanic: 0.15, southAsian: 0.05 },
            implications: [
              'Metabolismo moderadamente reduzido da S-varfarina',
              'Risco aumentado de sangramento',
              'INR pode elevar-se mais que o esperado',
            ],
            dosageRecommendation: {
              recommendation: 'Reduzir dose inicial em 20-30%, monitorar INR mais frequentemente',
              reasoning: 'Redução parcial do metabolismo da S-varfarina eleva exposição',
              strength: 'strong',
              classification: 'CPIC Level A - Intermediate metabolizer',
            },
          },
          {
            allele: '*1/*3',
            phenotype: 'intermediate_metabolizer',
            frequency: { european: 0.12, african: 0.01, asian: 0.04, hispanic: 0.10, southAsian: 0.06 },
            implications: [
              'Metabolismo significativamente reduzido da S-varfarina',
              '*3 tem maior impacto que *2 na redução enzimática',
            ],
            dosageRecommendation: {
              recommendation: 'Reduzir dose inicial em 30-40%, INR 2-3x/semana inicialmente',
              reasoning: 'CYP2C9*3 reduz atividade em ~80%, maior impacto que *2',
              strength: 'strong',
              classification: 'CPIC Level A - Intermediate metabolizer (*3 carrier)',
            },
          },
          {
            allele: '*2/*2',
            phenotype: 'poor_metabolizer',
            frequency: { european: 0.01, african: 0.001, asian: 0.001, hispanic: 0.008, southAsian: 0.002 },
            implications: [
              'Metabolismo muito reduzido da S-varfarina',
              'Risco alto de sangramento',
              'Tempo prolongado para INR estável',
            ],
            dosageRecommendation: {
              recommendation: 'Iniciar com 2-3mg/dia (redução de 40-50%), monitorização intensiva',
              reasoning: 'Atividade CYP2C9 muito reduzida requer dose substancialmente menor',
              strength: 'strong',
              classification: 'CPIC Level A - Poor metabolizer',
            },
          },
          {
            allele: '*3/*3',
            phenotype: 'poor_metabolizer',
            frequency: { european: 0.004, african: 0.0001, asian: 0.001, hispanic: 0.003, southAsian: 0.001 },
            implications: [
              'Metabolismo gravemente comprometido da S-varfarina',
              'Risco muito elevado de hemorragia',
              'Necessidade de dose extremamente baixa',
            ],
            dosageRecommendation: {
              recommendation: 'Iniciar com 1-2mg/dia, considerar DOAC alternativo se possível',
              reasoning: 'Ausência quase completa de atividade CYP2C9 sobre S-varfarina',
              strength: 'strong',
              classification: 'CPIC Level A - Poor metabolizer',
            },
            alternatives: ['rivaroxabana', 'apixabana', 'edoxabana'],
          },
        ],
      },
      {
        gene: 'VKORC1',
        level: '1A',
        summary: 'VKORC1 é o alvo farmacológico da varfarina. O polimorfismo -1639G>A aumenta sensibilidade e reduz dose necessária.',
        guidelineUrl: 'https://cpicpgx.org/guidelines/guideline-for-warfarin-and-cyp2c9-and-vkorc1/',
        variants: [
          {
            allele: '-1639 GG',
            phenotype: 'normal_metabolizer',
            frequency: { european: 0.37, african: 0.70, asian: 0.05, hispanic: 0.40, southAsian: 0.25 },
            implications: [
              'Expressão normal de VKORC1',
              'Sensibilidade habitual à varfarina',
            ],
            dosageRecommendation: {
              recommendation: 'Dose padrão de varfarina',
              reasoning: 'Expressão normal do alvo farmacológico',
              strength: 'strong',
              classification: 'CPIC Level A - Normal VKORC1 expression',
            },
          },
          {
            allele: '-1639 GA',
            phenotype: 'intermediate_metabolizer',
            frequency: { european: 0.45, african: 0.25, asian: 0.30, hispanic: 0.42, southAsian: 0.45 },
            implications: [
              'Expressão reduzida de VKORC1',
              'Sensibilidade aumentada à varfarina',
            ],
            dosageRecommendation: {
              recommendation: 'Reduzir dose em 25-30%, ajustar pelo INR',
              reasoning: 'Expressão reduzida do alvo requer menor dose para efeito anticoagulante',
              strength: 'strong',
              classification: 'CPIC Level A - Intermediate VKORC1 expression',
            },
          },
          {
            allele: '-1639 AA',
            phenotype: 'poor_metabolizer',
            frequency: { european: 0.18, african: 0.05, asian: 0.65, hispanic: 0.18, southAsian: 0.30 },
            implications: [
              'Expressão muito reduzida de VKORC1',
              'Alta sensibilidade à varfarina',
              'Risco elevado de sangramento com doses padrão',
            ],
            dosageRecommendation: {
              recommendation: 'Reduzir dose em 40-50%, iniciar com 2-3mg/dia, combinar com genótipo CYP2C9',
              reasoning: 'Expressão muito baixa de VKORC1 causa sensibilidade marcada à varfarina. Usar tabela FDA de dosagem farmacogenômica.',
              strength: 'strong',
              classification: 'CPIC Level A - Low VKORC1 expression',
            },
            alternatives: ['rivaroxabana', 'apixabana'],
          },
        ],
      },
    ],
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

