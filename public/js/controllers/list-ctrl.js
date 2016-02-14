'use strict';

angular.module('rpg').controller('listController', ['$scope', 'Crud', '$routeParams', function($scope, Crud, $routeParams){
	var controller = $scope,
		collection = $routeParams.collection;

	Crud.get(collection).success(function(data){
		controller.collection = data;
	});
}]);