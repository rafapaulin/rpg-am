'use strict';
// == Requirements ================================================================= //
	var   express = require('express'),
			 body = require('body-parser'),
		 mongoose = require('mongoose').connect('mongodb://192.168.1.66/test');
// ================================================================= Requirements == //

// == Global Variables ============================================================= //
	var app = express(),
		 db = mongoose.connection;
// ============================================================= Global Variables == //

// == DB Connection check ========================================================== //
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {console.log('Yay! Mongo!')});
// ========================================================== DB Connection check == //

skills = require('./routes/skills');
app.use('/skills', skills)


var skillShchema = require('./schemas/skillSchema');

var Skill = mongoose.model('Skill', skillShchema);

var acrobatics = new Skill(
		{
			name: 'Stealth',
			ability: 'Dexterity',
			prof: true,
			desc: 'Bla! Bla bla',
		}
	);

acrobatics.save(function (err, acrobatics) {
  if (err) {
  	return console.error(err);
  } else {
  	console.log('saving of ' + acrobatics.name + ' on the database was successfull!')
  }
});


console.log();

// == Server Start ================================================================= //
	app.listen(4000, function(){
		console.log('listening on port 4000')
	});
// ================================================================= Server Start == //