const oracledb = require('oracledb');
Promise.promisifyAll(oracledb);
const config = require('../config');

module.exports.index = function (req, res) {

	oracledb.getConnection({
        user: config.database.dbUserName,
        password:config.database.dbPassword,
        connectString: config.database.connectionString
    })
    .then(connection => {
        return connection.execute(
            "SELECT * FROM CUSTOMERS"
        )
            .then(result => {
            	res.render('index', { "customers": result.rows });
            })
            .catch(err => {
                console.error(err);
                return connection.close();
            });
    })
    .catch(err => {
        console.error(err);
    });
}

