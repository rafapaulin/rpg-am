'use strict';
angular.module('rpg')
	.directive('equipFormInputs', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/equips/equip.html',
			scope: false,
			link: function(scope, element){
			}
		}
	}]);