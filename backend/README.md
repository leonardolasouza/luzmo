# Backend: Luzmo Secure Token Proxy

## Overview

This backend acts as a secure intermediary between the frontend application and the Luzmo API. It is built using Node.js, Express, and TypeScript.

The primary role of this backend is to enforce the **"Zero Client-Side Secrets"** rule.

## How It Works

Instead of giving the frontend my root Luzmo `API_KEY` and `API_TOKEN`, the frontend makes a request to my internal `/api/v1/token` endpoint (pointing to [Constants.md](../docs/spec/PRDs/Constants.md)).

The backend then:

1. Reads the securely stored `.env` credentials.
2. Uses the official `@luzmo/nodejs-sdk` to request a temporary, short-lived Single Sign-On (SSO) token.
3. Returns this temporary token (and the target Dashboard ID) to the frontend.

By keeping all business logic and authentication on the server, I make the frontend completely "dummy", significantly reducing the attack surface.

## Development Setup

```bash
# Install dependencies
npm install

# Run server in development mode (with hot-reload)
make dev
```

## API Standard

All endpoints follow a standardized response wrapper to ensure predictable error handling on the frontend:

```json
{
  "error": false,
  "errors": [],
  "result": { ...payload }
}
```

_For more details, see the PRDs in `../docs/spec/PRDs/`._
