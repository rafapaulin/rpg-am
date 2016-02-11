'use strict';

angular.module('rpg').controller('addSkillController', ['$scope', 'Crud', function($scope, Crud){
	var controller = $scope;

	controller.save = function(data){
		controller.errors = null;

		Crud.post('skills', data)
			.catch(function(data){
				controller.errors = data.data.error;
			});

		console.log(data); // Debug
		controller.newSkill = {};
	}
}]);