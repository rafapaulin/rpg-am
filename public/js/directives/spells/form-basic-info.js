'use strict';
angular.module('rpg')
	.directive('spellBasicInfo', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/form/spells/basic-info.html',
			scope: false,
			link: function(scope, element){
			// == Properties set up =============================================================================================== //
				scope.newData.schools = [];								// Sets up the data-to-be-postes variable
				scope.newData.components = [];							// Sets up the data-to-be-postes variable
				scope.newData.savings = [];								// Sets up the data-to-be-postes variable

				scope.schools = Lists.schools;							// Define property to use on HTML
				scope.components = Lists.components;					// Define property to use on HTML
				scope.savings = Lists.savings;							// Define property to use on HTML

				scope.$on('post', function(event, data){				// Listen to POST success on controller [add-ctrl.js]
					scope.schools = Lists.schools;						// Reset List
					scope.components = Lists.components;				// Reset List
					scope.savings = Lists.savings;						// Reset List
				});
			// =============================================================================================== Properties set up == //

				scope.addItem = function(obj, array, group){
					array.push(obj);									// Add item to array-to-be-posted
					scope[group] = scope[group].filter(function(list){	// Remove added item from the <select>
						return list !== obj;
					});
				};
				scope.removeItem  = function($index, group){			// Remove item to array-to-be-posted
					scope[group].push(scope.newData[group][$index]);	// Add removed item back to the <select>
					scope.newData[group].splice($index,1);
				}
			}
		};
	}]);