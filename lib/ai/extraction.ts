/**
 * Clinical NLP Pipeline for Darwin-MFC
 * Extrai entidades médicas de notas SOAP
 *
 * Generated via Grok 4 Fast, refined by Claude
 */

// =============================================================================
// TYPES
// =============================================================================

/**
 * Tipos de entidades médicas extraídas.
 */
export enum EntityType {
  SYMPTOM = 'SYMPTOM',
  DIAGNOSIS = 'DIAGNOSIS',
  MEDICATION = 'MEDICATION',
  DOSAGE = 'DOSAGE',
  EXAM = 'EXAM',
  PROCEDURE = 'PROCEDURE',
  VITAL_SIGN = 'VITAL_SIGN'
}

/**
 * Seções do formato SOAP.
 */
export enum SOAPSection {
  SUBJECTIVE = 'SUBJECTIVE',
  OBJECTIVE = 'OBJECTIVE',
  ASSESSMENT = 'ASSESSMENT',
  PLAN = 'PLAN'
}

/**
 * Entidade médica extraída.
 */
export interface MedicalEntity {
  /** Texto da entidade */
  text: string;
  /** Tipo da entidade */
  type: EntityType;
  /** Índice inicial no texto original */
  startIndex: number;
  /** Índice final no texto original */
  endIndex: number;
  /** Nível de confiança (0 a 1) */
  confidence: number;
  /** Metadados adicionais */
  metadata?: Record<string, unknown>;
}

/**
 * SOAP extraído com entidades por seção.
 */
export interface ExtractedSOAP {
  sections: Map<SOAPSection, string>;
  entities: Map<SOAPSection, MedicalEntity[]>;
  rawText: string;
}

// =============================================================================
// PREPROCESSING
// =============================================================================

/**
 * Normaliza o texto: minúsculas, remove acentos, normaliza espaços.
 */
export function normalizeText(text: string): string {
  const accentMap: Record<string, string> = {
    'á': 'a', 'à': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a',
    'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
    'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
    'ó': 'o', 'ò': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
    'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u',
    'ç': 'c', 'ñ': 'n'
  };

  let normalized = text.toLowerCase();
  for (const [accent, plain] of Object.entries(accentMap)) {
    normalized = normalized.replace(new RegExp(accent, 'g'), plain);
  }
  return normalized.replace(/\s+/g, ' ').trim();
}

/**
 * Tokeniza o texto em tokens médicos.
 */
export function tokenize(text: string): string[] {
  const normalized = normalizeText(text);
  return normalized
    .split(/\s+/)
    .map(token => token.replace(/[^\w\-]/g, ''))
    .filter(token => token.length > 0);
}

/**
 * Detecta seções SOAP no texto.
 */
export function detectSOAPSections(text: string): Map<SOAPSection, string> {
  const sections = new Map<SOAPSection, string>();
  const lines = text.split('\n');
  let currentSection: SOAPSection | null = null;
  let buffer = '';

  const sectionPatterns: Record<SOAPSection, RegExp> = {
    [SOAPSection.SUBJECTIVE]: /^(s(?:ubj\w*)?:?|subjetivo:?|queixa:?|hda:?)/i,
    [SOAPSection.OBJECTIVE]: /^(o(?:bj\w*)?:?|objetivo:?|exame f[ií]sico:?|ef:?)/i,
    [SOAPSection.ASSESSMENT]: /^(a(?:ss\w*)?:?|avalia[çc][ãa]o:?|hip[óo]tese:?|diagn[óo]stico:?)/i,
    [SOAPSection.PLAN]: /^(p(?:l\w*)?:?|plano:?|conduta:?)/i
  };

  for (const line of lines) {
    let matched = false;
    for (const [section, pattern] of Object.entries(sectionPatterns)) {
      if (pattern.test(line)) {
        if (currentSection && buffer.trim()) {
          sections.set(currentSection, buffer.trim());
        }
        currentSection = section as SOAPSection;
        buffer = line.replace(pattern, '').trim() + '\n';
        matched = true;
        break;
      }
    }
    if (!matched) {
      buffer += line + '\n';
    }
  }

  if (currentSection && buffer.trim()) {
    sections.set(currentSection, buffer.trim());
  }

  // Inicializa seções ausentes
  for (const section of Object.values(SOAPSection)) {
    if (!sections.has(section)) {
      sections.set(section, '');
    }
  }

  return sections;
}

