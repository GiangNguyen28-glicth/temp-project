FROM node:16.18.0-buster  AS development
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn start:dev

FROM node:16.18.0-buster

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]