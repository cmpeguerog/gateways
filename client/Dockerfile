FROM node:12.18-alpine

RUN npm install -g http-server

ENV NODE_ENV=production

WORKDIR /client

COPY package*.json /client/

RUN npm install --production --silent

COPY . /client/

RUN npm run build

EXPOSE 8082

CMD ["npm", "start"]
