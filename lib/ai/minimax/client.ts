/**
 * Cliente Minimax AI para Darwin-MFC/Education
 * Integração com API Minimax para geração de conteúdo educacional
 */

/**
 * Tipos para mensagens no chat.
 */
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Opções para configuração do chat.
 */
export interface ChatOptions {
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

/**
 * Resposta do chat com uso de tokens.
 */
export interface ChatResponse {
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
  };
}

/**
 * Pergunta gerada com opções e resposta correta.
 */
export interface Question {
  id: string;
  text: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
}

/**
 * Explicação de conceito com resumo e detalhes.
 */
export interface Explanation {
  summary: string;
  details: string[];
  examples?: string[];
}

/**
 * Cache de respostas com suporte a TTL e eviction LRU.
 */
export class ResponseCache {
  private cache: Map<string, { value: unknown; timestamp: number }> = new Map();
  private maxSize: number;
  private ttl: number; // em milissegundos

  /**
   * Construtor do cache.
   * @param maxSize Tamanho máximo do cache (padrão: 100)
   * @param ttlMinutes Tempo de vida em minutos (padrão: 5)
   */
  constructor(maxSize: number = 100, ttlMinutes: number = 5) {
    this.maxSize = maxSize;
    this.ttl = ttlMinutes * 60 * 1000;
  }

  /**
   * Obtém um valor do cache se ainda válido.
   * @param key Chave do cache
   * @returns O valor ou undefined
   */
  get<T>(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry || Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return undefined;
    }
    // Move para o final (LRU)
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value as T;
  }

  /**
   * Define um valor no cache.
   * @param key Chave do cache
   * @param value Valor a ser armazenado
   */
  set(key: string, value: unknown): void {
    if (this.cache.size >= this.maxSize) {
      // Remove o primeiro item (LRU aproximado)
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }
    this.cache.set(key, { value, timestamp: Date.now() });
  }

  /**
   * Limpa o cache
   */
  clear(): void {
    this.cache.clear();
  }
}

/**
 * Função simples de hash para chaves de cache.
 * @param input Entrada para hash (string ou objeto)
 * @returns String hash
 */
function simpleHash(input: string | object): string {
  const str = typeof input === 'string' ? input : JSON.stringify(input);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Converte para 32-bit inteiro
  }
  return Math.abs(hash).toString(36);
}

/**
 * Limitador de taxa com janela deslizante.
 */
export class RateLimiter {
  private requests: number[] = []; // Timestamps das requisições
  private requestsPerMinute: number;

  /**
   * Construtor do limitador.
   * @param rpm Requisições por minuto (padrão: 60)
   */
  constructor(rpm: number = 60) {
    this.requestsPerMinute = rpm;
  }

  /**
   * Verifica se pode fazer uma requisição agora.
   * @returns true se permitido, false caso contrário
   */
  canMakeRequest(): boolean {
    const now = Date.now();
    const minuteAgo = now - 60 * 1000;

    // Remove requisições antigas
    while (this.requests.length > 0 && this.requests[0] < minuteAgo) {
      this.requests.shift();
    }

    if (this.requests.length < this.requestsPerMinute) {
      this.requests.push(now);
      return true;
    }
    return false;
  }

  /**
   * Aguarda até poder fazer a requisição (bloqueante).
   * @returns Promise que resolve quando permitido
   */
  async waitForPermission(): Promise<void> {
    while (!this.canMakeRequest()) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Verifica a cada segundo
    }
  }

  /**
   * Retorna o número de requisições restantes
   */
  getRemaining(): number {
    const now = Date.now();
    const minuteAgo = now - 60 * 1000;
    const recentRequests = this.requests.filter(t => t >= minuteAgo);
    return Math.max(0, this.requestsPerMinute - recentRequests.length);
  }
}

/**
 * Cliente principal para integração com API Minimax.
 */
export class MinimaxClient {
  private apiKey: string;
  private baseUrl: string;
  private cache: ResponseCache;
  private limiter: RateLimiter;

