angular.module('SigninService', []).factory('Signin', function($http) {
	var isSignedIn = false;
	var user = {};
	function getUsername (data) {
		return data.local.username
	}
	function handleData (httpReq, callback) {
		httpReq.success(function (data, status) {
			user = data;
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

		signOut: function () {
			handleData($http.get('/signout'), callback)
		}
	}
	

});