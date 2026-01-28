/**
 * Integração com farmacogenética PharmGKB para o contexto Darwin-MFC.
 * Define interfaces e funções auxiliares para análise de interações gene-medicamento.
 *
 * Generated via Grok 4 Fast, refined by Claude
 */

// =============================================================================
// INTERFACES
// =============================================================================

/**
 * Interface para interação gene-medicamento no PharmGKB.
 * Representa dados de interação entre um gene e um medicamento.
 */
export interface GeneDrugInteraction {
  /** Símbolo do gene (e.g., 'CYP2D6', 'CYP2C19') */
  gene: string;
  /** ID do medicamento */
  medication: string;
  /** Nome do medicamento */
  medicationName: string;
  /** Alelos relevantes (e.g., ['*1', '*2', '*4']) */
  alleles: string[];
  /** Fenótipo metabólico */
  phenotype: 'poor' | 'intermediate' | 'normal' | 'rapid' | 'ultrarapid';
  /** Recomendação de dosagem */
  recommendation: string;
  /** Nível de evidência */
  evidenceLevel: 'strong' | 'moderate' | 'weak';
  /** Fonte da recomendação */
  source: 'CPIC' | 'DPWG' | 'FDA';
}

/**
 * Interface para informações de gene no PharmGKB.
 * Contém detalhes sobre o gene relevante para farmacogenética.
 */
export interface GeneInfo {
  /** Símbolo do gene */
  id: string;
  /** Nome completo do gene */
  name: string;
  /** Localização cromossômica */
  chromosome: string;
  /** Função biológica */
  function: string;
  /** Alelos clinicamente relevantes */
  clinicallyRelevantAlleles: string[];
}

/**
 * Interface para alerta do PharmGKB.
 * Representa um alerta de interação farmacogenética.
 */
export interface PharmGKBAlert {
  /** ID único do alerta */
  id: string;
  /** Gene envolvido */
  gene: string;
  /** ID do medicamento */
  medication: string;
  /** Nível de severidade */
  severity: 'info' | 'warning' | 'critical';
  /** Título do alerta */
  title: string;
  /** Mensagem descritiva */
  message: string;
  /** Se ação é necessária */
  actionRequired: boolean;
  /** Recomendação clínica */
  recommendation: string;
}

/**
 * Interface para genótipo do paciente.
 * Descreve o genótipo diploide para um gene específico.
 */
export interface PatientGenotype {
  /** Símbolo do gene */
  gene: string;
  /** Primeiro alelo */
  allele1: string;
  /** Segundo alelo */
  allele2: string;
  /** Diplótipo combinado (e.g., '*1/*4') */
  diplotype: string;
  /** Fenótipo inferido */
  phenotype: string;
}

// =============================================================================
// DADOS: Genes Farmacogenéticos Principais
// =============================================================================

/**
 * Genes farmacogenéticos principais para APS/MFC.
 * Inclui os 5 genes mais relevantes para decisões clínicas.
 */
