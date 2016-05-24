'use strict';
angular.module('rpg')
	.directive('classPaths', ['Lists', 'Crud', function(Lists, Crud){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/classes/class-paths.html',
			scope: false,
			link: function(scope, element){
				scope.newData.paths							= [];						// Data-to-be-posted arrays
				var listsSkills,
					listsSpells,

					resetScope = function(){
					scope.pathSkills						= listsSkills;				// Set/reset Lists
					scope.pathSpells						= listsSpells;				// *
					scope.pathBonuses						= Lists.bonuses;			// *
					scope.pathLanguages						= Lists.langs				// *
					scope.pathProficiencies					= Lists.proficiencies		// *
					scope.pathResistances					= Lists.dmgTypes			// *

					scope.newPath							= {};						// Set/reset temporary objects
					scope.newPath.bonuses					= {};						// *
					scope.pathSelects						= {};						// *
					scope.pathBonusesInputs					= [];						// *
					scope.newPath.bonuses.languages			= [];						// *
					scope.newPath.bonuses.proficiencies		= [];						// *
					scope.newPath.bonuses.dmgResistances	= [];						// *
					scope.newPath.bonuses.skills			= [];						// *
					scope.newPath.bonuses.spells			= [];						// *
				};

				resetScope();

				Crud.get('skills').then(function(res){
					listsSkills = res.data;
					scope.pathSkills						= listsSkills;				// Set List
				});

				Crud.get('spells').then(function(res){
					listsSpells = res.data;
					scope.pathSpells						= listsSpells;				// Set List
				});

			// == Scope functions ================================================================================================= //
				scope.toArray = function(obj, array, list, extra) {
					if(extra) list = extra + list;

					scope[list] = scope[list].filter(function(fList){			// Remove added item from the <select>
						return fList !== obj;
					});
					array.push(obj);											// Add item to the array
				}

				scope.removeItem  = function($index, array, list, extra){
					if(extra) list = extra + list;
					scope[list].push(array[$index]);							// Add removed item back to the <select>
					array.splice($index,1);										// Remove item from display array
				}


				scope.addNewPath = function(newPath) {
					scope.newData.paths.push(newPath);							// Add the path to the data-to-be-posted array
					resetScope();												// Reset  temporary objects
				};
			// ================================================================================================= Scope functions == //
			
			// == Clean up on success ============================================================================================= //
				scope.$on('postSuccess', function(event, data) {				// Listen to 'postSuccess' event on controller [add-ctrl.js]
					resetScope();												// Reset  temporary objects
					scope.newData.paths						= [];				// Reset the data-to-be-posted array
				});
			// ============================================================================================= Clean up on success == //


				scope.meh = function(a){
					console.log(a);
				};
				scope.logNewData = function(){
					console.log(scope.newData)
				}
			}
		}
	}]);