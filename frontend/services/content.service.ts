import { deleteData, fetchList, fetchOne, patchData, postData } from '@/lib/api/public';
import type { Application, Blog, Event, Service, SettingRecord } from '@/types';

export const contentService = {
  getServices: () => fetchList<Service>('/services'),
  getSolutions: () => fetchList('/solutions'),
  getPortfolio: () => fetchList<Application>('/applications'),
  getEvents: () => fetchList<Event>('/events'),
  getBlogs: () => fetchList<Blog>('/blogs'),
  getSettings: () => fetchList<SettingRecord>('/settings'),
  getSettingByKey: (key: string) => fetchOne<SettingRecord | null>(`/settings/${key}`),
  create: (endpoint: string, payload: unknown) => postData(endpoint, payload),
  update: (endpoint: string, payload: unknown) => patchData(endpoint, payload),
  remove: (endpoint: string) => deleteData(endpoint),
};
