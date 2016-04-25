'use strict';
// == Requirements ================================================================= //
	var			 passport = require('passport'),
			LocalStrategy = require('passport-local').Strategy,
		 FacebookStrategy = require('passport-facebook').Strategy,
		  TwitterStrategy = require('passport-twitter').Strategy,
		   GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
			 randomstring = require("randomstring"),
					 User = require('../schemas/usersSchema'),
					 slug = require('slug'),
				   logger = require("../services/logger"),
				   config = require('../services/oauth'),
// ================================================================= Requirements == //

	socialQuery = function(provider, profile, tokenA, tokenB) {
		tokenA = typeof tokenA !== 'undefined' ? tokenA : null;
		tokenB = typeof tokenB !== 'undefined' ? tokenB : null;

		var picture,
			fullName,
			link,
			$set = {},
			provID = {},

			tempUserName = slug(profile.emails[0].value.substr(0, profile.emails[0].value.indexOf('@')) + randomstring.generate({length: 6, charset: 'numeric'}), {
				replacement: '-',					// replace spaces with replacement 
				symbols: true,						// replace unicode symbols or not 
				remove: null,						// (optional) regex to remove characters 
				lower: true,						// result in lower case 
				charmap: slug.charmap,				// replace special characters 
				multicharmap: slug.multicharmap		// replace multi-characters 
			});

		if(provider == 'facebook') {
			picture = profile._json.picture.data.url;
			fullName = profile._json.name;
			link = profile._json.link;
		} else if(provider == 'twitter') {
			picture = profile._json.profile_image_url.replace('_normal','');
			fullName = profile._json.name;
			link = 'http://twitter.com/' + profile._json.screen_name;
		} else if(provider == 'google') {
			picture = profile._json.image.url.replace('?sz=50','');
			fullName = profile._json.displayName;
			link = profile._json.url;
		};

		$set['socialIDs.' + provider] = {
			id: profile._json.id,
			profileLink: link,
			profilePic: picture,
			email: profile.emails[0].value,
			name: fullName,
			screenName: profile._json.screen_name,
			token: tokenA,
			secret: tokenB
		};

		provID['socialIDs.' + provider + '.id'] = profile._json.id;

		return {
			query: {
				$or: [														// Try to login using social network id or diferent email sources
					provID,
					{email: profile.emails[0].value},
					{'socialIDs.facebook.email': profile.emails[0].value},
					{'socialIDs.twitter.email': profile.emails[0].value},
					{'socialIDs.google.email': profile.emails[0].value}
				]
			},
			data: {
				$setOnInsert: {												// Set up local info
					userName: tempUserName,
					slug: tempUserName,
					email: profile.emails[0].value
				},
				$set														// Set up social network provided info
			},
			options: {														// DB options
				new: true, 
				upsert: true
			},
		}
	};
// == LOCAL login strategy ========================================================================================================== //
	passport.use('local', new LocalStrategy (
		function(username, password, done) {
			User.findOne(
				{
					$or: [																		// Try to login using username or diferent email sources
						{userName: username},
						{email: username},
						{'socialIDs.facebook.email': username},
						{'socialIDs.google.email': username},
						{'socialIDs.twitter.email': username},
					]
				},
				function(err, user) {
					if (err) return done(err);

					if (!user) {																// Check for existing username. If not, return a message
						console.log('not user');
						return done(null, false, {message: 'Incorrect username.' });
					}

					user.validPassword(password, 												// Check for a valid password if username exists
						function(err, isMatch){
							if(err) throw err;

							if(!isMatch){														// If password does not match, return a message to user.
								console.log('not valid password');
								return done(null, false, {message: 'Incorrect password.' });
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
		function(tokenA, tokenB, profile, done) {					// tokenA = accessToken | tokenB = refreshToken
			console.log('tokenA: ' + tokenA);
			console.log('tokenB: ' + tokenB);

			User.findOneAndUpdate(
				socialQuery('facebook', profile).query,
				socialQuery('facebook', profile, tokenA, tokenB).data,
				socialQuery('facebook', profile).options,
				function(err, user){
					done(err, user)
				}
			);
		}
	));
// ======================================================================================================= FACEBOOK login strategy == //

// == TWITTER login strategy ======================================================================================================== //
	passport.use('twitter', new TwitterStrategy(config.twitter,
		function(tokenA, tokenB, profile, done) {					// tokenA = token | tokenB = tokenSecret
			User.findOneAndUpdate(
				socialQuery('twitter', profile).query,
				socialQuery('twitter', profile, tokenA, tokenB).data,
				socialQuery('twitter', profile).options,
				function(err, user){
					done(err, user)
				}
			);
		}
	));
// ======================================================================================================== TWITTER login strategy == //

// == GOOGLE login strategy ========================================================================================================= //
	passport.use('google', new GoogleStrategy(config.google,
		function(tokenA, tokenB, profile, done) {					// tokenA = token | tokenB = tokenSecret
			User.findOneAndUpdate(
				socialQuery('google', profile).query,
				socialQuery('google', profile, tokenA, tokenB).data,
				socialQuery('google', profile).options,
				function(err, user){
					done(err, user)
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