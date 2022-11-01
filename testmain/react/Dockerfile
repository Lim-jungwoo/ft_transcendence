FROM node:16.17-buster-slim

WORKDIR /usr/src/app

RUN apt-get update -y && apt-get install -y git
RUN git config --global user.name "jawpark" && git config --global user.email "jawpark@github.com"
RUN npx create-react-app . -template typescript
RUN npm i react-router-dom && npm install styled-components && npm i @types/styled-components && npm i styled-reset && npm i axios
RUN rm -rf src public tsconfig.json && mkdir src public
# RUN rm -rf src public tsconfig.json package.json && mkdir src public

COPY ./tool/src/ ./src
COPY ./tool/public/ ./public
COPY ./tool/tsconfig.json .
# COPY ./tool/package.json .
COPY ./tool/.env .

EXPOSE 3000

CMD ["npm", "run", "start"]
