FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN corepack enable && yarn install --frozen-lockfile

COPY . .

ENV NODE_OPTIONS="--import @instana/collector/esm-register.mjs"
ENV INSTANA_AGENT_HOST="localhost"
ENV INSTANA_AGENT_PORT="42699"
ENV INSTANA_CAPTURE_SQL=true

CMD ["node", "consumer.js"]
