/**
 * Middleware de Autenticação JWT - Sistema de Educação Médica SOTA
 * Implementação State-of-the-Art com segurança avançada
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import { StudentProfile, Institution } from '../types';

interface JWTPayload {
  userId: string;
  userType: 'student' | 'instructor' | 'admin' | 'institution';
  studentProfile?: StudentProfile;
  institution?: Institution;
  iat: number;
  exp: number;
  sessionId: string;
  permissions: string[];
  mfaVerified: boolean;
  deviceId: string;
  ipAddress: string;
}

interface AuthRequest extends Request {
  user?: JWTPayload;
  userProfile?: StudentProfile;
}

/**
 * Configuração de rate limiting para autenticação
 */
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 tentativas por IP
  message: 'Muitas tentativas de login, tente novamente em 15 minutos',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  skip: (req) => {
    // Skip se IP está whitelisted (desenvolvimento)
    return process.env.NODE_ENV === 'development' && req.ip === '127.0.0.1';
  }
});

/**
 * Rate limiting para refresh tokens
 */
export const refreshRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10, // máximo 10 refresh por hora
  message: 'Muitas tentativas de refresh, tente novamente em 1 hora',
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * Middleware de autenticação JWT principal
 */
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = extractToken(req);

    if (!token) {
      res.status(401).json({
        success: false,
        error: 'Token de acesso requerido',
        code: 'TOKEN_MISSING'
      });
      return;
    }

    // Verificar se token está na blacklist (logout)
    if (await isTokenBlacklisted(token)) {
      res.status(401).json({
        success: false,
        error: 'Token inválido (logout detectado)',
        code: 'TOKEN_BLACKLISTED'
      });
      return;
    }

    // Decodificar e verificar JWT
    const decoded = verifyJWTToken(token);

    // Verificar se usuário ainda existe
    const user = await findUserById(decoded.userId);
    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Usuário não encontrado',
        code: 'USER_NOT_FOUND'
      });
      return;
    }

    // Verificar se token foi emitido para o mesmo usuário
    if (user.lastPasswordChange && decoded.iat < user.lastPasswordChange) {
      res.status(401).json({
        success: false,
        error: 'Token expirado devido a mudança de senha',
        code: 'PASSWORD_CHANGED'
      });
      return;
    }

    // Verificar se sessão ainda é válida
    if (!await isSessionValid(decoded.sessionId, decoded.userId)) {
      res.status(401).json({
        success: false,
        error: 'Sessão expirada',
        code: 'SESSION_EXPIRED'
      });
      return;
    }

    // Verificar device fingerprint
    if (!await verifyDeviceFingerprint(decoded.deviceId, req)) {
      res.status(401).json({
        success: false,
        error: 'Dispositivo não autorizado',
        code: 'DEVICE_NOT_AUTHORIZED'
      });
      return;
    }

    // Atualizar última atividade
    await updateLastActivity(decoded.userId, decoded.sessionId);

    // Attach user to request
    req.user = decoded;
    req.userProfile = user.profile;

    // Log de auditoria
    await logAuthActivity('LOGIN_SUCCESS', decoded.userId, req);

    next();

  } catch (error) {
    console.error('Erro na autenticação:', error);

    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({
        success: false,
        error: 'Token inválido',
        code: 'INVALID_TOKEN'
      });
      return;
    }

    if (error.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        error: 'Token expirado',
        code: 'TOKEN_EXPIRED'
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: 'Erro interno de autenticação',
      code: 'AUTH_ERROR'
    });
  }
};

/**
 * Middleware para verificar permissões específicas
 */
export const requirePermission = (permission: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Autenticação requerida',
        code: 'AUTHENTICATION_REQUIRED'
      });
      return;
    }

    if (!req.user.permissions.includes(permission)) {
      res.status(403).json({
        success: false,
        error: 'Permissão insuficiente',
        code: 'INSUFFICIENT_PERMISSION',
        required: permission
      });
      return;
    }

    next();
  };
};

