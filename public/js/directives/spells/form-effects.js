'use strict';
angular.module('rpg')
	.directive('spellEffects', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/form/spells/effects.html',
			scope: false,
			link: function(scope, element){

			// == Properties set up ================================================================================================================================= //
				scope.newData.castTime	= {};															// Sets up the data-to-be-postes variable
				scope.newData.duration	= {};															// Sets up the data-to-be-postes variable
				scope.newData.effect	= {};															// Sets up the data-to-be-postes variable

				scope.lengthUnits		= Lists.lengthUnits;											// Define property to use on HTML
				scope.timeUnits			= Lists.timeUnits;												// Define property to use on HTML
				scope.areasOfEffects	= Lists.areasOfEffects;											// Define property to use on HTML

				scope.$on('postSuccess', function(event, data){											// Listen to 'postSuccess' event on controller [add-ctrl.js]
					scope.size			= null;															// Reset <input> on POST success
					scope.size2			= null;															// Reset <input> on POST success
					scope.castTime		= null;															// Reset <input> on POST success
					scope.duration		= null;															// Reset <input> on POST success
					scope.range			= null;															// Reset <input> on POST success
				});
			// ================================================================================================================================= Properties set up == //

				scope.$on('post', function(event, data){												// Listen to 'post' event on controller [add-ctrl.js]
					scope.newData.range = scope.range * scope.rLengthUnit.toMeter;						// Convert on 'post' and store length as meters
					scope.newData.castTime.time = scope.castTime * scope.ctTimeUnit.toSeconds;			// Convert on 'post' and store time as seconds
					scope.newData.duration.max = scope.duration * scope.durTimeUnit.toSeconds;			// Convert on 'post' and store time as seconds
					scope.newData.effect.aoe = scope.aoeType.name;										// save data to variable-to-be POSTed
					scope.newData.effect.size = scope.size * scope.aoeLengthUnit.toMeter;				// Convert on 'post' and store length as meters
					scope.newData.effect.cilinderHeight = scope.size2 * scope.aoeLengthUnit.toMeter;	// Convert on 'post' and store length as meters
				});
			}
		};
	}]);