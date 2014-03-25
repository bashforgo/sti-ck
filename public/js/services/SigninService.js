angular.module('SigninService', []).factory('Signin', function($http) {

	function getUsername (data) {
		return data.local.username
	}

	function handleData (httpReq, callback) {
		httpReq.success(function (data, status) {
			callback(getUsername(data));
		}).
		error(function (data, status) {
			callback(1);
		});
	}

	return {
		signInUp: function (usernameVal,passwordVal,callback) {
			handleData($http.post('/signinup', {username:usernameVal, password:passwordVal}), callback);
		},

		isSignedIn: function (callback) {
			handleData($http.get('/issignedin'), callback)
		},

		signOut: function (callback) {
			$http.get('/signout').
				success(function (data, status) {
					callback(0);
				}).
				error(function (data, status) {
					callback(1);
				})
		}
	}
	

});