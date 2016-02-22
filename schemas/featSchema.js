'use strict';
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,

	featSchema = new Schema(
		{
			'name': {type:String, required: true, minlength: 3},
			'slug': {'type': String, 'required': true, 'minlength': 3},
			'shortDesc': {'type':String, 'required': true, 'minlength': 3, 'maxlength': 145},
			'createdBy': String,
			'prereq': {
				'minStr': {'type': Number, 'default': 0},
				'minDex': {'type': Number, 'default': 0},
				'minCon': {'type': Number, 'default': 0},
				'minInt': {'type': Number, 'default': 0},
				'minWis': {'type': Number, 'default': 0},
				'minCha': {'type': Number, 'default': 0},
				'spellCaster': {'type': Boolean, 'default': false},
				'proficiencies': {'type': [String], 'default': []}
			},
			'desc': {'type':String, 'required': true, 'minlength': 3},
			'bonus': {
				'initiative': {'type': Number, 'default': 0},
				'str': {'type': Number, 'default': 0},
				'dex': {'type': Number, 'default': 0},
				'con': {'type': Number, 'default': 0},
				'int': {'type': Number, 'default': 0},
				'wis': {'type': Number, 'default': 0},
				'cha': {'type': Number, 'default': 0},
				'ac': {
					'value': {'type': Number, 'default': 0},
					'dualWield': {'type': Boolean, 'default': false},
					'minDex': {'type': Number, 'default': 0}
				},
				'equipProf': [{'type': String, 'default': ""}],
				'language': [{'type': String, 'default': ""}],
				'spells': {
					'rpgClass': [{'type': String, 'default': ""}],
					'spellLevel': [
						{
							'qty': {'type': Number, 'default': 0},
							'lvl': {'type': Number, 'default': 0}
						}
					]
				},
				'classFeature': [ // checar esse parâmetro depois de montar as classes
					{
						'rpgClass': {'type': String, 'default': ""},
						'feature': {
							'name': {'type': String, 'default': ""},
							'desc': {'type': String, 'default': ""},
						}
					}
				],
				'speed': {'type': Number, 'default': 0},
				'skillProf': [{'type': String, 'default': ""}],
				'savingThrow': {
					'name': {'type': String, 'default': ""},
					'value': {'type': Number, 'default': 0} // Shield Master talent - adiciona o do escudo
				},
				'diceMod': {
					'name': {'type': String, 'default': ""},
					'numberOfDices': {'type': Number, 'default': 0},
					'diceType': {'type': Number, 'default': 0}
				},
				'hp': {
					'perLevel': {'type': Number, 'default': 0}
				}
			}
		},
		{
			'collection': 'feats'
		}
	);

module.exports = mongoose.model('Feat', featSchema);