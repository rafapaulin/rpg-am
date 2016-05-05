'use strict';
require('../schemas/usersSchema');

var	mongoose = require('mongoose'),
	 uniqueV = require('mongoose-unique-validator'),
autopopulate = require('mongoose-autopopulate'),
	  Schema = mongoose.Schema,
	
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
			hitDice: {type: Number, required: true},
			str: {type: Number},
			dex: {type: Number},
			con: {type: Number},
			int: {type: Number},
			wis: {type: Number},
			cha: {type: Number},

			classFeat: [
				{
					name: String,
					desc: String,
					triggerLvl: Number,
					isPath: Boolean,
					requiredPath: String,
				}
			],
			perLvlStats: {
				lvl1: {
					spellSlots: {
						first: Number,
						second: Number,
						third: Number,
						fourth: Number,
						fifth: Number,
						sixth: Number,
						seventh: Number,
						eighth: Number,
						ninth: Number
					}
					cantripsKnown: Number,
					spellsKnown: Number
				},
				lvl2: {
					spellSlots: {
						first: Number,
						second: Number,
						third: Number,
						fourth: Number,
						fifth: Number,
						sixth: Number,
						seventh: Number,
						eighth: Number,
						ninth: Number
					}
					cantripsKnown: Number,
					spellsKnown: Number
				},
				lvl3: {
					spellSlots: {
						first: Number,
						second: Number,
						third: Number,
						fourth: Number,
						fifth: Number,
						sixth: Number,
						seventh: Number,
						eighth: Number,
						ninth: Number
					}
					cantripsKnown: Number,
					spellsKnown: Number
				},
				lvl4: {
					spellSlots: {
						first: Number,
						second: Number,
						third: Number,
						fourth: Number,
						fifth: Number,
						sixth: Number,
						seventh: Number,
						eighth: Number,
						ninth: Number
					}
					cantripsKnown: Number,
					spellsKnown: Number
				},
				lvl5: {
					spellSlots: {
						first: Number,
						second: Number,
						third: Number,
						fourth: Number,
						fifth: Number,
						sixth: Number,
						seventh: Number,
						eighth: Number,
						ninth: Number
					}
					cantripsKnown: Number,
					spellsKnown: Number
				},
				lvl6: {
					spellSlots: {
						first: Number,
						second: Number,
						third: Number,
						fourth: Number,
						fifth: Number,
						sixth: Number,
						seventh: Number,
						eighth: Number,
						ninth: Number
					}
					cantripsKnown: Number,
					spellsKnown: Number
				},
				lvl7: {
					spellSlots: {
						first: Number,
						second: Number,
						third: Number,
						fourth: Number,
						fifth: Number,
						sixth: Number,
						seventh: Number,
						eighth: Number,
						ninth: Number
					}
					cantripsKnown: Number,
					spellsKnown: Number
				},
				lvl8: {
					spellSlots: {
						first: Number,
						second: Number,
						third: Number,
						fourth: Number,
						fifth: Number,
						sixth: Number,
						seventh: Number,
						eighth: Number,
						ninth: Number
					}
					cantripsKnown: Number,
					spellsKnown: Number
				},
				lvl9: {
					spellSlots: {
						first: Number,
						second: Number,
						third: Number,
						fourth: Number,
						fifth: Number,
						sixth: Number,
						seventh: Number,
						eighth: Number,
						ninth: Number
					}
					cantripsKnown: Number,
					spellsKnown: Number
				},
				lvl10: {
					spellSlots: {
						first: Number,
						second: Number,
						third: Number,
						fourth: Number,
						fifth: Number,
						sixth: Number,
						seventh: Number,
						eighth: Number,
						ninth: Number
					}
					cantripsKnown: Number,
					spellsKnown: Number
				},
				lvl11: {
					spellSlots: {
						first: Number,
						second: Number,
						third: Number,
						fourth: Number,
						fifth: Number,
						sixth: Number,
						seventh: Number,
						eighth: Number,
						ninth: Number
					}
					cantripsKnown: Number,
					spellsKnown: Number
				},
				lvl12: {
					spellSlots: {
						first: Number,
						second: Number,
						third: Number,
						fourth: Number,
						fifth: Number,
						sixth: Number,
						seventh: Number,
						eighth: Number,
						ninth: Number
					}
					cantripsKnown: Number,
					spellsKnown: Number
				},
				lvl13: {
					spellSlots: {
						first: Number,
						second: Number,
						third: Number,
						fourth: Number,
						fifth: Number,
						sixth: Number,
						seventh: Number,
						eighth: Number,
						ninth: Number
					}
					cantripsKnown: Number,
					spellsKnown: Number
				},
				lvl14: {
					spellSlots: {
						first: Number,
						second: Number,
						third: Number,
						fourth: Number,
						fifth: Number,
						sixth: Number,
						seventh: Number,
						eighth: Number,
						ninth: Number
					}
					cantripsKnown: Number,
					spellsKnown: Number
				},
				lvl15: {
					spellSlots: {
						first: Number,
						second: Number,
						third: Number,
						fourth: Number,
						fifth: Number,
						sixth: Number,
						seventh: Number,
						eighth: Number,
						ninth: Number
					}
					cantripsKnown: Number,
					spellsKnown: Number
				},
				lvl16: {
					spellSlots: {
						first: Number,
						second: Number,
						third: Number,
						fourth: Number,
						fifth: Number,
						sixth: Number,
						seventh: Number,
						eighth: Number,
						ninth: Number
					}
					cantripsKnown: Number,
					spellsKnown: Number
				},
				lvl17: {
					spellSlots: {
						first: Number,
						second: Number,
						third: Number,
						fourth: Number,
						fifth: Number,
						sixth: Number,
						seventh: Number,
						eighth: Number,
						ninth: Number
					}
					cantripsKnown: Number,
					spellsKnown: Number
				},
				lvl18: {
					spellSlots: {
						first: Number,
						second: Number,
						third: Number,
						fourth: Number,
						fifth: Number,
						sixth: Number,
						seventh: Number,
						eighth: Number,
						ninth: Number
					}
					cantripsKnown: Number,
					spellsKnown: Number
				},
				lvl19: {
					spellSlots: {
						first: Number,
						second: Number,
						third: Number,
						fourth: Number,
						fifth: Number,
						sixth: Number,
						seventh: Number,
						eighth: Number,
						ninth: Number
					}
					cantripsKnown: Number,
					spellsKnown: Number
				},
				lvl20: {
					spellSlots: {
						first: Number,
						second: Number,
						third: Number,
						fourth: Number,
						fifth: Number,
						sixth: Number,
						seventh: Number,
						eighth: Number,
						ninth: Number
					}
					cantripsKnown: Number,
					spellsKnown: Number
				}
			}			
		},
		{
			'collection': 'classes'
		}
	);

classesSchema.plugin(uniqueV);								// validate unique values
classesSchema.plugin(autopopulate);							// Autopopulate users

module.exports = mongoose.model('Classes', classesSchema);		// Export for further use