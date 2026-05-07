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
  dashboardIds: string[];
}

/**
 * Dynamically loads an external script
 */
function loadScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
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

async function loadDashboards() {
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error-message');
  const containerEl = document.getElementById('dashboards-container');

  if (!loadingEl || !errorEl || !containerEl) return;

  // Ensure error element is hidden initially
  errorEl.style.display = 'none';

  try {
    // 0. Load the Luzmo SDK first
    await loadScript(LUZMO_EMBED_URL);

    // 1. Fetch secure token from the backend (grants access to all dashboards)
    const response = await fetch(ROUTE_AUTH_TOKEN);
    const data: StandardResponse<LuzmoTokenResult> = await response.json();

    if (data.error || !data.result) {
      throw new Error(data.errors[0]?.message || 'Failed to get token');
    }

    const { id, token, dashboardIds } = data.result;

    if (!dashboardIds || dashboardIds.length === 0) {
      throw new Error('No Dashboard IDs returned from the server');
    }

    // 2. Clear container and inject dashboards
    containerEl.innerHTML = '';

    dashboardIds.forEach((dashboardId, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'dashboard-wrapper';

      const title = document.createElement('h3');
      title.innerText = `Dashboard ${index + 1}`;
      wrapper.appendChild(title);

      const embed = document.createElement('luzmo-embed-dashboard') as any;
      embed.dashboardId = dashboardId;
      embed.authKey = id;
      embed.authToken = token;

      wrapper.appendChild(embed);
      containerEl.appendChild(wrapper);
    });

    loadingEl.style.display = 'none';
  } catch (error: unknown) {
    loadingEl.style.display = 'none';
    const message = error instanceof Error ? error.message : 'Unknown error';

    // Display error message and make the element visible
    errorEl.innerText = `Error: ${message}`;
    errorEl.style.display = 'block';

    console.error('Dashboards load error:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadDashboards();
});
