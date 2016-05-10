'use strict';
angular.module('rpg')
	.directive('classPaths', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/classes/class-paths.html',
			scope: false,
			link: function(scope, element){				
				scope.pathBonuses						= Lists.bonuses;			// Lists
				scope.pathLanguages						= Lists.langs				// *


				scope.newData.paths						= [];						// Data-to-be-posted arrays

				scope.displayPaths						= [];						// Display arrays

			// == Pass data to newData properties on POST ========================================================================= //
				scope.$on('post', function(event, data) {							// Listen to 'post' event on controller [add-ctrl.js]
					scope.newData.paths = scope.displayPaths;						// *

				});
			// ========================================================================= Pass data to newData properties on POST == //
			
			// == Clean up on success ============================================================================================= //
				scope.$on('postSuccess', function(event, data) {					// Listen to 'postSuccess' event on controller [add-ctrl.js]
					scope.pathBonuses					= Lists.bonuses;			// Reset Lists
					scope.pathLanguages					= Lists.langs				// *

					scope.displayPaths					= [];						// Reset display arrays

					scope.newData.paths					= [];						// Reset the data-to-be-posted arrays

				});
			// ============================================================================================= Clean up on success == //

			// == Dynamic inputs ================================================================================================== //
				scope.pathBonusesInputs = [];

				scope.addInput = function(array, obj, list) {			// Add new input
					if(obj.type == 'list'){
						console.log(obj);
					} else {
						scope[array].push(obj);
						scope[list] = scope[list].filter(function(fList){	// Remove added item from the <select>
							return fList !== obj;
						});
					}
				};

				scope.removeInput = function(array, $index, list){											// Remove input/added name group
					console.log(scope[array][$index]);
					scope[list].push(scope[array][$index]);
					scope[array].splice($index,1);
				};
			// ================================================================================================== Dynamic inputs == //

				scope.addNewPath = function(newPath) {
					scope.newData.paths.push(newPath);
					scope.newPath = {};
				};

				scope.meh = function(a){console.log(a)};

			}
		}
	}]);