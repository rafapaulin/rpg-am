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

// == Basics ================================================================================================================================ //
			hitDice: {type: Number, required: true},		// ok
			bonuses: res.bonuses,							// ok
			specialDiceName: String,
			classPointsName: String,
			classPoints2Name: String,
			classPoints3Name: String,
// ================================================================================================================================ Basics == //

// == Specifics ============================================================================================================================= //
			paths: [										// ok
				{											// *
					name: String,							// *			
					desc: String,							// *		
					bonuses: res.bonuses					// *			
				}											// *
			],												// *
			features: [										// ok
				{											// *
					name: String,							// *
					desc: String,							// *
					pathBound: String,						// *
					bonuses: res.bonuses					// *
				}											// *
			],												// *
// ============================================================================================================================= Specifics == //
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
// == Class Spells ===================================================================================================================== //
			spellList: {										// ok
				lvl0: [											// ok
					{											// *
						type: Schema.Types.ObjectId,			// *
						ref: 'Spells',							// *
						autopopulate: true						// *
					}											// *
				],												// *
				lvl1: [											// ok
					{											// *
						type: Schema.Types.ObjectId,			// *
						ref: 'Spells',							// *
						autopopulate: true						// *
					}											// *
				],												// *
				lvl2: [											// ok
					{											// *
						type: Schema.Types.ObjectId,			// *
						ref: 'Spells',							// *
						autopopulate: true						// *
					}											// *
				],												// *
				lvl3: [											// ok
					{											// *
						type: Schema.Types.ObjectId,			// *
						ref: 'Spells',							// *
						autopopulate: true						// *
					}											// *
				],												// *
				lvl4: [											// ok
					{											// *
						type: Schema.Types.ObjectId,			// *
						ref: 'Spells',							// *
						autopopulate: true						// *
					}											// *
				],												// *
				lvl5: [											// ok
					{											// *
						type: Schema.Types.ObjectId,			// *
						ref: 'Spells',							// *
						autopopulate: true						// *
					}											// *
				],												// *
				lvl6: [											// ok
					{											// *
						type: Schema.Types.ObjectId,			// *
						ref: 'Spells',							// *
						autopopulate: true						// *
					}											// *
				],												// *
				lvl7: [											// ok
					{											// *
						type: Schema.Types.ObjectId,			// *
						ref: 'Spells',							// *
						autopopulate: true						// *
					}											// *
				],												// *
				lvl8: [											// ok
					{											// *
						type: Schema.Types.ObjectId,			// *
						ref: 'Spells',							// *
						autopopulate: true						// *
					}											// *
				],												// *
				lvl9: [											// ok
					{											// *
						type: Schema.Types.ObjectId,			// *
						ref: 'Spells',							// *
						autopopulate: true						// *
					}											// *
				],												// *
			}
// ===================================================================================================================== Class Spells == //
		},
		{
			collection: 'classes'
		}
	);

classesSchema.plugin(uniqueV);									// validate unique values
classesSchema.plugin(autopopulate);								// Autopopulate user and spells

module.exports = mongoose.model('Classes', classesSchema);		// Export for further use