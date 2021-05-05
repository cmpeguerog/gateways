FROM node:12.18-alpine

ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY ./server/package.json ./server

RUN npm install --production --silent && mv node_modules ../
COPY ./server ./server

CMD ["bash", "/usr/src/app/server/start.sh"]
