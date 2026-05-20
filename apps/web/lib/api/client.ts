import axios from 'axios';

function resolveBaseUrl() {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname || 'localhost';
    const isLocalHost = host === 'localhost' || host === '127.0.0.1';
    if (isLocalHost) {
      if (window.location.port === '3001') {
        return `http://${host}:5001/api`;
      }
      if (window.location.port === '3000') {
        return `http://${host}:5000/api`;
      }
    }
  }

  return 'http://localhost:5000/api';
}

const baseURL = resolveBaseUrl();

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('digit_nepal_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
