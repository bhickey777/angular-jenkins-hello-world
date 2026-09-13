# Stage 1: build
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# Stage 2: runtime
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

# dev is where JEST lives
RUN npm install 

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
