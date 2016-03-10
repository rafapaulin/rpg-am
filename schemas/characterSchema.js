'use strict';
var	mongoose = require('mongoose'),
	 uniqueV = require('mongoose-unique-validator'),
	  Schema = mongoose.Schema,
	
	charSheetSchema = new Schema(
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
			race: {
				type: Schema.Types.ObjectId,
				ref: 'Race'
			}
		},
		{
			'collection': 'charSheets'
		}
	);

charSheetSchema.plugin(uniqueV);								// validate unique values

module.exports = mongoose.model('CharSheet', charSheetSchema);