FROM node:20.2

# According to Next.js documentation, NEXT_PUBLIC_* variables must be set before build time,
# so we set them here, instead of the docker-compose.yaml file
ENV NEXT_PUBLIC_MYCHARTS_PRIMARY_COLOR=#390050
ENV NEXT_PUBLIC_URL_CHART_CREATE=http://localhost:4009/createChart
ENV NEXT_PUBLIC_URL_CHART_DOWNLOAD=http://localhost:4008/downloadChart
ENV NEXT_PUBLIC_URL_CHARTLIST_GET=http://localhost:4008/getChartList
ENV NEXT_PUBLIC_URL_CREDITS_UPDATE=http://localhost:4010/updateCredits
ENV NEXT_PUBLIC_URL_LAST_LOGIN_UPDATE=http://localhost:4010/updateLastLogin
ENV NEXT_PUBLIC_URL_USER_CREATE=http://localhost:4010/createUser
ENV NEXT_PUBLIC_URL_USER_GET=http://localhost:4010/getUser

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
