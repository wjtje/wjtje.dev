FROM node:18-alpine AS builder

WORKDIR /app

# Build the project
COPY . .
RUN npm install --global pnpm && pnpm install --frozen-lockfile
RUN pnpm run build

# Create smaller package
FROM node:18-alpine AS runner

COPY --from=builder /app/build ./build
COPY ./prisma ./
COPY package.json pnpm-lock.yaml docker_start.sh ./

ENV NODE_ENV=production
RUN npm install --global pnpm && pnpm install --frozen-lockfile --ignore-scripts --production

# Run the program
EXPOSE 3000
EXPOSE 5555

CMD [ "sh", "docker_start.sh" ]
