FROM node:18.16.1-bullseye

WORKDIR /app

COPY package.json /app

RUN yarn

COPY . /app

EXPOSE 3000

RUN yarn build

CMD ["yarn", "start"]
