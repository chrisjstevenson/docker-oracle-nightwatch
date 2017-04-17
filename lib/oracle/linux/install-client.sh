#!/bin/bash
#simple script to install the oracle client dependencies needed to run the shipping portal
#instructions can be found here: https://github.com/oracle/node-oracledb/blob/master/INSTALL.md#instzip

source='./lib/oracle/linux'
dest_dir='/opt/oracle/instantclient'
temp_dir=$source
echo "$(date) installing unzip app..."

#install the unzip app
apt-get -q update
apt-get -q install unzip
apt-get -q install libaio1

#unzip oracle client files.
echo 'unziping client files to default directory...'
unzip -o $source/'*.zip' -d $temp_dir

mkdir -p $dest_dir


#set shared library environment variable. this is the default directory that npm install oracleDB will look for in linux.
cp -R ./lib/oracle/linux/instantclient_12_1/* $dest_dir
#mv -fv ./lib/oracle/linux/instantclient /opt/oracle/instantclient
cd /opt/oracle/instantclient

ln -sfv libclntsh.so.12.1 libclntsh.so
ln -sfv libocci.so.12.1 libocci.so

echo "completed oracle client installation"

return 0