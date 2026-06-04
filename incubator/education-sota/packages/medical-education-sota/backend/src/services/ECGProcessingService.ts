/**
 * ECG Processing Service - Sistema de Educação Médica SOTA
 * Processamento avançado de sinais ECG com IA State-of-the-Art
 */

import { PrismaClient } from '@prisma/client';
import { OpenAI } from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';

interface ECGSignal {
  id: string;
  leadConfiguration: string[];
  samplingRate: number; // Hz
  duration: number; // seconds
  signalData: number[][]; // [lead][sample]
  patientInfo?: {
    age?: number;
    gender?: 'M' | 'F' | 'O';
    medications?: string[];
    clinicalHistory?: string;
    symptoms?: string[];
  };
  metadata: {
    deviceModel?: string;
    recordingDate: Date;
    clinicalContext?: string;
  };
}

interface ProcessedECG {
  signalId: string;
  baseline: number[][];
  filtered: number[][];
  heartRate: number;
  rhythmAnalysis: {
    type: 'sinus' | 'irregular' | 'bradycardia' | 'tachycardia';
    regularity: number;
    confidence: number;
  };
  intervals: {
    RR: { value: number; normal: boolean }[];
    PR: { value: number; normal: boolean }[];
    QRS: { value: number; normal: boolean }[];
    QT: { value: number; normal: boolean }[];
    ST: { value: number; normal: boolean }[];
  };
  measurements: {
    P_wave: { amplitude: number; duration: number; normal: boolean };
    QRS_complex: { amplitude: number; duration: number; normal: boolean };
    T_wave: { amplitude: number; duration: number; normal: boolean };
    ST_segment: { elevation: number; depression: number; normal: boolean };
  };
  patterns: {
    axis: number; // degrees
    chamberEnlargement: string[];
    conductionAbnormalities: string[];
    ischemiaIndicators: string[];
    arrhythmiaMarkers: string[];
  };
}

interface ECGClassification {
  signalId: string;
  primary: {
    category: 'normal' | 'abnormal' | 'critical';
    diagnosis: string[];
    confidence: number;
  };
  secondary: {
    findings: Array<{
      finding: string;
      severity: 'mild' | 'moderate' | 'severe';
      confidence: number;
      description: string;
    }>;
  };
  clinical: {
    recommendations: string[];
    urgency: 'routine' | 'urgent' | 'emergency';
    followUp: string[];
  };
  educational: {
    learningPoints: string[];
    keyConcepts: string[];
    relatedTopics: string[];
  };
}

export class ECGProcessingService {
  private prisma: PrismaClient;
  private openai: OpenAI;
  private anthropic: Anthropic;

