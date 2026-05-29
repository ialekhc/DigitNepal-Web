# Digit Nepal Website

Professional company website platform for Digit Nepal with a clean monorepo structure:

- `frontend`: Next.js + React + Tailwind + Framer Motion + shadcn/ui
- `backend`: NestJS + Prisma + PostgreSQL + JWT/RBAC

## Project Structure

```text
DigitNepal-Web/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── services/
│   └── package.json
├── backend/
│   ├── src/
│   ├── prisma/
│   └── package.json
├── .env.example
├── docker-compose.yml
├── package.json
└── README.md
```

## Requirements

- Node.js 20+
- npm 10+
- PostgreSQL 16+ (or Docker)

## Environment Setup

1. Copy environment file:

```bash
cp .env.example .env
```

2. Update required values in `.env`:

- `DATABASE_URL`
- `JWT_SECRET`
- `NEXT_PUBLIC_API_URL`
- Cloudinary keys (if media upload is required)

## Local Development

Install dependencies:

```bash
npm install
```

Run frontend + backend together:

```bash
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`

Run individually:

```bash
npm run dev:web
npm run dev:api
```

## Database Commands

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

## Production Build

```bash
npm run build
```

## Docker (Frontend + Backend + Postgres)

```bash
docker compose up --build
```

- Frontend: `http://localhost:3001`
- Backend: `http://localhost:5001/api`

## Notes

- This repository is cleaned to keep only required runtime and source files.
- Deployment-provider-specific files and configs were removed.
