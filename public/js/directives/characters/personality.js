'use strict';
angular.module('rpg')
	.directive('personality', ['Lists', 'Crud', function(Lists, Crud){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/characters/personality.html',
			scope: false,
			link: function(scope, element){
			// == Properties set up =============================================================================================== //
				scope.alignments	= Lists.alignments;
			// =============================================================================================== Properties set up == //

				scope.meh = function(a){
					console.log(a);
				}
			}
		}
	}]);