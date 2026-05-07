# Product Requirements Document (PRD): Luzmo Embedded Dashboard PoC

## 1. Goal
The primary objective of this PoC is to demonstrate a secure, scalable, and maintainable way to embed Luzmo dashboards into a third-party application without exposing sensitive API credentials to the client.

## 2. Target Audience
- **Developers:** Who need a reference implementation for secure embedding.
- **Stakeholders:** Who want to see the visual capabilities of Luzmo dashboards within their own brand environment.

## 3. User Stories
- **As a Developer,** I want to keep my Luzmo API Key and Token secret so that unauthorized users cannot use my Luzmo credits or access my data directly.
- **As a User,** I want to see one or more dashboards rendered smoothly on a single page.
- **As a System Administrator,** I want to easily configure which dashboards are shown by changing environment variables without modifying the code.

## 4. Functional Requirements

### 4.1. Secure Token Proxy
- The system MUST provide a backend endpoint that authenticates with Luzmo.
- The system MUST return a temporary, short-lived SSO token to the frontend.
- The system MUST NOT expose the master `LUZMO_API_KEY` or `LUZMO_API_TOKEN` to the browser.

### 4.2. Multi-Dashboard Support
- The system MUST support rendering multiple dashboards on a single page.
- The dashboards to be rendered MUST be configurable via environment variables (`LUZMO_DASHBOARD_ID_1`, `LUZMO_DASHBOARD_ID_2`, etc.).
- The system SHOULD handle a single `LUZMO_DASHBOARD_ID` for backward compatibility.

### 4.3. "Dummy" Frontend
- The frontend SHOULD have minimal dependencies.
- The frontend SHOULD NOT contain any business logic or secrets.
- The frontend MUST use the official Luzmo Web Component for rendering.

## 5. Non-Functional Requirements
- **Security:** Zero client-side secrets.
- **Performance:** Dashboard rendering should be handled by Luzmo's CDN and services.
- **Maintainability:** Use centralized constants and TypeScript for type safety.
