angular.module('MainCtrl', []).controller('MainController', function($scope, $location, Signin) {

	$scope.user = "null";
	$scope.error = 0;

	Signin.isSignedIn(function (user) {
		$scope.handleData(user);
		$('#navigation-links').css({visibility:"visible"});
	})

	$('#login-modal').modal({
		show: false
	});

	$('#login-modal').on('shown.bs.modal', function () {
		$('#username').focus();
	});

	$('#signup-in').click(function () {
		$scope.signIn();
	});

	$('#username, #password').keypress(function(e){
		if (e.which == 13) {
			$scope.signIn();
		}
	});

	$scope.signIn = function () {
		Signin.signInUp($('#username').val(),$('#password').val(),function (user) {
			$scope.handleData(user);
			if ($scope.user == "null") {
				$scope.error = 1;
			} else {
				$scope.error = 0;
				$('#username, #password').val('');
			}
		});
	}

	$scope.signOut = function () {
		Signin.signOut(function (data) {
			if (data==0) {
				$('#username, #password').val('');
				$location.path("/");
				$scope.user = "null";
			}
		})
	}

	$scope.handleData = function (user) {
		if (user!=1) {
			$scope.user = user;
			$('#login-modal').modal('hide');
		} 
	}
});