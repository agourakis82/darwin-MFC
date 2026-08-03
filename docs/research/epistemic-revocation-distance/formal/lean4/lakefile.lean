import Lake
open Lake DSL

package epistemicRevocationDistance

require noHiddenGaugeFixing from "../../../no-hidden-gauge-fixing/formal/lean4"

@[default_target]
lean_lib EpistemicRevocationDistance where
  roots := #[`EpistemicRevocationDistance, `EpistemicRevocationDistanceAudit]
