'use strict';

require('../schemas/usersSchema');

var mongoose = require('mongoose'),
	 uniqueV = require('mongoose-unique-validator'),
autopopulate = require('mongoose-autopopulate'),
	  Schema = mongoose.Schema,
		 res = require('../services/resources'),

	featsSchema = new Schema(
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

// == Prerequisites ========================================================================================================================= //
			prereqs: {											// ok
				str: {type: Number, default: 0},				// ok
				dex: {type: Number, default: 0},				// ok
				con: {type: Number, default: 0},				// ok
				int: {type: Number, default: 0},				// ok
				wis: {type: Number, default: 0},				// ok
				cha: {type: Number, default: 0},				// ok
				spellcaster: {type: Boolean, default: false},	// ok
				proficiencies: [								// ok
					{											// *
						name: String,							// *
						cat: String,							// *
						details: String							// *
					}											// *
				],												// *
				custom: [										// ok
					{											// *
						name: String,							// *
						details: String							// *
					}											// *
				]												// *
			},													// *
// ========================================================================================================================= Prerequisites == //

// == Bunuses ============================================================================================================================== //
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
// ============================================================================================================================== Bunuses == //
		{
			collection: 'feats'
		}
	);

featsSchema.plugin(uniqueV);								// validate unique values
featsSchema.plugin(autopopulate);							// Autopopulate users

module.exports = mongoose.model('Feats', featsSchema);