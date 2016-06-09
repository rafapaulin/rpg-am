'use strict';
// == Internal functions ==================================================================================== //
var	modelNamer = function(collection){							// Return require for the schema passed as collection
		return require('../schemas/' + collection + 'Schema')
	},

	slugger = function(req, reference){
		var slug = require('slug');								// Require slug plugin only if needed
		req.body.slug = slug(reference, {						// Automatic generate slugs based on name
			replacement: '-',									// replace spaces with replacement 
			symbols: true,										// replace unicode symbols or not 
			remove: null,										// (optional) regex to remove characters 
			lower: true,										// result in lower case 
			charmap: slug.charmap,								// replace special characters 
			multicharmap: slug.multicharmap						// replace multi-characters 
		});
	},
// ==================================================================================== Internal functions == //

	mid = {
		routing: {
			isLoggedIn: function(req, res, next) {								// Check if user is logged in
				if (req.isAuthenticated()){
					console.log('Autenticado!!!');
					return next();
				} else {
					console.log('MERDA, não autenticado!!!');
					res.status(401).json({
						message: 'Você ainda não está logado.\n' +
								 'Somente usuários registrados podem visualizar ou criar conteúdo' +
								 'Por favor, efetue seu login ou cadastre-se gratuitamente!'
					});
				}
			},

			login: function(req, res, next) {									// Log user in (all strategies) or create new user (social networks strategies)
				if(req.params.collection == 'auth') {
					var passport = require('passport');							// Require passport plugin only if needed
					require('../services/passport');							// Require strategies file only if needed

					if(req.params.callback) {
						return	passport.authenticate(req.params.slug,
									{
										successRedirect: '/#/dashboard',		// If user logs in, redirect here
										failureRedirect: '/#/users/new'			// If login fail, redirect here
									})(req, res, next);
					} else {
						var scope;
						if(req.params.slug == 'google'){						// If google strategy, define profile scope
							scope = {scope: ['profile', 'email']};
						} else if(req.params.slug == 'local') {					// If local strategy, set scope as function
							scope = function(err, user, info){
								if (err) return next(err);
								if (user) {										// Check for user
									if (err) return next(err);
									req.login(user, function (err) {			// Stabilishes Session for the user
										if (err) return next(err);
									})
									res.json(user);
								} else {
									res.status(500).json(info);					// Send error object to front end
								}
							}
						};
						return passport.authenticate(req.params.slug, scope)(req, res, next);
					}
				}
				return next();													// If it is not a login attempt, ignore this middleware
			},

			logOut: function(req, res){
				req.logout();
				res.redirect('/');
			},

			getItems: function(req, res, next){									// GET request for list of items
				if(!req.params.slug){											// If optional slug param not exists (GET for list)
					modelNamer(req.params.collection).find(function(err, docs){
						if (err) {
							logger().debug(err.errors);							// Error log
							res.status(500).json(err.errors);					// Send error to client
						} else {
							console.log('GET for ' + req.params.collection + ' recieved!');
							res.json(docs);										// Send list of items to client
						}
					});
				} else {														// GET for single item
					modelNamer(req.params.collection).findOne(
						{'slug': req.params.slug},								// Query parameters
						function(err, doc){										// Get the requested document to deal with data
							if (err) {
								logger().debug(err.errors);						// Log errors
								res.status(500).json(err.errors);				// Send error to client
							} else {
								console.log('GET for ' + req.params.slug + ' recieved!');
								res.json(doc);									// Send item to client
							}
						}
					);
				}
			},

			newUser: function(req, res, next){									// Create new user (local strategy)
				if(req.params.collection == 'users'){
					if(req.body.userName) slugger(req, req.body.userName);		// Create the slug based on userName
					req.body.memberSince = new Date;							// Set the creation date

					new modelNamer(req.params.collection)(req.body).save(function(err){
						if(err) {
							logger().debug(err);								// Log error
							res.status(500).json(err.errors);					// Send error to client

						} else {
							res.status(201).json({								// Notify client on success
								message: 'account ' + req.body.userName +
										 ' successfully created. Please log in.'
							});
						}
					});
				} else {
					return next();
				}
			},

			createContent: function(req, res) {									// Create new item
				req.body.createdOn = new Date;									// Set the creation date
				req.body.createdBy = req.user._id;								// Set the author

				if(req.body.name) slugger(req, req.body.name);

				var newData = new modelNamer(req.params.collection)(req.body);	// Load the correct model and pass the Data to variable
				newData.save(													// Save newData to DB
					function(err){
						if(err) {												// If error, throw it to client
							console.log(err);
							res.status(500).json(err.errors);					// Send error to client
						} else {												// If success, save and notify client
							var $addToSet = {};

							$addToSet['createdContent.' + req.params.collection] = newData._id;

							require('../schemas/usersSchema').findByIdAndUpdate(// Call users Schema
								req.user._id,									// Query
								{
									$addToSet									// Add a reference to the created object on the user profile
								},
								function(err, doc) {
									if(err) {
										console.log(err);
									} else {
										console.log('inseriu no array do user.');
										res.status(201).json({
											message: req.body.name + ' successfully created'
										});
									}
								}
							);
							console.log('chegou na resposta do save.')
						}
					}
				);
			},

			deleteContent: function(req, res){									// Delete items
				console.log('collection: '+ req.params.collection);
				console.log('slug: '+ req.params.slug);

				modelNamer(req.params.collection).findOne(
					{slug: req.params.slug},
					function(err, deletedItem){
						
						console.log('deletedItem: ' + deletedItem);
						var deletedItemId = deletedItem._id,
							$pull = {};

						$pull['createdContent.' + req.params.collection] = deletedItemId;

						console.log('deletedItemId: ' + deletedItemId);

						if(err) {
							logger().debug(err.errors);							// Log error
							res.status(500).json(err.errors);					// Send error to client
						} else {
							modelNamer(req.params.collection).remove(
								{slug: req.params.slug},									// Query by item slug
								function(err){
									if(err) {
										logger().debug(err.errors);							// Log error
										res.status(500).json(err.errors);					// Send error to client
									} else {
										require('../schemas/usersSchema').findByIdAndUpdate(
											req.user._id,
											{
												$pull
											},
											{new: true},
											function(err, user){
												if(err) {
													console.log(err);
												} else {
													console.log('funcionou o delete');
												}
											}
										);
										res.status(200).json({								// Send success msg to client
											message: 'Deletado com sucesso'
										});
									}
								}
							);
						}
					}
				);
			},

			updateContent: function(req, res){									// Update existing item
				if(req.body.name) slugger(req, req.body.name);
				else if(req.body.userName) slugger(req.body.userName);

				req.body.lastUpdate = new Date;									// Set up the update date

				modelNamer(req.params.collection).findOneAndUpdate(				// Load correct model
					{slug: req.params.slug},									// Query by item slug
					{$set: req.body},											// New Data
					function(err){												// If error, throw it to client
						if(err) {
							res.status(500).json(err);							// Send error to client
						} else {
							res.status(201).json({								// Send success msg to client
								message: req.body.name + ' updated! ', 
								slug: req.body.slug
							});
						}
					}
				);
			}
		}
	};

module.exports = mid;