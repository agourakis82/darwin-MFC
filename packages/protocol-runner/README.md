# @darwin-mfc/protocol-runner

Pure (UI-agnostic) protocol runner engine used by Darwin-MFC web and mobile.

Design goals:
- Deterministic, testable state transitions
- Supports cycles (no fake % progress)
- Session/local persistence friendly (serialize state as JSON)

