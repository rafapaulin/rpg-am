'use strict';

angular.module('rpg').controller('skillListController', ['$scope', 'Crud', function($scope, Crud){
	var controller = $scope;

	Crud.get('skills').success(function(data){
		controller.skills = data;
	});
}]);