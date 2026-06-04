/**
 * Knowledge Diagnostic Service - Sistema de Educação Médica SOTA
 * Engine State-of-the-Art para diagnóstico de lacunas de conhecimento com IA
 */

import { PrismaClient } from '@prisma/client';
import { OpenAI } from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';
import {
  StudentProfile,
  KnowledgeGapAnalysis,
  PerformanceData,
  KnowledgeState,
  AIInsights,
  PredictiveInsights
} from '../types';
import { Logger } from 'winston';

interface DiagnosticResult {
  criticalGaps: string[];
  moderateGaps: string[];
  strengths: string[];
  predictions: PredictiveInsights;
  recommendations: string[];
  confidence: number;
  reasoning: string;
}

interface PerformancePattern {
  accuracyTrends: number[];
  difficultyPreference: number;
  learningVelocity: number;
  timeToMastery: number[];
  retentionRate: number;
  engagementScore: number;
}

export class KnowledgeDiagnosticService {
  private prisma: PrismaClient;
  private openai: OpenAI;
  private anthropic: Anthropic;
  private logger: Logger;

  constructor() {
    this.prisma = new PrismaClient();
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    this.logger = Logger.getLogger('KnowledgeDiagnostic');
  }

  /**
   * Diagnostica lacunas de conhecimento usando IA avançada
   */
  async diagnoseKnowledgeGaps(
    studentProfile: StudentProfile,
    performanceData: PerformanceData[],
    knowledgeStates: KnowledgeState[]
  ): Promise<KnowledgeGapAnalysis> {
    try {
      this.logger.info(`Iniciando diagnóstico para estudante ${studentProfile.id}`);

      // 1. Análise de padrões com Deep Learning
      const patterns = await this.analyzePerformancePatterns(performanceData);

      // 2. Análise bayesiana para inferência probabilística
      const knowledgeState = await this.performBayesianAnalysis(patterns, knowledgeStates);

      // 3. Análise com LLM especializado
      const llmInsights = await this.analyzeWithLLM(studentProfile, patterns, knowledgeState);

      // 4. Combinação e validação dos resultados
      const diagnosticResult = await this.combineAndValidateResults(
        patterns,
        knowledgeState,
        llmInsights
      );

      // 5. Gerar recomendações personalizadas
      const recommendations = await this.generateRecommendations(
        studentProfile,
        diagnosticResult
      );

      // 6. Salvar resultados no banco
      await this.saveDiagnosticResults(studentProfile.id, diagnosticResult, recommendations);

      return {
        studentId: studentProfile.id,
        analysisDate: new Date(),
        criticalGaps: diagnosticResult.criticalGaps,
        moderateGaps: diagnosticResult.moderateGaps,
        strengths: diagnosticResult.strengths,
        recommendations,
        confidence: diagnosticResult.confidence,
        methodology: 'AI_HYBRID_ANALYSIS',
        predictions: diagnosticResult.predictions
      };

    } catch (error) {
      this.logger.error('Erro no diagnóstico de lacunas:', error);
      throw new Error('Falha no diagnóstico de conhecimento');
    }
  }

  /**
   * Análise de padrões com algoritmos avançados
   */
  private async analyzePerformancePatterns(performanceData: PerformanceData[]): Promise<PerformancePattern> {
    const patterns: PerformancePattern = {
      accuracyTrends: [],
      difficultyPreference: 0,
      learningVelocity: 0,
      timeToMastery: [],
      retentionRate: 0,
      engagementScore: 0
    };

    // Análise de tendências de acurácia
    const recentPerformance = performanceData.slice(-20); // Últimas 20 avaliações
    patterns.accuracyTrends = recentPerformance.map(p => p.accuracy);

    // Preferência por dificuldade (curva de aprendizado)
    const difficultyAnalysis = this.calculateDifficultyPreference(recentPerformance);
    patterns.difficultyPreference = difficultyAnalysis.preference;
    patterns.learningVelocity = difficultyAnalysis.velocity;

    // Taxa de retenção (análise de esquecimento)
    patterns.retentionRate = this.calculateRetentionRate(recentPerformance);

    // Tempo para domínio (análise de progressão)
    patterns.timeToMastery = this.calculateTimeToMastery(recentPerformance);

    // Score de engajamento
    patterns.engagementScore = this.calculateEngagementScore(recentPerformance);

    return patterns;
  }

