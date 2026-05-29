'use client';

import { useQueries } from '@tanstack/react-query';
import { BookOpenText, BriefcaseBusiness, CalendarDays, FolderKanban, MessageSquare } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { useAdminUser } from '@/hooks/use-admin-auth';
import { fetchList } from '@/lib/api/public';
import { queryKeys } from '@/lib/query-keys';

const metricCards = [
  { key: 'services', title: 'Services', icon: BriefcaseBusiness },
  { key: 'applications', title: 'Applications', icon: FolderKanban },
  { key: 'events', title: 'Events', icon: CalendarDays },
  { key: 'blogs', title: 'Blogs', icon: BookOpenText },
  { key: 'inquiries', title: 'Inquiries', icon: MessageSquare },
] as const;

export default function DashboardOverviewPage() {
  const userQuery = useAdminUser();
  const isEditor = userQuery.data?.role === 'EDITOR';

  const queries = useQueries({
    queries: [
      {
        queryKey: queryKeys.dashboardCount.services,
        queryFn: () => fetchList('/services'),
      },
      {
        queryKey: queryKeys.dashboardCount.applications,
        queryFn: () => fetchList('/applications'),
      },
      {
        queryKey: queryKeys.dashboardCount.events,
        queryFn: () => fetchList('/events'),
      },
      {
        queryKey: queryKeys.dashboardCount.blogs,
        queryFn: () => fetchList('/blogs/admin/all'),
      },
      {
        queryKey: queryKeys.dashboardCount.inquiries,
        queryFn: () => fetchList('/inquiries'),
        enabled: !isEditor,
      },
    ],
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-sm text-slate-300/80">Manage services, events, applications, blog updates, inquiries, and SEO metadata.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metricCards.map((metric, idx) => {
          const Icon = metric.icon;
          const count = queries[idx].data?.length;
          const isProtectedInquiry = metric.key === 'inquiries' && isEditor;

          return (
            <Card key={metric.key}>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm text-slate-300/85">{metric.title}</p>
                <Icon className="h-4 w-4 text-accent-cyan" />
              </div>
              <p className="font-display text-2xl font-semibold">
                {isProtectedInquiry ? 'Restricted' : typeof count === 'number' ? count : '...'}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
