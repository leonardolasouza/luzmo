# Backend Standards

## Overview
The backend serves as a secure proxy to generate temporary Single Sign-On (SSO) authorization tokens via the Luzmo API. 

## Core Technologies
- **Runtime:** Node.js (LTS version)
- **Language:** TypeScript (for type safety and developer experience)
- **Framework:** Express.js (for minimal, fast API routing)
- **SDK:** `@luzmo/nodejs-sdk` (official SDK for server-side API interactions)
- **Configuration:** `dotenv` (for loading environment variables)

## Key Responsibilities
1. **Serve Static Assets:** Serve the frontend HTML/JS/CSS files.
2. **Secure Token Generation:** Provide an endpoint (`/api/v1/token`) that uses the server-side Luzmo SDK to request SSO tokens (pointing to [Constants.md](../Constants.md)).

## Security & Configuration
- **Environment Variables:** All secrets (`LUZMO_API_KEY`, `LUZMO_API_TOKEN`, `LUZMO_INTEGRATION_ID`) must be stored in a `.env` file and accessed via `process.env`.
- **.gitignore:** The `.env` file must be strictly excluded from version control to prevent credential leakage.

## Maintainability Standards
- **Linter & Formatter:** ESLint and Prettier are mandatory. All code must be formatted according to the shared `.prettierrc` before submission.
- **Strict Typing:** TypeScript strict mode is enabled. Use of `any` is discouraged and must be justified.
- **Modular Constants:** Follow the "Centralized Constants" and "URI Topology" rules defined in the AI Roadmap.
- **Automated Testing:** API integration tests using Jest/Supertest are required to verify the security boundary (credential leakage protection).