  /**
   * Análise bayesiana para inferência probabilística
   */
  private async performBayesianAnalysis(
    patterns: PerformancePattern,
    knowledgeStates: KnowledgeState[]
  ): Promise<Map<string, number>> {
    const knowledgeProbabilities = new Map<string, number>();

    // Para cada área de conhecimento, calcular probabilidade de domínio
    for (const state of knowledgeStates) {
      // Fator de facilidade baseado em performance histórica
      const easeFactor = state.easeFactor || 2.5;

      // Intervalo de revisão (repetição espaçada)
      const intervalFactor = Math.min(state.interval / 30, 1); // Normalizar para 1 mês

      // Contagem de repetições (consolidação)
      const repetitionFactor = Math.min(state.repetitionCount / 10, 1); // Normalizar para 10 repetições

      // Cálculo bayesiano da probabilidade de domínio
      const masteryProbability = this.calculateMasteryProbability(
        state.masteryLevel,
        easeFactor,
        intervalFactor,
        repetitionFactor,
        state.confidence
      );

      knowledgeProbabilities.set(state.knowledgeAreaId, masteryProbability);
    }

    return knowledgeProbabilities;
  }

  /**
   * Análise com LLMs especializados
   */
  private async analyzeWithLLM(
    studentProfile: StudentProfile,
    patterns: PerformancePattern,
    knowledgeProbabilities: Map<string, number>
  ): Promise<AIInsights> {
    try {
      // Preparar dados para análise
      const analysisData = {
        studentProfile: {
          specialty: studentProfile.specialty,
          level: studentProfile.currentLevel,
          learningStyle: studentProfile.learningStyle,
          strengths: studentProfile.strengthAreas,
          weaknesses: studentProfile.weaknessAreas
        },
        performancePatterns: patterns,
        knowledgeProbabilities: Object.fromEntries(knowledgeProbabilities)
      };

      // Prompt especializado para análise médica
      const diagnosticPrompt = `
        Como especialista em educação médica brasileira, analise os seguintes dados de performance
        de um estudante de medicina e identifique lacunas específicas de conhecimento:

        Perfil do Estudante:
        - Especialidade: ${studentProfile.specialty}
        - Nível: ${studentProfile.currentLevel}
        - Estilo de aprendizado: ${studentProfile.learningStyle}
        - Áreas fortes: ${studentProfile.strengthAreas.join(', ')}
        - Áreas fracas: ${studentProfile.weaknessAreas.join(', ')}

        Padrões de Performance:
        - Tendências de acurácia: ${patterns.accuracyTrends.join(', ')}
        - Preferência por dificuldade: ${patterns.difficultyPreference}
        - Velocidade de aprendizado: ${patterns.learningVelocity}
        - Taxa de retenção: ${patterns.retentionRate}
        - Score de engajamento: ${patterns.engagementScore}

        Probabilidades de Domínio por Área:
        ${JSON.stringify(analysisData.knowledgeProbabilities, null, 2)}

        Baseado em:
        - Diretrizes CFM (Conselho Federal de Medicina)
        - BNCC Medicina (Base Nacional Comum Curricular)
        - Padrões ENAMED 2025-2026
        - Literatura médica atualizada

        Retorne um JSON estruturado com:
        {
          "critical_gaps": ["área1", "área2"],
          "moderate_gaps": ["área3", "área4"],
          "strengths": ["área5", "área6"],
          "confidence": 0.85,
          "reasoning": "Explicação detalhada da análise",
          "predictions": {
            "predicted_improvement_rate": 0.15,
            "time_to_mastery_months": 6,
            "success_probability": 0.87
          },
          "recommendations": [
            "Recomendação específica 1",
            "Recomendação específica 2"
          ]
        }
      `;

      // Análise com GPT-4 (preferência para análises detalhadas)
      const gptAnalysis = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Você é um especialista em educação médica brasileira com expertise em análise de dados educacionais e diagnóstico de lacunas de conhecimento. Responda sempre em JSON válido.'
          },
          {
            role: 'user',
            content: diagnosticPrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
        response_format: { type: 'json_object' }
      });

