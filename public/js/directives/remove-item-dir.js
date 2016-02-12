'use strict';

angular.module('rpg')
	.directive('removeItem', ['Crud', function(Crud){
		return {
			restrict: "E",
			scope: false,
			templateUrl: "/templates/remove-item.html",
			link: function(scope, element, attrs){
				scope.remove = function(){
					console.log(); // Debug
					if(confirm('Tem certeza que deseja remover o ' + attrs.type + ' ' + attrs.name + '?')){
						Crud.remove(attrs.collection, attrs.slug);
					}
				};
			}};
	}]);