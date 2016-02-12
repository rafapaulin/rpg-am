'use strict';
angular.module('rpg')
	.directive('skillListItem', ['$sce', function($sce){
			return {
				restrict: 'E',
				templateUrl: '/templates/list-item.html',
				scope: {
					name:	 '=',
					short:	 '=',
					ability: '=',
					prof:	 '=',
					desc:	 '=',
					slug:	 '='
				},
				link: function(scope, element){
					scope.desc = $sce.trustAsHtml(scope.desc);
				}
			};
		}]);