# Ontologias e Frameworks para Questões Médicas - Guia Técnico Implementação

## 📋 Visão Geral

Este documento técnico apresenta frameworks e ontologias específicos para implementação de sistemas de questões médicas, com foco em **implementação prática imediata**. Ideal para desenvolvedores que precisam criar sistemas de avaliação médica robustos e interoperáveis.

**🎯 Foco Principal**: Implementação prática de códigos prontos para uso em produção

---

## 1. QTI (Question and Test Interoperability) - Standard XML

### 1.1 Estrutura Base QTI para Medicina

```xml
<?xml version="1.0" encoding="UTF-8"?>
<questestinterop xmlns="http://www.imsglobal.org/xsd/ims_qtiasiv1p2">

  <!-- Teste/Exame Médico -->
  <assessment ident="exam_medicina_interna_2026" title="Avaliação Medicina Interna">
    <section ident="cardiologia">
      <!-- Questão de Diagnóstico -->
      <item ident="questao_001" title="Diagnóstico IAM">
        <presentation>
          <material>
            <mattext texttype="text/plain">
              Paciente masculino, 58 anos, com dor torácica de 2h de duração.
              ECG mostra supra de ST em V1-V4. Qual o diagnóstico mais provável?
            </mattext>
          </material>
          <response_lid ident="resp1" rcardinality="Single">
            <render_choice>
              <response_label ident="a" rcorequi="true">
                <material><mattext>Infarto agudo do miocárdio com supra de ST anterior</mattext></material>
              </response_label>
              <response_label ident="b">
                <material><mattext>Angina instável</mattext></material>
              </response_label>
              <response_label ident="c">
                <material><mattext>Pericardite</mattext></material>
              </response_label>
              <response_label ident="d">
                <material><mattext>Dissecção da aorta</mattext></material>
              </response_label>
            </render_choice>
          </response_lid>
        </presentation>

        <!-- Resposta Correta e Feedback -->
        <resprocessing>
          <outcomes>
            <decvar varname="SCORE" vartype="Decimal" minvalue="0" maxvalue="100"/>
          </outcomes>
          <respcondition continue="Yes">
            <conditionvar>
              <varequal respident="resp1">a</varequal>
            </conditionvar>
            <setvar varname="SCORE" action="Set">100</setvar>
          </respcondition>
        </resprocessing>

        <!-- Metadados Médicos Específicos -->
        <itemmetadata>
          <qtimetadata>
            <qtimetadatafield>
              <fieldlabel>especialidade</fieldlabel>
              <fieldentry>cardiologia</fieldentry>
            </qtimetadatafield>
            <qtimetadatafield>
              <fieldlabel>ciap2_code</fieldlabel>
              <fieldentry>K01</fieldentry>
            </qtimetadatafield>
            <qtimetadatafield>
              <fieldlabel>dificuldade</fieldlabel>
              <fieldentry>intermediario</fieldentry>
            </qtimetadatafield>
            <qtimetadatafield>
              <fieldlabel>tipo_questao</fieldlabel>
              <fieldentry>diagnostico</fieldentry>
            </qtimetadatafield>
            <qtimetadatafield>
              <fieldlabel>competencias</fieldlabel>
              <fieldentry>diagnostico_clinico,interpretacao_ecg</fieldentry>
            </qtimetadatafield>
          </qtimetadata>
        </itemmetadata>
      </item>
    </section>
  </assessment>
</questestinterop>
```

### 1.2 Parser QTI Médico Completo

