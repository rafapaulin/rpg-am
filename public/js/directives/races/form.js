'use strict';
angular.module('rpg')
	.directive('raceFormInputs', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/form/race.html',
			scope: false,
			link: function(scope, element){
			// == Properties set up =============================================================================================== //
				scope.langs = Lists.langs;

				scope.nameInputs	= [];
				scope.displayNames	= [];
				scope.displayLangs	= [];

				scope.details = null;

				scope.newData.commonNames = [];
			// =============================================================================================== Properties set up == //


				scope.addInput = function(array) {
					scope[array].push({});
				};

				scope.removeInput = function(array, $index){
					array.splice($index,1);
				};

				scope.newGroup = function(array){
					var namesArray = [];

					for (var i = 0; i < array.length; i++) {
						namesArray.push(array[i].name);
					};
					scope.displayNames.push({
						'group': scope.groupName,
						'namesList': namesArray
					});
					scope.nameInputs = [];
					scope.groupName = null;
				}


				scope.addItem = function(obj, display, list){						// Add item to display array and object/array-to-be-posted
					obj.details = scope.details;
					display.push(obj);

					scope[list] = scope[list].filter(function(fList){				// Remove added item from the <select>
						return fList !== obj;
					});
				};



				scope.removeItem  = function($index, display, toSave, group, list){	// Remove item from display array and from object-to-be-posted
					if(display[$index].subObj){										// Check if object is a subobject or not (based on the relevant schema)
						scope.newData[toSave][group].splice($index,1);				// Remove item from array-to-be-posted if subobject
					} else {
						delete scope.newData[toSave][display[$index].ngModel];		// Remove item from object-to-be-posted if not subobject
					};

					scope[list].push(display[$index]);								// Add removed item back to the <select>
					display.splice($index,1);										// Remove item from display array from object-to-be-posted
				}

				scope.meh = function(a){
					console.log(a);
				}
			}
		}
	}]);