/**
 * CERTIFICATE UTILITIES
 * =====================
 *
 * Utility functions for certificate generation and verification.
 */

import type { Certificate, LearningPath, UserLearningProgress } from '../types/learning';

/**
 * Generate a unique verification code for certificates.
 */
export function generateVerificationCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude confusing chars
  const segments = [];

  for (let i = 0; i < 3; i++) {
    let segment = '';
    for (let j = 0; j < 4; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    segments.push(segment);
  }

  return segments.join('-');
}

/**
 * Generate a certificate for a completed learning path.
 */
export function generateCertificate(
  path: LearningPath,
  progress: UserLearningProgress,
  userName: string
): Certificate {
  // Calculate average score from all modules with scores
  const modulesWithScores = progress.moduleProgress.filter(
    (mp) => mp.score !== undefined
  );
  const averageScore = modulesWithScores.length > 0
    ? Math.round(
        modulesWithScores.reduce((sum, mp) => sum + (mp.score || 0), 0) /
        modulesWithScores.length
      )
    : 100; // Default to 100 if no scored modules

  const certificate: Certificate = {
    id: `cert_${path.id}_${Date.now()}`,
    learningPathId: path.id,
    userId: progress.userId,
    userName,
    issuedAt: new Date().toISOString(),
    score: averageScore,
    verificationCode: generateVerificationCode(),
  };

  // Add expiration if the path has certification config with validity
  if (path.certification?.validityMonths) {
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + path.certification.validityMonths);
    certificate.expiresAt = expirationDate.toISOString();
  }

  return certificate;
}

/**
 * Check if a learning path is eligible for certification.
 */
export function isEligibleForCertification(
  path: LearningPath,
  progress: UserLearningProgress
): boolean {
  // All modules must be completed
  const allCompleted = progress.moduleProgress.every(
    (mp) => mp.status === 'completed'
  );

  if (!allCompleted) return false;

  // Check if minimum score is required
  if (path.certification?.minimumScore) {
    const modulesWithScores = progress.moduleProgress.filter(
      (mp) => mp.score !== undefined
    );

    if (modulesWithScores.length > 0) {
      const averageScore =
        modulesWithScores.reduce((sum, mp) => sum + (mp.score || 0), 0) /
        modulesWithScores.length;

      if (averageScore < path.certification.minimumScore) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Format a verification code for display.
 */
export function formatVerificationCode(code: string): string {
  // Code should already be formatted as XXXX-XXXX-XXXX
  return code;
}

/**
 * Get the verification URL for a certificate.
 */
export function getVerificationUrl(code: string): string {
  return `https://mfc.agourakis.med.br/verify/${code}`;
}
