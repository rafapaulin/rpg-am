'use strict';
require('../schemas/backgroundsSchema');
require('../schemas/charactersSchema');
require('../schemas/classesSchema');
require('../schemas/equipsSchema');
require('../schemas/featsSchema');
require('../schemas/racesSchema');
require('../schemas/skillsSchema');
require('../schemas/spellsSchema');

var		mongoose = require('mongoose'),
		 uniqueV = require('mongoose-unique-validator'),
		  Schema = mongoose.Schema,
		  bcrypt = require('bcrypt'),
	  saltFactor = 10,

	usersSchema = new Schema(
		{
// == General ================================================================================================================================= //
			userName: {type: String, unique: true, uniqueCaseInsensitive: true},
			password: {type: String, minlength: 4},
			slug: {type: String, unique: true, uniqueCaseInsensitive: true},	// ok - Automatic on backend - based on name
			name: {type: String},
			email: {type: String, unique: true, uniqueCaseInsensitive: true},
			country: {type: String},
			memberSince: {type: Date},
			socialIDs: {
				facebook: {
					id: {type: String},
					email: {type: String},
					name: {type: String},
					profileLink: {type: String},
					profilePic: {type: String},
					token: {type: String},
					secret: {type: String}
				},
				twitter: {
					id: {type: String},
					email: {type: String},
					name: {type: String},
					profileLink: {type: String},
					profilePic: {type: String},
					token: {type: String},
					secret: {type: String},
					screenName: {type: String}
				},
				google: {
					id: {type: String},
					email: {type: String},
					name: {type: String},
					profileLink: {type: String},
					profilePic: {type: String},
					token: {type: String},
					secret: {type: String}
				}
			},
			createdContent: {
				backgrounds:[
					{
						type: Schema.Types.ObjectId,
						ref: 'Backgrounds',
						autopopulate: true
					}
				],
				characters:[
					{
						type: Schema.Types.ObjectId,
						ref: 'Characters',
						autopopulate: true
					}
				],
				classes:[
					{
						type: Schema.Types.ObjectId,
						ref: 'Classes',
						autopopulate: true
					}
				],
				equips:[
					{
						type: Schema.Types.ObjectId,
						ref: 'Equips',
						autopopulate: true
					}
				],
				skills:[
					{
						type: Schema.Types.ObjectId,
						ref: 'Skills'
					}
				],
				spells:[
					{
						type: Schema.Types.ObjectId,
						ref: 'Spells',
						autopopulate: true
					}
				],
				feats:[
					{
						type: Schema.Types.ObjectId,
						ref: 'Feats',
						autopopulate: true
					}
				],
				faces:[
					{
						type: Schema.Types.ObjectId,
						ref: 'Races',
						autopopulate: true
					}
				]
			}
// ================================================================================================================================= General == //
		},
		{
			'collection': 'users'
		}
	);

// == Password hashing ====================================================================================================================== //
	usersSchema.pre('save', function(next) {
		var user = this;	

		if (!user.isModified('password')) return next();				// Only hash the password if it has been modified (or is new)

		bcrypt.genSalt(saltFactor, function(err, salt) {				// generate a salt
			if (err) return next(err);

			bcrypt.hash(user.password, salt, function(err, hash) {		// hash the password using our new salt
				if (err) return next(err);

				user.password = hash;									// override the cleartext password with the hashed one
				next();
		    });
		});
	});
// ====================================================================================================================== Password hashing == //

// == Password verification ================================================================================================================= //
	usersSchema.methods.validPassword = function(candidatePassword, cb) {
		bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
			if (err) return cb(err);
			console.log('isMatch? ' + isMatch)
			cb(null, isMatch);
		});
	};
// ================================================================================================================= Password verification == //

usersSchema.plugin(uniqueV);							// validate unique values
usersSchema.plugin(autopopulate);						// Autopopulate users

module.exports = mongoose.model('Users', usersSchema);	// Export module