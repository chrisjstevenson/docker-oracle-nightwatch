const config = require('./server/config/config');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const nightwatch = require('gulp-nightwatch');
const selenium = require('selenium-download');
const server = require('./server/server');
const portfinder = require('portfinder');
const os = require('os');

gulp.task('find-open-port', function (cb) {
    portfinder.getPort(function (err, port) {
        testingPort = port;
        config.url = `http://localhost:${testingPort}`;
        config.express.port = testingPort;

        hostedAddress = 'http://' + os.hostname() + '.na.bestbuy.com:' + testingPort;

        cb();
    });
});

gulp.task('server', ['find-open-port'], server.run);

gulp.task('selenium-download', function (cb) {
    selenium.ensure('e2e/bin', function (err) {
        if (err) console.error(err.stack);
        console.log('✔ Selenium & Chromedriver downloaded to:', 'e2e/bin');
        cb();
    });
});

gulp.task('ui-tests', ['selenium-download'], function (cb) {

    gulp.src('e2e')
        .pipe(nightwatch({
            configFile: 'e2e/nightwatch.conf.js'
        }))
        .on('end', err => {
            process.exit(err ? 1 : 0);
            cb(err);
        });
});

gulp.task('ui-specs-server', ['selenium-download', 'server'], function (cb) {

    const cliArgs = [];
    if (process.env.NODE_ENV === 'integration') {
        cliArgs.push('--env integration');
    }

    gulp.src('e2e')
        .pipe(nightwatch({
            configFile: 'e2e/nightwatch.conf.js',
            cliArgs: cliArgs
        }))
        .on('end', err => {
            process.exit(err ? 1 : 0);
            cb(err);
        });
});
