# Constants Registry (Single Source of Truth)

> [!IMPORTANT]
> For all system constants, defaults, and configuration keys, please refer directly to the source of truth in the codebase:
> **[backend/config/constants.ts](../../../backend/config/constants.ts)**

## Configuration Strategy
- **Environment Variables:** All sensitive credentials (API keys, tokens) and environment-specific settings (PORT) are managed via a `.env` file.
- **Port:** The default development port is **3500** (see [backend/config/constants.ts](../../../backend/config/constants.ts)). This single port is used to both serve the backend API and host the static frontend application.
- **No-Fallback Policy:** To ensure system integrity, critical configuration values (like PORT or LUZMO_DASHBOARD_ID) have **no defaults** in the code. I've designed the system to fail fast with a fatal error if these are missing, forcing a correct environment setup.
- **URI Topology:** All routing constants and API endpoints are externalized in the constants file above to ensure that no "magic" numbers / hardcoded strings are used throughout the application.