  constructor() {
    this.prisma = new PrismaClient();
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  /**
   * Processa sinal ECG bruto e extrai características
   */
  async processECG(signal: ECGSignal): Promise<ProcessedECG> {
    try {
      console.log(`🔍 Processando ECG ${signal.id}...`);

      // 1. Baseline correction
      const baseline = await this.correctBaseline(signal.signalData);

      // 2. Filtering (remover ruído e artefatos)
      const filtered = await this.applyFilters(baseline, signal.samplingRate);

      // 3. Heart rate analysis
      const heartRate = await this.calculateHeartRate(filtered, signal.samplingRate);

      // 4. Rhythm analysis
      const rhythmAnalysis = await this.analyzeRhythm(filtered, signal.samplingRate);

      // 5. Interval measurements
      const intervals = await this.measureIntervals(filtered, signal.samplingRate);

      // 6. Wave measurements
      const measurements = await this.measureWaves(filtered, signal.samplingRate);

      // 7. Pattern recognition
      const patterns = await this.recognizePatterns(filtered, intervals, measurements);

      return {
        signalId: signal.id,
        baseline,
        filtered,
        heartRate,
        rhythmAnalysis,
        intervals,
        measurements,
        patterns
      };

    } catch (error) {
      console.error('❌ Erro no processamento ECG:', error);
      throw new Error(`Falha no processamento do ECG ${signal.id}`);
    }
  }

  /**
   * Classifica ECG usando IA especializada
   */
  async classifyECG(
    processedECG: ProcessedECG,
    clinicalContext?: any
  ): Promise<ECGClassification> {
    try {
      console.log(`🧠 Classificando ECG ${processedECG.signalId}...`);

      // 1. Preparar dados para análise LLM
      const analysisData = this.prepareECGAnalysisData(processedECG, clinicalContext);

      // 2. Análise com GPT-4 especializado
      const gptAnalysis = await this.analyzeWithGPT4(analysisData);

      // 3. Validação com Claude
      const claudeValidation = await this.validateWithClaude(analysisData, gptAnalysis);

      // 4. Combinação e refinamento
      const classification = await this.combineAnalyses(gptAnalysis, claudeValidation);

      // 5. Salvar classificação no banco
      await this.saveClassification(processedECG.signalId, classification);

      return classification;

    } catch (error) {
      console.error('❌ Erro na classificação ECG:', error);
      throw new Error(`Falha na classificação do ECG ${processedECG.signalId}`);
    }
  }

  /**
   * Gera explicação educacional para ECG
   */
  async generateEducationalContent(
    classification: ECGClassification,
    studentLevel: 'beginner' | 'intermediate' | 'advanced'
  ): Promise<{
    explanation: string;
    keyPoints: string[];
    learningObjectives: string[];
    relatedCases: string[];
    quizQuestions: Array<{
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }>;
  }> {
    try {
      const prompt = `
        Como professor especialista em electrocardiografia, crie conteúdo educacional
        para um estudante de medicina nível ${studentLevel} sobre o seguinte ECG:

        Diagnóstico: ${classification.primary.diagnosis.join(', ')}
        Achados: ${classification.secondary.findings.map(f => f.finding).join(', ')}

        Forneça:
        1. Explicação didática detalhada
        2. Pontos-chave de aprendizado
        3. Objetivos educacionais
        4. 3 casos similares para prática
        5. 5 questões de múltipla escolha com explicações

        Use linguagem apropriada para ${studentLevel} e inclua correlações clínicas.
      `;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Você é um professor especialista em eletrocardiografia com 20+ anos de experiência, especializado em educação médica brasileira.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      const content = response.choices[0].message.content;

      // Parse do conteúdo gerado
      return this.parseEducationalContent(content);

    } catch (error) {
      console.error('❌ Erro na geração de conteúdo educacional:', error);
      throw new Error('Falha na geração de conteúdo educacional');
    }
  }

  // Métodos privados de processamento

  private async correctBaseline(signalData: number[][]): Promise<number[][]> {
    const corrected: number[][] = [];

    for (let lead = 0; lead < signalData.length; lead++) {
      const leadData = signalData[lead];

      // Remover baseline wander usando filtro passa-alta
      const baseline = this.calculateMovingAverage(leadData, 50);
      const correctedLead = leadData.map((sample, index) =>
        sample - baseline[index]
      );

      corrected.push(correctedLead);
    }

    return corrected;
  }

  private async applyFilters(signal: number[][], samplingRate: number): Promise<number[][]> {
    const filtered: number[][] = [];

    for (let lead = 0; lead < signal.length; lead++) {
      const leadData = signal[lead];

      // Filtro passa-baixa (remoção de ruído alta frequência)
      const lowPassFiltered = this.lowPassFilter(leadData, samplingRate);

      // Filtro passa-alta (remoção de baseline)
      const highPassFiltered = this.highPassFilter(lowPassFiltered, samplingRate);

      filtered.push(highPassFiltered);
    }

    return filtered;
  }

  private async calculateHeartRate(filtered: number[][], samplingRate: number): Promise<number> {
    // Detecção de picos R em Lead II (mais confiável)
    const leadII = filtered[1]; // Assumindo Lead II no índice 1
    const rPeaks = this.detectRPeaks(leadII, samplingRate);

    if (rPeaks.length < 2) {
      return 0; // Não foi possível detectar
    }

    // Calcular intervalos RR médios
    const rrIntervals: number[] = [];
    for (let i = 1; i < rPeaks.length; i++) {
      const rr = (rPeaks[i] - rPeaks[i-1]) / samplingRate; // em segundos
      rrIntervals.push(rr);
    }

    const avgRR = rrIntervals.reduce((sum, rr) => sum + rr, 0) / rrIntervals.length;
    const heartRate = Math.round(60 / avgRR); // BPM

    return heartRate;
  }

  private async analyzeRhythm(filtered: number[][], samplingRate: number) {
    const leadII = filtered[1];
    const rPeaks = this.detectRPeaks(leadII, samplingRate);

    if (rPeaks.length < 3) {
      return {
        type: 'irregular' as const,
        regularity: 0.5,
        confidence: 0.3
      };
    }

    // Análise da regularidade
    const rrIntervals: number[] = [];
    for (let i = 1; i < rPeaks.length; i++) {
      const rr = (rPeaks[i] - rPeaks[i-1]) / samplingRate;
      rrIntervals.push(rr);
    }

    // Calcular coeficiente de variação
    const mean = rrIntervals.reduce((sum, rr) => sum + rr, 0) / rrIntervals.length;
    const variance = rrIntervals.reduce((sum, rr) => sum + Math.pow(rr - mean, 2), 0) / rrIntervals.length;
    const stdDev = Math.sqrt(variance);
    const cv = stdDev / mean; // coefficient of variation

    // Determinar tipo de ritmo
    let type: 'sinus' | 'irregular' | 'bradycardia' | 'tachycardia';
    const heartRate = Math.round(60 / mean);

    if (heartRate < 60) type = 'bradycardia';
    else if (heartRate > 100) type = 'tachycardia';
    else if (cv > 0.1) type = 'irregular';
    else type = 'sinus';

    return {
      type,
      regularity: 1 - Math.min(cv * 10, 1), // 0-1 (1 = muito regular)
      confidence: Math.min(rrIntervals.length / 10, 1)
    };
  }

  private async measureIntervals(filtered: number[][], samplingRate: number) {
    const leadII = filtered[1];
    const rPeaks = this.detectRPeaks(leadII, samplingRate);

    const intervals = {
      RR: [] as Array<{ value: number; normal: boolean }>,
      PR: [] as Array<{ value: number; normal: boolean }>,
      QRS: [] as Array<{ value: number; normal: boolean }>,
      QT: [] as Array<{ value: number; normal: boolean }>,
      ST: [] as Array<{ value: number; normal: boolean }>
    };

    // Medir intervalos para cada batimento
    for (let i = 0; i < rPeaks.length - 1; i++) {
      const currentR = rPeaks[i];
      const nextR = rPeaks[i + 1];

      // RR interval
      const rrInterval = (nextR - currentR) / samplingRate;
      intervals.RR.push({
        value: rrInterval,
        normal: rrInterval >= 0.6 && rrInterval <= 1.0
      });

      // Detectar ondas P e QRS para PR e QRS
      const pWave = this.detectPWave(leadII, currentR, samplingRate);
      const qrsComplex = this.detectQRSComplex(leadII, currentR, samplingRate);

      if (pWave && qrsComplex) {
        // PR interval
        const prInterval = (qrsComplex.start - pWave.end) / samplingRate;
        intervals.PR.push({
          value: prInterval,
          normal: prInterval >= 0.12 && prInterval <= 0.20
        });

        // QRS duration
        const qrsDuration = (qrsComplex.end - qrsComplex.start) / samplingRate;
        intervals.QRS.push({
          value: qrsDuration,
          normal: qrsDuration <= 0.12
        });
      }
    }

    return intervals;
  }

  private async measureWaves(filtered: number[][], samplingRate: number) {
    const leadII = filtered[1];
    const rPeaks = this.detectRPeaks(leadII, samplingRate);

    const measurements = {
      P_wave: { amplitude: 0, duration: 0, normal: true },
      QRS_complex: { amplitude: 0, duration: 0, normal: true },
      T_wave: { amplitude: 0, duration: 0, normal: true },
      ST_segment: { elevation: 0, depression: 0, normal: true }
    };

    if (rPeaks.length > 0) {
      const firstR = rPeaks[0];

      // P wave measurement
      const pWave = this.detectPWave(leadII, firstR, samplingRate);
      if (pWave) {
        measurements.P_wave.amplitude = Math.max(...leadII.slice(pWave.start, pWave.end));
        measurements.P_wave.duration = (pWave.end - pWave.start) / samplingRate;
        measurements.P_wave.normal = measurements.P_wave.duration <= 0.11;
      }

      // QRS complex measurement
      const qrs = this.detectQRSComplex(leadII, firstR, samplingRate);
      if (qrs) {
        measurements.QRS_complex.amplitude = Math.max(...leadII.slice(qrs.start, qrs.end)) -
                                           Math.min(...leadII.slice(qrs.start, qrs.end));
        measurements.QRS_complex.duration = (qrs.end - qrs.start) / samplingRate;
        measurements.QRS_complex.normal = measurements.QRS_complex.duration <= 0.12;
      }

      // T wave measurement
      const tWave = this.detectTWave(leadII, firstR, samplingRate);
      if (tWave) {
        measurements.T_wave.amplitude = Math.max(...leadII.slice(tWave.start, tWave.end));
        measurements.T_wave.duration = (tWave.end - tWave.start) / samplingRate;
        measurements.T_wave.normal = measurements.T_wave.duration <= 0.5;
      }
    }

    return measurements;
  }

  private async recognizePatterns(filtered: number[][], intervals: any, measurements: any) {
    const patterns = {
      axis: 0,
      chamberEnlargement: [] as string[],
      conductionAbnormalities: [] as string[],
      ischemiaIndicators: [] as string[],
      arrhythmiaMarkers: [] as string[]
    };

    // Cálculo do eixo elétrico (simplificado)
    patterns.axis = this.calculateElectricalAxis(filtered);

    // Detecção de crescimento de câmaras
    if (measurements.QRS_complex.amplitude > 2.5) {
      patterns.chamberEnlargement.push('Hipertrofia ventricular esquerda');
    }

    // Detecção de anormalidades de condução
    if (measurements.QRS_complex.duration > 0.12) {
      patterns.conductionAbnormalities.push('Bloqueio de ramo');
    }

    // Detecção de indicadores de isquemia (simplificado)
    // Em implementação real, seria mais sofisticado
    if (intervals.ST.length > 0 && intervals.ST[0].value > 0.1) {
      patterns.ischemiaIndicators.push('Elevação do segmento ST');
    }

    return patterns;
  }

  // Métodos auxiliares

  private calculateMovingAverage(data: number[], window: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < data.length; i++) {
      const start = Math.max(0, i - Math.floor(window / 2));
      const end = Math.min(data.length, i + Math.floor(window / 2));
      const slice = data.slice(start, end);
      result.push(slice.reduce((sum, val) => sum + val, 0) / slice.length);
    }
    return result;
  }

