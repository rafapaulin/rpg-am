'use strict';
angular.module('rpg')
	.directive('spellFormInputs', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/form/spell.html',
			scope: false,
			link: function(scope, element){
			// == Properties set up =============================================================================================== //
				scope.newData.damage					= {};											// Sets up the data-to-be-postes object
				scope.newData.castTime					= {};											// *
				scope.newData.duration					= {};											// *
				scope.newData.effect					= {};											// *
				scope.newData.atHigherLevels			= {};											// *

				scope.newData.schools					= [];											// Sets up the data-to-be-postes array
				scope.newData.components				= [];											// *
				scope.newData.savings					= [];											// *
				scope.newData.damage.dmgTypes			= [];											// *

				scope.dmgTypes							= Lists.dmgTypes;								// Define property to use on HTML
				scope.diceTypes							= Lists.diceTypes;								// *
				scope.schools							= Lists.schools;								// *
				scope.components						= Lists.components;								// *
				scope.savings 							= Lists.savings;								// *
				scope.lengthUnits						= Lists.lengthUnits;							// *
				scope.timeUnits							= Lists.timeUnits;								// *
				scope.areasOfEffect						= Lists.areasOfEffect;							// *
			// =============================================================================================== Properties set up == //

				scope.$on('post', function(event, data){												// Listen to 'post' event on controller [add-ctrl.js]
					scope.newData.range					= scope.range * scope.rLengthUnit.toMeter;		// Convert and store length as meters
					scope.newData.effect.size			= scope.size * scope.aoeLengthUnit.toMeter;		// *
					scope.newData.effect.cilinderHeight	= scope.size2 * scope.aoeLengthUnit.toMeter;	// *
					scope.newData.castTime.time			= scope.castTime * scope.ctTimeUnit.toSeconds;	// Convert and store time as seconds
					scope.newData.duration.max			= scope.duration * scope.durTimeUnit.toSeconds;	// *
					scope.newData.effect.aoe			= scope.aoeType.name;							// save data to variable-to-be POSTed
				});

				scope.$on('postSuccess', function(event, data){											// Listen to 'postSuccess' event on controller [add-ctrl.js]
					scope.schools						= Lists.schools;								// Reset List
					scope.components					= Lists.components;								// *
					scope.savings						= Lists.savings;								// *
					scope.dmgTypes						= Lists.dmgTypes;								// *
				
					scope.newData.damage				= {};											// Re-sets the data-to-be-postes object
					scope.newData.castTime				= {};											// *
					scope.newData.duration				= {};											// *
					scope.newData.effect				= {};											// *
					scope.newData.atHigherLevels		= {};											// *

					scope.newData.schools				= [];											// Re-sets the data-to-be-postes ararys
					scope.newData.components			= [];											// *
					scope.newData.savings				= [];											// *
					scope.newData.damage.dmgTypes		= [];											// *

					scope.size							= null;											// Reset <input>
					scope.size2							= null;											// *
					scope.castTime						= null;											// *
					scope.duration						= null;											// *
					scope.range							= null;											// *

					scope.ctTimeUnit					= '';											// Reset <select>
					scope.durTimeUnit					= '';											// *
					scope.rLengthUnit					= '';											// *
					scope.aoeType						= '';											// *
					scope.aoeLengthUnit					= '';											// *
				});

				scope.addItem = function(obj, array, group){
					array.push(obj);									// Add item to array-to-be-posted
					scope[group] = scope[group].filter(function(list){	// Remove added item from the <select>
						return list !== obj;
					});
					scope.newPrereq = undefined;
				};
				scope.removeItem  = function($index, array, group){		// Remove item to array-to-be-posted
					scope[group].push(array[$index]);					// Add removed item back to the <select>
					array.splice($index,1);
				}
			}
		};
	}]);