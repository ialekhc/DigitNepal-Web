FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
COPY client/package.json ./client/package.json
RUN npm ci
COPY client ./client
RUN npm run build --workspace @digitnepal/client
EXPOSE 3000
CMD ["npm", "run", "start", "--workspace", "@digitnepal/client"]
