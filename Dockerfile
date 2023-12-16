FROM node:20
WORKDIR /usr/src/plant-manager-api
COPY ./package.json .
COPY ./src/infra/db/prisma .
COPY ./.env .
RUN npm install --omit=dev
RUN npx prisma generate --schema=./schema.prisma
