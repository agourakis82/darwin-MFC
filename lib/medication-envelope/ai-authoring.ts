import { canonicalize } from './canonical';
import type {
  AdversarialEvidenceReconciliationV1,
  AdversarialEvidenceRunV1,
} from './types';
import type { Sha256Function } from './graph';

export function assertIsolatedEvidenceRun(run: AdversarialEvidenceRunV1): void {
  if (run.toolAccess !== false || run.networkAccess !== false) throw new Error('evidence-ai-isolation-required');
  if (run.promotionStatus !== 'CANDIDATE_ONLY') throw new Error('evidence-ai-cannot-promote');
  if (!run.provider || !run.model || !run.sourceNodeId) throw new Error('evidence-ai-identity-required');
  for (const claim of run.output.claims) {
    if (!claim.statement.trim() || !claim.locator.trim()) throw new Error('evidence-ai-exact-locator-required');
  }
  for (const challenge of run.output.challenges) {
    if (!challenge.failureMode.trim() || !challenge.locator.trim()) throw new Error('evidence-ai-challenge-locator-required');
  }
}

export async function reconcileAdversarialEvidenceRuns(
  extractor: AdversarialEvidenceRunV1,
  falsifier: AdversarialEvidenceRunV1,
  sha256: Sha256Function,
): Promise<AdversarialEvidenceReconciliationV1> {
  assertIsolatedEvidenceRun(extractor);
  assertIsolatedEvidenceRun(falsifier);
  if (extractor.mode !== 'extractor' || falsifier.mode !== 'falsifier') throw new Error('evidence-ai-role-mismatch');
  if (extractor.provider === falsifier.provider) throw new Error('evidence-ai-independent-providers-required');
  if (extractor.sourceSha256 !== falsifier.sourceSha256) throw new Error('evidence-ai-source-mismatch');
  const candidateClaimDigests = await Promise.all(extractor.output.claims.map(claim => sha256(canonicalize(claim))));
  const unresolvedChallenges = await Promise.all(falsifier.output.challenges.map(challenge => sha256(canonicalize(challenge))));
  return {
    schemaVersion: 'darwin.adversarial-evidence-reconciliation.v1',
    extractorRunSha256: await sha256(canonicalize(extractor)),
    falsifierRunSha256: await sha256(canonicalize(falsifier)),
    sourceSha256: extractor.sourceSha256,
    candidateClaimDigests: candidateClaimDigests.sort(),
    unresolvedChallenges: unresolvedChallenges.sort(),
    humanConsensusRequired: true,
    executable: false,
  };
}
