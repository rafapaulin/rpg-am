'use strict';
var	mongoose = require('mongoose'),
	 uniqueV = require('mongoose-unique-validator'),
	  Schema = mongoose.Schema,
	
	charactersSchema = new Schema(
		{
			name: {type: String, required: true},
			slug: {type: String, required: true},
			skinColor: {
				name: String,
				cat: String,	
				hex: String
			},
			eyeColor: {
				name: String,
				cat: String,	
				hex: String
			},
			hairColor: {
				name: String,
				cat: String,	
				hex: String
			},
			beardColor: {
				name: String,
				cat: String,	
				hex: String
			},
			gender: String,
			alignment: {
				name: String,
				info: String
			},
			_ref_Races: {
				type: Schema.Types.ObjectId,
				ref: 'Races'
			},
			_ref_Classes: {
				type: Schema.Types.ObjectId,
				ref: 'Classes'
			}
		},
		{
			collection: 'characters'
		}
	);

charactersSchema.plugin(uniqueV);								// validate unique values

module.exports = mongoose.model('Characters', charactersSchema);