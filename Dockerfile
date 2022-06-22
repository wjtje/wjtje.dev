FROM node:18-alpine

WORKDIR /app

# Install all the packages
COPY package.json package-lock.json ./
RUN npm install

# Build the project
COPY . .
RUN npm run build

EXPOSE 3000
EXPOSE 5555

CMD [ "sh", "docker_start.sh" ]
