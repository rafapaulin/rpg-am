'use strict';
var mongoose = require('mongoose'),
	 uniqueV = require('mongoose-unique-validator'),
	  Schema = mongoose.Schema,
	  bcrypt = require('bcrypt'),
  saltFactor = 10,

	usersSchema = new Schema(
		{
// == General =============================================================================================================================== //
			name: {type: String, required: true, minlength: 3, unique: true, uniqueCaseInsensitive: true},	// username
			password: {type: String, required: true, minlength: 3},
			slug: {type: String, required: true, minlength: 3, unique: true, uniqueCaseInsensitive: true},	// ok - Automatic on backend - based on name
			// firstName: {type: String, required: true, minlength: 3},
			// lastName: {type: String, required: true, minlength: 3},
			// country: {type: String, required: true, minlength: 3},
// =============================================================================================================================== General == //
		},
		{
			'collection': 'users'
		}
	);


usersSchema.plugin(uniqueV);														// validate unique values

// == Password hashing ====================================================================================================================== //
	// usersSchema.pre('save', function(next) {
	// 	var user = this;

	// 	if (!user.isModified('password')) return next();								// Only hash the password if it has been modified (or is new)

	// 	bcrypt.genSalt(saltFactor, function(err, salt) {								// generate a salt
	// 		if (err) return next(err);

	// 		bcrypt.hash(user.password, salt, function(err, hash) {						// hash the password using our new salt
	// 			if (err) return next(err);
		        
	// 	        user.password = hash;													// override the cleartext password with the hashed one
	// 	        next();
	// 	    });
	// 	});
	// });
// ====================================================================================================================== Password hashing == //

// == Password verification ================================================================================================================= //
	// usersSchema.methods.comparePassword = function(candidatePassword, cb) {
	// 	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
	// 		if (err) return cb(err);
	// 		cb(null, isMatch);
	// 	});
	// };
// ================================================================================================================= Password verification == //

module.exports = mongoose.model('Users', usersSchema);