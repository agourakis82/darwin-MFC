/**
 * EXPANSÃO DE ANTIBIÓTICOS - DARWIN-MFC
 * ======================================
 *
 * Antibióticos essenciais para APS baseados na WHO Essential Medicines List
 * e RENAME 2024
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosAntibioticosExpansao: Partial<Medicamento>[] = [
  // ============================================================================
  // PENICILINAS
  // ============================================================================
  {
    id: 'amoxicilina-clavulanato',
    nomeGenerico: 'Amoxicilina + Clavulanato',
    nomesComerciais: ['Clavulin', 'Novamox', 'Sigma-Clav'],
    atcCode: 'J01CR02',
    classeTerapeutica: 'antibiotico',
    subclasse: 'penicilina_inibidor',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg + 125mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '875mg + 125mg', disponivelSUS: false },
      { forma: 'suspensao_oral', concentracao: '250mg + 62,5mg/5mL', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '400mg + 57mg/5mL', disponivelSUS: false }
    ],
    indicacoes: [
      'Sinusite bacteriana aguda',
      'Otite média aguda',
      'Pneumonia comunitária (alternativa)',
      'Infecções de pele e tecidos moles',
      'Mordeduras de animais',
      'ITU complicada'
    ],
    mecanismoAcao: 'Amoxicilina inibe a síntese da parede celular bacteriana. Clavulanato inibe beta-lactamases, ampliando o espectro contra produtores de beta-lactamase.',
    posologias: [
      {
        indicacao: 'Infecções respiratórias',
        adultos: { dose: '500/125mg ou 875/125mg', frequencia: '8/8h ou 12/12h', doseMaxima: '3g/dia de amoxicilina' },
        pediatrico: { dose: '25-45mg/kg/dia (amoxicilina)', frequencia: '12/12h', idadeMinima: '3 meses' }
      }
    ],
    contraindicacoes: [
      'Alergia a penicilinas',
      'Histórico de hepatotoxicidade por amoxicilina-clavulanato',
      'Mononucleose infecciosa'
    ],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náuseas', 'Rash cutâneo', 'Candidíase'],
      graves: ['Hepatite colestática', 'Anafilaxia', 'Colite pseudomembranosa', 'Síndrome de Stevens-Johnson']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumento do INR', conduta: 'Monitorar INR' },
      { medicamento: 'Metotrexato', gravidade: 'grave', efeito: 'Toxicidade do metotrexato', conduta: 'Evitar associação' },
      { medicamento: 'Alopurinol', gravidade: 'leve', efeito: 'Aumento de rash cutâneo', conduta: 'Monitorar' }
    ],
    ajusteDoseRenal: [
      { tfg: '10-30', ajuste: '500/125mg 12/12h' },
      { tfg: '<10', ajuste: '500/125mg 24/24h' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Excretado no leite em pequenas quantidades, geralmente seguro' }
  },
  {
    id: 'ampicilina',
    nomeGenerico: 'Ampicilina',
    nomesComerciais: ['Ampicil', 'Binotal'],
    atcCode: 'J01CA01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'penicilina',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '500mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '500mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '1g', disponivelSUS: true }
    ],
    indicacoes: [
      'Meningite bacteriana (com ceftriaxona)',
      'Endocardite por Enterococcus',
      'Listeriose',
      'Infecções biliares',
      'ITU por Enterococcus'
    ],
    mecanismoAcao: 'Inibe a síntese da parede celular bacteriana ao se ligar às PBPs (proteínas ligadoras de penicilina).',
    posologias: [
      {
        indicacao: 'Meningite',
        adultos: { dose: '2g IV', frequencia: '4/4h', doseMaxima: '12g/dia' },
        pediatrico: { dose: '200-400mg/kg/dia', frequencia: '4/4h' }
      }
    ],
    contraindicacoes: ['Alergia a penicilinas', 'Mononucleose infecciosa'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Rash', 'Náuseas'],
      graves: ['Anafilaxia', 'Colite pseudomembranosa', 'Nefrite intersticial']
    },
    interacoes: [
      { medicamento: 'Alopurinol', gravidade: 'leve', efeito: 'Rash cutâneo', conduta: 'Monitorar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível com amamentação' }
  },
  {
    id: 'oxacilina',
    nomeGenerico: 'Oxacilina',
    nomesComerciais: ['Staficilin-N'],
    atcCode: 'J01CF04',
    classeTerapeutica: 'antibiotico',
    subclasse: 'penicilina',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '500mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '1g', disponivelSUS: true }
    ],
    indicacoes: [
      'Infecções por S. aureus sensível a meticilina (MSSA)',
      'Endocardite por MSSA',
      'Osteomielite',
      'Celulite/erisipela',
      'Pneumonia estafilocócica'
    ],
    mecanismoAcao: 'Penicilina resistente a penicilinases estafilocócicas. Inibe síntese de parede celular.',
    posologias: [
      {
        indicacao: 'Infecções graves por MSSA',
        adultos: { dose: '2g IV', frequencia: '4/4h', doseMaxima: '12g/dia' },
        pediatrico: { dose: '150-200mg/kg/dia', frequencia: '4/4h ou 6/6h' }
      }
    ],
    contraindicacoes: ['Alergia a penicilinas'],
    efeitosAdversos: {
      comuns: ['Flebite', 'Rash', 'Febre medicamentosa'],
      graves: ['Nefrite intersticial', 'Neutropenia', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Alteração do INR', conduta: 'Monitorar INR' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },

  // ============================================================================
  // CEFALOSPORINAS
  // ============================================================================
  {
    id: 'cefalexina',
    nomeGenerico: 'Cefalexina',
    nomesComerciais: ['Keflex', 'Cefalexin'],
    atcCode: 'J01DB01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'cefalosporina_1g',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '500mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '250mg/5mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Infecções de pele e tecidos moles',
      'Faringite estreptocócica (alternativa)',
      'ITU não complicada (alternativa)',
      'Profilaxia de endocardite',
      'Impetigo'
    ],
    mecanismoAcao: 'Cefalosporina de 1ª geração. Inibe síntese de parede celular. Boa cobertura para Gram-positivos e alguns Gram-negativos.',
    posologias: [
      {
        indicacao: 'Infecções de pele',
        adultos: { dose: '500mg', frequencia: '6/6h', doseMaxima: '4g/dia' },
        pediatrico: { dose: '25-50mg/kg/dia', frequencia: '6/6h ou 12/12h' }
      }
    ],
    contraindicacoes: ['Alergia a cefalosporinas', 'Reação anafilática a penicilinas'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náuseas', 'Rash'],
      graves: ['Anafilaxia', 'Colite pseudomembranosa']
    },
    interacoes: [
      { medicamento: 'Probenecida', gravidade: 'leve', efeito: 'Aumento dos níveis de cefalexina', conduta: 'Pode ser usado terapeuticamente' }
    ],
    ajusteDoseRenal: [
      { tfg: '10-50', ajuste: '500mg 8/8h ou 12/12h' },
      { tfg: '<10', ajuste: '250mg 12/12h ou 24/24h' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },
  {
    id: 'cefazolina',
    nomeGenerico: 'Cefazolina',
    nomesComerciais: ['Kefazol', 'Cefazolin'],
    atcCode: 'J01DB04',
    classeTerapeutica: 'antibiotico',
    subclasse: 'cefalosporina_1g',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '1g', disponivelSUS: true }
    ],
    indicacoes: [
      'Profilaxia cirúrgica',
      'Infecções de pele e tecidos moles (hospitalar)',
      'Endocardite por MSSA (alternativa)',
      'Osteomielite (alternativa)'
    ],
    mecanismoAcao: 'Cefalosporina de 1ª geração parenteral. Excelente cobertura para cocos Gram-positivos.',
    posologias: [
      {
        indicacao: 'Profilaxia cirúrgica',
        adultos: { dose: '2g IV', frequencia: 'Dose única 30-60min antes da incisão', observacoes: 'Repetir a cada 4h se cirurgia prolongada' }
      },
      {
        indicacao: 'Infecções graves',
        adultos: { dose: '1-2g', frequencia: '8/8h', doseMaxima: '6g/dia' }
      }
    ],
    contraindicacoes: ['Alergia a cefalosporinas', 'Anafilaxia prévia a penicilinas'],
    efeitosAdversos: {
      comuns: ['Flebite', 'Rash', 'Diarreia'],
      graves: ['Anafilaxia', 'Nefrotoxicidade']
    },
    interacoes: [],
    ajusteDoseRenal: [
      { tfg: '35-54', ajuste: '1g 8/8h' },
      { tfg: '11-34', ajuste: '500mg 12/12h' },
      { tfg: '<10', ajuste: '500mg 18-24h' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },
  {
    id: 'cefuroxima',
    nomeGenerico: 'Cefuroxima',
    nomesComerciais: ['Zinnat', 'Cefurox'],
    atcCode: 'J01DC02',
    classeTerapeutica: 'antibiotico',
    subclasse: 'cefalosporina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '750mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Pneumonia comunitária',
      'Sinusite aguda',
      'Otite média aguda',
      'Infecções de pele',
      'ITU'
    ],
    mecanismoAcao: 'Cefalosporina de 2ª geração. Maior espectro contra Gram-negativos que 1ª geração, mantendo atividade contra Gram-positivos.',
    posologias: [
      {
        indicacao: 'Pneumonia/Sinusite',
        adultos: { dose: '500mg VO', frequencia: '12/12h' },
        pediatrico: { dose: '15mg/kg VO', frequencia: '12/12h', doseMaxima: '500mg/dose' }
      }
    ],
    contraindicacoes: ['Alergia a cefalosporinas'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náuseas'],
      graves: ['Colite pseudomembranosa', 'Anafilaxia']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },

  // ============================================================================
  // MACROLÍDEOS
  // ============================================================================
  {
    id: 'azitromicina',
    nomeGenerico: 'Azitromicina',
    nomesComerciais: ['Zitromax', 'Azitromin', 'Azi'],
    atcCode: 'J01FA10',
    classeTerapeutica: 'antibiotico',
    subclasse: 'macrolideo',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '200mg/5mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '500mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Pneumonia comunitária atípica',
      'Sinusite aguda',
      'Faringite estreptocócica (alternativa)',
      'Uretrite/cervicite por Chlamydia',
      'Cancro mole',
      'Coqueluche',
      'Profilaxia de MAC em HIV'
    ],
    mecanismoAcao: 'Macrolídeo azalídeo. Liga-se à subunidade 50S ribossomal, inibindo síntese proteica. Meia-vida longa permite doses diárias únicas.',
    posologias: [
      {
        indicacao: 'Pneumonia/Sinusite',
        adultos: { dose: '500mg', frequencia: '1x/dia por 3 dias', observacoes: 'Ou 500mg D1, depois 250mg/dia por 4 dias' },
        pediatrico: { dose: '10mg/kg D1, depois 5mg/kg', frequencia: '1x/dia por 4 dias' }
      },
      {
        indicacao: 'Clamídia',
        adultos: { dose: '1g', frequencia: 'Dose única' }
      }
    ],
    contraindicacoes: ['Alergia a macrolídeos', 'Histórico de colestase/hepatotoxicidade por azitromicina', 'Uso com ergotamina'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náuseas', 'Dor abdominal'],
      graves: ['Prolongamento do QT', 'Hepatotoxicidade', 'Reação alérgica grave']
    },
    interacoes: [
      { medicamento: 'Antiarrítmicos classe IA/III', gravidade: 'grave', efeito: 'Prolongamento do QT', conduta: 'Evitar associação' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumento do INR', conduta: 'Monitorar INR' },
      { medicamento: 'Digoxina', gravidade: 'moderada', efeito: 'Aumento dos níveis de digoxina', conduta: 'Monitorar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível com amamentação' }
  },
  {
    id: 'claritromicina',
    nomeGenerico: 'Claritromicina',
    nomesComerciais: ['Klaricid', 'Claritrol'],
    atcCode: 'J01FA09',
    classeTerapeutica: 'antibiotico',
    subclasse: 'macrolideo',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '250mg/5mL', disponivelSUS: false }
    ],
    indicacoes: [
      'Pneumonia comunitária',
      'Erradicação de H. pylori',
      'MAC em HIV',
      'Sinusite',
      'Infecções de pele'
    ],
    mecanismoAcao: 'Macrolídeo semissintético. Inibe síntese proteica bacteriana na subunidade 50S.',
    posologias: [
      {
        indicacao: 'Pneumonia/Sinusite',
        adultos: { dose: '500mg', frequencia: '12/12h por 7-14 dias' }
      },
      {
        indicacao: 'H. pylori (terapia tripla)',
        adultos: { dose: '500mg', frequencia: '12/12h por 14 dias' }
      }
    ],
    contraindicacoes: ['Alergia a macrolídeos', 'Uso com ergotamina', 'Porfiria aguda'],
    efeitosAdversos: {
      comuns: ['Alteração do paladar', 'Diarreia', 'Náuseas'],
      graves: ['Hepatotoxicidade', 'Prolongamento QT', 'Rabdomiólise (com estatinas)']
    },
    interacoes: [
      { medicamento: 'Estatinas', gravidade: 'grave', efeito: 'Rabdomiólise', conduta: 'Suspender estatina durante uso' },
      { medicamento: 'Colchicina', gravidade: 'grave', efeito: 'Toxicidade fatal', conduta: 'Contraindicada em DRC' },
      { medicamento: 'Carbamazepina', gravidade: 'moderada', efeito: 'Aumento de carbamazepina', conduta: 'Monitorar níveis' }
    ],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: '250mg 12/12h ou 500mg 24/24h' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Excretado no leite, usar com cautela' }
  },

  // ============================================================================
  // FLUOROQUINOLONAS
  // ============================================================================
  {
    id: 'levofloxacino',
    nomeGenerico: 'Levofloxacino',
    nomesComerciais: ['Levaquin', 'Tavanic', 'Levoxin'],
    atcCode: 'J01MA12',
    classeTerapeutica: 'antibiotico',
    subclasse: 'fluoroquinolona',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '750mg', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '500mg/100mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Pneumonia comunitária',
      'Sinusite (casos graves)',
      'ITU complicada',
      'Pielonefrite',
      'Prostatite bacteriana',
      'Infecções de pele complicadas'
    ],
    mecanismoAcao: 'Fluoroquinolona de 3ª geração (respiratória). Inibe DNA girase e topoisomerase IV bacterianas.',
    posologias: [
      {
        indicacao: 'Pneumonia comunitária',
        adultos: { dose: '500mg', frequencia: '1x/dia por 7-14 dias', observacoes: '750mg pode ser usado por 5 dias' }
      },
      {
        indicacao: 'ITU complicada',
        adultos: { dose: '750mg', frequencia: '1x/dia por 5-14 dias' }
      }
    ],
    contraindicacoes: [
      'Alergia a fluoroquinolonas',
      'Histórico de tendinopatia por quinolonas',
      'Miastenia gravis',
      'Prolongamento QT',
      '<18 anos (risco cartilagem)'
    ],
    precaucoes: [
      'Risco de tendinite/ruptura de tendão (especialmente >60 anos, uso de corticoides)',
      'Neuropatia periférica',
      'Fotossensibilidade',
      'Alterações glicêmicas'
    ],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Diarreia', 'Cefaleia', 'Insônia'],
      graves: ['Tendinite/ruptura de tendão', 'Neuropatia periférica', 'Prolongamento QT', 'Convulsões', 'Dissecção de aorta']
    },
    interacoes: [
      { medicamento: 'Antiácidos/Ferro/Zinco', gravidade: 'moderada', efeito: 'Redução da absorção', conduta: 'Administrar 2h antes ou 6h após' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumento do INR', conduta: 'Monitorar INR' },
      { medicamento: 'Antidiabéticos', gravidade: 'moderada', efeito: 'Hipo ou hiperglicemia', conduta: 'Monitorar glicemia' },
      { medicamento: 'Corticoides', gravidade: 'moderada', efeito: 'Aumento risco de tendinite', conduta: 'Evitar se possível' }
    ],
    ajusteDoseRenal: [
      { tfg: '20-49', ajuste: '500mg inicialmente, depois 250mg 24/24h' },
      { tfg: '10-19', ajuste: '500mg inicialmente, depois 250mg 48/48h' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar - excretado no leite, risco de artropatia' }
  },
  {
    id: 'moxifloxacino',
    nomeGenerico: 'Moxifloxacino',
    nomesComerciais: ['Avalox', 'Moxetil'],
    atcCode: 'J01MA14',
    classeTerapeutica: 'antibiotico',
    subclasse: 'fluoroquinolona',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '400mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Pneumonia comunitária grave',
      'Exacerbação de DPOC',
      'Sinusite bacteriana aguda',
      'Infecções intra-abdominais (alternativa)'
    ],
    mecanismoAcao: 'Fluoroquinolona de 4ª geração com excelente cobertura respiratória incluindo anaeróbios.',
    posologias: [
      {
        indicacao: 'Pneumonia/DPOC',
        adultos: { dose: '400mg', frequencia: '1x/dia por 5-14 dias' }
      }
    ],
    contraindicacoes: ['Alergia a quinolonas', 'Prolongamento QT', 'Hipocalemia não corrigida', 'Miastenia gravis'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Diarreia', 'Tontura'],
      graves: ['Prolongamento QT', 'Tendinite', 'Hepatotoxicidade', 'Convulsões']
    },
    interacoes: [
      { medicamento: 'Antiarrítmicos', gravidade: 'grave', efeito: 'Prolongamento QT', conduta: 'Evitar' },
      { medicamento: 'Antiácidos', gravidade: 'moderada', efeito: 'Redução absorção', conduta: 'Espaçar 4h' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' }
  },
  {
    id: 'norfloxacino',
    nomeGenerico: 'Norfloxacino',
    nomesComerciais: ['Floxacin', 'Norxacin'],
    atcCode: 'J01MA06',
    classeTerapeutica: 'antibiotico',
    subclasse: 'fluoroquinolona',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true }
    ],
    indicacoes: [
      'ITU não complicada',
      'Prostatite bacteriana',
      'Diarreia do viajante (profilaxia)',
      'Profilaxia de peritonite espontânea'
    ],
    mecanismoAcao: 'Fluoroquinolona de 2ª geração com concentração principalmente urinária.',
    posologias: [
      {
        indicacao: 'ITU não complicada',
        adultos: { dose: '400mg', frequencia: '12/12h por 3 dias' }
      },
      {
        indicacao: 'Prostatite',
        adultos: { dose: '400mg', frequencia: '12/12h por 4-6 semanas' }
      }
    ],
    contraindicacoes: ['Alergia a quinolonas', 'Tendinopatia prévia', '<18 anos'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Cefaleia', 'Tontura'],
      graves: ['Tendinite', 'Fotossensibilidade', 'Psicose']
    },
    interacoes: [
      { medicamento: 'Antiácidos', gravidade: 'moderada', efeito: 'Redução absorção', conduta: 'Espaçar 2h' },
      { medicamento: 'Teofilina', gravidade: 'moderada', efeito: 'Aumento de teofilina', conduta: 'Monitorar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' }
  },

  // ============================================================================
  // AMINOGLICOSÍDEOS
  // ============================================================================
  {
    id: 'amicacina',
    nomeGenerico: 'Amicacina',
    nomesComerciais: ['Novamin', 'Amikin'],
    atcCode: 'J01GB06',
    classeTerapeutica: 'antibiotico',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '250mg/mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '500mg/2mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Infecções por Gram-negativos resistentes',
      'Tuberculose (2ª linha)',
      'Sepse (associação)',
      'Endocardite (associação)',
      'Infecções por Pseudomonas'
    ],
    mecanismoAcao: 'Aminoglicosídeo. Liga-se à subunidade 30S ribossomal, causando erro na leitura do mRNA. Bactericida concentração-dependente.',
    posologias: [
      {
        indicacao: 'Infecções graves',
        adultos: { dose: '15-20mg/kg', frequencia: '1x/dia ou 7,5mg/kg 12/12h', observacoes: 'Monitorar níveis séricos' }
      }
    ],
    contraindicacoes: ['Miastenia gravis', 'Uso concomitante com outros ototóxicos/nefrotóxicos'],
    precaucoes: ['Nefrotoxicidade', 'Ototoxicidade', 'Bloqueio neuromuscular'],
    efeitosAdversos: {
      comuns: ['Nefrotoxicidade', 'Ototoxicidade vestibular/coclear'],
      graves: ['IRA', 'Surdez irreversível', 'Bloqueio neuromuscular']
    },
    interacoes: [
      { medicamento: 'Furosemida', gravidade: 'grave', efeito: 'Aumento ototoxicidade', conduta: 'Evitar ou monitorar rigorosamente' },
      { medicamento: 'Vancomicina', gravidade: 'grave', efeito: 'Aumento nefrotoxicidade', conduta: 'Monitorar função renal' },
      { medicamento: 'Bloqueadores neuromusculares', gravidade: 'grave', efeito: 'Paralisia prolongada', conduta: 'Cuidado em anestesia' }
    ],
    ajusteDoseRenal: [
      { tfg: '40-59', ajuste: 'Estender intervalo para 36h' },
      { tfg: '20-39', ajuste: 'Estender intervalo para 48h' },
      { tfg: '<20', ajuste: 'Guiar por níveis séricos' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Absorção oral mínima, monitorar diarreia no lactente' }
  },

  // ============================================================================
  // CARBAPENÊMICOS
  // ============================================================================
  {
    id: 'meropenem',
    nomeGenerico: 'Meropenem',
    nomesComerciais: ['Meronem', 'Meropenen'],
    atcCode: 'J01DH02',
    classeTerapeutica: 'antibiotico',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '500mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '1g', disponivelSUS: true }
    ],
    indicacoes: [
      'Infecções graves por Gram-negativos MDR',
      'Sepse grave',
      'Pneumonia nosocomial',
      'Meningite bacteriana (2ª linha)',
      'Infecções intra-abdominais complicadas',
      'Neutropenia febril'
    ],
    mecanismoAcao: 'Carbapenêmico. Inibe síntese de parede celular. Amplo espectro incluindo ESBL e AmpC. Estável à deidropeptidase renal.',
    posologias: [
      {
        indicacao: 'Infecções graves',
        adultos: { dose: '1g', frequencia: '8/8h IV', doseMaxima: '6g/dia' },
        pediatrico: { dose: '20-40mg/kg', frequencia: '8/8h', doseMaxima: '2g/dose' }
      },
      {
        indicacao: 'Meningite',
        adultos: { dose: '2g', frequencia: '8/8h' }
      }
    ],
    contraindicacoes: ['Alergia a carbapenêmicos', 'Anafilaxia a penicilinas (cautela)'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náuseas', 'Cefaleia', 'Rash'],
      graves: ['Convulsões', 'Colite pseudomembranosa', 'Trombocitopenia']
    },
    interacoes: [
      { medicamento: 'Valproato', gravidade: 'grave', efeito: 'Redução drástica de valproato', conduta: 'EVITAR - usar outro antiepiléptico' },
      { medicamento: 'Probenecida', gravidade: 'leve', efeito: 'Aumento de meropenem', conduta: 'Evitar associação' }
    ],
    ajusteDoseRenal: [
      { tfg: '26-50', ajuste: '1g 12/12h' },
      { tfg: '10-25', ajuste: '500mg 12/12h' },
      { tfg: '<10', ajuste: '500mg 24/24h' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Baixa excreção no leite' }
  },
  {
    id: 'ertapenem',
    nomeGenerico: 'Ertapenem',
    nomesComerciais: ['Invanz'],
    atcCode: 'J01DH03',
    classeTerapeutica: 'antibiotico',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '1g', disponivelSUS: true }
    ],
    indicacoes: [
      'Pneumonia comunitária',
      'Infecções intra-abdominais',
      'Infecções ginecológicas',
      'Pé diabético',
      'ITU complicada'
    ],
    mecanismoAcao: 'Carbapenêmico de dose única diária. NÃO cobre Pseudomonas ou Acinetobacter.',
    posologias: [
      {
        indicacao: 'Infecções gerais',
        adultos: { dose: '1g', frequencia: '1x/dia IM ou IV por 3-14 dias' }
      }
    ],
    contraindicacoes: ['Alergia a carbapenêmicos', 'Alergia a lidocaína (se IM)'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náuseas', 'Cefaleia'],
      graves: ['Convulsões', 'Colite', 'Reação alérgica']
    },
    interacoes: [
      { medicamento: 'Valproato', gravidade: 'grave', efeito: 'Reduz valproato', conduta: 'Evitar' }
    ],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: '500mg 1x/dia' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Excreção baixa' }
  },

  // ============================================================================
  // GLICOPEPTÍDEOS
  // ============================================================================
  {
    id: 'vancomicina',
    nomeGenerico: 'Vancomicina',
    nomesComerciais: ['Vancocina', 'Vancomicin'],
    atcCode: 'J01XA01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '500mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '1g', disponivelSUS: true },
      { forma: 'capsula', concentracao: '250mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Infecções por MRSA',
      'Endocardite por Enterococcus resistente',
      'Meningite por S. pneumoniae resistente',
      'Colite por C. difficile (VO)',
      'Sepse em neutropênico (cobertura para Gram+)'
    ],
    mecanismoAcao: 'Glicopeptídeo. Inibe síntese de parede celular ao se ligar ao terminal D-Ala-D-Ala do peptidoglicano.',
    posologias: [
      {
        indicacao: 'Infecções sistêmicas',
        adultos: { dose: '15-20mg/kg', frequencia: '8-12h IV', observacoes: 'Guiar por nível sérico (vale 15-20 mcg/mL)' }
      },
      {
        indicacao: 'C. difficile',
        adultos: { dose: '125-500mg VO', frequencia: '6/6h por 10-14 dias' }
      }
    ],
    contraindicacoes: ['Alergia a vancomicina'],
    precaucoes: ['Síndrome do homem vermelho (infusão rápida)', 'Nefrotoxicidade', 'Ototoxicidade'],
    efeitosAdversos: {
      comuns: ['Flebite', 'Náuseas', 'Rash'],
      graves: ['Nefrotoxicidade', 'Ototoxicidade', 'Síndrome do homem vermelho', 'Neutropenia']
    },
    interacoes: [
      { medicamento: 'Aminoglicosídeos', gravidade: 'grave', efeito: 'Nefrotoxicidade aditiva', conduta: 'Monitorar função renal' },
      { medicamento: 'Piperacilina-tazobactam', gravidade: 'moderada', efeito: 'Aumento de IRA', conduta: 'Preferir outras associações' }
    ],
    ajusteDoseRenal: [
      { tfg: '50-80', ajuste: '1g 12/12h' },
      { tfg: '20-49', ajuste: '1g 24/24h' },
      { tfg: '<20', ajuste: 'Guiar por níveis séricos' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorção oral mínima pelo lactente' }
  },
  {
    id: 'teicoplanina',
    nomeGenerico: 'Teicoplanina',
    nomesComerciais: ['Targocid'],
    atcCode: 'J01XA02',
    classeTerapeutica: 'antibiotico',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '200mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '400mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Infecções por MRSA (alternativa)',
      'Endocardite',
      'Osteomielite',
      'Infecções de pele'
    ],
    mecanismoAcao: 'Glicopeptídeo similar à vancomicina. Meia-vida longa permite dose única diária.',
    posologias: [
      {
        indicacao: 'Infecções graves',
        adultos: { dose: '12mg/kg 12/12h por 3 doses (ataque), depois 6-12mg/kg', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Alergia a glicopeptídeos'],
    efeitosAdversos: {
      comuns: ['Rash', 'Febre'],
      graves: ['Ototoxicidade', 'Nefrotoxicidade', 'Trombocitopenia']
    },
    interacoes: [
      { medicamento: 'Aminoglicosídeos', gravidade: 'moderada', efeito: 'Nefrotoxicidade', conduta: 'Monitorar' }
    ],
    ajusteDoseRenal: [
      { tfg: '40-60', ajuste: 'Metade da dose após D4' },
      { tfg: '<40', ajuste: '1/3 da dose após D4' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Dados limitados' }
  },

  // ============================================================================
  // SULFONAMIDAS
  // ============================================================================
  {
    id: 'sulfametoxazol-trimetoprima',
    nomeGenerico: 'Sulfametoxazol + Trimetoprima',
    nomesComerciais: ['Bactrim', 'Infectrin', 'Assepium'],
    atcCode: 'J01EE01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'sulfonamida_inibidor_folato',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg + 80mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '800mg + 160mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '200mg + 40mg/5mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '400mg + 80mg/5mL', disponivelSUS: true }
    ],
    indicacoes: [
      'ITU não complicada',
      'Profilaxia/tratamento de PCP',
      'Nocardiose',
      'Toxoplasmose',
      'Stenotrophomonas',
      'Infecções por MRSA-CA (pele)'
    ],
    mecanismoAcao: 'Sinergismo: SMX inibe diidropteroato sintase, TMP inibe diidrofolato redutase. Bloqueio sequencial da síntese de folato.',
    posologias: [
      {
        indicacao: 'ITU',
        adultos: { dose: '800/160mg', frequencia: '12/12h por 3 dias (mulher) ou 7-14 dias' }
      },
      {
        indicacao: 'Profilaxia PCP',
        adultos: { dose: '800/160mg', frequencia: '1x/dia ou 3x/semana' }
      },
      {
        indicacao: 'Tratamento PCP',
        adultos: { dose: '15-20mg/kg/dia (TMP)', frequencia: '6-8h por 21 dias' }
      }
    ],
    contraindicacoes: ['Alergia a sulfonamidas', 'Deficiência de G6PD grave', 'Anemia megaloblástica por folato', 'Gestação 1º trimestre e próximo ao parto'],
    precaucoes: ['Hidratação adequada (cristalúria)', 'Monitorar hemograma em uso prolongado'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Vômitos', 'Rash', 'Fotossensibilidade'],
      graves: ['Stevens-Johnson/NET', 'Discrasias sanguíneas', 'Hepatotoxicidade', 'Hipercalemia']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'grave', efeito: 'Aumento INR', conduta: 'Monitorar INR, reduzir varfarina' },
      { medicamento: 'Metotrexato', gravidade: 'grave', efeito: 'Toxicidade medular', conduta: 'Evitar associação' },
      { medicamento: 'IECA/BRA', gravidade: 'moderada', efeito: 'Hipercalemia', conduta: 'Monitorar K+' },
      { medicamento: 'Fenitoína', gravidade: 'moderada', efeito: 'Aumento de fenitoína', conduta: 'Monitorar níveis' }
    ],
    ajusteDoseRenal: [
      { tfg: '15-30', ajuste: 'Metade da dose' },
      { tfg: '<15', ajuste: 'Evitar ou usar com cautela' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar em RN <2 meses, icterícia, prematuros, deficiência G6PD' }
  },

  // ============================================================================
  // TETRACICLINAS
  // ============================================================================
  {
    id: 'doxiciclina',
    nomeGenerico: 'Doxiciclina',
    nomesComerciais: ['Vibramicina', 'Doxiclin'],
    atcCode: 'J01AA02',
    classeTerapeutica: 'antibiotico',
    subclasse: 'tetraciclina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Clamídia (uretrite, cervicite, linfogranuloma)',
      'Doença inflamatória pélvica',
      'Acne moderada a grave',
      'Malária (profilaxia e tratamento)',
      'Febre maculosa',
      'Leptospirose leve',
      'Brucelose',
      'Rosácea'
    ],
    mecanismoAcao: 'Tetraciclina semissintética. Inibe síntese proteica na subunidade 30S. Bacteriostático.',
    posologias: [
      {
        indicacao: 'Clamídia',
        adultos: { dose: '100mg', frequencia: '12/12h por 7 dias' }
      },
      {
        indicacao: 'Acne',
        adultos: { dose: '100mg', frequencia: '1-2x/dia por 3-6 meses' }
      },
      {
        indicacao: 'Profilaxia malária',
        adultos: { dose: '100mg', frequencia: '1x/dia', observacoes: 'Iniciar 1-2 dias antes, manter até 4 semanas após' }
      }
    ],
    contraindicacoes: ['<8 anos (manchas nos dentes)', 'Gestação', 'Amamentação', 'Alergia a tetraciclinas'],
    efeitosAdversos: {
      comuns: ['Fotossensibilidade', 'Náuseas', 'Esofagite', 'Candidíase vaginal'],
      graves: ['Hipertensão intracraniana', 'Hepatotoxicidade', 'Reação de fotossensibilidade grave']
    },
    interacoes: [
      { medicamento: 'Antiácidos/Ferro/Cálcio', gravidade: 'moderada', efeito: 'Redução absorção', conduta: 'Espaçar 2-3h' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumento INR', conduta: 'Monitorar INR' },
      { medicamento: 'Isotretinoína', gravidade: 'grave', efeito: 'Hipertensão intracraniana', conduta: 'Contraindicada' },
      { medicamento: 'Contraceptivos orais', gravidade: 'leve', efeito: 'Possível redução de eficácia', conduta: 'Método adicional por precaução' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado - deposição óssea e dentária' }
  },

  // ============================================================================
  // NITROFURANOS
  // ============================================================================
  {
    id: 'nitrofurantoina',
    nomeGenerico: 'Nitrofurantoína',
    nomesComerciais: ['Macrodantina', 'Hantina'],
    atcCode: 'J01XE01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'nitrofurano',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: [
      'ITU não complicada (cistite)',
      'Profilaxia de ITU recorrente'
    ],
    mecanismoAcao: 'Inibe múltiplos alvos bacterianos (DNA, RNA, proteínas, parede). Concentração apenas urinária.',
    posologias: [
      {
        indicacao: 'Cistite aguda',
        adultos: { dose: '100mg', frequencia: '6/6h ou 12/12h por 5-7 dias' }
      },
      {
        indicacao: 'Profilaxia',
        adultos: { dose: '50-100mg', frequencia: 'À noite por 6-12 meses' }
      }
    ],
    contraindicacoes: ['ClCr <30mL/min', 'Deficiência G6PD', 'Gestação a termo', '<1 mês de idade'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Anorexia', 'Urina escura'],
      graves: ['Fibrose pulmonar (uso prolongado)', 'Neuropatia periférica', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Antiácidos de magnésio', gravidade: 'moderada', efeito: 'Redução absorção', conduta: 'Espaçar' }
    ],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Contraindicado' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Evitar em RN <1 mês e deficiência de G6PD' }
  },

  // ============================================================================
  // FOSFOMICINA
  // ============================================================================
  {
    id: 'fosfomicina',
    nomeGenerico: 'Fosfomicina Trometamol',
    nomesComerciais: ['Monuril', 'Fosfocil'],
    atcCode: 'J01XX01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'solucao_oral', concentracao: '3g/sachê', disponivelSUS: true }
    ],
    indicacoes: [
      'Cistite não complicada em mulheres'
    ],
    mecanismoAcao: 'Inibe a UDP-N-acetilglicosamina enolpiruvil transferase, enzima da síntese de parede celular.',
    posologias: [
      {
        indicacao: 'Cistite',
        adultos: { dose: '3g', frequencia: 'Dose única', observacoes: 'Diluir em água, tomar com estômago vazio' }
      }
    ],
    contraindicacoes: ['Alergia à fosfomicina', 'DRC grave'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náuseas', 'Cefaleia'],
      graves: ['Colite por C. difficile']
    },
    interacoes: [
      { medicamento: 'Metoclopramida', gravidade: 'leve', efeito: 'Redução de níveis de fosfomicina', conduta: 'Evitar uso concomitante' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  }
];
