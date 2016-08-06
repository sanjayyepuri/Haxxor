module.exports = function(app) {
    var admin = require('./admin.routes');
    var user = require('./user.routes');
    var judge = require('./judge.routes');

    app.use('/api/admin', admin);
    app.use('/api/user', user);
    app.use('/api/judge', judge);
}
