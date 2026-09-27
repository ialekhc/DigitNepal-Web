export type NavigationItem = {
  href: string;
  label: string;
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
  { href: '/contact', label: 'Contact' },
];

export const footerQuickLinks: NavigationItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/training', label: 'Training' },
  { href: '/events', label: 'Events' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export const footerNavGroups: FooterNavGroup[] = [
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/portfolio', label: 'Portfolio' },
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
