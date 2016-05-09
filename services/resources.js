require('../schemas/spellsSchema');

var mongoose = require('mongoose'),
	  Schema = mongoose.Schema,

	res = {
	bonuses: {
		vision: Number,
		speed: Number,
		hp: Number,
		ac: Number,
		initiative: Number,
		prof: Number,
		spellDC: Number,
		meleeToHit: Number,
		meleeDmg: Number,
		rangedToHit: Number,
		rangedDmg: Number,
		spellToHit: Number,
		spellDmg: Number,
		spellsKnown: Number,
		cantripsKnown: Number,
		invocationsKnown: Number,
		str: Number,
		dex: Number,
		con: Number,
		int: Number,
		wis: Number,
		cha: Number,
		langSlots: Number,
		languages: [
			{
				name: String,
				cat: String,
				script: String
			}
		],
		proficiencies: [
			{
				name: String,
				cat: String,
				details: String
			}
		],
		maxWeight: Number,
		skillSlot: Number,
		inspiration: Number,
		range: Number,
		spellRange: Number,
		skills: [
			{
				name: String,
				value: Number
			}
		],
		spellSlots: {
			first: Number,
			second: Number,
			third: Number,
			fourth: Number,
			fifth: Number,
			sixth: Number,
			seventh: Number,
			eighth: Number,
			ninth: Number
		},
		dmgResistance: [String],
		spells: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Spells',
				autopopulate: true
			}
		],
		kiPoints: Number,
		sorceryPoints: Number,
		rages: Number,
		rageDmg: Number,
		bardicInsp: Number,
		martialArts: Number,
		sneakAttack: Number
	}
};

module.exports = res;