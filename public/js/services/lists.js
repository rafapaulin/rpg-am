'use strict';
angular.module('rpg')
	.factory('Lists', function ListsFactory() {
		return {
			schools: [
				{name:'Abjuration'},
				{name:'Conjuration'},
				{name:'Divination'},
				{name:'Enchantment'},
				{name:'Evocation'},
				{name:'Illusion'},
				{name:'Necromancy'},
				{name:'Transmutation'}
			],
			langs: [
				{name:'Common',			cat:'Standard',		script:'Common',	speakers:'Humans'},
				{name:'Dwarvish',		cat:'Standard',		script:'Dwarvish',	speakers:'Dwarves'},
				{name:'Elvish',			cat:'Standard',		script:'Elvish',	speakers:'Elves'},
				{name:'Giant',			cat:'Standard',		script:'Dwarvish',	speakers:'Ogres, giants'},
				{name:'Gnomish',		cat:'Standard',		script:'Dwarvish',	speakers:'Gnomes'},
				{name:'Goblin',			cat:'Standard',		script:'Dwarvish',	speakers:'Goblinoids'},
				{name:'Halfling',		cat:'Standard',		script:'Common',	speakers:'Halflings'},
				{name:'Orc',			cat:'Standard',		script:'Dwarvish',	speakers:'Orcs'},
				{name:'Abyssal',		cat:'Exotic',		script:'Infernal',	speakers:'Demons'},
				{name:'Celestial',		cat:'Exotic',		script:'Celestial',	speakers:'Celestiais'},
				{name:'Draconic',		cat:'Exotic',		script:'Draconic',	speakers:'Dragons, dragonborn'},
				{name:'Deep Speech',	cat:'Exotic',		script:'',			speakers:'Mind flayers, beholders'},
				{name:'Infernal',		cat:'Exotic',		script:'Infernal',	speakers:'Devils'},
				{name:'Primordial',		cat:'Exotic',		script:'Dwarvish',	speakers:'Elementals'},
				{name:'Sylvan',			cat:'Exotic',		script:'Elvish',	speakers:'Fey creatures'},
				{name:'Undercommon',	cat:'Exotic',		script:'Elvish',	speakers:'Underdark traders'}
			],
			components: [
				{name:'Material',		details:''},
				{name:'Verbal',			details:''},
				{name:'Somatic',		details:''}
			],
			savings:[
				{name:'Strength',		details:''},
				{name:'Dexterity',		details:''},
				{name:'Constitution',	details:''},
				{name:'Intelligence',	details:''},
				{name:'Wisdom',			details:''},
				{name:'Charisma',		details:''}
			],
			lengthUnits: [
				{name:'Inches',			system:'Imperial',	toMeter:0.0254, short:'in'},
				{name:'Feets',			system:'Imperial',	toMeter:0.3048, short:'ft'},
				{name:'Miles',			system:'Imperial',	toMeter:1609.34, short:''},

				{name:'Centimeters',	system:'Metric',	toMeter:0.01, short:'cm'},
				{name:'Meters',			system:'Metric',	toMeter:1, short:'m'},
				{name:'Kilometers',		system:'Metric',	toMeter:1000, short:'km'},

				{name:'Touch/Self', 	system:'Special',	toMeter:0, short:''}
			],
			weightUnits: [
				{name:'Ounces',			system:'Imperial',	toKg:0.0283495, short:'oz'},
				{name:'Pounds',			system:'Imperial',	toKg:0.453592, short:'lb'},

				{name:'Grams',			system:'Metric',	toKg:0.001, short:'g'},
				{name:'Kilograms',		system:'Metric',	toKg:1, short:'kg'},
				{name:'Tons',			system:'Metric',	toKg:1000, short:'ton'}
			],
			timeUnits: [
				{name:'Seconds',		system:'Time',	toSeconds:1, short:'s'},
				{name:'Minutes',		system:'Time',	toSeconds:60, short:'min'},
				{name:'hours',			system:'Time',	toSeconds:3600, short:'h'},

				{name:'Action',			system:'DnD',	toSeconds:0.1, short:''},
				{name:'Bonus Action',	system:'DnD',	toSeconds:0.01, short:''},
				{name:'Reaction',		system:'DnD',	toSeconds:0.001, short:''},
				{name:'Rounds',			system:'DnD',	toSeconds:6, short:''},
				{name:'Instantaneous',	system:'DnD',	toSeconds:0, short:''},
				{name:'Until dspelled',	system:'DnD',	toSeconds:-1, short:''}
			],
			areasOfEffect: [
				{name:'Cone',		a:'Length: ',			b:'',			info:'A cone\'s area of effect specities its maximum length. A cone\'s width at a given point along its length is equal to that point\'s distance from the point of origin.'},
				{name:'Cube',		a:'Length of sides: ',	b:'',			info:'A cube\'s point of origin lies anywhere on a face of the cubic effect. The cube\'s size is expressed as the length of each side'},
				{name:'Cylinder',	a:'Radius: ',			b:'Height: ',	info:'A cylinder\'s point of origin is the center of a circle of a particular radius. The hiight is the distance between the base and the top od the cylinder.'},
				{name:'Line',		a:'Length: ',			b:'',			info:'A line extends from its point of origin in a straight path up to its length and covers an area defined by its width.'},
				{name:'Sphere',		a:'Radius: ',			b:'',			info:'The sphere extends outward from the point of origin, and its size is expressed as a radius that extends from that point.'}
			],
			dmgTypes: [
				{name:'Bludgeoning',	cat:'Physical'},
				{name:'Piercing',		cat:'Physical'},
				{name:'Slashing',		cat:'Physical'},

				{name:'Acid',			cat:'Non-physical'},
				{name:'Cold',			cat:'Non-physical'},
				{name:'Fire',			cat:'Non-physical'},
				{name:'Force',			cat:'Non-physical'},
				{name:'Lightning',		cat:'Non-physical'},
				{name:'Necrotic',		cat:'Non-physical'},
				{name:'Poison',			cat:'Non-physical'},
				{name:'Psychic',		cat:'Non-physical'},
				{name:'Radiant',		cat:'Non-physical'},
				{name:'Thunder',		cat:'Non-physical'}
			],
			diceTypes: [
				{name:'d2',		value:2},
				{name:'d3',		value:3},
				{name:'d4',		value:4},
				{name:'d6',		value:6},
				{name:'d8',		value:8},
				{name:'d10',	value:10},
				{name:'d12',	value:12},
				{name:'d20',	value:20}
			],
			abilities: [
				{name:'Dexterity',			cat:'Abilities',	type:'number',	ngModel:'dex',	info:''},
				{name:'Constitution',		cat:'Abilities',	type:'number',	ngModel:'con',	info:''},
				{name:'Intelligence',		cat:'Abilities',	type:'number',	ngModel:'int',	info:''},
				{name:'Wisdow',				cat:'Abilities',	type:'number',	ngModel:'wis',	info:''},
				{name:'Charisma',			cat:'Abilities',	type:'number',	ngModel:'cha',	info:''},
				{name:'Strength',			cat:'Abilities',	type:'number',	ngModel:'str',	info:''},
				{name:'Any',				cat:'Abilities',	type:'number',	ngModel:'any',	info:''}
			],
			proficiencies: [
				{name:'Simple melee',		cat:'Weapons',		type:'text',	info:''},
				{name:'Simple ranged',		cat:'Weapons',		type:'text',	info:''},
				{name:'Martial melee',		cat:'Weapons',		type:'text',	info:''},
				{name:'Martial ranged',		cat:'Weapons',		type:'text',	info:''},
				{name:'Exotic',				cat:'Weapons',		type:'text',	info:''},

				{name:'Light armor',		cat:'Armors',		type:'text',	info:''},
				{name:'Medium armor',		cat:'Armors',		type:'text',	info:''},
				{name:'Heavy armor',		cat:'Armors',		type:'text',	info:''},
				{name:'Shields',			cat:'Armors',		type:'text',	info:''},

				{name:'Artisan\'s tools',	cat:'Tools',		type:'text',	info:''},
				{name:'Disguise kit',		cat:'Tools',		type:'text',	info:''},
				{name:'Forgery kit',		cat:'Tools',		type:'text',	info:''},
				{name:'Gaming set',			cat:'Tools',		type:'text',	info:''},
				{name:'Herbalism kit',		cat:'Tools',		type:'text',	info:''},
				{name:'Musical instrument',	cat:'Tools',		type:'text',	info:''},
				{name:'Navigator\'s tools',	cat:'Tools',		type:'text',	info:''},
				{name:'Poisoner\'s kit',	cat:'Tools',		type:'text',	info:''},
				{name:'Thieves\' tools',	cat:'Tools',		type:'text',	info:''},

				{name:'Strength',			cat:'Savings',		type:'number',	info:''},
				{name:'Dexterity',			cat:'Savings',		type:'number',	info:''},
				{name:'Constitution',		cat:'Savings',		type:'number',	info:''},
				{name:'Intelligence',		cat:'Savings',		type:'number',	info:''},
				{name:'Wisdow',				cat:'Savings',		type:'number',	info:''},
				{name:'Charisma',			cat:'Savings',		type:'number',	info:''}
			],
			combat: [
				{name:'hp',					cat:'Combat',		type:'number',	ngModel:'hp',			info:''},
				{name:'Initiative',			cat:'Combat',		type:'number',	ngModel:'initiative',	info:''},
				{name:'Speed',				cat:'Combat',		type:'number',	ngModel:'speed',		info:''},
			],
			other: [
				{name:'Language "Slots"',	cat:'Other',		type:'number',	info:''},
				{name:'Custom 1',			cat:'Other',		type:'text',	info:''},
				{name:'Custom 2',			cat:'Other',		type:'text',	info:''},
				{name:'Custom 3',			cat:'Other',		type:'text',	info:''}
			]
		};
	});
