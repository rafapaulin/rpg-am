'use strict';
angular.module('rpg')
	.directive('userLogin', ['Lists', 'Crud', '$timeout', function(Lists, Crud, $timeout){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/users/login.html',
			scope: false,
			link: function(scope, element){
				scope.authLocal = function(data){
					Crud.login('auth', 'local', data)
						.then(function(res){									// Success response to user
							console.log(res);
							scope.success = 'Welcome ' + res.data.name;			// Set response to property
							$timeout(function(){scope.success = null}, 3000);	// Variable clean up on success (General success message)
							scope.user = {};									// Variable clean up on success (General data submited to database)
						})
						.catch(function(res){									// Error response to user
							scope.errors = [];									// Define property to use on HTML
							for(var key in res.data) { 							// Get all error messages in the array
								scope.errors.push(res.data[key]);
							};
							$timeout(function(){scope.errors = null}, 3000);	// Variable clean up (General error message)
						});
				};
			}
		}
	}]);