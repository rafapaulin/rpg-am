'use strict';
angular.module('rpg')
	.directive('spellEffects', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/form/spells/effects.html',
			scope: false,
			link: function(scope, element){
			// == Properties set up =============================================================================================== //
				scope.$on('post', function(event, data){				// Listen to POST success on controller [add-ctrl.js]
				});
			// =============================================================================================== Properties set up == //
			}
		};
	}]);