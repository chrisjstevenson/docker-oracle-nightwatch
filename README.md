# docker-oracle-nightwatch
How to use oracle-xe-11g, docker, and nightwatch to do short-run testing.

#### Prerequisites
Follow the installation directions for
 [oracledb client drivers](https://github.com/oracle/node-oracledb/blob/master/INSTALL.md#instoh)

#### Docker Compose
Using docker-compose will bring up the app with these containers, I did not represent all
the layers here but I'm trying to call out the important ones.

```
┌─────────────────────────────┐
│ selenium/standalone-chrome  │
└─────────────────────────────┘
┌─────────────────────────────┐
│RUN install-oracle-client.sh │
├─────────────────────────────┤
│     library/node:6.9.1      │
└─────────────────────────────┘
┌─────────────────────────────┐
│    ADD ./db/seed-scripts    │
├─────────────────────────────┤
│ wnameless/docker-oracle-11g │
└─────────────────────────────┘
```

#### Running tests

To run with just the oracle-xe-11g container, first build it:
```
docker build -t oracle-xe-11g:latest -f db/Dockerfile .
```

To run the container, the app, and tests do the following:
```
docker run -d -p 49160:22 -p 49161:1521 -e ORACLE_ALLOW_REMOTE=true oracle-xe-11g:latest
```
The image uses a set of initialization scripts to auto-populate credentials
and a couple of basic tables. When ready you will see the following from the
container logs:
```
SQL> Disconnected from Oracle Database 11g Express Edition Release 11.2.0.2.0 - 64bit Production
```
You can then work with the app, run tests, etc. 
```
npm start

npm run e2e

docker rm -f oracle-xe-11g
```

Additionally you can use using docker-compose, and have the app, db, and selenium
all run as containers.
```
NODE_ENV=docker ORACLE_ALLOW_REMOTE=true docker-compose up -d

NODE_ENV=docker docker-compose run app npm run e2e-docker

docker-compose down --rmi local
```

#### Notes
Sometimes the oracle-xe-11g container takes some time to spin up and you get connection
errors, just wait, restart the app, and try again. You can also check the logs from the
 oracle container and make sure it has initialized.

I made sure to test that the app is available after running npm start and docker-compose up
just as a visual check.

The oracle image that I used as a base in both configurations is located in db/Dockerfile.
To run locally without docker-compose you will want to build and tag it.

Compose will build both the app and the db from their respective Dockerfiles.
