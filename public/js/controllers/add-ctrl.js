'use strict';

angular.module('rpg')
	.controller('addController', ['$scope', 'Crud', '$routeParams', '$timeout', '$location', function($scope, Crud, $routeParams, $timeout, $location){
		var controller = $scope,
			collection = $routeParams.collection;

//== Properties preset ================================================================================================= //
		controller.success = null;												// Define property to use on HTML
		controller.errors = null;												// Define property to use on HTML
		controller.newData = {};												// Sets up the data-to-be-postes variable
//================================================================================================= Properties preset == //

//== Save to DB block ================================================================================================== //
		controller.save = function(data){										// Save function
			controller.$emit('post');											// Emit 'post' event to use on directives
			Crud.post(collection, data)											// Front end POST request
				.then(function(res){											// Success response to user
					controller.success = res.data.message;						// Set response to property
					$timeout(function(){controller.success = null}, 3000);		// Variable clean up on success (General success message)
					controller.newData = {};									// Variable clean up on success (General data submited to database)
					controller.$emit('postSuccess');							// Emit 'postSuccess' event to use on directives
				})
				.catch(function(res){											// Error response to user
					if(res.status == 401 && confirm(res.data.message)){
						$location.path('users/new');
					} else {
						controller.errors = [];										// Define property to use on HTML
						for(var key in res.data) { 									// Get all error messages in the array
							controller.errors.push(res.data[key].message);
						};
						$timeout(function(){controller.errors = null}, 3000);		// Variable clean up (General error message)
					}
				});
//================================================================================================== Save to DB block == //
		}
	}]);