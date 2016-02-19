'use strict';

// == Requirements ================================================================= //
	var winston = require('winston'),
		 config = require('winston/lib/winston/config'),
		 colors = require('colors'),
		 mkdirp = require('mkdirp'),
			 fs = require('fs'),
			  _ = require('underscore'),
// ================================================================= Requirements == //

// == Global Variables ============================================================= //
	weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
	  month = ['January','February','March','April','May','June','July','August','September','October','November','December'],
	custom	= { 
		levels: {error: 	0, one:		   1, two:		   2, three:	  3, four:		 4, debug:		5}, 
		colors: {error: ['red', 'bold'], one: ['yellow', 'bold'], two: ['magenta', 'bold'], three: ['cyan', 'bold'], four: ['green', 'bold'], debug: ['blue', 'bold']}
	 };

var jasao = {
	"desgraca": {
		"msg": "pouca é brinquedo",
		"pqp": "pqp",
		"porra": {
			"1": "caralho",
			"2": {
				"bleh": "vai tomar no cu",
				"bleh2": "vai tomar no cu"
			}
		}
	},
	"level": "debug",
	"message": "mensagem custom",
	"timestamp":"2016-02-18T22:45:32.051Z"
}
// console.log(_.each(value, function(val, prop){ return '\n' + prop + ': ' + val;}))
_.each(jasao, function(value, key){
	if(typeof value == 'object'){
		console.log(key.yellow + ': ' + value);
	}
	else {
		console.log(key.yellow + ': ' + value.green);
 	}
});

// function lookdeep(object){
//     var collection= [], index= 0, next, item;
//     for(item in object){
//         if(object.hasOwnProperty(item)){
//             next = object[item];
//             if(typeof next == 'object' && next != null){
//             	console.log(index)
//                 collection[index++] = item + ': {\n' + lookdeep(next).join(',\n') + '\n}';
//             }
//             else collection[index++] = ['    ' + item + ':' + String(next)];
//         }
//     }
//     return collection;
// }
// console.log( '{\n'+ lookdeep(jasao).join('\n') +'\n}');


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
				prettyPrint: false,
				timestamp: function(){
					return year + ' ' + month[monthNum] + ' ' + day + ' '  + time
				},
				formatter: function(options) {
					return '\n meh'
	 				// return	config.colorize(options.level, '    ****** ' + options.level.toUpperCase() + ' ******') +
	 				// 		config.colorize(options.level, '\n    * ') + options.timestamp().grey.bold +
						// 	(undefined !== options.message ? config.colorize(options.level, '\n    * ')  + options.message.white.bold : '') +
						// 	config.colorize(options.level, '\n    * ') 


							//(options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' )


	 		// + ' stringTest'.blue
	 		// + ' stringTest'.blue.bold
	 		// + ' stringTest'.green
	 		// + ' stringTest'.green.bold
	 		// + ' stringTest'.cyan
	 		// + ' stringTest'.cyan.bold
	 		// + ' stringTest'.magenta
	 		// + ' stringTest'.magenta.bold
	 		// + ' stringTest'.yellow
	 		// + ' stringTest'.yellow.bold
	 		// + ' stringTest'.red
	 		// + ' stringTest'.red.bold
	 		// + ' stringTest'.white
	 		// + ' stringTest'.white.bold
	 		// + ' stringTest'.grey

	 		// + config.colorize(options.level, '\n    ****** ') + config.colorize(options.level, options.level.toUpperCase()) + config.colorize(options.level, ' ******\n')
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
