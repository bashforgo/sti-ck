angular.module('OrdersCtrl', []).controller('OrdersController', function($scope, $http) {
    //fetch the orders
    $http.get('/order').
        success(function (data) {
            console.log(data);
            $scope.orders = data;
        }).
        error(function (data) {
            console.log(data)
        })
});