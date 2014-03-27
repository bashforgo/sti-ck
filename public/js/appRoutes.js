angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html'
			//controller: 'MainController'
		})

		.when('/create', {
			templateUrl: 'views/create.html',
			controller: 'CreateController'
		})

		.when('/orders', {
			templateUrl: 'views/orders.html',
			controller: 'OrdersController'
		})

		.otherwise({
			templateUrl: 'views/404.html'
		});

	$locationProvider.html5Mode(true);

}]);