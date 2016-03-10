angular.module('rpg')
	.filter('floor', function() {
		return function(input) {
			return Math.floor(input);
		};
	})
	.filter('names', function() {

	})