# Global AI Coding Rules

These rules apply to **every file** in the project. Violations are not acceptable.

1. **No Hallucination.** If the PDF instructions are ambiguous, stop and ask. Never invent requirements.
2. **No Git Operations.** Never run `git add`, `git commit`, or `git push`. All version control is the human's responsibility.
3. **No Scope Creep.** Implement only what is specified in the PRDs or explicitly requested. Do not add features proactively.
4. **Validate Before Done.** Always run `make check` (in both frontend and backend) before declaring any task complete.
5. **Strict Typing.** Enforce TypeScript strict mode on all files. Avoid `any` unless absolutely necessary and justified with a comment.
6. **Comment Preservation.** Never remove existing developer comments unless the associated code block is deleted.
7. **Secrets via `.env`.** All credentials and keys must come from environment variables. Never hardcode values. See more details at [Security.md](./Security.md).
8. **Test Coverage.** Every new module or service must have at least one corresponding test in `backend/tests/`.
9. **Ignore Scratch Files.** Completely disregard the folder `.dev/` and any file inside of it as they are NOT part of the spec.
10. **Centralized Constants.** Environment-agnostic strings (e.g., API version strings, external URLs, component IDs) must not be hardcoded in logic or configuration.
    - *Rationale:* Prevents configuration drift and centralizes global system identifiers in a single, non-logic-bearing file (`constants.ts`).
    - *Solution:* Use constants from [Constants.md](./Constants.md) and pull default values from a dedicated `constants.ts` module. All such strings must be referenced via constants. In case of Docker definitions, like ports, use shell interpolation (e.g., `${PORT:-3500}`) (pointing to [Constants.md](./Constants.md)) to ensure compatibility with Cloud-Native environments (e.g., Cloud Run, K8s).
11. **Compounded API Versioning.**
    - *Rule:* The base API root (`/api`) must be its own constant, and specific versions (v1, v2, etc.) must be constructed by compounding this root.
    - *Rationale:* Decouples the global API prefix from specific versioning, allowing for unified structural changes to the API namespace.
    - *Solution:* Define `API_PREFIX` and use template literals or concatenation for versioned paths like `API_V1_STR`.
12. **URI Topology Externalization (Zero-Literal Routing).**
    - *Rule:* All application-level URI paths (endpoints, health check paths, resource sub-paths) must be centralized in `constants.ts` (backend).
    - *Rationale:* Hardcoded strings in routers create "Magic URI" debt that is difficult to audit or refactor across large-scale distributed systems.
13. **NEVER spin up or stop any server or container yourself.** Do not attempt to run development servers (e.g., `make dev`, `streamlit`, `npm run dev`) or background processes. This causes environment conflicts and stability issues.
    If you need to perform such action, ask for it before.
