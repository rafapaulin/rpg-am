'use strict';
var mongoose = require('mongoose'),
	 uniqueV = require('mongoose-unique-validator'),
	  Schema = mongoose.Schema,

	backgroundsSchema = new Schema(
		{
// == General =============================================================================================================================== //
			name: {type: String, required: true, minlength: 3, unique: true, uniqueCaseInsensitive: true},	// ok
			slug: {type: String, required: true, minlength: 3, unique: true, uniqueCaseInsensitive: true},	// ok - Automatic
			shortDesc: {type: String, required: true, minlength: 3, maxlength: 145},						// ok
			createdBy: String,																				// ok - Automatic (to-do)
			desc: {type: String, required: true, minlength: 3},												// ok
// =============================================================================================================================== General == //
		},
		{
			'collection': 'backgrounds'
		}
	);

backgroundsSchema.plugin(uniqueV);								// validate unique values

module.exports = mongoose.model('Backgrounds', backgroundsSchema);