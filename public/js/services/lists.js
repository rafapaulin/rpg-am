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
			],
			'lengthUnits': [
				{'name':'Inches',		'system': 'Imperial',	'toMetter':},
				{'name':'Feets',		'system': 'Imperial',	'toMetter':},
				{'name':'Miles',		'system': 'Imperial',	'toMetter':0.3048},
				{'name':'Centimeters',	'system': 'Metric',		'toMetter':0.01},
				{'name':'Meters',		'system': 'Metric',		'toMetter':1},
				{'name':'Kilometers',	'system': 'Metric',		'toMetter':1000},
				{'name':'Touch', 		'system': 'Special',	'toMetter':0},
			]
		};
	});