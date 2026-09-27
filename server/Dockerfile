FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
COPY client/package.json ./client/package.json
COPY server/package.json ./server/package.json
COPY shared/package.json ./shared/package.json
RUN npm ci
COPY server ./server
COPY shared ./shared
EXPOSE 4000
CMD ["npm", "run", "start", "--workspace", "@digitnepal/server"]
