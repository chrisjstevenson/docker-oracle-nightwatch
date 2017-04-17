module.exports = {

    environment: 'docker',

    express: {
        port: 8000
    },

    database: {
        dbUserName: 'foo',
        dbPassword: 'Shae8yid',
        connectionString: 'db/XE'  // oracle-db container, not localhost!
    }
};