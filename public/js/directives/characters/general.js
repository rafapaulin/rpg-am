'use strict';
angular.module('rpg')
	.directive('characterInfo', ['Lists', 'Crud', function(Lists, Crud){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/characters/general-info.html',
			scope: false,
			link: function(scope, element){

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