export type NavigationItem = {
  href: string;
  label: string;
};

export type MegaMenuItem = {
  title: string;
  href: string;
  description: string;
};

export type FooterNavGroup = {
  title: string;
  links: NavigationItem[];
};

export const primaryNavigation: NavigationItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/training', label: 'Training' },
  { href: '/events', label: 'Events' },
  { href: '/blog', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

export const megaMenu: Record<'Services' | 'Solutions' | 'Training', MegaMenuItem[]> = {
  Services: [
    {
      title: 'Software Development',
      href: '/services#software-development',
      description: 'Scalable software platforms tailored for business operations.',
    },
    {
      title: 'Mobile App Development',
      href: '/services#mobile-app-development',
      description: 'Cross-platform and native mobile experiences with enterprise quality.',
    },
    {
      title: 'UI/UX Design',
      href: '/services#ui-ux-design',
      description: 'User-first product design systems and high-converting interfaces.',
    },
  ],
  Solutions: [
    {
      title: 'Restaurant POS',
      href: '/solutions#restaurant-pos',
      description: 'Fast billing, inventory, and kitchen flow for modern restaurants.',
    },
    {
      title: 'Hotel Management',
      href: '/solutions#hotel-management',
      description: 'Reservations, operations, and guest lifecycle in one system.',
    },
    {
      title: 'ERP & Public Platforms',
      href: '/solutions',
      description: 'Enterprise-grade modules for operations, governance, and services.',
    },
  ],
  Training: [
    {
      title: 'Courses',
      href: '/training',
      description: 'Industry-focused programs across software, design, and digital skills.',
    },
    {
      title: 'Workshops',
      href: '/events',
      description: 'Hands-on practical sessions with real project exposure.',
    },
    {
      title: 'Certifications',
      href: '/training',
      description: 'Career-oriented certification and portfolio-focused learning tracks.',
    },
  ],
};

export const footerQuickLinks: NavigationItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/training', label: 'Training' },
  { href: '/events', label: 'Events' },
  { href: '/blog', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

export const footerNavGroups: FooterNavGroup[] = [
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/portfolio', label: 'Portfolio' },
      { href: '/careers', label: 'Careers' },
      { href: '/events', label: 'Events' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { href: '/services#software-development', label: 'Software Development' },
      { href: '/services#mobile-app-development', label: 'Mobile App Development' },
      { href: '/services#web-development', label: 'Web Development' },
      { href: '/services#ui-ux-design', label: 'UI/UX Design' },
      { href: '/services#cloud-solutions', label: 'Cloud Solutions' },
      { href: '/services#it-consulting', label: 'IT Consulting' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { href: '/solutions#restaurant-pos', label: 'Restaurant POS' },
      { href: '/solutions#hotel-management', label: 'Hotel Management' },
      { href: '/solutions#erp-system', label: 'ERP System' },
      { href: '/solutions#healthcare-solutions', label: 'Healthcare Solutions' },
      { href: '/solutions#school-management', label: 'School Management' },
      { href: '/solutions#public-service-platforms', label: 'Public Service Platforms' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/training', label: 'Training' },
      { href: '/courses', label: 'Courses' },
      { href: '/events', label: 'Workshops' },
      { href: '/events', label: 'Events' },
      { href: '/blog', label: 'Blog' },
      { href: '/portfolio', label: 'Case Studies' },
      { href: '/contact', label: 'Documentation' },
    ],
  },
];