  private lowPassFilter(data: number[], samplingRate: number): number[] {
    // Implementação simplificada de filtro Butterworth
    const cutoffFreq = 40; // Hz
    const normalizedCutoff = cutoffFreq / (samplingRate / 2);
    const alpha = Math.exp(-2 * Math.PI * normalizedCutoff);

    const filtered: number[] = [];
    filtered[0] = data[0];

    for (let i = 1; i < data.length; i++) {
      filtered[i] = alpha * filtered[i-1] + (1 - alpha) * data[i];
    }

    return filtered;
  }

  private highPassFilter(data: number[], samplingRate: number): number[] {
    // Implementação simplificada de filtro passa-alta
    const cutoffFreq = 0.5; // Hz
    const normalizedCutoff = cutoffFreq / (samplingRate / 2);
    const alpha = Math.exp(-2 * Math.PI * normalizedCutoff);

    const filtered: number[] = [];
    filtered[0] = data[0];

    for (let i = 1; i < data.length; i++) {
      filtered[i] = alpha * (filtered[i-1] + data[i] - data[i-1]);
    }

    return filtered;
  }

  private detectRPeaks(leadII: number[], samplingRate: number): number[] {
    const rPeaks: number[] = [];
    const threshold = this.calculateThreshold(leadII);
    const refractoryPeriod = Math.floor(0.2 * samplingRate); // 200ms

    for (let i = refractoryPeriod; i < leadII.length - refractoryPeriod; i++) {
      if (leadII[i] > threshold &&
          leadII[i] > leadII[i-1] &&
          leadII[i] > leadII[i+1]) {

        // Verificar se não está muito próximo do pico anterior
        if (rPeaks.length === 0 || i - rPeaks[rPeaks.length - 1] > refractoryPeriod) {
          rPeaks.push(i);
        }
      }
    }

    return rPeaks;
  }

