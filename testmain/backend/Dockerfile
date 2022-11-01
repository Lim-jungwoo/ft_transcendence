# FROM node:16-buster
FROM node:16
WORKDIR /app

COPY . .
RUN npm install

RUN npm run build
EXPOSE 4000
CMD ["npm", "run", "start:migrate:prod"]
