'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAdminUser } from '@/hooks/use-admin-auth';

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const userQuery = useAdminUser();

  useEffect(() => {
    if (userQuery.isFetched && !userQuery.data) {
      router.replace('/admin/login');
    }
  }, [router, userQuery.data, userQuery.isFetched]);

  if (userQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-300">
        Verifying access...
      </div>
    );
  }

  if (!userQuery.data) {
    return null;
  }

  return <>{children}</>;
}
