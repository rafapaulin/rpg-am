'use strict';
angular.module('rpg')
	.directive('raceFormInputs', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/form/race.html',
			scope: false,
			link: function(scope, element){
				scope.names = [];
				scope.newData.commonNames = [];

				scope.addName = function() {
					scope.names.push({});
				};
				scope.remove = function(array, $index){
					console.log(array + '   ' + $index)
					array.splice($index,1);
				};

				// scope.remove = function() {
				// 	scope.names.splice(scope.names.length-1);
				// };
				scope.newGroup = function(array){
					var namesArray = [];
					for (var i = 0; i < array.length; i++) {
						namesArray.push(array[i].name);
					};
					scope.newData.commonNames.push({
						'group': scope.groupName,
						'namesList': namesArray
					});
					scope.names = [];
					scope.groupName = null;
				}

				scope.meh = function(a){
					console.log(a);
				}
			}
		}
	}]);