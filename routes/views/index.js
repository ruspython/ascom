var keystone = require('keystone');
// var Enquiry = keystone.list('Enquiry');

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  locals.data = {
    company: {},
    projects: {},
    members: {},
    menu: {}
  };
  locals.indexSection = true;

  // Company Info
  view.on('init', function (next) {
    keystone.list('Company').model.find().exec(function (error, results) {
      if (error || !results.length) {
        return next(error);
      }
      if (results.length) {
        locals.data.company = results[0];
      }
      next(error);
    });
  });

  // Projects
  view.on('init', function (next) {
    keystone.list('Project').model.find().exec(function (error, results) {
      if (error || !results.length) {
        return next(error);
      }
      if (results.length) {
        locals.data.projects = results;
      }
      next(error);
    });
  });

  // Members
  view.on('init', function (next) {
    keystone.list('Member').model.find().exec(function (error, results) {
      if (error || !results.length) {
        return next(error);
      }
      if (results.length) {
        locals.data.members = results;
      }
      next(error);
    });
  });

  view.render('index');
};