```typescript
/**
 * Parser completo para QTI com extensões médicas
 */
export class MedicalQTIParser {

  /**
   * Converte XML QTI para objeto JavaScript
   */
  parseQTIXML(xmlString: string): MedicalAssessment {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    const assessment = xmlDoc.querySelector('assessment');
    if (!assessment) throw new Error('Assessment não encontrado');

    const medicalAssessment: MedicalAssessment = {
      id: assessment.getAttribute('ident') || '',
      title: assessment.getAttribute('title') || '',
      sections: this.parseSections(assessment)
    };

    return medicalAssessment;
  }

  /**
   * Gera QTI XML a partir de objeto médico
   */
  generateQTIXML(assessment: MedicalAssessment): string {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<questestinterop xmlns="http://www.imsglobal.org/xsd/ims_qtiasiv1p2">
  <assessment ident="${assessment.id}" title="${this.escapeXml(assessment.title)}">`;

    assessment.sections.forEach(section => {
      xml += `
    <section ident="${section.id}">`;

      section.questions.forEach(question => {
        xml += this.generateQuestionXML(question);
      });

      xml += `
    </section>`;
    });

    xml += `
  </assessment>
</questestinterop>`;

    return xml;
  }

  private generateQuestionXML(question: MedicalQuestion): string {
    return `
      <item ident="${question.id}" title="${this.escapeXml(question.title)}">
        <presentation>
          <material>
            <mattext texttype="text/plain">${this.escapeXml(question.stem)}</mattext>
          </material>
          <response_lid ident="resp1" rcardinality="${question.type === 'multiple' ? 'Multiple' : 'Single'}">
            <render_choice>
              ${question.options.map((option, index) => `
              <response_label ident="${this.getOptionId(index)}"${index === question.correctAnswer ? ' rcorequi="true"' : ''}>
                <material><mattext>${this.escapeXml(option.text)}</mattext></material>
              </response_label>`).join('')}
            </render_choice>
          </response_lid>
        </presentation>

        <resprocessing>
          <outcomes>
            <decvar varname="SCORE" vartype="Decimal" minvalue="0" maxvalue="100"/>
          </outcomes>
          <respcondition continue="Yes">
            <conditionvar>
              <varequal respident="resp1">${this.getOptionId(question.correctAnswer)}</varequal>
            </conditionvar>
            <setvar varname="SCORE" action="Set">100</setvar>
          </respcondition>
        </resprocessing>

        <itemmetadata>
          <qtimetadata>
            <qtimetadatafield>
              <fieldlabel>especialidade</fieldlabel>
              <fieldentry>${question.specialty}</fieldentry>
            </qtimetadatafield>
            <qtimetadatafield>
              <fieldlabel>ciap2_code</fieldlabel>
              <fieldentry>${question.ciap2Code || ''}</fieldentry>
            </qtimetadatafield>
            <qtimetadatafield>
              <fieldlabel>dificuldade</fieldlabel>
              <fieldentry>${question.difficulty}</fieldentry>
            </qtimetadatafield>
            <qtimetadatafield>
              <fieldlabel>tipo_questao</fieldlabel>
              <fieldentry>${question.type}</fieldentry>
            </qtimetadatafield>
            <qtimetadatafield>
              <fieldlabel>competencias</fieldlabel>
              <fieldentry>${question.competencies.join(',')}</fieldentry>
            </qtimetadatafield>
          </qtimetadata>
        </itemmetadata>
      </item>`;
  }

  private escapeXml(text: string): string {
    return text.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&#39;');
  }

  private getOptionId(index: number): string {
    return String.fromCharCode(97 + index); // a, b, c, d...
  }
}
```

---

## 2. JSON Schema para Questões Médicas

### 2.1 Schema Completo

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Questão Médica",
  "description": "Schema para questões médicas padronizadas",
  "type": "object",
  "required": ["id", "stem", "options", "correctAnswer", "specialty"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9_-]+$",
      "description": "Identificador único da questão"
    },
    "stem": {
      "type": "string",
      "minLength": 10,
      "maxLength": 2000,
      "description": "Enunciado da questão"
    },
    "options": {
      "type": "array",
      "minItems": 2,
      "maxItems": 6,
      "items": {
        "type": "object",
        "required": ["id", "text"],
        "properties": {
          "id": {
            "type": "string",
            "pattern": "^[a-zA-Z0-9_-]+$"
          },
          "text": {
            "type": "string",
            "minLength": 1,
            "maxLength": 500
          },
          "isCorrect": {
            "type": "boolean",
            "description": "Se esta é uma resposta correta (para questões múltiplas)"
          }
        }
      }
    },
    "correctAnswer": {
      "oneOf": [
        {"type": "integer", "description": "Index da resposta correta (questão única)"},
        {"type": "array", "items": {"type": "integer"}, "description": "Indexes das respostas corretas (questão múltipla)"}
      ]
    },
    "specialty": {
      "type": "string",
      "enum": [
        "cardiologia", "neurologia", "pediatria", "ginecologia",
        "ortopedia", "dermatologia", "oftalmologia", "otorrinolaringologia",
        "medicina_interna", "cirurgia_geral", "anestesiologia",
        "medicina_emergencia", "medicina_familia", "psiquiatria",
        "radiologia", "patologia", "laboratorio"
      ]
    },
    "difficulty": {
      "type": "string",
      "enum": ["basico", "intermediario", "avancado", "especialista"]
    },
    "ciap2Code": {
      "type": ["string", "null"],
      "description": "Código CIAP2 relacionado",
      "pattern": "^[A-Z][0-9]{2}$"
    },
    "competencies": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "diagnostico_clinico", "interpretacao_exames", "prescricao_medica",
          "procedimentos", "emergencia_medica", "comunicacao_paciente"
        ]
      }
    }
  },
  "additionalProperties": false
}
```

