# Prior-Art Frontier v0.6

Search snapshot: 2026-08-02. This is a literature frontier map, not a patent
opinion or a completed novelty search.

| Neighborhood | Relevant prior art | Collision with v0.6 | Boundary retained |
| --- | --- | --- | --- |
| Minimum distinguishing queries | [Minimum Query Set for Decision Tree Construction](https://pmc.ncbi.nlm.nih.gov/articles/PMC8700169/) defines a smallest query set separating differently classified objects and notes the underlying NP-hardness. | Direct collision with any broad claim to invent minimum query sets or exact separating-query optimization. | v0.6 treats exact minimum search as known combinatorics and studies authority-constrained sound abstention around it. |
| Decision-tree complexity | [On the hardness of the minimum height decision tree problem](https://doi.org/10.1016/j.dam.2004.06.002) studies optimal identifying trees and hardness. | Direct collision with broad claims to optimal adaptive decision trees. | v0.6 does not claim a new complexity bound or scalable optimizer. |
| Authorization plus information flow | [FLAFOL](https://arxiv.org/abs/2001.10630) provides first-order authorization logic with non-interference; [FLAM](https://www.cs.cornell.edu/andru/papers/flam/) studies delegation, revocation, and robust authorization. | Direct collision with broad claims to invent authority-aware non-interference. | v0.6 uses a smaller role-query authority model and focuses on recommendation identifiability and forced abstention. |
| Proof-carrying authorization | [Code-Carrying Authorization](https://www.microsoft.com/en-us/research/publication/code-carrying-authorization/) and [PCAL](https://doi.org/10.1007/978-3-642-04444-1_12) move authorization evidence into verifiable code or proofs. | Direct collision with broad proof-carrying authorization claims. | The v0.6 certificate proves a missing separating capability; it does not authorize an action. |
| Evidence-backed agent permissions | [FAVA](https://arxiv.org/abs/2607.27267) compiles permission graphs and uses SMT checks for agent actions. | Strong contemporary neighbor for verified dynamic authorization. | v0.6 is not an agent action authorizer; it proves when a zero-error recommendation protocol must abstain. |
| Active preference elicitation | [Robust Active Preference Elicitation](https://arxiv.org/abs/2003.01899) optimizes adaptive questions under preference uncertainty. | Collision with broad claims to adaptive preference querying. | v0.6 does not optimize utility or infer preferences; answers and required recommendations are uninterpreted. |
| Clinical evidence-to-decision | [Core GRADE](https://www.bmj.com/content/389/bmj-2024-083867) structures evidence and recommendation judgments. | Collision with broad claims to formalize evidence-to-decision generally. | v0.6 isolates a mathematical authority/identifiability boundary and emits no clinical recommendation. |

## Candidate contribution

The defensible candidate is the following conjunction:

1. role-indexed legitimate query transcripts;
2. a zero-error adaptive forced-abstention theorem;
3. seed-wise and coalition-preserving no-escape results;
4. a certificate separating missing authority from an insufficient query
   universe;
5. source-fresh Sounio native/WASM execution linked to exhaustive bounded
   counterexample search.

No single component is presumed novel. Novelty of the conjunction remains
unestablished until systematic academic and patent review closes claim by
claim.
