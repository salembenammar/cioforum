FROM node:10.15.3-alpine

RUN apk update && apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
        curl \
        git bash figlet nano

RUN npm i -g node-gyp typescript @nestjs/cli@6.3.0

RUN mkdir /app

WORKDIR /app
RUN mkdir logs

ADD package.json /app/package.json
ADD process.yml /app/process.yml
ADD . /app
RUN cd /app && npm i
EXPOSE 80
RUN apk del .gyp
HEALTHCHECK CMD curl --interval=5m --timeout=1m --fail http://localhost || exit 1
CMD npm run start:dev
