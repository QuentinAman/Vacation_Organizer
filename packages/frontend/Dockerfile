FROM oven/bun
WORKDIR /usr/src/app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

EXPOSE 5173

CMD ["bun", "run", "dev", "--host"]