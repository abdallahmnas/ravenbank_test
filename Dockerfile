# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if you use yarn) to the container
COPY package.json ./

RUN apk add --update --no-cache openssh-client git\
    && mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts\
    && apk --no-cache add --virtual builds-deps build-base python3

# Install any needed packages specified in package.json and TypeScript globally
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build project
RUN npm run build

#stage 2 
FROM node:20-alpine

USER node

WORKDIR /usr/src/app

COPY --from=0 --chown=node:node /app/build .
COPY --from=0 --chown=node:node /app/package.json .
COPY --from=0 --chown=node:node /app/node_modules ./node_modules
COPY --from=0 --chown=node:node /app/config ./config
COPY --from=0 --chown=node:node /app/migrations ./migrations

# Expose port for the Node.js application to listen on
# EXPOSE 3001

EXPOSE 5678

# Define the command to run your compiled JavaScript code
CMD [ "node", "server.js" ]