export const PHARMACOGENES: GeneInfo[] = [
  {
    id: 'CYP2D6',
    name: 'Cytochrome P450 Family 2 Subfamily D Member 6',
    chromosome: '22q13.2',
    function: 'Metabolismo de codeína, tramadol, antidepressivos tricíclicos, e antipsicóticos',
    clinicallyRelevantAlleles: ['*1', '*2', '*3', '*4', '*5', '*6', '*10', '*17', '*29', '*41']
  },
  {
    id: 'CYP2C19',
    name: 'Cytochrome P450 Family 2 Subfamily C Member 19',
    chromosome: '10q23.33',
    function: 'Metabolismo de clopidogrel, omeprazol, voriconazol, e antidepressivos',
    clinicallyRelevantAlleles: ['*1', '*2', '*3', '*4', '*5', '*6', '*7', '*8', '*17']
  },
  {
    id: 'CYP2C9',
    name: 'Cytochrome P450 Family 2 Subfamily C Member 9',
    chromosome: '10q23.33',
    function: 'Metabolismo de warfarina, fenitoína, e AINEs',
    clinicallyRelevantAlleles: ['*1', '*2', '*3', '*4', '*5', '*6', '*8', '*11', '*12', '*13']
  },
  {
    id: 'TPMT',
    name: 'Thiopurine S-Methyltransferase',
    chromosome: '6p22.3',
    function: 'Metabolismo de azatioprina, mercaptopurina, e tioguanina',
    clinicallyRelevantAlleles: ['*1', '*2', '*3A', '*3B', '*3C', '*4']
  },
  {
    id: 'DPYD',
    name: 'Dihydropyrimidine Dehydrogenase',
    chromosome: '1p21.3',
    function: 'Metabolismo de 5-fluorouracil e capecitabina',
    clinicallyRelevantAlleles: ['*1', '*2A', '*4', '*5', '*6', '*7', '*9A', '*13']
  }
];

/**
 * Descrições clínicas de fenótipos metabólicos.
 * Mapeia fenótipos para descrições no contexto farmacogenético.
 */
export const PHENOTYPE_DESCRIPTIONS: Record<string, string> = {
  poor: 'Metabolizador pobre: atividade enzimática muito reduzida, risco aumentado de toxicidade ou falha terapêutica.',
  intermediate: 'Metabolizador intermediário: atividade enzimática reduzida, ajuste de dose pode ser necessário.',
  normal: 'Metabolizador normal: atividade enzimática padrão, dosagem usual recomendada.',
  rapid: 'Metabolizador rápido: atividade enzimática aumentada, pode requerer dose maior ou monitoramento.',
  ultrarapid: 'Metabolizador ultrarrápido: atividade enzimática muito aumentada, risco de subdosagem ou efeitos adversos inesperados.'
};

/**
 * Cores para visualização de fenótipos na UI.
 */
export const PHENOTYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  poor: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-800 dark:text-red-200', border: 'border-red-500' },
  intermediate: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-200', border: 'border-yellow-500' },
  normal: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-200', border: 'border-green-500' },
  rapid: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-800 dark:text-orange-200', border: 'border-orange-500' },
  ultrarapid: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-800 dark:text-purple-200', border: 'border-purple-500' }
};

// =============================================================================
// DADOS: Interações Gene-Medicamento (Exemplos CPIC)
// =============================================================================

/**
 * Interações gene-medicamento baseadas em guidelines CPIC.
 * Dados de exemplo - em produção, carregar de API ou banco de dados.
 */
