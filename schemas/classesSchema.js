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
					features: [String],
					bonuses: res.bonuses
				},
				lvl2: {
					features: [String],
					bonuses: res.bonuses
				},
				lvl3: {
					features: [String],
					bonuses: res.bonuses
				},
				lvl4: {
					features: [String],
					bonuses: res.bonuses
				},
				lvl5: {
					features: [String],
					bonuses: res.bonuses
				},
				lvl6: {
					features: [String],
					bonuses: res.bonuses
				},
				lvl7: {
					features: [String],
					bonuses: res.bonuses
				},
				lvl8: {
					features: [String],
					bonuses: res.bonuses
				},
				lvl9: {
					features: [String],
					bonuses: res.bonuses
				},
				lvl10: {
					features: [String],
					bonuses: res.bonuses
				},
				lvl11: {
					features: [String],
					bonuses: res.bonuses
				},
				lvl12: {
					features: [String],
					bonuses: res.bonuses
				},
				lvl13: {
					features: [String],
					bonuses: res.bonuses
				},
				lvl14: {
					features: [String],
					bonuses: res.bonuses
				},
				lvl15: {
					features: [String],
					bonuses: res.bonuses
				},
				lvl16: {
					features: [String],
					bonuses: res.bonuses
				},
				lvl17: {
					features: [String],
					bonuses: res.bonuses
				},
				lvl18: {
					features: [String],
					bonuses: res.bonuses
				},
				lvl19: {
					features: [String],
					bonuses: res.bonuses
				},
				lvl20: {
					features: [String],
					bonuses: res.bonuses
				}
			},
			spellList: {
				lvl0: [
					{
						type: Schema.Types.ObjectId,																// *
						ref: 'Spells',																				// *
						autopopulate: true																			// *
					}																								// *
				],
				lvl1: [
					{
						type: Schema.Types.ObjectId,																// *
						ref: 'Spells',																				// *
						autopopulate: true																			// *
					}																								// *
				],
				lvl2: [
					{
						type: Schema.Types.ObjectId,																// *
						ref: 'Spells',																				// *
						autopopulate: true																			// *
					}																								// *
				],
				lvl3: [
					{
						type: Schema.Types.ObjectId,																// *
						ref: 'Spells',																				// *
						autopopulate: true																			// *
					}																								// *
				],
				lvl4: [
					{
						type: Schema.Types.ObjectId,																// *
						ref: 'Spells',																				// *
						autopopulate: true																			// *
					}																								// *
				],
				lvl5: [
					{
						type: Schema.Types.ObjectId,																// *
						ref: 'Spells',																				// *
						autopopulate: true																			// *
					}																								// *
				],
				lvl6: [
					{
						type: Schema.Types.ObjectId,																// *
						ref: 'Spells',																				// *
						autopopulate: true																			// *
					}																								// *
				],
				lvl7: [
					{
						type: Schema.Types.ObjectId,																// *
						ref: 'Spells',																				// *
						autopopulate: true																			// *
					}																								// *
				],
				lvl8: [
					{
						type: Schema.Types.ObjectId,																// *
						ref: 'Spells',																				// *
						autopopulate: true																			// *
					}																								// *
				],
				lvl9: [
					{
						type: Schema.Types.ObjectId,																// *
						ref: 'Spells',																				// *
						autopopulate: true																			// *
					}																								// *
				],
			}
		},
		{
			collection: 'classes'
		}
	);

classesSchema.plugin(uniqueV);									// validate unique values
classesSchema.plugin(autopopulate);								// Autopopulate users

module.exports = mongoose.model('Classes', classesSchema);		// Export for further use