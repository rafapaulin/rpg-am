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

				scope.newData.schools					= [];											// Sets up the data-to-be-postes arrays
				scope.newData.components				= [];											// *
				scope.newData.savings					= [];											// *
				scope.newData.damage.dmgTypes			= [];											// *

				scope.displayDmgTypes					= [];											// Sets up the display arrays
				scope.displaySchools					= [];											// *
				scope.displaySavings					= [];											// *
				scope.displayComponents					= [];											// *

				scope.dmgTypes							= Lists.dmgTypes;								// Define property to use on HTML
				scope.diceTypes							= Lists.diceTypes;								// *
				scope.schools							= Lists.schools;								// *
				scope.components						= Lists.components;								// *
				scope.savings 							= Lists.savings;								// *
				scope.lengthUnits						= Lists.lengthUnits;							// *
				scope.timeUnits							= Lists.timeUnits;								// *
				scope.areasOfEffect						= Lists.areasOfEffect;							// *
				scope.details							= null;											// *
			// =============================================================================================== Properties set up == //

				scope.$on('post', function(event, data){												// Listen to 'post' event on controller [add-ctrl.js]
					scope.newData.range					= scope.range * scope.rLengthUnit.toMeter;		// Convert and store length as meters
					scope.newData.effect.size			= scope.size * scope.aoeLengthUnit.toMeter;		// *
					scope.newData.effect.size2			= scope.size2 * scope.aoeLengthUnit.toMeter;	// *
					
					scope.newData.castTime.time			= scope.castTime * scope.ctTimeUnit.toSeconds;	// Convert and store time as seconds
					scope.newData.duration.max			= scope.duration * scope.durTimeUnit.toSeconds;	// *
					
					scope.newData.effect.aoe			= scope.aoeType.name;							// save data to variable-to-be POSTed
					scope.newData.schools				= scope.displaySchools;							// *
					scope.newData.savings				= scope.displaySavings;							// *
					scope.newData.components			= scope.displayComponents;						// *
					scope.newData.damage.dmgTypes		= scope.displayDmgTypes;						// *
				});

			// == Clean up on success ============================================================================================= //
				scope.$on('postSuccess', function(event, data){											// Listen to 'postSuccess' event on controller [add-ctrl.js]
					scope.schools						= Lists.schools;								// Reset List
					scope.components					= Lists.components;								// *
					scope.savings						= Lists.savings;								// *
					scope.dmgTypes						= Lists.dmgTypes;								// *

					scope.displayDmgTypes				= [];											// Reset the display arrays
					scope.displaySchools				= [];											// *
					scope.displaySavings				= [];											// *
					scope.displayComponents				= [];											// *
				
					scope.newData.damage				= {};											// Re-sets the data-to-be-postes object
					scope.newData.castTime				= {};											// *
					scope.newData.duration				= {};											// *
					scope.newData.effect				= {};											// *
					scope.newData.atHigherLevels		= {};											// *

					scope.newData.schools				= [];											// Re-sets the data-to-be-postes arary
					scope.newData.components			= [];											// *
					scope.newData.savings				= [];											// *
					scope.newData.damage.dmgTypes		= [];											// *

					scope.size							= null;											// Reset <input>
					scope.size2							= null;											// *
					scope.castTime						= null;											// *
					scope.duration						= null;											// *
					scope.range							= null;											// *
					scope.details						= null;											// *

					scope.ctTimeUnit					= undefined;									// Reset <select>
					scope.durTimeUnit					= undefined;									// *
					scope.rLengthUnit					= undefined;									// *
					scope.aoeType						= undefined;									// *
					scope.aoeLengthUnit					= undefined;									// *
				});
			// ============================================================================================= Clean up on success == //



				scope.addItem = function(obj, display, group, list){			// Add item to display-array and/or object/array-to-be-posted
					if(obj.ngModel){											
						obj[obj.ngModel] = scope.details;						// Defines new property with the scope.details data (needed to display)
						scope.newData[group][obj.ngModel] = obj[obj.ngModel];	// Add to object-to-be-posted as new property 
					} else {
						obj.details = scope.details;
					};

					scope[list] = scope[list].filter(function(fList){			// Remove added item from the <select>
						return fList !== obj;
					});

					display.push(obj);											// Push to display array
					scope.details = null;										// Variable clean up
				};

				scope.removeItem  = function($index, display, group, list){		// Remove item from display array and/or from object-to-be-posted
					if(display[$index].ngModel){
						delete scope.newData[group][display[$index].ngModel];	// Delete undesired property from object-to-be-posted
					};
					scope[list].push(display[$index]);							// Add removed item back to the <select>
					display.splice($index,1);									// Remove item from display array
				}

				scope.meh = function(a){
					console.log(a)	
				};
			}
		};
	}]);