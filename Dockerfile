FROM node:10.15.3

RUN mkdir /boxscore-client

ADD . /boxscore-client

WORKDIR /boxscore-client

RUN npm install

EXPOSE 8080
CMD ["npm", "start"]