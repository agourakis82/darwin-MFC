import Lake
open Lake DSL

package noHiddenGaugeFixing

require normativeGauge from "../../../normative-gauge/formal/lean4"

@[default_target]
lean_lib NoHiddenGaugeFixing where
  roots := #[`NoHiddenGaugeFixing, `NoHiddenGaugeFixingAudit]
