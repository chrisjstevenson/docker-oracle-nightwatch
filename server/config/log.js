var winston = require('winston');
var moment = require('moment');

function now() {
    return moment().format();
}

module.exports = global.log = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            colorize: true,
            timestamp: now,
            prettyPrint: true
        })
    ]
});