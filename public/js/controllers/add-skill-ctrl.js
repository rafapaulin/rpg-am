'use strict';

angular.module('rpg').controller('addSkillController', ['$scope', 'Crud', function($scope, Crud){
	var controller = $scope;
	
	controller.newSkill = {};

	controller.save = function(skill){
		controller.errors = null;

		Crud.post('skills', controller.newSkill)
			.catch(function(skill){
				controller.errors = skill.data.error;
			});

		console.log(controller.newSkill); // Debug
		controller.newSkill = {};
	}
}]);