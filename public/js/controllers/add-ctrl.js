'use strict';

angular.module('rpg').controller('addController', ['$scope', 'Crud', '$routeParams', function($scope, Crud, $routeParams){
	var controller = $scope,
		collection = $routeParams.collection;

	controller.collection = collection;						// Define property to use on HTML

	controller.save = function(data){						// Save function
		controller.errors = null;

		Crud.post(collection , data)						// Front end POST request
			.then(function(res){							// Success response to user
				controller.success = res.data.message
				console.log('gravou!')
			})
			.catch(function(res){							// Error response to user
				var errors = [];
				for(var key in res.data) {
					errors.push(res.data[key].message);
				};
				controller.errors = errors;
			});

		controller.newData = null;							// Variable clean up
	}
}]);