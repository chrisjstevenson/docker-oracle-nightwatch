global.log = require('./log');
global.Promise = require('bluebird');

const app = Promise.promisifyAll(require('./express'));
const db = require('./services/queryService');
const config = require('./config');


module.exports.run = function (cb) {
    log.info("server - Starting");

    return db.init().then((pool, err) => {
            if (pool) {
                log.info(`[*] pool: ${pool.poolAlias} was created successfully`);
            }
        })
        .then(app.listenAsync(config.express.port))
        .then(() => log.info(`[*] running on port ${config.express.port}`))
        .catch((error) => log.error('[x] server - Error while starting', error));
};

