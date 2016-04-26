'use strict';
var mongoose = require('mongoose'),
	 uniqueV = require('mongoose-unique-validator'),
	  Schema = mongoose.Schema,

	racesSchema = new Schema(
		{
// == General =============================================================================================================================== //
			name: {type: String, required: true, minlength: 3, unique: true, uniqueCaseInsensitive: true},	// ok
			slug: {type: String, required: true, minlength: 3, unique: true, uniqueCaseInsensitive: true},	// ok - Automatic
			shortDesc: {type: String, required: true, minlength: 3, maxlength: 145},						// ok
			createdOn: {type: Date},
			createdBy: {																					// ok - Automatic (to-do)
				type: Schema.Types.ObjectId,
				ref: 'Users'
			},
			desc: {type: String, required: true, minlength: 3},												// ok
// =============================================================================================================================== General == //

// == Roleplay ============================================================================================================================== //
			age: {											// ok
				adulthood: Number,							// *
				avgMax:Number								// *
			},												// *
			alignmentTend: {type: String, maxlength:145},	// *
			physical: {										// ok
				avgHeight: Number,							// *
				avgWeight: Number,							// *
				size: {										// ok
					name: String,							// *
					space: Number							// *
				}											// *
			},												// *
			languages: [									// ok
				{											// *
					name: String,							// *
					cat: String,							// *
					script: String							// *
				}											// *
			],												// *
			speed: {										// ok
				base: Number,								// *
				details: String								// *
			},												// *
			commonNames: [									// ok
				{											// *
					group: String,							// *
					namesList: [String]						// *
				}											// *
			],												// *
// ============================================================================================================================== Roleplay == //

// == Racial traits ========================================================================================================================= //
			bonuses: {
				str: {type: Number, default: 0},			// ok
				dex: {type: Number, default: 0},			// ok
				con: {type: Number, default: 0},			// ok
				int: {type: Number, default: 0},			// ok
				wis: {type: Number, default: 0},			// ok
				cha: {type: Number, default: 0},			// ok

				initiative: {type: Number, default: 0},		// ok
				hp: {type: Number, default: 0},				// ok
				speed: {type: Number, default: 0},			// ok

				proficiencies: [							// ok
					{										// *
						name: String,						// *
						cat: String,						// *
						details: String						// *
					}										// *
				],											// *
				spells: [
					{
						name: String,
						lvlReq: Number
					}
				],
				dmgResist: [								// ok 
		 			{										// *
		 				name: String,						// *
		 				cat: String							// *
		 			}										// *
		 		],											// *
				special: {
					name: String,
					dmg: [
						{
							minLvL: Number,
							staticDmg: Number,
							numberOfDices: Number,
							diceType: Number
						}
					],
					dmgType: [String],
					details: String
				},
				other: [									// *
					{										// *
						name: String,						// *
						details: String						// *
					}										// *
				]											// *
			}
		},
// ========================================================================================================================= Racial traits == //
		{
			collection: 'races'
		}
	);
racesSchema.plugin(uniqueV);								// validate unique values
module.exports = mongoose.model('Races', racesSchema);