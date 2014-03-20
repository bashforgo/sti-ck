angular.module('CreateCtrl', []).controller('CreateController', function($scope) {
	$scope.shape = {};
	$scope.shape.dom = $('#shape');
	$scope.imgSrc="";
	$scope.shape.type = "";
	$scope.shape.bg = "#ffffff";
	$scope.shape.rw = $scope.shape.dom.width();
	$scope.shape.rh = $scope.shape.dom.height();
	$scope.shape.cw = $scope.shape.dom.width();
	$scope.shape.ch = $scope.shape.dom.height();


	$scope.$on('$routeChangeSuccess', function () {
		center();
		$('#toggle').click(function () {
			console.log($scope.shape.type);
		});
		$scope.shape.dom.resizable({
			minWidth: 50,
			minHeight: 50,
			maxWidth: $('#editorCanvas').width(),
			maxHeight: 500,
			handles: "se",
			aspectRatio: false,
			resize: function (event, ui) {center();},
			stop: function (event, ui) {center();}
		});
	});
	$scope.$watch('shape.type',function (newVal,oldVal) {
		if (newVal === "circle") {
			console.log(newVal);
			$scope.shape.rw = $scope.shape.dom.width();
			$scope.shape.rh = $scope.shape.dom.height();
			$scope.shape.dom.animate({
				"width": $scope.shape.cw + "px",
				"height": $scope.shape.ch + "px",
				"border-radius": "50%"},
				{step: function (now, tween) {center();}},
				1000);
		} else{
			console.log(newVal);
			$scope.shape.cw = $scope.shape.dom.width();
			$scope.shape.ch = $scope.shape.dom.height();
			$scope.shape.dom.animate({
				"width": $scope.shape.rw + "px",
				"height": $scope.shape.rh + "px",
				"border-radius": "0%"},
				{step: function (now, tween) {center();}},
				1000);
		};
	})
	$(window).resize(function(){
	   center(); 
	});

	function center () {
		$scope.shape.dom.position({
			my: "center center",
			at: "center center",
			of: "#editorCanvas"
		})
	};
});



