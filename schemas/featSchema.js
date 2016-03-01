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
			'desc': {'type':String, 'required': true, 'minlength': 3},
// =============================================================================================================================== General == //

// == Prerequisites ========================================================================================================================= //
			'prereqs': {												// 
				'str': {'type': Number, 'default': 0},					// 
				'dex': {'type': Number, 'default': 0},					// 
				'con': {'type': Number, 'default': 0},					// 
				'int': {'type': Number, 'default': 0},					// 
				'wis': {'type': Number, 'default': 0},					// 
				'cha': {'type': Number, 'default': 0},					// 
				'spellCaster': {'type': Boolean, 'default': false},		// 
				'proficiencies': [										// 
					{													// 
						'name': String,									// 
						'cat': String,									//
						'details': String								// 
					}													// 
				]														// 
			},															// 
// ========================================================================================================================= Prerequisites == //

			'bonuses': {
				'str': {'type': Number, 'default': 0},					// 
				'dex': {'type': Number, 'default': 0},					// 
				'con': {'type': Number, 'default': 0},					// 
				'int': {'type': Number, 'default': 0},					// 
				'wis': {'type': Number, 'default': 0},					// 
				'cha': {'type': Number, 'default': 0},					// 
				'anyAbility': {'type': Number, 'default': 0},			// 
				'initiative': {'type': Number, 'default': 0},			// 
				'hp': {'type': Number, 'default': 0},					// 
				'speed': {'type': Number, 'default': 0},				// 
				'langSlots': {'type': Number, 'default': 0},			// 
				'proficiencies': [										// 
					{													// 
						'name': String,									// 
						'cat': String,									//
						'num': Number,									//
						'details': String								// 
					}													// 
				],														// 
			// 	'ac': {													// Medium armor master
			// 		'value': {'type': Number, 'default': 0},
			//		'condition': {'type': Boolean, 'default': false},
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
			// 	},
				'custom': [
					{
						'details': String
					}
				]
			}
		},
		{
			'collection': 'feats'
		}
	);

featSchema.plugin(uniqueV);								// validate unique values

module.exports = mongoose.model('Feat', featSchema);