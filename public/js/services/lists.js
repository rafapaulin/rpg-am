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
				{'name':'Cone',		'a':'Length: ',				'b':'',				'desc':'A cone\'s area of effect specities its maximum length. A cone\'s width at a given point along its length is equal to that point\'s distance from the point of origin.'},
				{'name':'Cube',		'a':'Length of sides: ',	'b':'',				'desc':'A cube\'s point of origin lies anywhere on a face of the cubic effect. The cube\'s size is expressed as the length of each side'},
				{'name':'Cylinder',	'a':'Radius: ',				'b':' Height: ',	'desc':'A cylinder\'s point of origin is the center of a circle of a particular radius. The hiight is the distance between the base and the top od the cylinder.'},
				{'name':'Line',		'a':'Length: ',				'b':'',				'desc':'A line extends from its point of origin in a straight path up to its length and covers an area defined by its width.'},
				{'name':'Sphere',	'a':'Radius: ',				'b':'',				'desc':'The sphere extends outward from the point of origin, and its size is expressed as a radius that extends from that point.'}
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
				{'name':'Strength',				'cat':'Abilities',						'type':'number',	'ngModel':'str',		'info':''},
				{'name':'Dexterity',			'cat':'Abilities',						'type':'number',	'ngModel':'dex',		'info':''},
				{'name':'Constitution',			'cat':'Abilities',						'type':'number',	'ngModel':'con',		'info':''},
				{'name':'Intelligence',			'cat':'Abilities',						'type':'number',	'ngModel':'int',		'info':''},
				{'name':'Wisdow',				'cat':'Abilities',						'type':'number',	'ngModel':'wis',		'info':''},
				{'name':'Charisma',				'cat':'Abilities',						'type':'number',	'ngModel':'cha',		'info':''},
				{'name':'Any',					'cat':'Abilities',						'type':'number',	'ngModel':'any',		'info':''},
			],
			'prereqs': [
				{'name':'Simple melee',			'cat':'Proficiency: Weapon group',		'type':'text',		'ngModel':'smDetails',	'array':'proficiencies', 'info':''},
				{'name':'Simple ranged',		'cat':'Proficiency: Weapon group',		'type':'text',		'ngModel':'srDetails',	'array':'proficiencies', 'info':''},
				{'name':'Martial melee',		'cat':'Proficiency: Weapon group',		'type':'text',		'ngModel':'mmDetails',	'array':'proficiencies', 'info':''},
				{'name':'Martial ranged',		'cat':'Proficiency: Weapon group',		'type':'text',		'ngModel':'mrDetails',	'array':'proficiencies', 'info':''},
				{'name':'Exotic',				'cat':'Proficiency: Weapon group',		'type':'text',		'ngModel':'exDetails',	'array':'proficiencies', 'info':''},

				{'name':'Light armor',			'cat':'Proficiency: Armor group',		'type':'text',		'ngModel':'laDetails',	'array':'proficiencies', 'info':''},
				{'name':'Medium armor',			'cat':'Proficiency: Armor group',		'type':'text',		'ngModel':'maDetails',	'array':'proficiencies', 'info':''},
				{'name':'Heavy armor',			'cat':'Proficiency: Armor group',		'type':'text',		'ngModel':'haDetails',	'array':'proficiencies', 'info':''},
				{'name':'Shields',				'cat':'Proficiency: Armor group',		'type':'text',		'ngModel':'shDetails',	'array':'proficiencies', 'info':''},

				{'name':'Artisan\'s tools',		'cat':'Proficiency: Tool group',		'type':'text',		'ngModel':'atDetails',	'array':'proficiencies', 'info':''},
				{'name':'Disguise kit',			'cat':'Proficiency: Tool group',		'type':'text',		'ngModel':'dkDetails',	'array':'proficiencies', 'info':''},
				{'name':'Forgery kit',			'cat':'Proficiency: Tool group',		'type':'text',		'ngModel':'fkDetails',	'array':'proficiencies', 'info':''},
				{'name':'Gaming set',			'cat':'Proficiency: Tool group',		'type':'text',		'ngModel':'gsDetails',	'array':'proficiencies', 'info':''},
				{'name':'Herbalism kit',		'cat':'Proficiency: Tool group',		'type':'text',		'ngModel':'hkDetails',	'array':'proficiencies', 'info':''},
				{'name':'Musical instrument',	'cat':'Proficiency: Tool group',		'type':'text',		'ngModel':'miDetails',	'array':'proficiencies', 'info':''},
				{'name':'Navigator\'s tools',	'cat':'Proficiency: Tool group',		'type':'text',		'ngModel':'ntDetails',	'array':'proficiencies', 'info':''},
				{'name':'Poisoner\'s kit',		'cat':'Proficiency: Tool group',		'type':'text',		'ngModel':'pkDetails',	'array':'proficiencies', 'info':''},
				{'name':'Thieves\' tools',		'cat':'Proficiency: Tool group',		'type':'text',		'ngModel':'ttDetails',	'array':'proficiencies', 'info':''},

				{'name':'Is Spellcaster?',		'cat':'Other',							'type':'checkbox',	'ngModel':'spellCaster','array':false, 'info':''}
			],
			'bonuses': [
				{'name':'Strength',				'cat':'Abilities',						'type':'number',	'ngModel':'str'},
				{'name':'Dexterity',			'cat':'Abilities',						'type':'number',	'ngModel':'dex'},
				{'name':'Constitution',			'cat':'Abilities',						'type':'number',	'ngModel':'con'},
				{'name':'Intelligence',			'cat':'Abilities',						'type':'number',	'ngModel':'int'},
				{'name':'Wisdow',				'cat':'Abilities',						'type':'number',	'ngModel':'wis'},
				{'name':'Charisma',				'cat':'Abilities',						'type':'number',	'ngModel':'cha'},
				{'name':'Any',					'cat':'Abilities',						'type':'number',	'ngModel':'anyAbility'},

				{'name':'HP',					'cat':'Combat',							'type':'number',	'ngModel':'hp'},
				{'name':'Initiative',			'cat':'Combat',							'type':'number',	'ngModel':'initiative',},
				{'name':'Speed',				'cat':'Combat',							'type':'number',	'ngModel':'speed'},

				{'name':'Simple melee',			'cat':'Proficiency: Weapon group',		'type':'text',		'ngModel':'smDetails',	'array':'proficiencies', 'info':''},
				{'name':'Simple ranged',		'cat':'Proficiency: Weapon group',		'type':'text',		'ngModel':'srDetails',	'array':'proficiencies', 'info':''},
				{'name':'Martial melee',		'cat':'Proficiency: Weapon group',		'type':'text',		'ngModel':'mmDetails',	'array':'proficiencies', 'info':''},
				{'name':'Martial ranged',		'cat':'Proficiency: Weapon group',		'type':'text',		'ngModel':'mrDetails',	'array':'proficiencies', 'info':''},
				{'name':'Exotic',				'cat':'Proficiency: Weapon group',		'type':'text',		'ngModel':'exDetails',	'array':'proficiencies', 'info':''},
				{'name':'Weapons',				'cat':'Proficiency: Specific weapon',	'type':'number',	'ngModel':'wpSlots',	'array':'proficiencies', 'info':''},

				{'name':'Light armor',			'cat':'Proficiency: Armor group',		'type':'text',		'ngModel':'laDetails',	'array':'proficiencies', 'info':''},
				{'name':'Medium armor',			'cat':'Proficiency: Armor group',		'type':'text',		'ngModel':'maDetails',	'array':'proficiencies', 'info':''},
				{'name':'Heavy armor',			'cat':'Proficiency: Armor group',		'type':'text',		'ngModel':'haDetails',	'array':'proficiencies', 'info':''},
				{'name':'Shields',				'cat':'Proficiency: Armor group',		'type':'text',		'ngModel':'shDetails',	'array':'proficiencies', 'info':''},
				{'name':'Armors',				'cat':'Proficiency: Specific armor',	'type':'number',	'ngModel':'arSlots',	'array':'proficiencies', 'info':''},

				{'name':'Skills/tools',			'cat':'Proficiency: Skills/tools',		'type':'number',	'ngModel':'stSlots',	'array':'proficiencies', 'info':''},

				{'name':'Language "Slots"',		'cat':'Other',							'type':'number',	'ngModel':'langSlots',	'array':false,		'info':''},
				{'name':'Custom 1"',			'cat':'Other',							'type':'text',		'ngModel':'langSlots',	'array':'custom',	'info':''},
				{'name':'Custom 2"',			'cat':'Other',							'type':'text',		'ngModel':'langSlots',	'array':'custom',	'info':''},
				{'name':'Custom 2"',			'cat':'Other',							'type':'text',		'ngModel':'langSlots',	'array':'custom',	'info':''}
			]
		};
	});

			 //	'svThrowProf': [{'type': String, 'default': ""}],

