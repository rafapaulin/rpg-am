'use strict';
require('../schemas/usersSchema');

var mongoose = require('mongoose'),
	 uniqueV = require('mongoose-unique-validator'),
autopopulate = require('mongoose-autopopulate'),
	  Schema = mongoose.Schema,

	spellsSchema = new Schema(
		{
// == General =============================================================================================================================== //
			name: {type: String, required: true, minlength: 3, unique: true, uniqueCaseInsensitive: true},	// ok
			slug: {type: String, required: true, minlength: 3, unique: true, uniqueCaseInsensitive: true},	// ok - Automatic
			shortDesc: {type:String, required: true, minlength: 3, maxlength: 145},							// ok
			createdOn: {type: Date},																		// ok - Automatic
			lastUpdate: {type: Date},																		// ok - Automatic
			createdBy: {																					// ok - Automatic
				type: Schema.Types.ObjectId,																// *
				ref: 'Users',																				// *
				autopopulate: {select: 'userName'}															// *
			},																								// *
			desc: {type:String, required: true, minlength: 3},												// ok
// =============================================================================================================================== General == //

// == Basic ================================================================================================================================= //
			level: {type: Number, required: true},						// ok
			ritual: {type: Boolean, required: true, default: false},	// ok
			schools: [													// ok
				{														// *
					name: {type: String, required: true}				// *
				}														// *
			],															// *
			savings: [													// ok
				{														// *
					name: {type: String, required: true},				// *
					details: String										// *
				}														// *
			],															// *
			components: [												// ok
				{														// *
					name: {type: String, required: true},				// *
					details: String										// *
				}														// *
			],															// *
// ================================================================================================================================= Basic == //

// == Effect ================================================================================================================================ //
			castTime: {													// ok
				time: {type: Number, required: true},					// *
				details: {type: String, default: ''}					// *
			},															// *
			range: {type: Number, required: true},						// ok
			duration: {													// ok
			 	concentration: {type: Boolean, default: false},			// *
			 	max: {type: Number, required: true}, 					// *
			 	details: String											// *
			},															// *
			 effect: {													// *
			 	aoe: {type: String, default: ''},						// ok
				size: {type: Number, default: 0},						// *
			 	size2: {type: Number, default: 0},						// *
			 	details: {type: String, default: ''}					// *
			},															// *
// ================================================================================================================================ Effect == //

// == Damage ================================================================================================================================ //
		 	damage: {													// ok
		 		harmful: {type: Boolean, default: false},				// *
		 		staticDmg: {type: Number, default: 0},					// *
		 		numberOfDices: {type: Number, default: 0},				// *
		 		diceType: {type: Number, default: 0},					// *
		 		dmgTypes: [												// *
		 			{													// *
		 				name: String,									// *
		 				cat: String										// *
		 			}													// *
		 		]														// *
		 	},															// *
		 	atHigherLevels: {											// ok
		 		staticDmg: {type: Number, default: 0},					// *
		 		numberOfDices: {type: Number, default: 0},				// *
		 		diceType: {type: Number, default: 0},					// *
		 		details: {type: String, default: ''}					// *
		 	}															// *
		},																// *
// ================================================================================================================================ Damage == //
		{
			collection: 'spells'
		}
	);

spellsSchema.plugin(uniqueV);								// validate unique values
spellsSchema.plugin(autopopulate);							// Autopopulate users

module.exports = mongoose.model('Spells', spellsSchema);