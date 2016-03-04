'use strict';
angular.module('rpg')
	.directive('featFormInputs', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/form/feat.html',
			scope: false,
			link: function(scope, element){
			// == Properties set up =============================================================================================== //
				scope.newData.prereqs					= {};					// Data-to-be-posted objects
				scope.newData.bonuses					= {};					// *

				scope.newData.prereqs.proficiencies		= [];					// Data-to-be-posted arrays
				scope.newData.bonuses.proficiencies		= [];					// *
				scope.newData.prereqs.custom			= [];					// *
				scope.newData.bonuses.custom			= [];					// *

				scope.prereqsAbilities					= Lists.abilities;		// Lists
				scope.prereqsProficiencies				= Lists.proficiencies;	// *
				scope.prereqsOther						= Lists.other			// *
				scope.bonusesAbilities					= Lists.abilities;		// *
				scope.bonusesProficiencies				= Lists.proficiencies;	// *
				scope.bonusesCombat						= Lists.combat			// *
				scope.bonusesOther						= Lists.other			// *

				scope.displayPrereqAb					= [];					// Display arrays
				scope.displayPrereqProf					= [];					// *
				scope.displayPrereqsOther				= [];					// *
				scope.displayBonusAb					= [];					// *
				scope.displayBonusProf					= [];					// *
				scope.displayBonusCombat				= [];					// *
				scope.displayBonusOther					= [];					// *

			// =============================================================================================== Properties set up == //

			// == Pass data to newData properties on POST ========================================================================= //
				scope.$on('post', function(event, data) {							// Listen to 'post' event on controller [add-ctrl.js]
					scope.newData.prereqs.proficiencies = scope.displayPrereqProf;	// Set the array-to-be-posted with the value of the correspondent array
					scope.newData.prereqs.custom		= scope.displayPrereqsOther	// *
					scope.newData.bonuses.proficiencies = scope.displayPrereqProf;	// *
					scope.newData.bonuses.custom		= scope.displayPrereqsOther	// *
				});
			// ========================================================================= Pass data to newData properties on POST == //

			// == Clean up on success ============================================================================================= //
				scope.$on('postSuccess', function(event, data) {				// Listen to 'postSuccess' event on controller [add-ctrl.js]
					scope.prereqsAbilities				= Lists.abilities;		// Reset Lists
					scope.prereqsProficiencies			= Lists.proficiencies;	// *
					scope.prereqsOther					= Lists.other;			// *
					scope.bonusesAbilities				= Lists.abilities;		// *
					scope.bonusesProficiencies			= Lists.proficiencies;	// *
					scope.bonusesCombat					= Lists.combat;			// *
					scope.bonusesOther					= Lists.other;			// *

					scope.displayPrereqAb				= [];					// Reset display arrays
					scope.displayPrereqProf				= [];					// *
					scope.displayPrereqsOther			= [];					// *
					scope.displayBonusAb				= [];					// *
					scope.displayBonusProf				= [];					// *
					scope.displayBonusCombat			= [];					// *
					scope.displayBonusOther				= [];					// *
					
					scope.newData.prereqs				= {};					// Reset the data-to-be-posted objects
					scope.newData.bonuses				= {};					// *

					scope.newData.prereqs.proficiencies	= [];					// Sets the data-to-be-posted arrays
					scope.newData.bonuses.proficiencies	= [];					// *

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
			}
		};
	}]);