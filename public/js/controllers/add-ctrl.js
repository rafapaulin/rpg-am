'use strict';

angular.module('rpg')
	.controller('addController', ['$scope', 'Crud', '$routeParams', '$timeout', function($scope, Crud, $routeParams, $timeout){
		var controller = $scope,
			collection = $routeParams.collection;

//== Properties preset ================================================================================================================================================== //
		controller.collection = collection;																	// Define property to use on HTML
		controller.tbOpt = [['p'],['bold','italics','underline','strikeThrough'],['ul','ol'],['clear']];	// Define property to use on HTML
		controller.success = null;
		controller.errors = null;
		controller.newData = {};
//================================================================================================================================================== Properties preset == //



//== Save to DB block =================================================================================================================================================== //
		controller.save = function(data){																	// Save function
			controller.newData.prereq.proficiencies = controller.proficiencies;								// Getting data from temporary array
			Crud.post(collection , data)																	// Front end POST request
				.then(function(res){																		// Success response to user
					controller.success = res.data.message;
					
					$timeout(function(){controller.success = null}, 3000);									// Variable clean up on success
					controller.newData = {};																// Variable clean up on success
				})
				.catch(function(res){																		// Error response to user
					var errors = [];
					for(var key in res.data) { 																// Get all error messages in a array
						errors.push(res.data[key].message);
					};
					controller.errors = errors;																// Define property to use on HTML
					$timeout(function(){controller.errors = null}, 3000);									// Variable clean up
				});
//=================================================================================================================================================== Save to DB block == //
																// Variable clean up
		}
	}]);