FROM node:alpine

WORKDIR /app/

COPY package*.json ./

RUN npm install

COPY . .

RUN npm i dotenv

EXPOSE 5000

CMD [ "npm" ,"start" ]