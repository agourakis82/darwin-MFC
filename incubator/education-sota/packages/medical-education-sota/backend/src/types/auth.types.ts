/**
 * Tipos de Autenticação - Sistema de Educação Médica SOTA
 * Tipos específicos para autenticação e autorização
 */

import { UserType, AdminRole, LearningStyle, LearningPace, ExamType, MedicalSpecialty } from './common.types';

// =============================================================================
// USUÁRIOS E PERFIS
// =============================================================================

export interface User {
  id: string;
  email: string;
  userType: UserType;
  isActive: boolean;
  mfaEnabled: boolean;
  lastLogin?: Date;
  lastPasswordChange?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: string;
  language: string;
  timezone: string;
  preferences: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentProfile {
  id: string;
  userId: string;
  medicalId: string;
  currentLevel: string;
  specialty: MedicalSpecialty;
  yearOfStudy: number;
  gpa?: number;
  university: string;
  institutionId?: string;

  // Perfil de aprendizado
  learningStyle: LearningStyle;
  preferredPace: LearningPace;
  attentionSpan: number;
  technologyComfort: number;

  // Metas e objetivos
  targetExam: ExamType;
  targetCompletionDate?: Date;

  // Progresso geral
  totalStudyTime: number;
  coursesCompleted: number;
  competenciesAchieved: number;

  // Análise de performance
  strengthAreas: string[];
  weaknessAreas: string[];
  lastPerformanceUpdate?: Date;

  createdAt: Date;
  updatedAt: Date;
}

export interface InstructorProfile {
  id: string;
  userId: string;
  medicalLicense: string;
  specialty: MedicalSpecialty;
  experienceYears: number;
  institutionId: string;
  department?: string;
  isVerified: boolean;
  verificationDate?: Date;
  bio?: string;
  researchInterests: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminProfile {
  id: string;
  userId: string;
  role: AdminRole;
  permissions: string[];
  department?: string;
  isSuperAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Institution {
  id: string;
  name: string;
  type: string;
  accreditation: string;
  accreditationNumber?: string;
  address: Record<string, any>;
  contact: Record<string, any>;
  website?: string;
  logoUrl?: string;

  // Configurações específicas
  lmsIntegration?: Record<string, any>;
  federationEnabled: boolean;
  privacySettings: Record<string, any>;

  createdAt: Date;
  updatedAt: Date;
}

// =============================================================================
// SESSÕES E AUTENTICAÇÃO
// =============================================================================

export interface UserSession {
  id: string;
  userId: string;
  sessionId: string;
  deviceId: string;
  deviceInfo: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  isActive: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RefreshToken {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  used: boolean;
  createdAt: Date;
}

// =============================================================================
// PAYLOAD JWT
// =============================================================================

export interface JWTPayload {
  userId: string;
  userType: UserType;
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

// =============================================================================
// REQUISIÇÕES DE AUTENTICAÇÃO
// =============================================================================

export interface LoginRequest {
  email: string;
  password: string;
  deviceId?: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  medicalId?: string; // Para estudantes
  medicalLicense?: string; // Para instrutores
  institutionCode?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface EnableMFARequest {
  method: 'totp' | 'sms' | 'email';
  phoneNumber?: string;
}

export interface VerifyMFARequest {
  code: string;
  method: string;
}

// =============================================================================
// RESPOSTAS DE AUTENTICAÇÃO
// =============================================================================

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  profile: UserProfile;
  studentProfile?: StudentProfile;
  instructorProfile?: InstructorProfile;
  adminProfile?: AdminProfile;
  institution?: Institution;
  sessionId: string;
  expiresIn: number;
}

export interface RegisterResponse {
  user: User;
  profile: UserProfile;
  message: string;
  verificationRequired: boolean;
}

export interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
}

export interface ForgotPasswordResponse {
  message: string;
  emailSent: boolean;
}

export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}

export interface ChangePasswordResponse {
  message: string;
  success: boolean;
}

export interface EnableMFAResponse {
  secret?: string;
  qrCode?: string;
  backupCodes: string[];
  message: string;
}

export interface VerifyMFAResponse {
  success: boolean;
  message: string;
  mfaEnabled: boolean;
}

// =============================================================================
// CONTEXTO DE AUTENTICAÇÃO
// =============================================================================

export interface AuthenticatedContext {
  user: User;
  profile: UserProfile;
  studentProfile?: StudentProfile;
  instructorProfile?: InstructorProfile;
  adminProfile?: AdminProfile;
  institution?: Institution;
  session: UserSession;
  permissions: string[];
}

// =============================================================================
// CONFIGURAÇÕES DE AUTENTICAÇÃO
// =============================================================================

export interface AuthConfig {
  jwt: {
    secret: string;
    refreshSecret: string;
    accessExpiry: string;
    refreshExpiry: string;
    issuer: string;
    audience: string;
  };
  bcrypt: {
    rounds: number;
  };
  rateLimit: {
    login: {
      windowMs: number;
      max: number;
    };
    refresh: {
      windowMs: number;
      max: number;
    };
  };
  mfa: {
    enabled: boolean;
    required: boolean;
    methods: string[];
  };
  session: {
    secure: boolean;
    httpOnly: boolean;
    sameSite: 'strict' | 'lax' | 'none';
  };
}

// =============================================================================
// AUDITORIA E LOGS
// =============================================================================

export interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  ipAddress: string;
  userAgent?: string;
  sessionId?: string;
  status: string;
  message?: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}

// =============================================================================
// VERIFICAÇÕES E VALIDAÇÕES
// =============================================================================

export interface VerificationRequest {
  token: string;
  type: 'email' | 'password_reset' | 'mfa';
}

export interface VerificationResponse {
  success: boolean;
  message: string;
  expiresAt?: Date;
}

export interface DeviceVerification {
  deviceId: string;
  deviceInfo: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  trusted: boolean;
  lastUsed: Date;
}

// =============================================================================
// SESSÕES E DISPOSITIVOS
// =============================================================================

export interface ActiveSession {
  id: string;
  sessionId: string;
  deviceId: string;
  deviceName: string;
  deviceType: 'desktop' | 'mobile' | 'tablet' | 'unknown';
  browser: string;
  os: string;
  ipAddress: string;
  location?: string;
  isCurrentSession: boolean;
  createdAt: Date;
  lastActivity: Date;
  expiresAt: Date;
}

export interface SessionManagementRequest {
  action: 'list' | 'terminate' | 'terminate_all' | 'verify_device';
  sessionId?: string;
  deviceId?: string;
}

export interface SessionManagementResponse {
  sessions?: ActiveSession[];
  message: string;
  affectedCount?: number;
}

// =============================================================================
// ERROS DE AUTENTICAÇÃO
// =============================================================================

export interface AuthError {
  code: string;
  message: string;
  details?: Record<string, any>;
  field?: string;
}

export type AuthErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'ACCOUNT_DISABLED'
  | 'ACCOUNT_NOT_VERIFIED'
  | 'TOKEN_EXPIRED'
  | 'TOKEN_INVALID'
  | 'TOKEN_BLACKLISTED'
  | 'SESSION_EXPIRED'
  | 'DEVICE_NOT_AUTHORIZED'
  | 'MFA_REQUIRED'
  | 'MFA_INVALID'
  | 'MFA_ALREADY_ENABLED'
  | 'PASSWORD_TOO_WEAK'
  | 'EMAIL_ALREADY_EXISTS'
  | 'MEDICAL_ID_ALREADY_EXISTS'
  | 'RATE_LIMIT_EXCEEDED'
  | 'PERMISSION_DENIED'
  | 'INSTITUTION_NOT_FOUND'
  | 'ACCOUNT_LOCKED';

// =============================================================================
// HELPER TYPES
// =============================================================================

export type AuthenticatedRequest<T = any> = {
  user: User;
  profile: UserProfile;
  studentProfile?: StudentProfile;
  instructorProfile?: InstructorProfile;
  adminProfile?: AdminProfile;
  institution?: Institution;
  session: UserSession;
  permissions: string[];
  body: T;
} & Express.Request;

export type UserRole = UserType;

export type Permission =
  | 'user.read'
  | 'user.write'
  | 'user.delete'
  | 'student.read'
  | 'student.write'
  | 'student.delete'
  | 'instructor.read'
  | 'instructor.write'
  | 'admin.read'
  | 'admin.write'
  | 'admin.delete'
  | 'content.read'
  | 'content.write'
  | 'content.delete'
  | 'assessment.read'
  | 'assessment.write'
  | 'assessment.delete'
  | 'analytics.read'
  | 'system.configure'
  | 'institution.manage';

export type RequiredPermission = Permission;

export type OptionalPermission = Permission;