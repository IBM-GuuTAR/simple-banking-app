FROM node:20-alpine AS builder

ARG NEXT_PUBLIC_INSTANA_REPORT_URL
ENV NEXT_PUBLIC_INSTANA_REPORT_URL=$NEXT_PUBLIC_INSTANA_REPORT_URL
ARG NEXT_PUBLIC_INSTANA_EUM_KEY
ENV NEXT_PUBLIC_INSTANA_EUM_KEY=$NEXT_PUBLIC_INSTANA_EUM_KEY
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

RUN apk update && apk upgrade

WORKDIR /app

COPY package.json yarn.lock ./

RUN corepack enable && yarn install --frozen-lockfile

COPY . .

RUN yarn build 

# Production stage
FROM nginx:alpine

# Create writable directories
RUN mkdir -p /tmp/nginx-run /tmp/nginx-cache \
    && chmod -R 777 /tmp/nginx-run /tmp/nginx-cache

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
