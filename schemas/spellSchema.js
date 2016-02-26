'use strict';
var mongoose = require('mongoose'),
	 uniqueV = require('mongoose-unique-validator'),
	  Schema = mongoose.Schema,

	spellSchema = new Schema(
		{
// == General =============================================================================================================================== //
			'name': {'type': String, 'required': true, 'minlength': 3, 'unique': true, uniqueCaseInsensitive: true},	// ok
			'slug': {'type': String, 'required': true, 'minlength': 3, 'unique': true, uniqueCaseInsensitive: true},	// ok - Automatic
			'shortDesc': {'type':String, 'required': true, 'minlength': 3, 'maxlength': 145},							// ok
			'createdBy': String,																						// ok - Automatic (to-do)
			'desc': {'type':String, 'required': true, 'minlength': 3},
// =============================================================================================================================== General == //

// == Basic ================================================================================================================================= //
			'level': {'type': Number, 'required': true},																// ok
			'ritual': {'type': Boolean, 'required': true, 'default': false},											// ok
			'schools': [{'type': String, 'required': true}],															// ok
			'savings': [																								// ok
				{																										// *
					'name': {'type': String, 'required': true},															// *
					'desc': String																						// *
				}																										// *
			],																											// *
			'components': [																								// ok
				{																										// *
					'name': {'type': String, 'required': true},	// Verbal, Somatic, Material							// *
					'desc': String																						// *
				}																										// *
			],																											// *
// ================================================================================================================================= Basic == //

// == Effect ================================================================================================================================ //
			'castTime': {
				'time': {'type': Number, 'required': true}, // In seconds. 0 for instant, reaction or bonus action. 1 action = 6s
				'details': {'type': String, default: ''}
			},
			'range': {'type':Number, 'required': true},
			'duration': [
			 	{
			 		'concentration': {'type': Boolean, /*'required': true*/},
			 		'max': {'type': Number, 'required': true}, // In seconds. 0 for instant
			 		'details': String
			 	}
			]/*,*/
			// 'effect': {
			// 	'aoe': {'type': String, default: ''},
			// 	'size': [
			// 		{
			// 			'size': Number,
			// 			'desc': {'type': String, default: ''}
			// 		}
			// 	]
			// },
// ================================================================================================================================ Effect == //

// == Damage ================================================================================================================================ //
		// 	'damage': {
		// 		'harmful': {'type': Boolean, /*'required': true,*/ 'default': false},
		// 		'staticDmg': {'type': Number, default: 0},
		// 		'numberOfDices': {'type': Number, 'default': 0},
		// 		'diceType': {'type': Number, 'default': 0},
		// 		'dmgType': [
		// 			{'type': String, 'default': ''}
		// 		]
		// 	},
		// 	'atHigherLevels': {
		// 		'staticDmg': {'type': Number, default: 0},
		// 		'numberOfDices': {'type': Number, default: 0},
		// 		'diceType': {'type': Number, default: 0},
		// 		'desc': {'type': String, 'default': ''}
		// 	}
		},
// ================================================================================================================================ Damage == //
		{
			'collection': 'spells'
		}
	);

spellSchema.plugin(uniqueV);								// validate unique values

module.exports = mongoose.model('Spell', spellSchema);