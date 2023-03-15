FROM node:lts-buster as build-stage

COPY ["package.json", "pnpm-lock.yaml", "./"]

RUN npm install -g pnpm

RUN pnpm install

COPY . ./

RUN pnpm build

FROM node:lts-buster as prod-stage

WORKDIR /app

COPY --from=build-stage /dist ./

COPY --from=build-stage config.json ./

EXPOSE 3001

CMD ["node", "index.js"]