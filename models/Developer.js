var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Developer Model
 * ==========
 */

var Developer = new keystone.List('Developer', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true }
});

Developer.add({
	name: {type: String, required: true},
	photo: {type: Types.CloudinaryImage},
	position: {type: String},
	info: {type: Types.Textarea}
});

Developer.register();
