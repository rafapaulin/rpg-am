'use strict';
// == Requirements ================================================================= //
	var bodyParser = require('body-parser'),
		  mongoose = require('mongoose').connect('mongodb://127.0.0.1/test'),
		   express = require('express');
		 
// ================================================================= Requirements == //

// == Global Variables ============================================================= //
	var app = express(),
		 db = mongoose.connection,
	 logger = require("./services/logger");
// ============================================================= Global Variables == //

// == Middlewares ================================================================== //
	app.use(bodyParser.json());
// ================================================================== Middlewares == //

// == DB Connection check ========================================================== //
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {console.log('Yay! Mongo!')});
// ========================================================== DB Connection check == //

// == Routes ======================================================================= //
	var skillsR = require('./routes/skills');

	
	app.use(express.static('public'));
	app.use('/skills', skillsR);	
// ======================================================================= Routes == //



// == Server Start ================================================================= //
	app.listen(4000, function(){
		logger().info('Listening on port %s', 4000);
	});
// ================================================================= Server Start == //