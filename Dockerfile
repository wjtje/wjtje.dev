FROM node:18-alpine AS builder

WORKDIR /app

# Build the project
COPY . .
RUN npm install
RUN npm run build

# Create smaller package
FROM node:18-alpine AS runner

COPY --from=builder /app/build ./build
COPY ./prisma ./
COPY package.json package-lock.json docker_start.sh ./

ENV NODE_ENV=production
RUN npm install --ignore-scripts --production

# Run the program
EXPOSE 3000
EXPOSE 5555

CMD [ "sh", "docker_start.sh" ]
