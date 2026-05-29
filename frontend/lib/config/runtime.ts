const DEFAULT_PRODUCTION_API_URL = 'https://api.digitnepal.com/api';
const LOCAL_API_PORTS = ['5000', '5001'] as const;

const LOCAL_API_PORT_BY_WEB_PORT: Record<string, string> = {
  '3000': '5000',
  '3001': '5001',
};

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, '');
}

function readConfiguredApiUrl(): string | null {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!configuredUrl) {
    return null;
  }
  return normalizeBaseUrl(configuredUrl.trim());
}

function resolveLocalApiUrls(): string[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const host = window.location.hostname || 'localhost';
  const isLocalHost = host === 'localhost' || host === '127.0.0.1';
  if (!isLocalHost) {
    return [];
  }

  const preferredPort = LOCAL_API_PORT_BY_WEB_PORT[window.location.port] ?? '5000';
  const orderedPorts = [preferredPort, ...LOCAL_API_PORTS.filter((port) => port !== preferredPort)];
  return orderedPorts.map((port) => `http://${host}:${port}/api`);
}

export function resolveApiBaseUrlCandidates(): string[] {
  const localApiUrls = resolveLocalApiUrls();
  const configuredApiUrl = readConfiguredApiUrl();

  const candidates = [
    ...localApiUrls,
    configuredApiUrl,
    DEFAULT_PRODUCTION_API_URL,
  ].filter(Boolean) as string[];

  return Array.from(new Set(candidates.map((url) => normalizeBaseUrl(url))));
}

export function resolveApiBaseUrl(): string {
  return resolveApiBaseUrlCandidates()[0] ?? DEFAULT_PRODUCTION_API_URL;
}
