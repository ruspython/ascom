var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Developer Model
 * ==========
 */

var Member = new keystone.List('Member', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true }
});

Member.add({
	name: {type: String, required: true},
	photo: {type: Types.CloudinaryImage},
	position: {type: String},
	info: {type: Types.Textarea}
});

Member.register();
