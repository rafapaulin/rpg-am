'use strict';
angular.module('rpg')
	.factory('Crud', ['$http', function CrudFactory($http) {
		return {
			post:	function(route, obj)  { return $http({method:  'POST', url: '/' + route, data: obj})},		// Create
			get:	function(route)		  { return $http({method:   'GET', url: '/' + route 		  })},		// Read List
			getOne:	function(route, slug) { return $http({method:   'GET', url: '/' + route + '/' + slug})},	// Read one
			put:	function(route, obj)  {  }, // Update
			remove:	function(route, slug) { return $http({method: 'DELETE', url: '/' + route + '/' + slug})}	// Delete
		};
	}]);