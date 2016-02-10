'use strict';
var express = require('express'),
	 router = express.Router();


router.get('/', function(req, res){
	console.log('GET request recieved for "/Feats"');
	res.send('Feats Home Page');
});

router.get('/:feat', function(req, res){
	console.log('GET request recieved for ' + req.params.feat);
	res.send(req.params.feat + ' Home Page');
});

module.exports = router;