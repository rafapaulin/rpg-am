'use strict';

angular.module('rpg').controller('singleController', ['$scope', 'Crud', '$routeParams', '$sce', '$location', function($scope, Crud, $routeParams, $sce, $location){
	var controller = $scope,
		collection = $routeParams.collection,
		slug	   = $routeParams.slug;


	controller.showForm = null;

	controller.update = function(data){
		controller.errors = null;
		console.log(data);
		data.desc = $sce.getTrustedHtml(data.desc); // Translate the desc wysiwyg text as trusted html string

		Crud.put(collection , slug, data)
			.catch(function(data){
				controller.errors = data.error;
			});
		controller.showForm = null;
		$location.path(collection);
	};

	Crud.getOne(collection, slug).success(function(data){
		controller.data = data;
		controller.data.desc = $sce.trustAsHtml(controller.data.desc); // Renders the html format in the descriptions
	});
}]);