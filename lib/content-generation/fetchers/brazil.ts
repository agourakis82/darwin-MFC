/**
 * BRAZIL HEALTH AUTHORITIES FETCHER
 * ==================================
 * 
 * Fetches guidelines and protocols from Brazilian health authorities:
 * - Ministério da Saúde (MS)
 * - ANVISA (Agência Nacional de Vigilância Sanitária)
 * - CONITEC (Comissão Nacional de Incorporação de Tecnologias)
 * 
 * Data Sources:
 * - PCDT (Protocolos Clínicos e Diretrizes Terapêuticas)
 * - SUS Protocols
 * - ANVISA Bulário
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

interface BrazilGuideline {
  organization: 'MS' | 'ANVISA' | 'CONITEC';
  title: string;
  url: string;
  year: number;
  topics: string[];
  type: 'PCDT' | 'Protocol' | 'Guideline';
}

// Known Brazilian health authority guidelines
const BRAZIL_GUIDELINES: BrazilGuideline[] = [
  // Diabetes
  {
    organization: 'MS',
    title: 'PCDT - Diabetes Mellitus Tipo 2',
    url: 'https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2022/pcdt_diabetes_mellitus_tipo_2.pdf',
    year: 2022,
    topics: ['diabetes', 'diabetes mellitus', 'tipo 2'],
    type: 'PCDT',
  },
  {
    organization: 'MS',
    title: 'PCDT - Diabetes Mellitus Tipo 1',
    url: 'https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2022/pcdt_diabetes_mellitus_tipo_1.pdf',
    year: 2022,
    topics: ['diabetes', 'diabetes mellitus', 'tipo 1'],
    type: 'PCDT',
  },
  
  // Hypertension
  {
    organization: 'MS',
    title: 'Protocolo Clínico - Hipertensão Arterial Sistêmica',
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/h/hipertensao',
    year: 2021,
    topics: ['hipertensão', 'hypertension', 'pressão alta'],
    type: 'Protocol',
  },
  
  // Primary Care
  {
    organization: 'MS',
    title: 'Cadernos de Atenção Básica - Estratégias para o Cuidado da Pessoa com Doença Crônica',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/estrategias_cuidado_pessoa_doenca_cronica_cab35.pdf',
    year: 2014,
    topics: ['atenção primária', 'primary care', 'doença crônica', 'chronic disease'],
    type: 'Guideline',
  },
  
  // Mental Health
  {
    organization: 'MS',
    title: 'Cadernos de Atenção Básica - Saúde Mental',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/cadernos_atencao_basica_34_saude_mental.pdf',
    year: 2013,
    topics: ['saúde mental', 'mental health', 'psiquiatria', 'depression', 'depressão', 'anxiety', 'ansiedade'],
    type: 'Guideline',
  },

  // Dyslipidemia
  {
    organization: 'MS',
    title: 'Protocolo Clínico - Dislipidemia: prevenção de eventos cardiovasculares e pancreatite',
    url: 'https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt',
    year: 2019,
    topics: ['dyslipidemia', 'dislipidemia', 'cholesterol', 'colesterol', 'lipids'],
    type: 'Protocol',
  },
  {
    organization: 'MS',
    title: 'Cadernos de Atenção Básica - Prevenção Clínica de Doenças Cardiovasculares',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/prevencao_clinica_doencas_cardiovasculares_cerebrovasculares_renais.pdf',
    year: 2006,
    topics: ['dyslipidemia', 'cardiovascular', 'prevenção'],
    type: 'Guideline',
  },

  // Obesity
  {
    organization: 'MS',
    title: 'Estratégias para o Cuidado da Pessoa com Doença Crônica - Obesidade',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/estrategias_cuidado_doenca_cronica_obesidade_cab38.pdf',
    year: 2014,
    topics: ['obesity', 'obesidade', 'overweight', 'sobrepeso'],
    type: 'Guideline',
  },
  {
    organization: 'CONITEC',
    title: 'Protocolo de Uso - Liraglutida para Obesidade',
    url: 'https://www.gov.br/conitec/pt-br',
    year: 2023,
    topics: ['obesity', 'obesidade', 'weight management'],
    type: 'Protocol',
  },

  // Asthma
  {
    organization: 'MS',
    title: 'Protocolo Clínico - Asma',
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/asma',
    year: 2021,
    topics: ['asthma', 'asma', 'respiratory'],
    type: 'Protocol',
  },
  {
    organization: 'MS',
    title: 'Cadernos de Atenção Básica - Doenças Respiratórias Crônicas',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/doencas_respiratorias_cronicas.pdf',
    year: 2010,
    topics: ['asthma', 'asma', 'copd', 'dpoc', 'respiratory'],
    type: 'Guideline',
  },

  // COPD
  {
    organization: 'MS',
    title: 'Protocolo Clínico - Doença Pulmonar Obstrutiva Crônica (DPOC)',
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dpoc',
    year: 2021,
    topics: ['copd', 'dpoc', 'chronic obstructive pulmonary disease'],
    type: 'Protocol',
  },

  // Depression
  {
    organization: 'MS',
    title: 'Protocolo Clínico - Depressão',
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/depressao',
    year: 2022,
    topics: ['depression', 'depressão', 'mental health', 'saúde mental'],
    type: 'Protocol',
  },
  {
    organization: 'MS',
    title: 'Linha de Cuidado para a Atenção às Pessoas com Transtornos do Espectro do Autismo e suas Famílias na Rede de Atenção Psicossocial do SUS',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/linha_cuidado_atencao_pessoas_transtorno.pdf',
    year: 2015,
    topics: ['mental health', 'saúde mental', 'depression', 'anxiety'],
    type: 'Guideline',
  },

  // Anxiety
  {
    organization: 'MS',
    title: 'Protocolo Clínico - Transtornos de Ansiedade',
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-mental',
    year: 2022,
    topics: ['anxiety', 'ansiedade', 'mental health', 'panic disorder'],
    type: 'Protocol',
  },

  // Osteoporosis
  {
    organization: 'MS',
    title: 'PCDT - Osteoporose',
    url: 'https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2014/pcdt_osteoporose.pdf',
    year: 2014,
    topics: ['osteoporosis', 'osteoporose', 'bone health', 'fracture'],
    type: 'PCDT',
  },
  {
    organization: 'CONITEC',
    title: 'Protocolo de Uso - Denosumabe para Osteoporose',
    url: 'https://www.gov.br/conitec/pt-br',
    year: 2022,
    topics: ['osteoporosis', 'osteoporose'],
    type: 'Protocol',
  },

  // Hypothyroidism
  {
    organization: 'MS',
    title: 'PCDT - Hipotireoidismo Congênito',
    url: 'https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt/arquivos/2018/pcdt_hipotireoidismo_congenito.pdf',
    year: 2018,
    topics: ['hypothyroidism', 'hipotireoidismo', 'thyroid', 'tireoide'],
    type: 'PCDT',
  },
  {
    organization: 'MS',
    title: 'Protocolo Clínico - Doenças da Tireoide',
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/t/tireoide',
    year: 2020,
    topics: ['hypothyroidism', 'hipotireoidismo', 'thyroid', 'hyperthyroidism'],
    type: 'Protocol',
  },

  // Chronic Kidney Disease
  {
    organization: 'MS',
    title: 'Diretrizes Clínicas para o Cuidado ao paciente com Doença Renal Crônica – DRC no Sistema Único de Saúde',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/diretrizes_clinicas_cuidado_paciente_renal.pdf',
    year: 2014,
    topics: ['chronic kidney disease', 'ckd', 'doença renal crônica', 'renal'],
    type: 'Guideline',
  },
  {
    organization: 'MS',
    title: 'Protocolo Clínico - Doença Renal Crônica',
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/doenca-renal-cronica',
    year: 2021,
    topics: ['chronic kidney disease', 'doença renal crônica', 'renal'],
    type: 'Protocol',
  },

  // Atrial Fibrillation
  {
    organization: 'MS',
    title: 'PCDT - Anticoagulação no Paciente com Fibrilação Atrial',
    url: 'https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt',
    year: 2021,
    topics: ['atrial fibrillation', 'fibrilação atrial', 'arrhythmia', 'anticoagulation'],
    type: 'PCDT',
  },
  {
    organization: 'MS',
    title: 'Cadernos de Atenção Básica - Estratégias para o Cuidado da Pessoa com Doença Crônica - Hipertensão Arterial Sistêmica',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/estrategias_cuidado_pessoa_hipertensao_cab37.pdf',
    year: 2013,
    topics: ['atrial fibrillation', 'cardiovascular', 'hypertension'],
    type: 'Guideline',
  },

  // Heart Failure
  {
    organization: 'MS',
    title: 'PCDT - Insuficiência Cardíaca',
    url: 'https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt',
    year: 2022,
    topics: ['heart failure', 'insuficiência cardíaca', 'cardiac'],
    type: 'PCDT',
  },
  {
    organization: 'MS',
    title: 'Linha de Cuidado do Infarto Agudo do Miocárdio na Rede de Atenção às Urgências',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/linha_cuidado_infarto_agudo_miocardio.pdf',
    year: 2011,
    topics: ['heart failure', 'cardiac', 'cardiovascular', 'myocardial infarction'],
    type: 'Guideline',
  },

  // Infectious Diseases (keeping existing)
  {
    organization: 'MS',
    title: 'Protocolo Clínico - Tuberculose',
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/t/tuberculose',
    year: 2022,
    topics: ['tuberculose', 'tuberculosis', 'infecção'],
    type: 'Protocol',
  },
  {
    organization: 'MS',
    title: 'Protocolo Clínico - HIV/AIDS',
    url: 'https://www.gov.br/aids/pt-br',
    year: 2023,
    topics: ['hiv', 'aids', 'infecção'],
    type: 'Protocol',
  },

  // Pneumonia
  {
    organization: 'MS',
    title: 'Cadernos de Atenção Básica - Doenças Respiratórias Crônicas',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/doencas_respiratorias_cronicas.pdf',
    year: 2010,
    topics: ['pneumonia', 'respiratory infection', 'infecção respiratória'],
    type: 'Guideline',
  },
  {
    organization: 'MS',
    title: 'Protocolo de Manejo Clínico de Influenza',
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/i/influenza',
    year: 2022,
    topics: ['pneumonia', 'influenza', 'respiratory infection'],
    type: 'Protocol',
  },

  // Urinary Tract Infection
  {
    organization: 'MS',
    title: 'Cadernos de Atenção Básica - Atenção ao Pré-natal de Baixo Risco',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/cadernos_atencao_basica_32_prenatal.pdf',
    year: 2012,
    topics: ['urinary tract infection', 'infecção urinária', 'uti', 'prenatal'],
    type: 'Guideline',
  },
  {
    organization: 'MS',
    title: 'Protocolo Clínico - Infecções do Trato Urinário',
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/i/infeccao-urinaria',
    year: 2021,
    topics: ['urinary tract infection', 'infecção urinária', 'cistite'],
    type: 'Protocol',
  },

  // Skin and Soft Tissue Infections
  {
    organization: 'MS',
    title: 'Cadernos de Atenção Básica - Vigilância em Saúde',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/cab_n21_vigilancia_saude_zoonoses_endemias_transmissiveis.pdf',
    year: 2009,
    topics: ['skin infection', 'infecção de pele', 'cellulitis', 'celulite'],
    type: 'Guideline',
  },
  {
    organization: 'MS',
    title: 'Protocolo de Tratamento de Feridas na Atenção Primária',
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/f/feridas',
    year: 2020,
    topics: ['skin infection', 'wound care', 'infecção de pele'],
    type: 'Protocol',
  },

  // Low Back Pain
  {
    organization: 'MS',
    title: 'Cadernos de Atenção Básica - Dor Crônica',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/caderno_atencao_basica_dor_cronica.pdf',
    year: 2012,
    topics: ['low back pain', 'dor lombar', 'lombalgia', 'chronic pain'],
    type: 'Guideline',
  },
  {
    organization: 'MS',
    title: 'Protocolo de Atenção à Saúde do Trabalhador - Distúrbios Osteomusculares',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/protocolo_atencao_saude_trabalhador.pdf',
    year: 2018,
    topics: ['low back pain', 'lombalgia', 'musculoskeletal'],
    type: 'Protocol',
  },

  // Osteoarthritis
  {
    organization: 'MS',
    title: 'Cadernos de Atenção Básica - Envelhecimento e Saúde da Pessoa Idosa',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/abcad19.pdf',
    year: 2006,
    topics: ['osteoarthritis', 'artrose', 'elderly', 'idoso'],
    type: 'Guideline',
  },
  {
    organization: 'MS',
    title: 'Protocolo Clínico - Artrite Reumatoide',
    url: 'https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas-pcdt',
    year: 2019,
    topics: ['osteoarthritis', 'artrose', 'arthritis', 'artrite'],
    type: 'Protocol',
  },
];

export class BrazilFetcher implements Fetcher {
  name = 'Brazil Health Authorities';
  source = 'health_authority' as const;
  priority = 10; // Highest priority for Brazilian context

  /**
   * Check if fetcher is available
   */
  async isAvailable(): Promise<boolean> {
    // Always available (uses curated list)
    return true;
  }

  /**
   * Fetch Brazilian health authority guidelines
   */
  async fetch(query: FetchQuery): Promise<FetchResult> {
    const startTime = Date.now();

    // Match guidelines based on topic
    const matchedGuidelines = this.matchGuidelines(query.topic);

    console.log(`✅ Brazil: Found ${matchedGuidelines.length} guidelines in ${Date.now() - startTime}ms`);

    const guidelines: Guideline[] = matchedGuidelines.map(source => ({
      id: this.generateId(source),
      title: source.title,
      organization: this.getOrganizationName(source.organization),
      publicationDate: new Date(source.year, 0, 1),
      version: source.year.toString(),
      url: source.url,
      summary: `${source.type} from ${this.getOrganizationName(source.organization)} (${source.year})`,
      recommendations: this.generateRecommendations(source),
      evidenceLevel: this.getEvidenceLevel(source.type),
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
  private matchGuidelines(searchTopic: string): BrazilGuideline[] {
    const normalizedTopic = searchTopic.toLowerCase();
    
    return BRAZIL_GUIDELINES.filter(guideline => 
      guideline.topics.some(topic => 
        normalizedTopic.includes(topic.toLowerCase()) ||
        topic.toLowerCase().includes(normalizedTopic)
      )
    );
  }

  /**
   * Get full organization name
   */
  private getOrganizationName(org: 'MS' | 'ANVISA' | 'CONITEC'): string {
    const names = {
      MS: 'Ministério da Saúde (Brazil)',
      ANVISA: 'ANVISA - Agência Nacional de Vigilância Sanitária',
      CONITEC: 'CONITEC - Comissão Nacional de Incorporação de Tecnologias',
    };
    return names[org];
  }

  /**
   * Generate guideline ID
   */
  private generateId(source: BrazilGuideline): string {
    const titleSlug = source.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 50);
    return `brazil-${source.organization.toLowerCase()}-${titleSlug}-${source.year}`;
  }

  /**
   * Get evidence level based on guideline type
   */
  private getEvidenceLevel(type: string): GradeLevel {
    // PCDT are typically based on systematic reviews
    if (type === 'PCDT') return 'Ia';
    // Protocols are typically based on expert consensus
    return 'IIa';
  }

  /**
   * Generate placeholder recommendations
   */
  private generateRecommendations(source: BrazilGuideline): Recommendation[] {
    return [
      {
        text: `Refer to ${source.title} for SUS-specific clinical recommendations`,
        strength: 'strong',
        evidenceLevel: this.getEvidenceLevel(source.type),
        citation: source.url,
      },
    ];
  }

  /**
   * Get Brazil MS/CONITEC protocols from mapping for a specific condition
   */
  static getProtocolsFromMapping(conditionId: string): BrazilGuideline[] {
    const mapping = guidelineMapping.find(m => m.conditionId === conditionId);
    if (!mapping) return [];

    return mapping.brazilMS.map(p => ({
      organization: p.organization.includes('CONITEC') ? 'CONITEC' as const : 'MS' as const,
      title: p.protocol,
      url: p.url || `https://www.gov.br/saude/pt-br/assuntos/pcdt/${conditionId}`,
      year: p.year,
      topics: [conditionId, mapping.conditionName.toLowerCase()],
      type: p.protocol.includes('PCDT') ? 'PCDT' as const : 'Protocol' as const,
    }));
  }

  /**
   * Get coverage statistics for Brazil protocols
   */
  static getCoverageStats(): { total: number; withProtocols: number; percentage: number } {
    const total = guidelineMapping.length;
    const withProtocols = guidelineMapping.filter(m => m.brazilMS.length > 0).length;
    return {
      total,
      withProtocols,
      percentage: Math.round((withProtocols / total) * 100),
    };
  }
}

