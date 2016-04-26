'use strict';

angular.module('rpg').config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/views/index.html'
		})
		.when('/dashboard', {
			templateUrl: function(params){return '/views/users/dashboard.html'},					// Return Generic "New" Route based on the URL
			controller: 'dashboardController'
		})
		.when('/:collection', {
			templateUrl: function(params){return '/views/' + params.collection + '/list.html'},		// Return Generic "List" Route based on the URL
			controller: 'listController',
		})
		.when('/:collection/new', {
			templateUrl: function(params){return '/views/' + params.collection + '/add.html'},		// Return Generic "New" Route based on the URL
			controller: 'addController'
		})
		.when('/:collection/:slug', {
			templateUrl: function(params){return '/views/' + params.collection + '/single.html'},	// Return Generic "New" Route based on the URL
			controller: 'singleController'
		})
}]);

