FROM node  as base

WORKDIR /usr/src/app/

COPY package*.json ./
# COPY src ./src
COPY other ./other
COPY tsconfig.json ./

COPY prisma ./prisma

# RUN npm i 
# RUN npm run gen
