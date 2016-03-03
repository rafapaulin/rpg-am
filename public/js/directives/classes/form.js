'use strict';
angular.module('rpg')
	.directive('classFormInputs', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/form/class.html',
			scope: false,
			link: function(scope, element){
			}
		}
	}]);