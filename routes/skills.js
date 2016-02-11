'use strict';
// == Requirements ================================================================= //
	var mongoose = require('mongoose'),
		 express = require('express'),
		  router = express.Router(),
		   Skill = require('../schemas/skillSchema'),
			slug = require('slug');
// ================================================================= Requirements == //

router.get('/', function(req, res){
	Skill.find(function(err, skills){
		if (err) {
			console.log(err);
		}
		res.json(skills);
	});
	console.log('GET request recieved for "/skills"'); // Debub
})
.post('/', function(req, res){
	req.body.slug = slug(req.body.name, {
		replacement: '-',      // replace spaces with replacement 
		symbols: true,         // replace unicode symbols or not 
		remove: null,          // (optional) regex to remove characters 
		lower: true,           // result in lower case 
		charmap: slug.charmap, // replace special characters 
		multicharmap: slug.multicharmap // replace multi-characters 
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
.delete('/:id', function(req, res){
	console.log('Delete Request recieved for'); // Debug
});

module.exports = router;