export const DRUG_INTERACTIONS: GeneDrugInteraction[] = [
  // CYP2D6 - Codeína
  {
    gene: 'CYP2D6',
    medication: 'codeina',
    medicationName: 'Codeína',
    alleles: ['*1/*1', '*1/*2', '*2/*2'],
    phenotype: 'normal',
    recommendation: 'Dosagem padrão. Monitorar resposta analgésica.',
    evidenceLevel: 'strong',
    source: 'CPIC'
  },
  {
    gene: 'CYP2D6',
    medication: 'codeina',
    medicationName: 'Codeína',
    alleles: ['*4/*4', '*4/*5', '*5/*5'],
    phenotype: 'poor',
    recommendation: 'EVITAR codeína. Usar analgésico alternativo (ex: morfina, oxicodona). Risco de falha terapêutica.',
    evidenceLevel: 'strong',
    source: 'CPIC'
  },
  {
    gene: 'CYP2D6',
    medication: 'codeina',
    medicationName: 'Codeína',
    alleles: ['*1/*1xN', '*2/*2xN'],
    phenotype: 'ultrarapid',
    recommendation: 'EVITAR codeína. Risco de toxicidade por morfina (depressão respiratória). Usar analgésico alternativo.',
    evidenceLevel: 'strong',
    source: 'CPIC'
  },
  // CYP2D6 - Tramadol
  {
    gene: 'CYP2D6',
    medication: 'tramadol',
    medicationName: 'Tramadol',
    alleles: ['*4/*4', '*4/*5', '*5/*5'],
    phenotype: 'poor',
    recommendation: 'EVITAR tramadol. Usar analgésico alternativo não metabolizado por CYP2D6.',
    evidenceLevel: 'strong',
    source: 'CPIC'
  },
  // CYP2C19 - Clopidogrel
  {
    gene: 'CYP2C19',
    medication: 'clopidogrel',
    medicationName: 'Clopidogrel',
    alleles: ['*1/*1'],
    phenotype: 'normal',
    recommendation: 'Dosagem padrão (75mg/dia). Resposta esperada.',
    evidenceLevel: 'strong',
    source: 'CPIC'
  },
  {
    gene: 'CYP2C19',
    medication: 'clopidogrel',
    medicationName: 'Clopidogrel',
    alleles: ['*2/*2', '*2/*3', '*3/*3'],
    phenotype: 'poor',
    recommendation: 'EVITAR clopidogrel. Usar prasugrel ou ticagrelor como alternativa. Risco de eventos cardiovasculares.',
    evidenceLevel: 'strong',
    source: 'CPIC'
  },
  {
    gene: 'CYP2C19',
    medication: 'clopidogrel',
    medicationName: 'Clopidogrel',
    alleles: ['*1/*2', '*1/*3'],
    phenotype: 'intermediate',
    recommendation: 'Considerar prasugrel ou ticagrelor, especialmente em síndrome coronária aguda.',
    evidenceLevel: 'strong',
    source: 'CPIC'
  },
  // CYP2C19 - Omeprazol
  {
    gene: 'CYP2C19',
    medication: 'omeprazol',
    medicationName: 'Omeprazol',
    alleles: ['*1/*1'],
    phenotype: 'normal',
    recommendation: 'Dosagem padrão (20-40mg/dia).',
    evidenceLevel: 'moderate',
    source: 'DPWG'
  },
  {
    gene: 'CYP2C19',
    medication: 'omeprazol',
    medicationName: 'Omeprazol',
    alleles: ['*17/*17'],
    phenotype: 'ultrarapid',
    recommendation: 'Considerar aumento de dose ou troca para rabeprazol/esomeprazol. Monitorar resposta.',
    evidenceLevel: 'moderate',
    source: 'DPWG'
  },
  // CYP2C9 - Warfarina
  {
    gene: 'CYP2C9',
    medication: 'varfarina',
    medicationName: 'Varfarina',
    alleles: ['*1/*1'],
    phenotype: 'normal',
    recommendation: 'Dose inicial padrão. Ajustar conforme INR.',
    evidenceLevel: 'strong',
    source: 'CPIC'
  },
  {
    gene: 'CYP2C9',
    medication: 'varfarina',
    medicationName: 'Varfarina',
    alleles: ['*2/*2', '*2/*3', '*3/*3'],
    phenotype: 'poor',
    recommendation: 'REDUZIR dose inicial em 50-80%. Alto risco de sangramento. Monitorar INR frequentemente.',
    evidenceLevel: 'strong',
    source: 'CPIC'
  },
  // TPMT - Azatioprina
  {
    gene: 'TPMT',
    medication: 'azatioprina',
    medicationName: 'Azatioprina',
    alleles: ['*1/*1'],
    phenotype: 'normal',
    recommendation: 'Dosagem padrão. Monitorar hemograma.',
    evidenceLevel: 'strong',
    source: 'CPIC'
  },
  {
    gene: 'TPMT',
    medication: 'azatioprina',
    medicationName: 'Azatioprina',
    alleles: ['*3A/*3A', '*3C/*3C', '*2/*3A'],
    phenotype: 'poor',
    recommendation: 'REDUZIR dose para 10% do padrão ou EVITAR. Risco grave de mielossupressão.',
    evidenceLevel: 'strong',
    source: 'CPIC'
  },
  // DPYD - 5-Fluorouracil
  {
    gene: 'DPYD',
    medication: 'fluorouracil',
    medicationName: '5-Fluorouracil',
    alleles: ['*1/*1'],
    phenotype: 'normal',
    recommendation: 'Dosagem padrão conforme protocolo oncológico.',
    evidenceLevel: 'strong',
    source: 'CPIC'
  },
  {
    gene: 'DPYD',
    medication: 'fluorouracil',
    medicationName: '5-Fluorouracil',
    alleles: ['*2A/*2A'],
    phenotype: 'poor',
    recommendation: 'CONTRAINDICADO. Risco de toxicidade grave/fatal. Usar alternativa terapêutica.',
    evidenceLevel: 'strong',
    source: 'CPIC'
  }
];

