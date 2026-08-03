import Lake
open Lake DSL

package normativeGauge

@[default_target]
lean_lib NormativeGauge where
  roots := #[`NormativeGauge, `NormativeGaugeAudit]
