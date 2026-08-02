import Auctoritas

open Darwin.Auctoritas

#print axioms noLegitimateQuery
#print axioms identificationRequiresLegitimateSeparation
#print axioms soundnessForcesAbstention
#print axioms localRoleCannotIdentify
#print axioms localSoundPartialMustAbstain
#print axioms jointRoleCanIdentify
#print axioms abstainAuthorityIff
#print axioms askImpliesAuthorizedSeparator
#print axioms delegateImpliesOnlyUnauthorizedSeparation

#eval classifyPair {
  authorizedQ0 := true
  authorizedQ1 := false
  observedQ0 := true
  observedQ1 := false
  answersDifferQ0 := false
  answersDifferQ1 := true
  recommendationsDiffer := true
}