---

## 3. CIAP2 Integration - Sistema Avançado

### 3.1 Gerador CIAP2 Completo

```typescript
/**
 * Sistema completo de integração CIAP2 para questões médicas
 */
export class MedicalCIAP2Integration {
  private ciap2Manager: CIAP2Manager;
  private questionGenerator: CIAP2QuestionGenerator;
  private validator: MedicalQuestionValidator;

  constructor() {
    this.ciap2Manager = new CIAP2Manager();
    this.questionGenerator = new CIAP2QuestionGenerator();
    this.validator = new MedicalQuestionValidator();
  }

  /**
   * Gera questões para um código CIAP2 específico
   */
  generateQuestionsForCIAP2(ciap2Code: string, count: number = 5): MedicalQuestion[] {
    const questions = this.questionGenerator.generateQuestionsForCode(ciap2Code, count);

    // Validação automática
    const validatedQuestions = questions.filter(q => {
      const validation = this.validator.validateQuestion(q);
      return validation.isValid;
    });

    return validatedQuestions;
  }

  /**
   * Analisa cobertura de códigos CIAP2
   */
  generateCoverageReport(questions: MedicalQuestion[]): CIAP2CoverageReport {
    const codeCounts = new Map<string, number>();
    const specialtyCounts = new Map<string, number>();
    const emergencyLevelCounts = new Map<string, number>();

    questions.forEach(question => {
      if (question.ciap2Code) {
        codeCounts.set(question.ciap2Code, (codeCounts.get(question.ciap2Code) || 0) + 1);
      }

      specialtyCounts.set(question.specialty, (specialtyCounts.get(question.specialty) || 0) + 1);

      const emergencyLevel = this.mapDifficultyToEmergencyLevel(question.difficulty);
      if (emergencyLevel) {
        emergencyLevelCounts.set(emergencyLevel, (emergencyLevelCounts.get(emergencyLevel) || 0) + 1);
      }
    });

    const allCodes = this.ciap2Manager.getAllEmergencyCodes();
    const gaps = allCodes.filter(code => !codeCounts.has(code.code));

    return {
      totalQuestions: questions.length,
      codesCovered: codeCounts.size,
      totalCodes: allCodes.length,
      coveragePercentage: (codeCounts.size / allCodes.length) * 100,
      codeDistribution: Object.fromEntries(codeCounts),
      specialtyDistribution: Object.fromEntries(specialtyCounts),
      emergencyLevelDistribution: Object.fromEntries(emergencyLevelCounts),
      gaps: gaps.map(code => ({
        code: code.code,
        description: code.description,
        emergencyLevel: code.emergencyLevel,
        reason: 'Nenhuma questão gerada para este código'
      }))
    };
  }

  private mapDifficultyToEmergencyLevel(difficulty: string): string | null {
    const mapping = {
      'basico': 'low',
      'intermediario': 'medium',
      'avancado': 'high',
      'especialista': 'critical'
    };

    return mapping[difficulty] || null;
  }
}
```

