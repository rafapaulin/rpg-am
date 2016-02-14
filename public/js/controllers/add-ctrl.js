'use strict';

angular.module('rpg').controller('addController', ['$scope', 'Crud', '$routeParams', function($scope, Crud, $routeParams){
	var controller = $scope,
		collection = $routeParams.collection;

	controller.save = function(data){
		controller.errors = null;

		Crud.post(collection , data)
			.catch(function(data){
				controller.errors = data.data.error;
			});

		console.log(data); // Debug
		controller.newData = {};
	}
}]);