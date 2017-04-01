var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Skill Model
 * ==========
 */

var Skill = new keystone.List('Skill', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true }
});

Skill.add({
	name: {type: String, required: true},
	description: {type: String},
  image: {type: Types.CloudinaryImage}
});

Skill.register();
