FROM node:20-slim
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY package.json ./
COPY backend/package.json ./backend/package.json
RUN npm install

COPY backend ./backend
RUN npx prisma generate --schema=backend/prisma/schema.prisma
RUN npm run build --workspace @digitnepal/backend

EXPOSE 5000
CMD ["node", "backend/dist/main.js"]
