'use strict';

angular.module('rpg').controller('skillListController', function($http){
	var controller = this;
	$http({method: 'GET', url: '/skills'}).success(function(data){
		controller.skills = data;
	});
});