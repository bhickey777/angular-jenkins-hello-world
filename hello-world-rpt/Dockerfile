# Build Angular application
FROM node:22-alpine AS build

WORKDIR /hello-world-rpt

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# Serve compiled Angular application with nginx
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /hello-world-rpt/dist/hello-world-rpt/browser /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
