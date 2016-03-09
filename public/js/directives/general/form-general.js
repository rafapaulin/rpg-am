'use strict';
angular.module('rpg')
	.directive('generalInputs', function(){

		return {
			restrict: 'E',
			templateUrl: '/templates/general/general.html',
			scope: false,
			link: function(scope, element){
			}
		};
	});