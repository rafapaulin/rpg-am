'use strict';
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,

	equipSchema = new Schema(
		{

		},
		{
			'collection': 'equips'
		}
	);

module.exports = mongoose.model('Equip', equipSchema);