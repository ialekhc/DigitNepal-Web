export const queryKeys = {
  auth: {
    adminUser: ['admin-user'] as const,
  },
  public: {
    services: ['services'] as const,
    applications: ['applications'] as const,
    events: ['events'] as const,
    blogs: ['blogs'] as const,
    settings: ['settings'] as const,
  },
  admin: {
    services: ['admin-services'] as const,
    applications: ['admin-applications'] as const,
    events: ['admin-events'] as const,
    blogs: ['admin-blogs'] as const,
    inquiries: ['admin-inquiries'] as const,
    settings: ['admin-settings'] as const,
  },
  dashboardCount: {
    services: ['dashboard-count', 'services'] as const,
    applications: ['dashboard-count', 'applications'] as const,
    events: ['dashboard-count', 'events'] as const,
    blogs: ['dashboard-count', 'blogs'] as const,
    inquiries: ['dashboard-count', 'inquiries'] as const,
  },
  setting: (key: string) => ['setting', key] as const,
};
