-- Db provisioning, tablespace, user setup, etc.
-- Run after bring up container
CREATE TABLESPACE tbs_perm_01
DATAFILE 'tbs_perm_01.dat'
SIZE 20M
ONLINE;

CREATE TEMPORARY TABLESPACE tbs_temp_01
TEMPFILE 'tbs_temp_01.dbf'
SIZE 5M
AUTOEXTEND ON;


CREATE USER FOO
IDENTIFIED BY Shae8yid
DEFAULT TABLESPACE tbs_perm_01
TEMPORARY TABLESPACE tbs_temp_01
QUOTA 20M on tbs_perm_01;

GRANT create session TO foo;
GRANT create table TO foo;
GRANT create view TO foo;
GRANT create any trigger TO foo;
GRANT create any procedure TO foo;
GRANT create sequence TO foo;
GRANT create synonym TO foo;