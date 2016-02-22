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
				'minStr': Number,
				'minDex': Number,
				'minCon': Number,
				'minInt': Number,
				'minWis': Number,
				'minCha': Number,
				'spellCaster': {Boolean, default: false},
				'proficiencies': [String]
			},
			'desc': {type:String, required: true, minlength: 3},
			'bonus': {
				'initiative': Number,
				'str': Number,
				'dex': Number,
				'con': Number,
				'int': Number,
				'wis': Number,
				'cha': Number,
				'ac': {
					'value': Number,
					'dualWield': Boolean,
					'minDex': Number
				},
				'equipProf': [String],
				'language': [String],
				'spells': {
					'rpgClass': [String],
					'spellLevel': [
						{
							'qty': Number,
							'lvl': Number
						}
					]
				},
				'classFeature': [ // checar esse parâmetro depois de montar as classes
					{
						'rpgClass': String,
						'feature': {
							'name': String,
							'desc': String,
						}
					}
				],
				'speed': Number,
				'skillProf': [String],
				'savingThrow': {
					'name': String,
					'value': Number // Shield Master talent - adiciona o do escudo
				},
				'diceMod': {
					'name': String,
					'numberOfDices': Number,
					'diceType': Number
				},
				'hp': {
					'oneTime': Number,
					'perLevel': Number
				}
			}
		},
		{
			'collection': 'feats'
		}
	);

module.exports = mongoose.model('Feat', featSchema);