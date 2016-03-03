'use strict';
angular.module('rpg')
	.directive('raceFormInputs', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/form/race.html',
			scope: false,
			link: function(scope, element){
			}
		}
	}]);