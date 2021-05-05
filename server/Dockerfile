FROM node:12.18-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json /app/

RUN npm install --production --silent

COPY . /app/

EXPOSE 8081

CMD ["npm", "start"]
