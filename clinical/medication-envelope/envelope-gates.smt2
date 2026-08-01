(set-logic QF_LIA)
(set-option :produce-proofs true)
(declare-const integrity_ok Bool)
(declare-const blocker_mask Int)
(declare-const review_mask Int)
(declare-const unknown_count Int)
(declare-const disposition Int)
(assert (>= blocker_mask 0))
(assert (>= review_mask 0))
(assert (>= unknown_count 0))
(assert (= disposition
  (ite (not integrity_ok) 0
    (ite (> blocker_mask 0) 1
      (ite (or (> review_mask 0) (> unknown_count 0)) 2 3)))))
; A known blocker can never produce WITHIN_REVIEWED_ENVELOPE.
(assert integrity_ok)
(assert (> blocker_mask 0))
(assert (= disposition 3))
(check-sat)
(get-proof)
