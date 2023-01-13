FROM node:lts

WORKDIR /app

COPY ["package.json", "pnpm-lock.yaml", "./"]

RUN npm install -g pnpm

RUN pnpm install

COPY . ./

EXPOSE 3001

CMD ["pnpm", "start"]