FROM node:20-alpine
WORKDIR /app

COPY package.json ./
COPY frontend/package.json ./frontend/package.json
RUN npm install

COPY frontend ./frontend
RUN npm run build --workspace @digitnepal/frontend

EXPOSE 3000
CMD ["npm", "run", "start", "--workspace", "@digitnepal/frontend"]
