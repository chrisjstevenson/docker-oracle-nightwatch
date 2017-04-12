const queryService = require('../services/queryService');
const config = require('../config');

module.exports.index = function (req, res) {
    let query = 'SELECT * FROM CUSTOMERS';
    queryService.executeQuery(query)
        .then(queryResult => {
            res.render('index', { 'viewModel': queryResult })
        });
};


