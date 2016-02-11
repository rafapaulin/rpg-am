'use strict';

angular.module('rpg').controller('skillListController', ['$scope', '$sce', 'Crud', function($scope, $sce, Crud){
	var controller = $scope;

	Crud.get('skills').success(function(data){
		controller.skills = data;
	});
}]);