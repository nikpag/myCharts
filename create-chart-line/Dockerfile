# syntax=docker/dockerfile:1

FROM node:20-bullseye
ENV NODE_ENV=development
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN npm rebuild canvas --update-binary
CMD ["npm", "run", "dev"]
