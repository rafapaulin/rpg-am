'use strict';
require('../schemas/usersSchema');

var mongoose = require('mongoose'),
	 uniqueV = require('mongoose-unique-validator'),
autopopulate = require('mongoose-autopopulate'),
	  Schema = mongoose.Schema,

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
			bonuses: {
				str: {type: Number, default: 0},				// ok
				dex: {type: Number, default: 0},				// ok
				con: {type: Number, default: 0},				// ok
				int: {type: Number, default: 0},				// ok
				wis: {type: Number, default: 0},				// ok
				cha: {type: Number, default: 0},				// ok
				any: {type: Number, default: 0},				// ok
				initiative: {type: Number, default: 0},			// ok
				hp: {type: Number, default: 0},					// ok
				speed: {type: Number, default: 0},				// ok
				langSlots: {type: Number, default: 0},			// ok
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
			// 	'ac': {											// Medium armor master
			// 		'value': {type: Number, default: 0},
			// 		'condition': {type: Boolean, default: false},
			// 	},
			// 	'spells': {
			// 		'rpgClass': [{type: String, default: ""}],
			// 		'spellLevel': [
			// 			{
			// 				'qty': {type: Number, default: 0},
			// 				'lvl': {type: Number, default: 0}
			// 			}
			// 		]
			// 	},
			// 	'classFeature': [										// checar esse parâmetro depois de montar as classes
			// 		{
			// 			'rpgClass': {type: String, default: ""},
			// 			'feature': {
			// 				'name': {type: String, default: ""},
			// 				'desc': {type: String, default: ""},
			// 			}
			// 		}
			// 	],
			// 	'diceMod': {
			// 		'name': {type: String, default: ""},
			// 		'numberOfDices': {type: Number, default: 0},
			// 		'diceType': {type: Number, default: 0}
			// 	}
			}
		},
// ============================================================================================================================== Bunuses == //
		{
			collection: 'feats'
		}
	);

featsSchema.plugin(uniqueV);								// validate unique values
featsSchema.plugin(autopopulate);							// Autopopulate users

module.exports = mongoose.model('Feats', featsSchema);