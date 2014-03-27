angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	//angular handled routes
	$routeProvider

		//set up routes and controllers
		.when('/', {
			templateUrl: 'views/home.html'
		})

		.when('/create', {
			templateUrl: 'views/create.html',
			controller: 'CreateController'
		})

		.when('/orders', {
			templateUrl: 'views/orders.html',
			controller: 'OrdersController'
		})

		//custom 404!!
		.otherwise({
			templateUrl: 'views/404.html'
		});

	$locationProvider.html5Mode(true);

}]);