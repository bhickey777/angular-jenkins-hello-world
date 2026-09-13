# Build Angular application
FROM node:22-alpine AS build
WORKDIR /hello-world

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build

# Serve the compiled application on container port 8080
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /hello-world/dist/hello-world/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
