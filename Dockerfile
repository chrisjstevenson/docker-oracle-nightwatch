FROM node:1

# For corp firewalled networks
RUN npm config set strict-ssl false
RUN npm config set proxy http://delicious-pox-secondarymarkets.cdc.bestbuy.com:3128
RUN npm config set https-proxy http://delicious-pox-secondarymarkets.cdc.bestbuy.com:3128

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 8000 8001