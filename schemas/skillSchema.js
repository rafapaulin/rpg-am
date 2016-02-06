'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema(
	{
		'name': {type:String, required: true, minlength: 3},
		'ability': {type:String, required: true, minlength: 3},
		'prof': {type:Boolean, required: true, minlength: 3},
		'desc': {type:String, required: true, minlength: 3},
	},
	{'collection': 'skills'}
);