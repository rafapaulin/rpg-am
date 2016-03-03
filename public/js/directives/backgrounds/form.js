'use strict';
angular.module('rpg')
	.directive('backgroundFormInputs', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/form/background.html',
			scope: false,
			link: function(scope, element){
			}
		}
	}]);