'use strict';
// == Requirements ================================================================= //
	var mongoose = require('mongoose'),
		 express = require('express'),
		  colors = require('colors'),
		  logger = require("../services/logger"),
		  router = express.Router(),
		passport = require('passport'),
			slug = require('slug'),
// ================================================================= Requirements == //

// == Routing functions and middlewares ============================================ //
		modelNamer = function(collection){										// Return require for the schema passed as collection
			return require('../schemas/' + collection + 'Schema') 
		},

		isLoggedIn = function(req, res, next) {									// Check if user is logged in
			if (req.isAuthenticated()){
				console.log('Autenticado!!!');
				return next();
			} else {
				console.log('MERDA, não autenticado!!!');
				res.status(401)
					.json({
						message: 'Você ainda não está logado.\n' + 
								 'Por favor, efetue seu login ou cadastre-se gratuitamente!'
					});
			}
		},

		login = function(req, res, next) {								// Log user in (social networks)
			if(req.params.collection == 'auth') {
				require('../services/passport');						// Require strategies file only if needed

				if(req.params.callback) {
					return	passport.authenticate(req.params.slug,
								{
									successRedirect: '/#/dashboard',	// If user logs in, redirect here
									failureRedirect: '/#/users/new'		// If login fail, redirect here
								}
							)(req, res, next);
				} else {
					var gScope = {};
					if(req.params.slug == 'google'){					// Google strategy demands scope, which is optional to the others
						gScope = {scope: ['profile', 'email']};
					};
					return passport.authenticate(req.params.slug, gScope)(req, res, next);
				}
			}
			return next();												// If it is not a login attempt, ignore this middleware
		};
// =============================================== Global Variables and functions == //

// == Get Item or list ============================================================= //
	router.get('/dashboard', isLoggedIn, function(req, res){
		res.status(200).json(req.user);
	})
	.get('/:collection/:slug?/:callback?', login, function(req, res){
	// ------------------------------------------------- Facebook Strategy Login -- //
		 if(!req.params.slug){												// If optional slug param exists
			modelNamer(req.params.collection)
				.find(function(err, docs){
					if (err) {
						logger().debug(err.errors);							// Error log
						res.status(500).json(err.errors);					// Send error to client
					}
					res.json(docs);											// Respond list of items to cient
				});

			logger().info('GET request recieved for "/' + req.params.collection + '"'); // Debug

		} else {															// If optional slug param does not exist
			var refs = [],													// Set up variable
				 pop = '';													// *
			modelNamer(req.params.collection)
				.findOne({'slug': req.params.slug}, function(err, doc){		// Get the requested document to deal with data
					if(doc.createdBy){
						refs.push('createdBy');
						require('../schemas/usersSchema');
					};
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
									logger().debug(err.errors);				// Log errors
									res.status(500).json(err.errors);		// Send error to client
								}
								res.json(doc);
							}).populate(pop);								// Populate referenced documents
				});
		}
	})
// ============================================================= Get Item or list == //

// == Update Item ================================================================== //
	.put('/:collection/:slug', function(req, res){
		if(req.body.name) {slugger(req.body.slug, req.body.name)};
		modelNamer(req.params.collection)						// Load Users model
			.findOneAndUpdate(
				{slug: req.params.slug},						// Query
				req.body,										// New Data
				function(err){									// If error, throw it to client
					if(err) {
						res.status(500).json(err);				// Send error to client
					} else {									// If success, save and notify client
						res.status(201).json({message: req.body.name + ' updated! ', slug: req.body.slug});
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

		} else if(req.user) {									// If the POST request is new info and the user is loged in
			req.body.createdOn = new Date;						// Set the creation date
			req.body.createdBy = req.user._id;					// Set the author

			if(req.body.name) {
				req.body.slug = slug(req.body.name, {			// Automatic generate slugs based on name
					replacement: '-',							// replace spaces with replacement 
					symbols: true,								// replace unicode symbols or not 
					remove: null,								// (optional) regex to remove characters 
					lower: true,								// result in lower case 
					charmap: slug.charmap,						// replace special characters 
					multicharmap: slug.multicharmap				// replace multi-characters 
				});

				if(req.params.collection == 'users'){			// If it is a new user, convert the field 'name' to 'username'
					req.body.userName = req.body.name;
				}
			};

			new modelNamer(req.params.collection)(req.body)		// Load the correct model and pass the Data to save function
				.save(function(err){
					if(err) {									// If error, throw it to client
						logger().debug(err);
						res.status(500).json(err.errors);		// Send error to client

					} else {									// If success, save and notify client
						res.status(201).json({
							message: req.body.name + ' successfully created'
						});
					}
				});
		} else {
			console.log('MERDA, não autenticado!!! não da pra criar!');
			res.status(401)
				.json({
					message: 'Você ainda não está logado.\n' + 
							 'Por favor, efetue seu login ou cadastre-se gratuitamente!'
				});
		}
	})
// ============================================== Create new items or user login == //

// == Delete items ================================================================= //
	.delete('/:collection/:slug', function(req, res){
		modelNamer(req.params.collection)							// Load correct model
			.remove({slug: req.params.slug}, function(err, doc){	// Query by item slug
				if(err) {
					logger().debug(err.errors);						// Log error
					res.status(500).json(err.errors);				// Send error to client
				} else {
					res.status(200).json({							// Send success msg to client
						message: 'Deletado com sucesso'
					});
				}
			});
	});
// ================================================================= Delete items == //

module.exports = router;