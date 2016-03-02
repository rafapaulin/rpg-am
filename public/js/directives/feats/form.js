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

			// == Clean up on success ============================================================================================= //
				scope.$on('postSuccess', function(event, data) {				// Listen to 'postSuccess' event on controller [add-ctrl.js]
					scope.prereqsAbilities				= Lists.abilities;		// Reset Lists
					scope.prereqsProficiencies			= Lists.proficiencies	// *
					scope.prereqsOther					= Lists.other			// *
					scope.bonusesAbilities				= Lists.abilities;		// *
					scope.bonusesProficiencies			= Lists.proficiencies	// *
					scope.bonusesCombat					= Lists.combat			// *
					scope.bonusesOther					= Lists.other			// *

					scope.displayPrereqAb				= [];					// Reset display arrays
					scope.displayPrereqProf				= [];					// *
					scope.displayPrereqsOther			= [];					// *
					scope.displayBonusAb				= [];					// *
					scope.displayBonusProf				= [];					// *
					scope.displayBonusCombat			= [];					// *
					scope.displayBonusOther				= [];					// *
					
					scope.newData.prereqs				= {};					// Reset the data-to-be-postes object
					scope.newData.bonuses				= {};					// *

					scope.newData.prereqs.proficiencies	= [];					// Sets the data-to-be-postes array
					scope.newData.bonuses.proficiencies	= [];					// *

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