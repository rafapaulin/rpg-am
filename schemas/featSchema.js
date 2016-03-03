'use strict';
var mongoose = require('mongoose'),
	 uniqueV = require('mongoose-unique-validator'),
	  Schema = mongoose.Schema,

	featSchema = new Schema(
		{
// == General =============================================================================================================================== //
			'name': {'type': String, 'required': true, 'minlength': 3, 'unique': true, uniqueCaseInsensitive: true},	// ok
			'slug': {'type': String, 'required': true, 'minlength': 3, 'unique': true, uniqueCaseInsensitive: true},	// ok - Automatic
			'shortDesc': {'type':String, 'required': true, 'minlength': 3, 'maxlength': 145},							// ok
			'createdBy': String,																						// ok - Automatic (to-do)
			'desc': {'type':String, 'required': true, 'minlength': 3},													// ok
// =============================================================================================================================== General == //

// == Prerequisites ========================================================================================================================= //
			'prereqs': {												// 
				'str': {'type': Number, 'default': 0},					// ok
				'dex': {'type': Number, 'default': 0},					// ok
				'con': {'type': Number, 'default': 0},					// ok
				'int': {'type': Number, 'default': 0},					// ok
				'wis': {'type': Number, 'default': 0},					// ok
				'cha': {'type': Number, 'default': 0},					// ok
				'spellcaster': {'type': Boolean, 'default': false},		// ok
				'proficiencies': [										// ok
					{													// *
						'name': String,									// *
						'cat': String,									// *
						'details': String								// *
					}													// *
				],														// *
				'custom': [												// ok
					{													// *
						'name': String,									// *
						'details': String								// *
					}													// *
				]														// *
			},															// *
// ========================================================================================================================= Prerequisites == //

// == Bunuses ============================================================================================================================== //
			'bonuses': {
				'str': {'type': Number, 'default': 0},					// ok
				'dex': {'type': Number, 'default': 0},					// ok
				'con': {'type': Number, 'default': 0},					// ok
				'int': {'type': Number, 'default': 0},					// ok
				'wis': {'type': Number, 'default': 0},					// ok
				'cha': {'type': Number, 'default': 0},					// ok
				'any': {'type': Number, 'default': 0},					// ok
				'initiative': {'type': Number, 'default': 0},			// ok
				'hp': {'type': Number, 'default': 0},					// ok
				'speed': {'type': Number, 'default': 0},				// ok
				'langSlots': {'type': Number, 'default': 0},			// ok
				'proficiencies': [										// ok
					{													// *
						'name': String,									// *
						'cat': String,									// *
						'details': String								// *
					}													// *
				],														// *
				'custom': [												// ok
					{													// *
						'name': String,									// *
						'details': String								// *
					}													// *
				]														// *
			// 	'ac': {													// Medium armor master
			// 		'value': {'type': Number, 'default': 0},
			// 		'condition': {'type': Boolean, 'default': false},
			// 	},
			// 	'spells': {
			// 		'rpgClass': [{'type': String, 'default': ""}],
			// 		'spellLevel': [
			// 			{
			// 				'qty': {'type': Number, 'default': 0},
			// 				'lvl': {'type': Number, 'default': 0}
			// 			}
			// 		]
			// 	},
			// 	'classFeature': [										// checar esse parâmetro depois de montar as classes
			// 		{
			// 			'rpgClass': {'type': String, 'default': ""},
			// 			'feature': {
			// 				'name': {'type': String, 'default': ""},
			// 				'desc': {'type': String, 'default': ""},
			// 			}
			// 		}
			// 	],
			// 	'diceMod': {
			// 		'name': {'type': String, 'default': ""},
			// 		'numberOfDices': {'type': Number, 'default': 0},
			// 		'diceType': {'type': Number, 'default': 0}
			// 	}
			}
		},
// ============================================================================================================================== Bunuses == //
		{
			'collection': 'feats'
		}
	);

featSchema.plugin(uniqueV);								// validate unique values

module.exports = mongoose.model('Feat', featSchema);