FROM wnameless/oracle-xe-11g

ADD ./dbscripts/db-init.sql /docker-entrypoint-initdb.d/
ADD ./dbscripts/db-seed.sql /docker-entrypoint-initdb.d/