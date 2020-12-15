FROM node:12

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
WORKDIR /client
RUN npm install
RUN npm run build

WORKDIR /
CMD [ "node", "server.js" ] 