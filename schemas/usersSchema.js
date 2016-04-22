'use strict';
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
			socialIDs: {
				facebook: {
					id: {type: String},
					email: {type: String},
					profileLink: {type: String},
					profilePic: {type: String},
					firstName: {type: String},
					middleName: {type: String},
					lastName: {type: String},
					gender: {type: String},
					timeZone: {type: String}
				},
				twitter: {
					id: {type: String},
					email: {type: String},
					name: {type: String},
					screenName: {type: String},
					profilePic: {type: String},
					location: {type: String},
					timeZone: {type: String}
				},
				google: {
					id: {type: String},
					email: {type: String},
					name: {type: String},
					profileLink: {type: String},
					profilePic: {type: String},
					gender: {type: String}
				}
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

module.exports = mongoose.model('Users', usersSchema);	// Export module