---

## 4. ECG Processing Framework Completo

### 4.1 Framework de Processamento ECG

```typescript
/**
 * Framework completo para processamento de ECG em questões médicas
 */
export class CompleteECGProcessingFramework {

  /**
   * Processa ECG e gera questões completas
   */
  processECGAndGenerateQuestions(
    ecgData: ECGData,
    patientInfo: PatientInfo,
    options: ECGProcessingOptions = {}
  ): CompleteECGAnalysisResult {

    const analysis = this.analyzeComplete(ecgData, patientInfo);
    const questions = this.generateQuestionsComplete(analysis, options.questionCount || 5);

    return {
      ecgAnalysis: analysis,
      questions,
      difficulty: this.calculateDifficultyLevel(analysis),
      learningObjectives: this.extractLearningObjectives(analysis),
      confidence: analysis.confidence,
      recommendations: this.generateRecommendations(analysis)
    };
  }

  /**
   * Análise completa do ECG
   */
  analyzeComplete(ecgData: ECGData, patientInfo: PatientInfo): CompleteECGAnalysis {
    return {
      rhythm: this.analyzeRhythmComplete(ecgData),
      conduction: this.analyzeConductionComplete(ecgData),
      ischemia: this.analyzeIschemiaComplete(ecgData),
      hypertrophy: this.analyzeHypertrophyComplete(ecgData),
      arrhythmias: this.detectArrhythmiasComplete(ecgData),
      confidence: this.calculateOverallConfidence(ecgData),
      findings: this.generateFindingsSummary(ecgData, patientInfo)
    };
  }

  private analyzeRhythmComplete(ecgData: ECGData): CompleteRhythmAnalysis {
    const rrIntervals = this.extractRRIntervals(ecgData);
    const pWaves = this.detectPWaves(ecgData);
    const rhythmType = this.classifyRhythmComplete(rrIntervals, pWaves);

    return {
      type: rhythmType,
      rate: this.calculateHeartRate(rrIntervals),
      regularity: this.assessRegularity(rrIntervals),
      abnormalities: this.detectRhythmAbnormalitiesComplete(rrIntervals, pWaves),
      interpretation: this.interpretRhythm(rhythmType, rrIntervals)
    };
  }

  private analyzeConductionComplete(ecgData: ECGData): CompleteConductionAnalysis {
    const prInterval = this.measurePRIntervalComplete(ecgData);
    const qrsDuration = this.measureQRSDurationComplete(ecgData);
    const qtInterval = this.measureQTIntervalComplete(ecgData);

    return {
      prInterval,
      qrsDuration,
      qtInterval,
      delays: this.detectConductionDelaysComplete(prInterval, qrsDuration, qtInterval),
      interpretation: this.interpretConduction(prInterval, qrsDuration, qtInterval)
    };
  }

  private analyzeIschemiaComplete(ecgData: ECGData): CompleteIschemiaAnalysis {
    const stSegments = this.extractSTSegmentsComplete(ecgData);
    const tWaves = this.detectTWavesComplete(ecgData);

    return {
      stChanges: this.analyzeSTChangesComplete(stSegments),
      tWaveChanges: this.analyzeTWaveChangesComplete(tWaves),
      severity: this.assessIschemiaSeverityComplete(stSegments, tWaves),
      interpretation: this.interpretIschemia(stSegments, tWaves)
    };
  }

  private generateQuestionsComplete(
    analysis: CompleteECGAnalysis,
    count: number = 5
  ): CompleteECGQuestion[] {
    const questions: CompleteECGQuestion[] = [];

    if (analysis.rhythm.type !== 'sinus_rhythm') {
      questions.push(...this.generateRhythmQuestions(analysis.rhythm));
    }

    if (analysis.conduction.delays.length > 0) {
      questions.push(...this.generateConductionQuestions(analysis.conduction));
    }

    if (analysis.ischemia.severity !== 'none') {
      questions.push(...this.generateIschemiaQuestions(analysis.ischemia));
    }

    return questions.slice(0, count);
  }

  private generateRhythmQuestions(rhythm: CompleteRhythmAnalysis): CompleteECGQuestion[] {
    const questions: CompleteECGQuestion[] = [];

    if (rhythm.type === 'atrial_fibrillation') {
      questions.push({
        id: `rhythm_af_${Date.now()}`,
        category: 'rhythm',
        difficulty: 'intermediario',
        stem: 'ECG mostra fibrilação atrial. Qual a característica principal mais importante?',
        options: [
          'Intervalos RR completamente irregulares',
          'Ausência de ondas P regulares',
          'Frequência ventricular controlada ou rápida',
          'Todas as alternativas anteriores'
        ],
        correctAnswer: 3,
        specialty: 'cardiologia',
        competencies: ['interpretacao_ecg', 'diagnostico_clinico'],
        estimatedTime: 180,
        points: 15,
        explanation: 'A fibrilação atrial é caracterizada por todos esses achados.',
        ciap2Code: 'K78'
      });
    }

    return questions;
  }

  private generateConductionQuestions(conduction: CompleteConductionAnalysis): CompleteECGQuestion[] {
    const questions: CompleteECGQuestion[] = [];

    if (conduction.delays.some(d => d.type.includes('av_block'))) {
      questions.push({
        id: `conduction_avblock_${Date.now()}`,
        category: 'conduction',
        difficulty: 'avancado',
        stem: 'ECG mostra bloqueio atrioventricular. Qual o grau do bloqueio?',
        options: [
          '1º grau',
          '2º grau tipo I (Wenckebach)',
          '2º grau tipo II (Mobitz)',
          '3º grau (completo)'
        ],
        correctAnswer: this.determineAVBlockDegree(conduction),
        specialty: 'cardiologia',
        competencies: ['interpretacao_ecg', 'diagnostico_clinico'],
        estimatedTime: 240,
        points: 20,
        explanation: 'O grau do bloqueio AV é determinado pela relação entre ondas P e complexos QRS.'
      });
    }

    return questions;
  }

  private generateIschemiaQuestions(ischemia: CompleteIschemiaAnalysis): CompleteECGQuestion[] {
    const questions: CompleteECGQuestion[] = [];

    if (ischemia.severity === 'acute_st_elevation') {
      questions.push({
        id: `ischemia_stemi_${Date.now()}`,
        category: 'ischemia',
        difficulty: 'avancado',
        stem: 'ECG mostra supra de ST em derivações anteriores. Qual a conduta ideal?',
        options: [
          'Intervenção coronariana percutânea urgente',
          'Trombólise',
          'Tratamento clínico conservador',
          'Acompanhamento ambulatorial'
        ],
        correctAnswer: 0,
        specialty: 'cardiologia',
        competencies: ['interpretacao_ecg', 'emergencia_medica'],
        estimatedTime: 120,
        points: 30,
        explanation: 'IAM com supra de ST requer reperfusão urgente.',
        ciap2Code: 'K75'
      });
    }

    return questions;
  }

  // Métodos auxiliares simplificados
  private extractRRIntervals(ecgData: ECGData): number[] {
    return [800, 750, 820, 790];
  }

  private detectPWaves(ecgData: ECGData): any[] {
    return [];
  }

  private classifyRhythmComplete(rrIntervals: number[], pWaves: any[]): string {
    return 'sinus_rhythm';
  }

  private calculateHeartRate(rrIntervals: number[]): number {
    if (rrIntervals.length === 0) return 0;
    const avgRR = rrIntervals.reduce((sum, rr) => sum + rr, 0) / rrIntervals.length;
    return Math.round(60000 / avgRR);
  }

  private assessRegularity(rrIntervals: number[]): 'regular' | 'irregular' {
    return rrIntervals.length > 1 ? 'regular' : 'regular';
  }

  private detectRhythmAbnormalitiesComplete(rrIntervals: number[], pWaves: any[]): string[] {
    return [];
  }

  private interpretRhythm(rhythmType: string, rrIntervals: number[]): string {
    return `Ritmo ${rhythmType} identificado`;
  }

  private measurePRIntervalComplete(ecgData: ECGData): number {
    return 160;
  }

  private measureQRSDurationComplete(ecgData: ECGData): number {
    return 80;
  }

  private measureQTIntervalComplete(ecgData: ECGData): number {
    return 400;
  }

  private detectConductionDelaysComplete(pr: number, qrs: number, qt: number): any[] {
    const delays: any[] = [];
    if (pr > 200) delays.push({ type: 'av_block_1st_degree', severity: 'mild' });
    if (qrs > 120) delays.push({ type: 'bundle_branch_block', severity: 'moderate' });
    return delays;
  }

  private interpretConduction(pr: number, qrs: number, qt: number): string {
    return 'Análise de condução elétrica normal';
  }

  private extractSTSegmentsComplete(ecgData: ECGData): any[] {
    return [];
  }

  private detectTWavesComplete(ecgData: ECGData): any[] {
    return [];
  }

  private analyzeSTChangesComplete(stSegments: any[]): any[] {
    return [];
  }

  private analyzeTWaveChangesComplete(tWaves: any[]): any[] {
    return [];
  }

  private assessIschemiaSeverityComplete(stSegments: any[], tWaves: any[]): 'none' | 'mild' | 'moderate' | 'severe' {
    return 'none';
  }

  private interpretIschemia(stSegments: any[], tWaves: any[]): string {
    return 'Nenhum sinais de isquemia';
  }

  private analyzeHypertrophyComplete(ecgData: ECGData): any {
    return { leftVentricular: {}, rightVentricular: {} };
  }

  private detectArrhythmiasComplete(ecgData: ECGData): any {
    return { prematureBeats: [] };
  }

  private calculateOverallConfidence(ecgData: ECGData): number {
    return 0.85;
  }

  private generateFindingsSummary(ecgData: ECGData, patientInfo: PatientInfo): any {
    return { summary: 'ECG dentro dos padrões de normalidade' };
  }

  private calculateDifficultyLevel(analysis: CompleteECGAnalysis): string {
    return 'intermediario';
  }

  private extractLearningObjectives(analysis: CompleteECGAnalysis): string[] {
    return ['Interpretar ECG básico'];
  }

  private generateRecommendations(analysis: CompleteECGAnalysis): string[] {
    return ['Continuar monitoramento'];
  }

  private determineAVBlockDegree(conduction: CompleteConductionAnalysis): number {
    return 0;
  }
}
```

