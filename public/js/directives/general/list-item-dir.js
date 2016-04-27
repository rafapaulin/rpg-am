'use strict';
angular.module('rpg')
	.directive('listItem', ['$sce', 'Crud', '$routeParams', '$location', '$timeout', function($sce, Crud, $routeParams, $location, $timeout){
		var collection = $routeParams.collection; 				// Get the collection name from URL
		return {
			restrict: 'E',
			templateUrl: '/templates/general/list-item.html',
			scope: {
				name:	 '=',
				short:	 '=',
				slug:	 '=',
			},
			link: function(scope, element){
				scope.desc = $sce.trustAsHtml(scope.desc);		// Renders the html format in the descriptions
				scope.collection = collection;					// Define param to use on HTML

				scope.remove = function(){						// Delete function
					if(confirm('Are you sure you want to delete the ' + collection.substring(0, collection.length - 1) + ' ' + scope.name + '?')){
						Crud.remove(collection, scope.slug)		// Front end DELETE request
							.then(function(res){
								console.log(res);
								scope.success = res.data.message;						// Set response to property
								scope.success2 = true;

								$timeout(function(){									// Variable clean up on success (General success message)
									scope.success = null
								}, 3000);
								$timeout(function(){
									scope.$destroy();									// destroy the deleted item's scope
									element.remove(); 									// remove the deleted item's element from the DOM
								}, 3200);
							})
							.catch(function(res){
								if(res.status == 401 && confirm(res.data.message)){
									$location.path('users/new');
								} else {
									scope.errors = [];									// Define property to use on HTML
									for(var key in res.data) { 							// Get all error messages in the array
										scope.errors.push(res.data[key].message);
									};
									$timeout(function(){scope.errors = null}, 3000);	// Variable clean up (General error message)
								}
							});
					}
				};
			}
		};
	}]);