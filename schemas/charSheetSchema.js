'use strict';
var	mongoose = require('mongoose'),
	 uniqueV = require('mongoose-unique-validator'),
	  Schema = mongoose.Schema,
	
	charSheetSchema = new Schema(
		{
			'charName': String,
		},
		{
			'collection': 'charSheets'
		}
	);

charSheetSchema.plugin(uniqueV);								// validate unique values

module.exports = mongoose.model('CharSheet', charSheetSchema);