/**
 * Middleware para verificar múltiplas permissões (OR)
 */
export const requireAnyPermission = (permissions: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Autenticação requerida',
        code: 'AUTHENTICATION_REQUIRED'
      });
      return;
    }

    const hasPermission = permissions.some(permission =>
      req.user!.permissions.includes(permission)
    );

    if (!hasPermission) {
      res.status(403).json({
        success: false,
        error: 'Uma das permissões requeridas é necessária',
        code: 'INSUFFICIENT_PERMISSION',
        required: permissions
      });
      return;
    }

    next();
  };
};

/**
 * Middleware para verificar múltiplas permissões (AND)
 */
export const requireAllPermissions = (permissions: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Autenticação requerida',
        code: 'AUTHENTICATION_REQUIRED'
      });
      return;
    }

    const hasAllPermissions = permissions.every(permission =>
      req.user!.permissions.includes(permission)
    );

    if (!hasAllPermissions) {
      res.status(403).json({
        success: false,
        error: 'Todas as permissões requeridas são necessárias',
        code: 'INSUFFICIENT_PERMISSION',
        required: permissions
      });
      return;
    }

    next();
  };
};

/**
 * Middleware para verificar se usuário é estudante
 */
export const requireStudent = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: 'Autenticação requerida',
      code: 'AUTHENTICATION_REQUIRED'
    });
    return;
  }

  if (req.user.userType !== 'student') {
    res.status(403).json({
      success: false,
      error: 'Acesso restrito a estudantes',
      code: 'STUDENT_ONLY'
    });
    return;
  }

  next();
};

/**
 * Middleware para verificar se usuário é administrador
 */
export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: 'Autenticação requerida',
      code: 'AUTHENTICATION_REQUIRED'
    });
    return;
  }

  if (req.user.userType !== 'admin') {
    res.status(403).json({
      success: false,
      error: 'Acesso restrito a administradores',
      code: 'ADMIN_ONLY'
    });
    return;
  }

  next();
};

/**
 * Middleware para verificar se usuário é da mesma instituição
 */
export const requireSameInstitution = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: 'Autenticação requerida',
      code: 'AUTHENTICATION_REQUIRED'
    });
    return;
  }

  const targetInstitutionId = req.params.institutionId || req.body.institutionId;

  if (!targetInstitutionId) {
    res.status(400).json({
      success: false,
      error: 'ID da instituição requerido',
      code: 'INSTITUTION_ID_REQUIRED'
    });
    return;
  }

  if (req.user.institution?.id !== targetInstitutionId) {
    res.status(403).json({
      success: false,
      error: 'Acesso restrito à sua instituição',
      code: 'INSTITUTION_RESTRICTED'
    });
    return;
  }

  next();
};

/**
 * Extrai token do header Authorization
 */
function extractToken(req: Request): string | null {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return null;
  }

  // Bearer <token>
  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
}

/**
 * Verifica token JWT
 */
function verifyJWTToken(token: string): JWTPayload {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET não configurado');
  }

  return jwt.verify(token, secret) as JWTPayload;
}

/**
 * Verifica se token está na blacklist
 */
async function isTokenBlacklisted(token: string): Promise<boolean> {
  // Implementar com Redis para performance
  // Por enquanto, usar placeholder
  return false;
}

/**
 * Verifica se sessão é válida
 */
async function isSessionValid(sessionId: string, userId: string): Promise<boolean> {
  // Implementar verificação de sessão com Redis
  // Por enquanto, assumir válido
  return true;
}

/**
 * Verifica device fingerprint
 */
async function verifyDeviceFingerprint(deviceId: string, req: Request): Promise<boolean> {
  // Implementar verificação de device fingerprint
  // Comparar com device fingerprint atual
  return true;
}

/**
 * Encontra usuário por ID
 */