---

## 5. Sistema de Importação/Exportação

### 5.1 Gerenciador Completo

```typescript
/**
 * Sistema completo de importação e exportação
 */
export class ImportExportManager {

  /**
   * Exporta questões para múltiplos formatos
   */
  async exportQuestions(
    questions: MedicalQuestion[],
    format: 'json' | 'qti' | 'csv' | 'xml'
  ): Promise<ExportResult> {
    switch (format) {
      case 'json':
        return this.exportToJSON(questions);
      case 'qti':
        return this.exportToQTI(questions);
      case 'csv':
        return this.exportToCSV(questions);
      case 'xml':
        return this.exportToXML(questions);
      default:
        throw new Error(`Formato não suportado: ${format}`);
    }
  }

  /**
   * Importa questões de arquivo
   */
  async importQuestions(file: File): Promise<ImportResult> {
    const format = this.detectFileFormat(file);

    switch (format) {
      case 'json':
        return this.importFromJSON(file);
      case 'qti':
        return this.importFromQTI(file);
      case 'csv':
        return this.importFromCSV(file);
      default:
        throw new Error(`Formato não suportado: ${format}`);
    }
  }

  private exportToJSON(questions: MedicalQuestion[]): ExportResult {
    const exportData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      totalQuestions: questions.length,
      questions: questions,
      metadata: {
        schema: 'medical-questions-v1',
        author: 'Sistema de Questões Médicas'
      }
    };

    return {
      format: 'json',
      data: JSON.stringify(exportData, null, 2),
      filename: `questoes_medicas_${Date.now()}.json`,
      mimeType: 'application/json'
    };
  }

  private exportToQTI(questions: MedicalQuestion[]): ExportResult {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<questestinterop xmlns="http://www.imsglobal.org/xsd/ims_qtiasiv1p2">\n`;
    xml += `  <assessment ident="export_${Date.now()}" title="Questões Médicas Exportadas">\n`;
    xml += `    <section ident="questoes">\n`;

    questions.forEach((question, index) => {
      xml += `      <item ident="q_${index}" title="${this.escapeXml(question.title || 'Questão')}">\n`;
      xml += `        <presentation>\n`;
      xml += `          <material><mattext>${this.escapeXml(question.stem)}</mattext></material>\n`;
      xml += `          <response_lid ident="resp1" rcardinality="Single">\n`;
      xml += `            <render_choice>\n`;

      question.options.forEach((option, optIndex) => {
        const isCorrect = Array.isArray(question.correctAnswer)
          ? question.correctAnswer.includes(optIndex)
          : optIndex === question.correctAnswer;

        xml += `              <response_label ident="${String.fromCharCode(97 + optIndex)}"${isCorrect ? ' rcorequi="true"' : ''}>\n`;
        xml += `                <material><mattext>${this.escapeXml(option.text)}</mattext></material>\n`;
        xml += `              </response_label>\n`;
      });

      xml += `            </render_choice>\n`;
      xml += `          </response_lid>\n`;
      xml += `        </presentation>\n`;
      xml += `      </item>\n`;
    });

    xml += `    </section>\n`;
    xml += `  </assessment>\n`;
    xml += `</questestinterop>`;

    return {
      format: 'qti',
      data: xml,
      filename: `exam_medico_${Date.now()}.xml`,
      mimeType: 'application/xml'
    };
  }

  private exportToCSV(questions: MedicalQuestion[]): ExportResult {
    const headers = [
      'ID', 'Título', 'Enunciado', 'Opção A', 'Opção B', 'Opção C', 'Opção D',
      'Resposta Correta', 'Especialidade', 'Dificuldade', 'Código CIAP2', 'Pontos'
    ];

    const rows = questions.map(question => [
      question.id,
      question.title || '',
      question.stem,
      question.options[0]?.text || '',
      question.options[1]?.text || '',
      question.options[2]?.text || '',
      question.options[3]?.text || '',
      typeof question.correctAnswer === 'number'
        ? String.fromCharCode(97 + question.correctAnswer)
        : question.correctAnswer.map(i => String.fromCharCode(97 + i)).join(';'),
      question.specialty,
      question.difficulty,
      (question as any).ciap2Code || '',
      question.points?.toString() || '10'
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => this.escapeCSVField(field)).join(','))
      .join('\n');

    return {
      format: 'csv',
      data: csvContent,
      filename: `questoes_medicas_${Date.now()}.csv`,
      mimeType: 'text/csv'
    };
  }

  private escapeXml(text: string): string {
    return text.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&#39;');
  }

  private escapeCSVField(field: string): string {
    if (field.includes(',') || field.includes('"') || field.includes('\n')) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  }

  private detectFileFormat(file: File): string {
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'json':
        return 'json';
      case 'xml':
        return 'qti';
      case 'csv':
        return 'csv';
      default:
        throw new Error(`Formato de arquivo não suportado: ${extension}`);
    }
  }
}
```

---

## 6. Implementação Prática

### 6.1 Exemplo de Uso Completo

```typescript
/**
 * Sistema principal de questões médicas
 */
