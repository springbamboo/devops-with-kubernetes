FROM node:alpine

WORKDIR /usr/src/app/log_writer

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "start"]