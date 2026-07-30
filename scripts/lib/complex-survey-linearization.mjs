function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new Error(`complex-survey-invalid-${label}`);
  return number;
}

function collectPsuTotals(records, contribution) {
  const strata = new Map();
  for (const record of records) {
    const stratum = String(record.stratum ?? '');
    const cluster = String(record.cluster ?? '');
    if (!stratum || !cluster) throw new Error('complex-survey-design-marker-missing');
    const weight = finiteNumber(record.weight, 'weight');
    if (weight <= 0) throw new Error('complex-survey-nonpositive-weight');
    const clusters = strata.get(stratum) ?? new Map();
    clusters.set(cluster, (clusters.get(cluster) ?? 0) + weight * contribution(record));
    strata.set(stratum, clusters);
  }
  return strata;
}

function varianceFromPsuTotals(strata) {
  let variance = 0;
  let clusterCount = 0;
  for (const [stratum, clusters] of strata) {
    const totals = [...clusters.values()];
    if (totals.length < 2) throw new Error(`complex-survey-singleton-stratum:${stratum}`);
    clusterCount += totals.length;
    const mean = totals.reduce((sum, value) => sum + value, 0) / totals.length;
    const centeredSquares = totals.reduce((sum, value) => sum + ((value - mean) ** 2), 0);
    variance += (totals.length / (totals.length - 1)) * centeredSquares;
  }
  return {
    variance: Math.max(0, variance),
    strata: strata.size,
    clusters: clusterCount,
    degreesOfFreedom: clusterCount - strata.size,
  };
}

function weightedSum(records, variable) {
  return records.reduce((sum, record) => {
    const value = finiteNumber(record.values?.[variable], `value-${variable}`);
    return sum + finiteNumber(record.weight, 'weight') * value;
  }, 0);
}

export function estimateSurveyTotal(records, variable) {
  const estimate = weightedSum(records, variable);
  const design = varianceFromPsuTotals(collectPsuTotals(
    records,
    record => finiteNumber(record.values?.[variable], `value-${variable}`),
  ));
  return {
    type: 'total',
    numerator: variable,
    denominator: null,
    estimate,
    standardError: Math.sqrt(design.variance),
    ...design,
  };
}

export function estimateSurveyRatio(records, numerator, denominator) {
  const numeratorTotal = weightedSum(records, numerator);
  const denominatorTotal = weightedSum(records, denominator);
  if (denominatorTotal === 0) throw new Error(`complex-survey-zero-denominator:${denominator}`);
  const estimate = numeratorTotal / denominatorTotal;
  const residualDesign = varianceFromPsuTotals(collectPsuTotals(records, record => (
    finiteNumber(record.values?.[numerator], `value-${numerator}`)
      - estimate * finiteNumber(record.values?.[denominator], `value-${denominator}`)
  )));
  const variance = residualDesign.variance / (denominatorTotal ** 2);
  return {
    type: 'ratio',
    numerator,
    denominator,
    numeratorTotal,
    denominatorTotal,
    estimate,
    standardError: Math.sqrt(Math.max(0, variance)),
    variance: Math.max(0, variance),
    strata: residualDesign.strata,
    clusters: residualDesign.clusters,
    degreesOfFreedom: residualDesign.degreesOfFreedom,
  };
}

export function normalConfidenceInterval(estimate, standardError, bounded = false) {
  const lower = estimate - 1.96 * standardError;
  const upper = estimate + 1.96 * standardError;
  return {
    method: 'normal-wald-95',
    lower: bounded ? Math.min(1, Math.max(0, lower)) : lower,
    upper: bounded ? Math.max(0, Math.min(1, upper)) : upper,
  };
}
