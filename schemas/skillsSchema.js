'use strict';
require('../schemas/usersSchema');

var	mongoose = require('mongoose'),
	 uniqueV = require('mongoose-unique-validator'),
autopopulate = require('mongoose-autopopulate'),
	  Schema = mongoose.Schema,

	skillsSchema = new Schema(
		{
// == General =============================================================================================================================== //
			name: {type: String, required: true, minlength: 3, unique: true, uniqueCaseInsensitive: true},	// ok
			slug: {type: String, required: true, minlength: 3, unique: true, uniqueCaseInsensitive: true},	// ok - Automatic
			shortDesc: {type: String, required: true, minlength: 3, maxlength: 145},						// ok
			createdOn: {type: Date},																		// ok - Automatic
			lastUpdate: {type: Date},																		// ok - Automatic
			createdBy: {																					// ok - Automatic (to-do)
				type: Schema.Types.ObjectId,
				ref: 'Users',
				autopopulate: true
			},
			desc: {type: String, required: true, minlength: 3},												// ok
// =============================================================================================================================== General == //
			ability: {type:String, required: true}
		},
		{
			collection: 'skills'
		}
	);
skillsSchema.plugin(uniqueV);								// validate unique values
skillsSchema.plugin(autopopulate);							// Autopopulate users

module.exports = mongoose.model('Skills', skillsSchema);	// Export for further use