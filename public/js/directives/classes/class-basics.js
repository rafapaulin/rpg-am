'use strict';
angular.module('rpg')
	.directive('classBasics', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/classes/class-basics.html',
			scope: false,
			link: function(scope, element){
				scope.newData.bonuses					= {};						// Data-to-be-posted objects
				scope.newData.bonuses.proficiencies		= [];						// Data-to-be-posted arrays
				scope.bonusesProficiencies				= Lists.proficiencies;		// Lists
				scope.displayBonusProf					= [];						// Display arrays

			// == Pass data to newData properties on POST ========================================================================= //
				scope.$on('post', function(event, data) {							// Listen to 'post' event on controller [add-ctrl.js]
					console.log(scope.displayBonusProf);
					scope.newData.proficiencies = scope.displayBonusProf;			// *
				});
			// ========================================================================= Pass data to newData properties on POST == //
			
			// == Clean up on success ============================================================================================= //
				scope.$on('postSuccess', function(event, data) {					// Listen to 'postSuccess' event on controller [add-ctrl.js]
					scope.bonusesProficiencies			= Lists.proficiencies;		// Reset Lists
					scope.displayBonusProf				= [];						// Reset display arrays
					scope.newData.bonuses				= {};						// Reset the data-to-be-posted objects
					scope.newData.proficiencies	= [];								// Reset the data-to-be-posted arrays

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