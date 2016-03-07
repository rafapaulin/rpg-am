'use strict';
angular.module('rpg')
	.directive('raceFormInputs', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/form/race.html',
			scope: false,
			link: function(scope, element){
			// == Properties set up =============================================================================================== //
				scope.langs 				= Lists.langs;
				scope.lengthUnits			= Lists.lengthUnits;
				scope.weightUnits			= Lists.weightUnits;
				scope.sizes					= Lists.sizes;
				scope.traitAbilities		= Lists.abilities;
				scope.traitProficiencies	= Lists.proficiencies;	
				scope.traitCombat			= Lists.combat;
				scope.dmgTypes				= Lists.dmgTypes;
				scope.traitOther			= Lists.other;

				scope.nameInputs			= [];
				scope.displayNames			= [];
				scope.displayLangs			= [];
				scope.displayTraitsAb		= [];
				scope.displayTraitProf		= [];
				scope.displayTraitCombat	= [];
				scope.displayDmgResist		= [];
				scope.displayTraitOther		= [];

				scope.details				= null;

				scope.newData.speed			= {};
				scope.newData.age			= {};
				scope.newData.physical		= {};
				scope.newData.bonuses		= {};

				scope.newData.commonNames	= [];
			// =============================================================================================== Properties set up == //

			// == Pass data to newData properties on POST ========================================================================= //
				scope.$on('post', function(event, data) {												// Listen to 'post' event on controller [add-ctrl.js]
					scope.newData.commonNames			= scope.displayNames;							// Set the array-to-be-posted with the value of the correspondent array
					scope.newData.languages				= scope.displayLangs;							// *

					scope.newData.speed.base			= scope.baseSpeed * scope.sLengthUnit.toMeter;	// Convert and store length as meters
					scope.newData.physical.avgHeight	= scope.avgHeight * scope.phLengthUnit.toMeter;	// *

					scope.newData.physical.avgWeight	= scope.avgWeight * scope.phWeightUnit.toKg;	// Convert and store weight as kilograms

					scope.newData.bonuses.proficiencies	= scope.displayTraitProf;						// Set the array-to-be-posted with the value of the correspondent display array
					scope.newData.bonuses.dmgResist		= scope.displayDmgResist;
				});
			// ========================================================================= Pass data to newData properties on POST == //

			// == Clean up on success ============================================================================================= //
				scope.$on('postSuccess', function(event, data) {										// Listen to 'postSuccess' event on controller [add-ctrl.js]
					scope.langs					= Lists.langs;											// Reset Lists
					scope.traitAbilities		= Lists.abilities;										// *
					scope.traitProficiencies	= Lists.proficiencies;									// *
					scope.dmgTypes				= Lists.dmgTypes;										// *
					scope.traitOther			= Lists.other;											// *

					scope.displayNames			= [];													// Reset display arrays
					scope.displayLangs			= [];													// *
					scope.nameInputs			= [];													// *
					scope.displayTraitsAb		= [];													// *
					scope.displayTraitProf		= [];													// *
					scope.displayTraitCombat	= [];													// *
					scope.displayDmgResist		= [];													// *
					scope.displayTraitOther		= [];													// *

					scope.newData.speed			= {};													// Sets the data-to-be-posted objects
					scope.newData.age			= {};													// *
					scope.newData.physical		= {};													// *
					scope.newData.bonuses		= {};													// *

					scope.newData.commonNames	= [];													// Sets the data-to-be-posted arrays

					scope.groupName				= null;													// Reset <input>
					scope.baseSpeed				= null;													// *
					scope.avgHeight				= null;													// *
					scope.avgWeight				= null;													// *
					scope.details				= null;

					scope.phLengthUnit			= undefined;											// Reset <select>
					scope.phWeightUnit			= undefined;											// *
					scope.sLengthUnit			= undefined;											// *
				});
			// ============================================================================================= Clean up on success == //

			// == Dynamic inputs ================================================================================================== //
				scope.addInput = function(array) {														// Add new input
					scope[array].push({});
				};

				scope.removeInput = function(array, $index){											// Remove input/added name group
					scope[array].splice($index,1);
				};

				scope.newGroup = function(array, display){												// Add new names group 
					var namesArray = [];

					for (var i = 0; i < array.length; i++) {											// Iterate through all name inputs
						namesArray.push(array[i].name);													// Add them to the names array
					};
					scope[display].push({																// Creates the object to be posted
						'group': scope.groupName,
						'namesList': namesArray
					});
					scope.nameInputs = [];																// Clean up the names input array
					scope.groupName = null;																// Variable clean up
				}
			// ================================================================================================== Dynamic inputs == //

				scope.addItem = function(obj, display, group, list){									// Add item to display-array and/or object/array-to-be-posted
					if(obj.ngModel){											
						obj[obj.ngModel] = scope.details;												// Defines new property with the scope.details data (needed to display)
						scope.newData[group][obj.ngModel] = obj[obj.ngModel];							// Add to object-to-be-posted as new property 
					} else {
						obj.details = scope.details;
					};
					scope[list] = scope[list].filter(function(fList){									// Remove added item from the <select>
						return fList !== obj;
					});
					display.push(obj);																	// Push to display array
					scope.details = null;																// Variable clean up
				};

				scope.removeItem  = function($index, display, group, list){								// Remove item from display array and/or from object-to-be-posted
					if(display[$index].ngModel){
						delete scope.newData[group][display[$index].ngModel];							// Delete undesired property from object-to-be-posted
					};
					scope[list].push(display[$index]);													// Add removed item back to the <select>
					display.splice($index,1);															// Remove item from display array
				}
				scope.meh = function(s){
					console.log(s);
				}
			}
		}
	}]);