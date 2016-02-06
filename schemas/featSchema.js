'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.featSchema = new Schema({
	name: {type:String, required: true, minlength: 3},
	prereq: [
		hasReq: {type: Boolean, required: true,}
		minStr: Number,
		minDex: Number,
		minCon: Number,
		MinInt: Number,
		minWis: Number,
		minCha: Number,
		spellCaster: Boolean,
		proficiency: String,
	],
	desc: {type:String, required: true, minlength: 3},
	bonus: {
		initiative: Number,
		str: Number,
		dex: Number,
		con: Number,
		int: Number,
		wis: Number,
		cha: Number,
		ac: {
			value: Number,
			dualWield: Boolean,
			minDex: Number
		},
		proficiency: [String],
		language: [String],
		spells: {
			rpgClass: [String],
			spellLevel: [
				{
					lvl: Number,
					qtd: Number
				}
			]
		},
		classFeature: [ // checar esse parâmetro depois de montar as classes
			{
				rpgClass: String,
				feature: {
					name: String;
					desc: String,
				}
			}
		],
		speed: Number,
		skill: [
			{
				name: String,
				value: Number
			}
		],
		savingThrow: {
			name: String,
			value: Number // Shield Master talent - adiciona o do escudo
		},
		diceMod: {
			name: String
			numberOfDices: Number,
			diceType: Number
		}
		hp: {
			oneTime: Number,
			perLevel: Number
		}
	}
});