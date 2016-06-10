'use strict';
angular.module('rpg').factory('Fn', function FnFactory() {
	var gScope;

	return {
		setScope: function(scp) {gScope = scp;},
		toArray: function(obj, array, list, extra) {
			if(extra) list = extra + list;							// correct the list name if it is a sublist
			if(list){
				gScope[list] = gScope[list].filter(function(fList){	// Remove added item from the <select>
					return fList !== obj;
				});
			};
			array.push(obj);										// Add item to the array
		},
		removeItem: function($index, array, list, extra){
			if(extra) list = extra + list;
			gScope[list].push(array[$index]);						// Add removed item back to the <select>
			array.splice($index,1);									// Remove item from display array
		}
	};
});