// =============================================================================
// PATTERNS: Padrões regex para extração
// =============================================================================

/**
 * Padrões para medicamentos comuns.
 */
export const MEDICATION_PATTERNS: RegExp[] = [
  // Analgésicos/Anti-inflamatórios
  /\b(paracetamol|acetaminofeno|dipirona|ibuprofeno|diclofenaco|nimesulida|meloxicam|cetoprofeno)\b/gi,
  // Antibióticos
  /\b(amoxicilina|azitromicina|ciprofloxacino|levofloxacino|cefalexina|ceftriaxona|amoxicilina[\s-]clavulanato)\b/gi,
  // Cardiovasculares
  /\b(losartana|enalapril|captopril|anlodipino|hidroclorotiazida|furosemida|atenolol|propranolol|carvedilol)\b/gi,
  // Antidiabéticos
  /\b(metformina|glibenclamida|gliclazida|sitagliptina|dapagliflozina|insulina)\b/gi,
  // Gastrointestinais
  /\b(omeprazol|pantoprazol|ranitidina|domperidona|metoclopramida)\b/gi,
  // Psicotrópicos
  /\b(fluoxetina|sertralina|escitalopram|amitriptilina|clonazepam|diazepam|lorazepam)\b/gi,
  // Respiratórios
  /\b(salbutamol|fenoterol|brometo de ipratrópio|budesonida|beclometasona)\b/gi,
  // Anticoagulantes/Antiagregantes
  /\b(varfarina|rivaroxabana|apixabana|aas|aspirina|clopidogrel)\b/gi,
  // Estatinas
  /\b(sinvastatina|atorvastatina|rosuvastatina)\b/gi,
];

/**
 * Padrões para sinais vitais.
 */
export const VITAL_SIGNS_PATTERNS: RegExp[] = [
  // Pressão arterial
  /\b(pa|press[ãa]o arterial)[:\s]*(\d{2,3})[\/x](\d{2,3})\s*(mmhg)?\b/gi,
  // Frequência cardíaca
  /\b(fc|freq[uü][êe]ncia card[ií]aca|pulso)[:\s]*(\d{2,3})\s*(bpm)?\b/gi,
  // Saturação de oxigênio
  /\b(spo2?|satura[çc][ãa]o|sat)[:\s]*(\d{2,3})\s*(%|porcento)?\b/gi,
  // Temperatura
  /\b(temp|temperatura|t[°º]?)[:\s]*(\d{2}[,.]?\d?)\s*(°?c|graus)?\b/gi,
  // Frequência respiratória
  /\b(fr|freq[uü][êe]ncia respirat[óo]ria)[:\s]*(\d{1,2})\s*(irpm|rpm)?\b/gi,
  // Glicemia capilar
  /\b(hgt|dextro|glicemia capilar)[:\s]*(\d{2,3})\s*(mg\/dl)?\b/gi,
  // Peso
  /\b(peso)[:\s]*(\d{2,3}[,.]?\d?)\s*(kg|quilos)?\b/gi,
  // Altura
  /\b(altura|estatura)[:\s]*(\d[,.]?\d{2})\s*(m|metros|cm)?\b/gi,
  // IMC
  /\b(imc)[:\s]*(\d{2}[,.]?\d?)\s*(kg\/m2?)?\b/gi,
];

/**
 * Padrões para dosagens.
 */