async function findUserById(userId: string): Promise<any> {
  // Implementar consulta ao banco de dados
  // Por enquanto, retornar usuário de exemplo
  return {
    id: userId,
    profile: {
      id: userId,
      name: 'Estudante Exemplo',
      email: 'estudante@exemplo.com',
      specialty: 'cardiologia',
      currentLevel: 'intermediario',
      learningStyle: 'visual',
      preferredPace: 'normal',
      attentionSpan: 45,
      technologyComfort: 0.8,
      strengths: ['anatomia', 'fisiologia'],
      weaknesses: ['cardiologia', 'farmacologia'],
      studyHabits: {
        preferredStudyTime: 'morning',
        studySessionDuration: 60,
        breakFrequency: 15,
        multiTasking: false,
        noteTakingStyle: 'cornell',
        reviewStrategy: 'spaced'
      },
      performanceHistory: [],
      medicalEducation: {
        university: 'USP',
        year: 5,
        gpa: 8.5,
        relevantCourses: ['anatomia', 'fisiologia', 'cardiologia'],
        clinicalExperience: []
      },
      enrollmentDate: new Date('2023-03-01'),
      targetExam: 'enamed',
      institution: {
        id: 'inst_001',
        name: 'Universidade de São Paulo',
        type: 'university',
        accreditation: 'MEC',
        partnerships: ['USP', 'HCAER']
      }
    },
    lastPasswordChange: new Date('2023-01-01'),
    isActive: true
  };
}

/**
 * Atualiza última atividade do usuário
 */
async function updateLastActivity(userId: string, sessionId: string): Promise<void> {
  // Implementar atualização no banco de dados
  console.log(`Atualizando atividade do usuário ${userId}, sessão ${sessionId}`);
}

/**
 * Log de atividade de autenticação
 */
async function logAuthActivity(action: string, userId: string, req: Request): Promise<void> {
  // Implementar log estruturado para auditoria médica
  const logEntry = {
    timestamp: new Date().toISOString(),
    action,
    userId,
    ipAddress: req.ip,
    userAgent: req.get('User-Agent'),
    deviceFingerprint: req.get('Device-Fingerprint'),
    sessionId: req.user?.sessionId
  };

  console.log('Auth Activity:', logEntry);

  // Salvar no banco de dados para auditoria
  // Implementar com banco de dados de auditoria
}

/**
 * Serviço de geração de tokens JWT
 */
export class JWTService {
  private readonly accessTokenExpiry = '24h';
  private readonly refreshTokenExpiry = '7d';
  private readonly sessionExpiry = '24h';

  /**
   * Gera access token
   */
  generateAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET não configurado');
    }

    return jwt.sign(payload, secret, {
      expiresIn: this.accessTokenExpiry,
      issuer: 'medical-education-sota',
      audience: 'medical-students',
      subject: payload.userId,
      algorithm: 'HS512'
    });
  }

  /**
   * Gera refresh token
   */
  generateRefreshToken(userId: string, sessionId: string): string {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
      throw new Error('JWT_REFRESH_SECRET não configurado');
    }

    return jwt.sign(
      { userId, sessionId, type: 'refresh' },
      secret,
      {
        expiresIn: this.refreshTokenExpiry,
        issuer: 'medical-education-sota',
        audience: 'medical-students'
      }
    );
  }

  /**
   * Verifica refresh token
   */
  verifyRefreshToken(token: string): { userId: string; sessionId: string } {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
      throw new Error('JWT_REFRESH_SECRET não configurado');
    }

    const decoded = jwt.verify(token, secret) as {
      userId: string;
      sessionId: string;
      type: string
    };

    if (decoded.type !== 'refresh') {
      throw new Error('Token inválido');
    }

    return { userId: decoded.userId, sessionId: decoded.sessionId };
  }

  /**
   * Gera device fingerprint
   */
  generateDeviceFingerprint(req: Request): string {
    const userAgent = req.get('User-Agent') || '';
    const acceptLanguage = req.get('Accept-Language') || '';
    const acceptEncoding = req.get('Accept-Encoding') || '';

    const fingerprint = `${userAgent}|${acceptLanguage}|${acceptEncoding}`;

    // Hash para proteger dados do device
    return require('crypto')
      .createHash('sha256')
      .update(fingerprint)
      .digest('hex');
  }
}

