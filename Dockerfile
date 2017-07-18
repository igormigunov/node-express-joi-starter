FROM node:8.1

MAINTAINER Migunov Igor <igormigunov42@gmail.com>

WORKDIR /api

COPY . /api
COPY package.json /api/package.json
COPY .env /api/.env

ENV NODE_ENV production
RUN yarn install --production

CMD ["npm","start"]