export const DOSAGE_PATTERNS: RegExp[] = [
  // Quantidade + unidade
  /\b(\d+(?:[,\.]\d+)?)\s*(mg|ml|g|mcg|ui|u|gotas?|gts?|comp(?:rimido)?s?|caps?(?:ula)?s?|ampola?s?|frasco?s?)\b/gi,
  // Frequência
  /\b(\d+)[xX]\s*(?:ao\s+)?dia\b/gi,
  /\b(de\s+)?(\d+)\/(\d+)\s*h(?:oras?)?\b/gi,
  /\b(1|2|3|4)x\s*ao\s*dia\b/gi,
  /\b(uma|duas|tr[êe]s|quatro)\s*vezes\s*ao\s*dia\b/gi,
  // Posologia comum
  /\b(qd|bid|tid|qid|prn|sos)\b/gi,
  /\b(pela\s+manh[ãa]|[àa]\s+noite|antes\s+de\s+dormir|em\s+jejum|ap[óo]s\s+refei[çc][ãõ]es?)\b/gi,
];

/**
 * Padrões para exames laboratoriais.
 */
export const EXAM_PATTERNS: RegExp[] = [
  /\b(hemograma|hb|hematócrito|leucócitos|plaquetas)\b/gi,
  /\b(glicemia|hba1c|hemoglobina glicada|ttgo|curva glicêmica)\b/gi,
  /\b(creatinina|ureia|tfg|clearance)\b/gi,
  /\b(tgo|tgp|ast|alt|gama[-\s]?gt|bilirrubinas?)\b/gi,
  /\b(colesterol|hdl|ldl|triglicerídeos|perfil lipídico)\b/gi,
  /\b(tsh|t4\s*livre|t3)\b/gi,
  /\b(eas|urina\s*tipo?\s*1|urin[áa]lise|urocultura)\b/gi,
  /\b(pcr|vhs|hemossedimentação)\b/gi,
  /\b(ecg|eletrocardiograma|ecocardiograma|eco)\b/gi,
  /\b(rx|raio[-\s]?x|radiografia|tc|tomografia|rm|resson[âa]ncia)\b/gi,
  /\b(usg|ultrassom|ultrassonografia)\b/gi,
];

/**
 * Padrões para sintomas comuns.
 */
export const SYMPTOM_PATTERNS: RegExp[] = [
  /\b(dor|dores)\s+(de\s+)?(cabe[çc]a|t[óo]rax|abdom[êe]n|lombar|costas|garganta|ouvido)\b/gi,
  /\b(febre|febril|hipertermia)\b/gi,
  /\b(tosse|tosse\s+seca|tosse\s+produtiva|expectoração)\b/gi,
  /\b(dispneia|falta\s+de\s+ar|cansaço)\b/gi,
  /\b(náusea|vômito|êmese)\b/gi,
  /\b(diarreia|constipação|obstipação)\b/gi,
  /\b(tontura|vertigem|síncope)\b/gi,
  /\b(edema|inchaço)\b/gi,
  /\b(prurido|coceira)\b/gi,
  /\b(insônia|sonolência)\b/gi,
  /\b(ansiedade|angústia|palpitação)\b/gi,
];

// =============================================================================
// EXTRACTION FUNCTIONS
// =============================================================================

/**
 * Extrai entidades de medicamentos do texto.
 */
export function extractMedications(text: string): MedicalEntity[] {
  const entities: MedicalEntity[] = [];

  for (const pattern of MEDICATION_PATTERNS) {
    // Reset lastIndex para cada pattern
    pattern.lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text)) !== null) {
      entities.push({
        text: match[0],
        type: EntityType.MEDICATION,
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        confidence: 0.85
      });
    }
  }

  return deduplicateEntities(entities);
}

/**
 * Extrai sinais vitais do texto.
 */
export function extractVitalSigns(text: string): MedicalEntity[] {
  const entities: MedicalEntity[] = [];

  for (const pattern of VITAL_SIGNS_PATTERNS) {
    pattern.lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text)) !== null) {
      entities.push({
        text: match[0],
        type: EntityType.VITAL_SIGN,
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        confidence: 0.90,
        metadata: { groups: match.slice(1) }
      });
    }
  }

  return deduplicateEntities(entities);
}

