'use strict';
angular.module('rpg')
	.directive('backgroundFormInputs', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/backgrounds/background.html',
			scope: false,
			link: function(scope, element){
			}
		}
	}]);