// =============================================================================
// FUNÇÕES AUXILIARES
// =============================================================================

/**
 * Mapa de diplótipos para fenótipos por gene.
 * Simplificado - em produção usar dados CPIC completos.
 */
const DIPLOTYPE_PHENOTYPE_MAP: Record<string, Record<string, string>> = {
  CYP2D6: {
    '*1/*1': 'normal',
    '*1/*2': 'normal',
    '*2/*2': 'normal',
    '*1/*4': 'intermediate',
    '*1/*10': 'intermediate',
    '*4/*4': 'poor',
    '*4/*5': 'poor',
    '*5/*5': 'poor',
    '*1/*1xN': 'ultrarapid',
    '*2/*2xN': 'ultrarapid'
  },
  CYP2C19: {
    '*1/*1': 'normal',
    '*1/*17': 'rapid',
    '*17/*17': 'ultrarapid',
    '*1/*2': 'intermediate',
    '*1/*3': 'intermediate',
    '*2/*2': 'poor',
    '*2/*3': 'poor',
    '*3/*3': 'poor'
  },
  CYP2C9: {
    '*1/*1': 'normal',
    '*1/*2': 'intermediate',
    '*1/*3': 'intermediate',
    '*2/*2': 'poor',
    '*2/*3': 'poor',
    '*3/*3': 'poor'
  },
  TPMT: {
    '*1/*1': 'normal',
    '*1/*3A': 'intermediate',
    '*1/*3C': 'intermediate',
    '*3A/*3A': 'poor',
    '*3C/*3C': 'poor'
  },
  DPYD: {
    '*1/*1': 'normal',
    '*1/*2A': 'intermediate',
    '*2A/*2A': 'poor'
  }
};

/**
 * Obtém o fenótipo a partir do diplótipo para um gene específico.
 * @param gene - Símbolo do gene (e.g., 'CYP2D6')
 * @param diplotype - Diplótipo do paciente (e.g., '*1/*4')
 * @returns Fenótipo inferido
 */
export function getPhenotypeFromDiplotype(gene: string, diplotype: string): string {
  const geneUpper = gene.toUpperCase();
  const geneMap = DIPLOTYPE_PHENOTYPE_MAP[geneUpper];

  if (!geneMap) {
    return 'unknown';
  }

  // Tentar match direto
  if (geneMap[diplotype]) {
    return geneMap[diplotype];
  }

  // Tentar match reverso (ex: '*4/*1' → '*1/*4')
  const [allele1, allele2] = diplotype.split('/');
  const reversedDiplotype = `${allele2}/${allele1}`;
  if (geneMap[reversedDiplotype]) {
    return geneMap[reversedDiplotype];
  }

  // Fallback para intermediate se um alelo é funcional
  const functionalAlleles = ['*1', '*2'];
  if (functionalAlleles.includes(allele1) || functionalAlleles.includes(allele2)) {
    return 'intermediate';
  }

  return 'unknown';
}

