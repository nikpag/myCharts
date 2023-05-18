# syntax=docker/dockerfile:1

FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /frontend
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --omit-dev
COPY . .
CMD ["npm", "run", "dev"]
