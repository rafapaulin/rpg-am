'use strict';
angular.module('rpg')
	.directive('listItem', ['$sce', 'Crud', '$routeParams', function($sce, Crud, $routeParams){
		var collection = $routeParams.collection; 				// Get the collection name from URL

		return {
			restrict: 'E',
			templateUrl: '/templates/list-item.html',
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
						Crud.remove(collection, scope.slug);	// Front end DELETE request
						scope.$destroy();						// destroy the deleted item's scope
						element.remove(); 						// remove the deleted item's element from the DOM
					}
				};
			}
		};
	}]);