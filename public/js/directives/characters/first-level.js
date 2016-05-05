'use strict';
angular.module('rpg')
	.directive('firstLevel', ['Lists', function(Lists){
	
		return {
			restrict: 'E',
			templateUrl: '/templates/characters/first-level.html',
			scope: false,
			link: function(scope, element){
			// == Properties set up =============================================================================================== //
				var level1 = {};

				scope.newData.lvlUp = [];
			// =============================================================================================== Properties set up == //

				scope.$on('post', function(event, data){		// Listen to 'post' event on controller [add-ctrl.js]
					level1.class = scope.newData.class.name;
					level1.hp = scope.newData.class.hitDice;
					level1.str = scope.newData.class.str;
					level1.dex = scope.newData.class.dex;
					level1.con = scope.newData.class.con;
					level1.int = scope.newData.class.int;
					level1.wis = scope.newData.class.wis;
					level1.cha = scope.newData.class.cha;

					scope.newData.lvlUp.push(level1);
				});

				scope.test = function(){
					level1.class = scope.newData.class.name;
					level1.hp = scope.newData.class.hitDice;
					level1.str = scope.newData.class.str;
					level1.dex = scope.newData.class.dex;
					level1.con = scope.newData.class.con;
					level1.int = scope.newData.class.int;
					level1.wis = scope.newData.class.wis;
					level1.cha = scope.newData.class.cha;

					console.log(level1);
				}

				scope.meh = function(a){
					console.log(a);
				}
			}
		}
	}]);