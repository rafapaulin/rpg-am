'use strict';
// == Requirements ================================================================= //
	var mongoose = require('mongoose'),
		 express = require('express'),
		  router = express.Router(),
		   Skill = require('../schemas/skillSchema'),
			slug = require('slug');
// ================================================================= Requirements == //

// == Get Item List ================================================================ //
	router.get('/', function(req, res){
		Skill.find(function(err, skills){
			if (err) {
				console.log(err);
			}
			res.json(skills);
		});
		console.log('GET request recieved for "/skills"'); // Debug
	})
// ================================================================ Get item List == //

// == Get Item ===================================================================== //
	.get('/:slug', function(req, res){
		Skill.findOne({'slug': req.params.slug}, function(err, skill){
			if (err) {
				console.log(err);
			}
			res.json(skill);
			console.log('GET request recieved for "/skill/"' + req.params.slug); // Debug
		});
	})
// ==================================================================== Get items == //

// == Update Item ================================================================== //
	.put('/:slug', function(req, res){
		req.body.slug = slug(req.body.name, { // Automatic generate slugs based on name
			replacement: '-',				  // replace spaces with replacement 
			symbols: true,					  // replace unicode symbols or not 
			remove: null,					  // (optional) regex to remove characters 
			lower: true,					  // result in lower case 
			charmap: slug.charmap,			  // replace special characters 
			multicharmap: slug.multicharmap	  // replace multi-characters 
		});

		Skill.findOneAndUpdate({'slug': req.params.slug}, req.body, function(err, doc){
			if(err) {



app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  console.error(err);
  res.status(500).send({status:500, message: 'internal error', type:'internal'}); 
})


				res.status(500).json(err);
				console.log(err);
			} else {
				res.status(202).send(req.body.name + ' updated!');
				console.log(req.body.name + ' updated!'); // Debug
			}
		});
	})
// ================================================================== Update Item == //

// == Create new items ============================================================= //
	.post('/', function(req, res){
		req.body.slug = slug(req.body.name, { // Automatic generate slugs based on name
			replacement: '-',				  // replace spaces with replacement 
			symbols: true,					  // replace unicode symbols or not 
			remove: null,					  // (optional) regex to remove characters 
			lower: true,					  // result in lower case 
			charmap: slug.charmap,			  // replace special characters 
			multicharmap: slug.multicharmap	  // replace multi-characters 
		});

		var newSkill = new Skill(req.body); // set a variable with the form data

		newSkill.save(function(err){
			if(err) {
				console.log(err)
			} else {
				console.log('new skill saved!'); // Debug
			}
		});

		newSkill = null; // clean the data variable after save on DB
	})
// ============================================================= Create new items == //

// == Delete items ================================================================= //
	.delete('/:slug', function(req, res){
		Skill.remove({'slug': req.params.slug}, function(err, doc){
			if(err) {
				console.log(err);
			} else {
				console.log('doc:' + doc);
			}
		});
		console.log('Delete Request recieved for ' + req.params.slug); // Debug
		res.status(200).send('deletado com sucesso');
	});
// ================================================================= Delete items == //

module.exports = router;