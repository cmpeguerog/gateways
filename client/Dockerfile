FROM node:12.18-alpine

ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY ./client/package.json ./client

RUN npm install --production --silent && mv node_modules ../
COPY ./client ./client

CMD ["bash", "/usr/src/app/client/start.sh"]
