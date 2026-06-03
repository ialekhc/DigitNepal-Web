# Digit Nepal Website

Frontend-only company website for Digit Nepal built with Next.js, React, Tailwind CSS, Framer Motion, React Hook Form, and Zod.

## Structure

```text
DigitNepal-Web/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── constants/
│   ├── layouts/
│   ├── lib/
│   ├── public/
│   └── package.json
├── .env.example
├── docker-compose.yml
├── package.json
└── README.md
```

## Requirements

- Node.js 20+
- npm 10+

## Local Development

```bash
npm install
npm run dev
```

Website runs at `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Docker

```bash
docker compose up --build
```

Website runs at `http://localhost:3001`.

## Notes

- The project is now frontend-only.
- Contact, event registration, and career application forms work as frontend mailto flows.
- All public content is driven from local constants and fallback data inside `frontend/lib/`.
