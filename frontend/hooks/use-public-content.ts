'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchList } from '@/lib/api/public';
import { fallbackApplications, fallbackBlogs, fallbackEvents, fallbackServices } from '@/lib/data/fallback';
import { queryKeys } from '@/lib/query-keys';
import { Application, Blog, Event, Service } from '@/lib/types';

export function useServices() {
  return useQuery<Service[]>({
    queryKey: queryKeys.public.services,
    queryFn: () => fetchList<Service>('/services'),
    placeholderData: fallbackServices,
  });
}

export function useApplications() {
  return useQuery<Application[]>({
    queryKey: queryKeys.public.applications,
    queryFn: () => fetchList<Application>('/applications'),
    placeholderData: fallbackApplications,
  });
}

export function useEvents() {
  return useQuery<Event[]>({
    queryKey: queryKeys.public.events,
    queryFn: () => fetchList<Event>('/events'),
    placeholderData: fallbackEvents,
  });
}

export function useBlogs() {
  return useQuery<Blog[]>({
    queryKey: queryKeys.public.blogs,
    queryFn: () => fetchList<Blog>('/blogs'),
    placeholderData: fallbackBlogs,
  });
}
