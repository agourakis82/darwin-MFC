import type {
  AdaptedClinicalInput,
  ClinicalEvidenceBundle,
  ClinicalKernelInput,
} from './types';

const featureTerms: Record<string, string[]> = {
  fever: ['febre', 'febril'],
  cough: ['tosse'],
  coryza: ['coriza', 'obstrucao nasal', 'congestao nasal', 'rinorreia'],
  sore_throat: ['dor de garganta', 'odinofagia', 'faringite'],
  dyspnea: ['dispneia', 'falta de ar', 'dificuldade para respirar', 'desconforto respiratorio'],
  wheeze: ['sibilancia', 'chiado', 'chiado no peito'],
  stridor: ['estridor', 'tosse ladrante'],
  tachypnea: ['taquipneia', 'respiracao rapida', 'frequencia respiratoria elevada'],
  hypoxemia: ['hipoxemia', 'dessaturacao', 'saturacao baixa', 'spo2 baixa'],
  paroxysmal_cough: ['tosse paroxistica', 'tosse em acessos', 'guincho inspiratorio'],
  duration_over_10d: ['mais de 10 dias', 'ha 10 dias', '10 dias ou mais'],
};

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function adaptClinicalInput(
  input: ClinicalKernelInput,
  evidence: ClinicalEvidenceBundle,
): AdaptedClinicalInput {
  const symptomText = normalize(input.symptoms.join(' | '));
  const presentFeatureIds = new Set<string>();

  for (const feature of evidence.features) {
    const terms = featureTerms[feature.id] ?? [normalize(feature.label)];
    if (terms.some(term => symptomText.includes(normalize(term)))) {
      presentFeatureIds.add(feature.id);
    }
  }

  if (input.ageYears !== undefined && Number.isFinite(input.ageYears)) {
    if (input.ageYears < 2) presentFeatureIds.add('age_under_2');
  }

  const vector = new Int32Array(evidence.features.length).fill(-1);
  evidence.features.forEach((feature, index) => {
    if (presentFeatureIds.has(feature.id)) vector[index] = 1;
    if (feature.id === 'age_under_2' && input.ageYears !== undefined && input.ageYears >= 2) {
      vector[index] = 0;
    }
  });

  return {
    vector,
    presentFeatureIds,
    redFlags: evidence.redFlags.filter(id => presentFeatureIds.has(id)),
  };
}
