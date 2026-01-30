FROM node:20-alpine AS builder

RUN apk update && apk upgrade

WORKDIR /app

COPY package.json yarn.lock ./

RUN corepack enable && yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx:alpine

RUN apk update && apk upgrade

COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
