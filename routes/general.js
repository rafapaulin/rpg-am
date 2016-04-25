'use strict';
// == Requirements ================================================================= //
	var mongoose = require('mongoose'),
		 express = require('express'),
		  colors = require('colors'),
		  logger = require("../services/logger"),
		  router = express.Router(),
		passport = require('passport'),
			slug = require('slug');
// ================================================================= Requirements == //

// == Routing functions and middlewares ============================================ //
	var modelNamer = function(collection){										// Return require for the schema passed as collection
			return require('../schemas/' + collection + 'Schema') 
		},

		slugger = function(){													// Generate item slug based on the name passed
			req.body.slug = slug(req.body.name, {								// Automatic generate slugs based on name
				replacement: '-',												// replace spaces with replacement 
				symbols: true,													// replace unicode symbols or not 
				remove: null,													// (optional) regex to remove characters 
				lower: true,													// result in lower case 
				charmap: slug.charmap,											// replace special characters 
				multicharmap: slug.multicharmap									// replace multi-characters 
			});
		},

		isLoggedIn = function(req, res, next) {									// Check if user is logged in
			if (req.isAuthenticated()){	
				console.log('Autenticado!!!');
				return next();
			} else {
				console.log('MERDA, não autenticado!!!');
				return next();
			}
		},

		login = function(req, res, next) {										// Log user in
			if(req.params.collection == 'auth') {
				require('../services/passport');								// Require strategies file only if needed

				if(req.params.callback) {
					console.log('calbackeou no ' + req.params.slug);
					return	passport.authenticate(req.params.slug,
								{
									successRedirect: 'http://www.google.com',	// If user logs in, redirect here
									failureRedirect: 'http://www.amazon.com'	// If login fail, redirect here
								}
							)(req, res, next);
				} else {
					console.log('longinzou no ' + req.params.slug);
					var gScope = {};
					if(req.params.slug == 'google'){							// Google strategy demands scope, which is optional to the others
						gScope = {scope: ['profile', 'email']};
					};
					return passport.authenticate(req.params.slug, gScope)(req, res, next);
				}
			}
			return next();														// If it is not a login attempt, ignore this middleware
		};
// =============================================== Global Variables and functions == //

// == Get Item or list ============================================================= //
	router.get('/:collection/:slug?/:callback?', login, isLoggedIn, function(req, res){
	// ------------------------------------------------- Facebook Strategy Login -- // /auth/facebook/callback
		 if(!req.params.slug){												// If optional slug param exists
			modelNamer(req.params.collection)
				.find(function(err, docs){
					if (err) {
						logger().debug(err.errors);							// Error log
					}
					res.json(docs);											// Respond list of items to cient
				});

			logger().info('GET request recieved for "/' + req.params.collection + '"'); // Debug

		} else {															// If optional slug param does not exist
			var refs = [],													// Set up variable
				 pop = '';													// *
			modelNamer(req.params.collection)
				.findOne({'slug': req.params.slug}, function(err, doc){		// Get the requested document to deal with data
					for (var key in doc) {									// Iterate through each document key for referenced documents
						if(key.indexOf('_ref_') > -1) {						// Use property prefix as validator
							refs.push(key);									// Create an array of the properties that are referenced documents
							modelNamer(key.slice(5).toLowerCase());			// Require schemas only for the referenced documents
						}
					};
					pop = refs.join(' ');									// Convert the properties array in a space separated string to use in .populate()
					modelNamer(req.params.collection)
						.findOne({'slug': req.params.slug}, 
							function(err, doc){								// Get the requested document to send to front end
								if (err) {
									logger().debug(err.errors);
								}
								res.json(doc);
							}).populate(pop);								// Populate referenced documents
				});

			logger().info('GET request recieved for "/' + req.params.collection + '/'+ req.params.slug + '"');
		}
	})
// ============================================================= Get Item or list == //

// == Update Item ================================================================== //
	.put('/:collection/:slug', function(req, res){
		if(req.body.name) {slugger()};
		modelNamer(req.params.collection)						// Load Users model
			.findOneAndUpdate(
				{slug: req.params.slug},						// Query
				req.body,										// New Data
				function(err){									// If error, throw it to client
					if(err) {
						res.status(500).json(err);
					} else {									// If success, save and notify client
						res.status(201).json({message: req.body.name + ' updated! ', slug: req.body.slug});
						logger().info(req.body.name + ' updated! ' + req.body);
					}
				});
	})
// ================================================================== Update Item == //

// == Create new items or user login =============================================== //
	.post('/:collection/:slug?', function(req, res, next){
		if(req.params.collection == 'auth'){						// Check if the POST request is login attempt
			require('../services/passport');						// Load passport
			require('../schemas/usersSchema');						// Load Users model
	// -- Local Strategy Login ---------------------------------------------------- //
			if(req.params.slug == 'local'){
				passport.authenticate('local', 						// Autenticate user using local strategy
					function(err, user, info){
						if (err) return next(err);
						if (user) {									// Check for user
							if (err) return next(err);
							req.login(user, function (err) {		// Stabilishes Session for the user
								if (err) return next(err);
							})
							res.json(user);
						} else {
							res.status(500).json(info);				// Send error object to front end
						}
					})(req, res, next);
			}
	// ---------------------------------------------------- Local Strategy Login -- //

		} else {												// If the POST request is new info
			if(req.body.name) {
				slugger();
				if(req.params.collection == 'users'){			// If it is a new user, convert the field 'name' to 'username'
					req.body.userName = req.body.name;
				}
			};
			new modelNamer(req.params.collection)(req.body)		// Load the correct model and pass the Data to save function
				.save(function(err){
					if(err) {									// If error, throw it to client
						logger().debug(err);
						res.status(500).json(err.errors);

					} else {									// If success, save and notify client
						res.status(201).json({
							message: req.body.name + ' successfully created'
						});
						logger().info(req.body.name + '  saved!', req.body);
					}
				});
		}
	})
// ============================================== Create new items or user login == //


// == Delete items ================================================================= //
	.delete('/:collection/:slug', function(req, res){
		modelNamer(req.params.collection)
			.remove({slug: req.params.slug}, function(err, doc){
				if(err) {
					logger().debug(err.errors);
				} else {
					logger().info(req.params.slug + 'Deletado com sucesso');
					res.status(200).json({
						message: 'Deletado com sucesso'
					});
				}
			});
	});
// ================================================================= Delete items == //





module.exports = router;
