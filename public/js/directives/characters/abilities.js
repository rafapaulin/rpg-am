'use strict';
angular.module('rpg')
	.directive('abilityScores', ['Lists', 'Crud', function(Lists, Crud){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/characters/ability-scores.html',
			scope: false,
			link: function(scope, element, attr){
			// == Properties set up and resets ==================================================================================== //
				scope.abilityModel	= '';			// HTML variables
				scope.rolledValues	= {};			// *
				scope.resultedScore	= {};			// *
				scope.sumRolls		= {};			// *
				scope.showRolls		= false;		// *
				scope.rolledScores	= [];			// *
				scope.scores		= {};			// *
				scope.pointsPool	= 0;			// *

				scope.redefine = function(){		// Reset values when changing ability scores mode
					scope.scores		= {};		// *
					scope.rolledScores	= [];		// *
					scope.rolledValues	= {};		// *
					scope.resultedScore	= {};		// *
					scope.sumRolls		= {};		// *
					scope.showRolls		= false;	// *
					scope.rolledScores	= [];		// *
					scope.scoreCosts	= {};		// *
				}

				scope.resetRadios = function(){		// Reset radio buttons position
					scope.scores = {};				// *
				};
			// ==================================================================================== Properties set up and resets == //

			// == Pass data to newData properties on POST ========================================================================= //
				scope.$on('post', function(event, data) {		// Listen to 'post' event on controller [add-ctrl.js]
					var ability;

					if(scope.abilityModel == 'setScores' || scope.abilityModel == 'scoreRoll'){							// Values on radio buttons has a $index as sufix. need to remove before post
						for(ability in scope.scores) {
							scope.scores[ability] = scope.scores[ability].slice(0,scope.scores[ability].indexOf('-'));	// Chop off the '-' and all characters after it from the value 
						}
					};

					scope.newData.str = scope.scores.strScore;	// Get the score and set it to the data-to-be-POSTed object
					scope.newData.dex = scope.scores.dexScore;	// *
					scope.newData.con = scope.scores.conScore;	// *
					scope.newData.int = scope.scores.intScore;	// *
					scope.newData.wis = scope.scores.wisScore;	// *
					scope.newData.cha = scope.scores.chaScore;	// *

					// Above must be this way because of the reset radio buttons function
				});
			// ========================================================================= Pass data to newData properties on POST == //

			// == Clean up on success ============================================================================================= //
				scope.$on('postSuccess', function(event, data) {	// Listen to 'postSuccess' event on controller [add-ctrl.js]
					scope.abilityModel	= '';						// Variables clean up after success POST
					scope.rolledValues	= {};						// *
					scope.resultedScore	= {};						// *
					scope.sumRolls		= {};						// *
					scope.showRolls		= false;					// *
					scope.rolledScores	= [];						// *
					scope.scores		= {};						// *
					scope.pointsPool	= 0;						// *
				});
			// ============================================================================================= Clean up on success == //

			// == Randomized scores system ======================================================================================== //
				scope.randomize = function(array = [15,14,13,12,10,8]){											// Randomize scores function with default socres array values
					var abilities = ['strScore', 'dexScore', 'conScore', 'intScore', 'wisScore', 'chaScore'],	// Abilities names array
							 i = array.length;

					if(typeof array !== 'array' || array.length !== 6){											// Validate array provided. If invalid, alert user and use default values
						console.log('Provided value is not a valid abilities array.');
						console.log('Using defaut values [15,14,13,12,10,8]');
						var array = [15,14,13,12,10,8]															// Default array
					}

					while(i !== 0){																				// Randomizer
						var ability	= abilities[Math.floor(Math.random() * abilities.length)];					// Get a ability name from abilities array
						var score	= array[Math.floor(Math.random() * array.length)];							// Get a value  from scores array

						scope.scores[ability] = score;															// Set selected ability with selected value
						
						abilities.splice(abilities.indexOf(ability),1);											// Remove used ability name from abilities array
						array.splice(array.indexOf(score),1);													// Remove used score from scores array

						i = array.length;																		// Repeat until arrays are empty
					}
				}
			// ====================================================================================== Randomized scores system ==== //

			// == Select scores system =========================================================================================== //
				scope.setScoreArray = function(array = [15,14,13,12,10,8]){
					if(typeof array !== 'array' || array.length !== 6){
						console.log('Provided value is not a valid abilities array.');
						console.log('Using defaut values [15,14,13,12,10,8]');
						var array = [15,14,13,12,10,8]
					}
					scope.selectScoreArray = array;
				};
			// =========================================================================================== Select scores system == //

			// == d6 rolls system =============================================================================================== //
				scope.roll = function(scores = 6, rolls = 4){
					if(typeof scores !== 'number' || scores < 6){									// Validate array provided
						console.log('Provided value is not valid. Rolling 6 scores');				// If invalid, alert user and use default value
						var scores = 6;																// Default value
					}

					if(typeof rolls !== 'number' || rolls < 4){										// Validate array provided
						console.log('Provided value is not valid. Rolling 4 times for each score');	// If invalid, alert user and use default value
						var rolls = 6;																// Default value
					}

					scope.showRolls		=	true;

					scope.rolledScores	=	[];

					var d6				=	[1,2,3,4,5,6],											// d6 roll values array
						i				=	1,														// Control variable
						i2				=	1,														// Control variable
						i3				=	1,														// Control variable
						maxOfArray 		=	function (array) {										// Get higher value of a given array
												return Math.max.apply(null, array);
											};

					while(i <= scores){																// Generate the abilities scores
						scope.rolledValues[i]	= [];

						var resultedScore		= 0,												// Reset variables
							values				= [];												// *

						while(i2 <= rolls){															// Generate array of random d6's rolls
							values.push( d6[Math.floor(Math.random() * d6.length)] );
							i2++
						};

						for(var i4 in values) {														// Defines the HTML array with the scores rolled
							scope.rolledValues[i].push(values[i4]);
						};

						while(i3 <= 3){																// Get the top 3 d6 roll from each array, ignoring lower rolls
							resultedScore += maxOfArray(values);									// Sum the top roll of current array
							values.splice( values.indexOf( maxOfArray(values) ), 1 );				// Remove top value from current array
							i3++
						};

						scope.sumRolls[i] = resultedScore;											// Defines the scope property with the sum of the top 3 rolls
						scope.rolledScores.push(scope.sumRolls[i]);									// Generates a score list array

						i2 = 1;
						i3 = 1;
						i++;
					};
				};
			// =============================================================================================== d6 rolls system == //

			// == Point buy system ============================================================================================== //
				scope.pointBuy = function(pool = 40){					// Set Points buy default scores, costs an points pool
					scope.pointsPool = pool;							// Define the HTML representant of the points pool

					scope.scores.strScore = 8;							// Set initial abilities scores to minimum allowed
					scope.scores.dexScore = 8;							// *
					scope.scores.conScore = 8;							// *
					scope.scores.intScore = 8;							// *
					scope.scores.wisScore = 8;							// *
					scope.scores.chaScore = 8;							// *
					
					scope.scoreCosts.strScore = 0;						// Set initial point costs to 0
					scope.scoreCosts.dexScore = 0;						// *
					scope.scoreCosts.conScore = 0;						// *
					scope.scoreCosts.intScore = 0;						// *
					scope.scoreCosts.wisScore = 0;						// *
					scope.scoreCosts.chaScore = 0;						// *
				};

				scope.evalScores = function(ngModel){					// Evaluates the score cost in points for each ability
					scope.scoreCosts[ngModel] = 0;						// Set up initial cost
					var cost = 0;										// *

					for(var i = 9; i <= scope.scores[ngModel]; i++){	// Get de modifier of scores, and set them as points cost
						if(Math.floor((i - 10) / 2) < 1){				// Set the cost to 1, if modifier is less than 1
							cost = 1;
						} else {										// Set the cost as the ability modifier if grather than or equal to 1
							cost = Math.floor((i - 10) / 2);
						};
						scope.scoreCosts[ngModel] += cost;				// Set the HTML variable to the current ability cost
					}
				}
			// ===================================================================================================== Point buy == //
				scope.meh = function(a){
					console.log(a);
				}
			}
		}
	}]);