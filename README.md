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

To run locally without using compose
```
docker run -d -p 49160:22 -p 49161:1521 -e ORACLE_ALLOW_REMOTE=true [oracle-image-name]

npm start

npm run e2e

docker rm -f [oracle-container-name]
```

To run using docker-compose
```
NODE_ENV=docker ORACLE_ALLOW_REMOTE=true docker-compose up -d

NODE_ENV=docker docker-compose run app npm run e2e-docker
	
docker-compose down --rmi local
```

#### Notes
Sometimes the oracle-xe-11g container takes some time to spin up and you get connection
errors, just wait, restart the app, and retry. You can also check the logs from the 
 oracle container and make sure it has initialized. 

If you are behind a corporate firewall like I am, then this will work better if you are 
able to use guest network instead. 

I made sure to test that the app is available after running npm start and docker-compose up 
just as a visual check. 

The oracle image that I used as a base in both configurations is located in db/Dockerfile.
To run locally without docker-compose you will want to build and tag it. 

Compose will build both the app and the db from their respective Dockerfiles. 