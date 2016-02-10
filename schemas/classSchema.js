'use strict';
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	
	classSchema = new Schema(
		{

		},
		{
			'collection': 'classes'
		}
	);

module.exports = mongoose.model('Class', classSchema);