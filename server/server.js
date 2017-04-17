global.log = require('./config/log');
global.config = require('./config/config');
global.Promise = require('bluebird');

const app = Promise.promisifyAll(require('./express'));
const db = require('./services/queryService');

module.exports.run = function (cb) {
    log.info(`server - Starting ${config.environment}`);

    return db.init().then((pool, err) => {
            if (pool) {
                log.info(`[*] pool: ${pool.poolAlias} was created successfully`);
            }
        })
        .then(app.listenAsync(config.express.port))
        .then(() => log.info(`[*] running on port ${config.express.port}`))
        .catch((error) => log.error('[x] server - Error while starting', error));
};

