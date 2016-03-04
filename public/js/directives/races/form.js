'use strict';
angular.module('rpg')
	.directive('raceFormInputs', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/form/race.html',
			scope: false,
			link: function(scope, element){
			// == Properties set up =============================================================================================== //
				scope.langs 				= Lists.langs;
				scope.lengthUnits			= Lists.lengthUnits;
				scope.weightUnits			= Lists.weightUnits;

				scope.nameInputs			= [];
				scope.displayNames			= [];
				scope.displayLangs			= [];

				scope.details				= null;

				scope.newData.speed			= {};
				scope.newData.age			= {};
				scope.newData.physical		= {};

				scope.newData.commonNames	= [];
			// =============================================================================================== Properties set up == //

			// == Pass data to newData properties on POST ========================================================================= //
				scope.$on('post', function(event, data) {										// Listen to 'post' event on controller [add-ctrl.js]
					scope.newData.commonNames	= scope.displayNames;							// Set the array-to-be-posted with the value of the correspondent array
					scope.newData.languages		= scope.displayLangs;							// *

					newData.speed.base			= scope.baseSpeed * scope.sLengthUnit.toMeter;	// Convert and store length as meters
					newData.physical.avgHeight	= scope.avgHeight * scope.phLengthUnit.toMeter;	// *
					newData.physical.avgWeight	= scope.avgWeight * scope.phWeightUnit.toKg;	//*

				});
			// ========================================================================= Pass data to newData properties on POST == //

				scope.addInput = function(array) {
					scope[array].push({});
				};

				scope.removeInput = function(array, $index){
					array.splice($index,1);
				};

				scope.newGroup = function(array, display){
					var namesArray = [];

					for (var i = 0; i < array.length; i++) {
						namesArray.push(array[i].name);
					};
					scope[display].push({
						'group': scope.groupName,
						'namesList': namesArray
					});
					scope.nameInputs = [];
					scope.groupName = null;
				}


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

				scope.meh = function(){
					console.log(scope.avgWeight * scope.phWeightUnit.toKg);
				}
			}
		}
	}]);