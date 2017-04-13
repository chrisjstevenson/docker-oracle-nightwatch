#!/bin/bash
#simple script to install the oracle client dependencies needed to run the shipping portal
#instructions can be found here: https://github.com/oracle/node-oracledb/blob/master/INSTALL.md#instzip

source='./lib/oracle/osx'
dest_dir='/opt/oracle'
temp_dir=$source
echo "$(date) installing unzip app..."

#install the unzip app
#apt-get install libaio1

#unzip oracle client files.
echo 'unziping client files to default directory...'
unzip -o $source/'*.zip' -d $temp_dir

mkdir -p $dest_dir

#set shared librabry environment variable. this is the default directory that npm install oracleDB will look for in linux.
mv -fv ./lib/oracle/osx/instantclient_12_1 ./lib/oracle/osx/instantclient
mv -fv ./lib/oracle/osx/instantclient /opt/oracle/instantclient
mv -fv ./lib/oracle/tnsnames /opt/oracle/tnsnames
cd /opt/oracle/instantclient

ln -sfv libclntsh.so.12.1 libclntsh.so
ln -sfv libocci.so.12.1 libocci.so

echo "completed oracle client installation"

return 0