'use strict';

angular.module('rpg').controller('singleController', ['$scope', 'Crud', '$routeParams', '$sce', function($scope, Crud, $routeParams, $sce){
	var controller = $scope,
		collection = $routeParams.collection,
		slug	   = $routeParams.slug;

	Crud.getOne(collection, slug).success(function(data){
		controller.data = data;
		console.log($sce.trustAsHtml(controller.data.desc));
		controller.data.desc = $sce.trustAsHtml(controller.data.desc); // Renders the html format in the descriptions
	});
}]);