/**
 * Extrai dosagens do texto.
 */
export function extractDosages(text: string): MedicalEntity[] {
  const entities: MedicalEntity[] = [];

  for (const pattern of DOSAGE_PATTERNS) {
    pattern.lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text)) !== null) {
      entities.push({
        text: match[0],
        type: EntityType.DOSAGE,
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        confidence: 0.80
      });
    }
  }

  return deduplicateEntities(entities);
}

/**
 * Extrai menções a exames do texto.
 */
export function extractExams(text: string): MedicalEntity[] {
  const entities: MedicalEntity[] = [];

  for (const pattern of EXAM_PATTERNS) {
    pattern.lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text)) !== null) {
      entities.push({
        text: match[0],
        type: EntityType.EXAM,
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        confidence: 0.85
      });
    }
  }

  return deduplicateEntities(entities);
}

/**
 * Extrai sintomas do texto.
 */
export function extractSymptoms(text: string): MedicalEntity[] {
  const entities: MedicalEntity[] = [];

  for (const pattern of SYMPTOM_PATTERNS) {
    pattern.lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text)) !== null) {
      entities.push({
        text: match[0],
        type: EntityType.SYMPTOM,
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        confidence: 0.75
      });
    }
  }

  return deduplicateEntities(entities);
}

/**
 * Remove entidades duplicadas baseado em posição.
 */
function deduplicateEntities(entities: MedicalEntity[]): MedicalEntity[] {
  return entities.filter((entity, index, self) =>
    index === self.findIndex(e =>
      e.startIndex === entity.startIndex && e.endIndex === entity.endIndex
    )
  );
}

// =============================================================================
// MAIN PARSING FUNCTION
// =============================================================================

/**
 * Processa uma nota SOAP completa e extrai todas as entidades.
 */
export function parseSOAPNote(text: string): ExtractedSOAP {
  const sections = detectSOAPSections(text);
  const entities = new Map<SOAPSection, MedicalEntity[]>();

  for (const [section, content] of sections) {
    const sectionEntities: MedicalEntity[] = [
      ...extractMedications(content),
      ...extractVitalSigns(content),
      ...extractDosages(content),
      ...extractExams(content),
      ...extractSymptoms(content)
    ];

    // Ajusta índices para seção completa (não implementado nesta versão)
    entities.set(section, sectionEntities);
  }

  return {
    sections,
    entities,
    rawText: text
  };
}

// =============================================================================
// ENTITY EXTRACTOR INTERFACE (para futura integração com ML)
// =============================================================================

/**
 * Interface para extratores de entidades.
 */
export interface EntityExtractor {
  extract(text: string): Promise<MedicalEntity[]>;
}

/**
 * Extrator baseado em regras (implementação atual).
 */
export class RuleBasedExtractor implements EntityExtractor {
  async extract(text: string): Promise<MedicalEntity[]> {
    return [
      ...extractMedications(text),
      ...extractVitalSigns(text),
      ...extractDosages(text),
      ...extractExams(text),
      ...extractSymptoms(text)
    ];
  }
}

/**
 * Placeholder para extrator baseado em ML (BioBERT).
 * TODO: Implementar integração com modelo fine-tuned para português.
 */
export class MLExtractor implements EntityExtractor {
  private modelPath?: string;

  constructor(modelPath?: string) {
    this.modelPath = modelPath;
  }

  async extract(text: string): Promise<MedicalEntity[]> {
    // TODO: Carregar modelo BioBERT/ClinicalBERT
    // TODO: Tokenizar texto
    // TODO: Executar inferência
    // TODO: Converter outputs para MedicalEntity[]

    console.warn('MLExtractor not implemented. Falling back to RuleBasedExtractor.');
    const fallback = new RuleBasedExtractor();
    return fallback.extract(text);
  }
}
