'use strict';
// == Requirements ================================================================= //
	var	express = require('express'),
		 router = express.Router(),
			mid = require('../services/middlewares');
// ================================================================= Requirements == //

// == Routes ================================================================= //
	router.get('/dashboard', mid.routing.isLoggedIn, function(req, res){res.status(200).json(req.user)})
		  .get('/:collection/:slug?/:callback?', mid.routing.login, mid.routing.getItems)
		  .put('/:collection/:slug', mid.routing.isLoggedIn, mid.routing.updateContent)
		  .post('/:collection/:slug?', mid.routing.login, mid.routing.newUser, mid.routing.isLoggedIn, mid.routing.createContent)
		  .delete('/:collection/:slug', mid.routing.isLoggedIn, mid.routing.deleteContent);
// ================================================================= Routes == //

module.exports = router;