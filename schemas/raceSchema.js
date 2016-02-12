'use strict';
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,

	raceSchema = new Schema(
		{
			'name': {type: String, required: true, minlength: 3},
			'slug': {'type': String, 'required': true, 'minlength': 3},
			'shortDesc': {'type':String, 'required': true, 'minlength': 3, 'maxlength': 145},
			'createdBy': String,
			'desc': {type: String, required: true, minlength: 3},
			'age': String,
			'alignmentTend': String, 
			'size': String,
			'languages': [String],
			'speed': {
				'base': Number,
				'desc': String
			},
			'commonNames': [
				{
					'group': String,
					'namesList': [String]
				}
			],
			'traits': {
				'str': Number,
				'dex': Number,
				'con': Number,
				'int': Number,
				'wis': Number,
				'cha': Number,
				'hp': {
					'oneTime': Number,
					'perLevel': Number
				},
				'skillProf': [String],
				'equipProf': [String],
				'spells':[
					{
						'name': String,
						'lvlReq': Number
					}
				],
				'dmgResist': [String],
				'spAttack':	{
					'name': String,
					'dmg': [
						{
							'minLvL': Number
							'staticDmg': Number,
							'numberOfDices': Number,
							'diceType': Number
						}
					],
					'dmgType': [String]
				},
				'other': [
					{
						'name': String,
						'desc': String
					}
				]
			}
		},
		{
			'collection': 'races'
		}
	);

module.exports = mongoose.model('Race', raceSchema);