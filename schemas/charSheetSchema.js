'use strict';
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,

	charSheetSchema = new Schema(
		{
			'charName': String,
		},
		{
			'collection': 'charSheets'
		}
	);

module.exports = mongoose.model('CharSheet', charSheetSchema);