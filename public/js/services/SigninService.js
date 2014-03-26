angular.module('SigninService', []).service('Signin', function($http) {

	var user = null;

	function username (data) {
		user = data.local.username
		console.log("issiu " + user)
		return user;
	}

	function handleData (httpReq, callback) {
		httpReq.success(function (data, status) {
			callback(username(data));
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
		},

		isSignedInB: function () {
			return user;
		},

		getUsername: function () {
			console.log("issigu " + user)
			return user;	
		}

	}
	

});