# node lts
FROM node:lts

# server dependencies
WORKDIR /server/
COPY ./server/package.json ./server/package-lock.json ./
RUN npm ci --omit=dev

# server files
WORKDIR /server/
COPY ./server/ ./

# client dependencies
WORKDIR /client/
COPY ./client/package.json ./client/package-lock.json ./
RUN npm ci

# client files
WORKDIR /client/
COPY ./client/ ./

# server build
WORKDIR /server/
CMD npx --yes tsx ./src/index.mts