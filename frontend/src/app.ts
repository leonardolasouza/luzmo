import { ROUTE_AUTH_TOKEN, LUZMO_EMBED_URL } from './constants.js';

/**
 * Standard Response Wrapper matching the Backend
 */
interface StandardResponse<T = unknown> {
  error: boolean;
  errors: Array<{ code: string; message: string }>;
  result: T | null;
}

interface LuzmoTokenResult {
  id: string;
  token: string;
  dashboardId: string;
}

/**
 * Dynamically loads an external script
 */
function loadScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Avoid double loading
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load SDK: ${url}`));
    document.head.appendChild(script);
  });
}

async function loadDashboard() {
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error-message');
  const dashboard = document.getElementById('dashboard') as any;

  if (!loadingEl || !errorEl || !dashboard) return;

  try {
    // 0. Load the Luzmo SDK first
    await loadScript(LUZMO_EMBED_URL);

    // 1. Fetch secure token from the backend
    const response = await fetch(ROUTE_AUTH_TOKEN);
    const data: StandardResponse<LuzmoTokenResult> = await response.json();

    if (data.error || !data.result) {
      throw new Error(data.errors[0]?.message || 'Failed to get token');
    }

    // 2. Inject token into the web component
    dashboard.authKey = data.result.id;
    dashboard.authToken = data.result.token;

    if (!data.result.dashboardId) {
      throw new Error('Dashboard ID is missing from the server response');
    }
    dashboard.dashboardId = data.result.dashboardId;

    loadingEl.style.display = 'none';
  } catch (error: unknown) {
    loadingEl.style.display = 'none';
    const message = error instanceof Error ? error.message : 'Unknown error';
    errorEl.innerText = `Error: ${message}`;
    console.error('Dashboard load error:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadDashboard();
});
