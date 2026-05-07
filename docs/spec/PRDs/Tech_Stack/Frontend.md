# Frontend Standards

## Overview
The frontend is responsible for rendering the basic application layout and securely embedding the Luzmo dashboard. To meet the 1-hour timebox while maintaining good engineering practices, the frontend relies on HTML/CSS and TypeScript without a heavy framework.

## Core Technologies
- **HTML5:** Semantic structuring of the webpage.
- **CSS3:** Basic styling, avoiding external heavy frameworks like Tailwind or Bootstrap to minimize setup.
- **TypeScript:** For fetching data from my backend and interacting with the DOM with type safety. No React, Vue, or Angular boilerplate.
- **Luzmo Web Component:** `<luzmo-dashboard>` loaded via CDN (`luzmo-embed.min.js`).

## Key Responsibilities
1. **Authentication Fetch:** Perform a `fetch()` call to the custom backend (`/api/v1/token`) to retrieve the temporary SSO token (pointing to [Constants.md](../Constants.md)).
2. **Dashboard Initialization:** Dynamically inject the retrieved `authKey`, `authToken`, and `dashboardId` into the `<luzmo-dashboard>` component.

## Architecture Principle
- **"Dummy" Frontend:** The frontend must be completely "dummy". It contains zero business logic and zero authentication logic. All state, business rules, and authentication validation must be handled exclusively by the backend, making the backend the single and UNIQUE source of truth.

## Security Rule
- **No Secrets Client-Side:** The frontend must never hold or handle the Luzmo API Key or Token directly. It only receives temporary, short-lived SSO tokens from the backend.
