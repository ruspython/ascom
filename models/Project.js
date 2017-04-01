var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Project Model
 * ==========
 */

var Project = new keystone.List('Project', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true }
});

Project.add({
	name: {type: String, required: true},
  shortInfo: {type: Types.Textarea},
  fullInfo: {type: Types.Textarea},
  category: {type: String},
	image: {type: Types.CloudinaryImage},
	previewImage: {type: Types.CloudinaryImage},
});

Project.register();
