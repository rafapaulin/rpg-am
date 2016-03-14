'use strict';
angular.module('rpg')
	.directive('abilityScores', ['Lists', 'Crud', function(Lists, Crud){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/characters/ability-scores.html',
			scope: false,
			link: function(scope, element, attr){
			// == Properties set up =============================================================================================== //
				scope.abilityModel = '';
			// =============================================================================================== Properties set up == //

				scope.randomize = function(array = [15,14,13,12,10,8]){
					var scores = ['strScore', 'dexScore', 'conScore', 'intScore', 'wisScore', 'chaScore'];

					if(typeof array !== 'array' && array.length !== 6){
						console.log('Provided value is not a valid abilities array. Using defaut values [15,14,13,12,10,8]');
						var array = [15,14,13,12,10,8]
					}

					var i = array.length;
					while(i !== 0){
						var ability	= scores[Math.floor(Math.random() * scores.length)];
						var score	= array[Math.floor(Math.random() * array.length)];

						scope[ability] = score;
						
						scores.splice(scores.indexOf(ability),1);
						array.splice(array.indexOf(score),1);

						i = array.length;
					}
				}

				scope.setScoreArray = function(array = [15,14,13,12,10,8]){
					if(typeof array !== 'array' && array.length !== 6){
						console.log('Provided value is not a valid abilities array. Using defaut values [15,14,13,12,10,8]');
						var array = [15,14,13,12,10,8]
					}
					scope.selectScoreArray = array;

					scope.strScore = undefined;
					scope.strScore = undefined;
					scope.dexScore = undefined;
					scope.conScore = undefined;
					scope.intScore = undefined;
					scope.wisScore = undefined;
					scope.chaScore = undefined;
				};

				scope.meh = function(){
					console.log('str: ' + scope.strScore + '\ndex: ' + scope.dexScore + '\ncon: ' + scope.conScore + '\nint: ' + scope.intScore + '\nwis: ' + scope.wisScore + '\ncha: ' + scope.chaScore);
				}
			}
		}
	}]);