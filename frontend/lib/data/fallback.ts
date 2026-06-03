import { Application, Blog, CompanyPhoto, Event, Service, TeamMember } from '@/lib/types';
import { serviceCatalog } from './services-catalog';

export const fallbackServices: Service[] = serviceCatalog.map((service, index) => ({
  id: `service-${index + 1}`,
  title: service.title,
  slug: service.slug,
  description: service.description,
  featured: true,
  order: index + 1,
}));

export const fallbackApplications: Application[] = [
  {
    id: 'app-1',
    title: 'Himalayan Commerce Suite',
    slug: 'himalayan-commerce-suite',
    category: 'SAAS',
    description: 'A multi-tenant commerce platform for regional distributors and retailers.',
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma'],
    projectLink: '#',
    featured: true,
    imageUrl: null,
  },
  {
    id: 'app-2',
    title: 'CityCare Health App',
    slug: 'citycare-health-app',
    category: 'MOBILE_APP',
    description: 'Patient-focused mobile app for appointments, reminders, and teleconsulting.',
    technologies: ['React Native', 'Node.js', 'Firebase'],
    projectLink: '#',
    featured: true,
    imageUrl: null,
  },
];

export const fallbackEvents: Event[] = [
  {
    id: 'event-1',
    title: 'AI Product Sprint Bootcamp',
    slug: 'ai-product-sprint-bootcamp',
    eventDate: '2026-07-15T10:00:00.000Z',
    eventTime: '10:00 AM - 4:00 PM',
    venue: 'Kathmandu Innovation Hub',
    onlineLink: null,
    description: 'A practical intensive for founders and teams building AI-powered products.',
    registrationLink: '#',
    status: 'UPCOMING',
    imageUrl: null,
  },
  {
    id: 'event-2',
    title: 'Data Intelligence Webinar',
    slug: 'data-intelligence-webinar',
    eventDate: '2026-07-28T13:00:00.000Z',
    eventTime: '7:00 PM - 8:30 PM',
    venue: null,
    onlineLink: 'https://example.com',
    description: 'Real-world BI dashboards and analytics strategy session.',
    registrationLink: '#',
    status: 'UPCOMING',
    imageUrl: null,
  },
];

