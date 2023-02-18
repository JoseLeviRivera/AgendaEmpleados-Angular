
FROM node:latest as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod
CMD ng serve
#FROM nginx:1.17.1-alpine
#COPY --from=build-step /app/dist/AppProductoss /usr/share/nginx/html



