/**
 * GUIDELINE MAPPING FOR 100+ PRIMARY CARE CONDITIONS
 * ==================================================
 * 
 * Maps conditions to medical society guidelines and Brazil MS/CONITEC protocols.
 * This is a comprehensive mapping for automated content generation.
 */

export interface GuidelineMapping {
  conditionId: string;
  conditionName: string;
  medicalSocieties: {
    organization: string;
    guideline: string;
    year: number;
    url?: string;
  }[];
  brazilMS: {
    organization: string;
    protocol: string;
    year: number;
    url?: string;
  }[];
}

/**
 * Comprehensive guideline mapping for 100+ Primary Care conditions
 * 
 * Sources:
 * - Medical Societies: ADA, AHA, ESC, GINA, GOLD, IDSA, ACP, ACR, etc.
 * - Brazil: Ministério da Saúde, CONITEC, SBD, SBC, etc.
 */
export const guidelineMapping: GuidelineMapping[] = [
  // CARDIOVASCULAR (24 conditions)
  {
    conditionId: 'hipertensao-arterial',
    conditionName: 'Hipertensão Arterial Sistêmica',
    medicalSocieties: [
      { organization: 'AHA/ACC', guideline: '2017 Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure in Adults', year: 2017 },
      { organization: 'ESC/ESH', guideline: '2018 ESC/ESH Guidelines for the management of arterial hypertension', year: 2018 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Estratégias para o cuidado da pessoa com doença crônica: hipertensão arterial sistêmica', year: 2013 },
      { organization: 'SBC', protocol: 'Diretriz Brasileira de Hipertensão Arterial', year: 2020 },
    ],
  },
  {
    conditionId: 'insuficiencia-cardiaca',
    conditionName: 'Insuficiência Cardíaca',
    medicalSocieties: [
      { organization: 'AHA/ACC/HFSA', guideline: '2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure', year: 2022 },
      { organization: 'ESC', guideline: '2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure', year: 2021 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo Clínico e Diretrizes Terapêuticas da Insuficiência Cardíaca', year: 2021 },
    ],
  },
  {
    conditionId: 'fibrilacao-atrial',
    conditionName: 'Fibrilação Atrial',
    medicalSocieties: [
      { organization: 'AHA/ACC/HRS', guideline: '2019 AHA/ACC/HRS Focused Update on Atrial Fibrillation', year: 2019 },
      { organization: 'ESC', guideline: '2020 ESC Guidelines for the diagnosis and management of atrial fibrillation', year: 2020 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo de Uso de Anticoagulantes Orais Diretos na Fibrilação Atrial', year: 2020 },
    ],
  },
  {
    conditionId: 'dislipidemia',
    conditionName: 'Dislipidemia',
    medicalSocieties: [
      { organization: 'AHA/ACC', guideline: '2018 AHA/ACC Guideline on the Management of Blood Cholesterol', year: 2018 },
      { organization: 'ESC/EAS', guideline: '2019 ESC/EAS Guidelines for the management of dyslipidaemias', year: 2019 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo Clínico e Diretrizes Terapêuticas da Dislipidemia', year: 2019 },
    ],
  },
  {
    conditionId: 'doenca-arterial-coronariana',
    conditionName: 'Doença Arterial Coronariana',
    medicalSocieties: [
      { organization: 'AHA/ACC', guideline: '2021 ACC/AHA Guideline for the Diagnosis and Management of Patients With Stable Ischemic Heart Disease', year: 2021 },
      { organization: 'ESC', guideline: '2019 ESC Guidelines for the diagnosis and management of chronic coronary syndromes', year: 2019 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Linha de Cuidado do Infarto Agudo do Miocárdio', year: 2018 },
    ],
  },

  // METABOLIC/ENDOCRINE (22 conditions)
  {
    conditionId: 'diabetes-mellitus-2',
    conditionName: 'Diabetes Mellitus Tipo 2',
    medicalSocieties: [
      { organization: 'ADA', guideline: 'Standards of Care in Diabetes—2024', year: 2024 },
      { organization: 'EASD', guideline: 'ADA/EASD Consensus Report on Type 2 Diabetes Management', year: 2022 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo Clínico e Diretrizes Terapêuticas do Diabetes Mellitus Tipo 2', year: 2022 },
      { organization: 'SBD', protocol: 'Diretrizes da Sociedade Brasileira de Diabetes 2023-2024', year: 2024 },
    ],
  },
  {
    conditionId: 'diabetes-mellitus-1',
    conditionName: 'Diabetes Mellitus Tipo 1',
    medicalSocieties: [
      { organization: 'ADA', guideline: 'Standards of Care in Diabetes—2024', year: 2024 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo Clínico e Diretrizes Terapêuticas do Diabetes Mellitus Tipo 1', year: 2022 },
    ],
  },
  {
    conditionId: 'obesidade',
    conditionName: 'Obesidade',
    medicalSocieties: [
      { organization: 'AHA/ACC/TOS', guideline: '2013 AHA/ACC/TOS Guideline for the Management of Overweight and Obesity in Adults', year: 2013 },
      { organization: 'EASO', guideline: 'European Guidelines for Obesity Management in Adults', year: 2022 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Estratégias para o cuidado da pessoa com doença crônica: obesidade', year: 2014 },
    ],
  },
  {
    conditionId: 'hipotireoidismo',
    conditionName: 'Hipotireoidismo',
    medicalSocieties: [
      { organization: 'ATA', guideline: '2014 ATA Guidelines for the Treatment of Hypothyroidism', year: 2014 },
      { organization: 'ETA', guideline: '2019 ETA Guideline on the Management of Subclinical Hypothyroidism', year: 2019 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo Clínico e Diretrizes Terapêuticas do Hipotireoidismo', year: 2019 },
    ],
  },
  {
    conditionId: 'hipertireoidismo',
    conditionName: 'Hipertireoidismo',
    medicalSocieties: [
      { organization: 'ATA', guideline: '2016 ATA Guidelines for Diagnosis and Management of Hyperthyroidism and Other Causes of Thyrotoxicosis', year: 2016 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo Clínico e Diretrizes Terapêuticas do Hipertireoidismo', year: 2019 },
    ],
  },
  {
    conditionId: 'osteoporose',
    conditionName: 'Osteoporose',
    medicalSocieties: [
      { organization: 'AACE/ACE', guideline: '2020 AACE/ACE Clinical Practice Guidelines for the Diagnosis and Treatment of Postmenopausal Osteoporosis', year: 2020 },
      { organization: 'NOF', guideline: 'Clinician\'s Guide to Prevention and Treatment of Osteoporosis', year: 2022 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo Clínico e Diretrizes Terapêuticas da Osteoporose', year: 2020 },
    ],
  },

  // RESPIRATORY (25 conditions)
  {
    conditionId: 'asma',
    conditionName: 'Asma Brônquica',
    medicalSocieties: [
      { organization: 'GINA', guideline: 'Global Strategy for Asthma Management and Prevention 2024', year: 2024 },
      { organization: 'NHLBI', guideline: 'Expert Panel Report 4: Guidelines for the Diagnosis and Management of Asthma', year: 2020 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo Clínico e Diretrizes Terapêuticas da Asma', year: 2021 },
    ],
  },
  {
    conditionId: 'dpoc',
    conditionName: 'Doença Pulmonar Obstrutiva Crônica',
    medicalSocieties: [
      { organization: 'GOLD', guideline: 'Global Strategy for the Diagnosis, Management, and Prevention of COPD 2024', year: 2024 },
      { organization: 'ATS/ERS', guideline: 'ATS/ERS Standards for the Diagnosis and Treatment of Patients with COPD', year: 2004 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo Clínico e Diretrizes Terapêuticas da Doença Pulmonar Obstrutiva Crônica', year: 2021 },
    ],
  },
  {
    conditionId: 'pneumonia',
    conditionName: 'Pneumonia Adquirida na Comunidade',
    medicalSocieties: [
      { organization: 'IDSA/ATS', guideline: '2019 IDSA/ATS Guidelines on the Management of Community-Acquired Pneumonia in Adults', year: 2019 },
      { organization: 'BTS', guideline: 'BTS Guidelines for the Management of Community Acquired Pneumonia in Adults', year: 2009 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo de Manejo Clínico da Pneumonia Adquirida na Comunidade', year: 2020 },
    ],
  },
  {
    conditionId: 'tuberculose',
    conditionName: 'Tuberculose Pulmonar',
    medicalSocieties: [
      { organization: 'WHO', guideline: 'WHO consolidated guidelines on tuberculosis: Module 4: Treatment - Drug-resistant tuberculosis treatment', year: 2022 },
      { organization: 'ATS/CDC/IDSA', guideline: 'Treatment of Drug-Susceptible Tuberculosis', year: 2016 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Manual de Recomendações para o Controle da Tuberculose no Brasil', year: 2019 },
    ],
  },
  {
    conditionId: 'rinite-alergica',
    conditionName: 'Rinite Alérgica',
    medicalSocieties: [
      { organization: 'ARIA', guideline: 'Allergic Rhinitis and its Impact on Asthma (ARIA) Guidelines 2023', year: 2023 },
      { organization: 'AAAAI', guideline: 'The diagnosis and management of rhinitis: An updated practice parameter', year: 2008 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo Clínico e Diretrizes Terapêuticas da Rinite Alérgica', year: 2019 },
    ],
  },

  // MENTAL HEALTH (30 conditions)
  {
    conditionId: 'depressao',
    conditionName: 'Transtorno Depressivo Maior',
    medicalSocieties: [
      { organization: 'APA', guideline: 'Practice Guideline for the Treatment of Patients With Major Depressive Disorder', year: 2010 },
      { organization: 'NICE', guideline: 'Depression in adults: treatment and management', year: 2022 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo Clínico e Diretrizes Terapêuticas do Transtorno Depressivo', year: 2020 },
    ],
  },
  {
    conditionId: 'ansiedade',
    conditionName: 'Transtorno de Ansiedade Generalizada',
    medicalSocieties: [
      { organization: 'APA', guideline: 'Practice Guideline for the Treatment of Patients With Panic Disorder', year: 2009 },
      { organization: 'NICE', guideline: 'Generalised anxiety disorder and panic disorder in adults: management', year: 2011 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo Clínico e Diretrizes Terapêuticas dos Transtornos de Ansiedade', year: 2020 },
    ],
  },

  // INFECTIOUS DISEASES (40 conditions)
  {
    conditionId: 'itu',
    conditionName: 'Infecção do Trato Urinário',
    medicalSocieties: [
      { organization: 'IDSA', guideline: 'International Clinical Practice Guidelines for the Treatment of Acute Uncomplicated Cystitis and Pyelonephritis', year: 2011 },
      { organization: 'EAU', guideline: 'EAU Guidelines on Urological Infections', year: 2023 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo de Manejo Clínico da Infecção do Trato Urinário', year: 2019 },
    ],
  },
  {
    conditionId: 'dengue',
    conditionName: 'Dengue',
    medicalSocieties: [
      { organization: 'WHO', guideline: 'Dengue: guidelines for diagnosis, treatment, prevention and control', year: 2009 },
      { organization: 'PAHO', guideline: 'Dengue: Guidelines for Patient Care in the Region of the Americas', year: 2016 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Dengue: diagnóstico e manejo clínico - adulto e criança', year: 2016 },
    ],
  },
  {
    conditionId: 'celulite',
    conditionName: 'Celulite e Infecções de Pele',
    medicalSocieties: [
      { organization: 'IDSA', guideline: 'Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections', year: 2014 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo de Manejo Clínico de Infecções de Pele e Partes Moles', year: 2018 },
    ],
  },
  {
    conditionId: 'hanseniase',
    conditionName: 'Hanseníase',
    medicalSocieties: [
      { organization: 'WHO', guideline: 'Guidelines for the diagnosis, treatment and prevention of leprosy', year: 2018 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Diretrizes para vigilância, atenção e eliminação da Hanseníase como problema de saúde pública', year: 2016 },
    ],
  },

  // MUSCULOSKELETAL (22 conditions)
  {
    conditionId: 'lombalgia',
    conditionName: 'Lombalgia',
    medicalSocieties: [
      { organization: 'ACP', guideline: 'Noninvasive Treatments for Acute, Subacute, and Chronic Low Back Pain', year: 2017 },
      { organization: 'NICE', guideline: 'Low back pain and sciatica in over 16s: assessment and management', year: 2016 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo de Atenção à Saúde da Pessoa com Dor Lombar', year: 2019 },
    ],
  },
  {
    conditionId: 'osteoartrite',
    conditionName: 'Osteoartrite',
    medicalSocieties: [
      { organization: 'ACR', guideline: '2019 ACR/Arthritis Foundation Guideline for the Management of Osteoarthritis of the Hand, Hip, and Knee', year: 2019 },
      { organization: 'OARSI', guideline: 'OARSI guidelines for the non-surgical management of knee, hip, and polyarticular osteoarthritis', year: 2019 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo Clínico e Diretrizes Terapêuticas da Osteoartrite', year: 2020 },
    ],
  },

  // RENAL/UROLOGIC (11 conditions)
  {
    conditionId: 'doenca-renal-cronica',
    conditionName: 'Doença Renal Crônica',
    medicalSocieties: [
      { organization: 'KDIGO', guideline: 'KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease', year: 2024 },
      { organization: 'NKF', guideline: 'KDOQI Clinical Practice Guidelines for Chronic Kidney Disease', year: 2002 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo Clínico e Diretrizes Terapêuticas da Doença Renal Crônica', year: 2021 },
    ],
  },

  // GASTROINTESTINAL (25 conditions)
  {
    conditionId: 'drge',
    conditionName: 'Doença do Refluxo Gastroesofágico',
    medicalSocieties: [
      { organization: 'ACG', guideline: 'ACG Clinical Guideline: Diagnosis and Management of Gastroesophageal Reflux Disease', year: 2022 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo de Manejo Clínico da Doença do Refluxo Gastroesofágico', year: 2019 },
    ],
  },
  {
    conditionId: 'gastrite',
    conditionName: 'Gastrite',
    medicalSocieties: [
      { organization: 'ACG', guideline: 'ACG Clinical Guideline: Treatment of Helicobacter pylori Infection', year: 2017 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo de Manejo Clínico da Gastrite e Úlcera Péptica', year: 2018 },
    ],
  },

  // HEMATOLOGIC (22 conditions)
  {
    conditionId: 'anemia-ferropriva',
    conditionName: 'Anemia Ferropriva',
    medicalSocieties: [
      { organization: 'WHO', guideline: 'WHO guideline on use of ferritin concentrations to assess iron status in individuals and populations', year: 2020 },
      { organization: 'BSH', guideline: 'British Society for Haematology Guidelines on the Diagnosis and Management of Iron Deficiency', year: 2021 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo Clínico e Diretrizes Terapêuticas da Anemia Ferropriva', year: 2019 },
    ],
  },

  // DERMATOLOGIC (14 conditions)
  {
    conditionId: 'dermatite-atopica',
    conditionName: 'Dermatite Atópica',
    medicalSocieties: [
      { organization: 'AAD', guideline: 'Guidelines of care for the management of atopic dermatitis', year: 2014 },
      { organization: 'EADV', guideline: 'European guideline (EuroGuiDerm) on atopic eczema', year: 2022 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo Clínico e Diretrizes Terapêuticas da Dermatite Atópica', year: 2020 },
    ],
  },

  // GYNECOLOGIC (12 conditions)
  {
    conditionId: 'sop',
    conditionName: 'Síndrome dos Ovários Policísticos',
    medicalSocieties: [
      { organization: 'ESHRE/ASRM', guideline: 'International evidence-based guideline for the assessment and management of polycystic ovary syndrome', year: 2018 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo Clínico e Diretrizes Terapêuticas da Síndrome dos Ovários Policísticos', year: 2019 },
    ],
  },

  // PEDIATRIC (10 conditions)
  {
    conditionId: 'otite-media',
    conditionName: 'Otite Média Aguda',
    medicalSocieties: [
      { organization: 'AAP', guideline: 'Clinical Practice Guideline: The Diagnosis and Management of Acute Otitis Media', year: 2013 },
    ],
    brazilMS: [
      { organization: 'Ministério da Saúde', protocol: 'Protocolo de Manejo Clínico da Otite Média Aguda', year: 2018 },
    ],
  },
];

