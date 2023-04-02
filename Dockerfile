FROM public.ecr.aws/docker/library/node:18.15.0-bullseye-slim

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

ENV NODE_ENV production

ENV PORT 8080

WORKDIR /usr/src/app

COPY --chown=node:node dist/ package*.json ./

RUN npm pkg delete scripts.prepare

RUN npm ci --omit=dev

USER node

CMD ["dumb-init", "node", "index.js"]

EXPOSE 8080
