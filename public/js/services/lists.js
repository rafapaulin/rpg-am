'use strict';
angular.module('rpg')
	.factory('Lists', function ListsFactory() {
		return {
			'schools': [
				'Abjuration',
				'Conjuration',
				'Divination',
				'Enchantment',
				'Evocation',
				'Illusion',
				'Necromancy',
				'Transmutation'
			],
			'components': [
				{'name':'Material', 'desc':''},
				{'name':'Verbal'},
				{'name':'Somatic'}
			],
			'savings':[
				{'name':'Strength',		'desc':''},
				{'name':'Dexterity',	'desc':''},
				{'name':'Constitution',	'desc':''},
				{'name':'Intelligence',	'desc':''},
				{'name':'Wisdom',		'desc':''},
				{'name':'Charisma',		'desc':''}
			]
		};
	});