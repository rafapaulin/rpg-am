'use strict';
angular.module('rpg')
	.directive('characterInfo', ['Lists', 'Crud', function(Lists, Crud){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/characters/general-info.html',
			scope: false,
			link: function(scope, element){

			// == GET the relevant relative documents ============================================================================= //
				Crud.get('races')							// Front end GET request
				.then(function(races){
					scope.races = races.data;				// Set list property to html use on <select>
				})
				.catch(function(err) {
					console.log(err);
				});

				Crud.get('backgrounds')						// Front end GET request
				.then(function(backgrounds){
					scope.backgrounds = backgrounds.data;	// Set list property to html use on <select>
				})
				.catch(function(err) {
					console.log(err);
				});

				Crud.get('classes')							// Front end GET request
				.then(function(classes){
					scope.classes = classes.data;			// Set list property to html use on <select>
				})
				.catch(function(err) {
					console.log(err);
				});
			// ============================================================================= GET the relevant relative documents == //

				scope.meh = function(a){
					console.log(a);
				}
			}
		}
	}]);