'use strict';
var  express = require('express'),
	  router = express.Router(),
		body = require('body-parser'),
	parseUrl = bodyParser.urlencoded({extended: false});