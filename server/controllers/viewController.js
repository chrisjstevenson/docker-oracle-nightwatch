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

            	return Promise.map(result.rows, (details) => {
            		return {
            			id: details[0],
            			name: details[1],
            			city: details[2]
            		}
            	})
            })
            .then(customerDetails => {
            	return res.render('index', { "customers": customerDetails });
            })
            .catch(err => {
                console.error(err);
                return connection.close();
            })
    })
    .catch(err => {
        console.error(err);
    });
}



/* Try this instead!
 	https://github.com/oracle/node-oracledb/blob/master/examples/webapppromises.js
*/