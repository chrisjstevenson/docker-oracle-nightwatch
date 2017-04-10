global.log = require('./log');
global.Promise = require('bluebird');

var app = Promise.promisifyAll(require('./express'));
var config = require('./config');

module.exports.run = function (cb) {
    log.info("server - Starting")

    return app.listenAsync(config.express.port)
        .then(() => log.info(`running on port ${config.express.port}`))
        .catch((error) => log.error('server - Error while starting', error));
};

