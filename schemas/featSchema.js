'use strict';
var mongoose = require('mongoose'),
	 uniqueV = require('mongoose-unique-validator'),
	  Schema = mongoose.Schema,

	featSchema = new Schema(
		{
			'name': {type:String, required: true, minlength: 3, 'unique': true, uniqueCaseInsensitive: true},			// ok
			'slug': {'type': String, 'required': true, 'minlength': 3, 'unique': true, uniqueCaseInsensitive: true},	// ok - Automatic
			'shortDesc': {'type':String, 'required': true, 'minlength': 3, 'maxlength': 145},							// ok
			'createdBy': String,																						// ok - Automatic (to-do)
			'prereq': {																									// ok
				'minStr': {'type': Number, 'default': 0},																// ok
				'minDex': {'type': Number, 'default': 0},																// ok
				'minCon': {'type': Number, 'default': 0},																// ok
				'minInt': {'type': Number, 'default': 0},																// ok
				'minWis': {'type': Number, 'default': 0},																// ok
				'minCha': {'type': Number, 'default': 0},																// ok
				'spellCaster': {'type': Boolean, 'default': false},														// ok
				'proficiencies': {'type': [String], 'default': []}														// ok
			},
			'desc': {'type':String, 'required': true, 'minlength': 3},													// ok
			'bonus': {
				'initiative': {'type': Number, 'default': 0},															// ok
				'str': {'type': Number, 'default': 0},																	// ok
				'dex': {'type': Number, 'default': 0},																	// ok
				'con': {'type': Number, 'default': 0},																	// ok
				'int': {'type': Number, 'default': 0},																	// ok
				'wis': {'type': Number, 'default': 0},																	// ok
				'cha': {'type': Number, 'default': 0},																	// ok
				'hp': {'type': Number, 'default': 0},																	// ok
				'speed': {'type': Number, 'default': 0},																// ok
				'languageSlots': {'type': Number, 'default': 0},														// ok
				'ac': {																									// Medium armor master
					'value': {'type': Number, 'default': 0},
					'dualWield': {'type': Boolean, 'default': false},
					'minDex': {'type': Number, 'default': 0}
				},
				'svThrowProf': [{'type': String, 'default': ""}],
				'equipProf': [{'type': String, 'default': ""}],
				'skillProf': [{'type': String, 'default': ""}],
				'spells': {
					'rpgClass': [{'type': String, 'default': ""}],
					'spellLevel': [
						{
							'qty': {'type': Number, 'default': 0},
							'lvl': {'type': Number, 'default': 0}
						}
					]
				},
				'classFeature': [																						// checar esse parâmetro depois de montar as classes
					{
						'rpgClass': {'type': String, 'default': ""},
						'feature': {
							'name': {'type': String, 'default': ""},
							'desc': {'type': String, 'default': ""},
						}
					}
				],
				'diceMod': {
					'name': {'type': String, 'default': ""},
					'numberOfDices': {'type': Number, 'default': 0},
					'diceType': {'type': Number, 'default': 0}
				},
			}
		},
		{
			'collection': 'feats'
		}
	);

featSchema.plugin(uniqueV);								// validate unique values

module.exports = mongoose.model('Feat', featSchema);