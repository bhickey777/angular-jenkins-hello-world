# Stage 1: build. TypeScript needs compiling to JS before it can run -
# this stage has the full dev toolchain (tsc, type definitions), none of
# which the running service needs.
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Stage 2: run. Only production dependencies and the compiled dist/ cross
# the boundary between stages - no TypeScript compiler, no test files, no
# dev dependencies ship in the final image.
FROM nginx:27-alpine

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
