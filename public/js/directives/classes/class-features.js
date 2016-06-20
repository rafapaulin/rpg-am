'use strict';
angular.module('rpg')
	.directive('classFeatures', ['Lists', 'Crud', 'Fn', function(Lists, Crud, Fn){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/classes/class-features.html',
			scope: false,
			link: function(scope, element){
				Fn.setScope(scope);

				scope.newData.features						= [];						// Data-to-be-posted arrays
				
				var listsSkills,
					listsSpells;

				scope.resetFeaturesScope = function(){
					scope.featureSkills						= listsSkills;				// Set/reset Lists
					scope.featureSpells						= listsSpells;				// *
					scope.featureBonuses					= Lists.bonuses;			// *
					scope.featureLanguages					= Lists.langs				// *
					scope.featureProficiencies				= Lists.proficiencies		// *
					scope.featureResistances				= Lists.dmgTypes			// *

					scope.newFeature						= {};						// Set/reset temporary objects
					scope.newFeature.bonuses				= {};						// *
					scope.FeaturesSelects				 	= {};						// *
					scope.featureBonusesInputs				= [];						// *
					scope.newFeature.bonuses.languages		= [];						// *
					scope.newFeature.bonuses.proficiencies	= [];						// *
					scope.newFeature.bonuses.dmgResistances	= [];						// *
					scope.newFeature.bonuses.skills			= [];						// *
					scope.newFeature.bonuses.spells			= [];						// *
				};

				scope.resetFeaturesScope();

				Crud.get('skills').then(function(res){
					listsSkills = res.data;
					scope.featureSkills						= listsSkills;				// Set List
				});

				Crud.get('spells').then(function(res){
					listsSpells = res.data;
					scope.featureSpells						= listsSpells;				// Set List
				});

			// == Scope functions ================================================================================================= //
				scope.toArray		= Fn.toArray;
				scope.removeItem	= Fn.removeItem;
			// ================================================================================================= Scope functions == //
			
			// == Clean up on success ============================================================================================= //
				scope.$on('postSuccess', function(event, data) {				// Listen to 'postSuccess' event on controller [add-ctrl.js]
					scope.resetFeaturesScope();									// Reset  temporary objects
					scope.newData.features					= [];				// Reset the data-to-be-posted array
				});
			// ============================================================================================= Clean up on success == //
			}
		}
	}]);