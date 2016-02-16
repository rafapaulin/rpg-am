'use strict';

angular.module('rpg').controller('addController', ['$scope', 'Crud', '$routeParams', function($scope, Crud, $routeParams){
	var controller = $scope,
		collection = $routeParams.collection;

	controller.save = function(data){
		controller.errors = null;

		Crud.post(collection , data)

			.then(function(res){
				controller.success = res.data.message
				console.log('gravou!')
			})

			.catch(function(data){
				var errors = [];

				for(var key in data.data) {
					errors.push(data.data[key].message);
				};
				controller.errors = errors;
			});

		console.log(data); // Debug
		controller.newData = {};
	}
}]);