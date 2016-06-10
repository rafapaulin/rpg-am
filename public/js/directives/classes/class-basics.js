'use strict';
angular.module('rpg')
	.directive('classBasics', ['Lists', 'Fn', function(Lists, Fn){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/classes/class-basics.html',
			scope: false,
			link: function(scope, element){
			// == Properties set up =============================================================================================== //
				Fn.setScope(scope);
				
				scope.newData.bonuses					= {};					// Data-to-be-posted objects
				scope.newData.bonuses.proficiencies		= [];					// Data-to-be-posted arrays

				scope.bonusesProficienciesBasics		= Lists.proficiencies;	// Lists
			// =============================================================================================== Properties set up == //

			// == Scope functions ================================================================================================= //
				scope.toArray		= Fn.toArray;
				scope.removeItem	= Fn.removeItem;
			// ================================================================================================= Scope functions == //

			// == Clean up on success ============================================================================================= //
				scope.$on('postSuccess', function(event, data) {					// Listen to 'postSuccess' event on controller [add-ctrl.js]
					scope.bonusesProficienciesBasics	= Lists.proficiencies;		// Reset Lists
					scope.newData.bonuses				= {};						// Reset the data-to-be-posted objects
					scope.newData.bonuses.proficiencies	= [];						// Reset the data-to-be-posted arrays

				});
			// ============================================================================================= Clean up on success == //
			}
		}
	}]);