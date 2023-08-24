FROM node:v18.15.0

WORKDIR /usr/src/app

COPY express-backend/package*.json ./

RUN npm install

COPY express-backend/ .

CMD ["node", "backend.js"]


