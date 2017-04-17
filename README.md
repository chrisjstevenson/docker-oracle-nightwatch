# docker-oracle-nightwatch
Sample configuration on how to use oracle-xe-11g and docker to create short-run testing configurations. I'm using
selenium, nightwatch, and mocha for end-to-end testing.

#### Running the tests

To run locally without using compose
```
docker run -d -p 49160:22 -p 49161:1521 -e ORACLE_ALLOW_REMOTE=true [oracle-image-tag]

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
To run locally you will want to build and tag it. 

Compose will build both the app and the db from their respective Dockerfiles. 