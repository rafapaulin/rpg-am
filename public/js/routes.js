'use strict';

angular.module('rpg').config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/views/index.html'
		})
		.when('/skills', {
			templateUrl: '/views/skills/list.html',
			controller: 'skillListController',
			controllerAs: 'skillList'
		})
		.when('/skills/new', {
			templateUrl: '/views/skills/add.html',
			controller: 'addSkillController',
			controllerAs: 'addSkill'
		})
});