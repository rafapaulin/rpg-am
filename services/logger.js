'use strict';

// == Requirements ================================================================= //
	var winston = require('winston'),
		 config = require('winston/lib/winston/config'),
		 colors = require('colors'),
		 mkdirp = require('mkdirp'),
			 fs = require('fs'),
// ================================================================= Requirements == //

// == Global Variables ============================================================= //
	weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
	  month = ['January','February','March','April','May','June','July','August','September','October','November','December'],
	custom	= { 
		levels: {error: 	0, one:		   1, two:		   2, three:	  3, four:		 4, debug:		5}, 
		colors: {error: ['red', 'bold'], one: ['yellow', 'bold'], two: ['magenta', 'bold'], three: ['cyan', 'bold'], four: ['green', 'bold'], debug: ['blue', 'bold']}
	 };

// ============================================================= Global Variables == //

winston.emitErrs = true;


var logger = function(){

	var dateNow = new Date(),										// get the date/time ATM of the logger call
		   year = dateNow.getFullYear(),							// take isolated year
	   monthNum = dateNow.getMonth(),								// take isolated month name
	 weekdayNum = dateNow.getDay(),									// take isolated weekday name
	 		day = ('0' + dateNow.getDate()).slice(-2),				// take isolated day
		   time = ('0' + dateNow.getHours()).slice(-2) + ':' +		// take isolated hour
				  ('0' + dateNow.getMinutes()).slice(-2) + ':' +	// take isolated minutes
				  ('0' + dateNow.getSeconds()).slice(-2);			// take isolated seconds

	fs.stat('./logs/' + year + '/' + month[monthNum], function(err, status){	// Check status of a specific logs folder
		if(err && err.code == 'ENOENT') {										// Check if the specific logs folder already exists
			mkdirp('./logs/' + year + '/' + month[monthNum], function (err) {	// If specific folder does not exist, create it
				if (err) {
					console.error(err);											// Console.log any error in the mkdir process
				}
			});
		}
	});

	return new winston.Logger({
		prettyPrint: true,
		transports: [
		// :: Log to file constructor :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //
			new winston.transports.File({
				level: 'debug',
				filename: './logs/' + year + '/' + month[monthNum] + '/' + day + '.log', // Create a log file under the path [example] './logs/1986/October' with the day as the file name.
				handleExceptions: true,
				humanReadableUnhandledException: true,
				exitOnError: false,
				json: true,
				colorize: true,
				prettyPrint: true
			}),
		// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Log to file constructor :: //

		// :: Log to console constructor ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //
			new winston.transports.Console({
				level: 'debug',
				handleExceptions: true,
				humanReadableUnhandledException: true,
				exitOnError: false,
				json: false,
				colorize: true,
				prettyPrint: true,
				timestamp: function(){
					return year + ' ' + month[monthNum] + ' ' + day + ' '  + time
				},
				formatter: function(options) {
	 				return	config.colorize(options.level, '    ****** ' + options.level.toUpperCase() + ' ******') +
	 						config.colorize(options.level, '\n    * ') + options.timestamp().grey.bold +
							(undefined !== options.message ? config.colorize(options.level, '\n    * ')  + options.message.white.bold : '') +
							config.colorize(options.level, '\n    * ') + 
							




	 		+ ' stringTest'.blue
	 		+ ' stringTest'.blue.bold
	 		+ ' stringTest'.green
	 		+ ' stringTest'.green.bold
	 		+ ' stringTest'.cyan
	 		+ ' stringTest'.cyan.bold
	 		+ ' stringTest'.magenta
	 		+ ' stringTest'.magenta.bold
	 		+ ' stringTest'.yellow
	 		+ ' stringTest'.yellow.bold
	 		+ ' stringTest'.red
	 		+ ' stringTest'.red.bold
	 		+ ' stringTest'.white
	 		+ ' stringTest'.white.bold
	 		+ ' stringTest'.grey

	 		+ config.colorize(options.level, '\n    ****** ') + config.colorize(options.level, options.level.toUpperCase()) + config.colorize(options.level, ' ******\n')
	 	// + (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
			})
		// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Log to console constructor :: //
		],
		levels: custom.levels,
		colors: custom.colors,
		exitOnError: false
	});

};

module.exports = logger;
