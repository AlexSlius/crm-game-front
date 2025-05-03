#crm/Dockerfile

FROM node:22-alpine AS build
WORKDIR /app
COPY . .
RUN npm install 
CMD ["npm", "run", "build"]


