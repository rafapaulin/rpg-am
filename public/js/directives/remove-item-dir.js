'use strict';

angular.module('rpg')
	.directive('removeItem', ['Crud', function(Crud){
		return {
			restrict: "E",
			scope: false,
			templateUrl: "/templates/remove-item.html",
			controller: ['$scope', '$element', '$attrs', function(scope, element, attrs){
				scope.remove = function(){
					console.log(attrs.collection + ' ' + attrs.name)	
				};
				//Crud.remove(attrs.collection)
			}]};
	}]);