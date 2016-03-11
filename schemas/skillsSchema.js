'use strict';
var	mongoose = require('mongoose'),
	 uniqueV = require('mongoose-unique-validator'),
	  Schema = mongoose.Schema,
	
	skillsSchema = new Schema(
		{
// == General =============================================================================================================================== //
			name: {type: String, required: true, minlength: 3, unique: true, uniqueCaseInsensitive: true},	// ok
			slug: {type: String, required: true, minlength: 3, unique: true, uniqueCaseInsensitive: true},	// ok - Automatic
			shortDesc: {type: String, required: true, minlength: 3, maxlength: 145},						// ok
			createdBy: String,																				// ok - Automatic (to-do)
			desc: {type: String, required: true, minlength: 3},												// ok
// =============================================================================================================================== General == //

			ability: {type:String, required: true}
		},
		{
			collection: 'skills'
		}
	);
	
skillsSchema.plugin(uniqueV);								// validate unique values

module.exports = mongoose.model('Skills', skillsSchema);		// Export for further use