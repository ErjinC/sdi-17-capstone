FROM node:alpine

WORKDIR /app

COPY . /app/

EXPOSE 3001

RUN npm install
RUN npm install nodemon -g

CMD npm start