export const fallbackBlogs: Blog[] = [
  {
    id: 'blog-1',
    slug: 'ai-will-not-replace-developers',
    title: 'AI Will Not Replace Developers — It Will Redefine Them',
    category: 'Artificial Intelligence',
    author: 'Digit Nepal Editorial Team',
    readTime: '6 min read',
    featured: true,
    tags: ['AI', 'Software Engineering', 'Career Growth', 'Technology'],
    excerpt:
      'Artificial Intelligence is changing software development, but it is not replacing the need for skilled developers.',
    content:
      'Over the last few years, Artificial Intelligence has become one of the most discussed technologies in the software industry. From code generation tools to intelligent assistants, AI has significantly changed how developers work. This has led many aspiring developers to wonder whether software engineering remains a viable career path. The reality is that technology has always changed the way people work. Calculators did not replace mathematicians. Spreadsheets did not replace accountants. Cloud computing did not eliminate system administrators. Instead, technology transformed workflows and created new opportunities. AI excels at automating repetitive tasks, generating boilerplate code, and accelerating development processes. However, it cannot replace critical thinking, problem-solving, communication, system design, and the ability to understand business needs. The developers who thrive in the coming decade will be those who learn to leverage AI while continuing to strengthen their fundamentals. The future belongs to adaptable professionals who view AI as a productivity multiplier rather than a threat.',
    status: 'PUBLISHED',
    publishedAt: '2026-06-01T08:00:00.000Z',
    references: [
      {
        title: 'The Future of Jobs Report',
        source: 'World Economic Forum',
        url: 'https://www.weforum.org/reports/the-future-of-jobs-report',
      },
      {
        title: 'AI and the Future of Work',
        source: 'McKinsey & Company',
        url: 'https://www.mckinsey.com',
      },
    ],
  },
  {
    id: 'blog-2',
    slug: 'future-of-software-development-in-nepal',
    title: 'The Future of Software Development in Nepal',
    category: 'Technology',
    author: 'Digit Nepal Editorial Team',
    readTime: '7 min read',
    featured: true,
    tags: ['Nepal', 'Software Development', 'Technology'],
    excerpt:
      "Nepal's technology sector is rapidly growing and creating global opportunities for local talent.",
    content:
      "Nepal's software industry has undergone remarkable growth over the past decade. With increased internet accessibility, global outsourcing opportunities, and a growing population of skilled developers, the country is becoming an emerging technology hub. Businesses around the world are increasingly looking toward Nepal for software development, UI/UX design, cloud services, and digital transformation projects. The future of Nepal's technology sector depends on investment in education, innovation, and entrepreneurship. As more startups emerge and digital adoption accelerates, the demand for developers, designers, product managers, and technology consultants will continue to rise. The next decade represents an opportunity for Nepal to establish itself as a competitive player in the global technology ecosystem.",
    status: 'PUBLISHED',
    publishedAt: '2026-06-02T08:00:00.000Z',
    references: [
      {
        title: 'Digital Nepal Framework',
        source: 'Government of Nepal',
        url: 'https://digitalnepal.gov.np',
      },
    ],
  },
  {
    id: 'blog-3',
    slug: 'why-startups-need-mvp',
    title: 'Why Every Startup Needs an MVP Before Building a Full Product',
    category: 'Startups',
    author: 'Digit Nepal Editorial Team',
    readTime: '5 min read',
    featured: false,
    tags: ['Startup', 'MVP', 'Product Development'],
    excerpt:
      'Building an MVP helps startups validate ideas before investing significant resources.',
    content:
      'Many startup founders make the mistake of investing heavily in a product before validating market demand. A Minimum Viable Product (MVP) allows entrepreneurs to test assumptions, gather feedback, and reduce development risk. Instead of building every possible feature, successful startups focus on solving one core problem exceptionally well. This approach reduces costs, shortens development cycles, and provides valuable insights that influence future product decisions.',
    status: 'PUBLISHED',
    publishedAt: '2026-06-03T08:00:00.000Z',
    references: [
      {
        title: 'The Lean Startup',
        source: 'Eric Ries',
        url: 'https://theleanstartup.com',
      },
    ],
  },
  {
    id: 'blog-4',
    slug: 'importance-of-ui-ux-design',
    title: 'Why Great UI/UX Design Is a Competitive Advantage',
    category: 'Design',
    author: 'Digit Nepal Editorial Team',
    readTime: '6 min read',
    featured: false,
    tags: ['UI Design', 'UX Design', 'Product Design'],
    excerpt:
      'Good design is more than aesthetics—it directly impacts business success.',
    content:
      'Users form opinions about digital products within seconds. A poorly designed interface can result in frustration, abandonment, and lost revenue. Effective UI/UX design focuses on usability, accessibility, and user satisfaction. Businesses that invest in thoughtful design often see higher engagement rates, increased customer retention, and stronger brand loyalty. Design is not simply about making things look attractive—it is about solving problems efficiently.',
    status: 'PUBLISHED',
    publishedAt: '2026-06-04T08:00:00.000Z',
    references: [
      {
        title: 'Nielsen Norman Group UX Research',
        source: 'NNGroup',
        url: 'https://www.nngroup.com',
      },
    ],
  },
  {
    id: 'blog-5',
    slug: 'cloud-computing-for-businesses',
    title: 'Cloud Computing: The Foundation of Modern Business',
    category: 'Cloud Solutions',
    author: 'Digit Nepal Editorial Team',
    readTime: '6 min read',
    featured: false,
    tags: ['Cloud', 'AWS', 'Business Technology'],
    excerpt:
      'Cloud technology enables scalability, flexibility, and cost efficiency.',
    content:
      'Cloud computing has transformed how businesses deploy and manage applications. Instead of investing heavily in physical infrastructure, organizations can leverage scalable cloud services to support growth and innovation. Cloud platforms provide flexibility, security, and cost optimization while enabling remote collaboration and faster deployment cycles.',
    status: 'PUBLISHED',
    publishedAt: '2026-06-05T08:00:00.000Z',
    references: [
      {
        title: 'AWS Cloud Computing Overview',
        source: 'Amazon Web Services',
        url: 'https://aws.amazon.com',
      },
    ],
  },
  {
    id: 'blog-6',
    slug: 'cybersecurity-for-small-businesses',
    title: 'Cybersecurity Essentials for Small Businesses',
    category: 'Security',
    author: 'Digit Nepal Editorial Team',
    readTime: '7 min read',
    featured: false,
    tags: ['Cybersecurity', 'Security', 'Business'],
    excerpt:
      'Small businesses are increasingly targeted by cyber threats.',
    content:
      'Cybersecurity is no longer optional. Small businesses often assume attackers only target large enterprises, but cybercriminals frequently focus on smaller organizations due to weaker security controls. Implementing strong passwords, multi-factor authentication, regular updates, employee training, and secure backups can significantly reduce risk.',
    status: 'PUBLISHED',
    publishedAt: '2026-06-06T08:00:00.000Z',
    references: [
      {
        title: 'Cybersecurity Framework',
        source: 'NIST',
        url: 'https://www.nist.gov',
      },
    ],
  },
  {
    id: 'blog-7',
    slug: 'digital-transformation-guide',
    title: 'Digital Transformation: More Than Just Technology',
    category: 'Business',
    author: 'Digit Nepal Editorial Team',
    readTime: '6 min read',
    featured: false,
    tags: ['Digital Transformation', 'Business Growth'],
    excerpt:
      'Successful transformation involves people, processes, and technology.',
    content:
      'Many organizations view digital transformation as simply adopting new software. In reality, transformation requires cultural change, process optimization, and strategic planning. Technology acts as an enabler, but success depends on leadership, employee engagement, and a willingness to adapt.',
    status: 'PUBLISHED',
    publishedAt: '2026-06-07T08:00:00.000Z',
    references: [
      {
        title: 'Digital Transformation Insights',
        source: 'Deloitte',
        url: 'https://www2.deloitte.com',
      },
    ],
  },
  {
    id: 'blog-8',
    slug: 'career-roadmap-for-developers',
    title: 'A Career Roadmap for Aspiring Software Developers',
    category: 'Career',
    author: 'Digit Nepal Editorial Team',
    readTime: '8 min read',
    featured: false,
    tags: ['Career', 'Developers', 'Learning'],
    excerpt:
      'A practical guide for building a successful software engineering career.',
    content:
      'Breaking into software development can feel overwhelming. With countless languages, frameworks, and tools available, many beginners struggle to know where to start. The key is focusing on fundamentals: programming concepts, problem-solving, version control, databases, and project development. Consistency matters more than speed.',
    status: 'PUBLISHED',
    publishedAt: '2026-06-08T08:00:00.000Z',
    references: [
      {
        title: 'State of Developer Ecosystem',
        source: 'JetBrains',
        url: 'https://www.jetbrains.com/lp/devecosystem',
      },
    ],
  },
  {
    id: 'blog-9',
    slug: 'building-products-users-love',
    title: 'Building Products Users Actually Love',
    category: 'Product Development',
    author: 'Digit Nepal Editorial Team',
    readTime: '5 min read',
    featured: false,
    tags: ['Product', 'UX', 'Startups'],
    excerpt:
      'Successful products solve meaningful problems for real users.',
    content:
      'The best products are not necessarily the most technically advanced. They are the products that understand and solve user problems effectively. Product teams should invest time in research, interviews, testing, and continuous feedback to ensure they are building solutions people genuinely need.',
    status: 'PUBLISHED',
    publishedAt: '2026-06-09T08:00:00.000Z',
    references: [
      {
        title: 'Inspired',
        source: 'Marty Cagan',
        url: 'https://svpg.com',
      },
    ],
  },
  {
    id: 'blog-10',
    slug: 'continuous-learning-in-tech',
    title: 'Why Continuous Learning Is Essential in Technology',
    category: 'Professional Development',
    author: 'Digit Nepal Editorial Team',
    readTime: '6 min read',
    featured: false,
    tags: ['Learning', 'Technology', 'Career Growth'],
    excerpt:
      'The technology industry rewards those who continue learning and adapting.',
    content:
      'Technology evolves rapidly. Frameworks change, tools improve, and industries transform. Professionals who embrace lifelong learning remain relevant and competitive. Reading, building projects, attending workshops, contributing to open source, and staying curious are some of the most valuable habits a technology professional can develop.',
    status: 'PUBLISHED',
    publishedAt: '2026-06-10T08:00:00.000Z',
    references: [
      {
        title: 'Future of Learning',
        source: 'Harvard Business Review',
        url: 'https://hbr.org',
      },
    ],
  },
];

