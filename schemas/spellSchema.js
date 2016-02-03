var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.spellSchema = new Schema({
	name: {type: String, required: true, minlength: 3},
	shortDesc: {type:String, required: true, minlength: 3},
	level: {type: Number, required: true},
	ritual: {type: Boolean, required: true},
	school: {type: String, required: true, minlength: 3},
	castTime: {
		time: {type: Number, required: true},
		desc: String
	},
	range: {type:Number, required: true},
	components: [
		{
			name: String,
			desc: String
		}
	],
	duration: [
		{
			concentration: {type: Boolean, required: true},
			max: {type: Number, required: true}
		}
	],
	effect: {
		desc: {type:String, required: true, minlength: 3},
		aoe: String,
		size: [
			{
				size: Number,
				desc: String
			}
		]
	},
	damage: {
		harmful: {type: Boolean, required: true},
		staticDmg: Number,
		numberOfDices: {type: Number, required: true},
		diceType: {type: Number, required: true},
		dmgType: [
			{type: String, required: true, minlength: 3}
		]
	},
	save: {type: String, required: true, minlength: 3},
	atHigherLevels: {
		staticDmg: Number
		numberOfDices: Number,
		diceType: Number,
		desc: String
	}
});
