FROM node:alpine

WORKDIR /usr/src/app/log_reader

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "start"]