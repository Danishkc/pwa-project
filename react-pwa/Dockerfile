FROM node:v18.15.0

WORKDIR /usr/src/app

COPY react-pwa/package*.json ./

RUN npm install

COPY react-pwa/ .

CMD ["npm", "start"]
