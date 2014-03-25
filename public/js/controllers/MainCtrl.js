angular.module('MainCtrl', []).controller('MainController', function($scope, $location, Signin) {

	$scope.user = "null";
	$scope.error = "false";

	Signin.isSignedIn(function (user) {
		$scope.handleData(user);
		$('#navigation-links').css({visibility:"visible"});
	})

	$('#login-modal').modal({
		show: false
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
		Signin.signInUp($('#username').val(),$('#password').val(),function (user) {$scope.handleData(user);});
		if ($scope.user != "null") {
			$('#username, #password').val('');
		}
	}

	$scope.signOut = function () {
		Signin.signOut(function (data) {
			if (data==0) {
				$location.path("/");
				$scope.user = "null";
			}
		})
	}

	$scope.handleData = function (user) {
		if (user!=1) {
			$scope.error = "false";
			$scope.user = user;
			$('#login-modal').modal('hide');
		} else {
			$scope.error = "true";
		}
		// $scope.$apply();
		console.log($scope.error)
	}
});