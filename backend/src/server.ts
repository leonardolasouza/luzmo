import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import Luzmo from '@luzmo/nodejs-sdk';

import {
  PORT,
  LUZMO_TOKEN_INACTIVITY_INTERVAL,
  FRONTEND_DIR,
  ROUTE_AUTH_TOKEN,
  DASHBOARD_IDS,
  LUZMO_API_KEY,
  LUZMO_API_TOKEN,
} from '../config/constants';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(FRONTEND_DIR));

// Initialize Luzmo Client
const luzmoClient = new Luzmo({
  api_key: LUZMO_API_KEY,
  api_token: LUZMO_API_TOKEN,
});

/**
 * Standard Response Wrapper
 */
interface StandardResponse<T = unknown> {
  error: boolean;
  errors: Array<{ code: string; message: string }>;
  result: T | null;
}

app.get(ROUTE_AUTH_TOKEN, async (req: Request, res: Response) => {
  try {
    // Grant access to ALL configured dashboards in a single token
    const dashboardsAccess = DASHBOARD_IDS.map((id) => ({
      id,
      rights: 'read',
    }));

    const tokenResponse = await luzmoClient.create('authorization', {
      type: 'embed',
      inactivity_interval: LUZMO_TOKEN_INACTIVITY_INTERVAL,
      username: 'poc-user',
      name: 'PoC User',
      email: 'poc@example.com',
      access: {
        dashboards: dashboardsAccess,
      },
    });

    const response: StandardResponse<{ id: string; token: string; dashboardIds: string[] }> = {
      error: false,
      errors: [],
      result: {
        id: tokenResponse.id,
        token: tokenResponse.token,
        dashboardIds: DASHBOARD_IDS,
      },
    };

    res.status(200).json(response);
  } catch (error: any) {
    const errorMessage = error?.message || 'Failed to authenticate with Luzmo platform.';
    console.error('Error generating Luzmo token:', error);

    const errorResponse: StandardResponse = {
      error: true,
      errors: [
        {
          code: 'ERR_LUZMO_AUTH_FAILED',
          message: errorMessage,
        },
      ],
      result: null,
    };

    res.status(500).json(errorResponse);
  }
});

// Fallback to serve index.html for SPA if needed
app.use((req: Request, res: Response) => {
  res.sendFile(path.join(FRONTEND_DIR, 'index.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Luzmo PoC Backend is running at http://localhost:${PORT}`);
  });
}

export { app };
