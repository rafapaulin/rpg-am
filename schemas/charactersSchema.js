'use strict';
var	mongoose = require('mongoose'),
	 uniqueV = require('mongoose-unique-validator'),
	  Schema = mongoose.Schema,
	
	charactersSchema = new Schema(
		{
// == General =============================================================================================================================== //
			name: {type: String, required: true},
			createdOn: {type: Date},					// ok - Automatic
			lastUpdate: {type: Date},					// ok - Automatic
			createdBy: {								// ok - Automatic (to-do)
				type: Schema.Types.ObjectId,			// *
				ref: 'Users'							// *
			},											// *
			slug: {type: String, required: true},
			_ref_Races: {
				type: Schema.Types.ObjectId,
				ref: 'Races',
				required: true
			},
			_ref_Classes: {
				type: Schema.Types.ObjectId,
				ref: 'Classes',
				required: true
			},
			_ref_Backgrounds: {
				type: Schema.Types.ObjectId,
				ref: 'Backgrounds',
				required: true
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
			cha: {type: Number, required: true}
// =========================================================================================================================== Abilities == //
		},
		{
			collection: 'characters'
		}
	);

charactersSchema.plugin(uniqueV);									// validate unique values

module.exports = mongoose.model('Characters', charactersSchema);