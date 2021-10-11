FROM node:16-alpine3.14

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . ./

CMD ["yarn dev"]
