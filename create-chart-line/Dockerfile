# syntax=docker/dockerfile:1

FROM node:18-alpine
ENV NODE_ENV=development
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --omit-dev
COPY . .
CMD ["npm", "run", "dev"]
