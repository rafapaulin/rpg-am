'use strict';
angular.module('rpg')
	.directive('generalInputs', function(){

		return {
			restrict: 'E',
			templateUrl: '/templates/form-general.html',
			scope: false,
		};
	});