angular.module('CreateCtrl', []).controller('CreateController', function($scope) {
	$scope.shape = {};
	$scope.shape.dom = $('#shape');
	$scope.imgSrc="";
	$scope.shape.type = "";
	$scope.shape.bg = "#ffffff";

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
		console.log(newVal);
		if (newVal === "circle") {
			$scope.shape.rw = $scope.shape.dom.width();
			$scope.shape.rh = $scope.shape.dom.height();
			$scope.shape.dom.animate({
				"height": "400px",
				"width": "400px",
				"border-radius": "50%"},
				{step: function (now, tween) {center();}},
				1000);
		} else{
			$scope.shape.rw = $scope.shape.dom.width();
			$scope.shape.rh = $scope.shape.dom.height();
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