  private calculateThreshold(data: number[]): number {
    const sorted = [...data].sort((a, b) => a - b);
    const q75Index = Math.floor(sorted.length * 0.75);
    return sorted[q75Index] * 0.6; // 60% do quartil 75
  }

  private detectPWave(leadII: number[], rPeak: number, samplingRate: number) {
    // Procurar onda P antes do complexo QRS
    const searchWindow = Math.floor(0.2 * samplingRate); // 200ms antes do R
    const start = Math.max(0, rPeak - searchWindow);

    // Detectar pico positivo pequeno (onda P)
    const segment = leadII.slice(start, rPeak);
    const maxValue = Math.max(...segment);
    const maxIndex = segment.indexOf(maxValue) + start;

    // Verificar se é realmente uma onda P (amplitude < 0.25mV)
    if (maxValue < 0.25 && maxValue > 0.05) {
      return {
        start: Math.max(0, maxIndex - Math.floor(0.04 * samplingRate)),
        peak: maxIndex,
        end: Math.min(leadII.length, maxIndex + Math.floor(0.04 * samplingRate))
      };
    }

    return null;
  }

  private detectQRSComplex(leadII: number[], rPeak: number, samplingRate: number) {
    // Detectar início e fim do complexo QRS
    const window = Math.floor(0.1 * samplingRate); // 100ms

    let start = rPeak;
    let end = rPeak;

    // Procurar início (onde a amplitude aumenta rapidamente)
    for (let i = rPeak; i > Math.max(0, rPeak - window); i--) {
      if (Math.abs(leadII[i] - leadII[i-1]) > 0.1) {
        start = i;
        break;
      }
    }

    // Procurar fim (onde a amplitude volta ao normal)
    for (let i = rPeak; i < Math.min(leadII.length, rPeak + window); i++) {
      if (Math.abs(leadII[i] - leadII[i-1]) < 0.05) {
        end = i;
        break;
      }
    }

    return {
      start,
      peak: rPeak,
      end
    };
  }

