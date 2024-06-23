FROM oven/bun
WORKDIR /usr/src/app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

RUN chmod +x ./wait-for-it.sh ./docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]

CMD ["bun", "--watch", "index.ts"]