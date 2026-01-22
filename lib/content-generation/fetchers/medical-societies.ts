/**
 * MEDICAL SOCIETIES FETCHER
 * ==========================
 * 
 * Fetches clinical practice guidelines from major medical societies.
 * 
 * Societies Covered:
 * - ADA (American Diabetes Association)
 * - AHA/ACC (American Heart Association / American College of Cardiology)
 * - ESC (European Society of Cardiology)
 * - SBD (Sociedade Brasileira de Diabetes)
 * - SBC (Sociedade Brasileira de Cardiologia)
 * - SBMFC (Sociedade Brasileira de Medicina de Família e Comunidade)
 * 
 * Note: For prototype, we'll use known guideline URLs.
 * In production, implement proper web scraping or API integration.
 */

import type {
  Fetcher,
  FetchQuery,
  FetchResult,
  GuidelineData,
  Guideline,
  Recommendation,
  GradeLevel,
} from '../types';
import { guidelineMapping } from '../data/guideline-mapping';

interface GuidelineSource {
  organization: string;
  url: string;
  title: string;
  year: number;
  topics: string[];
}

// Known high-quality guidelines (curated list)
const KNOWN_GUIDELINES: GuidelineSource[] = [
  // Diabetes
  {
    organization: 'American Diabetes Association',
    url: 'https://diabetesjournals.org/care/issue/47/Supplement_1',
    title: 'Standards of Care in Diabetes—2024',
    year: 2024,
    topics: ['diabetes', 'diabetes mellitus', 'type 2 diabetes', 'type 1 diabetes'],
  },
  {
    organization: 'Sociedade Brasileira de Diabetes',
    url: 'https://diretriz.diabetes.org.br/',
    title: 'Diretrizes da Sociedade Brasileira de Diabetes 2023-2024',
    year: 2023,
    topics: ['diabetes', 'diabetes mellitus'],
  },
  
  // Cardiovascular
  {
    organization: 'American Heart Association',
    url: 'https://www.ahajournals.org/doi/10.1161/HYP.0000000000000065',
    title: '2017 ACC/AHA/AAPA/ABC/ACPM/AGS/APhA/ASH/ASPC/NMA/PCNA Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure in Adults',
    year: 2017,
    topics: ['hypertension', 'high blood pressure', 'cardiovascular'],
  },
  {
    organization: 'Sociedade Brasileira de Cardiologia',
    url: 'https://www.portal.cardiol.br/',
    title: 'Diretriz Brasileira de Hipertensão Arterial – 2020',
    year: 2020,
    topics: ['hypertension', 'hipertensão'],
  },
  {
    organization: 'European Society of Cardiology',
    url: 'https://www.escardio.org/Guidelines',
    title: '2018 ESC/ESH Guidelines for the management of arterial hypertension',
    year: 2018,
    topics: ['hypertension', 'cardiovascular'],
  },
  
  // Primary Care
  {
    organization: 'Sociedade Brasileira de Medicina de Família e Comunidade',
    url: 'https://www.sbmfc.org.br/',
    title: 'Protocolos de Atenção Primária à Saúde',
    year: 2023,
    topics: ['primary care', 'atenção primária', 'aps'],
  },

  // Dyslipidemia / Cholesterol
  {
    organization: 'American College of Cardiology',
    url: 'https://www.acc.org/guidelines',
    title: '2018 AHA/ACC/AACVPR/AAPA/ABC/ACPM/ADA/AGS/APhA/ASPC/NLA/PCNA Guideline on the Management of Blood Cholesterol',
    year: 2018,
    topics: ['dyslipidemia', 'cholesterol', 'lipids', 'cardiovascular'],
  },
  {
    organization: 'Sociedade Brasileira de Cardiologia',
    url: 'https://www.portal.cardiol.br/',
    title: 'Atualização da Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose – 2017',
    year: 2017,
    topics: ['dyslipidemia', 'dislipidemia', 'cholesterol', 'colesterol'],
  },

  // Obesity
  {
    organization: 'The Obesity Society',
    url: 'https://www.obesity.org/',
    title: 'Clinical Guidelines for the Evaluation and Management of Overweight and Obesity in Adults',
    year: 2022,
    topics: ['obesity', 'overweight', 'weight management', 'obesidade'],
  },
  {
    organization: 'Associação Brasileira para o Estudo da Obesidade e da Síndrome Metabólica',
    url: 'https://abeso.org.br/',
    title: 'Diretrizes Brasileiras de Obesidade 2022',
    year: 2022,
    topics: ['obesity', 'obesidade', 'metabolic syndrome'],
  },

  // Asthma
  {
    organization: 'Global Initiative for Asthma',
    url: 'https://ginasthma.org/',
    title: 'Global Strategy for Asthma Management and Prevention 2024',
    year: 2024,
    topics: ['asthma', 'asma', 'respiratory'],
  },
  {
    organization: 'Sociedade Brasileira de Pneumologia e Tisiologia',
    url: 'https://sbpt.org.br/',
    title: 'Diretrizes da Sociedade Brasileira de Pneumologia e Tisiologia para o Manejo da Asma – 2021',
    year: 2021,
    topics: ['asthma', 'asma'],
  },

  // COPD
  {
    organization: 'Global Initiative for Chronic Obstructive Lung Disease',
    url: 'https://goldcopd.org/',
    title: 'Global Strategy for the Diagnosis, Management, and Prevention of Chronic Obstructive Pulmonary Disease (2024 Report)',
    year: 2024,
    topics: ['copd', 'chronic obstructive pulmonary disease', 'dpoc'],
  },
  {
    organization: 'Sociedade Brasileira de Pneumologia e Tisiologia',
    url: 'https://sbpt.org.br/',
    title: 'Diretrizes para o Manejo da DPOC da SBPT – 2021',
    year: 2021,
    topics: ['copd', 'dpoc', 'chronic obstructive'],
  },

  // Depression
  {
    organization: 'American Psychiatric Association',
    url: 'https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines',
    title: 'Practice Guideline for the Treatment of Patients With Major Depressive Disorder',
    year: 2020,
    topics: ['depression', 'depressão', 'mental health', 'mood disorder'],
  },
  {
    organization: 'Associação Brasileira de Psiquiatria',
    url: 'https://www.abp.org.br/',
    title: 'Diretrizes para o Tratamento da Depressão',
    year: 2022,
    topics: ['depression', 'depressão', 'saúde mental'],
  },

  // Anxiety
  {
    organization: 'American Psychiatric Association',
    url: 'https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines',
    title: 'Clinical Practice Guideline for the Treatment of Anxiety Disorders',
    year: 2023,
    topics: ['anxiety', 'ansiedade', 'mental health', 'panic disorder'],
  },

  // Osteoporosis
  {
    organization: 'American Association of Clinical Endocrinologists',
    url: 'https://www.aace.com/disease-and-conditions/bone-and-parathyroid/osteoporosis',
    title: 'AACE/ACE Clinical Practice Guidelines for the Diagnosis and Treatment of Postmenopausal Osteoporosis',
    year: 2020,
    topics: ['osteoporosis', 'osteoporose', 'bone health', 'fracture'],
  },
  {
    organization: 'Sociedade Brasileira de Endocrinologia e Metabologia',
    url: 'https://www.sbem.org.br/',
    title: 'Diretrizes Brasileiras para o Diagnóstico e Tratamento da Osteoporose em Mulheres na Pós-menopausa',
    year: 2021,
    topics: ['osteoporosis', 'osteoporose'],
  },

  // Thyroid Disorders
  {
    organization: 'American Thyroid Association',
    url: 'https://www.thyroid.org/professionals/ata-professional-guidelines/',
    title: 'Guidelines for the Treatment of Hypothyroidism',
    year: 2021,
    topics: ['hypothyroidism', 'hipotireoidismo', 'thyroid', 'tireoide'],
  },
  {
    organization: 'Sociedade Brasileira de Endocrinologia e Metabologia',
    url: 'https://www.sbem.org.br/',
    title: 'Diretrizes Clínicas na Saúde Suplementar - Hipotireoidismo',
    year: 2022,
    topics: ['hypothyroidism', 'hipotireoidismo', 'thyroid'],
  },

  // Chronic Kidney Disease
  {
    organization: 'Kidney Disease: Improving Global Outcomes',
    url: 'https://kdigo.org/guidelines/',
    title: 'KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease',
    year: 2024,
    topics: ['chronic kidney disease', 'ckd', 'doença renal crônica', 'renal'],
  },
  {
    organization: 'Sociedade Brasileira de Nefrologia',
    url: 'https://www.sbn.org.br/',
    title: 'Diretrizes Brasileiras de Doença Renal Crônica',
    year: 2022,
    topics: ['chronic kidney disease', 'doença renal crônica', 'renal'],
  },

  // Atrial Fibrillation
  {
    organization: 'European Society of Cardiology',
    url: 'https://www.escardio.org/Guidelines',
    title: '2020 ESC Guidelines for the diagnosis and management of atrial fibrillation',
    year: 2020,
    topics: ['atrial fibrillation', 'fibrilação atrial', 'arrhythmia', 'arritmia'],
  },
  {
    organization: 'Sociedade Brasileira de Cardiologia',
    url: 'https://www.portal.cardiol.br/',
    title: 'Diretrizes Brasileiras de Fibrilação Atrial',
    year: 2023,
    topics: ['atrial fibrillation', 'fibrilação atrial'],
  },

  // Heart Failure
  {
    organization: 'American College of Cardiology',
    url: 'https://www.acc.org/guidelines',
    title: '2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure',
    year: 2022,
    topics: ['heart failure', 'insuficiência cardíaca', 'cardiac'],
  },
  {
    organization: 'Sociedade Brasileira de Cardiologia',
    url: 'https://www.portal.cardiol.br/',
    title: 'Diretriz Brasileira de Insuficiência Cardíaca Crônica e Aguda',
    year: 2021,
    topics: ['heart failure', 'insuficiência cardíaca'],
  },

  // Pneumonia
  {
    organization: 'Infectious Diseases Society of America',
    url: 'https://www.idsociety.org/practice-guideline/community-acquired-pneumonia/',
    title: 'Diagnosis and Treatment of Adults with Community-acquired Pneumonia',
    year: 2019,
    topics: ['pneumonia', 'community-acquired pneumonia', 'cap', 'respiratory infection'],
  },
  {
    organization: 'Sociedade Brasileira de Pneumologia e Tisiologia',
    url: 'https://sbpt.org.br/',
    title: 'Diretrizes Brasileiras para Pneumonia Adquirida na Comunidade em Adultos Imunocompetentes',
    year: 2018,
    topics: ['pneumonia', 'pneumonia comunitária', 'infecção respiratória'],
  },

  // Urinary Tract Infection
  {
    organization: 'Infectious Diseases Society of America',
    url: 'https://www.idsociety.org/practice-guideline/urinary-tract-infection/',
    title: 'International Clinical Practice Guidelines for the Treatment of Acute Uncomplicated Cystitis and Pyelonephritis',
    year: 2022,
    topics: ['urinary tract infection', 'uti', 'cystitis', 'pyelonephritis', 'infecção urinária'],
  },
  {
    organization: 'Sociedade Brasileira de Urologia',
    url: 'https://portaldaurologia.org.br/',
    title: 'Diretrizes de Infecção do Trato Urinário',
    year: 2021,
    topics: ['urinary tract infection', 'infecção urinária', 'cistite'],
  },

  // Skin and Soft Tissue Infections
  {
    organization: 'Infectious Diseases Society of America',
    url: 'https://www.idsociety.org/practice-guideline/skin-and-soft-tissue-infections/',
    title: 'Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections',
    year: 2014,
    topics: ['skin infection', 'cellulitis', 'abscess', 'soft tissue infection', 'infecção de pele'],
  },
  {
    organization: 'Sociedade Brasileira de Dermatologia',
    url: 'https://www.sbd.org.br/',
    title: 'Consenso Brasileiro de Infecções de Pele e Partes Moles',
    year: 2020,
    topics: ['skin infection', 'infecção de pele', 'celulite', 'abscesso'],
  },

  // Low Back Pain
  {
    organization: 'American College of Physicians',
    url: 'https://www.acponline.org/clinical-information/guidelines',
    title: 'Noninvasive Treatments for Acute, Subacute, and Chronic Low Back Pain',
    year: 2017,
    topics: ['low back pain', 'back pain', 'dor lombar', 'lombalgia'],
  },
  {
    organization: 'Sociedade Brasileira de Reumatologia',
    url: 'https://www.reumatologia.org.br/',
    title: 'Recomendações da Sociedade Brasileira de Reumatologia para Diagnóstico e Tratamento da Lombalgia',
    year: 2019,
    topics: ['low back pain', 'lombalgia', 'dor lombar'],
  },

  // Osteoarthritis
  {
    organization: 'American College of Rheumatology',
    url: 'https://www.rheumatology.org/Practice-Quality/Clinical-Support/Clinical-Practice-Guidelines',
    title: 'ACR/Arthritis Foundation Guideline for the Management of Osteoarthritis of the Hand, Hip, and Knee',
    year: 2020,
    topics: ['osteoarthritis', 'arthritis', 'artrose', 'joint pain'],
  },
  {
    organization: 'Sociedade Brasileira de Reumatologia',
    url: 'https://www.reumatologia.org.br/',
    title: 'Consenso Brasileiro para o Diagnóstico e Tratamento da Osteoartrite',
    year: 2021,
    topics: ['osteoarthritis', 'artrose', 'osteoartrite'],
  },
];

