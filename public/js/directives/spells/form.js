'use strict';
angular.module('rpg')
	.directive('spellFormInputs', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/form/spell.html',
			scope: false,
			link: function(scope, element){
			// == Properties set up =============================================================================================== //
				scope.newData.damage			= {};													// Sets up the data-to-be-postes object
				scope.newData.castTime			= {};													// Sets up the data-to-be-postes object
				scope.newData.duration			= {};													// Sets up the data-to-be-postes object
				scope.newData.effect			= {};													// Sets up the data-to-be-postes object
				scope.newData.atHigherLevels	= {};													// Sets up the data-to-be-postes object
				scope.newData.schools			= [];													// Sets up the data-to-be-postes array
				scope.newData.components		= [];													// Sets up the data-to-be-postes array
				scope.newData.savings			= [];													// Sets up the data-to-be-postes array
				scope.newData.damage.dmgTypes	= [];													// Sets up the data-to-be-postes array

				scope.dmgTypes					= Lists.dmgTypes;										// Define property to use on HTML
				scope.diceTypes					= Lists.diceTypes;										// Define property to use on HTML
				scope.schools					= Lists.schools;										// Define property to use on HTML
				scope.components				= Lists.components;										// Define property to use on HTML
				scope.savings 					= Lists.savings;										// Define property to use on HTML
				scope.lengthUnits				= Lists.lengthUnits;									// Define property to use on HTML
				scope.timeUnits					= Lists.timeUnits;										// Define property to use on HTML
				scope.areasOfEffect				= Lists.areasOfEffect;									// Define property to use on HTML
			// =============================================================================================== Properties set up == //

				scope.$on('post', function(event, data){												// Listen to 'post' event on controller [add-ctrl.js]
					scope.newData.range = scope.range * scope.rLengthUnit.toMeter;						// Convert on 'post' and store length as meters
					scope.newData.castTime.time = scope.castTime * scope.ctTimeUnit.toSeconds;			// Convert on 'post' and store time as seconds
					scope.newData.duration.max = scope.duration * scope.durTimeUnit.toSeconds;			// Convert on 'post' and store time as seconds
					scope.newData.effect.aoe = scope.aoeType.name;										// save data to variable-to-be POSTed
					scope.newData.effect.size = scope.size * scope.aoeLengthUnit.toMeter;				// Convert on 'post' and store length as meters
					scope.newData.effect.cilinderHeight = scope.size2 * scope.aoeLengthUnit.toMeter;	// Convert on 'post' and store length as meters
				});

				scope.$on('postSuccess', function(event, data){											// Listen to 'postSuccess' event on controller [add-ctrl.js]
					scope.schools					= Lists.schools;									// Reset List
					scope.components				= Lists.components;									// Reset List
					scope.savings					= Lists.savings;									// Reset List
					scope.dmgTypes					= Lists.dmgTypes;									// Reset List
				
					scope.newData.damage			= {};												// Re-sets the data-to-be-postes object
					scope.newData.castTime			= {};												// Re-sets the data-to-be-postes object
					scope.newData.duration			= {};												// Re-sets the data-to-be-postes object
					scope.newData.effect			= {};												// Re-sets the data-to-be-postes object
					scope.newData.atHigherLevels	= {};												// Sets up the data-to-be-postes object

					scope.newData.schools			= [];												// Re-sets the data-to-be-postes ararys
					scope.newData.components		= [];												// Re-sets the data-to-be-postes ararys
					scope.newData.savings			= [];												// Re-sets the data-to-be-postes ararys
					scope.newData.damage.dmgTypes	= [];												// Re-sets the data-to-be-postes ararys

					scope.size						= null;												// Reset <input> on POST success
					scope.size2						= null;												// Reset <input> on POST success
					scope.castTime					= null;												// Reset <input> on POST success
					scope.duration					= null;												// Reset <input> on POST success
					scope.range						= null;												// Reset <input> on POST success
				});

				scope.addItem = function(obj, array, group){
					array.push(obj);									// Add item to array-to-be-posted
					scope[group] = scope[group].filter(function(list){	// Remove added item from the <select>
						return list !== obj;
					});
				};
				scope.removeItem  = function($index, array, group){		// Remove item to array-to-be-posted
					scope[group].push(array[$index]);					// Add removed item back to the <select>
					array.splice($index,1);
				}
			}
		};
	}]);