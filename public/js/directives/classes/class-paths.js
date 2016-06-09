'use strict';
angular.module('rpg')
	.directive('classPaths', ['Lists', 'Crud', 'Fn', function(Lists, Crud, Fn){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/classes/class-paths.html',
			scope: false,
			link: function(scope, element){
				Fn.setScope(scope);

				scope.newData.paths							= [];						// Data-to-be-posted arrays
				var listsSkills,
					listsSpells;

				scope.resetPathsScope = function(){
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

				scope.resetPathsScope();

				Crud.get('skills').then(function(res){
					listsSkills = res.data;
					scope.pathSkills						= listsSkills;				// Set List
				});

				Crud.get('spells').then(function(res){
					listsSpells = res.data;
					scope.pathSpells						= listsSpells;				// Set List
				});

			// == Scope functions ================================================================================================= //
				scope.toArray		= Fn.toArray;
				scope.removeItem	= Fn.removeItem;
			// ================================================================================================= Scope functions == //
			
			// == Clean up on success ============================================================================================= //
				scope.$on('postSuccess', function(event, data) {				// Listen to 'postSuccess' event on controller [add-ctrl.js]
					scope.resetPathsScope();									// Reset  temporary objects
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