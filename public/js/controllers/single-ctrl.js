'use strict';

angular.module('rpg').controller('singleController', ['$scope', 'Crud', '$routeParams', '$sce', '$location', function($scope, Crud, $routeParams, $sce, $location){
	var controller = $scope,
		collection = $routeParams.collection,
		slug	   = $routeParams.slug;


	controller.showForm = null;

	controller.update = function(data){
		controller.errors = null;

		console.log(collection);
		console.log(slug);
		console.log(data);

		Crud.put(collection , slug, data)
			.catch(function(data){
				controller.errors = data.error;
			});
		controller.showForm = null;
		console.log(data);
		$location.path(collection);
	};

	Crud.getOne(collection, slug).success(function(data){
		controller.data = data;
		controller.data.desc = $sce.trustAsHtml(controller.data.desc); // Renders the html format in the descriptions
	});
}]);