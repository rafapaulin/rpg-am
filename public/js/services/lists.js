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
				{'name':'Inches',		'system': 'Imperial',	'toMeter':0.0254},
				{'name':'Feets',		'system': 'Imperial',	'toMeter':0.3048},
				{'name':'Miles',		'system': 'Imperial',	'toMeter':1609.34},

				{'name':'Centimeters',	'system': 'Metric',		'toMeter':0.01},
				{'name':'Meters',		'system': 'Metric',		'toMeter':1},
				{'name':'Kilometers',	'system': 'Metric',		'toMeter':1000},

				{'name':'Touch/Self', 	'system': 'Special',	'toMeter':0}
			],
			'timeUnits': [
				{'name':'Seconds',			'system': 'Time',	'toSeconds':1},
				{'name':'Minutes',			'system': 'Time',	'toSeconds':60},
				{'name':'hours',			'system': 'Time',	'toSeconds':3600},

				{'name':'Action',			'system': 'DnD',	'toSeconds':0.1},
				{'name':'Bonus Action',		'system': 'DnD',	'toSeconds':0.01},
				{'name':'Reaction',			'system': 'DnD',	'toSeconds':0.001},
				{'name':'Rounds',			'system': 'DnD',	'toSeconds':6},
				{'name':'Instantaneous',	'system': 'DnD',	'toSeconds':0},
				{'name':'Until dspelled',	'system': 'DnD',	'toSeconds':-1}
			],
			'areasOfEffect': [
				{'name':'Cone',		'a':'Length: ',				'b':'',				'info':'A cone\'s area of effect specities its maximum length. A cone\'s width at a given point along its length is equal to that point\'s distance from the point of origin.'},
				{'name':'Cube',		'a':'Length of sides: ',	'b':'',				'info':'A cube\'s point of origin lies anywhere on a face of the cubic effect. The cube\'s size is expressed as the length of each side'},
				{'name':'Cylinder',	'a':'Radius: ',				'b':' Height: ',	'info':'A cylinder\'s point of origin is the center of a circle of a particular radius. The hiight is the distance between the base and the top od the cylinder.'},
				{'name':'Line',		'a':'Length: ',				'b':'',				'info':'A line extends from its point of origin in a straight path up to its length and covers an area defined by its width.'},
				{'name':'Sphere',	'a':'Radius: ',				'b':'',				'info':'The sphere extends outward from the point of origin, and its size is expressed as a radius that extends from that point.'}
			],
			'dmgTypes': [
				{'name':'Bludgeoning.',	'cat':'Physical'},
				{'name':'Piercing',		'cat':'Physical'},
				{'name':'Slashing',		'cat':'Physical'},

				{'name':'Acid',			'cat':'Non-physical'},
				{'name':'Cold',			'cat':'Non-physical'},
				{'name':'Fire',			'cat':'Non-physical'},
				{'name':'Force',		'cat':'Non-physical'},
				{'name':'Lightning',	'cat':'Non-physical'},
				{'name':'Necrotic',		'cat':'Non-physical'},
				{'name':'Poison',		'cat':'Non-physical'},
				{'name':'Psychic',		'cat':'Non-physical'},
				{'name':'Radiant',		'cat':'Non-physical'},
				{'name':'Thunder',		'cat':'Non-physical'}
			],
			'diceTypes': [
				{'name':'d2',	'value':2},
				{'name':'d3',	'value':3},
				{'name':'d4',	'value':4},
				{'name':'d6',	'value':6},
				{'name':'d8',	'value':8},
				{'name':'d10',	'value':10},
				{'name':'d12',	'value':12},
				{'name':'d20',	'value':20}
			],
			'abilities': [
				{'name':'Dexterity',			'cat':'Abilities',	'type':'number',	'ngModel':'dex',		'subObj':false,	'info':''},
				{'name':'Constitution',			'cat':'Abilities',	'type':'number',	'ngModel':'con',		'subObj':false,	'info':''},
				{'name':'Intelligence',			'cat':'Abilities',	'type':'number',	'ngModel':'int',		'subObj':false,	'info':''},
				{'name':'Wisdow',				'cat':'Abilities',	'type':'number',	'ngModel':'wis',		'subObj':false,	'info':''},
				{'name':'Charisma',				'cat':'Abilities',	'type':'number',	'ngModel':'cha',		'subObj':false,	'info':''},
				{'name':'Strength',				'cat':'Abilities',	'type':'number',	'ngModel':'str',		'subObj':false,	'info':''},
				{'name':'Any',					'cat':'Abilities',	'type':'number',	'ngModel':'any',		'subObj':false,	'info':''}
			],
			'proficiencies': [
				{'name':'Simple melee',			'cat':'Weapons',	'type':'text',		'ngModel':'smDetails',	'subObj':true,	'info':''},
				{'name':'Simple ranged',		'cat':'Weapons',	'type':'text',		'ngModel':'srDetails',	'subObj':true,	'info':''},
				{'name':'Martial melee',		'cat':'Weapons',	'type':'text',		'ngModel':'mmDetails',	'subObj':true,	'info':''},
				{'name':'Martial ranged',		'cat':'Weapons',	'type':'text',		'ngModel':'mrDetails',	'subObj':true,	'info':''},
				{'name':'Exotic',				'cat':'Weapons',	'type':'text',		'ngModel':'exDetails',	'subObj':true,	'info':''},

				{'name':'Light armor',			'cat':'Armors',		'type':'text',		'ngModel':'laDetails',	'subObj':true,	'info':''},
				{'name':'Medium armor',			'cat':'Armors',		'type':'text',		'ngModel':'maDetails',	'subObj':true,	'info':''},
				{'name':'Heavy armor',			'cat':'Armors',		'type':'text',		'ngModel':'haDetails',	'subObj':true,	'info':''},
				{'name':'Shields',				'cat':'Armors',		'type':'text',		'ngModel':'shDetails',	'subObj':true,	'info':''},

				{'name':'Artisan\'s tools',		'cat':'Tools',		'type':'text',		'ngModel':'atDetails',	'subObj':true,	'info':''},
				{'name':'Disguise kit',			'cat':'Tools',		'type':'text',		'ngModel':'dkDetails',	'subObj':true,	'info':''},
				{'name':'Forgery kit',			'cat':'Tools',		'type':'text',		'ngModel':'fkDetails',	'subObj':true,	'info':''},
				{'name':'Gaming set',			'cat':'Tools',		'type':'text',		'ngModel':'gsDetails',	'subObj':true,	'info':''},
				{'name':'Herbalism kit',		'cat':'Tools',		'type':'text',		'ngModel':'hkDetails',	'subObj':true,	'info':''},
				{'name':'Musical instrument',	'cat':'Tools',		'type':'text',		'ngModel':'miDetails',	'subObj':true,	'info':''},
				{'name':'Navigator\'s tools',	'cat':'Tools',		'type':'text',		'ngModel':'ntDetails',	'subObj':true,	'info':''},
				{'name':'Poisoner\'s kit',		'cat':'Tools',		'type':'text',		'ngModel':'pkDetails',	'subObj':true,	'info':''},
				{'name':'Thieves\' tools',		'cat':'Tools',		'type':'text',		'ngModel':'ttDetails',	'subObj':true,	'info':''},

				{'name':'Strength',				'cat':'Savings',	'type':'number',	'ngModel':'strSaving',	'subObj':true,	'info':''},
				{'name':'Dexterity',			'cat':'Savings',	'type':'number',	'ngModel':'dexSaving',	'subObj':true,	'info':''},
				{'name':'Constitution',			'cat':'Savings',	'type':'number',	'ngModel':'conSaving',	'subObj':true,	'info':''},
				{'name':'Intelligence',			'cat':'Savings',	'type':'number',	'ngModel':'intSaving',	'subObj':true,	'info':''},
				{'name':'Wisdow',				'cat':'Savings',	'type':'number',	'ngModel':'wisSaving',	'subObj':true,	'info':''},
				{'name':'Charisma',				'cat':'Savings',	'type':'number',	'ngModel':'chaSaving',	'subObj':true,	'info':''},
				{'name':'Any',					'cat':'Savings',	'type':'number',	'ngModel':'anySaving',	'subObj':true,	'info':''}
			],
			'combat': [
				{'name':'hp',					'cat':'Combat',		'type':'number',	'ngModel':'hp',			'subObj':false,	'info':''},
				{'name':'Initiative',			'cat':'Combat',		'type':'number',	'ngModel':'initiative',	'subObj':false,	'info':''},
				{'name':'Speed',				'cat':'Combat',		'type':'number',	'ngModel':'speed',		'subObj':false,	'info':''},
			],
			'other': [
				{'name':'Language "Slots"',		'cat':'Other',		'type':'number',	'ngModel':'langSlots',	'subObj':false,	'info':''},
				{'name':'Custom 1',				'cat':'Other',		'type':'text',		'ngModel':'custom1',	'subObj':true,	'info':''},
				{'name':'Custom 2',				'cat':'Other',		'type':'text',		'ngModel':'custom2',	'subObj':true,	'info':''},
				{'name':'Custom 3',				'cat':'Other',		'type':'text',		'ngModel':'custom3',	'subObj':true,	'info':''}
			]
		};
	});
