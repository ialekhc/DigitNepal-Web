'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchList } from '@/lib/api/public';
import { fallbackApplications, fallbackBlogs, fallbackEvents, fallbackServices } from '@/lib/data/fallback';
import { Application, Blog, Event, Service } from '@/lib/types';

export function useServices() {
  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: () => fetchList<Service>('/services'),
    placeholderData: fallbackServices,
  });
}

export function useApplications() {
  return useQuery<Application[]>({
    queryKey: ['applications'],
    queryFn: () => fetchList<Application>('/applications'),
    placeholderData: fallbackApplications,
  });
}

export function useEvents() {
  return useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: () => fetchList<Event>('/events'),
    placeholderData: fallbackEvents,
  });
}

export function useBlogs() {
  return useQuery<Blog[]>({
    queryKey: ['blogs'],
    queryFn: () => fetchList<Blog>('/blogs'),
    placeholderData: fallbackBlogs,
  });
}
