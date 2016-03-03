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
			'desc': {'type':String, 'required': true, 'minlength': 3},													//ok
// =============================================================================================================================== General == //

// == Basic ================================================================================================================================= //
			'level': {'type': Number, 'required': true},						// ok
			'ritual': {'type': Boolean, 'required': true, 'default': false},	// ok
			'schools': [{'type': String, 'required': true}],					// ok
			'savings': [														// ok
				{																// *
					'name': {'type': String, 'required': true},					// *
					'desc': String												// *
				}																// *
			],																	// *
			'components': [														// ok
				{																// *
					'name': {'type': String, 'required': true},					// *
					'desc': String												// *
				}																// *
			],																	// *
// ================================================================================================================================= Basic == //

// == Effect ================================================================================================================================ //
			'castTime': {												// ok
				'time': {'type': Number, 'required': true},				// *
				'details': {'type': String, default: ''}				// *
			},															// *
			'range': {'type': Number, 'required': true},				// ok
			'duration': {												// ok
			 	'concentration': {'type': Boolean, 'default': false},	// *
			 	'max': {'type': Number, 'required': true}, 				// *
			 	'details': String										// *
			},															// *
			 'effect': {												// *
			 	'aoe': {'type': String, default: ''},					// ok
				'size': {'type': Number, 'default': 0},					// *
			 	'cilinderHeight': {'type': Number, 'default': 0},		// *
			 	'details': {'type': String, default: ''}				// *
			},															// *
// ================================================================================================================================ Effect == //

// == Damage ================================================================================================================================ //
		 	'damage': {												// ok
		 		'harmful': {'type': Boolean, 'default': false},		// *
		 		'staticDmg': {'type': Number, default: 0},			// *
		 		'numberOfDices': {'type': Number, 'default': 0},	// *
		 		'diceType': {'type': Number, 'default': 0},			// *
		 		'dmgTypes': [{'name': String}]						// *
		 	},														// *
		 	'atHigherLevels': {										//
		 		'staticDmg': {'type': Number, default: 0},			//
		 		'numberOfDices': {'type': Number, default: 0},		//
		 		'diceType': {'type': Number, default: 0},			//
		 		'details': {'type': String, 'default': ''}			//
		 	}														//
		},															//
// ================================================================================================================================ Damage == //
		{
			'collection': 'spells'
		}
	);

spellSchema.plugin(uniqueV);							// validate unique values

module.exports = mongoose.model('Spell', spellSchema);