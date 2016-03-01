'use strict';
angular.module('rpg')
	.directive('featFormInputs', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/form/feat.html',
			scope: false,
			link: function(scope, element){
			// == Properties set up =============================================================================================== //
				scope.newData.prereqs					= {};
				scope.newData.bonuses					= {};
				scope.newData.prereqs.proficiencies		= [];
				scope.newData.bonuses.proficiencies		= [];

				scope.abilities							= Lists.abilities;
				scope.displayAb							= [];

			// =============================================================================================== Properties set up == //

			// == Clean up on success ============================================================================================= //
				scope.$on('postSuccess', function(event, data) {				// Listen to 'postSuccess' event on controller [add-ctrl.js]
					scope.abilities						= Lists.abilities;		// Reset List

					scope.selectedPrereqs				= [];					// Reset display array
					scope.selectedBonuses				= [];					// *
					
					scope.newData.prereqs				= {};					// Re-sets the data-to-be-postes object
					scope.newData.bonuses				= {};					// *
					scope.newData.prereqs.proficiencies	= [];					// Re-sets the data-to-be-postes array
					scope.newData.bonuses.proficiencies	= [];					// *
				});
			// ============================================================================================= Clean up on success == //

				scope.addItem = function(obj, display, toSave, group){
					obj.detail = scope.detail;
					display.push(obj);									// Add item to display array
					scope[group] = scope[group].filter(function(list){	// Remove added item from the <select>
						return list !== obj;
					});
					scope.newData[toSave][obj.ngModel] = scope.detail;
				};






				scope.removeItem  = function($index, array, group){		// Remove item to array-to-be-posted
					scope[group].push(array[$index]);					// Add removed item back to the <select>
					array.splice($index,1);
				}

				scope.meh = function(a){
					console.log(a);
				}
			}
		};
	}]);