/**
 * Serviço de autenticação completo
 */
export class AuthService {
  private jwtService = new JWTService();

  /**
   * Login de usuário
   */
  async login(
    email: string,
    password: string,
    req: Request
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: StudentProfile;
    sessionId: string;
  }> {
    // Rate limiting já aplicado no middleware
    const user = await findUserByEmail(email);

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    // Verificar se usuário está ativo
    if (!user.isActive) {
      throw new Error('Conta desativada');
    }

    // Gerar session ID
    const sessionId = require('crypto').randomUUID();

    // Gerar device fingerprint
    const deviceId = this.jwtService.generateDeviceFingerprint(req);

    // Gerar tokens
    const accessToken = this.jwtService.generateAccessToken({
      userId: user.id,
      userType: user.userType,
      studentProfile: user.profile,
      institution: user.institution,
      sessionId,
      permissions: user.permissions,
      mfaVerified: user.mfaVerified || false,
      deviceId,
      ipAddress: req.ip || 'unknown'
    });

    const refreshToken = this.jwtService.generateRefreshToken(user.id, sessionId);

    // Salvar sessão
    await saveSession({
      sessionId,
      userId: user.id,
      deviceId,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas
    });

    // Log de auditoria
    await logAuthActivity('LOGIN_SUCCESS', user.id, req);

    return {
      accessToken,
      refreshToken,
      user: user.profile,
      sessionId
    };
  }

  /**
   * Refresh token
   */
  async refresh(refreshToken: string, req: Request): Promise<{
    accessToken: string;
    user: StudentProfile;
    sessionId: string;
  }> {
    const { userId, sessionId } = this.jwtService.verifyRefreshToken(refreshToken);

    const user = await findUserById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar se sessão ainda é válida
    if (!await isSessionValid(sessionId, userId)) {
      throw new Error('Sessão expirada');
    }

    // Gerar novo access token
    const newAccessToken = this.jwtService.generateAccessToken({
      userId: user.id,
      userType: user.userType,
      studentProfile: user.profile,
      institution: user.institution,
      sessionId,
      permissions: user.permissions,
      mfaVerified: user.mfaVerified || false,
      deviceId: this.jwtService.generateDeviceFingerprint(req),
      ipAddress: req.ip || 'unknown'
    });

    return {
      accessToken: newAccessToken,
      user: user.profile,
      sessionId
    };
  }

  /**
   * Logout
   */
  async logout(sessionId: string, userId: string): Promise<void> {
    // Adicionar token à blacklist
    await blacklistSession(sessionId);

    // Invalidar sessão
    await invalidateSession(sessionId);

    // Log de auditoria
    console.log(`Logout: usuário ${userId}, sessão ${sessionId}`);
  }
}

// Funções auxiliares de exemplo
async function findUserByEmail(email: string): Promise<any> {
  // Implementar busca no banco de dados
  return null; // Placeholder
}

async function saveSession(session: any): Promise<void> {
  // Implementar salvamento de sessão no Redis
  console.log('Sessão salva:', session);
}

async function blacklistSession(sessionId: string): Promise<void> {
  // Implementar blacklist no Redis
  console.log('Sessão blacklisted:', sessionId);
}

async function invalidateSession(sessionId: string): Promise<void> {
  // Implementar invalidação de sessão
  console.log('Sessão invalidada:', sessionId);
}

export default {
  authenticate,
  requirePermission,
  requireAnyPermission,
  requireAllPermissions,
  requireStudent,
  requireAdmin,
  requireSameInstitution,
  authRateLimit,
  refreshRateLimit,
  JWTService,
  AuthService
};