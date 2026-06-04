// Motor de Geração de Conteúdo com LLM - Sistema SOTA 2025-2026
// Implementação prática da estratégia de criação de conteúdo

import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

export interface ContentGenerationRequest {
  studentId: string;
  contentType: 'clinical_case' | 'question' | 'explanation' | 'summary' | 'simulation';
  specialty: MedicalSpecialty;
  topic: string;
  difficulty: DifficultyLevel;
  learningObjectives: string[];
  culturalContext: CulturalContext;
  timeConstraints?: TimeConstraints;
  format: ContentFormat;
}

export interface MedicalSpecialty {
  name: string;
  brazilianGuidelines: string[];
  subspecialties: string[];
  keyCompetencies: string[];
}

export interface CulturalContext {
  region: 'brazil' | 'latin_america' | 'global';
  language: 'pt-BR' | 'en' | 'es';
  healthcareSystem: 'sus' | 'private' | 'mixed';
  socioeconomicContext: string;
  culturalSensitivity: CulturalSensitivity[];
}

export interface GeneratedContent {
  id: string;
  content: any;
  metadata: ContentMetadata;
  validationResults: ValidationResults;
  adaptationTags: AdaptationTag[];
  qualityScore: number;
  generatedAt: Date;
}

export class MedicalContentGenerator {
  private openai: OpenAI;
  private anthropic: Anthropic;
  private validationEngine: MedicalValidationEngine;
  private culturalAdapter: CulturalAdapter;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    this.validationEngine = new MedicalValidationEngine();
    this.culturalAdapter = new CulturalAdapter();
  }

  /**
   * Gera conteúdo médico personalizado usando LLMs especializados
   */
  async generateContent(request: ContentGenerationRequest): Promise<GeneratedContent> {
    console.log(`🤖 Iniciando geração de conteúdo: ${request.contentType} para ${request.specialty.name}`);

    // 1. Selecionar LLM otimizado baseado no tipo de conteúdo
    const optimalLLM = this.selectOptimalLLM(request);

    // 2. Construir prompt especializado
    const prompt = await this.buildSpecializedPrompt(request);

    // 3. Gerar conteúdo base
    const rawContent = await optimalLLM.generate(prompt);

    // 4. Validar conteúdo médico
    const validationResults = await this.validationEngine.validate({
      content: rawContent,
      specialty: request.specialty,
      guidelines: request.specialty.brazilianGuidelines,
    });

    // 5. Adaptação cultural
    const adaptedContent = await this.culturalAdapter.adapt({
      content: validationResults.validatedContent,
      culturalContext: request.culturalContext,
      language: request.culturalContext.language,
    });

    // 6. Enriquecimento multimodal
    const enrichedContent = await this.enrichWithMultimedia({
      content: adaptedContent,
      type: request.contentType,
      format: request.format,
    });

    // 7. Calcular score de qualidade
    const qualityScore = await this.calculateQualityScore({
      content: enrichedContent,
      validation: validationResults,
      culturalAdaptation: adaptedContent,
    });

    const result: GeneratedContent = {
      id: this.generateContentId(),
      content: enrichedContent,
      metadata: this.generateMetadata(request, validationResults),
      validationResults,
      adaptationTags: adaptedContent.adaptationTags,
      qualityScore,
      generatedAt: new Date(),
    };

    console.log(`✅ Conteúdo gerado com sucesso! Quality Score: ${qualityScore}/10`);
    return result;
  }

  /**
   * Seleciona o LLM otimizado baseado no tipo de conteúdo
   */
  private selectOptimalLLM(request: ContentGenerationRequest): LLMInterface {
    const { contentType, specialty, difficulty } = request;

    // LLM especializado por tipo de conteúdo
    switch (contentType) {
      case 'clinical_case':
        return {
          type: 'claude-4',
          model: 'claude-4-opus',
          temperature: 0.7,
          maxTokens: 4000,
          systemPrompt: this.getClinicalCaseSystemPrompt(specialty),
        };

      case 'question':
        return {
          type: 'gpt-4',
          model: 'gpt-4-turbo',
          temperature: 0.3, // Menor criatividade para questões
          maxTokens: 2000,
          systemPrompt: this.getQuestionSystemPrompt(specialty),
        };

      case 'explanation':
        return {
          type: 'claude-4',
          model: 'claude-4-sonnet',
          temperature: 0.5,
          maxTokens: 3000,
          systemPrompt: this.getExplanationSystemPrompt(specialty),
        };

      case 'simulation':
        return {
          type: 'gpt-4',
          model: 'gpt-4-turbo',
          temperature: 0.8, // Maior criatividade para simulações
          maxTokens: 5000,
          systemPrompt: this.getSimulationSystemPrompt(specialty),
        };

      default:
        throw new Error(`Tipo de conteúdo não suportado: ${contentType}`);
    }
  }

  /**
   * Constrói prompt especializado baseado no tipo de conteúdo
   */
  private async buildSpecializedPrompt(request: ContentGenerationRequest): Promise<string> {
    const basePrompt = this.getBasePrompt(request);

    switch (request.contentType) {
      case 'clinical_case':
        return this.buildClinicalCasePrompt(request, basePrompt);

      case 'question':
        return this.buildQuestionPrompt(request, basePrompt);

      case 'explanation':
        return this.buildExplanationPrompt(request, basePrompt);

      case 'simulation':
        return this.buildSimulationPrompt(request, basePrompt);

      default:
        return basePrompt;
    }
  }

  /**
   * Prompt base comum para todos os tipos de conteúdo
   */
  private getBasePrompt(request: ContentGenerationRequest): string {
    return `
Você é um especialista em educação médica brasileira, altamente qualificado e atualizado com as diretrizes médicas nacionais e internacionais.

**Contexto do Estudante:**
- ID: ${request.studentId}
- Especialidade: ${request.specialty.name}
- Tópico: ${request.topic}
- Dificuldade: ${request.difficulty}
- Objetivos: ${request.learningObjectives.join(', ')}

**Contexto Cultural e Linguístico:**
- Região: ${request.culturalContext.region}
- Idioma: ${request.culturalContext.language}
- Sistema de Saúde: ${request.culturalContext.healthcareSystem}
- Contexto Socioeconômico: ${request.culturalContext.socioeconomicContext}

**Diretrizes Brasileiras:**
${request.specialty.brazilianGuidelines.map(g => `- ${g}`).join('\n')}

**Competências-Chave:**
${request.specialty.keyCompetencies.map(c => `- ${c}`).join('\n')}

`;
  }

  /**
   * Prompt especializado para casos clínicos
   */
  private buildClinicalCasePrompt(request: ContentGenerationRequest, basePrompt: string): string {
    return `${basePrompt}

**INSTRUÇÕES ESPECÍFICAS PARA CASO CLÍNICO:**

Gere um caso clínico interativo e realista para educação médica brasileira:

**Estrutura Obrigatória:**
1. **Apresentação do Paciente**
   - Dados demográficos (idade, sexo, profissão)
   - História clínica relevante
   - Queixa principal detalhada

2. **Exame Físico**
   - Sinais vitais completos
   - Exame físico orientado pela queixa
   - Achados significativos

3. **Exames Complementares**
   - Laboratoriais relevantes
   - Imagens quando aplicável
   - Outros exames conforme necessidade

4. **Raciocínio Clínico**
   - Lista de diagnósticos diferenciais
   - Justificativa para cada diagnóstico
   - Exames necessários para confirmação

5. **Conduta**
   - Tratamento inicial
   - Medicações (considerar lista SUS)
   - Seguimento

6. **Evolução**
   - Resposta ao tratamento
   - Complicações possíveis
   - Prognóstico

**Requisitos Específicos:**
- Baseado em evidências científicas atuais
- Representativo da população brasileira
- Complexidade adequada ao nível: ${request.difficulty}
- Foco nos objetivos: ${request.learningObjectives.join(', ')}
- Linguagem clara e didática
- Incluir pontos de reflexão para o estudante

**Formato de Saída:**
Retorne em formato JSON estruturado para facilitar o processamento e validação.

**Tempo Estimado:** ${request.timeConstraints?.estimatedMinutes || 30} minutos de estudo

Mantenha alta qualidade médica e educacional. O caso deve ser desafiador mas acessível ao nível do estudante.`;
  }

  /**
   * Prompt especializado para questões
   */
  private buildQuestionPrompt(request: ContentGenerationRequest, basePrompt: string): string {
    return `${basePrompt}

**INSTRUÇÕES ESPECÍFICAS PARA QUESTÃO:**

Crie uma questão para ENAMED/residência médica seguindo rigorosamente:

**Estrutura da Questão:**
1. **Stem (Enunciado)**
   - Apresentação clínica clara
   - Contexto brasileiro quando relevante
   - Linguagem precisa e direta

2. **Alternativas (A-E)**
   - Uma alternativa correta
   - Quatro distratores plausíveis
   - Evitar alternativas obviously wrong
   - Formato balanced

3. **Justificativa**
   - Explicação detalhada da resposta correta
   - Referência às diretrizes brasileiras
   - Por que as outras alternativas estão incorretas

4. **Referência**
   - Diretriz ou estudo de base
   - Literatura médica atualizada
   - Nível de evidência

**Nível de Complexidade:** ${request.difficulty}
**Foco:** ${request.learningObjectives.join(', ')}

**Formato de Saída JSON:**
\`\`\`json
{
  "stem": "Questão clínica...",
  "options": {
    "A": "Alternativa correta",
    "B": "Distrator plausível",
    "C": "Distrator plausível",
    "D": "Distrator plausível",
    "E": "Distrator plausível"
  },
  "correct_answer": "A",
  "explanation": "Justificativa detalhada...",
  "reference": "Diretriz ou estudo...",
  "difficulty_analysis": {
    "cognitive_level": "Aplicação/Análise/Síntese",
    "estimated_time": "Tempo para responder",
    "common_mistakes": ["Erro comum 1", "Erro comum 2"]
  },
  "learning_objectives": ["Objetivo 1", "Objetivo 2"],
  "brazilian_guidelines_compliance": true
}
\`\`\`

Garantir alinhamento total com padrões ENAMED 2025-2026.`;
  }

  /**
   * Prompt especializado para explicações
   */
  private buildExplanationPrompt(request: ContentGenerationRequest, basePrompt: string): string {
    return `${basePrompt}

**INSTRUÇÕES ESPECÍFICAS PARA EXPLICAÇÃO:**

Elabore uma explicação educacional detalhada sobre: **${request.topic}**

**Estrutura da Explicação:**
1. **Conceitos Fundamentais**
   - Definições claras
   - Conceitos pré-requisitos
   - Terminologia médica

2. **Mecanismos/Fisiopatologia**
   - Processos biológicos relevantes
   - Relações causa-efeito
   - Interações complexas

3. **Aplicação Clínica**
   - Manifestações práticas
   - Diagnóstico diferencial
   - Implicações terapêuticas

4. **Contexto Brasileiro**
   - Epidemiologia local
   - Diretrizes nacionais (${request.specialty.brazilianGuidelines.join(', ')})
   - Considerações específicas do SUS

5. **Pontos de Reflexão**
   - Questões para autoavaliação
   - Conexões com outros tópicos
   - Aplicações práticas

**Estilo:**
- Linguagem acessível mas cientificamente precisa
- Exemplos práticos brasileiros
- Estrutura lógica e progressiva
- Incluir analogias quando apropriado

**Dificuldade:** ${request.difficulty}
**Objetivos:** ${request.learningObjectives.join(', ')}

**Formato:** Texto estruturado com seções claras e hierarquia visual.`;
  }

  /**
   * Prompt especializado para simulações
   */
  private buildSimulationPrompt(request: ContentGenerationRequest, basePrompt: string): string {
    return `${basePrompt}

**INSTRUÇÕES ESPECÍFICAS PARA SIMULAÇÃO:**

Crie uma simulação interativa para: **${request.topic}**

**Estrutura da Simulação:**
1. **Cenário Inicial**
   - Ambiente médico definido
   - Paciente virtual com perfil completo
   - Contexto clínico específico

2. **Mecânica da Simulação**
   - Ações disponíveis para o estudante
   - Decisões críticas a serem tomadas
   - Consequências das ações

3. **Fluxo de Eventos**
   - Sequência lógica de ações
   - Pontos de decisão
   - Variações baseadas nas escolhas

4. **Sistema de Feedback**
   - Retroalimentação imediata
   - Explicações das consequências
   - Orientações para melhoria

5. **Avaliação Integrada**
   - Critérios de performance
   - Métricas de sucesso
   - Áreas de melhoria identificadas

**Especificações Técnicas:**
- Ambiente: ${this.getSimulationEnvironment(request.specialty)}
- Duração estimada: ${request.timeConstraints?.estimatedMinutes || 45} minutos
- Nível de realismo: Alto
- Interatividade: Múltiplas escolhas e ações livres

**Objetivos de Aprendizado:**
${request.learningObjectives.map(obj => `- ${obj}`).join('\n')}

**Formato:** JSON estruturado com componentes da simulação e lógica de fluxo.

Garantir alta fidelidade educacional e realismo clínico.`;
  }

  /**
   * Enriquecimento multimodal do conteúdo
   */
  private async enrichWithMultimedia(params: {
    content: any;
    type: ContentGenerationRequest['contentType'];
    format: ContentFormat;
  }): Promise<any> {
    console.log(`🎨 Enriquecendo conteúdo com elementos multimodais...`);

    const enriched = { ...params.content };

    // Adicionar elementos visuais quando apropriado
    if (params.format.includes('visual')) {
      enriched.visualElements = await this.generateVisualElements({
        content: params.content,
        type: params.type,
      });
    }

    // Adicionar elementos interativos
    if (params.type === 'clinical_case' || params.type === 'simulation') {
      enriched.interactiveElements = await this.addInteractiveElements(params.content);
    }

    // Adicionar elementos de gamificação
    enriched.gamification = await this.addGamificationElements(params.content);

    // Adicionar metadados educacionais
    enriched.educationalMetadata = this.generateEducationalMetadata(params.content);

    return enriched;
  }

  /**
   * Gera elementos visuais para o conteúdo
   */
  private async generateVisualElements(params: {
    content: any;
    type: ContentGenerationRequest['contentType'];
  }): Promise<VisualElement[]> {
    // Implementação para gerar infográficos, diagramas, etc.
    return [];
  }

  /**
   * Adiciona elementos interativos
   */
  private async addInteractiveElements(content: any): Promise<InteractiveElement[]> {
    // Implementação para adicionar interatividade
    return [];
  }

  /**
   * Adiciona elementos de gamificação
   */
  private async addGamificationElements(content: any): Promise<GamificationElement[]> {
    // Implementação para gamificação
    return [];
  }

  /**
   * Calcula score de qualidade do conteúdo
   */
  private async calculateQualityScore(params: {
    content: any;
    validation: ValidationResults;
    culturalAdaptation: any;
  }): Promise<number> {
    let score = 5.0; // Score base

    // Fator de validação médica (peso: 40%)
    score += params.validation.accuracyScore * 2.0;

    // Fator de alinhamento com diretrizes (peso: 25%)
    score += params.validation.guidelineAlignment * 1.25;

    // Fator de adaptação cultural (peso: 20%)
    score += params.culturalAdaptation.qualityScore * 1.0;

    // Fator de completude educacional (peso: 15%)
    score += this.assessEducationalCompleteness(params.content) * 0.75;

    return Math.min(Math.max(score, 0), 10);
  }

  /**
   * Avalia completude educacional do conteúdo
   */
  private assessEducationalCompleteness(content: any): number {
    // Implementação para avaliar completude educacional
    return 8.5;
  }

  /**
   * Gera metadados do conteúdo
   */
  private generateMetadata(request: ContentGenerationRequest, validation: ValidationResults): ContentMetadata {
    return {
      generatedFor: request.studentId,
      contentType: request.contentType,
      specialty: request.specialty.name,
      topic: request.topic,
      difficulty: request.difficulty,
      generationTimestamp: new Date(),
      llmUsed: 'claude-4-opus', // ou gpt-4-turbo
      validationStatus: validation.overallStatus,
      culturalAdaptations: request.culturalContext,
      estimatedStudyTime: request.timeConstraints?.estimatedMinutes || 30,
      learningObjectives: request.learningObjectives,
    };
  }

  /**
   * Gera ID único para o conteúdo
   */
  private generateContentId(): string {
    return `content_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Retorna prompt de sistema para casos clínicos
   */
  private getClinicalCaseSystemPrompt(specialty: MedicalSpecialty): string {
    return `Você é um cardiologista brasileiro especialista em educação médica, com experiência em desenvolvimento de casos clínicos para ensino médico. Você domina as diretrizes brasileiras (SBC, SBH, SBA) e as melhores práticas de ensino médico baseado em casos.`;
  }

  /**
   * Retorna prompt de sistema para questões
   */
  private getQuestionSystemPrompt(specialty: MedicalSpecialty): string {
    return `Você é um especialista em criação de questões para ENAMED e residência médica, com profundo conhecimento das diretrizes brasileiras e padrões de avaliação médica. Você cria questões que testam raciocínio clínico e aplicação prática de conhecimentos.`;
  }

  /**
   * Retorna prompt de sistema para explicações
   */
  private getExplanationSystemPrompt(specialty: MedicalSpecialty): string {
    return `Você é um educador médico especializado em explicar conceitos complexos de forma clara e didática, adaptando-se ao nível do estudante e integrando evidências científicas com contexto prático brasileiro.`;
  }

  /**
   * Retorna prompt de sistema para simulações
   */
  private getSimulationSystemPrompt(specialty: MedicalSpecialty): string {
    return `Você é um especialista em simulações médicas educacionais, criando cenários realistas e interativos que testam tomada de decisão clínica e aplicação prática de conhecimentos médicos em ambiente controlado e seguro.`;
  }

  /**
   * Retorna ambiente de simulação apropriado
   */
  private getSimulationEnvironment(specialty: MedicalSpecialty): string {
    const environments = {
      cardiologia: 'UTI Cardiológica / Emergência Cardiológica',
      neurologia: 'UTI Neurológica / Emergência Neurológica',
      pediatria: 'UTI Pediátrica / Emergência Pediátrica',
      clínica_geral: 'Ambulatório / enfermaria',
      cirurgia: 'Centro Cirúrgico / UTI Pós-operatória',
    };

    return environments[specialty.name.toLowerCase()] || 'Ambiente clínico geral';
  }
}

// Interfaces auxiliares
interface LLMInterface {
  type: 'gpt-4' | 'claude-4';
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
}

interface ContentFormat {
  type: 'text' | 'interactive' | 'visual' | 'multimodal';
  includes: string[];
}

interface TimeConstraints {
  estimatedMinutes: number;
  maxMinutes?: number;
  interactiveElements?: boolean;
}

interface CulturalSensitivity {
  aspect: string;
  sensitivity: 'high' | 'medium' | 'low';
  adaptationRequired: boolean;
}

interface VisualElement {
  type: 'infographic' | 'diagram' | 'image' | 'chart';
  description: string;
  url?: string;
  data?: any;
}

interface InteractiveElement {
  type: 'quiz' | 'decision_point' | 'drag_drop' | 'simulation';
  description: string;
  configuration: any;
}

interface GamificationElement {
  type: 'badge' | 'points' | 'challenge' | 'achievement';
  description: string;
  trigger: string;
  reward: any;
}

interface ContentMetadata {
  generatedFor: string;
  contentType: string;
  specialty: string;
  topic: string;
  difficulty: string;
  generationTimestamp: Date;
  llmUsed: string;
  validationStatus: string;
  culturalAdaptations: CulturalContext;
  estimatedStudyTime: number;
  learningObjectives: string[];
}

interface ValidationResults {
  overallStatus: 'passed' | 'passed_with_warnings' | 'failed';
  accuracyScore: number;
  guidelineAlignment: number;
  validatedContent: any;
  warnings: string[];
  errors: string[];
}

interface AdaptationTag {
  type: 'cultural' | 'linguistic' | 'regional' | 'contextual';
  description: string;
  applied: boolean;
}

export default MedicalContentGenerator;