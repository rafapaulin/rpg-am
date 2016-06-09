'use strict';
angular.module('rpg')
	.directive('classBasics', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/classes/class-basics.html',
			scope: false,
			link: function(scope, element){
			// == Properties set up =============================================================================================== //
				scope.newData.bonuses					= {};					// Data-to-be-posted objects
				scope.newData.bonuses.proficiencies		= [];					// Data-to-be-posted arrays

				scope.bonusesProficienciesBasics		= Lists.proficiencies;	// Lists
			// =============================================================================================== Properties set up == //

			// == Scope functions ================================================================================================= //
				scope.listToArray = function(obj, array, list) {
					scope[list] = scope[list].filter(function(fList){			// Remove added item from the <select>
						return fList !== obj;
					});
					array.push(obj);											// Add item to the array
				}

				scope.removeItem  = function($index, array, list){
					scope[list].push(array[$index]);							// Add removed item back to the <select>
					array.splice($index,1);										// Remove item from display array
				}
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