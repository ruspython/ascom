var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Feature Model
 * ==========
 */

var Feature = new keystone.List('Feature', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true }
});

Feature.add({
	name: {type: String, required: true},
  description: {type: String},
  image: {type: Types.CloudinaryImage}
});

Feature.register();
