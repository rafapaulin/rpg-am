'use strict';
var		mongoose = require('mongoose'),
		 uniqueV = require('mongoose-unique-validator'),
		  Schema = mongoose.Schema,
		  bcrypt = require('bcrypt'),
	  saltFactor = 10,
	findOrCreate = require('mongoose-findorcreate'),

	usersSchema = new Schema(
		{
// == General ================================================================================================================================= //
			name: {type: String, required: true, minlength: 3, unique: true, uniqueCaseInsensitive: true},	// username
			password: {type: String, required: true, minlength: 3},
			slug: {type: String, required: true, minlength: 3, unique: true, uniqueCaseInsensitive: true},	// ok - Automatic on backend - based on name
			//firstName: {type: String, required: true, minlength: 3},
			//lastName: {type: String, required: true, minlength: 3},
			email: {type: String, required: true, minlength: 3, unique: true, uniqueCaseInsensitive: true}
			//country: {type: String, required: true, minlength: 3}
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
usersSchema.plugin(findOrCreate);						// Find or create user plugin

module.exports = mongoose.model('Users', usersSchema);	// Export module