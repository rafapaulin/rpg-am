'use strict';
angular.module('rpg')
	.factory('Crud', ['$http', function CrudFactory($http) {
		return {
			post:	function(route, obj){ return $http({method:  'POST', url: '/' + route, data: obj}) }, // Create
			get:	function(route){ 	  return $http({method:   'GET', url: '/' + route}); }, // Read
			put:	function(route){  }, // Update
			remove:	function(route, id){ return $http({method: 'DELETE', url: '/' + route + '/' + id}) } // Delete
		};
	}]);