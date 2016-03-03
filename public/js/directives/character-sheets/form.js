'use strict';
angular.module('rpg')
	.directive('charSheetsFormInputs', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/form/char-sheet.html',
			scope: false,
			link: function(scope, element){
			}
		}
	}]);