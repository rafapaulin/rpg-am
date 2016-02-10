'use strict';
// == Requirements ================================================================= //
	var mongoose = require('mongoose'),
		 express = require('express'),
		  router = express.Router(),
		   Skill = require('../schemas/skillSchema');
// ================================================================= Requirements == //

router.get('/', function(req, res){
	Skill.find(function(err, skills){
		if (err) {
			console.log(err);
		}
		res.json(skills);
	});
	console.log('GET request recieved for "/skills"');
})
.post('/', function(req, res){
	var newSkill = new Skill(req.body); // set a variable the form data

	newSkill.save(function(err){
		if(err) {
			console.log(err)
		} else {
			console.log('new skill saved!')
		}
	});

	newSkill = null; // clean the data variable after save on DB
});

module.exports = router;