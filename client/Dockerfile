FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
COPY client/package.json ./client/package.json
COPY server/package.json ./server/package.json
COPY shared/package.json ./shared/package.json
RUN npm ci
COPY client ./client
COPY shared ./shared
ARG BILLING_SERVER_URL=http://server:4000
ENV BILLING_SERVER_URL=${BILLING_SERVER_URL}
RUN npm run build --workspace @digitnepal/client
EXPOSE 3000
CMD ["npm", "run", "start", "--workspace", "@digitnepal/client"]
