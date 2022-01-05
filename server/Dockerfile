FROM node:14 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i


COPY . .

RUN npx prisma generate 
    # && npx migrate dev --name init

# FROM base as production

# ENV NODE_PATH=./build

# RUN npm run build

