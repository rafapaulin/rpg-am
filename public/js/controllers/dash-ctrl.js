'use strict';

angular.module('rpg').controller('dashboardController', ['$scope', 'Crud', '$routeParams', '$sce', '$location', function($scope, Crud, $routeParams, $sce, $location){
	var controller = $scope;

	Crud.get('dashboard')
		.then(function(res){					// Front end GET request
			controller.data = res.data;
			controller.data.desc = $sce.trustAsHtml(controller.data.desc);	// Renders the html format in the descriptions
		})
		.catch(function(res){
			if(res.status == 401 && confirm(res.data.message)){
				$location.path('users/new');
			}
		});
}]);