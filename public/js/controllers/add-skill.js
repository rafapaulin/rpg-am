'use strict';

angular.module('rpg').controller('addSkillController', function($http){
	var controller = this;
	this.newSkill = {};
	this.save = function(skill){
		controller.errors = null;
		$http({method: 'POST', url: '/skills', data: controller.newSkill})
			.catch(function(skill){
				controller.errors = skill.data.error;
			});
		console.log(controller.newSkill);
		controller.newSkill = {};
	}
});