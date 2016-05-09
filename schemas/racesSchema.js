'use strict';
require('../schemas/usersSchema');

var mongoose = require('mongoose'),
	 uniqueV = require('mongoose-unique-validator'),
autopopulate = require('mongoose-autopopulate'),
	  Schema = mongoose.Schema,
		 res = require('../services/resources'),

	racesSchema = new Schema(
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

// == Roleplay ============================================================================================================================== //
			age: {											// ok
				adulthood: Number,							// *
				avgMax:Number								// *
			},												// *
			alignmentTend: {type: String, maxlength:145},	// *
			physical: {										// ok
				avgHeight: Number,							// *
				avgWeight: Number,							// *
				size: {										// ok
					name: String,							// *
					space: Number							// *
				}											// *
			},												// *
			languages: [									// ok
				{											// *
					name: String,							// *
					cat: String,							// *
					script: String							// *
				}											// *
			],												// *
			speed: {										// ok
				base: Number,								// *
				details: String								// *
			},												// *
			commonNames: [									// ok
				{											// *
					group: String,							// *
					namesList: [String]						// *
				}											// *
			],												// *
// ============================================================================================================================== Roleplay == //

// == Racial traits ========================================================================================================================= //
			bonuses: res.bonuses,
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
			]
		},
// ========================================================================================================================= Racial traits == //
		{
			collection: 'races'
		}
	);
racesSchema.plugin(uniqueV);								// validate unique values
racesSchema.plugin(autopopulate);							// Autopopulate users
module.exports = mongoose.model('Races', racesSchema);