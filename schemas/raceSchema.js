'use strict';
var mongoose = require('mongoose'),
	 uniqueV = require('mongoose-unique-validator'),
	  Schema = mongoose.Schema,

	raceSchema = new Schema(
		{
// == General =============================================================================================================================== //
			'name': {'type': String, 'required': true, 'minlength': 3, 'unique': true, uniqueCaseInsensitive: true},	// ok
			'slug': {'type': String, 'required': true, 'minlength': 3, 'unique': true, uniqueCaseInsensitive: true},	// ok - Automatic
			'shortDesc': {'type':String, 'required': true, 'minlength': 3, 'maxlength': 145},							// ok
			'createdBy': String,																						// ok - Automatic (to-do)
			'desc': {'type':String, 'required': true, 'minlength': 3},													// ok
// =============================================================================================================================== General == //
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
				'str': {'type': Number, 'default': 0},
				'dex': {'type': Number, 'default': 0},
				'con': {'type': Number, 'default': 0},
				'int': {'type': Number, 'default': 0},
				'wis': {'type': Number, 'default': 0},
				'cha': {'type': Number, 'default': 0},
				'hp':  {'type': Number, 'default': 0},
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
							'minLvL': Number,
							'staticDmg': Number,
							'numberOfDices': Number,
							'diceType': Number
						}
					],
					'dmgType': [String],
					'details': String
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
raceSchema.plugin(uniqueV);								// validate unique values
module.exports = mongoose.model('Race', raceSchema);