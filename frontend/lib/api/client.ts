import axios from 'axios';
import { resolveApiBaseUrl, resolveApiBaseUrlCandidates } from '@/lib/config/runtime';

export const api = axios.create({
  baseURL: resolveApiBaseUrl(),
});

let activeApiBaseUrl = resolveApiBaseUrl();

api.interceptors.request.use((config) => {
  config.baseURL = activeApiBaseUrl || resolveApiBaseUrl();

  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('digit_nepal_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    const usedBaseUrl = response.config.baseURL;
    if (typeof usedBaseUrl === 'string' && usedBaseUrl.length > 0) {
      activeApiBaseUrl = usedBaseUrl;
      api.defaults.baseURL = usedBaseUrl;
    }
    return response;
  },
  async (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalConfig = error.config as (typeof error.config & { __apiRetryAttempted?: boolean }) | undefined;
    if (!originalConfig || originalConfig.__apiRetryAttempted) {
      return Promise.reject(error);
    }

    const isNetworkError = error.code === 'ERR_NETWORK' || !error.response;
    if (!isNetworkError) {
      return Promise.reject(error);
    }

    const currentBaseUrl =
      (typeof originalConfig.baseURL === 'string' && originalConfig.baseURL) || activeApiBaseUrl;

    const nextBaseUrl = resolveApiBaseUrlCandidates().find((candidate) => candidate !== currentBaseUrl);
    if (!nextBaseUrl) {
      return Promise.reject(error);
    }

    originalConfig.__apiRetryAttempted = true;
    originalConfig.baseURL = nextBaseUrl;
    activeApiBaseUrl = nextBaseUrl;
    api.defaults.baseURL = nextBaseUrl;

    return api(originalConfig);
  },
);
