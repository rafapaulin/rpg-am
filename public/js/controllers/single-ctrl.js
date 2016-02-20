'use strict';

angular.module('rpg').controller('singleController', ['$scope', 'Crud', '$routeParams', '$sce', '$location', function($scope, Crud, $routeParams, $sce, $location){
	var controller = $scope,
		collection = $routeParams.collection,
		slug	   = $routeParams.slug;

	controller.collection = collection;									// Define property to use on HTML

	controller.showForm = null;											// Clean variable to hide form

	controller.update = function(data){									// Update function
		controller.errors = null;
		data.desc = $sce.getTrustedHtml(data.desc);						// Translate the desc wysiwyg text as trusted html string

		Crud.put(collection , slug, data)								// Front end PUT request
			.then(function(res){										// Success response to user
				controller.success = res.data.message;
				$location.path(collection + '/' + res.data.slug);
			})
			.catch(function(res){										// Error response to user
				var errors = [];

				for(var key in res.data) {
					errors.push(res.data[key].message);
				};
				controller.errors = errors;
			});
		controller.showForm = null;										// Clean variable to hide form
	};

	Crud.getOne(collection, slug).success(function(data){				// Front end GET request
		controller.data = data;
		controller.data.desc = $sce.trustAsHtml(controller.data.desc);	// Renders the html format in the descriptions
	});
}]);