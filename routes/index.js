var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);


// Import Route Controllers
var routes = {
    views: importRoutes('./views'),
    emails: importRoutes('./emails')
};

// Setup Route Bindings
exports = module.exports = function (app) {
    app.all('/', routes.views.index);
    app.post('/message', routes.emails.message);
};
