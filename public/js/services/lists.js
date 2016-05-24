'use strict';
angular.module('rpg')
	.factory('Lists', function ListsFactory() {
		return {
			eyeColors: [
				{name:'Black',			cat:'Basic',	hex:'#000000'},
				{name:'White',			cat:'Basic',	hex:'#ffffff'},
				{name:'Brown',			cat:'Basic',	hex:'#8b4513'},
				{name:'Amber',			cat:'Basic',	hex:'#daa520'},
				{name:'Hazel',			cat:'Basic',	hex:'#808000'},
				{name:'Green',			cat:'Basic',	hex:'#228b22'},
				{name:'Blue',			cat:'Basic',	hex:'#6495ed'},

				{name:'Yellow',			cat:'Exotic',	hex:'#ffd700'},
				{name:'Pale Brown',		cat:'Exotic',	hex:'#eda677'},
				{name:'Emerald Green',	cat:'Exotic',	hex:'#006400'},
				{name:'Sea Green ',		cat:'Exotic',	hex:'#2e8b57'},
				{name:'Spring Green ',	cat:'Exotic',	hex:'#adff2f'},
				{name:'Pale Green',		cat:'Exotic',	hex:'#98fb98'},
				{name:'Gray',			cat:'Exotic',	hex:'#c0c0c0'},
				{name:'Aqua',			cat:'Exotic',	hex:'#00ced1'},
				{name:'Pale Blue',		cat:'Exotic',	hex:'#98cde3'},
				{name:'Pale Gray',		cat:'Exotic',	hex:'#dcdcdc'},
				{name:'Deep Blue',		cat:'Exotic',	hex:'#00008b'},

				{name:'Red',			cat:'Fey',		hex:'#cf1818'},
				{name:'Violet',			cat:'Fey',		hex:'#c71585'},
				{name:'Purple',			cat:'Fey',		hex:'#800080'}
			],
			hairColors: [
				{name:'Shaven',			cat:'',			hex:''},

				{name:'Black',			cat:'Basic',	hex:'#000000'},
				{name:'Gray',			cat:'Basic',	hex:'#828282'},
				{name:'Light gray',		cat:'Basic',	hex:'#aaaaaa'},
				{name:'Platinum',		cat:'Basic',	hex:'#d2d2d2'},
				{name:'White',			cat:'Basic',	hex:'#ffffff'},

				{name:'Dark blonde',	cat:'Basic',	hex:'#b8860b'},
				{name:'Blonde',			cat:'Basic',	hex:'#daa520'},
				{name:'Amber',			cat:'Basic',	hex:'#dd9124'},
				{name:'Bleach blonde',	cat:'Basic',	hex:'#f0e68c'},

				{name:'Dark redhead',	cat:'Basic',	hex:'#800000'},
				{name:'Redhead',		cat:'Basic',	hex:'#ff8c00'},
				{name:'Light redhead',	cat:'Basic',	hex:'#ff9a45'},
				{name:'Auburn',			cat:'Basic',	hex:'#8c391d'},
				
				{name:'Brunette',		cat:'Basic',	hex:'#3b1f0a'},
				{name:'Brown',			cat:'Basic',	hex:'#8b4513'},
				{name:'Light brown',	cat:'Basic',	hex:'#a86f2c'},
				{name:'Pale brown',		cat:'Basic',	hex:'#b58a5f'},

				{name:'Deep blue',		cat:'Dyed/Fey',	hex:'#00008b'},
				{name:'Blue',			cat:'Dyed/Fey',	hex:'#228b22'},
				{name:'Aqua',			cat:'Dyed/Fey',	hex:'#00ced1'},
				{name:'Pale blue',		cat:'Dyed/Fey',	hex:'#87ceeb'},

				{name:'Purple',			cat:'Dyed/Fey',	hex:'#800080'},
				{name:'Violet',			cat:'Dyed/Fey',	hex:'#c71585'},

				{name:'Red',			cat:'Dyed/Fey',	hex:'#dc1414'},
				{name:'Orange',			cat:'Dyed/Fey',	hex:'#ffa500'},

				{name:'Yellow',			cat:'Dyed/Fey',	hex:'#ffd700'},
				{name:'Hazel',			cat:'Dyed/Fey',	hex:'#808000'},

				{name:'Green',			cat:'Dyed/Fey',	hex:'#228b22'},
				{name:'Spring green',	cat:'Dyed/Fey',	hex:'#adff2f'},
				{name:'Sea green ',		cat:'Dyed/Fey',	hex:'#2e8b57'},
				{name:'Emerald green',	cat:'Dyed/Fey',	hex:'#006400'},
				{name:'Pale green',		cat:'Dyed/Fey',	hex:'#87ceeb'}
			],
			skinColors: [
				{name:'Pale',			cat:'Basic',	hex:'#fff5ee'},
				{name:'Fair',			cat:'Basic',	hex:'#ffebcd'},
				{name:'Light',			cat:'Basic',	hex:'#ffe4b5'},
				{name:'Light Tan',		cat:'Basic',	hex:'#f5deb3'},
				{name:'Tan',			cat:'Basic',	hex:'#d2b48c'},
				{name:'Dark Tan',		cat:'Basic',	hex:'#cd853f'},
				{name:'Brown',			cat:'Basic',	hex:'#a0522d'},
				{name:'Dark Brown',		cat:'Basic',	hex:'#5c2f0e'},

				{name:'Dark gray',		cat:'Exotic',	hex:'#414141'},
				{name:'Gray',			cat:'Exotic',	hex:'#808080'},
				{name:'Pale Gray',		cat:'Exotic',	hex:'#d5d5d5'},
				{name:'Deep Blue',		cat:'Exotic',	hex:'#000054'},
				{name:'Purple',			cat:'Exotic',	hex:'#800080'},
				{name:'Dark Purple',	cat:'Exotic',	hex:'#290033'},
				{name:'Pale Yellow',	cat:'Exotic',	hex:'#f0e68c'},
				{name:'Olive',			cat:'Exotic',	hex:'#808000'},

				{name:'Black',			cat:'Draconic',	hex:'#000000'},
				{name:'White',			cat:'Draconic',	hex:'#ffffff'},
				{name:'Blue',			cat:'Draconic',	hex:'#3762ed'},
				{name:'Brass',			cat:'Draconic',	hex:'#c58516'},
				{name:'Bronze',			cat:'Draconic',	hex:'#895e13'},
				{name:'Copper',			cat:'Draconic',	hex:'#ac5225'},
				{name:'Gold',			cat:'Draconic',	hex:'#c3921b'},
				{name:'Green',			cat:'Draconic',	hex:'#1a7a1a'},
				{name:'Red',			cat:'Draconic',	hex:'#cc0c0c'},
				{name:'Silver',			cat:'Draconic',	hex:'#d3d3d3'},

				{name:'Yellow',			cat:'Fey',		hex:'#ffd700'},
				{name:'Orange',			cat:'Fey',		hex:'#ffa500'},
				{name:'Emerald Green',	cat:'Fey',		hex:'#006400'},
				{name:'Sea Green',		cat:'Fey',		hex:'#2e8b57'},
				{name:'Spring Green',	cat:'Fey',		hex:'#adff2f'},
				{name:'Pale Green',		cat:'Fey',		hex:'#98fb98'},
				{name:'Violet',			cat:'Fey',		hex:'#c71585'},
				{name:'Aqua',			cat:'Fey',		hex:'#00ced1'},
				{name:'Pale Blue',		cat:'Fey',		hex:'#87ceeb'}
			],
			alignments: [
				{name:'Lawful good',		details:'Theese creatures can be counted on to do the right thing as expected by society. Gold dragons, paladins, and most dwarves are lawful good'},
				{name:'Neutral good',		details:'They are folk that do the best they can to help others according to their needs. Many celestiais, some cloud giants, and most gnomes are neutral good'},
				{name:'Chaotic good',		details:'Theese creatures act as their conscience directs, with little regard for what others expect. Copper dragons, many elves, and unicorns are chaotie good.'},
				{name:'Lawful neutral',		details:'They are Individuais that act in accordance with law, tradition, or personal codes. Many monks and some wizards are lawful neutral.'},
				{name:'Neutral',			details:'This is the alignment of those who prefer to steer c1ear of moral questions and don\'t take sides'},
				{name:'Chaotic neutral',	details:'Theese creatures follow their whims, holding their personal freedom above ali else. Many barbarians and rogues, and some bards, are chaotie neutral'},
				{name:'Lawful evil',		details:'They are creatures that methodically take what they want, within the limits of acode of tradition, loyalty, or order. Devils, blue dragons, and hobgoblins are Jawful evil'},
				{name:'Neutral evil',		details:'This is the alignment of those who do whatever they can get away with, without compassion or qualms. Many drow, some cloud giants, and yugoloths are neutral evil'},
				{name:'Chaotic evil',		details:'Theese creatures act with arbitrary violence, spurred by their greed, hatred, or bloodlust. Demons, red dragons, and orcs are chaotic evil'}
			],
			levels: [
				{level:1,	xpNeeded:0,			profBonus:2},
				{level:2,	xpNeeded:300,		profBonus:2},
				{level:3,	xpNeeded:900,		profBonus:2},
				{level:4,	xpNeeded:2700,		profBonus:2},
				{level:5,	xpNeeded:6500,		profBonus:3},
				{level:6,	xpNeeded:14000,		profBonus:3},
				{level:7,	xpNeeded:23000,		profBonus:3},
				{level:8,	xpNeeded:34000,		profBonus:3},
				{level:9,	xpNeeded:48000,		profBonus:4},
				{level:10,	xpNeeded:64000,		profBonus:4},
				{level:11,	xpNeeded:85000,		profBonus:4},
				{level:12,	xpNeeded:100000,	profBonus:4},
				{level:13,	xpNeeded:120000,	profBonus:5},
				{level:14,	xpNeeded:140000,	profBonus:5},
				{level:15,	xpNeeded:165000,	profBonus:5},
				{level:16,	xpNeeded:195000,	profBonus:5},
				{level:17,	xpNeeded:225000,	profBonus:6},
				{level:18,	xpNeeded:265000,	profBonus:6},
				{level:19,	xpNeeded:305000,	profBonus:6},
				{level:20,	xpNeeded:335000,	profBonus:6}
			],
			sizes: [
				{name:'Tiny',		space:0.762},
				{name:'Small',		space:1.524},
				{name:'Medium',		space:1.524},
				{name:'Large',		space:3.048},
				{name:'Huge',		space:4.572},
				{name:'Gargantuan',	space:6.096}
			],
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
				{name:'Feet',			system:'Imperial',	toMeter:0.3048, short:'ft', subShort:'in'},
				{name:'Miles',			system:'Imperial',	toMeter:1609.34, short:'mi'},

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
				{name:'Cone',		a:'Length: ',			b:'',			details:'A cone\'s area of effect specities its maximum length. A cone\'s width at a given point along its length is equal to that point\'s distance from the point of origin.'},
				{name:'Cube',		a:'Length of sides: ',	b:'',			details:'A cube\'s point of origin lies anywhere on a face of the cubic effect. The cube\'s size is expressed as the length of each side'},
				{name:'Cylinder',	a:'Radius: ',			b:'Height: ',	details:'A cylinder\'s point of origin is the center of a circle of a particular radius. The hiight is the distance between the base and the top od the cylinder.'},
				{name:'Line',		a:'Length: ',			b:'Width: ',	details:'A line extends from its point of origin in a straight path up to its length and covers an area defined by its width.'},
				{name:'Sphere',		a:'Radius: ',			b:'',			details:'The sphere extends outward from the point of origin, and its size is expressed as a radius that extends from that point.'}
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
				{name:'Dexterity',			cat:'Abilities',	type:'number',	ngModel:'dex',	details:''},
				{name:'Constitution',		cat:'Abilities',	type:'number',	ngModel:'con',	details:''},
				{name:'Intelligence',		cat:'Abilities',	type:'number',	ngModel:'int',	details:''},
				{name:'Wisdow',				cat:'Abilities',	type:'number',	ngModel:'wis',	details:''},
				{name:'Charisma',			cat:'Abilities',	type:'number',	ngModel:'cha',	details:''},
				{name:'Strength',			cat:'Abilities',	type:'number',	ngModel:'str',	details:''},
				{name:'Any',				cat:'Abilities',	type:'number',	ngModel:'any',	details:''}
			],
			proficiencies: [
				{name:'Simple melee',		cat:'Weapons',		type:'text',	details:''},
				{name:'Simple ranged',		cat:'Weapons',		type:'text',	details:''},
				{name:'Martial melee',		cat:'Weapons',		type:'text',	details:''},
				{name:'Martial ranged',		cat:'Weapons',		type:'text',	details:''},
				{name:'Exotic',				cat:'Weapons',		type:'text',	details:''},

				{name:'Light armor',		cat:'Armors',		type:'text',	details:''},
				{name:'Medium armor',		cat:'Armors',		type:'text',	details:''},
				{name:'Heavy armor',		cat:'Armors',		type:'text',	details:''},
				{name:'Shields',			cat:'Armors',		type:'text',	details:''},

				{name:'Artisan\'s tools',	cat:'Tools',		type:'text',	details:''},
				{name:'Disguise kit',		cat:'Tools',		type:'text',	details:''},
				{name:'Forgery kit',		cat:'Tools',		type:'text',	details:''},
				{name:'Gaming set',			cat:'Tools',		type:'text',	details:''},
				{name:'Herbalism kit',		cat:'Tools',		type:'text',	details:''},
				{name:'Musical instrument',	cat:'Tools',		type:'text',	details:''},
				{name:'Navigator\'s tools',	cat:'Tools',		type:'text',	details:''},
				{name:'Poisoner\'s kit',	cat:'Tools',		type:'text',	details:''},
				{name:'Thieves\' tools',	cat:'Tools',		type:'text',	details:''},

				{name:'Strength',			cat:'Savings',		type:'number',	details:''},
				{name:'Dexterity',			cat:'Savings',		type:'number',	details:''},
				{name:'Constitution',		cat:'Savings',		type:'number',	details:''},
				{name:'Intelligence',		cat:'Savings',		type:'number',	details:''},
				{name:'Wisdow',				cat:'Savings',		type:'number',	details:''},
				{name:'Charisma',			cat:'Savings',		type:'number',	details:''}
			],
			combat: [
				{name:'hp',					cat:'Combat',		type:'number',	ngModel:'hp',			details:''},
				{name:'Initiative',			cat:'Combat',		type:'number',	ngModel:'initiative',	details:''},
				{name:'Speed',				cat:'Combat',		type:'number',	ngModel:'speed',		details:''},
			],
			other: [
				{name:'Language "Slots"',	cat:'Other',		type:'number',	details:''},
				{name:'Custom 1',			cat:'Other',		type:'text',	details:''},
				{name:'Custom 2',			cat:'Other',		type:'text',	details:''},
				{name:'Custom 3',			cat:'Other',		type:'text',	details:''}
			],
			bonuses: [
				{name: 'Vision',				cat: 'General',		type: 'number',	ngModel: 'vision',				desc:''},
				{name: 'Speed',					cat: 'General',		type: 'number',	ngModel: 'speed',				desc:''},
				{name: 'Language Slots',		cat: 'General',		type: 'number',	ngModel: 'langSlots',			desc:''},
				{name: 'Max Weight',			cat: 'General',		type: 'number',	ngModel: 'maxWeight',			desc:''},
				{name: 'Skill Slots',			cat: 'General',		type: 'number',	ngModel: 'skillSlot',			desc:''},
				{name: 'Languages',				cat: 'General',		type: 'list',	ngModel: 'languages',			desc:''},
				{name: 'Skills',				cat: 'General',		type: 'list',	ngModel: 'skills',				desc:''},

				{name: 'Hit Points',			cat: 'Combat',		type: 'number',	ngModel: 'hp',					desc:''},
				{name: 'Armor Class',			cat: 'Combat',		type: 'number',	ngModel: 'ac',					desc:''},
				{name: 'Initiative',			cat: 'Combat',		type: 'number',	ngModel: 'initiative',			desc:''},
				{name: 'Proficiency',			cat: 'Combat',		type: 'number',	ngModel: 'prof',				desc:''},
				{name: 'Spell DC',				cat: 'Combat',		type: 'number',	ngModel: 'spellDC',				desc:''},
				{name: 'Melee to Hit',			cat: 'Combat',		type: 'number',	ngModel: 'meleeToHit',			desc:''},
				{name: 'Melee Damage',			cat: 'Combat',		type: 'number',	ngModel: 'meleeDmg',			desc:''},
				{name: 'Ranged to Hit',			cat: 'Combat',		type: 'number',	ngModel: 'rangedToHit',			desc:''},
				{name: 'Ranged Damage',			cat: 'Combat',		type: 'number',	ngModel: 'rangedDmg',			desc:''},
				{name: 'Spell to Hit',			cat: 'Combat',		type: 'number',	ngModel: 'spellToHit',			desc:''},
				{name: 'Spell Damage',			cat: 'Combat',		type: 'number',	ngModel: 'spellDmg',			desc:''},
				{name: 'Range',					cat: 'Combat',		type: 'number',	ngModel: 'range',				desc:''},
				{name: 'Spell Range',			cat: 'Combat',		type: 'number',	ngModel: 'spellRange',			desc:''},
				{name: 'Damage',				cat: 'Combat',		type: 'number',	ngModel: 'dmg',					desc:''},
				{name: 'Resistances',			cat: 'Combat',		type: 'list',	ngModel: 'dmgResistances',		desc:''},

				{name: 'Spells Known',			cat: 'Spell',		type: 'number',	ngModel: 'spellsKnown',			desc:''},
				{name: 'Cantrips Known',		cat: 'Spell',		type: 'number',	ngModel: 'cantripsKnown',		desc:''},
				{name: 'Invocations Known',		cat: 'Spell',		type: 'number',	ngModel: 'invocationsKnown',	desc:''},
				{name: 'Spells',				cat: 'Spell',		type: 'list',	ngModel: 'spells',				desc:''},
				
				{name: '1st Level Slots',		cat: 'Spell',		type: 'number',	ngModel: 'firstLvlSpellSlots',	desc:''},
				{name: '2nd Level Slots',		cat: 'Spell',		type: 'number',	ngModel: 'secondLvlSpellSlots',	desc:''},
				{name: '3rd Level Slots',		cat: 'Spell',		type: 'number',	ngModel: 'thirdLvlSpellSlots',	desc:''},
				{name: '4th Level Slots',		cat: 'Spell',		type: 'number',	ngModel: 'fourthLvlSpellSlots',	desc:''},
				{name: '5th Level Slots',		cat: 'Spell',		type: 'number',	ngModel: 'fifthLvlSpellSlots',	desc:''},
				{name: '6th Level Slots',		cat: 'Spell',		type: 'number',	ngModel: 'sixthLvlSpellSlots',	desc:''},
				{name: '7th Level Slots',		cat: 'Spell',		type: 'number',	ngModel: 'seventhLvlSpellSlots',desc:''},
				{name: '8th Level Slots',		cat: 'Spell',		type: 'number',	ngModel: 'eigthLvlSpellSlots',	desc:''},
				{name: '9th Level Slots',		cat: 'Spell',		type: 'number',	ngModel: 'ninthLvlSpellSlots',	desc:''},

				{name: 'Strenght',				cat: 'Abilities',	type: 'number',	ngModel: 'str',					desc:''},
				{name: 'Dexterity',				cat: 'Abilities',	type: 'number',	ngModel: 'dex',					desc:''},
				{name: 'Constitution',			cat: 'Abilities',	type: 'number',	ngModel: 'con',					desc:''},
				{name: 'Intelligence',			cat: 'Abilities',	type: 'number',	ngModel: 'int',					desc:''},
				{name: 'Wisdow',				cat: 'Abilities',	type: 'number',	ngModel: 'wis',					desc:''},
				{name: 'Charisma',				cat: 'Abilities',	type: 'number',	ngModel: 'cha',					desc:''},

				{name: 'Inspiration Points',	cat: 'Other',		type:'number',	ngModel: 'inspiration',			desc:''},
				{name: 'Class Points',			cat: 'Other',		type:'number',	ngModel: 'classPoints',			desc:''},
				{name: 'Special Dice',			cat: 'Other',		type:'number',	ngModel: 'specialDice',			desc:''},
				{name: 'Proficiencies',			cat: 'Other',		type: 'list',	ngModel: 'proficiencies',		desc:''},
				{name: 'Features Slots',		cat: 'Other',		type:'number',	ngModel: 'featuresSlots',		desc:''},

			]
		};
	});