  private detectTWave(leadII: number[], rPeak: number, samplingRate: number) {
    // Procurar onda T após o complexo QRS
    const searchWindow = Math.floor(0.4 * samplingRate); // 400ms após o R
    const start = rPeak + Math.floor(0.1 * samplingRate); // 100ms após o R

    const segment = leadII.slice(start, Math.min(leadII.length, start + searchWindow));
    if (segment.length === 0) return null;

    const maxValue = Math.max(...segment);
    const maxIndex = segment.indexOf(maxValue) + start;

    return {
      start: start,
      peak: maxIndex,
      end: Math.min(leadII.length, maxIndex + Math.floor(0.2 * samplingRate))
    };
  }

  private calculateElectricalAxis(filtered: number[][]): number {
    // Cálculo simplificado do eixo elétrico usando leads I e aVF
    const leadI = filtered[0]; // Assumindo Lead I no índice 0
    const leadAVF = filtered[5]; // Assumindo aVF no índice 5

    const leadIPeak = Math.max(...leadI) - Math.min(...leadI);
    const leadAVFPeak = Math.max(...leadAVF) - Math.min(...leadAVF);

    // Fórmula simplificada para eixo elétrico
    const axis = Math.atan2(leadAVFPeak, leadIPeak) * (180 / Math.PI);

    return Math.round(axis);
  }

  // Métodos de análise com LLM

  private prepareECGAnalysisData(processedECG: ProcessedECG, clinicalContext?: any): any {
    return {
      heartRate: processedECG.heartRate,
      rhythm: processedECG.rhythmAnalysis,
      intervals: processedECG.intervals,
      measurements: processedECG.measurements,
      patterns: processedECG.patterns,
      clinicalContext
    };
  }

