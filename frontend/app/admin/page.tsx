'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem('digit_nepal_token');
    if (token) {
      router.replace('/admin/dashboard');
      return;
    }
    router.replace('/admin/login');
  }, [router]);

  return null;
}