export class MedicalSocietiesFetcher implements Fetcher {
  name = 'Medical Societies';
  source = 'medical_society' as const;
  priority = 9; // High priority - authoritative clinical guidelines

  /**
   * Check if fetcher is available
   */
  async isAvailable(): Promise<boolean> {
    // Always available (uses curated list)
    return true;
  }

  /**
   * Fetch guidelines from medical societies
   */
  async fetch(query: FetchQuery): Promise<FetchResult> {
    const startTime = Date.now();

    // Match guidelines based on topic
    const matchedGuidelines = this.matchGuidelines(query.topic);

    console.log(`✅ Medical Societies: Found ${matchedGuidelines.length} guidelines in ${Date.now() - startTime}ms`);

    const guidelines: Guideline[] = matchedGuidelines.map(source => ({
      id: this.generateId(source),
      title: source.title,
      organization: source.organization,
      publicationDate: new Date(source.year, 0, 1),
      version: source.year.toString(),
      url: source.url,
      summary: `Clinical practice guideline from ${source.organization} (${source.year})`,
      recommendations: this.generateRecommendations(source),
      evidenceLevel: 'Ia' as GradeLevel, // Most society guidelines are based on systematic reviews
    }));

    return {
      source: this.name,
      sourceType: this.source,
      data: { guidelines },
      metadata: {
        fetchedAt: new Date(),
        resultCount: guidelines.length,
      },
    };
  }