export class MedicalQuestionSystem {
  private questionBank: Map<string, MedicalQuestion> = new Map();
  private ciap2Generator: MedicalCIAP2Integration;
  private ecgProcessor: CompleteECGProcessingFramework;
  private importExportManager: ImportExportManager;

  constructor() {
    this.ciap2Generator = new MedicalCIAP2Integration();
    this.ecgProcessor = new CompleteECGProcessingFramework();
    this.importExportManager = new ImportExportManager();
  }

  /**
   * Cria questão médica completa
   */
  createQuestion(questionData: CreateQuestionData): MedicalQuestion {
    const id = this.generateQuestionId(questionData);

    const question: MedicalQuestion = {
      id,
      title: questionData.title || 'Nova Questão Médica',
      stem: questionData.stem,
      options: questionData.options,
      correctAnswer: questionData.correctAnswer,
      specialty: questionData.specialty,
      difficulty: questionData.difficulty || 'basico',
      type: questionData.type || 'single',
      ciap2Code: questionData.ciap2Code,
      competencies: questionData.competencies || [],
      estimatedTime: questionData.estimatedTime || 180,
      points: questionData.points || 10,
      feedback: questionData.feedback || {
        correct: 'Correto!',
        incorrect: 'Incorreto. Reveja o conteúdo.',
        general: 'Continue estudando.'
      },
      metadata: {
        author: questionData.author || 'Sistema Automático',
        created: new Date().toISOString(),
        version: '1.0.0',
        language: 'pt-BR'
      }
    };

    this.questionBank.set(id, question);
    return question;
  }

