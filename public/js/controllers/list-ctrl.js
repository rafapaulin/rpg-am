'use strict';

angular.module('rpg').controller('listController', ['$scope', 'Crud', '$routeParams', function($scope, Crud, $routeParams){
	var controller = $scope,
		collection = $routeParams.collection;

	controller.collection = collection;				// Define property to use on HTML

	Crud.get(collection).success(function(data){	// Front end GET request
		controller.list = data;						// Set list property to html use
	});
}]);