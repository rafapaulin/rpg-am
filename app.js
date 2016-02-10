'use strict';
// == Requirements ================================================================= //
	var bodyParser = require('body-parser'),
		  mongoose = require('mongoose').connect('mongodb://10.20.20.95/test'),
		   express = require('express');
		 
// ================================================================= Requirements == //

// == Global Variables ============================================================= //
	var app = express(),
		 db = mongoose.connection;
// ============================================================= Global Variables == //

app.use(bodyParser.json());

// == DB Connection check ========================================================== //
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {console.log('Yay! Mongo!')});
// ========================================================== DB Connection check == //

// == Routes ======================================================================= //
	var skillsR = require('./routes/skills'),
		 featsR = require('./routes/feats'),
		 skillSchema = require('./schemas/skillSchema')

	app.use(express.static('public'));
	app.use('/skills', skillsR);	
	app.use('/feats', featsR);
// ======================================================================= Routes == //


// == Server Start ================================================================= //
	app.listen(4000, function(){
		console.log('listening on port 4000')
	});
// ================================================================= Server Start == //
