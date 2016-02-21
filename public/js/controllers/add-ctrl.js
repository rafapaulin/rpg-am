'use strict';

angular.module('rpg')
	.controller('addController', ['$scope', 'Crud', '$routeParams', '$timeout', function($scope, Crud, $routeParams, $timeout){
		var controller = $scope,
			collection = $routeParams.collection;

		controller.collection = collection;																	// Define property to use on HTML
		controller.tbOpt = [['p'],['bold','italics','underline','strikeThrough'],['ul','ol'],['clear']];	// Define property to use on HTML
		controller.success = null;

		controller.save = function(data){																	// Save function
			controller.errors = null;

			Crud.post(collection , data)																	// Front end POST request
				.then(function(res){																		// Success response to user
					controller.success = res.data.message;
					$timeout(function(){controller.success = null}, 3000);
				})
				.catch(function(res){																		// Error response to user
					var errors = [];
					for(var key in res.data) {
						errors.push(res.data[key].message);
					};
					controller.errors = errors;
					$timeout(function(){controller.errors = null}, 3000);
				});
			controller.newData = null;																		// Variable clean up
		}
	}]);