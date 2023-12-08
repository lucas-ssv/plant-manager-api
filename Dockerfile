FROM node:20
WORKDIR /usr/src/plant-manager-api
COPY ./package.json .
RUN npm install --omit=dev
RUN npx prisma generate --schema=./dist/infra/db/prisma/schema.prisma
