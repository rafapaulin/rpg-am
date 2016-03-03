'use strict';
angular.module('rpg')
	.directive('skillFormInputs', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/form/skill.html',
			scope: false,
			link: function(scope, element){
				scope.abilities				= Lists.abilities;

				scope.$on('post', function(event, data){				// Listen to 'post' event on controller [add-ctrl.js]
					scope.newData.ability 	= scope.skillAbility.name;	// set the correct value to the data-to-be-posted object
				});

				scope.$on('postSuccess', function(event, data) {		// Listen to 'postSuccess' event on controller [add-ctrl.js]
					scope.skillAbility		= undefined;				// Reset List position
				});
			}
		}
	}]);