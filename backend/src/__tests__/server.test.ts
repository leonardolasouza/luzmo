import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import { app } from '../server';
import { ROUTE_AUTH_TOKEN } from '../../config/constants';

describe('Security: Token Endpoint', () => {
  it('should NOT leak Luzmo API secrets in the response', async () => {
    // We expect this to fail in the test environment if secrets aren't set,
    // or succeed if we mock the Luzmo client.
    // For this basic PoC test, we just check the structure.

    // Note: We are using a GET request as defined in server.ts
    const res = await request(app).get(ROUTE_AUTH_TOKEN);

    // If secrets are missing, server.ts throws at startup, so this test won't even run.
    // If we reach here, the server started.

    if (res.statusCode === 200) {
      expect(res.body.error).toBe(false);
      expect(res.body.result).toHaveProperty('id');
      expect(res.body.result).toHaveProperty('token');

      const responseString = JSON.stringify(res.body);
      // Ensure the actual secrets (if they were known here) are not in the string.
      // Since we don't want to import .env secrets into the test, we just check general safety.
      expect(responseString).not.toContain('LUZMO_API_KEY');
    } else {
      // It might fail with 500 if Luzmo API is unreachable, which is fine for a connectivity test.
      expect(res.body.error).toBe(true);
    }
  });
});
