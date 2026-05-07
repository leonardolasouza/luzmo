import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
dotenv.config();

export const LUZMO_TOKEN_INACTIVITY_INTERVAL = 3600; // 1 hour

// Parse all available dashboard IDs from environment
const dashboardIds: string[] = [];
let i = 1;
while (process.env[`LUZMO_DASHBOARD_ID_${i}`]) {
  dashboardIds.push(process.env[`LUZMO_DASHBOARD_ID_${i}`] as string);
  i++;
}

// Fallback for the single LUZMO_DASHBOARD_ID if provided
if (process.env.LUZMO_DASHBOARD_ID) {
  dashboardIds.push(process.env.LUZMO_DASHBOARD_ID);
}

if (dashboardIds.length === 0) {
  throw new Error('FATAL: No LUZMO_DASHBOARD_ID found in environment.');
}
export const DASHBOARD_IDS = dashboardIds;

if (!process.env.LUZMO_API_KEY) {
  throw new Error('FATAL: LUZMO_API_KEY is missing.');
}
export const LUZMO_API_KEY = process.env.LUZMO_API_KEY;

if (!process.env.LUZMO_API_TOKEN) {
  throw new Error('FATAL: LUZMO_API_TOKEN is missing.');
}
export const LUZMO_API_TOKEN = process.env.LUZMO_API_TOKEN;

// Integration ID is optional for some authorization types
export const LUZMO_INTEGRATION_ID = process.env.LUZMO_INTEGRATION_ID;

if (!process.env.PORT) {
  throw new Error('FATAL: PORT is missing.');
}
export const PORT = process.env.PORT;

// Determine the root of the backend directory, accounting for 'src' vs 'dist' execution
export const BACKEND_DIR = __dirname.includes('dist')
  ? path.resolve(__dirname, '../..')
  : path.resolve(__dirname, '..');

// Check if 'public' exists (production deployment via make deploy)
const publicPath = path.resolve(BACKEND_DIR, 'public');
export const FRONTEND_DIR = fs.existsSync(publicPath)
  ? publicPath
  : path.resolve(BACKEND_DIR, '../frontend');

// --- URI Topology Externalization (Zero-Literal Routing) ---
export const API_PREFIX = '/api';
export const API_V1_STR = `${API_PREFIX}/v1`;

// Endpoints
export const ROUTE_AUTH_TOKEN = `${API_V1_STR}/token`;
