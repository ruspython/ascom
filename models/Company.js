var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Company Model
 * ==========
 */

var Company = new keystone.List('Company', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true }
});

Company.add({
	name: {type: String, required: true},
	title: {type: String},
	subtitle: {type: String},
});

Company.register();
