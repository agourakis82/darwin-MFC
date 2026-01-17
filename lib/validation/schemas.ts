/**
 * Validation Schemas for Darwin-MFC
 * ==================================
 * Zod schemas for form validation and data validation.
 */

import { z } from 'zod';

// =============================================================================
// NOTE SCHEMAS
// =============================================================================

export const noteTypeSchema = z.enum([
  'general',
  'medication',
  'disease',
  'case',
  'protocol',
  'study',
]);

export type NoteType = z.infer<typeof noteTypeSchema>;

export const noteSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo'),
  content: z.string().max(10000, 'Conteúdo muito longo'),
  type: noteTypeSchema,
  tags: z.array(z.string().max(50)).max(10, 'Máximo de 10 tags'),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Cor inválida').optional(),
  isPinned: z.boolean().optional(),
});

export type NoteFormData = z.infer<typeof noteSchema>;

// =============================================================================
// USER SCHEMAS
// =============================================================================

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Nome de usuário deve ter pelo menos 3 caracteres')
    .max(30, 'Nome de usuário muito longo')
    .regex(/^[a-zA-Z0-9_]+$/, 'Apenas letras, números e underscore'),
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/[0-9]/, 'Senha deve conter pelo menos um número'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// =============================================================================
// CALCULATOR INPUT SCHEMAS
// =============================================================================

export const patientDataSchema = z.object({
  age: z.number().int().min(0, 'Idade inválida').max(150, 'Idade inválida'),
  weight: z.number().positive('Peso deve ser positivo').max(500, 'Peso inválido'),
  height: z.number().positive('Altura deve ser positiva').max(300, 'Altura inválida'),
  gender: z.enum(['male', 'female', 'other']),
});

export type PatientData = z.infer<typeof patientDataSchema>;

export const vitalSignsSchema = z.object({
  systolicBP: z.number().int().min(50).max(300).optional(),
  diastolicBP: z.number().int().min(30).max(200).optional(),
  heartRate: z.number().int().min(20).max(300).optional(),
  respiratoryRate: z.number().int().min(5).max(60).optional(),
  temperature: z.number().min(30).max(45).optional(),
  oxygenSaturation: z.number().min(50).max(100).optional(),
});

export type VitalSigns = z.infer<typeof vitalSignsSchema>;

// =============================================================================
// LAB VALUES SCHEMAS
// =============================================================================

export const labValuesSchema = z.object({
  creatinine: z.number().positive().max(30).optional(),
  bun: z.number().positive().max(200).optional(),
  sodium: z.number().min(100).max(180).optional(),
  potassium: z.number().min(1).max(10).optional(),
  hemoglobin: z.number().positive().max(25).optional(),
  hematocrit: z.number().min(10).max(70).optional(),
  platelets: z.number().positive().max(2000).optional(),
  wbc: z.number().positive().max(100).optional(),
  glucose: z.number().positive().max(1000).optional(),
});

export type LabValues = z.infer<typeof labValuesSchema>;

// =============================================================================
// CLINICAL CASE SCHEMAS
// =============================================================================

export const clinicalCaseStepSchema = z.object({
  type: z.enum(['question', 'explanation', 'result']),
  question: z.string().optional(),
  options: z.array(z.object({
    label: z.string(),
    isCorrect: z.boolean().optional(),
    explanation: z.string().optional(),
  })).optional(),
  content: z.string().optional(),
});

export type ClinicalCaseStep = z.infer<typeof clinicalCaseStepSchema>;

// =============================================================================
// SEARCH SCHEMAS
// =============================================================================

export const searchQuerySchema = z.object({
  query: z.string().min(1, 'Digite um termo de busca').max(200),
  filters: z.object({
    category: z.string().optional(),
    type: z.string().optional(),
    language: z.string().optional(),
  }).optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().min(1).max(100).optional().default(20),
});

export type SearchQuery = z.infer<typeof searchQuerySchema>;

// =============================================================================
// EXPORT SCHEMAS
// =============================================================================

export const exportOptionsSchema = z.object({
  format: z.enum(['pdf', 'json', 'csv', 'markdown']),
  includeNotes: z.boolean().optional(),
  includeReferences: z.boolean().optional(),
  language: z.string().optional(),
});

export type ExportOptions = z.infer<typeof exportOptionsSchema>;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Validates data against a schema and returns typed result
 */
export function validateSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}

/**
 * Formats Zod errors into a simple object for form display
 */
export function formatZodErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.join('.');
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  }
  return errors;
}

export default {
  noteSchema,
  loginSchema,
  registerSchema,
  patientDataSchema,
  vitalSignsSchema,
  labValuesSchema,
  searchQuerySchema,
  exportOptionsSchema,
  validateSchema,
  formatZodErrors,
};
