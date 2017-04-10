var viewController = require('./controllers/viewController');

module.exports = function (app) {
    app.get('/', viewController.index);
}