FROM node:17-alpine as builder

WORKDIR /app
COPY . .

RUN npm i
RUN npm run build

FROM node:17-alpine as runner

WORKDIR /app
COPY --from=builder /app/build /app
COPY --from=builder /app/package.json /app

ENV NODE_ENV production
RUN npm i

EXPOSE 3000

CMD [ "node", "index.js" ]