  /**
   * Construtor do cliente.
   * @param apiKey Chave da API
   * @param baseUrl URL base (padrão: https://api.minimax.chat)
   * @param cacheSize Tamanho do cache (opcional)
   * @param ttlMinutes TTL em minutos (opcional)
   * @param rpm Requisições por minuto (opcional)
   */
  constructor(
    apiKey: string,
    baseUrl: string = 'https://api.minimax.chat',
    cacheSize: number = 100,
    ttlMinutes: number = 5,
    rpm: number = 60
  ) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    this.cache = new ResponseCache(cacheSize, ttlMinutes);
    this.limiter = new RateLimiter(rpm);
  }

  /**
   * Realiza uma chamada de chat com a API.
   * @param messages Lista de mensagens
   * @param options Opções do chat
   * @returns Resposta do chat
   * @throws Erro em caso de falha na requisição
   */
  async chat(messages: Message[], options?: ChatOptions): Promise<ChatResponse> {
    const key = simpleHash({ messages, options });
    const cached = this.cache.get<ChatResponse>(key);
    if (cached) {
      return cached;
    }

    await this.limiter.waitForPermission();

    const payload = {
      messages,
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens ?? 1000,
      model: options?.model ?? 'abab6.5s-chat',
    };

    let retries = 3;
    while (retries > 0) {
      try {
        const response = await fetch(`${this.baseUrl}/v1/text/chatcompletion_v2`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const result: ChatResponse = {
          content: data.choices?.[0]?.message?.content || data.reply || '',
          usage: {
            promptTokens: data.usage?.prompt_tokens || 0,
            completionTokens: data.usage?.completion_tokens || 0,
          },
        };

        this.cache.set(key, result);
        return result;
      } catch (error) {
        retries--;
        if (retries === 0) {
          throw new Error(`Falha na requisição após 3 tentativas: ${error}`);
        }
        // Backoff exponencial simples
        await new Promise(resolve => setTimeout(resolve, 1000 * (4 - retries)));
      }
    }

    throw new Error('Tentativas esgotadas');
  }

  /**
   * Gera perguntas baseadas em um contexto.
   * @param context Contexto para gerar perguntas
   * @param count Número de perguntas
   * @returns Lista de perguntas
   */
  async generateQuestions(context: string, count: number): Promise<Question[]> {
    const systemPrompt = `Você é um assistente que gera perguntas de múltipla escolha para educação médica.
Baseado no contexto fornecido, gere exatamente ${count} perguntas.
Responda APENAS em JSON válido no formato:
[{"id": "1", "text": "pergunta", "options": ["a)", "b)", "c)", "d)"], "correctAnswer": "a)", "explanation": "explicação"}]`;

    const messages: Message[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Contexto: ${context}` },
    ];

    const response = await this.chat(messages, { temperature: 0.8 });
    try {
      // Tenta extrair JSON da resposta
      const jsonMatch = response.content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('JSON não encontrado na resposta');
      }
      const questions: Question[] = JSON.parse(jsonMatch[0]);
      return questions.map((q, i) => ({ ...q, id: q.id || (i + 1).toString() }));
    } catch (error) {
      throw new Error('Falha ao parsear resposta de perguntas: ' + response.content.slice(0, 200));
    }
  }

  /**
   * Explica um conceito em nível especificado.
   * @param concept Conceito a explicar
   * @param level Nível de explicação
   * @returns Explicação estruturada
   */
  async explainConcept(concept: string, level: 'basic' | 'intermediate' | 'advanced'): Promise<Explanation> {
    const levelDesc = level === 'basic' ? 'básico (para estudantes iniciantes)'
      : level === 'intermediate' ? 'intermediário (para residentes)'
      : 'avançado (para especialistas)';

    const systemPrompt = `Você é um professor de medicina. Explique o conceito "${concept}" no nível ${levelDesc}.
Responda em JSON: {"summary": "resumo em 1-2 frases", "details": ["detalhe 1", "detalhe 2"], "examples": ["exemplo prático"]}`;

    const messages: Message[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: 'Explique o conceito.' },
    ];

    const response = await this.chat(messages);
    try {
      const jsonMatch = response.content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return { summary: response.content.slice(0, 200), details: [response.content], examples: [] };
      }
      const explanation: Explanation = JSON.parse(jsonMatch[0]);
      if (!explanation.details || !Array.isArray(explanation.details)) {
        explanation.details = [response.content];
      }
      return explanation;
    } catch {
      return { summary: response.content.slice(0, 200), details: [response.content], examples: [] };
    }
  }

  /**
   * Resume um texto.
   * @param text Texto a resumir
   * @param maxLength Comprimento máximo em palavras (opcional)
   * @returns Resumo como string
   */
  async summarize(text: string, maxLength?: number): Promise<string> {
    const maxWords = maxLength || 100;
    const systemPrompt = `Você é um resumidor de textos médicos. Resuma o texto fornecido em no máximo ${maxWords} palavras, mantendo as informações clínicas essenciais. Responda apenas com o resumo.`;

    const messages: Message[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: text },
    ];

    const response = await this.chat(messages, { maxTokens: maxLength ? maxLength * 4 : undefined });
    return response.content.trim();
  }

  /**
   * Retorna estatísticas do cliente
   */
  getStats(): { remainingRequests: number } {
    return {
      remainingRequests: this.limiter.getRemaining()
    };
  }
}

// Export singleton instance (deve ser configurado com API key)
let defaultClient: MinimaxClient | null = null;

export function getMinimaxClient(): MinimaxClient {
  if (!defaultClient) {
    const apiKey = process.env.MINIMAX_API_KEY || process.env.NEXT_PUBLIC_MINIMAX_API_KEY;
    if (!apiKey) {
      throw new Error('MINIMAX_API_KEY não configurada');
    }
    defaultClient = new MinimaxClient(apiKey);
  }
  return defaultClient;
}

export function initMinimaxClient(apiKey: string, options?: { baseUrl?: string; cacheSize?: number; ttlMinutes?: number; rpm?: number }): MinimaxClient {
  defaultClient = new MinimaxClient(
    apiKey,
    options?.baseUrl,
    options?.cacheSize,
    options?.ttlMinutes,
    options?.rpm
  );
  return defaultClient;
}
