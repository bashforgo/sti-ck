angular.module('CreateCtrl', []).controller('CreateController', function($scope) {

	$scope.tagline = 'Create something new!';
	$scope.$on('$routeChangeSuccess', function () {
	  // run some code to do your animations
	});
});