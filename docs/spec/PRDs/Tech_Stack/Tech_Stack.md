# Technology Stack: Luzmo Embedded Dashboard PoC

## Overview
This document defines the technology stack for the Luzmo Embedded Dashboard Proof of Concept (PoC). The chosen stack prioritizes simplicity, speed of development, and strict adherence to a 1-hour timebox, avoiding complex frameworks or build steps.

## Core Stack
The architecture relies on a lightweight two-tier stack:

- **Frontend:** HTML/CSS, TypeScript, Luzmo Web Component
- **Backend:** Node.js, Express.js, TypeScript
- **Tooling & Quality:**
  - **Linter:** ESLint (with `@typescript-eslint`)
  - **Formatter:** Prettier (for consistent code style)
  - **Type Checker:** TypeScript (Strict Mode)
  - **Testing:** Jest + Supertest (for API integration tests)
- **Third-Party Services:** Luzmo API (for dashboard rendering and SSO token generation)

There is no database or complex state management required for this PoC.

## References
- [Frontend Standards](./Frontend.md)
- [Backend Standards](./Backend.md)
