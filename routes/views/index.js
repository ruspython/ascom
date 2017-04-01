var keystone = require('keystone');
// var Enquiry = keystone.list('Enquiry');

exports = module.exports = function(req, res) {

	var MENU_ITEMS = ['services', 'skills', 'portfolio', 'team', 'upwork', 'contact'];
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.data = {
		company: {},
		features: {},
		skills: {},
		projects: {},
		developers: {},
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

	// Features
	view.on('init', function (next) {
		keystone.list('Feature').model.find().exec(function (error, results) {
			if (error || !results.length) {
				return next(error);
			}
			if (results.length) {
				locals.data.features = results;
			}
			next(error);
		});
	});

	// Skills
	view.on('init', function (next) {
		keystone.list('Skill').model.find().exec(function (error, results) {
			if (error || !results.length) {
				return next(error);
			}
			if (results.length) {
				locals.data.skills = results;
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

	// Developers
	view.on('init', function (next) {
		keystone.list('Developer').model.find().exec(function (error, results) {
			if (error || !results.length) {
				return next(error);
			}
			if (results.length) {
				locals.data.developers = results;
			}
			next(error);
		});
	});

    view.on('init', function (next) {
        //TODO: make middleware for that, move translation in a separate file
        var lang = process.env.LOCALE;

        req.i18n.changeLanguage(lang);

        locals.data.t = req.t;
        next();

    });

    view.render('index');
};
