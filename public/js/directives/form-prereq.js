'use strict';
angular.module('rpg')
	.directive('preReq', ['$routeParams', function($routeParams){
		var collection = $routeParams.collection; 				// Get the collection name from URL

		return {
			restrict: 'E',
			templateUrl: '/templates/form-pre-req.html',
			scope: false,
			link: function(scope, element){
				

				scope.prereqList = [
					{'type':'number',	'ngModel':'minStr',					'cat':'Abilities',		'name':'Min. Strength'},
					{'type':'number',	'ngModel':'minDex',					'cat':'Abilities',		'name':'Min. Dexterity'},
					{'type':'number',	'ngModel':'minCon',					'cat':'Abilities',		'name':'Min. Constitution'},
					{'type':'number',	'ngModel':'minInt',					'cat':'Abilities',		'name':'Min. Intelligence'},
					{'type':'number',	'ngModel':'minWis',					'cat':'Abilities',		'name':'Min. Wisdow'},
					{'type':'number',	'ngModel':'minCha',					'cat':'Abilities',		'name':'Min. Charisma'},
					{'type':'text',		'ngModel':'proficiences[$index]',	'cat':'Proficiences',	'name':'Light Armor'},
					{'type':'text',		'ngModel':'proficiences[$index]',	'cat':'Proficiences',	'name':'Medium Armor'},
					{'type':'text',		'ngModel':'proficiences[$index]',	'cat':'Proficiences',	'name':'HEavy Armor'},
					{'type':'checkbox',	'ngModel':'spellCaster',			'cat':'Other',			'name':'Is Spellcaster?'}
				];
				scope.add = function(obj){
					scope.prerequisites.push(obj);
					console.log(scope.prerequisites);
				};
			}
		};
	}]);
