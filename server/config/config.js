var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        db: 'mongodb://root:toor@ds033877.mongolab.com:33877/heroku_app26175662',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
};