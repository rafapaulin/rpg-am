'use strict';
angular.module('rpg')
	.directive('classBasics', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/classes/class-basics.html',
			scope: false,
			link: function(scope, element){
			}
		}
	}]);