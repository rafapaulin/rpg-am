'use strict';
require('../schemas/usersSchema');

var	mongoose = require('mongoose'),
	 uniqueV = require('mongoose-unique-validator'),
autopopulate = require('mongoose-autopopulate'),
	  Schema = mongoose.Schema,
	  	 res = require('../services/resources'),

	
	classesSchema = new Schema(
		{
// == General =============================================================================================================================== //
			name: {type: String, required: true, minlength: 3, unique: true, uniqueCaseInsensitive: true},	// ok
			slug: {type: String, required: true, minlength: 3, unique: true, uniqueCaseInsensitive: true},	// ok - Automatic
			shortDesc: {type: String, required: true, minlength: 3, maxlength: 145},						// ok
			createdOn: {type: Date},																		// ok - Automatic
			lastUpdate: {type: Date},																		// ok - Automatic
			createdBy: {																					// ok - Automatic
				type: Schema.Types.ObjectId,																// *
				ref: 'Users',																				// *
				autopopulate: {select: 'userName'}															// *
			},																								// *
			desc: {type: String, required: true, minlength: 3},												// ok
// =============================================================================================================================== General == //
			hitDice: {type: Number, required: true},														// ok
			proficiencies: [																				// ok
				{																							// *
					name: String,																			// *
					cat: String,																			// *
					details: String																			// *
				}																							// *
			],																								// *
			paths: [
				{
					name: String,
					desc: String,
					bonuses: res.bonuses
				}
			],
			features: [
				{
					name: String,
					desc: String,
					pathBound: String,
					bonuses: res.bonuses
				}
			],
			perLvlStats: {
				lvl1: {bonuses: res.bonuses},
				lvl2: {bonuses: res.bonuses},
				lvl3: {bonuses: res.bonuses},
				lvl4: {bonuses: res.bonuses},
				lvl5: {bonuses: res.bonuses},
				lvl6: {bonuses: res.bonuses},
				lvl7: {bonuses: res.bonuses},
				lvl8: {bonuses: res.bonuses},
				lvl9: {bonuses: res.bonuses},
				lvl10: {bonuses: res.bonuses},
				lvl11: {bonuses: res.bonuses},
				lvl12: {bonuses: res.bonuses},
				lvl13: {bonuses: res.bonuses},
				lvl14: {bonuses: res.bonuses},
				lvl15: {bonuses: res.bonuses},
				lvl16: {bonuses: res.bonuses},
				lvl17: {bonuses: res.bonuses},
				lvl18: {bonuses: res.bonuses},
				lvl19: {bonuses: res.bonuses},
				lvl20: {bonuses: res.bonuses}
			}			
		},
		{
			'collection': 'classes'
		}
	);

classesSchema.plugin(uniqueV);								// validate unique values
classesSchema.plugin(autopopulate);							// Autopopulate users

module.exports = mongoose.model('Classes', classesSchema);		// Export for further use