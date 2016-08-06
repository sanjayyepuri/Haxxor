var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'rest'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/rest-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'rest'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/rest-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'rest'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/rest-production'
  }
};

module.exports = config[env];
