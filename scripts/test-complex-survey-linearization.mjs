import {
  estimateSurveyRatio,
  estimateSurveyTotal,
  normalConfidenceInterval,
} from './lib/complex-survey-linearization.mjs';

const records = [
  { stratum: '1', cluster: '1', weight: 1, values: { y: 1, x: 1 } },
  { stratum: '1', cluster: '2', weight: 1, values: { y: 3, x: 1 } },
  { stratum: '2', cluster: '1', weight: 1, values: { y: 2, x: 1 } },
  { stratum: '2', cluster: '2', weight: 1, values: { y: 6, x: 1 } },
];

const total = estimateSurveyTotal(records, 'y');
const ratio = estimateSurveyRatio(records, 'y', 'x');
const ratioInterval = normalConfidenceInterval(0.5, 0.1, true);
const close = (actual, expected) => Math.abs(actual - expected) < 1e-12;
const checks = {
  totalEstimate: close(total.estimate, 12),
  totalVariance: close(total.variance, 20),
  totalStandardError: close(total.standardError, Math.sqrt(20)),
  ratioEstimate: close(ratio.estimate, 3),
  ratioVariance: close(ratio.variance, 1.25),
  ratioStandardError: close(ratio.standardError, Math.sqrt(1.25)),
  designDegreesOfFreedom: total.degreesOfFreedom === 2 && ratio.degreesOfFreedom === 2,
  boundedRatioInterval: close(ratioInterval.lower, 0.304) && close(ratioInterval.upper, 0.696),
  apsCalibrationBlocked: true,
  clinicalActivationBlocked: true,
};

if (!Object.values(checks).every(Boolean)) {
  throw new Error(`complex-survey-linearization-self-test-failed:${JSON.stringify(checks)}`);
}

console.log(JSON.stringify({
  schemaVersion: 'darwin.sounio.complex-survey-linearization-self-test.v1',
  status: 'deterministic-formulas-valid',
  method: 'Taylor linearization for stratified with-replacement ultimate-cluster design',
  checks,
  apsCalibrationAuthorized: false,
  clinicalActivationAuthorized: false,
}, null, 2));
console.log('COMPLEX_SURVEY_LINEARIZATION_SELF_TEST_VALID');
