'use strict';
angular.module('rpg')
	.directive('spellBasic', function(){

		return {
			restrict: 'E',
			templateUrl: '/templates/form-basic.html',
			scope: false,
			link: function(scope, element){
				scope.newData.schools = [];
				scope.schoolList = [
					'Abjuration',
					'Conjuration',
					'Divination',
					'Enchantment',
					'Evocation',
					'Illusion',
					'Necromancy',
					'Transmutation'
				];

				scope.addSchool = function(obj){
					scope.newData.schools.push(obj);
					console.log(scope.newData.schools);
				
					scope.schoolList = scope.schoolList.filter(function(list){
						return list !== obj;
					});
				};
			}
		};
	});


			// 'school': [{'type': String, 'required': true, 'minlength': 3}],
			// 'save': {'type': String, 'minlength': 3, 'default': ''},
			// 'components': [
			// 	{
			// 		'name': String,	// Verbal, Somatic, Material
			// 		'desc': String
			// 	}
			// ],
