'use strict';
var	mongoose = require('mongoose'),
	 uniqueV = require('mongoose-unique-validator'),
	  Schema = mongoose.Schema,
	
	skillSchema = new Schema(
		{
			'name': {'type':String, 'required': true, 'minlength': 3, 'unique': true, 'uniqueCaseInsensitive': true},
			'slug': {'type': String, 'required': true, 'minlength': 3, 'unique': true, 'uniqueCaseInsensitive': true},
			'ability': {'type':String, 'required': true, 'minlength': 3},
			'prof': {'type':Boolean, 'required': true, 'default': false},
			'shortDesc': {'type':String, 'required': true, 'minlength': 3, 'maxlength': 145},
			'desc': {'type':String, 'required': true, 'minlength': 3},
		},
		{
			'collection': 'skills'
		}
	);

skillSchema.plugin(uniqueV); // validate unique values

module.exports = mongoose.model('Skill', skillSchema); // Export for further use