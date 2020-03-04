FROM node:12 as build-deps

WORKDIR /opt/protractor
COPY *.json ./
COPY ./src/ ./src
RUN ls -la ./src

RUN npm i

CMD ["npm", "run", "test", "--", "--seleniumAddress", "http://selenoid:4444/wd/hub"]
