'use strict';
// == Requirements ================================================================= //
	var mongoose = require('mongoose'),
		 express = require('express'),
		  colors = require('colors'),
		  logger = require("../services/logger"),
		  router = express.Router(),
			slug = require('slug');
// ================================================================= Requirements == //

// == Global Variables ============================================================= //
	var modelNamer = function(collection){ 
		return require('../schemas/' + collection + 'Schema') 
	};
// == Global Variables ============================================================= //

// == Get Item List ================================================================ //
	router.get('/:collection', function(req, res){
		modelNamer(req.params.collection)
			.find(function(err, docs){
				if (err) {
					logger().debug(err.errors);
				}
				res.json(docs);
			});
		logger().info('GET request recieved for "/' + req.params.collection + '"'); // Debug
	})
// ================================================================ Get item List == //

// == Get Item ===================================================================== //
	.get('/:collection/:slug', function(req, res){
		var refs = [],															// Set up variable
			 pop = '';															// *
		modelNamer(req.params.collection)
			.findOne({'slug': req.params.slug}, function(err, doc){				// Get the requested document to deal with data
				for (var key in doc) {											// Iterate through each document key for referenced documents
					if(key.indexOf('_ref_') > -1) {								// Use property prefix as validator
						refs.push(key);											// Create an array of the properties that are referenced documents
						modelNamer(key.slice(5).toLowerCase());					// Require schemas only for the referenced documents
					}
				};
				pop = refs.join(' ');											// Convert the properties array in a space separated string to use in .populate()
				modelNamer(req.params.collection)
					.findOne({'slug': req.params.slug}, function(err, doc){		// Get the requested document to send to front end
						if (err) {
							logger().debug(err.errors);
						}
						res.json(doc);
					}).populate(pop);											// Populate referenced documents
			});
	})
// ==================================================================== Get items == //

// == Update Item ================================================================== //
	.put('/:collection/:slug', function(req, res){
		req.body.slug = slug(req.body.name, { // Automatic generate slugs based on name
			replacement: '-',				  // replace spaces with replacement 
			symbols: true,					  // replace unicode symbols or not 
			remove: null,					  // (optional) regex to remove characters 
			lower: true,					  // result in lower case 
			charmap: slug.charmap,			  // replace special characters 
			multicharmap: slug.multicharmap	  // replace multi-characters 
		});

		modelNamer(req.params.collection)
			.findOneAndUpdate({'slug': req.params.slug}, req.body, function(err){
				console.log(req.body);
				if(err) {
					res.status(500).json(err);
					console.log(err);
				} else {
					res.status(201).json({message: req.body.name + ' updated!', 'slug': req.body.slug});
					logger().info(req.body.name + ' updated!', req.body);
				}
			});
	})
// ================================================================== Update Item == //

// == Create new items ============================================================= //
	.post('/:collection', function(req, res){
		if(req.body.name) {
			req.body.slug = slug(req.body.name, { // Automatic generate slugs based on name
				replacement: '-',				  // replace spaces with replacement 
				symbols: true,					  // replace unicode symbols or not 
				remove: null,					  // (optional) regex to remove characters 
				lower: true,					  // result in lower case 
				charmap: slug.charmap,			  // replace special characters 
				multicharmap: slug.multicharmap	  // replace multi-characters 
			});
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
	})
// ============================================================= Create new items == //

// == Delete items ================================================================= //
	.delete('/:collection/:slug', function(req, res){
		modelNamer(req.params.collection)
			.remove({'slug': req.params.slug}, function(err, doc){
				if(err) {
					logger().debug(err.errors);
				} else {
					logger().info('Deletado com sucesso');
					res.status(200).json({'message': 'Deletado com sucesso'});
				}
			});
	});
// ================================================================= Delete items == //

module.exports = router;
