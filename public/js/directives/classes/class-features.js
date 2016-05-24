'use strict';
angular.module('rpg')
	.directive('classFeatures', ['Lists', 'Crud', function(Lists, Crud){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/classes/class-features.html',
			scope: false,
			link: function(scope, element){
				scope.newData.features						= [];						// Data-to-be-posted arrays
				var listsSkills,
					listsSpells,

					resetScope = function(){
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

				resetScope();

				Crud.get('skills').then(function(res){
					listsSkills = res.data;
					scope.featureSkills						= listsSkills;				// Set List
				});

				Crud.get('spells').then(function(res){
					listsSpells = res.data;
					scope.featureSpells						= listsSpells;				// Set List
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


				scope.addNewFeature = function(newFeature) {
					scope.newData.features.push(newFeature);					// Add the feature to the data-to-be-posted array
					resetScope();												// Reset  temporary objects
				};
			// ================================================================================================= Scope functions == //
			
			// == Clean up on success ============================================================================================= //
				scope.$on('postSuccess', function(event, data) {				// Listen to 'postSuccess' event on controller [add-ctrl.js]
					resetScope();												// Reset  temporary objects
					scope.newData.features						= [];			// Reset the data-to-be-posted array
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