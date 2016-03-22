'use strict';
// == Requirements ================================================================= //
	var mongoose = require('mongoose'),
		 express = require('express'),
		  colors = require('colors'),
		  logger = require("../services/logger"),
		  router = express.Router(),
		passport = require('passport'),
			slug = require('slug');

	require('../services/passport');
// ================================================================= Requirements == //

// == Global Variables and functions =============================================== //
	var modelNamer = function(collection){ 
		return require('../schemas/' + collection + 'Schema') 
	},
		slugger = function(name){					// Automatic generate slugs based on name
			req.body.slug = slug(name, {
				replacement: '-',					// replace spaces with replacement 
				symbols: true,						// replace unicode symbols or not 
				remove: null,						// (optional) regex to remove characters 
				lower: true,						// result in lower case 
				charmap: slug.charmap,				// replace special characters 
				multicharmap: slug.multicharmap		// replace multi-characters 
			});
		};
// =============================================== Global Variables and functions == //

// == Get Item or list ============================================================= //
	router.get('/:collection/:slug?', function(req, res){
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

			logger().info('GET request recieved for "/' + req.params.collection + '/' + req.params.slug + '"'); // Debug
		}
	})
// ============================================================= Get Item or list == //

// == Update Item ================================================================== //
	.put('/:collection/:slug', function(req, res){
		slugger(req.body.name);							// Automatic generate slugs based on name
		modelNamer(req.params.collection)
			.findOneAndUpdate({'slug': req.params.slug}, req.body, function(err){
				if(err) {
					res.status(500).json(err);
				} else {
					res.status(201).json({message: req.body.name + ' updated!', 'slug': req.body.slug});
					logger().info(req.body.name + ' updated!', req.body);
				}
			});
	})
// ================================================================== Update Item == //

// == Create new items or user login ============================================== //
	.post('/:collection', function(req, res, next){

		if(req.params.collection == 'login'){				// If the POST request is login attempt
			require('../schemas/usersSchema');				// Load Users model
			passport.authenticate('login', 					// Autenticate user using local strategy
				function(err, user, info){
					if (err) return next(err);
					if (user) {
						if (err) return next(err);
						res.json(user);

			            req.login(user, function (err) {
			                if (err) throw err;
			            })


					} else {
						res.status(400).json(info);
					}
					console.log('req? ' + req.session.passport.user);
				})(req, res, next);

		} else {											// If the POST request is new info
			if(req.body.name) {
				slugger(req.body.name);						// Automatic generate slugs based on name
			};
			new modelNamer(req.params.collection)(req.body)
				.save(function(err){
					if(err) {
						logger().debug(err);
						res.status(500).json(err.errors);

					} else {
						res.status(201).json({'message': req.body.name + ' successfully created'});
						logger().info(req.body.name + '  saved!', req.body);
					}
				});
		}
	})
// ============================================== Create new items or user login == //


// == Delete items ================================================================= //
	.delete('/:collection/:slug', function(req, res){
		modelNamer(req.params.collection)
			.remove({'slug': req.params.slug}, function(err, doc){
				if(err) {
					logger().debug(err.errors);
				} else {
					logger().info('Deletado com sucesso');
					res.status(200).json({message: 'Deletado com sucesso'});
				}
			});
	});
// ================================================================= Delete items == //





module.exports = router;
