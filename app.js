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

logger().debug('mensagem custom', {desgraca: {msg:'pouca é brinquedo', pqp: 'pqp', porra: {'1': 'caralho', '2': {'bleh': 'vai tomar no cu', 'bleh2': 'vai tomar no cu'}}}});

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
		console.log('listening on port 4000');
	});
// ================================================================= Server Start == //