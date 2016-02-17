var winston = require('winston'),
	 config = require('winston/lib/winston/config');

winston.emitErrs = true;

var logger = new winston.Logger({
	transports: [
		new winston.transports.File({
			level: 'debug',
			filename: 'logs/all.log',
			handleExceptions: true,
			humanReadableUnhandledException: true,
			exitOnError: false,
			json: true,
			maxsize: 5242880, //5MB
			maxFiles: 5,
			colorize: true,
			prettyPrint: true,

			formatter: function(options) {
				// Return string will be passed to logger. 
				return config.colorize(options.level,options.level.toUpperCase()) +' '+ (undefined !== options.message ? options.message : '') + (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
			}
		}),
		new winston.transports.Console({
			level: 'debug',
			handleExceptions: true,
			humanReadableUnhandledException: true,
			exitOnError: false,
			json: false,
			colorize: true,
			prettyPrint: true,

			timestamp: function() {
				var date	= new Date(), // Get time now
					hours 	= date.getHours(), // Hours part from the timestamp
					minutes	= "0" + date.getMinutes(), // Minutes part from the timestamp
					seconds	= "0" + date.getSeconds(); // Seconds part from the timestamp

				return  hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2); // Will display time in HH:MM:SS format
			},

			formatter: function(options) {
				// Return string will be passed to logger. 
				return options.timestamp() + ' ' + config.colorize(options.level,options.level.toUpperCase()) +' '+ (undefined !== options.message ? options.message : '') + (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
			}
		})
	],
	exitOnError: false
});

module.exports = logger;
