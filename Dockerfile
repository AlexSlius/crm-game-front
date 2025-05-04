FROM node:22-alpine as build

WORKDIR /crm

COPY . .

RUN npm install
RUN npm run build

FROM nginx:latest

COPY --from=build /crm/build /usr/share/nginx/html

COPY ../nginx/nginx.conf /etc/nginx/conf.d/default.conf

#EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
