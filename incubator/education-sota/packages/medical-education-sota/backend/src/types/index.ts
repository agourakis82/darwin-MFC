/**
 * Tipos TypeScript - Sistema de Educação Médica SOTA
 * Definições State-of-the-Art para tipagem forte
 */

export * from './auth.types';
export * from './learning.types';
export * from './content.types';
export * from './assessment.types';
export * from './analytics.types';
export * from './ai.types';
export * from './institution.types';
export * from './federated.types';
export * from './blockchain.types';
export * from './common.types';

// =============================================================================
// TIPOS BÁSICOS
// =============================================================================

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: APIError;
  meta?: ResponseMeta;
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
  requestId?: string;
}

export interface ResponseMeta {
  total?: number;
  page?: number;
  limit?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
  executionTime?: number;
  version?: string;
}

// =============================================================================
// PAGINAÇÃO E FILTROS
// =============================================================================

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  [key: string]: any;
}

export interface SearchParams extends PaginationParams {
  query?: string;
  filters?: FilterParams;
}

// =============================================================================
// CONFIGURAÇÕES DA APLICAÇÃO
// =============================================================================

export interface AppConfig {
  // Servidor
  port: number;
  environment: 'development' | 'staging' | 'production';
  nodeEnv: string;

  // Banco de dados
  database: {
    url: string;
    pool: {
      min: number;
      max: number;
    };
  };

  // Redis
  redis: {
    host: string;
    port: number;
    password?: string;
    db: number;
  };

  // MongoDB
  mongodb: {
    url: string;
    options: Record<string, any>;
  };

  // JWT
  jwt: {
    secret: string;
    refreshSecret: string;
    accessExpiry: string;
    refreshExpiry: string;
    issuer: string;
    audience: string;
  };

  // IA/LLM APIs
  ai: {
    openai: {
      apiKey: string;
      model: string;
      maxTokens: number;
      temperature: number;
    };
    anthropic: {
      apiKey: string;
      model: string;
      maxTokens: number;
    };
  };

  // Blockchain
  blockchain: {
    providerUrl: string;
    privateKey: string;
    network: 'mainnet' | 'testnet' | 'polygon';
    contractAddress?: string;
  };

  // Federated Learning
  federated: {
    enabled: boolean;
    privacyBudget: number;
    aggregationMethod: string;
    minParticipants: number;
  };

  // Segurança
  security: {
    bcryptRounds: number;
    rateLimit: {
      windowMs: number;
      max: number;
    };
    cors: {
      origin: string[];
      credentials: boolean;
    };
  };

  // Monitoring
  monitoring: {
    prometheus: boolean;
    grafana: boolean;
    elasticsearch: boolean;
  };

  // LMS Integration
  lms: {
    moodle: {
      baseUrl: string;
      token: string;
    };
    canvas: {
      baseUrl: string;
      clientId: string;
      clientSecret: string;
    };
  };

  // Email
  email: {
    provider: 'sendgrid' | 'ses' | 'smtp';
    from: string;
    templates: Record<string, string>;
  };

  // File Storage
  storage: {
    provider: 's3' | 'gcs' | 'local';
    bucket: string;
    region: string;
    accessKey?: string;
    secretKey?: string;
  };
}

// =============================================================================
// CONTEXTO DE REQUISIÇÃO
// =============================================================================

export interface RequestContext {
  requestId: string;
  userId?: string;
  sessionId?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface AuthenticatedRequest<T = any> extends Request {
  user: UserSession;
  context: RequestContext;
  body: T;
}

export interface ValidatedRequest<T = any> extends AuthenticatedRequest<T> {
  validation: {
    isValid: boolean;
    errors: ValidationError[];
  };
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: any;
}

// =============================================================================
// MÉTRICAS E MONITORAMENTO
// =============================================================================

export interface PerformanceMetrics {
  responseTime: number;
  cpuUsage: number;
  memoryUsage: number;
  databaseQueries: number;
  cacheHits: number;
  cacheMisses: number;
  timestamp: string;
}

export interface BusinessMetrics {
  activeUsers: number;
  learningSessions: number;
  contentViews: number;
  assessmentsCompleted: number;
  averageEngagementScore: number;
  knowledgeRetentionRate: number;
  timestamp: string;
}

export interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  services: {
    database: ServiceStatus;
    redis: ServiceStatus;
    mongodb: ServiceStatus;
    ai: ServiceStatus;
    blockchain: ServiceStatus;
  };
  uptime: number;
}

export interface ServiceStatus {
  status: 'up' | 'down' | 'degraded';
  responseTime?: number;
  error?: string;
  lastCheck: string;
}

// =============================================================================
// UTILITÁRIOS DE TIPOS
// =============================================================================

