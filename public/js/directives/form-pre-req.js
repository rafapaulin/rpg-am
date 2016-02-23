'use strict';
angular.module('rpg')
	.directive('preReq', ['$routeParams', function($routeParams){
		var collection = $routeParams.collection; 				// Get the collection name from URL

		return {
			restrict: 'E',
			templateUrl: '/templates/form-pre-req.html',
			scope: false,
			link: function(scope, element){
				scope.showMinStr = false;

				scope.add = function(obj){					
				};
			}
		};
	}]);

		// 	controller.addProf = function(){
		// 	controller.proficiencies.push(controller.prof);
		// 	controller.prof = '';
		// };
		// controller.removeProf = function($index) {
		// 	controller.proficiencies.splice($index, 1);
		// };
		// controller.addPreReq = function(){
		// 	controller. = true;
		// };