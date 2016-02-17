'use strict';
// == Requirements ================================================================= //
	var bodyParser = require('body-parser'),
		  mongoose = require('mongoose').connect('mongodb://127.0.0.1/test'),
		   express = require('express');
		 
// ================================================================= Requirements == //

// == Global Variables ============================================================= //
	var app = express(),
		 db = mongoose.connection;

var logger = require("./services/logger");

logger.error("Overriding 'Express' logger", {meta:'someMeta', desgraca: 'pouca é brinquedo'});
logger.warn("Overriding 'Express' logger", {meta:'someMeta', desgraca: 'pouca é brinquedo'});
logger.info("Overriding 'Express' logger", {meta:'someMeta', desgraca: 'pouca é brinquedo'});
logger.verbose("Overriding 'Express' logger", {meta:'someMeta', desgraca: 'pouca é brinquedo'});
logger.debug("Overriding 'Express' logger", {meta:'someMeta', desgraca: 'pouca é brinquedo'});
logger.silly("Overriding 'Express' logger", {meta:'someMeta', desgraca: 'pouca é brinquedo'});

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
		console.log('listening on port 4000')
	});
// ================================================================= Server Start == //