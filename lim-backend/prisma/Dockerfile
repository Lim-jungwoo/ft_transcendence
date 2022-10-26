FROM node:latest

# --unsafe-perm option set root privilege
RUN npm install -g --unsafe-perm prisma

RUN mkdir /app
WORKDIR /app

COPY ./ ./prisma/

# npm init 명령어는 package.json을 만들어 준다.
# -y 옵션은 package.json 값을 설정할 필요 없이 default값으로 만들어 준다.
RUN npm init -y
# RUN npm install @prisma/client

CMD ["npx", "prisma", "studio"]