/**
 * Obtém interações de fármacos para um gene específico.
 * @param gene - Símbolo do gene
 * @returns Array de interações GeneDrugInteraction
 */
export function getDrugInteractionsForGene(gene: string): GeneDrugInteraction[] {
  const geneUpper = gene.toUpperCase();
  return DRUG_INTERACTIONS.filter(interaction =>
    interaction.gene.toUpperCase() === geneUpper
  );
}

/**
 * Obtém interações de fármacos para um medicamento específico.
 * @param medicationId - ID do medicamento
 * @returns Array de interações GeneDrugInteraction
 */
export function getDrugInteractionsForMedication(medicationId: string): GeneDrugInteraction[] {
  return DRUG_INTERACTIONS.filter(interaction =>
    interaction.medication === medicationId
  );
}

/**
 * Obtém alerta para o genótipo do paciente e medicamento.
 * @param genotype - Genótipo do paciente
 * @param medicationId - ID do medicamento
 * @returns Alerta PharmGKBAlert ou null se não aplicável
 */
export function getAlertForPatient(genotype: PatientGenotype, medicationId: string): PharmGKBAlert | null {
  const interactions = getDrugInteractionsForGene(genotype.gene);
  const phenotype = getPhenotypeFromDiplotype(genotype.gene, genotype.diplotype);

  const relevantInteraction = interactions.find(int =>
    int.medication === medicationId && int.phenotype === phenotype
  );

  if (!relevantInteraction) {
    return null;
  }

  // Mapear fenótipo para severidade
  const severityMap: Record<string, 'info' | 'warning' | 'critical'> = {
    poor: 'critical',
    intermediate: 'warning',
    normal: 'info',
    rapid: 'warning',
    ultrarapid: 'critical',
    unknown: 'info'
  };

  return {
    id: `pgx-${genotype.gene}-${medicationId}-${Date.now()}`,
    gene: genotype.gene,
    medication: medicationId,
    severity: severityMap[phenotype] || 'info',
    title: `Alerta Farmacogenético: ${genotype.gene} + ${relevantInteraction.medicationName}`,
    message: `Fenótipo ${phenotype}: ${PHENOTYPE_DESCRIPTIONS[phenotype] || 'Fenótipo não caracterizado'}`,
    actionRequired: phenotype === 'poor' || phenotype === 'ultrarapid',
    recommendation: relevantInteraction.recommendation
  };
}

/**
 * Obtém todos os alertas para um paciente com múltiplos genótipos.
 * @param genotypes - Array de genótipos do paciente
 * @param medicationIds - Array de IDs de medicamentos
 * @returns Array de alertas PharmGKBAlert
 */
export function getAlertsForPatientMedications(
  genotypes: PatientGenotype[],
  medicationIds: string[]
): PharmGKBAlert[] {
  const alerts: PharmGKBAlert[] = [];

  for (const genotype of genotypes) {
    for (const medicationId of medicationIds) {
      const alert = getAlertForPatient(genotype, medicationId);
      if (alert) {
        alerts.push(alert);
      }
    }
  }

  // Ordenar por severidade (critical > warning > info)
  const severityOrder = { critical: 0, warning: 1, info: 2 };
  return alerts.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
}

/**
 * Obtém informações sobre um gene específico.
 * @param geneId - Símbolo do gene (e.g., 'CYP2D6')
 * @returns GeneInfo ou undefined
 */
export function getGeneInfo(geneId: string): GeneInfo | undefined {
  return PHARMACOGENES.find(g => g.id.toUpperCase() === geneId.toUpperCase());
}

/**
 * Verifica se um medicamento tem interações farmacogenéticas documentadas.
 * @param medicationId - ID do medicamento
 * @returns boolean
 */
export function hasPharmacogenomicData(medicationId: string): boolean {
  return DRUG_INTERACTIONS.some(int => int.medication === medicationId);
}
