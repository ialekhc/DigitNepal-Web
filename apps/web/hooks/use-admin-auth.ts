'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchOne } from '@/lib/api/public';
import { Role } from '@/lib/types';

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export function useAdminUser() {
  return useQuery<AdminUser | null>({
    queryKey: ['admin-user'],
    queryFn: async () => {
      if (typeof window === 'undefined') return null;
      const token = window.localStorage.getItem('digit_nepal_token');
      if (!token) return null;
      return fetchOne<AdminUser>('/auth/me');
    },
  });
}
