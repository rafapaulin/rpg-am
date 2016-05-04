'use strict';

angular.module('rpg').controller('singleController', ['$scope', 'Crud', '$routeParams', '$sce', '$location', '$timeout', function($scope, Crud, $routeParams, $sce, $location, $timeout){
	var controller = $scope,
		collection = $routeParams.collection,
		slug	   = $routeParams.slug;

	controller.collection = collection;									// Define property to use on HTML

	controller.showForm = null;											// Clean variable to hide form

	controller.update = function(data){									// Update function
		controller.errors = null;
		console.log(data);
		data.desc = $sce.getTrustedHtml(data.desc);						// Translate the desc wysiwyg text as trusted html string

		delete data._id;												// Delete the unupdatable parameter (_id) from the object being sent on update
		delete data.createdBy;											// Remove data from update object to avoid unwanted overwritten data
		delete data.createdOn;											// *
		delete data.__v													// *
		delete data.slug												// *

		for (var key in data) {											// Remove empty data from update object to avoid unwanted overwritten data
			console.log('key: ' + key);
			if(key.length < 1){
				console.log('key ' + key + ' deletada!');
				delete data[key];
			}
		};

		Crud.put(collection , slug, data)								// Front end PUT request
			.then(function(res){										// Success response to user
				console.log(res.data.message);
				controller.success = res.data.message;
				$timeout(function(){controller.success = null}, 2000);	// Variable clean up on success (General success message)
				$timeout(function(){									// Redirect to new slug
					$location.path(collection + '/' + res.data.slug);
				}, 2200);
			})
			.catch(function(res){											// Error response to user
				if(res.status == 401 && confirm(res.data.message)){
					console.log('crap if');
					$location.path('users/new');
				} else {
					console.log('crap else');
					controller.errors = [];										// Define property to use on HTML
					for(var key in res.data) { 									// Get all error messages in the array
						controller.errors.push(res.data[key].message);
					};
					$timeout(function(){controller.errors = null}, 3000);		// Variable clean up (General error message)
				}
			});
		controller.showForm = null;										// Clean variable to hide form
	};

	Crud.getOne(collection, slug).success(function(data){				// Front end GET request
		controller.data = data;
		controller.data.desc = $sce.trustAsHtml(controller.data.desc);	// Renders the html format in the descriptions
	});
}]);