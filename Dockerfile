FROM node:6.9.1

# Install oracle client driver
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient
ENV TNS_ADMIN=/opt/oracle/tnsnames

RUN mkdir -p /usr/src/lib
WORKDIR /usr/src

COPY lib /usr/src/lib

# Install oracle via shell script
RUN chmod -R 600 ./lib && \

. ./lib/oracle/linux/install-client.sh

# For corp firewalled networks
RUN npm config set strict-ssl false

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 8000 8001