  /**
   * Match guidelines based on search topic
   */
  private matchGuidelines(searchTopic: string): GuidelineSource[] {
    const normalizedTopic = searchTopic.toLowerCase();
    
    return KNOWN_GUIDELINES.filter(guideline => 
      guideline.topics.some(topic => 
        normalizedTopic.includes(topic.toLowerCase()) ||
        topic.toLowerCase().includes(normalizedTopic)
      )
    );
  }

  /**
   * Generate guideline ID
   */
  private generateId(source: GuidelineSource): string {
    const orgSlug = source.organization.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `${orgSlug}-${source.year}`;
  }

  /**
   * Generate placeholder recommendations
   * In production: Parse actual guideline content
   */
  private generateRecommendations(source: GuidelineSource): Recommendation[] {
    // Placeholder recommendations
    // In production: Parse actual guideline PDFs or web pages
    return [
      {
        text: `Refer to ${source.title} for detailed clinical recommendations`,
        strength: 'strong',
        evidenceLevel: 'Ia' as GradeLevel,
        citation: source.url,
      },
    ];
  }

  /**
   * Get guidelines from mapping for a specific condition
   * This uses the comprehensive guideline mapping for 100+ conditions
   */
  static getGuidelinesFromMapping(conditionId: string): GuidelineSource[] {
    const mapping = guidelineMapping.find(m => m.conditionId === conditionId);
    if (!mapping) return [];

    return mapping.medicalSocieties.map(g => ({
      organization: g.organization,
      url: g.url || `https://guidelines.example.com/${conditionId}`,
      title: g.guideline,
      year: g.year,
      topics: [conditionId, mapping.conditionName.toLowerCase()],
    }));
  }

  /**
   * Get all available condition IDs from mapping
   */
  static getAvailableConditions(): string[] {
    return guidelineMapping.map(m => m.conditionId);
  }

  /**
   * Get coverage statistics
   */
  static getCoverageStats(): { total: number; withGuidelines: number; percentage: number } {
    const total = guidelineMapping.length;
    const withGuidelines = guidelineMapping.filter(m => m.medicalSocieties.length > 0).length;
    return {
      total,
      withGuidelines,
      percentage: Math.round((withGuidelines / total) * 100),
    };
  }
}

