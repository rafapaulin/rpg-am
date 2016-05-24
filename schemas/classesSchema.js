'use strict';
require('../schemas/usersSchema');
require('../schemas/spellsSchema');

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
			bonuses: res.bonuses,																			// ok
			paths: [																						// ok
				{																							// *
					name: String,																			// *			
					desc: String,																			// *		
					bonuses: res.bonuses																	// *			
				}																							// *
			],																								// *
			features: [																						// ok
				{																							// *
					name: String,																			// *
					desc: String,																			// *
					pathBound: String,																		// *
					bonuses: res.bonuses																	// *
				}																							// *
			],																								// *
			perLvlStats: {
				lvl1: {
					bonuses: res.bonuses,
					features: [
						name: String
					]
				},
				lvl2: {
					bonuses: res.bonuses,
					features: [
						name: String
					]
				},
				lvl3: {
					bonuses: res.bonuses,
					features: [
						name: String
					]
				},
				lvl4: {
					bonuses: res.bonuses,
					features: [
						name: String
					]
				},
				lvl5: {
					bonuses: res.bonuses,
					features: [
						name: String
					]
				},
				lvl6: {
					bonuses: res.bonuses,
					features: [
						name: String
					]
				},
				lvl7: {
					bonuses: res.bonuses,
					features: [
						name: String
					]
				},
				lvl8: {
					bonuses: res.bonuses,
					features: [
						name: String
					]
				},
				lvl9: {
					bonuses: res.bonuses,
					features: [
						name: String
					]
				},
				lvl10: {
					bonuses: res.bonuses,
					features: [
						name: String
					]
				},
				lvl11: {
					bonuses: res.bonuses,
					features: [
						name: String
					]
				},
				lvl12: {
					bonuses: res.bonuses,
					features: [
						name: String
					]
				},
				lvl13: {
					bonuses: res.bonuses,
					features: [
						name: String
					]
				},
				lvl14: {
					bonuses: res.bonuses,
					features: [
						name: String
					]
				},
				lvl15: {
					bonuses: res.bonuses,
					features: [
						name: String
					]
				},
				lvl16: {
					bonuses: res.bonuses,
					features: [
						name: String
					]
				},
				lvl17: {
					bonuses: res.bonuses,
					features: [
						name: String
					]
				},
				lvl18: {
					bonuses: res.bonuses,
					features: [
						name: String
					]
				},
				lvl19: {
					bonuses: res.bonuses,
					features: [
						name: String
					]
				},
				lvl20: {
					bonuses: res.bonuses,
					features: [
						name: String
					]
				},
			},
			spellList: {
				lvl0: [
					type: Schema.Types.ObjectId,																// *
					ref: 'Spells',																				// *
					autopopulate: true																			// *
				],
				lvl1: [
					type: Schema.Types.ObjectId,																// *
					ref: 'Spells',																				// *
					autopopulate: true																			// *
				],
				lvl2: [
					type: Schema.Types.ObjectId,																// *
					ref: 'Spells',																				// *
					autopopulate: true																			// *
				],
				lvl3: [
					type: Schema.Types.ObjectId,																// *
					ref: 'Spells',																				// *
					autopopulate: true																			// *
				],
				lvl4: [
					type: Schema.Types.ObjectId,																// *
					ref: 'Spells',																				// *
					autopopulate: true																			// *
				],
				lvl5: [
					type: Schema.Types.ObjectId,																// *
					ref: 'Spells',																				// *
					autopopulate: true																			// *
				],
				lvl6: [
					type: Schema.Types.ObjectId,																// *
					ref: 'Spells',																				// *
					autopopulate: true																			// *
				],
				lvl7: [
					type: Schema.Types.ObjectId,																// *
					ref: 'Spells',																				// *
					autopopulate: true																			// *
				],
				lvl8: [
					type: Schema.Types.ObjectId,																// *
					ref: 'Spells',																				// *
					autopopulate: true																			// *
				],
				lvl9: [
					type: Schema.Types.ObjectId,																// *
					ref: 'Spells',																				// *
					autopopulate: true																			// *
				],
			}
		},
		{
			'collection': 'classes'
		}
	);

classesSchema.plugin(uniqueV);								// validate unique values
classesSchema.plugin(autopopulate);							// Autopopulate users

module.exports = mongoose.model('Classes', classesSchema);		// Export for further use