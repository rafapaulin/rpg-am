'use strict';
angular.module('rpg')
	.directive('classPaths', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/classes/class-paths.html',
			scope: false,
			link: function(scope, element){				
				scope.pathBonuses						= Lists.bonuses;			// Lists


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

					scope.displayPaths					= [];						// Reset display arrays

					scope.newData.paths					= [];						// Reset the data-to-be-posted arrays

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
		}
	}]);