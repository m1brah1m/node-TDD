FROM node:17-alpine3.14

RUN mkdir note-taking

WORKDIR /note-taking

COPY ./package.json ./

RUN npm install

COPY app.js db.js .env ./

EXPOSE 3000

CMD [ "npm","run","prod" ]