angular.module('SigninService', []).factory('Signin', function($http) {
	var isSignedIn = false;
	var user = {};
	return {
		signinup: function (usernameVal,passwordVal,callback) {
			// $http({method: 'POST', url: '/signupin', params: }).
			$http.post('/signinup', {username:usernameVal, password:passwordVal}).
				success(function(data, status) {
					user = data;
					callback(user.local.username);
				}).
				error(function(data, status) {
					callback(1);
				});
		},

		isSignedIn: function () {
			return isSignedIn;
		},

		getUsername: function () {
			return user.local.username;
		}
}
	

});