  private async analyzeWithGPT4(analysisData: any): Promise<any> {
    const prompt = `
      Analise este ECG como cardiologista especialista:

      Frequência cardíaca: ${analysisData.heartRate} bpm
      Ritmo: ${analysisData.rhythm.type} (regularidade: ${analysisData.rhythm.regularidade})

      Intervalos principais:
      - RR: ${analysisData.intervals.RR.map(r => `${(r.value * 1000).toFixed(0)}ms`).join(', ')}
      - PR: ${analysisData.intervals.PR.map(r => `${(r.value * 1000).toFixed(0)}ms`).join(', ')}
      - QRS: ${analysisData.intervals.QRS.map(r => `${(r.value * 1000).toFixed(0)}ms`).join(', ')}

      Eixo elétrico: ${analysisData.patterns.axis}°

      Contextos clínicos: ${analysisData.clinicalContext ? JSON.stringify(analysisData.clinicalContext) : 'Não informado'}

      Forneça diagnóstico estruturado em JSON:
      {
        "primary": {
          "category": "normal|abnormal|critical",
          "diagnosis": ["diagnóstico principal"],
          "confidence": 0.95
        },
        "secondary": {
          "findings": [
            {
              "finding": "achado específico",
              "severity": "mild|moderate|severe",
              "confidence": 0.9,
              "description": "descrição detalhada"
            }
          ]
        },
        "clinical": {
          "recommendations": ["recomendação clínica"],
          "urgency": "routine|urgent|emergency",
          "followUp": ["orientações de acompanhamento"]
        }
      }
    `;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Você é um cardiologista brasileiro especialista em eletrocardiografia com 15+ anos de experiência, alinhado com as diretrizes da SBC.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1500,
      response_format: { type: 'json_object' }
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  }

  private async validateWithClaude(analysisData: any, gptAnalysis: any): Promise<any> {
    const prompt = `
      Valide e refine esta interpretação de ECG:

      ${JSON.stringify(gptAnalysis, null, 2)}

      Verifique:
      1. Consistência com os dados ECG
      2. Aderência às diretrizes brasileiras (SBC)
      3. Relevância clínica para contexto brasileiro
      4. Precisão médica

      Forneça validação em JSON:
      {
        "validation": {
          "consistent": true/false,
          "accuracy_score": 0.95,
          "improvements": ["sugestão de melhoria"],
          "notes": "observações do especialista"
        }
      }
    `;

    const response = await this.anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 800,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    return { validation: response.content };
  }

  private async combineAnalyses(gptAnalysis: any, claudeValidation: any): Promise<ECGClassification> {
    // Combinar e refinar análises
    return {
      signalId: '', // Será preenchido pelo caller
      primary: gptAnalysis.primary || {
        category: 'normal',
        diagnosis: ['ECG dentro dos padrões de normalidade'],
        confidence: 0.7
      },
      secondary: gptAnalysis.secondary || {
        findings: []
      },
      clinical: gptAnalysis.clinical || {
        recommendations: ['Manter acompanhamento cardiológico regular'],
        urgency: 'routine',
        followUp: ['ECG de controle em 1 ano']
      },
      educational: {
        learningPoints: [
          'Interpretação sistemática de ECG',
          'Identificação de padrões normais',
          'Correlação clínica'
        ],
        keyConcepts: ['Ritmo sinusal', 'Intervalos normais', 'Eixo elétrico'],
        relatedTopics: ['Fisiologia cardiovascular', 'Farmacologia cardíaca']
      }
    };
  }

  private async saveClassification(signalId: string, classification: ECGClassification): Promise<void> {
    try {
      await this.prisma.auditLog.create({
        data: {
          action: 'ECG_CLASSIFICATION',
          resource: 'ECG_SIGNAL',
          resourceId: signalId,
          status: 'SUCCESS',
          message: 'Classificação ECG executada com IA',
          metadata: {
            primaryCategory: classification.primary.category,
            confidence: classification.primary.confidence,
            diagnosis: classification.primary.diagnosis,
            urgency: classification.clinical.urgency
          }
        }
      });
    } catch (error) {
      console.error('Erro ao salvar classificação ECG:', error);
    }
  }

  private parseEducationalContent(content: string): any {
    // Parser simplificado - em implementação real seria mais robusto
    return {
      explanation: content.substring(0, 500) + '...',
      keyPoints: [
        'Ponto-chave 1',
        'Ponto-chave 2',
        'Ponto-chave 3'
      ],
      learningObjectives: [
        'Objetivo 1',
        'Objetivo 2'
      ],
      relatedCases: [
        'Caso relacionado 1',
        'Caso relacionado 2'
      ],
      quizQuestions: [
        {
          question: 'Pergunta de exemplo?',
          options: ['Opção A', 'Opção B', 'Opção C', 'Opção D'],
          correctAnswer: 0,
          explanation: 'Explicação da resposta correta'
        }
      ]
    };
  }
}
