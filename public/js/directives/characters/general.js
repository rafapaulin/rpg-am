'use strict';
angular.module('rpg')
	.directive('characterInfo', ['Lists', 'Crud', function(Lists, Crud){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/characters/general-info.html',
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

			// == GET the relevant relative documents ============================================================================= //
				Crud.get('races').success(function(data){										// Front end GET request
					scope.races = data;															// Set list property to html use on <select>
				});
				Crud.get('backgrounds').success(function(data){									// Front end GET request
					scope.backgrounds = data;													// Set list property to html use <select>
				});
				Crud.get('classes').success(function(data){										// Front end GET request
					scope.classes = data;														// Set list property to html use <select>
				});
			// ============================================================================= GET the relevant relative documents == //


				scope.meh = function(a){
					console.log(a);
				}
			}
		}
	}]);