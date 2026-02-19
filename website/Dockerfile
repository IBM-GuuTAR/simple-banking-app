FROM node:20-alpine AS builder

ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

RUN apk update && apk upgrade

WORKDIR /app

COPY package.json ./

RUN corepack enable && yarn install --frozen-lockfile

ENV NODE_OPTIONS="--import @instana/collector/esm-register.mjs"
COPY . .

RUN yarn build 

# Production stage
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
