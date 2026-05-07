# API Specification & Technical Standards

## 1. Executive Summary
This document defines the communication protocols between the Frontend and Backend for the Luzmo Embedded Dashboard PoC. Adherence ensures consistency, safety, and predictable error handling on the frontend.

## 2. Standard Response Structure
All API responses must follow this uniform wrapper. This allows the frontend to use a single, predictable "Response Handler" for all network calls, regardless of whether the call succeeds or fails.

### 2.1. Success Response (200 OK)
When a request is successful, `error` is `false`, `errors` is empty, and `result` contains the payload.

```json
{
  "error": false,
  "errors": [],
  "result": {
    "id": "e2a4...",
    "token": "b8f9...",
    "dashboardIds": ["d1e5...", "f2a6..."]
  }
}
```

### 2.2. Error Response (4xx/5xx)
When a request fails, `error` is `true`, `result` is `null`, and `errors` contains an array of error objects. This prevents the frontend from crashing when trying to read undefined result properties.

```json
{
  "error": true,
  "errors": [
    {
      "code": "ERR_INTERNAL_SERVER_ERROR",
      "message": "Failed to communicate with Luzmo API."
    }
  ],
  "result": null
}
```

---

## 3. Communication Standards

### 3.1. HTTP Methods
- **GET**: Retrieve data (Idempotent). Used for fetching tokens without side effects.
- **POST**: Create new resources (Not applicable for this 1-hour PoC, but reserved for future mutations).
- **OPTIONS**: Handled by Express to support CORS Pre-flight requests if the frontend is ever decoupled from the backend domain.

### 3.2. Headers
| Header | Required | Description |
| :--- | :---: | :--- |
| `Accept` | Yes | Must be `application/json` for API endpoints. |

---

## 4. Endpoints

### 4.1 `GET /api/v1/token` (pointing to [Constants.md](./Constants.md))
Generates and returns a temporary Single Sign-On (SSO) authorization token from the Luzmo API. This token is required by the Luzmo Web Component to render the dashboard securely on the client.

**Request:**
- **Method:** `GET`
- **Path:** `/api/v1/token` (pointing to [Constants.md](./Constants.md))
- **Headers:** No special headers required for this PoC.

**Success Response (200 OK):**
```json
{
  "error": false,
  "errors": [],
  "result": {
    "id": "e2a4...",
    "token": "b8f9...",
    "dashboardIds": ["d1e5...", "f2a6..."]
  }
}
```

**Error Response Example (500 Internal Server Error):**
```json
{
  "error": true,
  "errors": [
    {
      "code": "ERR_LUZMO_AUTH_FAILED",
      "message": "The backend failed to authenticate with the Luzmo platform."
    }
  ],
  "result": null
}
```

---

## 5. Error Code Registry

| Code | HTTP Status | Description |
| :--- | :---: | :--- |
| `ERR_LUZMO_AUTH_FAILED` | 500 | Backend failed to authenticate with Luzmo (e.g., invalid `.env` credentials). |
| `ERR_INTERNAL_SERVER_ERROR` | 500 | An unhandled exception occurred in the Node.js backend. |
| `ERR_NOT_FOUND` | 404 | The requested endpoint does not exist. |
