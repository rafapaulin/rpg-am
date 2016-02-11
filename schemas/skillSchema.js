'use strict';
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	
	skillSchema = new Schema(
		{
			'name': {'type':String, 'required': true, 'minlength': 3},
			'slug': {'type': String, 'required': true, 'minlength': 3},
			'ability': {'type':String, 'required': true, 'minlength': 3},
			'prof': {'type':Boolean, 'required': true, 'default': false},
			'shortDesc': {'type':String, 'required': true, 'minlength': 3, 'maxlength': 145},
			'desc': {'type':String, 'required': true, 'minlength': 3},
		},
		{
			'collection': 'skills'
		}
	);

module.exports = mongoose.model('Skill', skillSchema);