/**
 * Tipo utilitário para tipar objetos com chaves opcionais
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Tipo utilitário para tipar objetos com chaves obrigatórias
 */
export type Required<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Tipo utilitário para remover propriedades undefined
 */
export type RemoveUndefined<T> = {
  [K in keyof T as T[K] extends undefined ? never : K]: T[K]
};

/**
 * Tipo utilitário para validação de tipos em runtime
 */
export type RuntimeType<T> = {
  [K in keyof T]: (value: any) => value is T[K];
};

/**
 * Tipo utilitário para serialização JSON segura
 */
export type JSONSerializable =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JSONSerializable }
  | JSONSerializable[];

// =============================================================================
// CONSTANTES E ENUMS
// =============================================================================

export const CONSTANTS = {
  // Configurações de autenticação
  AUTH: {
    JWT_ACCESS_EXPIRY: '24h',
    JWT_REFRESH_EXPIRY: '7d',
    SESSION_EXPIRY: '24h',
    MAX_LOGIN_ATTEMPTS: 5,
    LOGIN_LOCKOUT_TIME: 15 * 60 * 1000, // 15 minutos
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_REQUIREMENTS: {
      uppercase: true,
      lowercase: true,
      numbers: true,
      special: true,
      minLength: 8
    }
  },

  // Configurações de rate limiting
  RATE_LIMIT: {
    AUTH: {
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 5
    },
    API: {
      windowMs: 15 * 60 * 1000,
      max: 100
    },
    AI_REQUESTS: {
      windowMs: 60 * 1000, // 1 minuto
      max: 10
    }
  },

  // Configurações de paginação
  PAGINATION: {
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
    MIN_LIMIT: 1
  },

  // Configurações de upload
  UPLOAD: {
    MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
    ALLOWED_TYPES: {
      IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      VIDEOS: ['video/mp4', 'video/webm', 'video/quicktime'],
      DOCUMENTS: ['application/pdf', 'text/plain', 'application/msword'],
      AUDIO: ['audio/mpeg', 'audio/wav', 'audio/ogg']
    }
  },

  // Configurações de cache
  CACHE: {
    DEFAULT_TTL: 3600, // 1 hora
    USER_SESSION_TTL: 86400, // 24 horas
    CONTENT_TTL: 7200, // 2 horas
    ANALYTICS_TTL: 300, // 5 minutos
  },

  // Configurações de IA
  AI: {
    MAX_RETRIES: 3,
    REQUEST_TIMEOUT: 30000, // 30 segundos
    MODEL_CONFIDENCE_THRESHOLD: 0.8,
    CONTENT_VALIDATION_THRESHOLD: 0.95
  },

  // Configurações de segurança
  SECURITY: {
    BCRYPT_ROUNDS: 12,
    SESSION_COOKIE_NAME: 'medical-edu-session',
    CSRF_COOKIE_NAME: 'csrf-token',
    HASH_ALGORITHM: 'sha256',
    ENCRYPTION_ALGORITHM: 'aes-256-gcm'
  }
} as const;

// =============================================================================
// HELPERS E UTILITÁRIOS
// =============================================================================

/**
 * Helper para criar responses padronizados
 */
export class ResponseBuilder<T = any> {
  private response: APIResponse<T> = {
    success: true,
    data: undefined,
    error: undefined,
    meta: {}
  };

  static success<T>(data?: T, meta?: ResponseMeta): APIResponse<T> {
    return {
      success: true,
      data,
      meta
    };
  }

  static error(
    code: string,
    message: string,
    details?: Record<string, any>
  ): APIResponse {
    return {
      success: false,
      error: {
        code,
        message,
        details,
        timestamp: new Date().toISOString()
      }
    };
  }

  static paginated<T>(
    data: T[],
    total: number,
    page: number,
    limit: number
  ): APIResponse<T[]> {
    return {
      success: true,
      data,
      meta: {
        total,
        page,
        limit,
        hasNext: page * limit < total,
        hasPrev: page > 1,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}

/**
 * Helper para validação de dados
 */
export class ValidationHelper {
  static isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isStrongPassword(password: string): boolean {
    const requirements = CONSTANTS.AUTH.PASSWORD_REQUIREMENTS;

    if (password.length < requirements.minLength) return false;
    if (requirements.uppercase && !/[A-Z]/.test(password)) return false;
    if (requirements.lowercase && !/[a-z]/.test(password)) return false;
    if (requirements.numbers && !/\d/.test(password)) return false;
    if (requirements.special && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return false;

    return true;
  }

  static isValidCPF(cpf: string): boolean {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cpf.charAt(9))) return false;

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  static sanitizeHtml(html: string): string {
    // Implementar sanitização básica
    return html
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }
}

export default {
  ResponseBuilder,
  ValidationHelper,
  CONSTANTS
};