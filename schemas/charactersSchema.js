'use strict';
require('../schemas/backgroundsSchema');
require('../schemas/classesSchema');
require('../schemas/equipsSchema');
require('../schemas/featsSchema');
require('../schemas/racesSchema');
require('../schemas/skillsSchema');
require('../schemas/spellsSchema');
require('../schemas/usersSchema');
var	mongoose = require('mongoose'),
autopopulate = require('mongoose-autopopulate'),
	 uniqueV = require('mongoose-unique-validator'),
	  Schema = mongoose.Schema,

	charactersSchema = new Schema(
		{
// == General =============================================================================================================================== //
			name: {type: String, required: true},
			createdOn: {type: Date},						// ok - Automatic
			lastUpdate: {type: Date},						// ok - Automatic
			createdBy: {									// ok - Automatic
				type: Schema.Types.ObjectId,				// *
				ref: 'Users',								// *
				autopopulate: {select: 'userName'}			// *
			},												// *
			slug: {type: String, required: true},
			race: {
				type: Schema.Types.ObjectId,
				ref: 'Races',
				required: true,
				autopopulate: true
			},
			classes: [
				{
					type: Schema.Types.ObjectId,
					ref: 'Classes',
					autopopulate: true
				}
			],
			background: {
				type: Schema.Types.ObjectId,
				ref: 'Backgrounds',
				required: true,
				autopopulate: true
			},
// =============================================================================================================================== General == //

// == Personality ========================================================================================================================== //
			alignment: {
				name: String,
				info: String
			},
			ideals: {type: String, maxlength: 145},
			bonds: {type: String, maxlength: 145},
			flaws: {type: String, maxlength: 145},
			psychological: {type: String, maxlength: 145},
// ========================================================================================================================== Personality == //

// == Physical characteristics ============================================================================================================= //
			skinColor: {
				name: String,
				cat: String,	
				hex: String
			},
			eyeColor: {
				name: String,
				cat: String,	
				hex: String
			},
			hairColor: {
				name: String,
				cat: String,	
				hex: String
			},
			beardColor: {
				name: String,
				cat: String,	
				hex: String
			},
			gender: String,
			height: Number,
			weight: Number,
			physical: {type: String, maxlength: 145},
// ============================================================================================================= Physical characteristics == //

// == Abilities =========================================================================================================================== //
			str: {type: Number, required: true},
			dex: {type: Number, required: true},
			con: {type: Number, required: true},
			int: {type: Number, required: true},
			wis: {type: Number, required: true},
			cha: {type: Number, required: true},
// =========================================================================================================================== Abilities == //

// ==  Level progression ================================================================================================================== //
			lvlUp: [
				{
					class: String,
					classPath: String,
					classFeat: String,
					hp: Number,
					talent: String,
					str: Number,
					dex: Number,
					con: Number,
					int: Number,
					wis: Number,
					cha: Number
				},
			],
// ==================================================================================================================  Level progression == //

// == Inventory =========================================================================================================================== //
			inventory: {
				wealth: {
					cp: Number,
					sp: Number,
					ep: Number,
					gp: Number,
					pp: Number
				},
				treasure: [
					{
						name: String,
						qtd: Number,
						value: Number,
						weight: Number,
						desc: String
					}
				],
				tradingGoods: [
					{
						name: String,
						qtd: Number,
						value: Number,
						weight: Number,
						desc: String
					}
				],
				gear: [
					{
						name: String,
						qtd: Number,
						value: Number,
						weight: Number,
						desc: String
					}
				],
				tools: [
					{
						name: String,
						qtd: Number,
						value: Number,
						weight: Number,
						desc: String
					}
				],
				equips: {
					armor: {},
					mainHand: {},
					offHand: {}
				},
				other: {
					name: String,
					qtd: Number,
					value: Number,
					weight: Number,
					desc: String
				}
			}
// =========================================================================================================================== Inventory == //
		},
		{
			collection: 'characters'
		}
	);

charactersSchema.plugin(uniqueV);									// validate unique values
charactersSchema.plugin(autopopulate);								// Autopopulate users

module.exports = mongoose.model('Characters', charactersSchema);