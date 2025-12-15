/**
 * ANTIBIÓTICOS - DARWIN-MFC
 * ==========================
 * Antibióticos essenciais da RENAME para APS
 */

import { Medicamento } from '../../types/medicamento';

export const antibioticos: Medicamento[] = [
  {
    id: 'amoxicilina',
    nomeGenerico: 'Amoxicilina',
    nomesComerciais: ['Amoxil', 'Novocilin'],
    // Ontologias
    atcCode: 'J01CA04',
    rxNormCui: '723',
    drugBankId: 'DB01060',
    snomedCT: '372687004',
    casNumber: '26787-78-0',
    classeTerapeutica: 'antibiotico',
    subclasse: 'penicilina',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '500mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '250mg/5mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Infecções de vias aéreas superiores e inferiores',
      'Otite média aguda',
      'Sinusite bacteriana aguda',
      'Faringoamigdalite estreptocócica',
      'Pneumonia adquirida na comunidade (leve)',
      'Infecção urinária não complicada',
      'Erradicação de H. pylori (em esquema)'
    ],
    mecanismoAcao: 'Betalactâmico bactericida. Inibe a síntese da parede celular bacteriana por ligação às PBPs (proteínas ligadoras de penicilina).',
    posologias: [
      {
      indicacao: 'Infecções respiratórias',
        adultos: { dose: '500mg 8/8h', frequencia: '3x/dia', doseMaxima: '3g/dia' },
        pediatrico: { dose: '25-50mg/kg/dia dividido em 8/8h', frequencia: '3x/dia' }
      },
      {
        indicacao: 'Otite média aguda',
        adultos: { dose: '500mg 8/8h por 5-10 dias', frequencia: '3x/dia' },
        pediatrico: { dose: '80-90mg/kg/dia dividido em 8/8h', frequencia: '3x/dia', observacoes: 'Dose alta para pneumococo resistente' }
      }
    ],
    contraindicacoes: ['Alergia a penicilinas ou cefalosporinas (reação grave)', 'Mononucleose infecciosa (risco de rash)'],
    precaucoes: ['História de alergia a betalactâmicos', 'Insuficiência renal (ajuste de dose)'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náusea', 'Rash cutâneo', 'Candidíase oral/vaginal'],
      graves: ['Reação anafilática', 'Síndrome de Stevens-Johnson', 'Colite pseudomembranosa']
    },
    interacoes: [
      { medicamento: 'Metotrexato', gravidade: 'grave', efeito: 'Aumento da toxicidade do metotrexato', conduta: 'Monitorar toxicidade' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumento do INR', conduta: 'Monitorar INR' }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Não necessário' },
      { tfg: '10-30', ajuste: '500mg 12/12h' },
      { tfg: '<10', ajuste: '500mg 24/24h' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Sinais de reação alérgica', 'Melhora clínica em 48-72h'],
    orientacoesPaciente: ['Completar todo o tratamento', 'Pode tomar com ou sem alimentos', 'Manter suspensão refrigerada'],
    doencasRelacionadas: ['pneumonia-comunitaria', 'otite-media', 'sinusite'],
    calculadoras: [],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['antibiotico', 'penicilina', 'respiratorio', 'itu']
  },
  {
    id: 'azitromicina',
    nomeGenerico: 'Azitromicina',
    nomesComerciais: ['Zitromax', 'Azi'],
    // Ontologias
    atcCode: 'J01FA10',
    rxNormCui: '18631',
    drugBankId: 'DB00207',
    snomedCT: '387531004',
    casNumber: '83905-01-5',
    classeTerapeutica: 'antibiotico',
    subclasse: 'macrolideo',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '200mg/5mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Pneumonia adquirida na comunidade (atípicos)',
      'Faringoamigdalite (alergia a penicilina)',
      'Sinusite bacteriana',
      'Infecções de pele e tecidos moles',
      'Uretrite/cervicite por Chlamydia',
      'Coqueluche',
      'Doença de arranhaduras do gato'
    ],
    mecanismoAcao: 'Macrolídeo bacteriostático. Liga-se à subunidade 50S do ribossomo bacteriano, inibindo a síntese proteica.',
    posologias: [
      {
        indicacao: 'Infecções respiratórias',
        adultos: { dose: '500mg/dia por 3 dias ou 500mg no D1 + 250mg D2-D5', frequencia: '1x/dia' },
        pediatrico: { dose: '10mg/kg/dia por 3 dias', frequencia: '1x/dia', doseMaxima: '500mg/dia' }
      },
      {
        indicacao: 'Clamídia (uretrite/cervicite)',
        adultos: { dose: '1g dose única', frequencia: 'DU' }
      }
    ],
    contraindicacoes: ['Alergia a macrolídeos', 'Prolongamento QT conhecido', 'Uso com medicamentos que prolongam QT'],
    precaucoes: ['Insuficiência hepática', 'Miastenia gravis', 'Idosos (risco de arritmia)'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náusea', 'Dor abdominal', 'Cefaleia'],
      graves: ['Prolongamento QT', 'Hepatotoxicidade', 'Colite pseudomembranosa']
    },
    interacoes: [
      { medicamento: 'Medicamentos que prolongam QT', gravidade: 'grave', efeito: 'Risco de torsade de pointes', conduta: 'Evitar associação' },
      { medicamento: 'Digoxina', gravidade: 'moderada', efeito: 'Aumento dos níveis de digoxina', conduta: 'Monitorar sinais de toxicidade' }
    ],
    ajusteDoseRenal: [
      { tfg: '>10', ajuste: 'Não necessário' },
      { tfg: '<10', ajuste: 'Usar com cautela' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['ECG se fatores de risco para QT longo', 'Melhora clínica'],
    orientacoesPaciente: ['Tomar 1h antes ou 2h após refeições (melhor absorção)', 'Suspensão: agitar bem antes de usar'],
    doencasRelacionadas: ['pneumonia-comunitaria', 'faringite-estreptococica'],
    calculadoras: [],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['antibiotico', 'macrolideo', 'ist', 'respiratorio']
  },
  {
    id: 'sulfametoxazol-trimetoprima',
    nomeGenerico: 'Sulfametoxazol + Trimetoprima',
    nomesComerciais: ['Bactrim', 'Bacteracin'],
    // Ontologias
    atcCode: 'J01EE01',
    rxNormCui: '10829',
    drugBankId: 'DB00440',
    snomedCT: '398731002',
    casNumber: '8064-90-2',
    classeTerapeutica: 'antibiotico',
    subclasse: 'sulfonamida',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg/80mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '800mg/160mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '200mg/40mg por 5mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Infecção urinária não complicada',
      'Prostatite bacteriana',
      'Infecções gastrointestinais (shigelose)',
      'Pneumocistose (tratamento e profilaxia)',
      'Infecções de pele (impetigo)',
      'Otite média (alternativa)'
    ],
    mecanismoAcao: 'Combinação sinérgica que inibe duas etapas da síntese de ácido fólico bacteriano. Bactericida.',
    posologias: [
      {
        indicacao: 'ITU não complicada',
        adultos: { dose: '800/160mg 12/12h por 3 dias', frequencia: '2x/dia' }
      },
      {
        indicacao: 'Profilaxia de Pneumocistose',
        adultos: { dose: '800/160mg 1x/dia ou 3x/semana', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Alergia a sulfonamidas', 'Gestação (1º e 3º trimestre)', 'Deficiência de G6PD grave', 'Anemia megaloblástica por deficiência de folato'],
    precaucoes: ['Insuficiência renal', 'Insuficiência hepática', 'Idosos', 'Deficiência de folato'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Vômito', 'Rash cutâneo', 'Fotossensibilidade'],
      graves: ['Síndrome de Stevens-Johnson', 'Necrólise epidérmica tóxica', 'Agranulocitose', 'Hiperpotassemia']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'grave', efeito: 'Aumento do INR', conduta: 'Monitorar INR rigorosamente' },
      { medicamento: 'Metotrexato', gravidade: 'grave', efeito: 'Aumento da toxicidade', conduta: 'Evitar associação' }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Dose habitual' },
      { tfg: '15-30', ajuste: '50% da dose' },
      { tfg: '<15', ajuste: 'Evitar' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar em RN <2 meses e prematuros (risco de kernicterus)' },
    monitorizacao: ['Hemograma em uso prolongado', 'Função renal', 'Potássio'],
    orientacoesPaciente: ['Tomar com bastante água', 'Evitar exposição solar', 'Completar tratamento'],
    doencasRelacionadas: ['infeccao-urinaria', 'pneumocistose'],
    calculadoras: ['ckdepi'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['antibiotico', 'sulfonamida', 'itu', 'profilaxia']
  },
  {
    id: 'ciprofloxacino',
    nomeGenerico: 'Ciprofloxacino',
    nomesComerciais: ['Cipro', 'Ciflox'],
    // Ontologias
    atcCode: 'J01MA02',
    rxNormCui: '2551',
    drugBankId: 'DB00537',
    snomedCT: '372840008',
    casNumber: '85721-33-1',
    classeTerapeutica: 'antibiotico',
    subclasse: 'fluoroquinolona',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Infecção urinária complicada',
      'Pielonefrite',
      'Prostatite bacteriana',
      'Infecções gastrointestinais graves',
      'Infecções osteoarticulares',
      'Neutropenia febril (associação)'
    ],
    mecanismoAcao: 'Fluoroquinolona bactericida. Inibe a DNA girase e topoisomerase IV bacterianas.',
    posologias: [
      {
        indicacao: 'ITU complicada/Pielonefrite',
        adultos: { dose: '500mg 12/12h por 7-14 dias', frequencia: '2x/dia' }
      },
      {
        indicacao: 'Prostatite aguda',
        adultos: { dose: '500mg 12/12h por 28 dias', frequencia: '2x/dia' }
      }
    ],
    contraindicacoes: ['Alergia a fluoroquinolonas', 'Miastenia gravis', 'Menores de 18 anos (exceto indicações específicas)', 'Prolongamento QT'],
    precaucoes: ['Idosos (risco de tendinopatia)', 'Epilepsia', 'Uso de corticoide (risco de ruptura de tendão)', 'Diabetes'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Diarreia', 'Cefaleia', 'Tontura'],
      graves: ['Tendinopatia/ruptura de tendão de Aquiles', 'Prolongamento QT', 'Neuropatia periférica', 'Psicose']
    },
    interacoes: [
      { medicamento: 'Antiácidos/Ferro/Cálcio', gravidade: 'moderada', efeito: 'Redução da absorção', conduta: 'Separar em 2h' },
      { medicamento: 'Teofilina', gravidade: 'moderada', efeito: 'Aumento dos níveis de teofilina', conduta: 'Monitorar' }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Dose habitual' },
      { tfg: '30-50', ajuste: '250-500mg 12/12h' },
      { tfg: '<30', ajuste: '250-500mg 18/18h' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Não recomendado' },
    monitorizacao: ['Sintomas de tendinopatia', 'Sinais neurológicos'],
    orientacoesPaciente: ['Evitar exercícios intensos durante o tratamento', 'Tomar com bastante água', 'Não tomar com antiácidos'],
    doencasRelacionadas: ['infeccao-urinaria', 'pielonefrite'],
    calculadoras: ['ckdepi'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['antibiotico', 'fluoroquinolona', 'itu', 'pielonefrite']
  },
  {
    id: 'cefalexina',
    nomeGenerico: 'Cefalexina',
    nomesComerciais: ['Keflex', 'Cefalexin'],
    // Ontologias
    atcCode: 'J01DB01',
    rxNormCui: '2193',
    drugBankId: 'DB00567',
    snomedCT: '372713007',
    casNumber: '15686-71-2',
    classeTerapeutica: 'antibiotico',
    subclasse: 'cefalosporina_1g',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '500mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '250mg/5mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Infecções de pele e tecidos moles (celulite, erisipela, impetigo)',
      'Infecções do trato respiratório superior',
      'Infecção urinária não complicada',
      'Profilaxia de infecção de ferida operatória'
    ],
    mecanismoAcao: 'Cefalosporina de 1ª geração. Bactericida, inibe síntese da parede celular.',
    posologias: [
      {
        indicacao: 'Infecções de pele',
        adultos: { dose: '500mg 6/6h por 7-10 dias', frequencia: '4x/dia' },
        pediatrico: { dose: '25-50mg/kg/dia dividido em 6/6h', frequencia: '4x/dia' }
      }
    ],
    contraindicacoes: ['Alergia a cefalosporinas ou penicilinas (reação grave)'],
    precaucoes: ['Insuficiência renal', 'História de colite'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náusea', 'Dispepsia', 'Rash'],
      graves: ['Reação anafilática', 'Colite pseudomembranosa']
    },
    interacoes: [
      { medicamento: 'Probenecida', gravidade: 'leve', efeito: 'Aumento dos níveis de cefalexina', conduta: 'Monitorar' }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Dose habitual' },
      { tfg: '10-50', ajuste: '500mg 8/8h a 12/12h' },
      { tfg: '<10', ajuste: '500mg 12/12h a 24/24h' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Melhora clínica', 'Sinais de reação alérgica'],
    orientacoesPaciente: ['Completar tratamento', 'Pode tomar com alimentos'],
    doencasRelacionadas: ['celulite', 'erisipela'],
    calculadoras: [],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['antibiotico', 'cefalosporina', 'pele', 'itu']
  },
  {
    id: 'metronidazol',
    nomeGenerico: 'Metronidazol',
    nomesComerciais: ['Flagyl', 'Metro'],
    // Ontologias
    atcCode: 'J01XD01',
    rxNormCui: '6922',
    drugBankId: 'DB00916',
    snomedCT: '372602008',
    casNumber: '443-48-1',
    classeTerapeutica: 'antibiotico',
    subclasse: 'nitroimidazol',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
      { forma: 'gel_vaginal', concentracao: '0,75%', disponivelSUS: true }
    ],
    indicacoes: [
      'Vaginose bacteriana',
      'Tricomoníase',
      'Giardíase e amebíase',
      'Infecções por anaeróbios',
      'Colite pseudomembranosa (C. difficile)',
      'Erradicação de H. pylori (em esquema)'
    ],
    mecanismoAcao: 'Nitroimidazol com ação antibacteriana (anaeróbios) e antiprotozoária. Dano ao DNA após redução do grupo nitro.',
    posologias: [
      {
        indicacao: 'Vaginose bacteriana',
        adultos: { dose: '500mg 12/12h por 7 dias VO ou gel vaginal 1x/noite por 5 dias', frequencia: '2x/dia' }
      },
      {
        indicacao: 'Giardíase',
        adultos: { dose: '250mg 8/8h por 5-7 dias', frequencia: '3x/dia' }
      }
    ],
    contraindicacoes: ['Primeiro trimestre de gestação', 'Uso de álcool', 'Hipersensibilidade'],
    precaucoes: ['Neuropatia periférica prévia', 'Encefalopatia hepática', 'Discrasias sanguíneas'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Gosto metálico', 'Urina escura', 'Cefaleia'],
      graves: ['Neuropatia periférica', 'Convulsões', 'Efeito dissulfiram']
    },
    interacoes: [
      { medicamento: 'Álcool', gravidade: 'grave', efeito: 'Reação tipo dissulfiram (náusea, vômito, flush)', conduta: 'Evitar álcool durante e 48h após' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumento do INR', conduta: 'Monitorar INR' }
    ],
    ajusteDoseRenal: [
      { tfg: '>10', ajuste: 'Não necessário' },
      { tfg: '<10', ajuste: 'Reduzir dose em 50%' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Suspender amamentação por 12-24h após dose' },
    monitorizacao: ['Sinais de neuropatia em uso prolongado'],
    orientacoesPaciente: ['NÃO consumir álcool durante e 48h após', 'Urina pode ficar escura (normal)', 'Tratar parceiro se IST'],
    doencasRelacionadas: ['vaginose-bacteriana', 'tricomoniase', 'giardiase'],
    calculadoras: [],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['antibiotico', 'antiparasitario', 'vaginose', 'giardia']
  },
  {
    id: 'nitrofurantoina',
    nomeGenerico: 'Nitrofurantoína',
    nomesComerciais: ['Macrodantina'],
    // Ontologias
    atcCode: 'J01XE01',
    rxNormCui: '7517',
    drugBankId: 'DB00698',
    snomedCT: '373543005',
    casNumber: '67-20-9',
    classeTerapeutica: 'antibiotico',
    subclasse: 'nitrofurano',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Infecção urinária não complicada (cistite)',
      'Profilaxia de ITU recorrente'
    ],
    mecanismoAcao: 'Nitrofurano bacteriostático/bactericida. Inibe acetil-CoA e síntese proteica bacteriana. Concentra-se na urina.',
    posologias: [
      {
        indicacao: 'ITU não complicada',
        adultos: { dose: '100mg 6/6h por 5-7 dias', frequencia: '4x/dia' }
      },
      {
        indicacao: 'Profilaxia de ITU recorrente',
        adultos: { dose: '50-100mg à noite', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['TFG <30 mL/min', 'Deficiência de G6PD', 'Gestação a termo (>38 semanas)', 'Neonatos <1 mês'],
    precaucoes: ['Insuficiência renal', 'Anemia', 'Diabetes', 'Deficiência de B12'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Cefaleia', 'Flatulência'],
      graves: ['Fibrose pulmonar (uso prolongado)', 'Hepatotoxicidade', 'Neuropatia periférica', 'Hemólise em G6PD']
    },
    interacoes: [
      { medicamento: 'Antiácidos com magnésio', gravidade: 'moderada', efeito: 'Redução da absorção', conduta: 'Separar administração' }
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Dose habitual' },
      { tfg: '30-60', ajuste: 'Usar com cautela' },
      { tfg: '<30', ajuste: 'CONTRAINDICADO' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Evitar em RN <1 mês' },
    monitorizacao: ['Função pulmonar em uso >6 meses', 'Função hepática'],
    orientacoesPaciente: ['Tomar com alimentos (melhora absorção e tolerância)', 'Urina pode ficar amarelada/acastanhada'],
    doencasRelacionadas: ['infeccao-urinaria'],
    calculadoras: ['ckdepi'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['antibiotico', 'nitrofurano', 'itu', 'cistite']
  },
  {
    id: 'doxiciclina',
    nomeGenerico: 'Doxiciclina',
    nomesComerciais: ['Vibramicina', 'Doxiclin'],
    // Ontologias
    atcCode: 'J01AA02',
    rxNormCui: '3640',
    drugBankId: 'DB00254',
    snomedCT: '372478003',
    casNumber: '564-25-0',
    classeTerapeutica: 'antibiotico',
    subclasse: 'tetraciclina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Infecções por Chlamydia e Mycoplasma',
      'Doença inflamatória pélvica',
      'Acne moderada a grave',
      'Doença de Lyme',
      'Malária (profilaxia)',
      'Brucelose',
      'Leptospirose'
    ],
    mecanismoAcao: 'Tetraciclina bacteriostática. Inibe síntese proteica por ligação à subunidade 30S ribossomal.',
    posologias: [
      {
        indicacao: 'Clamídia/DIP',
        adultos: { dose: '100mg 12/12h por 7-14 dias', frequencia: '2x/dia' }
      },
      {
        indicacao: 'Acne',
        adultos: { dose: '100mg/dia por 3-6 meses', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Gestação', 'Crianças <8 anos', 'Hipersensibilidade a tetraciclinas'],
    precaucoes: ['Fotossensibilidade intensa', 'Insuficiência hepática', 'Miastenia gravis'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Diarreia', 'Fotossensibilidade', 'Esofagite'],
      graves: ['Hipertensão intracraniana', 'Hepatotoxicidade', 'Pancreatite']
    },
    interacoes: [
      { medicamento: 'Antiácidos/Ferro/Cálcio', gravidade: 'moderada', efeito: 'Redução da absorção', conduta: 'Separar 2-3h' },
      { medicamento: 'Isotretinoína', gravidade: 'grave', efeito: 'Risco de hipertensão intracraniana', conduta: 'Evitar associação' }
    ],
    ajusteDoseRenal: [
      { tfg: 'Qualquer', ajuste: 'Não necessário' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar durante amamentação' },
    monitorizacao: ['Fotossensibilidade', 'Sinais de esofagite'],
    orientacoesPaciente: ['Tomar com bastante água', 'NÃO deitar imediatamente após', 'Usar protetor solar', 'Evitar laticínios junto'],
    doencasRelacionadas: ['clamidiase', 'dip', 'acne'],
    calculadoras: [],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['antibiotico', 'tetraciclina', 'ist', 'acne']
  }
];
