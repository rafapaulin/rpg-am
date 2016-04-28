'use strict';
// == Internal functions ==================================================================================== //
var	modelNamer = function(collection){							// Return require for the schema passed as collection
		return require('../schemas/' + collection + 'Schema')
	},

	slugger = function(req, reference){
		require('slug');										// Require slug plugin only if needed
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

			getList: function(req, res, next){									// GET request for list of items
				if(!req.params.slug){											// If optional slug param not exists
					modelNamer(req.params.collection).find(function(err, docs){
						if (err) {
							logger().debug(err.errors);							// Error log
							res.status(500).json(err.errors);					// Send error to client
						}
						res.json(docs);											// Send list of items to cient
					});
				} else {
					return next();												// If not list of item request, ignore
				}
			},

			getSingle: function(req, res){										// GET request for single item
				var refs = [],													// Set up variable with array of references to be populated
					 pop = '';													// Set up variable that will recieve refs as space-separated string
				modelNamer(req.params.collection).findOne(
					{'slug': req.params.slug},									// Query parameters
					function(err, doc){											// Get the requested document to deal with data
						if(doc.createdBy){										// Check for createdBy key
							refs.push('createdBy');								// Push creatdBy key to refs
							require('../schemas/usersSchema');					// Call users Schema
						};
						for (var key in doc) {									// Iterate through each document key for referenced documents
							if(key.indexOf('_ref_') > -1) {						// Use property prefix as validator
								refs.push(key);									// Create an array of the properties that are referenced documents
								modelNamer(key.slice(5).toLowerCase());			// Require schemas only for the referenced documents
							}
						};
						pop = refs.join(' ');									// Convert the properties array in a space-separated string to use in .populate()
						modelNamer(req.params.collection).findOne(				// Query parameters
							{'slug': req.params.slug}, 
							function(err, doc){									// Get the requested document to send to front end
								if (err) {
									logger().debug(err.errors);					// Log errors
									res.status(500).json(err.errors);			// Send error to client
								}
								res.json(doc);
							}
						).populate(pop);										// Populate referenced documents
					}
				);
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

			createContent: function(req, res) {								// Create new item
				req.body.createdOn = new Date;								// Set the creation date
				req.body.createdBy = req.user._id;							// Set the author

				if(req.body.name) slugger(req, req.body.name);

				new modelNamer(req.params.collection)(req.body).save(		// Load the correct model and pass the Data to save function
					function(err){
						if(err) {											// If error, throw it to client
							logger().debug(err);
							res.status(500).json(err.errors);				// Send error to client
						} else {											// If success, save and notify client
							res.status(201).json({
								message: req.body.name + ' successfully created'
							});
						}
					}
				);
			},

			deleteContent: function(req, res){								// Delete items
				modelNamer(req.params.collection).remove(
					{slug: req.params.slug},								// Query by item slug
					function(err, doc){
						if(err) {
							logger().debug(err.errors);						// Log error
							res.status(500).json(err.errors);				// Send error to client
						} else {
							res.status(200).json({							// Send success msg to client
								message: 'Deletado com sucesso'
							});
						}
					}
				);
			},

			updateContent: function(req, res){								// Update existing item
				if(req.body.name) slugger(req, req.body.name);
				else if(req.body.userName) slugger(req.body.userName);

				req.body.lastUpdate = new Date;								// Set up the update date

				modelNamer(req.params.collection).findOneAndUpdate(			// Load correct model
					{slug: req.params.slug},								// Query by item slug
					{$set: req.body},										// New Data
					function(err){											// If error, throw it to client
						if(err) {
							res.status(500).json(err);						// Send error to client
						} else {
							res.status(201).json({							// Send success msg to client
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