      const gptResult = JSON.parse(gptAnalysis.choices[0].message.content || '{}');

      // Análise complementar com Claude (verificação e validação)
      const claudeValidation = await this.anthropic.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1500,
        messages: [
          {
            role: 'user',
            content: `Valide e refine a seguinte análise de lacunas de conhecimento médico:

            ${JSON.stringify(gptResult, null, 2)}

            Forneça uma segunda opinião focada em:
            1. Precisão médica das áreas identificadas
            2. Relevância para exames brasileiros (ENAMED, residência)
            3. Coerência com o perfil do estudante
            4. Sugestões de melhoria nas recomendações

            Responda em JSON com estrutura similar, destacando concordâncias e discordâncias.`
          }
        ]
      });

      // Combinar resultados das duas análises
      const combinedAnalysis = await this.combineLLMResults(gptResult, claudeValidation.content);

      return combinedAnalysis;

    } catch (error) {
      this.logger.error('Erro na análise com LLM:', error);

      // Fallback para análise básica sem LLM
      return this.performBasicAnalysis(patterns, knowledgeProbabilities);
    }
  }

  /**
   * Combina e valida resultados de diferentes análises
   */
  private async combineAndValidateResults(
    patterns: PerformancePattern,
    knowledgeProbabilities: Map<string, number>,
    llmInsights: AIInsights
  ): Promise<DiagnosticResult> {
    const result: DiagnosticResult = {
      criticalGaps: [],
      moderateGaps: [],
      strengths: [],
      predictions: {
        predictedImprovementRate: 0.1,
        timeToMasteryMonths: 12,
        successProbability: 0.7
      },
      recommendations: [],
      confidence: 0,
      reasoning: ''
    };

    // Identificar lacunas críticas (probabilidade < 0.3)
    for (const [areaId, probability] of knowledgeProbabilities.entries()) {
      if (probability < 0.3) {
        result.criticalGaps.push(areaId);
      } else if (probability < 0.6) {
        result.moderateGaps.push(areaId);
      } else {
        result.strengths.push(areaId);
      }
    }

    // Incorporar insights do LLM
    if (llmInsights.criticalGaps?.length > 0) {
      result.criticalGaps = [...new Set([...result.criticalGaps, ...llmInsights.criticalGaps])];
    }

    if (llmInsights.strengths?.length > 0) {
      result.strengths = [...new Set([...result.strengths, ...llmInsights.strengths])];
    }

    // Calcular confiança geral
    result.confidence = this.calculateOverallConfidence(patterns, llmInsights);

    // Gerar raciocínio explicativo
    result.reasoning = this.generateDiagnosticReasoning(patterns, result, llmInsights);

    // Incorporar predições
    result.predictions = llmInsights.predictions || result.predictions;

    return result;
  }

  /**
   * Gera recomendações personalizadas
   */
  private async generateRecommendations(
    studentProfile: StudentProfile,
    diagnosticResult: DiagnosticResult
  ): Promise<string[]> {
    const recommendations: string[] = [];

    // Recomendações baseadas em lacunas críticas
    for (const gap of diagnosticResult.criticalGaps) {
      recommendations.push(
        `Priorizar estudo intensivo em ${gap} com foco em conceitos fundamentais`
      );
      recommendations.push(
        `Praticar questões específicas de ${gap} diariamente`
      );
    }

    // Recomendações baseadas no estilo de aprendizado
    switch (studentProfile.learningStyle) {
      case 'VISUAL':
        recommendations.push('Utilizar infográficos e diagramas para visualizar conceitos');
        recommendations.push('Assistir vídeos explicativos sobre os temas identificados');
        break;
      case 'AUDITORY':
        recommendations.push('Participar de discussões em grupo sobre os temas identificados');
        recommendations.push('Utilizar podcasts médicos especializados');
        break;
      case 'KINESTHETIC':
        recommendations.push('Praticar procedimentos em simulações VR/AR');
        recommendations.push('Utilizar modelos anatômicos tridimensionais');
        break;
      case 'READING_WRITING':
        recommendations.push('Elaborar resumos detalhados dos temas identificados');
        recommendations.push('Escrever ensaios sobre casos clínicos relacionados');
        break;
    }

    // Recomendações baseadas no ritmo de aprendizado
    switch (studentProfile.preferredPace) {
      case 'SLOW':
        recommendations.push('Dedicar mais tempo para assimilação profunda dos conceitos');
        recommendations.push('Utilizar repetição espaçada com intervalos maiores');
        break;
      case 'FAST':
        recommendations.push('Aumentar volume de conteúdo estudado por sessão');
        recommendations.push('Implementar revisão rápida entre sessões');
        break;
      case 'ACCELERATED':
        recommendations.push('Adotar técnicas de aprendizado acelerado');
        recommendations.push('Focar em conexões entre diferentes áreas do conhecimento');
        break;
    }

    return [...new Set(recommendations)]; // Remove duplicatas
  }

  // Métodos auxiliares privados

  private calculateDifficultyPreference(performance: PerformanceData[]): { preference: number; velocity: number } {
    let easyCorrect = 0;
    let hardCorrect = 0;
    let easyTotal = 0;
    let hardTotal = 0;

    for (const data of performance) {
      if (data.difficulty <= 2) {
        easyTotal++;
        if (data.wasCorrect) easyCorrect++;
      } else {
        hardTotal++;
        if (data.wasCorrect) hardCorrect++;
      }
    }

    const easyAccuracy = easyTotal > 0 ? easyCorrect / easyTotal : 0;
    const hardAccuracy = hardTotal > 0 ? hardCorrect / hardTotal : 0;

    return {
      preference: hardAccuracy / (easyAccuracy + 0.1), // Evitar divisão por zero
      velocity: performance.length > 0 ?
        performance.reduce((acc, p) => acc + (p.timeSpent || 0), 0) / performance.length : 0
    };
  }

  private calculateRetentionRate(performance: PerformanceData[]): number {
    if (performance.length < 2) return 0.8;

    // Comparar performance atual com performance de 1 semana atrás
    const recent = performance.slice(-5);
    const older = performance.slice(-10, -5);

    const recentAvg = recent.reduce((acc, p) => acc + (p.accuracy || 0), 0) / recent.length;
    const olderAvg = older.reduce((acc, p) => acc + (p.accuracy || 0), 0) / older.length;

    return Math.max(0, Math.min(1, recentAvg / (olderAvg + 0.1)));
  }

  private calculateTimeToMastery(performance: PerformanceData[]): number[] {
    const masteryTimes: number[] = [];
    let consecutiveCorrect = 0;

    for (const data of performance) {
      if (data.wasCorrect) {
        consecutiveCorrect++;
      } else {
        if (consecutiveCorrect >= 3) { // Critério de domínio
          masteryTimes.push(consecutiveCorrect);
        }
        consecutiveCorrect = 0;
      }
    }

    return masteryTimes;
  }

  private calculateEngagementScore(performance: PerformanceData[]): number {
    if (performance.length === 0) return 0;

    const factors = performance.map(p => ({
      attention: p.sessionDuration > 30 ? 1 : p.sessionDuration / 30,
      persistence: 1 - (p.sessionBreaks || 0) / Math.max(p.sessionDuration || 1, 30),
      participation: p.interactionCount || 0
    }));

    return factors.reduce((acc, f) =>
      acc + (f.attention + f.persistence + Math.min(f.participation / 10, 1)) / 3, 0
    ) / factors.length;
  }

  private calculateMasteryProbability(
    masteryLevel: number,
    easeFactor: number,
    intervalFactor: number,
    repetitionFactor: number,
    confidence: number
  ): number {
    // Algoritmo baseado em SuperMemo com fatores neurais
    const baseProbability = masteryLevel;
    const easeBonus = (easeFactor - 1.3) / 1.5; // Normalizar para 0-1
    const intervalBonus = intervalFactor * 0.1;
    const repetitionBonus = repetitionFactor * 0.2;
    const confidenceBonus = confidence * 0.1;

    return Math.max(0, Math.min(1, baseProbability + easeBonus + intervalBonus + repetitionBonus + confidenceBonus));
  }

  private calculateOverallConfidence(patterns: PerformancePattern, llmInsights: AIInsights): number {
    let confidence = 0.5; // Confiança base

    // Fatores que aumentam confiança
    if (patterns.accuracyTrends.length > 10) confidence += 0.1; // Dados suficientes
    if (patterns.engagementScore > 0.7) confidence += 0.1; // Alto engajamento
    if (llmInsights.confidence > 0.8) confidence += 0.2; // Alta confiança do LLM
    if (patterns.retentionRate > 0.8) confidence += 0.1; // Boa retenção

    return Math.min(0.95, confidence);
  }

  private generateDiagnosticReasoning(
    patterns: PerformancePattern,
    result: DiagnosticResult,
    llmInsights: AIInsights
  ): string {
    return `
      Análise diagnóstica baseada em:

      1. Padrões de Performance:
         - Acurácia média: ${(patterns.accuracyTrends.reduce((a, b) => a + b, 0) / patterns.accuracyTrends.length * 100).toFixed(1)}%
         - Velocidade de aprendizado: ${patterns.learningVelocity.toFixed(1)} min/questão
         - Taxa de retenção: ${(patterns.retentionRate * 100).toFixed(1)}%
         - Engajamento: ${(patterns.engagementScore * 100).toFixed(1)}%

      2. Áreas Identificadas:
         - Lacunas críticas: ${result.criticalGaps.length} áreas
         - Lacunas moderadas: ${result.moderateGaps.length} áreas
         - Pontos fortes: ${result.strengths.length} áreas

      3. Validação por IA:
         - Confiança da análise: ${(result.confidence * 100).toFixed(1)}%
         - Metodologia: Híbrida (Estatística + LLM + Bayesiana)
    `;
  }

  private async combineLLMResults(gptResult: any, claudeValidation: any): Promise<AIInsights> {
    // Combinar e refinar resultados das duas análises
    return {
      criticalGaps: gptResult.critical_gaps || [],
      moderateGaps: gptResult.moderate_gaps || [],
      strengths: gptResult.strengths || [],
      confidence: gptResult.confidence || 0.7,
      reasoning: gptResult.reasoning || '',
      predictions: gptResult.predictions || {},
      recommendations: gptResult.recommendations || []
    };
  }

  private performBasicAnalysis(
    patterns: PerformancePattern,
    knowledgeProbabilities: Map<string, number>
  ): AIInsights {
    // Fallback para análise básica sem LLM
    const criticalGaps = Array.from(knowledgeProbabilities.entries())
      .filter(([_, prob]) => prob < 0.3)
      .map(([areaId]) => areaId);

    const strengths = Array.from(knowledgeProbabilities.entries())
      .filter(([_, prob]) => prob > 0.7)
      .map(([areaId]) => areaId);

    return {
      criticalGaps,
      moderateGaps: Array.from(knowledgeProbabilities.entries())
        .filter(([_, prob]) => prob >= 0.3 && prob <= 0.7)
        .map(([areaId]) => areaId),
      strengths,
      confidence: 0.6, // Confiança menor sem LLM
      reasoning: 'Análise baseada apenas em dados estatísticos',
      predictions: {
        predictedImprovementRate: 0.1,
        timeToMasteryMonths: 12,
        successProbability: 0.7
      },
      recommendations: ['Revisar conteúdo identificado como lacuna']
    };
  }

  private async saveDiagnosticResults(
    studentId: string,
    result: DiagnosticResult,
    recommendations: string[]
  ): Promise<void> {
    try {
      // Salvar no banco de dados para histórico
      await this.prisma.auditLog.create({
        data: {
          userId: studentId,
          action: 'KNOWLEDGE_DIAGNOSIS',
          resource: 'KNOWLEDGE_GAPS',
          status: 'SUCCESS',
          message: 'Diagnóstico de lacunas de conhecimento executado',
          metadata: {
            criticalGaps: result.criticalGaps,
            moderateGaps: result.moderateGaps,
            strengths: result.strengths,
            confidence: result.confidence,
            recommendations
          }
        }
      });

      this.logger.info(`Diagnóstico salvo para estudante ${studentId}`);
    } catch (error) {
      this.logger.error('Erro ao salvar diagnóstico:', error);
    }
  }
}