export const fallbackCompanyPhotos: CompanyPhoto[] = [
  {
    id: 'company-photo-1',
    title: 'Collaborative Product Review',
    description: 'A hands-on collaboration moment where the team reviews ideas, drafts, and product decisions together.',
    imageUrl: '/company/team-collaboration-1.jpg',
    alt: 'Digit Nepal team members reviewing notes and a tablet together',
    order: 1,
  },
  {
    id: 'company-photo-2',
    title: 'Focused Teamwork',
    description: 'Close collaboration and shared problem-solving during a live working session at Digit Nepal.',
    imageUrl: '/company/team-collaboration-2.jpg',
    alt: 'Digit Nepal team members discussing a tablet during a focused work session',
    order: 2,
  },
];

export const fallbackTeamMembers: TeamMember[] = [
  {
    id: 'team-member-1',
    name: 'Alekh Chaudhary',
    designation: 'CEO & Founder',
    description:
      'Leads company vision, product strategy, and digital innovation initiatives across client and in-house platforms.',
    photoUrl: '/team/alekh-chaudhary.jpg',
    order: 1,
  },
  {
    id: 'team-member-2',
    name: 'Arun K. Chaudhary',
    designation: 'Business Development Manager',
    description:
      'Drives client partnerships, growth opportunities, and strategic collaboration to expand Digit Nepal services.',
    photoUrl: '/team/business-development-manager.jpg',
    order: 2,
  },
];
