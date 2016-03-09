'use strict';
angular.module('rpg')
	.directive('characterInfo', ['Lists', 'Crud', function(Lists, Crud){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/characters/general-info.html',
			scope: false,
			link: function(scope, element){
				scope.hairColors = Lists.hairColors;
				scope.eyeColors = Lists.eyeColors;
				scope.skinColors = Lists.skinColors;
				scope.alignments = Lists.alignments;
				scope.heightUnits = Lists.heightUnits;

				Crud.get('races').success(function(data){		// Front end GET request
					scope.races = data;							// Set list property to html use
				});
				Crud.get('backgrounds').success(function(data){		// Front end GET request
					scope.backgrounds = data;							// Set list property to html use
				});
				Crud.get('classes').success(function(data){		// Front end GET request
					scope.classes = data;							// Set list property to html use
				});
				scope.newData.height = '0';
				scope.heightUnit = 0;
				scope.showHeight = scope.newData.height * scope.heightUnit.convert;

				console.log(scope.newData.height);
				console.log(scope.heightUnit.convert);

				scope.meh = function(){console.log(typeof scope.showHeight)}
			}
		}
	}]);