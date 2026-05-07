# Testing Standards: Luzmo Embedded Dashboard PoC

## 1. Overview
This testing strategy is strictly bound by the 1-hour time limit defined for the Luzmo assignment. Heavy unit testing for UI components or complex mocking is explicitly out of scope.

The **only** mandatory automated testing requirement is verifying the security boundary: ensuring the `LUZMO_API_KEY` and `LUZMO_API_TOKEN` never leak from the backend to the "Dummy" frontend.

## 2. Automated Security Testing

Relying solely on manual verification for credential security is risky. To enforce the "Dummy Frontend" and "Zero Client-Side Secrets" principles, I implement automated checks.

### 2.1 Backend Integration Tests (Primary Defense)
The most direct and efficient way to prevent credential leakage is to test the API endpoint responsible for providing the frontend with access tokens. I use **Jest** and **Supertest** to verify the payload of the `/api/v1/token` endpoint (pointing to [Constants.md](./Constants.md)).

**Test Implementation Example:**
```javascript
const request = require('supertest');
const app = require('../server'); // Your Express app

describe('Security: Token Endpoint', () => {
  it('should NEVER leak LUZMO_API_KEY or LUZMO_API_TOKEN to the client', async () => {
    const res = await request(app).get('/api/v1/token'); // (pointing to [Constants.md](./Constants.md))

    // Assert the response is successful
    expect(res.statusCode).toBe(200);

    // Convert the response body to a string to easily search it
    const responseBody = JSON.stringify(res.body);

    // Assert that actual environment secrets are NOT anywhere in the response
    expect(responseBody).not.toContain(process.env.LUZMO_API_KEY);
    expect(responseBody).not.toContain(process.env.LUZMO_API_TOKEN);

    // Assert it ONLY contains what is expected (the SSO token structure)
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('token');
  });
});
```
*Why this matters:* This ensures that any future changes to the API endpoint or the Luzmo SDK response format do not accidentally serialize and transmit the root credentials.

### 2.2 Frontend End-to-End (E2E) Tests (Secondary Defense / Future Consideration)
For a more comprehensive security net, an E2E testing framework like **Playwright** or **Cypress** can be used. This acts as a global catch-all by monitoring all network traffic directly in the browser.

**Strategy:**
Write a global assertion that listens to all network responses within the browser session. If `process.env.LUZMO_API_KEY` or `process.env.LUZMO_API_TOKEN` is found in *any* HTTP response body, the test fails immediately.

*Why this matters:* This guarantees that even if someone creates a entirely new endpoint by mistake in the future that leaks the key, the E2E test will intercept the network request and catch the leak before the code reaches production.

## 3. Manual Testing (Rapid Validation)
Due to the PoC time constraints, functional validation is performed manually:
1. **Network Inspection:** Open Browser Developer Tools (Network Tab) and inspect the payload of all `/api/v1/token` requests (pointing to [Constants.md](./Constants.md)).
2. **Console Inspection:** Ensure no credentials or sensitive backend errors are printed to the browser console.
3. **UI Validation:** Ensure the dashboard renders correctly, respects the layout, and interactive elements (like filters) function as expected.
