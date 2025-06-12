# Build stage
FROM node:20.18.0-alpine AS build_env

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build_env /app/dist/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /etc/nginx/ssl/live/idiomstats.com

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]