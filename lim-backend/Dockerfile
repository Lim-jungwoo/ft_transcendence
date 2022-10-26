FROM node:latest

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

# RUN npx prisma generate
# RUN npx prisma migrate deploy

RUN npm run build

EXPOSE 4000
# CMD ["node", "dist/main.js"]

CMD ["npm", "run", "start:migrate:prod"]
# CMD ["npm", "run", "start:prod"]
