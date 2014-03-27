angular.module('OrdersCtrl', []).controller('OrdersController', function($scope, $http) {
    $http.get('/order').
        success(function (data) {
            $scope.orders = data;
        }).
        error(function (data) {
            console.log(data)
        })
});