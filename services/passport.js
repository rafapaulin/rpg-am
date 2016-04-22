var			 passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy,
	 FacebookStrategy = require('passport-facebook').Strategy,
	  TwitterStrategy = require('passport-twitter').Strategy,
	   GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
		 randomstring = require("randomstring"),
				 User = require('../schemas/usersSchema'),
				 slug = require('slug');
			   logger = require("../services/logger"),
			   config = require('../services/oauth');

// == LOCAL login strategy ========================================================================================================== //
	passport.use('local', new LocalStrategy (
		function(username, password, done) {
			User.findOne(
				{
					$or: [
						{userName: username},
						{email: username},
						{'socialIDs.facebook.email': username},
						{'socialIDs.google.email': username},
						{'socialIDs.twitter.email': username},
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

			var	tempUserName = slug(profile.emails[0].value.substr(0, profile.emails[0].value.indexOf('@')) + randomstring.generate({length: 6, charset: 'numeric'}), {
				replacement: '-',					// replace spaces with replacement 
				symbols: true,						// replace unicode symbols or not 
				remove: null,						// (optional) regex to remove characters 
				lower: true,						// result in lower case 
				charmap: slug.charmap,				// replace special characters 
				multicharmap: slug.multicharmap		// replace multi-characters 
			});
			console.log(tempUserName);

			User.findOneAndUpdate(
				{
					$or: [
						{'socialIDs.facebook.id': profile._json.id},
						{'socialIDs.facebook.email': profile.emails[0].value},
						{email: profile.emails[0].value},
						{'socialIDs.twitter.email': profile.emails[0].value},
						{'socialIDs.google.email': profile.emails[0].value}
					]
				},
				{
					$setOnInsert: {
						userName: tempUserName,
						slug: tempUserName,
						email: profile.emails[0].value,
					},
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
	passport.use('twitter', new TwitterStrategy(config.twitter,
		function(token, tokenSecret, profile, done) {

			var	tempUserName = slug(profile.emails[0].value.substr(0, profile.emails[0].value.indexOf('@')) + randomstring.generate({length: 6, charset: 'numeric'}), {
				replacement: '-',					// replace spaces with replacement 
				symbols: true,						// replace unicode symbols or not 
				remove: null,						// (optional) regex to remove characters 
				lower: true,						// result in lower case 
				charmap: slug.charmap,				// replace special characters 
				multicharmap: slug.multicharmap		// replace multi-characters 
			});
			console.log(tempUserName);

			User.findOneAndUpdate(
				{
					$or: [
						{'socialIDs.twitter.id': profile._json.id_str},
						{'socialIDs.twitter.email': profile.emails[0].value},
						{email: profile.emails[0].value},
						{'socialIDs.facebook.email': profile.emails[0].value},
						{'socialIDs.google.email': profile.emails[0].value}
					]
				},
				{
					$setOnInsert: {
						userName: tempUserName,
						slug: tempUserName,
						email: profile.emails[0].value,
					},
					$set: {
						'socialIDs.twitter': {
							id: profile._json.id_str,
							name: profile._json.name,
							email: profile.emails[0].value,
							screenName: profile._json.screen_name,
							profilePic: profile._json.profile_image_url.replace('_normal',''),
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

// == GOOGLE login strategy ========================================================================================================= //
	passport.use('google', new GoogleStrategy(config.google,
		function(token, tokenSecret, profile, done) {
			var	tempUserName = slug(profile.emails[0].value.substr(0, profile.emails[0].value.indexOf('@')) + randomstring.generate({length: 6, charset: 'numeric'}), {
				replacement: '-',					// replace spaces with replacement 
				symbols: true,						// replace unicode symbols or not 
				remove: null,						// (optional) regex to remove characters 
				lower: true,						// result in lower case 
				charmap: slug.charmap,				// replace special characters 
				multicharmap: slug.multicharmap		// replace multi-characters 
			});
			console.log(tempUserName);

			User.findOneAndUpdate(
				{
					$or: [
						{'socialIDs.google.id': profile._json.id},
						{'socialIDs.google.email': profile.emails[0].value},
						{email: profile.emails[0].value},
						{'socialIDs.facebook.email': profile.emails[0].value},
						{'socialIDs.twitter.email': profile.emails[0].value},
					]
				},
				{
					$setOnInsert: {
						userName: tempUserName,
						slug: tempUserName,
						email: profile.emails[0].value,
					},
					$set: {
						'socialIDs.google': {
							id: profile._json.id,
							gender: profile._json.gender,
							email: profile.emails[0].value,
							name: profile._json.displayName,
							profileLink: profile._json.url,
							profilePic: profile._json.image.url.replace('?sz=50',''),
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
// ========================================================================================================= GOOGLE login strategy == //



passport.serializeUser(function(user, done) {
	console.log('serializou!');
	done(null, user);
});

passport.deserializeUser(function(id, done) {
	console.log('deserializou!');
	User.findById(id, function(err, user) {
		done(null, user);
	});
});