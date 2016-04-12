var			 passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy,
	 FacebookStrategy = require('passport-facebook').Strategy,
				 User = require('../schemas/usersSchema'),
			   logger = require("../services/logger"),
			   config = require('../services/oauth');

// == LOCAL login strategy ========================================================================================================== //
	passport.use('local', new LocalStrategy (
		function(username, password, done) {
			User.findOne({$or: [{name: username}, {email: username}]},							// Try to login using username or email
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

passport.use('facebook', new FacebookStrategy (config.facebook,
	function(accessToken, refreshToken, profile, done) {
		console.log('*** Profile***');
		logger().info(profile._json);
		console.log('*** Profile***');
		console.log('accessToken: ' + accessToken);
		console.log('refreshToken: ' + refreshToken);
		User.findOneAndUpdate(
			{
				$or: [
					{email: profile._json.email},
					{'socialIDs.facebook.id': profile._json.id}
				]
			},
			{
				$set: {
					socialIDs: {
						facebook: {
							id: profile._json.id,
							accessToken: accessToken,
							profileLink: profile._json.link,
							profilePic: profile._json.picture.data.url,
							firstName: profile._json.first_name,
							middleName: profile._json.middle_name,
							lastName: profile._json.last_name,
							gender: profile._json.gender,
							email: profile._json.email,
							timeZone: profile._json.timezone
						}
					}
				}
			},
			{new: true, upsert: true},
			function(err, user){
				done(err, user)
			});
	}
));

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