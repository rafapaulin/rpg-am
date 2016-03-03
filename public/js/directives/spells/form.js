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
				scope.displaySchools					= [];
				scope.displaySavings					= [];
				scope.displayComponents					= [];

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
					scope.newData.effect.cilinderHeight	= scope.size2 * scope.aoeLengthUnit.toMeter;	// *
					
					scope.newData.castTime.time			= scope.castTime * scope.ctTimeUnit.toSeconds;	// Convert and store time as seconds
					scope.newData.duration.max			= scope.duration * scope.durTimeUnit.toSeconds;	// *
					
					scope.newData.effect.aoe			= scope.aoeType.name;							// save data to variable-to-be POSTed
					scope.newData.schools				= scope.displaySchools;							// *
					scope.newData.savings				= scope.displaySavings;							// *
					scope.newData.components			= scope.displayComponents;						// *
				});

			// == Clean up on success ============================================================================================= //
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

				scope.addItem = function(obj, display, toSave, group, list){		// Add item to display array and object/array-to-be-posted
					obj.details = scope.details;
					display.push(obj);												// Add item to display array

					scope[list] = scope[list].filter(function(fList){				// Remove added item from the <select>
						return fList !== obj;
					});

					if(obj.subObj){													// Check if object is a subobject or not (based on the relevant schema)
						scope.newData[toSave][group]								// Add item to data-to-be-posted array
							.push({
									'name':obj.name,
									'cat': obj.cat,
									'subObj': obj.subObj,
									'details': scope.details
								});
					} else {
						scope.newData[toSave][obj.ngModel] = scope.details;			// Add info to data-to-be-posted object
						scope.details = null;										// Reset <input>
					};
					scope[obj] = undefined;											// Reset <select> position
				};


				scope.removeItem  = function($index, display, toSave, group, list){	// Remove item from display array and from object-to-be-posted
					if(display[$index].subObj){										// Check if object is a subobject or not (based on the relevant schema)
						scope.newData[toSave][group].splice($index,1);				// Remove item from array-to-be-posted if subobject
					} else {
						delete scope.newData[toSave][display[$index].ngModel];		// Remove item from object-to-be-posted if not subobject
					};

					scope[list].push(display[$index]);								// Add removed item back to the <select>
					display.splice($index,1);										// Remove item from display array from object-to-be-posted
				}

				scope.meh = function(a){
					console.log(a);
				}
			}
		};
	}]);