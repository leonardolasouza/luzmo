# Frontend: Embedded Dashboard

## Overview

This frontend is a simple HTML/TypeScript application demonstrating how to embed a Luzmo dashboard.

To adhere to the 1-hour timebox of the technical assignment, this frontend avoids heavy frameworks like React, Vue, or Tailwind. It relies on standard HTML5, minimal CSS, and TypeScript for safe data fetching.

## Architecture Principle: "Dummy Frontend"

This application strictly adheres to the "Dummy Frontend" principle.

- It contains **zero** business logic.
- It contains **zero** secrets or API keys.
- It is entirely dependent on the Backend server to provide it with access tokens.

## How It Works

1. When `index.html` loads, the `app.ts` script executes.
2. It fetches a temporary SSO token from the backend's `/api/v1/token` endpoint (pointing to [Constants.md](../docs/spec/PRDs/Constants.md)). This single token grants access to all dashboards configured in the backend.
3. It iterates through the retrieved `dashboardIds` and injects the token into multiple `<luzmo-embed-dashboard>` Web Components.
4. The Web Components then handle rendering the dashboards directly from Luzmo's servers.

## Development

The frontend is served as a static site by the Node.js backend. If you need to modify the TypeScript logic:

```bash
# Install dependencies (TypeScript compiler)
npm install

# Compile and watch for changes
make dev
```

The backend serves the `dist/` folder, so changes will be reflected upon refreshing the browser.
