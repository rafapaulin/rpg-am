'use strict';
angular.module('rpg')
	.directive('classSpells', ['Lists', 'Crud', 'Fn', function(Lists, Crud, Fn){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/classes/class-spells.html',
			scope: false,
			link: function(scope, element){
				Fn.setScope(scope);

				var listsSpells;

				scope.resetSpellsScope = function(){
					scope.newData.spellList			= {};			// Set/reset temporary objects
					scope.newData.spellList.lvl0	= [];			// *
					scope.newData.spellList.lvl1	= [];			// *
					scope.newData.spellList.lvl2	= [];			// *
					scope.newData.spellList.lvl3	= [];			// *
					scope.newData.spellList.lvl4	= [];			// *
					scope.newData.spellList.lvl5	= [];			// *
					scope.newData.spellList.lvl6	= [];			// *
					scope.newData.spellList.lvl7	= [];			// *
					scope.newData.spellList.lvl8	= [];			// *
					scope.newData.spellList.lvl9	= [];			// *

					scope.classSpells				= listsSpells;	// Set/reset Lists
				};

				scope.resetSpellsScope();

				Crud.get('spells').then(function(res){				// GET the spell list from database
					listsSpells = res.data;
					scope.classSpells = listsSpells;				// Set spell List dropdown options
				});

			// == Scope functions ================================================================================================= //
				scope.toArray		= Fn.toArray;
				scope.removeItem 	= Fn.removeItem;

				scope.lengthCheck = function() {
					for(var key in scope.newData.spellList) {
						if(scope.newData.spellList[key].length > 0) return true;
					}
					return false
				}
			// ================================================================================================= Scope functions == //
			
			// == Clean up on success ============================================================================================= //
				scope.$on('postSuccess', function(event, data) {	// Listen to 'postSuccess' event on controller [add-ctrl.js]
					scope.resetSpellsScope();						// Reset the data-to-be-posted array
				});
			// ============================================================================================= Clean up on success == //
			}
		}
	}]);