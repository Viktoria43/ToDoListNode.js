FROM node:20-alpine3.17

WORKDIR /usr/src/app


COPY package*.json ./
COPY views ./views
COPY models ./models
COPY public ./public
COPY index.js ./index.js

EXPOSE 4000

RUN npm install

CMD [ "node", "index.js" ]





