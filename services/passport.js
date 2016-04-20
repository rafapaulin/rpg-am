var			 passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy,
	 FacebookStrategy = require('passport-facebook').Strategy,
	  TwitterStrategy = require('passport-twitter').Strategy,
	   GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
				 User = require('../schemas/usersSchema'),
			   logger = require("../services/logger"),
			   config = require('../services/oauth');

// == LOCAL login strategy ========================================================================================================== //
	passport.use('local', new LocalStrategy (
		function(username, password, done) {
			User.findOne(
				{
					$or: [
						{userName: username},
						{email: username}
					]
				},							// Try to login using username or email
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

// == FACEBOOK login strategy ======================================================================================================= //
	passport.use('facebook', new FacebookStrategy (config.facebook,
		function(accessToken, refreshToken, profile, done) {
			
			console.log('*** Profile***');
			logger().info(profile._json);
			console.log('*** Profile***');

			User.findOneAndUpdate(
				{
					$or: [
						{email: profile._json.email},
						{'socialIDs.facebook.id': profile._json.id}
					]
				},
				{
					$set: {
						'socialIDs.facebook': {
							id: profile._json.id,
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
				},
				{new: true, upsert: true},
				function(err, user){
					done(err, user)
				}
			);
		}
	));
// ======================================================================================================= FACEBOOK login strategy == //

// == TWITTER login strategy ======================================================================================================== //
	passport.use('twitter',new TwitterStrategy(config.twitter,
		function(token, tokenSecret, profile, done) {
			console.log(profile);
			User.findOneAndUpdate(
				{
					$or: [
						{email: profile._json.email},
						{'socialIDs.twitter.id': profile._json.id_str}
					]
				},
				{
					$set: {
						'socialIDs.twitter': {
							id: profile._json.id_str,
							name: profile._json.name,
							screenName: profile._json.screen_name,
							profilePic: profile._json.profile_image_url,
							location: profile._json.location,
							timeZone: profile._json.time_zone
						}
					}
				},
				{new: true, upsert: true},
				function (err, user) {
					return done(err, user);
				}
			);
		}
	));
// ======================================================================================================== TWITTER login strategy == //


	passport.use('google', new GoogleStrategy(config.google,
		function(token, tokenSecret, profile, done) {
			logger().debug(profile);

			User.findOneAndUpdate(
				{
					$or: [
						{email: profile._json.email},
						{'socialIDs.google.id': profile._json.id_str}
					]
				},
				{
					$set: {
						'socialIDs.google': {
							id: profile._json.id,
							gender: profile._json.gender,
							email: profile._json.emails[0], //ajustar aqui
							name: profile._json.displayName,
							profileLink: profile._json.url,
							profilePic: profile._json.image.url,
						}
					}
				},
				{new: true, upsert: true},
				function (err, user) {
					return done(err, user);
				}
			);
		}
	));





passport.serializeUser(function(user, done) {
	console.log('serializou!');
	console.log('***** User serializado *****');
	console.log(user);
	console.log('***** User serializado *****');
	done(null, user);
});

passport.deserializeUser(function(id, done) {
	console.log('deserializou!');
	User.findById(id, function(err, user) {
	console.log('***** User deserializado *****');
	console.log(user);
	console.log('***** User deserializado *****');
		done(null, user);
	});
});