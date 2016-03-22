var		 passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
			 User = require('../schemas/usersSchema');

// == LOCAL login strategy ========================================================================================================== //
	passport.use('login', new LocalStrategy(
		function(username, password, done) {
			User.findOne({$or: [ {name: username}, {email: username} ]},							// Try to login using username or email
				function(err, user) {
					if (err) return done(err);

					if (!user) {																// Check for existing username. If not, return a message
						console.log('not user');
						return done(null, false, { message: 'Incorrect username.' });
					}

					user.validPassword(password, 												// Check for a valid password if username exists
						function(err, isMatch){
							if(err) throw err;

							if(!isMatch){														// If password does not match, return a message to user.
								console.log('not valid password');
								return done(null, false, { message: 'Incorrect password.' });
							} else {															// If everything passes, return the user object
								return done(null, user);
							}
						}
					)
				}
			);
		}
	));
// ========================================================================================================== LOCAL login strategy == //

passport.serializeUser(function(user, done) {
	console.log(user);
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	console.log(id);
	User.findById(id, function(err, user) {
		if(err){
			done(err);
		}
		done(null, user);
	});
	console.log(req.user)
});