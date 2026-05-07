# Luzmo Embedded Dashboard Proof of Concept (PoC)

## Overview
This repository contains a full Proof of Concept (PoC) for securely embedding a Luzmo dashboard into a custom web application.

This project has in this same repository:
1. **[Backend](./backend/README.md):** A Node.js/Express server that securely stores Luzmo API credentials and generates temporary SSO authorization tokens.
2. **[Frontend](./frontend/README.md):** A "dummy" HTML/TypeScript application that fetches the secure token from the backend and renders the Luzmo dashboard using the official Web Component.

*Note:* For a non PoC project, each folder would be have its own repository. I use only one single repo for simplification.

**Zero secrets are exposed to the client browser.**

---

## Getting Started

### Prerequisites
- Node.js (v24.9+)
- A free trial account on [Luzmo](https://www.luzmo.com/)

### Configuration
Before running the application, you must provide your Luzmo credentials.

1. Navigate to the `backend` directory.
2. Open the `.env` file (or create it if it doesn't exist). See `.env.example` for the required fields.
3. Fill in your credentials:
```env
LUZMO_API_KEY=your_api_key_here
LUZMO_API_TOKEN=your_api_token_here
LUZMO_DASHBOARD_ID_1=your_first_dashboard_id_here
LUZMO_DASHBOARD_ID_2=your_second_dashboard_id_here
LUZMO_INTEGRATION_ID=your_integration_id_here
PORT=3500
```

*Note: The PoC supports multiple dashboards. You can add more by following the `LUZMO_DASHBOARD_ID_X` pattern.*

### Running the Application

This PoC uses the backend Express server to both generate tokens and serve the static frontend files.

1. Install dependencies and start the backend:
```bash
cd backend
npm install
make dev
```

If you wish to modify the frontend while the backend is running, you can also run:
```bash
cd frontend
npm install
make dev
```

2. Open your browser and navigate to:
`http://localhost:3500` (pointing to [Constants.md](./docs/spec/PRDs/Constants.md))

---

## External SDKs & Dependencies
To ensure the security and stability of the embedded dashboard, this project uses the official Luzmo Embed SDK.

- **SDK Version:** `6.13.0` (Verified as the latest stable version as of 2026-05-07).
- **Audit:** The SDK version was audited against the [Luzmo CDN Metadata](https://cdn.luzmo.com/js/luzmo-embed/latest-version.json) to ensure the PoC is running on the most recent secure version.
- **Maintenance:** The SDK URL and version are centralized in `frontend/src/constants.ts` (pointing to [Constants.md](./docs/spec/PRDs/Constants.md)) for easy maintenance and to follow the "Zero-Literal" policy.

---

## Submission

As per the technical assignment constraints, here are the deliverables:

- **Link to your dashboard:** https://luzmo-app-554633983522.us-central1.run.app/
- **Link to your application (or repo):** https://github.com/leonardolasouza/luzmo
- **Video or written explanation:** Please see `docs/Explanation.mp4`

### What is being evaluated (from assignment)
- Practical implementation
- Understanding of what you built
- Clarity of explanation
- Thought process and tradeoffs

*(See the [`docs/spec/PRDs/`](./docs/spec/PRDs/) folder for comprehensive documentation on Architecture, Security, and SDLC tradeoffs.)*
