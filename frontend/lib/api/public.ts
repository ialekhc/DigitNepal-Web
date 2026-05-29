import { api } from './client';

export async function fetchList<T>(endpoint: string): Promise<T[]> {
  const { data } = await api.get(endpoint);
  return data.items ?? data;
}

export async function fetchOne<T>(endpoint: string): Promise<T> {
  const { data } = await api.get(endpoint);
  return data;
}

export async function postData<T>(endpoint: string, payload: unknown): Promise<T> {
  const { data } = await api.post(endpoint, payload);
  return data;
}

export async function patchData<T>(endpoint: string, payload: unknown): Promise<T> {
  const { data } = await api.patch(endpoint, payload);
  return data;
}

export async function deleteData(endpoint: string): Promise<{ message: string }> {
  const { data } = await api.delete(endpoint);
  return data;
}
