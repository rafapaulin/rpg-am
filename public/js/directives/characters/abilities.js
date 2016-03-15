'use strict';
angular.module('rpg')
	.directive('abilityScores', ['Lists', 'Crud', function(Lists, Crud){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/characters/ability-scores.html',
			scope: false,
			link: function(scope, element, attr){
			// == Properties set up =============================================================================================== //
				scope.abilityModel	= '';
				scope.rolledValues	= {};
				scope.resultedScore	= {};
				scope.sumRolls		= {};
				scope.showRolls		= false;
				scope.rolledScores	= [];
			// =============================================================================================== Properties set up == //

				scope.redefine = function(){
					scope.strScore = undefined;
					scope.strScore = undefined;
					scope.dexScore = undefined;
					scope.conScore = undefined;
					scope.intScore = undefined;
					scope.wisScore = undefined;
					scope.chaScore = undefined;
				}


			// == Randomized scores system ======================================================================================== //
				scope.randomize = function(array = [15,14,13,12,10,8]){														// Randomize scores function with default socres array values
					var abilities = ['strScore', 'dexScore', 'conScore', 'intScore', 'wisScore', 'chaScore'],				// Abilities names array
							 i = array.length;

					if(typeof array !== 'array' || array.length !== 6){														// Validate array provided. If invalid, alert user and use default values
						alert('Provided value is not a valid abilities array. Using defaut values [15,14,13,12,10,8]');
						var array = [15,14,13,12,10,8]																		// Default array
					}

					while(i !== 0){																							// Randomizer
						var ability	= abilities[Math.floor(Math.random() * abilities.length)];								// Get a ability name from abilities array
						var score	= array[Math.floor(Math.random() * array.length)];										// Get a value  from scores array

						scope[ability] = score;																				// Set selected ability with selected value
						
						abilities.splice(abilities.indexOf(ability),1);														// Remove used ability name from abilities array
						array.splice(array.indexOf(score),1);																// Remove used score from scores array

						i = array.length;																					// Repeat until arrays are empty
					}
				}
			// ====================================================================================== Randomized scores system ==== //

			// == Select scores system =========================================================================================== //
				scope.setScoreArray = function(array = [15,14,13,12,10,8]){
					scope.strScore = undefined;
					scope.strScore = undefined;
					scope.dexScore = undefined;
					scope.conScore = undefined;
					scope.intScore = undefined;
					scope.wisScore = undefined;
					scope.chaScore = undefined;

					if(typeof array !== 'array' || array.length !== 6){
						console.log('Provided value is not a valid abilities array. Using defaut values [15,14,13,12,10,8]');
						var array = [15,14,13,12,10,8]
					}
					scope.selectScoreArray = array;
				};
			// =========================================================================================== Select scores system == //

			// == d6 rolls system =============================================================================================== //
				scope.roll = function(scores = 6, rolls = 4){
					if(typeof scores !== 'number' || scores < 6){								// Validate array provided
						alert('Provided value is not valid. Rolling 6 scores');					// If invalid, alert user and use default value
						var scores = 6;															// Default value
					}

					if(typeof rolls !== 'number' || rolls < 4){									// Validate array provided
						alert('Provided value is not valid. Rolling 4 times for each score');	// If invalid, alert user and use default value
						var rolls = 6;															// Default value
					}
					scope.showRolls		=	true;
					scope.rolledScores	=	[];

					var d6				=	[1,2,3,4,5,6],										// d6 roll values array
						i				=	1,													// Control variable
						i2				=	1,													// Control variable
						i3				=	1,													// Control variable
						maxOfArray 		=	function (array) {									// Get higher value of a given array
												return Math.max.apply(null, array);
											};

					while(i <= scores){															// Generate the abilities scores
						scope.rolledValues[i]	= [];

						var resultedScore		= 0,											// Reset variables
							values				= [];											// *

						while(i2 <= rolls){														// Generate array of random d6's rolls
							values.push( d6[Math.floor(Math.random() * d6.length)] );
							i2++
						};

						for(var i4 in values) {													// Defines the HTML array with the scores rolled
							scope.rolledValues[i].push(values[i4]);
						};

						while(i3 <= 3){															// Get the top 3 d6 roll from each array
							resultedScore += maxOfArray(values);								// Add the top roll of current array
							values.splice( values.indexOf( maxOfArray(values) ), 1 );			// Remove top value from current array
							i3++
						};

						scope.sumRolls[i] = resultedScore;										// Defines the scope property with the sum of the top 3 rolls
						scope.rolledScores.push(scope.sumRolls[i]);								// Generates a score list array

						i2 = 1;
						i3 = 1;
						i++;
					};
				};
			// =============================================================================================== d6 rolls system == //
				

				scope.meh = function(a){
					console.log(a);
				}
			}
		}
	}]);