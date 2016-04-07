var			 passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy,
	 FacebookStrategy = require('passport-facebook').Strategy,
				 User = require('../schemas/usersSchema'),
			   config = require('../services/oauth');

// == LOCAL login strategy ========================================================================================================== //
	passport.use('local', new LocalStrategy (
		function(username, password, done) {
			User.findOne({$or: [ {name: username}, {email: username} ]},						// Try to login using username or email
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

// passport.use('facebook', new FacebookStrategy (config.facebook,
// 	function(accessToken, refreshToken, profile, done) {
// 		console.log('alguma coisa?');done(err, user);
// 		return done(null, profile);
// 		// User.findOrCreate({}, function(err, user) {
// 		// 	if (err) { return done(err); }
// 		// 	done(err, user);
// 		// });
// 	}
// ));


passport.use(new FacebookStrategy(config.facebook,
  function(accessToken, refreshToken, profile, cb) {
  	console.log(profile);
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));


passport.serializeUser(function(user, done) {
	console.log('serializou!');
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	console.log('deserializou!');
	User.findById(id, function(err, user) {
		done(null, user);
	});
});