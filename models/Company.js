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
	rate: {type: Number},
	teamDescription: {type: Types.Textarea},
	emails: {type: String}, // Emails to send contact messages on
	supportEmail: {type: String}, // Support email
	address: {type: String},
	upworkUrl: {type: Types.Url},
	githubUrl: {type: Types.Url},
	facebookUrl: {type: Types.Url},
	instagramUrl: {type: Types.Url},
	skypeLogin: {type: String},
	happyClients: {type: Number},
	projectsCompleted: {type: Number},
	awardWon: {type: Number},
	years: {type: Number}
});

Company.register();
