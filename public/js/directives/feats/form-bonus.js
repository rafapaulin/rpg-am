'use strict';
angular.module('rpg')
	.directive('bonus', function(){

		return {
			restrict: 'E',
			templateUrl: '/templates/form/feats/bonus.html',
			scope: false,
			link: function(scope, element){
				
				scope.newData.bonus = {};

				scope.bonusList = [
					{'type':'number',	'ngModel':'str',			'cat':'Abilities',		'name':'Strength Bonus'},
					{'type':'number',	'ngModel':'dex',			'cat':'Abilities',		'name':'Dexterity Bonus'},
					{'type':'number',	'ngModel':'con',			'cat':'Abilities',		'name':'Constitution Bonus'},
					{'type':'number',	'ngModel':'int',			'cat':'Abilities',		'name':'Intelligence Bonus'},
					{'type':'number',	'ngModel':'wis',			'cat':'Abilities',		'name':'Wisdow Bonus'},
					{'type':'number',	'ngModel':'cha',			'cat':'Abilities',		'name':'Charisma Bonus'},
					{'type':'number',	'ngModel':'hp',				'cat':'Combat',			'name':'HP Bonus'},
					{'type':'number',	'ngModel':'initiative',		'cat':'Combat',			'name':'Initiative Bonus'},
					{'type':'number',	'ngModel':'speed',			'cat':'Combat',			'name':'Speed Bonus'},
					{'type':'number',	'ngModel':'languageSlots',	'cat':'Other',			'name':'Language Slots'}
				];
				scope.addBonus = function(obj){
					//if(obj.cat == 'Languages'){
						//scope.newData.bonus.languages.push(obj.name);
					//} else {
						scope.bonuses.push(obj);
					//}
					scope.bonusList = scope.bonusList.filter(function(list){
						return list.name !== obj.name;
					});
				};
			}
		};
	});
