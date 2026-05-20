# Digit Nepal Platform

Production-ready full-stack company website and admin CMS for **Digit Nepal**.

## Stack

- Frontend: Next.js 16, React 19, Tailwind CSS, Framer Motion, shadcn-style UI components, React Hook Form, Zod, Axios, TanStack Query
- Backend: NestJS 11, PostgreSQL, Prisma ORM, JWT auth, RBAC, Multer + Cloudinary upload

## UI Theme

The website now follows a **Material-inspired dark theme** with a **terminal/programmer vibe**:

- Logo-driven color system: deep navy (`#0F1C3D`), hot pink (`#FF2C6D`), rose magenta (`#C92867`), and light neutral (`#F4F0E6`)
- Dark material surfaces with elevation and glassmorphism layers
- Monospace-forward visual language for headings and badges
- Software-company style gradient + grid background patterns
- Terminal-style hero accents and command-line aesthetic cards
- Mobile-first responsive layout across all public pages

## Service Catalog (with short descriptions)

- **Custom Software Development**: Scalable web applications, enterprise systems, and management platforms built around business workflows.
- **Mobile App Development**: Cross-platform and native mobile applications designed for performance and product growth.
- **UI/UX Design**: Modern, user-centered interfaces that improve usability, engagement, and conversion.
- **Website Development**: Business websites, portals, and e-commerce solutions optimized for performance and SEO.
- **Digital Marketing**: Social media, branding, and campaign execution focused on measurable digital outcomes.
- **Business & Tech Consulting**: Digital transformation planning, workflow optimization, and startup guidance.
- **Cloud & Deployment Solutions**: Secure deployment, VPS setup, server configuration, and cloud infrastructure support.
- **Training & Workshops**: Industry-focused training in Python, Java, Flutter, UI/UX, web development, and digital skills.

## Monorepo Structure

```text
apps/
  api/
    prisma/
    src/
      auth/
      users/
      services/
      applications/
      events/
      blogs/
      inquiries/
      media/
      settings/
      common/
  web/
    app/
      (public)/
      admin/
    components/
    hooks/
    lib/
```

## Public Pages

- Home
- About Us
- Services
- Applications / Portfolio
- Events
- Courses / Training
- Plans & Pricing
- Blog / Updates
- Contact

## Admin Dashboard

Role-based access:

- `SUPER_ADMIN`: full access
- `ADMIN`: content + inquiries access
- `EDITOR`: blogs + events only

Admin features:

- Manage services
- Manage applications/portfolio
- Manage events
- Manage blogs
- Manage homepage company photo gallery (Super Admin)
- Manage About Us team members with photo, designation, and description (Super Admin)
- Upload images via media API
- View and update inquiries
- Update company info and SEO metadata settings (Super Admin)

## API Modules

`/api` base path with REST endpoints:

- `/auth`
- `/users`
- `/services`
- `/applications`
- `/events`
- `/blogs`
- `/inquiries`
- `/media`
- `/settings`

## Local Setup

1. Copy environment file:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

3. Generate Prisma client and migrate:

```bash
npm run prisma:generate
npm run prisma:migrate
```

4. Seed default data:

```bash
npm run prisma:seed
```

5. Start frontend + backend:

```bash
npm run dev
```

## Default Admin Login

- Email: `admin@digitnepal.com`
- Password: `Digit@12345`

Change this password immediately in production.

## Docker

```bash
docker compose up --build
```

Current compose port mapping:

- Web: `http://localhost:3001`
- API: `http://localhost:5001/api`

## Notes

- Global validation and exception filtering are enabled in NestJS.
- API auth uses JWT Bearer tokens with global guards and role guards.
- SEO defaults are managed through the `settings` module (`seo_defaults` key).
- Docker startup syncs Prisma schema and seeds the default admin/service data.
