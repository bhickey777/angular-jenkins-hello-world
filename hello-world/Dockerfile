# Build Angular application
FROM node:22-alpine AS build
WORKDIR /hello-world

COPY hello-world/package*.json ./
RUN npm install

COPY hello-world/ ./
RUN npm run build

# Serve the compiled application on container port 8080
FROM nginx:1.27-alpine
COPY hello-world/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/hello-world/browser /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
