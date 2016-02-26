'use strict';
angular.module('rpg')
	.directive('spellBasic', function(){

		return {
			restrict: 'E',
			templateUrl: '/templates/form-basic.html',
			scope: false,
			link: function(scope, element){
				scope.newData.schools = [];

				scope.schoolsList = [
					'Abjuration',
					'Conjuration',
					'Divination',
					'Enchantment',
					'Evocation',
					'Illusion',
					'Necromancy',
					'Transmutation'
				];

				scope.newData.components = [];
				scope.componentsList = [
					'Material',
					'Verbal',
					'Somatic'
				];

				scope.addItem = function(obj, array, group){
					array.push(obj);

					group = group.filter(function(list){
						return list !== obj;
					});

				};
				scope.removeItem  = function($index, group){
					group.push(scope.newData.schools[$index]);
					scope.newData.schools.splice($index,1);
					console.log(scope.newData.schools);
				}
			}
		};
	});


			// 'save': {'type': String, 'minlength': 3, 'default': ''},
			// 'components': [
			// 	{
			// 		'name': String,	// Verbal, Somatic, Material
			// 		'desc': String
			// 	}
			// ],
