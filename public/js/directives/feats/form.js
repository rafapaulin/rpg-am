'use strict';
angular.module('rpg')
	.directive('featFormInputs', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/form/feat.html',
			scope: false,
			link: function(scope, element){

				scope.newData.prereqs = {};
				scope.newData.prereqs.proficiencies = [];

				scope.prereqs = Lists.prereqs;

				scope.selectedPrereqs = [];

				scope.addItem = function(obj, array, group){
					array.push(obj);									// Add item to array-to-be-posted

					if(obj.array){
						console.log(eval('scope.' + obj.ngModel));
						scope.newData.prereqs.proficiencies.push({'name': obj.name, 'cat': obj.cat,  'details': scope.details})
						scope.details = null;
					};

					scope[group] = scope[group].filter(function(list){	// Remove added item from the <select>
						return list !== obj;
					});
					scope.newPrereq = undefined;
				};

				scope.removeItem  = function($index, array, group){		// Remove item to array-to-be-posted
					scope[group].push(array[$index]);					// Add removed item back to the <select>
					array.splice($index,1);
				}


				scope.meh = function(a){
					console.log(a);
				}
			}
		};
	}]);