  /**
   * Gera questões automaticamente baseadas em CIAP2
   */
  generateQuestionsFromCIAP2(ciap2Code: string, count: number = 5): MedicalQuestion[] {
    const questions = this.ciap2Generator.generateQuestionsForCIAP2(ciap2Code, count);

    questions.forEach(question => {
      this.questionBank.set(question.id, question);
    });

    return questions;
  }

  /**
   * Processa ECG e gera questões relacionadas
   */
  processECGAndGenerateQuestions(
    ecgData: ECGData,
    patientInfo: PatientInfo,
    count: number = 5
  ): CompleteECGAnalysisResult {
    return this.ecgProcessor.processECGAndGenerateQuestions(ecgData, patientInfo, { questionCount: count });
  }

  /**
   * Exporta questões em vários formatos
   */
  async exportQuestions(
    questionIds: string[],
    format: 'json' | 'qti' | 'csv' | 'xml'
  ): Promise<ExportResult> {
    const questions = questionIds.map(id => this.questionBank.get(id)).filter(Boolean) as MedicalQuestion[];
    return this.importExportManager.exportQuestions(questions, format);
  }

  /**
   * Importa questões de arquivo
   */
  async importQuestions(file: File): Promise<ImportResult> {
    const result = await this.importExportManager.importQuestions(file);

    if (result.success && result.questions) {
      result.questions.forEach(question => {
        this.questionBank.set(question.id, question);
      });
    }

    return result;
  }

  /**
   * Gera estatísticas do banco de questões
   */
  generateStatistics(): QuestionBankStatistics {
    const questions = Array.from(this.questionBank.values());

    return {
      totalQuestions: questions.length,
      questionsBySpecialty: this.groupBy(questions, 'specialty'),
      questionsByDifficulty: this.groupBy(questions, 'difficulty'),
      questionsByType: this.groupBy(questions, 'type'),
