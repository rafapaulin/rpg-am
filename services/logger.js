'use strict';

// == Requirements =================================================================================== //
	var winston = require('winston'),
		 config = require('winston/lib/winston/config'),
		 colors = require('colors'),
		 mkdirp = require('mkdirp'),
			 fs = require('fs'),
// =================================================================================== Requirements == //

// == Global Variables =============================================================================== //
	weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
	  month = ['January','February','March','April','May','June','July','August','September','October','November','December'],
	custom	= { 
		levels: {error: 	0, warning:		   1, info:		   2, user:	  3, debug:		4}, 
		colors: {error: 'red', warning: 'yellow', info: 'magenta', user: 'cyan', debug: ['blue', 'bold']}
	 };
// =============================================================================== Global Variables == //

winston.emitErrs = true;


var logger = function(){
// :: Date Builder :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //
	var dateNow = new Date(),										// get the date/time ATM of the logger call
		   year = dateNow.getFullYear(),							// take isolated year
	   monthNum = dateNow.getMonth(),								// take isolated month name
	 weekdayNum = dateNow.getDay(),									// take isolated weekday name
	 		day = ('0' + dateNow.getDate()).slice(-2),				// take isolated day
		   time = ('0' + dateNow.getHours()).slice(-2) + ':' +		// take isolated hour
				  ('0' + dateNow.getMinutes()).slice(-2) + ':' +	// take isolated minutes
				  ('0' + dateNow.getSeconds()).slice(-2);			// take isolated seconds
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Date Builder :: //

// :: Log folder creator ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //
	fs.stat('./logs/' + year + '/' + month[monthNum], function(err, status){	// Check status of a specific logs folder
		if(err && err.code == 'ENOENT') {										// Check if the specific logs folder already exists
			mkdirp('./logs/' + year + '/' + month[monthNum], function (err) {	// If specific folder does not exist, create it
				if (err) {
					console.error(err);											// Console.log any error in the mkdir process
				}
			});
		}
	});
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Log folder creator :: //
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
				prettyPrint: false,
				timestamp: function(){
					return year + ' ' + month[monthNum] + ' ' + day + ' '  + time
				},
				formatter: function(options) {
			// == Object Crawler ==================================================================== //
					var objCrawl = function(obj, level){
						var string = '',
							 space = '',
							 index = 1;

						level = level == undefined || null ? 0 : level;

						for (var i = 0; i <= level; i++ ) {
							space += '  ';
						}

						for (var key in obj) {
							if(typeof obj[key] == 'object' && obj[key] != null) {
								level++;
								string += config.colorize(options.level, '    * ');
								string += space.grey;
								string += key.green + 'o.k.: '.red + Object.keys(obj).length.toString().red + ': {\n' +
										  objCrawl(obj[key], level) +
										  config.colorize(options.level, '    * ') + space.grey + '}';
								level--;
							} else {
								string += config.colorize(options.level, '    * ');
								string += space.grey;
								string += key.green + ': ' + (typeof obj[key] == 'function' ? '*function*' : (obj[key] == undefined || null ? 'undefined' : '"' + obj[key] + '"')).white.bold + 'i: '.red +index.toString().red;
							}
							string += (index++ == Object.keys(obj).length ? '' : ',') + '\n';
						}
						return string;
					};
			// ==================================================================== Object Crawler == //

	 				return	config.colorize(options.level, '    ************************ ' + options.level.toUpperCase() + ' ************************') +
	 						'\n' + config.colorize(options.level, '    * ') +																						// Skip line
	 						config.colorize(options.level, '\n    * ') + options.timestamp().grey.bold +															// Print date
	 						'\n' + config.colorize(options.level, '    * ') +																						// Skip line
							(options.message !== '' ? config.colorize(options.level, '\n    * ') + options.message.white.bold : '') +								// print message
							(options.message !== '' ? config.colorize(options.level, '\n    * ') : '') +															// Skip line if there is options.message
							(objCrawl(options.meta) !== '' ? config.colorize(options.level, '\n    * ') : '') +														// Close "}" and skip line if there is options.meta
							(objCrawl(options.meta, 0) !== '' ? '{' : '') +																							// Open "{" if there is options.meta
							'\n' + objCrawl(options.meta) +																											// Print options.meta
							(objCrawl(options.meta) !== '' ? config.colorize(options.level, '    * ') + '}\n' + config.colorize(options.level, '    * \n') : '') +	// Close "}" and skip line if there is options.meta
							config.colorize(options.level, '    ************************ ') + config.colorize(options.level, options.level.toUpperCase()) + config.colorize(options.level, ' ************************\n')	 		
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
