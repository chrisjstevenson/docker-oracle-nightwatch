/*

    Adapted from https://github.com/oracle/node-oracledb/blob/master/examples/webapppromises.js

    Note that init() sets up the pool and should be done before express starts, and
    the SIGTERM/SIGINT Handlers makes sure that oracle cleans up after itself so we
    can actually terminate the node process on cmd+c
    I think that depending on the oracle-client installation, the oracle connection
    may or may not resolve, for instance if you installed the drivers so you could specifically connect
    to your company's oracle instance

*/

const queryService = module.exports;
const config = require('../config');
let oracledb = require('oracledb');

queryService.executeQuery = function (sqlStatement) {
	let pool = oracledb.getPool("docker-oracle-nightwatch");
	return pool
        .getConnection()
        .then(connection => {
            let queryPromise;
            queryPromise = connection.execute(sqlStatement);

            return queryPromise.then(result => {
                if (result) {
                    log.debug(result.rows);
                }
                return result.rows;
            }).catch(err => {
                log.error(err);
            }).finally(() => {
                connection.close();
            });
        })
        .catch(err => {
            log.error(err);
            throw err;
        });
};

queryService.init = function () {
    return oracledb.createPool({
        user: config.database.dbUserName,
        password: config.database.dbPassword,
        connectString: config.database.connectionString,
        poolAlias: 'docker-oracle-nightwatch'
    });
};

process
    .on('SIGTERM', function() {
        log.info("[x] SIGTERM received, terminating");
        process.exit(0);
    })
    .on('SIGINT', function() {
        log.info("[x] SIGINT received, terminating");
        process.exit(0);
    });