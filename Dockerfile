FROM node:20-alpine3.17

WORKDIR /app

COPY package.json /app

RUN yarn

COPY . /app

EXPOSE 3000

RUN yarn build

CMD ["yarn", "start"]
