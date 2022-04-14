FROM node  as base


WORKDIR /usr/src/app/


COPY ./package*.json ./
COPY ./src ./src
COPY ./other ./other

COPY ./tsconfig.json ./
COPY ./webpack.config.js ./

COPY ./prisma ./prisma

RUN npm i 
RUN npm run build

FROM node as product

WORKDIR /usr/src/app/

ENV NODE_NEV production

COPY ./package*.json ./
COPY ./other ./other
COPY ./prisma ./prisma
COPY --from=base /usr/src/app/dist ./

RUN npm install --production
RUN npm run gen
