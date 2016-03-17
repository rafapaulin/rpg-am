'use strict';
angular.module('rpg')
	.directive('physicalCharacteristics', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/characters/physical-characteristics.html',
			scope: false,
			link: function(scope, element){
			// == Properties set up =============================================================================================== //
				scope.hairColors	= Lists.hairColors;
				scope.eyeColors		= Lists.eyeColors;
				scope.skinColors	= Lists.skinColors;
				scope.alignments	= Lists.alignments;
				scope.lengthUnits	= Lists.lengthUnits;
				scope.weightUnits	= Lists.weightUnits

				scope.height		= '0';
				scope.weight		= '0';
				scope.heightUnit	= {};
				scope.weightUnit	= {};
			// =============================================================================================== Properties set up == //

				scope.$on('post', function(event, data){										// Listen to 'post' event on controller [add-ctrl.js]
					scope.newData.height = parseInt(scope.height) * scope.heightUnit.toMeter;
					scope.newData.weight = parseInt(scope.weight) * scope.weightUnit.toKg;
				});

				scope.meh = function(a){
					console.log(a);
				}
			}
		}
	}]);