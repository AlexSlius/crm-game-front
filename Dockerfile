FROM node:22-alpine

WORKDIR /crm

COPY . .

RUN npm install
RUN npm run build
