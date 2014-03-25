angular.module('MainCtrl', []).controller('MainController', function($scope, Signin) {

	$scope.user = "null";

	$('#login-modal').modal({
		show: false,
		backdrop: 'static'
	});

	$('#signup-in').click(function () {
		Signin.signinup($('#username').val(),$('#password').val(),function (res) {
			if (res!=1) {
				$scope.user = res;
			}
		});
	});
});