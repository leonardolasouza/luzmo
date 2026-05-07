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
  DEFAULT_DASHBOARD_ID,
  LUZMO_API_KEY,
  LUZMO_API_TOKEN,
  LUZMO_INTEGRATION_ID,
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
    const tokenResponse = await luzmoClient.create('authorization', {
      type: 'sso',
      integration_id: LUZMO_INTEGRATION_ID,
      inactivity_interval: LUZMO_TOKEN_INACTIVITY_INTERVAL,
    });

    const response: StandardResponse<{ id: string; token: string; dashboardId: string }> = {
      error: false,
      errors: [],
      result: {
        id: tokenResponse.id,
        token: tokenResponse.token,
        dashboardId: DEFAULT_DASHBOARD_ID,
      },
    };

    res.status(200).json(response);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to authenticate with Luzmo platform.';
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
