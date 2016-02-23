'use strict';

angular.module('rpg')
	.controller('addController', ['$scope', 'Crud', '$routeParams', '$timeout', function($scope, Crud, $routeParams, $timeout){
		var controller = $scope,
			collection = $routeParams.collection;

//== Properties preset ================================================================================================= //
		controller.success = null;												// Define property to use on HTML
		controller.errors = null;
		controller.newData = {};
		controller.prerequisites = [];											// variable for the [form-pre-req.js]
//================================================================================================= Properties preset == //

//== Save to DB block ================================================================================================== //
		controller.save = function(data){										// Save function
			//controllere.newData.prereq.proficiencies = [];

			Crud.post(collection , data)										// Front end POST request
				.then(function(res){											// Success response to user
					controller.success = res.data.message;

					$timeout(function(){controller.success = null}, 3000);		// Variable clean up on success (General success message)
					controller.newData = {};									// Variable clean up on success (General data submited to database)
					controller.prerequisites = [];								// Variable clean up on success (Data from [form-pre-req.js])
				})
				.catch(function(res){											// Error response to user
					var errors = [];
					for(var key in res.data) { 									// Get all error messages in a array
						errors.push(res.data[key].message);
					};
					controller.errors = errors;									// Define property to use on HTML
					$timeout(function(){controller.errors = null}, 3000);		// Variable clean up (General error message)
				});
//================================================================================================== Save to DB block == //
		}
	}]);