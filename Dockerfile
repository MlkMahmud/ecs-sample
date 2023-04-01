FROM public.ecr.aws/docker/library/node:18.15.0-bullseye-slim

RUN RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

ENV NODE_ENV production

ENV PORT 3000

WORKDIR /usr/src/app

COPY --chown=node:node dist/ package*.json .

RUN npm ci --only=production

USER node

CMD ["dumb-init", "node", "index.js"]
