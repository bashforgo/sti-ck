angular.module('MainCtrl', []).controller('MainController', function($scope, Signin) {

	$scope.user = "null";

	Signin.isSignedIn(function (user) {
		if (user!=1) {
			$scope.user = user;
		}
		$('#navigation-links').css({visibility:"visible"});
	})

	$('#login-modal').modal({
		show: false,
		backdrop: 'static'
	});

	$('#signup-in').click(function () {
		Signin.signInUp($('#username').val(),$('#password').val(),function (user) {
			if (user!=1) {
				$scope.user = user;
			}
		});
	});
});