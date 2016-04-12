'use strict';
// == Requirements ================================================================= //
	var bodyParser = require('body-parser'),
		  mongoose = require('mongoose').connect('mongodb://127.0.0.1/test'),
			 flash = require('connect-flash'),
		   express = require('express'),
	  cookieParser = require('cookie-parser'),
		   session = require('express-session'),
		  passport = require('passport'),
			logger = require("./services/logger"),
		   general = require('./routes/general');
		 
// ================================================================= Requirements == //

// == Global Variables ============================================================= //
	var app = express(),
		 db = mongoose.connection;
// ============================================================= Global Variables == //

// == Middlewares ================================================================== //
	app.use(express.static('public'));
	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(session(
		{
			secret: 'chalah, head chalah, não importa o que aconteça....',
			resave: false,
			saveUninitialized: true
			cookie: {
				secure: false,

			}
		}
	));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());
	app.use('/', general);
// ================================================================== Middlewares == //

// == DB Connection check ========================================================== //
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {console.log('Yay! Mongo!')});
// ========================================================== DB Connection check == //

// == Server Start ================================================================= //
	app.listen(4000, function(){
		logger().info('Listening on port %s', 4000);
	});
// ================================================================= Server Start == //