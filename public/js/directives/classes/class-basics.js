'use strict';
angular.module('rpg')
	.directive('classBasics', ['Crud', 'Lists', 'Fn', function(Crud, Lists, Fn){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/classes/class-basics.html',
			scope: false,
			link: function(scope, element){
			// == Properties set up =============================================================================================== //
				Fn.setScope(scope);
				
				var listsSkills,
					listsSpells; 

				scope.resetBasicsScope = function(){
					scope.basicsSkills						= listsSkills;				// Set/reset Lists
					scope.basicsSpells						= listsSpells;				// *
					scope.basicsBonuses						= Lists.bonuses;			// *
					scope.basicsLanguages					= Lists.langs				// *
					scope.basicsProficiencies				= Lists.proficiencies		// *
					scope.basicsResistances					= Lists.dmgTypes			// *
					scope.basicsSpecialDice					= Lists.diceTypes			// *

					scope.basicsSelects			 			= {};						// *
					scope.basicBonusesInputs				= [];						// *

					scope.newData.bonuses					= {};						// Set/reset temporary objects
					scope.newData.bonuses.languages			= [];						// *
					scope.newData.bonuses.proficiencies		= [];						// *
					scope.newData.bonuses.dmgResistances	= [];						// *
					scope.newData.bonuses.skills			= [];						// *
					scope.newData.bonuses.spells			= [];						// *
				};

				scope.resetBasicsScope();

				Crud.get('skills').then(function(res){
					listsSkills = res.data;
					scope.basicsSkills					= listsSkills;				// Set skill List
				});

				Crud.get('spells').then(function(res){
					listsSpells = res.data;
					scope.basicsSpells					= listsSpells;				// Set spell List
				});

			// =============================================================================================== Properties set up == //

			// == Scope functions ================================================================================================= //
				scope.toArray		= Fn.toArray;
				scope.removeItem	= Fn.removeItem;
			// ================================================================================================= Scope functions == //

			// == Clean up on success ============================================================================================= //
				scope.$on('postSuccess', function(event, data) {					// Listen to 'postSuccess' event on controller [add-ctrl.js]
					scope.resetBasicsScope();										// Reset lists and variables
				});
			// ============================================================================================= Clean up on success == //
			}
		}
	}]);