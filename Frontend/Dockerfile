FROM node:18 AS build
WORKDIR /Frontend

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build property-manager

FROM nginx:alpine
COPY --from=build /Frontend/dist/property-manager/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 4200
