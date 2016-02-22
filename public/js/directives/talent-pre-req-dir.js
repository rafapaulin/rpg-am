'use strict';
angular.module('rpg')
	.directive('talentPreReq', ['Crud', '$routeParams', function(Crud, $routeParams){
		var collection = $routeParams.collection; 				// Get the collection name from URL

		return {
			restrict: 'E',
			templateUrl: '/templates/talent-pre-req.html',
			scope: false,
			link: function(scope, element){
					console.log(scope.newData)
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