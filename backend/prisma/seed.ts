import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Digit@12345', 10);

  await prisma.user.upsert({
    where: { email: 'admin@digitnepal.com' },
    update: {},
    create: {
      name: 'Digit Nepal Super Admin',
      email: 'admin@digitnepal.com',
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  });

  const defaultServices = [
    {
      title: 'Custom Software Development',
      slug: 'custom-software-development',
      description:
        'We develop scalable web applications, enterprise systems, and management platforms tailored to your goals.',
      featured: true,
      order: 1,
    },
    {
      title: 'Mobile App Development',
      slug: 'mobile-app-development',
      description:
        'Cross-platform and native mobile applications designed for performance, usability, and business growth.',
      featured: true,
      order: 2,
    },
    {
      title: 'UI/UX Design',
      slug: 'ui-ux-design',
      description:
        'Modern, user-focused interfaces and digital experiences that improve engagement and product adoption.',
      order: 3,
    },
    {
      title: 'Website Development',
      slug: 'website-development',
      description:
        'Professional websites, business portals, and e-commerce platforms optimized for speed and SEO.',
      order: 4,
    },
    {
      title: 'Digital Marketing',
      slug: 'digital-marketing',
      description:
        'Data-driven SEO, content, and social media campaigns that turn online engagement into qualified customers.',
      order: 5,
    },
    {
      title: 'Business & Tech Consulting',
      slug: 'business-tech-consulting',
      description:
        'Technology consulting, workflow optimization, and startup guidance for practical digital transformation.',
      order: 6,
    },
    {
      title: 'Cloud & Deployment Solutions',
      slug: 'cloud-deployment-solutions',
      description:
        'Secure deployment, VPS setup, server configuration, and cloud infrastructure management services.',
      order: 7,
    },
    {
      title: 'Training & Workshops',
      slug: 'training-workshops',
      description:
        'Industry-focused training in Python, Java, Flutter, UI/UX, web development, and digital skills.',
      order: 8,
    },
  ];

  for (const service of defaultServices) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  await prisma.setting.upsert({
    where: { key: 'company_info' },
    update: {},
    create: {
      key: 'company_info',
      value: {
        name: 'Digit Nepal',
        email: 'hello@digitnepal.com',
        phone: '+977-9800000000',
        address: 'Kathmandu, Nepal',
        tagline: 'Turn Ideas into Impact with Digit Nepal',
      },
      description: 'Primary company profile information',
    },
  });

  await prisma.setting.upsert({
    where: { key: 'seo_defaults' },
    update: {},
    create: {
      key: 'seo_defaults',
      value: {
        title: 'Digit Nepal | Technology & Digital Transformation',
        description: 'Digit Nepal builds modern digital products, platforms, and growth systems for organizations.',
        keywords: ['Digit Nepal', 'Nepal tech company', 'software company Nepal', 'digital agency Nepal'],
      },
      description: 'Default SEO metadata',
    },
  });

  await prisma.setting.upsert({
    where: { key: 'home_company_photos' },
    update: {},
    create: {
      key: 'home_company_photos',
      value: {
        items: [
          {
            id: 'company-photo-1',
            title: 'Creative Product Sessions',
            description:
              'Collaborative discovery and planning sessions where strategy, design, and engineering align.',
            imageUrl: '/brand/favicon-alt-512.png',
            alt: 'Digit Nepal creative planning workspace',
            order: 1,
          },
          {
            id: 'company-photo-2',
            title: 'Engineering & Delivery',
            description:
              'Focused software development and delivery from architecture to production deployment.',
            imageUrl: '/brand/favicon-512.png',
            alt: 'Digit Nepal software engineering team',
            order: 2,
          },
          {
            id: 'company-photo-3',
            title: 'Training & Community',
            description:
              'Hands-on workshops and training sessions for students and professionals in modern technology.',
            imageUrl: '/brand/favicon-alt-512.png',
            alt: 'Digit Nepal technology training and workshop',
            order: 3,
          },
        ],
      },
      description: 'Homepage company photos and gallery',
    },
  });

  await prisma.setting.upsert({
    where: { key: 'about_team_members' },
    update: {
      value: {
        members: [
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
        ],
      },
      description: 'About page team members',
    },
    create: {
      key: 'about_team_members',
      value: {
        members: [
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
            name: 'Business Development Manager',
            designation: 'Business Development Manager',
            description:
              'Drives client partnerships, growth opportunities, and strategic collaboration to expand Digit Nepal services.',
            photoUrl: '/team/business-development-manager.jpg',
            order: 2,
          },
        ],
      },
      description: 'About page team members',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
