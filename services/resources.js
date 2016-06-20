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
		dmg: Number,
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
		firstLvlSpellSlots: Number,
		secondLvlSpellSlots: Number,
		thirdLvlSpellSlots: Number,
		fourthLvlSpellSlots: Number,
		fifthLvlSpellSlots: Number,
		sixthLvlSpellSlots: Number,
		seventhLvlSpellSlots: Number,
		eighthLvlSpellSlots: Number,
		ninthLvlSpellSlots: Number,
		dmgResistances: [String],
		spells: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Spells',
				autopopulate: true
			}
		],
		classPoints: Number,
		classPoints2: Number,
		classPoints3: Number,
		specialDice: {
			numberOfDices: Number,
			diceType: Number
		},
		featuresSlots: Number
	}
};

module.exports = res;